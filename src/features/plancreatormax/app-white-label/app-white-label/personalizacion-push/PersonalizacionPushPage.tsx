import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Send, 
  Users, 
  Clock, 
  Target,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react';

const PersonalizacionPushPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [notifications] = useState([
    {
      id: 1,
      title: 'Bienvenido a la app',
      message: '¡Gracias por descargar nuestra aplicación!',
      status: 'sent',
      sentAt: '2024-01-15',
      openRate: 85,
      clickRate: 23
    },
    {
      id: 2,
      title: 'Oferta especial',
      message: 'No te pierdas nuestra oferta del 50% de descuento',
      status: 'scheduled',
      sentAt: '2024-01-16',
      openRate: 0,
      clickRate: 0
    }
  ]);

  const tabs = [
    { id: 'create', name: 'Crear Notificación', icon: Plus },
    { id: 'segment', name: 'Segmentación', icon: Target },
    { id: 'schedule', name: 'Programar', icon: Clock },
    { id: 'analytics', name: 'Analíticas', icon: BarChart3 }
  ];

  const stats = [
    { title: 'Total Enviadas', value: '1,234', change: '+12.5%', icon: Send, color: 'from-blue-500 to-indigo-600' },
    { title: 'Tasa de Apertura', value: '68.2%', change: '+5.3%', icon: Eye, color: 'from-green-500 to-emerald-600' },
    { title: 'Tasa de Clics', value: '23.1%', change: '+2.1%', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
    { title: 'Usuarios Activos', value: '8,456', change: '+8.7%', icon: Users, color: 'from-orange-500 to-red-600' }
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
              <Bell className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Notificaciones <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Push</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Crea, segmenta y programa <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">notificaciones personalizadas</span> para maximizar el engagement
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Send className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Envío Inteligente</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Segmentación Avanzada</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Analíticas en Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
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
                  <IconComponent className="w-8 h-8" />
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
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>

                {/* Barra decorativa */}
                <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs de Navegación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 mb-8 border border-white/50"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.name}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Panel Principal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Plus className="w-6 h-6" />
                </div>
                Crear Nueva Notificación
              </h2>
            </div>

            {/* Formulario de Creación */}
            <div className="space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Título de la Notificación</label>
                <input
                  type="text"
                  placeholder="Ej: ¡Oferta especial para ti!"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>

              {/* Mensaje */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mensaje</label>
                <textarea
                  placeholder="Escribe el contenido de tu notificación..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                />
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Enviar Ahora
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-white/60 backdrop-blur-sm text-gray-700 font-bold py-4 px-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Programar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel Lateral - Historial */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                </div>
                Historial Reciente
              </h2>
            </div>

            {/* Lista de Notificaciones */}
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{notification.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{notification.message}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Estado y Métricas */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        notification.status === 'sent' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-xs font-medium text-gray-600 capitalize">{notification.status}</span>
                    </div>
                    
                    {notification.status === 'sent' && (
                      <div className="flex gap-3 text-xs">
                        <span className="text-green-600 font-medium">{notification.openRate}% abierto</span>
                        <span className="text-blue-600 font-medium">{notification.clickRate}% clics</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botón Ver Todas */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold rounded-2xl border border-indigo-200 hover:border-indigo-300 transition-all duration-300"
            >
              Ver Todas las Notificaciones
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalizacionPushPage;
