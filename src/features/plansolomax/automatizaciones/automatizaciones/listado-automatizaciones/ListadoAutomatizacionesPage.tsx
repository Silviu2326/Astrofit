import React, { useState, useMemo } from 'react';
import {
  Zap, Workflow, Activity, CheckCircle, Users, Clock, Plus,
  Settings, Filter, Search, Grid3x3, List, LayoutGrid, Calendar,
  Mail, MessageSquare, Bell, CheckSquare, UserCog, TrendingUp,
  Play, Pause, Copy, Eye, Trash2, Edit, MoreVertical, Download,
  AlertTriangle, Star, ChevronDown, BarChart3, PieChart, LineChart,
  RefreshCw, FileJson, FileSpreadsheet, Sparkles, Target, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart as RechartsLine, Line, BarChart, Bar, PieChart as RechartsPie,
  Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ============= TIPOS =============
type EstadoFlujo = 'activo' | 'pausado' | 'borrador' | 'archivado';
type TipoFlujo = 'email' | 'whatsapp' | 'tarea' | 'notificacion' | 'crm';
type TriggerTipo = 'nuevo_cliente' | 'inactivo' | 'cumpleanos' | 'renovacion' | 'sesion' | 'objetivo' | 'pago' | 'cancelacion' | 'feedback';

interface Flujo {
  id: string;
  nombre: string;
  descripcion: string;
  estado: EstadoFlujo;
  tipo: TipoFlujo;
  trigger: TriggerTipo;
  triggerDescripcion: string;
  ejecucionesTotales: number;
  ejecucionesExitosas: number;
  ejecucionesFallidas: number;
  tasaExito: number;
  ultimaEjecucion: string;
  proximaEjecucion?: string;
  clientesProcesados: number;
  conversionesGeneradas: number;
  creadoPor: string;
  fechaCreacion: string;
  tiempoPromedioEjecucion: number;
}

interface PlantillaFlujo {
  id: string;
  nombre: string;
  descripcion: string;
  vecesUsada: number;
  rating: number;
  tipo: TipoFlujo;
}

interface Alerta {
  id: string;
  tipo: 'warning' | 'error' | 'info';
  mensaje: string;
  flujoId: string;
}

type VistaActual = 'grid' | 'kanban' | 'tabla';
type TabActual = 'todos' | 'activos' | 'pausados' | 'borradores' | 'archivados';

// ============= DATOS MOCKEADOS =============
const flujosMockeados: Flujo[] = [
  {
    id: '1',
    nombre: 'Email de Bienvenida',
    descripcion: 'Mensaje de bienvenida automático cuando se registra un nuevo cliente',
    estado: 'activo',
    tipo: 'email',
    trigger: 'nuevo_cliente',
    triggerDescripcion: 'Nuevo cliente registrado',
    ejecucionesTotales: 542,
    ejecucionesExitosas: 515,
    ejecucionesFallidas: 27,
    tasaExito: 95,
    ultimaEjecucion: '2025-09-30T10:30:00',
    proximaEjecucion: '2025-09-30T16:00:00',
    clientesProcesados: 542,
    conversionesGeneradas: 487,
    creadoPor: 'María García',
    fechaCreacion: '2025-01-15',
    tiempoPromedioEjecucion: 2.3
  },
  {
    id: '2',
    nombre: 'Recuperar Clientes Inactivos',
    descripcion: 'Contacto automático para clientes sin actividad hace más de 30 días',
    estado: 'activo',
    tipo: 'email',
    trigger: 'inactivo',
    triggerDescripcion: 'Cliente inactivo 30+ días',
    ejecucionesTotales: 128,
    ejecucionesExitosas: 90,
    ejecucionesFallidas: 38,
    tasaExito: 70,
    ultimaEjecucion: '2025-09-29T14:20:00',
    clientesProcesados: 128,
    conversionesGeneradas: 34,
    creadoPor: 'Juan Pérez',
    fechaCreacion: '2025-02-10',
    tiempoPromedioEjecucion: 3.1
  },
  {
    id: '3',
    nombre: 'Felicitación de Cumpleaños',
    descripcion: 'Mensaje personalizado de felicitación en el día del cumpleaños',
    estado: 'activo',
    tipo: 'whatsapp',
    trigger: 'cumpleanos',
    triggerDescripcion: 'Cumpleaños del cliente',
    ejecucionesTotales: 89,
    ejecucionesExitosas: 89,
    ejecucionesFallidas: 0,
    tasaExito: 100,
    ultimaEjecucion: '2025-09-30T08:00:00',
    proximaEjecucion: '2025-10-01T08:00:00',
    clientesProcesados: 89,
    conversionesGeneradas: 67,
    creadoPor: 'Ana López',
    fechaCreacion: '2025-01-20',
    tiempoPromedioEjecucion: 1.5
  },
  {
    id: '4',
    nombre: 'Recordatorio de Sesión',
    descripcion: 'Recordatorio 24h antes de la sesión programada',
    estado: 'activo',
    tipo: 'notificacion',
    trigger: 'sesion',
    triggerDescripcion: 'Sesión próxima en 24h',
    ejecucionesTotales: 312,
    ejecucionesExitosas: 275,
    ejecucionesFallidas: 37,
    tasaExito: 88,
    ultimaEjecucion: '2025-09-30T09:15:00',
    proximaEjecucion: '2025-09-30T15:30:00',
    clientesProcesados: 312,
    conversionesGeneradas: 298,
    creadoPor: 'Carlos Ruiz',
    fechaCreacion: '2025-02-05',
    tiempoPromedioEjecucion: 1.8
  },
  {
    id: '5',
    nombre: 'Encuesta Post-Sesión',
    descripcion: 'Solicitud de feedback después de cada sesión',
    estado: 'pausado',
    tipo: 'email',
    trigger: 'sesion',
    triggerDescripcion: 'Sesión completada',
    ejecucionesTotales: 58,
    ejecucionesExitosas: 38,
    ejecucionesFallidas: 20,
    tasaExito: 65,
    ultimaEjecucion: '2025-09-25T18:00:00',
    clientesProcesados: 58,
    conversionesGeneradas: 21,
    creadoPor: 'Laura Martín',
    fechaCreacion: '2025-03-01',
    tiempoPromedioEjecucion: 2.7
  },
  {
    id: '6',
    nombre: 'Follow-up Nuevos Clientes',
    descripcion: 'Seguimiento automático a los 7 días del registro',
    estado: 'activo',
    tipo: 'email',
    trigger: 'nuevo_cliente',
    triggerDescripcion: 'Nuevo cliente hace 7 días',
    ejecucionesTotales: 215,
    ejecucionesExitosas: 198,
    ejecucionesFallidas: 17,
    tasaExito: 92,
    ultimaEjecucion: '2025-09-30T11:00:00',
    proximaEjecucion: '2025-09-30T17:00:00',
    clientesProcesados: 215,
    conversionesGeneradas: 167,
    creadoPor: 'María García',
    fechaCreacion: '2025-01-25',
    tiempoPromedioEjecucion: 2.5
  },
  {
    id: '7',
    nombre: 'Alerta Adherencia Baja',
    descripcion: 'Notificación interna cuando un cliente tiene baja adherencia',
    estado: 'activo',
    tipo: 'tarea',
    trigger: 'objetivo',
    triggerDescripcion: 'Adherencia < 60%',
    ejecucionesTotales: 47,
    ejecucionesExitosas: 35,
    ejecucionesFallidas: 12,
    tasaExito: 75,
    ultimaEjecucion: '2025-09-29T16:45:00',
    clientesProcesados: 47,
    conversionesGeneradas: 28,
    creadoPor: 'Carlos Ruiz',
    fechaCreacion: '2025-02-20',
    tiempoPromedioEjecucion: 1.2
  },
  {
    id: '8',
    nombre: 'Recordatorio de Renovación',
    descripcion: 'Aviso 7 días antes del vencimiento de la membresía',
    estado: 'activo',
    tipo: 'whatsapp',
    trigger: 'renovacion',
    triggerDescripcion: 'Renovación próxima en 7 días',
    ejecucionesTotales: 156,
    ejecucionesExitosas: 149,
    ejecucionesFallidas: 7,
    tasaExito: 96,
    ultimaEjecucion: '2025-09-30T07:30:00',
    proximaEjecucion: '2025-10-01T07:30:00',
    clientesProcesados: 156,
    conversionesGeneradas: 142,
    creadoPor: 'Ana López',
    fechaCreacion: '2025-01-30',
    tiempoPromedioEjecucion: 1.9
  },
  {
    id: '9',
    nombre: 'Confirmación de Pago',
    descripcion: 'Mensaje automático cuando se recibe un pago',
    estado: 'activo',
    tipo: 'email',
    trigger: 'pago',
    triggerDescripcion: 'Pago recibido',
    ejecucionesTotales: 423,
    ejecucionesExitosas: 418,
    ejecucionesFallidas: 5,
    tasaExito: 99,
    ultimaEjecucion: '2025-09-30T12:15:00',
    proximaEjecucion: '2025-09-30T18:00:00',
    clientesProcesados: 423,
    conversionesGeneradas: 423,
    creadoPor: 'Juan Pérez',
    fechaCreacion: '2025-01-10',
    tiempoPromedioEjecucion: 1.1
  },
  {
    id: '10',
    nombre: 'Retención de Cancelación',
    descripcion: 'Intento de retención cuando un cliente intenta cancelar',
    estado: 'borrador',
    tipo: 'email',
    trigger: 'cancelacion',
    triggerDescripcion: 'Intento de cancelación',
    ejecucionesTotales: 0,
    ejecucionesExitosas: 0,
    ejecucionesFallidas: 0,
    tasaExito: 0,
    ultimaEjecucion: '',
    clientesProcesados: 0,
    conversionesGeneradas: 0,
    creadoPor: 'Laura Martín',
    fechaCreacion: '2025-09-28',
    tiempoPromedioEjecucion: 0
  },
  {
    id: '11',
    nombre: 'Actualización CRM - Cliente Activo',
    descripcion: 'Actualiza el estado del cliente en el CRM cuando completa una sesión',
    estado: 'activo',
    tipo: 'crm',
    trigger: 'sesion',
    triggerDescripcion: 'Sesión completada',
    ejecucionesTotales: 298,
    ejecucionesExitosas: 285,
    ejecucionesFallidas: 13,
    tasaExito: 96,
    ultimaEjecucion: '2025-09-30T13:00:00',
    proximaEjecucion: '2025-09-30T19:00:00',
    clientesProcesados: 298,
    conversionesGeneradas: 298,
    creadoPor: 'Carlos Ruiz',
    fechaCreacion: '2025-02-01',
    tiempoPromedioEjecucion: 0.8
  },
  {
    id: '12',
    nombre: 'Promoción Mensual',
    descripcion: 'Campaña mensual con ofertas especiales',
    estado: 'pausado',
    tipo: 'email',
    trigger: 'nuevo_cliente',
    triggerDescripcion: 'Cada 1 del mes',
    ejecucionesTotales: 8,
    ejecucionesExitosas: 7,
    ejecucionesFallidas: 1,
    tasaExito: 88,
    ultimaEjecucion: '2025-09-01T10:00:00',
    clientesProcesados: 542,
    conversionesGeneradas: 89,
    creadoPor: 'María García',
    fechaCreacion: '2025-01-05',
    tiempoPromedioEjecucion: 5.2
  },
  {
    id: '13',
    nombre: 'Feedback Negativo - Alerta',
    descripcion: 'Notifica al equipo cuando se recibe feedback negativo',
    estado: 'activo',
    tipo: 'notificacion',
    trigger: 'feedback',
    triggerDescripcion: 'Feedback < 3 estrellas',
    ejecucionesTotales: 23,
    ejecucionesExitosas: 23,
    ejecucionesFallidas: 0,
    tasaExito: 100,
    ultimaEjecucion: '2025-09-28T15:30:00',
    clientesProcesados: 23,
    conversionesGeneradas: 18,
    creadoPor: 'Ana López',
    fechaCreacion: '2025-02-15',
    tiempoPromedioEjecucion: 0.5
  },
  {
    id: '14',
    nombre: 'Reactivación 90 Días',
    descripcion: 'Campaña especial para clientes inactivos hace 90+ días',
    estado: 'activo',
    tipo: 'whatsapp',
    trigger: 'inactivo',
    triggerDescripcion: 'Cliente inactivo 90+ días',
    ejecucionesTotales: 67,
    ejecucionesExitosas: 54,
    ejecucionesFallidas: 13,
    tasaExito: 81,
    ultimaEjecucion: '2025-09-29T11:00:00',
    clientesProcesados: 67,
    conversionesGeneradas: 12,
    creadoPor: 'Juan Pérez',
    fechaCreacion: '2025-02-28',
    tiempoPromedioEjecucion: 2.9
  },
  {
    id: '15',
    nombre: 'Objetivo Alcanzado - Felicitación',
    descripcion: 'Felicitación automática cuando el cliente alcanza un objetivo',
    estado: 'activo',
    tipo: 'email',
    trigger: 'objetivo',
    triggerDescripcion: 'Objetivo completado',
    ejecucionesTotales: 134,
    ejecucionesExitosas: 129,
    ejecucionesFallidas: 5,
    tasaExito: 96,
    ultimaEjecucion: '2025-09-30T10:00:00',
    proximaEjecucion: '2025-09-30T16:30:00',
    clientesProcesados: 134,
    conversionesGeneradas: 134,
    creadoPor: 'Laura Martín',
    fechaCreacion: '2025-02-10',
    tiempoPromedioEjecucion: 1.7
  },
  {
    id: '16',
    nombre: 'Check-in Semanal',
    descripcion: 'Mensaje motivacional cada lunes',
    estado: 'borrador',
    tipo: 'whatsapp',
    trigger: 'nuevo_cliente',
    triggerDescripcion: 'Cada lunes 9:00',
    ejecucionesTotales: 0,
    ejecucionesExitosas: 0,
    ejecucionesFallidas: 0,
    tasaExito: 0,
    ultimaEjecucion: '',
    clientesProcesados: 0,
    conversionesGeneradas: 0,
    creadoPor: 'Carlos Ruiz',
    fechaCreacion: '2025-09-25',
    tiempoPromedioEjecucion: 0
  },
  {
    id: '17',
    nombre: 'Pago Fallido - Recordatorio',
    descripcion: 'Aviso cuando falla un intento de cobro',
    estado: 'activo',
    tipo: 'notificacion',
    trigger: 'pago',
    triggerDescripcion: 'Pago fallido',
    ejecucionesTotales: 34,
    ejecucionesExitosas: 32,
    ejecucionesFallidas: 2,
    tasaExito: 94,
    ultimaEjecucion: '2025-09-29T14:00:00',
    clientesProcesados: 34,
    conversionesGeneradas: 28,
    creadoPor: 'María García',
    fechaCreacion: '2025-01-18',
    tiempoPromedioEjecucion: 1.3
  },
  {
    id: '18',
    nombre: 'Primera Sesión - Preparación',
    descripcion: 'Guía de preparación antes de la primera sesión',
    estado: 'activo',
    tipo: 'email',
    trigger: 'sesion',
    triggerDescripcion: 'Primera sesión en 48h',
    ejecucionesTotales: 187,
    ejecucionesExitosas: 178,
    ejecucionesFallidas: 9,
    tasaExito: 95,
    ultimaEjecucion: '2025-09-30T08:30:00',
    proximaEjecucion: '2025-09-30T20:00:00',
    clientesProcesados: 187,
    conversionesGeneradas: 179,
    creadoPor: 'Ana López',
    fechaCreacion: '2025-01-22',
    tiempoPromedioEjecucion: 2.1
  },
  {
    id: '19',
    nombre: 'Hito de Progreso',
    descripcion: 'Celebración cuando se completa un hito importante',
    estado: 'activo',
    tipo: 'whatsapp',
    trigger: 'objetivo',
    triggerDescripcion: 'Hito completado',
    ejecucionesTotales: 98,
    ejecucionesExitosas: 94,
    ejecucionesFallidas: 4,
    tasaExito: 96,
    ultimaEjecucion: '2025-09-30T12:00:00',
    proximaEjecucion: '2025-09-30T18:30:00',
    clientesProcesados: 98,
    conversionesGeneradas: 98,
    creadoPor: 'Juan Pérez',
    fechaCreacion: '2025-02-08',
    tiempoPromedioEjecucion: 1.6
  },
  {
    id: '20',
    nombre: 'Recordatorio Evaluación Mensual',
    descripcion: 'Recordatorio para realizar evaluación mensual de progreso',
    estado: 'pausado',
    tipo: 'tarea',
    trigger: 'nuevo_cliente',
    triggerDescripcion: 'Cada día 1 del mes',
    ejecucionesTotales: 7,
    ejecucionesExitosas: 6,
    ejecucionesFallidas: 1,
    tasaExito: 86,
    ultimaEjecucion: '2025-09-01T09:00:00',
    clientesProcesados: 456,
    conversionesGeneradas: 389,
    creadoPor: 'Laura Martín',
    fechaCreacion: '2025-01-12',
    tiempoPromedioEjecucion: 0.9
  }
];

const plantillasMockeadas: PlantillaFlujo[] = [
  { id: 'p1', nombre: 'Email de Bienvenida', descripcion: 'Mensaje personalizado para nuevos clientes', vecesUsada: 247, rating: 4.8, tipo: 'email' },
  { id: 'p2', nombre: 'Recuperar Clientes Inactivos', descripcion: 'Campaña de reactivación automatizada', vecesUsada: 189, rating: 4.5, tipo: 'email' },
  { id: 'p3', nombre: 'Seguimiento Post-Sesión', descripción: 'Solicitud de feedback y próximos pasos', vecesUsada: 312, rating: 4.9, tipo: 'email' },
  { id: 'p4', nombre: 'Felicitación de Cumpleaños', descripcion: 'Mensaje de felicitación con oferta especial', vecesUsada: 423, rating: 5.0, tipo: 'whatsapp' },
  { id: 'p5', nombre: 'Recordatorio de Renovación', descripcion: 'Aviso previo al vencimiento de membresía', vecesUsada: 156, rating: 4.7, tipo: 'notificacion' },
  { id: 'p6', nombre: 'Encuesta de Satisfacción', descripcion: 'Evaluación de experiencia del cliente', vecesUsada: 98, rating: 4.3, tipo: 'email' }
];

const alertasMockeadas: Alerta[] = [
  { id: 'a1', tipo: 'warning', mensaje: 'Tasa de éxito del flujo "Recuperar Clientes Inactivos" está en 70%', flujoId: '2' },
  { id: 'a2', tipo: 'warning', mensaje: 'Flujo "Encuesta Post-Sesión" sin ejecuciones hace 5 días', flujoId: '5' },
  { id: 'a3', tipo: 'error', mensaje: 'Flujo "Encuesta Post-Sesión" tiene tasa de éxito baja (65%)', flujoId: '5' },
  { id: 'a4', tipo: 'info', mensaje: 'Flujo "Confirmación de Pago" alcanzó 400+ ejecuciones este mes', flujoId: '9' }
];

// ============= COMPONENTES =============
const StatCard: React.FC<{
  icon: React.ElementType;
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  color: string;
}> = ({ icon: Icon, titulo, valor, subtitulo, color }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
    className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-1">{titulo}</p>
        <p className={`text-3xl font-bold ${color} mb-1`}>{valor}</p>
        {subtitulo && <p className="text-xs text-gray-500">{subtitulo}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </motion.div>
);

const FlujoCard: React.FC<{
  flujo: Flujo;
  onToggleEstado: (id: string) => void;
  onVer: (flujo: Flujo) => void;
  onEditar: (id: string) => void;
  onDuplicar: (id: string) => void;
  onEliminar: (id: string) => void;
}> = ({ flujo, onToggleEstado, onVer, onEditar, onDuplicar, onEliminar }) => {
  const getTipoIcon = () => {
    switch (flujo.tipo) {
      case 'email': return Mail;
      case 'whatsapp': return MessageSquare;
      case 'notificacion': return Bell;
      case 'tarea': return CheckSquare;
      case 'crm': return UserCog;
      default: return Zap;
    }
  };

  const getTipoColor = () => {
    switch (flujo.tipo) {
      case 'email': return 'bg-blue-100 text-blue-700';
      case 'whatsapp': return 'bg-green-100 text-green-700';
      case 'notificacion': return 'bg-yellow-100 text-yellow-700';
      case 'tarea': return 'bg-purple-100 text-purple-700';
      case 'crm': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEstadoBadge = () => {
    switch (flujo.estado) {
      case 'activo': return 'bg-green-100 text-green-700';
      case 'pausado': return 'bg-yellow-100 text-yellow-700';
      case 'borrador': return 'bg-gray-100 text-gray-700';
      case 'archivado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const TipoIcon = getTipoIcon();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.12)' }}
      className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:border-purple-200 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${getTipoColor()}`}>
            <TipoIcon className="w-5 h-5" />
          </div>
          <div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getEstadoBadge()}`}>
              {flujo.estado.toUpperCase()}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Título y descripción */}
      <h3 className="font-bold text-lg text-gray-800 mb-2">{flujo.nombre}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{flujo.descripcion}</p>

      {/* Tipo de flujo */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getTipoColor()}`}>
          {flujo.tipo.toUpperCase()}
        </span>
        <span className="text-xs text-gray-500">• {flujo.triggerDescripcion}</span>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500">Ejecuciones</p>
          <p className="text-lg font-bold text-gray-800">{flujo.ejecucionesTotales}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tasa de Éxito</p>
          <p className={`text-lg font-bold ${flujo.tasaExito >= 90 ? 'text-green-600' : flujo.tasaExito >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
            {flujo.tasaExito}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Clientes</p>
          <p className="text-lg font-bold text-gray-800">{flujo.clientesProcesados}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Conversiones</p>
          <p className="text-lg font-bold text-purple-600">{flujo.conversionesGeneradas}</p>
        </div>
      </div>

      {/* Última ejecución */}
      {flujo.ultimaEjecucion && (
        <p className="text-xs text-gray-500 mb-3">
          Última ejecución: {new Date(flujo.ultimaEjecucion).toLocaleString('es-ES', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
          })}
        </p>
      )}

      {/* Acciones */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleEstado(flujo.id)}
            className={`p-2 rounded-lg transition-colors ${
              flujo.estado === 'activo'
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {flujo.estado === 'activo' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onVer(flujo)}
            className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEditar(flujo.id)}
            className="p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDuplicar(flujo.id)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEliminar(flujo.id)}
            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const PlantillaCard: React.FC<{ plantilla: PlantillaFlujo; onUsar: (id: string) => void }> = ({ plantilla, onUsar }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
    className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border-2 border-purple-200 hover:border-purple-400 transition-all"
  >
    <div className="flex items-start justify-between mb-3">
      <Sparkles className="w-6 h-6 text-purple-600" />
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < Math.floor(plantilla.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    </div>
    <h4 className="font-bold text-gray-800 mb-2">{plantilla.nombre}</h4>
    <p className="text-sm text-gray-600 mb-4">{plantilla.descripcion}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">{plantilla.vecesUsada} usos</span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onUsar(plantilla.id)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
      >
        Usar Plantilla
      </motion.button>
    </div>
  </motion.div>
);

// ============= COMPONENTE PRINCIPAL =============
export const ListadoAutomatizacionesPage: React.FC = () => {
  const [vistaActual, setVistaActual] = useState<VistaActual>('grid');
  const [tabActual, setTabActual] = useState<TabActual>('todos');
  const [flujos, setFlujos] = useState<Flujo[]>(flujosMockeados);
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<TipoFlujo | 'todos'>('todos');
  const [filtroTrigger, setFiltroTrigger] = useState<TriggerTipo | 'todos'>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarPlantillas, setMostrarPlantillas] = useState(false);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const [flujoSeleccionado, setFlujoSeleccionado] = useState<Flujo | null>(null);

  // Estadísticas calculadas
  const stats = useMemo(() => {
    const activos = flujos.filter(f => f.estado === 'activo');
    const totalEjecuciones = flujos.reduce((acc, f) => acc + f.ejecucionesTotales, 0);
    const totalExitosas = flujos.reduce((acc, f) => acc + f.ejecucionesExitosas, 0);
    const tasaExitoPromedio = totalEjecuciones > 0 ? Math.round((totalExitosas / totalEjecuciones) * 100) : 0;
    const totalClientes = flujos.reduce((acc, f) => acc + f.clientesProcesados, 0);
    const tiempoAhorrado = Math.round(flujos.reduce((acc, f) => acc + (f.ejecucionesTotales * f.tiempoPromedioEjecucion / 60), 0));

    // Ejecuciones hoy (simulado)
    const hoy = new Date().toISOString().split('T')[0];
    const ejecucionesHoy = flujos.filter(f =>
      f.ultimaEjecucion && f.ultimaEjecucion.startsWith(hoy)
    ).reduce((acc, f) => acc + Math.floor(f.ejecucionesTotales / 30), 0);

    return {
      totalActivos: activos.length,
      ejecucionesHoy,
      tasaExitoPromedio,
      totalClientes,
      tiempoAhorrado
    };
  }, [flujos]);

  // Filtrado de flujos
  const flujosFiltrados = useMemo(() => {
    let resultado = flujos;

    // Filtro por tab
    if (tabActual !== 'todos') {
      resultado = resultado.filter(f => f.estado === tabActual.slice(0, -1) || (tabActual === 'activos' && f.estado === 'activo'));
    }

    // Filtro por búsqueda
    if (busqueda) {
      resultado = resultado.filter(f =>
        f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        f.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filtroTipo !== 'todos') {
      resultado = resultado.filter(f => f.tipo === filtroTipo);
    }

    // Filtro por trigger
    if (filtroTrigger !== 'todos') {
      resultado = resultado.filter(f => f.trigger === filtroTrigger);
    }

    return resultado;
  }, [flujos, tabActual, busqueda, filtroTipo, filtroTrigger]);

  // Handlers
  const handleToggleEstado = (id: string) => {
    setFlujos(prev => prev.map(f =>
      f.id === id
        ? { ...f, estado: f.estado === 'activo' ? 'pausado' : 'activo' as EstadoFlujo }
        : f
    ));
  };

  const handleVer = (flujo: Flujo) => {
    setFlujoSeleccionado(flujo);
  };

  const handleEditar = (id: string) => {
    alert(`Editar flujo ${id}`);
  };

  const handleDuplicar = (id: string) => {
    const flujo = flujos.find(f => f.id === id);
    if (flujo) {
      const nuevoFlujo = { ...flujo, id: `${Date.now()}`, nombre: `${flujo.nombre} (Copia)`, estado: 'borrador' as EstadoFlujo };
      setFlujos(prev => [nuevoFlujo, ...prev]);
    }
  };

  const handleEliminar = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este flujo?')) {
      setFlujos(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleUsarPlantilla = (id: string) => {
    alert(`Usar plantilla ${id}`);
  };

  // Datos para gráficos
  const datosGraficoEjecuciones = Array.from({ length: 30 }, (_, i) => ({
    dia: `${i + 1}`,
    exitosas: Math.floor(Math.random() * 50) + 20,
    fallidas: Math.floor(Math.random() * 10) + 2
  }));

  const datosGraficoTipos = [
    { name: 'Email', value: flujos.filter(f => f.tipo === 'email').length, color: '#3B82F6' },
    { name: 'WhatsApp', value: flujos.filter(f => f.tipo === 'whatsapp').length, color: '#10B981' },
    { name: 'Notificación', value: flujos.filter(f => f.tipo === 'notificacion').length, color: '#F59E0B' },
    { name: 'Tarea', value: flujos.filter(f => f.tipo === 'tarea').length, color: '#8B5CF6' },
    { name: 'CRM', value: flujos.filter(f => f.tipo === 'crm').length, color: '#6366F1' }
  ];

  const datosTopFlujos = flujos
    .sort((a, b) => b.ejecucionesTotales - a.ejecucionesTotales)
    .slice(0, 5)
    .map(f => ({ nombre: f.nombre, ejecuciones: f.ejecucionesTotales }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 p-6">
      {/* Header impactante */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Automatizaciones Activas
              </h1>
              <p className="text-gray-600 mt-1">Flujos automatizados de marketing y comunicación</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarPlantillas(!mostrarPlantillas)}
              className="px-4 py-2 bg-white border-2 border-purple-300 text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Desde Plantilla
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Configuración Global')}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Configuración
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Crear Flujo')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Crear Flujo
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Workflow} titulo="Flujos Activos" valor={stats.totalActivos} color="text-purple-600" />
        <StatCard icon={Activity} titulo="Ejecuciones Hoy" valor={stats.ejecucionesHoy} color="text-blue-600" />
        <StatCard icon={CheckCircle} titulo="Tasa de Éxito" valor={`${stats.tasaExitoPromedio}%`} color="text-green-600" />
        <StatCard icon={Users} titulo="Clientes Impactados" valor={stats.totalClientes} color="text-indigo-600" />
        <StatCard icon={Clock} titulo="Tiempo Ahorrado" valor={`${stats.tiempoAhorrado}h`} subtitulo="Este mes" color="text-orange-600" />
      </div>

      {/* Alertas */}
      {alertasMockeadas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => setMostrarAlertas(!mostrarAlertas)}
            className="w-full bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 flex items-center justify-between hover:bg-yellow-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-900">
                {alertasMockeadas.length} alertas del sistema
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-yellow-600 transition-transform ${mostrarAlertas ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {mostrarAlertas && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-b-xl border-2 border-t-0 border-yellow-300 p-4 space-y-2">
                  {alertasMockeadas.map(alerta => (
                    <div
                      key={alerta.id}
                      className={`p-3 rounded-lg flex items-start gap-3 ${
                        alerta.tipo === 'error' ? 'bg-red-50' : alerta.tipo === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                      }`}
                    >
                      <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                        alerta.tipo === 'error' ? 'text-red-600' : alerta.tipo === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                      <p className="text-sm text-gray-700 flex-1">{alerta.mensaje}</p>
                      <button className="text-sm text-purple-600 font-medium hover:underline">Ver flujo</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Plantillas populares */}
      <AnimatePresence>
        {mostrarPlantillas && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  Plantillas Populares
                </h2>
                <button
                  onClick={() => setMostrarPlantillas(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plantillasMockeadas.map(plantilla => (
                  <PlantillaCard
                    key={plantilla.id}
                    plantilla={plantilla}
                    onUsar={handleUsarPlantilla}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 bg-white rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              mostrarFiltros ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <button
            onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              mostrarEstadisticas ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Análisis
          </button>
        </div>

        {/* Filtros expandidos */}
        <AnimatePresence>
          {mostrarFiltros && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-gray-200 pt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Flujo</label>
                  <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value as TipoFlujo | 'todos')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="todos">Todos</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="notificacion">Notificación</option>
                    <option value="tarea">Tarea</option>
                    <option value="crm">CRM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trigger</label>
                  <select
                    value={filtroTrigger}
                    onChange={(e) => setFiltroTrigger(e.target.value as TriggerTipo | 'todos')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="todos">Todos</option>
                    <option value="nuevo_cliente">Nuevo Cliente</option>
                    <option value="inactivo">Inactividad</option>
                    <option value="cumpleanos">Cumpleaños</option>
                    <option value="renovacion">Renovación</option>
                    <option value="sesion">Sesión</option>
                    <option value="objetivo">Objetivo</option>
                    <option value="pago">Pago</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFiltroTipo('todos');
                      setFiltroTrigger('todos');
                      setBusqueda('');
                    }}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gráficos y estadísticas */}
      <AnimatePresence>
        {mostrarEstadisticas && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Análisis y Estadísticas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gráfico de ejecuciones */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Ejecuciones Últimos 30 Días</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsLine data={datosGraficoEjecuciones}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="dia" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="exitosas" stroke="#10B981" strokeWidth={2} name="Exitosas" />
                      <Line type="monotone" dataKey="fallidas" stroke="#EF4444" strokeWidth={2} name="Fallidas" />
                    </RechartsLine>
                  </ResponsiveContainer>
                </div>

                {/* Distribución por tipo */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Distribución por Tipo de Flujo</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPie>
                      <Pie
                        data={datosGraficoTipos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {datosGraficoTipos.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>

                {/* Top 5 flujos */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Top 5 Flujos Más Ejecutados</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={datosTopFlujos}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nombre" angle={-15} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ejecuciones" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Tasa de éxito */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Tasa de Éxito por Flujo (Top 5)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={flujos.slice(0, 5).map(f => ({ nombre: f.nombre, tasaExito: f.tasaExito }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nombre" angle={-15} textAnchor="end" height={80} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="tasaExito" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs y selector de vista */}
      <div className="flex items-center justify-between mb-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-md">
          {(['todos', 'activos', 'pausados', 'borradores', 'archivados'] as TabActual[]).map(tab => (
            <button
              key={tab}
              onClick={() => setTabActual(tab)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                tabActual === tab
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab !== 'todos' && (
                <span className="ml-2 text-xs">
                  ({flujos.filter(f => tab === 'activos' ? f.estado === 'activo' : f.estado === tab.slice(0, -1)).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selector de vista */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setVistaActual('grid')}
            className={`p-2 rounded-md transition-colors ${
              vistaActual === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setVistaActual('kanban')}
            className={`p-2 rounded-md transition-colors ${
              vistaActual === 'kanban' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setVistaActual('tabla')}
            className={`p-2 rounded-md transition-colors ${
              vistaActual === 'tabla' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-4 text-sm text-gray-600">
        Mostrando {flujosFiltrados.length} de {flujos.length} flujos
      </div>

      {/* Vista Grid */}
      {vistaActual === 'grid' && (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {flujosFiltrados.map(flujo => (
              <FlujoCard
                key={flujo.id}
                flujo={flujo}
                onToggleEstado={handleToggleEstado}
                onVer={handleVer}
                onEditar={handleEditar}
                onDuplicar={handleDuplicar}
                onEliminar={handleEliminar}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Vista Kanban */}
      {vistaActual === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(['borrador', 'activo', 'pausado', 'archivado'] as EstadoFlujo[]).map(estado => (
            <div key={estado} className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 capitalize">{estado}s</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  {flujosFiltrados.filter(f => f.estado === estado).length}
                </span>
              </div>
              <div className="space-y-3">
                {flujosFiltrados.filter(f => f.estado === estado).map(flujo => (
                  <motion.div
                    key={flujo.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-purple-300 cursor-pointer"
                    onClick={() => handleVer(flujo)}
                  >
                    <h4 className="font-semibold text-sm text-gray-800 mb-1">{flujo.nombre}</h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{flujo.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{flujo.ejecucionesTotales} ejecuciones</span>
                      <span className={`text-xs font-bold ${flujo.tasaExito >= 90 ? 'text-green-600' : flujo.tasaExito >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {flujo.tasaExito}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista Tabla */}
      {vistaActual === 'tabla' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trigger</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ejecuciones</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Éxito</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Última Ejecución</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Creado Por</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {flujosFiltrados.map(flujo => (
                  <tr key={flujo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        flujo.estado === 'activo' ? 'bg-green-100 text-green-700' :
                        flujo.estado === 'pausado' ? 'bg-yellow-100 text-yellow-700' :
                        flujo.estado === 'borrador' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {flujo.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{flujo.nombre}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm capitalize text-gray-600">{flujo.tipo}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{flujo.triggerDescripcion}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{flujo.ejecucionesTotales}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${
                        flujo.tasaExito >= 90 ? 'text-green-600' :
                        flujo.tasaExito >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {flujo.tasaExito}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {flujo.ultimaEjecucion ? new Date(flujo.ultimaEjecucion).toLocaleDateString('es-ES') : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{flujo.creadoPor}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVer(flujo)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleEstado(flujo.id)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        >
                          {flujo.estado === 'activo' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de detalles */}
      <AnimatePresence>
        {flujoSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setFlujoSeleccionado(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header del modal */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{flujoSeleccionado.nombre}</h2>
                    <p className="text-purple-100">{flujoSeleccionado.descripcion}</p>
                  </div>
                  <button
                    onClick={() => setFlujoSeleccionado(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Estadísticas principales */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <p className="text-sm text-purple-700 font-medium mb-1">Ejecuciones Totales</p>
                    <p className="text-2xl font-bold text-purple-900">{flujoSeleccionado.ejecucionesTotales}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                    <p className="text-sm text-green-700 font-medium mb-1">Exitosas</p>
                    <p className="text-2xl font-bold text-green-900">{flujoSeleccionado.ejecucionesExitosas}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
                    <p className="text-sm text-red-700 font-medium mb-1">Fallidas</p>
                    <p className="text-2xl font-bold text-red-900">{flujoSeleccionado.ejecucionesFallidas}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                    <p className="text-sm text-blue-700 font-medium mb-1">Tasa de Éxito</p>
                    <p className="text-2xl font-bold text-blue-900">{flujoSeleccionado.tasaExito}%</p>
                  </div>
                </div>

                {/* Gráfico de ejecuciones del flujo */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Ejecuciones Últimos 30 Días</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsLine data={datosGraficoEjecuciones.slice(0, 15)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="dia" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="exitosas" stroke="#10B981" strokeWidth={2} />
                    </RechartsLine>
                  </ResponsiveContainer>
                </div>

                {/* Información adicional */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Información del Flujo</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-medium capitalize">{flujoSeleccionado.tipo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trigger:</span>
                        <span className="font-medium">{flujoSeleccionado.triggerDescripcion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Creado por:</span>
                        <span className="font-medium">{flujoSeleccionado.creadoPor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fecha de creación:</span>
                        <span className="font-medium">{new Date(flujoSeleccionado.fechaCreacion).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Métricas de Impacto</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Clientes procesados:</span>
                        <span className="font-medium">{flujoSeleccionado.clientesProcesados}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversiones generadas:</span>
                        <span className="font-medium text-green-600">{flujoSeleccionado.conversionesGeneradas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiempo promedio:</span>
                        <span className="font-medium">{flujoSeleccionado.tiempoPromedioEjecucion}s</span>
                      </div>
                      {flujoSeleccionado.ultimaEjecucion && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Última ejecución:</span>
                          <span className="font-medium">{new Date(flujoSeleccionado.ultimaEjecucion).toLocaleString('es-ES')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Últimas ejecuciones */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Últimas 5 Ejecuciones</h4>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Cliente #{Math.floor(Math.random() * 1000)}</p>
                            <p className="text-xs text-gray-500">Hace {i + 1} horas</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-green-600">ÉXITO</span>
                          <p className="text-xs text-gray-500">{(Math.random() * 3).toFixed(1)}s</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleDuplicar(flujoSeleccionado.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicar
                  </button>
                  <button
                    onClick={() => handleToggleEstado(flujoSeleccionado.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      flujoSeleccionado.estado === 'activo'
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {flujoSeleccionado.estado === 'activo' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {flujoSeleccionado.estado === 'activo' ? 'Pausar' : 'Activar'}
                  </button>
                  <button
                    onClick={() => handleEditar(flujoSeleccionado.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar Flujo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {flujosFiltrados.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Workflow className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron flujos</h3>
          <p className="text-gray-500 mb-6">Intenta ajustar los filtros o crear un nuevo flujo</p>
          <button
            onClick={() => {
              setBusqueda('');
              setFiltroTipo('todos');
              setFiltroTrigger('todos');
              setTabActual('todos');
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Limpiar Filtros
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ListadoAutomatizacionesPage;