import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Clock, AlertCircle } from 'lucide-react';

const ModeloFatiga: React.FC = () => {
  const nivelFatiga = 68; // Porcentaje de fatiga
  const tiempoRecuperacion = '24-36 horas';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Battery className="w-6 h-6" />
          </div>
          Modelo de Fatiga Acumulada
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Modelo de fatiga acumulada y <span className="font-bold text-orange-700 px-2 py-1 bg-orange-50 rounded-lg">predicción del tiempo de recuperación</span>.
        </p>

        {/* Medidor de fatiga */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 mb-6 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Nivel de Fatiga Actual</h3>
            <div className="px-4 py-2 bg-orange-500 rounded-full">
              <span className="text-sm font-bold text-white">{nivelFatiga}%</span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${nivelFatiga}%` }}
              transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>
          <p className="text-xs text-gray-600 text-right">Moderado-Alto</p>
        </div>

        {/* Info de recuperación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Tiempo de Recuperación</p>
                <p className="text-xl font-bold text-gray-900">{tiempoRecuperacion}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-3"
          >
            <div className="p-2 bg-amber-500 rounded-xl">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-1">Recomendación</p>
              <p className="text-sm text-gray-700">Sesión de recuperación activa recomendada. Evitar cargas intensas en las próximas 24h.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModeloFatiga;
