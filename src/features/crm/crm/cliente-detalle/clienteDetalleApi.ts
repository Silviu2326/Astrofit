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
  premium?: boolean;
  ciudad?: string;
  fechaRegistro: string;
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
            direccion: cliente.direccion || '',
          },
          fechaAlta: cliente.fechaAlta || '',
          estado: cliente.estado === 'activo' ? 'Activo' : 'Inactivo',
          premium: cliente.premium || false,
          ciudad: cliente.ciudad || '',
          fechaRegistro: cliente.fechaAlta || new Date().toISOString(),
          // Por ahora, datos mock para historial, archivos, notas y tareas
          // TODO: Implementar endpoints para estos datos
          historial: [
            {
              id: 'h1',
              tipo: 'entrenamiento',
              descripcion: 'Primera sesión de entrenamiento',
              fecha: new Date().toISOString()
            },
            {
              id: 'h2',
              tipo: 'pago',
              descripcion: 'Pago del plan mensual',
              fecha: new Date(Date.now() - 86400000).toISOString()
            },
          ],
          archivos: [
            {
              id: 'a1',
              nombre: 'Evaluación inicial.pdf',
              url: '#',
              fechaSubida: new Date().toISOString(),
              tipo: 'PDF'
            }
          ],
          notas: [
            {
              id: 'n1',
              contenido: 'Cliente muy motivado, excelente progreso en la primera semana',
              timestamp: new Date().toISOString(),
              autor: 'Entrenador Principal'
            }
          ],
          tareas: [
            {
              id: 't1',
              descripcion: 'Programar evaluación de progreso',
              fechaVencimiento: new Date(Date.now() + 7 * 86400000).toISOString(),
              estado: 'Pendiente',
              asignadoA: 'Entrenador Principal'
            }
          ],
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
