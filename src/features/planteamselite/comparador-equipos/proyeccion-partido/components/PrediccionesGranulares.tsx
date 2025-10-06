import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Award, Flag, AlertCircle } from 'lucide-react';

const PrediccionesGranulares: React.FC = () => {
  const predictions = [
    { icon: Target, label: 'Total de Goles', value: '2.5+', probability: 78, color: 'from-green-500 to-emerald-600' },
    { icon: Clock, label: 'Goles en 1er Tiempo', value: '1-2', probability: 65, color: 'from-blue-500 to-indigo-600' },
    { icon: AlertCircle, label: 'Tarjetas Amarillas', value: '3+', probability: 72, color: 'from-yellow-500 to-orange-600' },
    { icon: Flag, label: 'Córners Totales', value: '8+', probability: 68, color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
          <Target className="w-6 h-6 text-white" />
        </div>
        Predicciones Granulares
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Análisis detallado de <span className="font-bold text-orange-600">aspectos específicos del partido</span> incluyendo goles, tiempo, tarjetas y córners.
      </p>

      {/* Grid de predicciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {predictions.map((prediction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-2xl opacity-20"></div>

            <div className="relative z-10">
              {/* Icono y título */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 bg-gradient-to-br ${prediction.color} rounded-xl shadow-lg`}>
                  <prediction.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">{prediction.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{prediction.value}</p>
                </div>
              </div>

              {/* Barra de probabilidad */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-600">Probabilidad</span>
                  <span className="text-lg font-bold text-gray-800">{prediction.probability}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.probability}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                    className={`h-full bg-gradient-to-r ${prediction.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              {/* Badge de confianza */}
              <div className="flex justify-end">
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-300">
                  Alta Confianza
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrediccionesGranulares;
