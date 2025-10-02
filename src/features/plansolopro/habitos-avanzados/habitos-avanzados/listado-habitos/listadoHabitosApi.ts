// Simulaci??n de una API para h??bitos
export interface Habito {
  id: string;
  nombre: string;
  cliente: string;
  tipo: string;
  estado: 'activo' | 'inactivo';
  cumplimientoSemanal: number; // Porcentaje de 0 a 100
  racha?: number; // Días consecutivos
  completadoHoy?: boolean;
  frecuencia?: 'Diario' | 'Semanal' | 'Mensual';
  icono?: string;
  color?: string;
}

const mockHabitos: Habito[] = [
  {
    id: '1',
    nombre: 'Beber 2L agua',
    cliente: 'Cliente A',
    tipo: 'Salud',
    estado: 'activo',
    cumplimientoSemanal: 80,
    racha: 14,
    completadoHoy: true,
    frecuencia: 'Diario',
    icono: '💧',
    color: 'blue'
  },
  {
    id: '2',
    nombre: 'Hacer ejercicio 30min',
    cliente: 'Cliente B',
    tipo: 'Salud',
    estado: 'activo',
    cumplimientoSemanal: 40,
    racha: 3,
    completadoHoy: false,
    frecuencia: 'Diario',
    icono: '💪',
    color: 'green'
  },
  {
    id: '3',
    nombre: 'Leer 15min',
    cliente: 'Cliente A',
    tipo: 'Desarrollo Personal',
    estado: 'inactivo',
    cumplimientoSemanal: 0,
    racha: 0,
    completadoHoy: false,
    frecuencia: 'Diario',
    icono: '📚',
    color: 'purple'
  },
  {
    id: '4',
    nombre: 'Meditar 10min',
    cliente: 'Cliente C',
    tipo: 'Bienestar',
    estado: 'activo',
    cumplimientoSemanal: 95,
    racha: 28,
    completadoHoy: true,
    frecuencia: 'Diario',
    icono: '🧘',
    color: 'teal'
  },
  {
    id: '5',
    nombre: 'Estudiar programaci??n',
    cliente: 'Cliente B',
    tipo: 'Educaci??n',
    estado: 'activo',
    cumplimientoSemanal: 60,
    racha: 7,
    completadoHoy: true,
    frecuencia: 'Diario',
    icono: '💻',
    color: 'indigo'
  },
  {
    id: '6',
    nombre: 'Practicar yoga',
    cliente: 'Cliente A',
    tipo: 'Bienestar',
    estado: 'activo',
    cumplimientoSemanal: 85,
    racha: 12,
    completadoHoy: false,
    frecuencia: 'Semanal',
    icono: '🧘‍♀️',
    color: 'pink'
  },
  {
    id: '7',
    nombre: 'Escribir diario',
    cliente: 'Cliente C',
    tipo: 'Desarrollo Personal',
    estado: 'activo',
    cumplimientoSemanal: 70,
    racha: 5,
    completadoHoy: true,
    frecuencia: 'Diario',
    icono: '✍️',
    color: 'orange'
  },
  {
    id: '8',
    nombre: 'Dormir 8 horas',
    cliente: 'Cliente B',
    tipo: 'Salud',
    estado: 'activo',
    cumplimientoSemanal: 55,
    racha: 2,
    completadoHoy: false,
    frecuencia: 'Diario',
    icono: '😴',
    color: 'cyan'
  },
];

export const getHabitos = (): Promise<Habito[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHabitos), 500);
  });
};

export const getHabitosByCliente = (clienteId: string): Promise<Habito[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHabitos.filter(h => h.cliente === clienteId)), 500);
  });
};
