import api from './api';

export interface FacturaItem {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  productoId?: string;
}

export interface Factura {
  _id?: string;
  id?: string;
  trainerId?: string;
  clienteId: string;
  numeroFactura?: string;
  fecha: string;
  fechaVencimiento: string;
  estado: 'Pagada' | 'Pendiente' | 'Anulada' | 'Vencida';
  items: FacturaItem[];
  subtotal: number;
  descuento: number;
  impuestos: number;
  montoTotal: number;
  metodoPago: 'Tarjeta' | 'Transferencia' | 'PayPal' | 'Stripe' | 'Efectivo' | 'Otro';
  referenciaPago?: string;
  fechaPago?: string;
  notas?: string;
  notasInternas?: string;
  datosCliente?: {
    nombre: string;
    email: string;
    telefono?: string;
    nombreFiscal?: string;
    nif?: string;
    direccionFiscal?: string;
  };
  suscripcionId?: string;
  recordatoriosEnviados?: Array<{
    fecha: string;
    tipo: string;
    canal: string;
  }>;
  diasHastaVencimiento?: number;
  estaVencida?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FacturasFilters {
  estado?: 'Pagada' | 'Pendiente' | 'Anulada' | 'Vencida' | '';
  clienteId?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  page?: number;
  limit?: number;
}

export interface FacturasResponse {
  success: boolean;
  data: Factura[];
  count: number;
  total: number;
  page: number;
  pages: number;
}

export interface FacturaResponse {
  success: boolean;
  data: Factura;
  message?: string;
}

export interface FacturasStats {
  total: number;
  pagadas: number;
  pendientes: number;
  vencidas: number;
  anuladas: number;
  totalFacturado: number;
  totalCobrado: number;
  totalPendiente: number;
}

export interface FacturasStatsResponse {
  success: boolean;
  data: FacturasStats;
}

export interface IngresoMensual {
  mes: string;
  ingresos: number;
}

export interface IngresosMensualesResponse {
  success: boolean;
  data: IngresoMensual[];
}

export interface CreateFacturaData {
  clienteId: string;
  fecha?: string;
  fechaVencimiento: string;
  items: FacturaItem[];
  descuento?: number;
  impuestos?: number;
  metodoPago?: string;
  notas?: string;
  suscripcionId?: string;
}

export interface UpdateFacturaData {
  fecha?: string;
  fechaVencimiento?: string;
  items?: FacturaItem[];
  descuento?: number;
  impuestos?: number;
  metodoPago?: string;
  notas?: string;
  notasInternas?: string;
}

export interface MarcarComoPagadaData {
  metodoPago?: string;
  referenciaPago?: string;
}

export interface AnularFacturaData {
  motivo?: string;
}

export interface EnviarRecordatorioData {
  tipo?: string;
  canal?: string;
}

// Obtener todas las facturas con filtros
export const getFacturas = async (filters?: FacturasFilters): Promise<FacturasResponse> => {
  const response = await api.get('/facturas', { params: filters });
  return response.data;
};

// Obtener una factura específica
export const getFactura = async (id: string): Promise<FacturaResponse> => {
  const response = await api.get(`/facturas/${id}`);
  return response.data;
};

// Crear una nueva factura
export const createFactura = async (data: CreateFacturaData): Promise<FacturaResponse> => {
  const response = await api.post('/facturas', data);
  return response.data;
};

// Actualizar una factura
export const updateFactura = async (id: string, data: UpdateFacturaData): Promise<FacturaResponse> => {
  const response = await api.put(`/facturas/${id}`, data);
  return response.data;
};

// Marcar factura como pagada
export const marcarComoPagada = async (id: string, data?: MarcarComoPagadaData): Promise<FacturaResponse> => {
  const response = await api.put(`/facturas/${id}/pagar`, data);
  return response.data;
};

// Anular una factura
export const anularFactura = async (id: string, data?: AnularFacturaData): Promise<FacturaResponse> => {
  const response = await api.put(`/facturas/${id}/anular`, data);
  return response.data;
};

// Eliminar una factura (soft delete)
export const deleteFactura = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/facturas/${id}`);
  return response.data;
};

// Obtener estadísticas de facturas
export const getFacturasStats = async (): Promise<FacturasStatsResponse> => {
  const response = await api.get('/facturas/stats');
  return response.data;
};

// Obtener facturas de un cliente específico
export const getFacturasByCliente = async (clienteId: string): Promise<FacturasResponse> => {
  const response = await api.get(`/facturas/cliente/${clienteId}`);
  return response.data;
};

// Enviar recordatorio de pago
export const enviarRecordatorio = async (id: string, data?: EnviarRecordatorioData): Promise<FacturaResponse> => {
  const response = await api.post(`/facturas/${id}/recordatorio`, data);
  return response.data;
};

// Obtener ingresos por mes
export const getIngresosPorMes = async (year?: number): Promise<IngresosMensualesResponse> => {
  const response = await api.get('/facturas/ingresos/por-mes', { params: { year } });
  return response.data;
};

export default {
  getFacturas,
  getFactura,
  createFactura,
  updateFactura,
  marcarComoPagada,
  anularFactura,
  deleteFactura,
  getFacturasStats,
  getFacturasByCliente,
  enviarRecordatorio,
  getIngresosPorMes,
};
