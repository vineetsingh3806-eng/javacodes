"""
Document processing pipeline.

Extracts text from an uploaded file, chunks it, indexes it into
Qdrant, and updates the document status in the database.
"""
import json
import logging

from app.database.session import SessionLocal
from app.models.document import Document, DocumentChunk
from app.parser.service import document_parser
from app.services.vectorstore import vector_store

logger = logging.getLogger(__name__)


class DocumentProcessor:
    """Handles the full post-upload processing lifecycle."""

    # ------------------------------------------------------------------
    async def process(self, document_id: int, file_path: str, ext: str) -> None:
        """
        Process a document asynchronously:
        1. Extract raw text
        2. Store text in the DB
        3. Chunk the text
        4. Embed & index chunks into Qdrant
        """
        db = SessionLocal()
        try:
            document = db.query(Document).filter(Document.id == document_id).first()
            if not document:
                logger.warning("Document %s not found during processing.", document_id)
                return

            # 1. Extract text
            try:
                text = document_parser.extract_text(file_path)
                if not text:
                    raise ValueError("No text could be extracted from this file.")
            except Exception as exc:  # noqa: BLE001
                logger.error("Text extraction failed for doc %s: %s", document_id, exc)
                document.status = "failed"
                document.error_message = f"Text extraction failed: {exc}"
                db.commit()
                return

            document.content = text
            document.status = "indexing"
            db.commit()

            # 2. Chunk text
            chunks = document_parser.chunk_text(text)

            # 3. Delete stale chunks (if reprocessing)
            db.query(DocumentChunk).filter(
                DocumentChunk.document_id == document_id
            ).delete()
            db.flush()

            # 4. Index into vector store & persist chunk metadata
            try:
                vector_ids = vector_store.upsert_document_chunks(
                    document_id=document_id,
                    chunks=chunks,
                    metadata={"filename": document.filename},
                )
            except Exception as exc:  # noqa: BLE001
                logger.error("Vector indexing failed for doc %s: %s", document_id, exc)
                document.status = "failed"
                document.error_message = f"Vector indexing failed: {exc}"
                db.commit()
                return

            for idx, (chunk, vector_id) in enumerate(zip(chunks, vector_ids)):
                db.add(
                    DocumentChunk(
                        document_id=document_id,
                        chunk_index=idx,
                        content=chunk,
                        metadata_json=json.dumps(
                            {"filename": document.filename}
                        ),
                        vector_id=vector_id,
                    )
                )

            document.status = "ready"
            db.commit()
            logger.info("Document %s processed successfully (%d chunks).", document_id, len(chunks))

        except Exception as exc:  # noqa: BLE001
            logger.error("Unexpected processing error for doc %s: %s", document_id, exc)
            db.rollback()
        finally:
            db.close()


document_processor = DocumentProcessor()

