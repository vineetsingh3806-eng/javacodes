"""
Authentication service — signup, login, token refresh.
"""
import logging
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_token_subject,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.auth import LoginRequest, SignupRequest, TokenResponse

logger = logging.getLogger(__name__)


class AuthService:
    """Business logic for authentication flows."""

    # ------------------------------------------------------------------
    def signup(self, db: Session, payload: SignupRequest) -> TokenResponse:
        """Create a new user account and return JWT tokens."""
        existing = (
            db.query(User).filter(User.email == payload.email.lower()).first()
        )
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists.",
            )

        user = User(
            email=payload.email.lower(),
            full_name=payload.full_name.strip(),
            hashed_password=hash_password(payload.password),
            is_active=True,
            is_verified=False,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        logger.info("New user registered: %s", user.email)

        return self._build_token_response(user)

    # ------------------------------------------------------------------
    def login(self, db: Session, payload: LoginRequest) -> TokenResponse:
        """Authenticate a user and return JWT tokens."""
        user = (
            db.query(User).filter(User.email == payload.email.lower()).first()
        )
        if not user or not verify_password(payload.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password.",
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This account has been disabled.",
            )

        return self._build_token_response(user)

    # ------------------------------------------------------------------
    def refresh(self, db: Session, refresh_token: str) -> TokenResponse:
        """Exchange a valid refresh token for a fresh token pair."""
        subject = get_token_subject(refresh_token, expected_type="refresh")
        if not subject:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token.",
            )

        user = db.query(User).filter(User.id == int(subject)).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User no longer exists.",
            )

        return self._build_token_response(user)

    # ------------------------------------------------------------------
    @staticmethod
    def get_current_user(db: Session, user_id: int) -> Optional[User]:
        """Fetch a user by id (used by dependency)."""
        return db.query(User).filter(User.id == user_id).first()

    # ------------------------------------------------------------------
    @staticmethod
    def _build_token_response(user: User) -> TokenResponse:
        """Construct a TokenResponse from a user."""
        access_token = create_access_token(
            subject=user.id, extra={"email": user.email}
        )
        refresh_token = create_refresh_token(subject=user.id)
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=user,
        )


auth_service = AuthService()

