import { Coupon } from './types';

// Mock API calls
export const fetchCupones = async (): Promise<Coupon[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          codigo: 'VERANO20',
          tipo: 'porcentaje',
          valor: 20,
          fechaInicio: '2023-06-01',
          fechaFin: '2023-08-31',
          usosActuales: 150,
          limiteUsos: 500,
          estado: 'activo',
        },
        {
          id: '2',
          codigo: 'ENVIOFREE',
          tipo: 'fijo',
          valor: 5,
          fechaInicio: '2023-01-01',
          fechaFin: '2023-12-31',
          usosActuales: 1000,
          limiteUsos: 1000,
          estado: 'agotado',
        },
        {
          id: '3',
          codigo: 'NAVIDAD10',
          tipo: 'porcentaje',
          valor: 10,
          fechaInicio: '2022-12-01',
          fechaFin: '2022-12-25',
          usosActuales: 300,
          limiteUsos: 300,
          estado: 'caducado',
        },
        {
          id: '4',
          codigo: 'NUEVOCLIENTE',
          tipo: 'porcentaje',
          valor: 15,
          fechaInicio: '2024-01-01',
          fechaFin: '2024-12-31',
          usosActuales: 50,
          limiteUsos: 200,
          estado: 'activo',
        },
      ]);
    }, 500);
  });
};

export const toggleCuponStatus = async (id: string, newStatus: 'activo' | 'inactivo'): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Coupon ${id} status toggled to ${newStatus}`);
      resolve(true);
    }, 300);
  });
};

// Define types for the API
export type CouponType = 'porcentaje' | 'fijo';
export type CouponStatus = 'activo' | 'caducado' | 'agotado';

export interface Coupon {
  id: string;
  codigo: string;
  tipo: CouponType;
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosActuales: number;
  limiteUsos: number;
  estado: CouponStatus;
}