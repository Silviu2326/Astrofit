// Mock API para pruebas físicas

export interface Atleta {
  id: string;
  nombre: string;
  posicion: string;
  edad: number;
}

export interface PruebaFisica {
  id: string;
  atletaId: string;
  atletaNombre: string;
  tipoPrueba: string;
  resultado: number;
  unidad: string;
  fecha: string;
  notas?: string;
}

// Mock data
const mockAtletas: Atleta[] = [
  { id: '1', nombre: 'Juan Pérez', posicion: 'Delantero', edad: 24 },
  { id: '2', nombre: 'Carlos Gómez', posicion: 'Mediocampista', edad: 26 },
  { id: '3', nombre: 'Luis Martínez', posicion: 'Defensa', edad: 28 },
  { id: '4', nombre: 'Pedro Sánchez', posicion: 'Portero', edad: 30 },
];

const mockPruebas: PruebaFisica[] = [
  {
    id: '1',
    atletaId: '1',
    atletaNombre: 'Juan Pérez',
    tipoPrueba: 'Velocidad 40m',
    resultado: 5.2,
    unidad: 'segundos',
    fecha: '2024-01-15',
    notas: 'Excelente rendimiento'
  },
  {
    id: '2',
    atletaId: '2',
    atletaNombre: 'Carlos Gómez',
    tipoPrueba: 'VO2 Max',
    resultado: 58.3,
    unidad: 'ml/kg/min',
    fecha: '2024-01-14',
  },
  {
    id: '3',
    atletaId: '1',
    atletaNombre: 'Juan Pérez',
    tipoPrueba: 'Salto Vertical',
    resultado: 65,
    unidad: 'cm',
    fecha: '2024-01-13',
  },
];

export const getPruebasFisicas = async (): Promise<PruebaFisica[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockPruebas];
};

export const addPruebaFisica = async (prueba: Omit<PruebaFisica, 'id'>): Promise<PruebaFisica> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const newPrueba: PruebaFisica = {
    ...prueba,
    id: String(Date.now()),
  };

  mockPruebas.push(newPrueba);
  return newPrueba;
};

export const getAtletas = async (): Promise<Atleta[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockAtletas];
};

export const deletePruebaFisica = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockPruebas.findIndex(p => p.id === id);
  if (index !== -1) {
    mockPruebas.splice(index, 1);
  }
};

export const updatePruebaFisica = async (id: string, prueba: Partial<PruebaFisica>): Promise<PruebaFisica> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockPruebas.findIndex(p => p.id === id);
  if (index !== -1) {
    mockPruebas[index] = { ...mockPruebas[index], ...prueba };
    return mockPruebas[index];
  }

  throw new Error('Prueba no encontrada');
};
