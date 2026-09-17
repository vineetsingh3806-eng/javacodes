"""
Security utilities — password hashing and JWT token management.

Uses passlib + bcrypt for password hashing and python-jose for
signed JWT access & refresh tokens.
"""
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

# Password hashing context (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a plain-text password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain-text password against a bcrypt hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_token(
    subject: str,
    token_type: str = "access",
    expires_delta: Optional[timedelta] = None,
    extra: Optional[Dict[str, Any]] = None,
) -> str:
    """
    Create a signed JWT token.

    Args:
        subject: Unique identifier of the subject (usually user id / email).
        token_type: "access" or "refresh".
        expires_delta: Optional custom expiry duration.
        extra: Additional claims to embed in the token.
    """
    if token_type == "access":
        expiry = expires_delta or timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    else:
        expiry = expires_delta or timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    now = datetime.now(timezone.utc)
    payload: Dict[str, Any] = {
        "sub": str(subject),
        "type": token_type,
        "iat": now,
        "exp": now + expiry,
    }
    if extra:
        payload.update(extra)

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_access_token(subject: str, extra: Optional[Dict[str, Any]] = None) -> str:
    """Create a short-lived access token."""
    return create_token(subject, "access", extra=extra)


def create_refresh_token(subject: str, extra: Optional[Dict[str, Any]] = None) -> str:
    """Create a long-lived refresh token."""
    return create_token(subject, "refresh", extra=extra)


def decode_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Decode and validate a JWT token.

    Returns the payload if valid, otherwise None.
    """
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return payload
    except JWTError:
        return None


def get_token_subject(token: str, expected_type: str = "access") -> Optional[str]:
    """
    Extract and verify the subject from a token.

    Ensures the token type matches the expected type (access/refresh).
    """
    payload = decode_token(token)
    if not payload or payload.get("type") != expected_type:
        return None
    return payload.get("sub")

