"""
Chat API endpoints — RAG-based question answering over documents.
"""
import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.ai.gemini import gemini_service
from app.ai.prompts import CHAT_SYSTEM_PROMPT
from app.authentication.deps import get_current_user
from app.database.session import get_db
from app.models.document import Document
from app.models.user import User
from app.schemas.generation import ChatRequest, ChatResponse
from app.services.vectorstore import vector_store

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat_with_document(
    payload: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ChatResponse:
    """
    Ask a question about a document. Retrieves relevant chunks via
    vector search and answers using Gemini grounded on those chunks.
    """
    if not gemini_service.is_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Gemini API is not configured. Set GEMINI_API_KEY.",
        )

    document = (
        db.query(Document)
        .filter(Document.id == payload.document_id, Document.owner_id == current_user.id)
        .first()
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Document not found."
        )
    if document.status != "ready":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Document is not ready yet. Please wait for processing to finish.",
        )

    # Semantic retrieval
    try:
        matches = vector_store.search(
            query=payload.question, document_id=document.id, limit=5
        )
    except Exception as exc:  # noqa: BLE001
        logger.error("Vector search failed for doc %s: %s", document.id, exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Vector search unavailable: {exc}",
        ) from exc

    if not matches:
        return ChatResponse(
            answer=(
                "I couldn't find relevant information in this document for your "
                "question. Try rephrasing or asking about something else."
            ),
            sources=[],
        )

    context = "\n\n".join(m["text"] for m in matches)
    prompt = CHAT_SYSTEM_PROMPT.format(
        context=context, question=payload.question
    )

    try:
        answer = await gemini_service.generate_text(prompt)
    except Exception as exc:  # noqa: BLE001
        logger.error("Gemini chat failed for doc %s: %s", document.id, exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"AI chat failed: {exc}",
        ) from exc

    return ChatResponse(answer=answer, sources=matches)

