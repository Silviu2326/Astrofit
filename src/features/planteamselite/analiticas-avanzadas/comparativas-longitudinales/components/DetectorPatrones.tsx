// src/features/comparativas-longitudinales/components/DetectorPatrones.tsx
// Detector patrones machine learning identificar tendencias
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, TrendingDown, Activity, CheckCircle } from 'lucide-react';

const DetectorPatrones: React.FC = () => {
  const patterns = [
    { name: 'Pico de rendimiento', type: 'up', detected: true, strength: 'Alto' },
    { name: 'Caída progresiva', type: 'down', detected: true, strength: 'Medio' },
    { name: 'Estabilidad continua', type: 'stable', detected: true, strength: 'Alto' },
    { name: 'Patrón cíclico', type: 'cycle', detected: false, strength: 'Bajo' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
        <Eye className="w-5 h-5 text-purple-600" />
        <p className="text-sm font-semibold text-purple-700">
          Patrones detectados: <span className="font-bold">{patterns.filter(p => p.detected).length}/4</span>
        </p>
      </div>

      <div className="space-y-2">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 ${
              pattern.detected
                ? 'bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-md'
                : 'bg-gray-50 border-gray-100 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              {pattern.type === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
              {pattern.type === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
              {pattern.type === 'stable' && <Activity className="w-5 h-5 text-blue-600" />}
              {pattern.type === 'cycle' && <Activity className="w-5 h-5 text-orange-600" />}

              <div>
                <h5 className="font-bold text-gray-900 text-sm">{pattern.name}</h5>
                <span className={`text-xs font-semibold ${
                  pattern.strength === 'Alto' ? 'text-green-600' :
                  pattern.strength === 'Medio' ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                  Fuerza: {pattern.strength}
                </span>
              </div>
            </div>

            {pattern.detected && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DetectorPatrones;
