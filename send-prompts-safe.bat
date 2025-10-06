@echo off
setlocal EnableDelayedExpansion

echo Cargando configuracion desde .env...

:: Check if .env file exists
if not exist ".env" (
    echo Error: Archivo .env no encontrado. Crea el archivo .env con la linea: GEMINI_API_KEY=tu-api-key
    exit /b 1
)

:: Read GEMINI_API_KEY from .env file
set "GEMINI_API_KEY="
for /f "usebackq delims== tokens=1,2" %%a in (".env") do (
    if "%%a"=="GEMINI_API_KEY" set "GEMINI_API_KEY=%%b"
)

if "!GEMINI_API_KEY!"=="" (
    echo Error: No se encontro GEMINI_API_KEY en el archivo .env
    exit /b 1
) else (
    echo    ✓ API Key cargada correctamente desde .env
    set GEMINI_API_KEY=!GEMINI_API_KEY!
)

echo Leyendo archivo promptsgemini.txt...
if not exist "promptsgemini.txt" (
    echo Error: promptsgemini.txt no encontrado
    exit /b 1
)

echo Procesando prompts...
findstr /c:"---" "promptsgemini.txt" >nul
if !errorlevel! equ 0 (
    echo    Detectados separadores '---'
) else (
    echo    Sin separadores detectados, usando archivo completo
)

:: Create log directory
if not exist "geminilogs" mkdir "geminilogs"

:: Get timestamp
for /f "tokens=1-6 delims=/:. " %%a in ("%date% %time%") do (
    set "timestamp=%%c%%a%%b-%%d%%e%%f"
)
set "timestamp=!timestamp: =0!"

echo.
echo Iniciando envio de prompts a Gemini (MODO SEGURO)...
echo ========================================

:: Use PowerShell with EXTRA safety measures for quota management
powershell -Command "& { $prompts = (Get-Content 'promptsgemini.txt' -Raw) -split '(?m)^---\s*$' | Where-Object { $_.Trim().Length -gt 0 }; Write-Host \"Total de prompts encontrados: $($prompts.Count)\" -ForegroundColor Cyan; Write-Host \"⏱️ Timeout configurado: 3 minutos por prompt\" -ForegroundColor Yellow; Write-Host \"⏰ Delay entre prompts: 2 minutos\" -ForegroundColor Yellow; Write-Host \"🛡️ MODO SEGURO ACTIVADO\" -ForegroundColor Green; for ($i = 0; $i -lt $prompts.Count; $i++) { $promptNum = $i + 1; Write-Host \"`nTurno $promptNum/$($prompts.Count)\" -ForegroundColor Yellow; Write-Host \"Inicio: $(Get-Date -Format 'HH:mm:ss')\" -ForegroundColor Gray; $logFile = \"geminilogs\%timestamp%-turn$promptNum.txt\"; Write-Host \"Enviando prompt a Gemini...\" -ForegroundColor Cyan; $job = Start-Job -ScriptBlock { param($prompt) $prompt | & gemini -m gemini-1.5-flash --yolo } -ArgumentList $prompts[$i]; $completed = Wait-Job $job -Timeout 180; if ($completed) { $response = Receive-Job $job; $response | Out-File -FilePath $logFile -Encoding UTF8; Write-Host $response; Write-Host \"Respuesta guardada en: $logFile\" -ForegroundColor Gray; Write-Host \"Turno $promptNum completado\" -ForegroundColor Green; } else { Stop-Job $job; Write-Host \"⚠️ Timeout alcanzado (3 min) - pasando al siguiente prompt\" -ForegroundColor Red; \"TIMEOUT: Prompt excedió 3 minutos de ejecución`nPrompt original:`n$($prompts[$i])\" | Out-File -FilePath $logFile -Encoding UTF8; } Remove-Job $job -Force -ErrorAction SilentlyContinue; if ($i -lt ($prompts.Count - 1)) { Write-Host \"⏸️ Esperando 2 minutos antes del siguiente prompt...\" -ForegroundColor Magenta; Start-Sleep -Seconds 120; } Write-Host \"------------------------------------------------------------\" -ForegroundColor DarkGray; } }"

echo.
echo ========================================
echo ✅ Proceso completado!
echo.
echo 📁 Logs guardados en: geminilogs\
echo ⏰ Timestamp: %timestamp%
echo.
echo 💡 Para ver los logs:
echo    dir geminilogs\%timestamp%-*
echo    type geminilogs\%timestamp%-turn1.txt
echo.