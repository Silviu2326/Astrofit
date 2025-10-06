import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Award, Brain } from 'lucide-react';

const SugerenciasInteligentes: React.FC = () => {
  const [suggestions] = useState([
    { id: 1, person: 'Ana López', role: 'Capitán', reason: 'Alta experiencia de liderazgo', confidence: 95 },
    { id: 2, person: 'Carlos Ruiz', role: 'Entrenador', reason: 'Certificación avanzada', confidence: 88 },
    { id: 3, person: 'Laura Martín', role: 'Fisioterapeuta', reason: 'Especialización en deportes', confidence: 92 },
  ]);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* Icono y título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">IA</p>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Sugerencias
            </h3>
          </div>
        </div>

        {/* Sugerencias */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{suggestion.person}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      {suggestion.role}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold">{suggestion.confidence}%</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 flex items-center gap-1">
                <Award className="w-3 h-3 text-purple-500" />
                {suggestion.reason}
              </p>

              {/* Barra de confianza */}
              <div className="mt-3 w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${suggestion.confidence}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer con indicador */}
        <div className="mt-6 flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-white border border-purple-100">
          <TrendingUp className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-semibold text-purple-700">Basado en análisis de rendimiento</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SugerenciasInteligentes;
