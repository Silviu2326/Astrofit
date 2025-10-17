#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script simple para obtener coordenadas del mouse
"""

import pyautogui
import time
import keyboard

def obtener_coordenadas():
    """Obtiene coordenadas del mouse cuando se presiona una tecla."""
    print("🎯 Obtener Coordenadas del Mouse")
    print("=" * 50)
    print("📋 Instrucciones:")
    print("1. Abre Cursor con tus dos chats")
    print("2. Posiciona el mouse sobre el INPUT del chat IZQUIERDO (frontend)")
    print("3. Presiona 'F1' para capturar coordenadas del frontend")
    print("4. Posiciona el mouse sobre el INPUT del chat DERECHO (backend)")
    print("5. Presiona 'F2' para capturar coordenadas del backend")
    print("6. Presiona 'ESC' para salir")
    print("=" * 50)
    
    coordenadas = {}
    
    def capturar_frontend():
        x, y = pyautogui.position()
        coordenadas['frontend'] = (x, y)
        print(f"✅ Frontend capturado: ({x}, {y})")
    
    def capturar_backend():
        x, y = pyautogui.position()
        coordenadas['backend'] = (x, y)
        print(f"✅ Backend capturado: ({x}, {y})")
    
    def mostrar_resultado():
        if 'frontend' in coordenadas and 'backend' in coordenadas:
            print("\n🎯 COORDENADAS OBTENIDAS:")
            print("=" * 30)
            print(f"Frontend: {coordenadas['frontend']}")
            print(f"Backend: {coordenadas['backend']}")
            print("\n📝 Actualiza tu config.ini con:")
            print(f"chat_izq_x = {coordenadas['frontend'][0]}")
            print(f"chat_izq_y = {coordenadas['frontend'][1]}")
            print(f"chat_der_x = {coordenadas['backend'][0]}")
            print(f"chat_der_y = {coordenadas['backend'][1]}")
        else:
            print("❌ Faltan coordenadas. Captura ambas antes de salir.")
    
    # Configurar atajos
    keyboard.add_hotkey('f1', capturar_frontend)
    keyboard.add_hotkey('f2', capturar_backend)
    keyboard.add_hotkey('f3', mostrar_resultado)
    
    print("🔄 Esperando capturas... (F1=Frontend, F2=Backend, F3=Mostrar, ESC=Salir)")
    
    try:
        while True:
            time.sleep(0.1)
    except KeyboardInterrupt:
        mostrar_resultado()
        print("\n👋 Saliendo...")

if __name__ == "__main__":
    obtener_coordenadas()