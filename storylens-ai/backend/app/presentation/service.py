"""
Presentation generation service.

Builds a slide deck (titles, bullets, speaker notes) from a document
and validates the deck structure before persistence.
"""
from typing import Any, Dict, List

from app.ai.gemini import gemini_service
from app.ai.prompts import PRESENTATION_SYSTEM_PROMPT


class PresentationService:
    """Generates and validates presentation artifacts."""

    async def generate(self, content: str) -> Dict[str, Any]:
        """Generate a slide deck JSON payload from document text."""
        user_prompt = content[:30000]
        result = await gemini_service.generate_json(
            PRESENTATION_SYSTEM_PROMPT, user_prompt
        )
        return self._validate(result)

    @staticmethod
    def _validate(payload: Dict[str, Any]) -> Dict[str, Any]:
        """Ensure the deck has valid slides with bullets + speaker notes."""
        slides = payload.get("slides", [])
        if not isinstance(slides, list):
            slides = []
        sanitized: List[Dict[str, Any]] = []
        for slide in slides:
            if not isinstance(slide, dict):
                continue
            bullets = slide.get("bullets", [])
            if not isinstance(bullets, list):
                bullets = []
            sanitized.append(
                {
                    "title": str(slide.get("title", "")),
                    "subtitle": str(slide.get("subtitle", "")),
                    "bullets": [str(b) for b in bullets],
                    "speaker_notes": str(slide.get("speaker_notes", "")),
                }
            )
        return {
            "title": str(payload.get("title", "Presentation")),
            "slides": sanitized,
        }


presentation_service = PresentationService()

