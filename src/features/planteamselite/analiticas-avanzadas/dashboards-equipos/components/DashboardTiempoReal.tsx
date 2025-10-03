import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Radio } from 'lucide-react';

const DashboardTiempoReal: React.FC = () => {
  const datosEnVivo = [
    { metrica: 'Frecuencia Cardíaca', valor: '142 bpm', tendencia: '+5%' },
    { metrica: 'Distancia Recorrida', valor: '8.4 km', tendencia: '+12%' },
    { metrica: 'Velocidad Promedio', valor: '18.2 km/h', tendencia: '+3%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Dashboard en Tiempo Real
          </h3>

          {/* Indicador de transmisión en vivo */}
          <div className="flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full">
            <Radio className="w-3 h-3 text-white animate-pulse" />
            <span className="text-xs font-bold text-white">EN VIVO</span>
          </div>
        </div>

        <div className="space-y-4">
          {datosEnVivo.map((dato, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">{dato.metrica}</span>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg">
                  <Zap className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-bold text-green-600">{dato.tendencia}</span>
                </div>
              </div>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {dato.valor}
              </p>

              {/* Progress bar animada */}
              <div className="mt-3 w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardTiempoReal;
