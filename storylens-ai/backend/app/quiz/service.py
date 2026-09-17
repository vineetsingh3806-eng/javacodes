"""
Quiz generation service.

Creates comprehension quizzes with multiple-choice questions and
validates option/correct-answer integrity before persistence.
"""
from typing import Any, Dict, List

from app.ai.gemini import gemini_service
from app.ai.prompts import QUIZ_SYSTEM_PROMPT


class QuizService:
    """Generates and validates quiz artifacts."""

    async def generate(self, content: str) -> Dict[str, Any]:
        """Generate a quiz JSON payload from document text."""
        user_prompt = content[:30000]
        result = await gemini_service.generate_json(QUIZ_SYSTEM_PROMPT, user_prompt)
        return self._validate(result)

    @staticmethod
    def _validate(payload: Dict[str, Any]) -> Dict[str, Any]:
        """Sanitize questions, ensuring 4 options and a valid answer index."""
        questions = payload.get("questions", [])
        if not isinstance(questions, list):
            questions = []
        sanitized: List[Dict[str, Any]] = []
        for q in questions:
            if not isinstance(q, dict):
                continue
            options = q.get("options", [])
            if not isinstance(options, list):
                options = []
            options = [str(o) for o in options[:4]]
            while len(options) < 4:
                options.append("Not provided")
            correct = int(q.get("correct_index", 0))
            if correct < 0 or correct >= len(options):
                correct = 0
            sanitized.append(
                {
                    "question": str(q.get("question", "")),
                    "options": options,
                    "correct_index": correct,
                    "explanation": str(q.get("explanation", "")),
                }
            )
        return {
            "title": str(payload.get("title", "Quiz")),
            "questions": sanitized,
        }


quiz_service = QuizService()

