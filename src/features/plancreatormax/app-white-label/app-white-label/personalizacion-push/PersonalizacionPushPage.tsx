import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Send,
  Users,
  TrendingUp,
  Clock,
  Calendar,
  Target,
  Zap,
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  Image as ImageIcon,
  Smile,
  Link as LinkIcon,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit,
  Filter,
  Search,
  Plus,
  Sparkles,
  Smartphone,
  Settings,
  ChevronDown,
  ChevronRight,
  Activity,
  Flame,
  Trophy,
  DollarSign,
  MapPin,
  User,
  MessageSquare,
} from 'lucide-react';

// ==================== TIPOS Y DATOS MOCKEADOS ====================

interface QuickStats {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface NotificationTemplate {
  id: string;
  category: string;
  title: string;
  message: string;
  icon: string;
}

interface Segment {
  id: string;
  name: string;
  description: string;
  userCount: number;
  icon: React.ComponentType<any>;
}

interface ScheduledNotification {
  id: string;
  title: string;
  message: string;
  segment: string;
  scheduledDate: string;
  status: 'scheduled' | 'sent' | 'failed';
  stats?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  };
}

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: string;
  color: string;
}

const quickStats: QuickStats[] = [
  {
    label: 'Notificaciones Enviadas Hoy',
    value: '1,245',
    change: 12.5,
    icon: Send,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    label: 'Tasa de Apertura',
    value: '68.4%',
    change: 8.2,
    icon: Eye,
    color: 'from-purple-500 to-pink-600',
  },
  {
    label: 'Usuarios con Push Activo',
    value: '8,432',
    change: 5.1,
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    label: 'Engagement Rate',
    value: '42.8%',
    change: 15.3,
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
  },
];

const notificationTemplates: NotificationTemplate[] = [
  // Motivacionales
  {
    id: 'mot-1',
    category: 'Motivacionales',
    title: '¡Es hora de entrenar!',
    message: '💪 Tu cuerpo te lo agradecerá. ¡Vamos {{nombre}}!',
    icon: '💪',
  },
  {
    id: 'mot-2',
    category: 'Motivacionales',
    title: '¡Racha increíble!',
    message: '🔥 Llevas {{dias_racha}} días consecutivos. ¡No lo rompas!',
    icon: '🔥',
  },
  // Recordatorios
  {
    id: 'rem-1',
    category: 'Recordatorios',
    title: 'Sesión próxima',
    message: '⏰ Tu sesión comienza en 1 hora. ¿Estás listo?',
    icon: '⏰',
  },
  {
    id: 'rem-2',
    category: 'Recordatorios',
    title: 'Registra tu comida',
    message: '🍎 ¿Ya registraste tu comida de hoy, {{nombre}}?',
    icon: '🍎',
  },
  // Logros
  {
    id: 'ach-1',
    category: 'Logros',
    title: '¡Nuevo récord personal!',
    message: '🏆 Has superado tu marca anterior. ¡Felicitaciones!',
    icon: '🏆',
  },
  {
    id: 'ach-2',
    category: 'Logros',
    title: 'Badge desbloqueado',
    message: '⭐ Has ganado el badge: {{badge}}',
    icon: '⭐',
  },
  // Promocionales
  {
    id: 'pro-1',
    category: 'Promocionales',
    title: '20% OFF en Premium',
    message: '🎁 Oferta especial para ti. Mejora tu plan hoy.',
    icon: '🎁',
  },
  {
    id: 'pro-2',
    category: 'Promocionales',
    title: 'Nuevo contenido disponible',
    message: '✨ Nuevas rutinas y recetas te esperan.',
    icon: '✨',
  },
];

const segments: Segment[] = [
  {
    id: 'all',
    name: 'Todos los usuarios',
    description: 'Todos los usuarios registrados',
    userCount: 8432,
    icon: Users,
  },
  {
    id: 'active-7',
    name: 'Usuarios activos (7 días)',
    description: 'Usuarios que abrieron la app en los últimos 7 días',
    userCount: 5621,
    icon: Activity,
  },
  {
    id: 'inactive-30',
    name: 'Usuarios inactivos (30+ días)',
    description: 'No han abierto la app en 30 días o más',
    userCount: 1234,
    icon: Pause,
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    description: 'Usuarios con suscripción premium activa',
    userCount: 2145,
    icon: Trophy,
  },
  {
    id: 'free',
    name: 'Plan Free',
    description: 'Usuarios en plan gratuito',
    userCount: 6287,
    icon: User,
  },
  {
    id: 'streak',
    name: 'Con racha activa',
    description: 'Usuarios con 7+ días de racha',
    userCount: 3421,
    icon: Flame,
  },
];

const scheduledNotifications: ScheduledNotification[] = [
  {
    id: 'sched-1',
    title: '¡Buenos días! Hora de entrenar',
    message: 'Tu cuerpo está listo para una gran sesión',
    segment: 'Usuarios activos (7 días)',
    scheduledDate: '2025-10-03T08:00:00',
    status: 'scheduled',
  },
  {
    id: 'sched-2',
    title: '¡Te extrañamos!',
    message: 'Han pasado 30 días. ¿Volvemos a entrenar?',
    segment: 'Usuarios inactivos (30+ días)',
    scheduledDate: '2025-10-02T18:00:00',
    status: 'sent',
    stats: {
      sent: 1234,
      delivered: 1198,
      opened: 456,
      clicked: 123,
    },
  },
  {
    id: 'sched-3',
    title: 'Oferta Premium - 20% OFF',
    message: 'Mejora tu experiencia con nuestro plan premium',
    segment: 'Plan Free',
    scheduledDate: '2025-10-02T12:00:00',
    status: 'sent',
    stats: {
      sent: 6287,
      delivered: 6142,
      opened: 2634,
      clicked: 892,
    },
  },
  {
    id: 'sched-4',
    title: '¡Racha de fuego! 🔥',
    message: 'Llevas 15 días consecutivos. ¡Increíble!',
    segment: 'Con racha activa',
    scheduledDate: '2025-10-01T19:00:00',
    status: 'sent',
    stats: {
      sent: 3421,
      delivered: 3389,
      opened: 2745,
      clicked: 1823,
    },
  },
];

const calendarEvents: CalendarEvent[] = [
  { id: 'cal-1', date: '2025-10-03', title: 'Buenos días - Entrenar', type: 'motivacional', color: 'bg-blue-500' },
  { id: 'cal-2', date: '2025-10-03', title: 'Recordatorio comida', type: 'recordatorio', color: 'bg-purple-500' },
  { id: 'cal-3', date: '2025-10-04', title: 'Tips nutrición', type: 'informativo', color: 'bg-teal-500' },
  { id: 'cal-4', date: '2025-10-05', title: 'Nuevo contenido', type: 'promocional', color: 'bg-pink-500' },
  { id: 'cal-5', date: '2025-10-06', title: 'Check-in semanal', type: 'recordatorio', color: 'bg-purple-500' },
  { id: 'cal-6', date: '2025-10-07', title: 'Motivación fin de semana', type: 'motivacional', color: 'bg-blue-500' },
];

// ==================== COMPONENTE PRINCIPAL ====================

const PersonalizacionPushPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'composer' | 'scheduled' | 'history' | 'analytics'>('composer');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationIcon, setNotificationIcon] = useState('🔔');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [schedulingType, setSchedulingType] = useState<'now' | 'scheduled' | 'recurring' | 'event'>('now');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<'ios' | 'android'>('ios');

  // ==================== HERO SECTION ====================
  const renderHero = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
    >
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Título con icono animado */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Bell className="w-10 h-10 text-yellow-300 animate-pulse" />
            <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Notificaciones Push <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Personalizadas</span>
          </h1>
        </div>

        {/* Descripción */}
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
          Mantén a tus usuarios <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">comprometidos</span> con mensajes relevantes y oportunos
        </p>

        {/* Indicadores pills */}
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <Sparkles className="w-5 h-5 text-green-300" />
            <span className="text-sm font-semibold text-white">Personalización avanzada</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <Target className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-semibold text-white">Segmentación inteligente</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <BarChart3 className="w-5 h-5 text-purple-300" />
            <span className="text-sm font-semibold text-white">Analytics en tiempo real</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ==================== ESTADÍSTICAS RÁPIDAS ====================
  const renderQuickStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickStats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Icono */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-8 h-8" />
            </div>

            {/* Título */}
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              {stat.label}
            </p>

            {/* Valor */}
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stat.value}
            </p>

            {/* Cambio */}
            <div className="flex items-center gap-2">
              <div className={`p-1 ${stat.change >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                {stat.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
              </div>
              <span className={`text-sm font-bold ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </span>
              <span className="text-xs text-gray-500 font-medium">vs anterior</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // ==================== NAVEGACIÓN DE TABS ====================
  const renderTabs = () => (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 mb-6 border border-white/50 flex flex-wrap gap-2">
      {[
        { id: 'composer', label: 'Compositor', icon: Edit },
        { id: 'scheduled', label: 'Programadas', icon: Calendar },
        { id: 'history', label: 'Historial', icon: Clock },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex-1 min-w-[140px] px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <tab.icon className="w-5 h-5" />
          {tab.label}
        </button>
      ))}
    </div>
  );

  // ==================== COMPOSITOR DE NOTIFICACIÓN ====================
  const renderComposer = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* EDITOR */}
      <div className="space-y-6">
        {/* Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Templates Predefinidos
            </h3>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {notificationTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setNotificationTitle(template.title);
                    setNotificationMessage(template.message);
                    setNotificationIcon(template.icon);
                    setSelectedTemplate(template.id);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{template.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{template.message}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Editor de notificación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Edit className="w-6 h-6 text-blue-600" />
              Crear Notificación
            </h3>

            <div className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título <span className="text-gray-400">({notificationTitle.length}/40)</span>
                </label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value.slice(0, 40))}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
                  placeholder="Escribe el título..."
                  maxLength={40}
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje <span className="text-gray-400">({notificationMessage.length}/120)</span>
                </label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value.slice(0, 120))}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white resize-none"
                  placeholder="Escribe el mensaje..."
                  rows={4}
                  maxLength={120}
                />
              </div>

              {/* Icono */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Icono / Emoji
                </label>
                <input
                  type="text"
                  value={notificationIcon}
                  onChange={(e) => setNotificationIcon(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
                  placeholder="🔔"
                />
              </div>

              {/* Deep link */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <LinkIcon className="w-4 h-4 inline mr-1" />
                  Deep Link (opcional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
                  placeholder="myapp://screen/workout"
                />
              </div>

              {/* Call to action */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Botón de acción (opcional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
                  placeholder="Ver ahora"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Segmentación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Segmentación de Audiencia
            </h3>

            <div className="space-y-2">
              {segments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedSegment === segment.id
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-500'
                      : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${selectedSegment === segment.id ? 'bg-purple-500' : 'bg-gray-200'}`}>
                      <segment.icon className={`w-5 h-5 ${selectedSegment === segment.id ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{segment.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{segment.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">{segment.userCount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">usuarios</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Programación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-teal-600" />
              Programación de Envío
            </h3>

            <div className="space-y-3">
              {[
                { id: 'now', label: 'Enviar ahora', icon: Send, description: 'Envío inmediato' },
                { id: 'scheduled', label: 'Programar', icon: Calendar, description: 'Seleccionar fecha y hora' },
                { id: 'recurring', label: 'Recurrente', icon: Clock, description: 'Repetir periódicamente' },
                { id: 'event', label: 'Basado en evento', icon: Zap, description: 'Activar por comportamiento' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSchedulingType(option.id as any)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                    schedulingType === option.id
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-500'
                      : 'bg-white border-gray-200 hover:border-teal-300 hover:bg-teal-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${schedulingType === option.id ? 'bg-teal-500' : 'bg-gray-200'}`}>
                      <option.icon className={`w-5 h-5 ${schedulingType === option.id ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{option.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </div>
                </button>
              ))}

              {schedulingType === 'scheduled' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 space-y-3"
                >
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded" />
                    <span>Usar zona horaria del usuario</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded" />
                    <span>Quiet hours (no enviar 22:00-08:00)</span>
                  </label>
                </motion.div>
              )}
            </div>

            {/* Botón de envío */}
            <button className="w-full mt-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group">
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {schedulingType === 'now' ? 'Enviar Ahora' : 'Programar Envío'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* PREVIEW */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden sticky top-6"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-6 h-6 text-indigo-600" />
                Preview en Tiempo Real
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview('ios')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    showPreview === 'ios'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  iOS
                </button>
                <button
                  onClick={() => setShowPreview('android')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    showPreview === 'android'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Android
                </button>
              </div>
            </div>

            {/* Mock del teléfono */}
            <div className="relative mx-auto max-w-sm">
              {showPreview === 'ios' ? (
                // iOS Preview
                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-black rounded-[2.5rem] p-2">
                    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="px-6 py-2 flex justify-between items-center text-white text-xs">
                        <span>9:41</span>
                        <div className="flex gap-1 items-center">
                          <div className="w-4 h-3 border border-white rounded-sm"></div>
                          <div className="w-1 h-3 bg-white rounded-sm"></div>
                        </div>
                      </div>

                      {/* Lock screen notification */}
                      <div className="px-4 py-6">
                        <motion.div
                          key={notificationTitle + notificationMessage}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-xl"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                              {notificationIcon || '🔔'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-bold text-sm mb-1">
                                {notificationTitle || 'Título de notificación'}
                              </p>
                              <p className="text-gray-300 text-xs leading-relaxed">
                                {notificationMessage || 'Escribe un mensaje para ver el preview...'}
                              </p>
                              <p className="text-gray-500 text-xs mt-2">ahora</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Android Preview
                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-gray-100 px-6 py-3 flex justify-between items-center text-xs text-gray-700">
                      <span>9:41</span>
                      <div className="flex gap-2 items-center">
                        <Activity className="w-3 h-3" />
                        <Users className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Notification */}
                    <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                      <motion.div
                        key={notificationTitle + notificationMessage}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                            {notificationIcon || '🔔'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-gray-900 font-bold text-sm">
                                {notificationTitle || 'Título de notificación'}
                              </p>
                              <span className="text-gray-500 text-xs">ahora</span>
                            </div>
                            <p className="text-gray-700 text-xs leading-relaxed">
                              {notificationMessage || 'Escribe un mensaje para ver el preview...'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Expandable hint */}
                    <div className="flex justify-center py-2">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Variables dinámicas */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
              <p className="text-sm font-bold text-indigo-900 mb-2">Variables disponibles:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { var: '{{nombre}}', label: 'Nombre' },
                  { var: '{{apellido}}', label: 'Apellido' },
                  { var: '{{objetivo}}', label: 'Objetivo' },
                  { var: '{{dias_racha}}', label: 'Días racha' },
                  { var: '{{proxima_sesion}}', label: 'Próxima sesión' },
                ].map((item) => (
                  <button
                    key={item.var}
                    onClick={() => setNotificationMessage(notificationMessage + ' ' + item.var)}
                    className="px-3 py-1 bg-white border border-indigo-300 rounded-lg text-xs font-mono text-indigo-700 hover:bg-indigo-50 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // ==================== NOTIFICACIONES PROGRAMADAS ====================
  const renderScheduled = () => (
    <div className="space-y-6">
      {/* Calendario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Calendario de Notificaciones
          </h3>

          {/* Mini calendario simplificado */}
          <div className="grid grid-cols-7 gap-2">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
              <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const dateStr = `2025-10-${String(day).padStart(2, '0')}`;
              const hasEvent = calendarEvents.some((e) => e.date === dateStr);
              const events = calendarEvents.filter((e) => e.date === dateStr);

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all cursor-pointer ${
                    hasEvent
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg hover:scale-110'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day}
                  {hasEvent && (
                    <div className="flex gap-0.5 mt-1">
                      {events.slice(0, 3).map((event, idx) => (
                        <div key={idx} className={`w-1 h-1 rounded-full ${event.color}`}></div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Lista de programadas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" />
            Próximas Notificaciones
          </h3>

          <div className="space-y-3">
            {scheduledNotifications
              .filter((n) => n.status === 'scheduled')
              .map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500 rounded-2xl text-white">
                      <Bell className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {new Date(notification.scheduledDate).toLocaleDateString('es-ES')}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          {new Date(notification.scheduledDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Users className="w-3 h-3" />
                          {notification.segment}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white rounded-xl hover:bg-blue-100 transition-colors">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 bg-white rounded-xl hover:bg-red-100 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  // ==================== HISTORIAL ====================
  const renderHistory = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-600" />
            Historial de Envíos
          </h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {scheduledNotifications
            .filter((n) => n.status === 'sent')
            .map((notification, index) => {
              const stats = notification.stats!;
              const openRate = ((stats.opened / stats.delivered) * 100).toFixed(1);
              const clickRate = ((stats.clicked / stats.opened) * 100).toFixed(1);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl text-white">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {new Date(notification.scheduledDate).toLocaleDateString('es-ES')}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Users className="w-3 h-3" />
                            {notification.segment}
                          </div>
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                            Enviada
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-100 rounded-xl hover:bg-blue-100 transition-colors">
                        <Copy className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{stats.sent.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 mt-1">Enviadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{stats.delivered.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 mt-1">Entregadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{openRate}%</p>
                      <p className="text-xs text-gray-600 mt-1">Tasa Apertura</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-pink-600">{clickRate}%</p>
                      <p className="text-xs text-gray-600 mt-1">Tasa Clicks</p>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mt-4">
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-200">
                      <div
                        className="bg-blue-500"
                        style={{ width: `${(stats.delivered / stats.sent) * 100}%` }}
                      ></div>
                      <div
                        className="bg-purple-500"
                        style={{ width: `${(stats.opened / stats.sent) * 100}%` }}
                      ></div>
                      <div
                        className="bg-pink-500"
                        style={{ width: `${(stats.clicked / stats.sent) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );

  // ==================== ANALYTICS ====================
  const renderAnalytics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Resumen general */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden lg:col-span-2"
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Resumen de Rendimiento
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Enviadas (Semana)', value: '24,567', icon: Send, color: 'from-blue-500 to-cyan-600' },
              { label: 'Tasa Apertura Media', value: '64.2%', icon: Eye, color: 'from-purple-500 to-pink-600' },
              { label: 'Mejor Horario', value: '09:00 AM', icon: Clock, color: 'from-emerald-500 to-teal-600' },
              { label: 'Engagement Rate', value: '38.9%', icon: TrendingUp, color: 'from-orange-500 to-red-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mejores tipos de mensaje */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Tipos de Mensaje Más Efectivos
          </h3>

          <div className="space-y-3">
            {[
              { type: 'Motivacionales', rate: 78.5, color: 'bg-blue-500' },
              { type: 'Logros', rate: 72.3, color: 'bg-purple-500' },
              { type: 'Recordatorios', rate: 65.8, color: 'bg-teal-500' },
              { type: 'Promocionales', rate: 54.2, color: 'bg-pink-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{item.type}</span>
                  <span className="text-sm font-bold text-gray-900">{item.rate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.rate}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-full ${item.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mejores horarios (Heatmap simplificado) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-teal-600" />
            Mejores Horarios de Envío
          </h3>

          <div className="space-y-2">
            {[
              { hour: '08:00 - 10:00', engagement: 92 },
              { hour: '12:00 - 14:00', engagement: 76 },
              { hour: '18:00 - 20:00', engagement: 84 },
              { hour: '20:00 - 22:00', engagement: 68 },
            ].map((slot, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 w-32">{slot.hour}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${slot.engagement}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-end pr-3"
                  >
                    <span className="text-xs font-bold text-white">{slot.engagement}%</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Estado de permisos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden lg:col-span-2"
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600" />
            Estado de Permisos Push
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center text-white mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold text-green-700">78.4%</p>
              <p className="text-sm text-gray-700 mt-2">Push Habilitado</p>
              <p className="text-xs text-gray-600 mt-1">8,432 usuarios</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
              <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center text-white mb-4">
                <XCircle className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold text-red-700">12.8%</p>
              <p className="text-sm text-gray-700 mt-2">Rechazaron</p>
              <p className="text-xs text-gray-600 mt-1">1,378 usuarios</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200">
              <div className="w-16 h-16 rounded-2xl bg-gray-500 flex items-center justify-center text-white mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold text-gray-700">8.8%</p>
              <p className="text-sm text-gray-700 mt-2">Sin Responder</p>
              <p className="text-xs text-gray-600 mt-1">947 usuarios</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // ==================== RENDER PRINCIPAL ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {renderHero()}
        {renderQuickStats()}
        {renderTabs()}

        <AnimatePresence mode="wait">
          {activeTab === 'composer' && <div key="composer">{renderComposer()}</div>}
          {activeTab === 'scheduled' && <div key="scheduled">{renderScheduled()}</div>}
          {activeTab === 'history' && <div key="history">{renderHistory()}</div>}
          {activeTab === 'analytics' && <div key="analytics">{renderAnalytics()}</div>}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PersonalizacionPushPage;
