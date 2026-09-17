#!/usr/bin/env bash
# ============================================================
# StoryLens AI — Local development launcher
# Starts backend (uvicorn) and frontend (next dev) concurrently.
# ============================================================
set -euo pipefail

cleanup() {
  echo ""
  echo "Stopping services..."
  kill 0 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "🚀 Starting StoryLens AI development environment..."

# Start backend
(cd backend && source venv/bin/activate 2>/dev/null || source venv/Scripts/activate; uvicorn app.main:app --reload --port 8000) &
BACKEND_PID=$!

# Start frontend
(cd frontend && npm run dev) &
FRONTEND_PID=$!

echo "✅ Backend running at  http://localhost:8000"
echo "✅ Frontend running at http://localhost:3000"
echo "   Press Ctrl+C to stop."

wait $BACKEND_PID $FRONTEND_PID

