import React from 'react';
import { motion } from 'framer-motion';
import { Network, User, Shield } from 'lucide-react';

const JerarquiaVisual: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Network className="w-6 h-6" />
          </div>
          Jerarquía Visual
        </h2>
      </div>

      {/* Body con organigrama simplificado */}
      <div className="p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Nivel 1: Entrenador Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="w-full max-w-xs"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold text-sm">Entrenador Principal</p>
              <p className="text-xs opacity-80">Pedro Martínez</p>
            </div>
          </motion.div>

          {/* Línea de conexión */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent"></div>

          {/* Nivel 2: Staff */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="grid grid-cols-2 gap-3 w-full"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg text-center">
              <User className="w-6 h-6 mx-auto mb-1" />
              <p className="font-bold text-xs">Asistente</p>
              <p className="text-xs opacity-80">Laura R.</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg text-center">
              <User className="w-6 h-6 mx-auto mb-1" />
              <p className="font-bold text-xs">Fisioterapeuta</p>
              <p className="text-xs opacity-80">Miguel F.</p>
            </div>
          </motion.div>

          {/* Línea de conexión */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent"></div>

          {/* Nivel 3: Atletas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="w-5 h-5 text-purple-600" />
              <p className="font-bold text-sm text-purple-700">Atletas</p>
            </div>
            <p className="text-xs text-gray-600">20 miembros activos</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default JerarquiaVisual;
