# NexFlare Deployment Verification Script
Write-Host "🚀 Testing NexFlare Deployment..." -ForegroundColor Cyan
Write-Host ""

# Test Frontend
Write-Host "📱 Testing Frontend..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "https://nexflare-frontend.onrender.com" -UseBasicParsing -TimeoutSec 15
    Write-Host "✅ Frontend Status: $($frontendResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Backend Health
Write-Host "⚙️ Testing Backend Health..." -ForegroundColor Yellow
try {
    $backendResponse = Invoke-WebRequest -Uri "https://nexflare-backend.onrender.com/api/health" -UseBasicParsing -TimeoutSec 20
    Write-Host "✅ Backend Health: $($backendResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend Health Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Backend API
Write-Host "🎬 Testing Backend API..." -ForegroundColor Yellow
try {
    $apiResponse = Invoke-WebRequest -Uri "https://nexflare-backend.onrender.com/api/videos" -UseBasicParsing -TimeoutSec 20
    Write-Host "✅ Backend API: $($apiResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend API Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔗 Your Live URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: https://nexflare-frontend.onrender.com" -ForegroundColor White
Write-Host "   Backend:  https://nexflare-backend.onrender.com" -ForegroundColor White
Write-Host "   API:      https://nexflare-backend.onrender.com/api" -ForegroundColor White