@echo off
echo ========================================
echo BNBU EAP Assistant - MVP Startup Script
echo ========================================
echo.

echo [1/3] Starting Backend Server...
cd backend
start cmd /k "title Backend Server && venv\Scripts\activate && python run.py"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend Server...
cd ..
start cmd /k "title Frontend Server && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Opening Browser...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo All services started!
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause >nul


