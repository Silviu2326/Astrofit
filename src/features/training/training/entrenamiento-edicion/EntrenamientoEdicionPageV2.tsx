import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Save, Edit, Calendar, CheckCircle, AlertCircle, Plus,
  Settings, BarChart3, TrendingUp, Activity, MessageSquare, Dumbbell,
  BookOpen, FileText, Play, Clock, Weight, Repeat, Target, Users,
  MapPin, Heart, Flame, Zap, Award, Star, Bookmark, Tag, Filter,
  Search, Eye, Download, Share, Copy, Trash2, RotateCcw, RefreshCw,
  ChevronDown, ChevronUp, ArrowRight, ArrowLeft as ArrowLeftIcon,
  ExternalLink, Bell, Timer, User, Target as TargetIcon, Dumbbell as DumbbellIcon
} from 'lucide-react';
import { getEntrenamiento, updateEntrenamiento } from '../entrenamientos-listado/entrenamientosListadoApi';
import EjercicioEditor from './components/EjercicioEditor';
import CalendarioSemanal from './components/CalendarioSemanal';
import NotasPostEntrenamiento from './components/NotasPostEntrenamiento';
import BibliotecaEjercicios from './components/BibliotecaEjercicios';
import PlantillasEntrenamiento from './components/PlantillasEntrenamiento';
import EditorSesiones from './components/EditorSesiones';
import DashboardAnalytics from './components/DashboardAnalytics';

// Interfaces
interface EjercicioSesion {
  ejercicioId?: {
    nombre?: string;
    _id?: string;
    categoria?: string;
    dificultad?: string;
    musculos?: string[];
  };
  series?: number;
  repeticiones?: string;
  peso?: number;
  descanso?: number;
  completado?: boolean;
  orden?: number;
  _id?: string;
  id?: string;
  notas?: string;
  tiempo?: number;
  distancia?: number;
  intensidad?: number;
}

interface SesionEntrenamiento {
  id?: string;
  _id?: string;
  fecha: string | Date;
  hora: string;
  duracion: number;
  estado: 'pendiente' | 'completado' | 'cancelado' | 'en-progreso';
  ejercicios: EjercicioSesion[];
  notasEntrenador?: string;
  notasCliente?: string;
  valoracionCliente?: number;
  sensacionEsfuerzo?: number;
  ubicacion?: string;
  entrenador?: string;
}

interface Entrenamiento {
  _id: string;
  id?: string;
  clienteId: any;
  titulo: string;
  descripcion?: string;
  tipo: string;
  objetivo: string;
  nivel: string;
  estado: string;
  fechaInicio: string | Date;
  fechaFin?: string | Date;
  totalSemanas: number;
  semanaActual: number;
  diasPorSemana: number;
  progreso: number;
  adherencia: number;
  sesionesCompletadas: number;
  sesionesProgramadas: number;
  sesiones: SesionEntrenamiento[];
  plantillaId?: any;
  tieneComentarios?: boolean;
  requiereRevision?: boolean;
  conSeguimiento?: boolean;
  notasEntrenador?: string;
  notasCliente?: string;
  ultimaActividad?: string | Date;
  entrenador?: string;
}

interface EstadoLiveSync {
  estado: 'guardado' | 'guardando' | 'error';
  visibleEnApp: boolean;
  ultimoCambio?: Date;
}

interface AccionHistorial {
  id: string;
  tipo: string;
  descripcion: string;
  timestamp: Date;
  deshacer: () => void;
  rehacer: () => void;
}

export const EntrenamientoEdicionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados principales
  const [loading, setLoading] = useState(true);
  const [entrenamiento, setEntrenamiento] = useState<Entrenamiento | null>(null);
  const [semanaActual, setSemanaActual] = useState(1);
  const [batchModeActive, setBatchModeActive] = useState(false);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<any>(undefined);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showPlantillasModal, setShowPlantillasModal] = useState(false);
  const [showMacroBrushModal, setShowMacroBrushModal] = useState(false);
  const [showMetricsDashboard, setShowMetricsDashboard] = useState(false);
  const [showVisualGallery, setShowVisualGallery] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [showNotesSystem, setShowNotesSystem] = useState(false);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [notasCoach, setNotasCoach] = useState('');
  
  // Micro-interacciones
  const [showConfetti, setShowConfetti] = useState(false);
  const [toasts, setToasts] = useState<any[]>([]);

  // Estado de auto-guardado y live sync
  const [liveSyncState, setLiveSyncState] = useState<EstadoLiveSync>({
    estado: 'guardado',
    visibleEnApp: true
  });

  // Historial para undo/redo
  const [historial, setHistorial] = useState<AccionHistorial[]>([]);
  const [historialIndex, setHistorialIndex] = useState(-1);

  // Objetivos del entrenamiento
  const [objetivos, setObjetivos] = useState({
    sesionesPorSemana: 3,
    duracionSesion: 60,
    intensidad: 'media',
    objetivo: 'ganar_masa',
    nivel: 'intermedio'
  });

  const [totalesSemana, setTotalesSemana] = useState({
    sesiones: 12,
    ejercicios: 45,
    duracion: 720,
    calorias: 2400
  });

  const [totalesDia, setTotalesDia] = useState({
    sesiones: 2,
    ejercicios: 8,
    duracion: 120,
    calorias: 400
  });

  // Alertas del sistema
  const [alertas, setAlertas] = useState([
    {
      id: '1',
      tipo: 'intensidad_baja',
      severidad: 'warn',
      mensaje: 'Intensidad baja en la sesión de hoy',
      sesion: { dia: 0, sesion: 'mañana' },
      fix: {
        label: 'Aumentar intensidad',
        action: () => console.log('Fix intensidad')
      }
    }
  ]);

  // Fechas de la semana actual
  const getFechas = () => {
    const inicio = new Date();
    inicio.setDate(inicio.getDate() + (semanaActual - 1) * 7);
    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 6);
    return {
      inicio: inicio.toISOString(),
      fin: fin.toISOString()
    };
  };

  const { inicio: fechaInicio, fin: fechaFin } = getFechas();

  // Cargar entrenamiento inicial
  useEffect(() => {
    const loadEntrenamiento = async () => {
      if (!id) return;

      try {
        const data = await getEntrenamiento(id);
        if (data) {
          setEntrenamiento(data);
          setObjetivos({
            sesionesPorSemana: data.diasPorSemana || 3,
            duracionSesion: 60,
            intensidad: 'media',
            objetivo: data.objetivo || 'ganar_masa',
            nivel: data.nivel || 'intermedio'
          });
        }
      } catch (error) {
        console.error('Error al cargar entrenamiento:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEntrenamiento();
  }, [id]);

  // Auto-save con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (historialIndex >= 0) {
        setLiveSyncState({ estado: 'guardando', visibleEnApp: false });

        // Simular guardado
        setTimeout(() => {
          setLiveSyncState({
            estado: 'guardado',
            visibleEnApp: true,
            ultimoCambio: new Date()
          });
        }, 800);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [historialIndex]);

  // Handlers
  const handleUndo = () => {
    if (historialIndex > 0) {
      const accion = historial[historialIndex];
      accion.deshacer();
      setHistorialIndex(historialIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historialIndex < historial.length - 1) {
      const accion = historial[historialIndex + 1];
      accion.rehacer();
      setHistorialIndex(historialIndex + 1);
    }
  };

  const handleDuplicateWeek = () => {
    console.log('Duplicar semana');
    // Lógica para duplicar la semana actual
  };

  const handleBatchToggle = () => {
    setBatchModeActive(!batchModeActive);
  };

  const handlePrevWeek = () => {
    setSemanaActual(Math.max(1, semanaActual - 1));
  };

  const handleNextWeek = () => {
    setSemanaActual(semanaActual + 1);
  };

  const handleGoToToday = () => {
    setSemanaActual(1); // Volver a la semana actual
  };

  // Funciones para drag & drop
  const handleEjercicioMove = useCallback((ejercicioId: string, fromSlot: string, toSlot: string) => {
    console.log('Moving ejercicio:', ejercicioId, 'from', fromSlot, 'to', toSlot);
    addToast('success', 'Ejercicio movido exitosamente');
  }, []);

  const handleEjercicioAdd = useCallback((ejercicio: any, toSlot: string) => {
    console.log('Adding ejercicio:', ejercicio.nombre, 'to', toSlot);
    addToast('success', `Ejercicio "${ejercicio.nombre}" añadido`);
    setShowConfetti(true);
  }, []);

  // Funciones para micro-interacciones
  const addToast = (type: string, message: string) => {
    const toast = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 3000);
  };

  const handleSuccessAction = useCallback(() => {
    addToast('success', '¡Acción completada exitosamente!');
    setShowConfetti(true);
  }, []);

  const handleErrorAction = useCallback(() => {
    addToast('error', 'Hubo un error al procesar la acción');
  }, []);

  const handleEjercicioSelect = (ejercicio: any) => {
    setEjercicioSeleccionado(ejercicio);
  };

  const handleSesionClick = (dia: number, sesion: string) => {
    console.log('Sesión clicked:', dia, sesion);
  };

  const handleEjercicioAdd = (dia: number, sesion: string, ejercicio: any) => {
    console.log('Añadir ejercicio:', ejercicio.nombre, 'a', dia, sesion);
    setEjercicioSeleccionado(undefined);
  };

  const handleEjercicioEdit = (slotId: string) => {
    console.log('Editar slot:', slotId);
  };

  const handleEjercicioDelete = (slotId: string) => {
    console.log('Eliminar slot:', slotId);
  };

  const handleFixAlerta = (alerta: any) => {
    if (alerta.fix) {
      alerta.fix.action();
    }
  };

  const handleSugerirAjuste = (tipo: 'intensidad' | 'duracion') => {
    console.log('Sugerir ajuste de:', tipo);
    // Lógica para sugerir ajustes de intensidad o duración
  };

  const handleBatchConfirm = (sesion: any, distribuciones: any[]) => {
    console.log('Sesión batch confirmada:', sesion, distribuciones);
    setShowBatchModal(false);
  };

  // Mock: ejercicios disponibles para batch training
  const ejerciciosDisponibles = [
    {
      id: '1',
      nombre: 'Sentadilla con Barra',
      categoria: 'Fuerza',
      musculos: ['Cuádriceps', 'Glúteos'],
      equipamiento: ['Barra', 'Rack'],
      dificultad: 'Intermedio',
      tiempo: 45,
      intensidad: 7,
      calorias: 120
    },
    {
      id: '2',
      nombre: 'Press de Banca',
      categoria: 'Fuerza',
      musculos: ['Pectorales', 'Tríceps'],
      equipamiento: ['Banco', 'Barra'],
      dificultad: 'Intermedio',
      tiempo: 40,
      intensidad: 8,
      calorias: 100
    }
  ];

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          handleUndo();
        } else if (e.key === 'y') {
          e.preventDefault();
          handleRedo();
        } else if (e.key === 'b') {
          e.preventDefault();
          // Abrir pincel de macros
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historialIndex, historial]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-orange-500 border-t-transparent"
          />
          <p className="text-lg font-semibold text-gray-600">Cargando editor...</p>
        </div>
      </div>
    );
  }

  if (!entrenamiento) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">No se pudo cargar el entrenamiento</p>
          <button
            onClick={() => navigate('/dashboard/training/entrenamientos-listado')}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header con acciones principales */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/dashboard/training/entrenamientos-listado')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center gap-4">
                <img
                  src={entrenamiento?.clienteId?.avatar || 'https://i.pravatar.cc/150?img=1'}
                  alt={entrenamiento?.clienteId?.nombre}
                  className="w-16 h-16 rounded-full border-4 border-orange-200 shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {entrenamiento?.clienteId?.nombre || 'Cliente'}
                  </h1>
                  <p className="text-gray-600">
                    {entrenamiento?.titulo || 'Entrenamiento'} • {entrenamiento?.objetivo || 'Objetivo'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  disabled={historialIndex <= 0}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historialIndex >= historial.length - 1}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPlantillasModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <FileText className="w-4 h-4" />
                  Plantillas
                </button>
                
                <button
                  onClick={() => setShowMacroBrushModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Settings className="w-4 h-4" />
                  Ajustes
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevWeek}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <ArrowLeftIcon className="w-4 h-4 text-gray-600" />
                </button>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  Semana {semanaActual}
                </span>
                <button
                  onClick={handleNextWeek}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={handleGoToToday}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-semibold"
                >
                  Hoy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout principal: 3 paneles */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel izquierdo: Catálogo de ejercicios */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ejercicios</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar ejercicios..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {ejerciciosDisponibles.map((ejercicio) => (
                <div
                  key={ejercicio.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
                  onClick={() => handleEjercicioSelect(ejercicio)}
                >
                  <h4 className="font-semibold text-gray-900">{ejercicio.nombre}</h4>
                  <p className="text-sm text-gray-600">{ejercicio.categoria}</p>
                  <div className="flex gap-1 mt-1">
                    {ejercicio.musculos.slice(0, 2).map((musculo) => (
                      <span key={musculo} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {musculo}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel central: Grid de semana */}
        <div className="flex-1 bg-white">
          <div className="p-6">
            <div className="grid grid-cols-7 gap-4 mb-6">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, index) => (
                <div key={dia} className="text-center">
                  <div className="text-sm font-semibold text-gray-600 mb-2">{dia}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {new Date().getDate() + index}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 }, (_, dia) => (
                <div key={dia} className="space-y-2">
                  {['Mañana', 'Tarde'].map((sesion) => (
                    <div
                      key={sesion}
                      className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer transition-all min-h-32"
                      onClick={() => handleSesionClick(dia, sesion)}
                    >
                      <div className="text-sm font-semibold text-gray-600 mb-2">{sesion}</div>
                      <div className="text-xs text-gray-500">Arrastra ejercicios aquí</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel derecho: Totales y alertas */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen</h3>
            
            {/* Totales del día */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-700">Hoy</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sesiones:</span>
                  <span className="font-semibold">{totalesDia.sesiones}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ejercicios:</span>
                  <span className="font-semibold">{totalesDia.ejercicios}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duración:</span>
                  <span className="font-semibold">{totalesDia.duracion} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Calorías:</span>
                  <span className="font-semibold">{totalesDia.calorias}</span>
                </div>
              </div>
            </div>
            
            {/* Totales de la semana */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-700">Esta Semana</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sesiones:</span>
                  <span className="font-semibold">{totalesSemana.sesiones}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ejercicios:</span>
                  <span className="font-semibold">{totalesSemana.ejercicios}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duración:</span>
                  <span className="font-semibold">{totalesSemana.duracion} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Calorías:</span>
                  <span className="font-semibold">{totalesSemana.calorias}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Alertas */}
          <div className="flex-1 p-4">
            <h4 className="font-semibold text-gray-700 mb-3">Alertas</h4>
            <div className="space-y-2">
              {alertas.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-3 rounded-lg border ${
                    alerta.severidad === 'error' ? 'bg-red-50 border-red-200' :
                    alerta.severidad === 'warn' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold text-gray-900">{alerta.mensaje}</span>
                  </div>
                  {alerta.fix && (
                    <button
                      onClick={() => handleFixAlerta(alerta)}
                      className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      {alerta.fix.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons para herramientas avanzadas */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
          title="Ajustar Intensidad"
        >
          <Settings className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
          title="Sustituciones"
        >
          <RefreshCw className="w-6 h-6" />
        </motion.button>

        {batchModeActive && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowBatchModal(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
            title="Planificar Entrenamiento"
          >
            <Dumbbell className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {/* Floating Action Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMetricsDashboard(true)}
        className="fixed bottom-8 left-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
        title="Ver Métricas"
      >
        <BarChart3 className="w-6 h-6" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowVisualGallery(true)}
        className="fixed bottom-8 left-24 w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
        title="Galería Visual"
      >
        <Eye className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCalendarView(true)}
        className="fixed top-20 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
        title="Vista Calendario"
      >
        <Calendar className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowNotesSystem(true)}
        className="fixed top-20 right-24 w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
        title="Sistema de Notas"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSmartSearch(true)}
        className="fixed top-20 left-8 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
        title="Búsqueda Inteligente"
      >
        <Search className="w-6 h-6" />
      </motion.button>

      {/* Dashboard de Métricas */}
      {showMetricsDashboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Métricas de Seguimiento</h2>
              <button
                onClick={() => setShowMetricsDashboard(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <DashboardAnalytics
                entrenamientoId={id || ''}
                periodo="semana"
                onPeriodoChange={(periodo) => console.log('Período cambiado:', periodo)}
                modo="completo"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast notifications */}
      {toasts.map(toast => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500 text-white' :
            toast.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}
        >
          {toast.message}
        </motion.div>
      ))}
    </div>
  );
};

export default EntrenamientoEdicionPage;





