import { useState, useEffect } from 'react';

export interface Entrenamiento {
  id: string;
  cliente: string;
  programa: string;
  estado: 'activo' | 'borrador' | 'finalizado' | 'pausado';
  fechaInicio: string;
  duracion: string;
  progreso: number; // Percentage
}

const mockEntrenamientos: Entrenamiento[] = [
  {
    id: '1',
    cliente: 'Juan Perez',
    programa: 'Programa de Fuerza Nivel 1',
    estado: 'activo',
    fechaInicio: '2023-01-15',
    duracion: '12 semanas',
    progreso: 75,
  },
  {
    id: '2',
    cliente: 'Maria Lopez',
    programa: 'Programa de Resistencia Avanzado',
    estado: 'pausado',
    fechaInicio: '2023-02-01',
    duracion: '8 semanas',
    progreso: 30,
  },
  {
    id: '3',
    cliente: 'Carlos Garcia',
    programa: 'Programa de Flexibilidad',
    estado: 'finalizado',
    fechaInicio: '2022-11-20',
    duracion: '6 semanas',
    progreso: 100,
  },
  {
    id: '4',
    cliente: 'Ana Rodriguez',
    programa: 'Programa de Pérdida de Peso',
    estado: 'borrador',
    fechaInicio: '2023-03-10',
    duracion: '10 semanas',
    progreso: 0,
  },
  {
    id: '5',
    cliente: 'Pedro Martinez',
    programa: 'Programa de Hipertrofia',
    estado: 'activo',
    fechaInicio: '2023-04-01',
    duracion: '16 semanas',
    progreso: 50,
  },
];

// Mock API functions
export const useFetchEntrenamientos = () => {
  const [data, setData] = useState<Entrenamiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setData(mockEntrenamientos);
      } catch (err) {
        setError('Error fetching entrenamientos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export const updateEntrenamiento = async (id: string, updates: Partial<Entrenamiento>): Promise<Entrenamiento> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockEntrenamientos.findIndex(e => e.id === id);
  if (index > -1) {
    mockEntrenamientos[index] = { ...mockEntrenamientos[index], ...updates };
    return mockEntrenamientos[index];
  }
  throw new Error('Entrenamiento not found');
};

export const deleteEntrenamiento = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockEntrenamientos.findIndex(e => e.id === id);
  if (index > -1) {
    mockEntrenamientos.splice(index, 1);
    return;
  }
  throw new Error('Entrenamiento not found');
};