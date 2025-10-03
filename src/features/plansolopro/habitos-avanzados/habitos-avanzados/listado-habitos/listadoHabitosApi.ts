// Simulaci??n de una API para h??bitos
export interface Habito {
  id: string;
  nombre: string;
  cliente: string;
  tipo: string;
  estado: 'activo' | 'inactivo';
  cumplimientoSemanal: number; // Porcentaje de 0 a 100
}

const mockHabitos: Habito[] = [
  { id: '1', nombre: 'Beber 2L agua', cliente: 'Cliente A', tipo: 'Salud', estado: 'activo', cumplimientoSemanal: 80 },
  { id: '2', nombre: 'Hacer ejercicio 30min', cliente: 'Cliente B', tipo: 'Salud', estado: 'activo', cumplimientoSemanal: 40 },
  { id: '3', nombre: 'Leer 15min', cliente: 'Cliente A', tipo: 'Desarrollo Personal', estado: 'inactivo', cumplimientoSemanal: 0 },
  { id: '4', nombre: 'Meditar 10min', cliente: 'Cliente C', tipo: 'Bienestar', estado: 'activo', cumplimientoSemanal: 95 },
  { id: '5', nombre: 'Estudiar programaci??n', cliente: 'Cliente B', tipo: 'Educaci??n', estado: 'activo', cumplimientoSemanal: 60 },
];

export const getHabitos = (): Promise<Habito[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHabitos), 500);
  });
};

export const getHabitosByCliente = (clienteId: string): Promise<Habito[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHabitos.filter(h => h.cliente === clienteId)), 500);
  });
};
