"""
Validation helpers — shared patterns for request validation.
"""
from pathlib import Path
from typing import Set


def validate_file_extension(filename: str, allowed: Set[str]) -> bool:
    """Return True if the file extension is in the allowed set."""
    ext = Path(filename).suffix.lower()
    return ext in allowed


def truncate_text(text: str, max_length: int = 30000) -> str:
    """Truncate text while preserving whole words."""
    if len(text) <= max_length:
        return text
    return text[:max_length].rsplit(" ", 1)[0]

