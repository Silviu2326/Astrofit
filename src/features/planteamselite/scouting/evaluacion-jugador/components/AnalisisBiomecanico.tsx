import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Circle, CheckCircle2 } from 'lucide-react';

const AnalisisBiomecanico: React.FC = () => {
  const metricas = [
    { nombre: 'Eficiencia', valor: 89, color: 'from-blue-500 to-cyan-600' },
    { nombre: 'Técnica', valor: 92, color: 'from-purple-500 to-pink-600' },
    { nombre: 'Balance', valor: 86, color: 'from-green-500 to-emerald-600' },
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
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Análisis Biomecánico</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Análisis automático de técnica y eficiencia de movimientos
        </p>

        {/* Medidores circulares */}
        <div className="space-y-4 mb-6">
          {metricas.map((metrica, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${metrica.color} flex items-center justify-center relative`}>
                  <span className="text-xs font-bold text-white">{metrica.valor}</span>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ delay: index * 0.2, duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-white opacity-30"
                  ></motion.div>
                </div>
                <span className="text-sm font-semibold text-gray-700">{metrica.nombre}</span>
              </div>
              <div className="w-24">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metrica.valor}%` }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${metrica.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Evaluación</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-bold text-cyan-700">Óptimo</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisBiomecanico;
