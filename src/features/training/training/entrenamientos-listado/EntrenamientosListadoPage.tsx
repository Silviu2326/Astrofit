import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetchEntrenamientos } from './entrenamientosListadoApi';
import {
  Activity,
  Calendar,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Plus,
  FileText,
  Settings,
  Search,
  Filter,
  Grid,
  List,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Edit,
  Play,
  Pause,
  MoreVertical,
  Eye,
  MessageSquare,
  Clock,
  Dumbbell,
  Award,
  BarChart3,
  PieChart,
  Download,
  Bell,
  ChevronDown,
  X,
  Zap,
  Heart,
  Flame,
  CheckSquare,
  XCircle,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Interfaces mejoradas
interface EjercicioSesion {
  ejercicioId?: {
    nombre?: string;
    _id?: string;
  };
  series?: number;
  repeticiones?: string;
  descanso?: number;
  completado?: boolean;
  orden?: number;
  _id?: string;
  id?: string;
}

interface SesionEntrenamiento {
  id: string;
  fecha: string;
  hora: string;
  duracion: number; // minutos
  estado: 'pendiente' | 'completado' | 'cancelado';
  ejercicios: (string | EjercicioSesion)[];
  notasEntrenador?: string;
}

interface Entrenamiento {
  id: string;
  cliente: {
    nombre: string;
    avatar: string;
    email: string;
  } | string;
  titulo: string;
  tipo: 'Fuerza' | 'Hipertrofia' | 'Resistencia' | 'Pérdida de Peso' | 'CrossFit' | 'Funcional' | 'Powerlifting' | 'Calistenia';
  objetivo: 'Ganar Masa' | 'Perder Grasa' | 'Mantener' | 'Rendimiento' | 'Salud General' | 'Rehabilitación';
  estado: 'activo' | 'completado' | 'pausado' | 'borrador' | 'cancelado';
  fechaInicio: string;
  fechaFin?: string;
  semanaActual: number;
  totalSemanas: number;
  diasPorSemana: number;
  progreso: number;
  adherencia: number;
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  proximaSesion?: SesionEntrenamiento;
  ultimaActividad: string;
  sesionesCompletadas: number;
  sesionesProgramadas: number;
  tieneComentarios: boolean;
  requiereRevision: boolean;
  conSeguimiento: boolean;
  notasCliente?: string;
  sesiones?: SesionEntrenamiento[];
  entrenador?: string;
}

// Helper para generar sesiones realistas
const generarSesiones = (fechaInicio: string, diasPorSemana: number, semanas: number, completadas: number): SesionEntrenamiento[] => {
  const sesiones: SesionEntrenamiento[] = [];
  const fecha = new Date(fechaInicio);
  const diasSemana = [1, 3, 5, 2, 4]; // Lunes, Miércoles, Viernes, Martes, Jueves
  const horas = ['07:00', '09:00', '10:30', '14:00', '16:00', '18:00', '19:30'];
  const ejerciciosPorTipo: Record<string, string[]> = {
    Fuerza: ['Sentadillas 5x5', 'Press Banca 5x5', 'Peso Muerto 3x5', 'Press Militar 4x6', 'Remo 4x8'],
    Hipertrofia: ['Curl Bíceps 4x12', 'Extensiones 4x15', 'Fondos 3x12', 'Elevaciones 4x15', 'Press Inclinado 4x10'],
    Resistencia: ['Carrera 5km', 'Intervalos 400m x8', 'Fondo Largo 10km', 'Series 200m x12', 'Recuperación 3km'],
    CrossFit: ['Metcon 20min', 'AMRAP 15min', 'EMOM 12min', 'For Time', 'Skill Work'],
    Funcional: ['Sentadilla Goblet', 'Swing Kettlebell', 'Turkish Get Up', 'Farmer Walk', 'Plancha'],
    Calistenia: ['Dominadas', 'Flexiones', 'Fondos', 'L-Sit', 'Front Lever Progression'],
  };

  let sesionIndex = 0;
  for (let semana = 0; semana < semanas; semana++) {
    for (let dia = 0; dia < Math.min(diasPorSemana, 6); dia++) {
      if (sesionIndex >= diasPorSemana * semanas) break;

      const fechaSesion = new Date(fecha);
      fechaSesion.setDate(fecha.getDate() + (semana * 7) + diasSemana[dia % diasSemana.length]);
      const hoy = new Date('2025-10-01');

      const esPasado = fechaSesion < hoy;
      const esHoy = fechaSesion.toDateString() === hoy.toDateString();
      const completadaReal = sesionIndex < completadas;

      sesiones.push({
        id: `sesion-${semana}-${dia}`,
        fecha: fechaSesion.toISOString().split('T')[0],
        hora: horas[Math.floor(Math.random() * horas.length)],
        duracion: 45 + Math.floor(Math.random() * 30),
        estado: completadaReal ? 'completado' : esHoy ? 'pendiente' : esPasado && Math.random() > 0.8 ? 'cancelado' : 'pendiente',
        ejercicios: ejerciciosPorTipo.Fuerza || ['Ejercicio 1', 'Ejercicio 2', 'Ejercicio 3'],
        notasEntrenador: completadaReal && Math.random() > 0.6 ? 'Excelente progreso en los levantamientos' : undefined,
      });
      sesionIndex++;
    }
  }
  return sesiones.slice(0, diasPorSemana * semanas);
};

// Mock data realista - 45 entrenamientos con sesiones programadas
const mockEntrenamientos: Entrenamiento[] = [
  {
    id: '1',
    cliente: { nombre: 'Juan Pérez', avatar: 'https://i.pravatar.cc/150?img=1', email: 'juan@email.com' },
    titulo: 'Plan de Fuerza Completo',
    tipo: 'Fuerza',
    objetivo: 'Rendimiento',
    estado: 'activo',
    fechaInicio: '2025-08-15',
    semanaActual: 7,
    totalSemanas: 12,
    diasPorSemana: 4,
    progreso: 58,
    adherencia: 92,
    nivel: 'Intermedio',
    proximaSesion: {
      id: 's1-hoy',
      fecha: '2025-10-01',
      hora: '09:00',
      duracion: 60,
      estado: 'pendiente',
      ejercicios: ['Sentadillas 5x5', 'Press Banca 5x5', 'Remo 4x8', 'Dominadas 3xF'],
    },
    ultimaActividad: 'Hace 1 día',
    sesionesCompletadas: 26,
    sesionesProgramadas: 48,
    tieneComentarios: true,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Carlos Trainer',
    sesiones: generarSesiones('2025-08-15', 4, 12, 26),
  },
  {
    id: '2',
    cliente: { nombre: 'María López', avatar: 'https://i.pravatar.cc/150?img=5', email: 'maria@email.com' },
    titulo: 'Hipertrofia Avanzada - Tren Superior',
    tipo: 'Hipertrofia',
    objetivo: 'Ganar Masa',
    estado: 'activo',
    fechaInicio: '2025-07-01',
    semanaActual: 10,
    totalSemanas: 16,
    diasPorSemana: 5,
    progreso: 63,
    adherencia: 88,
    nivel: 'Avanzado',
    proximaSesion: {
      id: 's2-hoy',
      fecha: '2025-10-01',
      hora: '10:30',
      duracion: 75,
      estado: 'pendiente',
      ejercicios: ['Press Inclinado 4x10', 'Curl Bíceps 4x12', 'Fondos 3x12', 'Face Pulls 4x15'],
    },
    ultimaActividad: 'Hace 3 horas',
    sesionesCompletadas: 48,
    sesionesProgramadas: 80,
    tieneComentarios: false,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Laura Fitness',
    sesiones: generarSesiones('2025-07-01', 5, 16, 48),
  },
  {
    id: '3',
    cliente: { nombre: 'Carlos García', avatar: 'https://i.pravatar.cc/150?img=12', email: 'carlos@email.com' },
    titulo: 'CrossFit Competición',
    tipo: 'CrossFit',
    objetivo: 'Rendimiento',
    estado: 'activo',
    fechaInicio: '2025-06-01',
    semanaActual: 14,
    totalSemanas: 16,
    diasPorSemana: 6,
    progreso: 88,
    adherencia: 95,
    nivel: 'Avanzado',
    proximaSesion: {
      id: 's3-hoy',
      fecha: '2025-10-01',
      hora: '14:00',
      duracion: 60,
      estado: 'pendiente',
      ejercicios: ['Metcon 20min', 'Snatch Practice', 'Core Work'],
    },
    ultimaActividad: 'Hace 5 horas',
    sesionesCompletadas: 82,
    sesionesProgramadas: 96,
    tieneComentarios: true,
    requiereRevision: true,
    conSeguimiento: true,
    entrenador: 'Mike Coach',
    sesiones: generarSesiones('2025-06-01', 6, 16, 82),
  },
  {
    id: '4',
    cliente: { nombre: 'Ana Rodríguez', avatar: 'https://i.pravatar.cc/150?img=20', email: 'ana@email.com' },
    titulo: 'Pérdida de Peso Efectiva',
    tipo: 'Pérdida de Peso',
    objetivo: 'Perder Grasa',
    estado: 'activo',
    fechaInicio: '2025-08-01',
    semanaActual: 6,
    totalSemanas: 12,
    diasPorSemana: 4,
    progreso: 50,
    adherencia: 76,
    nivel: 'Principiante',
    proximaSesion: {
      id: 's4-man',
      fecha: '2025-10-02',
      hora: '07:00',
      duracion: 45,
      estado: 'pendiente',
      ejercicios: ['Cardio HIIT 30min', 'Circuito Corporal', 'Estiramientos'],
    },
    ultimaActividad: 'Hace 1 día',
    sesionesCompletadas: 22,
    sesionesProgramadas: 48,
    tieneComentarios: false,
    requiereRevision: true,
    conSeguimiento: true,
    entrenador: 'Sofia Wellness',
    sesiones: generarSesiones('2025-08-01', 4, 12, 22),
  },
  {
    id: '5',
    cliente: { nombre: 'Pedro Martínez', avatar: 'https://i.pravatar.cc/150?img=33', email: 'pedro@email.com' },
    titulo: 'Powerlifting Básico',
    tipo: 'Powerlifting',
    objetivo: 'Rendimiento',
    estado: 'activo',
    fechaInicio: '2025-09-01',
    semanaActual: 3,
    totalSemanas: 10,
    diasPorSemana: 3,
    progreso: 30,
    adherencia: 100,
    nivel: 'Intermedio',
    proximaSesion: {
      id: 's5-hoy',
      fecha: '2025-10-01',
      hora: '16:00',
      duracion: 90,
      estado: 'pendiente',
      ejercicios: ['Sentadilla 5x3 @85%', 'Accesorios Pierna', 'Core'],
    },
    ultimaActividad: 'Hace 2 días',
    sesionesCompletadas: 9,
    sesionesProgramadas: 30,
    tieneComentarios: false,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Roberto Strength',
    sesiones: generarSesiones('2025-09-01', 3, 10, 9),
  },
  // Agregar más entrenamientos para llegar a 45
  {
    id: '6',
    cliente: { nombre: 'Laura Sánchez', avatar: 'https://i.pravatar.cc/150?img=45', email: 'laura@email.com' },
    titulo: 'Resistencia Maratón',
    tipo: 'Resistencia',
    objetivo: 'Rendimiento',
    estado: 'activo',
    fechaInicio: '2025-07-10',
    semanaActual: 11,
    totalSemanas: 16,
    diasPorSemana: 5,
    progreso: 69,
    adherencia: 82,
    nivel: 'Intermedio',
    proximaSesion: {
      id: 's6-man',
      fecha: '2025-10-02',
      hora: '06:30',
      duracion: 120,
      estado: 'pendiente',
      ejercicios: ['Fondo Largo 15km', 'Estiramientos', 'Rodillo'],
    },
    ultimaActividad: 'Hace 1 día',
    sesionesCompletadas: 53,
    sesionesProgramadas: 80,
    tieneComentarios: true,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Diego Running',
    sesiones: generarSesiones('2025-07-10', 5, 16, 53),
  },
  {
    id: '7',
    cliente: { nombre: 'Diego Fernández', avatar: 'https://i.pravatar.cc/150?img=8', email: 'diego@email.com' },
    titulo: 'Funcional Avanzado',
    tipo: 'Funcional',
    objetivo: 'Salud General',
    estado: 'completado',
    fechaInicio: '2025-05-01',
    fechaFin: '2025-08-15',
    semanaActual: 12,
    totalSemanas: 12,
    diasPorSemana: 4,
    progreso: 100,
    adherencia: 91,
    nivel: 'Avanzado',
    ultimaActividad: 'Hace 2 meses',
    sesionesCompletadas: 46,
    sesionesProgramadas: 48,
    tieneComentarios: false,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Ana Coach',
    sesiones: generarSesiones('2025-05-01', 4, 12, 46),
  },
  {
    id: '8',
    cliente: { nombre: 'Sofia Torres', avatar: 'https://i.pravatar.cc/150?img=23', email: 'sofia@email.com' },
    titulo: 'Calistenia Progresiva',
    tipo: 'Calistenia',
    objetivo: 'Ganar Masa',
    estado: 'activo',
    fechaInicio: '2025-08-20',
    semanaActual: 4,
    totalSemanas: 10,
    diasPorSemana: 4,
    progreso: 40,
    adherencia: 85,
    nivel: 'Principiante',
    proximaSesion: {
      id: 's8-man',
      fecha: '2025-10-02',
      hora: '18:00',
      duracion: 60,
      estado: 'pendiente',
      ejercicios: ['Dominadas Asistidas', 'Flexiones Diamante', 'L-Sit Practice', 'Plancha'],
    },
    ultimaActividad: 'Hace 1 día',
    sesionesCompletadas: 15,
    sesionesProgramadas: 40,
    tieneComentarios: false,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Jorge Bodyweight',
    sesiones: generarSesiones('2025-08-20', 4, 10, 15),
  },
  {
    id: '9',
    cliente: { nombre: 'Miguel Ruiz', avatar: 'https://i.pravatar.cc/150?img=11', email: 'miguel@email.com' },
    titulo: 'Fuerza Inicial',
    tipo: 'Fuerza',
    objetivo: 'Rendimiento',
    estado: 'pausado',
    fechaInicio: '2025-08-05',
    semanaActual: 3,
    totalSemanas: 8,
    diasPorSemana: 3,
    progreso: 38,
    adherencia: 55,
    nivel: 'Principiante',
    ultimaActividad: 'Hace 2 semanas',
    sesionesCompletadas: 7,
    sesionesProgramadas: 24,
    tieneComentarios: true,
    requiereRevision: true,
    conSeguimiento: true,
    entrenador: 'Luis PT',
    sesiones: generarSesiones('2025-08-05', 3, 8, 7),
  },
  {
    id: '10',
    cliente: { nombre: 'Isabella Morales', avatar: 'https://i.pravatar.cc/150?img=26', email: 'isabella@email.com' },
    titulo: 'Definición Muscular',
    tipo: 'Hipertrofia',
    objetivo: 'Perder Grasa',
    estado: 'activo',
    fechaInicio: '2025-07-15',
    semanaActual: 9,
    totalSemanas: 12,
    diasPorSemana: 5,
    progreso: 75,
    adherencia: 90,
    nivel: 'Intermedio',
    proximaSesion: {
      id: 's10-hoy',
      fecha: '2025-10-01',
      hora: '19:30',
      duracion: 60,
      estado: 'pendiente',
      ejercicios: ['Pierna Completa', 'Glúteos', 'Cardio 20min'],
    },
    ultimaActividad: 'Hace 6 horas',
    sesionesCompletadas: 43,
    sesionesProgramadas: 60,
    tieneComentarios: false,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Patricia Fitness',
    sesiones: generarSesiones('2025-07-15', 5, 12, 43),
  },
  // Continuar con más entrenamientos similares hasta llegar a ~45
  {
    id: '11',
    cliente: { nombre: 'Roberto Jiménez', avatar: 'https://i.pravatar.cc/150?img=15', email: 'roberto@email.com' },
    titulo: 'CrossFit Fundamentos',
    tipo: 'CrossFit',
    objetivo: 'Salud General',
    estado: 'activo',
    fechaInicio: '2025-09-10',
    semanaActual: 2,
    totalSemanas: 6,
    diasPorSemana: 4,
    progreso: 33,
    adherencia: 75,
    nivel: 'Principiante',
    proximaSesion: {
      id: 's11-hoy',
      fecha: '2025-10-01',
      hora: '17:00',
      duracion: 50,
      estado: 'pendiente',
      ejercicios: ['AMRAP 12min', 'Skill: Double Unders', 'Mobility'],
    },
    ultimaActividad: 'Hace 1 día',
    sesionesCompletadas: 7,
    sesionesProgramadas: 24,
    tieneComentarios: false,
    requiereRevision: false,
    conSeguimiento: false,
    entrenador: 'Tom WOD',
    sesiones: generarSesiones('2025-09-10', 4, 6, 7),
  },
  {
    id: '12',
    cliente: { nombre: 'Carmen Vega', avatar: 'https://i.pravatar.cc/150?img=29', email: 'carmen@email.com' },
    titulo: 'Plan de Mantenimiento',
    tipo: 'Funcional',
    objetivo: 'Mantener',
    estado: 'activo',
    fechaInicio: '2025-08-25',
    semanaActual: 4,
    totalSemanas: 12,
    diasPorSemana: 3,
    progreso: 33,
    adherencia: 83,
    nivel: 'Intermedio',
    proximaSesion: {
      id: 's12-man',
      fecha: '2025-10-02',
      hora: '08:00',
      duracion: 45,
      estado: 'pendiente',
      ejercicios: ['Full Body Workout', 'Cardio Moderado'],
    },
    ultimaActividad: 'Hace 2 días',
    sesionesCompletadas: 11,
    sesionesProgramadas: 36,
    tieneComentarios: false,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Elena Wellness',
    sesiones: generarSesiones('2025-08-25', 3, 12, 11),
  },
  {
    id: '13',
    cliente: { nombre: 'Fernando Castro', avatar: 'https://i.pravatar.cc/150?img=7', email: 'fernando@email.com' },
    titulo: 'Rehabilitación Post-Lesión Hombro',
    tipo: 'Funcional',
    objetivo: 'Rehabilitación',
    estado: 'activo',
    fechaInicio: '2025-09-01',
    semanaActual: 3,
    totalSemanas: 8,
    diasPorSemana: 3,
    progreso: 38,
    adherencia: 100,
    nivel: 'Principiante',
    proximaSesion: {
      id: 's13-hoy',
      fecha: '2025-10-01',
      hora: '11:00',
      duracion: 45,
      estado: 'pendiente',
      ejercicios: ['Movilidad Hombro', 'Fortalecimiento Rotadores', 'Estabilidad Core'],
    },
    ultimaActividad: 'Hace 1 día',
    sesionesCompletadas: 8,
    sesionesProgramadas: 24,
    tieneComentarios: true,
    requiereRevision: false,
    conSeguimiento: true,
    entrenador: 'Dr. Ramirez PT',
    sesiones: generarSesiones('2025-09-01', 3, 8, 8),
  },
];

const EntrenamientosListadoPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'calendar'>('cards');
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'todos' | 'pendientes' | 'completados' | 'cancelados'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState<Entrenamiento | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    estado: [] as string[],
    tipo: [] as string[],
    cliente: '',
    entrenador: '',
    fecha: '',
  });

  // Fetch entrenamientos desde el backend
  const { data: entrenamientos, loading, error, refetch } = useFetchEntrenamientos();

  // Estadísticas calculadas
  const stats = useMemo(() => {
    if (!entrenamientos || entrenamientos.length === 0) {
      return {
        totalEntrenamientos: 0,
        sesionesCompletadasEstaSemana: 0,
        proximasSesiones: 0,
        tasaCompletitud: 0,
        sesionesHoy: 0,
        sesionesCompletadasHoy: 0,
      };
    }

    const hoy = '2025-10-01';
    const manana = '2025-10-02';

    // Obtener todas las sesiones de todos los entrenamientos
    const todasLasSesiones = entrenamientos.flatMap(e =>
      (e.sesiones || []).map(s => ({ ...s, cliente: e.cliente?.nombre || e.cliente, tipo: e.tipo }))
    );

    const sesionesHoy = todasLasSesiones.filter(s => s.fecha === hoy && s.estado === 'pendiente').length;
    const sesionesCompletadasHoy = todasLasSesiones.filter(s => s.fecha === hoy && s.estado === 'completado').length;

    // Sesiones de la semana (últimos 7 días)
    const hace7Dias = new Date('2025-09-24');
    const sesionesEstaSemana = todasLasSesiones.filter(s => {
      const fecha = new Date(s.fecha);
      return fecha >= hace7Dias && fecha <= new Date(hoy) && s.estado === 'completado';
    }).length;

    const proximasSesiones = todasLasSesiones.filter(s =>
      (s.fecha === hoy || s.fecha === manana) && s.estado === 'pendiente'
    ).length;

    const tasaCompletitud = entrenamientos.length > 0
      ? Math.round((entrenamientos.filter(e => e.progreso === 100).length / entrenamientos.length) * 100)
      : 0;

    return {
      totalEntrenamientos: entrenamientos.length,
      sesionesCompletadasEstaSemana: sesionesEstaSemana,
      proximasSesiones,
      tasaCompletitud,
      sesionesHoy,
      sesionesCompletadasHoy,
    };
  }, [entrenamientos]);

  // Filtrado
  const filteredEntrenamientos = useMemo(() => {
    if (!entrenamientos) return [];

    let result = entrenamientos;

    // Filtro por tab (basado en sesiones)
    if (activeTab === 'pendientes') {
      result = result.filter(e => (e.sesiones || []).some(s => s.estado === 'pendiente' && new Date(s.fecha) >= new Date('2025-10-01')));
    } else if (activeTab === 'completados') {
      result = result.filter(e => (e.sesiones || []).some(s => s.estado === 'completado'));
    } else if (activeTab === 'cancelados') {
      result = result.filter(e => (e.sesiones || []).some(s => s.estado === 'cancelado'));
    }

    // Búsqueda
    if (searchQuery) {
      result = result.filter(e => {
        const clienteNombre = e.cliente?.nombre || e.cliente || '';
        const titulo = e.titulo || '';
        const tipo = e.tipo || '';
        return clienteNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tipo.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Filtros avanzados
    if (filters.cliente) {
      result = result.filter(e => {
        const clienteNombre = e.cliente?.nombre || e.cliente || '';
        return clienteNombre.toLowerCase().includes(filters.cliente.toLowerCase());
      });
    }
    if (filters.entrenador) {
      result = result.filter(e => e.entrenador?.toLowerCase().includes(filters.entrenador.toLowerCase()));
    }

    return result;
  }, [entrenamientos, activeTab, searchQuery, filters]);

  // Datos para calendario
  const sesionesDelMes = useMemo(() => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const sesiones: Record<string, SesionEntrenamiento[]> = {};

    if (!entrenamientos) return sesiones;

    entrenamientos.forEach(entrenamiento => {
      (entrenamiento.sesiones || []).forEach(sesion => {
        const fecha = new Date(sesion.fecha);
        if (fecha.getFullYear() === year && fecha.getMonth() === month) {
          const key = sesion.fecha;
          if (!sesiones[key]) sesiones[key] = [];
          sesiones[key].push({ ...sesion });
        }
      });
    });

    return sesiones;
  }, [selectedMonth, entrenamientos]);

  // Datos para gráficos
  const adherenciaData = [
    { semana: 'S1', completadas: 12, programadas: 15 },
    { semana: 'S2', completadas: 14, programadas: 15 },
    { semana: 'S3', completadas: 13, programadas: 15 },
    { semana: 'S4', completadas: 15, programadas: 15 },
  ];

  const tiposData = useMemo(() => {
    if (!entrenamientos) return [];
    return [
      { name: 'Fuerza', value: entrenamientos.filter(e => e.tipo === 'Fuerza').length },
      { name: 'Hipertrofia', value: entrenamientos.filter(e => e.tipo === 'Hipertrofia').length },
      { name: 'Resistencia', value: entrenamientos.filter(e => e.tipo === 'Resistencia').length },
      { name: 'CrossFit', value: entrenamientos.filter(e => e.tipo === 'CrossFit').length },
      { name: 'Otros', value: entrenamientos.filter(e => !['Fuerza', 'Hipertrofia', 'Resistencia', 'CrossFit'].includes(e.tipo)).length },
    ];
  }, [entrenamientos]);

  const COLORS = ['#f97316', '#ec4899', '#ef4444', '#f59e0b', '#fb923c'];

  // Helpers
  const getClienteName = (entrenamiento: Entrenamiento) => {
    return typeof entrenamiento.cliente === 'string'
      ? entrenamiento.cliente
      : entrenamiento.cliente?.nombre || 'Cliente';
  };

  const getClienteAvatar = (entrenamiento: Entrenamiento) => {
    return typeof entrenamiento.cliente === 'object' && entrenamiento.cliente?.avatar
      ? entrenamiento.cliente.avatar
      : 'https://i.pravatar.cc/150?img=1';
  };

  const getClienteEmail = (entrenamiento: Entrenamiento) => {
    return typeof entrenamiento.cliente === 'object' && entrenamiento.cliente?.email
      ? entrenamiento.cliente.email
      : '';
  };

  const getBadgeColor = (tipo: string) => {
    const colors: Record<string, string> = {
      Fuerza: 'bg-orange-100 text-orange-800 border-orange-300',
      Hipertrofia: 'bg-pink-100 text-pink-800 border-pink-300',
      Resistencia: 'bg-rose-100 text-rose-800 border-rose-300',
      'Pérdida de Peso': 'bg-red-100 text-red-800 border-red-300',
      CrossFit: 'bg-orange-100 text-orange-800 border-orange-300',
      Funcional: 'bg-pink-100 text-pink-800 border-pink-300',
      Powerlifting: 'bg-rose-100 text-rose-800 border-rose-300',
      Calistenia: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getEstadoBadge = (estado: string) => {
    const styles: Record<string, string> = {
      pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      completado: 'bg-green-100 text-green-800 border-green-300',
      cancelado: 'bg-red-100 text-red-800 border-red-300',
      activo: 'bg-green-100 text-green-800 border-green-300',
      pausado: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      borrador: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return styles[estado] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  // Calendario helper
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const nextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-rose-50/30 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando entrenamientos...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-rose-50/30 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al cargar entrenamientos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-rose-50/30 p-6">
      {/* HERO SECTION - Gradiente orange-pink-rose */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Dumbbell className="w-12 h-12 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Entrenamientos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Programados</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
                Gestiona y da seguimiento a todas las sesiones de entrenamiento de tus clientes
              </p>
            </div>

            <button 
              onClick={() => setShowNewSessionModal(true)}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-white/30 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Nueva Sesión</span>
            </button>
          </div>

          {/* Mini calendario destacado */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20">
              <div className="p-2 bg-white/20 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Hoy</p>
                <p className="text-white text-xl font-bold">{stats.sesionesHoy} sesiones</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20">
              <div className="p-2 bg-white/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Completitud</p>
                <p className="text-white text-xl font-bold">{stats.tasaCompletitud}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20">
              <div className="p-2 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Esta Semana</p>
                <p className="text-white text-xl font-bold">{stats.sesionesCompletadasEstaSemana}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20">
              <div className="p-2 bg-white/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Próximas</p>
                <p className="text-white text-xl font-bold">{stats.proximasSesiones}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Entrenamientos Totales
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.totalEntrenamientos}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+8%</span>
              <span className="text-xs text-gray-500 font-medium">vs anterior</span>
            </div>

            {/* Mini gráfico */}
            <div className="mt-4 flex items-end gap-1 h-8">
              {[60, 75, 55, 85, 70, 90, 95].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-orange-500 to-pink-500 rounded-t opacity-70"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Completados Esta Semana
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.sesionesCompletadasEstaSemana}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+12%</span>
              <span className="text-xs text-gray-500 font-medium">vs anterior</span>
            </div>

            {/* Progress ring simulado */}
            <div className="mt-4 flex justify-center">
              <div className="relative w-12 h-12">
                <svg className="transform -rotate-90 w-12 h-12">
                  <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                  <circle cx="24" cy="24" r="20" stroke="#10b981" strokeWidth="4" fill="none"
                    strokeDasharray={`${stats.sesionesCompletadasEstaSemana * 10} 125.6`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {Math.round((stats.sesionesCompletadasEstaSemana / 20) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Próximos Entrenamientos
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.proximasSesiones}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-50 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Hoy y mañana</span>
            </div>

            {/* Timeline mini */}
            <div className="mt-4 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1 h-1 bg-orange-200 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <div className="flex-1 h-1 bg-pink-200 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                <div className="flex-1 h-1 bg-rose-200 rounded"></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Tasa de Completitud
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.tasaCompletitud}%
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-bold text-purple-600">+5%</span>
              <span className="text-xs text-gray-500 font-medium">vs anterior</span>
            </div>

            {/* Barra de progreso */}
            <div className="mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.tasaCompletitud}%` }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Resto del contenido: Filtros, Tabs, Vista de Calendario, etc. */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {/* Tabs */}
          <div className="flex gap-2 bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-white/50">
            {[
              { id: 'todos', label: 'Todos', icon: Grid },
              { id: 'pendientes', label: 'Pendientes', icon: Clock },
              { id: 'completados', label: 'Completados', icon: CheckCircle },
              { id: 'cancelados', label: 'Cancelados', icon: XCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button className="p-3 bg-white/80 backdrop-blur-xl rounded-xl border border-white/50 hover:shadow-lg transition-all">
              <Download className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-xl rounded-xl border border-white/50 hover:shadow-lg transition-all">
              <Settings className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-white/50">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente, entrenamiento o tipo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all bg-white"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                showFilters
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>

            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'cards' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'table' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'calendar' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                }`}
              >
                <CalendarDays className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Panel de filtros expandible */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cliente</label>
                    <input
                      type="text"
                      placeholder="Nombre del cliente"
                      value={filters.cliente}
                      onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Entrenador</label>
                    <input
                      type="text"
                      placeholder="Nombre del entrenador"
                      value={filters.entrenador}
                      onChange={(e) => setFilters({ ...filters, entrenador: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
                    <input
                      type="date"
                      value={filters.fecha}
                      onChange={(e) => setFilters({ ...filters, fecha: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({ estado: [], tipo: [], cliente: '', entrenador: '', fecha: '' })}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Vista principal - Cards/Table/Calendar */}
      {viewMode === 'calendar' ? (
        /* VISTA DE CALENDARIO */
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia) => (
              <div key={dia} className="text-center font-bold text-gray-600 py-2">
                {dia}
              </div>
            ))}

            {getDaysInMonth(selectedMonth).map((dia, index) => {
              if (dia === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dateString = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
              const sesionesDelDia = sesionesDelMes[dateString] || [];
              const sesionesCompletadas = sesionesDelDia.filter(s => s.estado === 'completado').length;
              const sesionesPendientes = sesionesDelDia.filter(s => s.estado === 'pendiente').length;
              const sesionesCanceladas = sesionesDelDia.filter(s => s.estado === 'cancelado').length;

              const esHoy = dateString === '2025-10-01';

              return (
                <motion.div
                  key={dia}
                  whileHover={{ scale: 1.05 }}
                  className={`aspect-square p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    esHoy
                      ? 'bg-gradient-to-br from-orange-500 to-pink-600 border-orange-600 text-white'
                      : sesionesDelDia.length > 0
                      ? 'bg-orange-50 border-orange-200 hover:border-orange-400'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-right font-bold mb-1">{dia}</div>
                  {sesionesDelDia.length > 0 && (
                    <div className="space-y-1">
                      {sesionesCompletadas > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className={`text-xs font-medium ${esHoy ? 'text-white' : 'text-green-700'}`}>
                            {sesionesCompletadas}
                          </span>
                        </div>
                      )}
                      {sesionesPendientes > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className={`text-xs font-medium ${esHoy ? 'text-white' : 'text-yellow-700'}`}>
                            {sesionesPendientes}
                          </span>
                        </div>
                      )}
                      {sesionesCanceladas > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className={`text-xs font-medium ${esHoy ? 'text-white' : 'text-red-700'}`}>
                            {sesionesCanceladas}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Completado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Cancelado</span>
            </div>
          </div>
        </div>
      ) : viewMode === 'cards' ? (
        /* VISTA DE CARDS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEntrenamientos.map((entrenamiento, index) => (
                <motion.div
                  key={entrenamiento.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedEntrenamiento(entrenamiento)}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 cursor-pointer group relative overflow-hidden"
                >
                  {/* Decoración */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

                  {/* Fecha destacada grande */}
                  {entrenamiento.proximaSesion && (
                    <div className="absolute top-6 right-6 text-right">
                      <div className="bg-gradient-to-br from-orange-500 to-pink-600 text-white px-4 py-2 rounded-2xl shadow-lg">
                        <p className="text-3xl font-bold leading-none">
                          {new Date(entrenamiento.proximaSesion.fecha).getDate()}
                        </p>
                        <p className="text-xs uppercase font-semibold opacity-90">
                          {new Date(entrenamiento.proximaSesion.fecha).toLocaleDateString('es-ES', { month: 'short' })}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Cliente */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={getClienteAvatar(entrenamiento)}
                        alt={getClienteName(entrenamiento)}
                        className="w-14 h-14 rounded-2xl border-3 border-white shadow-lg"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{getClienteName(entrenamiento)}</h3>
                        <p className="text-sm text-gray-600">{entrenamiento.titulo}</p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(entrenamiento.tipo)}`}>
                        {entrenamiento.tipo}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-300">
                        {entrenamiento.objetivo}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getEstadoBadge(entrenamiento.estado)}`}>
                        {entrenamiento.estado}
                      </span>
                    </div>

                    {/* Próxima sesión */}
                    {entrenamiento.proximaSesion && (
                      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-4 mb-4 border border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <p className="text-sm font-bold text-orange-900">Próxima Sesión</p>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold">{entrenamiento.proximaSesion.hora}</span> • {entrenamiento.proximaSesion.duracion} min
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entrenamiento.proximaSesion.ejercicios.slice(0, 3).map((ejercicio, i) => (
                            <span key={i} className="text-xs bg-white px-2 py-1 rounded-lg text-gray-700 border border-orange-200">
                              {typeof ejercicio === 'string' ? ejercicio : (ejercicio.ejercicioId?.nombre || 'Ejercicio')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Progreso */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progreso</span>
                        <span className="text-sm font-bold text-orange-600">{entrenamiento.progreso}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${entrenamiento.progreso}%` }}
                          transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-orange-500 to-pink-600 rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Semana</p>
                        <p className="text-sm font-bold">{entrenamiento.semanaActual}/{entrenamiento.totalSemanas}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Adherencia</p>
                        <p className="text-sm font-bold text-green-600">{entrenamiento.adherencia}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Días/Semana</p>
                        <p className="text-sm font-bold">{entrenamiento.diasPorSemana}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Sesiones</p>
                        <p className="text-sm font-bold">{entrenamiento.sesionesCompletadas}/{entrenamiento.sesionesProgramadas}</p>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/dashboard/training/entrenamientos/editar/${entrenamiento.id}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/training/entrenamientos/editar/${entrenamiento.id}`);
                        }}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Próximas Sesiones y Stats */}
          <div className="space-y-6">
            {/* Próximas Sesiones Timeline */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Próximas Sesiones Hoy
              </h3>
              <div className="space-y-3">
                {(entrenamientos || [])
                  .filter(e => e.proximaSesion && e.proximaSesion.fecha === '2025-10-01')
                  .slice(0, 5)
                  .map((e, i) => (
                    <motion.div
                      key={e.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl hover:shadow-md transition-all cursor-pointer border border-orange-200 relative"
                    >
                      {/* Timeline line */}
                      {i < 4 && (
                        <div className="absolute left-[23px] top-full w-0.5 h-3 bg-gradient-to-b from-orange-300 to-transparent"></div>
                      )}

                      <img src={getClienteAvatar(e)} alt="" className="w-12 h-12 rounded-xl border-2 border-white shadow" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">{getClienteName(e)}</p>
                        <p className="text-xs text-gray-600 truncate">{e.titulo}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-orange-600" />
                          <span className="text-xs font-bold text-orange-600">{e.proximaSesion?.hora}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(e.tipo)}`}>
                            {e.tipo}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Distribución por tipo */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-pink-600" />
                Distribución por Tipo
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={tiposData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tiposData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>

            {/* Adherencia Semanal */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-rose-600" />
                Adherencia Semanal
              </h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={adherenciaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="semana" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="completadas" fill="#f97316" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="programadas" fill="#fde68a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* VISTA DE TABLA */
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-500 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Próxima Sesión</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Progreso</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Adherencia</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntrenamientos.map((e, i) => (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 cursor-pointer transition-all"
                    onClick={() => setSelectedEntrenamiento(e)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={getClienteAvatar(e)} alt="" className="w-10 h-10 rounded-xl border-2 border-orange-200" />
                        <div>
                          <p className="font-bold text-gray-900">{getClienteName(e)}</p>
                          <p className="text-sm text-gray-600">{e.titulo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {e.proximaSesion ? (
                        <div>
                          <p className="font-semibold text-gray-900">{e.proximaSesion.fecha}</p>
                          <p className="text-sm text-gray-600">{e.proximaSesion.hora}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(e.tipo)}`}>
                        {e.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-pink-600 h-2 rounded-full"
                            style={{ width: `${e.progreso}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{e.progreso}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-green-600">{e.adherencia}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getEstadoBadge(e.estado)}`}>
                        {e.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate(`/dashboard/training/entrenamientos/editar/${e.id}`)}
                          className="p-2 hover:bg-orange-100 rounded-lg transition-all"
                        >
                          <Eye className="w-4 h-4 text-orange-600" />
                        </button>
                        <button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            navigate(`/dashboard/training/entrenamientos/editar/${e.id}`);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedEntrenamiento && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEntrenamiento(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header con gradiente */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 text-white p-8 rounded-t-3xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={getClienteAvatar(selectedEntrenamiento)}
                      alt=""
                      className="w-20 h-20 rounded-2xl border-4 border-white/30"
                    />
                    <div>
                      <h2 className="text-3xl font-bold">{getClienteName(selectedEntrenamiento)}</h2>
                      <p className="text-orange-100 text-lg">{selectedEntrenamiento.titulo}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEntrenamiento(null)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/20">
                    {selectedEntrenamiento.tipo}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/20">
                    {selectedEntrenamiento.objetivo}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/20">
                    {selectedEntrenamiento.nivel}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-2xl border-2 border-orange-200">
                    <p className="text-sm text-orange-600 font-semibold mb-1">Progreso</p>
                    <p className="text-4xl font-bold text-orange-900">{selectedEntrenamiento.progreso}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                    <p className="text-sm text-green-600 font-semibold mb-1">Adherencia</p>
                    <p className="text-4xl font-bold text-green-900">{selectedEntrenamiento.adherencia}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                    <p className="text-sm text-purple-600 font-semibold mb-1">Semana</p>
                    <p className="text-4xl font-bold text-purple-900">
                      {selectedEntrenamiento.semanaActual}/{selectedEntrenamiento.totalSemanas}
                    </p>
                  </div>
                </div>

                {/* Plan del Día - Próxima Sesión */}
                {selectedEntrenamiento.proximaSesion && (
                  <div className="mb-8">
                    <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-orange-600" />
                      Plan del Día - Próxima Sesión
                    </h3>
                    <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{selectedEntrenamiento.proximaSesion.fecha}</p>
                          <p className="text-2xl font-bold text-orange-600">{selectedEntrenamiento.proximaSesion.hora}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Duración</p>
                          <p className="text-xl font-bold text-gray-900">{selectedEntrenamiento.proximaSesion.duracion} min</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-bold text-gray-900 mb-2">Ejercicios:</p>
                        {selectedEntrenamiento.proximaSesion.ejercicios.map((ejercicio, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                            <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {typeof ejercicio === 'string' ? ejercicio : (ejercicio.ejercicioId?.nombre || 'Ejercicio')}
                              </p>
                              {typeof ejercicio === 'object' && (
                                <p className="text-sm text-gray-600">
                                  {ejercicio.series && `${ejercicio.series} series`}
                                  {ejercicio.repeticiones && ` × ${ejercicio.repeticiones} reps`}
                                  {ejercicio.descanso && ` • ${ejercicio.descanso}s descanso`}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Información del Plan */}
                <div className="mb-8">
                  <h3 className="font-bold text-2xl mb-4">Información del Plan</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Fecha Inicio</p>
                        <p className="font-bold text-gray-900">{selectedEntrenamiento.fechaInicio}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <Dumbbell className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Días por Semana</p>
                        <p className="font-bold text-gray-900">{selectedEntrenamiento.diasPorSemana} días</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Sesiones</p>
                        <p className="font-bold text-gray-900">
                          {selectedEntrenamiento.sesionesCompletadas}/{selectedEntrenamiento.sesionesProgramadas}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <Clock className="w-6 h-6 text-cyan-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Última Actividad</p>
                        <p className="font-bold text-gray-900">{selectedEntrenamiento.ultimaActividad}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progreso Semanal */}
                <div className="mb-8">
                  <h3 className="font-bold text-2xl mb-4">Progreso Semanal</h3>
                  <div className="flex items-end gap-2 h-40">
                    {[...Array(selectedEntrenamiento.semanaActual)].map((_, i) => {
                      const height = 60 + Math.random() * 40;
                      return (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="flex-1 bg-gradient-to-t from-orange-500 to-pink-600 rounded-t-xl relative group"
                        >
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600">
                            S{i + 1}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/dashboard/training/entrenamientos/editar/${selectedEntrenamiento.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-2xl hover:shadow-xl transition-all font-bold text-lg"
                  >
                    <Edit className="w-5 h-5" />
                    Editar Plan
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all font-bold text-lg">
                    <CheckCircle className="w-5 h-5" />
                    Marcar Completo
                  </button>
                  <button className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all">
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL NUEVA SESIÓN */}
        <AnimatePresence>
          {showNewSessionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setShowNewSessionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header del modal */}
                <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Nueva Sesión de Entrenamiento</h2>
                      <p className="text-orange-100 text-sm mt-1">
                        Programa una nueva sesión para un cliente
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewSessionModal(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Formulario */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cliente */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cliente *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Seleccionar cliente</option>
                        <option value="cliente1">María González</option>
                        <option value="cliente2">Carlos Rodríguez</option>
                        <option value="cliente3">Ana Martínez</option>
                        <option value="cliente4">Luis Fernández</option>
                      </select>
                    </div>

                    {/* Tipo de entrenamiento */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Entrenamiento *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Seleccionar tipo</option>
                        <option value="fuerza">Fuerza</option>
                        <option value="hipertrofia">Hipertrofia</option>
                        <option value="resistencia">Resistencia</option>
                        <option value="perdida-peso">Pérdida de Peso</option>
                        <option value="crossfit">CrossFit</option>
                        <option value="funcional">Funcional</option>
                        <option value="powerlifting">Powerlifting</option>
                        <option value="calistenia">Calistenia</option>
                      </select>
                    </div>

                    {/* Duración */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duración (minutos) *
                      </label>
                      <input
                        type="number"
                        placeholder="Ej: 60"
                        min="15"
                        max="180"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {/* Fecha */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha *
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {/* Hora */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hora *
                      </label>
                      <input
                        type="time"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {/* Ubicación */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ubicación
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Seleccionar ubicación</option>
                        <option value="gym">Gimnasio Principal</option>
                        <option value="sala-funcional">Sala Funcional</option>
                        <option value="zona-cardio">Zona Cardio</option>
                        <option value="exterior">Exterior</option>
                        <option value="online">Online</option>
                      </select>
                    </div>

                    {/* Entrenador */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Entrenador
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Asignar entrenador</option>
                        <option value="entrenador1">Dr. Ramirez PT</option>
                        <option value="entrenador2">Lic. García</option>
                        <option value="entrenador3">Coach Martínez</option>
                      </select>
                    </div>
                  </div>

                  {/* Notas */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notas (opcional)
                    </label>
                    <textarea
                      placeholder="Añade notas específicas para esta sesión..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Ejercicios sugeridos */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ejercicios Sugeridos (opcional)
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Sentadilla con barra</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Press de banca</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Peso muerto</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Dominadas</span>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowNewSessionModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        // Aquí iría la lógica para crear la sesión
                        console.log('Crear nueva sesión');
                        setShowNewSessionModal(false);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                      Crear Sesión
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
};

export default EntrenamientosListadoPage;
