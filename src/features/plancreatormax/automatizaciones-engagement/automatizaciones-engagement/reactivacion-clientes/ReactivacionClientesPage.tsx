
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  Zap, 
  Target, 
  TrendingUp, 
  Mail,
  Phone,
  Gift,
  MessageSquare,
  Play,
  Settings,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

const ReactivacionClientesPage: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const stats = [
    { title: 'Clientes Inactivos', value: '127', change: '-8.2%', icon: Users, color: 'from-orange-500 to-red-600' },
    { title: 'Tasa Reactivación', value: '34%', change: '+12.5%', icon: Target, color: 'from-emerald-500 to-teal-600' },
    { title: 'Alertas Activas', value: '23', change: '+5.3%', icon: AlertTriangle, color: 'from-yellow-500 to-orange-600' },
    { title: 'ROI Reactivación', value: '280%', change: '+18.7%', icon: TrendingUp, color: 'from-purple-500 to-pink-600' }
  ];

  const inactiveClients = [
    {
      id: 1,
      name: 'María González',
      lastActivity: '15 días',
      riskLevel: 'Alto',
      plan: 'Premium',
      avatar: 'M',
      actions: ['email', 'call', 'offer']
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      lastActivity: '8 días',
      riskLevel: 'Medio',
      plan: 'Pro',
      avatar: 'C',
      actions: ['email', 'offer']
    },
    {
      id: 3,
      name: 'Ana Martínez',
      lastActivity: '22 días',
      riskLevel: 'Crítico',
      plan: 'Premium',
      avatar: 'A',
      actions: ['call', 'offer', 'personal']
    },
    {
      id: 4,
      name: 'Luis Fernández',
      lastActivity: '12 días',
      riskLevel: 'Medio',
      plan: 'Basic',
      avatar: 'L',
      actions: ['email', 'offer']
    }
  ];

  const reactivationActions = [
    {
      id: 'email',
      title: 'Email Personalizado',
      description: 'Envía un email personalizado con oferta especial',
      icon: Mail,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      successRate: 78,
      avgResponse: '2.3 días'
    },
    {
      id: 'call',
      title: 'Llamada Directa',
      description: 'Contacto telefónico personalizado',
      icon: Phone,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      successRate: 65,
      avgResponse: '1.2 días'
    },
    {
      id: 'offer',
      title: 'Oferta Especial',
      description: 'Descuento exclusivo para reactivación',
      icon: Gift,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      successRate: 82,
      avgResponse: '0.8 días'
    },
    {
      id: 'personal',
      title: 'Mensaje Personal',
      description: 'Mensaje directo desde el entrenador',
      icon: MessageSquare,
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      successRate: 89,
      avgResponse: '1.5 días'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Cliente Crítico',
      message: 'Ana Martínez no ha entrenado en 22 días',
      time: 'Hace 2 horas',
      action: 'Llamada urgente recomendada'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Riesgo de Abandono',
      message: 'María González muestra señales de desinterés',
      time: 'Hace 4 horas',
      action: 'Enviar oferta especial'
    },
    {
      id: 3,
      type: 'info',
      title: 'Oportunidad de Reactivación',
      message: 'Carlos Ruiz completó su plan anterior',
      time: 'Hace 6 horas',
      action: 'Sugerir nuevo plan'
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
              <RefreshCw className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Reactivación de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Clientes</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Recupera <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">clientes inactivos</span> con estrategias inteligentes y personalizadas.
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">34% Reactivación</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <AlertTriangle className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">23 Alertas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">280% ROI</span>
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
                <div className={`p-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-50' : 'bg-red-50'}`}>
                  <TrendingUp className={`w-4 h-4 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
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

      {/* Clientes Inactivos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                  Clientes Inactivos
                </h2>
                <p className="text-gray-600 mt-1">Gestiona y reactiva clientes que han dejado de ser activos</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              Actualizar Lista
            </motion.button>
          </div>

          {/* Lista de Clientes */}
          <div className="space-y-4">
            {inactiveClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.6, duration: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 border border-transparent hover:border-orange-100 hover:shadow-md group"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-orange-400 to-red-600">
                  <span className="text-lg">{client.avatar}</span>
                </div>

                {/* Información del Cliente */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-gray-900">{client.name}</p>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      client.riskLevel === 'Crítico' 
                        ? 'bg-red-100 text-red-700' 
                        : client.riskLevel === 'Alto'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {client.riskLevel}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    Plan <span className="font-semibold">{client.plan}</span> • Última actividad: {client.lastActivity}
                  </p>
                  <div className="flex items-center gap-2">
                    {client.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                        {action === 'email' && <Mail className="w-3 h-3 text-blue-600" />}
                        {action === 'call' && <Phone className="w-3 h-3 text-green-600" />}
                        {action === 'offer' && <Gift className="w-3 h-3 text-purple-600" />}
                        {action === 'personal' && <MessageSquare className="w-3 h-3 text-pink-600" />}
                        <span className="text-xs font-medium text-gray-600 capitalize">{action}</span>
                      </div>
                    ))}
                  </div>
        </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Acciones de Reactivación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  Acciones de Reactivación
                </h2>
                <p className="text-gray-600 mt-1">Estrategias probadas para recuperar clientes</p>
              </div>
            </div>

            {/* Grid de Acciones */}
            <div className="space-y-4">
              {reactivationActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 relative group cursor-pointer ${
                    selectedAction === action.id ? 'ring-2 ring-emerald-500' : ''
                  }`}
                  onClick={() => setSelectedAction(action.id)}
                >
                  {/* Header con gradiente */}
                  <div className={`bg-gradient-to-r ${action.gradient} p-4 relative overflow-hidden`}>
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
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{action.title}</h3>
                          <p className="text-blue-100 text-sm">{action.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{action.successRate}%</p>
                        <p className="text-blue-100 text-xs">Éxito</p>
                      </div>
                    </div>
                  </div>

                  {/* Body con métricas */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Tiempo promedio de respuesta:</span>
                      <span className="text-sm font-bold text-gray-900">{action.avgResponse}</span>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-100 transition-colors duration-300"
                      >
                        <Play className="w-4 h-4" />
                        Ejecutar
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

        {/* Alertas de Reactivación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
                  Alertas de Reactivación
                </h2>
                <p className="text-gray-600 mt-1">Notificaciones importantes sobre clientes</p>
              </div>
            </div>

            {/* Lista de Alertas */}
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 1, duration: 0.4 }}
                  className={`p-4 rounded-2xl border-l-4 ${
                    alert.type === 'critical' 
                      ? 'bg-red-50 border-red-500' 
                      : alert.type === 'warning'
                      ? 'bg-orange-50 border-orange-500'
                      : 'bg-blue-50 border-blue-500'
                  } hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      alert.type === 'critical' 
                        ? 'bg-red-100 text-red-600' 
                        : alert.type === 'warning'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {alert.type === 'critical' && <XCircle className="w-5 h-5" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                      {alert.type === 'info' && <CheckCircle className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{alert.title}</h3>
                      <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{alert.time}</span>
                        <span className="text-xs font-semibold text-indigo-600">{alert.action}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReactivacionClientesPage;
