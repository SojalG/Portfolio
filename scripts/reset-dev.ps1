$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $PSScriptRoot

Write-Host "Stopping Node processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

$nextPath = Join-Path $workspace ".next"
if (Test-Path $nextPath) {
  Write-Host "Removing stale .next cache..."
  attrib -R "$nextPath\*" /S /D | Out-Null
  Remove-Item -LiteralPath $nextPath -Recurse -Force
}

Write-Host "Starting Next.js dev server..."
Set-Location $workspace
npm.cmd run dev
