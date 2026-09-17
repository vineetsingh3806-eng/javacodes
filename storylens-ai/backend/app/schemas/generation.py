"""
Generation & chat Pydantic schemas.
"""
from datetime import datetime
from enum import Enum
from typing import Any, List, Optional

from pydantic import BaseModel, ConfigDict


class GenerationType(str, Enum):
    """Supported AI generation artifact types."""

    TIMELINE = "timeline"
    MINDMAP = "mindmap"
    QUIZ = "quiz"
    PRESENTATION = "presentation"
    PODCAST = "podcast"


class GenerationCreateRequest(BaseModel):
    """Payload for requesting an AI generation from a document."""

    document_id: int
    generation_type: GenerationType
    title: Optional[str] = None


class GenerationResponse(BaseModel):
    """Stored AI-generated artifact."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    document_id: int
    generation_type: str
    title: str
    content_json: str
    status: str
    created_at: Optional[datetime] = None


class ChatRequest(BaseModel):
    """Payload for a chat question over a document."""

    document_id: int
    question: str


class ChatResponse(BaseModel):
    """AI answer plus supporting sources."""

    answer: str
    sources: List[Any] = []

