import { useState, useEffect } from 'react';
import clienteService from '../../../../services/clienteService';

// Definiciones de tipos para el cliente
export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  fotoUrl: string;
  etiquetas: string[];
  contacto: {
    email: string;
    telefono: string;
    direccion: string;
  };
  fechaAlta: string;
  estado: 'Activo' | 'Inactivo' | 'Pendiente';
  historial: HistorialItem[];
  archivos: Archivo[];
  notas: Nota[];
  tareas: Tarea[];
}

export interface HistorialItem {
  id: string;
  tipo: 'entrenamiento' | 'reserva' | 'pago' | 'formulario';
  descripcion: string;
  fecha: string;
  detalles?: any;
}

export interface Archivo {
  id: string;
  nombre: string;
  url: string;
  fechaSubida: string;
  tipo: string;
}

export interface Nota {
  id: string;
  contenido: string;
  timestamp: string;
  autor: string;
}

export interface Tarea {
  id: string;
  descripcion: string;
  fechaVencimiento: string;
  estado: 'Pendiente' | 'Completada' | 'En Progreso';
  asignadoA: string;
}

// Hook para obtener datos del cliente desde el backend
export const useClienteDetalle = (clienteId: string | undefined) => {
  const [data, setData] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!clienteId) {
      setIsLoading(false);
      setError(new Error('No se proporcionó ID de cliente'));
      return;
    }

    const fetchCliente = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await clienteService.getCliente(clienteId);

        if (!response.success || !response.data) {
          throw new Error('No se encontró el cliente');
        }

        const cliente = response.data;

        // Transformar los datos del backend al formato que espera el frontend
        const transformedCliente: Cliente = {
          id: cliente.id || cliente._id || '',
          nombre: cliente.nombre?.split(' ')[0] || cliente.nombre || '',
          apellido: cliente.nombre?.split(' ').slice(1).join(' ') || '',
          fotoUrl: cliente.foto || 'https://via.placeholder.com/150',
          etiquetas: cliente.etiquetas || [],
          contacto: {
            email: cliente.email || '',
            telefono: cliente.telefono || '',
            direccion: '', // El modelo actual no tiene dirección
          },
          fechaAlta: cliente.fechaAlta || '',
          estado: cliente.estado === 'activo' ? 'Activo' : 'Inactivo',
          // Por ahora, datos mock para historial, archivos, notas y tareas
          // TODO: Implementar endpoints para estos datos
          historial: [
            {
              id: 'h1',
              tipo: 'entrenamiento',
              descripcion: 'Sin historial disponible',
              fecha: new Date().toISOString()
            },
          ],
          archivos: [],
          notas: [],
          tareas: [],
        };

        setData(transformedCliente);
      } catch (err: any) {
        console.error('Error al cargar cliente:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCliente();
  }, [clienteId]);

  return { data, isLoading, error };
};

// Mock API para actualizar etiquetas (ejemplo)
export const updateClienteEtiquetas = async (clienteId: string, newEtiquetas: string[]): Promise<Cliente> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: Implementar llamada real al backend
      const updatedCliente: Cliente = {
        id: clienteId,
        nombre: '',
        apellido: '',
        fotoUrl: '',
        etiquetas: newEtiquetas,
        contacto: { email: '', telefono: '', direccion: '' },
        fechaAlta: '',
        estado: 'Activo',
        historial: [],
        archivos: [],
        notas: [],
        tareas: [],
      };
      resolve(updatedCliente);
    }, 300);
  });
};
