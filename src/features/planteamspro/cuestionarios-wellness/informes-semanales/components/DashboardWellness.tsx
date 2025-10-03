
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { fetchWeeklyWellnessReport, WeeklyWellnessReport, DailyWellnessData, AthleteWellnessSummary } from '../informesSemanalesApi';
import { Calendar, TrendingUp, Users } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface DashboardWellnessProps {
  // Props can be added here if needed, e.g., to pass a specific week to display
}

const DashboardWellness: React.FC<DashboardWellnessProps> = () => {
  const [currentWeekData, setCurrentWeekData] = useState<WeeklyWellnessReport | null>(null);
  const [previousWeekData, setPreviousWeekData] = useState<WeeklyWellnessReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const current = await fetchWeeklyWellnessReport('current');
        const previous = await fetchWeeklyWellnessReport('previous');
        setCurrentWeekData(current);
        setPreviousWeekData(previous);
      } catch (err) {
        setError('Error al cargar los datos del informe semanal.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"></div>
          <p className="text-gray-700 font-semibold">Cargando informe de wellness...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-red-50 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    </div>
  );

  if (!currentWeekData || !previousWeekData) return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <p className="text-gray-700 font-semibold">No hay datos disponibles.</p>
      </div>
    </div>
  );

  const createRadarChartData = (data: DailyWellnessData[], labelPrefix: string) => {
    const labels = data.map(d => d.day);
    const sleepData = data.map(d => d.sleep);
    const fatigueData = data.map(d => d.fatigue);
    const moodData = data.map(d => d.mood);

    return {
      labels,
      datasets: [
        {
          label: `${labelPrefix} Sueño (horas)`,
          data: sleepData,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
        },
        {
          label: `${labelPrefix} Fatiga (1-5)`,
          data: fatigueData,
          backgroundColor: 'rgba(234, 179, 8, 0.2)',
          borderColor: 'rgba(234, 179, 8, 1)',
          borderWidth: 1,
        },
        {
          label: `${labelPrefix} Ánimo (1-5)`,
          data: moodData,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 5, // Adjust max for sleep if needed, or have separate scales
        ticks: { backdropColor: 'transparent' },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Promedios Diarios de Wellness',
      },
    },
  };

  const currentWeekRadarData = createRadarChartData(currentWeekData.dailyAverages, 'Actual');
  const previousWeekRadarData = createRadarChartData(previousWeekData.dailyAverages, 'Anterior');

  const renderAthleteSummary = (athlete: AthleteWellnessSummary, index: number) => (
    <motion.div
      key={athlete.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Avatar/Icono */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg font-bold">{athlete.name.charAt(0)}</span>
        </div>

        <h4 className="font-bold text-xl text-gray-900 mb-4">{athlete.name}</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Sueño promedio</span>
            <span className="text-lg font-bold text-emerald-600">{athlete.averageSleep.toFixed(1)}h</span>
          </div>
          <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(athlete.averageSleep / 10) * 100}%` }}
              transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Fatiga promedio</span>
            <span className="text-lg font-bold text-orange-600">{athlete.averageFatigue.toFixed(1)}/5</span>
          </div>
          <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(athlete.averageFatigue / 5) * 100}%` }}
              transition={{ delay: index * 0.05 + 0.4, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Ánimo promedio</span>
            <span className="text-lg font-bold text-blue-600">{athlete.averageMood.toFixed(1)}/5</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(athlete.averageMood / 5) * 100}%` }}
              transition={{ delay: index * 0.05 + 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Comparativa Semana Actual vs Anterior */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            Comparativa Semanal
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Semana Actual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-indigo-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h4 className="text-lg font-bold text-indigo-900">
                  {currentWeekData.week}
                </h4>
              </div>
              <p className="text-sm text-indigo-700 font-medium mb-4">
                {currentWeekData.startDate} - {currentWeekData.endDate}
              </p>
              <div className="h-80 bg-white/50 rounded-xl p-4 backdrop-blur-sm">
                <Radar data={currentWeekRadarData} options={radarChartOptions} />
              </div>
            </motion.div>

            {/* Semana Anterior */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-purple-600" />
                <h4 className="text-lg font-bold text-purple-900">
                  {previousWeekData.week}
                </h4>
              </div>
              <p className="text-sm text-purple-700 font-medium mb-4">
                {previousWeekData.startDate} - {previousWeekData.endDate}
              </p>
              <div className="h-80 bg-white/50 rounded-xl p-4 backdrop-blur-sm">
                <Radar data={previousWeekRadarData} options={radarChartOptions} />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Vista de equipo completo con indicadores por atleta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            Resumen del Equipo
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWeekData.teamSummary.map((athlete, index) => renderAthleteSummary(athlete, index))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardWellness;
