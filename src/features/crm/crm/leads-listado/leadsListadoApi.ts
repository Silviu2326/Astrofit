import { useState, useEffect } from 'react';
import leadService, { Lead as BackendLead, LeadsFilters as BackendFilters, LeadsStats } from '../../../../services/leadService';

// Map backend lead to frontend format
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  origin: string;
  contactDate: string;
  objective: string;
  status: 'Nuevo contacto' | 'Contactado' | 'Cita agendada' | 'Ganado' | 'Perdido';
  prioridad?: 'baja' | 'media' | 'alta';
  etiquetas?: string[];
  presupuesto?: number;
  notas?: string;
}

export type SortBy = 'nombre' | 'estado' | 'prioridad' | 'createdAt' | 'fechaContacto';
export type SortDir = 'asc' | 'desc';

export interface LeadsFilters {
  q?: string;
  estado?: string;
  prioridad?: string;
  fuente?: string;
  etiquetas?: string[];
  sortBy?: SortBy;
  sortDir?: SortDir;
  page?: number;
  pageSize?: number;
}

export interface LeadsResult {
  data: Lead[];
  total: number;
  page: number;
  pages: number;
  stats: LeadsStats;
}

// Mapeo de estados entre backend y frontend
const estadoBackendToFrontend: { [key: string]: Lead['status'] } = {
  'nuevo': 'Nuevo contacto',
  'contactado': 'Contactado',
  'interesado': 'Cita agendada',
  'convertido': 'Ganado',
  'perdido': 'Perdido',
  'no-interesado': 'Perdido'
};

const estadoFrontendToBackend: { [key: string]: BackendLead['estado'] } = {
  'Nuevo contacto': 'nuevo',
  'Contactado': 'contactado',
  'Cita agendada': 'interesado',
  'Ganado': 'convertido',
  'Perdido': 'perdido'
};

const fuenteBackendToFrontend: { [key: string]: string } = {
  'web': 'Web',
  'redes-sociales': 'Redes Sociales',
  'referido': 'Referido',
  'evento': 'Evento',
  'publicidad': 'Publicidad',
  'otro': 'Otro'
};

// Transform backend lead to frontend format
function transformLeadToFrontend(backendLead: BackendLead): Lead {
  return {
    id: backendLead.id || backendLead._id || '',
    name: backendLead.nombre,
    phone: backendLead.telefono || '',
    email: backendLead.email,
    origin: fuenteBackendToFrontend[backendLead.fuente] || backendLead.fuente,
    contactDate: backendLead.fechaContacto ? new Date(backendLead.fechaContacto).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    objective: backendLead.interes || backendLead.notas || 'Sin objetivo definido',
    status: estadoBackendToFrontend[backendLead.estado] || 'Nuevo contacto',
    prioridad: backendLead.prioridad,
    etiquetas: backendLead.etiquetas,
    presupuesto: backendLead.presupuesto,
    notas: backendLead.notas
  };
}

export const useLeads = (filters: LeadsFilters = {}) => {
  const [result, setResult] = useState<LeadsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build backend filters
        const backendFilters: BackendFilters = {
          q: filters.q,
          sortBy: filters.sortBy || 'createdAt',
          sortDir: filters.sortDir || 'desc',
          page: filters.page || 1,
          pageSize: filters.pageSize || 100
        };

        // Map estado to backend format
        if (filters.estado) {
          const backendEstado = estadoFrontendToBackend[filters.estado];
          if (backendEstado) {
            backendFilters.estado = backendEstado;
          }
        }

        if (filters.prioridad) {
          backendFilters.prioridad = filters.prioridad as any;
        }

        if (filters.fuente) {
          const fuenteMap: { [key: string]: BackendLead['fuente'] } = {
            'Web': 'web',
            'Redes Sociales': 'redes-sociales',
            'Referido': 'referido',
            'Evento': 'evento',
            'Publicidad': 'publicidad',
            'Otro': 'otro'
          };
          backendFilters.fuente = fuenteMap[filters.fuente] || filters.fuente as any;
        }

        if (filters.etiquetas) {
          backendFilters.etiquetas = filters.etiquetas;
        }

        const response = await leadService.getLeads(backendFilters);

        if (!response.success) {
          throw new Error('Error al cargar leads');
        }

        // Transform leads to frontend format
        const transformedLeads = response.data.map(transformLeadToFrontend);

        setResult({
          data: transformedLeads,
          total: response.total,
          page: response.page,
          pages: response.pages,
          stats: response.stats
        });
      } catch (e: any) {
        console.error('Error fetching leads:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [
    filters.q,
    filters.estado,
    filters.prioridad,
    filters.fuente,
    filters.etiquetas?.join(','),
    filters.sortBy,
    filters.sortDir,
    filters.page,
    filters.pageSize,
    refetchTrigger
  ]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return {
    leads: result?.data || [],
    total: result?.total || 0,
    pages: result?.pages || 0,
    stats: result?.stats,
    loading,
    error,
    refetch
  };
};

export const updateLeadStatus = async (leadId: string, newStatus: Lead['status']): Promise<Lead | undefined> => {
  try {
    const backendEstado = estadoFrontendToBackend[newStatus];
    if (!backendEstado) {
      throw new Error('Estado inválido');
    }

    const response = await leadService.updateLead(leadId, { estado: backendEstado });

    if (response.success && response.data) {
      return transformLeadToFrontend(response.data);
    }

    return undefined;
  } catch (error) {
    console.error('Error updating lead status:', error);
    return undefined;
  }
};

export const createLead = async (leadData: Partial<Lead>): Promise<Lead | undefined> => {
  try {
    // Transform to backend format
    const backendData: Partial<BackendLead> = {
      nombre: leadData.name || '',
      email: leadData.email || '',
      telefono: leadData.phone,
      interes: leadData.objective,
      notas: leadData.notas,
      presupuesto: leadData.presupuesto,
      etiquetas: leadData.etiquetas || [],
      prioridad: leadData.prioridad || 'media',
      fuente: 'web' // Default
    };

    if (leadData.status) {
      backendData.estado = estadoFrontendToBackend[leadData.status] || 'nuevo';
    }

    if (leadData.origin) {
      const fuenteMap: { [key: string]: BackendLead['fuente'] } = {
        'Web': 'web',
        'Redes Sociales': 'redes-sociales',
        'Referido': 'referido',
        'Evento': 'evento',
        'Publicidad': 'publicidad',
        'Otro': 'otro'
      };
      backendData.fuente = fuenteMap[leadData.origin] || 'web';
    }

    const response = await leadService.createLead(backendData);

    if (response.success && response.data) {
      return transformLeadToFrontend(response.data);
    }

    return undefined;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

export const deleteLead = async (leadId: string): Promise<boolean> => {
  try {
    const response = await leadService.deleteLead(leadId);
    return response.success;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
};
