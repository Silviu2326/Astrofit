// src/features/crear-flujo/validation/messages.ts

export enum NivelMensaje {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface Mensaje {
  nivel: NivelMensaje;
  texto: string;
  sugerencia?: string;
}

export const MENSAJES = {
  // Errores de Flujo
  FLUJO_SIN_DISPARADOR: {
    nivel: NivelMensaje.Error,
    texto: 'El flujo no tiene un nodo de inicio (disparador).',
    sugerencia: 'Asegúrate de agregar un nodo "Disparador" para iniciar el flujo.',
  },
  NODO_HUERFANO: {
    nivel: NivelMensaje.Error,
    texto: 'Se encontró un nodo huérfano.',
    sugerencia: 'Todos los nodos deben estar conectados a partir del disparador.',
  },
  LOOP_INFINITO_DETECTADO: {
    nivel: NivelMensaje.Warning,
    texto: 'Se ha detectado un posible loop infinito en el flujo.',
    sugerencia: 'Revisa las conexiones de los nodos para evitar ejecuciones circulares sin fin.',
  },
  CONECTIVIDAD_INCOMPLETA: {
    nivel: NivelMensaje.Error,
    texto: 'El flujo tiene nodos sin conectar.',
    sugerencia: 'Asegúrate de que todos los nodos estén conectados correctamente.',
  },

  // Errores de Nodo
  CAMPO_REQUERIDO: (campo: string) => ({
    nivel: NivelMensaje.Error,
    texto: `El campo "${campo}" es requerido.`,
  }),
  FORMATO_EMAIL_INVALIDO: {
    nivel: NivelMensaje.Error,
    texto: 'El formato del email no es válido.',
    sugerencia: 'Por favor, introduce una dirección de correo electrónico válida.',
  },
  FORMATO_URL_INVALIDO: {
    nivel: NivelMensaje.Error,
    texto: 'El formato de la URL no es válido.',
    sugerencia: 'Asegúrate de que la URL comience con http:// o https://.',
  },
  VALOR_FUERA_DE_RANGO: (min: number, max: number) => ({
    nivel: NivelMensaje.Error,
    texto: `El valor debe estar entre ${min} y ${max}.`,
  }),

  // Éxito
  VALIDACION_EXITOSA: {
    nivel: NivelMensaje.Info,
    texto: 'El flujo ha sido validado correctamente.',
  },
  TEST_EXITOSO: {
    nivel: NivelMensaje.Info,
    texto: 'La simulación del flujo se completó con éxito.',
  },
};
