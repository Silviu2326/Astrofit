// Types para Plan Studio Pro

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  categoria: 'bebidas' | 'snacks' | 'merch' | 'suplementos' | 'pases' | 'servicios';
  stock?: number;
  descripcion?: string;
  enOferta?: boolean;
  descuento?: number;
  cantidad?: number;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}

export interface Transaccion {
  id: string;
  numeroTicket: string;
  fecha: Date;
  cliente?: {
    id: string;
    nombre: string;
    email?: string;
    esmiembro: boolean;
  };
  items: ItemCarrito[];
  subtotal: number;
  descuentos: number;
  impuestos: number;
  total: number;
  metodoPago: 'tarjeta' | 'efectivo' | 'transferencia' | 'credito';
  estado: 'completada' | 'reembolsada' | 'pendiente';
  cajero: string;
}

export interface SesionCaja {
  id: string;
  fechaApertura: Date;
  fechaCierre?: Date;
  montoInicial: number;
  montoFinal?: number;
  cajero: string;
  transacciones: Transaccion[];
  estado: 'abierta' | 'cerrada';
}

export interface Reembolso {
  id: string;
  transaccionOriginal: string;
  fecha: Date;
  itemsReembolsados: ItemCarrito[];
  montoReembolsado: number;
  razon: string;
  metodoReembolso: 'mismo' | 'credito' | 'efectivo';
  estado: 'procesado' | 'pendiente';
}

export interface Descuento {
  tipo: 'porcentaje' | 'monto';
  valor: number;
  codigo?: string;
  descripcion?: string;
}

export interface EstadisticasDia {
  ventasTotal: number;
  numTransacciones: number;
  ticketPromedio: number;
  topProducto: string;
  comparativaAyer: number;
  ventasPorHora: { hora: string; ventas: number }[];
  distribucionMetodosPago: { metodo: string; porcentaje: number; total: number }[];
  topProductosVendidos: { producto: string; cantidad: number; total: number }[];
}
