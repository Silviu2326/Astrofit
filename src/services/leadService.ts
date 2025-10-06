import api from './api';

export interface Lead {
  _id?: string;
  id?: string;
  trainerId?: string;
  nombre: string;
  email: string;
  telefono?: string;
  foto?: string;
  estado: 'nuevo' | 'contactado' | 'interesado' | 'no-interesado' | 'convertido' | 'perdido';
  prioridad: 'baja' | 'media' | 'alta';
  fuente: 'web' | 'redes-sociales' | 'referido' | 'evento' | 'publicidad' | 'otro';
  etiquetas: string[];
  interes?: string;
  presupuesto?: number;
  notas?: string;
  fechaContacto?: string;
  proximoSeguimiento?: string;
  fechaConversion?: string;
  clienteConvertidoId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadsFilters {
  q?: string;
  estado?: 'nuevo' | 'contactado' | 'interesado' | 'no-interesado' | 'convertido' | 'perdido' | '';
  prioridad?: 'baja' | 'media' | 'alta' | '';
  fuente?: 'web' | 'redes-sociales' | 'referido' | 'evento' | 'publicidad' | 'otro' | '';
  etiquetas?: string[];
  sortBy?: 'nombre' | 'estado' | 'prioridad' | 'createdAt' | 'fechaContacto';
  sortDir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface LeadsStats {
  total: number;
  nuevos: number;
  contactados: number;
  interesados: number;
  convertidos: number;
  perdidos: number;
  altaPrioridad: number;
  tasaConversion: string;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
  total: number;
  page: number;
  pages: number;
  stats: LeadsStats;
}

export interface LeadResponse {
  success: boolean;
  data: Lead;
  message?: string;
}

export interface StatsResponse {
  success: boolean;
  data: LeadsStats;
}

export interface BulkResponse {
  success: boolean;
  message: string;
  count?: number;
}

class LeadService {
  // Get all leads with filters
  async getLeads(filters: LeadsFilters = {}): Promise<LeadsResponse> {
    const params = new URLSearchParams();

    if (filters.q) params.append('q', filters.q);
    if (filters.estado) params.append('estado', filters.estado);
    if (filters.prioridad) params.append('prioridad', filters.prioridad);
    if (filters.fuente) params.append('fuente', filters.fuente);
    if (filters.etiquetas && filters.etiquetas.length > 0) {
      filters.etiquetas.forEach(tag => params.append('etiquetas', tag));
    }
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());

    const response = await api.get<LeadsResponse>(`/leads?${params.toString()}`);

    // Normalizar IDs para compatibilidad con el frontend
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(lead => ({
        ...lead,
        id: lead._id || lead.id || ''
      }));
    }

    return response.data;
  }

  // Get single lead
  async getLead(id: string): Promise<LeadResponse> {
    const response = await api.get<LeadResponse>(`/leads/${id}`);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Create new lead
  async createLead(leadData: Partial<Lead>): Promise<LeadResponse> {
    const response = await api.post<LeadResponse>('/leads', leadData);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Update lead
  async updateLead(id: string, leadData: Partial<Lead>): Promise<LeadResponse> {
    const response = await api.put<LeadResponse>(`/leads/${id}`, leadData);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Delete lead
  async deleteLead(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/leads/${id}`);
    return response.data;
  }

  // Bulk delete leads
  async bulkDeleteLeads(ids: string[]): Promise<BulkResponse> {
    const response = await api.post<BulkResponse>('/leads/bulk-delete', { ids });
    return response.data;
  }

  // Bulk add tags
  async bulkAddTags(ids: string[], tags: string[]): Promise<BulkResponse> {
    const response = await api.post<BulkResponse>('/leads/bulk-add-tags', { ids, tags });
    return response.data;
  }

  // Update contact date
  async updateContacto(id: string): Promise<LeadResponse> {
    const response = await api.patch<LeadResponse>(`/leads/${id}/contacto`);

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Convert lead to client
  async convertirACliente(id: string, clienteId: string): Promise<LeadResponse> {
    const response = await api.post<LeadResponse>(`/leads/${id}/convertir`, { clienteId });

    if (response.data.success && response.data.data) {
      response.data.data.id = response.data.data._id || response.data.data.id;
    }

    return response.data;
  }

  // Get stats
  async getStats(): Promise<StatsResponse> {
    const response = await api.get<StatsResponse>('/leads/stats');
    return response.data;
  }

  // Export leads to CSV
  exportToCSV(leads: Lead[]): void {
    if (leads.length === 0) {
      throw new Error('No hay datos para exportar');
    }

    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Estado', 'Prioridad', 'Fuente', 'Etiquetas', 'Interés', 'Presupuesto', 'Fecha Contacto'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.id || lead._id || '',
        `"${lead.nombre}"`,
        `"${lead.email}"`,
        `"${lead.telefono || ''}"`,
        lead.estado,
        lead.prioridad,
        lead.fuente,
        `"${lead.etiquetas.join('; ')}"`,
        `"${lead.interes || ''}"`,
        lead.presupuesto || '',
        lead.fechaContacto || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

const leadService = new LeadService();
export default leadService;
