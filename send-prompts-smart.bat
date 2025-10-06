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
echo Iniciando envio de prompts a Gemini (MODO INTELIGENTE)...
echo ========================================

:: Create PowerShell script file to avoid command line escaping issues
echo Creating temporary PowerShell script...
echo $prompts = (Get-Content 'promptsgemini.txt' -Raw) -split '(?m)^---\s*$' ^| Where-Object { $_.Trim().Length -gt 0 } > temp_smart_script.ps1
echo Write-Host "Total de prompts encontrados: $($prompts.Count)" -ForegroundColor Cyan >> temp_smart_script.ps1
echo Write-Host "🤖 Modelo: gemini-2.5-pro" -ForegroundColor Yellow >> temp_smart_script.ps1
echo Write-Host "🧠 Detección inteligente de errores de cuota" -ForegroundColor Green >> temp_smart_script.ps1
echo Write-Host "⏰ Espera automática: 5 minutos en caso de error 429" -ForegroundColor Yellow >> temp_smart_script.ps1
echo Write-Host "🔄 Reintentos automáticos habilitados" -ForegroundColor Green >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo for ($i = 0; $i -lt $prompts.Count; $i++) { >> temp_smart_script.ps1
echo     $promptNum = $i + 1 >> temp_smart_script.ps1
echo     $success = $false >> temp_smart_script.ps1
echo     $retryCount = 0 >> temp_smart_script.ps1
echo     $maxRetries = 3 >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo     while (-not $success -and $retryCount -lt $maxRetries) { >> temp_smart_script.ps1
echo         if ($retryCount -gt 0) { >> temp_smart_script.ps1
echo             Write-Host "`n🔄 Reintento $retryCount/$maxRetries para turno $promptNum" -ForegroundColor Yellow >> temp_smart_script.ps1
echo         } else { >> temp_smart_script.ps1
echo             Write-Host "`nTurno $promptNum/$($prompts.Count)" -ForegroundColor Yellow >> temp_smart_script.ps1
echo         } >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo         Write-Host "Inicio: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray >> temp_smart_script.ps1
echo         $logFile = "geminilogs\%timestamp%-turn$promptNum.txt" >> temp_smart_script.ps1
echo         if ($retryCount -gt 0) { >> temp_smart_script.ps1
echo             $logFile = "geminilogs\%timestamp%-turn$promptNum-retry$retryCount.txt" >> temp_smart_script.ps1
echo         } >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo         Write-Host "Enviando prompt a Gemini..." -ForegroundColor Cyan >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo         try { >> temp_smart_script.ps1
echo             $tempFile = [System.IO.Path]::GetTempFileName() >> temp_smart_script.ps1
echo             $contextHeader = "CONTEXTO IMPORTANTE DEL PROYECTO:`n=================================`nDirectorio de trabajo actual: %CD%`nRuta base del proyecto: %CD%`n`nIMPORTANTE: Todos los archivos deben crearse ÚNICAMENTE en la ruta base del proyecto.`nNO crear archivos en C:/Users/usuario/Documents/src/ ni en otras ubicaciones.`nUSAR SIEMPRE rutas relativas desde el directorio del proyecto.`n`nEjemplo correcto: src/features/agente-marketing/components/...`nEjemplo INCORRECTO: C:/Users/usuario/Documents/src/features/...`n`n--- PROMPT ORIGINAL ---`n" >> temp_smart_script.ps1
echo             $fullPrompt = $contextHeader + $prompts[$i] >> temp_smart_script.ps1
echo             $fullPrompt ^| Out-File -FilePath $tempFile -Encoding UTF8 >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo             $job = Start-Job -ScriptBlock { >> temp_smart_script.ps1
echo                 param($inputFile) >> temp_smart_script.ps1
echo                 $content = Get-Content $inputFile -Raw >> temp_smart_script.ps1
echo                 $content ^| ^& gemini -m gemini-2.5-pro --yolo 2^>^&1 >> temp_smart_script.ps1
echo             } -ArgumentList $tempFile >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo             $completed = Wait-Job $job -Timeout 300 >> temp_smart_script.ps1
echo             if ($completed) { >> temp_smart_script.ps1
echo                 $result = Receive-Job $job >> temp_smart_script.ps1
echo                 $resultString = $result -join "`n" >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo                 if ($resultString -match "429^|quota^|exceeded^|rate.*limit^|RESOURCE_EXHAUSTED") { >> temp_smart_script.ps1
echo                     Write-Host "❌ Error de cuota detectado (429)" -ForegroundColor Red >> temp_smart_script.ps1
echo                     $resultString ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_smart_script.ps1
echo                     if ($retryCount -lt ($maxRetries - 1)) { >> temp_smart_script.ps1
echo                         Write-Host "⏳ Esperando 5 minutos antes del siguiente intento..." -ForegroundColor Magenta >> temp_smart_script.ps1
echo                         Start-Sleep -Seconds 300 >> temp_smart_script.ps1
echo                         $retryCount++ >> temp_smart_script.ps1
echo                     } else { >> temp_smart_script.ps1
echo                         Write-Host "⚠️ Máximo de reintentos alcanzado. Pasando al siguiente prompt." -ForegroundColor Red >> temp_smart_script.ps1
echo                         "MAX_RETRIES_REACHED: Error de cuota persistente después de $maxRetries intentos`nÚltima respuesta:`n$resultString" ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_smart_script.ps1
echo                         $success = $true >> temp_smart_script.ps1
echo                     } >> temp_smart_script.ps1
echo                 } else { >> temp_smart_script.ps1
echo                     Write-Host "✅ Respuesta exitosa recibida" -ForegroundColor Green >> temp_smart_script.ps1
echo                     $resultString ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_smart_script.ps1
echo                     Write-Host $resultString >> temp_smart_script.ps1
echo                     Write-Host "Respuesta guardada en: $logFile" -ForegroundColor Gray >> temp_smart_script.ps1
echo                     Write-Host "Turno $promptNum completado" -ForegroundColor Green >> temp_smart_script.ps1
echo                     $success = $true >> temp_smart_script.ps1
echo                 } >> temp_smart_script.ps1
echo             } else { >> temp_smart_script.ps1
echo                 Stop-Job $job >> temp_smart_script.ps1
echo                 Write-Host "⏰ Timeout alcanzado (5 min)" -ForegroundColor Yellow >> temp_smart_script.ps1
echo                 "TIMEOUT: Prompt excedió 5 minutos de ejecución`nPrompt original:`n$($prompts[$i])" ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_smart_script.ps1
echo                 if ($retryCount -lt ($maxRetries - 1)) { >> temp_smart_script.ps1
echo                     Write-Host "⏳ Esperando 30 segundos antes del siguiente intento..." -ForegroundColor Magenta >> temp_smart_script.ps1
echo                     Start-Sleep -Seconds 30 >> temp_smart_script.ps1
echo                     $retryCount++ >> temp_smart_script.ps1
echo                 } else { >> temp_smart_script.ps1
echo                     $success = $true >> temp_smart_script.ps1
echo                 } >> temp_smart_script.ps1
echo             } >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo             Remove-Job $job -Force -ErrorAction SilentlyContinue >> temp_smart_script.ps1
echo             Remove-Item $tempFile -Force -ErrorAction SilentlyContinue >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo         } catch { >> temp_smart_script.ps1
echo             Write-Host "❌ Error inesperado: $($_.Exception.Message)" -ForegroundColor Red >> temp_smart_script.ps1
echo             "ERROR: $($_.Exception.Message)`nPrompt original:`n$($prompts[$i])" ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_smart_script.ps1
echo             if ($retryCount -lt ($maxRetries - 1)) { >> temp_smart_script.ps1
echo                 Write-Host "⏳ Esperando 60 segundos antes del siguiente intento..." -ForegroundColor Magenta >> temp_smart_script.ps1
echo                 Start-Sleep -Seconds 60 >> temp_smart_script.ps1
echo                 $retryCount++ >> temp_smart_script.ps1
echo             } else { >> temp_smart_script.ps1
echo                 $success = $true >> temp_smart_script.ps1
echo             } >> temp_smart_script.ps1
echo         } >> temp_smart_script.ps1
echo     } >> temp_smart_script.ps1
echo. >> temp_smart_script.ps1
echo     if ($i -lt ($prompts.Count - 1) -and $success) { >> temp_smart_script.ps1
echo         Write-Host "⏸️ Esperando 30 segundos antes del siguiente prompt..." -ForegroundColor Magenta >> temp_smart_script.ps1
echo         Start-Sleep -Seconds 30 >> temp_smart_script.ps1
echo     } >> temp_smart_script.ps1
echo     Write-Host "------------------------------------------------------------" -ForegroundColor DarkGray >> temp_smart_script.ps1
echo } >> temp_smart_script.ps1

:: Execute the PowerShell script
powershell -ExecutionPolicy Bypass -File temp_smart_script.ps1

:: Clean up temporary script
del temp_smart_script.ps1

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
echo 🧠 Características del modo inteligente:
echo    - Detección automática de errores 429
echo    - Espera de 5 minutos en caso de cuota
echo    - Hasta 3 reintentos por prompt
echo    - Modelo gemini-2.5-pro
echo    - NUEVO: Contexto de directorio incluido en cada prompt
echo.