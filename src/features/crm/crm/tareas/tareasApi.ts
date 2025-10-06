import { useState, useEffect, useMemo } from 'react';
import tareaService from '../../../../services/tareaService';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
  fechaCompletada?: string;
  estado: 'pendiente' | 'en progreso' | 'completada' | 'vencida';
  prioridad: 'alta' | 'media' | 'baja';
  asignadoA: string;
  clienteRelacionado?: string;
  clienteId?: string;
  notasAdicionales?: string;
  etiquetas?: string[];
}

export interface TareasFilters {
  estado?: Tarea['estado'] | '';
  prioridad?: Tarea['prioridad'] | '';
  clienteId?: string;
  asignadoA?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface TareasResult {
  data: Tarea[];
  total: number;
  page: number;
  pages: number;
  count: number;
  stats: {
    total: number;
    pendientes: number;
    enProgreso: number;
    completadas: number;
    vencidas: number;
    urgentes: number;
  };
}

export type NewTareaInput = {
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
  prioridad?: Tarea['prioridad'];
  asignadoA: string;
  clienteId?: string;
  clienteRelacionado?: string;
  notasAdicionales?: string;
  etiquetas?: string[];
};

// Helper to format dates
function formatDateToISO(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

// Hook to fetch tareas from backend
export const useTareas = (inputFilters: Partial<TareasFilters> = {}) => {
  const [result, setResult] = useState<TareasResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const defaults: Required<Pick<TareasFilters, 'page' | 'limit' | 'sort'>> = {
    page: 1,
    limit: 50,
    sort: '-fechaVencimiento',
  };

  const filters = useMemo(
    () => ({ ...defaults, ...inputFilters }),
    [
      inputFilters.estado,
      inputFilters.prioridad,
      inputFilters.clienteId,
      inputFilters.asignadoA,
      inputFilters.fechaDesde,
      inputFilters.fechaHasta,
      inputFilters.search,
      inputFilters.page,
      inputFilters.limit,
      inputFilters.sort,
      refetchTrigger
    ]
  );

  useEffect(() => {
    const fetchTareas = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await tareaService.getTareas({
          estado: filters.estado as Tarea['estado'],
          prioridad: filters.prioridad as Tarea['prioridad'],
          clienteId: filters.clienteId,
          asignadoA: filters.asignadoA,
          fechaDesde: filters.fechaDesde,
          fechaHasta: filters.fechaHasta,
          search: filters.search,
          page: filters.page,
          limit: filters.limit,
          sort: filters.sort
        });

        if (response.success) {
          const normalizedData: Tarea[] = response.data.map(tarea => ({
            id: tarea._id || tarea.id || '',
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fechaVencimiento: formatDateToISO(tarea.fechaVencimiento),
            fechaCompletada: tarea.fechaCompletada ? formatDateToISO(tarea.fechaCompletada) : undefined,
            estado: tarea.estado,
            prioridad: tarea.prioridad,
            asignadoA: tarea.asignadoA,
            clienteRelacionado: tarea.clienteRelacionado || tarea.clienteId?.nombre,
            clienteId: tarea.clienteId?._id || tarea.clienteId?.id || tarea.clienteId,
            notasAdicionales: tarea.notasAdicionales,
            etiquetas: tarea.etiquetas || []
          }));

          // Get stats
          const statsResponse = await tareaService.getStats();
          const stats = statsResponse.success ? statsResponse.data : {
            total: 0,
            pendientes: 0,
            enProgreso: 0,
            completadas: 0,
            vencidas: 0,
            urgentes: 0
          };

          setResult({
            data: normalizedData,
            total: response.total,
            page: response.page,
            pages: response.pages,
            count: response.count,
            stats
          });
        }

        setIsLoading(false);
      } catch (e: any) {
        console.error('Error fetching tareas:', e);
        setError(e);
        setIsLoading(false);
      }
    };

    fetchTareas();
  }, [filters]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return {
    data: result?.data || [],
    total: result?.total || 0,
    page: result?.page || 1,
    pages: result?.pages || 1,
    count: result?.count || 0,
    stats: result?.stats || { total: 0, pendientes: 0, enProgreso: 0, completadas: 0, vencidas: 0, urgentes: 0 },
    isLoading,
    error,
    refetch
  };
};

// Get single tarea
export async function getTarea(id: string): Promise<Tarea> {
  const response = await tareaService.getTarea(id);

  if (response.success) {
    const tarea = response.data;
    return {
      id: tarea._id || tarea.id || '',
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaVencimiento: formatDateToISO(tarea.fechaVencimiento),
      fechaCompletada: tarea.fechaCompletada ? formatDateToISO(tarea.fechaCompletada) : undefined,
      estado: tarea.estado,
      prioridad: tarea.prioridad,
      asignadoA: tarea.asignadoA,
      clienteRelacionado: tarea.clienteRelacionado || tarea.clienteId?.nombre,
      clienteId: tarea.clienteId?._id || tarea.clienteId?.id,
      notasAdicionales: tarea.notasAdicionales,
      etiquetas: tarea.etiquetas || []
    };
  }

  throw new Error('Error al obtener la tarea');
}

// Create tarea
export async function createTarea(input: NewTareaInput): Promise<Tarea> {
  const response = await tareaService.createTarea({
    titulo: input.titulo,
    descripcion: input.descripcion,
    fechaVencimiento: input.fechaVencimiento,
    prioridad: input.prioridad || 'media',
    asignadoA: input.asignadoA,
    clienteId: input.clienteId,
    clienteRelacionado: input.clienteRelacionado,
    notasAdicionales: input.notasAdicionales,
    etiquetas: input.etiquetas || []
  });

  if (response.success) {
    const tarea = response.data;
    return {
      id: tarea._id || tarea.id || '',
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaVencimiento: formatDateToISO(tarea.fechaVencimiento),
      fechaCompletada: tarea.fechaCompletada ? formatDateToISO(tarea.fechaCompletada) : undefined,
      estado: tarea.estado,
      prioridad: tarea.prioridad,
      asignadoA: tarea.asignadoA,
      clienteRelacionado: tarea.clienteRelacionado || tarea.clienteId?.nombre,
      clienteId: tarea.clienteId?._id || tarea.clienteId?.id,
      notasAdicionales: tarea.notasAdicionales,
      etiquetas: tarea.etiquetas || []
    };
  }

  throw new Error('Error al crear la tarea');
}

// Update tarea
export async function updateTarea(id: string, input: Partial<NewTareaInput>): Promise<Tarea> {
  const response = await tareaService.updateTarea(id, input);

  if (response.success) {
    const tarea = response.data;
    return {
      id: tarea._id || tarea.id || '',
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaVencimiento: formatDateToISO(tarea.fechaVencimiento),
      fechaCompletada: tarea.fechaCompletada ? formatDateToISO(tarea.fechaCompletada) : undefined,
      estado: tarea.estado,
      prioridad: tarea.prioridad,
      asignadoA: tarea.asignadoA,
      clienteRelacionado: tarea.clienteRelacionado || tarea.clienteId?.nombre,
      clienteId: tarea.clienteId?._id || tarea.clienteId?.id,
      notasAdicionales: tarea.notasAdicionales,
      etiquetas: tarea.etiquetas || []
    };
  }

  throw new Error('Error al actualizar la tarea');
}

// Delete tarea
export async function deleteTarea(id: string): Promise<void> {
  const response = await tareaService.deleteTarea(id);

  if (!response.success) {
    throw new Error('Error al eliminar la tarea');
  }
}

// Complete tarea
export async function completarTarea(id: string): Promise<Tarea> {
  const response = await tareaService.completarTarea(id);

  if (response.success) {
    const tarea = response.data;
    return {
      id: tarea._id || tarea.id || '',
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaVencimiento: formatDateToISO(tarea.fechaVencimiento),
      fechaCompletada: tarea.fechaCompletada ? formatDateToISO(tarea.fechaCompletada) : undefined,
      estado: tarea.estado,
      prioridad: tarea.prioridad,
      asignadoA: tarea.asignadoA,
      clienteRelacionado: tarea.clienteRelacionado || tarea.clienteId?.nombre,
      clienteId: tarea.clienteId?._id || tarea.clienteId?.id,
      notasAdicionales: tarea.notasAdicionales,
      etiquetas: tarea.etiquetas || []
    };
  }

  throw new Error('Error al completar la tarea');
}

// Get stats
export async function getStats(): Promise<TareasResult['stats']> {
  const response = await tareaService.getStats();

  if (response.success) {
    return {
      total: response.data.total,
      pendientes: response.data.pendientes,
      enProgreso: response.data.enProgreso,
      completadas: response.data.completadas,
      vencidas: response.data.vencidas,
      urgentes: response.data.urgentes
    };
  }

  return {
    total: 0,
    pendientes: 0,
    enProgreso: 0,
    completadas: 0,
    vencidas: 0,
    urgentes: 0
  };
}