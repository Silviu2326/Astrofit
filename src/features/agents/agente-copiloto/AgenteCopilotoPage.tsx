import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  Zap,
  Apple,
  Dumbbell,
  Users,
  DollarSign,
  Megaphone,
  AlertCircle,
  ChevronRight,
  Play,
  Pause,
  MessageSquare,
  Calendar,
  Lightbulb,
  FileText,
  Bell,
  Settings,
  ArrowUpRight,
  Target,
  BarChart3,
  Send,
  Filter,
  Download,
  X
} from 'lucide-react';

// Datos mockeados completos
const mockStats = [
  { title: 'Tareas Automatizadas', value: '47', change: 24, icon: Zap, color: 'from-violet-500 to-purple-600' },
  { title: 'Tiempo Ahorrado', value: '12.5h', change: 18, icon: Clock, color: 'from-blue-500 to-indigo-600' },
  { title: 'Sugerencias Aplicadas', value: '31', change: 15, icon: CheckCircle, color: 'from-emerald-500 to-teal-600' },
  { title: 'Eficiencia', value: '94%', change: 8, icon: TrendingUp, color: 'from-orange-500 to-pink-600' }
];

const mockSugerencias = [
  { id: 1, tipo: 'Nutrición', icon: Apple, color: 'from-green-500 to-emerald-600', bgColor: 'from-green-50 to-emerald-50', titulo: 'Plan nutricional para María', descripcion: 'Ajustar macros para fase de definición', prioridad: 'Alta' },
  { id: 2, tipo: 'Entrenamiento', icon: Dumbbell, color: 'from-blue-500 to-indigo-600', bgColor: 'from-blue-50 to-indigo-50', titulo: 'Optimizar rutina de Juan', descripcion: 'Incrementar volumen en piernas', prioridad: 'Alta' },
  { id: 3, tipo: 'Clientes', icon: Users, color: 'from-pink-500 to-rose-600', bgColor: 'from-pink-50 to-rose-50', titulo: 'Seguimiento a 3 clientes', descripcion: 'Sin contacto en 7 días', prioridad: 'Media' },
  { id: 4, tipo: 'Finanzas', icon: DollarSign, color: 'from-yellow-500 to-amber-600', bgColor: 'from-yellow-50 to-amber-50', titulo: 'Pagos pendientes', descripcion: '2 clientes con facturas vencidas', prioridad: 'Alta' },
  { id: 5, tipo: 'Marketing', icon: Megaphone, color: 'from-orange-500 to-red-600', bgColor: 'from-orange-50 to-red-50', titulo: 'Publicar contenido', descripcion: 'Mejor momento: Martes 10am', prioridad: 'Baja' },
  { id: 6, tipo: 'Nutrición', icon: Apple, color: 'from-green-500 to-emerald-600', bgColor: 'from-green-50 to-emerald-50', titulo: 'Recetas saludables', descripcion: 'Compartir nuevas opciones con clientes', prioridad: 'Baja' }
];

const mockAutomatizaciones = [
  { id: 1, nombre: 'Recordatorio de Sesiones', trigger: 'Sesión en 24h', acciones: 'Enviar WhatsApp + Email', estado: 'Activa', ejecuciones: 127 },
  { id: 2, nombre: 'Seguimiento Post-Entreno', trigger: 'Sesión completada', acciones: 'Solicitar feedback + Registrar progreso', estado: 'Activa', ejecuciones: 89 },
  { id: 3, nombre: 'Alertas de Pago', trigger: 'Pago vencido', acciones: 'Notificar cliente + Registrar en finanzas', estado: 'Activa', ejecuciones: 12 },
  { id: 4, nombre: 'Plan Nutricional Semanal', trigger: 'Domingo 8pm', acciones: 'Generar y enviar plan', estado: 'Pausada', ejecuciones: 43 },
  { id: 5, nombre: 'Reporte de Progreso', trigger: 'Fin de mes', acciones: 'Generar informe + Enviar cliente', estado: 'Activa', ejecuciones: 6 }
];

const mockChatHistory = [
  { tipo: 'user', mensaje: '¿Cuántos clientes tengo activos?' },
  { tipo: 'assistant', mensaje: 'Tienes 34 clientes activos. 28 con plan mensual y 6 con sesiones individuales.' },
  { tipo: 'user', mensaje: 'Muéstrame los ingresos del mes' },
  { tipo: 'assistant', mensaje: 'Ingresos de octubre: $12,450. Esto representa un aumento del 18% vs. septiembre.' }
];

const mockAgenda = [
  { hora: '09:00', evento: 'Sesión con María González', tipo: 'sesion' },
  { hora: '10:30', evento: 'Revisar plan nutricional Juan', tipo: 'tarea' },
  { hora: '12:00', evento: 'Bloque de enfoque sugerido', tipo: 'sugerencia' },
  { hora: '16:00', evento: 'Sesión con Pedro Martínez', tipo: 'sesion' },
  { hora: '18:00', evento: 'Llamada seguimiento Laura', tipo: 'tarea' }
];

const mockInsights = [
  { id: 1, icono: Users, texto: '3 clientes sin contactar en 7 días', accion: 'Ver clientes', color: 'orange' },
  { id: 2, icono: TrendingUp, texto: 'Tus ventas aumentaron 18% este mes', accion: 'Ver detalles', color: 'green' },
  { id: 3, icono: Target, texto: 'María cumplió su objetivo de peso', accion: 'Celebrar', color: 'blue' },
  { id: 4, icono: Calendar, texto: 'Mejor día para publicar: Martes 10am', accion: 'Programar', color: 'purple' },
  { id: 5, icono: Dumbbell, texto: 'Juan necesita nueva rutina en 3 días', accion: 'Crear rutina', color: 'indigo' }
];

const mockNotificaciones = [
  { id: 1, tipo: 'success', icono: Target, texto: 'María cumplió objetivo de peso', prioridad: 'Media', accion: 'Celebrar' },
  { id: 2, tipo: 'warning', icono: DollarSign, texto: 'Pago pendiente: Juan Pérez', prioridad: 'Alta', accion: 'Recordar' },
  { id: 3, tipo: 'info', icono: Calendar, texto: 'Sesión cancelada: Pedro López', prioridad: 'Media', accion: 'Reprogramar' },
  { id: 4, tipo: 'success', icono: Sparkles, texto: 'Oportunidad de upsell con Laura', prioridad: 'Baja', accion: 'Ver detalles' }
];

const AgenteCopilotoPage: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const [proactividad, setProactividad] = useState(75);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 pb-12">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Bot className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Agente <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Copiloto</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl leading-relaxed">
            Tu asistente inteligente para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">gestionar tu negocio</span>
          </p>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">hoy</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DASHBOARD DE SUGERENCIAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-600" />
            Sugerencias Inteligentes
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 text-sm font-semibold hover:bg-purple-100 transition-colors">
              <Filter className="w-4 h-4 inline mr-1" />
              Filtrar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSugerencias.map((sug, index) => (
            <motion.div
              key={sug.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={`bg-gradient-to-br ${sug.bgColor} rounded-2xl p-5 border-2 border-transparent hover:border-purple-300 transition-all duration-300 group cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sug.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <sug.icon className="w-6 h-6" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  sug.prioridad === 'Alta' ? 'bg-red-500 text-white' :
                  sug.prioridad === 'Media' ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {sug.prioridad}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 mb-1">{sug.titulo}</h3>
              <p className="text-sm text-gray-600 mb-4">{sug.descripcion}</p>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-white rounded-xl text-sm font-semibold text-purple-700 hover:bg-purple-50 transition-colors">
                  Aplicar
                </button>
                <button className="px-3 py-2 bg-white/50 rounded-xl text-sm text-gray-600 hover:bg-white transition-colors">
                  Ver más
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* AUTOMATIZACIONES ACTIVAS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-7 h-7 text-indigo-600" />
              Automatizaciones
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
              + Nueva
            </button>
          </div>

          <div className="space-y-3">
            {mockAutomatizaciones.map((auto, index) => (
              <motion.div
                key={auto.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      {auto.nombre}
                      {auto.estado === 'Activa' ? (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">Activa</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-400 text-white text-xs rounded-full">Pausada</span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1"><strong>Trigger:</strong> {auto.trigger}</p>
                    <p className="text-xs text-gray-600"><strong>Acciones:</strong> {auto.acciones}</p>
                  </div>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    {auto.estado === 'Activa' ? <Pause className="w-5 h-5 text-indigo-600" /> : <Play className="w-5 h-5 text-green-600" />}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-purple-200">
                  <span className="text-xs text-gray-500">Ejecutada <strong>{auto.ejecuciones}</strong> veces</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ASISTENTE CONVERSACIONAL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-purple-600" />
            Asistente IA
          </h2>

          <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-4 h-64 overflow-y-auto mb-4 space-y-3">
            {mockChatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.tipo === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'bg-white border border-purple-200 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.mensaje}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Escribe un comando..."
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs rounded-full font-semibold hover:bg-purple-100 transition-colors">
              Crea una rutina para Juan
            </button>
            <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs rounded-full font-semibold hover:bg-indigo-100 transition-colors">
              Muéstrame ingresos del mes
            </button>
            <button className="px-3 py-1.5 bg-pink-50 text-pink-700 text-xs rounded-full font-semibold hover:bg-pink-100 transition-colors">
              Programa mensaje de seguimiento
            </button>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* AGENDA INTELIGENTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-7 h-7 text-blue-600" />
            Agenda Hoy
          </h2>

          <div className="space-y-3">
            {mockAgenda.map((evento, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <div className="text-sm font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">
                  {evento.hora}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${
                    evento.tipo === 'sesion' ? 'text-blue-700' :
                    evento.tipo === 'tarea' ? 'text-gray-700' :
                    'text-purple-700'
                  }`}>
                    {evento.evento}
                  </p>
                  {evento.tipo === 'sugerencia' && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">IA Sugerido</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Optimizar Calendario
          </button>
        </motion.div>

        {/* INSIGHTS DE NEGOCIO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-7 h-7 text-yellow-600" />
            Insights de Negocio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-br ${
                  insight.color === 'orange' ? 'from-orange-50 to-red-50' :
                  insight.color === 'green' ? 'from-green-50 to-emerald-50' :
                  insight.color === 'blue' ? 'from-blue-50 to-indigo-50' :
                  insight.color === 'purple' ? 'from-purple-50 to-pink-50' :
                  'from-indigo-50 to-purple-50'
                } rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                    insight.color === 'orange' ? 'from-orange-500 to-red-600' :
                    insight.color === 'green' ? 'from-green-500 to-emerald-600' :
                    insight.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                    insight.color === 'purple' ? 'from-purple-500 to-pink-600' :
                    'from-indigo-500 to-purple-600'
                  } flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    <insight.icono className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{insight.texto}</p>
                    <button className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 group-hover:gap-2 transition-all">
                      {insight.accion}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* GENERADOR DE REPORTES */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-7 h-7 text-emerald-600" />
            Generador de Reportes
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Métricas a incluir</label>
              <div className="flex flex-wrap gap-2">
                {['Ingresos', 'Clientes', 'Sesiones', 'Progreso'].map((metrica) => (
                  <button key={metrica} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-colors">
                    ✓ {metrica}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rango de fechas</label>
              <select className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none">
                <option>Última semana</option>
                <option>Último mes</option>
                <option>Último trimestre</option>
                <option>Personalizado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Formato</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  PDF
                </button>
                <button className="px-4 py-2 border-2 border-emerald-500 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all">
                  Excel
                </button>
              </div>
            </div>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Generar Reporte
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Reportes Recientes</h3>
            <div className="space-y-2">
              {['Resumen Octubre 2024', 'Progreso Q3 2024'].map((reporte, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold text-gray-800">{reporte}</span>
                  <Download className="w-4 h-4 text-emerald-600" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CENTRO DE NOTIFICACIONES */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-7 h-7 text-orange-600" />
              Notificaciones
              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">4</span>
            </h2>
            <button className="text-sm text-purple-700 font-semibold hover:text-purple-900">
              Ver todas
            </button>
          </div>

          <div className="space-y-3">
            {mockNotificaciones.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border-2 hover:shadow-md transition-all group ${
                  notif.tipo === 'success' ? 'bg-green-50 border-green-200' :
                  notif.tipo === 'warning' ? 'bg-orange-50 border-orange-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notif.tipo === 'success' ? 'bg-green-500' :
                    notif.tipo === 'warning' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    <notif.icono className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">{notif.texto}</p>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        notif.prioridad === 'Alta' ? 'bg-red-500 text-white' :
                        notif.prioridad === 'Media' ? 'bg-yellow-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {notif.prioridad}
                      </span>
                    </div>
                    <button className={`text-xs font-bold flex items-center gap-1 ${
                      notif.tipo === 'success' ? 'text-green-700' :
                      notif.tipo === 'warning' ? 'text-orange-700' :
                      'text-blue-700'
                    }`}>
                      {notif.accion}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MODO DELEGACIÓN Y CONFIGURACIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* MODO DELEGACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-7 h-7 text-pink-600" />
            Modo Delegación
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Seguimiento clientes inactivos</h3>
                  <p className="text-sm text-gray-600">Enviando mensajes personalizados...</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="w-full bg-pink-200 rounded-full h-2">
                <div className="w-3/4 h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full"></div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Optimización de rutinas ✓</h3>
                  <p className="text-sm text-gray-600">12 rutinas optimizadas</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <textarea
              placeholder="Delegar nueva tarea al copiloto..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all outline-none resize-none h-24"
            />

            <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Delegar Tarea
            </button>
          </div>
        </motion.div>

        {/* CONFIGURACIÓN DE IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Settings className="w-7 h-7 text-indigo-600" />
            Configuración IA
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Nivel de Proactividad: <span className="text-indigo-600">{proactividad}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={proactividad}
                onChange={(e) => setProactividad(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Tipos de sugerencias activas</label>
              <div className="space-y-2">
                {['Nutrición', 'Entrenamiento', 'Clientes', 'Finanzas', 'Marketing'].map((tipo) => (
                  <label key={tipo} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-sm font-semibold text-gray-800">{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Tono de comunicación</label>
              <select className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none">
                <option>Profesional</option>
                <option>Amigable</option>
                <option>Casual</option>
                <option>Formal</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default AgenteCopilotoPage;
