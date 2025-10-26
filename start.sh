#!/bin/bash

echo "========================================"
echo "BNBU EAP Assistant - MVP Startup Script"
echo "========================================"
echo ""

echo "[1/3] Starting Backend Server..."
cd backend
source venv/bin/activate
python run.py &
BACKEND_PID=$!
cd ..
sleep 3

echo "[2/3] Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!
sleep 5

echo "[3/3] Opening Browser..."
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000
elif command -v open > /dev/null; then
    open http://localhost:3000
fi

echo ""
echo "========================================"
echo "All services started!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo "========================================"

# 等待中断
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait


