import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Target,
  DollarSign,
  Activity,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import DashboardFuentes from './components/DashboardFuentes';
import ClasificarLeads from './components/ClasificarLeads';
import AnalisisInversion from './components/AnalisisInversion';
import TendenciasCanales from './components/TendenciasCanales';
import EtiquetasCanales from './components/EtiquetasCanales';
import { getLeadSources } from './fuentesLeadApi';

const FuentesLeadPage: React.FC = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [activeChannels, setActiveChannels] = useState(0);
  const [bestChannel, setBestChannel] = useState({ name: '', conversion: 0 });
  const [avgROI, setAvgROI] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      const sources = await getLeadSources();
      const total = sources.reduce((sum, s) => sum + s.leads, 0);
      const channels = sources.length;
      const best = sources.reduce((max, s) =>
        s.conversionRate > max.conversionRate ? s : max
      , sources[0]);
      const validROIs = sources.filter(s => s.roi !== Infinity);
      const avgRoi = validROIs.reduce((sum, s) => sum + s.roi, 0) / validROIs.length;

      setTotalLeads(total);
      setActiveChannels(channels);
      setBestChannel({ name: best.name, conversion: best.conversionRate });
      setAvgROI(avgRoi);
    };
    loadStats();
  }, []);

  const stats = [
    {
      title: 'Total de Leads',
      value: totalLeads.toLocaleString(),
      change: '+12.5',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500 to-purple-600',
      progress: 75
    },
    {
      title: 'Canales Activos',
      value: activeChannels,
      change: '+2',
      icon: Target,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500 to-teal-600',
      progress: 85
    },
    {
      title: 'Mejor Canal',
      value: `${bestChannel.conversion}%`,
      change: '+5.2',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500 to-pink-600',
      progress: 90,
      subtitle: bestChannel.name
    },
    {
      title: 'ROI Promedio',
      value: `${avgROI.toFixed(0)}%`,
      change: '+18.3',
      icon: DollarSign,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500 to-red-600',
      progress: 82
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Activity className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Fuentes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Leads</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed">
            Analiza el <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">origen</span> de tus leads y optimiza tu inversión por canal
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{totalLeads.toLocaleString()} Leads Totales</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Tracking en Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-1">
                {stat.value}
              </p>

              {/* Subtitle */}
              {stat.subtitle && (
                <p className="text-xs text-gray-500 font-medium mb-3">{stat.subtitle}</p>
              )}

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dashboard de Fuentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-8"
      >
        <DashboardFuentes />
      </motion.div>

      {/* Grid de Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <AnalisisInversion />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <ClasificarLeads />
        </motion.div>
      </div>

      {/* Grid de Tendencias y Etiquetas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <TendenciasCanales />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <EtiquetasCanales />
        </motion.div>
      </div>
    </div>
  );
};

export default FuentesLeadPage;
