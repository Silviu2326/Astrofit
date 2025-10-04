import axios from 'axios';

const API_BASE_URL = '/api/transferencias-clientes'; // Ajusta la URL base según tu configuración

export const transferenciasClientesApi = {
  // Existing endpoints would go here

  // New endpoints for approvals
  solicitarAprobacionTransferencia: async (transferenciaId: string, data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${transferenciaId}/aprobar`, data);
      return response.data;
    } catch (error) {
      console.error('Error al solicitar aprobación de transferencia:', error);
      throw error;
    }
  },

  actualizarEstadoAprobacion: async (transferenciaId: string, aprobacionId: string, data: any) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${transferenciaId}/aprobaciones/${aprobacionId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar estado de aprobación:', error);
      throw error;
    }
  },

  // New endpoints for notifications
  enviarNotificacionSedes: async (transferenciaId: string, data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${transferenciaId}/notificar-sedes`, data);
      return response.data;
    } catch (error) {
      console.error('Error al enviar notificación a sedes:', error);
      throw error;
    }
  },

  obtenerNotificacionesPendientes: async (sedeId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notificaciones/pendientes/${sedeId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener notificaciones pendientes:', error);
      throw error;
    }
  },
};
