import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Target, Star } from 'lucide-react';

const ProyeccionCarrera: React.FC = () => {
  const proyecciones = [
    { anio: '2025', nivel: 75 },
    { anio: '2026', nivel: 82 },
    { anio: '2027', nivel: 88 },
    { anio: '2028', nivel: 91 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Proyección de Carrera</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Modelos predictivos y comparación con atletas similares
        </p>

        {/* Gráfico de barras simplificado */}
        <div className="space-y-3 mb-6">
          {proyecciones.map((proyeccion, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-600 w-12">{proyeccion.anio}</span>
              <div className="flex-1">
                <div className="w-full bg-green-200 rounded-full h-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${proyeccion.nivel}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-end pr-2"
                  >
                    <span className="text-xs font-bold text-white">{proyeccion.nivel}%</span>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-gray-600">Potencial</span>
            </div>
            <p className="text-lg font-bold text-green-700">Alto</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-3 border border-teal-200">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-semibold text-gray-600">Rating</span>
            </div>
            <p className="text-lg font-bold text-teal-700">91/100</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProyeccionCarrera;
