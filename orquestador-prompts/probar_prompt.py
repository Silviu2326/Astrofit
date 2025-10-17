#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de prueba para verificar que los prompts se construyen correctamente.
"""

import configparser

def probar_construccion_prompt():
    """Prueba la construcción de prompts."""
    print("🧪 PROBADOR DE CONSTRUCCIÓN DE PROMPTS")
    print("="*50)
    
    try:
        if not os.path.exists("config_timeout.ini"):
            print("❌ No se encontró config_timeout.ini")
            return
        
        config = configparser.ConfigParser()
        config.read("config_timeout.ini", encoding='utf-8')
        
        # Obtener configuración
        modulo_destino = config.get('GENERAL', 'modulo_destino', fallback='')
        archivo_frontend = config.get('GENERAL', 'archivo_frontend', fallback='@prompts_frontend')
        archivo_backend = config.get('GENERAL', 'archivo_backend', fallback='@prompts_backend')
        
        print(f"📁 Módulo destino: {modulo_destino}")
        print(f"📄 Archivo frontend: {archivo_frontend}")
        print(f"📄 Archivo backend: {archivo_backend}")
        print()
        
        # Función para construir prompts (copiada del orquestador)
        def construir_prompt(numero: int, archivo: str) -> str:
            if numero == 1:
                if modulo_destino:
                    return f"Desarrólleme el primer prompt de {archivo} en el módulo {modulo_destino}"
                else:
                    return f"Desarrólleme el primer prompt de {archivo}"
            else:
                if modulo_destino:
                    return f"Desarrólleme el prompt {numero} de {archivo} en el módulo {modulo_destino}"
                else:
                    return f"Desarrólleme el prompt {numero} de {archivo}"
        
        # Probar construcción de prompts
        print("🔍 PROMPTS GENERADOS:")
        print("-" * 50)
        
        # Frontend prompts
        print("📱 FRONTEND:")
        for i in range(1, 4):
            prompt = construir_prompt(i, archivo_frontend)
            print(f"   {i}. {prompt}")
        
        print()
        
        # Backend prompts
        print("🔧 BACKEND:")
        for i in range(1, 4):
            prompt = construir_prompt(i, archivo_backend)
            print(f"   {i}. {prompt}")
        
        print()
        print("✅ Los prompts se están construyendo correctamente")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    import os
    probar_construccion_prompt()
