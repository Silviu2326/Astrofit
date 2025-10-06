export interface Clase {
  id: string;
  nombre: string;
  time: string; // Changed from 'hora' to 'time' for consistency with new components
  coach: string; // Changed from 'instructor' to 'coach'
  capacidad: number;
  categoria: 'fuerza' | 'cardio' | 'yoga' | 'funcional';
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'; // Changed from 'dia' to 'day'
  intensity: 'baja' | 'media' | 'alta'; // New field for advanced filters
}

export interface RecurrentClass {
  id: string;
  name: string;
  dayOfWeek: number; // 0-6 for Sunday-Saturday
  startTime: string;
  endTime: string;
  coach: string;
}

export interface WaitlistItem {
  classId: string;
  className: string;
  userId: string;
  userName: string;
  position: number;
}

export interface Metrics {
  averageOccupancy: number;
  currentOccupancy: { classId: string; occupancy: number }[];
  trends: { period: string; value: number }[];
}

let mockClases: Clase[] = [
  { id: '1', nombre: 'CrossFit Básico', time: '09:00', coach: 'Juan Pérez', capacidad: 15, categoria: 'fuerza', day: 'Lunes', intensity: 'alta' },
  { id: '2', nombre: 'Zumba Party', time: '10:00', coach: 'María García', capacidad: 20, categoria: 'cardio', day: 'Lunes', intensity: 'media' },
  { id: '3', nombre: 'Hatha Yoga', time: '11:00', coach: 'Ana López', capacidad: 10, categoria: 'yoga', day: 'Martes', intensity: 'baja' },
  { id: '4', nombre: 'Entrenamiento Funcional', time: '12:00', coach: 'Pedro Ruiz', capacidad: 12, categoria: 'funcional', day: 'Martes', intensity: 'media' },
  { id: '5', nombre: 'Levantamiento Olímpico', time: '13:00', coach: 'Juan Pérez', capacidad: 8, categoria: 'fuerza', day: 'Miércoles', intensity: 'alta' },
  { id: '6', nombre: 'Spinning Extremo', time: '17:00', coach: 'María García', capacidad: 18, categoria: 'cardio', day: 'Miércoles', intensity: 'alta' },
  { id: '7', nombre: 'Vinyasa Flow', time: '18:00', coach: 'Ana López', capacidad: 12, categoria: 'yoga', day: 'Jueves', intensity: 'media' },
  { id: '8', nombre: 'HIIT Express', time: '19:00', coach: 'Pedro Ruiz', capacidad: 15, categoria: 'funcional', day: 'Jueves', intensity: 'alta' },
  { id: '9', nombre: 'Pilates Mat', time: '10:00', coach: 'Ana López', capacidad: 10, categoria: 'yoga', day: 'Viernes', intensity: 'baja' },
  { id: '10', nombre: 'Boxeo Fitness', time: '16:00', coach: 'Juan Pérez', capacidad: 14, categoria: 'fuerza', day: 'Viernes', intensity: 'media' },
];

let mockRecurrentClasses: RecurrentClass[] = [
  { id: 'rec1', name: 'Yoga Mañanero', dayOfWeek: 1, startTime: '07:00', endTime: '08:00', coach: 'Ana López' },
  { id: 'rec2', name: 'Cardio Express', dayOfWeek: 3, startTime: '18:00', endTime: '19:00', coach: 'María García' },
];

let mockWaitlist: WaitlistItem[] = [
  { classId: '1', className: 'CrossFit Básico', userId: 'user1', userName: 'Carlos', position: 1 },
  { classId: '1', className: 'CrossFit Básico', userId: 'user2', userName: 'Laura', position: 2 },
];

export const getClases = (): Clase[] => {
  return mockClases;
};

export const getInstructors = (): string[] => {
  return Array.from(new Set(mockClases.map(clase => clase.coach)));
};

export const getIntensities = (): ('baja' | 'media' | 'alta')[] => {
  return Array.from(new Set(mockClases.map(clase => clase.intensity)));
};

export const updateClassSchedule = (classId: string, newTime: string, newCoach: string): boolean => {
  const classIndex = mockClases.findIndex(c => c.id === classId);
  if (classIndex > -1) {
    mockClases[classIndex] = { ...mockClases[classIndex], time: newTime, coach: newCoach };
    console.log(`Class ${classId} updated to ${newTime} with ${newCoach}`);
    return true;
  }
  return false;
};

export const getRecurrentClasses = (): RecurrentClass[] => {
  return mockRecurrentClasses;
};

export const addRecurrentClass = (newClass: Omit<RecurrentClass, 'id'>): RecurrentClass => {
  const id = `rec${mockRecurrentClasses.length + 1}`;
  const recurrentClass = { ...newClass, id };
  mockRecurrentClasses.push(recurrentClass);
  console.log('Added recurrent class:', recurrentClass);
  return recurrentClass;
};

export const updateRecurrentClass = (id: string, updatedClass: Partial<RecurrentClass>): boolean => {
  const classIndex = mockRecurrentClasses.findIndex(c => c.id === id);
  if (classIndex > -1) {
    mockRecurrentClasses[classIndex] = { ...mockRecurrentClasses[classIndex], ...updatedClass };
    console.log(`Updated recurrent class ${id}:`, mockRecurrentClasses[classIndex]);
    return true;
  }
  return false;
};

export const deleteRecurrentClass = (id: string): boolean => {
  const initialLength = mockRecurrentClasses.length;
  mockRecurrentClasses = mockRecurrentClasses.filter(c => c.id !== id);
  console.log(`Deleted recurrent class ${id}`);
  return mockRecurrentClasses.length < initialLength;
};

export const getWaitlist = (): WaitlistItem[] => {
  return mockWaitlist;
};

export const joinWaitlist = (classId: string, userId: string): boolean => {
  const className = mockClases.find(c => c.id === classId)?.nombre || 'Unknown Class';
  const userName = `User${userId}`;
  const position = mockWaitlist.filter(item => item.classId === classId).length + 1;
  const newItem: WaitlistItem = { classId, className, userId, userName, position };
  mockWaitlist.push(newItem);
  console.log(`${userName} joined waitlist for ${className}`);
  return true;
};

export const leaveWaitlist = (classId: string, userId: string): boolean => {
  const initialLength = mockWaitlist.length;
  mockWaitlist = mockWaitlist.filter(item => !(item.classId === classId && item.userId === userId));
  // Re-calculate positions for the affected waitlist
  mockWaitlist.filter(item => item.classId === classId).forEach((item, index) => item.position = index + 1);
  console.log(`User ${userId} left waitlist for class ${classId}`);
  return mockWaitlist.length < initialLength;
};

export const getMetrics = (): Metrics => {
  // Simulate real-time metrics
  const totalCapacity = mockClases.reduce((sum, clase) => sum + clase.capacidad, 0);
  const currentOccupancy = mockClases.map(clase => ({
    classId: clase.id,
    occupancy: Math.floor(Math.random() * 100), // Random occupancy for demo
  }));
  const averageOccupancy = currentOccupancy.reduce((sum, item) => sum + item.occupancy, 0) / currentOccupancy.length;

  return {
    averageOccupancy: averageOccupancy || 0,
    currentOccupancy,
    trends: [
      { period: 'Hoy', value: Math.random() * 100 },
      { period: 'Semana', value: Math.random() * 100 },
    ],
  };
};
