import axios from 'axios';

const API_URL = '/api/resultados-eventos'; // Ajusta la URL de tu API

export const resultadosEventosApi = {
  // API para registro y publicación de resultados en tiempo real
  getRealtimeScores: async () => {
    try {
      const response = await axios.get(`${API_URL}/realtime`);
      return response.data;
    } catch (error) {
      console.error("Error fetching realtime scores:", error);
      throw error;
    }
  },

  // Historial de resultados por evento y clasificaciones
  getEventHistory: async (eventId: string) => {
    try {
      const response = await axios.get(`${API_URL}/history/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event history for ${eventId}:`, error);
      throw error;
    }
  },

  // Sistema básico de validación de resultados
  validateResult: async (resultData: any) => {
    try {
      const response = await axios.post(`${API_URL}/validate`, resultData);
      return response.data;
    } catch (error) {
      console.error("Error validating result:", error);
      throw error;
    }
  },

  // Exportación de tablas de posiciones
  exportStandings: async (eventId: string) => {
    try {
      const response = await axios.get(`${API_URL}/export/${eventId}`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error(`Error exporting standings for ${eventId}:`, error);
      throw error;
    }
  },

  // Endpoints para validación de APIs
  validateApiIntegration: async (apiId: string) => {
    try {
      const response = await axios.post(`${API_URL}/api-validation/${apiId}`);
      return response.data;
    } catch (error) {
      console.error(`Error validating API integration for ${apiId}:`, error);
      throw error;
    }
  },

  // Endpoints para distribución mediática
  distributeToMedia: async (distributionData: any) => {
    try {
      const response = await axios.post(`${API_URL}/media-distribution`, distributionData);
      return response.data;
    } catch (error) {
      console.error("Error distributing to media:", error);
      throw error;
    }
  },

  // Endpoints para analytics de eventos
  getEventAnalytics: async (eventId: string) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching analytics for ${eventId}:`, error);
      throw error;
    }
  },

  getAdvancedAnalytics: async (eventId: string, params: any) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/${eventId}/advanced`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching advanced analytics for ${eventId}:`, error);
      throw error;
    }
  },
};
