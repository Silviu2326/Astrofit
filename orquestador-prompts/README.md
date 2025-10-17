# Orquestador de Prompts para Cursor v2.0

Este script automatiza el envío de prompts a dos chats de Cursor (frontend y backend), controlando el orden de los mensajes y detectando automáticamente cuándo cada mensaje ha terminado de procesarse.

## 🚀 Características v2.0

- **Automatización completa**: Envía prompts de forma automática y ordenada
- **Detección visual avanzada**: Multi-plantilla con fallback automático por tema
- **Regiones separadas**: Detección independiente por chat para evitar falsos positivos
- **Histeresis/antiparpadeo**: Confirma desaparición tras múltiples frames sin match
- **Detección de foco**: Valida que el input correcto tenga foco antes de escribir
- **Persistencia de estado**: Guarda progreso y permite reanudar tras interrupciones
- **Backoff exponencial**: Reintentos inteligentes con delays crecientes
- **Throttling de tecleo**: Clipboard + paste para evitar pérdida de caracteres
- **Métricas completas**: Resumen final con tiempos, reintentos y exportación CSV
- **Calibrador visual**: Wizard para configurar regiones e inputs con el mouse
- **Dos modos de operación**: Alterno (intercalado) o Bloque (todos frontend, luego backend)
- **Control en tiempo real**: Pausar, reanudar, saltar o abortar con atajos de teclado
- **Logging enriquecido**: IDs de corrida, latencias y capturas on-error

## 📋 Requisitos

### Dependencias de Python
```bash
pip install pyautogui opencv-python keyboard numpy
```

### Archivos necesarios
- `config.ini` - Configuración del script
- `cuadrado*.png` - Plantillas de detección visual (múltiples temas)
- `state.json` - Estado persistente (se crea automáticamente)

## ⚙️ Configuración

### 1. Archivo config.ini (v2.0)
```ini
[GENERAL]
archivo_frontend = @prompts_frontend
archivo_backend = @prompts_backend
max_prompts_frontend = 5
max_prompts_backend = 6
modo = alterno
timeout_appear_ms = 6000
timeout_disappear_ms = 90000
reintentos_envio = 2
reanudar_automatico = false

[COORDENADAS]
# Coordenadas del input del chat izquierdo (frontend)
chat_izq_x = 400
chat_izq_y = 800
# Coordenadas del input del chat derecho (backend)  
chat_der_x = 1200
chat_der_y = 800

[DETECCION]
tema = auto
cuadrado_dark = cuadrado_dark.png
cuadrado_light = cuadrado_light.png
cuadrado_highdpi = cuadrado_highdpi.png
frames_sin_match_para_confirmar = 4
intervalo_chequeo_ms = 200
confidence_minimo = 0.8

[REGIONES]
# Región para detectar cuadrado en chat frontend
region_frontend_x = 0
region_frontend_y = 0
region_frontend_w = 960
region_frontend_h = 1080
# Región para detectar cuadrado en chat backend
region_backend_x = 960
region_backend_y = 0
region_backend_w = 960
region_backend_h = 1080

[ENVIO]
enviar_con = enter
pegar_con_clipboard = true
throttling_ms = 50
validar_foco = true

[PERSISTENCIA]
guardar_estado = true
archivo_estado = state.json
backup_estado = true

[LOGGING]
nivel_log = INFO
archivo_log = orquestador.log
capturas_error = true
directorio_logs = logs
```

### 2. Plantillas de detección
- **cuadrado.png** - Plantilla por defecto
- **cuadrado_dark.png** - Para tema oscuro
- **cuadrado_light.png** - Para tema claro  
- **cuadrado_highdpi.png** - Para pantallas de alta resolución
- Se generan automáticamente con: `python generar_plantillas.py`

## 🎮 Uso

### Ejecución básica
```bash
# Versión v2.0 (recomendada)
python orquestador_prompts_v2.py

# Versión original
python orquestador_prompts.py
```

### Controles durante la ejecución
- **F8**: Pausar/Reanudar
- **F9**: Forzar salto al siguiente prompt
- **ESC**: Abortar ejecución

### Calibración visual (v2.0)
```bash
# Calibrar regiones e inputs con el mouse
python calibrar_regiones.py
```

### Generar plantillas
```bash
# Crear plantillas para diferentes temas
python generar_plantillas.py
```

## 🔧 Configuración de coordenadas

### Método 1: Calibrador visual (v2.0 - Recomendado)
```bash
python calibrar_regiones.py
```
- Interfaz gráfica para seleccionar regiones con el mouse
- Configura automáticamente el archivo config.ini
- Incluye validación visual

### Método 2: Script manual (v1.0)
```bash
python obtener_coordenadas.py
```
- Captura coordenadas paso a paso
- Genera configuración para copiar/pegar

## 📊 Modos de operación

### Modo Alterno (por defecto)
Envía un prompt al chat izquierdo, luego uno al derecho, y así sucesivamente:
```
Frontend → Backend → Frontend → Backend → ...
```

### Modo Bloque
Envía todos los prompts del frontend primero, luego todos los del backend:
```
Frontend → Frontend → ... → Backend → Backend → ...
```

Para cambiar el modo, edita `config.ini`:
```ini
modo = bloque  # o 'alterno'
```

## 💾 Persistencia y reanudación (v2.0)

### Estado automático
- El script guarda automáticamente el progreso en `state.json`
- Permite reanudar tras interrupciones o crashes
- Incluye backup automático de estados previos

### Configuración de persistencia
```ini
[PERSISTENCIA]
guardar_estado = true
archivo_estado = state.json
backup_estado = true
reanudar_automatico = false
```

### Reanudar ejecución
- Al iniciar, si existe `state.json`, pregunta si reanudar
- Configura `reanudar_automatico = true` para reanudar sin preguntar
- Los backups se guardan en `backups/state_TIMESTAMP.json`

## 📈 Métricas y resumen (v2.0)

### Resumen automático
Al finalizar, el script muestra:
- Tabla de métricas por chat
- Tiempos promedio de procesamiento
- Conteo de reintentos, timeouts y errores
- Exportación automática a CSV

### Archivos generados
- `resultados_TIMESTAMP.csv` - Métricas detalladas
- `logs/errors/error_TIMESTAMP.png` - Screenshots de errores
- `orquestador.log` - Log completo con IDs de corrida

### Ejemplo de resumen
```
📊 RESUMEN FINAL
============================================================
Chat         Enviados   Reintentos   Timeouts   Errores   
------------------------------------------------------------
Frontend     5          2            0          0         
Backend      6          1            1          0         
------------------------------------------------------------
TOTAL        11         3            1          0         

⏱️  Tiempo promedio por prompt: 15.23s
⏱️  Tiempo total: 167.45s
📄 Métricas exportadas a: resultados_20241201_143022.csv
```

## 📝 Logging

El script genera logs en `orquestador.log` con:
- Timestamp de cada operación
- Estado de envío de prompts
- Errores y advertencias
- Duración de procesamiento

También muestra información en consola:
- Estado actual del procesamiento
- Confirmación de envío de prompts
- Notificaciones de pausa/reanudación

## 🛠️ Solución de problemas

### El cuadrado no se detecta
1. Verifica que `cuadrado.png` existe y es la imagen correcta
2. Ajusta las coordenadas de la región de detección
3. Aumenta el timeout en `config.ini`

### Los prompts no se envían
1. Verifica las coordenadas de los chats
2. Asegúrate de que Cursor esté en primer plano
3. Revisa que los archivos JSON estén bien formateados

### El script se cuelga
1. Usa F9 para forzar el salto
2. Usa ESC para abortar
3. Revisa los logs para identificar el problema

## 📁 Estructura de archivos

```
proyecto/
├── orquestador_prompts.py    # Script principal
├── config.ini               # Configuración
├── cuadrado.png             # Imagen de detección
├── prompts_frontend.json    # Prompts frontend
├── prompts_backend.json     # Prompts backend
├── generar_cuadrado.py      # Generador de imagen
├── orquestador.log          # Logs del script
└── README.md                # Esta documentación
```

## 🔄 Flujo de trabajo

1. **Configuración inicial**: Ajusta coordenadas y parámetros
2. **Preparación**: Coloca los chats de Cursor en las posiciones correctas
3. **Ejecución**: Ejecuta el script y supervisa el progreso
4. **Control**: Usa los atajos para pausar, saltar o abortar según sea necesario
5. **Finalización**: El script termina cuando todos los prompts han sido enviados

## ⚠️ Notas importantes

- **Seguridad**: El script usa `pyautogui.FAILSAFE = True` - mueve el mouse a la esquina superior izquierda para abortar
- **Coordenadas**: Las coordenadas deben ser precisas para que funcione correctamente
- **Ventanas**: Asegúrate de que Cursor esté visible y en primer plano
- **Resolución**: Las coordenadas dependen de la resolución de pantalla

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs en `orquestador.log`
2. Verifica la configuración en `config.ini`
3. Asegúrate de que todas las dependencias estén instaladas
4. Comprueba que las coordenadas sean correctas para tu resolución
