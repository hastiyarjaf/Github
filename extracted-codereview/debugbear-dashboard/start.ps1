#!/usr/bin/env pwsh

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " DebugBear Performance Dashboard" -ForegroundColor Yellow
Write-Host " Starting Full-Stack Application..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "WARNING: .env file not found!" -ForegroundColor Red
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Please edit .env file and add your API keys" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue"
}

Write-Host "Starting server on " -NoNewline
Write-Host "http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Open browser after 3 seconds
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:5000"
} | Out-Null

# Start the server
npm start
