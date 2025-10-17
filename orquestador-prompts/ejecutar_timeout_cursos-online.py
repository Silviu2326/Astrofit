#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de lanzamiento para el módulo cursos-online con timeout de 5 minutos
"""

import sys
import os
from orquestador_prompts_timeout import OrquestadorPromptsTimeout

def main():
    """Función principal para ejecutar el orquestador con timeout para el módulo cursos-online."""
    try:
        print("🎯 Iniciando Orquestador con Timeout para módulo: cursos-online")
        print("⏱️  Timeout configurado: 5 minutos por ciclo")
        print("📁 Ruta del módulo: src/features/plancreatorpro/cursos-online/cursos-online")
        
        # Verificar que existe la configuración del módulo
        config_path = "config_timeout_cursos-online.ini"
        if not os.path.exists(config_path):
            print(f"❌ Error: No se encontró el archivo de configuración: {config_path}")
            print("💡 Asegúrate de que el archivo config_timeout_cursos-online.ini existe")
            return 1
        
        # Verificar que existen los archivos de prompts del módulo
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        base_path = os.path.join(project_root, "src", "features", "plancreatorpro", "cursos-online", "cursos-online")
        frontend_file = os.path.join(base_path, "prompts_frontend.json")
        backend_file = os.path.join(base_path, "prompts_backend.json")
        
        print(f"🔍 Directorio del proyecto: {project_root}")
        print(f"📂 Ruta base del módulo: {base_path}")
        print(f"📄 Archivo frontend: {frontend_file}")
        print(f"📄 Archivo backend: {backend_file}")
        
        if not os.path.exists(frontend_file):
            print(f"❌ Error: No se encontró el archivo: {frontend_file}")
            print("💡 Verifica que la ruta del módulo sea correcta")
            return 1
            
        if not os.path.exists(backend_file):
            print(f"❌ Error: No se encontró el archivo: {backend_file}")
            print("💡 Verifica que la ruta del módulo sea correcta")
            return 1
        
        print("✅ Archivos de prompts encontrados")
        print("🚀 Iniciando orquestador con timeout...")
        
        # Inicializar y ejecutar el orquestador
        orquestador = OrquestadorPromptsTimeout(config_path)
        orquestador.ejecutar_flujo()
        
        return 0
        
    except Exception as e:
        print(f"❌ Error fatal: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
