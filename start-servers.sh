#!/bin/bash

set -euo pipefail

echo "🏥 Starting EMR Development Servers..."

if [ ! -f "nx.json" ]; then
  echo "❌ Error: Please run this script from the repository root"
  exit 1
fi

start_postgres() {
  echo "📊 Checking PostgreSQL..."
  if command -v pg_isready >/dev/null 2>&1 && pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
    echo "✅ PostgreSQL is running"
    return
  fi

  echo "❌ PostgreSQL is not running. Attempting to start..."

  case "$(uname -s)" in
    Darwin)
      if command -v brew >/dev/null 2>&1; then
        brew services start postgresql@14 || true
        sleep 5
      fi
      ;;
    Linux)
      if command -v systemctl >/dev/null 2>&1; then
        sudo systemctl start postgresql || sudo systemctl start postgresql@14 || true
        sleep 5
      fi
      ;;
  esac

  if ! (command -v pg_isready >/dev/null 2>&1 && pg_isready -h localhost -p 5432 >/dev/null 2>&1); then
    echo "🐳 Trying Dockerized PostgreSQL..."
    if command -v docker >/dev/null 2>&1; then
      docker run --name emr-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=emr_db -p 5432:5432 -d postgres:14 || true
      echo "⏳ Waiting for Dockerized PostgreSQL to be ready..."
      sleep 10
    else
      echo "⚠️ Docker not available. Please start PostgreSQL manually on port 5432."
    fi
  fi
}

start_postgres

# Generate Prisma client
if [ -d "apps/emr-backend" ]; then
  echo "🔧 Generating Prisma client..."
  (cd apps/emr-backend && npx prisma generate)
fi

# Start backend in background
echo "🚀 Starting backend server..."
npx nx serve emr-backend &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 15

# Start frontend in background
echo "🎨 Starting frontend server..."
npx nx serve emr-frontend &
FRONTEND_PID=$!

echo ""
echo "✅ Development servers are starting!"
echo "📱 Frontend: http://localhost:4200 (may take a moment to start)"
echo "🔧 Backend: http://localhost:3000 (may take a moment to start)"
echo "🗄️  Database: PostgreSQL on localhost:5432"
echo ""
echo "Press Ctrl+C to stop all servers"

cleanup() {
  echo ""
  echo "🛑 Stopping servers..."
  kill $BACKEND_PID 2>/dev/null || true
  kill $FRONTEND_PID 2>/dev/null || true
  echo "✅ Servers stopped"
  exit 0
}

trap cleanup SIGINT SIGTERM

wait
