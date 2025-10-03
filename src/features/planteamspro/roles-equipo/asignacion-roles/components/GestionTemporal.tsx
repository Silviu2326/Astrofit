import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Play, Pause } from 'lucide-react';

const GestionTemporal: React.FC = () => {
  const [temporalRoles] = useState([
    { id: 1, person: 'Diego Torres', role: 'Capitán', startDate: '2024-01-15', endDate: '2024-06-30', active: true },
    { id: 2, person: 'Sofia Ramírez', role: 'Entrenador', startDate: '2024-02-01', endDate: '2024-05-15', active: true },
    { id: 3, person: 'Pedro Gómez', role: 'Fisioterapeuta', startDate: '2024-01-10', endDate: '2024-03-20', active: false },
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
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* Icono y título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Temporal</p>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
              Roles Temporales
            </h3>
          </div>
        </div>

        {/* Lista de roles temporales */}
        <div className="space-y-3">
          {temporalRoles.map((tempRole, index) => (
            <motion.div
              key={tempRole.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                tempRole.active
                  ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300'
                  : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{tempRole.person}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      tempRole.active
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {tempRole.role}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${
                  tempRole.active ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {tempRole.active ? (
                    <Play className="w-4 h-4 text-green-600" />
                  ) : (
                    <Pause className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>

              {/* Fechas */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span className="font-medium">Inicio:</span>
                  <span>{tempRole.startDate}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span className="font-medium">Fin:</span>
                  <span>{tempRole.endDate}</span>
                </div>
              </div>

              {/* Barra de progreso temporal */}
              {tempRole.active && (
                <div className="mt-3 w-full h-1.5 bg-cyan-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  ></motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 p-3 rounded-xl bg-gradient-to-r from-cyan-50 to-white border border-cyan-100">
          <p className="text-xs font-semibold text-cyan-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Gestión automática de vigencia
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GestionTemporal;
