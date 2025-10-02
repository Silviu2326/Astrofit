export type EstadoPedido =
  | 'pendiente'
  | 'procesando'
  | 'enviado'
  | 'en_transito'
  | 'entregado'
  | 'cancelado';

export type TipoPago =
  | 'tarjeta'
  | 'transferencia'
  | 'paypal'
  | 'contra_reembolso';

export type PrioridadPedido = 'baja' | 'normal' | 'alta' | 'urgente';

export interface ProductoPedido {
  id: string;
  nombre: string;
  sku: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  imagen?: string;
}

export interface DireccionEnvio {
  nombre: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  notas?: string;
}

export interface EventoEnvio {
  fecha: Date;
  estado: EstadoPedido;
  ubicacion?: string;
  descripcion: string;
  responsable?: string;
}

export interface Mensaje {
  id: string;
  pedidoId: string;
  remitente: 'cliente' | 'empresa';
  nombreRemitente: string;
  mensaje: string;
  fecha: Date;
  leido: boolean;
  adjuntos?: string[];
}

export interface Pedido {
  id: string;
  numeroPedido: string;
  cliente: {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    avatar?: string;
  };
  productos: ProductoPedido[];
  direccionEnvio: DireccionEnvio;
  estado: EstadoPedido;
  prioridad: PrioridadPedido;
  subtotal: number;
  envio: number;
  impuestos: number;
  total: number;
  metodoPago: TipoPago;
  fechaPedido: Date;
  fechaEstimadaEntrega?: Date;
  fechaEntrega?: Date;
  seguimiento?: string;
  empresa?: string;
  historialEnvio: EventoEnvio[];
  mensajes: Mensaje[];
  notas?: string;
}

export interface FiltrosPedidos {
  busqueda?: string;
  estado?: EstadoPedido[];
  prioridad?: PrioridadPedido[];
  fechaDesde?: Date;
  fechaHasta?: Date;
  metodoPago?: TipoPago[];
}

export interface EstadisticasPedidos {
  total: number;
  pendientes: number;
  procesando: number;
  enviados: number;
  entregados: number;
  cancelados: number;
  ingresosTotales: number;
  ticketPromedio: number;
}
