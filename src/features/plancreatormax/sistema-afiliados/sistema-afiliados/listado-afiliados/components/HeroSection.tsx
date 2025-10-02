import React from 'react';
import { motion } from 'framer-motion';
import { Network, Users, TrendingUp, DollarSign } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
            <Network className="w-10 h-10 text-yellow-300 animate-pulse" />
            <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Sistema de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Afiliados</span>
          </h1>
        </div>

        {/* Descripción */}
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-8">
          Gestiona tu red de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">partners</span> y maximiza el crecimiento
        </p>

        {/* Indicadores pills */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <Users className="w-5 h-5 text-green-300" />
            <span className="text-sm font-semibold text-white">Red Activa</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <TrendingUp className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-semibold text-white">Crecimiento Mensual</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <DollarSign className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold text-white">Comisiones Automatizadas</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
