#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Orquestador de Prompts para Cursor
Automatiza el envío de prompts a dos chats (frontend y backend) con detección visual.
"""

import pyautogui
import cv2
import keyboard
import time
import logging
import configparser
import os
import json
from typing import Tuple, Optional, Dict, Any
from datetime import datetime

# Configuración de pyautogui
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.5

class OrquestadorPrompts:
    """Clase principal para orquestar el envío de prompts."""
    
    def __init__(self, config_path: str = "config.ini"):
        """Inicializa el orquestador con la configuración."""
        self.config = self._leer_config(config_path)
        self._configurar_logging()
        self.pausado = False
        self.abortar = False
        self.contador_frontend = 0
        self.contador_backend = 0
        self.completado_frontend = False
        self.completado_backend = False
        
        # Cargar imagen del cuadrado
        self.cuadrado_template = self._cargar_imagen_cuadrado()
        
        # Configurar atajos de teclado
        self._configurar_atajos()
        
        # Coordenadas de los chats
        self.chat_izq_coords = (
            self.config.getint('COORDENADAS', 'chat_izq_x'),
            self.config.getint('COORDENADAS', 'chat_izq_y')
        )
        self.chat_der_coords = (
            self.config.getint('COORDENADAS', 'chat_der_x'),
            self.config.getint('COORDENADAS', 'chat_der_y')
        )
        
        # Región para detectar el cuadrado
        self.region_cuadrado = (
            self.config.getint('COORDENADAS', 'region_cuadrado_x'),
            self.config.getint('COORDENADAS', 'region_cuadrado_y'),
            self.config.getint('COORDENADAS', 'region_cuadrado_w'),
            self.config.getint('COORDENADAS', 'region_cuadrado_h')
        )
        
        logging.info("Orquestador inicializado correctamente")
    
    def _leer_config(self, config_path: str) -> configparser.ConfigParser:
        """Lee el archivo de configuración."""
        config = configparser.ConfigParser()
        if not os.path.exists(config_path):
            raise FileNotFoundError(f"No se encontró el archivo de configuración: {config_path}")
        
        config.read(config_path, encoding='utf-8')
        return config
    
    def _configurar_logging(self):
        """Configura el sistema de logging."""
        nivel = getattr(logging, self.config.get('LOGGING', 'nivel_log', fallback='INFO'))
        archivo_log = self.config.get('LOGGING', 'archivo_log', fallback='orquestador.log')
        
        logging.basicConfig(
            level=nivel,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(archivo_log, encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
    
    def _cargar_imagen_cuadrado(self) -> Optional[Any]:
        """Carga la imagen del cuadrado para detección."""
        if os.path.exists('cuadrado.png'):
            return cv2.imread('cuadrado.png', cv2.IMREAD_COLOR)
        else:
            logging.warning("No se encontró cuadrado.png. La detección visual no funcionará.")
            return None
    
    def _configurar_atajos(self):
        """Configura los atajos de teclado."""
        keyboard.add_hotkey('f8', self._toggle_pausa)
        keyboard.add_hotkey('f9', self._forzar_salto)
        keyboard.add_hotkey('esc', self._abortar_ejecucion)
        logging.info("Atajos configurados: F8 (pausar), F9 (saltar), ESC (abortar)")
    
    def _toggle_pausa(self):
        """Alterna el estado de pausa."""
        self.pausado = not self.pausado
        estado = "PAUSADO" if self.pausado else "REANUDADO"
        logging.info(f"Estado: {estado}")
        print(f"🔄 {estado}")
    
    def _forzar_salto(self):
        """Fuerza el salto al siguiente prompt."""
        logging.info("Forzando salto al siguiente prompt")
        print("⏭️ Saltando al siguiente prompt...")
    
    def _abortar_ejecucion(self):
        """Aborta la ejecución del script."""
        self.abortar = True
        logging.info("Abortando ejecución por solicitud del usuario")
        print("🛑 Abortando ejecución...")
    
    def _esperar_pausa(self):
        """Espera mientras el script está pausado."""
        while self.pausado and not self.abortar:
            time.sleep(0.1)
    
    def _focus_chat(self, coords: Tuple[int, int]):
        """Hace clic en el input del chat especificado."""
        try:
            pyautogui.click(coords[0], coords[1])
            time.sleep(0.3)
            logging.debug(f"Click en chat: {coords}")
        except Exception as e:
            logging.error(f"Error al hacer click en chat {coords}: {e}")
            raise
    
    def _enviar_prompt(self, mensaje: str, chat_coords: Tuple[int, int]):
        """Envía un prompt al chat especificado."""
        try:
            # Hacer click en el input del chat
            self._focus_chat(chat_coords)
            
            # Limpiar el input y escribir el mensaje
            pyautogui.hotkey('ctrl', 'a')
            time.sleep(0.1)
            pyautogui.write(mensaje)
            time.sleep(0.2)
            
            # Enviar con Enter
            pyautogui.press('enter')
            
            logging.info(f"Prompt enviado: {mensaje[:50]}...")
            print(f"📤 Enviado: {mensaje[:50]}...")
            
        except Exception as e:
            logging.error(f"Error al enviar prompt: {e}")
            raise
    
    def _detectar_cuadrado(self, timeout_ms: int) -> bool:
        """Detecta si el cuadrado está visible en pantalla."""
        if self.cuadrado_template is None:
            # Si no hay imagen, simular detección con timeout
            time.sleep(timeout_ms / 1000)
            return True
        
        timeout_seconds = timeout_ms / 1000
        start_time = time.time()
        
        while time.time() - start_time < timeout_seconds:
            if self.abortar:
                return False
                
            try:
                # Capturar pantalla
                screenshot = pyautogui.screenshot(region=self.region_cuadrado)
                screenshot_cv = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
                
                # Buscar el cuadrado
                result = cv2.matchTemplate(screenshot_cv, self.cuadrado_template, cv2.TM_CCOEFF_NORMED)
                _, max_val, _, _ = cv2.minMaxLoc(result)
                
                if max_val > 0.8:  # Umbral de confianza
                    return True
                    
            except Exception as e:
                logging.debug(f"Error en detección: {e}")
            
            time.sleep(0.1)
        
        return False
    
    def _esperar_cuadrado_aparezca(self, timeout_ms: int) -> bool:
        """Espera a que aparezca el cuadrado."""
        logging.info("Esperando que aparezca el cuadrado...")
        print("⏳ Esperando cuadrado...")
        return self._detectar_cuadrado(timeout_ms)
    
    def _esperar_cuadrado_desaparezca(self, timeout_ms: int) -> bool:
        """Espera a que desaparezca el cuadrado."""
        logging.info("Esperando que desaparezca el cuadrado...")
        print("⏳ Esperando que termine el procesamiento...")
        
        timeout_seconds = timeout_ms / 1000
        start_time = time.time()
        
        while time.time() - start_time < timeout_seconds:
            if self.abortar:
                return False
                
            # Si no detectamos el cuadrado, significa que desapareció
            if not self._detectar_cuadrado(100):  # Verificación rápida
                return True
                
            time.sleep(0.5)
        
        logging.warning("Timeout esperando que desaparezca el cuadrado")
        return False
    
    def _construir_prompt(self, numero: int, archivo: str) -> str:
        """Construye el mensaje del prompt según el número."""
        if numero == 1:
            return f"Desarrólleme el primer prompt de {archivo}"
        else:
            return f"Desarrólleme el prompt {numero} de {archivo}"
    
    def _cargar_prompts(self, archivo: str) -> list:
        """Carga los prompts desde un archivo JSON."""
        try:
            with open(archivo, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get('prompts', [])
        except Exception as e:
            logging.error(f"Error al cargar prompts desde {archivo}: {e}")
            return []
    
    def _procesar_chat(self, chat_tipo: str, coords: Tuple[int, int], archivo: str, max_prompts: int) -> bool:
        """Procesa un chat específico."""
        contador = getattr(self, f'contador_{chat_tipo}')
        completado = getattr(self, f'completado_{chat_tipo}')
        
        if completado or contador >= max_prompts:
            return True
        
        # Construir y enviar prompt
        prompt = self._construir_prompt(contador + 1, archivo)
        
        # Reintentos de envío
        reintentos = self.config.getint('GENERAL', 'reintentos_envio')
        for intento in range(reintentos + 1):
            try:
                self._enviar_prompt(prompt, coords)
                
                # Esperar que aparezca el cuadrado
                timeout_aparecer = self.config.getint('GENERAL', 'timeout_appear_ms')
                if not self._esperar_cuadrado_aparezca(timeout_aparecer):
                    logging.warning(f"Cuadrado no apareció en intento {intento + 1}")
                    if intento < reintentos:
                        continue
                    else:
                        logging.error(f"Falló envío después de {reintentos + 1} intentos")
                        return False
                
                # Esperar que desaparezca el cuadrado
                timeout_desaparecer = self.config.getint('GENERAL', 'timeout_disappear_ms')
                if not self._esperar_cuadrado_desaparezca(timeout_desaparecer):
                    logging.warning("Cuadrado no desapareció en tiempo esperado")
                    # Continuar de todas formas
                
                # Incrementar contador
                setattr(self, f'contador_{chat_tipo}', contador + 1)
                logging.info(f"Prompt {contador + 1} de {chat_tipo} completado")
                print(f"✅ Prompt {contador + 1} de {chat_tipo} completado")
                
                return True
                
            except Exception as e:
                logging.error(f"Error en intento {intento + 1}: {e}")
                if intento < reintentos:
                    time.sleep(2)  # Esperar antes del siguiente intento
                    continue
                else:
                    return False
        
        return False
    
    def ejecutar_flujo(self):
        """Ejecuta el flujo principal del orquestador."""
        logging.info("Iniciando flujo de orquestación")
        print("🚀 Iniciando orquestador de prompts...")
        print("📋 Controles: F8 (pausar), F9 (saltar), ESC (abortar)")
        
        # Cargar configuración
        archivo_frontend = self.config.get('GENERAL', 'archivo_frontend')
        archivo_backend = self.config.get('GENERAL', 'archivo_backend')
        max_frontend = self.config.getint('GENERAL', 'max_prompts_frontend')
        max_backend = self.config.getint('GENERAL', 'max_prompts_backend')
        modo = self.config.get('GENERAL', 'modo')
        
        # Cargar prompts
        prompts_frontend = self._cargar_prompts(archivo_frontend)
        prompts_backend = self._cargar_prompts(archivo_backend)
        
        if not prompts_frontend and not prompts_backend:
            logging.error("No se encontraron prompts para procesar")
            return
        
        logging.info(f"Modo: {modo}, Frontend: {len(prompts_frontend)} prompts, Backend: {len(prompts_backend)} prompts")
        
        try:
            if modo == 'alterno':
                self._ejecutar_modo_alterno(archivo_frontend, archivo_backend, max_frontend, max_backend)
            else:
                self._ejecutar_modo_bloque(archivo_frontend, archivo_backend, max_frontend, max_backend)
                
        except KeyboardInterrupt:
            logging.info("Interrumpido por el usuario")
        except Exception as e:
            logging.error(f"Error en el flujo principal: {e}")
        finally:
            logging.info("Finalizando orquestador")
            print("🏁 Orquestador finalizado")
    
    def _ejecutar_modo_alterno(self, archivo_frontend: str, archivo_backend: str, max_frontend: int, max_backend: int):
        """Ejecuta el modo alterno entre frontend y backend."""
        while not (self.completado_frontend and self.completado_backend) and not self.abortar:
            self._esperar_pausa()
            if self.abortar:
                break
            
            # Procesar frontend
            if not self.completado_frontend:
                if self._procesar_chat('frontend', self.chat_izq_coords, archivo_frontend, max_frontend):
                    if self.contador_frontend >= max_frontend:
                        self.completado_frontend = True
                        logging.info("Frontend completado")
                        print("✅ Frontend completado")
            
            self._esperar_pausa()
            if self.abortar:
                break
            
            # Procesar backend
            if not self.completado_backend:
                if self._procesar_chat('backend', self.chat_der_coords, archivo_backend, max_backend):
                    if self.contador_backend >= max_backend:
                        self.completado_backend = True
                        logging.info("Backend completado")
                        print("✅ Backend completado")
    
    def _ejecutar_modo_bloque(self, archivo_frontend: str, archivo_backend: str, max_frontend: int, max_backend: int):
        """Ejecuta el modo bloque (todos los frontend, luego todos los backend)."""
        # Procesar todos los frontend
        while not self.completado_frontend and not self.abortar:
            self._esperar_pausa()
            if self.abortar:
                break
                
            if self._procesar_chat('frontend', self.chat_izq_coords, archivo_frontend, max_frontend):
                if self.contador_frontend >= max_frontend:
                    self.completado_frontend = True
                    logging.info("Frontend completado")
                    print("✅ Frontend completado")
        
        # Procesar todos los backend
        while not self.completado_backend and not self.abortar:
            self._esperar_pausa()
            if self.abortar:
                break
                
            if self._procesar_chat('backend', self.chat_der_coords, archivo_backend, max_backend):
                if self.contador_backend >= max_backend:
                    self.completado_backend = True
                    logging.info("Backend completado")
                    print("✅ Backend completado")


def main():
    """Función principal."""
    try:
        orquestador = OrquestadorPrompts()
        orquestador.ejecutar_flujo()
    except Exception as e:
        logging.error(f"Error fatal: {e}")
        print(f"❌ Error fatal: {e}")


if __name__ == "__main__":
    # Importar numpy para OpenCV
    import numpy as np
    main()
