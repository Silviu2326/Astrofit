import axios from 'axios';

const API_URL = '/api/campeonatos';

export const campeonatosApi = {
  getCampeonatos: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getEventoById: async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  // Endpoints para Comando y Control
  updateComandoControl: async (data: any) => {
    const response = await axios.post(`${API_URL}/comando-control`, data);
    return response.data;
  },
  getComandoControlStatus: async () => {
    const response = await axios.get(`${API_URL}/comando-control/status`);
    return response.data;
  },

  // Endpoints para Logística
  updateLogistica: async (data: any) => {
    const response = await axios.post(`${API_URL}/logistica`, data);
    return response.data;
  },
  getLogisticaStatus: async () => {
    const response = await axios.get(`${API_URL}/logistica/status`);
    return response.data;
  },

  // Endpoints para Broadcasting
  updateBroadcasting: async (data: any) => {
    const response = await axios.post(`${API_URL}/broadcasting`, data);
    return response.data;
  },
  getBroadcastingStatus: async () => {
    const response = await axios.get(`${API_URL}/broadcasting/status`);
    return response.data;
  },

  // Aquí se añadirán más funciones para la gestión de eventos complejos, sedes, cronogramas, etc.
};
