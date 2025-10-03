export interface Miembro {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  avatar: string;
  tipoPase: 'Mensual' | 'Trimestral' | 'Anual' | 'Por Clase';
  creditosRestantes: number;
  tasaAsistencia: number;
  noShows: number;
}

export interface Clase {
  id: string;
  nombre: string;
  tipo: 'Yoga' | 'Pilates' | 'Spinning' | 'HIIT' | 'Funcional' | 'Boxeo';
  fechaHora: Date;
  duracion: number;
  coach: string;
  coachAvatar: string;
  sala: string;
  capacidadMaxima: number;
  reservasActuales: number;
}

export interface EventoTimeline {
  tipo: 'creada' | 'recordatorio' | 'cambio_estado' | 'asistencia' | 'cancelada';
  descripcion: string;
  fechaHora: Date;
  icono?: string;
}

export type EstadoReserva = 'confirmada' | 'espera' | 'cancelada' | 'completada' | 'no-show';
export type MetodoReserva = 'app' | 'web' | 'presencial';

export interface Reserva {
  id: string;
  numeroReserva: string;
  miembro: Miembro;
  clase: Clase;
  estado: EstadoReserva;
  fechaReserva: Date;
  metodoReserva: MetodoReserva;
  timeline: EventoTimeline[];
  posicionEspera?: number;
}

// Datos mockeados ampliados
export const getMiembrosMock = (): Miembro[] => {
  return [
    { id: 'm1', nombre: 'Ana García', email: 'ana@email.com', telefono: '+34 600 111 222', avatar: 'AG', tipoPase: 'Mensual', creditosRestantes: 8, tasaAsistencia: 92, noShows: 0 },
    { id: 'm2', nombre: 'Luis Pérez', email: 'luis@email.com', telefono: '+34 600 222 333', avatar: 'LP', tipoPase: 'Anual', creditosRestantes: 25, tasaAsistencia: 88, noShows: 1 },
    { id: 'm3', nombre: 'Marta Ruíz', email: 'marta@email.com', telefono: '+34 600 333 444', avatar: 'MR', tipoPase: 'Trimestral', creditosRestantes: 12, tasaAsistencia: 95, noShows: 0 },
    { id: 'm4', nombre: 'Pedro López', email: 'pedro@email.com', telefono: '+34 600 444 555', avatar: 'PL', tipoPase: 'Por Clase', creditosRestantes: 3, tasaAsistencia: 75, noShows: 2 },
    { id: 'm5', nombre: 'Sofía Martín', email: 'sofia@email.com', telefono: '+34 600 555 666', avatar: 'SM', tipoPase: 'Mensual', creditosRestantes: 6, tasaAsistencia: 90, noShows: 0 },
    { id: 'm6', nombre: 'Javier Gómez', email: 'javier@email.com', telefono: '+34 600 666 777', avatar: 'JG', tipoPase: 'Anual', creditosRestantes: 30, tasaAsistencia: 85, noShows: 1 },
    { id: 'm7', nombre: 'Elena Díaz', email: 'elena@email.com', telefono: '+34 600 777 888', avatar: 'ED', tipoPase: 'Mensual', creditosRestantes: 7, tasaAsistencia: 93, noShows: 0 },
    { id: 'm8', nombre: 'Carlos Sánchez', email: 'carlos@email.com', telefono: '+34 600 888 999', avatar: 'CS', tipoPase: 'Trimestral', creditosRestantes: 15, tasaAsistencia: 82, noShows: 3 },
  ];
};

export const getClasesMock = (): Clase[] => {
  const hoy = new Date();
  return [
    { id: 'c1', nombre: 'Yoga Matinal', tipo: 'Yoga', fechaHora: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 7, 0), duracion: 60, coach: 'María López', coachAvatar: 'ML', sala: 'Sala A', capacidadMaxima: 20, reservasActuales: 18 },
    { id: 'c2', nombre: 'Pilates Avanzado', tipo: 'Pilates', fechaHora: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 9, 30), duracion: 75, coach: 'Juan Torres', coachAvatar: 'JT', sala: 'Sala B', capacidadMaxima: 15, reservasActuales: 14 },
    { id: 'c3', nombre: 'Spinning Power', tipo: 'Spinning', fechaHora: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 18, 0), duracion: 45, coach: 'Laura Ruiz', coachAvatar: 'LR', sala: 'Sala Ciclo', capacidadMaxima: 25, reservasActuales: 22 },
    { id: 'c4', nombre: 'HIIT Explosivo', tipo: 'HIIT', fechaHora: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 19, 30), duracion: 45, coach: 'Pedro Martínez', coachAvatar: 'PM', sala: 'Sala C', capacidadMaxima: 18, reservasActuales: 16 },
    { id: 'c5', nombre: 'Funcional Total', tipo: 'Funcional', fechaHora: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1, 10, 0), duracion: 60, coach: 'Ana Fernández', coachAvatar: 'AF', sala: 'Sala A', capacidadMaxima: 20, reservasActuales: 12 },
    { id: 'c6', nombre: 'Boxeo Fitness', tipo: 'Boxeo', fechaHora: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1, 20, 0), duracion: 60, coach: 'Miguel Ruiz', coachAvatar: 'MR', sala: 'Sala Box', capacidadMaxima: 16, reservasActuales: 15 },
  ];
};

export const getReservas = (): Reserva[] => {
  const miembros = getMiembrosMock();
  const clases = getClasesMock();
  const hoy = new Date();

  // Generar 150 reservas variadas
  const reservas: Reserva[] = [];
  const estados: EstadoReserva[] = ['confirmada', 'espera', 'cancelada', 'completada', 'no-show'];
  const metodos: MetodoReserva[] = ['app', 'web', 'presencial'];

  for (let i = 0; i < 150; i++) {
    const miembro = miembros[Math.floor(Math.random() * miembros.length)];
    const clase = clases[Math.floor(Math.random() * clases.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const metodo = metodos[Math.floor(Math.random() * metodos.length)];

    // Fecha de reserva aleatoria en los últimos 30 días
    const diasAtras = Math.floor(Math.random() * 30);
    const fechaReserva = new Date(hoy.getTime() - diasAtras * 24 * 60 * 60 * 1000);

    // Timeline de eventos
    const timeline: EventoTimeline[] = [
      {
        tipo: 'creada',
        descripcion: 'Reserva creada',
        fechaHora: fechaReserva,
      },
    ];

    if (estado === 'confirmada' || estado === 'completada') {
      timeline.push({
        tipo: 'recordatorio',
        descripcion: 'Recordatorio enviado',
        fechaHora: new Date(fechaReserva.getTime() + 2 * 60 * 60 * 1000),
      });
    }

    if (estado === 'cancelada') {
      timeline.push({
        tipo: 'cancelada',
        descripcion: 'Reserva cancelada por el miembro',
        fechaHora: new Date(fechaReserva.getTime() + 24 * 60 * 60 * 1000),
      });
    }

    if (estado === 'completada') {
      timeline.push({
        tipo: 'asistencia',
        descripcion: 'Asistencia confirmada',
        fechaHora: clase.fechaHora,
      });
    }

    if (estado === 'no-show') {
      timeline.push({
        tipo: 'asistencia',
        descripcion: 'Marcado como no-show',
        fechaHora: clase.fechaHora,
      });
    }

    reservas.push({
      id: `r${i + 1}`,
      numeroReserva: `#${String(12345 + i).padStart(6, '0')}`,
      miembro,
      clase,
      estado,
      fechaReserva,
      metodoReserva: metodo,
      timeline,
      posicionEspera: estado === 'espera' ? Math.floor(Math.random() * 5) + 1 : undefined,
    });
  }

  return reservas;
};

// Estadísticas calculadas
export const getEstadisticasReservas = () => {
  const reservas = getReservas();
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const reservasHoy = reservas.filter(r => {
    const fecha = r.clase.fechaHora;
    return fecha >= hoy && fecha < manana;
  });

  const reservasPendientes = reservas.filter(r => r.estado === 'espera').length;
  const cancelacionesHoy = reservas.filter(r => {
    const fecha = r.fechaReserva;
    return fecha >= hoy && fecha < manana && r.estado === 'cancelada';
  }).length;

  const noShows = reservas.filter(r => r.estado === 'no-show').length;
  const completadas = reservas.filter(r => r.estado === 'completada').length;
  const tasaNoShow = completadas > 0 ? ((noShows / (noShows + completadas)) * 100).toFixed(1) : '0.0';

  return {
    reservasHoy: reservasHoy.length,
    reservasPendientes,
    cancelacionesHoy,
    tasaNoShow: `${tasaNoShow}%`,
  };
};
