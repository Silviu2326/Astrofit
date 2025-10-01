// src/features/crear-flujo/validation/nodoValidator.ts

import { MENSAJES, Mensaje } from './messages';

// Tipos básicos para nodos (estos deberían ser importados de tus tipos de aplicación reales)
export enum TipoNodo {
  Disparador = 'Disparador',
  EnviarEmail = 'EnviarEmail',
  Delay = 'Delay',
  Condicion = 'Condicion',
}

export interface ConfiguracionNodo {
  [key: string]: any;
}

export interface Nodo {
  id: string;
  tipo: TipoNodo;
  configuracion: ConfiguracionNodo;
}

// --- Funciones de validación específicas ---

const validarEmail = (email: string): boolean => {
  const re = /^(([^<>()[\\]\\.,;:\s@"]+(\.[^<>()[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validarUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

// --- Validadores por tipo de nodo ---

const validarNodoEnviarEmail = (nodo: Nodo): Mensaje[] => {
  const mensajes: Mensaje[] = [];
  const { destinatario, asunto, cuerpo } = nodo.configuracion;

  if (!destinatario) {
    mensajes.push(MENSAJES.CAMPO_REQUERIDO('destinatario'));
  } else if (!validarEmail(destinatario)) {
    mensajes.push(MENSAJES.FORMATO_EMAIL_INVALIDO);
  }

  if (!asunto) {
    mensajes.push(MENSAJES.CAMPO_REQUERIDO('asunto'));
  }

  if (!cuerpo) {
    mensajes.push(MENSAJES.CAMPO_REQUERIDO('cuerpo'));
  }

  return mensajes;
};

const validarNodoDelay = (nodo: Nodo): Mensaje[] => {
  const mensajes: Mensaje[] = [];
  const { tiempo, unidad } = nodo.configuracion;

  if (tiempo === undefined) {
    mensajes.push(MENSAJES.CAMPO_REQUERIDO('tiempo'));
  } else if (typeof tiempo !== 'number' || tiempo <= 0) {
    mensajes.push(MENSAJES.VALOR_FUERA_DE_RANGO(1, Infinity));
  }

  if (!unidad) {
    mensajes.push(MENSAJES.CAMPO_REQUERIDO('unidad'));
  } else if (!['segundos', 'minutos', 'horas', 'dias'].includes(unidad)) {
    mensajes.push({
      nivel: 'error',
      texto: `La unidad "${unidad}" no es válida.`,
      sugerencia: "Usa 'segundos', 'minutos', 'horas' o 'dias'.",
    });
  }

  return mensajes;
};

// --- Validador Principal de Nodos ---

export const validarNodo = (nodo: Nodo): Mensaje[] => {
  switch (nodo.tipo) {
    case TipoNodo.EnviarEmail:
      return validarNodoEnviarEmail(nodo);
    case TipoNodo.Delay:
      return validarNodoDelay(nodo);
    // Otros tipos de nodos se pueden agregar aquí
    case TipoNodo.Disparador:
    case TipoNodo.Condicion:
      // Asumimos que estos nodos no tienen configuración compleja por ahora
      return [];
    default:
      return [{
        nivel: 'warning',
        texto: `El tipo de nodo "${nodo.tipo}" no tiene un validador específico.`,
      }];
  }
};
