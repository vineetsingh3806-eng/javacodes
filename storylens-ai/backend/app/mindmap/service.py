"""
Mind map generation service.

Builds hierarchical knowledge structures from a document and validates
the node graph before persistence.
"""
from typing import Any, Dict, List

from app.ai.gemini import gemini_service
from app.ai.prompts import MINDMAP_SYSTEM_PROMPT


class MindMapService:
    """Generates and validates mind map artifacts."""

    async def generate(self, content: str) -> Dict[str, Any]:
        """Generate a mind map JSON payload from document text."""
        user_prompt = content[:30000]
        result = await gemini_service.generate_json(
            MINDMAP_SYSTEM_PROMPT, user_prompt
        )
        return self._validate(result)

    @staticmethod
    def _validate(payload: Dict[str, Any]) -> Dict[str, Any]:
        """Ensure the mind map has a valid root + node graph."""
        nodes = payload.get("nodes", [])
        if not isinstance(nodes, list):
            nodes = []
        sanitized: List[Dict[str, str]] = []
        for node in nodes:
            if isinstance(node, dict):
                sanitized.append(
                    {
                        "id": str(node.get("id", "")),
                        "label": str(node.get("label", "")),
                        "parent_id": str(node.get("parent_id", "root")),
                        "description": str(node.get("description", "")),
                    }
                )
        central = payload.get("central_node", {"id": "root", "label": "Root"})
        return {
            "title": str(payload.get("title", "Mind Map")),
            "central_node": central,
            "nodes": sanitized,
        }


mindmap_service = MindMapService()

