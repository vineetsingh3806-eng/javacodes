"""
Document API endpoints — upload, list, retrieve, delete.
"""
import logging
import os
import uuid
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    Query,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.authentication.deps import get_current_user
from app.core.config import settings
from app.database.session import get_db
from app.models.document import Document
from app.models.user import User
from app.parser.service import document_parser
from app.schemas.document import (
    DocumentListResponse,
    DocumentResponse,
    UploadResponse,
)
from app.services.document_processor import document_processor

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/upload", response_model=UploadResponse, status_code=201)
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UploadResponse:
    """
    Upload a document. The file is stored on disk and processed
    (text extraction + vector indexing) in the background.
    """
    # --- Validate extension ---
    original_name = file.filename or "unnamed"
    ext = Path(original_name).suffix.lower()
    if ext not in document_parser.SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type '{ext}'. Supported: "
            + ", ".join(sorted(document_parser.SUPPORTED_EXTENSIONS)),
        )

    # --- Validate size ---
    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    contents = await file.read()
    if len(contents) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds the {settings.MAX_UPLOAD_SIZE_MB}MB limit.",
        )

    # --- Persist to disk ---
    user_dir = Path(settings.UPLOAD_DIR) / str(current_user.id)
    user_dir.mkdir(parents=True, exist_ok=True)
    stored_name = f"{uuid.uuid4().hex}{ext}"
    file_path = user_dir / stored_name
    file_path.write_bytes(contents)

    # --- Create DB record ---
    document = Document(
        owner_id=current_user.id,
        title=Path(original_name).stem,
        filename=original_name,
        file_type=ext.lstrip("."),
        file_size=len(contents),
        file_path=str(file_path),
        status="processing",
    )
    db.add(document)
    db.commit()
    db.refresh(document)

    # --- Background processing (fire-and-forget) ---
    try:
        await document_processor.process(document.id, str(file_path), ext)
    except Exception as exc:  # noqa: BLE001
        logger.error("Background processing failed for doc %s: %s", document.id, exc)

    return UploadResponse(document=document)


@router.get("", response_model=DocumentListResponse)
def list_documents(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> DocumentListResponse:
    """List the current user's documents (paginated)."""
    query = db.query(Document).filter(Document.owner_id == current_user.id)
    total = query.count()
    items = (
        query.order_by(Document.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return DocumentListResponse(
        items=items, total=total, page=page, page_size=page_size
    )


@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Document:
    """Fetch a single document belonging to the current user."""
    document = (
        db.query(Document)
        .filter(Document.id == document_id, Document.owner_id == current_user.id)
        .first()
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Document not found."
        )
    return document


@router.delete("/{document_id}", status_code=204)
def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    """Delete a document, its file, chunks, and generated content."""
    document = (
        db.query(Document)
        .filter(Document.id == document_id, Document.owner_id == current_user.id)
        .first()
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Document not found."
        )

    # Remove stored file if present
    if document.file_path:
        try:
            os.remove(document.file_path)
        except OSError:
            pass

    # Remove vector chunks
    try:
        from app.services.vectorstore import vector_store

        vector_store.delete_document_chunks(document.id)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Failed to delete vectors for doc %s: %s", document.id, exc)

    db.delete(document)
    db.commit()

