import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Calendar } from 'lucide-react';
import GraficosProgresion from './components/GraficosProgresion';
import ModeloPredictivo from './components/ModeloPredictivo';
import AnalisisCorrelaciones from './components/AnalisisCorrelaciones';
import BenchmarkingElite from './components/BenchmarkingElite';
import VentanasDesarrollo from './components/VentanasDesarrollo';
import ImpactoLesiones from './components/ImpactoLesiones';
import AlertasDesviacion from './components/AlertasDesviacion';
import OptimizacionCargas from './components/OptimizacionCargas';
import ReportesEvolucion from './components/ReportesEvolucion';

const HistorialRendimientoPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
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
              <TrendingUp className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Historial de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Rendimiento</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Análisis longitudinal y evolutivo del <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">desarrollo atlético</span>
          </p>

          {/* Selector de timeframe con badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Vista Temporal:</span>
            </div>

            {(['week', 'month', 'year'] as const).map((period) => (
              <motion.button
                key={period}
                onClick={() => setTimeframe(period)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  timeframe === period
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Año'}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Gráficos de Progresión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <GraficosProgresion timeframe={timeframe} />
      </motion.div>

      {/* Grid de Componentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[
          { Component: ModeloPredictivo, index: 0 },
          { Component: AnalisisCorrelaciones, index: 1 },
          { Component: BenchmarkingElite, index: 2 },
          { Component: VentanasDesarrollo, index: 3 },
          { Component: ImpactoLesiones, index: 4 },
          { Component: AlertasDesviacion, index: 5 },
          { Component: OptimizacionCargas, index: 6 },
          { Component: ReportesEvolucion, index: 7 }
        ].map(({ Component, index }) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
          >
            <Component />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistorialRendimientoPage;
