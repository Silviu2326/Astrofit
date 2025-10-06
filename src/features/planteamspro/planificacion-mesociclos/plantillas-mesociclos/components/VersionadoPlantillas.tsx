import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Clock, Archive } from 'lucide-react';

const VersionadoPlantillas: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <GitBranch className="w-6 h-6" />
          </div>
          Versionado de Plantillas
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Gestiona el historial de cambios y versiones de tus plantillas
        </p>

        {/* Version History */}
        <div className="space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-4 border border-purple-200"
          >
            <div className="p-2 bg-purple-500 rounded-xl">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-purple-900">Versión 2.1</h4>
              <p className="text-sm text-purple-700">Última modificación hace 2 días</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-200"
          >
            <div className="p-2 bg-violet-500 rounded-xl">
              <Archive className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-violet-900">Historial completo</h4>
              <p className="text-sm text-violet-700">12 versiones archivadas</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VersionadoPlantillas;
