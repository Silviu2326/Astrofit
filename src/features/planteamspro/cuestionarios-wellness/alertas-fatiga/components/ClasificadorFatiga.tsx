// src/features/alertas-fatiga/components/ClasificadorFatiga.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, TrendingUp, Zap } from 'lucide-react';

const ClasificadorFatiga: React.FC = () => {
  const tiposFatiga = [
    {
      tipo: 'Aguda',
      descripcion: 'Fatiga temporal por esfuerzo reciente',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-400',
      porcentaje: 35
    },
    {
      tipo: 'Crónica',
      descripcion: 'Fatiga acumulada por sobrecarga prolongada',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-500',
      porcentaje: 55
    },
    {
      tipo: 'Overreaching',
      descripcion: 'Estado de sobreentrenamiento crítico',
      icon: Activity,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-500',
      porcentaje: 10
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Clasificador de Fatiga</h3>
            <p className="text-xs text-gray-600">Análisis por tipo de fatiga</p>
          </div>
        </div>

        {/* Tipos de Fatiga */}
        <div className="space-y-4">
          {tiposFatiga.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.tipo}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`bg-gradient-to-r ${item.bgColor} rounded-2xl p-4 border-l-4 ${item.borderColor} shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-gradient-to-br ${item.color} rounded-xl shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{item.tipo}</h4>
                      <p className="text-xs text-gray-600">{item.descripcion}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs font-bold rounded-full shadow-md`}>
                    {item.porcentaje}%
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.porcentaje}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-700 font-medium">
            <span className="font-bold">💡 Clasificación inteligente:</span> El sistema analiza patrones de entrenamiento, recuperación y biomarcadores para clasificar la fatiga.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ClasificadorFatiga;
