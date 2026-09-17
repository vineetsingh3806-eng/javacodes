"""
Generation API endpoints — request AI artifacts and fetch results.
"""
import json
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.authentication.deps import get_current_user
from app.database.session import get_db
from app.models.document import Document
from app.models.generation import GeneratedContent
from app.models.user import User
from app.schemas.generation import (
    GenerationCreateRequest,
    GenerationResponse,
    GenerationType,
)
from app.services.generation import generation_service

router = APIRouter(prefix="/generations", tags=["generations"])


def _get_owned_document(db: Session, document_id: int, user: User) -> Document:
    """Fetch a document owned by the current user or raise 404."""
    document = (
        db.query(Document)
        .filter(Document.id == document_id, Document.owner_id == user.id)
        .first()
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Document not found."
        )
    return document


@router.post("", response_model=GenerationResponse, status_code=201)
async def create_generation(
    payload: GenerationCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> GeneratedContent:
    """Generate an AI artifact (timeline, mindmap, quiz, presentation, podcast)."""
    document = _get_owned_document(db, payload.document_id, current_user)
    if document.status != "ready":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Document is not ready yet. Please wait for processing to finish.",
        )
    record = await generation_service.generate_and_persist(
        db,
        document,
        payload.generation_type,
        title=payload.title,
    )
    return record


@router.get("", response_model=List[GenerationResponse])
def list_generations(
    document_id: int = Query(None, description="Filter by document"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> List[GeneratedContent]:
    """List AI artifacts for the current user (optionally per document)."""
    query = db.query(GeneratedContent).filter(
        GeneratedContent.owner_id == current_user.id
    )
    if document_id:
        query = query.filter(GeneratedContent.document_id == document_id)
    return query.order_by(GeneratedContent.created_at.desc()).all()


@router.get("/{generation_id}", response_model=GenerationResponse)
def get_generation(
    generation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> GeneratedContent:
    """Fetch a single generated artifact."""
    record = (
        db.query(GeneratedContent)
        .filter(
            GeneratedContent.id == generation_id,
            GeneratedContent.owner_id == current_user.id,
        )
        .first()
    )
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Generation not found."
        )
    return record

