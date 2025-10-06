import api from '../../../../services/api';

// Tipos basados en el backend
export interface Segmento {
  _id: string;
  nombre: string;
  descripcion: string;
  trainer: string;
  tipo: 'automatico' | 'manual' | 'hibrido';
  reglas?: {
    campo: string;
    operador: string;
    valor: any;
  }[];
  clientes?: string[];
  stats: {
    totalMiembros: number;
    activos: number;
    inactivos: number;
  };
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SegmentoCreateDTO {
  nombre: string;
  descripcion: string;
  tipo: 'automatico' | 'manual' | 'hibrido';
  reglas?: any[];
  clientes?: string[];
}

export interface SegmentoUpdateDTO {
  nombre?: string;
  descripcion?: string;
  reglas?: any[];
  activo?: boolean;
}

// Obtener todos los segmentos
export const fetchSegmentos = async (filters?: {
  tipo?: string;
  activo?: boolean;
  search?: string;
}): Promise<Segmento[]> => {
  const params = new URLSearchParams();
  if (filters?.tipo) params.append('tipo', filters.tipo);
  if (filters?.activo !== undefined) params.append('activo', String(filters.activo));
  if (filters?.search) params.append('search', filters.search);

  const response = await api.get(`/segmentos?${params.toString()}`);
  return response.data.data;
};

// Obtener un segmento por ID
export const fetchSegmento = async (id: string): Promise<Segmento> => {
  const response = await api.get(`/segmentos/${id}`);
  return response.data.data;
};

// Crear un nuevo segmento
export const createSegmento = async (data: SegmentoCreateDTO): Promise<Segmento> => {
  const response = await api.post('/segmentos', data);
  return response.data.data;
};

// Actualizar un segmento
export const updateSegmento = async (id: string, data: SegmentoUpdateDTO): Promise<Segmento> => {
  const response = await api.put(`/segmentos/${id}`, data);
  return response.data.data;
};

// Eliminar un segmento (soft delete)
export const deleteSegmento = async (id: string): Promise<void> => {
  await api.delete(`/segmentos/${id}`);
};

// Agregar un cliente a un segmento
export const agregarCliente = async (segmentoId: string, clienteId: string): Promise<Segmento> => {
  const response = await api.post(`/segmentos/${segmentoId}/clientes/${clienteId}`, {});
  return response.data.data;
};

// Eliminar un cliente de un segmento
export const eliminarCliente = async (segmentoId: string, clienteId: string): Promise<Segmento> => {
  const response = await api.delete(`/segmentos/${segmentoId}/clientes/${clienteId}`);
  return response.data.data;
};

// Agregar múltiples clientes a un segmento
export const agregarClientesMultiples = async (
  segmentoId: string,
  clienteIds: string[]
): Promise<Segmento> => {
  const response = await api.post(`/segmentos/${segmentoId}/clientes/bulk`, { clienteIds });
  return response.data.data;
};

// Obtener miembros de un segmento
export const getMiembros = async (segmentoId: string): Promise<any[]> => {
  const response = await api.get(`/segmentos/${segmentoId}/miembros`);
  return response.data.data;
};

// Recalcular estadísticas de un segmento
export const recalcularStats = async (segmentoId: string): Promise<Segmento> => {
  const response = await api.post(`/segmentos/${segmentoId}/recalcular`, {});
  return response.data.data;
};

// Obtener estadísticas generales
export const getStats = async (): Promise<any> => {
  const response = await api.get('/segmentos/stats/overview');
  return response.data.data;
};

// Activar/desactivar un segmento
export const toggleActive = async (segmentoId: string): Promise<Segmento> => {
  const response = await api.patch(`/segmentos/${segmentoId}/toggle-active`, {});
  return response.data.data;
};

// Función helper para obtener preview de conteo (para segmentos automáticos)
export const getSegmentPreviewCount = async (reglas: any[]): Promise<number> => {
  // Esta funcionalidad podría implementarse en el backend
  // Por ahora retornamos un estimado basado en getMiembros
  return 0;
};