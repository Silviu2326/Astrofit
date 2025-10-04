import axios from 'axios';

interface Hito {
  id: string;
  type: 'cumpleanos' | 'aniversario' | 'sesion_completada';
  date: string;
  description: string;
  icon?: string;
  color?: string;
}

const API_BASE_URL = '/api/hitos-clientes'; // Adjust as per your API setup

export const getHitos = async (): Promise<Hito[]> => {
  try {
    const response = await axios.get<Hito[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching hitos:', error);
    return [];
  }
};

export const addHito = async (hito: Omit<Hito, 'id'>): Promise<Hito> => {
  try {
    const response = await axios.post<Hito>(API_BASE_URL, hito);
    return response.data;
  } catch (error) {
    console.error('Error adding hito:', error);
    throw error;
  }
};

export const updateHito = async (hito: Hito): Promise<Hito> => {
  try {
    const response = await axios.put<Hito>(`${API_BASE_URL}/${hito.id}`, hito);
    return response.data;
  } catch (error) {
    console.error('Error updating hito:', error);
    throw error;
  }
};

export const deleteHito = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting hito:', error);
    throw error;
  }
};
