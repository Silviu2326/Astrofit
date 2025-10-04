import api from './api';

export interface Tarea {
  _id?: string;
  id?: string;
  trainerId?: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
  fechaCompletada?: string;
  estado: 'pendiente' | 'en progreso' | 'completada' | 'vencida';
  prioridad: 'alta' | 'media' | 'baja';
  asignadoA: string;
  clienteId?: {
    _id?: string;
    id?: string;
    nombre?: string;
    email?: string;
    telefono?: string;
  } | string;
  clienteRelacionado?: string;
  notasAdicionales?: string;
  etiquetas?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TareasFilters {
  estado?: 'pendiente' | 'en progreso' | 'completada' | 'vencida' | '';
  prioridad?: 'alta' | 'media' | 'baja' | '';
  clienteId?: string;
  asignadoA?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface TareasResponse {
  success: boolean;
  data: Tarea[];
  total: number;
  page: number;
  pages: number;
  count: number;
}

export interface TareaResponse {
  success: boolean;
  data: Tarea;
  message?: string;
}

export interface StatsResponse {
  success: boolean;
  data: {
    total: number;
    pendientes: number;
    enProgreso: number;
    completadas: number;
    vencidas: number;
    urgentes: number;
  };
}

export interface BulkResponse {
  success: boolean;
  message: string;
  count?: number;
}

class TareaService {
  // Get all tareas with filters
  async getTareas(filters: TareasFilters = {}): Promise<TareasResponse> {
    const params = new URLSearchParams();

    if (filters.estado) params.append('estado', filters.estado);
    if (filters.prioridad) params.append('prioridad', filters.prioridad);
    if (filters.clienteId) params.append('clienteId', filters.clienteId);
    if (filters.asignadoA) params.append('asignadoA', filters.asignadoA);
    if (filters.fechaDesde) params.append('fechaDesde', filters.fechaDesde);
    if (filters.fechaHasta) params.append('fechaHasta', filters.fechaHasta);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sort) params.append('sort', filters.sort);

    const response = await api.get<TareasResponse>(`/tareas?${params.toString()}`);

    // Normalizar IDs para compatibilidad con el frontend
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(tarea => ({
        ...tarea,
        id: tarea._id || tarea.id || ''
      }));
    }

    return response.data;
  }

  // Get single tarea
  async getTarea(id: string): Promise<TareaResponse> {
    const response = await api.get<TareaResponse>(`/tareas/${id}`);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Create new tarea
  async createTarea(tareaData: Partial<Tarea>): Promise<TareaResponse> {
    const response = await api.post<TareaResponse>('/tareas', tareaData);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Update tarea
  async updateTarea(id: string, tareaData: Partial<Tarea>): Promise<TareaResponse> {
    const response = await api.put<TareaResponse>(`/tareas/${id}`, tareaData);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Delete tarea
  async deleteTarea(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/tareas/${id}`);
    return response.data;
  }

  // Complete tarea
  async completarTarea(id: string): Promise<TareaResponse> {
    const response = await api.patch<TareaResponse>(`/tareas/${id}/completar`);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Get stats
  async getStats(): Promise<StatsResponse> {
    const response = await api.get<StatsResponse>('/tareas/stats/overview');
    return response.data;
  }

  // Get tareas vencidas
  async getTareasVencidas(): Promise<TareasResponse> {
    const response = await api.get<TareasResponse>('/tareas/vencidas');

    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(tarea => ({
        ...tarea,
        id: tarea._id || tarea.id || ''
      }));
    }

    return response.data;
  }

  // Get tareas próximas
  async getTareasProximas(dias: number = 7): Promise<TareasResponse> {
    const response = await api.get<TareasResponse>(`/tareas/proximas?dias=${dias}`);

    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(tarea => ({
        ...tarea,
        id: tarea._id || tarea.id || ''
      }));
    }

    return response.data;
  }

  // Add etiqueta
  async agregarEtiqueta(id: string, etiqueta: string): Promise<TareaResponse> {
    const response = await api.post<TareaResponse>(`/tareas/${id}/etiquetas`, { etiqueta });

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Remove etiqueta
  async eliminarEtiqueta(id: string, etiqueta: string): Promise<TareaResponse> {
    const response = await api.delete<TareaResponse>(`/tareas/${id}/etiquetas/${etiqueta}`);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Export tareas to CSV
  exportToCSV(tareas: Tarea[]): void {
    if (tareas.length === 0) {
      throw new Error('No hay datos para exportar');
    }

    const headers = ['ID', 'Título', 'Descripción', 'Fecha Vencimiento', 'Estado', 'Prioridad', 'Asignado A', 'Cliente', 'Notas'];
    const csvContent = [
      headers.join(','),
      ...tareas.map(tarea => [
        tarea.id || tarea._id,
        `"${tarea.titulo}"`,
        `"${tarea.descripcion}"`,
        tarea.fechaVencimiento,
        tarea.estado,
        tarea.prioridad,
        `"${tarea.asignadoA}"`,
        `"${tarea.clienteRelacionado || ''}"`,
        `"${tarea.notasAdicionales || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tareas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default new TareaService();
