"""
AI generation service.

Runs the appropriate Gemini pipeline based on the requested generation
type and persists the resulting artifact as JSON.
"""
import json
import logging
from typing import Any, Dict

from app.ai.gemini import gemini_service
from app.ai import prompts
from app.core.config import settings
from app.models.document import Document
from app.models.generation import GeneratedContent
from app.schemas.generation import GenerationType

logger = logging.getLogger(__name__)

# Map generation types to their system prompts
SYSTEM_PROMPTS: Dict[GenerationType, str] = {
    GenerationType.TIMELINE: prompts.TIMELINE_SYSTEM_PROMPT,
    GenerationType.MINDMAP: prompts.MINDMAP_SYSTEM_PROMPT,
    GenerationType.QUIZ: prompts.QUIZ_SYSTEM_PROMPT,
    GenerationType.PRESENTATION: prompts.PRESENTATION_SYSTEM_PROMPT,
    GenerationType.PODCAST: prompts.PODCAST_SYSTEM_PROMPT,
}


class GenerationService:
    """Coordinates AI generation and persistence of artifacts."""

    # ------------------------------------------------------------------
    async def generate(self, document: Document, generation_type: GenerationType) -> Dict[str, Any]:
        """
        Generate an AI artifact from a document's text.

        Returns the raw JSON payload from Gemini.
        """
        if not gemini_service.is_configured():
            raise RuntimeError(
                "Gemini API is not configured. Set GEMINI_API_KEY to use AI features."
            )

        if not document.content:
            raise RuntimeError("Document has no extractable text content.")

        system_prompt = SYSTEM_PROMPTS[generation_type]
        # Keep the user prompt bounded to avoid token exhaustion
        max_chars = min(len(document.content), 30000)
        user_prompt = document.content[:max_chars]

        try:
            result = await gemini_service.generate_json(system_prompt, user_prompt)
            if "title" not in result:
                result["title"] = document.title
            return result
        except Exception as exc:  # noqa: BLE001
            logger.error("Generation failed for doc %s (%s): %s",
                         document.id, generation_type.value, exc)
            raise RuntimeError(f"AI generation failed: {exc}") from exc

    # ------------------------------------------------------------------
    async def generate_and_persist(
        self,
        db,
        document: Document,
        generation_type: GenerationType,
        title: str | None = None,
    ) -> GeneratedContent:
        """
        Generate an artifact and store it in the database.

        Creates a GeneratedContent row with status pending → completed/failed.
        """
        record = GeneratedContent(
            owner_id=document.owner_id,
            document_id=document.id,
            generation_type=generation_type.value,
            title=title or document.title,
            content_json="{}",
            status="processing",
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        try:
            payload = await self.generate(document, generation_type)
            record.content_json = json.dumps(payload)
            record.title = payload.get("title", record.title)
            record.status = "completed"
        except Exception as exc:  # noqa: BLE001
            record.status = "failed"
            record.content_json = json.dumps({"error": str(exc)})
        finally:
            db.commit()
            db.refresh(record)

        return record


generation_service = GenerationService()

