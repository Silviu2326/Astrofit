import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, LineChart, Target, ArrowUpRight, ArrowDownRight, Minus, Sparkles, Filter } from 'lucide-react';
import GraficoMultiAnual from './components/GraficoMultiAnual';
import AnalisisEstacional from './components/AnalisisEstacional';
import ModelosPredictivos from './components/ModelosPredictivos';
import DetectorPatrones from './components/DetectorPatrones';
import CorrelacionesAutomaticas from './components/CorrelacionesAutomaticas';
import AnalisisCohortes from './components/AnalisisCohortes';
import BenchmarkingInternacional from './components/BenchmarkingInternacional';
import VentanasCriticas from './components/VentanasCriticas';
import ReportesCientificos from './components/ReportesCientificos';

const ComparativasLongitudinalesPage: React.FC = () => {
  const [filter, setFilter] = useState({ position: '', role: '', category: '' });
  const [selectedPeriod, setSelectedPeriod] = useState('2020-2024');

  // Datos de ejemplo para el gráfico
  const data = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Rendimiento Atleta A',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
      },
      {
        label: 'Rendimiento Atleta B',
        data: [28, 48, 40, 19, 86],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
      },
    ],
  };

  // Timeline data
  const timelineEvents = [
    { year: '2020', trend: 'stable', change: 0, label: 'Base inicial' },
    { year: '2021', trend: 'down', change: -9.2, label: 'Ajuste técnico' },
    { year: '2022', trend: 'up', change: 35.6, label: 'Mejora significativa' },
    { year: '2023', trend: 'up', change: 1.3, label: 'Consolidación' },
    { year: '2024', trend: 'down', change: -30.9, label: 'Periodo de recuperación' },
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
              <TrendingUp className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Comparativas <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Longitudinales</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Análisis científico avanzado de evolución temporal y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tendencias predictivas</span>
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <LineChart className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Multi-Anual</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Machine Learning</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-pink-300" />
              <span className="text-sm font-semibold text-white">Predicciones</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selector de Período y Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">Filtros y Período</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Período</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option value="2020-2024">2020 - 2024</option>
                <option value="2019-2023">2019 - 2023</option>
                <option value="2018-2022">2018 - 2022</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Filtrar por posición"
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              value={filter.position}
              onChange={(e) => setFilter({ ...filter, position: e.target.value })}
            />
            <input
              type="text"
              placeholder="Filtrar por rol"
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              value={filter.role}
              onChange={(e) => setFilter({ ...filter, role: e.target.value })}
            />
            <input
              type="text"
              placeholder="Filtrar por categoría"
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            />
          </div>
        </div>
      </motion.div>

      {/* Timeline de Evolución */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Timeline de Evolución</h2>
          </div>

          <div className="relative">
            {/* Línea vertical continua */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200"></div>

            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-6 relative"
                >
                  {/* Punto en timeline */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl z-10 ${
                    event.trend === 'up' ? 'bg-gradient-to-br from-emerald-400 to-teal-600' :
                    event.trend === 'down' ? 'bg-gradient-to-br from-orange-400 to-red-600' :
                    'bg-gradient-to-br from-gray-400 to-gray-600'
                  }`}>
                    {event.trend === 'up' && <ArrowUpRight className="w-8 h-8" />}
                    {event.trend === 'down' && <ArrowDownRight className="w-8 h-8" />}
                    {event.trend === 'stable' && <Minus className="w-8 h-8" />}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{event.year}</h3>
                      {event.change !== 0 && (
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          event.trend === 'up' ? 'bg-green-100 text-green-700' :
                          event.trend === 'down' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {event.change > 0 ? '+' : ''}{event.change}%
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{event.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gráfico Multi-Anual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <LineChart className="w-6 h-6" />
            </div>
            Evolución de Rendimiento Multi-Anual
          </h3>
        </div>

        <div className="p-6">
          <GraficoMultiAnual data={data} />
          <div className="mt-4 flex items-start gap-2 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Indicadores de progresión y regresión por período. Los datos muestran tendencias comparativas longitudinales.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid de Componentes de Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Análisis Estacional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Análisis Estacional</h3>
          </div>
          <div className="p-6">
            <AnalisisEstacional />
            <p className="mt-4 text-sm text-gray-600">
              Análisis estacional automático para la detección de ciclos de rendimiento.
            </p>
          </div>
        </motion.div>

        {/* Modelos Predictivos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Modelos Predictivos</h3>
          </div>
          <div className="p-6">
            <ModelosPredictivos />
            <p className="mt-4 text-sm text-gray-600">
              Modelos predictivos para proyectar la evolución futura de los atletas.
            </p>
          </div>
        </motion.div>

        {/* Detector de Patrones */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Detector de Patrones</h3>
          </div>
          <div className="p-6">
            <DetectorPatrones />
            <p className="mt-4 text-sm text-gray-600">
              Detector de patrones basado en machine learning para identificar tendencias.
            </p>
          </div>
        </motion.div>

        {/* Correlaciones Automáticas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Correlaciones Automáticas</h3>
          </div>
          <div className="p-6">
            <CorrelacionesAutomaticas />
            <p className="mt-4 text-sm text-gray-600">
              Correlaciones automáticas entre variables de entrenamiento y competencia.
            </p>
          </div>
        </motion.div>

        {/* Análisis de Cohortes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Análisis de Cohortes</h3>
          </div>
          <div className="p-6">
            <AnalisisCohortes />
            <p className="mt-4 text-sm text-gray-600">
              Análisis de cohortes para comparar generaciones de atletas.
            </p>
          </div>
        </motion.div>

        {/* Benchmarking Internacional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Benchmarking Internacional</h3>
          </div>
          <div className="p-6">
            <BenchmarkingInternacional />
            <p className="mt-4 text-sm text-gray-600">
              Sistema de benchmarking con bases de datos deportivas internacionales.
            </p>
          </div>
        </motion.div>

        {/* Ventanas Críticas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Ventanas Críticas</h3>
          </div>
          <div className="p-6">
            <VentanasCriticas />
            <p className="mt-4 text-sm text-gray-600">
              Identificación automática de ventanas críticas de desarrollo.
            </p>
          </div>
        </motion.div>

        {/* Reportes Científicos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Reportes Científicos</h3>
          </div>
          <div className="p-6">
            <ReportesCientificos />
            <p className="mt-4 text-sm text-gray-600">
              Generación de reportes científicos con significancia estadística de los cambios.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparativasLongitudinalesPage;
