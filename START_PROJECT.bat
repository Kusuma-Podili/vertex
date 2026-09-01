@echo off
title VERTEX Enterprise Platform
color 0A
echo ============================================================
echo        VERTEX ENTERPRISE E-COMMERCE PLATFORM (55.6k LOC)
echo ============================================================
echo.
echo [1/2] Opening Web Browser at http://localhost:3000 ...
start http://localhost:3000
echo.
echo [2/2] Starting VERTEX Server on port 3000...
echo (Press Ctrl+C to stop the server)
echo ============================================================
echo.
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo [Fallback] Trying py server.py...
    py server.py
)
pause
