#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Orquestador de Prompts para Cursor - Versión con Timeout
Simplificado para usar timeout fijo de 3 minutos en lugar de detección visual.
"""

import pyautogui
import keyboard
import time
import logging
import configparser
import os
import json
from typing import Tuple, Optional, Dict, Any
from datetime import datetime
import csv
import shutil
from pathlib import Path

# Configuración de pyautogui
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.5

class OrquestadorPromptsTimeout:
    """Orquestador simplificado con timeout fijo."""
    
    def __init__(self, config_path: str = "config_timeout.ini"):
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
        
        # Timeout configurable desde config.ini (por defecto 5 minutos)
        self.timeout_segundos = self.config.getint('GENERAL', 'timeout_minutos', fallback=5) * 60
        # Delay entre chats configurable (por defecto 10 segundos)
        self.delay_entre_chats = self.config.getint('GENERAL', 'delay_entre_chats_segundos', fallback=10)
        
        # Métricas
        self.metricas = {
            'inicio': datetime.now(),
            'prompts_enviados': 0,
            'errores_totales': 0,
            'tiempos_procesamiento': [],
            'detalles_por_chat': {
                'frontend': {'enviados': 0, 'errores': 0},
                'backend': {'enviados': 0, 'errores': 0}
            }
        }
        
        # Configurar atajos de teclado
        self._configurar_atajos()
        
        # Coordenadas
        self._configurar_coordenadas()
        
        # Cargar estado previo si existe
        self._cargar_estado()
        
        logging.info("Orquestador con timeout inicializado correctamente")
    
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
    
    def _configurar_atajos(self):
        """Configura los atajos de teclado."""
        keyboard.add_hotkey('f8', self._toggle_pausa)
        keyboard.add_hotkey('f9', self._forzar_salto)
        keyboard.add_hotkey('esc', self._abortar_ejecucion)
        logging.info("Atajos configurados: F8 (pausar), F9 (saltar), ESC (abortar)")
    
    def _configurar_coordenadas(self):
        """Configura coordenadas."""
        # Coordenadas de los chats
        self.chat_izq_coords = (
            self.config.getint('COORDENADAS', 'chat_izq_x'),
            self.config.getint('COORDENADAS', 'chat_izq_y')
        )
        self.chat_der_coords = (
            self.config.getint('COORDENADAS', 'chat_der_x'),
            self.config.getint('COORDENADAS', 'chat_der_y')
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
    
    def _focus_chat(self, coords: Tuple[int, int]):
        """Hace clic en el input del chat especificado."""
        try:
            pyautogui.click(coords[0], coords[1])
            time.sleep(0.3)
            logging.debug(f"Click en chat: {coords}")
        except Exception as e:
            logging.error(f"Error al hacer click en chat {coords}: {e}")
            raise
    
    def _enviar_prompt(self, mensaje: str, chat_coords: Tuple[int, int], chat_tipo: str) -> bool:
        """Envía un prompt al chat especificado."""
        try:
            # Hacer click en el input del chat
            self._focus_chat(chat_coords)
            
            # Limpiar el input y escribir el mensaje
            pyautogui.hotkey('ctrl', 'a')
            time.sleep(0.1)
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
    
    def _enviar_prompt_ciclo(self, chat_tipo: str, coords: Tuple[int, int], archivo: str) -> bool:
        """Envía un prompt en el ciclo conjunto."""
        contador = getattr(self, f'contador_{chat_tipo}')
        prompt = self._construir_prompt(contador + 1, archivo)
        
        try:
            # Hacer click en el input del chat
            self._focus_chat(coords)
            
            # Limpiar el input y escribir el mensaje
            pyautogui.hotkey('ctrl', 'a')
            time.sleep(0.1)
            pyautogui.write(prompt)
            time.sleep(0.2)
            
            # Enviar según configuración
            enviar_con = self.config.get('ENVIO', 'enviar_con', fallback='enter')
            if enviar_con == 'ctrl_enter':
                pyautogui.hotkey('ctrl', 'enter')
            else:
                pyautogui.press('enter')
            
            logging.info(f"Prompt enviado a {chat_tipo}: {prompt}")
            print(f"📝 Prompt completo: {prompt}")
            return True
            
        except Exception as e:
            logging.error(f"Error enviando prompt a {chat_tipo}: {e}")
            return False
    
    def _esperar_timeout_completo(self):
        """Espera el timeout completo después de enviar ambos prompts."""
        logging.info(f"Esperando {self.timeout_segundos} segundos para procesamiento completo...")
        print(f"⏳ Esperando {self.timeout_segundos//60} minutos para procesamiento completo...")
        
        # Mostrar progreso cada 30 segundos
        for i in range(0, self.timeout_segundos, 30):
            if self.abortar:
                return False
            
            # Mostrar progreso
            minutos_restantes = (self.timeout_segundos - i) // 60
            segundos_restantes = (self.timeout_segundos - i) % 60
            print(f"   ⏱️  {minutos_restantes}:{segundos_restantes:02d} restantes...")
            
            # Esperar 30 segundos
            for _ in range(30):
                if self.abortar:
                    return False
                time.sleep(1)
        
        return True
    
    def _construir_prompt(self, numero: int, archivo: str) -> str:
        """Construye el mensaje del prompt según el número."""
        # Obtener módulo destino
        modulo_destino = self.config.get('GENERAL', 'modulo_destino', fallback='')
        
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
    
    def _procesar_chat(self, chat_tipo: str, coords: Tuple[int, int], archivo: str, max_prompts: int) -> bool:
        """Procesa un chat con timeout fijo."""
        contador = getattr(self, f'contador_{chat_tipo}')
        completado = getattr(self, f'completado_{chat_tipo}')
        
        if completado or contador >= max_prompts:
            return True
        
        # Construir prompt
        prompt = self._construir_prompt(contador + 1, archivo)
        
        try:
            # Enviar prompt
            if not self._enviar_prompt(prompt, coords, chat_tipo):
                self.metricas['detalles_por_chat'][chat_tipo]['errores'] += 1
                self.metricas['errores_totales'] += 1
                return False
            
            # Esperar timeout fijo
            if not self._esperar_timeout(chat_tipo):
                return False
            
            # Éxito
            setattr(self, f'contador_{chat_tipo}', contador + 1)
            self.metricas['detalles_por_chat'][chat_tipo]['enviados'] += 1
            self.metricas['prompts_enviados'] += 1
            
            # Registrar tiempo de procesamiento
            tiempo_procesamiento = self.timeout_segundos
            self.metricas['tiempos_procesamiento'].append(tiempo_procesamiento)
            
            logging.info(f"Prompt {contador + 1} de {chat_tipo} completado")
            print(f"✅ Prompt {contador + 1} de {chat_tipo} completado")
            
            # Guardar estado
            self._guardar_estado()
            
            return True
            
        except Exception as e:
            logging.error(f"Error procesando {chat_tipo}: {e}")
            self.metricas['detalles_por_chat'][chat_tipo]['errores'] += 1
            self.metricas['errores_totales'] += 1
            return False
    
    def _generar_resumen(self):
        """Genera resumen final con métricas."""
        duracion_total = (datetime.now() - self.metricas['inicio']).total_seconds()
        
        print("\n" + "="*60)
        print("📊 RESUMEN FINAL")
        print("="*60)
        
        # Tabla de métricas
        print(f"{'Chat':<12} {'Enviados':<10} {'Errores':<10}")
        print("-" * 35)
        
        for chat, datos in self.metricas['detalles_por_chat'].items():
            print(f"{chat.capitalize():<12} {datos['enviados']:<10} {datos['errores']:<10}")
        
        print("-" * 35)
        print(f"{'TOTAL':<12} {self.metricas['prompts_enviados']:<10} {self.metricas['errores_totales']:<10}")
        
        # Tiempos
        if self.metricas['tiempos_procesamiento']:
            tiempo_promedio = sum(self.metricas['tiempos_procesamiento']) / len(self.metricas['tiempos_procesamiento'])
            print(f"\n⏱️  Tiempo por prompt: {tiempo_promedio//60:.0f} minutos")
            print(f"⏱️  Tiempo total: {duracion_total/60:.1f} minutos")
        
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
                writer.writerow(['Chat', 'Prompts_Enviados', 'Errores', 'Tiempo_Por_Prompt_Minutos'])
                
                # Datos por chat
                for chat, datos in self.metricas['detalles_por_chat'].items():
                    tiempo_promedio = self.timeout_segundos / 60  # Convertir a minutos
                    
                    writer.writerow([
                        chat.capitalize(),
                        datos['enviados'],
                        datos['errores'],
                        f"{tiempo_promedio:.1f}"
                    ])
                
                # Totales
                writer.writerow([
                    'TOTAL',
                    self.metricas['prompts_enviados'],
                    self.metricas['errores_totales'],
                    f"{self.timeout_segundos/60:.1f}"
                ])
            
            print(f"📄 Métricas exportadas a: {archivo_csv}")
            
        except Exception as e:
            logging.error(f"Error exportando métricas: {e}")
    
    def ejecutar_flujo(self):
        """Ejecuta el flujo principal del orquestador."""
        logging.info("Iniciando flujo de orquestación con timeout")
        print("🚀 Iniciando orquestador de prompts con timeout...")
        print(f"⏱️  Timeout configurado: {self.timeout_segundos//60} minutos por ciclo")
        print(f"⏳ Delay entre chats: {self.delay_entre_chats} segundos")
        print("📋 Controles: F8 (pausar), F9 (saltar), ESC (abortar)")
        print(f"🔄 Ciclo: Frontend → {self.delay_entre_chats} segundos → Backend → {self.timeout_segundos//60} minutos")
        
        # Configuración
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
        finally:
            self._generar_resumen()
            logging.info("Finalizando orquestador con timeout")
            print("🏁 Orquestador finalizado")
    
    def _ejecutar_modo_alterno(self, archivo_frontend: str, archivo_backend: str, max_frontend: int, max_backend: int):
        """Ejecuta el modo alterno con envío conjunto."""
        while not (self.completado_frontend and self.completado_backend) and not self.abortar:
            self._esperar_pausa()
            if self.abortar:
                break
            
            # Verificar si hay prompts pendientes
            if self.contador_frontend >= max_frontend and self.contador_backend >= max_backend:
                break
            
            # Enviar frontend si hay prompts pendientes
            if self.contador_frontend < max_frontend:
                if self._enviar_prompt_ciclo('frontend', self.chat_izq_coords, archivo_frontend):
                    self.contador_frontend += 1
                    self.metricas['detalles_por_chat']['frontend']['enviados'] += 1
                    self.metricas['prompts_enviados'] += 1
                    logging.info(f"Prompt {self.contador_frontend} de frontend enviado")
                    print(f"📤 Frontend {self.contador_frontend}/{max_frontend} enviado")
                    
                    if self.contador_frontend >= max_frontend:
                        self.completado_frontend = True
                        logging.info("Frontend completado")
                        print("✅ Frontend completado")
            
            # Esperar delay configurable antes del backend
            if not self.abortar and self.contador_backend < max_backend:
                print(f"⏳ Esperando {self.delay_entre_chats} segundos antes del backend...")
                for i in range(self.delay_entre_chats):
                    if self.abortar:
                        break
                    time.sleep(1)
                    print(f"   {self.delay_entre_chats-i} segundos restantes...")
            
            # Enviar backend si hay prompts pendientes
            if not self.abortar and self.contador_backend < max_backend:
                if self._enviar_prompt_ciclo('backend', self.chat_der_coords, archivo_backend):
                    self.contador_backend += 1
                    self.metricas['detalles_por_chat']['backend']['enviados'] += 1
                    self.metricas['prompts_enviados'] += 1
                    logging.info(f"Prompt {self.contador_backend} de backend enviado")
                    print(f"📤 Backend {self.contador_backend}/{max_backend} enviado")
                    
                    if self.contador_backend >= max_backend:
                        self.completado_backend = True
                        logging.info("Backend completado")
                        print("✅ Backend completado")
            
            # Esperar timeout completo después de enviar ambos
            if not self.abortar and (self.contador_frontend < max_frontend or self.contador_backend < max_backend):
                self._esperar_timeout_completo()
                
                # Guardar estado
                self._guardar_estado()
    
    def _ejecutar_modo_bloque(self, archivo_frontend: str, archivo_backend: str, max_frontend: int, max_backend: int):
        """Ejecuta el modo bloque."""
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
        orquestador = OrquestadorPromptsTimeout()
        orquestador.ejecutar_flujo()
    except Exception as e:
        logging.error(f"Error fatal: {e}")
        print(f"❌ Error fatal: {e}")


if __name__ == "__main__":
    main()
