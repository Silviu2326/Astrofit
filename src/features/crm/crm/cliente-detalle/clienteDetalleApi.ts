import { useState, useEffect } from 'react';
import { PlaceholderImages } from '../../../../utils/placeholderImages';

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

// Datos mock para un cliente
const mockCliente: Cliente = {
  id: 'cliente-id-123',
  nombre: 'Ana',
  apellido: 'García',
  fotoUrl: PlaceholderImages.avatar(150),
  etiquetas: ['VIP', 'Nuevo', 'Entrenamiento Personal'],
  contacto: {
    email: 'ana.garcia@example.com',
    telefono: '+34 600 123 456',
    direccion: 'Calle Falsa 123, Madrid',
  },
  fechaAlta: '2023-01-15',
  estado: 'Activo',
  historial: [
    { id: 'h1', tipo: 'entrenamiento', descripcion: 'Sesión de fuerza', fecha: '2024-09-20 10:00' },
    { id: 'h2', tipo: 'reserva', descripcion: 'Clase de Yoga', fecha: '2024-09-18 18:30' },
    { id: 'h3', tipo: 'pago', descripcion: 'Mensualidad Septiembre', fecha: '2024-09-01 09:00', detalles: { monto: 50, metodo: 'Tarjeta' } },
    { id: 'h4', tipo: 'formulario', descripcion: 'Ficha de salud inicial', fecha: '2023-01-10 11:00' },
  ],
  archivos: [
    { id: 'a1', nombre: 'Contrato_Ana_Garcia.pdf', url: '/files/contrato.pdf', fechaSubida: '2023-01-15', tipo: 'PDF' },
    { id: 'a2', nombre: 'Consentimiento_RGPD.pdf', url: '/files/rgpd.pdf', fechaSubida: '2023-01-15', tipo: 'PDF' },
    { id: 'a3', nombre: 'Informe_Progreso_Julio.docx', url: '/files/informe.docx', fechaSubida: '2024-08-01', tipo: 'DOCX' },
  ],
  notas: [
    { id: 'n1', contenido: 'Cliente muy motivado con los objetivos de fuerza.', timestamp: '2024-09-20 11:30', autor: 'Entrenador A' },
    { id: 'n2', contenido: 'Preguntar sobre disponibilidad para sesiones de tarde.', timestamp: '2024-09-15 14:00', autor: 'Recepcionista' },
  ],
  tareas: [
    { id: 't1', descripcion: 'Enviar plan de entrenamiento personalizado', fechaVencimiento: '2024-09-28', estado: 'Pendiente', asignadoA: 'Entrenador A' },
    { id: 't2', descripcion: 'Llamar para confirmar próxima reserva', fechaVencimiento: '2024-09-25', estado: 'Completada', asignadoA: 'Recepcionista' },
  ],
};

// Hook para simular la obtención de datos del cliente
export const useClienteDetalle = (clienteId: string) => {
  const [data, setData] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simular una llamada a API
    setTimeout(() => {
      if (clienteId === 'cliente-id-123') {
        setData(mockCliente);
      } else {
        setError(new Error('Cliente no encontrado'));
      }
      setIsLoading(false);
    }, 500); // Simular retardo de red
  }, [clienteId]);

  return { data, isLoading, error };
};

// Mock API para actualizar etiquetas (ejemplo)
export const updateClienteEtiquetas = async (clienteId: string, newEtiquetas: string[]): Promise<Cliente> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedCliente = { ...mockCliente, etiquetas: newEtiquetas };
      // En un caso real, aquí se haría una llamada PUT/PATCH a la API
      resolve(updatedCliente);
    }, 300);
  });
};