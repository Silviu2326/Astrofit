import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Heart, Award } from 'lucide-react';

const PerfilPsicologico: React.FC = () => {
  const atributos = [
    { nombre: 'Concentración', valor: 88, icono: Brain },
    { nombre: 'Resiliencia', valor: 92, icono: Zap },
    { nombre: 'Motivación', valor: 85, icono: Heart },
    { nombre: 'Liderazgo', valor: 78, icono: Award },
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
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Brain className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Perfil Psicológico</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Tests validados y análisis de personalidad deportiva
        </p>

        {/* Atributos con progress bars */}
        <div className="space-y-4">
          {atributos.map((atributo, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <atributo.icono className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{atributo.nombre}</span>
                </div>
                <span className="text-sm font-bold text-purple-600">{atributo.valor}%</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${atributo.valor}%` }}
                  transition={{ delay: index * 0.15, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full relative"
                >
                  {/* Efecto de pulso interno */}
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Badge de evaluación */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Evaluación</span>
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
              Excelente
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerfilPsicologico;
