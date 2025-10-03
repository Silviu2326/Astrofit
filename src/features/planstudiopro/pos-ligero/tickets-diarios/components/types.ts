/**
 * Tipos TypeScript para los componentes de Tickets Diarios
 */

// Tipos base para items y eventos
export interface ItemTicket {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  precioUnitario: number;
  descuento?: number;
  subtotal: number;
}

export interface EventoTicket {
  id: string;
  tipo: string;
  descripcion: string;
  usuario: string;
  hora: string;
}

// Tipo principal de Ticket
export interface Ticket {
  id: string;
  numeroTicket: string;
  fecha: string;
  hora: string;
  cliente: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  cantidadItems: number;
  total: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia' | 'credito';
  cajero: string;
  estado: 'completada' | 'reembolsada' | 'parcial';
  items: ItemTicket[];
  subtotal: number;
  descuentoTotal: number;
  impuestos: number;
  notas?: string;
  eventos?: EventoTicket[];
}

// Tipos para análisis y gráficos
export interface VentaPorHora {
  hora: string;
  monto: number;
  tickets: number;
}

export interface VentaPorMetodoPago {
  metodo: string;
  monto: number;
  tickets: number;
}

export interface RendimientoCajero {
  id: string;
  nombre: string;
  avatar?: string;
  ticketsProcesados: number;
  totalVendido: number;
  ticketPromedio: number;
  reembolsos: number;
}

export interface ProductoVendido {
  id: string;
  nombre: string;
  emoji?: string;
  imagen?: string;
  categoria: string;
  unidadesVendidas: number;
  revenue: number;
  porcentajeTotal: number;
}

// Tipos para filtros
export interface FiltrosState {
  horaDesde: string;
  horaHasta: string;
  metodosPago: string[];
  cajeros: string[];
  cliente: string;
  montoMin: string;
  montoMax: string;
  estados: string[];
}

// Props de componentes
export interface TablaTicketsModernaProps {
  tickets: Ticket[];
  onSeleccionarTicket: (ticket: Ticket) => void;
  onToggleFiltros: () => void;
}

export interface ModalDetalleTicketProps {
  ticket: Ticket | null;
  onCerrar: () => void;
}

export interface FiltrosAvanzadosProps {
  tickets: Ticket[];
  onFiltrar: (filtros: FiltrosState) => void;
  onCerrar: () => void;
}

export interface GraficoVentasPorHoraProps {
  datos: VentaPorHora[];
}

export interface AnalisisPorMetodoPagoProps {
  datos: VentaPorMetodoPago[];
}

export interface AnalisisPorCajeroProps {
  datos: RendimientoCajero[];
}

export interface ProductosMasVendidosProps {
  datos: ProductoVendido[];
}
