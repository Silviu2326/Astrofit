import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Target, 
  Zap, 
  BarChart3, 
  Send, 
  Edit3, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Play,
  Pause,
  Settings,
  Eye,
  Copy,
  Plus,
  Filter,
  Search
} from 'lucide-react';

const MensajesPersonalizadosPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const stats = [
    { title: 'Mensajes Enviados', value: '2,847', change: '+18.3%', icon: Send, color: 'from-blue-500 to-indigo-600' },
    { title: 'Tasa Apertura', value: '94%', change: '+5.2%', icon: Eye, color: 'from-emerald-500 to-teal-600' },
    { title: 'Tasa Conversión', value: '23%', change: '+12.1%', icon: Target, color: 'from-purple-500 to-pink-600' },
    { title: 'ROI Mensajería', value: '450%', change: '+28.7%', icon: BarChart3, color: 'from-orange-500 to-red-600' }
  ];

  const messageTemplates = [
    {
      id: 'welcome',
      title: 'Bienvenida Personalizada',
      description: 'Mensaje de bienvenida con nombre y objetivos personalizados',
      icon: MessageSquare,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      status: 'active',
      sent: 1247,
      openRate: 96,
      conversionRate: 28
    },
    {
      id: 'reactivation',
      title: 'Reactivación de Clientes',
      description: 'Secuencia para reactivar clientes inactivos con ofertas especiales',
      icon: Zap,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      status: 'active',
      sent: 892,
      openRate: 89,
      conversionRate: 19
    },
    {
      id: 'milestone',
      title: 'Celebración de Logros',
      description: 'Mensajes automáticos para celebrar hitos y logros del cliente',
      icon: CheckCircle,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      status: 'paused',
      sent: 456,
      openRate: 92,
      conversionRate: 31
    },
    {
      id: 'reminder',
      title: 'Recordatorios Inteligentes',
      description: 'Recordatorios personalizados basados en el comportamiento',
      icon: Clock,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      status: 'active',
      sent: 1783,
      openRate: 87,
      conversionRate: 15
    }
  ];

  const recentMessages = [
    {
      id: 1,
      recipient: 'María González',
      template: 'Bienvenida Personalizada',
      sent: '2024-01-15 14:30',
      status: 'delivered',
      openRate: 100,
      action: 'Se unió al plan Premium'
    },
    {
      id: 2,
      recipient: 'Carlos Ruiz',
      template: 'Reactivación de Clientes',
      sent: '2024-01-15 12:15',
      status: 'opened',
      openRate: 100,
      action: 'Completó entrenamiento'
    },
    {
      id: 3,
      recipient: 'Ana Martínez',
      template: 'Celebración de Logros',
      sent: '2024-01-15 10:45',
      status: 'converted',
      openRate: 100,
      action: 'Renovó suscripción'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <MessageSquare className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Mensajes <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Personalizados</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Crea <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">mensajes únicos</span> que conecten con cada cliente en el momento perfecto.
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">94% Apertura</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">23% Conversión</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">450% ROI</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${75 + index * 5}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Plantillas de Mensajes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Plantillas de Mensajes
                </h2>
                <p className="text-gray-600 mt-1">Gestiona y personaliza tus plantillas de mensajería</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Nueva Plantilla
            </motion.button>
          </div>

          {/* Grid de Plantillas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messageTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 relative group cursor-pointer ${
                  selectedTemplate === template.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${template.gradient} p-4 relative overflow-hidden`}>
                  {/* Pattern de fondo */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <template.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{template.title}</h3>
                        <p className="text-blue-100 text-sm">{template.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      template.status === 'active' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {template.status === 'active' ? 'Activo' : 'Pausado'}
                    </div>
                  </div>
                </div>

                {/* Body con métricas */}
    <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{template.sent}</p>
                      <p className="text-xs text-gray-500 font-medium">Enviados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">{template.openRate}%</p>
                      <p className="text-xs text-gray-500 font-medium">Apertura</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{template.conversionRate}%</p>
                      <p className="text-xs text-gray-500 font-medium">Conversión</p>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-100 transition-colors duration-300"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-100 transition-colors duration-300"
                    >
                      {template.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {template.status === 'active' ? 'Pausar' : 'Activar'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                    >
                      <Settings className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mensajes Recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  Mensajes Recientes
                </h2>
                <p className="text-gray-600 mt-1">Últimos mensajes enviados y su rendimiento</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                Filtrar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                Buscar
              </motion.button>
            </div>
          </div>

          {/* Lista de Mensajes */}
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 1, duration: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-blue-400 to-indigo-600">
                  <span className="text-lg">{message.recipient.charAt(0)}</span>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-gray-900">{message.recipient}</p>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      message.status === 'converted' 
                        ? 'bg-green-100 text-green-700' 
                        : message.status === 'opened'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {message.status === 'converted' ? 'Convertido' : 
                       message.status === 'opened' ? 'Abierto' : 'Entregado'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">{message.template}</span> • {message.action}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Enviado: {message.sent}</span>
                    <span>Apertura: {message.openRate}%</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MensajesPersonalizadosPage;
