#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de plantillas para diferentes temas de Cursor.
"""

import cv2
import numpy as np

def crear_plantilla_dark():
    """Crea plantilla para tema oscuro."""
    size = 50
    img = np.zeros((size, size, 4), dtype=np.uint8)
    
    # Cuadrado azul oscuro con borde claro
    cv2.rectangle(img, (5, 5), (size-5, size-5), (30, 30, 30, 255), -1)  # Fondo oscuro
    cv2.rectangle(img, (5, 5), (size-5, size-5), (100, 150, 255, 255), 2)  # Borde azul
    cv2.rectangle(img, (5, 5), (size-5, size-5), (255, 255, 255, 255), 1)  # Borde blanco sutil
    
    # Indicador de carga
    center = (size//2, size//2)
    cv2.circle(img, center, 8, (100, 150, 255, 255), 2)
    
    cv2.imwrite('cuadrado_dark.png', img)
    print("✅ Plantilla tema oscuro creada: cuadrado_dark.png")

def crear_plantilla_light():
    """Crea plantilla para tema claro."""
    size = 50
    img = np.zeros((size, size, 4), dtype=np.uint8)
    
    # Cuadrado azul claro con borde oscuro
    cv2.rectangle(img, (5, 5), (size-5, size-5), (240, 240, 240, 255), -1)  # Fondo claro
    cv2.rectangle(img, (5, 5), (size-5, size-5), (0, 100, 200, 255), 2)  # Borde azul oscuro
    cv2.rectangle(img, (5, 5), (size-5, size-5), (0, 0, 0, 255), 1)  # Borde negro sutil
    
    # Indicador de carga
    center = (size//2, size//2)
    cv2.circle(img, center, 8, (0, 100, 200, 255), 2)
    
    cv2.imwrite('cuadrado_light.png', img)
    print("✅ Plantilla tema claro creada: cuadrado_light.png")

def crear_plantilla_highdpi():
    """Crea plantilla para pantallas de alta resolución."""
    size = 100  # Más grande para alta resolución
    img = np.zeros((size, size, 4), dtype=np.uint8)
    
    # Cuadrado más grande y detallado
    cv2.rectangle(img, (10, 10), (size-10, size-10), (0, 150, 255, 255), -1)  # Relleno azul
    cv2.rectangle(img, (10, 10), (size-10, size-10), (255, 255, 255, 255), 3)  # Borde blanco más grueso
    
    # Indicador de carga más grande
    center = (size//2, size//2)
    cv2.circle(img, center, 15, (255, 255, 255, 255), 3)
    
    cv2.imwrite('cuadrado_highdpi.png', img)
    print("✅ Plantilla alta resolución creada: cuadrado_highdpi.png")

def crear_plantilla_default():
    """Crea plantilla por defecto."""
    size = 50
    img = np.zeros((size, size, 4), dtype=np.uint8)
    
    # Cuadrado azul estándar
    cv2.rectangle(img, (5, 5), (size-5, size-5), (0, 150, 255, 255), -1)  # Relleno azul
    cv2.rectangle(img, (5, 5), (size-5, size-5), (255, 255, 255, 255), 2)  # Borde blanco
    
    # Indicador de carga
    center = (size//2, size//2)
    cv2.circle(img, center, 8, (255, 255, 255, 255), 2)
    
    cv2.imwrite('cuadrado.png', img)
    print("✅ Plantilla por defecto creada: cuadrado.png")

def main():
    """Genera todas las plantillas."""
    print("🎨 Generador de plantillas para Orquestador de Prompts")
    print("=" * 60)
    
    try:
        crear_plantilla_default()
        crear_plantilla_dark()
        crear_plantilla_light()
        crear_plantilla_highdpi()
        
        print("\n✅ Todas las plantillas generadas exitosamente!")
        print("\n📋 Plantillas disponibles:")
        print("   - cuadrado.png (por defecto)")
        print("   - cuadrado_dark.png (tema oscuro)")
        print("   - cuadrado_light.png (tema claro)")
        print("   - cuadrado_highdpi.png (alta resolución)")
        
    except Exception as e:
        print(f"❌ Error generando plantillas: {e}")

if __name__ == "__main__":
    main()
