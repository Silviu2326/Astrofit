import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingDown, ArrowRight } from 'lucide-react';

const EmbudoVisual: React.FC = () => {
  const stages = [
    {
      name: 'Lead',
      count: 120,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50',
      textColor: 'text-emerald-700',
      width: '100%',
    },
    {
      name: 'Cliente nuevo',
      count: 85,
      color: 'from-green-500 to-lime-600',
      bgColor: 'from-green-50 to-lime-50',
      textColor: 'text-green-700',
      width: '85%',
    },
    {
      name: 'Activo',
      count: 60,
      color: 'from-lime-500 to-emerald-600',
      bgColor: 'from-lime-50 to-emerald-50',
      textColor: 'text-lime-700',
      width: '70%',
    },
    {
      name: 'Fiel',
      count: 42,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      textColor: 'text-emerald-700',
      width: '55%',
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <TrendingDown className="w-6 h-6" />
          </div>
          Timeline Visual del Customer Journey
        </h3>
        <p className="text-green-100 text-sm mt-2 relative z-10">
          Visualización del flujo completo de clientes por cada etapa
        </p>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="space-y-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Stage container */}
              <div
                className="relative group"
                style={{ width: stage.width }}
              >
                {/* Decoración de fondo con gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stage.bgColor} rounded-2xl opacity-50`}></div>

                <div className={`relative bg-gradient-to-r ${stage.bgColor} rounded-2xl p-6 border-2 border-white hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icono */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-lg`}>
                        <Users className="w-7 h-7" />
                      </div>

                      {/* Info */}
                      <div>
                        <h4 className={`text-lg font-bold ${stage.textColor}`}>
                          {stage.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium">
                          Etapa {index + 1} de {stages.length}
                        </p>
                      </div>
                    </div>

                    {/* Count */}
                    <div className="text-right">
                      <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stage.color}`}>
                        {stage.count}
                      </div>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                        Clientes
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 w-full bg-white/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.count / 120) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${stage.color} rounded-full`}
                    ></motion.div>
                  </div>

                  {/* Conversion rate */}
                  {index > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="p-1 bg-white/80 rounded-lg">
                        <TrendingDown className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-xs font-bold text-gray-600">
                        {Math.round((stage.count / stages[index - 1].count) * 100)}% conversión desde etapa anterior
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow connector */}
              {index < stages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className="flex justify-center my-2"
                >
                  <div className="p-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full">
                    <ArrowRight className="w-5 h-5 text-emerald-600 rotate-90" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-emerald-800">
              Resumen del Journey
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Inicial</p>
              <p className="text-2xl font-bold text-emerald-700">{stages[0].count}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Final</p>
              <p className="text-2xl font-bold text-emerald-700">{stages[stages.length - 1].count}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600 font-semibold mb-2">Tasa de Conversión Total</p>
              <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stages[stages.length - 1].count / stages[0].count) * 100}%` }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
                ></motion.div>
              </div>
              <p className="text-right mt-1 text-sm font-bold text-emerald-700">
                {Math.round((stages[stages.length - 1].count / stages[0].count) * 100)}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmbudoVisual;
