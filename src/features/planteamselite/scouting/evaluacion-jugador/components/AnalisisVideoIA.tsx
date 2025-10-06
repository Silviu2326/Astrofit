import React from 'react';
import { motion } from 'framer-motion';
import { Video, Activity, Target, TrendingUp } from 'lucide-react';

const AnalisisVideoIA: React.FC = () => {
  const metricas = [
    { label: 'Precisión', valor: 92, icono: Target, color: 'from-blue-500 to-indigo-600' },
    { label: 'Actividad', valor: 87, icono: Activity, color: 'from-green-500 to-emerald-600' },
    { label: 'Progreso', valor: 94, icono: TrendingUp, color: 'from-purple-500 to-pink-600' },
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
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Video className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Análisis de Video con IA</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Tracking automático de movimientos y decisiones mediante inteligencia artificial
        </p>

        {/* Métricas */}
        <div className="space-y-3">
          {metricas.map((metrica, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metrica.icono className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-700">{metrica.label}</span>
                </div>
                <span className="text-sm font-bold text-indigo-600">{metrica.valor}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metrica.valor}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${metrica.color} rounded-full`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Badge de estado */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Estado</span>
            <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              Activo
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisVideoIA;
