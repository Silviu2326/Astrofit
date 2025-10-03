// src/features/historial-asistencias/historialAsistenciasApi.ts

export type CheckInMethod = 'qr_scan' | 'manual' | 'reserva' | 'walk_in' | 'app_movil';
export type AttendanceStatus = 'asistio' | 'late_cancel' | 'no_show';
export type ClassType = 'CrossFit' | 'Yoga' | 'HIIT' | 'Open Gym' | 'Pilates' | 'Spinning' | 'Zumba' | 'Funcional';
export type MembershipType = 'unlimited' | 'pack' | 'drop_in';

export interface Member {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  numeroMembresia: string;
  avatar: string;
  tipoMembresia: MembershipType;
  estadoMembresia: 'activo' | 'pausado' | 'vencido';
  fechaInicio: string;
  totalCheckins: number;
  rachaActual: number;
  mejorRacha: number;
  ultimaAsistencia: string;
}

export interface AttendanceEntry {
  id: string;
  miembro: Member;
  fechaHora: string; // ISO date string
  clase: string;
  tipoClase: ClassType;
  coach: string;
  metodoCheckin: CheckInMethod;
  estado: AttendanceStatus;
  creditosUsados?: number;
  duracionEstancia?: number; // minutos
  notas?: string;
  editadoPor?: string;
  fechaEdicion?: string;
}

// Helper function to generate random date in last 60 days
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper to generate member data
const generateMember = (id: number): Member => {
  const nombres = ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Sofía', 'Diego', 'Elena', 'Francisco',
    'Carmen', 'José', 'Isabel', 'Miguel', 'Rosa', 'Antonio', 'Lucía', 'Manuel', 'Patricia', 'David',
    'Marta', 'Javier', 'Sandra', 'Raúl', 'Cristina', 'Fernando', 'Beatriz', 'Alberto', 'Natalia', 'Sergio',
    'Andrea', 'Pablo', 'Silvia', 'Óscar', 'Victoria', 'Rubén', 'Mónica', 'Adrián', 'Pilar', 'Iván',
    'Julia', 'Alejandro', 'Rocío', 'Marcos', 'Teresa', 'Daniel', 'Ángela', 'Jorge', 'Eva', 'Álvaro',
    'Clara', 'Andrés', 'Alicia', 'Guillermo', 'Lorena', 'Luis', 'Nuria', 'Roberto', 'Sonia', 'Tomás',
    'Marina', 'Ricardo', 'Paula', 'Héctor', 'Olga', 'Enrique', 'Susana', 'Ignacio', 'Irene', 'Gabriel',
    'Verónica', 'Ramón', 'Esther', 'Felipe', 'Raquel', 'Vicente', 'Montserrat', 'Jaime', 'Dolores', 'César',
    'Inmaculada', 'Ángel', 'Amparo', 'Emilio', 'Josefa', 'Salvador', 'Francisca', 'Agustín', 'Concepción', 'Rafael'];

  const apellidos = ['Pérez', 'García', 'López', 'Martínez', 'Sánchez', 'Rodríguez', 'Fernández', 'Gómez', 'Díaz', 'Ruiz',
    'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez',
    'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Molina', 'Morales', 'Suárez', 'Ortega', 'Delgado',
    'Castro', 'Ortiz', 'Rubio', 'Marín', 'Sanz', 'Iglesias', 'Nuñez', 'Medina', 'Garrido', 'Santos',
    'Castillo', 'Cortés', 'Lozano', 'Guerrero', 'Cano', 'Prieto', 'Méndez', 'Cruz', 'Gallego', 'Vidal'];

  const nombre = `${nombres[Math.floor(Math.random() * nombres.length)]} ${apellidos[Math.floor(Math.random() * apellidos.length)]}`;
  const tiposMembresia: MembershipType[] = ['unlimited', 'pack', 'drop_in'];
  const estadosMembresia = ['activo', 'activo', 'activo', 'activo', 'pausado', 'vencido'] as const; // More active members

  const rachaActual = Math.floor(Math.random() * 30);
  const mejorRacha = rachaActual + Math.floor(Math.random() * 20);

  return {
    id: `member-${id}`,
    nombre,
    email: `${nombre.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    telefono: `+34 ${Math.floor(600000000 + Math.random() * 99999999)}`,
    numeroMembresia: `MEM-${String(id).padStart(4, '0')}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nombre}`,
    tipoMembresia: tiposMembresia[Math.floor(Math.random() * tiposMembresia.length)],
    estadoMembresia: estadosMembresia[Math.floor(Math.random() * estadosMembresia.length)],
    fechaInicio: randomDate(new Date(2023, 0, 1), new Date(2025, 5, 1)).toISOString(),
    totalCheckins: Math.floor(Math.random() * 200) + 10,
    rachaActual,
    mejorRacha,
    ultimaAsistencia: randomDate(new Date(2025, 8, 1), new Date()).toISOString(),
  };
};

// Generate 100 unique members
const members: Member[] = Array.from({ length: 100 }, (_, i) => generateMember(i + 1));

// Generate 400 attendance entries
const generateMockAttendanceEntries = (): AttendanceEntry[] => {
  const entries: AttendanceEntry[] = [];
  const clases: { nombre: string; tipo: ClassType }[] = [
    { nombre: 'CrossFit WOD', tipo: 'CrossFit' },
    { nombre: 'Yoga Flow', tipo: 'Yoga' },
    { nombre: 'Yoga Restaurativo', tipo: 'Yoga' },
    { nombre: 'HIIT Cardio', tipo: 'HIIT' },
    { nombre: 'HIIT Funcional', tipo: 'HIIT' },
    { nombre: 'Open Gym', tipo: 'Open Gym' },
    { nombre: 'Pilates Mat', tipo: 'Pilates' },
    { nombre: 'Pilates Reformer', tipo: 'Pilates' },
    { nombre: 'Spinning Indoor', tipo: 'Spinning' },
    { nombre: 'Zumba Fitness', tipo: 'Zumba' },
    { nombre: 'Funcional', tipo: 'Funcional' },
  ];

  const coaches = ['Ana López', 'Carlos Ruiz', 'María Sánchez', 'Pedro García', 'Laura Martínez', 'Diego Torres', 'Sofia Fernández'];

  const metodos: CheckInMethod[] = ['qr_scan', 'manual', 'reserva', 'walk_in', 'app_movil'];
  const estados: AttendanceStatus[] = ['asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio',
    'asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio', 'asistio',
    'late_cancel', 'no_show']; // 90% asistió, 5% late cancel, 5% no-show

  const notas = [
    undefined, undefined, undefined, undefined, undefined, // 75% sin notas
    'Primera clase del miembro',
    'Llegó 10 minutos tarde',
    'Trajo un invitado',
    'Solicitó modificación de ejercicios',
    'Excelente progreso',
    'Necesita más seguimiento',
    'Recuperándose de lesión'
  ];

  // Generate entries for last 60 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 60);

  for (let i = 0; i < 400; i++) {
    const clase = clases[Math.floor(Math.random() * clases.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const metodo = metodos[Math.floor(Math.random() * metodos.length)];
    const member = members[Math.floor(Math.random() * members.length)];

    // Generate realistic time slots (6am to 9pm, every hour)
    const date = randomDate(startDate, endDate);
    const hour = 6 + Math.floor(Math.random() * 16); // 6am to 9pm
    date.setHours(hour, [0, 15, 30, 45][Math.floor(Math.random() * 4)], 0, 0);

    entries.push({
      id: `entry-${i + 1}`,
      miembro: member,
      fechaHora: date.toISOString(),
      clase: clase.nombre,
      tipoClase: clase.tipo,
      coach: coaches[Math.floor(Math.random() * coaches.length)],
      metodoCheckin: metodo,
      estado,
      creditosUsados: member.tipoMembresia === 'pack' ? 1 : undefined,
      duracionEstancia: estado === 'asistio' ? Math.floor(45 + Math.random() * 30) : undefined, // 45-75 min
      notas: notas[Math.floor(Math.random() * notas.length)],
    });
  }

  return entries.sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
};

const mockAttendanceEntries: AttendanceEntry[] = generateMockAttendanceEntries();

export const getAttendanceEntries = (): AttendanceEntry[] => {
  return mockAttendanceEntries;
};

export const getMembers = (): Member[] => {
  return members;
};

export const getMemberById = (id: string): Member | undefined => {
  return members.find(m => m.id === id);
};

export const getMemberAttendance = (memberId: string): AttendanceEntry[] => {
  return mockAttendanceEntries.filter(entry => entry.miembro.id === memberId);
};
