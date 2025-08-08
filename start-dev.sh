#!/bin/bash

set -euo pipefail

echo "🏥 Starting EMR Development Environment..."

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
      else
        echo "⚠️ Homebrew not found. Please start PostgreSQL manually."
      fi
      ;;
    Linux)
      if command -v systemctl >/dev/null 2>&1; then
        sudo systemctl start postgresql || sudo systemctl start postgresql@14 || true
        sleep 5
      else
        echo "⚠️ systemctl not available."
      fi
      ;;
    *)
      echo "⚠️ Unsupported OS for automatic Postgres start."
      ;;
  esac

  if ! (command -v pg_isready >/dev/null 2>&1 && pg_isready -h localhost -p 5432 >/dev/null 2>&1); then
    echo "🐳 Trying Dockerized PostgreSQL..."
    if command -v docker >/dev/null 2>&1; then
      docker run --name emr-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=emr_db -p 5432:5432 -d postgres:14 || true
      echo "⏳ Waiting for Dockerized PostgreSQL to be ready..."
      sleep 10
    else
      echo "❌ Docker not available. Please start PostgreSQL manually on port 5432."
    fi
  fi
}

ensure_database() {
  echo "🗄️  Checking database..."
  if psql -h localhost -U postgres -d emr_db -c "SELECT 1;" >/dev/null 2>&1; then
    echo "✅ Database 'emr_db' exists"
  else
    echo "❌ Database 'emr_db' does not exist. Creating it..."
    createdb -h localhost -U postgres emr_db || true
  fi
}

start_postgres
ensure_database || true

# Generate Prisma client
if [ -d "apps/emr-backend" ]; then
  echo "🔧 Generating Prisma client..."
  (cd apps/emr-backend && npx prisma generate)
fi

# Start backend
echo "🚀 Starting backend server..."
npx nx serve emr-backend &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 10

# Start frontend
echo "🎨 Starting frontend server..."
npx nx serve emr-frontend &
FRONTEND_PID=$!

echo "✅ Development servers started!"
echo "📱 Frontend: http://localhost:4200"
echo "🔧 Backend: http://localhost:3000"
echo "🗄️  Database: PostgreSQL on localhost:5432"
echo ""
echo "Press Ctrl+C to stop all servers"

wait
