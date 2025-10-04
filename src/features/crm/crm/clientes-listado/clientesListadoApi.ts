import { useState, useEffect, useMemo } from 'react';
import clienteService from '../../../../services/clienteService';

export interface Cliente {
  id: string;
  foto: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
  etiquetas: string[];
  fechaAlta: string; // ISO YYYY-MM-DD
  ultimaActividad: string; // ISO YYYY-MM-DD
}

export type SortBy = 'nombre' | 'estado' | 'fechaAlta' | 'ultimaActividad';
export type SortDir = 'asc' | 'desc';

export interface ClientesFilters {
  q?: string;
  estado?: 'activo' | 'inactivo' | '';
  etiquetas?: string[];
  fechaAltaDesde?: string; // ISO
  fechaAltaHasta?: string; // ISO
  sinActividadDias?: number;
  sortBy?: SortBy;
  sortDir?: SortDir;
  page?: number;
  pageSize?: number;
}

export interface ClientesResult {
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

export type NewClienteInput = {
  nombre: string;
  email: string;
  telefono: string;
  estado?: Cliente['estado'];
  etiquetas?: string[];
};

// Helper to format dates from backend (Date or ISO string) to YYYY-MM-DD
function formatDateToISO(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

// Hook to fetch clientes from backend
export const useClientes = (inputFilters: Partial<ClientesFilters> = {}) => {
  const [result, setResult] = useState<ClientesResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const defaults: Required<Pick<ClientesFilters, 'sortBy' | 'sortDir' | 'page' | 'pageSize'>> = {
    sortBy: 'ultimaActividad',
    sortDir: 'desc',
    page: 1,
    pageSize: 10,
  };

  const filters = useMemo(
    () => ({ ...defaults, ...inputFilters }),
    [
      inputFilters.q,
      inputFilters.estado,
      JSON.stringify(inputFilters.etiquetas),
      inputFilters.fechaAltaDesde,
      inputFilters.fechaAltaHasta,
      inputFilters.sinActividadDias,
      inputFilters.sortBy,
      inputFilters.sortDir,
      inputFilters.page,
      inputFilters.pageSize,
      refetchTrigger
    ]
  );

  useEffect(() => {
    const fetchClientes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await clienteService.getClientes({
          q: filters.q,
          estado: filters.estado as 'activo' | 'inactivo' | '',
          etiquetas: filters.etiquetas,
          fechaAltaDesde: filters.fechaAltaDesde,
          fechaAltaHasta: filters.fechaAltaHasta,
          sinActividadDias: filters.sinActividadDias,
          sortBy: filters.sortBy,
          sortDir: filters.sortDir,
          page: filters.page,
          pageSize: filters.pageSize
        });

        if (response.success) {
          // Normalize data for frontend compatibility
          const normalizedData: Cliente[] = response.data.map(cliente => ({
            id: cliente.id || '',
            foto: cliente.foto || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
            nombre: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono || '',
            estado: cliente.estado,
            etiquetas: cliente.etiquetas || [],
            fechaAlta: formatDateToISO(cliente.fechaAlta),
            ultimaActividad: formatDateToISO(cliente.ultimaActividad)
          }));

          setResult({
            data: normalizedData,
            total: response.total,
            page: response.page,
            pageSize: response.pageSize,
            pages: response.pages,
            stats: response.stats
          });
        }

        setIsLoading(false);
      } catch (e: any) {
        console.error('Error fetching clientes:', e);
        setError(e);
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, [filters]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return {
    data: result?.data || [],
    total: result?.total || 0,
    page: result?.page || 1,
    pageSize: result?.pageSize || 10,
    pages: result?.pages || 1,
    stats: result?.stats || { total: 0, activos: 0, inactivos: 0, premium: 0, online: 0 },
    isLoading,
    error,
    refetch
  };
};

// Create or get cliente
export async function createOrGetCliente(input: NewClienteInput): Promise<{ cliente: Cliente; existed: boolean }> {
  try {
    const response = await clienteService.createCliente({
      nombre: input.nombre,
      email: input.email,
      telefono: input.telefono,
      estado: input.estado || 'activo',
      etiquetas: input.etiquetas || []
    });

    if (response.success) {
      const cliente: Cliente = {
        id: response.data.id || '',
        foto: response.data.foto || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
        nombre: response.data.nombre,
        email: response.data.email,
        telefono: response.data.telefono || '',
        estado: response.data.estado,
        etiquetas: response.data.etiquetas || [],
        fechaAlta: formatDateToISO(response.data.fechaAlta),
        ultimaActividad: formatDateToISO(response.data.ultimaActividad)
      };

      return { cliente, existed: false };
    }

    throw new Error('Error creating cliente');
  } catch (error: any) {
    // If error is "already exists", try to find the cliente
    if (error.response?.data?.error?.includes('existe')) {
      // Get all clientes and find by email
      const response = await clienteService.getClientes({ q: input.email });
      if (response.success && response.data.length > 0) {
        const foundCliente = response.data[0];
        const cliente: Cliente = {
          id: foundCliente.id || '',
          foto: foundCliente.foto || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
          nombre: foundCliente.nombre,
          email: foundCliente.email,
          telefono: foundCliente.telefono || '',
          estado: foundCliente.estado,
          etiquetas: foundCliente.etiquetas || [],
          fechaAlta: formatDateToISO(foundCliente.fechaAlta),
          ultimaActividad: formatDateToISO(foundCliente.ultimaActividad)
        };

        return { cliente, existed: true };
      }
    }

    throw error;
  }
}

// Update cliente
export async function updateCliente(id: string, input: NewClienteInput): Promise<Cliente> {
  const response = await clienteService.updateCliente(id, {
    nombre: input.nombre,
    email: input.email,
    telefono: input.telefono,
    estado: input.estado,
    etiquetas: input.etiquetas
  });

  if (response.success) {
    return {
      id: response.data.id || '',
      foto: response.data.foto || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
      nombre: response.data.nombre,
      email: response.data.email,
      telefono: response.data.telefono || '',
      estado: response.data.estado,
      etiquetas: response.data.etiquetas || [],
      fechaAlta: formatDateToISO(response.data.fechaAlta),
      ultimaActividad: formatDateToISO(response.data.ultimaActividad)
    };
  }

  throw new Error('Error updating cliente');
}

// Find cliente by email or phone
export async function findClienteByEmailOrPhone(email?: string, telefono?: string): Promise<Cliente | undefined> {
  if (!email && !telefono) return undefined;

  try {
    const searchTerm = email || telefono || '';
    const response = await clienteService.getClientes({ q: searchTerm });

    if (response.success && response.data.length > 0) {
      const foundCliente = response.data.find(c =>
        (email && c.email.toLowerCase() === email.toLowerCase()) ||
        (telefono && c.telefono?.replace(/\s+/g, '') === telefono.replace(/\s+/g, ''))
      );

      if (foundCliente) {
        return {
          id: foundCliente.id || '',
          foto: foundCliente.foto || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
          nombre: foundCliente.nombre,
          email: foundCliente.email,
          telefono: foundCliente.telefono || '',
          estado: foundCliente.estado,
          etiquetas: foundCliente.etiquetas || [],
          fechaAlta: formatDateToISO(foundCliente.fechaAlta),
          ultimaActividad: formatDateToISO(foundCliente.ultimaActividad)
        };
      }
    }

    return undefined;
  } catch (error) {
    console.error('Error finding cliente:', error);
    return undefined;
  }
}
