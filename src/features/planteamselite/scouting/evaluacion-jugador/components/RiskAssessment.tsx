import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const RiskAssessment: React.FC = () => {
  const riesgos = [
    { categoria: 'Lesión Muscular', nivel: 'Bajo', porcentaje: 15, color: 'green' },
    { categoria: 'Lesión Articular', nivel: 'Medio', porcentaje: 35, color: 'yellow' },
    { categoria: 'Fatiga', nivel: 'Bajo', porcentaje: 20, color: 'green' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-200' };
      case 'yellow':
        return { bg: 'bg-yellow-500', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'red':
        return { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-200' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Risk Assessment</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Probabilidad de lesiones futuras y análisis de riesgo
        </p>

        {/* Lista de riesgos */}
        <div className="space-y-3">
          {riesgos.map((riesgo, index) => {
            const colors = getColorClasses(riesgo.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className={`bg-gradient-to-r from-gray-50 to-${riesgo.color}-50 rounded-xl p-3 border ${colors.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{riesgo.categoria}</span>
                  <div className={`px-3 py-1 ${colors.bg} text-white text-xs font-bold rounded-full`}>
                    {riesgo.nivel}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className={`w-4 h-4 ${colors.text}`} />
                  <span className={`text-xs font-bold ${colors.text}`}>{riesgo.porcentaje}% probabilidad</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Estado general */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Estado General</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-green-700">Óptimo</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskAssessment;
