#!/bin/bash

echo "🏥 Starting EMR Development Servers..."

# Check if we're in the right directory
if [ ! -f "nx.json" ]; then
    echo "❌ Error: Please run this script from the emr-monorepo directory"
    exit 1
fi

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Starting it..."
    brew services start postgresql@14
    sleep 5
else
    echo "✅ PostgreSQL is running"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd apps/emr-backend
npx prisma generate
cd ../..

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

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
