"""
Application configuration for StoryLens AI backend.

Loads environment variables via Pydantic Settings and exposes
typed, validated settings throughout the application.
"""
from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Typed application settings loaded from environment / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # --- App ---
    PROJECT_NAME: str = "StoryLens AI"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Turn any document into interactive stories powered by AI."
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"
    FRONTEND_URL: str = "http://localhost:3000"
    BACKEND_URL: str = "http://localhost:8000"

    # --- Security / JWT ---
    SECRET_KEY: str = "change-me-to-a-long-random-secret-key-32-bytes-minimum"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # --- PostgreSQL ---
    POSTGRES_USER: str = "storylens"
    POSTGRES_PASSWORD: str = "storylens_password"
    POSTGRES_DB: str = "storylens"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    DATABASE_URL: str = (
        "postgresql+psycopg2://storylens:storylens_password@localhost:5432/storylens"
    )

    # --- Qdrant Vector DB ---
    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_COLLECTION: str = "storylens_documents"
    QDRANT_EMBEDDING_MODEL: str = "text-embedding-004"

    # --- Google Gemini AI ---
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-pro"
    GEMINI_EMBEDDING_MODEL: str = "text-embedding-004"

    # --- OCR ---
    TESSERACT_CMD: str = "/usr/bin/tesseract"

    # --- CORS ---
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    # --- Uploads ---
    MAX_UPLOAD_SIZE_MB: int = 25
    UPLOAD_DIR: str = "uploads"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value):
        """Allow CORS_ORIGINS to be passed as a JSON-encoded string."""
        if isinstance(value, str) and value.startswith("["):
            import json

            return json.loads(value)
        return value

    @field_validator("DATABASE_URL", mode="after")
    @classmethod
    def ensure_database_url(cls, value: str) -> str:
        """Build a correct DATABASE_URL if the raw one is not overridden."""
        return value


@lru_cache
def get_settings() -> Settings:
    """Return cached application settings (avoids re-parsing env each call)."""
    return Settings()


# Convenience singleton used across modules
settings = get_settings()

