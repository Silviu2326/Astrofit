import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Zap } from 'lucide-react';

const CompatibilidadAtletas: React.FC = () => {
  const compatibilidades = [
    { pareja: 'Atleta A & B', compatibilidad: 95, sinergia: 'Excelente' },
    { pareja: 'Atleta B & C', compatibilidad: 78, sinergia: 'Buena' },
    { pareja: 'Atleta A & D', compatibilidad: 62, sinergia: 'Regular' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white shadow-lg">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Compatibilidad entre Atletas</h3>
        </div>

        <div className="space-y-3">
          {compatibilidades.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-pink-600" />
                  <span className="text-sm font-semibold text-gray-800">{comp.pareja}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  comp.sinergia === 'Excelente' ? 'bg-green-100 text-green-700' :
                  comp.sinergia === 'Buena' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {comp.sinergia}
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 font-medium">Compatibilidad</span>
                <span className="text-sm font-bold text-pink-600">{comp.compatibilidad}%</span>
              </div>

              <div className="w-full bg-pink-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${comp.compatibilidad}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CompatibilidadAtletas;
