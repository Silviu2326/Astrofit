
import axios from 'axios';

interface EjecucionFlujo {
  id: string;
  fechaHora: string;
  resultado: 'exito' | 'error';
  detalles: string;
  clienteAfectado: string;
  nombreFlujo: string;
}

interface GetEjecucionesParams {
  fechaInicio?: string;
  fechaFin?: string;
  flujoId?: string;
  estado?: 'exito' | 'error';
  page?: number;
  limit?: number;
}

export const historialFlujosApi = {
  getEjecuciones: async (params: GetEjecucionesParams): Promise<EjecucionFlujo[]> => {
    // Simulación de llamada a API
    console.log('Fetching ejecuciones with params:', params);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData: EjecucionFlujo[] = [
          {
            id: '1',
            fechaHora: '2025-09-27 10:00:00',
            resultado: 'exito',
            detalles: 'Flujo de bienvenida completado.',
            clienteAfectado: 'Cliente A',
            nombreFlujo: 'Flujo Bienvenida',
          },
          {
            id: '2',
            fechaHora: '2025-09-27 10:30:00',
            resultado: 'error',
            detalles: 'Error al enviar email de confirmación: SMTP timeout.',
            clienteAfectado: 'Cliente B',
            nombreFlujo: 'Flujo Confirmacion',
          },
          {
            id: '3',
            fechaHora: '2025-09-27 11:00:00',
            resultado: 'exito',
            detalles: 'Actualización de datos de perfil exitosa.',
            clienteAfectado: 'Cliente C',
            nombreFlujo: 'Flujo Actualizacion Perfil',
          },
          {
            id: '4',
            fechaHora: '2025-09-27 11:15:00',
            resultado: 'error',
            detalles: 'Fallo en la integración con CRM: API key inválida.',
            clienteAfectado: 'Cliente D',
            nombreFlujo: 'Flujo CRM Sync',
          },
        ];
        resolve(mockData);
      }, 500);
    });
  },
};
