# ✅ Checklist Rápido - Orquestador de Prompts v2.0

## 🔧 Configuración inicial

### ✅ Archivos de configuración
- [ ] `config.ini` sin sección de JSONs, con máximos y alias @archivo
- [ ] Plantillas `cuadrado_*.png` probadas en tu tema de Cursor
- [ ] Regiones por lado calibradas correctamente
- [ ] `enviar_con` configurado correcto para tu editor (enter/ctrl_enter)

### ✅ Estado y persistencia
- [ ] `state.json` habilitado para reanudar
- [ ] Backup automático configurado
- [ ] Reanudación automática configurada (opcional)

### ✅ Logging y monitoreo
- [ ] Logs con capturas on-error habilitadas
- [ ] Directorio `logs/` creado
- [ ] Nivel de logging apropiado (INFO/DEBUG)

## 🎯 Calibración

### ✅ Método 1 - Calibrador visual (Recomendado)
```bash
python calibrar_regiones.py
```
- [ ] Coordenadas de chat izquierdo capturadas
- [ ] Coordenadas de chat derecho capturadas  
- [ ] Región de detección frontend definida
- [ ] Región de detección backend definida
- [ ] Config.ini actualizado automáticamente

### ✅ Método 2 - Manual (Alternativo)
```bash
python obtener_coordenadas.py
```
- [ ] Coordenadas copiadas a config.ini
- [ ] Regiones definidas manualmente

## 🎨 Plantillas de detección

### ✅ Generar plantillas
```bash
python generar_plantillas.py
```
- [ ] `cuadrado.png` (por defecto)
- [ ] `cuadrado_dark.png` (tema oscuro)
- [ ] `cuadrado_light.png` (tema claro)
- [ ] `cuadrado_highdpi.png` (alta resolución)

### ✅ Probar detección
- [ ] Plantilla funciona con tu tema de Cursor
- [ ] Confidence mínimo ajustado si es necesario
- [ ] Regiones evitan falsos positivos

## 🚀 Ejecución

### ✅ Pre-ejecución
- [ ] Cursor abierto con dos chats (frontend/backend)
- [ ] Chats en posiciones correctas según coordenadas
- [ ] Escalado de pantalla al 100% (o coordenadas ajustadas)
- [ ] Sin ventanas superpuestas en las regiones de detección

### ✅ Ejecutar orquestador
```bash
# Versión v2.0 (recomendada)
python orquestador_prompts_v2.py

# Versión original
python orquestador_prompts.py
```

### ✅ Durante la ejecución
- [ ] F8 para pausar/reanudar si es necesario
- [ ] F9 para forzar salto si se cuelga
- [ ] ESC para abortar si es necesario
- [ ] Monitorear logs en consola y archivo

## 📊 Verificación final

### ✅ Métricas y resumen
- [ ] Resumen final mostrado en consola
- [ ] Archivo CSV generado con métricas
- [ ] Screenshots de errores en `logs/errors/` (si los hay)
- [ ] Log completo en `orquestador.log`

### ✅ Estado persistente
- [ ] `state.json` actualizado con progreso
- [ ] Backup de estado creado (si está habilitado)
- [ ] Posibilidad de reanudar desde donde se quedó

## 🛠️ Solución de problemas comunes

### ❌ El cuadrado no se detecta
- [ ] Verificar que las plantillas coincidan con tu tema
- [ ] Ajustar `confidence_minimo` en config.ini
- [ ] Verificar que las regiones sean correctas
- [ ] Probar con diferentes plantillas

### ❌ Los prompts no se envían
- [ ] Verificar coordenadas de los inputs
- [ ] Asegurar que Cursor esté en primer plano
- [ ] Verificar configuración de `enviar_con`
- [ ] Probar con `validar_foco = true`

### ❌ El script se cuelga
- [ ] Usar F9 para forzar salto
- [ ] Verificar timeouts en config.ini
- [ ] Revisar logs para identificar el problema
- [ ] Considerar usar ESC y reanudar

### ❌ Falsos positivos en detección
- [ ] Ajustar regiones para ser más específicas
- [ ] Reducir `confidence_minimo`
- [ ] Usar regiones separadas por chat
- [ ] Verificar que no haya elementos similares en pantalla

## 📋 Archivos finales esperados

```
proyecto/
├── orquestador_prompts_v2.py     # Script principal v2.0
├── orquestador_prompts.py        # Script original
├── config.ini                    # Configuración
├── state.json                    # Estado persistente
├── cuadrado*.png                 # Plantillas de detección
├── calibrar_regiones.py          # Calibrador visual
├── generar_plantillas.py         # Generador de plantillas
├── obtener_coordenadas.py        # Script manual
├── instalar.py                   # Instalador
├── requirements.txt              # Dependencias
├── README.md                     # Documentación
├── CHECKLIST.md                  # Este checklist
├── orquestador.log               # Logs
├── resultados_TIMESTAMP.csv      # Métricas
├── backups/                      # Backups de estado
└── logs/                         # Directorio de logs
    └── errors/                   # Screenshots de errores
```

## 🎉 ¡Listo para usar!

Una vez completado este checklist, el orquestador debería funcionar perfectamente con tu configuración específica de Cursor.
