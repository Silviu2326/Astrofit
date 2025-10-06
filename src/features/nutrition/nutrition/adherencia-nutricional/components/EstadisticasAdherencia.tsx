
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Flame,
  Droplet,
  Award,
  Activity,
  AlertTriangle,
  CheckCircle,
  Target
} from 'lucide-react';
import { getAdherenceData, AdherenceData } from '../adherenciaNutricionalApi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const EstadisticasAdherencia: React.FC = () => {
  const [adherenceData, setAdherenceData] = useState<AdherenceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAdherenceData();
      setAdherenceData(data);

      // Check for alerts
      const alertsList: string[] = [];
      const last3Days = data.slice(-3);
      const hasRecentLog = last3Days.some(d => d.mealsLogged > 0);
      if (!hasRecentLog) {
        alertsList.push('3 días sin registrar comidas');
      }

      const last7Days = data.slice(-7);
      const avgAdherence = last7Days.reduce((sum, d) => sum + d.adherencePercentage, 0) / 7;
      if (avgAdherence < 70) {
        alertsList.push('Adherencia bajó del 70%');
      }

      // Check for streak
      let streak = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].adherencePercentage >= 80) streak++;
        else break;
      }
      if (streak >= 7) {
        alertsList.push(`¡${streak} días consecutivos! 🎉`);
      }

      setAlerts(alertsList);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const last7Days = adherenceData.slice(-7);
  const last8Weeks = [];
  for (let i = 0; i < 8; i++) {
    const weekData = adherenceData.slice(-(7 * (i + 1)), adherenceData.length - (7 * i));
    if (weekData.length > 0) {
      const avgAdherence = weekData.reduce((sum, d) => sum + d.adherencePercentage, 0) / weekData.length;
      last8Weeks.unshift({
        week: `S${8 - i}`,
        adherencia: Math.round(avgAdherence)
      });
    }
  }

  const chartData = last7Days.map(day => ({
    fecha: day.date.slice(5),
    adherencia: day.adherencePercentage,
    comidas: day.mealsLogged,
    calorías: day.calories,
    objetivo: day.caloriesTarget,
  }));

  // Calculate stats
  const weeklyAvg = Math.round(last7Days.reduce((sum, d) => sum + d.adherencePercentage, 0) / 7);
  const totalMeals = last7Days.reduce((sum, d) => sum + d.mealsLogged, 0);
  const avgWater = (last7Days.reduce((sum, d) => sum + d.waterIntake, 0) / 7).toFixed(1);
  const calorieAccuracy = last7Days.filter(d => Math.abs(d.calories - d.caloriesTarget) <= 100).length;

  // Determine trend
  const firstHalf = last7Days.slice(0, 3).reduce((sum, d) => sum + d.adherencePercentage, 0) / 3;
  const secondHalf = last7Days.slice(4).reduce((sum, d) => sum + d.adherencePercentage, 0) / 3;
  const trend = secondHalf > firstHalf ? 'mejorando' : secondHalf < firstHalf ? 'declinando' : 'estable';

  return (
    <div className="space-y-6">
      {/* Alertas y Motivación */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Alertas y Logros
          </h3>
          <div className="space-y-2">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  alert.includes('🎉')
                    ? 'bg-green-50 border border-green-200'
                    : alert.includes('bajó')
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-orange-50 border border-orange-200'
                }`}
              >
                {alert.includes('🎉') ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                )}
                <span className="text-sm font-medium text-gray-700">{alert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: TrendingUp,
            title: 'Adherencia Semanal',
            value: `${weeklyAvg}%`,
            change: trend === 'mejorando' ? '+5%' : trend === 'declinando' ? '-3%' : '0%',
            color: 'from-teal-500 to-green-600',
            trend: trend,
          },
          {
            icon: Calendar,
            title: 'Comidas Registradas',
            value: totalMeals,
            change: 'Esta semana',
            color: 'from-blue-500 to-purple-600',
            trend: 'estable',
          },
          {
            icon: Droplet,
            title: 'Hidratación Promedio',
            value: `${avgWater}L`,
            change: 'Por día',
            color: 'from-cyan-500 to-blue-600',
            trend: 'estable',
          },
          {
            icon: Target,
            title: 'Objetivo Calórico',
            value: `${calorieAccuracy}/7`,
            change: 'Días cumplidos',
            color: 'from-orange-500 to-red-600',
            trend: 'estable',
          },
        ].map((stat, index) => (
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-teal-500 to-green-600 opacity-5 rounded-full blur-2xl"></div>

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
                {stat.trend === 'mejorando' ? (
                  <>
                    <div className="p-1 bg-green-50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-bold text-green-600">{stat.change}</span>
                  </>
                ) : stat.trend === 'declinando' ? (
                  <>
                    <div className="p-1 bg-red-50 rounded-lg">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-sm font-bold text-red-600">{stat.change}</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-500 font-medium">{stat.change}</span>
                )}
              </div>

              {/* Progress bar circular */}
              {index === 0 && (
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-teal-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${weeklyAvg}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-teal-500 to-green-600"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Adherencia Semanal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Adherencia Últimas 8 Semanas
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={last8Weeks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="week" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                }}
              />
              <Line
                type="monotone"
                dataKey="adherencia"
                stroke="url(#colorAdherencia)"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
              />
              <defs>
                <linearGradient id="colorAdherencia" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart - Comidas por día */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-600" />
            Calorías vs Objetivo (7 días)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="fecha" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                }}
              />
              <Legend />
              <Bar dataKey="calorías" fill="#f97316" radius={[8, 8, 0, 0]} />
              <Bar dataKey="objetivo" fill="#e0e0e0" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default EstadisticasAdherencia;
