import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, TrendingUp, Users, Settings, Play, Library, BarChart3, Target } from 'lucide-react';
import TableroTactico from './components/TableroTactico';
import AnalizadorTactico from './components/AnalizadorTactico';
import SimuladorFormaciones from './components/SimuladorFormaciones';
import OptimizadorAlineacion from './components/OptimizadorAlineacion';
import CompatibilidadJugadores from './components/CompatibilidadJugadores';
import FormacionesDinamicas from './components/FormacionesDinamicas';
import IntegracionVideo from './components/IntegracionVideo';
import BibliotecaFormaciones from './components/BibliotecaFormaciones';
import PrediccionResultado from './components/PrediccionResultado';

const GestionPlantillasConvocatoriaPage: React.FC = () => {
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
              <ClipboardList className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Plantillas</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona las <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">alineaciones tácticas</span> para diferentes deportes con análisis avanzado
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Análisis Táctico</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Optimización de Alineaciones</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Library className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Biblioteca de Formaciones</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tablero Táctico Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <TableroTactico />
      </motion.div>

      {/* Sección de Herramientas Avanzadas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Settings className="w-6 h-6" />
            </div>
            Análisis Táctico Avanzado
          </h2>
        </div>

        {/* Body - Grid de Componentes */}
        <div className="p-6 space-y-6">
          {/* Grid de herramientas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analizador Táctico */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Analizador Táctico</h3>
                </div>
                <AnalizadorTactico />
              </div>
            </motion.div>

            {/* Simulador de Formaciones */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Simulador de Formaciones</h3>
                </div>
                <SimuladorFormaciones />
              </div>
            </motion.div>

            {/* Optimizador de Alineación */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Optimizador de Alineación</h3>
                </div>
                <OptimizadorAlineacion />
              </div>
            </motion.div>

            {/* Compatibilidad de Jugadores */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200 relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-600 opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Compatibilidad de Jugadores</h3>
                </div>
                <CompatibilidadJugadores />
              </div>
            </motion.div>
          </div>

          {/* Sección completa - Formaciones Dinámicas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-600 opacity-10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <FormacionesDinamicas />
            </div>
          </motion.div>

          {/* Grid inferior */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Integración Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200 relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                    <Play className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Integración Video</h3>
                </div>
                <IntegracionVideo />
              </div>
            </motion.div>

            {/* Biblioteca de Formaciones */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200 relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-violet-400 to-purple-600 opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Library className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Biblioteca de Formaciones</h3>
                </div>
                <BibliotecaFormaciones />
              </div>
            </motion.div>

            {/* Predicción de Resultado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200 relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-600 opacity-10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Predicción de Resultado</h3>
                </div>
                <PrediccionResultado />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GestionPlantillasConvocatoriaPage;
