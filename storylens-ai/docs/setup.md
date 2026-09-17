# StoryLens AI — Setup Guide

## Prerequisites

- [Docker](https://www.docker.com/) + Docker Compose v2
- Git
- Google AI Studio API key: <https://aistudio.google.com/app/apikey>

## Option A — Docker (recommended)

```bash
# 1. Clone the repository
git clone <repo-url> storylens-ai
cd storylens-ai

# 2. Configure environment
cp .env.example .env
# Edit .env → set GEMINI_API_KEY

# 3. Launch
docker-compose up --build
```

Access:
- Frontend → http://localhost:3000
- Backend API → http://localhost:8000
- Swagger UI → http://localhost:8000/docs
- Qdrant Dashboard → http://localhost:6333/dashboard

## Option B — Local Development

### Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env  # set DATABASE_URL, GEMINI_API_KEY
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # set NEXT_PUBLIC_API_URL
npm run dev
```

### Databases (local)

```bash
# Start infra services
docker-compose up postgres qdrant
```

## Troubleshooting

| Issue                          | Fix                                                        |
| ------------------------------ | ---------------------------------------------------------- |
| `GEMINI_API_KEY` not set       | Add key to `.env`, restart backend                         |
| Port already in use            | Change ports in `docker-compose.yml`                       |
| OCR not working                | Ensure `tesseract-ocr` installed in container/image        |
| `docker-compose up` slow first run | First build downloads images & installs deps — be patient |

