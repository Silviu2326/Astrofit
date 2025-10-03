@echo off
setlocal EnableDelayedExpansion

echo ========================================
echo Claude Code - Batch Prompt Sender
echo ========================================
echo.

echo Leyendo archivo promptsclaude.txt...
if not exist "promptsclaude.txt" (
    echo Error: promptsclaude.txt no encontrado
    exit /b 1
)

echo Procesando prompts...
findstr /c:"PROMPT" "promptsclaude.txt" >nul
if !errorlevel! equ 0 (
    echo    Detectados prompts marcados
) else (
    echo    Sin prompts detectados
)

:: Create log directory
if not exist "claudelogs" mkdir "claudelogs"

:: Get timestamp
for /f "tokens=1-6 delims=/:. " %%a in ("%date% %time%") do (
    set "timestamp=%%c%%a%%b-%%d%%e%%f"
)
set "timestamp=!timestamp: =0!"

echo.
echo Iniciando envio de prompts a Claude (MODO INTELIGENTE)...
echo ========================================

:: Create PowerShell script file to avoid command line escaping issues
echo Creating temporary PowerShell script...
echo $content = Get-Content 'promptsclaude.txt' -Raw > temp_claude_script.ps1
echo $prompts = @() >> temp_claude_script.ps1
echo if ($content -match '(?s)## 📋 PROMPT') { >> temp_claude_script.ps1
echo     $splits = $content -split '(?=## 📋 PROMPT \d+:)' ^| Where-Object { $_ -match '## 📋 PROMPT' } >> temp_claude_script.ps1
echo     foreach ($split in $splits) { >> temp_claude_script.ps1
echo         $cleaned = $split -replace '(?s)^.*?(## 📋 PROMPT.*?)(\r?\n-{3,}.*?## 📝 NOTAS GENERALES.*)?$', '$1' >> temp_claude_script.ps1
echo         $cleaned = $cleaned -replace '(?s)(## 📋 PROMPT.*?\*\*NO CREAR NUEVOS ARCHIVOS\*\* - Solo editar archivos existentes en la carpeta\.).*', '$1' >> temp_claude_script.ps1
echo         if ($cleaned.Trim().Length -gt 0) { $prompts += $cleaned.Trim() } >> temp_claude_script.ps1
echo     } >> temp_claude_script.ps1
echo } else { >> temp_claude_script.ps1
echo     $prompts = @($content) >> temp_claude_script.ps1
echo } >> temp_claude_script.ps1
echo Write-Host "Total de prompts encontrados: $($prompts.Count)" -ForegroundColor Cyan >> temp_claude_script.ps1
echo Write-Host "Usando: Claude Code CLI" -ForegroundColor Yellow >> temp_claude_script.ps1
echo Write-Host "Modo: --print --dangerously-skip-permissions" -ForegroundColor Yellow >> temp_claude_script.ps1
echo Write-Host "Espera entre prompts: 30 segundos" -ForegroundColor Green >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo for ($i = 0; $i -lt $prompts.Count; $i++) { >> temp_claude_script.ps1
echo     $promptNum = $i + 1 >> temp_claude_script.ps1
echo     Write-Host "`n========================================" -ForegroundColor Cyan >> temp_claude_script.ps1
echo     Write-Host "Turno $promptNum/$($prompts.Count)" -ForegroundColor Yellow >> temp_claude_script.ps1
echo     Write-Host "========================================" -ForegroundColor Cyan >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo     Write-Host "Inicio: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray >> temp_claude_script.ps1
echo     $logFile = "claudelogs\%timestamp%-turn$promptNum.txt" >> temp_claude_script.ps1
echo     Write-Host "Enviando prompt a Claude Code..." -ForegroundColor Cyan >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo     try { >> temp_claude_script.ps1
echo         $tempFile = [System.IO.Path]::GetTempFileName() >> temp_claude_script.ps1
echo         $contextHeader = "CONTEXTO IMPORTANTE DEL PROYECTO:`n=================================`nDirectorio de trabajo actual: %CD%`nRuta base del proyecto: %CD%`n`nIMPORTANTE: Todos los archivos deben crearse ÚNICAMENTE en la ruta base del proyecto.`nNO crear archivos en C:/Users/usuario/Documents/src/ ni en otras ubicaciones.`nUSAR SIEMPRE rutas relativas desde el directorio del proyecto.`n`nEjemplo correcto: src/features/agente-marketing/components/...`nEjemplo INCORRECTO: C:/Users/usuario/Documents/src/features/...`n`n--- PROMPT ORIGINAL ---`n" >> temp_claude_script.ps1
echo         $fullPrompt = $contextHeader + $prompts[$i] >> temp_claude_script.ps1
echo         $fullPrompt ^| Out-File -FilePath $tempFile -Encoding UTF8 >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo         $job = Start-Job -ScriptBlock { >> temp_claude_script.ps1
echo             param($inputFile) >> temp_claude_script.ps1
echo             $content = Get-Content $inputFile -Raw >> temp_claude_script.ps1
echo             Write-Output $content ^| ^& claude --print --dangerously-skip-permissions 2^>^&1 >> temp_claude_script.ps1
echo         } -ArgumentList $tempFile >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo         $completed = Wait-Job $job -Timeout 1200 >> temp_claude_script.ps1
echo         if ($completed) { >> temp_claude_script.ps1
echo             $result = Receive-Job $job >> temp_claude_script.ps1
echo             $resultString = $result -join "`n" >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo             Write-Host "[OK] Respuesta recibida de Claude Code" -ForegroundColor Green >> temp_claude_script.ps1
echo             $resultString ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_claude_script.ps1
echo             Write-Host $resultString >> temp_claude_script.ps1
echo             Write-Host "`nRespuesta guardada en: $logFile" -ForegroundColor Gray >> temp_claude_script.ps1
echo             Write-Host "Turno $promptNum completado exitosamente" -ForegroundColor Green >> temp_claude_script.ps1
echo         } else { >> temp_claude_script.ps1
echo             Stop-Job $job >> temp_claude_script.ps1
echo             Write-Host "[TIMEOUT] Timeout alcanzado (20 min)" -ForegroundColor Yellow >> temp_claude_script.ps1
echo             "TIMEOUT: Prompt excedió 20 minutos de ejecución`nPrompt original:`n$($prompts[$i])" ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_claude_script.ps1
echo         } >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo         Remove-Job $job -Force -ErrorAction SilentlyContinue >> temp_claude_script.ps1
echo         Remove-Item $tempFile -Force -ErrorAction SilentlyContinue >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo     } catch { >> temp_claude_script.ps1
echo         Write-Host "[ERROR] Error inesperado: $($_.Exception.Message)" -ForegroundColor Red >> temp_claude_script.ps1
echo         "ERROR: $($_.Exception.Message)`nPrompt original:`n$($prompts[$i])" ^| Out-File -FilePath $logFile -Encoding UTF8 >> temp_claude_script.ps1
echo     } >> temp_claude_script.ps1
echo. >> temp_claude_script.ps1
echo     if ($i -lt ($prompts.Count - 1)) { >> temp_claude_script.ps1
echo         Write-Host "`n[WAIT] Esperando 30 segundos antes del siguiente prompt..." -ForegroundColor Magenta >> temp_claude_script.ps1
echo         Start-Sleep -Seconds 30 >> temp_claude_script.ps1
echo     } >> temp_claude_script.ps1
echo } >> temp_claude_script.ps1

:: Execute the PowerShell script
powershell -ExecutionPolicy Bypass -File temp_claude_script.ps1

:: Clean up temporary script
del temp_claude_script.ps1

echo.
echo ========================================
echo [OK] Proceso completado!
echo.
echo Logs guardados en: claudelogs\
echo Timestamp: %timestamp%
echo.
echo Para ver los logs:
echo    dir claudelogs\%timestamp%-*
echo    type claudelogs\%timestamp%-turn1.txt
echo.
echo Características:
echo    - Usa Claude Code CLI (no API)
echo    - Modo: --print --dangerously-skip-permissions
echo    - Timeout de 20 minutos por prompt
echo    - Espera de 30 segundos entre prompts
echo    - Contexto de directorio incluido en cada prompt
echo    - Logs detallados en claudelogs\
echo.