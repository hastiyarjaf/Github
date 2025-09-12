@echo off
echo ========================================
echo  DebugBear Performance Dashboard
echo  Starting Full-Stack Application...
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Check if .env file exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please create .env file from .env.example
    echo.
    pause
)

echo Starting server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm start
