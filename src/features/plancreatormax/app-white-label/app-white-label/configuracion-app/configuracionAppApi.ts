// src/features/app-white-label/configuracion-app/configuracionAppApi.ts

import axios from 'axios';

const API_BASE_URL = '/api/app-config'; // Ajusta esta URL a tu API real

export const configuracionAppApi = {
  // Ejemplo: Obtener la configuración actual de la app
  getAppConfig: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching app configuration:', error);
      throw error;
    }
  },

  // Ejemplo: Actualizar la configuración de la app
  updateAppConfig: async (configData: any) => {
    try {
      const response = await axios.post(API_BASE_URL, configData);
      return response.data;
    } catch (error) {
      console.error('Error updating app configuration:', error);
      throw error;
    }
  },

  // Ejemplo: Subir un logo
  uploadLogo: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      const response = await axios.post(`${API_BASE_URL}/upload-logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  },

  // Agrega aquí más funciones para interactuar con la API (iconos, splash screen, etc.)
};
