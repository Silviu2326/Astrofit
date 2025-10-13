import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Target,
  Dumbbell,
  Heart,
  Flame,
  Zap,
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Calendar,
  FileText,
  Camera,
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Save,
  Send,
  Edit,
  Trash2,
  Copy,
  Download,
  Share,
  Bookmark,
  Tag,
  Filter,
  Search,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Bell,
  Timer,
  Users,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Smile,
  Frown,
  Meh,
  ThumbsUp as Like,
  ThumbsDown as Dislike,
  Heart as Love,
  Flame as Fire,
  Zap as Lightning,
  Award as Trophy,
  Star as Rating,
  Target as Goal,
  Dumbbell as Weight,
  Activity as Pulse,
  BarChart3 as Chart,
  TrendingUp as Up,
  TrendingDown as Down,
} from 'lucide-react';

// Interfaces
interface NotaPostEntrenamiento {
  id: string;
  sesionId: string;
  fecha: Date;
  entrenador: {
    id: string;
    nombre: string;
    avatar: string;
  };
  cliente: {
    id: string;
    nombre: string;
    avatar: string;
  };
  tipo: 'feedback' | 'motivacion' | 'tecnica' | 'alerta' | 'progreso' | 'lesion' | 'nutricion' | 'general';
  titulo: string;
  contenido: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  estado: 'nuevo' | 'leido' | 'respondido' | 'archivado';
  etiquetas: string[];
  archivos: {
    id: string;
    nombre: string;
    tipo: 'imagen' | 'video' | 'audio' | 'documento';
    url: string;
    tamaño: number;
    fecha: Date;
  }[];
  respuestas: {
    id: string;
    autor: string;
    contenido: string;
    fecha: Date;
    tipo: 'entrenador' | 'cliente' | 'sistema';
  }[];
  metricas: {
    valoracion: number; // 1-5
    sensacionEsfuerzo: number; // 1-10 RPE
    satisfaccion: number; // 1-10
    dolor: number; // 1-10
    energia: number; // 1-10
    motivacion: number; // 1-10
  };
  seguimiento: {
    requiereAccion: boolean;
    fechaLimite?: Date;
    responsable: string;
    completado: boolean;
    fechaCompletado?: Date;
  };
  privacidad: {
    visibleParaCliente: boolean;
    visibleParaEntrenador: boolean;
    visibleParaEquipo: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface NotasPostEntrenamientoProps {
  entrenamientoId: string;
  sesionId?: string;
  clienteId: string;
  entrenadorId: string;
  onNotaCreate: (nota: Omit<NotaPostEntrenamiento, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onNotaUpdate: (notaId: string, actualizaciones: Partial<NotaPostEntrenamiento>) => void;
  onNotaDelete: (notaId: string) => void;
  modo: 'vista' | 'edicion' | 'completo';
}

const NotasPostEntrenamiento: React.FC<NotasPostEntrenamientoProps> = ({
  entrenamientoId,
  sesionId,
  clienteId,
  entrenadorId,
  onNotaCreate,
  onNotaUpdate,
  onNotaDelete,
  modo
}) => {
  const [notas, setNotas] = useState<NotaPostEntrenamiento[]>([]);
  const [filtros, setFiltros] = useState({
    tipo: '',
    prioridad: '',
    estado: '',
    fecha: '',
    etiqueta: ''
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState<NotaPostEntrenamiento | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState<'crear' | 'editar'>('crear');
  const [grabandoAudio, setGrabandoAudio] = useState(false);
  const [mostrarMetricas, setMostrarMetricas] = useState(false);

  // Formulario de nota
  const [formulario, setFormulario] = useState({
    tipo: 'feedback' as const,
    titulo: '',
    contenido: '',
    prioridad: 'media' as const,
    etiquetas: [] as string[],
    metricas: {
      valoracion: 5,
      sensacionEsfuerzo: 5,
      satisfaccion: 5,
      dolor: 1,
      energia: 5,
      motivacion: 5
    },
    seguimiento: {
      requiereAccion: false,
      fechaLimite: '',
      responsable: ''
    },
    privacidad: {
      visibleParaCliente: true,
      visibleParaEntrenador: true,
      visibleParaEquipo: false
    }
  });

  // Mock data
  useEffect(() => {
    const notasMock: NotaPostEntrenamiento[] = [
      {
        id: '1',
        sesionId: 'sesion-1',
        fecha: new Date(),
        entrenador: {
          id: 'entrenador-1',
          nombre: 'Carlos Trainer',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        cliente: {
          id: 'cliente-1',
          nombre: 'Juan Pérez',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        tipo: 'feedback',
        titulo: 'Excelente progreso en sentadillas',
        contenido: 'Juan mostró una mejora notable en la técnica de sentadillas. Logró completar todas las series con el peso objetivo. Recomiendo incrementar 2.5kg para la próxima sesión.',
        prioridad: 'media',
        estado: 'nuevo',
        etiquetas: ['progreso', 'técnica', 'sentadillas'],
        archivos: [],
        respuestas: [],
        metricas: {
          valoracion: 5,
          sensacionEsfuerzo: 7,
          satisfaccion: 8,
          dolor: 2,
          energia: 6,
          motivacion: 9
        },
        seguimiento: {
          requiereAccion: true,
          fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          responsable: 'Carlos Trainer',
          completado: false
        },
        privacidad: {
          visibleParaCliente: true,
          visibleParaEntrenador: true,
          visibleParaEquipo: false
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        sesionId: 'sesion-2',
        fecha: new Date(Date.now() - 24 * 60 * 60 * 1000),
        entrenador: {
          id: 'entrenador-1',
          nombre: 'Carlos Trainer',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        cliente: {
          id: 'cliente-1',
          nombre: 'Juan Pérez',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        tipo: 'alerta',
        titulo: 'Molestia en hombro derecho',
        contenido: 'Juan reportó una leve molestia en el hombro derecho durante el press de banca. Reduje el peso y ajusté el rango de movimiento. Recomiendo consultar con fisioterapeuta.',
        prioridad: 'alta',
        estado: 'leido',
        etiquetas: ['lesión', 'hombro', 'prevención'],
        archivos: [],
        respuestas: [
          {
            id: 'resp-1',
            autor: 'Juan Pérez',
            contenido: 'Gracias por la observación. Voy a programar cita con el fisio esta semana.',
            fecha: new Date(Date.now() - 12 * 60 * 60 * 1000),
            tipo: 'cliente'
          }
        ],
        metricas: {
          valoracion: 3,
          sensacionEsfuerzo: 6,
          satisfaccion: 4,
          dolor: 6,
          energia: 4,
          motivacion: 7
        },
        seguimiento: {
          requiereAccion: true,
          fechaLimite: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          responsable: 'Juan Pérez',
          completado: false
        },
        privacidad: {
          visibleParaCliente: true,
          visibleParaEntrenador: true,
          visibleParaEquipo: true
        },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
      }
    ];
    setNotas(notasMock);
  }, [entrenamientoId, sesionId]);

  // Filtrar notas
  const notasFiltradas = notas.filter(nota => {
    const coincideTipo = !filtros.tipo || nota.tipo === filtros.tipo;
    const coincidePrioridad = !filtros.prioridad || nota.prioridad === filtros.prioridad;
    const coincideEstado = !filtros.estado || nota.estado === filtros.estado;
    const coincideEtiqueta = !filtros.etiqueta || nota.etiquetas.includes(filtros.etiqueta);
    
    return coincideTipo && coincidePrioridad && coincideEstado && coincideEtiqueta;
  });

  // Crear nueva nota
  const crearNota = () => {
    const nuevaNota: Omit<NotaPostEntrenamiento, 'id' | 'createdAt' | 'updatedAt'> = {
      sesionId: sesionId || '',
      fecha: new Date(),
      entrenador: {
        id: entrenadorId,
        nombre: 'Carlos Trainer',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      cliente: {
        id: clienteId,
        nombre: 'Juan Pérez',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      tipo: formulario.tipo,
      titulo: formulario.titulo,
      contenido: formulario.contenido,
      prioridad: formulario.prioridad,
      etiquetas: formulario.etiquetas,
      archivos: [],
      respuestas: [],
      metricas: formulario.metricas,
      seguimiento: {
        ...formulario.seguimiento,
        fechaLimite: formulario.seguimiento.fechaLimite ? new Date(formulario.seguimiento.fechaLimite) : undefined
      },
      privacidad: formulario.privacidad
    };

    onNotaCreate(nuevaNota);
    setMostrarFormulario(false);
    resetearFormulario();
  };

  // Resetear formulario
  const resetearFormulario = () => {
    setFormulario({
      tipo: 'feedback',
      titulo: '',
      contenido: '',
      prioridad: 'media',
      etiquetas: [],
      metricas: {
        valoracion: 5,
        sensacionEsfuerzo: 5,
        satisfaccion: 5,
        dolor: 1,
        energia: 5,
        motivacion: 5
      },
      seguimiento: {
        requiereAccion: false,
        fechaLimite: '',
        responsable: ''
      },
      privacidad: {
        visibleParaCliente: true,
        visibleParaEntrenador: true,
        visibleParaEquipo: false
      }
    });
  };

  // Obtener color por tipo
  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      feedback: 'bg-blue-100 text-blue-800 border-blue-300',
      motivacion: 'bg-green-100 text-green-800 border-green-300',
      tecnica: 'bg-purple-100 text-purple-800 border-purple-300',
      alerta: 'bg-red-100 text-red-800 border-red-300',
      progreso: 'bg-orange-100 text-orange-800 border-orange-300',
      lesion: 'bg-red-100 text-red-800 border-red-300',
      nutricion: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      general: 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  // Obtener color por prioridad
  const getPrioridadColor = (prioridad: string) => {
    const colors: Record<string, string> = {
      baja: 'bg-gray-100 text-gray-800',
      media: 'bg-yellow-100 text-yellow-800',
      alta: 'bg-orange-100 text-orange-800',
      urgente: 'bg-red-100 text-red-800'
    };
    return colors[prioridad] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notas Post-Entrenamiento</h2>
            <p className="text-gray-600">Seguimiento y comunicación con el cliente</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMostrarFormulario(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Nueva Nota
            </button>
            
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{notas.length}</p>
            <p className="text-sm text-gray-600">Total Notas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{notas.filter(n => n.estado === 'nuevo').length}</p>
            <p className="text-sm text-gray-600">Nuevas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{notas.filter(n => n.seguimiento.completado).length}</p>
            <p className="text-sm text-gray-600">Completadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{notas.filter(n => n.prioridad === 'urgente').length}</p>
            <p className="text-sm text-gray-600">Urgentes</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <AnimatePresence>
        {mostrarFiltros && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
                <select
                  value={filtros.tipo}
                  onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="feedback">Feedback</option>
                  <option value="motivacion">Motivación</option>
                  <option value="tecnica">Técnica</option>
                  <option value="alerta">Alerta</option>
                  <option value="progreso">Progreso</option>
                  <option value="lesion">Lesión</option>
                  <option value="nutricion">Nutrición</option>
                  <option value="general">General</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prioridad</label>
                <select
                  value={filtros.prioridad}
                  onChange={(e) => setFiltros({ ...filtros, prioridad: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todas</option>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="leido">Leído</option>
                  <option value="respondido">Respondido</option>
                  <option value="archivado">Archivado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Etiqueta</label>
                <select
                  value={filtros.etiqueta}
                  onChange={(e) => setFiltros({ ...filtros, etiqueta: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todas</option>
                  <option value="progreso">Progreso</option>
                  <option value="técnica">Técnica</option>
                  <option value="lesión">Lesión</option>
                  <option value="motivación">Motivación</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de notas */}
      <div className="space-y-4">
        {notasFiltradas.map((nota) => (
          <motion.div
            key={nota.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setNotaSeleccionada(nota)}
          >
            <div className="p-6">
              {/* Header de la nota */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={nota.entrenador.avatar}
                    alt={nota.entrenador.nombre}
                    className="w-12 h-12 rounded-full border-2 border-orange-200"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{nota.titulo}</h3>
                    <p className="text-sm text-gray-600">
                      {nota.entrenador.nombre} • {nota.fecha.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getTipoColor(nota.tipo)}`}>
                    {nota.tipo}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getPrioridadColor(nota.prioridad)}`}>
                    {nota.prioridad}
                  </span>
                </div>
              </div>

              {/* Contenido de la nota */}
              <p className="text-gray-700 mb-4 line-clamp-3">{nota.contenido}</p>

              {/* Métricas */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Valoración</p>
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < nota.metricas.valoracion ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Esfuerzo</p>
                  <p className="text-lg font-bold text-orange-600">{nota.metricas.sensacionEsfuerzo}/10</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Satisfacción</p>
                  <p className="text-lg font-bold text-green-600">{nota.metricas.satisfaccion}/10</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Dolor</p>
                  <p className="text-lg font-bold text-red-600">{nota.metricas.dolor}/10</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Energía</p>
                  <p className="text-lg font-bold text-blue-600">{nota.metricas.energia}/10</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Motivación</p>
                  <p className="text-lg font-bold text-purple-600">{nota.metricas.motivacion}/10</p>
                </div>
              </div>

              {/* Etiquetas y acciones */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {nota.etiquetas.map((etiqueta) => (
                    <span key={etiqueta} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {etiqueta}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  {nota.seguimiento.requiereAccion && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      Requiere Acción
                    </span>
                  )}
                  {nota.respuestas.length > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {nota.respuestas.length} respuesta{nota.respuestas.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Formulario de nueva nota */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setMostrarFormulario(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header del formulario */}
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Nueva Nota Post-Entrenamiento</h2>
                    <p className="text-orange-100">Registra observaciones y seguimiento del cliente</p>
                  </div>
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Contenido del formulario */}
              <div className="p-6 space-y-6">
                {/* Información básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Nota
                    </label>
                    <select
                      value={formulario.tipo}
                      onChange={(e) => setFormulario({ ...formulario, tipo: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="feedback">Feedback</option>
                      <option value="motivacion">Motivación</option>
                      <option value="tecnica">Técnica</option>
                      <option value="alerta">Alerta</option>
                      <option value="progreso">Progreso</option>
                      <option value="lesion">Lesión</option>
                      <option value="nutricion">Nutrición</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={formulario.prioridad}
                      onChange={(e) => setFormulario({ ...formulario, prioridad: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>
                </div>

                {/* Título y contenido */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={formulario.titulo}
                    onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Resumen de la observación..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contenido
                  </label>
                  <textarea
                    value={formulario.contenido}
                    onChange={(e) => setFormulario({ ...formulario, contenido: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={4}
                    placeholder="Describe en detalle la observación, recomendaciones, etc..."
                  />
                </div>

                {/* Métricas del cliente */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Métricas del Cliente</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Valoración General (1-5)
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((valor) => (
                          <button
                            key={valor}
                            onClick={() => setFormulario({ ...formulario, metricas: { ...formulario.metricas, valoracion: valor } })}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              valor <= formulario.metricas.valoracion
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            <Star className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sensación de Esfuerzo (RPE 1-10)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formulario.metricas.sensacionEsfuerzo}
                        onChange={(e) => setFormulario({ ...formulario, metricas: { ...formulario.metricas, sensacionEsfuerzo: parseInt(e.target.value) } })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>1 - Muy Fácil</span>
                        <span>10 - Máximo</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Satisfacción (1-10)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formulario.metricas.satisfaccion}
                        onChange={(e) => setFormulario({ ...formulario, metricas: { ...formulario.metricas, satisfaccion: parseInt(e.target.value) } })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Seguimiento */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Seguimiento</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formulario.seguimiento.requiereAccion}
                        onChange={(e) => setFormulario({ ...formulario, seguimiento: { ...formulario.seguimiento, requiereAccion: e.target.checked } })}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label className="text-sm font-semibold text-gray-700">
                        Requiere acción de seguimiento
                      </label>
                    </div>
                    
                    {formulario.seguimiento.requiereAccion && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Fecha Límite
                          </label>
                          <input
                            type="date"
                            value={formulario.seguimiento.fechaLimite}
                            onChange={(e) => setFormulario({ ...formulario, seguimiento: { ...formulario.seguimiento, fechaLimite: e.target.value } })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Responsable
                          </label>
                          <input
                            type="text"
                            value={formulario.seguimiento.responsable}
                            onChange={(e) => setFormulario({ ...formulario, seguimiento: { ...formulario.seguimiento, responsable: e.target.value } })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Nombre del responsable"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={crearNota}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Crear Nota
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotasPostEntrenamiento;







