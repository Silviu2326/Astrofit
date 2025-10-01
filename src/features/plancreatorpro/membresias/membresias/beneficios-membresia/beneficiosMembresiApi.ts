// Este archivo contendrá las funciones para interactuar con la API
// para la gestión de beneficios de membresía.
// Por ejemplo: obtener beneficios, actualizar beneficios, etc.

import axios from 'axios';

const API_BASE_URL = '/api/membresias/beneficios';

export const getBeneficiosMembresia = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener beneficios de membresía:", error);
    throw error;
  }
};

export const updateBeneficiosMembresia = async (data: any) => {
  try {
    const response = await axios.put(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar beneficios de membresía:", error);
    throw error;
  }
};

// Puedes añadir más funciones según las necesidades de la API
