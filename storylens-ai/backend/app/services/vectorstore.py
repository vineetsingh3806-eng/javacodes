"""
Qdrant vector store service.

Manages the Qdrant collection lifecycle and provides vector search
for RAG-based document chat.
"""
import logging
import uuid
from typing import Any, Dict, List, Optional

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    PointStruct,
    VectorParams,
)

from app.ai.gemini import gemini_service
from app.core.config import settings

logger = logging.getLogger(__name__)


class VectorStoreService:
    """Wrapper around the Qdrant client."""

    def __init__(self) -> None:
        self.client = QdrantClient(url=settings.QDRANT_URL)
        self.collection = settings.QDRANT_COLLECTION
        self.embedding_model = settings.QDRANT_EMBEDDING_MODEL
        self._ensure_collection()

    # ------------------------------------------------------------------
    def _ensure_collection(self) -> None:
        """Create the collection if it does not already exist."""
        try:
            collections = self.client.get_collections().collections
            if not any(c.name == self.collection for c in collections):
                self.client.create_collection(
                    collection_name=self.collection,
                    vectors_config=VectorParams(
                        size=768, distance=Distance.COSINE
                    ),
                )
                logger.info("Created Qdrant collection '%s'", self.collection)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Could not initialize Qdrant collection: %s", exc)

    # ------------------------------------------------------------------
    def upsert_document_chunks(
        self,
        document_id: int,
        chunks: List[str],
        metadata: Optional[Dict[str, Any]] = None,
    ) -> List[str]:
        """
        Embed and store document chunks in Qdrant.

        Returns the list of generated vector IDs.
        """
        if not chunks:
            return []

        vectors = gemini_service.embed_documents(chunks)
        points: List[PointStruct] = []
        vector_ids: List[str] = []

        for idx, (chunk, vector) in enumerate(zip(chunks, vectors)):
            vector_id = f"doc_{document_id}_chunk_{idx}_{uuid.uuid4().hex[:8]}"
            payload: Dict[str, Any] = {
                "document_id": document_id,
                "chunk_index": idx,
                "text": chunk,
            }
            if metadata:
                payload.update(metadata)

            points.append(
                PointStruct(id=vector_id, vector=vector, payload=payload)
            )
            vector_ids.append(vector_id)

        self.client.upsert(
            collection_name=self.collection,
            points=points,
        )
        return vector_ids

    # ------------------------------------------------------------------
    def search(
        self, query: str, document_id: int, limit: int = 5, score_threshold: float = 0.3
    ) -> List[Dict[str, Any]]:
        """
        Semantic search over a single document's chunks.

        Returns a list of dicts with text, chunk_index and score.
        """
        query_vector = gemini_service.generate_embedding(query)
        results = self.client.query_points(
            collection_name=self.collection,
            query=query_vector,
            query_filter=None,
            limit=limit,
            score_threshold=score_threshold,
        ).points

        # Filter to the requested document in Python to avoid complex filters
        matches = []
        for point in results:
            payload = point.payload or {}
            if payload.get("document_id") != document_id:
                continue
            matches.append(
                {
                    "text": payload.get("text", ""),
                    "chunk_index": payload.get("chunk_index", 0),
                    "score": round(point.score, 4),
                }
            )
        return matches

    # ------------------------------------------------------------------
    def delete_document_chunks(self, document_id: int) -> None:
        """Delete all vectors belonging to a document."""
        try:
            points = self.client.scroll(
                collection_name=self.collection,
                scroll_filter=None,
                limit=1000,
            )[0]
            ids_to_delete = [
                point.id
                for point in points
                if (point.payload or {}).get("document_id") == document_id
            ]
            if ids_to_delete:
                self.client.delete(
                    collection_name=self.collection,
                    points_selector=ids_to_delete,
                )
        except Exception as exc:  # noqa: BLE001
            logger.warning("Failed to delete chunks for doc %s: %s", document_id, exc)


vector_store = VectorStoreService()

