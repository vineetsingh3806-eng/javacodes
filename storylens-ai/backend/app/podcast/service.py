"""
Podcast script generation service.

Creates a host/guest conversational script from a document and
validates the dialogue segments before persistence.
"""
from typing import Any, Dict, List

from app.ai.gemini import gemini_service
from app.ai.prompts import PODCAST_SYSTEM_PROMPT


class PodcastService:
    """Generates and validates podcast script artifacts."""

    async def generate(self, content: str) -> Dict[str, Any]:
        """Generate a podcast script JSON payload from document text."""
        user_prompt = content[:30000]
        result = await gemini_service.generate_json(PODCAST_SYSTEM_PROMPT, user_prompt)
        return self._validate(result)

    @staticmethod
    def _validate(payload: Dict[str, Any]) -> Dict[str, Any]:
        """Ensure the script has well-formed speaker segments."""
        segments = payload.get("segments", [])
        if not isinstance(segments, list):
            segments = []
        sanitized: List[Dict[str, str]] = []
        for segment in segments:
            if not isinstance(segment, dict):
                continue
            speaker = str(segment.get("speaker", "host"))
            if speaker not in ("host", "guest"):
                speaker = "host"
            sanitized.append(
                {
                    "speaker": speaker,
                    "text": str(segment.get("text", "")),
                }
            )
        return {
            "title": str(payload.get("title", "Podcast")),
            "description": str(payload.get("description", "")),
            "segments": sanitized,
        }


podcast_service = PodcastService()

