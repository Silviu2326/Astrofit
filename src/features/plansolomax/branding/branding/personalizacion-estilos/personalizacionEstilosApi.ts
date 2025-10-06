// src/features/branding/personalizacion-estilos/personalizacionEstilosApi.ts

import axios from 'axios';

const API_BASE_URL = '/api/branding/estilos'; // Ajusta según tu configuración de API

export const getEstilosPersonalizados = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estilos personalizados:', error);
    throw error;
  }
};

export const updateEstilosPersonalizados = async (estilos: any) => {
  try {
    const response = await axios.put(API_BASE_URL, estilos);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar estilos personalizados:', error);
    throw error;
  }
};

export const uploadLogo = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al subir el logo:', error);
    throw error;
  }
};

// Puedes añadir más funciones para plantillas, export/import, etc.
