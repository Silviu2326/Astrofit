// src/features/historial-asistencias/components/EstadisticasAcceso.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, Percent, Target, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AttendanceEntry } from '../historialAsistenciasApi';

interface EstadisticasAccesoProps {
  entries: AttendanceEntry[];
  allEntries: AttendanceEntry[];
}

export const EstadisticasAcceso: React.FC<EstadisticasAccesoProps> = ({ entries, allEntries }) => {
  // Total check-ins hoy
  const getTodayCheckIns = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return allEntries.filter(entry => {
      const entryDate = new Date(entry.fechaHora);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime() && entry.estado === 'asistio';
    }).length;
  };

  // Total este mes
  const getMonthCheckIns = () => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return allEntries.filter(entry => {
      const entryDate = new Date(entry.fechaHora);
      return entryDate >= firstDayOfMonth && entry.estado === 'asistio';
    }).length;
  };

  // Promedio diario últimos 30 días
  const getDailyAverage = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const last30DaysEntries = allEntries.filter(entry => {
      const entryDate = new Date(entry.fechaHora);
      return entryDate >= thirtyDaysAgo && entry.estado === 'asistio';
    });
    return Math.round(last30DaysEntries.length / 30);
  };

  // Tasa de asistencia
  const getAttendanceRate = () => {
    const totalScheduled = allEntries.length;
    const attended = allEntries.filter(e => e.estado === 'asistio').length;
    return totalScheduled > 0 ? Math.round((attended / totalScheduled) * 100) : 0;
  };

  // Miembros activos este mes
  const getActiveMembersThisMonth = () => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const uniqueMemberIds = new Set(
      allEntries
        .filter(entry => {
          const entryDate = new Date(entry.fechaHora);
          return entryDate >= firstDayOfMonth && entry.estado === 'asistio';
        })
        .map(entry => entry.miembro.id)
    );
    return uniqueMemberIds.size;
  };

  // Hora pico
  const getPeakHour = () => {
    if (allEntries.length === 0) return 'N/A';

    const hourCounts: { [key: number]: number } = {};
    allEntries
      .filter(e => e.estado === 'asistio')
      .forEach(entry => {
        const hour = new Date(entry.fechaHora).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      });

    let peakHour = 0;
    let maxCount = 0;

    for (const hour in hourCounts) {
      if (hourCounts[hour] > maxCount) {
        maxCount = hourCounts[hour];
        peakHour = parseInt(hour);
      }
    }

    const formatHour = (h: number) => {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:00 ${ampm}`;
    };

    return formatHour(peakHour);
  };

  // Calculate trends (vs previous month)
  const getMonthTrend = () => {
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const thisMonthCount = allEntries.filter(entry => {
      const entryDate = new Date(entry.fechaHora);
      return entryDate >= firstDayThisMonth && entry.estado === 'asistio';
    }).length;

    const lastMonthCount = allEntries.filter(entry => {
      const entryDate = new Date(entry.fechaHora);
      return entryDate >= firstDayLastMonth && entryDate <= lastDayLastMonth && entry.estado === 'asistio';
    }).length;

    if (lastMonthCount === 0) return 0;
    return Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100);
  };

  const stats = [
    {
      title: 'Check-ins Hoy',
      value: getTodayCheckIns(),
      icon: Calendar,
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-500/10 to-cyan-600/10',
      change: null,
    },
    {
      title: 'Total Este Mes',
      value: getMonthCheckIns(),
      icon: TrendingUp,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/10 to-indigo-600/10',
      change: getMonthTrend(),
    },
    {
      title: 'Promedio Diario',
      value: getDailyAverage(),
      icon: Target,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500/10 to-pink-600/10',
      subtitle: 'Últimos 30 días',
      change: null,
    },
    {
      title: 'Tasa de Asistencia',
      value: `${getAttendanceRate()}%`,
      icon: Percent,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10',
      change: null,
    },
    {
      title: 'Miembros Activos',
      value: getActiveMembersThisMonth(),
      icon: Users,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-600/10',
      subtitle: 'Este mes',
      change: null,
    },
    {
      title: 'Hora Pico',
      value: getPeakHour(),
      icon: Clock,
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-500/10 to-blue-600/10',
      subtitle: 'Mayor actividad',
      change: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
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
          <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

          <div className="relative z-10">
            {/* Icono */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-7 h-7" />
            </div>

            {/* Título */}
            <p className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              {stat.title}
            </p>

            {/* Valor */}
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-2">
              {stat.value}
            </p>

            {/* Subtitle o cambio */}
            {stat.subtitle && (
              <p className="text-xs text-gray-500 font-medium">{stat.subtitle}</p>
            )}

            {stat.change !== null && stat.change !== 0 && (
              <div className="flex items-center gap-1">
                <div className={`p-1 rounded-lg ${stat.change > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  {stat.change > 0 ? (
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-600" />
                  )}
                </div>
                <span className={`text-xs font-bold ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
