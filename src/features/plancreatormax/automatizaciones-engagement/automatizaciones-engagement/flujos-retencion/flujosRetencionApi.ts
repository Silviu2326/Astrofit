
// src/features/automatizaciones-engagement/flujos-retencion/flujosRetencionApi.ts

import axios from 'axios';

const API_BASE_URL = '/api/retencion-flujos'; // Ajusta la URL base de tu API

export const flujosRetencionApi = {
  /**
   * Obtiene todos los flujos de retención configurados.
   * @returns Una promesa con la lista de flujos de retención.
   */
  getFlujos: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener flujos de retención:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva secuencia automática de retención.
   */
  createSecuencia: async (secuencia: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sequences`, secuencia);
      return response.data;
    } catch (error) {
      console.error('Error al crear secuencia de retención:', error);
      throw error;
    }
  },

  /**
   * Crea un nuevo flujo de retención.
   * @param flujo Los datos del nuevo flujo de retención.
   * @returns Una promesa con el flujo de retención creado.
   */
  createFlujo: async (flujo: any) => { // Considerar definir una interfaz para 'flujo'
    try {
      console.log('🔍 [DEBUG] flujosRetencionApi.createFlujo called with:', flujo);
      console.log('🔍 [DEBUG] API_BASE_URL:', API_BASE_URL);
      
      const response = await axios.post(`${API_BASE_URL}/`, flujo);
      console.log('✅ [SUCCESS] createFlujo response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [ERROR] Error al crear flujo de retención:', error);
      console.error('❌ [ERROR] Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  /**
   * Actualiza un flujo de retención existente.
   * @param id El ID del flujo a actualizar.
   * @param updates Los datos a actualizar del flujo.
   * @returns Una promesa con el flujo de retención actualizado.
   */
  updateFlujo: async (id: string, updates: any) => { // Considerar definir una interfaz para 'updates'
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar flujo de retención:', error);
      throw error;
    }
  },

  /**
   * Elimina un flujo de retención.
   * @param id El ID del flujo a eliminar.
   * @returns Una promesa con la confirmación de la eliminación.
   */
  deleteFlujo: async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar flujo de retención:', error);
      throw error;
    }
  },

  // Métodos adicionales para A/B testing, métricas, etc.
  /**
   * Inicia un test A/B para un flujo de retención.
   * @param flujoId El ID del flujo de retención.
   * @param testConfig La configuración del test A/B.
   * @returns Una promesa con los detalles del test A/B iniciado.
   */
  startABTest: async (flujoId: string, testConfig: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${flujoId}/ab-test`, testConfig);
      return response.data;
    } catch (error) {
      console.error('Error al iniciar A/B test:', error);
      throw error;
    }
  },

  /**
   * Obtiene las métricas de efectividad para un flujo de retención.
   * @param flujoId El ID del flujo de retención.
   * @returns Una promesa con las métricas de efectividad.
   */
  getMetrics: async (flujoId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${flujoId}/metrics`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener métricas:', error);
      throw error;
    }
  },
};
