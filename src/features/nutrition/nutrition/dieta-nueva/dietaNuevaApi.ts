import { Dieta, Cliente, Receta } from '../../types'; // Asumiendo que tienes un archivo de tipos global

// Datos mock para simular una API
const mockClientes: Cliente[] = [
  { id: '1', nombre: 'Juan Pérez', email: 'juan@example.com' },
  { id: '2', nombre: 'María García', email: 'maria@example.com' },
  { id: '3', nombre: 'Carlos López', email: 'carlos@example.com' },
];

const mockRecetas: Receta[] = [
  { id: 'rec1', nombre: 'Ensalada César', calorias: 350, macros: { proteinas: 20, carbos: 30, grasas: 15 } },
  { id: 'rec2', nombre: 'Pollo a la plancha con verduras', calorias: 450, macros: { proteinas: 40, carbos: 20, grasas: 20 } },
  { id: 'rec3', nombre: 'Batido de proteínas', calorias: 250, macros: { proteinas: 30, carbos: 25, grasas: 5 } },
];

export const dietaNuevaApi = {
  getClientes: async (): Promise<Cliente[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockClientes), 500));
  },

  getRecetas: async (): Promise<Receta[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockRecetas), 500));
  },

  saveDieta: async (dieta: Dieta): Promise<Dieta> => {
    console.log('Guardando dieta:', dieta);
    return new Promise(resolve => setTimeout(() => resolve({ ...dieta, id: 'new-dieta-123' }), 1000));
  },

  saveDietaAsDraft: async (dieta: Dieta): Promise<Dieta> => {
    console.log('Guardando dieta como borrador:', dieta);
    return new Promise(resolve => setTimeout(() => resolve({ ...dieta, id: 'draft-dieta-456' }), 1000));
  },
};

// Definiciones de tipos (deberían estar en un archivo global como src/types.ts)
export interface Cliente {
  id: string;
  nombre: string;
  email: string;
}

export interface Macro {
  proteinas: number;
  carbos: number;
  grasas: number;
}

export interface Comida {
  id: string;
  nombre: string;
  calorias: number;
  macros: Macro;
  recetas?: Receta[];
  descripcion?: string;
}

export interface Receta {
  id: string;
  nombre: string;
  calorias: number;
  macros: Macro;
  ingredientes?: string[];
  instrucciones?: string[];
}

export interface Dieta {
  id?: string;
  clienteId: string;
  objetivo: string;
  estiloAlimentacion: string;
  numeroComidas: number;
  caloriasTotales: number;
  macrosTotales: Macro;
  comidasPorDia: { [key: string]: Comida[] }; // key: día de la semana (ej. 'lunes')
  fechaCreacion: string;
  esBorrador: boolean;
}
