// src/features/alertas-fatiga/components/RecomendacionesEspecificas.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Moon, Dumbbell, Apple, HeartPulse } from 'lucide-react';

const RecomendacionesEspecificas: React.FC = () => {
  const recomendaciones = [
    {
      categoria: 'Descanso',
      recomendacion: 'Dormir 9-10 horas las próximas 48h',
      prioridad: 'Alta',
      icon: Moon,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      categoria: 'Entrenamiento',
      recomendacion: 'Reducir intensidad al 60% durante 3 días',
      prioridad: 'Alta',
      icon: Dumbbell,
      color: 'from-orange-500 to-red-500'
    },
    {
      categoria: 'Nutrición',
      recomendacion: 'Aumentar ingesta de proteínas y carbohidratos',
      prioridad: 'Media',
      icon: Apple,
      color: 'from-green-500 to-emerald-500'
    },
    {
      categoria: 'Recuperación',
      recomendacion: 'Sesiones de masaje o crioterapia',
      prioridad: 'Media',
      icon: HeartPulse,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const getPrioridadColor = (prioridad: string) => {
    if (prioridad === 'Alta') return 'bg-red-500';
    if (prioridad === 'Media') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Recomendaciones</h3>
            <p className="text-xs text-gray-600">Acciones específicas personalizadas</p>
          </div>
        </div>

        {/* Lista de Recomendaciones */}
        <div className="space-y-3">
          {recomendaciones.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <motion.div
                key={rec.categoria}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 p-2 bg-gradient-to-br ${rec.color} rounded-xl shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800 text-sm">{rec.categoria}</h4>
                      <div className={`${getPrioridadColor(rec.prioridad)} text-white text-xs font-bold rounded-full px-3 py-0.5`}>
                        {rec.prioridad}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{rec.recomendacion}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <p className="text-xs text-green-700 font-medium">
            <span className="font-bold">✅ Personalización:</span> Recomendaciones adaptadas según perfil del atleta y tipo de fatiga detectada.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RecomendacionesEspecificas;
