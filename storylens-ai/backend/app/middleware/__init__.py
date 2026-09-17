"""Custom ASGI middleware for StoryLens AI backend."""
from app.middleware.request_logging import RequestLoggingMiddleware

__all__ = ["RequestLoggingMiddleware"]
