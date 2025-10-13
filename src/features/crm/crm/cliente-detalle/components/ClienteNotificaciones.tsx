import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Mail, 
  Phone, 
  MessageCircle, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Zap,
  Users,
  Target,
  Calendar,
  Activity,
  Heart,
  DollarSign,
  BarChart3,
  Eye,
  Archive,
  Filter,
  Search
} from 'lucide-react';

interface ClienteNotificacionesProps {
  clienteId: string;
  clienteNombre: string;
}

interface Notificacion {
  id: string;
  tipo: 'email' | 'sms' | 'push' | 'whatsapp' | 'in_app';
  titulo: string;
  contenido: string;
  destinatario: string;
  estado: 'enviada' | 'pendiente' | 'fallida' | 'programada';
  fechaEnvio: string;
  fechaProgramada?: string;
  canal: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  categoria: 'recordatorio' | 'motivacion' | 'promocion' | 'seguimiento' | 'alerta';
  metricas: {
    entregada: boolean;
    abierta: boolean;
    clickeada: boolean;
    respondida: boolean;
  };
}

interface PlantillaNotificacion {
  id: string;
  nombre: string;
  tipo: string;
  categoria: string;
  contenido: string;
  variables: string[];
  activa: boolean;
  uso: number;
}

interface ConfiguracionNotificacion {
  id: string;
  clienteId: string;
  canales: {
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
    in_app: boolean;
  };
  horarios: {
    inicio: string;
    fin: string;
    dias: string[];
  };
  frecuencia: {
    max_diarias: number;
    intervalo_minimo: number;
  };
  categorias: {
    recordatorio: boolean;
    motivacion: boolean;
    promocion: boolean;
    seguimiento: boolean;
    alerta: boolean;
  };
}

const ClienteNotificaciones: React.FC<ClienteNotificacionesProps> = ({ clienteId, clienteNombre }) => {
  const [activeView, setActiveView] = useState<'notificaciones' | 'plantillas' | 'configuracion' | 'metricas'>('notificaciones');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'email' | 'sms' | 'push' | 'whatsapp'>('todos');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'enviada' | 'pendiente' | 'fallida' | 'programada'>('todos');
  const [showCrearNotificacion, setShowCrearNotificacion] = useState(false);

  // Datos mock para demostración
  const notificaciones: Notificacion[] = [
    {
      id: '1',
      tipo: 'email',
      titulo: 'Recordatorio de sesión',
      contenido: 'Tu sesión de entrenamiento es mañana a las 10:00 AM. ¡No olvides traer tu botella de agua!',
      destinatario: clienteNombre,
      estado: 'enviada',
      fechaEnvio: '2024-01-15 18:00',
      canal: 'Email',
      prioridad: 'media',
      categoria: 'recordatorio',
      metricas: {
        entregada: true,
        abierta: true,
        clickeada: false,
        respondida: false
      }
    },
    {
      id: '2',
      tipo: 'sms',
      titulo: 'Confirmación de cita',
      contenido: 'Confirma tu asistencia a la sesión de mañana respondiendo SÍ o NO',
      destinatario: clienteNombre,
      estado: 'enviada',
      fechaEnvio: '2024-01-15 19:30',
      canal: 'SMS',
      prioridad: 'alta',
      categoria: 'recordatorio',
      metricas: {
        entregada: true,
        abierta: true,
        clickeada: true,
        respondida: true
      }
    },
    {
      id: '3',
      tipo: 'push',
      titulo: '¡Excelente progreso!',
      contenido: 'Has perdido 2.3kg esta semana. ¡Sigue así! 💪',
      destinatario: clienteNombre,
      estado: 'enviada',
      fechaEnvio: '2024-01-14 20:00',
      canal: 'Push',
      prioridad: 'baja',
      categoria: 'motivacion',
      metricas: {
        entregada: true,
        abierta: true,
        clickeada: true,
        respondida: false
      }
    },
    {
      id: '4',
      tipo: 'whatsapp',
      titulo: 'Seguimiento nutricional',
      contenido: '¿Cómo te ha ido con el plan nutricional esta semana?',
      destinatario: clienteNombre,
      estado: 'pendiente',
      fechaEnvio: '2024-01-16 10:00',
      canal: 'WhatsApp',
      prioridad: 'media',
      categoria: 'seguimiento',
      metricas: {
        entregada: false,
        abierta: false,
        clickeada: false,
        respondida: false
      }
    }
  ];

  const plantillas: PlantillaNotificacion[] = [
    {
      id: '1',
      nombre: 'Recordatorio de sesión',
      tipo: 'email',
      categoria: 'recordatorio',
      contenido: 'Hola {nombre}, tu sesión de entrenamiento es {fecha} a las {hora}. ¡No olvides traer tu botella de agua!',
      variables: ['nombre', 'fecha', 'hora'],
      activa: true,
      uso: 45
    },
    {
      id: '2',
      nombre: 'Motivación semanal',
      tipo: 'push',
      categoria: 'motivacion',
      contenido: '¡{nombre}! Has perdido {peso}kg esta semana. ¡Sigue así! 💪',
      variables: ['nombre', 'peso'],
      activa: true,
      uso: 23
    },
    {
      id: '3',
      nombre: 'Seguimiento nutricional',
      tipo: 'whatsapp',
      categoria: 'seguimiento',
      contenido: 'Hola {nombre}, ¿cómo te ha ido con el plan nutricional esta semana?',
      variables: ['nombre'],
      activa: true,
      uso: 12
    }
  ];

  const configuracion: ConfiguracionNotificacion = {
    id: '1',
    clienteId: clienteId,
    canales: {
      email: true,
      sms: true,
      push: true,
      whatsapp: true,
      in_app: true
    },
    horarios: {
      inicio: '09:00',
      fin: '21:00',
      dias: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    },
    frecuencia: {
      max_diarias: 5,
      intervalo_minimo: 30
    },
    categorias: {
      recordatorio: true,
      motivacion: true,
      promocion: false,
      seguimiento: true,
      alerta: true
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'sms': return 'bg-green-100 text-green-800';
      case 'push': return 'bg-purple-100 text-purple-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'in_app': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'enviada': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'fallida': return 'bg-red-100 text-red-800';
      case 'programada': return 'bg-blue-100 text-blue-800';
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

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'recordatorio': return 'bg-blue-100 text-blue-800';
      case 'motivacion': return 'bg-green-100 text-green-800';
      case 'promocion': return 'bg-purple-100 text-purple-800';
      case 'seguimiento': return 'bg-orange-100 text-orange-800';
      case 'alerta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Phone className="w-4 h-4" />;
      case 'push': return <Bell className="w-4 h-4" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      case 'in_app': return <Target className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const NotificacionesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
        <div className="flex items-center gap-2">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="todos">Todos los tipos</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="todos">Todos los estados</option>
            <option value="enviada">Enviadas</option>
            <option value="pendiente">Pendientes</option>
            <option value="fallida">Fallidas</option>
            <option value="programada">Programadas</option>
          </select>
          <button
            onClick={() => setShowCrearNotificacion(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva Notificación
          </button>
        </div>
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
              <p className="text-sm font-medium text-blue-600">Total Enviadas</p>
              <p className="text-2xl font-bold text-blue-900">
                {notificaciones.filter(n => n.estado === 'enviada').length}
              </p>
            </div>
            <Send className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-green-600">Tasa de Apertura</p>
              <p className="text-2xl font-bold text-green-900">
                {Math.round((notificaciones.filter(n => n.metricas.abierta).length / notificaciones.length) * 100)}%
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
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
              <p className="text-sm font-medium text-purple-600">Tasa de Respuesta</p>
              <p className="text-2xl font-bold text-purple-900">
                {Math.round((notificaciones.filter(n => n.metricas.respondida).length / notificaciones.length) * 100)}%
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-purple-600" />
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
              <p className="text-sm font-medium text-orange-600">Pendientes</p>
              <p className="text-2xl font-bold text-orange-900">
                {notificaciones.filter(n => n.estado === 'pendiente').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-4">
        {notificaciones
          .filter(n => filtroTipo === 'todos' || n.tipo === filtroTipo)
          .filter(n => filtroEstado === 'todos' || n.estado === filtroEstado)
          .map((notificacion) => (
            <motion.div
              key={notificacion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    {getTipoIcon(notificacion.tipo)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{notificacion.titulo}</h4>
                    <p className="text-sm text-gray-600">{notificacion.contenido}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Enviada: {new Date(notificacion.fechaEnvio).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(notificacion.tipo)}`}>
                    {notificacion.canal}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(notificacion.estado)}`}>
                    {notificacion.estado}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioridadColor(notificacion.prioridad)}`}>
                    {notificacion.prioridad}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Entregada</p>
                  <p className="text-lg font-bold text-gray-900">
                    {notificacion.metricas.entregada ? '✓' : '✗'}
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Abierta</p>
                  <p className="text-lg font-bold text-blue-900">
                    {notificacion.metricas.abierta ? '✓' : '✗'}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Clickeada</p>
                  <p className="text-lg font-bold text-green-900">
                    {notificacion.metricas.clickeada ? '✓' : '✗'}
                  </p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-600">Respondida</p>
                  <p className="text-lg font-bold text-purple-900">
                    {notificacion.metricas.respondida ? '✓' : '✗'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoriaColor(notificacion.categoria)}`}>
                    {notificacion.categoria}
                  </span>
                  <span className="text-sm text-gray-600">
                    Para: {notificacion.destinatario}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const PlantillasView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Plantillas de Notificación</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Nueva Plantilla
        </button>
      </div>

      <div className="space-y-4">
        {plantillas.map((plantilla) => (
          <motion.div
            key={plantilla.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  {getTipoIcon(plantilla.tipo)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{plantilla.nombre}</h4>
                  <p className="text-sm text-gray-600">{plantilla.contenido}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Variables: {plantilla.variables.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(plantilla.tipo)}`}>
                  {plantilla.tipo}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoriaColor(plantilla.categoria)}`}>
                  {plantilla.categoria}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plantilla.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {plantilla.activa ? 'Activa' : 'Inactiva'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Usos</p>
                <p className="text-lg font-bold text-gray-900">{plantilla.uso}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Variables</p>
                <p className="text-lg font-bold text-blue-900">{plantilla.variables.length}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">Estado</p>
                <p className="text-lg font-bold text-green-900">
                  {plantilla.activa ? 'Activa' : 'Inactiva'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Send className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ConfiguracionView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Configuración de Notificaciones</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Canales de comunicación */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Canales de Comunicación</h4>
          <div className="space-y-3">
            {Object.entries(configuracion.canales).map(([canal, activo]) => (
              <div key={canal} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTipoIcon(canal)}
                  <span className="font-medium text-gray-900 capitalize">{canal}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activo}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Horarios de envío */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Horarios de Envío</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horario de inicio</label>
              <input
                type="time"
                value={configuracion.horarios.inicio}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horario de fin</label>
              <input
                type="time"
                value={configuracion.horarios.fin}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Días de la semana</label>
              <div className="grid grid-cols-2 gap-2">
                {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map((dia) => (
                  <label key={dia} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={configuracion.horarios.dias.includes(dia)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{dia}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Frecuencia */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Frecuencia</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Máximo diarias</label>
              <input
                type="number"
                value={configuracion.frecuencia.max_diarias}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Intervalo mínimo (minutos)</label>
              <input
                type="number"
                value={configuracion.frecuencia.intervalo_minimo}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Categorías Permitidas</h4>
          <div className="space-y-3">
            {Object.entries(configuracion.categorias).map(([categoria, permitida]) => (
              <div key={categoria} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(categoria)}`}>
                    {categoria}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permitida}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancelar
        </button>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Guardar Configuración
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl text-white">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Notificaciones Inteligentes</h2>
            <p className="text-sm text-gray-600">Sistema de comunicación automatizada para {clienteNombre}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
          { id: 'plantillas', label: 'Plantillas', icon: Mail },
          { id: 'configuracion', label: 'Configuración', icon: Settings },
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
      {activeView === 'notificaciones' && <NotificacionesView />}
      {activeView === 'plantillas' && <PlantillasView />}
      {activeView === 'configuracion' && <ConfiguracionView />}
      {activeView === 'metricas' && <div>Vista de Métricas (en desarrollo)</div>}
    </div>
  );
};

export default ClienteNotificaciones;

