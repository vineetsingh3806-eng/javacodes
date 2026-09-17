"""
Google Gemini AI service.

Wraps the google-generativeai SDK and LangChain integration for:
- Chat completions (document Q&A)
- JSON generation (timelines, mind maps, quizzes, presentations, podcasts)
- Embeddings (vector search via Qdrant)
"""
import json
import logging
from typing import Any, Dict, List, Optional

import google.generativeai as genai
from langchain_google_genai import (
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings,
)

from app.core.config import settings

logger = logging.getLogger(__name__)


class GeminiService:
    """Thin wrapper around Google Gemini APIs."""

    def __init__(self) -> None:
        self.api_key = settings.GEMINI_API_KEY
        self.model_name = settings.GEMINI_MODEL
        self.embedding_model = settings.GEMINI_EMBEDDING_MODEL
        self._configured = bool(self.api_key)

        if self._configured:
            genai.configure(api_key=self.api_key)
            self.chat_model = ChatGoogleGenerativeAI(
                model=self.model_name,
                api_key=self.api_key,
                temperature=0.4,
                max_tokens=4096,
            )
            self.embeddings = GoogleGenerativeAIEmbeddings(
                model=self.embedding_model,
                api_key=self.api_key,
            )
        else:
            logger.warning(
                "GEMINI_API_KEY not set — AI features will return friendly errors."
            )

    # ------------------------------------------------------------------
    def is_configured(self) -> bool:
        """Whether the Gemini client was initialized with a valid key."""
        return self._configured

    # ------------------------------------------------------------------
    async def generate_text(self, prompt: str) -> str:
        """Generate a plain-text response for a prompt."""
        if not self._configured:
            raise RuntimeError("Gemini API key is not configured.")
        response = self.chat_model.invoke(prompt)
        return response.content

    # ------------------------------------------------------------------
    async def generate_json(
        self, system_prompt: str, user_prompt: str
    ) -> Dict[str, Any]:
        """
        Generate a structured JSON object.

        Uses the underlying model with instruction to return strict JSON.
        Falls back to parsing code-fenced JSON if necessary.
        """
        if not self._configured:
            raise RuntimeError("Gemini API key is not configured.")

        full_prompt = f"{system_prompt}\n\n{user_prompt}\n\n"
        full_prompt += (
            "Respond with valid JSON only. Do not include markdown code fences, "
            "explanations, or any other text."
        )

        try:
            raw = self.chat_model.invoke(full_prompt).content
            return self._parse_json(raw)
        except Exception as exc:  # noqa: BLE001
            logger.error("Gemini JSON generation failed: %s", exc)
            raise RuntimeError(f"AI generation failed: {exc}") from exc

    @staticmethod
    def _parse_json(raw: str) -> Dict[str, Any]:
        """Robustly parse JSON from a model response."""
        raw = raw.strip()
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.strip("`")
            if raw.startswith("json"):
                raw = raw[4:]
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            # Try to extract the first {...} block
            start = raw.find("{")
            end = raw.rfind("}")
            if start != -1 and end != -1 and end > start:
                return json.loads(raw[start : end + 1])
            raise

    # ------------------------------------------------------------------
    def generate_embedding(self, text: str) -> List[float]:
        """Generate an embedding vector for a text snippet."""
        if not self._configured:
            raise RuntimeError("Gemini API key is not configured.")
        return self.embeddings.embed_query(text)

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a list of texts."""
        if not self._configured:
            raise RuntimeError("Gemini API key is not configured.")
        return self.embeddings.embed_documents(texts)


# Singleton instance
gemini_service = GeminiService()

