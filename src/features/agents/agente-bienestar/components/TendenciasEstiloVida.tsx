import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Calendar, Lightbulb, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { fetchLifestyleTrends, LifestyleTrend } from '../agenteBienestarApi';

const TendenciasEstiloVida: React.FC = () => {
  const [trends, setTrends] = useState<LifestyleTrend[]>([]);
  const [selectedView, setSelectedView] = useState<'semanal' | 'mensual'>('semanal');

  useEffect(() => {
    const getTrends = async () => {
      const data = await fetchLifestyleTrends();
      setTrends(data);
    };
    getTrends();
  }, []);

  const maxHabits = Math.max(...trends.map(t => t.completed + t.missed));

  // Mock data para gráfico de evolución (últimas 4 semanas)
  const weeklyData = [
    { week: 'Sem 1', bienestar: 65, adherencia: 60 },
    { week: 'Sem 2', bienestar: 70, adherencia: 68 },
    { week: 'Sem 3', bienestar: 75, adherencia: 72 },
    { week: 'Sem 4', bienestar: 78, adherencia: 75 },
  ];

  // Mock insights generados por IA
  const insights = [
    {
      type: 'patrón',
      icon: TrendingUp,
      title: 'Patrón Detectado',
      description: 'Tu nivel de energía aumenta un 30% cuando duermes más de 7 horas.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'correlación',
      icon: Activity,
      title: 'Correlación Positiva',
      description: 'Hacer ejercicio por la mañana mejora tu adherencia general en un 25%.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      type: 'recomendación',
      icon: Lightbulb,
      title: 'Recomendación IA',
      description: 'Considera aumentar tu hidratación durante las tardes para mejor rendimiento.',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-xl">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Tendencias de Estilo de Vida</h3>
              <p className="text-sm text-gray-600">Análisis y evolución de tus hábitos</p>
            </div>
          </div>

          {/* Selector de vista */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedView('semanal')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedView === 'semanal'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setSelectedView('mensual')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedView === 'mensual'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensual
            </button>
          </div>
        </div>

        {/* Gráfico de Evolución */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Evolución de Bienestar
          </h4>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {weeklyData.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-xs font-semibold text-gray-600 mb-2">{data.week}</p>
                <div className="relative h-32 bg-gradient-to-t from-blue-100 to-transparent rounded-t-2xl overflow-hidden">
                  {/* Barra de bienestar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.bienestar}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-xl"
                  ></motion.div>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-lg font-bold text-gray-900">{data.bienestar}%</p>
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <ArrowUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-semibold">
                      +{index > 0 ? data.bienestar - weeklyData[index - 1].bienestar : 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Historial de Tendencias */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Historial Diario
          </h4>

          <div className="space-y-3">
            {trends.map((trend, index) => (
              <motion.div
                key={trend.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4"
              >
                <span className="w-20 text-sm font-semibold text-gray-700">{trend.date}</span>

                <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden flex relative">
                  {/* Completados */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(trend.completed / maxHabits) * 100}%` }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.6 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full flex items-center justify-center"
                    title={`Completados: ${trend.completed}`}
                  >
                    {trend.completed > 0 && (
                      <span className="text-xs font-bold text-white">{trend.completed}</span>
                    )}
                  </motion.div>

                  {/* Fallidos */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(trend.missed / maxHabits) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                    className="bg-gradient-to-r from-red-400 to-pink-400 h-full flex items-center justify-center"
                    title={`Fallidos: ${trend.missed}`}
                  >
                    {trend.missed > 0 && (
                      <span className="text-xs font-bold text-white">{trend.missed}</span>
                    )}
                  </motion.div>
                </div>

                <span className="w-16 text-sm font-bold text-gray-900 text-right">
                  {trend.completed} / {trend.completed + trend.missed}
                </span>

                {/* Porcentaje */}
                <span className={`w-12 text-xs font-bold text-right ${
                  (trend.completed / (trend.completed + trend.missed)) >= 0.7 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {Math.round((trend.completed / (trend.completed + trend.missed)) * 100)}%
                </span>
              </motion.div>
            ))}
          </div>

          {/* Leyenda */}
          <div className="flex items-center justify-end gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <span className="text-gray-600 font-medium">Completados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-pink-400"></div>
              <span className="text-gray-600 font-medium">Fallidos</span>
            </div>
          </div>
        </div>

        {/* Insights Generados por IA */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Insights de IA
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="p-5 rounded-2xl bg-white/50 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${insight.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  <insight.icon className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold text-gray-900 mb-2">{insight.title}</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TendenciasEstiloVida;
