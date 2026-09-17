# StoryLens AI

> Turn any document into interactive stories — timelines, mind maps, quizzes, presentations, and podcasts — powered by AI.

StoryLens AI is a production-ready, full-stack AI application that ingests documents (PDF, DOCX, PPTX, images, plain text), extracts their content via OCR and document parsing, enriches it with Google Gemini via LangChain, and generates rich, interactive learning artifacts.

## ✨ Features

- 📄 **Document Ingestion** — Upload PDF, DOCX, PPTX, TXT, and image files
- 🔍 **OCR & Parsing** — Tesseract OCR, PyMuPDF, python-docx, python-pptx
- 🧠 **AI Generation** — Gemini-powered timelines, mind maps, quizzes, presentations, and podcast scripts
- 💬 **Conversational Chat** — RAG-style Q&A over your documents with Qdrant vector search
- 🔐 **Authentication** — JWT-based auth with refresh tokens
- 🌗 **Dark Mode** — Purple-blue-white glassmorphism theme, fully responsive
- 🐳 **Docker** — One-command startup with `docker-compose up`

## 🏗 Tech Stack

| Layer       | Technology                                                        |
| ----------- | ----------------------------------------------------------------- |
| Frontend    | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion     |
| Data Layer  | React Query, Axios, React Hook Form, Zod                          |
| Backend     | FastAPI, Python 3.12, SQLAlchemy, Alembic                         |
| Database    | PostgreSQL                                                       |
| Vector DB   | Qdrant                                                           |
| AI          | Google Gemini API, LangChain                                     |
| OCR/Parsing | Tesseract OCR, PyMuPDF, python-docx, python-pptx                  |
| Deploy      | Docker, Docker Compose                                           |

## 🚀 Quick Start

```bash
# 1. Clone and enter the project
cd storylens-ai

# 2. Configure environment variables
cp .env.example .env
#   → add your GEMINI_API_KEY

# 3. Run everything
docker-compose up --build
```

| Service  | URL                    |
| -------- | ---------------------- |
| Frontend | http://localhost:3000  |
| Backend  | http://localhost:8000  |
| API Docs | http://localhost:8000/docs |
| Qdrant   | http://localhost:6333  |

## 🧪 Local Development (without Docker)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
storylens-ai/
├── frontend/          # Next.js 15 application
├── backend/           # FastAPI application
├── database/          # PostgreSQL init scripts
├── docker/            # Docker-related assets
├── docs/              # Documentation
├── assets/            # Static assets (logo, images)
└── scripts/           # Utility scripts
```

## 🔑 Environment Variables

See [.env.example](.env.example) for the full list. The only variable you **must** set is `GEMINI_API_KEY`.

## 📚 Documentation

- [Architecture](docs/architecture.md)
- [API Reference](docs/api.md)
- [Setup Guide](docs/setup.md)

## 📄 License

MIT

