// src/features/alertas-fatiga/components/SeguimientoRecuperacion.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Heart, Battery } from 'lucide-react';

const SeguimientoRecuperacion: React.FC = () => {
  const metricas = [
    {
      nombre: 'Nivel de Energía',
      valorActual: 72,
      valorAnterior: 45,
      tendencia: 'up',
      icon: Battery,
      color: 'from-green-500 to-emerald-500'
    },
    {
      nombre: 'Calidad de Sueño',
      valorActual: 68,
      valorAnterior: 40,
      tendencia: 'up',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      nombre: 'HRV',
      valorActual: 58,
      valorAnterior: 42,
      tendencia: 'up',
      icon: Heart,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const progreso = 65; // Progreso general de recuperación

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Seguimiento de Recuperación</h3>
            <p className="text-xs text-gray-600">Métricas objetivas de progreso</p>
          </div>
        </div>

        {/* Progreso General */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-800">Progreso General</span>
            <span className="text-2xl font-bold text-green-600">{progreso}%</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Métricas */}
        <div className="space-y-3">
          {metricas.map((metrica, index) => {
            const Icon = metrica.icon;
            const mejora = metrica.valorActual - metrica.valorAnterior;
            return (
              <motion.div
                key={metrica.nombre}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-gradient-to-br ${metrica.color} rounded-xl shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{metrica.nombre}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-600">Anterior: {metrica.valorAnterior}%</span>
                        <span className="text-xs text-gray-400">→</span>
                        <span className="text-xs font-bold text-green-600">Actual: {metrica.valorActual}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-bold">+{mejora}%</span>
                    </div>
                  </div>
                </div>

                {/* Mini barra de progreso */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metrica.valorActual}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${metrica.color} rounded-full`}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-700 font-medium">
            <span className="font-bold">📊 Análisis continuo:</span> Las métricas se actualizan diariamente para monitorear la evolución.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SeguimientoRecuperacion;
