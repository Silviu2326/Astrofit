import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

const SistemaNotificaciones: React.FC = () => {
  const notificaciones = [
    { tipo: 'success', icono: CheckCircle, mensaje: 'Juan Pérez promovido a Capitán', color: 'from-green-500 to-emerald-600', bgColor: 'from-green-50 to-emerald-50' },
    { tipo: 'warning', icono: AlertCircle, mensaje: 'Rol temporal de María expira mañana', color: 'from-orange-500 to-red-600', bgColor: 'from-orange-50 to-red-50' },
    { tipo: 'info', icono: Info, mensaje: 'Nueva actualización disponible', color: 'from-blue-500 to-indigo-600', bgColor: 'from-blue-50 to-indigo-50' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Bell className="w-6 h-6" />
          </div>
          Notificaciones
          <span className="ml-auto px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm">
            {notificaciones.length}
          </span>
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-3">
        {notificaciones.map((notif, index) => {
          const Icono = notif.icono;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${notif.bgColor} border border-white/50 cursor-pointer group`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${notif.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icono className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700 flex-1">{notif.mensaje}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SistemaNotificaciones;
