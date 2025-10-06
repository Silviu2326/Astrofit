
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Minus, Activity, Zap } from 'lucide-react';
import { getAdherenceData, AdherenceData } from '../adherenciaNutricionalApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

const ResumenSemanal: React.FC = () => {
  const [adherenceData, setAdherenceData] = useState<AdherenceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAdherenceData();
      setAdherenceData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const last7Days = adherenceData.slice(-7);
  const previous7Days = adherenceData.slice(-14, -7);

  // Calculate weekly averages
  const currentWeekAvg = last7Days.reduce((sum, d) => sum + d.adherencePercentage, 0) / 7;
  const previousWeekAvg = previous7Days.length > 0
    ? previous7Days.reduce((sum, d) => sum + d.adherencePercentage, 0) / previous7Days.length
    : 0;

  const weeklyChange = currentWeekAvg - previousWeekAvg;
  const trend = weeklyChange > 2 ? 'mejorando' : weeklyChange < -2 ? 'declinando' : 'estable';

  // Prepare chart data
  const chartData = last7Days.map(day => ({
    día: new Date(day.date).toLocaleDateString('es-ES', { weekday: 'short' }),
    adherencia: day.adherencePercentage,
    calorías: day.calories,
    objetivo: day.caloriesTarget,
  }));

  // Calculate macro distribution (average of the week)
  const avgMacros = {
    protein: Math.round(last7Days.reduce((sum, d) => sum + d.macros.protein, 0) / 7),
    carbs: Math.round(last7Days.reduce((sum, d) => sum + d.macros.carbs, 0) / 7),
    fats: Math.round(last7Days.reduce((sum, d) => sum + d.macros.fats, 0) / 7),
  };

  const avgMacrosTarget = last7Days[0].macrosTarget;

  const macroData = [
    { name: 'Proteína', value: avgMacros.protein, target: avgMacrosTarget.protein, color: '#ef4444' },
    { name: 'Carbos', value: avgMacros.carbs, target: avgMacrosTarget.carbs, color: '#3b82f6' },
    { name: 'Grasas', value: avgMacros.fats, target: avgMacrosTarget.fats, color: '#f59e0b' },
  ];

  const getDayColor = (adherence: number) => {
    if (adherence >= 85) return '#10b981';
    if (adherence >= 70) return '#eab308';
    if (adherence >= 50) return '#f97316';
    return '#ef4444';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <BarChart3 className="w-6 h-6" />
            </div>
            Resumen Semanal
          </h3>
          <p className="text-blue-100 text-sm">Últimos 7 días de seguimiento</p>
        </div>
      </div>

      <div className="p-6">
        {/* Weekly Average and Trend */}
        <div className="mb-6 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Adherencia Promedio</p>
              <p className="text-4xl font-bold text-gray-800">{Math.round(currentWeekAvg)}%</p>
            </div>
            <div className="text-right">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                trend === 'mejorando'
                  ? 'bg-green-100 border border-green-300'
                  : trend === 'declinando'
                  ? 'bg-red-100 border border-red-300'
                  : 'bg-gray-100 border border-gray-300'
              }`}>
                {trend === 'mejorando' ? (
                  <>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-700">+{Math.abs(Math.round(weeklyChange))}%</span>
                  </>
                ) : trend === 'declinando' ? (
                  <>
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-bold text-red-700">{Math.round(weeklyChange)}%</span>
                  </>
                ) : (
                  <>
                    <Minus className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-bold text-gray-700">Estable</span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">vs semana anterior</p>
            </div>
          </div>

          {/* Trend Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
            trend === 'mejorando'
              ? 'bg-green-500 text-white'
              : trend === 'declinando'
              ? 'bg-red-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            <Activity className="w-3 h-3" />
            Tendencia: {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </div>
        </div>

        {/* Bar Chart - Adherencia por día */}
        <div className="mb-6">
          <h4 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Adherencia por Día
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="día" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                }}
                formatter={(value: any) => [`${value}%`, 'Adherencia']}
              />
              <Bar dataKey="adherencia" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getDayColor(entry.adherencia)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Details */}
        <div className="mb-6">
          <h4 className="text-md font-bold text-gray-800 mb-3">Detalles Diarios</h4>
          <div className="space-y-2">
            {last7Days.map((day, index) => {
              const date = new Date(day.date);
              const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
              const caloriesDiff = day.calories - day.caloriesTarget;
              const caloriesOnTarget = Math.abs(caloriesDiff) <= 100;

              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getDayColor(day.adherencePercentage) }}
                    ></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 capitalize">{dayName}</p>
                      <p className="text-xs text-gray-500">{date.toLocaleDateString('es-ES')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800">{day.adherencePercentage}%</p>
                      <p className="text-xs text-gray-500">{day.mealsLogged} comidas</p>
                    </div>

                    <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      caloriesOnTarget
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {day.calories} kcal
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Macros Distribution */}
        <div>
          <h4 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Distribución de Macros (Promedio)
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {macroData.map((macro, index) => {
              const percentage = Math.round((macro.value / macro.target) * 100);
              const onTarget = percentage >= 90 && percentage <= 110;

              return (
                <motion.div
                  key={macro.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: macro.color }}
                    ></div>
                    <p className="text-xs font-bold text-gray-600 uppercase">{macro.name}</p>
                  </div>

                  <div className="mb-2">
                    <p className="text-2xl font-bold text-gray-800">{macro.value}g</p>
                    <p className="text-xs text-gray-500">Objetivo: {macro.target}g</p>
                  </div>

                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: macro.color }}
                      ></motion.div>
                    </div>
                    <p className={`text-xs font-semibold mt-1 ${
                      onTarget ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {percentage}%
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Comparison with previous week */}
        {previousWeekAvg > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Comparación Semanal</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Semana Anterior</p>
                <p className="text-2xl font-bold text-gray-700">{Math.round(previousWeekAvg)}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Semana Actual</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(currentWeekAvg)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumenSemanal;
