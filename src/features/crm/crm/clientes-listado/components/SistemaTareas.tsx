import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Star, 
  Filter, 
  Search, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  Target,
  Activity,
  Bell,
  Zap,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Heart,
  MessageCircle,
  FileText,
  Download,
  Upload,
  Share2,
  Archive,
  Flag
} from 'lucide-react';

interface SistemaTareasProps {
  onTareaSelect: (tarea: Tarea) => void;
  onTareaCreate: (tarea: Partial<Tarea>) => void;
  onTareaUpdate: (id: string, tarea: Partial<Tarea>) => void;
  onTareaDelete: (id: string) => void;
  onTareaComplete: (id: string) => void;
}

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'llamada' | 'email' | 'reunion' | 'seguimiento' | 'recordatorio' | 'tarea_general';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  estado: 'pendiente' | 'en_progreso' | 'completada' | 'cancelada';
  clienteId: string;
  clienteNombre: string;
  asignadoA: string;
  fechaCreacion: string;
  fechaVencimiento: string;
  fechaCompletada?: string;
  notas: string[];
  archivos: ArchivoTarea[];
  subtareas: Subtarea[];
  etiquetas: string[];
  recordatorios: Recordatorio[];
  metricas: {
    tiempoEstimado: number;
    tiempoReal: number;
    complejidad: number;
    satisfaccion: number;
  };
}

interface Subtarea {
  id: string;
  titulo: string;
  completada: boolean;
  fechaCompletada?: string;
}

interface ArchivoTarea {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  url: string;
}

interface Recordatorio {
  id: string;
  fecha: string;
  tipo: 'email' | 'sms' | 'push' | 'sistema';
  enviado: boolean;
}

const SistemaTareas: React.FC<SistemaTareasProps> = ({
  onTareaSelect,
  onTareaCreate,
  onTareaUpdate,
  onTareaDelete,
  onTareaComplete
}) => {
  const [activeView, setActiveView] = useState<'tareas' | 'actividades' | 'metricas' | 'configuracion'>('tareas');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'pendiente' | 'en_progreso' | 'completada' | 'cancelada'>('todos');
  const [filtroPrioridad, setFiltroPrioridad] = useState<'todos' | 'baja' | 'media' | 'alta' | 'urgente'>('todos');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'llamada' | 'email' | 'reunion' | 'seguimiento' | 'recordatorio' | 'tarea_general'>('todos');
  const [showCrearTarea, setShowCrearTarea] = useState(false);

  // Datos mock para demostración
  const tareas: Tarea[] = [
    {
      id: '1',
      titulo: 'Llamada de seguimiento - Cliente Premium',
      descripcion: 'Realizar llamada de seguimiento para verificar satisfacción del cliente premium',
      tipo: 'llamada',
      prioridad: 'alta',
      estado: 'pendiente',
      clienteId: '1',
      clienteNombre: 'Elena García',
      asignadoA: 'Juan Pérez',
      fechaCreacion: '2024-01-15 09:00',
      fechaVencimiento: '2024-01-16 17:00',
      notas: [
        'Cliente ha mostrado interés en servicios adicionales',
        'Mencionar nueva promoción de verano'
      ],
      archivos: [
        { id: '1', nombre: 'propuesta_servicios.pdf', tipo: 'pdf', tamaño: 1024, url: '#' }
      ],
      subtareas: [
        { id: '1', titulo: 'Preparar propuesta personalizada', completada: true, fechaCompletada: '2024-01-15 10:30' },
        { id: '2', titulo: 'Revisar historial del cliente', completada: false },
        { id: '3', titulo: 'Preparar preguntas específicas', completada: false }
      ],
      etiquetas: ['seguimiento', 'premium', 'ventas'],
      recordatorios: [
        { id: '1', fecha: '2024-01-16 09:00', tipo: 'email', enviado: false },
        { id: '2', fecha: '2024-01-16 14:00', tipo: 'sms', enviado: false }
      ],
      metricas: {
        tiempoEstimado: 30,
        tiempoReal: 0,
        complejidad: 3,
        satisfaccion: 0
      }
    },
    {
      id: '2',
      titulo: 'Envío de encuesta de satisfacción',
      descripcion: 'Enviar encuesta de satisfacción a clientes que completaron el programa',
      tipo: 'email',
      prioridad: 'media',
      estado: 'en_progreso',
      clienteId: '2',
      clienteNombre: 'Carlos López',
      asignadoA: 'María Rodríguez',
      fechaCreacion: '2024-01-14 14:30',
      fechaVencimiento: '2024-01-17 12:00',
      notas: [
        'Usar plantilla personalizada para este cliente',
        'Incluir código de descuento del 10%'
      ],
      archivos: [],
      subtareas: [
        { id: '1', titulo: 'Personalizar plantilla de email', completada: true, fechaCompletada: '2024-01-15 08:00' },
        { id: '2', titulo: 'Configurar envío automático', completada: false },
        { id: '3', titulo: 'Programar seguimiento', completada: false }
      ],
      etiquetas: ['satisfaccion', 'email', 'automatizacion'],
      recordatorios: [
        { id: '1', fecha: '2024-01-17 09:00', tipo: 'sistema', enviado: false }
      ],
      metricas: {
        tiempoEstimado: 15,
        tiempoReal: 5,
        complejidad: 2,
        satisfaccion: 0
      }
    },
    {
      id: '3',
      titulo: 'Reunión de revisión mensual',
      descripcion: 'Reunión con cliente para revisar progreso y ajustar objetivos',
      tipo: 'reunion',
      prioridad: 'alta',
      estado: 'completada',
      clienteId: '3',
      clienteNombre: 'Ana Martínez',
      asignadoA: 'Pedro González',
      fechaCreacion: '2024-01-10 10:00',
      fechaVencimiento: '2024-01-15 16:00',
      fechaCompletada: '2024-01-15 15:30',
      notas: [
        'Cliente muy satisfecho con los resultados',
        'Solicita aumentar frecuencia de sesiones',
        'Renovar contrato por 6 meses más'
      ],
      archivos: [
        { id: '1', nombre: 'informe_progreso.pdf', tipo: 'pdf', tamaño: 2048, url: '#' },
        { id: '2', nombre: 'nuevos_objetivos.docx', tipo: 'docx', tamaño: 512, url: '#' }
      ],
      subtareas: [
        { id: '1', titulo: 'Preparar informe de progreso', completada: true, fechaCompletada: '2024-01-14 12:00' },
        { id: '2', titulo: 'Definir nuevos objetivos', completada: true, fechaCompletada: '2024-01-15 09:00' },
        { id: '3', titulo: 'Enviar resumen de la reunión', completada: true, fechaCompletada: '2024-01-15 16:30' }
      ],
      etiquetas: ['reunion', 'revision', 'objetivos'],
      recordatorios: [
        { id: '1', fecha: '2024-01-15 14:00', tipo: 'email', enviado: true }
      ],
      metricas: {
        tiempoEstimado: 60,
        tiempoReal: 90,
        complejidad: 4,
        satisfaccion: 5
      }
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'llamada': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'reunion': return <Users className="w-4 h-4" />;
      case 'seguimiento': return <Target className="w-4 h-4" />;
      case 'recordatorio': return <Bell className="w-4 h-4" />;
      case 'tarea_general': return <CheckSquare className="w-4 h-4" />;
      default: return <CheckSquare className="w-4 h-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'llamada': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'reunion': return 'bg-purple-100 text-purple-800';
      case 'seguimiento': return 'bg-orange-100 text-orange-800';
      case 'recordatorio': return 'bg-yellow-100 text-yellow-800';
      case 'tarea_general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'urgente': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completada': return 'bg-green-100 text-green-800';
      case 'en_progreso': return 'bg-blue-100 text-blue-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completada': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'en_progreso': return <Play className="w-4 h-4 text-blue-600" />;
      case 'pendiente': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelada': return <X className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const TareasView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Tareas y Actividades</h3>
        <button
          onClick={() => setShowCrearTarea(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Tarea
        </button>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Tareas</p>
              <p className="text-2xl font-bold text-blue-900">{tareas.length}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completadas</p>
              <p className="text-2xl font-bold text-green-900">
                {tareas.filter(t => t.estado === 'completada').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-900">
                {tareas.filter(t => t.estado === 'pendiente').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Urgentes</p>
              <p className="text-2xl font-bold text-red-900">
                {tareas.filter(t => t.prioridad === 'urgente').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendientes</option>
          <option value="en_progreso">En Progreso</option>
          <option value="completada">Completadas</option>
          <option value="cancelada">Canceladas</option>
        </select>
        <select
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todos">Todas las prioridades</option>
          <option value="urgente">Urgente</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todos">Todos los tipos</option>
          <option value="llamada">Llamadas</option>
          <option value="email">Emails</option>
          <option value="reunion">Reuniones</option>
          <option value="seguimiento">Seguimiento</option>
          <option value="recordatorio">Recordatorios</option>
          <option value="tarea_general">Tareas Generales</option>
        </select>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-4">
        {tareas
          .filter(t => filtroEstado === 'todos' || t.estado === filtroEstado)
          .filter(t => filtroPrioridad === 'todos' || t.prioridad === filtroPrioridad)
          .filter(t => filtroTipo === 'todos' || t.tipo === filtroTipo)
          .map((tarea) => (
            <motion.div
              key={tarea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${getTipoColor(tarea.tipo)}`}>
                    {getTipoIcon(tarea.tipo)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{tarea.titulo}</h4>
                    <p className="text-sm text-gray-600">{tarea.descripcion}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Cliente: {tarea.clienteNombre} • Asignado a: {tarea.asignadoA}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(tarea.tipo)}`}>
                    {tarea.tipo}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioridadColor(tarea.prioridad)}`}>
                    {tarea.prioridad}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(tarea.estado)}`}>
                    {tarea.estado}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Tiempo Estimado</p>
                  <p className="text-lg font-bold text-gray-900">{tarea.metricas.tiempoEstimado}min</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Subtareas</p>
                  <p className="text-lg font-bold text-blue-900">
                    {tarea.subtareas.filter(s => s.completada).length}/{tarea.subtareas.length}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Archivos</p>
                  <p className="text-lg font-bold text-green-900">{tarea.archivos.length}</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-600">Complejidad</p>
                  <p className="text-lg font-bold text-purple-900">{tarea.metricas.complejidad}/5</p>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Etiquetas</h5>
                <div className="flex flex-wrap gap-2">
                  {tarea.etiquetas.map((etiqueta, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                    >
                      {etiqueta}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Vence: {new Date(tarea.fechaVencimiento).toLocaleString()}
                  </span>
                  {tarea.estado === 'completada' && tarea.fechaCompletada && (
                    <span className="text-sm text-green-600">
                      Completada: {new Date(tarea.fechaCompletada).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTareaSelect(tarea)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {tarea.estado !== 'completada' && (
                    <button
                      onClick={() => onTareaComplete(tarea.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onTareaUpdate(tarea.id, tarea)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onTareaDelete(tarea.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Sistema de Tareas</h2>
            <p className="text-sm text-gray-600">Gestión de tareas y actividades de clientes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'tareas', label: 'Tareas', icon: CheckSquare },
          { id: 'actividades', label: 'Actividades', icon: Activity },
          { id: 'metricas', label: 'Métricas', icon: BarChart3 },
          { id: 'configuracion', label: 'Configuración', icon: Settings },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === view.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Contenido de la vista activa */}
      {activeView === 'tareas' && <TareasView />}
      {activeView === 'actividades' && <div>Vista de Actividades (en desarrollo)</div>}
      {activeView === 'metricas' && <div>Vista de Métricas (en desarrollo)</div>}
      {activeView === 'configuracion' && <div>Vista de Configuración (en desarrollo)</div>}
    </div>
  );
};

export default SistemaTareas;

