import api from '../../../../services/api';

// Types
export interface Gasto {
  _id?: string;
  id?: string;
  trainer?: string;
  fecha: string;
  concepto: string;
  descripcion?: string;
  categoria: string;
  subcategoria?: string;
  proveedor: string;
  monto: number;
  metodoPago: string;
  estado: 'Pagado' | 'Pendiente' | 'Aprobado' | 'Rechazado';
  referencia?: string;
  notas?: string;
  esRecurrente: boolean;
  frecuencia?: 'Semanal' | 'Mensual' | 'Trimestral' | 'Anual' | null;
  proximaRecurrencia?: string | null;
  tieneFactura: boolean;
  facturaUrl?: string | null;
  archivoAdjunto?: string | null;
  etiquetas?: string[];
  isActive?: boolean;
  periodo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GastosResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: Gasto[];
}

export interface GastoResponse {
  success: boolean;
  data: Gasto;
}

export interface GastosStats {
  porCategoria: Array<{
    _id: string;
    total: number;
    count: number;
  }>;
  porProveedor: Array<{
    _id: string;
    total: number;
    count: number;
  }>;
  porEstado: Array<{
    _id: string;
    total: number;
    count: number;
  }>;
  totalGeneral: {
    total: number;
    count: number;
  };
  gastosRecurrentes: number;
}

export interface GastosStatsResponse {
  success: boolean;
  data: GastosStats;
}

export interface GastosPeriodoResponse {
  success: boolean;
  periodo: string;
  count: number;
  total: number;
  data: Gasto[];
}

export interface BulkUpdateResponse {
  success: boolean;
  message: string;
  data: {
    matchedCount: number;
    modifiedCount: number;
  };
}

export interface GastosFilters {
  page?: number;
  limit?: number;
  categoria?: string;
  estado?: string;
  proveedor?: string;
  fechaInicio?: string;
  fechaFin?: string;
  esRecurrente?: boolean;
  search?: string;
}

// API Functions
export const gastosApi = {
  /**
   * Get all gastos with filters and pagination
   */
  getGastos: async (filters?: GastosFilters): Promise<GastosResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const response = await api.get(`/gastos?${params.toString()}`);
    return response.data;
  },

  /**
   * Get a single gasto by ID
   */
  getGasto: async (id: string): Promise<GastoResponse> => {
    const response = await api.get(`/gastos/${id}`);
    return response.data;
  },

  /**
   * Create a new gasto
   */
  createGasto: async (gastoData: Partial<Gasto>): Promise<GastoResponse> => {
    const response = await api.post('/gastos', gastoData);
    return response.data;
  },

  /**
   * Update a gasto
   */
  updateGasto: async (id: string, gastoData: Partial<Gasto>): Promise<GastoResponse> => {
    const response = await api.put(`/gastos/${id}`, gastoData);
    return response.data;
  },

  /**
   * Delete a gasto (soft delete)
   */
  deleteGasto: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/gastos/${id}`);
    return response.data;
  },

  /**
   * Get gastos statistics
   */
  getGastosStats: async (fechaInicio?: string, fechaFin?: string): Promise<GastosStatsResponse> => {
    const params = new URLSearchParams();
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);

    const response = await api.get(`/gastos/stats/summary?${params.toString()}`);
    return response.data;
  },

  /**
   * Get gastos by periodo (YYYY-MM)
   */
  getGastosByPeriodo: async (periodo: string): Promise<GastosPeriodoResponse> => {
    const response = await api.get(`/gastos/periodo/${periodo}`);
    return response.data;
  },

  /**
   * Bulk update gastos estado
   */
  bulkUpdateEstado: async (ids: string[], estado: string): Promise<BulkUpdateResponse> => {
    const response = await api.put('/gastos/bulk/estado', { ids, estado });
    return response.data;
  },

  /**
   * Bulk delete gastos
   */
  bulkDeleteGastos: async (ids: string[]): Promise<BulkUpdateResponse> => {
    const response = await api.delete('/gastos/bulk/delete', { data: { ids } });
    return response.data;
  },
};

// Legacy compatibility exports
export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  receiptUrl?: string;
}

export interface VariableExpense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  receiptUrl?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  type: 'fixed' | 'variable';
}

export interface MonthlyBudget {
  id: string;
  category: string;
  limit: number;
  currentSpent: number;
}

// Fallback mock data (for components that still use the old API)
const mockCategories: ExpenseCategory[] = [
  { id: 'cat1', name: 'Alquiler', type: 'fixed' },
  { id: 'cat2', name: 'Seguros', type: 'fixed' },
  { id: 'cat3', name: 'Software', type: 'fixed' },
  { id: 'cat4', name: 'Material Deportivo', type: 'variable' },
  { id: 'cat5', name: 'Publicidad', type: 'variable' },
  { id: 'cat6', name: 'Desplazamientos', type: 'variable' },
  { id: 'cat7', name: 'Alimentación', type: 'variable' },
  { id: 'cat8', name: 'Suministros', type: 'variable' },
  { id: 'cat9', name: 'Marketing', type: 'variable' },
];

const mockMonthlyBudgets: MonthlyBudget[] = [
  { id: 'mb1', category: 'Alimentación', limit: 300, currentSpent: 250 },
  { id: 'mb2', category: 'Marketing', limit: 200, currentSpent: 180 },
  { id: 'mb3', category: 'Material Deportivo', limit: 150, currentSpent: 120 },
];

// Legacy mock API calls (deprecated - use gastosApi instead)
export const legacyGastosApi = {
  getFixedExpenses: async (): Promise<FixedExpense[]> => {
    // Convert gastos to fixed expenses
    const response = await gastosApi.getGastos({ esRecurrente: true });
    return response.data.map(gasto => ({
      id: gasto._id || gasto.id || '',
      name: gasto.concepto,
      amount: gasto.monto,
      dueDate: gasto.fecha,
      category: gasto.categoria,
      receiptUrl: gasto.facturaUrl || undefined
    }));
  },

  getVariableExpenses: async (): Promise<VariableExpense[]> => {
    // Convert gastos to variable expenses
    const response = await gastosApi.getGastos({ esRecurrente: false });
    return response.data.map(gasto => ({
      id: gasto._id || gasto.id || '',
      name: gasto.concepto,
      amount: gasto.monto,
      date: gasto.fecha,
      category: gasto.categoria,
      receiptUrl: gasto.facturaUrl || undefined
    }));
  },

  getCategories: async (): Promise<ExpenseCategory[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockCategories), 100));
  },

  getMonthlyBudgets: async (): Promise<MonthlyBudget[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockMonthlyBudgets), 100));
  },
};

export default gastosApi;
