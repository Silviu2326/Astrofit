import { Receta } from '../../shared/types'; // Assuming a shared types file

// Mock API functions for recipe editing
const mockRecipes: Receta[] = [
  {
    id: 'receta-123',
    nombre: 'Ensalada de Quinoa y Aguacate',
    descripcion: 'Una ensalada fresca y nutritiva, perfecta para el verano.',
    ingredientes: [
      { id: 'ing-1', nombre: 'Quinoa', cantidad: 1, unidad: 'taza' },
      { id: 'ing-2', nombre: 'Aguacate', cantidad: 1, unidad: 'unidad' },
      { id: 'ing-3', nombre: 'Tomates Cherry', cantidad: 10, unidad: 'unidades' },
      { id: 'ing-4', nombre: 'Pepino', cantidad: 0.5, unidad: 'unidad' },
      { id: 'ing-5', nombre: 'Limón', cantidad: 1, unidad: 'unidad' },
      { id: 'ing-6', nombre: 'Aceite de Oliva', cantidad: 2, unidad: 'cucharadas' },
      { id: 'ing-7', nombre: 'Sal', cantidad: 1, unidad: 'pizca' },
      { id: 'ing-8', nombre: 'Pimienta', cantidad: 1, unidad: 'pizca' },
    ],
    pasos: [
      { id: 'paso-1', descripcion: 'Cocinar la quinoa según las instrucciones del paquete.' },
      { id: 'paso-2', descripcion: 'Cortar el aguacate, tomates cherry y pepino en trozos pequeños.' },
      { id: 'paso-3', descripcion: 'En un bol grande, combinar la quinoa cocida con los vegetales cortados.' },
      { id: 'paso-4', descripcion: 'Exprimir el jugo de limón, añadir aceite de oliva, sal y pimienta. Mezclar bien.' },
      { id: 'paso-5', descripcion: 'Servir fría.' },
    ],
    informacionNutricional: {
      calorias: 350,
      proteinas: 12,
      carbohidratos: 40,
      grasas: 18,
    },
    porciones: 2,
    fotoUrl: 'https://example.com/quinoa-salad.jpg',
    notasPersonales: 'Ideal para llevar al trabajo. Se puede añadir pollo a la parrilla para más proteína.',
    historialVersiones: [
      {
        version: 1,
        fecha: '2023-01-15',
        cambios: 'Versión inicial',
        receta: { /* full recipe object for version 1 */ }
      },
      {
        version: 2,
        fecha: '2023-03-20',
        cambios: 'Ajuste de cantidades de limón y aceite.',
        receta: { /* full recipe object for version 2 */ }
      },
    ],
  },
  // Add more mock recipes if needed
];

export const getRecetaById = async (id: string): Promise<Receta | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecipes.find(receta => receta.id === id));
    }, 500);
  });
};

export const updateReceta = async (receta: Receta): Promise<Receta> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockRecipes.findIndex(r => r.id === receta.id);
      if (index !== -1) {
        mockRecipes[index] = receta;
      }
      resolve(receta);
    }, 500);
  });
};

export const createRecetaFromExisting = async (baseRecetaId: string, newName: string): Promise<Receta | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseReceta = mockRecipes.find(receta => receta.id === baseRecetaId);
      if (baseReceta) {
        const newReceta = { ...baseReceta, id: `receta-${Date.now()}`, nombre: newName, historialVersiones: [{ version: 1, fecha: new Date().toISOString().split('T')[0], cambios: 'Creada a partir de receta existente', receta: baseReceta }] };
        mockRecipes.push(newReceta);
        resolve(newReceta);
      }
      resolve(undefined);
    }, 500);
  });
};

// Define a basic Receta type for mock data, assuming it will be in a shared types file
export interface Receta {
  id: string;
  nombre: string;
  descripcion: string;
  ingredientes: { id: string; nombre: string; cantidad: number; unidad: string; }[];
  pasos: { id: string; descripcion: string; }[];
  informacionNutricional: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  porciones: number;
  fotoUrl?: string;
  notasPersonales?: string;
  historialVersiones: {
    version: number;
    fecha: string;
    cambios: string;
    receta: any; // Simplified for mock, ideally a partial Receta
  }[];
}