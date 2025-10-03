import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';

const ValoracionEconomica: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <DollarSign className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Valoración Económica</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Valoración dinámica y potencial de mercado del jugador
        </p>

        {/* Valor actual con gradiente destacado */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Valor Actual</span>
            </div>
            <p className="text-4xl font-bold text-white mb-1">€12.5M</p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white">+25% vs anterior</span>
            </div>
          </div>
        </div>

        {/* Indicadores adicionales */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-gray-600">Potencial</span>
            </div>
            <p className="text-lg font-bold text-emerald-700">€18M</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-3 border border-cyan-200">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-semibold text-gray-600">Mercado</span>
            </div>
            <p className="text-lg font-bold text-cyan-700">Alto</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ValoracionEconomica;
