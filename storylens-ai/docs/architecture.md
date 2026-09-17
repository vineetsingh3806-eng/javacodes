# StoryLens AI — Architecture

## Overview

StoryLens AI is a full-stack, AI-powered document intelligence platform. Users upload documents and receive interactive learning artifacts: timelines, mind maps, quizzes, presentations, and podcast scripts.

## System Components

```
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│   Frontend     │      │    Backend     │      │   Databases    │
│  Next.js 15    │─────▶│    FastAPI     │─────▶│  PostgreSQL    │
│  React 19      │ HTTP │   Python 3.12  │      │  Qdrant        │
└────────────────┘      └───────┬────────┘      └────────────────┘
                               │
                        ┌──────▼────────┐
                        │  AI Services   │
                        │  Gemini + LC   │
                        │  OCR + Parsers │
                        └───────────────┘
```

### Frontend (`frontend/`)
- Next.js App Router with React 19
- Tailwind CSS (purple-blue-white glassmorphism theme, dark mode)
- Framer Motion animations
- React Query for server-state management
- Axios HTTP client with JWT interceptor
- React Hook Form + Zod for forms

### Backend (`backend/`)
- FastAPI with modular routers (`/api/v1`)
- SQLAlchemy 2.0 ORM + Alembic migrations
- JWT authentication (access + refresh tokens)
- Background document processing pipeline
- AI generation pipelines via LangChain + Gemini
- Tesseract OCR for images, PyMuPDF/docx/pptx parsers

### Data Layer
- **PostgreSQL** — relational data (users, documents, chunks, generations)
- **Qdrant** — vector embeddings for semantic search (RAG chat)

## Request Flow (Document Upload)

1. Frontend uploads file → `POST /api/v1/documents/upload`
2. Backend validates type/size, stores file, creates DB row
3. Background `DocumentProcessor` extracts text, chunks it, embeds & indexes into Qdrant
4. Document status transitions: `processing → indexing → ready`
5. Frontend polls status; when `ready`, AI features unlock

## AI Generation Flow

1. Frontend requests `POST /api/v1/generations`
2. Backend loads document text, truncates to context window
3. LangChain/Gemini generates structured JSON per prompt template
4. Result persisted as `GeneratedContent` (status: `completed`/`failed`)
5. Frontend renders artifact (timeline, mindmap, quiz, slides, podcast)

## Chat (RAG) Flow

1. Frontend sends question → `POST /api/v1/chat`
2. Backend embeds question, queries Qdrant for top-5 relevant chunks
3. Gemini answers grounded on retrieved context (citations/sources returned)

## Security

- JWT bearer auth on all protected routes
- bcrypt password hashing
- CORS restricted to configured origins
- Per-user data scoping enforced in every query

