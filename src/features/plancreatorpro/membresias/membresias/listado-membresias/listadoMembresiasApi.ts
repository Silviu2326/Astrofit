// Mock API para desarrollo - reemplazar con axios cuando tengas API real
// import axios from 'axios';
// const API_URL = '/api/membresias';

// Mock data para desarrollo
let mockMembresias: Membresia[] = [
  {
    id: '1',
    nivel: 'Bronce',
    miembrosActivos: 120,
    ingresosGenerados: 1200,
    estado: 'activo',
  },
  {
    id: '2',
    nivel: 'Plata',
    miembrosActivos: 80,
    ingresosGenerados: 2400,
    estado: 'activo',
  },
  {
    id: '3',
    nivel: 'Oro',
    miembrosActivos: 30,
    ingresosGenerados: 3000,
    estado: 'pausado',
  },
  {
    id: '4',
    nivel: 'Premium',
    miembrosActivos: 10,
    ingresosGenerados: 2000,
    estado: 'activo',
  },
];

// Función para simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Membresia {
  id: string;
  nivel: 'Bronce' | 'Plata' | 'Oro' | 'Premium';
  miembrosActivos: number;
  ingresosGenerados: number;
  estado: 'activo' | 'pausado';
}

export const getMembresias = async (): Promise<Membresia[]> => {
  try {
    // Simular delay de API
    await delay(500);
    return [...mockMembresias];
  } catch (error) {
    console.error("Error fetching memberships:", error);
    throw error;
  }
};

export const createMembresia = async (nuevaMembresia: Omit<Membresia, 'id'>): Promise<Membresia> => {
  try {
    // Simular delay de API
    await delay(800);
    
    // Crear nueva membresía con ID único
    const nuevaMembresiaConId: Membresia = {
      ...nuevaMembresia,
      id: Date.now().toString(), // ID único simple
    };
    
    // Agregar a la lista mock
    mockMembresias.push(nuevaMembresiaConId);
    
    return nuevaMembresiaConId;
  } catch (error) {
    console.error("Error creating membership:", error);
    throw error;
  }
};

export const updateMembresia = async (id: string, membresiaActualizada: Partial<Membresia>): Promise<Membresia> => {
  try {
    // Simular delay de API
    await delay(600);
    
    // Buscar y actualizar la membresía
    const index = mockMembresias.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Membresía no encontrada');
    }
    
    const membresiaActualizadaCompleta = {
      ...mockMembresias[index],
      ...membresiaActualizada,
    };
    
    mockMembresias[index] = membresiaActualizadaCompleta;
    
    return membresiaActualizadaCompleta;
  } catch (error) {
    console.error("Error updating membership:", error);
    throw error;
  }
};

export const deleteMembresia = async (id: string): Promise<void> => {
  try {
    // Simular delay de API
    await delay(400);
    
    // Buscar y eliminar la membresía
    const index = mockMembresias.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Membresía no encontrada');
    }
    
    mockMembresias.splice(index, 1);
  } catch (error) {
    console.error("Error deleting membership:", error);
    throw error;
  }
};
