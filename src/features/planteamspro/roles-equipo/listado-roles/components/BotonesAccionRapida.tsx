import React from 'react';
import { motion } from 'framer-motion';
import { Zap, UserPlus, ShieldCheck, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const BotonesAccionRapida: React.FC = () => {
  const acciones = [
    { icon: UserPlus, label: 'Agregar Miembro', color: 'from-blue-500 to-indigo-600' },
    { icon: ShieldCheck, label: 'Asignar Rol', color: 'from-purple-500 to-pink-600' },
    { icon: ArrowUpCircle, label: 'Promover', color: 'from-green-500 to-emerald-600' },
    { icon: ArrowDownCircle, label: 'Reasignar', color: 'from-orange-500 to-red-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl backdrop-blur-sm shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Acciones Rápidas</h2>
        </div>

        {/* Botones */}
        <div className="grid grid-cols-2 gap-3">
          {acciones.map((accion, index) => {
            const Icon = accion.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden bg-gradient-to-br ${accion.color} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 text-white group`}
              >
                {/* Efecto hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-bold text-center">{accion.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default BotonesAccionRapida;
