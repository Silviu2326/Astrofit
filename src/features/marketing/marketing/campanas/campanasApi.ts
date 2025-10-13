const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Tipos para coincidir con el backend
export type EstadoCampana = 'Activa' | 'Programada' | 'Completada' | 'Pausada';
export type CanalCampana = 'email' | 'redes' | 'SMS' | 'web' | 'mixto' | 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'twitter' | 'whatsapp' | 'telegram';

export interface Campana {
  _id?: string;
  id?: string;
  nombre: string;
  descripcion?: string;
  objetivo: string;
  estado: EstadoCampana;
  canal: CanalCampana;
  fechaInicio: string;
  fechaFin: string;
  presupuesto: number;
  presupuestoUtilizado: number;
  audienciaObjetivo: string;
  contenido?: string;
  hashtags?: string;
  callToAction?: string;
  frecuencia?: 'unica' | 'diaria' | 'semanal' | 'mensual';
  horarioPublicacion?: string;
  templateSeleccionado?: string;
  impresiones: number;
  clicks: number;
  conversiones: number;
  ctr: number; // Click Through Rate
  cpc: number; // Cost Per Click
  cpa: number; // Cost Per Acquisition
  roi: number; // Return on Investment
  imagen?: string;
  presupuestoDisponible?: number;
  porcentajePresupuestoUtilizado?: number;
  diasRestantes?: number;
  duracionDias?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CampanaStats {
  total: number;
  activas: number;
  programadas: number;
  completadas: number;
  pausadas: number;
  presupuestoTotal: number;
  presupuestoUtilizado: number;
  impresiones: number;
  clicks: number;
  conversiones: number;
  ctrPromedio: string;
  tasaConversion: string;
}

// Funciones de API

export const fetchCampanas = async (filters?: {
  estado?: EstadoCampana;
  canal?: CanalCampana;
  q?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}): Promise<{ data: Campana[]; total: number; page: number; pages: number; stats: CampanaStats }> => {
  try {
    const params = new URLSearchParams();
    if (filters?.estado) params.append('estado', filters.estado);
    if (filters?.canal) params.append('canal', filters.canal);
    if (filters?.q) params.append('q', filters.q);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortDir) params.append('sortDir', filters.sortDir);
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.pageSize) params.append('pageSize', String(filters.pageSize));

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al obtener campañas');

    const result = await response.json();
    return {
      data: result.data || [],
      total: result.total || 0,
      page: result.page || 1,
      pages: result.pages || 1,
      stats: result.stats || {}
    };
  } catch (error) {
    console.error('Error fetching campañas:', error);
    throw error;
  }
};

export const getCampana = async (id: string): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al obtener la campaña');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching campaña:', error);
    throw error;
  }
};

export const createCampana = async (newCampana: Partial<Campana>): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newCampana)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la campaña');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating campaña:', error);
    throw error;
  }
};

export const updateCampana = async (id: string, updatedCampana: Partial<Campana>): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedCampana)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al actualizar la campaña');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating campaña:', error);
    throw error;
  }
};

export const deleteCampana = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al eliminar la campaña');
  } catch (error) {
    console.error('Error deleting campaña:', error);
    throw error;
  }
};

export const bulkDeleteCampanas = async (ids: string[]): Promise<number> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ids })
    });

    if (!response.ok) throw new Error('Error al eliminar las campañas');

    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error bulk deleting campañas:', error);
    throw error;
  }
};

export const cambiarEstadoCampana = async (id: string, estado: EstadoCampana): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado })
    });

    if (!response.ok) throw new Error('Error al cambiar el estado de la campaña');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error changing campaña status:', error);
    throw error;
  }
};

export const actualizarMetricasCampana = async (
  id: string,
  metricas: {
    impresiones?: number;
    clicks?: number;
    conversiones?: number;
    presupuestoUtilizado?: number;
  }
): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}/metricas`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(metricas)
    });

    if (!response.ok) throw new Error('Error al actualizar las métricas');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating campaña metrics:', error);
    throw error;
  }
};

export const agregarImpresiones = async (id: string, cantidad: number): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}/impresiones`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ cantidad })
    });

    if (!response.ok) throw new Error('Error al agregar impresiones');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error adding impressions:', error);
    throw error;
  }
};

export const agregarClicks = async (id: string, cantidad: number): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}/clicks`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ cantidad })
    });

    if (!response.ok) throw new Error('Error al agregar clicks');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error adding clicks:', error);
    throw error;
  }
};

export const agregarConversiones = async (id: string, cantidad: number): Promise<Campana> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/${id}/conversiones`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ cantidad })
    });

    if (!response.ok) throw new Error('Error al agregar conversiones');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error adding conversions:', error);
    throw error;
  }
};

export const getCampanaStats = async (): Promise<CampanaStats> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al obtener estadísticas de campañas');

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching campaña stats:', error);
    throw error;
  }
};

export const getCampanasActivas = async (): Promise<Campana[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/activas`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al obtener campañas activas');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching active campañas:', error);
    throw error;
  }
};

export const getCampanasProgramadas = async (): Promise<Campana[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/programadas`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al obtener campañas programadas');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching scheduled campañas:', error);
    throw error;
  }
};

export const getCampanasByCanal = async (canal: CanalCampana): Promise<Campana[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/campanas/canal/${canal}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al obtener campañas por canal');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching campañas by channel:', error);
    throw error;
  }
};

// Legacy exports for compatibility with old Campaign interface
export interface Campaign {
  id: string;
  name: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: 'planificada' | 'activa' | 'finalizada' | 'pausada';
  budget: number;
  cost: number;
  leadsGenerated: number;
  customersConverted: number;
  roi: number;
  audienceSegmentation: string;
  template: string;
}

export const getCampaigns = async (): Promise<Campaign[]> => {
  const result = await fetchCampanas();
  // Convert new format to old format for backwards compatibility
  return result.data.map(c => ({
    id: c._id || c.id || '',
    name: c.nombre,
    objective: c.objetivo,
    startDate: c.fechaInicio,
    endDate: c.fechaFin,
    status: c.estado.toLowerCase() as 'planificada' | 'activa' | 'finalizada' | 'pausada',
    budget: c.presupuesto,
    cost: c.presupuestoUtilizado,
    leadsGenerated: c.impresiones,
    customersConverted: c.conversiones,
    roi: c.roi,
    audienceSegmentation: c.audienciaObjetivo,
    template: c.templateSeleccionado || ''
  }));
};

export const createCampaign = async (campaign: Omit<Campaign, 'id' | 'status' | 'cost' | 'leadsGenerated' | 'customersConverted' | 'roi'>): Promise<Campaign> => {
  const newCampana = await createCampana({
    nombre: campaign.name,
    objetivo: campaign.objective,
    fechaInicio: campaign.startDate,
    fechaFin: campaign.endDate,
    presupuesto: campaign.budget,
    audienciaObjetivo: campaign.audienceSegmentation,
    templateSeleccionado: campaign.template,
    canal: 'email', // default
    estado: 'Programada',
    presupuestoUtilizado: 0,
    impresiones: 0,
    clicks: 0,
    conversiones: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0,
    roi: 0
  });

  return {
    id: newCampana._id || newCampana.id || '',
    name: newCampana.nombre,
    objective: newCampana.objetivo,
    startDate: newCampana.fechaInicio,
    endDate: newCampana.fechaFin,
    status: newCampana.estado.toLowerCase() as 'planificada' | 'activa' | 'finalizada' | 'pausada',
    budget: newCampana.presupuesto,
    cost: newCampana.presupuestoUtilizado,
    leadsGenerated: newCampana.impresiones,
    customersConverted: newCampana.conversiones,
    roi: newCampana.roi,
    audienceSegmentation: newCampana.audienciaObjetivo,
    template: newCampana.templateSeleccionado || ''
  };
};

export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const updated = await updateCampana(campaign.id, {
    nombre: campaign.name,
    objetivo: campaign.objective,
    fechaInicio: campaign.startDate,
    fechaFin: campaign.endDate,
    presupuesto: campaign.budget,
    audienciaObjetivo: campaign.audienceSegmentation,
    templateSeleccionado: campaign.template
  });

  return {
    id: updated._id || updated.id || '',
    name: updated.nombre,
    objective: updated.objetivo,
    startDate: updated.fechaInicio,
    endDate: updated.fechaFin,
    status: updated.estado.toLowerCase() as 'planificada' | 'activa' | 'finalizada' | 'pausada',
    budget: updated.presupuesto,
    cost: updated.presupuestoUtilizado,
    leadsGenerated: updated.impresiones,
    customersConverted: updated.conversiones,
    roi: updated.roi,
    audienceSegmentation: updated.audienciaObjetivo,
    template: updated.templateSeleccionado || ''
  };
};
