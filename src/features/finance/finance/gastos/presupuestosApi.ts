import api from '../../../../services/api';

// Types
export interface Presupuesto {
  _id?: string;
  id?: string;
  trainer?: string;
  categoria: string;
  periodo: 'Mensual' | 'Trimestral' | 'Anual';
  limitePresupuesto: number;
  gastoActual: number;
  año: number;
  mes?: number | null;
  trimestre?: number | null;
  alertaActivada: boolean;
  umbralAlerta: number;
  notas?: string;
  isActive?: boolean;
  // Virtuals
  porcentajeUsado?: number;
  montoDisponible?: number;
  excedido?: boolean;
  debeAlertar?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PresupuestosResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: Presupuesto[];
}

export interface PresupuestoResponse {
  success: boolean;
  data: Presupuesto;
}

export interface PresupuestosSummary {
  año: number;
  totalPresupuestado: number;
  totalGastado: number;
  totalDisponible: number;
  excedidos: number;
  conAlertas: number;
  porcentajeUsado: number;
  porCategoria: Record<string, {
    presupuestado: number;
    gastado: number;
    disponible: number;
    count: number;
  }>;
  porPeriodo: {
    Mensual: number;
    Trimestral: number;
    Anual: number;
  };
}

export interface PresupuestosSummaryResponse {
  success: boolean;
  data: PresupuestosSummary;
}

export interface PresupuestosFilters {
  page?: number;
  limit?: number;
  categoria?: string;
  periodo?: string;
  año?: number;
  mes?: number;
  trimestre?: number;
  excedidos?: boolean;
}

// API Functions
export const presupuestosApi = {
  /**
   * Get all presupuestos with filters
   */
  getPresupuestos: async (filters?: PresupuestosFilters): Promise<PresupuestosResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const response = await api.get(`/presupuestos?${params.toString()}`);
    return response.data;
  },

  /**
   * Get a single presupuesto by ID
   */
  getPresupuesto: async (id: string): Promise<PresupuestoResponse> => {
    const response = await api.get(`/presupuestos/${id}`);
    return response.data;
  },

  /**
   * Create a new presupuesto
   */
  createPresupuesto: async (presupuestoData: Partial<Presupuesto>): Promise<PresupuestoResponse> => {
    const response = await api.post('/presupuestos', presupuestoData);
    return response.data;
  },

  /**
   * Update a presupuesto
   */
  updatePresupuesto: async (id: string, presupuestoData: Partial<Presupuesto>): Promise<PresupuestoResponse> => {
    const response = await api.put(`/presupuestos/${id}`, presupuestoData);
    return response.data;
  },

  /**
   * Delete a presupuesto (soft delete)
   */
  deletePresupuesto: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/presupuestos/${id}`);
    return response.data;
  },

  /**
   * Get presupuestos by year
   */
  getPresupuestosByYear: async (year: number): Promise<{ success: boolean; count: number; data: Presupuesto[] }> => {
    const response = await api.get(`/presupuestos/year/${year}`);
    return response.data;
  },

  /**
   * Get presupuestos by periodo (YYYY-MM)
   */
  getPresupuestosByPeriodo: async (periodo: string): Promise<{ success: boolean; periodo: string; count: number; data: Presupuesto[] }> => {
    const response = await api.get(`/presupuestos/periodo/${periodo}`);
    return response.data;
  },

  /**
   * Update gasto actual for a presupuesto
   */
  actualizarGastoActual: async (id: string): Promise<PresupuestoResponse> => {
    const response = await api.put(`/presupuestos/${id}/actualizar-gasto`);
    return response.data;
  },

  /**
   * Update all gastos actuales for the trainer
   */
  actualizarTodosGastos: async (): Promise<{ success: boolean; message: string; count: number }> => {
    const response = await api.put('/presupuestos/actualizar-todos');
    return response.data;
  },

  /**
   * Get presupuestos summary/stats
   */
  getPresupuestosSummary: async (año?: number): Promise<PresupuestosSummaryResponse> => {
    const params = año ? `?año=${año}` : '';
    const response = await api.get(`/presupuestos/stats/summary${params}`);
    return response.data;
  },

  /**
   * Get presupuestos excedidos
   */
  getPresupuestosExcedidos: async (): Promise<{ success: boolean; count: number; data: Presupuesto[] }> => {
    const response = await api.get('/presupuestos/excedidos');
    return response.data;
  },

  /**
   * Get presupuestos con alertas
   */
  getPresupuestosConAlertas: async (): Promise<{ success: boolean; count: number; data: Presupuesto[] }> => {
    const response = await api.get('/presupuestos/alertas');
    return response.data;
  },
};

export default presupuestosApi;
