import api from '../../../../services/api';

export interface Evento {
  _id: string;
  titulo: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: 'cita' | 'clase' | 'reunion' | 'evento' | 'otro';
  ubicacion?: string;
  participantes?: string[];
  clienteId?: string;
  color?: string;
  recordatorio?: boolean;
  minutosAntes?: number;
  trainer: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventoCreateDTO {
  titulo: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: 'cita' | 'clase' | 'reunion' | 'evento' | 'otro';
  ubicacion?: string;
  participantes?: string[];
  clienteId?: string;
  color?: string;
  recordatorio?: boolean;
  minutosAntes?: number;
}

export interface EventoUpdateDTO {
  titulo?: string;
  descripcion?: string;
  fechaInicio?: string;
  fechaFin?: string;
  tipo?: 'cita' | 'clase' | 'reunion' | 'evento' | 'otro';
  ubicacion?: string;
  participantes?: string[];
  clienteId?: string;
  color?: string;
  recordatorio?: boolean;
  minutosAntes?: number;
}

// Obtener eventos con filtros
export const fetchEventos = async (filters?: {
  fechaInicio?: string;
  fechaFin?: string;
  tipo?: string;
  clienteId?: string;
}): Promise<Evento[]> => {
  const params = new URLSearchParams();
  if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio);
  if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin);
  if (filters?.tipo) params.append('tipo', filters.tipo);
  if (filters?.clienteId) params.append('clienteId', filters.clienteId);

  const response = await api.get(`/eventos?${params.toString()}`);
  return response.data.data;
};

// Obtener un evento por ID
export const fetchEvento = async (id: string): Promise<Evento> => {
  const response = await api.get(`/eventos/${id}`);
  return response.data.data;
};

// Crear nuevo evento
export const createEvento = async (data: EventoCreateDTO): Promise<Evento> => {
  const response = await api.post('/eventos', data);
  return response.data.data;
};

// Actualizar evento
export const updateEvento = async (id: string, data: EventoUpdateDTO): Promise<Evento> => {
  const response = await api.put(`/eventos/${id}`, data);
  return response.data.data;
};

// Eliminar evento
export const deleteEvento = async (id: string): Promise<void> => {
  await api.delete(`/eventos/${id}`);
};

// Obtener eventos del día
export const fetchEventosDelDia = async (fecha: string): Promise<Evento[]> => {
  const response = await api.get(`/eventos/dia/${fecha}`);
  return response.data.data;
};

// Obtener eventos de la semana
export const fetchEventosDeLaSemana = async (fecha: string): Promise<Evento[]> => {
  const response = await api.get(`/eventos/semana/${fecha}`);
  return response.data.data;
};
