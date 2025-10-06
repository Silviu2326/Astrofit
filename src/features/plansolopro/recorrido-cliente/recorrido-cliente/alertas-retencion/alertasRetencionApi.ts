import axios from 'axios';

// Definiciones de tipos para los datos de clientes y alertas
export interface Cliente {
  id: string;
  nombre: string;
  progreso: number; // Porcentaje de progreso o métrica de adherencia
  riesgo: 'alto' | 'medio' | 'bajo';
  ultimaAsistencia: string; // Fecha de la última asistencia
  semanasSinProgreso: number;
}

export interface SugerenciaAccion {
  id: string;
  descripcion: string;
  tipo: string; // e.g., 'mensaje', 'llamada', 'ejercicio'
}

// Simulación de una API para obtener datos de retención
const API_BASE_URL = '/api/retencion'; // Reemplazar con la URL real de la API

export const getClientesConRiesgo = async (): Promise<Cliente[]> => {
  try {
    // En un entorno real, aquí harías una llamada a tu backend
    // const response = await axios.get(`${API_BASE_URL}/clientes-riesgo`);
    // return response.data;

    // Datos de ejemplo para simulación
    return [
      {
        id: '1',
        nombre: 'Ana García',
        progreso: 40,
        riesgo: 'alto',
        ultimaAsistencia: '2025-09-01',
        semanasSinProgreso: 3,
      },
      {
        id: '2',
        nombre: 'Luis Fernández',
        progreso: 70,
        riesgo: 'medio',
        ultimaAsistencia: '2025-09-15',
        semanasSinProgreso: 1,
      },
      {
        id: '3',
        nombre: 'Marta López',
        progreso: 90,
        riesgo: 'bajo',
        ultimaAsistencia: '2025-09-25',
        semanasSinProgreso: 0,
      },
      {
        id: '4',
        nombre: 'Carlos Ruiz',
        progreso: 30,
        riesgo: 'alto',
        ultimaAsistencia: '2025-08-20',
        semanasSinProgreso: 5,
      },
    ];
  } catch (error) {
    console.error('Error al obtener clientes con riesgo:', error);
    throw error;
  }
};

export const getSugerenciasAccion = async (clienteId: string): Promise<SugerenciaAccion[]> => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/sugerencias/${clienteId}`);
    // return response.data;

    // Datos de ejemplo para simulación
    return [
      { id: 's1', descripcion: 'Enviar mensaje motivacional', tipo: 'mensaje' },
      { id: 's2', descripcion: 'Programar llamada de seguimiento', tipo: 'llamada' },
    ];
  } catch (error) {
    console.error('Error al obtener sugerencias de acción:', error);
    throw error;
  }
};

export const sendAccionRapida = async (clienteId: string, accion: string): Promise<void> => {
  try {
    // await axios.post(`${API_BASE_URL}/accion-rapida`, { clienteId, accion });
    console.log(`Acción rápida '${accion}' enviada para el cliente ${clienteId}`);
  } catch (error) {
    console.error('Error al enviar acción rápida:', error);
    throw error;
  }
};

// Algoritmo de detección de riesgo (ejemplo simplificado)
export const calcularRiesgoChurn = (cliente: Cliente): 'alto' | 'medio' | 'bajo' => {
  if (cliente.semanasSinProgreso >= 2 || cliente.progreso < 50) {
    return 'alto';
  } else if (cliente.semanasSinProgreso >= 1 || cliente.progreso < 75) {
    return 'medio';
  } else {
    return 'bajo';
  }
};
