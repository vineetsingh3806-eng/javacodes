#!/usr/bin/env bash
# ============================================================
# StoryLens AI — One-shot project setup script
# ============================================================
set -euo pipefail

echo "🚀 Setting up StoryLens AI..."

# 1. Environment configuration
if [ ! -f ".env" ]; then
  echo "📝 Creating .env from .env.example..."
  cp .env.example .env
  echo "⚠️  IMPORTANT: Add your GEMINI_API_KEY to .env"
else
  echo "✅ .env already exists — skipping"
fi

# 2. Install backend dependencies
echo "🐍 Setting up backend..."
cd backend
python -m venv venv 2>/dev/null || true
# shellcheck disable=SC1091
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate
pip install --upgrade pip -q
pip install -r requirements.txt -q
cd ..

# 3. Install frontend dependencies
echo "⚛️  Setting up frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
  npm install
else
  echo "✅ node_modules present — skipping install"
fi
cd ..

# 4. Start databases (PostgreSQL + Qdrant)
echo "🐳 Starting infrastructure services..."
docker-compose up -d postgres qdrant

# 5. Run migrations
echo "🗄️  Running database migrations..."
cd backend
alembic upgrade head
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Add your GEMINI_API_KEY to .env"
echo "  2. Start the backend:  uvicorn app.main:app --reload  (in backend/)"
echo "  3. Start the frontend: npm run dev                     (in frontend/)"

