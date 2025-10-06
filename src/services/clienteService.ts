import api from './api';

export interface Cliente {
  _id?: string;
  id?: string;
  trainerId?: string;
  nombre: string;
  email: string;
  telefono?: string;
  foto?: string;
  estado: 'activo' | 'inactivo';
  etiquetas: string[];
  fechaAlta: string;
  ultimaActividad: string;
  notas?: string;
  direccion?: {
    calle?: string;
    ciudad?: string;
    codigoPostal?: string;
    pais?: string;
  };
  facturacion?: {
    nombreFiscal?: string;
    nif?: string;
    direccionFiscal?: string;
  };
  preferencias?: {
    idioma?: string;
    notificaciones?: {
      email?: boolean;
      sms?: boolean;
      push?: boolean;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientesFilters {
  q?: string;
  estado?: 'activo' | 'inactivo' | '';
  etiquetas?: string[];
  fechaAltaDesde?: string;
  fechaAltaHasta?: string;
  sinActividadDias?: number;
  sortBy?: 'nombre' | 'estado' | 'fechaAlta' | 'ultimaActividad';
  sortDir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface ClientesResponse {
  success: boolean;
  data: Cliente[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  stats: {
    total: number;
    activos: number;
    inactivos: number;
    premium: number;
    online: number;
  };
}

export interface ClienteResponse {
  success: boolean;
  data: Cliente;
  message?: string;
}

export interface StatsResponse {
  success: boolean;
  data: {
    total: number;
    activos: number;
    inactivos: number;
    premium: number;
    online: number;
  };
}

export interface BulkResponse {
  success: boolean;
  message: string;
  count?: number;
}

class ClienteService {
  // Get all clientes with filters
  async getClientes(filters: ClientesFilters = {}): Promise<ClientesResponse> {
    const params = new URLSearchParams();

    if (filters.q) params.append('q', filters.q);
    if (filters.estado) params.append('estado', filters.estado);
    if (filters.etiquetas && filters.etiquetas.length > 0) {
      filters.etiquetas.forEach(tag => params.append('etiquetas', tag));
    }
    if (filters.fechaAltaDesde) params.append('fechaAltaDesde', filters.fechaAltaDesde);
    if (filters.fechaAltaHasta) params.append('fechaAltaHasta', filters.fechaAltaHasta);
    if (filters.sinActividadDias !== undefined) {
      params.append('sinActividadDias', filters.sinActividadDias.toString());
    }
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());

    const response = await api.get<ClientesResponse>(`/clientes?${params.toString()}`);

    // Normalizar IDs para compatibilidad con el frontend
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(cliente => ({
        ...cliente,
        id: cliente._id || cliente.id || ''
      }));
    }

    return response.data;
  }

  // Get single cliente
  async getCliente(id: string): Promise<ClienteResponse> {
    const response = await api.get<ClienteResponse>(`/clientes/${id}`);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Create new cliente
  async createCliente(clienteData: Partial<Cliente>): Promise<ClienteResponse> {
    const response = await api.post<ClienteResponse>('/clientes', clienteData);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Update cliente
  async updateCliente(id: string, clienteData: Partial<Cliente>): Promise<ClienteResponse> {
    const response = await api.put<ClienteResponse>(`/clientes/${id}`, clienteData);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Delete cliente
  async deleteCliente(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/clientes/${id}`);
    return response.data;
  }

  // Bulk delete clientes
  async bulkDeleteClientes(ids: string[]): Promise<BulkResponse> {
    const response = await api.post<BulkResponse>('/clientes/bulk-delete', { ids });
    return response.data;
  }

  // Bulk add tags
  async bulkAddTags(ids: string[], tags: string[]): Promise<BulkResponse> {
    const response = await api.post<BulkResponse>('/clientes/bulk-add-tags', { ids, tags });
    return response.data;
  }

  // Update activity
  async updateActivity(id: string): Promise<ClienteResponse> {
    const response = await api.patch<ClienteResponse>(`/clientes/${id}/activity`);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Get stats
  async getStats(): Promise<StatsResponse> {
    const response = await api.get<StatsResponse>('/clientes/stats');
    return response.data;
  }

  // Export clientes to CSV
  exportToCSV(clientes: Cliente[]): void {
    if (clientes.length === 0) {
      throw new Error('No hay datos para exportar');
    }

    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Estado', 'Etiquetas', 'Fecha Alta', 'Última Actividad'];
    const csvContent = [
      headers.join(','),
      ...clientes.map(cliente => [
        cliente.id || cliente._id,
        `"${cliente.nombre}"`,
        `"${cliente.email}"`,
        `"${cliente.telefono || ''}"`,
        cliente.estado,
        `"${cliente.etiquetas.join('; ')}"`,
        cliente.fechaAlta,
        cliente.ultimaActividad
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clientes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default new ClienteService();
