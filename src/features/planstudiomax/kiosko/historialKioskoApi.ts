// Mock API para historial de kiosko

export interface AccesoKiosko {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: 'check-in' | 'check-out' | 'reserva' | 'pago';
  fecha: string;
  hora: string;
  servicio?: string;
  monto?: number;
  estado: 'exitoso' | 'fallido' | 'pendiente';
  incidencia?: boolean;
  notas?: string;
}

// Mock data
const mockAccesos: AccesoKiosko[] = [
  {
    id: '1',
    clienteId: 'C001',
    clienteNombre: 'María González',
    tipo: 'check-in',
    fecha: '2024-01-20',
    hora: '08:30',
    servicio: 'Gimnasio',
    estado: 'exitoso',
    incidencia: false,
  },
  {
    id: '2',
    clienteId: 'C002',
    clienteNombre: 'Pedro Ramírez',
    tipo: 'reserva',
    fecha: '2024-01-20',
    hora: '09:15',
    servicio: 'Clase Yoga',
    estado: 'exitoso',
    incidencia: false,
  },
  {
    id: '3',
    clienteId: 'C003',
    clienteNombre: 'Ana Martínez',
    tipo: 'pago',
    fecha: '2024-01-20',
    hora: '10:00',
    servicio: 'Mensualidad',
    monto: 49.99,
    estado: 'fallido',
    incidencia: true,
    notas: 'Error en procesamiento de tarjeta',
  },
  {
    id: '4',
    clienteId: 'C001',
    clienteNombre: 'María González',
    tipo: 'check-out',
    fecha: '2024-01-20',
    hora: '10:30',
    servicio: 'Gimnasio',
    estado: 'exitoso',
    incidencia: false,
  },
  {
    id: '5',
    clienteId: 'C004',
    clienteNombre: 'Juan López',
    tipo: 'check-in',
    fecha: '2024-01-20',
    hora: '11:00',
    servicio: 'Natación',
    estado: 'pendiente',
    incidencia: false,
  },
  {
    id: '6',
    clienteId: 'C005',
    clienteNombre: 'Laura Sánchez',
    tipo: 'reserva',
    fecha: '2024-01-20',
    hora: '11:30',
    servicio: 'Clase Spinning',
    estado: 'exitoso',
    incidencia: false,
  },
  {
    id: '7',
    clienteId: 'C006',
    clienteNombre: 'Carlos Ruiz',
    tipo: 'pago',
    fecha: '2024-01-20',
    hora: '12:00',
    servicio: 'Sesión Personal',
    monto: 35.00,
    estado: 'exitoso',
    incidencia: false,
  },
  {
    id: '8',
    clienteId: 'C007',
    clienteNombre: 'Sofía Díaz',
    tipo: 'check-in',
    fecha: '2024-01-20',
    hora: '13:00',
    servicio: 'Gimnasio',
    estado: 'fallido',
    incidencia: true,
    notas: 'Membresía vencida',
  },
];

export const fetchAccesosKiosko = async (filtros?: {
  fechaInicio?: string;
  fechaFin?: string;
  tipo?: string;
  estado?: string;
}): Promise<AccesoKiosko[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  let accesos = [...mockAccesos];

  // Apply filters
  if (filtros) {
    if (filtros.tipo) {
      accesos = accesos.filter(a => a.tipo === filtros.tipo);
    }
    if (filtros.estado) {
      accesos = accesos.filter(a => a.estado === filtros.estado);
    }
    if (filtros.fechaInicio) {
      accesos = accesos.filter(a => a.fecha >= filtros.fechaInicio!);
    }
    if (filtros.fechaFin) {
      accesos = accesos.filter(a => a.fecha <= filtros.fechaFin!);
    }
  }

  return accesos;
};

export const getEstadisticasKiosko = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const totalAccesos = mockAccesos.length;
  const exitosos = mockAccesos.filter(a => a.estado === 'exitoso').length;
  const fallidos = mockAccesos.filter(a => a.estado === 'fallido').length;
  const incidencias = mockAccesos.filter(a => a.incidencia).length;

  return {
    totalAccesos,
    exitosos,
    fallidos,
    incidencias,
    tasaExito: totalAccesos > 0 ? (exitosos / totalAccesos) * 100 : 0,
  };
};

export const resolverIncidencia = async (id: string, notas: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const acceso = mockAccesos.find(a => a.id === id);
  if (acceso) {
    acceso.incidencia = false;
    acceso.notas = `${acceso.notas || ''} - Resuelto: ${notas}`;
  }
};
