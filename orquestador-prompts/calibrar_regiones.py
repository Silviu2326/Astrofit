#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Calibrador visual para el Orquestador de Prompts.
Permite seleccionar regiones e inputs con el ratón.
"""

import pyautogui
import cv2
import numpy as np
import json
import os
from datetime import datetime
from typing import Tuple, Optional

class CalibradorRegiones:
    """Calibrador visual para regiones e inputs."""
    
    def __init__(self):
        self.puntos = []
        self.region_actual = None
        self.regiones = {}
        self.coordenadas = {}
        self.config_path = "config.ini"
        
        # Configurar pyautogui
        pyautogui.FAILSAFE = True
        
        print("🎯 Calibrador de Regiones para Orquestador de Prompts")
        print("=" * 60)
    
    def _mouse_callback(self, event, x, y, flags, param):
        """Callback para capturar clicks del mouse."""
        if event == cv2.EVENT_LBUTTONDOWN:
            self.puntos.append((x, y))
            print(f"   📍 Punto {len(self.puntos)}: ({x}, {y})")
            
            if len(self.puntos) == 2:
                # Calcular región
                x1, y1 = self.puntos[0]
                x2, y2 = self.puntos[1]
                
                x_min, x_max = min(x1, x2), max(x1, x2)
                y_min, y_max = min(y1, y2), max(y1, y2)
                
                self.region_actual = (x_min, y_min, x_max - x_min, y_max - y_min)
                print(f"   📐 Región: {self.region_actual}")
                
                # Dibujar rectángulo
                cv2.rectangle(self.screenshot, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
                cv2.imshow('Calibrador', self.screenshot)
    
    def _capturar_region(self, nombre: str, descripcion: str) -> Optional[Tuple[int, int, int, int]]:
        """Captura una región usando el mouse."""
        print(f"\n🖱️  {descripcion}")
        print("   Haz clic y arrastra para seleccionar la región")
        print("   Presiona 's' para guardar, 'r' para reiniciar, 'q' para cancelar")
        
        # Capturar pantalla
        screenshot = pyautogui.screenshot()
        self.screenshot = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
        
        # Resetear puntos
        self.puntos = []
        self.region_actual = None
        
        # Crear ventana
        cv2.namedWindow('Calibrador', cv2.WINDOW_NORMAL)
        cv2.setMouseCallback('Calibrador', self._mouse_callback)
        cv2.imshow('Calibrador', self.screenshot)
        
        while True:
            key = cv2.waitKey(1) & 0xFF
            
            if key == ord('s') and self.region_actual:
                # Guardar región
                self.regiones[nombre] = self.region_actual
                print(f"   ✅ Región {nombre} guardada: {self.region_actual}")
                break
            elif key == ord('r'):
                # Reiniciar
                self.puntos = []
                self.region_actual = None
                cv2.imshow('Calibrador', self.screenshot)
                print("   🔄 Reiniciado")
            elif key == ord('q'):
                # Cancelar
                print(f"   ❌ Cancelado {nombre}")
                return None
        
        cv2.destroyAllWindows()
        return self.region_actual
    
    def _capturar_coordenada(self, nombre: str, descripcion: str) -> Optional[Tuple[int, int]]:
        """Captura una coordenada específica."""
        print(f"\n🖱️  {descripcion}")
        print("   Haz clic en la posición deseada")
        print("   Presiona 's' para guardar, 'q' para cancelar")
        
        # Capturar pantalla
        screenshot = pyautogui.screenshot()
        self.screenshot = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
        
        # Resetear puntos
        self.puntos = []
        
        # Crear ventana
        cv2.namedWindow('Calibrador', cv2.WINDOW_NORMAL)
        cv2.setMouseCallback('Calibrador', self._mouse_callback)
        cv2.imshow('Calibrador', self.screenshot)
        
        while True:
            key = cv2.waitKey(1) & 0xFF
            
            if key == ord('s') and len(self.puntos) >= 1:
                # Guardar coordenada
                coord = self.puntos[0]
                self.coordenadas[nombre] = coord
                print(f"   ✅ Coordenada {nombre} guardada: {coord}")
                break
            elif key == ord('q'):
                # Cancelar
                print(f"   ❌ Cancelado {nombre}")
                return None
        
        cv2.destroyAllWindows()
        return self.coordenadas.get(nombre)
    
    def _generar_config(self):
        """Genera la configuración actualizada."""
        print("\n📝 Generando configuración...")
        
        # Leer config existente
        config_lines = []
        if os.path.exists(self.config_path):
            with open(self.config_path, 'r', encoding='utf-8') as f:
                config_lines = f.readlines()
        
        # Crear nuevo config
        nuevo_config = []
        seccion_actual = None
        
        for line in config_lines:
            line = line.strip()
            
            # Detectar sección
            if line.startswith('[') and line.endswith(']'):
                seccion_actual = line[1:-1]
                nuevo_config.append(line + '\n')
                continue
            
            # Reemplazar valores conocidos
            if seccion_actual == 'COORDENADAS':
                if line.startswith('chat_izq_x ='):
                    nuevo_config.append(f"chat_izq_x = {self.coordenadas.get('chat_izq', (0, 0))[0]}\n")
                elif line.startswith('chat_izq_y ='):
                    nuevo_config.append(f"chat_izq_y = {self.coordenadas.get('chat_izq', (0, 0))[1]}\n")
                elif line.startswith('chat_der_x ='):
                    nuevo_config.append(f"chat_der_x = {self.coordenadas.get('chat_der', (0, 0))[0]}\n")
                elif line.startswith('chat_der_y ='):
                    nuevo_config.append(f"chat_der_y = {self.coordenadas.get('chat_der', (0, 0))[1]}\n")
                else:
                    nuevo_config.append(line + '\n')
            elif seccion_actual == 'REGIONES':
                if line.startswith('region_frontend_x ='):
                    nuevo_config.append(f"region_frontend_x = {self.regiones.get('region_frontend', (0, 0, 0, 0))[0]}\n")
                elif line.startswith('region_frontend_y ='):
                    nuevo_config.append(f"region_frontend_y = {self.regiones.get('region_frontend', (0, 0, 0, 0))[1]}\n")
                elif line.startswith('region_frontend_w ='):
                    nuevo_config.append(f"region_frontend_w = {self.regiones.get('region_frontend', (0, 0, 0, 0))[2]}\n")
                elif line.startswith('region_frontend_h ='):
                    nuevo_config.append(f"region_frontend_h = {self.regiones.get('region_frontend', (0, 0, 0, 0))[3]}\n")
                elif line.startswith('region_backend_x ='):
                    nuevo_config.append(f"region_backend_x = {self.regiones.get('region_backend', (0, 0, 0, 0))[0]}\n")
                elif line.startswith('region_backend_y ='):
                    nuevo_config.append(f"region_backend_y = {self.regiones.get('region_backend', (0, 0, 0, 0))[1]}\n")
                elif line.startswith('region_backend_w ='):
                    nuevo_config.append(f"region_backend_w = {self.regiones.get('region_backend', (0, 0, 0, 0))[2]}\n")
                elif line.startswith('region_backend_h ='):
                    nuevo_config.append(f"region_backend_h = {self.regiones.get('region_backend', (0, 0, 0, 0))[3]}\n")
                else:
                    nuevo_config.append(line + '\n')
            else:
                nuevo_config.append(line + '\n')
        
        # Guardar backup
        if os.path.exists(self.config_path):
            backup_path = f"config_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.ini"
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.writelines(config_lines)
            print(f"   💾 Backup guardado en: {backup_path}")
        
        # Guardar nuevo config
        with open(self.config_path, 'w', encoding='utf-8') as f:
            f.writelines(nuevo_config)
        
        print(f"   ✅ Configuración guardada en: {self.config_path}")
    
    def _mostrar_resumen(self):
        """Muestra un resumen de la calibración."""
        print("\n" + "="*60)
        print("📋 RESUMEN DE CALIBRACIÓN")
        print("="*60)
        
        print("\n📍 Coordenadas capturadas:")
        for nombre, coord in self.coordenadas.items():
            print(f"   {nombre}: {coord}")
        
        print("\n📐 Regiones capturadas:")
        for nombre, region in self.regiones.items():
            print(f"   {nombre}: {region}")
        
        print("\n✅ Calibración completada!")
        print("💡 Ahora puedes ejecutar: python orquestador_prompts_v2.py")
    
    def ejecutar_calibracion(self):
        """Ejecuta el proceso completo de calibración."""
        try:
            print("\n🎯 PASO 1: Coordenadas de inputs")
            print("   Necesitamos las coordenadas exactas de los inputs de cada chat")
            
            # Coordenada chat izquierdo
            coord_izq = self._capturar_coordenada(
                'chat_izq', 
                'Chat izquierdo (frontend) - Haz clic en el input'
            )
            
            if not coord_izq:
                print("❌ Calibración cancelada")
                return
            
            # Coordenada chat derecho
            coord_der = self._capturar_coordenada(
                'chat_der',
                'Chat derecho (backend) - Haz clic en el input'
            )
            
            if not coord_der:
                print("❌ Calibración cancelada")
                return
            
            print("\n🎯 PASO 2: Regiones de detección")
            print("   Necesitamos definir las regiones donde aparecerá el cuadrado")
            
            # Región frontend
            region_frontend = self._capturar_region(
                'region_frontend',
                'Región de detección para chat frontend (izquierdo)'
            )
            
            if not region_frontend:
                print("❌ Calibración cancelada")
                return
            
            # Región backend
            region_backend = self._capturar_region(
                'region_backend',
                'Región de detección para chat backend (derecho)'
            )
            
            if not region_backend:
                print("❌ Calibración cancelada")
                return
            
            # Generar configuración
            self._generar_config()
            
            # Mostrar resumen
            self._mostrar_resumen()
            
        except KeyboardInterrupt:
            print("\n❌ Calibración cancelada por el usuario")
        except Exception as e:
            print(f"\n❌ Error durante la calibración: {e}")
        finally:
            cv2.destroyAllWindows()


def main():
    """Función principal del calibrador."""
    calibrador = CalibradorRegiones()
    calibrador.ejecutar_calibracion()


if __name__ == "__main__":
    main()
