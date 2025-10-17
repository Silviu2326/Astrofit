#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de instalación para el Orquestador de Prompts.
Instala las dependencias y configura el entorno.
"""

import subprocess
import sys
import os

def instalar_dependencias():
    """Instala las dependencias necesarias."""
    print("📦 Instalando dependencias...")
    
    dependencias = [
        "pyautogui>=0.9.54",
        "opencv-python>=4.8.0", 
        "keyboard>=0.13.5",
        "numpy>=1.24.0"
    ]
    
    for dep in dependencias:
        try:
            print(f"   Instalando {dep}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", dep])
            print(f"   ✅ {dep} instalado correctamente")
        except subprocess.CalledProcessError as e:
            print(f"   ❌ Error instalando {dep}: {e}")
            return False
    
    return True

def verificar_archivos():
    """Verifica que todos los archivos necesarios existan."""
    print("\n🔍 Verificando archivos necesarios...")
    
    archivos_requeridos = [
        "config.ini",
        "prompts_frontend.json", 
        "prompts_backend.json",
        "cuadrado.png"
    ]
    
    archivos_faltantes = []
    
    for archivo in archivos_requeridos:
        if os.path.exists(archivo):
            print(f"   ✅ {archivo}")
        else:
            print(f"   ❌ {archivo} - FALTANTE")
            archivos_faltantes.append(archivo)
    
    if archivos_faltantes:
        print(f"\n⚠️  Archivos faltantes: {', '.join(archivos_faltantes)}")
        return False
    
    return True

def crear_estructura_inicial():
    """Crea la estructura inicial si no existe."""
    print("\n🏗️  Creando estructura inicial...")
    
    # Crear cuadrado.png si no existe
    if not os.path.exists("cuadrado.png"):
        print("   Generando cuadrado.png...")
        try:
            subprocess.check_call([sys.executable, "generar_cuadrado.py"])
            print("   ✅ cuadrado.png creado")
        except subprocess.CalledProcessError:
            print("   ❌ Error creando cuadrado.png")
            return False
    
    return True

def mostrar_instrucciones():
    """Muestra las instrucciones de configuración."""
    print("\n" + "="*60)
    print("🎯 CONFIGURACIÓN INICIAL REQUERIDA")
    print("="*60)
    print()
    print("📋 OPCIONES DE CONFIGURACIÓN:")
    print()
    print("🔧 MÉTODO 1 - Calibrador visual (v2.0 - Recomendado):")
    print("   python calibrar_regiones.py")
    print("   - Interfaz gráfica para seleccionar regiones")
    print("   - Configuración automática del config.ini")
    print()
    print("🔧 MÉTODO 2 - Script manual (v1.0):")
    print("   python obtener_coordenadas.py")
    print("   - Captura coordenadas paso a paso")
    print()
    print("🎨 GENERAR PLANTILLAS:")
    print("   python generar_plantillas.py")
    print("   - Crea plantillas para diferentes temas")
    print()
    print("🚀 EJECUTAR ORQUESTADOR:")
    print("   # Versión v2.0 (recomendada)")
    print("   python orquestador_prompts_v2.py")
    print()
    print("   # Versión original")
    print("   python orquestador_prompts.py")
    print()
    print("📋 Controles durante la ejecución:")
    print("   - F8: Pausar/Reanudar")
    print("   - F9: Forzar salto")
    print("   - ESC: Abortar")
    print()
    print("💾 Características v2.0:")
    print("   - Persistencia de estado (reanudar tras interrupciones)")
    print("   - Métricas y resumen automático")
    print("   - Detección multi-plantilla")
    print("   - Regiones separadas por chat")
    print("   - Throttling de tecleo mejorado")
    print()
    print("📚 Para más información, consulta README.md")

def main():
    """Función principal de instalación."""
    print("🚀 Instalador del Orquestador de Prompts")
    print("="*50)
    
    # Instalar dependencias
    if not instalar_dependencias():
        print("\n❌ Error instalando dependencias")
        return False
    
    # Crear estructura inicial
    if not crear_estructura_inicial():
        print("\n❌ Error creando estructura inicial")
        return False
    
    # Verificar archivos
    if not verificar_archivos():
        print("\n⚠️  Algunos archivos están faltantes, pero puedes crearlos manualmente")
    
    # Mostrar instrucciones
    mostrar_instrucciones()
    
    print("\n✅ ¡Instalación completada!")
    return True

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n❌ Instalación cancelada por el usuario")
    except Exception as e:
        print(f"\n❌ Error durante la instalación: {e}")
