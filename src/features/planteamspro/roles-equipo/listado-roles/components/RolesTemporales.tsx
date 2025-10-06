import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, User } from 'lucide-react';

const RolesTemporales: React.FC = () => {
  const rolesTemp = [
    { nombre: 'María García', rol: 'Capitán Temporal', inicio: '15 Oct', fin: '22 Oct', progreso: 60 },
    { nombre: 'Carlos Sánchez', rol: 'Asistente Temporal', inicio: '18 Oct', fin: '25 Oct', progreso: 40 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Clock className="w-6 h-6" />
          </div>
          Roles Temporales
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {rolesTemp.map((rol, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{rol.nombre}</p>
                <p className="text-xs text-purple-700 font-medium">{rol.rol}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <Calendar className="w-3 h-3" />
              <span>{rol.inicio} - {rol.fin}</span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rol.progreso}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RolesTemporales;
