@echo off
title VERTEX Automated Test Suite
color 0B
echo ============================================================
echo      RUNNING 212 AUTOMATED TESTS FOR VERTEX PLATFORM
echo ============================================================
echo.
python run_tests.py
if %ERRORLEVEL% NEQ 0 (
    echo [Fallback] Trying py run_tests.py...
    py run_tests.py
)
echo.
echo ============================================================
pause
