import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ArrowRightLeft, Zap, CheckCircle2 } from 'lucide-react';

const RotacionAutomatica: React.FC = () => {
  const [rotationStatus] = useState({
    enabled: true,
    nextRotation: '15 Feb 2024',
    frequency: 'Mensual',
    lastRotation: '15 Ene 2024',
  });

  const [upcomingRotations] = useState([
    { id: 1, from: 'Juan Pérez', to: 'Ana López', role: 'Capitán', date: '15 Feb 2024' },
    { id: 2, from: 'María García', to: 'Carlos Ruiz', role: 'Entrenador', date: '20 Feb 2024' },
  ]);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-teal-500 to-green-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* Icono y título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <RotateCw className="w-7 h-7 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Automático</p>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-green-600">
              Rotación
            </h3>
          </div>
        </div>

        {/* Estado de rotación */}
        <div className={`p-4 rounded-2xl mb-4 border-2 ${
          rotationStatus.enabled
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {rotationStatus.enabled ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Zap className="w-5 h-5 text-gray-500" />
              )}
              <span className={`font-bold text-sm ${
                rotationStatus.enabled ? 'text-green-700' : 'text-gray-600'
              }`}>
                {rotationStatus.enabled ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
              {rotationStatus.frequency}
            </span>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p><span className="font-semibold">Última:</span> {rotationStatus.lastRotation}</p>
            <p><span className="font-semibold">Próxima:</span> {rotationStatus.nextRotation}</p>
          </div>
        </div>

        {/* Próximas rotaciones */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Próximas Rotaciones</p>
          {upcomingRotations.map((rotation, index) => (
            <motion.div
              key={rotation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-teal-100 hover:border-teal-200 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-800">{rotation.from}</span>
                    <ArrowRightLeft className="w-3 h-3 text-teal-500" />
                    <span className="text-xs font-semibold text-gray-800">{rotation.to}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-bold rounded-full">
                      {rotation.role}
                    </span>
                    <span className="text-xs text-gray-500">{rotation.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barra decorativa */}
        <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-teal-500 to-green-600 rounded-full"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RotacionAutomatica;
