export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
  estado: 'pendiente' | 'en progreso' | 'completada' | 'vencida';
  prioridad: 'alta' | 'media' | 'baja';
  asignadoA: string;
  clienteRelacionado?: string;
  notasAdicionales?: string;
}

const mockTareas: Tarea[] = [
  {
    id: '1',
    titulo: 'Llamar a Ana para feedback de la última rutina',
    descripcion: 'Preguntar sobre su progreso y ajustar el plan si es necesario.',
    fechaVencimiento: '2025-10-01',
    estado: 'pendiente',
    prioridad: 'alta',
    asignadoA: 'Juan Pérez',
    clienteRelacionado: 'Ana García',
  },
  {
    id: '2',
    titulo: 'Enviar recordatorio de pago a Marcos',
    descripcion: 'Factura #20250915 pendiente desde el 15 de septiembre.',
    fechaVencimiento: '2025-09-28',
    estado: 'vencida',
    prioridad: 'alta',
    asignadoA: 'María López',
    clienteRelacionado: 'Marcos Ruiz',
  },
  {
    id: '3',
    titulo: 'Agendar sesión de evaluación con Laura',
    descripcion: 'Contactar a Laura para coordinar fecha y hora para la sesión inicial.',
    fechaVencimiento: '2025-10-05',
    estado: 'en progreso',
    prioridad: 'media',
    asignadoA: 'Juan Pérez',
    clienteRelacionado: 'Laura Fernández',
  },
  {
    id: '4',
    titulo: 'Preparar propuesta para nuevo cliente',
    descripcion: 'Investigar necesidades y elaborar una propuesta personalizada.',
    fechaVencimiento: '2025-10-10',
    estado: 'pendiente',
    prioridad: 'alta',
    asignadoA: 'María López',
  },
  {
    id: '5',
    titulo: 'Revisar informe mensual de ventas',
    descripcion: 'Analizar datos y preparar resumen para la reunión de equipo.',
    fechaVencimiento: '2025-09-25',
    estado: 'completada',
    prioridad: 'baja',
    asignadoA: 'Carlos Gómez',
  },
];

export const getTareas = (): Promise<Tarea[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTareas);
    }, 500);
  });
};

export const addTarea = (newTarea: Omit<Tarea, 'id' | 'estado'>): Promise<Tarea> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tarea: Tarea = {
        id: String(mockTareas.length + 1),
        estado: 'pendiente',
        ...newTarea,
      };
      mockTareas.push(tarea);
      resolve(tarea);
    }, 500);
  });
};

export const updateTarea = (updatedTarea: Tarea): Promise<Tarea> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTareas.findIndex((t) => t.id === updatedTarea.id);
      if (index !== -1) {
        mockTareas[index] = updatedTarea;
        resolve(updatedTarea);
      } else {
        reject(new Error('Tarea no encontrada'));
      }
    }, 500);
  });
};