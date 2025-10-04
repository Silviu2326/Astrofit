import axios from 'axios';

const API_URL = '/api/membresias'; // Ajusta esta URL a tu API real

export interface Membresia {
  id: string;
  nivel: 'Bronce' | 'Plata' | 'Oro' | 'Premium';
  miembrosActivos: number;
  ingresosGenerados: number;
  estado: 'activo' | 'pausado';
}

export const getMembresias = async (): Promise<Membresia[]> => {
  try {
    const response = await axios.get<Membresia[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    throw error;
  }
};

export const createMembresia = async (nuevaMembresia: Omit<Membresia, 'id'>): Promise<Membresia> => {
  try {
    const response = await axios.post<Membresia>(API_URL, nuevaMembresia);
    return response.data;
  } catch (error) {
    console.error("Error creating membership:", error);
    throw error;
  }
};

export const updateMembresia = async (id: string, membresiaActualizada: Partial<Membresia>): Promise<Membresia> => {
  try {
    const response = await axios.put<Membresia>(`${API_URL}/${id}`, membresiaActualizada);
    return response.data;
  } catch (error) {
    console.error("Error updating membership:", error);
    throw error;
  }
};

export const deleteMembresia = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting membership:", error);
    throw error;
  }
};
