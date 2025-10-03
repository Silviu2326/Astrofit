// src/features/comparativas-longitudinales/components/AnalisisEstacional.tsx
// Análisis estacional automático detección ciclos rendimiento
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Sparkles } from 'lucide-react';

const AnalisisEstacional: React.FC = () => {
  const seasons = [
    { name: 'Verano', value: 85, trend: 'up', color: 'from-orange-400 to-red-500' },
    { name: 'Otoño', value: 72, trend: 'stable', color: 'from-amber-400 to-orange-500' },
    { name: 'Invierno', value: 65, trend: 'down', color: 'from-blue-400 to-cyan-500' },
    { name: 'Primavera', value: 78, trend: 'up', color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <div className="space-y-4">
      {/* Indicador de ciclos detectados */}
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <p className="text-sm font-semibold text-blue-700">
          Ciclos estacionales detectados: <span className="font-bold">4 patrones</span>
        </p>
      </div>

      {/* Grid de estaciones */}
      <div className="grid grid-cols-2 gap-3">
        {seasons.map((season, index) => (
          <motion.div
            key={season.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <h4 className="font-bold text-gray-900">{season.name}</h4>
              </div>
              <TrendingUp className={`w-4 h-4 ${
                season.trend === 'up' ? 'text-green-600' :
                season.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`} />
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${season.value}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className={`h-full bg-gradient-to-r ${season.color} rounded-full`}
              ></motion.div>
            </div>

            <p className="text-xs text-gray-600">Rendimiento: <span className="font-bold">{season.value}%</span></p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalisisEstacional;
