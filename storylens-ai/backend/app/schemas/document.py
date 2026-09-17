"""
Document Pydantic schemas.
"""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field


class DocumentResponse(BaseModel):
    """Representation of an uploaded document."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    filename: str
    file_type: str
    file_size: int
    status: str
    error_message: Optional[str] = ""
    created_at: Optional[datetime] = None


class DocumentListResponse(BaseModel):
    """Paginated list of documents."""

    items: List[DocumentResponse]
    total: int
    page: int
    page_size: int


class UploadResponse(BaseModel):
    """Response returned immediately after a file upload."""

    document: DocumentResponse
    message: str = Field(
        default="Document uploaded successfully. Processing in background."
    )

