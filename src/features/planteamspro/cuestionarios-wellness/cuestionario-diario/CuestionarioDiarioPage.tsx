import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, TrendingUp } from 'lucide-react';
import FormularioWellness from './components/FormularioWellness';
import MonitorEmocional from './components/MonitorEmocional';
import AlertasWellness from './components/AlertasWellness';
import RecomendacionesPersonalizadas from './components/RecomendacionesPersonalizadas';
import IntegracionWearables from './components/IntegracionWearables';
import CuestionariosAdaptativos from './components/CuestionariosAdaptativos';
import SistemaGamificacion from './components/SistemaGamificacion';
import AnalisisCorrelaciones from './components/AnalisisCorrelaciones';
import IntervencionesAutomaticas from './components/IntervencionesAutomaticas';

const CuestionarioDiarioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
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
                <Heart className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Cuestionario <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Diario</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed mb-6">
              Registra tu bienestar diario y recibe <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">recomendaciones personalizadas</span>
            </p>

            {/* Indicadores pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">Seguimiento Diario</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">Progreso Continuo</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Formulario Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden mb-8"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <FormularioWellness />
          </div>
        </motion.div>

        {/* Grid de Componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <MonitorEmocional />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <AlertasWellness />
          </motion.div>
        </div>

        {/* Sección de Componentes Adicionales */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <RecomendacionesPersonalizadas />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <IntegracionWearables />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <CuestionariosAdaptativos />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <SistemaGamificacion />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <AnalisisCorrelaciones />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <IntervencionesAutomaticas />
          </motion.div>
        </div>

        {/* Historial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 text-center"
        >
          <p className="text-gray-600 text-sm font-medium">📊 Historial básico de respuestas (próximamente)</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CuestionarioDiarioPage;
