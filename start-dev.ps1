Param(
  [string]$PostgresPassword = "postgres",
  [string]$Database = "emr_db"
)

Write-Host "🏥 Starting EMR Development Environment (Windows PowerShell)"

function Ensure-DockerPostgres {
  Write-Host "📊 Checking PostgreSQL (Docker)..."
  $container = docker ps -a --filter "name=emr-postgres" --format "{{.Names}}" 2>$null
  if (-not $container) {
    Write-Host "🐳 Starting Dockerized PostgreSQL..."
    docker run --name emr-postgres -e POSTGRES_PASSWORD=$PostgresPassword -e POSTGRES_DB=$Database -p 5432:5432 -d postgres:14 | Out-Null
    Start-Sleep -Seconds 10
  } else {
    $running = docker ps --filter "name=emr-postgres" --format "{{.Names}}" 2>$null
    if (-not $running) {
      Write-Host "🐳 Starting existing PostgreSQL container..."
      docker start emr-postgres | Out-Null
      Start-Sleep -Seconds 5
    } else {
      Write-Host "✅ PostgreSQL container is running"
    }
  }
}

Ensure-DockerPostgres

Write-Host "🔧 Generating Prisma client..."
Push-Location apps/emr-backend
npx prisma generate
Pop-Location

Write-Host "🚀 Starting backend server..."
Start-Process -FilePath "npx" -ArgumentList "nx", "serve", "emr-backend" -WindowStyle Minimized
Start-Sleep -Seconds 10

Write-Host "🎨 Starting frontend server..."
Start-Process -FilePath "npx" -ArgumentList "nx", "serve", "emr-frontend" -WindowStyle Minimized

Write-Host "✅ Servers starting"
Write-Host "📱 Frontend: http://localhost:4200"
Write-Host "🔧 Backend: http://localhost:3000"