import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords, User, Sparkles, TrendingUp, Users } from 'lucide-react';
import ComparacionDirecta from './components/ComparacionDirecta';
import AnalisisComplementariedad from './components/AnalisisComplementariedad';
import SimuladorDuelos from './components/SimuladorDuelos';
import ReporteScouting from './components/ReporteScouting';
import RadarCharts from './components/RadarCharts';
import HistorialEnfrentamientos from './components/HistorialEnfrentamientos';
import ScoringPonderado from './components/ScoringPonderado';
import RecomendacionesTacticas from './components/RecomendacionesTacticas';
import PrediccionEvolucion from './components/PrediccionEvolucion';

interface Atleta {
  id: string;
  nombre: string;
}

const ComparadorAtletasPage: React.FC = () => {
  const [atleta1, setAtleta1] = useState<Atleta | null>(null);
  const [atleta2, setAtleta2] = useState<Atleta | null>(null);

  // Mock data for athlete selection
  const atletasDisponibles: Atleta[] = [
    { id: '1', nombre: 'Atleta A' },
    { id: '2', nombre: 'Atleta B' },
    { id: '3', nombre: 'Atleta C' },
    { id: '4', nombre: 'Atleta D' },
  ];

  const handleSelectAtleta = (atleta: Atleta, setter: React.Dispatch<React.SetStateAction<Atleta | null>>) => {
    setter(atleta);
  };

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
              <Swords className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Comparador de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Atletas</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Análisis competitivo profesional <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cara a cara</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Métricas Avanzadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Análisis Táctico</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Predicción IA</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selector de Atletas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-600" />
            Selecciona los atletas a comparar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Atleta 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <label htmlFor="atleta1-select" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Atleta 1
              </label>
              <div className="relative">
                <select
                  id="atleta1-select"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none font-medium"
                  onChange={(e) => handleSelectAtleta(atletasDisponibles.find(a => a.id === e.target.value)!, setAtleta1)}
                  value={atleta1?.id || ''}
                >
                  <option value="">-- Seleccionar Atleta --</option>
                  {atletasDisponibles.map((atleta) => (
                    <option key={atleta.id} value={atleta.id}>
                      {atleta.nombre}
                    </option>
                  ))}
                </select>
                {atleta1 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    ✓
                  </div>
                )}
              </div>
            </motion.div>

            {/* VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-2xl font-bold rounded-full shadow-2xl border-4 border-white">
                  VS
                </div>
                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 -z-10"></div>
              </div>
            </div>

            {/* Atleta 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <label htmlFor="atleta2-select" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Atleta 2
              </label>
              <div className="relative">
                <select
                  id="atleta2-select"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none font-medium"
                  onChange={(e) => handleSelectAtleta(atletasDisponibles.find(a => a.id === e.target.value)!, setAtleta2)}
                  value={atleta2?.id || ''}
                >
                  <option value="">-- Seleccionar Atleta --</option>
                  {atletasDisponibles.map((atleta) => (
                    <option key={atleta.id} value={atleta.id}>
                      {atleta.nombre}
                    </option>
                  ))}
                </select>
                {atleta2 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                    ✓
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Contenido de Comparación */}
      {atleta1 && atleta2 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <ComparacionDirecta atleta1Id={atleta1.id} atleta2Id={atleta2.id} />
          <AnalisisComplementariedad />
          <SimuladorDuelos />
          <ReporteScouting />
          <RadarCharts />
          <HistorialEnfrentamientos />
          <ScoringPonderado />
          <RecomendacionesTacticas />
          <PrediccionEvolucion />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
              <Swords className="w-12 h-12 text-indigo-600" />
            </div>
            <p className="text-xl text-gray-600 font-medium">
              Selecciona dos atletas para iniciar el análisis competitivo
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Elige los atletas en los selectores de arriba para comparar sus estadísticas y rendimiento
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ComparadorAtletasPage;

