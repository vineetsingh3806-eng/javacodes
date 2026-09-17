"""
Timeline generation service.

Extracts chronological events from a document and validates the
AI-generated timeline structure before it is persisted.
"""
from typing import Any, Dict, List

from app.ai.gemini import gemini_service
from app.ai.prompts import TIMELINE_SYSTEM_PROMPT


class TimelineService:
    """Generates and validates timeline artifacts."""

    async def generate(self, content: str) -> Dict[str, Any]:
        """Generate a timeline JSON payload from document text."""
        user_prompt = content[:30000]
        result = await gemini_service.generate_json(
            TIMELINE_SYSTEM_PROMPT, user_prompt
        )
        return self._validate(result)

    @staticmethod
    def _validate(payload: Dict[str, Any]) -> Dict[str, Any]:
        """Ensure the timeline has the expected shape."""
        events = payload.get("events", [])
        if not isinstance(events, list):
            events = []
        sanitized: List[Dict[str, str]] = []
        for event in events:
            if isinstance(event, dict):
                sanitized.append(
                    {
                        "date": str(event.get("date", "")),
                        "title": str(event.get("title", "")),
                        "description": str(event.get("description", "")),
                    }
                )
        return {
            "title": str(payload.get("title", "Timeline")),
            "description": str(payload.get("description", "")),
            "events": sanitized,
        }


timeline_service = TimelineService()

