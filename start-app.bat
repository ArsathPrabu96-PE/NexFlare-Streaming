@echo off
echo Starting Nexflare Streaming Platform...

echo.
echo [1/3] Starting Backend Server...
cd backend
start cmd /k "npm run dev"

echo.
echo [2/3] Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo [3/3] Starting Frontend Server...
cd ../frontend
start cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo 🎬 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo.
pause