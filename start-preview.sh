#!/bin/bash

echo "🚀 Iniciando Vista Previa - Gestión de Pagos de Membresías"
echo ""
echo "📋 Abriendo archivo HTML en el navegador predeterminado..."

# Detectar el sistema operativo y abrir el archivo
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open preview-pagos-membresias.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open preview-pagos-membresias.html
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash)
    start preview-pagos-membresias.html
else
    echo "❌ Sistema operativo no soportado. Abre manualmente el archivo preview-pagos-membresias.html"
    exit 1
fi

echo ""
echo "✅ Vista previa abierta exitosamente!"
echo ""
echo "📖 Para más información, consulta el archivo README-VISTA-PREVIA.md"
echo ""
