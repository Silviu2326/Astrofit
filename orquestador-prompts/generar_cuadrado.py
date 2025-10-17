#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de imagen de ejemplo para el cuadrado de detección.
"""

import cv2
import numpy as np

def crear_cuadrado_ejemplo():
    """Crea una imagen de ejemplo del cuadrado que aparece al enviar prompts."""
    # Crear una imagen de 50x50 píxeles con fondo transparente
    size = 50
    img = np.zeros((size, size, 4), dtype=np.uint8)  # 4 canales para RGBA
    
    # Dibujar un cuadrado azul con borde blanco
    cv2.rectangle(img, (5, 5), (size-5, size-5), (0, 150, 255, 255), -1)  # Relleno azul
    cv2.rectangle(img, (5, 5), (size-5, size-5), (255, 255, 255, 255), 2)  # Borde blanco
    
    # Agregar un pequeño indicador de carga (círculo)
    center = (size//2, size//2)
    cv2.circle(img, center, 8, (255, 255, 255, 255), 2)
    
    # Guardar como PNG con transparencia
    cv2.imwrite('cuadrado.png', img)
    print("✅ Imagen cuadrado.png creada exitosamente")
    print("📏 Tamaño: 50x50 píxeles")
    print("🎨 Color: Azul con borde blanco")

if __name__ == "__main__":
    crear_cuadrado_ejemplo()
