import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Target, TrendingUp, CheckCircle2, Calendar } from 'lucide-react';
import EditorModular from './components/EditorModular';
import CalculadoraCarga from './components/CalculadoraCarga';
import ValidadorCientifico from './components/ValidadorCientifico';
import SimuladorAdaptacion from './components/SimuladorAdaptacion';
import AlertasSobreentrenamiento from './components/AlertasSobreentrenamiento';
import IntegracionBaseDatos from './components/IntegracionBaseDatos';
import RecomendacionesDeporte from './components/RecomendacionesDeporte';
import AnalisisProgresion from './components/AnalisisProgresion';
import PrediccionResultados from './components/PrediccionResultados';

const EditarMesocicloPage: React.FC = () => {
  const [mesocicloDuration, setMesocicloDuration] = useState<number>(4); // Default 4 weeks
  const [objetivos, setObjetivos] = useState<{ [key: string]: number }>({
    fuerza: 25,
    resistencia: 25,
    tecnica: 25,
    velocidad: 25,
  });

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = Math.max(2, Math.min(6, Number(e.target.value)));
    setMesocicloDuration(duration);
  };

  const handleObjetivoChange = (objetivo: string, value: number) => {
    setObjetivos((prev) => {
      const newObjetivos = { ...prev, [objetivo]: value };
      const total = Object.values(newObjetivos).reduce((sum, val) => sum + val, 0);
      // Normalize to 100% if total exceeds 100
      if (total > 100) {
        const scale = 100 / total;
        for (const key in newObjetivos) {
          newObjetivos[key] = Math.round(newObjetivos[key] * scale);
        }
      }
      return newObjetivos;
    });
  };

  const totalObjetivos = Object.values(objetivos).reduce((sum, val) => sum + val, 0);
  const completionPercentage = (totalObjetivos / 100) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      <div className="container mx-auto px-4 py-8">
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
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Edit3 className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Editor de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Mesociclo</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
              Diseña bloques de entrenamiento con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">precisión científica</span>
            </p>

            {/* Progress indicator */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Completitud del formulario</span>
                <span className="text-sm font-bold text-yellow-300">{completionPercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/20 backdrop-blur-md rounded-full h-4 overflow-hidden shadow-inner border border-white/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Configuración General Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-6"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Calendar className="w-6 h-6" />
              </div>
              Configuración General
            </h2>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="mb-4">
              <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-3">
                Duración del Mesociclo: <span className="text-indigo-600 text-lg">{mesocicloDuration} semanas</span>
              </label>
              <input
                type="range"
                id="duration"
                min="2"
                max="6"
                value={mesocicloDuration}
                onChange={handleDurationChange}
                className="w-full h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #818cf8 0%, #818cf8 ${((mesocicloDuration - 2) / 4) * 100}%, #e0e7ff ${((mesocicloDuration - 2) / 4) * 100}%, #e0e7ff 100%)`
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                <span>2 sem</span>
                <span>3 sem</span>
                <span>4 sem</span>
                <span>5 sem</span>
                <span>6 sem</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Objetivos del Entrenamiento Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-6 relative"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target className="w-6 h-6" />
              </div>
              Objetivos del Entrenamiento
            </h2>
          </div>

          {/* Body */}
          <div className="p-6 relative z-10">
            {Object.entries(objetivos).map(([objetivo, value], index) => (
              <motion.div
                key={objetivo}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100 hover:border-purple-300 transition-all duration-300"
              >
                <label className="block text-gray-700 text-sm font-bold mb-3 capitalize flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    {objetivo}
                  </span>
                  <span className="text-lg text-purple-600">{value}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleObjetivoChange(objetivo, Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${value}%, #f3e8ff ${value}%, #f3e8ff 100%)`
                  }}
                />
                {/* Barra de progreso visual */}
                <div className="mt-3 w-full bg-purple-100 rounded-full h-2 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}

            {/* Total Badge */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">Total asignado:</span>
                <div className="flex items-center gap-2">
                  {totalObjetivos === 100 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-orange-400"></div>
                  )}
                  <span className={`text-xl font-bold ${totalObjetivos === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                    {totalObjetivos}%
                  </span>
                </div>
              </div>
              {totalObjetivos !== 100 && (
                <p className="text-xs text-orange-600 mt-2 font-medium">
                  Ajusta los valores para llegar al 100%
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Editor Modular */}
        <EditorModular />

        {/* Herramientas Científicas Avanzadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mt-6 relative"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Herramientas Científicas Avanzadas
            </h2>
          </div>

          {/* Body */}
          <div className="p-6 relative z-10 space-y-6">
            <CalculadoraCarga />
            <ValidadorCientifico />
            <SimuladorAdaptacion />
            <AlertasSobreentrenamiento />
            <IntegracionBaseDatos />
            <RecomendacionesDeporte />
            <AnalisisProgresion />
            <PrediccionResultados />
          </div>
        </motion.div>

        {/* Resumen del Mesociclo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mt-6 relative"
        >
          {/* Decoración de fondo */}
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              Resumen del Mesociclo
            </h2>
          </div>

          {/* Body */}
          <div className="p-6 relative z-10">
            {totalObjetivos === 100 ? (
              <div className="space-y-3">
                {Object.entries(objetivos).map(([objetivo, value], index) => (
                  <motion.div
                    key={objetivo}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:shadow-md transition-all duration-300"
                  >
                    <span className="font-semibold text-gray-700 capitalize flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                      {objetivo}
                    </span>
                    <span className="text-lg font-bold text-indigo-600">{value}%</span>
                  </motion.div>
                ))}

                {/* Botones de acción */}
                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group border border-white/20"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Guardar Mesociclo
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 border-2 border-indigo-500 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all duration-300"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
                <p className="text-orange-600 font-semibold flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-orange-400 flex items-center justify-center">
                    <span className="text-xs">!</span>
                  </div>
                  Ajusta los objetivos para que sumen 100% para ver el resumen completo.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditarMesocicloPage;