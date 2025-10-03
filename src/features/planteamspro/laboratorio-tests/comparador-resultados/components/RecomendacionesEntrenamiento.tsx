import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, CheckCircle, Clock } from 'lucide-react';

const RecomendacionesEntrenamiento: React.FC = () => {
  const recomendaciones = [
    { titulo: 'Entrenamiento de Fuerza', duracion: '45 min', prioridad: 'Alta' },
    { titulo: 'Trabajo de Velocidad', duracion: '30 min', prioridad: 'Media' },
    { titulo: 'Flexibilidad', duracion: '20 min', prioridad: 'Media' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white shadow-lg">
            <Dumbbell className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Recomendaciones de Entrenamiento</h3>
        </div>

        <div className="space-y-3">
          {recomendaciones.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-200 transition-colors duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="p-1 bg-purple-500 rounded-lg mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{rec.titulo}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{rec.duracion}</span>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        rec.prioridad === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rec.prioridad}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecomendacionesEntrenamiento;
