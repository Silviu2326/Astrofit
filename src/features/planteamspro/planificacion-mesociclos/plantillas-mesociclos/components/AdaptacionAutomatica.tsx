import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Settings, RefreshCw } from 'lucide-react';

const AdaptacionAutomatica: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Zap className="w-6 h-6" />
          </div>
          Adaptación Automática de Plantillas
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Ajusta plantillas automáticamente según las características de tu equipo
        </p>

        {/* Features */}
        <div className="space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border border-orange-200"
          >
            <div className="p-2 bg-orange-500 rounded-xl">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-orange-900">Ajuste inteligente</h4>
              <p className="text-sm text-orange-700">Según nivel y condición física</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 border border-yellow-200"
          >
            <div className="p-2 bg-yellow-500 rounded-xl">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-yellow-900">Actualización dinámica</h4>
              <p className="text-sm text-yellow-700">Adaptación en tiempo real</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdaptacionAutomatica;
