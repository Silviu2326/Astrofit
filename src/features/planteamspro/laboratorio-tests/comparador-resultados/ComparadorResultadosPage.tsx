import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, TrendingUp, Users, ArrowLeftRight, CheckCircle, AlertCircle } from 'lucide-react';
import GraficoComparativo from './components/GraficoComparativo';
import { useComparadorResultados } from './comparadorResultadosApi';
import AnalisisFortalezas from './components/AnalisisFortalezas';
import RecomendacionesEntrenamiento from './components/RecomendacionesEntrenamiento';
import SimuladorAlineacion from './components/SimuladorAlineacion';
import BenchmarksHistoricos from './components/BenchmarksHistoricos';
import CompatibilidadAtletas from './components/CompatibilidadAtletas';
import ScoringPonderado from './components/ScoringPonderado';
import PrediccionCompetencia from './components/PrediccionCompetencia';
import ReportesScouting from './components/ReportesScouting';

const ComparadorResultadosPage: React.FC = () => {
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const { data: athleteData, isLoading, error } = useComparadorResultados(selectedAthletes);

  const availableAthletes = ['Atleta A', 'Atleta B', 'Atleta C', 'Atleta D', 'Atleta E']; // Mock data

  const handleAthleteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(event.target.options);
    const newSelectedAthletes = options.filter(option => option.selected).map(option => option.value);
    setSelectedAthletes(newSelectedAthletes);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
          <div className="animate-pulse flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-lg font-semibold text-gray-700">Cargando datos...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/30 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-8 h-8" />
            <span className="text-lg font-semibold">Error al cargar datos: {error.message}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <GitCompare className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Comparador de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Resultados</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Analiza y compara el rendimiento de múltiples atletas en tiempo real con
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm ml-2">métricas avanzadas</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Hasta 5 atletas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Análisis en tiempo real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selector de atletas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <label htmlFor="athlete-select" className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
              <Users className="w-5 h-5" />
            </div>
            Selecciona 2-5 atletas para comparar:
          </label>
          <select
            id="athlete-select"
            multiple
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium text-gray-700"
            value={selectedAthletes}
            onChange={handleAthleteChange}
          >
            {availableAthletes.map(athlete => (
              <option key={athlete} value={athlete} className="py-2">
                {athlete}
              </option>
            ))}
          </select>

          {/* Badge de seleccionados */}
          {selectedAthletes.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
                <span className="text-sm font-bold text-blue-700">{selectedAthletes.length} atletas seleccionados</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Resultados comparativos */}
      {selectedAthletes.length >= 2 && selectedAthletes.length <= 5 && athleteData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          {/* Header del comparador */}
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <ArrowLeftRight className="w-6 h-6" />
                </div>
                Resultados Comparativos
              </h2>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">Comparación activa</span>
              </div>
            </div>
          </div>

          {/* Body con gráfico */}
          <div className="p-6">
            <GraficoComparativo data={athleteData} />
          </div>

          {/* Análisis avanzado */}
          <div className="p-6 pt-0">
            <div className="mt-8 pt-6 border-t-2 border-gradient-to-r from-blue-200 to-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  Análisis Competitivo Avanzado
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnalisisFortalezas />
                <RecomendacionesEntrenamiento />
                <SimuladorAlineacion />
                <BenchmarksHistoricos />
                <CompatibilidadAtletas />
                <ScoringPonderado />
                <PrediccionCompetencia />
                <ReportesScouting />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mensajes de validación */}
      {selectedAthletes.length > 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 bg-red-50/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-red-200 flex items-center gap-3"
        >
          <div className="p-2 bg-red-500 rounded-xl">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-red-700 font-semibold">Por favor, selecciona un máximo de 5 atletas.</p>
        </motion.div>
      )}

      {selectedAthletes.length < 2 && selectedAthletes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 bg-yellow-50/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-yellow-200 flex items-center gap-3"
        >
          <div className="p-2 bg-yellow-500 rounded-xl">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-yellow-700 font-semibold">Por favor, selecciona al menos 2 atletas para comparar.</p>
        </motion.div>
      )}
    </div>
  );
};

export default ComparadorResultadosPage;
