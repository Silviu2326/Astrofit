#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de inicio rápido para el Orquestador con Timeout.
Versión simplificada que usa timeout fijo en lugar de detección visual.
"""

import os
import sys
import subprocess
from pathlib import Path

def verificar_dependencias():
    """Verifica que las dependencias estén instaladas."""
    print("🔍 Verificando dependencias...")
    
    dependencias = ['pyautogui', 'keyboard']
    faltantes = []
    
    for dep in dependencias:
        try:
            __import__(dep)
            print(f"   ✅ {dep}")
        except ImportError:
            print(f"   ❌ {dep} - FALTANTE")
            faltantes.append(dep)
    
    if faltantes:
        print(f"\n⚠️  Dependencias faltantes: {', '.join(faltantes)}")
        print("💡 Ejecuta: pip install pyautogui keyboard")
        return False
    
    return True

def configurar_modulo():
    """Permite configurar el módulo destino."""
    print("\n📁 CONFIGURACIÓN DE MÓDULO DESTINO")
    print("="*50)
    
    try:
        modulo_actual = ""
        if os.path.exists("config_timeout.ini"):
            import configparser
            config = configparser.ConfigParser()
            config.read("config_timeout.ini", encoding='utf-8')
            modulo_actual = config.get('GENERAL', 'modulo_destino', fallback='')
        
        if modulo_actual:
            print(f"Módulo actual: {modulo_actual}")
        else:
            print("Módulo actual: No configurado")
        
        print("\nEjemplos de módulos:")
        print("  - src/features/plancreatorpro/cursos-online/cursos-online")
        print("  - src/features/plancreatormax/entrenamiento/entrenamiento")
        print("  - src/features/planstudiopro/marketing/marketing")
        
        print("\n¿Quieres cambiar el módulo? (s/n): ", end="")
        respuesta = input().lower().strip()
        
        if respuesta in ['s', 'si', 'sí', 'y', 'yes']:
            nuevo_modulo = input("Ingresa la ruta del módulo (ej: src/features/plancreatorpro/cursos-online/cursos-online): ").strip()
            
            if nuevo_modulo:
                # Actualizar config
                if os.path.exists("config_timeout.ini"):
                    import configparser
                    config = configparser.ConfigParser()
                    config.read("config_timeout.ini", encoding='utf-8')
                    config.set('GENERAL', 'modulo_destino', nuevo_modulo)
                    
                    with open("config_timeout.ini", 'w', encoding='utf-8') as f:
                        config.write(f)
                    
                    print(f"✅ Módulo actualizado a: {nuevo_modulo}")
                else:
                    print("❌ No se encontró config_timeout.ini")
            else:
                print("❌ Módulo no puede estar vacío")
        else:
            print("✅ Usando módulo actual")
            
    except Exception as e:
        print(f"❌ Error configurando módulo: {e}")

def configurar_timeout():
    """Permite configurar el timeout."""
    print("\n⏱️  CONFIGURACIÓN DE TIMEOUT")
    print("="*40)
    
    try:
        timeout_actual = 3
        if os.path.exists("config_timeout.ini"):
            import configparser
            config = configparser.ConfigParser()
            config.read("config_timeout.ini", encoding='utf-8')
            timeout_actual = config.getint('GENERAL', 'timeout_minutos', fallback=3)
        
        print(f"Timeout actual: {timeout_actual} minutos")
        print("¿Quieres cambiar el timeout? (s/n): ", end="")
        
        respuesta = input().lower().strip()
        if respuesta in ['s', 'si', 'sí', 'y', 'yes']:
            try:
                nuevo_timeout = int(input("Ingresa el timeout en minutos (ej: 3): "))
                if nuevo_timeout > 0:
                    # Actualizar config
                    if os.path.exists("config_timeout.ini"):
                        import configparser
                        config = configparser.ConfigParser()
                        config.read("config_timeout.ini", encoding='utf-8')
                        config.set('GENERAL', 'timeout_minutos', str(nuevo_timeout))
                        
                        with open("config_timeout.ini", 'w', encoding='utf-8') as f:
                            config.write(f)
                        
                        print(f"✅ Timeout actualizado a {nuevo_timeout} minutos")
                    else:
                        print("❌ No se encontró config_timeout.ini")
                else:
                    print("❌ Timeout debe ser mayor a 0")
            except ValueError:
                print("❌ Ingresa un número válido")
        else:
            print("✅ Usando timeout actual")
            
    except Exception as e:
        print(f"❌ Error configurando timeout: {e}")

def mostrar_menu():
    """Muestra el menú principal."""
    print("\n" + "="*60)
    print("🎯 ORQUESTADOR CON TIMEOUT - INICIO RÁPIDO")
    print("="*60)
    print()
    print("Esta versión usa timeout fijo en lugar de detección visual.")
    print("Cada prompt esperará el tiempo configurado antes del siguiente.")
    print()
    print("Selecciona una opción:")
    print()
    print("1. 📁 Configurar módulo destino")
    print("2. ⏱️  Configurar timeout")
    print("3. 🔧 Calibrar coordenadas")
    print("4. 🚀 Ejecutar orquestador con timeout")
    print("5. 📋 Ver configuración actual")
    print("6. ❌ Salir")
    print()

def ejecutar_calibracion():
    """Ejecuta el calibrador de coordenadas."""
    print("🔧 Iniciando calibrador de coordenadas...")
    try:
        subprocess.run([sys.executable, "obtener_coordenadas.py"], check=True)
        print("✅ Calibración completada")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error en calibración: {e}")
    except FileNotFoundError:
        print("❌ No se encontró obtener_coordenadas.py")

def ejecutar_orquestador():
    """Ejecuta el orquestador con timeout."""
    print("🚀 Iniciando orquestador con timeout...")
    print("📋 Controles: F8 (pausar), F9 (saltar), ESC (abortar)")
    print("⏱️  Cada prompt esperará el timeout configurado")
    try:
        subprocess.run([sys.executable, "orquestador_prompts_timeout.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error ejecutando orquestador: {e}")
    except FileNotFoundError:
        print("❌ No se encontró orquestador_prompts_timeout.py")

def mostrar_configuracion():
    """Muestra la configuración actual."""
    print("📋 CONFIGURACIÓN ACTUAL")
    print("="*40)
    
    try:
        if os.path.exists("config_timeout.ini"):
            import configparser
            config = configparser.ConfigParser()
            config.read("config_timeout.ini", encoding='utf-8')
            
            print(f"📁 Módulo destino: {config.get('GENERAL', 'modulo_destino', fallback='No configurado')}")
            print(f"⏱️  Timeout: {config.getint('GENERAL', 'timeout_minutos', fallback=3)} minutos")
            print(f"⏳ Delay entre chats: {config.getint('GENERAL', 'delay_entre_chats_segundos', fallback=10)} segundos")
            print(f"🔄 Modo: {config.get('GENERAL', 'modo', fallback='alterno')}")
            print(f"📊 Max frontend: {config.getint('GENERAL', 'max_prompts_frontend', fallback=5)}")
            print(f"📊 Max backend: {config.getint('GENERAL', 'max_prompts_backend', fallback=6)}")
            print(f"📍 Chat izquierdo: ({config.getint('COORDENADAS', 'chat_izq_x', fallback=400)}, {config.getint('COORDENADAS', 'chat_izq_y', fallback=800)})")
            print(f"📍 Chat derecho: ({config.getint('COORDENADAS', 'chat_der_x', fallback=1200)}, {config.getint('COORDENADAS', 'chat_der_y', fallback=800)})")
            
            # Mostrar ejemplo de prompt
            modulo = config.get('GENERAL', 'modulo_destino', fallback='')
            if modulo:
                print(f"\n💬 Ejemplo de prompt:")
                print(f"   'Desarrólleme el primer prompt de @prompts_frontend en el módulo {modulo}'")
        else:
            print("❌ No se encontró config_timeout.ini")
            
    except Exception as e:
        print(f"❌ Error leyendo configuración: {e}")

def main():
    """Función principal del inicio rápido."""
    print("🎯 Orquestador de Prompts - Versión con Timeout")
    print("="*50)
    print("⏱️  Versión simplificada con timeout fijo de 3 minutos")
    print("🚫 Sin detección visual - Solo espera el tiempo configurado")
    
    # Verificar dependencias
    if not verificar_dependencias():
        print("\n❌ Instala las dependencias primero:")
        print("   pip install pyautogui keyboard")
        return
    
    while True:
        mostrar_menu()
        
        try:
            opcion = input("Ingresa tu opción (1-6): ").strip()
            
            if opcion == "1":
                configurar_modulo()
            elif opcion == "2":
                configurar_timeout()
            elif opcion == "3":
                ejecutar_calibracion()
            elif opcion == "4":
                ejecutar_orquestador()
            elif opcion == "5":
                mostrar_configuracion()
            elif opcion == "6":
                print("👋 ¡Hasta luego!")
                break
            else:
                print("❌ Opción inválida. Intenta de nuevo.")
            
            input("\nPresiona Enter para continuar...")
            
        except KeyboardInterrupt:
            print("\n👋 ¡Hasta luego!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
