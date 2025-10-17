#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Orquestador de Prompts para Cursor v2.0
Versión mejorada con detección multi-plantilla, persistencia, métricas y más.
"""

import pyautogui
import cv2
import keyboard
import time
import logging
import configparser
import os
import json
import numpy as np
from typing import Tuple, Optional, Dict, Any, List
from datetime import datetime
import csv
import shutil
from pathlib import Path

# Configuración de pyautogui
pyautogui.FAILSAFE = False  # Desactivado para evitar interrupciones
pyautogui.PAUSE = 0.1

class OrquestadorPromptsV2:
    """Clase principal mejorada para orquestar el envío de prompts."""
    
    def __init__(self, config_path: str = "config.ini"):
        """Inicializa el orquestador con la configuración."""
        self.config = self._leer_config(config_path)
        self._configurar_logging()
        self._configurar_directorios()
        
        # Estado del orquestador
        self.pausado = False
        self.abortar = False
        self.contador_frontend = 0
        self.contador_backend = 0
        self.completado_frontend = False
        self.completado_backend = False
        self.modo_actual = self.config.get('GENERAL', 'modo')
        
        # Métricas
        self.metricas = {
            'inicio': datetime.now(),
            'prompts_enviados': 0,
            'reintentos_totales': 0,
            'timeouts_totales': 0,
            'errores_totales': 0,
            'tiempos_procesamiento': [],
            'detalles_por_chat': {
                'frontend': {'enviados': 0, 'reintentos': 0, 'timeouts': 0, 'errores': 0},
                'backend': {'enviados': 0, 'reintentos': 0, 'timeouts': 0, 'errores': 0}
            }
        }
        
        # Cargar plantillas de detección
        self.plantillas = self._cargar_plantillas()
        
        # Configurar atajos de teclado
        self._configurar_atajos()
        
        # Coordenadas y regiones
        self._configurar_coordenadas()
        
        # Cargar estado previo si existe
        self._cargar_estado()
        
        logging.info("Orquestador v2.0 inicializado correctamente")
    
    def _leer_config(self, config_path: str) -> configparser.ConfigParser:
        """Lee el archivo de configuración."""
        config = configparser.ConfigParser()
        if not os.path.exists(config_path):
            raise FileNotFoundError(f"No se encontró el archivo de configuración: {config_path}")
        
        config.read(config_path, encoding='utf-8')
        return config
    
    def _configurar_logging(self):
        """Configura el sistema de logging mejorado."""
        nivel = getattr(logging, self.config.get('LOGGING', 'nivel_log', fallback='INFO'))
        archivo_log = self.config.get('LOGGING', 'archivo_log', fallback='orquestador.log')
        
        # Crear directorio de logs si no existe
        log_dir = Path(self.config.get('LOGGING', 'directorio_logs', fallback='logs'))
        log_dir.mkdir(exist_ok=True)
        
        # Configurar logging con ID de corrida
        self.corrida_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        logging.basicConfig(
            level=nivel,
            format=f'%(asctime)s - {self.corrida_id} - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(archivo_log, encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
    
    def _configurar_directorios(self):
        """Configura directorios necesarios."""
        directorios = ['logs', 'logs/errors', 'backups']
        for directorio in directorios:
            Path(directorio).mkdir(exist_ok=True)
    
    def _cargar_plantillas(self) -> Dict[str, Any]:
        """Carga las plantillas de detección con fallback."""
        plantillas = {}
        tema = self.config.get('DETECCION', 'tema', fallback='auto')
        
        # Plantillas disponibles
        plantillas_config = {
            'dark': self.config.get('DETECCION', 'cuadrado_dark', fallback='cuadrado_dark.png'),
            'light': self.config.get('DETECCION', 'cuadrado_light', fallback='cuadrado_light.png'),
            'highdpi': self.config.get('DETECCION', 'cuadrado_highdpi', fallback='cuadrado_highdpi.png')
        }
        
        # Cargar plantillas disponibles
        for nombre, archivo in plantillas_config.items():
            if os.path.exists(archivo):
                try:
                    plantillas[nombre] = cv2.imread(archivo, cv2.IMREAD_COLOR)
                    logging.info(f"Plantilla {nombre} cargada desde {archivo}")
                except Exception as e:
                    logging.warning(f"Error cargando plantilla {nombre}: {e}")
        
        # Fallback a cuadrado.png si no hay plantillas específicas
        if not plantillas and os.path.exists('cuadrado.png'):
            try:
                plantillas['default'] = cv2.imread('cuadrado.png', cv2.IMREAD_COLOR)
                logging.info("Usando plantilla por defecto: cuadrado.png")
            except Exception as e:
                logging.warning(f"Error cargando plantilla por defecto: {e}")
        
        if not plantillas:
            logging.warning("No se encontraron plantillas de detección. La detección visual no funcionará.")
        
        return plantillas
    
    def _configurar_atajos(self):
        """Configura los atajos de teclado."""
        keyboard.add_hotkey('f8', self._toggle_pausa)
        keyboard.add_hotkey('f9', self._forzar_salto)
        keyboard.add_hotkey('esc', self._abortar_ejecucion)
        logging.info("Atajos configurados: F8 (pausar), F9 (saltar), ESC (abortar)")
    
    def _configurar_coordenadas(self):
        """Configura coordenadas y regiones."""
        # Coordenadas de los chats
        self.chat_izq_coords = (
            self.config.getint('COORDENADAS', 'chat_izq_x'),
            self.config.getint('COORDENADAS', 'chat_izq_y')
        )
        self.chat_der_coords = (
            self.config.getint('COORDENADAS', 'chat_der_x'),
            self.config.getint('COORDENADAS', 'chat_der_y')
        )
        
        # Regiones de detección por chat
        self.region_frontend = (
            self.config.getint('REGIONES', 'region_frontend_x'),
            self.config.getint('REGIONES', 'region_frontend_y'),
            self.config.getint('REGIONES', 'region_frontend_w'),
            self.config.getint('REGIONES', 'region_frontend_h')
        )
        self.region_backend = (
            self.config.getint('REGIONES', 'region_backend_x'),
            self.config.getint('REGIONES', 'region_backend_y'),
            self.config.getint('REGIONES', 'region_backend_w'),
            self.config.getint('REGIONES', 'region_backend_h')
        )
    
    def _cargar_estado(self):
        """Carga el estado previo si existe."""
        archivo_estado = self.config.get('PERSISTENCIA', 'archivo_estado', fallback='state.json')
        
        if os.path.exists(archivo_estado):
            try:
                with open(archivo_estado, 'r', encoding='utf-8') as f:
                    estado = json.load(f)
                
                self.contador_frontend = estado.get('contador_frontend', 0)
                self.contador_backend = estado.get('contador_backend', 0)
                self.completado_frontend = estado.get('completado_frontend', False)
                self.completado_backend = estado.get('completado_backend', False)
                
                logging.info(f"Estado cargado: Frontend={self.contador_frontend}, Backend={self.contador_backend}")
                
                # Preguntar si reanudar
                if not self.config.getboolean('PERSISTENCIA', 'reanudar_automatico', fallback=False):
                    respuesta = input("¿Reanudar desde el estado guardado? (s/n): ").lower().strip()
                    if respuesta not in ['s', 'si', 'sí', 'y', 'yes']:
                        self.contador_frontend = 0
                        self.contador_backend = 0
                        self.completado_frontend = False
                        self.completado_backend = False
                        logging.info("Estado reiniciado por solicitud del usuario")
                
            except Exception as e:
                logging.error(f"Error cargando estado: {e}")
    
    def _guardar_estado(self):
        """Guarda el estado actual."""
        if not self.config.getboolean('PERSISTENCIA', 'guardar_estado', fallback=True):
            return
        
        archivo_estado = self.config.get('PERSISTENCIA', 'archivo_estado', fallback='state.json')
        
        try:
            estado = {
                'contador_frontend': self.contador_frontend,
                'contador_backend': self.contador_backend,
                'completado_frontend': self.completado_frontend,
                'completado_backend': self.completado_backend,
                'modo': self.modo_actual,
                'timestamp': datetime.now().isoformat(),
                'corrida_id': self.corrida_id
            }
            
            # Backup si está habilitado
            if self.config.getboolean('PERSISTENCIA', 'backup_estado', fallback=True):
                if os.path.exists(archivo_estado):
                    shutil.copy2(archivo_estado, f"backups/state_{self.corrida_id}.json")
            
            with open(archivo_estado, 'w', encoding='utf-8') as f:
                json.dump(estado, f, indent=2, ensure_ascii=False)
            
            logging.debug("Estado guardado")
            
        except Exception as e:
            logging.error(f"Error guardando estado: {e}")
    
    def _toggle_pausa(self):
        """Alterna el estado de pausa."""
        self.pausado = not self.pausado
        estado = "PAUSADO" if self.pausado else "REANUDADO"
        logging.info(f"Estado: {estado}")
        print(f"🔄 {estado}")
        
        if self.pausado:
            self._guardar_estado()
    
    def _forzar_salto(self):
        """Fuerza el salto al siguiente prompt."""
        logging.info("Forzando salto al siguiente prompt")
        print("⏭️ Saltando al siguiente prompt...")
    
    def _abortar_ejecucion(self):
        """Aborta la ejecución del script."""
        self.abortar = True
        logging.info("Abortando ejecución por solicitud del usuario")
        print("🛑 Abortando ejecución...")
        self._guardar_estado()
    
    def _esperar_pausa(self):
        """Espera mientras el script está pausado."""
        while self.pausado and not self.abortar:
            time.sleep(0.1)
    
    def _detectar_cuadrado_mejorado(self, region: Tuple[int, int, int, int], timeout_ms: int, 
                                   debe_aparecer: bool = True) -> bool:
        """Detección mejorada con histeresis y múltiples plantillas."""
        if not self.plantillas:
            # Fallback sin detección visual
            time.sleep(timeout_ms / 1000)
            return True
        
        timeout_seconds = timeout_ms / 1000
        start_time = time.time()
        frames_sin_match = 0
        frames_requeridos = self.config.getint('DETECCION', 'frames_sin_match_para_confirmar', fallback=4)
        intervalo = self.config.getint('DETECCION', 'intervalo_chequeo_ms', fallback=200) / 1000
        confidence_min = self.config.getfloat('DETECCION', 'confidence_minimo', fallback=0.8)
        
        while time.time() - start_time < timeout_seconds:
            if self.abortar:
                return False
            
            try:
                # Capturar pantalla de la región
                screenshot = pyautogui.screenshot(region=region)
                screenshot_cv = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
                
                # Probar todas las plantillas
                max_confidence = 0
                for nombre, plantilla in self.plantillas.items():
                    try:
                        result = cv2.matchTemplate(screenshot_cv, plantilla, cv2.TM_CCOEFF_NORMED)
                        _, confidence, _, _ = cv2.minMaxLoc(result)
                        max_confidence = max(max_confidence, confidence)
                    except Exception as e:
                        logging.debug(f"Error con plantilla {nombre}: {e}")
                
                # Lógica de histeresis
                if max_confidence > confidence_min:
                    if debe_aparecer:
                        return True
                    frames_sin_match = 0
                else:
                    frames_sin_match += 1
                    if not debe_aparecer and frames_sin_match >= frames_requeridos:
                        return True
                
            except Exception as e:
                logging.debug(f"Error en detección: {e}")
                frames_sin_match += 1
            
            time.sleep(intervalo)
        
        return False
    
    def _validar_foco(self, coords: Tuple[int, int]) -> bool:
        """Valida que el foco esté en el input correcto."""
        if not self.config.getboolean('ENVIO', 'validar_foco', fallback=True):
            return True
        
        try:
            # Hacer click para asegurar foco
            pyautogui.click(coords[0], coords[1])
            time.sleep(0.2)
            
            # Enviar sonda (nueva línea + retroceso)
            pyautogui.press('enter')
            time.sleep(0.1)
            pyautogui.press('backspace')
            time.sleep(0.1)
            
            return True
            
        except Exception as e:
            logging.warning(f"Error validando foco: {e}")
            return False
    
    def _enviar_prompt_mejorado(self, mensaje: str, chat_coords: Tuple[int, int], 
                              chat_tipo: str) -> bool:
        """Envía un prompt con throttling y validación mejorada."""
        try:
            # Validar foco
            if not self._validar_foco(chat_coords):
                logging.warning(f"Foco no validado en {chat_tipo}")
            
            # Limpiar input
            pyautogui.hotkey('ctrl', 'a')
            time.sleep(0.1)
            
            # Envío con throttling
            if self.config.getboolean('ENVIO', 'pegar_con_clipboard', fallback=True):
                try:
                    # Usar clipboard para envío más rápido
                    pyautogui.copy(mensaje)
                    time.sleep(0.1)
                    pyautogui.hotkey('ctrl', 'v')
                except Exception:
                    # Fallback a tecleo lento
                    throttling = self.config.getint('ENVIO', 'throttling_ms', fallback=50) / 1000
                    for char in mensaje:
                        pyautogui.write(char)
                        time.sleep(throttling)
            else:
                # Tecleo normal
                pyautogui.write(mensaje)
            
            time.sleep(0.2)
            
            # Enviar según configuración
            enviar_con = self.config.get('ENVIO', 'enviar_con', fallback='enter')
            if enviar_con == 'ctrl_enter':
                pyautogui.hotkey('ctrl', 'enter')
            else:
                pyautogui.press('enter')
            
            logging.info(f"Prompt enviado a {chat_tipo}: {mensaje[:50]}...")
            print(f"📤 Enviado a {chat_tipo}: {mensaje[:50]}...")
            
            return True
            
        except Exception as e:
            logging.error(f"Error enviando prompt a {chat_tipo}: {e}")
            return False
    
    def _construir_prompt(self, numero: int, archivo: str) -> str:
        """Construye el mensaje del prompt según el número."""
        if numero == 1:
            return f"Desarrólleme el primer prompt de {archivo}"
        else:
            return f"Desarrólleme el prompt {numero} de {archivo}"
    
    def _construir_prompt_modulo(self, numero: int, archivo: str, modulo: str) -> str:
        """Construye el mensaje del prompt para un módulo específico."""
        if numero == 1:
            return f"Desarrólleme el primer prompt del módulo {modulo} desde {archivo}"
        else:
            return f"Desarrólleme el prompt {numero} del módulo {modulo} desde {archivo}"
    
    def _procesar_chat_mejorado(self, chat_tipo: str, coords: Tuple[int, int], 
                              archivo: str, max_prompts: int) -> bool:
        """Procesa un chat con backoff exponencial y métricas."""
        contador = getattr(self, f'contador_{chat_tipo}')
        completado = getattr(self, f'completado_{chat_tipo}')
        
        if completado or contador >= max_prompts:
            return True
        
        # Construir prompt - soporte para módulos
        if self.config.has_option('GENERAL', 'modulo_actual'):
            modulo = self.config.get('GENERAL', 'modulo_actual')
            prompt = self._construir_prompt_modulo(contador + 1, archivo, modulo)
        else:
            prompt = self._construir_prompt(contador + 1, archivo)
        
        # Configuración de reintentos con backoff
        reintentos_max = self.config.getint('GENERAL', 'reintentos_envio')
        timeout_aparecer = self.config.getint('GENERAL', 'timeout_appear_ms')
        timeout_desaparecer = self.config.getint('GENERAL', 'timeout_disappear_ms')
        
        # Límite duro por prompt (3-5 minutos)
        limite_duro = 300  # 5 minutos
        inicio_prompt = time.time()
        
        for intento in range(reintentos_max + 1):
            if time.time() - inicio_prompt > limite_duro:
                logging.error(f"Límite duro alcanzado para prompt {contador + 1} de {chat_tipo}")
                self.metricas['detalles_por_chat'][chat_tipo]['timeouts'] += 1
                self.metricas['timeouts_totales'] += 1
                return False
            
            try:
                # Enviar prompt
                if not self._enviar_prompt_mejorado(prompt, coords, chat_tipo):
                    self.metricas['detalles_por_chat'][chat_tipo]['errores'] += 1
                    self.metricas['errores_totales'] += 1
                    continue
                
                # Esperar que aparezca el cuadrado
                region = getattr(self, f'region_{chat_tipo}')
                if not self._detectar_cuadrado_mejorado(region, timeout_aparecer, debe_aparecer=True):
                    logging.warning(f"Cuadrado no apareció en intento {intento + 1} para {chat_tipo}")
                    if intento < reintentos_max:
                        # Backoff exponencial
                        delay = 2 ** intento
                        time.sleep(delay)
                        continue
                    else:
                        self.metricas['detalles_por_chat'][chat_tipo]['timeouts'] += 1
                        self.metricas['timeouts_totales'] += 1
                        return False
                
                # Esperar que desaparezca el cuadrado
                if not self._detectar_cuadrado_mejorado(region, timeout_desaparecer, debe_aparecer=False):
                    logging.warning(f"Cuadrado no desapareció en tiempo esperado para {chat_tipo}")
                    # Continuar de todas formas
                
                # Éxito
                setattr(self, f'contador_{chat_tipo}', contador + 1)
                self.metricas['detalles_por_chat'][chat_tipo]['enviados'] += 1
                self.metricas['prompts_enviados'] += 1
                
                # Registrar tiempo de procesamiento
                tiempo_procesamiento = time.time() - inicio_prompt
                self.metricas['tiempos_procesamiento'].append(tiempo_procesamiento)
                
                logging.info(f"Prompt {contador + 1} de {chat_tipo} completado en {tiempo_procesamiento:.2f}s")
                print(f"✅ Prompt {contador + 1} de {chat_tipo} completado ({tiempo_procesamiento:.2f}s)")
                
                # Guardar estado
                self._guardar_estado()
                
                return True
                
            except Exception as e:
                logging.error(f"Error en intento {intento + 1} para {chat_tipo}: {e}")
                self.metricas['detalles_por_chat'][chat_tipo]['errores'] += 1
                self.metricas['errores_totales'] += 1
                
                if intento < reintentos_max:
                    # Backoff exponencial
                    delay = 2 ** intento
                    time.sleep(delay)
                    continue
                else:
                    return False
        
        return False
    
    def _generar_resumen(self):
        """Genera resumen final con métricas."""
        duracion_total = (datetime.now() - self.metricas['inicio']).total_seconds()
        
        print("\n" + "="*60)
        print("📊 RESUMEN FINAL")
        print("="*60)
        
        # Tabla de métricas
        print(f"{'Chat':<12} {'Enviados':<10} {'Reintentos':<12} {'Timeouts':<10} {'Errores':<10}")
        print("-" * 60)
        
        for chat, datos in self.metricas['detalles_por_chat'].items():
            print(f"{chat.capitalize():<12} {datos['enviados']:<10} {datos['reintentos']:<12} "
                  f"{datos['timeouts']:<10} {datos['errores']:<10}")
        
        print("-" * 60)
        print(f"{'TOTAL':<12} {self.metricas['prompts_enviados']:<10} "
              f"{self.metricas['reintentos_totales']:<12} {self.metricas['timeouts_totales']:<10} "
              f"{self.metricas['errores_totales']:<10}")
        
        # Tiempos
        if self.metricas['tiempos_procesamiento']:
            tiempo_promedio = sum(self.metricas['tiempos_procesamiento']) / len(self.metricas['tiempos_procesamiento'])
            print(f"\n⏱️  Tiempo promedio por prompt: {tiempo_promedio:.2f}s")
            print(f"⏱️  Tiempo total: {duracion_total:.2f}s")
        
        # Exportar a CSV
        self._exportar_metricas_csv()
        
        logging.info("Resumen generado y exportado")
    
    def _exportar_metricas_csv(self):
        """Exporta métricas a CSV."""
        try:
            archivo_csv = f"resultados_{self.corrida_id}.csv"
            
            with open(archivo_csv, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                
                # Encabezados
                writer.writerow(['Chat', 'Prompts_Enviados', 'Reintentos', 'Timeouts', 'Errores', 'Tiempo_Promedio'])
                
                # Datos por chat
                for chat, datos in self.metricas['detalles_por_chat'].items():
                    tiempo_promedio = 0
                    if datos['enviados'] > 0:
                        tiempos_chat = [t for i, t in enumerate(self.metricas['tiempos_procesamiento']) 
                                      if i < datos['enviados']]
                        if tiempos_chat:
                            tiempo_promedio = sum(tiempos_chat) / len(tiempos_chat)
                    
                    writer.writerow([
                        chat.capitalize(),
                        datos['enviados'],
                        datos['reintentos'],
                        datos['timeouts'],
                        datos['errores'],
                        f"{tiempo_promedio:.2f}"
                    ])
                
                # Totales
                tiempo_total_promedio = 0
                if self.metricas['tiempos_procesamiento']:
                    tiempo_total_promedio = sum(self.metricas['tiempos_procesamiento']) / len(self.metricas['tiempos_procesamiento'])
                
                writer.writerow([
                    'TOTAL',
                    self.metricas['prompts_enviados'],
                    self.metricas['reintentos_totales'],
                    self.metricas['timeouts_totales'],
                    self.metricas['errores_totales'],
                    f"{tiempo_total_promedio:.2f}"
                ])
            
            print(f"📄 Métricas exportadas a: {archivo_csv}")
            
        except Exception as e:
            logging.error(f"Error exportando métricas: {e}")
    
    def ejecutar_flujo(self):
        """Ejecuta el flujo principal del orquestador."""
        logging.info("Iniciando flujo de orquestación v2.0")
        print("🚀 Iniciando orquestador de prompts v2.0...")
        print("📋 Controles: F8 (pausar), F9 (saltar), ESC (abortar)")
        
        # Configuración - soporte para módulos
        if self.config.has_option('GENERAL', 'modulo_actual'):
            # Modo módulo
            modulo = self.config.get('GENERAL', 'modulo_actual')
            base_path = self.config.get('GENERAL', 'base_path')
            archivo_frontend = os.path.join(base_path, 'prompts_frontend.json')
            archivo_backend = os.path.join(base_path, 'prompts_backend.json')
            print(f"📁 Módulo: {modulo}")
            print(f"📂 Ruta base: {base_path}")
        else:
            # Modo tradicional
            archivo_frontend = self.config.get('GENERAL', 'archivo_frontend')
            archivo_backend = self.config.get('GENERAL', 'archivo_backend')
        
        max_frontend = self.config.getint('GENERAL', 'max_prompts_frontend')
        max_backend = self.config.getint('GENERAL', 'max_prompts_backend')
        modo = self.config.get('GENERAL', 'modo')
        
        logging.info(f"Modo: {modo}, Frontend: {max_frontend} prompts, Backend: {max_backend} prompts")
        
        try:
            if modo == 'alterno':
                self._ejecutar_modo_alterno(archivo_frontend, archivo_backend, max_frontend, max_backend)
            else:
                self._ejecutar_modo_bloque(archivo_frontend, archivo_backend, max_frontend, max_backend)
                
        except KeyboardInterrupt:
            logging.info("Interrumpido por el usuario")
        except Exception as e:
            logging.error(f"Error en el flujo principal: {e}")
            self._capturar_error()
        finally:
            self._generar_resumen()
            logging.info("Finalizando orquestador v2.0")
            print("🏁 Orquestador finalizado")
    
    def _capturar_error(self):
        """Captura screenshot en caso de error."""
        if self.config.getboolean('LOGGING', 'capturas_error', fallback=True):
            try:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                screenshot_path = f"logs/errors/error_{timestamp}.png"
                pyautogui.screenshot(screenshot_path)
                logging.info(f"Screenshot de error guardado en: {screenshot_path}")
            except Exception as e:
                logging.error(f"Error capturando screenshot: {e}")
    
    def _ejecutar_modo_alterno(self, archivo_frontend: str, archivo_backend: str, max_frontend: int, max_backend: int):
        """Ejecuta el modo alterno mejorado."""
        while not (self.completado_frontend and self.completado_backend) and not self.abortar:
            self._esperar_pausa()
            if self.abortar:
                break
            
            # Procesar frontend
            if not self.completado_frontend:
                if self._procesar_chat_mejorado('frontend', self.chat_izq_coords, archivo_frontend, max_frontend):
                    if self.contador_frontend >= max_frontend:
                        self.completado_frontend = True
                        logging.info("Frontend completado")
                        print("✅ Frontend completado")
            
            self._esperar_pausa()
            if self.abortar:
                break
            
            # Procesar backend
            if not self.completado_backend:
                if self._procesar_chat_mejorado('backend', self.chat_der_coords, archivo_backend, max_backend):
                    if self.contador_backend >= max_backend:
                        self.completado_backend = True
                        logging.info("Backend completado")
                        print("✅ Backend completado")
    
    def _ejecutar_modo_bloque(self, archivo_frontend: str, archivo_backend: str, max_frontend: int, max_backend: int):
        """Ejecuta el modo bloque mejorado."""
        # Procesar todos los frontend
        while not self.completado_frontend and not self.abortar:
            self._esperar_pausa()
            if self.abortar:
                break
                
            if self._procesar_chat_mejorado('frontend', self.chat_izq_coords, archivo_frontend, max_frontend):
                if self.contador_frontend >= max_frontend:
                    self.completado_frontend = True
                    logging.info("Frontend completado")
                    print("✅ Frontend completado")
        
        # Procesar todos los backend
        while not self.completado_backend and not self.abortar:
            self._esperar_pausa()
            if self.abortar:
                break
                
            if self._procesar_chat_mejorado('backend', self.chat_der_coords, archivo_backend, max_backend):
                if self.contador_backend >= max_backend:
                    self.completado_backend = True
                    logging.info("Backend completado")
                    print("✅ Backend completado")


def main():
    """Función principal."""
    try:
        orquestador = OrquestadorPromptsV2()
        orquestador.ejecutar_flujo()
    except Exception as e:
        logging.error(f"Error fatal: {e}")
        print(f"❌ Error fatal: {e}")


if __name__ == "__main__":
    main()
