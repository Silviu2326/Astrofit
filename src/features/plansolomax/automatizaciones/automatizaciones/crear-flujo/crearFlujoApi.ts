import axios from 'axios';

const API_URL = '/api/automatizaciones/flujos';

export const crearFlujoApi = {
  guardarFlujo: async (flujo: any) => {
    try {
      const response = await axios.post(API_URL, flujo);
      return response.data;
    } catch (error) {
      console.error('Error al guardar el flujo:', error);
      throw error;
    }
  },

  obtenerFlujo: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el flujo ${id}:`, error);
      throw error;
    }
  },

  // Otros m??todos para validaci??n, actualizaci??n, etc.
};
