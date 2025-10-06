import api from '../../../../services/api';

export interface Nota {
  _id: string;
  titulo: string;
  contenido: string;
  trainer: string;
  cliente?: string;
  lead?: string;
  tarea?: string;
  evento?: string;
  categoria: 'general' | 'seguimiento' | 'observacion' | 'recordatorio' | 'importante' | 'otro';
  etiquetas: string[];
  color: string;
  fijada: boolean;
  archivada: boolean;
  recordatorio?: {
    activo: boolean;
    fecha?: string;
  };
  adjuntos?: Array<{
    nombre: string;
    url: string;
    tipo: string;
    tamaño: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface NotaCreateDTO {
  titulo: string;
  contenido: string;
  cliente?: string;
  lead?: string;
  tarea?: string;
  evento?: string;
  categoria?: 'general' | 'seguimiento' | 'observacion' | 'recordatorio' | 'importante' | 'otro';
  etiquetas?: string[];
  color?: string;
  recordatorio?: {
    activo: boolean;
    fecha?: string;
  };
}

export interface NotaUpdateDTO {
  titulo?: string;
  contenido?: string;
  cliente?: string;
  lead?: string;
  tarea?: string;
  evento?: string;
  categoria?: 'general' | 'seguimiento' | 'observacion' | 'recordatorio' | 'importante' | 'otro';
  etiquetas?: string[];
  color?: string;
  recordatorio?: {
    activo: boolean;
    fecha?: string;
  };
}

// Obtener todas las notas con filtros
export const getNotas = async (filters?: {
  cliente?: string;
  lead?: string;
  tarea?: string;
  evento?: string;
  categoria?: string;
  etiqueta?: string;
  fijada?: boolean;
  archivada?: boolean;
  search?: string;
}): Promise<Nota[]> => {
  const params = new URLSearchParams();
  if (filters?.cliente) params.append('cliente', filters.cliente);
  if (filters?.lead) params.append('lead', filters.lead);
  if (filters?.tarea) params.append('tarea', filters.tarea);
  if (filters?.evento) params.append('evento', filters.evento);
  if (filters?.categoria) params.append('categoria', filters.categoria);
  if (filters?.etiqueta) params.append('etiqueta', filters.etiqueta);
  if (filters?.fijada !== undefined) params.append('fijada', String(filters.fijada));
  if (filters?.archivada !== undefined) params.append('archivada', String(filters.archivada));
  if (filters?.search) params.append('search', filters.search);

  const response = await api.get(`/notas?${params.toString()}`);
  return response.data.data;
};

// Obtener una nota por ID
export const getNota = async (id: string): Promise<Nota> => {
  const response = await api.get(`/notas/${id}`);
  return response.data.data;
};

// Crear nueva nota
export const createNota = async (data: NotaCreateDTO): Promise<Nota> => {
  const response = await api.post('/notas', data);
  return response.data.data;
};

// Actualizar nota
export const updateNota = async (id: string, data: NotaUpdateDTO): Promise<Nota> => {
  const response = await api.put(`/notas/${id}`, data);
  return response.data.data;
};

// Eliminar nota
export const deleteNota = async (id: string): Promise<void> => {
  await api.delete(`/notas/${id}`);
};

// Fijar/desfijar nota
export const toggleFijar = async (id: string): Promise<Nota> => {
  const response = await api.patch(`/notas/${id}/fijar`);
  return response.data.data;
};

// Archivar/desarchivar nota
export const toggleArchivar = async (id: string): Promise<Nota> => {
  const response = await api.patch(`/notas/${id}/archivar`);
  return response.data.data;
};

// Obtener notas fijadas
export const getNotasFijadas = async (): Promise<Nota[]> => {
  const response = await api.get('/notas/fijadas');
  return response.data.data;
};

// Obtener notas archivadas
export const getNotasArchivadas = async (): Promise<Nota[]> => {
  const response = await api.get('/notas/archivadas');
  return response.data.data;
};

// Agregar etiqueta
export const agregarEtiqueta = async (id: string, etiqueta: string): Promise<Nota> => {
  const response = await api.post(`/notas/${id}/etiquetas`, { etiqueta });
  return response.data.data;
};

// Eliminar etiqueta
export const eliminarEtiqueta = async (id: string, etiqueta: string): Promise<Nota> => {
  const response = await api.delete(`/notas/${id}/etiquetas/${etiqueta}`);
  return response.data.data;
};
