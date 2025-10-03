import React from 'react';
import { motion } from 'framer-motion';
import { Radio, MapPin, Activity, Users } from 'lucide-react';

const CentroComando: React.FC = () => {
  const sedes = [
    { nombre: 'Estadio Central', estado: 'activo', asistencia: 45000, color: 'green' },
    { nombre: 'Arena Norte', estado: 'activo', asistencia: 32000, color: 'green' },
    { nombre: 'Complejo Sur', estado: 'preparando', asistencia: 0, color: 'yellow' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Centro de Comando Central</h2>
        </div>
        <p className="text-blue-100 mt-2 ml-11">Coordinación en tiempo real de las sedes</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sedes.map((sede, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-colors duration-300 relative overflow-hidden"
            >
              <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${sede.color}-200 rounded-full blur-2xl opacity-30`}></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-gray-900">{sede.nombre}</h3>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Activity className={`w-4 h-4 text-${sede.color}-600`} />
                  <span className={`text-sm font-semibold text-${sede.color}-600 capitalize`}>{sede.estado}</span>
                </div>

                {sede.asistencia > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-medium">{sede.asistencia.toLocaleString()} asistentes</span>
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

export default CentroComando;
