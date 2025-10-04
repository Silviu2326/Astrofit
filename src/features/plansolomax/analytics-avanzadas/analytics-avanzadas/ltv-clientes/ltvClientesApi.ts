import { ClienteLTV } from './types';

// Simulamos una API para obtener datos de clientes y LTV
export const fetchLtvClientes = async (): Promise<ClienteLTV[]> => {
  // Aquí iría la lógica para llamar a tu backend o base de datos
  // Por ahora, retornamos datos mock
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', nombre: 'Cliente A', ingresosTotales: 1200, duracionVida: 12, ltv: 1200 },
        { id: '2', nombre: 'Cliente B', ingresosTotales: 800, duracionVida: 8, ltv: 800 },
        { id: '3', nombre: 'Cliente C', ingresosTotales: 2500, duracionVida: 24, ltv: 2500 },
        { id: '4', nombre: 'Cliente D', ingresosTotales: 300, duracionVida: 3, ltv: 300 },
        { id: '5', nombre: 'Cliente E', ingresosTotales: 1800, duracionVida: 18, ltv: 1800 },
      ]);
    }, 500);
  });
};

// Puedes añadir más funciones para predicción de LTV, etc.

// Definición de tipos (puedes mover esto a un archivo types.ts si es necesario)
export interface ClienteLTV {
  id: string;
  nombre: string;
  ingresosTotales: number;
  duracionVida: number; // en meses, por ejemplo
  ltv: number;
}
