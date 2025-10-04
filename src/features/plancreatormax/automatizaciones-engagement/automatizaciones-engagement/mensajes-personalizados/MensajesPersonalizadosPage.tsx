import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare, Send, Users, Heart, Mail, Smartphone, MessageCircle, Bell, Layout,
  Calendar, BarChart3, Filter, Sparkles, Clock, Target, ArrowUpRight,
  Copy, Edit, Trash2, Eye, Play
} from 'lucide-react';
import EditorMensajes from './components/EditorMensajes';
import SegmentacionAvanzada from './components/SegmentacionAvanzada';
import PreviewMulticanal from './components/PreviewMulticanal';
import PersonalizacionIA from './components/PersonalizacionIA';

const MensajesPersonalizadosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'templates' | 'historial' | 'calendario' | 'analytics'>('editor');

  const quickStats = [
    { title: 'Mensajes Enviados', value: '47,283', change: '+18.2', icon: Send, color: 'from-pink-500 to-rose-500' },
    { title: 'Tasa de Apertura', value: '68.5%', change: '+5.3', icon: Mail, color: 'from-purple-500 to-pink-500' },
    { title: 'Respuestas', value: '12,847', change: '+22.1', icon: MessageCircle, color: 'from-rose-500 to-red-500' },
    { title: 'Engagement Score', value: '92.3', change: '+8.7', icon: Heart, color: 'from-red-500 to-pink-500' }
  ];

  const messageTemplates = {
    motivacionales: [
      { id: 't1', nombre: '¡Sigue así!', asunto: '¡{{nombre}}, estás en racha! =%', mensaje: '¡Increíble {{nombre}}! Llevas {{dias_activo}} días consecutivos.', canal: 'email', usos: 1247 },
      { id: 't2', nombre: 'Racha Activa', asunto: '{{dias_activo}} días de constancia =ª', mensaje: 'Hey {{nombre}}, ¡eres imparable!', canal: 'push', usos: 892 }
    ],
    recordatorios: [
      { id: 't3', nombre: 'Sesión Mañana', asunto: 'Tu sesión de mañana a las {{hora_sesion}}', mensaje: 'Hola {{nombre}}, recordatorio de sesión.', canal: 'sms', usos: 2134 },
      { id: 't4', nombre: 'Registrar Progreso', asunto: 'No olvides registrar tu progreso', mensaje: '{{nombre}}, actualiza tus avances.', canal: 'whatsapp', usos: 1567 }
    ],
    celebraciones: [
      { id: 't5', nombre: 'Cumpleaños', asunto: '¡Feliz cumpleaños {{nombre}}! <‰', mensaje: '¡Feliz cumpleaños {{nombre}}! <‚', canal: 'email', usos: 456 },
      { id: 't6', nombre: 'Objetivo Cumplido', asunto: '¡Objetivo cumplido: {{objetivo}}! <¯', mensaje: '¡Felicidades {{nombre}}!', canal: 'push', usos: 1891 }
    ],
    educativos: [
      { id: 't7', nombre: 'Tips Nutrición', asunto: 'Tip del día: Hidratación óptima', mensaje: 'Consejo de nutrición del día.', canal: 'email', usos: 3421 },
      { id: 't8', nombre: 'Técnica Entrenamiento', asunto: 'Mejora tu técnica', mensaje: 'Técnica del día para mejorar.', canal: 'push', usos: 2789 }
    ],
    promocionales: [
      { id: 't9', nombre: 'Oferta Especial', asunto: '< Oferta exclusiva para ti', mensaje: '¡{{nombre}}! Oferta especial.', canal: 'email', usos: 987 }
    ]
  };

  const messageHistory = [
    { id: 'm1', titulo: 'Promoción Verano 2024', asunto: 'Prepárate para el verano', canal: 'email', fecha: '2024-06-15', segmento: 'Clientes Premium', enviados: 3247, abiertos: 2134, clicks: 892, conversiones: 156, estado: 'Enviado' },
    { id: 'm2', titulo: 'Recordatorio Semanal', asunto: 'Tu resumen semanal', canal: 'push', fecha: '2024-06-14', segmento: 'Usuarios Activos', enviados: 8912, abiertos: 6234, clicks: 1456, conversiones: 234, estado: 'Enviado' },
    { id: 'm3', titulo: 'Tips de Nutrición', asunto: 'Mejora tu alimentación', canal: 'email', fecha: '2024-06-13', segmento: 'Todos los usuarios', enviados: 12456, abiertos: 8234, clicks: 2345, conversiones: 567, estado: 'Enviado' },
    { id: 'm4', titulo: 'Oferta Flash', asunto: '24h: Descuento especial', canal: 'sms', fecha: '2024-06-20', segmento: 'Clientes VIP', enviados: 0, abiertos: 0, clicks: 0, conversiones: 0, estado: 'Programado' }
  ];

  const scheduledMessages = [
    { fecha: '2024-06-18', titulo: 'Newsletter Semanal', canal: 'email', hora: '09:00' },
    { fecha: '2024-06-19', titulo: 'Recordatorio Sesiones', canal: 'push', hora: '18:00' },
    { fecha: '2024-06-20', titulo: 'Oferta Flash', canal: 'sms', hora: '10:00' },
    { fecha: '2024-06-20', titulo: 'Tips del Día', canal: 'push', hora: '14:00' },
    { fecha: '2024-06-21', titulo: 'Motivación Matutina', canal: 'whatsapp', hora: '07:00' },
    { fecha: '2024-06-22', titulo: 'Resumen Semanal', canal: 'email', hora: '20:00' }
  ];

  const getChannelIcon = (canal: string) => {
    const icons: Record<string, any> = { email: Mail, sms: Smartphone, whatsapp: MessageCircle, push: Bell };
    return icons[canal] || MessageSquare;
  };

  const getChannelColor = (canal: string) => {
    const colors: Record<string, string> = {
      email: 'from-blue-500 to-indigo-500',
      sms: 'from-green-500 to-emerald-500',
      whatsapp: 'from-emerald-500 to-teal-500',
      push: 'from-purple-500 to-pink-500'
    };
    return colors[canal] || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (estado: string) => {
    const colors: Record<string, string> = {
      Enviado: 'bg-green-100 text-green-700 border-green-200',
      Programado: 'bg-blue-100 text-blue-700 border-blue-200',
      Draft: 'bg-gray-100 text-gray-700 border-gray-200',
      Cancelado: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[estado] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Heart className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Mensajes Personalizados <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">a Escala</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed mb-6">
            Comunicación <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">relevante y contextual</span> para cada cliente
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Mail, label: 'Email', color: 'text-blue-200' },
              { icon: Smartphone, label: 'SMS', color: 'text-green-200' },
              { icon: MessageCircle, label: 'WhatsApp', color: 'text-emerald-200' },
              { icon: Bell, label: 'Push', color: 'text-purple-200' }
            ].map((channel, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <channel.icon className={`w-5 h-5 ${channel.color}`} />
                <span className="text-sm font-semibold text-white">{channel.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">{stat.title}</p>
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">{stat.value}</p>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                  <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TABS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 mb-8 border border-white/50"
      >
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'editor', label: 'Compositor', icon: Edit },
            { id: 'templates', label: 'Templates', icon: Layout },
            { id: 'historial', label: 'Historial', icon: Clock },
            { id: 'calendario', label: 'Calendario', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* CONTENIDO POR TAB */}
      {activeTab === 'editor' && (
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <EditorMensajes />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <SegmentacionAvanzada />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <PreviewMulticanal />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
            <PersonalizacionIA />
          </motion.div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          {Object.entries(messageTemplates).map(([categoria, templates], catIndex) => (
            <motion.div
              key={categoria}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 capitalize flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-pink-500" />
                {categoria}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template, index) => {
                  const ChannelIcon = getChannelIcon(template.canal);
                  return (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-4 border-2 border-pink-100 hover:border-pink-300 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${getChannelColor(template.canal)} text-white`}>
                          <ChannelIcon className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-pink-100 rounded-lg">
                          <Users className="w-3 h-3 text-pink-600" />
                          <span className="text-xs font-bold text-pink-600">{template.usos}</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{template.nombre}</h4>
                      <p className="text-sm text-gray-600 mb-2 font-semibold">{template.asunto}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{template.mensaje}</p>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                          Usar
                        </button>
                        <button className="px-3 py-2 border-2 border-pink-300 text-pink-600 rounded-xl text-sm font-semibold hover:bg-pink-50 transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'historial' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-pink-500" />
              Historial de Mensajes
            </h3>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
          <div className="space-y-3">
            {messageHistory.map((msg, index) => {
              const ChannelIcon = getChannelIcon(msg.canal);
              const openRate = msg.enviados > 0 ? ((msg.abiertos / msg.enviados) * 100).toFixed(1) : '0';
              const clickRate = msg.abiertos > 0 ? ((msg.clicks / msg.abiertos) * 100).toFixed(1) : '0';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="bg-gradient-to-r from-white to-pink-50/30 rounded-2xl p-5 border border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${getChannelColor(msg.canal)} text-white`}>
                        <ChannelIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-800 text-lg">{msg.titulo}</h4>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(msg.estado)}`}>
                            {msg.estado}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{msg.asunto}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {msg.fecha}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {msg.segmento}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-pink-100 text-gray-600 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-pink-100 text-gray-600 transition-all">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-pink-100 text-gray-600 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {msg.estado === 'Enviado' && (
                    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-pink-100">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Enviados</p>
                        <p className="text-lg font-bold text-gray-800">{msg.enviados.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Apertura</p>
                        <p className="text-lg font-bold text-blue-600">{openRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Clicks</p>
                        <p className="text-lg font-bold text-purple-600">{clickRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Conversiones</p>
                        <p className="text-lg font-bold text-green-600">{msg.conversiones}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {activeTab === 'calendario' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-pink-500" />
            Calendario de Mensajes
          </h3>
          <div className="space-y-4">
            {scheduledMessages.map((msg, index) => {
              const ChannelIcon = getChannelIcon(msg.canal);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white to-pink-50/30 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                      {new Date(msg.fecha).toLocaleDateString('es-ES', { month: 'short' })}
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                      {new Date(msg.fecha).getDate()}
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${getChannelColor(msg.canal)} text-white`}>
                    <ChannelIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{msg.titulo}</h4>
                    <p className="text-sm text-gray-500">Programado para las {msg.hora}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Enviar ahora
                    </button>
                    <button className="p-2 rounded-lg hover:bg-pink-100 text-gray-600 transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-pink-500" />
              Análisis de Rendimiento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Tasa de Entrega', value: '98.7%', color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Tasa de Apertura', value: '68.5%', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Tasa de Clicks', value: '24.3%', color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Tasa de Conversión', value: '4.8%', color: 'text-pink-600', bg: 'bg-pink-50' }
              ].map((metric, index) => (
                <div key={index} className={`${metric.bg} rounded-2xl p-4 border-2`}>
                  <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                  <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Rendimiento por Canal</h3>
            <div className="space-y-3">
              {[
                { canal: 'Email', enviados: 25847, apertura: 72.3, clicks: 28.5, color: 'from-blue-500 to-indigo-500' },
                { canal: 'Push', enviados: 18234, apertura: 85.1, clicks: 42.3, color: 'from-purple-500 to-pink-500' },
                { canal: 'SMS', enviados: 8472, apertura: 96.8, clicks: 18.7, color: 'from-green-500 to-emerald-500' },
                { canal: 'WhatsApp', enviados: 5730, apertura: 91.2, clicks: 35.4, color: 'from-emerald-500 to-teal-500' }
              ].map((channel, index) => (
                <div key={index} className="bg-gradient-to-r from-white to-pink-50/30 rounded-2xl p-4 border border-pink-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${channel.color}`}></div>
                      <span className="font-bold text-gray-800">{channel.canal}</span>
                    </div>
                    <span className="text-sm text-gray-600">{channel.enviados.toLocaleString()} mensajes</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Apertura</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${channel.color}`} style={{ width: `${channel.apertura}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{channel.apertura}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Clicks</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${channel.color}`} style={{ width: `${channel.clicks}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{channel.clicks}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MensajesPersonalizadosPage;
