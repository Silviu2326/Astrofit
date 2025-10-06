import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Activity, Heart } from 'lucide-react';
import PanelAlertas from './components/PanelAlertas';
import ModeloPredictivoFatiga from './components/ModeloPredictivoFatiga';
import ProtocolosIntervencion from './components/ProtocolosIntervencion';
import SeguimientoRecuperacion from './components/SeguimientoRecuperacion';
import IntegracionBiomarcadores from './components/IntegracionBiomarcadores';
import ClasificadorFatiga from './components/ClasificadorFatiga';
import SistemaEscalamiento from './components/SistemaEscalamiento';
import AnalisisFactores from './components/AnalisisFactores';
import RecomendacionesEspecificas from './components/RecomendacionesEspecificas';

const AlertasFatigaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <AlertTriangle className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Alertas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Fatiga</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed mb-6">
            Sistema avanzado de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">detección de sobrecarga</span> y gestión de recuperación
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Monitoreo en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Heart className="w-5 h-5 text-pink-300" />
              <span className="text-sm font-semibold text-white">Análisis Predictivo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Panel Principal de Alertas */}
      <PanelAlertas />

      {/* Grid de Componentes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModeloPredictivoFatiga />
        <ProtocolosIntervencion />
        <SeguimientoRecuperacion />
        <IntegracionBiomarcadores />
        <ClasificadorFatiga />
        <SistemaEscalamiento />
        <AnalisisFactores />
        <RecomendacionesEspecificas />
      </div>
    </div>
  );
};

export default AlertasFatigaPage;
