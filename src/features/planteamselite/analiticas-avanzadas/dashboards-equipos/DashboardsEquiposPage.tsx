import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Users, TrendingUp, Activity, AlertTriangle, Sparkles } from 'lucide-react';
import WidgetsConfigurables from './components/WidgetsConfigurables';
import TarjetasComparativas from './components/TarjetasComparativas';
import MetricasKPI from './components/MetricasKPI';
import AlertasRendimiento from './components/AlertasRendimiento';
import DashboardTiempoReal from './components/DashboardTiempoReal';
import AnalisisPredictivo from './components/AnalisisPredictivo';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import ExportadorReportes from './components/ExportadorReportes';
import IntegracionVideoanalisis from './components/IntegracionVideoanalisis';
import { getTeamPerformanceData, getExecutiveSummary } from './dashboardsEquiposApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TeamPerformance {
  team: string;
  weeklyLoad: number;
    injuryPercentage: number;
  trainingAdherence: number;
  availability: number;
  performance: number;
}

interface ExecutiveSummary {
  totalTeams: number;
  averageWeeklyLoad: number;
  averageInjuryPercentage: number;
  overallPerformance: string;
}

const DashboardsEquiposPage: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamPerformance[]>([]);
  const [executiveSummary, setExecutiveSummary] = useState<ExecutiveSummary | null>(null);

  useEffect(() => {
    // Fetch mock data
    setTeamData(getTeamPerformanceData());
    setExecutiveSummary(getExecutiveSummary());
  }, []);

  const chartData = {
    labels: teamData.map(data => data.team),
    datasets: [
      {
        label: 'Carga Semanal',
        data: teamData.map(data => data.weeklyLoad),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: '% Lesiones',
        data: teamData.map(data => data.injuryPercentage),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Adherencia Entrenos',
        data: teamData.map(data => data.trainingAdherence),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Métricas Clave por Equipo',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12 p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Dashboards de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Equipos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Analíticas avanzadas y métricas de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">rendimiento en tiempo real</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Equipos Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Monitoreo en Vivo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resumen Ejecutivo - Grid de Métricas */}
      {executiveSummary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                Total Equipos
              </p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {executiveSummary.totalTeams}
              </p>
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                Carga Semanal Promedio
              </p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {executiveSummary.averageWeeklyLoad.toFixed(2)}
              </p>
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                Porcentaje Lesiones
              </p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {executiveSummary.averageInjuryPercentage.toFixed(2)}%
              </p>
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${executiveSummary.averageInjuryPercentage}%` }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Badge de Performance General */}
      {executiveSummary && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mb-8 flex justify-center"
        >
          <div className="px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200 shadow-lg">
            <span className="text-sm font-medium text-gray-700">Performance General: </span>
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">{executiveSummary.overallPerformance}</span>
          </div>
        </motion.div>
      )}

      {/* Gráficos de Rendimiento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            Métricas Clave por Equipo
          </h2>
          {teamData.length > 0 ? (
            <div className="relative h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-pulse w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"></div>
                <p className="text-gray-600 font-medium">Cargando datos de equipos...</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <WidgetsConfigurables teamData={teamData} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <TarjetasComparativas />
        <MetricasKPI />
        <AlertasRendimiento />
        <DashboardTiempoReal />
        <AnalisisPredictivo />
        <FiltrosAvanzados />
        <ExportadorReportes />
        <IntegracionVideoanalisis />
      </div>
    </div>
  );
};

export default DashboardsEquiposPage;
