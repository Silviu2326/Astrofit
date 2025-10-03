import React from 'react';
import { motion } from 'framer-motion';
import { History, ArrowRight, Clock } from 'lucide-react';

const HistorialCambios: React.FC = () => {
  const cambios = [
    { usuario: 'Juan Pérez', cambio: 'Atleta → Capitán', fecha: 'Hace 2 días', justificacion: 'Liderazgo destacado' },
    { usuario: 'María García', cambio: 'Promovida', fecha: 'Hace 5 días', justificacion: 'Buen desempeño' },
    { usuario: 'Carlos Sánchez', cambio: 'Asignado como Asistente', fecha: 'Hace 1 semana', justificacion: 'Nueva incorporación' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <History className="w-6 h-6" />
          </div>
          Historial de Cambios
        </h2>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-4 relative">
          {/* Línea vertical del timeline */}
          <div className="absolute left-[17px] top-0 w-0.5 h-full bg-gradient-to-b from-blue-200 to-transparent"></div>

          {cambios.map((cambio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 relative"
            >
              {/* Avatar/Indicador */}
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg z-10">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <p className="text-sm font-bold text-gray-900 mb-1">{cambio.usuario}</p>
                <p className="text-sm text-gray-700 mb-2">{cambio.cambio}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{cambio.fecha}</span>
                </div>
                {cambio.justificacion && (
                  <div className="mt-2 px-3 py-1 bg-white/50 rounded-lg">
                    <p className="text-xs text-gray-600 italic">"{cambio.justificacion}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HistorialCambios;
