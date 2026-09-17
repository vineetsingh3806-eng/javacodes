"""
SQLAlchemy database session management.

Creates the engine bound to PostgreSQL, exposes a session factory
and a FastAPI dependency for request-scoped database sessions.
"""
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings


class Base(DeclarativeBase):
    """Declarative base class for all ORM models."""


def create_database_engine():
    """Build the SQLAlchemy engine using settings-defined connection URL."""
    return create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,  # Reconnect stale connections
        pool_size=10,
        max_overflow=20,
        echo=False,
    )


engine = create_database_engine()

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db() -> Generator:
    """
    FastAPI dependency that yields a database session.
    The session is always closed after the request completes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

