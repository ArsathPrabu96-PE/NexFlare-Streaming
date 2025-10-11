# NexFlare Deployment Monitor
# Run this every few minutes to check deployment progress

Write-Host "🔄 Monitoring NexFlare Deployment..." -ForegroundColor Cyan
Write-Host "Timestamp: $(Get-Date)" -ForegroundColor Gray
Write-Host ""

# Frontend Check
Write-Host "📱 Frontend Status:" -NoNewline
try { 
    $f = Invoke-WebRequest -Uri "https://nexflare-frontend.onrender.com" -UseBasicParsing -TimeoutSec 10
    Write-Host " ✅ LIVE ($($f.StatusCode))" -ForegroundColor Green
} catch { 
    Write-Host " ❌ DOWN" -ForegroundColor Red 
}

# Backend Health Check  
Write-Host "⚙️ Backend Health:" -NoNewline
try { 
    $h = Invoke-WebRequest -Uri "https://nexflare-backend.onrender.com/api/health" -UseBasicParsing -TimeoutSec 15
    Write-Host " ✅ LIVE ($($h.StatusCode))" -ForegroundColor Green
} catch { 
    Write-Host " ❌ DOWN" -ForegroundColor Red 
}

# API Videos Check
Write-Host "🎬 Videos API:" -NoNewline  
try { 
    $v = Invoke-WebRequest -Uri "https://nexflare-backend.onrender.com/api/videos" -UseBasicParsing -TimeoutSec 20
    Write-Host " ✅ LIVE ($($v.StatusCode))" -ForegroundColor Green
} catch { 
    Write-Host " ⚠️ DEPLOYING..." -ForegroundColor Yellow 
}

Write-Host ""
Write-Host "🌐 Live URLs:"
Write-Host "   https://nexflare-frontend.onrender.com" -ForegroundColor Cyan
Write-Host "   https://nexflare-backend.onrender.com" -ForegroundColor Cyan