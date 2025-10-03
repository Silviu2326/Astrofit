import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, FileText, Download, Calendar, Sparkles } from 'lucide-react';
import DashboardPostSesion from './components/DashboardPostSesion';
import HeatmapsMovimiento from './components/HeatmapsMovimiento';
import CurvasIntensidad from './components/CurvasIntensidad';
import AnalisisAsimetrias from './components/AnalisisAsimetrias';
import CorrelacionCargaInterna from './components/CorrelacionCargaInterna';
import ModeloFatiga from './components/ModeloFatiga';
import BenchmarkingNormativo from './components/BenchmarkingNormativo';
import ReportesCientificos from './components/ReportesCientificos';
import IntegracionAnalisisVideo from './components/IntegracionAnalisisVideo';

const InformesSensoresPage: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('ultimos-7-dias');

  const stats = [
    { label: 'Sesiones Analizadas', value: '24', category: 'GPS', color: 'from-blue-500 to-indigo-600' },
    { label: 'Atletas Monitoreados', value: '18', category: 'IMU', color: 'from-purple-500 to-pink-600' },
    { label: 'Datos Procesados', value: '2.4TB', category: 'HR', color: 'from-emerald-500 to-teal-600' },
    { label: 'Reportes Generados', value: '156', category: 'Power', color: 'from-orange-500 to-red-600' }
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
              <Activity className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Informes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Sensores</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Análisis completo <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">post-entrenamiento</span> con datos de sensores inteligentes
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">IA Integrada</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Reportes Científicos</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cards de resumen con glassmorphism */}
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              {/* Badge de categoría */}
              <div className="mb-3">
                <div className={`inline-flex px-3 py-1 bg-gradient-to-r ${stat.color} text-white text-xs font-bold rounded-full`}>
                  {stat.category}
                </div>
              </div>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-2">
                {stat.value}
              </p>

              {/* Label */}
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selector de rango de fechas estilizado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Período de Análisis</h3>
              <p className="text-sm text-gray-600">Selecciona el rango temporal</p>
            </div>
          </div>

          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="px-6 py-3 rounded-2xl border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-semibold text-gray-700"
          >
            <option value="hoy">Hoy</option>
            <option value="ultimos-7-dias">Últimos 7 días</option>
            <option value="ultimos-30-dias">Últimos 30 días</option>
            <option value="este-mes">Este mes</option>
            <option value="personalizado">Personalizado</option>
          </select>

          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Exportar Todo
          </button>
        </div>
      </motion.div>

      {/* Componentes principales con espaciado */}
      <div className="space-y-8">
        <DashboardPostSesion />
        <HeatmapsMovimiento />
        <CurvasIntensidad />
        <AnalisisAsimetrias />
        <CorrelacionCargaInterna />
        <ModeloFatiga />
        <BenchmarkingNormativo />
        <ReportesCientificos />
        <IntegracionAnalisisVideo />
      </div>
    </div>
  );
};

export default InformesSensoresPage;
