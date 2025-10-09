@echo off
echo Testing Nexflare Application...

echo.
echo [1/4] Testing Backend Health...
curl -s http://localhost:5000/health

echo.
echo [2/4] Testing Frontend...
curl -s http://localhost:3000 > nul
if %errorlevel% == 0 (
    echo ✅ Frontend is running
) else (
    echo ❌ Frontend not accessible
)

echo.
echo [3/4] Running Load Test...
node scripts/load-test.js

echo.
echo [4/4] Running Security Scan...
node scripts/security-scan.js

echo.
echo Test completed!
pause