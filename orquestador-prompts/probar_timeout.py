#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de prueba para el orquestador con timeout.
Permite probar la configuración sin ejecutar el orquestador completo.
"""

import configparser
import os

def mostrar_configuracion():
    """Muestra la configuración actual."""
    print("🔧 CONFIGURACIÓN ACTUAL DEL ORQUESTADOR")
    print("="*50)
    
    try:
        if os.path.exists("config_timeout.ini"):
            config = configparser.ConfigParser()
            config.read("config_timeout.ini", encoding='utf-8')
            
            print(f"📁 Archivo: config_timeout.ini")
            print()
            print("📁 MÓDULO DESTINO:")
            print(f"   {config.get('GENERAL', 'modulo_destino', fallback='No configurado')}")
            print()
            print("⏱️  TIMEOUTS:")
            print(f"   Timeout por ciclo: {config.getint('GENERAL', 'timeout_minutos', fallback=3)} minutos")
            print(f"   Delay entre chats: {config.getint('GENERAL', 'delay_entre_chats_segundos', fallback=10)} segundos")
            print()
            print("📊 LÍMITES:")
            print(f"   Max frontend: {config.getint('GENERAL', 'max_prompts_frontend', fallback=5)}")
            print(f"   Max backend: {config.getint('GENERAL', 'max_prompts_backend', fallback=6)}")
            print(f"   Modo: {config.get('GENERAL', 'modo', fallback='alterno')}")
            print()
            print("📍 COORDENADAS:")
            print(f"   Frontend: ({config.getint('COORDENADAS', 'chat_izq_x', fallback=0)}, {config.getint('COORDENADAS', 'chat_izq_y', fallback=0)})")
            print(f"   Backend: ({config.getint('COORDENADAS', 'chat_der_x', fallback=0)}, {config.getint('COORDENADAS', 'chat_der_y', fallback=0)})")
            print()
            print("🔄 CICLO DE FUNCIONAMIENTO:")
            print("   1. Envía prompt a Frontend")
            print(f"   2. Espera {config.getint('GENERAL', 'delay_entre_chats_segundos', fallback=10)} segundos")
            print("   3. Envía prompt a Backend")
            print(f"   4. Espera {config.getint('GENERAL', 'timeout_minutos', fallback=3)} minutos")
            print("   5. Repite hasta completar todos los prompts")
            
        else:
            print("❌ No se encontró config_timeout.ini")
            print("💡 Ejecuta primero: python inicio_timeout.py")
            
    except Exception as e:
        print(f"❌ Error leyendo configuración: {e}")

def calcular_tiempo_total():
    """Calcula el tiempo total estimado."""
    try:
        if os.path.exists("config_timeout.ini"):
            config = configparser.ConfigParser()
            config.read("config_timeout.ini", encoding='utf-8')
            
            max_frontend = config.getint('GENERAL', 'max_prompts_frontend', fallback=5)
            max_backend = config.getint('GENERAL', 'max_prompts_backend', fallback=6)
            timeout_minutos = config.getint('GENERAL', 'timeout_minutos', fallback=3)
            delay_segundos = config.getint('GENERAL', 'delay_entre_chats_segundos', fallback=10)
            
            # Calcular ciclos necesarios
            ciclos = max(max_frontend, max_backend)
            
            # Tiempo por ciclo: delay + timeout
            tiempo_por_ciclo = (delay_segundos / 60) + timeout_minutos
            
            # Tiempo total
            tiempo_total = ciclos * tiempo_por_ciclo
            
            print("\n⏱️  ESTIMACIÓN DE TIEMPO TOTAL")
            print("="*40)
            print(f"   Ciclos necesarios: {ciclos}")
            print(f"   Tiempo por ciclo: {tiempo_por_ciclo:.1f} minutos")
            print(f"   Tiempo total estimado: {tiempo_total:.1f} minutos ({tiempo_total/60:.1f} horas)")
            
        else:
            print("❌ No se puede calcular sin configuración")
            
    except Exception as e:
        print(f"❌ Error calculando tiempo: {e}")

def main():
    """Función principal."""
    print("🧪 PROBADOR DE CONFIGURACIÓN - ORQUESTADOR TIMEOUT")
    print("="*60)
    
    mostrar_configuracion()
    calcular_tiempo_total()
    
    print("\n💡 PRÓXIMOS PASOS:")
    print("   1. Verifica que las coordenadas sean correctas")
    print("   2. Ajusta timeouts si es necesario")
    print("   3. Ejecuta: python orquestador_prompts_timeout.py")
    print("   4. O usa: python inicio_timeout.py")

if __name__ == "__main__":
    main()
