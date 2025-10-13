import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  Send, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Clock, 
  User, 
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
  FileText,
  Download,
  Upload,
  Share2,
  Archive,
  Flag,
  Smile,
  Image,
  Paperclip,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MoreHorizontal,
  Reply,
  Forward,
  Bookmark,
  Tag,
  AtSign,
  Hash,
  Link,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Table,
  File,
  Folder,
  Lock,
  Unlock,
  EyeOff,
  Copy,
  Cut,
  Paste,
  Undo,
  Redo,
  Save,
  Print,
  Maximize,
  Minimize,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Grid,
  Map,
  Navigation,
  Compass,
  Globe,
  Wifi,
  WifiOff,
  Signal,
  Battery,
  Volume2,
  VolumeX,
  Volume1,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Shuffle,
  Repeat,
  Repeat1,
  ThumbsUp,
  ThumbsDown,
  Question,
  Exclamation,
  Info,
  Warning,
  Loader2,
  MoreHorizontal as More,
  Minus,
  Equal,
  NotEqual,
  Greater,
  GreaterEqual,
  LessEqual
} from 'lucide-react';

interface ComunicacionIntegradaProps {
  onMensajeEnviar: (mensaje: Mensaje) => void;
  onCanalSeleccionar: (canal: CanalComunicacion) => void;
  onPlantillaUsar: (plantilla: PlantillaComunicacion) => void;
  onCampañaCrear: (campaña: CampañaComunicacion) => void;
}

interface Mensaje {
  id: string;
  tipo: 'email' | 'sms' | 'whatsapp' | 'push' | 'in_app';
  destinatario: string;
  asunto?: string;
  contenido: string;
  estado: 'borrador' | 'programado' | 'enviado' | 'entregado' | 'leido' | 'respondido' | 'fallido';
  fechaCreacion: string;
  fechaEnvio?: string;
  fechaEntrega?: string;
  fechaLectura?: string;
  fechaRespuesta?: string;
  plantilla?: string;
  archivos: ArchivoMensaje[];
  etiquetas: string[];
  metricas: {
    entregado: boolean;
    abierto: boolean;
    clickeado: boolean;
    respondido: boolean;
    tiempoRespuesta?: number;
  };
}

interface CanalComunicacion {
  id: string;
  nombre: string;
  tipo: 'email' | 'sms' | 'whatsapp' | 'push' | 'in_app';
  activo: boolean;
  configuracion: any;
  metricas: {
    mensajesEnviados: number;
    tasaEntrega: number;
    tasaApertura: number;
    tasaRespuesta: number;
  };
}

interface PlantillaComunicacion {
  id: string;
  nombre: string;
  tipo: string;
  categoria: string;
  contenido: string;
  variables: string[];
  activa: boolean;
  uso: number;
}

interface CampañaComunicacion {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'masiva' | 'segmentada' | 'automatizada';
  estado: 'borrador' | 'programada' | 'enviando' | 'enviada' | 'pausada' | 'cancelada';
  destinatarios: number;
  enviados: number;
  entregados: number;
  abiertos: number;
  clickeados: number;
  respuestas: number;
  fechaCreacion: string;
  fechaEnvio?: string;
  fechaFinalizacion?: string;
}

interface ArchivoMensaje {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  url: string;
}

const ComunicacionIntegrada: React.FC<ComunicacionIntegradaProps> = ({
  onMensajeEnviar,
  onCanalSeleccionar,
  onPlantillaUsar,
  onCampañaCrear
}) => {
  const [activeView, setActiveView] = useState<'mensajes' | 'canales' | 'plantillas' | 'campañas' | 'metricas'>('mensajes');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'email' | 'sms' | 'whatsapp' | 'push' | 'in_app'>('todos');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'borrador' | 'programado' | 'enviado' | 'entregado' | 'leido' | 'respondido' | 'fallido'>('todos');
  const [showCrearMensaje, setShowCrearMensaje] = useState(false);

  // Datos mock para demostración
  const mensajes: Mensaje[] = [
    {
      id: '1',
      tipo: 'email',
      destinatario: 'elena.garcia@email.com',
      asunto: 'Seguimiento de tu progreso',
      contenido: 'Hola Elena, espero que estés bien. Te escribo para hacer seguimiento de tu progreso...',
      estado: 'leido',
      fechaCreacion: '2024-01-15 09:00',
      fechaEnvio: '2024-01-15 09:05',
      fechaEntrega: '2024-01-15 09:06',
      fechaLectura: '2024-01-15 10:30',
      plantilla: 'seguimiento_progreso',
      archivos: [
        { id: '1', nombre: 'informe_progreso.pdf', tipo: 'pdf', tamaño: 1024, url: '#' }
      ],
      etiquetas: ['seguimiento', 'progreso', 'cliente_premium'],
      metricas: {
        entregado: true,
        abierto: true,
        clickeado: true,
        respondido: false,
        tiempoRespuesta: 0
      }
    },
    {
      id: '2',
      tipo: 'sms',
      destinatario: '+34 666 123 456',
      contenido: 'Recordatorio: Tu sesión de entrenamiento es mañana a las 10:00 AM. ¡Nos vemos pronto!',
      estado: 'entregado',
      fechaCreacion: '2024-01-15 14:30',
      fechaEnvio: '2024-01-15 14:32',
      fechaEntrega: '2024-01-15 14:33',
      etiquetas: ['recordatorio', 'sesion', 'entrenamiento'],
      metricas: {
        entregado: true,
        abierto: true,
        clickeado: false,
        respondido: false,
        tiempoRespuesta: 0
      }
    },
    {
      id: '3',
      tipo: 'whatsapp',
      destinatario: '+34 666 789 012',
      contenido: '¡Hola Carlos! 👋 ¿Cómo te ha ido con el plan nutricional esta semana?',
      estado: 'respondido',
      fechaCreacion: '2024-01-14 16:00',
      fechaEnvio: '2024-01-14 16:02',
      fechaEntrega: '2024-01-14 16:03',
      fechaLectura: '2024-01-14 16:05',
      fechaRespuesta: '2024-01-14 16:15',
      etiquetas: ['whatsapp', 'nutricion', 'seguimiento'],
      metricas: {
        entregado: true,
        abierto: true,
        clickeado: true,
        respondido: true,
        tiempoRespuesta: 10
      }
    }
  ];

  const canales: CanalComunicacion[] = [
    {
      id: '1',
      nombre: 'Email Principal',
      tipo: 'email',
      activo: true,
      configuracion: {
        servidor: 'smtp.gmail.com',
        puerto: 587,
        usuario: 'noreply@entrenador.com',
        ssl: true
      },
      metricas: {
        mensajesEnviados: 1250,
        tasaEntrega: 98.5,
        tasaApertura: 85.2,
        tasaRespuesta: 12.8
      }
    },
    {
      id: '2',
      nombre: 'SMS Gateway',
      tipo: 'sms',
      activo: true,
      configuracion: {
        proveedor: 'Twilio',
        region: 'ES',
        numero: '+34 900 123 456'
      },
      metricas: {
        mensajesEnviados: 890,
        tasaEntrega: 99.1,
        tasaApertura: 95.3,
        tasaRespuesta: 8.7
      }
    },
    {
      id: '3',
      nombre: 'WhatsApp Business',
      tipo: 'whatsapp',
      activo: true,
      configuracion: {
        numero: '+34 666 123 456',
        token: '***',
        webhook: 'https://api.entrenador.com/webhook/whatsapp'
      },
      metricas: {
        mensajesEnviados: 456,
        tasaEntrega: 99.8,
        tasaApertura: 92.1,
        tasaRespuesta: 25.4
      }
    }
  ];

  const plantillas: PlantillaComunicacion[] = [
    {
      id: '1',
      nombre: 'Bienvenida Nuevo Cliente',
      tipo: 'email',
      categoria: 'onboarding',
      contenido: '¡Bienvenido {nombre}! Estamos emocionados de comenzar este viaje contigo...',
      variables: ['nombre', 'fecha_inicio', 'entrenador'],
      activa: true,
      uso: 45
    },
    {
      id: '2',
      nombre: 'Recordatorio de Sesión',
      tipo: 'sms',
      categoria: 'recordatorios',
      contenido: 'Recordatorio: Tu sesión de entrenamiento es {fecha} a las {hora}. ¡Nos vemos pronto!',
      variables: ['fecha', 'hora', 'ubicacion'],
      activa: true,
      uso: 78
    },
    {
      id: '3',
      nombre: 'Seguimiento de Progreso',
      tipo: 'email',
      categoria: 'seguimiento',
      contenido: 'Hola {nombre}, espero que estés bien. Te escribo para hacer seguimiento de tu progreso...',
      variables: ['nombre', 'progreso', 'objetivos'],
      activa: true,
      uso: 32
    }
  ];

  const campañas: CampañaComunicacion[] = [
    {
      id: '1',
      nombre: 'Campaña de Verano 2024',
      descripcion: 'Promoción especial de verano para todos los clientes',
      tipo: 'masiva',
      estado: 'enviada',
      destinatarios: 500,
      enviados: 500,
      entregados: 485,
      abiertos: 412,
      clickeados: 89,
      respuestas: 23,
      fechaCreacion: '2024-01-10 10:00',
      fechaEnvio: '2024-01-12 09:00',
      fechaFinalizacion: '2024-01-12 09:30'
    },
    {
      id: '2',
      nombre: 'Recordatorios de Pago',
      descripcion: 'Recordatorios automáticos para clientes con pagos pendientes',
      tipo: 'automatizada',
      estado: 'enviando',
      destinatarios: 25,
      enviados: 20,
      entregados: 19,
      abiertos: 17,
      clickeados: 8,
      respuestas: 3,
      fechaCreacion: '2024-01-15 08:00',
      fechaEnvio: '2024-01-15 08:30'
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <MessageCircle className="w-4 h-4" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      case 'push': return <Bell className="w-4 h-4" />;
      case 'in_app': return <Target className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'sms': return 'bg-green-100 text-green-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'push': return 'bg-purple-100 text-purple-800';
      case 'in_app': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'entregado': return 'bg-green-100 text-green-800';
      case 'leido': return 'bg-blue-100 text-blue-800';
      case 'respondido': return 'bg-purple-100 text-purple-800';
      case 'enviado': return 'bg-yellow-100 text-yellow-800';
      case 'programado': return 'bg-orange-100 text-orange-800';
      case 'borrador': return 'bg-gray-100 text-gray-800';
      case 'fallido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'entregado': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'leido': return <Eye className="w-4 h-4 text-blue-600" />;
      case 'respondido': return <Reply className="w-4 h-4 text-purple-600" />;
      case 'enviado': return <Send className="w-4 h-4 text-yellow-600" />;
      case 'programado': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'borrador': return <Edit3 className="w-4 h-4 text-gray-600" />;
      case 'fallido': return <X className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const MensajesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Mensajes y Comunicación</h3>
        <button
          onClick={() => setShowCrearMensaje(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Mensaje
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
              <p className="text-sm font-medium text-blue-600">Total Mensajes</p>
              <p className="text-2xl font-bold text-blue-900">{mensajes.length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-green-600">Entregados</p>
              <p className="text-2xl font-bold text-green-900">
                {mensajes.filter(m => m.estado === 'entregado' || m.estado === 'leido' || m.estado === 'respondido').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Respondidos</p>
              <p className="text-2xl font-bold text-purple-900">
                {mensajes.filter(m => m.estado === 'respondido').length}
              </p>
            </div>
            <Reply className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Tasa de Respuesta</p>
              <p className="text-2xl font-bold text-orange-900">
                {Math.round((mensajes.filter(m => m.estado === 'respondido').length / mensajes.length) * 100)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todos">Todos los tipos</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="push">Push</option>
          <option value="in_app">In-App</option>
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todos">Todos los estados</option>
          <option value="borrador">Borrador</option>
          <option value="programado">Programado</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
          <option value="leido">Leído</option>
          <option value="respondido">Respondido</option>
          <option value="fallido">Fallido</option>
        </select>
      </div>

      {/* Lista de mensajes */}
      <div className="space-y-4">
        {mensajes
          .filter(m => filtroTipo === 'todos' || m.tipo === filtroTipo)
          .filter(m => filtroEstado === 'todos' || m.estado === filtroEstado)
          .map((mensaje) => (
            <motion.div
              key={mensaje.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${getTipoColor(mensaje.tipo)}`}>
                    {getTipoIcon(mensaje.tipo)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {mensaje.asunto || mensaje.contenido.substring(0, 50) + '...'}
                    </h4>
                    <p className="text-sm text-gray-600">{mensaje.destinatario}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {mensaje.contenido.substring(0, 100)}...
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(mensaje.tipo)}`}>
                    {mensaje.tipo}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(mensaje.estado)}`}>
                    {mensaje.estado}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Entregado</p>
                  <p className="text-lg font-bold text-gray-900">
                    {mensaje.metricas.entregado ? '✓' : '✗'}
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Abierto</p>
                  <p className="text-lg font-bold text-blue-900">
                    {mensaje.metricas.abierto ? '✓' : '✗'}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Clickeado</p>
                  <p className="text-lg font-bold text-green-900">
                    {mensaje.metricas.clickeado ? '✓' : '✗'}
                  </p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-600">Respondido</p>
                  <p className="text-lg font-bold text-purple-900">
                    {mensaje.metricas.respondido ? '✓' : '✗'}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Etiquetas</h5>
                <div className="flex flex-wrap gap-2">
                  {mensaje.etiquetas.map((etiqueta, index) => (
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
                    Creado: {new Date(mensaje.fechaCreacion).toLocaleString()}
                  </span>
                  {mensaje.fechaEnvio && (
                    <span className="text-sm text-blue-600">
                      Enviado: {new Date(mensaje.fechaEnvio).toLocaleString()}
                    </span>
                  )}
                  {mensaje.metricas.tiempoRespuesta && (
                    <span className="text-sm text-green-600">
                      Respuesta: {mensaje.metricas.tiempoRespuesta}min
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Reply className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Comunicación Integrada</h2>
            <p className="text-sm text-gray-600">Gestión de mensajes y campañas de comunicación</p>
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
          { id: 'mensajes', label: 'Mensajes', icon: MessageCircle },
          { id: 'canales', label: 'Canales', icon: Mail },
          { id: 'plantillas', label: 'Plantillas', icon: FileText },
          { id: 'campañas', label: 'Campañas', icon: Target },
          { id: 'metricas', label: 'Métricas', icon: BarChart3 },
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
      {activeView === 'mensajes' && <MensajesView />}
      {activeView === 'canales' && <div>Vista de Canales (en desarrollo)</div>}
      {activeView === 'plantillas' && <div>Vista de Plantillas (en desarrollo)</div>}
      {activeView === 'campañas' && <div>Vista de Campañas (en desarrollo)</div>}
      {activeView === 'metricas' && <div>Vista de Métricas (en desarrollo)</div>}
    </div>
  );
};

export default ComunicacionIntegrada;