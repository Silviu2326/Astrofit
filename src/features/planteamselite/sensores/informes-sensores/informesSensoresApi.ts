// informesSensoresApi.ts
// API con datos compilados de todos los sensores utilizados

import axios from 'axios';

const API_BASE_URL = '/api/sensores'; // Ajusta esta URL según tu configuración de API

export const fetchSensorData = async (sessionId: string, athleteId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sesion/${sessionId}/atleta/${athleteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
};

export const fetchPreviousSessions = async (athleteId: string, sessionType: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/atleta/${athleteId}/tipo/${sessionType}/sesiones-anteriores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching previous sessions:', error);
    throw error;
  }
};

export const fetchHeatmapData = async (sessionId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sesion/${sessionId}/heatmap`);
    return response.data;
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    throw error;
  }
};

export const fetchBiomechanicalAnalysis = async (sessionId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sesion/${sessionId}/biomecanica`);
    return response.data;
  } catch (error) {
    console.error('Error fetching biomechanical analysis:', error);
    throw error;
  }
};

export const fetchFatigueModel = async (athleteId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/atleta/${athleteId}/fatiga`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fatigue model:', error);
    throw error;
  }
};

// Puedes añadir más funciones API según sea necesario para la gestión de informes de sensores
