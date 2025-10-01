import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, UserCheck, Calendar, DollarSign, TrendingUp, CheckCircle,
  UserPlus, Clock, Dumbbell, Apple, MessageSquare, BarChart, Settings,
  ArrowUpRight, ArrowDownRight, Sparkles, Activity, Target, Gift,
  AlertCircle, Zap
} from 'lucide-react';
import ClienteFormModal from '../../crm/crm/clientes-listado/components/ClienteFormModal';

// Tipos
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: number;
  color: string;
  delay: number;
}

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  route: string;
}

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
  icon: React.ReactNode;
}

const InicioPage: React.FC = () => {
  const [greeting, setGreeting] = useState('');

  // Determinar saludo según hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 20) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  // Datos mockeados - Estadísticas
  const stats: StatCardProps[] = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Total Clientes',
      value: 245,
      change: 12.5,
      color: 'from-blue-500 to-blue-600',
      delay: 0.1
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: 'Clientes Activos Hoy',
      value: 187,
      change: 8.3,
      color: 'from-green-500 to-emerald-600',
      delay: 0.2
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Entrenamientos Programados',
      value: 42,
      change: 15.2,
      color: 'from-purple-500 to-purple-600',
      delay: 0.3
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Ingresos del Mes',
      value: '€12,450',
      change: 23.8,
      color: 'from-emerald-500 to-teal-600',
      delay: 0.4
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Tasa de Retención',
      value: '94%',
      change: 5.4,
      color: 'from-orange-500 to-orange-600',
      delay: 0.5
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Sesiones Completadas',
      value: 1248,
      change: 18.7,
      color: 'from-indigo-500 to-indigo-600',
      delay: 0.6
    },
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: 'Nuevos Leads',
      value: 28,
      change: -3.2,
      color: 'from-pink-500 to-rose-600',
      delay: 0.7
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Citas Pendientes',
      value: 15,
      change: 10.1,
      color: 'from-amber-500 to-yellow-600',
      delay: 0.8
    }
  ];

  const [openNewClient, setOpenNewClient] = useState(false);

  // Acciones rápidas
  const quickActions: QuickActionProps[] = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Nuevo Cliente',
      description: 'Registra un nuevo cliente',
      gradient: 'from-blue-500 to-blue-600',
      route: 'modal:new-client'
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: 'Nuevo Entrenamiento',
      description: 'Crea rutina personalizada',
      gradient: 'from-purple-500 to-purple-600',
      route: 'nuevo-entrenamiento'
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: 'Nueva Dieta',
      description: 'Diseña plan nutricional',
      gradient: 'from-green-500 to-emerald-600',
      route: 'dieta-nueva'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Agendar Cita',
      description: 'Programa una sesión',
      gradient: 'from-indigo-500 to-indigo-600',
      route: 'pagina-reserva'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Ver Finanzas',
      description: 'Revisa ingresos y gastos',
      gradient: 'from-emerald-500 to-teal-600',
      route: 'panel-financiero'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Enviar Mensaje',
      description: 'Contacta con clientes',
      gradient: 'from-pink-500 to-rose-600',
      route: 'mensajeria'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'Ver Estadísticas',
      description: 'Análisis y reportes',
      gradient: 'from-orange-500 to-orange-600',
      route: '/dashboard-estadisticas'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Configuración',
      description: 'Ajusta preferencias',
      gradient: 'from-gray-600 to-gray-700',
      route: 'configuracion'
    }
  ];

  // Actividad reciente
  const recentActivity: ActivityItem[] = [
    {
      id: 1,
      user: 'Ana García',
      action: 'completó su entrenamiento de piernas',
      time: 'hace 15 min',
      type: 'success',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: 2,
      user: 'Carlos Ruiz',
      action: 'se inscribió al plan Premium',
      time: 'hace 1 hora',
      type: 'info',
      icon: <UserPlus className="w-4 h-4" />
    },
    {
      id: 3,
      user: 'María López',
      action: 'canceló su cita de mañana',
      time: 'hace 2 horas',
      type: 'warning',
      icon: <AlertCircle className="w-4 h-4" />
    },
    {
      id: 4,
      user: 'Pedro Sánchez',
      action: 'completó su evaluación inicial',
      time: 'hace 3 horas',
      type: 'success',
      icon: <Target className="w-4 h-4" />
    },
    {
      id: 5,
      user: 'Laura Martín',
      action: 'solicitó cambio de rutina',
      time: 'hace 4 horas',
      type: 'info',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: 6,
      user: 'Javier Torres',
      action: 'alcanzó su objetivo de peso',
      time: 'hace 5 horas',
      type: 'success',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: 7,
      user: 'Carmen Díaz',
      action: 'renovó su membresía anual',
      time: 'hace 6 horas',
      type: 'success',
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      id: 8,
      user: 'Roberto Gómez',
      action: 'reservó clase de spinning',
      time: 'hace 8 horas',
      type: 'info',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 9,
      user: 'Elena Fernández',
      action: 'completó 30 días consecutivos',
      time: 'hace 10 horas',
      type: 'success',
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 10,
      user: 'Miguel Ángel',
      action: 'actualizó sus medidas corporales',
      time: 'hace 12 horas',
      type: 'info',
      icon: <Activity className="w-4 h-4" />
    }
  ];

  // Alertas importantes
  const alerts = [
    { text: 'Tienes 3 pagos pendientes de revisar', priority: 'high', icon: <AlertCircle className="w-4 h-4" /> },
    { text: '5 clientes cumplen años esta semana', priority: 'medium', icon: <Gift className="w-4 h-4" /> },
    { text: 'Recuerda actualizar el inventario', priority: 'low', icon: <Clock className="w-4 h-4" /> }
  ];

  // Próximas citas (hoy y mañana)
  const upcomingAppointments = [
    { client: 'Ana García', time: '10:00', type: 'Entrenamiento Personal', today: true },
    { client: 'Carlos Ruiz', time: '12:00', type: 'Evaluación Inicial', today: true },
    { client: 'María López', time: '16:00', type: 'Entrenamiento Funcional', today: true },
    { client: 'Pedro Sánchez', time: '09:00', type: 'Sesión de Cardio', today: false },
    { client: 'Laura Martín', time: '11:00', type: 'Yoga & Pilates', today: false }
  ];

  // Datos para mini-gráfico de ingresos (últimos 7 días)
  const incomeData = [850, 920, 780, 1100, 950, 1200, 1050];
  const maxIncome = Math.max(...incomeData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* HERO SECTION - Banner de Bienvenida Mejorado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-20"></div>
        </div>

        {/* Grid pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="relative">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Entrenador</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed"
          >
            Hoy es un gran día para transformar vidas. Tienes <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">{upcomingAppointments.filter(a => a.today).length} sesiones</span> programadas y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">{stats[1].value} clientes activos</span> esperando tu guía.
          </motion.p>

          {/* Indicadores adicionales en el hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">+23.8% ingresos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-semibold text-white">94% retención</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">1,248 sesiones completadas</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS DESTACADAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* ACCIONES RÁPIDAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} delay={index * 0.1} onOpenNewClient={() => setOpenNewClient(true)} />
          ))}
        </div>
      </motion.div>

      {/* SECCIÓN DE CONTENIDO PRINCIPAL - 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* ACTIVIDAD RECIENTE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Activity className="w-6 h-6" />
              </div>
              Actividad en Tiempo Real
            </h3>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group"
                >
                  {/* Avatar circular mejorado */}
                  <div className={`
                    flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300
                    ${activity.type === 'success' ? 'bg-gradient-to-br from-green-400 to-emerald-600' : ''}
                    ${activity.type === 'info' ? 'bg-gradient-to-br from-blue-400 to-indigo-600' : ''}
                    ${activity.type === 'warning' ? 'bg-gradient-to-br from-yellow-400 to-orange-600' : ''}
                    ${activity.type === 'error' ? 'bg-gradient-to-br from-red-400 to-red-600' : ''}
                  `}>
                    <span className="text-lg">{activity.user.charAt(0)}</span>
                  </div>

                  {/* Línea vertical mejorada */}
                  {index < recentActivity.length - 1 && (
                    <div className="absolute left-[53px] w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent mt-12"></div>
                  )}

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-relaxed">
                      <span className="font-bold text-gray-900">{activity.user}</span>
                      {' '}<span className="text-gray-700">{activity.action}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`
                        p-1 rounded-lg
                        ${activity.type === 'success' ? 'bg-green-50 text-green-600' : ''}
                        ${activity.type === 'info' ? 'bg-blue-50 text-blue-600' : ''}
                        ${activity.type === 'warning' ? 'bg-orange-50 text-orange-600' : ''}
                        ${activity.type === 'error' ? 'bg-red-50 text-red-600' : ''}
                      `}>
                        {activity.icon}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* COLUMNA DERECHA - Alertas y Citas */}
        <div className="space-y-6">
          {/* ALERTAS IMPORTANTES */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
          >
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
                <div className="p-1.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <AlertCircle className="w-5 h-5" />
                </div>
                Alertas Importantes
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`
                    p-3 rounded-xl border-l-4 flex items-start gap-3
                    ${alert.priority === 'high' ? 'bg-red-50 border-red-500' : ''}
                    ${alert.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' : ''}
                    ${alert.priority === 'low' ? 'bg-blue-50 border-blue-500' : ''}
                  `}
                >
                  <span className={`
                    ${alert.priority === 'high' ? 'text-red-600' : ''}
                    ${alert.priority === 'medium' ? 'text-yellow-600' : ''}
                    ${alert.priority === 'low' ? 'text-blue-600' : ''}
                  `}>
                    {alert.icon}
                  </span>
                  <p className="text-sm text-gray-700 flex-1">{alert.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PRÓXIMAS CITAS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
          >
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 70% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
                <div className="p-1.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                Próximas Citas
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Hoy</p>
              </div>
              {upcomingAppointments.filter(a => a.today).map((apt, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-900">{apt.client}</p>
                    <div className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">
                      {apt.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <p className="text-xs text-gray-600 font-medium">{apt.type}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 mb-2 mt-5">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mañana</p>
              </div>
              {upcomingAppointments.filter(a => !a.today).map((apt, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-900">{apt.client}</p>
                    <div className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                      {apt.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <p className="text-xs text-gray-600 font-medium">{apt.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MINI GRÁFICO DE INGRESOS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
          >
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 40% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
                <div className="p-1.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5" />
                </div>
                Ingresos (7 días)
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-end justify-between h-32 gap-2">
                {incomeData.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / maxIncome) * 100}%` }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-emerald-500 via-teal-400 to-cyan-400 rounded-t-2xl group-hover:from-emerald-600 group-hover:via-teal-500 group-hover:to-cyan-500 transition-all duration-300 shadow-lg relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                        €{value}
                      </div>
                    </motion.div>
                    <span className="text-xs text-gray-500 font-bold">
                      {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  €{incomeData.reduce((a, b) => a + b, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 font-semibold mt-1">Total esta semana</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-bold text-green-600">+15.3% vs semana anterior</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PROGRESO HACIA OBJETIVOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              Objetivos del Mes
            </h3>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
              <span className="text-sm font-bold text-purple-700">Diciembre 2024</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Objetivo 1 */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Nuevos Clientes</span>
                <span className="text-lg font-bold text-purple-600">28/30</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '93%' }}
                  transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-600 font-semibold">93% completado</span>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-bold text-green-600">+2 esta semana</span>
                </div>
              </div>
            </div>

            {/* Objetivo 2 */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Ingresos Meta</span>
                <span className="text-lg font-bold text-emerald-600">€12.5k/€15k</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '83%' }}
                  transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-600 font-semibold">83% completado</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-bold text-green-600">€2.5k restante</span>
                </div>
              </div>
            </div>

            {/* Objetivo 3 */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Retención</span>
                <span className="text-lg font-bold text-blue-600">94%/90%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-600 font-semibold">¡Objetivo superado!</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-bold text-green-600">+4% sobre meta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <ClienteFormModal
        open={openNewClient}
        onClose={() => setOpenNewClient(false)}
        onCreated={() => setOpenNewClient(false)}
      />
    </div>
  );
};

// COMPONENTE: Tarjeta de Estadística Mejorada
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Efecto shimmer en hover mejorado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full blur-2xl`}></div>

      <div className="relative z-10">
        {/* Icono con gradiente mejorado */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>

        {/* Título */}
        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">{title}</p>

        {/* Valor con animación */}
        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
          {value}
        </p>

        {/* Indicador de cambio mejorado */}
        <div className="flex items-center gap-2">
          {change >= 0 ? (
            <>
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+{change}%</span>
            </>
          ) : (
            <>
              <div className="p-1 bg-red-50 rounded-lg">
                <ArrowDownRight className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm font-bold text-red-600">{change}%</span>
            </>
          )}
          <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
        </div>

        {/* Barra de progreso decorativa */}
        <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: change >= 0 ? `${Math.min(change * 3, 100)}%` : '0%' }}
            transition={{ delay: delay + 0.5, duration: 1 }}
            className={`h-full bg-gradient-to-r ${color} rounded-full`}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// COMPONENTE: Tarjeta de Acción Rápida Mejorada
const QuickActionCard: React.FC<QuickActionProps & { delay: number; onOpenNewClient?: () => void }> = ({
  icon,
  title,
  description,
  gradient,
  route,
  delay,
  onOpenNewClient
}) => {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (route === 'modal:new-client') {
          onOpenNewClient?.();
          return;
        }
        if (typeof route === 'string') {
          const path = route.startsWith('/') ? route : `/${route}`;
          navigate(path);
        }
      }}
      className={`
        relative overflow-hidden bg-gradient-to-br ${gradient}
        rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300
        p-6 text-white text-left group border border-white/20
      `}
    >
      {/* Efecto de brillo en hover mejorado */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

      {/* Círculo decorativo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h4 className="text-lg font-bold mb-1 tracking-tight">{title}</h4>
        <p className="text-sm opacity-90 leading-relaxed">{description}</p>

        {/* Flecha decorativa */}
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Ir ahora</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.button>
  );
};

export default InicioPage;