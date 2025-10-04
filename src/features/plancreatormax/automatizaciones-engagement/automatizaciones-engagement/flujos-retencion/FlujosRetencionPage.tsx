
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, 
  Zap, 
  Clock, 
  Heart, 
  BarChart3, 
  Target, 
  Users, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Play,
  Settings,
  Eye
} from 'lucide-react';
import ConstructorFlujos from './components/ConstructorFlujos';
import SecuenciasAutomaticas from './components/SecuenciasAutomaticas';
import DisparadoresInactividad from './components/DisparadoresInactividad';
import AccionesFidelizacion from './components/AccionesFidelizacion';

const FlujosRetencionPage: React.FC = () => {
  const stats = [
    { title: 'Flujos Activos', value: '12', change: '+8.2%', icon: Workflow, color: 'from-blue-500 to-indigo-600' },
    { title: 'Tasa Retención', value: '87%', change: '+12.5%', icon: Heart, color: 'from-emerald-500 to-teal-600' },
    { title: 'Clientes Reactivados', value: '234', change: '+15.3%', icon: Users, color: 'from-purple-500 to-pink-600' },
    { title: 'ROI Automatización', value: '340%', change: '+22.1%', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
  ];

  const features = [
    {
      title: 'Constructor Visual de Flujos',
      description: 'Diseña tus flujos de retención con un intuitivo constructor drag & drop.',
      icon: Workflow,
      component: <ConstructorFlujos />,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500'
    },
    {
      title: 'Secuencias Automáticas',
      description: 'Configura secuencias automáticas para clientes inactivos, por ejemplo: "Te echamos de menos - descuento reactivación".',
      icon: Zap,
      component: <SecuenciasAutomaticas />,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    {
      title: 'Disparadores de Inactividad',
      description: 'Define disparadores basados en el tiempo de inactividad del cliente.',
      icon: Clock,
      component: <DisparadoresInactividad />,
      gradient: 'from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'Acciones de Fidelización',
      description: 'Elige entre diversas acciones como email, notificaciones push, descuentos o llamadas.',
      icon: Heart,
      component: <AccionesFidelizacion />,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500'
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
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Flujos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Retención</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Automatiza la <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">retención de clientes</span> con flujos inteligentes que se adaptan al comportamiento de cada usuario.
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">87% Retención</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">12 Flujos Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">+22% ROI</span>
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
                  <TrendingUp className="w-4 h-4 text-green-600" />
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

      {/* Grid de Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
          >
            {/* Header con gradiente */}
            <div className={`bg-gradient-to-r ${feature.gradient} p-6 relative overflow-hidden`}>
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{feature.title}</h2>
                  <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {feature.component}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Métricas y A/B Testing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Métricas de Efectividad y A/B Testing
              </h2>
              <p className="text-gray-600 mt-2">Analiza el rendimiento de tus flujos y optimiza con A/B testing para maximizar la retención.</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              Ver Métricas
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
              Configurar A/B Test
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-500 text-indigo-600 rounded-2xl font-semibold hover:bg-indigo-50 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Ejecutar Test
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlujosRetencionPage;
