import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertTriangle, Bell } from 'lucide-react';

const AlertasRendimiento: React.FC = () => {
  const alertas = [
    {
      tipo: 'success',
      mensaje: 'Equipo A superó objetivos',
      estado: 'Activo',
      icon: CheckCircle,
      badge: 'bg-green-500'
    },
    {
      tipo: 'warning',
      mensaje: 'Carga elevada en Equipo B',
      estado: 'Descanso',
      icon: AlertTriangle,
      badge: 'bg-orange-500'
    },
    {
      tipo: 'info',
      mensaje: 'Nueva competición próxima',
      estado: 'Competición',
      icon: AlertCircle,
      badge: 'bg-blue-500'
    },
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
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
            <Bell className="w-5 h-5 text-white" />
          </div>
          Alertas de Rendimiento
        </h3>

        <div className="space-y-3">
          {alertas.map((alerta, index) => {
            const Icon = alerta.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 border border-transparent hover:border-orange-100"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${alerta.badge} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{alerta.mensaje}</p>
                  <div className="mt-1">
                    <span className={`inline-block px-3 py-1 ${alerta.badge} text-white text-xs font-bold rounded-full`}>
                      {alerta.estado}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AlertasRendimiento;
