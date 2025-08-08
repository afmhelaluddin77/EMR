#!/bin/bash

echo "🏥 Starting EMR Development Environment..."

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Starting it..."
    brew services start postgresql@14
    sleep 5
else
    echo "✅ PostgreSQL is running"
fi

# Check if database exists
echo "🗄️  Checking database..."
if ! psql -h localhost -U helal -d emr_db -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Database 'emr_db' does not exist. Creating it..."
    createdb emr_db
else
    echo "✅ Database 'emr_db' exists"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd apps/emr-backend
npx prisma generate
cd ../..

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

# Wait for user to stop
wait
