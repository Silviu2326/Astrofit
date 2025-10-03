import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Target, Award } from 'lucide-react';

const CompatibilidadSistema: React.FC = () => {
  const compatibilidades = [
    { sistema: '4-3-3', nivel: 95, color: 'from-green-500 to-emerald-600' },
    { sistema: '4-4-2', nivel: 78, color: 'from-yellow-500 to-orange-600' },
    { sistema: '3-5-2', nivel: 82, color: 'from-blue-500 to-indigo-600' },
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
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Layers className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Compatibilidad Sistema</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Análisis de compatibilidad con sistemas de juego del club
        </p>

        {/* Sistemas con indicadores radiales */}
        <div className="space-y-4 mb-6">
          {compatibilidades.map((comp, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-700">{comp.sistema}</span>
                <div className="flex items-center gap-2">
                  {comp.nivel >= 90 && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                  <span className="text-sm font-bold text-teal-600">{comp.nivel}%</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${comp.nivel}%` }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${comp.color} rounded-full relative`}
                  >
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador destacado */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-bold text-gray-700">Sistema Óptimo</span>
            </div>
            <span className="text-lg font-bold text-teal-700">4-3-3</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompatibilidadSistema;
