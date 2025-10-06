import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Radio } from 'lucide-react';
import TableroLive from './components/TableroLive';
import SistemaAlertas from './components/SistemaAlertas';
import GrabadorSesion from './components/GrabadorSesion';
import TransmisionLive from './components/TransmisionLive';
import AnalisisZonasIntensidad from './components/AnalisisZonasIntensidad';
import ComparacionHistorica from './components/ComparacionHistorica';
import CoachingAutomatico from './components/CoachingAutomatico';
import IntegracionVideoSincronizado from './components/IntegracionVideoSincronizado';
import DashboardComando from './components/DashboardComando';
import { useGetAlertasQuery } from './datosTiempoRealApi';

interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  threshold: { min: number; max: number };
}

const DatosTiempoRealPage: React.FC = () => {
  const { data, isLoading: loading, error } = useGetAlertasQuery();
  const [teamMetrics, setTeamMetrics] = useState<Metric[][]>([]);

  useEffect(() => {
    if (data) {
      // Simulate processing data for multiple team members
      const processedMetrics: Metric[][] = data.map((memberData: any, index: number) => [
        { id: `speed-${index}`, label: 'Velocidad', value: memberData.speed, unit: 'km/h', threshold: { min: 0, max: 30 } },
        { id: `load-${index}`, label: 'Carga', value: memberData.load, unit: '%', threshold: { min: 0, max: 100 } },
        { id: `heartRate-${index}`, label: 'Pulsaciones', value: memberData.heartRate, unit: 'bpm', threshold: { min: 60, max: 180 } },
      ]);
      setTeamMetrics(processedMetrics);
    }
  }, [data]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center animate-pulse">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <p className="text-lg font-semibold text-gray-700">Cargando datos en tiempo real...</p>
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200 max-w-md"
      >
        <p className="text-lg font-semibold text-red-600">Error al cargar datos: {error.message}</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Radio className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Datos en <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Tiempo Real</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl leading-relaxed">
            Monitorización <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">live</span> de métricas fisiológicas y de rendimiento
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300 animate-pulse" />
              <span className="text-sm font-semibold text-white">Transmisión Live</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Alertas Automáticas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Monitorización Live de Atletas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
            <Activity className="w-6 h-6 text-white" />
          </div>
          Monitorización Live de Entrenamientos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMetrics.length > 0 ? (
            teamMetrics.map((metrics, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Decoración de fondo */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    Atleta {index + 1}
                  </h3>
                  <TableroLive metrics={metrics} />
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-600 bg-white/60 backdrop-blur-md rounded-2xl p-8"
            >
              Esperando datos de los atletas...
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Monitorización Profesional Avanzada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          Monitorización Profesional Avanzada
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { component: <SistemaAlertas />, index: 0 },
            { component: <GrabadorSesion />, index: 1 },
            { component: <TransmisionLive />, index: 2 },
            { component: <AnalisisZonasIntensidad />, index: 3 },
            { component: <ComparacionHistorica />, index: 4 },
            { component: <CoachingAutomatico />, index: 5 },
            { component: <IntegracionVideoSincronizado />, index: 6 },
            { component: <DashboardComando />, index: 7 }
          ].map(({ component, index }) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              <div className="relative z-10">
                {component}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DatosTiempoRealPage;
