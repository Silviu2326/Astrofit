// src/features/alertas-fatiga/components/AnalisisFactores.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Moon, Brain, Target } from 'lucide-react';

const AnalisisFactores: React.FC = () => {
  const factores = [
    {
      nombre: 'Carga de Entrenamiento',
      valor: 85,
      impacto: 'Alto',
      icon: Dumbbell,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50'
    },
    {
      nombre: 'Calidad del Sueño',
      valor: 45,
      impacto: 'Crítico',
      icon: Moon,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50'
    },
    {
      nombre: 'Nivel de Estrés',
      valor: 70,
      impacto: 'Moderado',
      icon: Brain,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50'
    },
    {
      nombre: 'Adherencia Nutricional',
      valor: 60,
      impacto: 'Moderado',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    }
  ];

  const getImpactoColor = (impacto: string) => {
    if (impacto === 'Crítico') return 'bg-red-500';
    if (impacto === 'Alto') return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Análisis de Factores</h3>
            <p className="text-xs text-gray-600">Contribuyentes a la fatiga</p>
          </div>
        </div>

        {/* Lista de Factores */}
        <div className="space-y-4">
          {factores.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <motion.div
                key={factor.nombre}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`${factor.bgColor} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-gradient-to-br ${factor.color} rounded-xl shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{factor.nombre}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`${getImpactoColor(factor.impacto)} text-white text-xs font-bold rounded-full px-2 py-0.5`}>
                          {factor.impacto}
                        </div>
                        <span className="text-xs text-gray-600">{factor.valor}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.valor}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${factor.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30"></div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resumen */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
          <p className="text-xs text-orange-700 font-medium">
            <span className="font-bold">⚠️ Atención:</span> La calidad del sueño muestra un impacto crítico. Se recomienda intervención inmediata.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisFactores;
