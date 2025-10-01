$prompts = (Get-Content 'promptsgemini.txt' -Raw) -split '(?m)---\s*$' | Where-Object { $_.Trim().Length -gt 0 } 
Write-Host "Total de prompts encontrados: $($prompts.Count)" -ForegroundColor Cyan 
Write-Host "🤖 Modelo: gemini-2.5-pro" -ForegroundColor Yellow 
Write-Host "🧠 Detección inteligente de errores de cuota" -ForegroundColor Green 
Write-Host "⏰ Espera automática: 5 minutos en caso de error 429" -ForegroundColor Yellow 
Write-Host "🔄 Reintentos automáticos habilitados" -ForegroundColor Green 
 
for ($i = 0; $i -lt $prompts.Count; $i++) { 
    $promptNum = $i + 1 
    $success = $false 
    $retryCount = 0 
    $maxRetries = 3 
 
    while (-not $success -and $retryCount -lt $maxRetries) { 
        if ($retryCount -gt 0) { 
            Write-Host "`n🔄 Reintento $retryCount/$maxRetries para turno $promptNum" -ForegroundColor Yellow 
        } else { 
            Write-Host "`nTurno $promptNum/$($prompts.Count)" -ForegroundColor Yellow 
        } 
 
        Write-Host "Inicio: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray 
        $logFile = "geminilogs\20252909-70633,39-turn$promptNum.txt" 
        if ($retryCount -gt 0) { 
            $logFile = "geminilogs\20252909-70633,39-turn$promptNum-retry$retryCount.txt" 
        } 
 
        Write-Host "Enviando prompt a Gemini..." -ForegroundColor Cyan 
 
        try { 
            $tempFile = [System.IO.Path]::GetTempFileName() 
            $contextHeader = "CONTEXTO IMPORTANTE DEL PROYECTO:`n=================================`nDirectorio de trabajo actual: C:\Users\usuario\Documents\project-bolt-sb1-qekdxfwt\project`nRuta base del proyecto: C:\Users\usuario\Documents\project-bolt-sb1-qekdxfwt\project`n`nIMPORTANTE: Todos los archivos deben crearse ÚNICAMENTE en la ruta base del proyecto.`nNO crear archivos en C:/Users/usuario/Documents/src/ ni en otras ubicaciones.`nUSAR SIEMPRE rutas relativas desde el directorio del proyecto.`n`nEjemplo correcto: src/features/agente-marketing/components/...`nEjemplo INCORRECTO: C:/Users/usuario/Documents/src/features/...`n`n--- PROMPT ORIGINAL ---`n" 
            $fullPrompt = $contextHeader + $prompts[$i] 
            $fullPrompt | Out-File -FilePath $tempFile -Encoding UTF8 
 
            $job = Start-Job -ScriptBlock { 
                param($inputFile) 
                $content = Get-Content $inputFile -Raw 
                $content | & gemini -m gemini-2.5-pro --yolo 2>&1 
            } -ArgumentList $tempFile 
 
            $completed = Wait-Job $job -Timeout 300 
            if ($completed) { 
                $result = Receive-Job $job 
                $resultString = $result -join "`n" 
 
                if ($resultString -match "429^|quota^|exceeded^|rate.*limit^|RESOURCE_EXHAUSTED") { 
                    Write-Host "❌ Error de cuota detectado (429)" -ForegroundColor Red 
                    $resultString | Out-File -FilePath $logFile -Encoding UTF8 
                    if ($retryCount -lt ($maxRetries - 1)) { 
                        Write-Host "⏳ Esperando 5 minutos antes del siguiente intento..." -ForegroundColor Magenta 
                        Start-Sleep -Seconds 300 
                        $retryCount++ 
                    } else { 
                        Write-Host "⚠️ Máximo de reintentos alcanzado. Pasando al siguiente prompt." -ForegroundColor Red 
                        "MAX_RETRIES_REACHED: Error de cuota persistente después de $maxRetries intentos`nÚltima respuesta:`n$resultString" | Out-File -FilePath $logFile -Encoding UTF8 
                        $success = $true 
                    } 
                } else { 
                    Write-Host "✅ Respuesta exitosa recibida" -ForegroundColor Green 
                    $resultString | Out-File -FilePath $logFile -Encoding UTF8 
                    Write-Host $resultString 
                    Write-Host "Respuesta guardada en: $logFile" -ForegroundColor Gray 
                    Write-Host "Turno $promptNum completado" -ForegroundColor Green 
                    $success = $true 
                } 
            } else { 
                Stop-Job $job 
                Write-Host "⏰ Timeout alcanzado (5 min)" -ForegroundColor Yellow 
                "TIMEOUT: Prompt excedió 5 minutos de ejecución`nPrompt original:`n$($prompts[$i])" | Out-File -FilePath $logFile -Encoding UTF8 
                if ($retryCount -lt ($maxRetries - 1)) { 
                    Write-Host "⏳ Esperando 30 segundos antes del siguiente intento..." -ForegroundColor Magenta 
                    Start-Sleep -Seconds 30 
                    $retryCount++ 
                } else { 
                    $success = $true 
                } 
            } 
 
            Remove-Job $job -Force -ErrorAction SilentlyContinue 
            Remove-Item $tempFile -Force -ErrorAction SilentlyContinue 
 
        } catch { 
            Write-Host "❌ Error inesperado: $($_.Exception.Message)" -ForegroundColor Red 
            "ERROR: $($_.Exception.Message)`nPrompt original:`n$($prompts[$i])" | Out-File -FilePath $logFile -Encoding UTF8 
            if ($retryCount -lt ($maxRetries - 1)) { 
                Write-Host "⏳ Esperando 60 segundos antes del siguiente intento..." -ForegroundColor Magenta 
                Start-Sleep -Seconds 60 
                $retryCount++ 
            } else { 
                $success = $true 
            } 
        } 
    } 
 
    if ($i -lt ($prompts.Count - 1) -and $success) { 
        Write-Host "⏸️ Esperando 30 segundos antes del siguiente prompt..." -ForegroundColor Magenta 
        Start-Sleep -Seconds 30 
    } 
    Write-Host "------------------------------------------------------------" -ForegroundColor DarkGray 
} 
