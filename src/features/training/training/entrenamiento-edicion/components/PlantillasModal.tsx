import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Plus,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Target,
  Zap,
  Heart,
  Dumbbell,
  TrendingUp,
  Award,
  Shield,
  Flame,
  Activity,
  Play,
  Eye,
  Download,
  Share,
  Copy,
  Edit,
  Trash2,
  Save,
  Tag,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  Check,
  AlertCircle,
  Info,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Pin,
  Archive,
  Grid3X3,
  List,
  Layout,
  Maximize2,
  Minimize2,
  RotateCcw,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface EjercicioPlantilla {
  id: string;
  nombre: string;
  categoria: string;
  musculos: string[];
  equipamiento: string[];
  dificultad: 'principiante' | 'intermedio' | 'avanzado';
  series: number;
  repeticiones: string;
  peso: string;
  descanso: number;
  notas: string;
  video?: string;
  imagen?: string;
}

interface SesionSemanal {
  dia: string;
  nombre: string;
  duracion: number;
  intensidad: number;
  objetivo: string;
  ejercicios: EjercicioPlantilla[];
  notas: string;
}

interface PlantillaEntrenamiento {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: 'fuerza' | 'cardio' | 'hiit' | 'flexibilidad' | 'funcional' | 'crossfit' | 'yoga' | 'pilates' | 'rehabilitacion' | 'personalizada';
  nivel: 'principiante' | 'intermedio' | 'avanzado' | 'experto';
  duracion: number; // en días (7 para una semana)
  intensidad: number; // 1-10
  objetivo: string[];
  musculos: string[];
  equipamiento: string[];
  sesiones: SesionSemanal[]; // 7 sesiones para la semana
  creador: string;
  fechaCreacion: string;
  fechaModificacion: string;
  calificacion: number;
  usos: number;
  esPublica: boolean;
  esFavorita: boolean;
  etiquetas: string[];
  imagen?: string;
  video?: string;
  notas: string;
  variaciones?: string[];
  progresion?: {
    semana1: string;
    semana2: string;
    semana3: string;
    semana4: string;
  };
}

interface PlantillasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAplicarPlantilla: (plantilla: PlantillaEntrenamiento) => void;
  cliente?: any;
}

export const PlantillasModal: React.FC<PlantillasModalProps> = ({
  isOpen,
  onClose,
  onAplicarPlantilla,
  cliente
}) => {
  const [plantillas, setPlantillas] = useState<PlantillaEntrenamiento[]>([]);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaEntrenamiento | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroNivel, setFiltroNivel] = useState<string>('todas');
  const [filtroObjetivo, setFiltroObjetivo] = useState<string>('todas');
  const [ordenarPor, setOrdenarPor] = useState<'nombre' | 'calificacion' | 'usos' | 'fecha'>('calificacion');
  const [orden, setOrden] = useState<'asc' | 'desc'>('desc');
  const [vista, setVista] = useState<'grid' | 'lista'>('grid');
  const [mostrarFavoritas, setMostrarFavoritas] = useState(false);
  const [mostrarSoloPublicas, setMostrarSoloPublicas] = useState(false);
  const [modoVistaPrevia, setModoVistaPrevia] = useState(false);

  const categorias = [
    { id: 'todas', nombre: 'Todas', icono: BookOpen, color: '#6B7280' },
    { id: 'fuerza', nombre: 'Fuerza', icono: Dumbbell, color: '#EF4444' },
    { id: 'cardio', nombre: 'Cardio', icono: Heart, color: '#F97316' },
    { id: 'hiit', nombre: 'HIIT', icono: Zap, color: '#8B5CF6' },
    { id: 'flexibilidad', nombre: 'Flexibilidad', icono: Activity, color: '#10B981' },
    { id: 'funcional', nombre: 'Funcional', icono: Target, color: '#3B82F6' },
    { id: 'crossfit', nombre: 'CrossFit', icono: Flame, color: '#DC2626' },
    { id: 'yoga', nombre: 'Yoga', icono: Shield, color: '#84CC16' },
    { id: 'pilates', nombre: 'Pilates', color: '#06B6D4' },
    { id: 'rehabilitacion', nombre: 'Rehabilitación', icono: Award, color: '#F59E0B' },
    { id: 'personalizada', nombre: 'Personalizada', icono: Settings, color: '#6B7280' }
  ];

  const niveles = [
    { id: 'todas', nombre: 'Todos', color: '#6B7280' },
    { id: 'principiante', nombre: 'Principiante', color: '#10B981' },
    { id: 'intermedio', nombre: 'Intermedio', color: '#F59E0B' },
    { id: 'avanzado', nombre: 'Avanzado', color: '#EF4444' },
    { id: 'experto', nombre: 'Experto', color: '#8B5CF6' }
  ];

  const objetivos = [
    { id: 'todas', nombre: 'Todos', color: '#6B7280' },
    { id: 'perdida_peso', nombre: 'Pérdida de Peso', color: '#10B981' },
    { id: 'ganancia_musculo', nombre: 'Ganancia de Músculo', color: '#EF4444' },
    { id: 'fuerza', nombre: 'Fuerza', color: '#8B5CF6' },
    { id: 'resistencia', nombre: 'Resistencia', color: '#F59E0B' },
    { id: 'flexibilidad', nombre: 'Flexibilidad', color: '#06B6D4' },
    { id: 'rehabilitacion', nombre: 'Rehabilitación', color: '#F97316' },
    { id: 'mantenimiento', nombre: 'Mantenimiento', color: '#6B7280' }
  ];

  // Datos mock para demostración
  useEffect(() => {
    const plantillasMock: PlantillaEntrenamiento[] = [
      {
        id: '1',
        nombre: 'Rutina de Fuerza Semanal',
        descripcion: 'Plan de entrenamiento de fuerza completo para una semana, ideal para principiantes',
        categoria: 'fuerza',
        nivel: 'principiante',
        duracion: 7, // 7 días
        intensidad: 7,
        objetivo: ['ganancia_musculo', 'fuerza'],
        musculos: ['pecho', 'espalda', 'piernas', 'hombros', 'brazos'],
        equipamiento: ['mancuernas', 'barra', 'banco'],
        sesiones: [
          {
            dia: 'Lunes',
            nombre: 'Tren Superior - Pecho y Tríceps',
            duracion: 60,
            intensidad: 7,
            objetivo: 'Desarrollo de fuerza en tren superior',
            ejercicios: [
              {
                id: 'ej1',
                nombre: 'Press de Banca',
                categoria: 'fuerza',
                musculos: ['pecho', 'hombros', 'triceps'],
                equipamiento: ['barra', 'banco'],
                dificultad: 'principiante',
                series: 3,
                repeticiones: '8-12',
                peso: '60-80kg',
                descanso: 120,
                notas: 'Mantener la espalda recta y controlar el movimiento'
              },
              {
                id: 'ej2',
                nombre: 'Fondos en Paralelas',
                categoria: 'fuerza',
                musculos: ['pecho', 'triceps'],
                equipamiento: ['paralelas'],
                dificultad: 'principiante',
                series: 3,
                repeticiones: '8-12',
                peso: 'cuerpo',
                descanso: 90,
                notas: 'Bajar hasta que los hombros estén al nivel de los codos'
              }
            ],
            notas: 'Sesión enfocada en el desarrollo del tren superior'
          },
          {
            dia: 'Martes',
            nombre: 'Tren Inferior - Piernas',
            duracion: 60,
            intensidad: 8,
            objetivo: 'Desarrollo de fuerza en tren inferior',
            ejercicios: [
              {
                id: 'ej3',
                nombre: 'Sentadilla',
                categoria: 'fuerza',
                musculos: ['cuadriceps', 'gluteos', 'core'],
                equipamiento: ['barra'],
                dificultad: 'principiante',
                series: 4,
                repeticiones: '8-12',
                peso: '40-60kg',
                descanso: 120,
                notas: 'Bajar hasta que los muslos estén paralelos al suelo'
              },
              {
                id: 'ej4',
                nombre: 'Peso Muerto',
                categoria: 'fuerza',
                musculos: ['gluteos', 'espalda', 'core'],
                equipamiento: ['barra'],
                dificultad: 'principiante',
                series: 3,
                repeticiones: '8-10',
                peso: '50-70kg',
                descanso: 120,
                notas: 'Mantener la espalda recta durante todo el movimiento'
              }
            ],
            notas: 'Sesión intensa para el desarrollo de piernas'
          },
          {
            dia: 'Miércoles',
            nombre: 'Descanso Activo',
            duracion: 30,
            intensidad: 3,
            objetivo: 'Recuperación y movilidad',
            ejercicios: [
              {
                id: 'ej5',
                nombre: 'Caminata Ligera',
                categoria: 'cardio',
                musculos: ['todo el cuerpo'],
                equipamiento: ['ninguno'],
                dificultad: 'principiante',
                series: 1,
                repeticiones: '30 min',
                peso: 'cuerpo',
                descanso: 0,
                notas: 'Ritmo cómodo para activar la circulación'
              }
            ],
            notas: 'Día de recuperación activa'
          },
          {
            dia: 'Jueves',
            nombre: 'Tren Superior - Espalda y Bíceps',
            duracion: 60,
            intensidad: 7,
            objetivo: 'Desarrollo de fuerza en espalda y brazos',
            ejercicios: [
              {
                id: 'ej6',
                nombre: 'Dominadas Asistidas',
                categoria: 'fuerza',
                musculos: ['espalda', 'biceps'],
                equipamiento: ['barra', 'banda'],
                dificultad: 'principiante',
                series: 3,
                repeticiones: '6-10',
                peso: 'asistido',
                descanso: 120,
                notas: 'Usar banda de asistencia si es necesario'
              },
              {
                id: 'ej7',
                nombre: 'Remo con Barra',
                categoria: 'fuerza',
                musculos: ['espalda', 'biceps'],
                equipamiento: ['barra'],
                dificultad: 'principiante',
                series: 3,
                repeticiones: '8-12',
                peso: '40-60kg',
                descanso: 90,
                notas: 'Mantener los codos cerca del cuerpo'
              }
            ],
            notas: 'Sesión para equilibrar el tren superior'
          },
          {
            dia: 'Viernes',
            nombre: 'Full Body',
            duracion: 45,
            intensidad: 6,
            objetivo: 'Trabajo completo del cuerpo',
            ejercicios: [
              {
                id: 'ej8',
                nombre: 'Burpees',
                categoria: 'funcional',
                musculos: ['todo el cuerpo'],
                equipamiento: ['ninguno'],
                dificultad: 'intermedio',
                series: 3,
                repeticiones: '10-15',
                peso: 'cuerpo',
                descanso: 60,
                notas: 'Movimiento completo y fluido'
              },
              {
                id: 'ej9',
                nombre: 'Plancha',
                categoria: 'fuerza',
                musculos: ['core', 'hombros'],
                equipamiento: ['ninguno'],
                dificultad: 'principiante',
                series: 3,
                repeticiones: '30-45 seg',
                peso: 'cuerpo',
                descanso: 60,
                notas: 'Mantener el cuerpo en línea recta'
              }
            ],
            notas: 'Sesión funcional para todo el cuerpo'
          },
          {
            dia: 'Sábado',
            nombre: 'Cardio y Flexibilidad',
            duracion: 40,
            intensidad: 5,
            objetivo: 'Mejora cardiovascular y flexibilidad',
            ejercicios: [
              {
                id: 'ej10',
                nombre: 'Correr Moderado',
                categoria: 'cardio',
                musculos: ['todo el cuerpo'],
                equipamiento: ['ninguno'],
                dificultad: 'principiante',
                series: 1,
                repeticiones: '20 min',
                peso: 'cuerpo',
                descanso: 0,
                notas: 'Ritmo moderado y constante'
              },
              {
                id: 'ej11',
                nombre: 'Estiramientos',
                categoria: 'flexibilidad',
                musculos: ['todo el cuerpo'],
                equipamiento: ['esterilla'],
                dificultad: 'principiante',
                series: 1,
                repeticiones: '15 min',
                peso: 'cuerpo',
                descanso: 0,
                notas: 'Estiramientos suaves y controlados'
              }
            ],
            notas: 'Día de cardio y recuperación'
          },
          {
            dia: 'Domingo',
            nombre: 'Descanso Total',
            duracion: 0,
            intensidad: 1,
            objetivo: 'Recuperación completa',
            ejercicios: [],
            notas: 'Día de descanso total para la recuperación'
          }
        ],
        creador: 'Entrenador Principal',
        fechaCreacion: '2024-01-01T00:00:00Z',
        fechaModificacion: '2024-01-15T00:00:00Z',
        calificacion: 4.8,
        usos: 156,
        esPublica: true,
        esFavorita: true,
        etiquetas: ['fuerza', 'principiante', 'semanal', 'completo'],
        notas: 'Plan semanal completo para principiantes en el gimnasio',
        progresion: {
          semana1: 'Aprender técnica básica de todos los ejercicios',
          semana2: 'Aumentar peso gradualmente en ejercicios principales',
          semana3: 'Añadir variaciones y mejorar la intensidad',
          semana4: 'Evaluar progreso y ajustar según necesidades'
        }
      },
      {
        id: '2',
        nombre: 'HIIT Quema Grasa',
        descripcion: 'Sesión de alta intensidad para quemar grasa y mejorar la condición cardiovascular',
        categoria: 'hiit',
        nivel: 'intermedio',
        duracion: 30,
        intensidad: 9,
        objetivo: ['perdida_peso', 'resistencia'],
        musculos: ['todo el cuerpo'],
        equipamiento: ['ninguno'],
        ejercicios: [
          {
            id: 'ej3',
            nombre: 'Burpees',
            categoria: 'cardio',
            musculos: ['todo el cuerpo'],
            equipamiento: ['ninguno'],
            dificultad: 'intermedio',
            series: 4,
            repeticiones: '30 seg',
            peso: 'cuerpo',
            descanso: 30,
            notas: 'Máxima intensidad durante el trabajo'
          }
        ],
        creador: 'Especialista HIIT',
        fechaCreacion: '2024-01-05T00:00:00Z',
        fechaModificacion: '2024-01-10T00:00:00Z',
        calificacion: 4.6,
        usos: 89,
        esPublica: true,
        esFavorita: false,
        etiquetas: ['hiit', 'cardio', 'quema grasa'],
        notas: 'Perfecto para días ocupados'
      },
      {
        id: '3',
        nombre: 'Yoga para Flexibilidad',
        descripcion: 'Secuencia de yoga enfocada en mejorar la flexibilidad y movilidad',
        categoria: 'yoga',
        nivel: 'principiante',
        duracion: 45,
        intensidad: 4,
        objetivo: ['flexibilidad', 'relajacion'],
        musculos: ['todo el cuerpo'],
        equipamiento: ['esterilla'],
        ejercicios: [
          {
            id: 'ej4',
            nombre: 'Saludo al Sol',
            categoria: 'flexibilidad',
            musculos: ['todo el cuerpo'],
            equipamiento: ['esterilla'],
            dificultad: 'principiante',
            series: 3,
            repeticiones: '1 serie',
            peso: 'cuerpo',
            descanso: 0,
            notas: 'Movimientos fluidos y controlados'
          }
        ],
        creador: 'Instructor de Yoga',
        fechaCreacion: '2024-01-08T00:00:00Z',
        fechaModificacion: '2024-01-12T00:00:00Z',
        calificacion: 4.9,
        usos: 234,
        esPublica: true,
        esFavorita: true,
        etiquetas: ['yoga', 'flexibilidad', 'relajacion'],
        notas: 'Excelente para recuperación'
      }
    ];
    setPlantillas(plantillasMock);
  }, []);

  const filtrarPlantillas = () => {
    return plantillas.filter(plantilla => {
      const coincideBusqueda = plantilla.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                               plantilla.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                               plantilla.etiquetas.some(etiqueta => etiqueta.toLowerCase().includes(busqueda.toLowerCase()));
      
      const coincideCategoria = filtroCategoria === 'todas' || plantilla.categoria === filtroCategoria;
      const coincideNivel = filtroNivel === 'todas' || plantilla.nivel === filtroNivel;
      const coincideObjetivo = filtroObjetivo === 'todas' || plantilla.objetivo.includes(filtroObjetivo);
      const coincideFavoritas = !mostrarFavoritas || plantilla.esFavorita;
      const coincidePublicas = !mostrarSoloPublicas || plantilla.esPublica;
      
      return coincideBusqueda && coincideCategoria && coincideNivel && coincideObjetivo && coincideFavoritas && coincidePublicas;
    });
  };

  const ordenarPlantillas = (plantillasFiltradas: PlantillaEntrenamiento[]) => {
    return [...plantillasFiltradas].sort((a, b) => {
      let valorA: any, valorB: any;
      
      switch (ordenarPor) {
        case 'nombre':
          valorA = a.nombre.toLowerCase();
          valorB = b.nombre.toLowerCase();
          break;
        case 'calificacion':
          valorA = a.calificacion;
          valorB = b.calificacion;
          break;
        case 'usos':
          valorA = a.usos;
          valorB = b.usos;
          break;
        case 'fecha':
          valorA = new Date(a.fechaModificacion);
          valorB = new Date(b.fechaModificacion);
          break;
        default:
          return 0;
      }
      
      if (valorA < valorB) return orden === 'asc' ? -1 : 1;
      if (valorA > valorB) return orden === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const plantillasFiltradas = ordenarPlantillas(filtrarPlantillas());

  const handleAplicarPlantilla = (plantilla: PlantillaEntrenamiento) => {
    onAplicarPlantilla(plantilla);
    onClose();
  };

  const handleToggleFavorita = (id: string) => {
    setPlantillas(prev => prev.map(plantilla => 
      plantilla.id === id 
        ? { ...plantilla, esFavorita: !plantilla.esFavorita }
        : plantilla
    ));
  };

  const getColorCategoria = (categoria: string) => {
    const categoriaData = categorias.find(cat => cat.id === categoria);
    return categoriaData?.color || '#6B7280';
  };

  const getIconoCategoria = (categoria: string) => {
    const categoriaData = categorias.find(cat => cat.id === categoria);
    return categoriaData?.icono || BookOpen;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Plantillas de Entrenamiento</h2>
                <p className="text-purple-100">Biblioteca completa de rutinas y ejercicios</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar de Filtros */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-4">
                {/* Búsqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar plantillas..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Filtros */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                    <select
                      value={filtroCategoria}
                      onChange={(e) => setFiltroCategoria(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
                    <select
                      value={filtroNivel}
                      onChange={(e) => setFiltroNivel(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {niveles.map(nivel => (
                        <option key={nivel.id} value={nivel.id}>{nivel.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo</label>
                    <select
                      value={filtroObjetivo}
                      onChange={(e) => setFiltroObjetivo(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {objetivos.map(obj => (
                        <option key={obj.id} value={obj.id}>{obj.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                    <select
                      value={ordenarPor}
                      onChange={(e) => setOrdenarPor(e.target.value as any)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="calificacion">Calificación</option>
                      <option value="usos">Más usadas</option>
                      <option value="nombre">Nombre</option>
                      <option value="fecha">Fecha</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Orden</label>
                    <select
                      value={orden}
                      onChange={(e) => setOrden(e.target.value as any)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="desc">Descendente</option>
                      <option value="asc">Ascendente</option>
                    </select>
                  </div>

                  {/* Opciones adicionales */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={mostrarFavoritas}
                        onChange={(e) => setMostrarFavoritas(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Solo favoritas</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={mostrarSoloPublicas}
                        onChange={(e) => setMostrarSoloPublicas(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Solo públicas</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="p-4 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                {plantillasFiltradas.length} plantilla{plantillasFiltradas.length !== 1 ? 's' : ''} encontrada{plantillasFiltradas.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Botón Nueva Plantilla */}
            <div className="p-4">
              <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Crear Plantilla
              </button>
            </div>
          </div>

          {/* Área Principal */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setVista('grid')}
                      className={`p-2 rounded ${vista === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setVista('lista')}
                      className={`p-2 rounded ${vista === 'lista' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Plantillas */}
            <div className="flex-1 overflow-y-auto p-4">
              {vista === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plantillasFiltradas.map(plantilla => {
                    const IconoCategoria = getIconoCategoria(plantilla.categoria);
                    return (
                      <motion.div
                        key={plantilla.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setPlantillaSeleccionada(plantilla)}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: getColorCategoria(plantilla.categoria) }}
                              />
                              <span className="text-sm font-medium text-gray-600 capitalize">
                                {plantilla.categoria}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorita(plantilla.id);
                              }}
                              className={`p-1 ${plantilla.esFavorita ? 'text-yellow-500' : 'text-gray-400'}`}
                            >
                              <Star className={`w-4 h-4 ${plantilla.esFavorita ? 'fill-current' : ''}`} />
                            </button>
                          </div>

                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {plantilla.nombre}
                          </h3>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {plantilla.descripcion}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{plantilla.duracion} días</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{plantilla.usos}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{plantilla.calificacion}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {plantilla.etiquetas.slice(0, 3).map(etiqueta => (
                              <span key={etiqueta} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {etiqueta}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 capitalize">
                              {plantilla.nivel}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPlantillaSeleccionada(plantilla);
                                  setModoVistaPrevia(true);
                                }}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAplicarPlantilla(plantilla);
                                }}
                                className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                              >
                                Aplicar
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {plantillasFiltradas.map(plantilla => {
                    const IconoCategoria = getIconoCategoria(plantilla.categoria);
                    return (
                      <motion.div
                        key={plantilla.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setPlantillaSeleccionada(plantilla)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: getColorCategoria(plantilla.categoria) }}
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{plantilla.nombre}</h3>
                              <p className="text-sm text-gray-600">{plantilla.descripcion}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right text-sm text-gray-500">
                              <div>{plantilla.duracion} días • {plantilla.nivel}</div>
                              <div>{plantilla.calificacion} ⭐ • {plantilla.usos} usos</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleFavorita(plantilla.id);
                                }}
                                className={`p-1 ${plantilla.esFavorita ? 'text-yellow-500' : 'text-gray-400'}`}
                              >
                                <Star className={`w-4 h-4 ${plantilla.esFavorita ? 'fill-current' : ''}`} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPlantillaSeleccionada(plantilla);
                                  setModoVistaPrevia(true);
                                }}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAplicarPlantilla(plantilla);
                                }}
                                className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                              >
                                Aplicar
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de Vista Previa */}
        <AnimatePresence>
          {modoVistaPrevia && plantillaSeleccionada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
              >
                {/* Header de Vista Previa */}
                <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {React.createElement(getIconoCategoria(plantillaSeleccionada.categoria), { className: "w-6 h-6 text-gray-600" })}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{plantillaSeleccionada.nombre}</h3>
                        <p className="text-sm text-gray-600">{plantillaSeleccionada.descripcion}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModoVistaPrevia(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Contenido de Vista Previa */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Información General */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Información General</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duración:</span>
                          <span className="font-medium">{plantillaSeleccionada.duracion} días</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nivel:</span>
                          <span className="font-medium capitalize">{plantillaSeleccionada.nivel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Intensidad:</span>
                          <span className="font-medium">{plantillaSeleccionada.intensidad}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Calificación:</span>
                          <span className="font-medium">{plantillaSeleccionada.calificacion} ⭐</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Usos:</span>
                          <span className="font-medium">{plantillaSeleccionada.usos}</span>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Objetivos</h5>
                        <div className="flex flex-wrap gap-2">
                          {plantillaSeleccionada.objetivo.map(obj => (
                            <span key={obj} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {obj.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Músculos Trabajados</h5>
                        <div className="flex flex-wrap gap-2">
                          {plantillaSeleccionada.musculos.map(musculo => (
                            <span key={musculo} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {musculo}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Plan Semanal */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Plan Semanal ({plantillaSeleccionada.sesiones.length} días)</h4>
                      <div className="space-y-3">
                        {plantillaSeleccionada.sesiones.map((sesion, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h5 className="font-medium text-gray-900">{sesion.dia} - {sesion.nombre}</h5>
                                <p className="text-sm text-gray-600">{sesion.objetivo}</p>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                <div>{sesion.duracion} min</div>
                                <div>Intensidad: {sesion.intensidad}/10</div>
                              </div>
                            </div>
                            
                            {sesion.ejercicios.length > 0 ? (
                              <div className="space-y-2">
                                <h6 className="text-sm font-medium text-gray-700">Ejercicios ({sesion.ejercicios.length})</h6>
                                <div className="grid grid-cols-1 gap-2">
                                  {sesion.ejercicios.map((ejercicio, ejIndex) => (
                                    <div key={ejercicio.id} className="bg-gray-50 rounded p-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{ejercicio.nombre}</span>
                                        <span className="text-xs text-gray-500">{ejercicio.series} x {ejercicio.repeticiones}</span>
                                      </div>
                                      {ejercicio.peso !== 'cuerpo' && (
                                        <div className="text-xs text-gray-500">Peso: {ejercicio.peso}</div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500 italic">Día de descanso</div>
                            )}
                            
                            {sesion.notas && (
                              <div className="mt-2 text-xs text-gray-500 italic">{sesion.notas}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setModoVistaPrevia(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => handleAplicarPlantilla(plantillaSeleccionada)}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Aplicar Plantilla
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
