import { format } from 'date-fns';
import * as facturaService from '@/services/facturaService';

export interface Cobro {
  id: string;
  cliente: string;
  fecha: string;
  monto: number;
  estado: 'Pagado' | 'Pendiente' | 'Fallido' | 'En Proceso';
  metodoPago: string;
  descripcion: string;
}

export interface Suscripcion {
  id: string;
  cliente: string;
  plan: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'Activa' | 'Inactiva' | 'Cancelada' | 'Pendiente Renovacion';
  renovacionAutomatica: boolean;
  monto: number;
}

export interface Factura {
  id: string;
  cliente: string;
  fecha: string;
  montoTotal: number;
  estado: 'Pagada' | 'Pendiente' | 'Anulada' | 'Vencida';
  items: { descripcion: string; cantidad: number; precioUnitario: number; }[];
  numeroFactura?: string;
  clienteId?: string;
  datosCliente?: {
    nombre: string;
    email: string;
  };
}

// Mock Data
const mockCobros: Cobro[] = [
  {
    id: 'C001',
    cliente: 'Cliente A',
    fecha: format(new Date(2025, 8, 25), 'dd/MM/yyyy'),
    monto: 150.00,
    estado: 'Pagado',
    metodoPago: 'Tarjeta',
    descripcion: 'Suscripción Mensual Premium',
  },
  {
    id: 'C002',
    cliente: 'Cliente B',
    fecha: format(new Date(2025, 8, 24), 'dd/MM/yyyy'),
    monto: 75.00,
    estado: 'Pendiente',
    metodoPago: 'PayPal',
    descripcion: 'Plan Básico Mensual',
  },
  {
    id: 'C003',
    cliente: 'Cliente C',
    fecha: format(new Date(2025, 8, 23), 'dd/MM/yyyy'),
    monto: 200.00,
    estado: 'Fallido',
    metodoPago: 'Transferencia',
    descripcion: 'Servicio Anual',
  },
  {
    id: 'C004',
    cliente: 'Cliente D',
    fecha: format(new Date(2025, 8, 22), 'dd/MM/yyyy'),
    monto: 50.00,
    estado: 'Pagado',
    metodoPago: 'Tarjeta',
    descripcion: 'Compra de Créditos',
  },
  {
    id: 'C005',
    cliente: 'Cliente E',
    fecha: format(new Date(2025, 8, 21), 'dd/MM/yyyy'),
    monto: 120.00,
    estado: 'En Proceso',
    metodoPago: 'Stripe',
    descripcion: 'Renovación Trimestral',
  },
];

const mockSuscripciones: Suscripcion[] = [
  {
    id: 'S001',
    cliente: 'Cliente A',
    plan: 'Premium',
    fechaInicio: format(new Date(2025, 7, 25), 'dd/MM/yyyy'),
    fechaFin: format(new Date(2025, 8, 25), 'dd/MM/yyyy'),
    estado: 'Activa',
    renovacionAutomatica: true,
    monto: 150.00,
  },
  {
    id: 'S002',
    cliente: 'Cliente B',
    plan: 'Básico',
    fechaInicio: format(new Date(2025, 7, 24), 'dd/MM/yyyy'),
    fechaFin: format(new Date(2025, 8, 24), 'dd/MM/yyyy'),
    estado: 'Pendiente Renovacion',
    renovacionAutomatica: false,
    monto: 75.00,
  },
  {
    id: 'S003',
    cliente: 'Cliente C',
    plan: 'Empresarial',
    fechaInicio: format(new Date(2025, 6, 1), 'dd/MM/yyyy'),
    fechaFin: format(new Date(2026, 5, 30), 'dd/MM/yyyy'),
    estado: 'Activa',
    renovacionAutomatica: true,
    monto: 2000.00,
  },
];

const mockFacturas: Factura[] = [
  {
    id: 'F001',
    cliente: 'Cliente A',
    fecha: format(new Date(2025, 8, 25), 'dd/MM/yyyy'),
    montoTotal: 150.00,
    estado: 'Pagada',
    items: [{ descripcion: 'Suscripción Mensual Premium', cantidad: 1, precioUnitario: 150.00 }],
  },
  {
    id: 'F002',
    cliente: 'Cliente B',
    fecha: format(new Date(2025, 8, 24), 'dd/MM/yyyy'),
    montoTotal: 75.00,
    estado: 'Pendiente',
    items: [{ descripcion: 'Plan Básico Mensual', cantidad: 1, precioUnitario: 75.00 }],
  },
  {
    id: 'F003',
    cliente: 'Cliente D',
    fecha: format(new Date(2025, 8, 22), 'dd/MM/yyyy'),
    montoTotal: 50.00,
    estado: 'Pagada',
    items: [{ descripcion: 'Créditos de Marketing', cantidad: 50, precioUnitario: 1.00 }],
  },
];

export const getCobros = async (): Promise<Cobro[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCobros), 500);
  });
};

export const getSuscripciones = async (): Promise<Suscripcion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSuscripciones), 500);
  });
};

export const getFacturas = async (): Promise<Factura[]> => {
  try {
    const response = await facturaService.getFacturas();

    // Transformar las facturas del backend al formato esperado por el frontend
    return response.data.map(f => ({
      id: f._id || f.id || '',
      cliente: f.datosCliente?.nombre || 'Cliente',
      fecha: format(new Date(f.fecha), 'dd/MM/yyyy'),
      montoTotal: f.montoTotal,
      estado: f.estado,
      items: f.items,
      numeroFactura: f.numeroFactura,
      clienteId: f.clienteId,
      datosCliente: f.datosCliente
    }));
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    // Fallback a mock data si falla la API
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFacturas), 500);
    });
  }
};

export const getIngresosPorMes = async (): Promise<{ mes: string; ingresos: number }[]> => {
  try {
    const response = await facturaService.getIngresosPorMes();
    return response.data;
  } catch (error) {
    console.error('Error al obtener ingresos por mes:', error);
    // Fallback a mock data si falla la API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { mes: 'Ene', ingresos: 3000 },
          { mes: 'Feb', ingresos: 3200 },
          { mes: 'Mar', ingresos: 3500 },
          { mes: 'Abr', ingresos: 3800 },
          { mes: 'May', ingresos: 4100 },
          { mes: 'Jun', ingresos: 4500 },
          { mes: 'Jul', ingresos: 4800 },
          { mes: 'Ago', ingresos: 5000 },
          { mes: 'Sep', ingresos: 5200 },
        ]);
      }, 500);
    });
  }
};
