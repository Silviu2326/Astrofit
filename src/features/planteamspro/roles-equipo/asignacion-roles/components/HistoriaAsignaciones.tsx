import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, Star, Calendar, User } from 'lucide-react';

const HistoriaAsignaciones: React.FC = () => {
  const [history] = useState([
    {
      id: 1,
      date: '15 Dic 2023',
      person: 'Ana López',
      role: 'Capitán',
      action: 'Asignación',
      success: true,
      rating: 5,
    },
    {
      id: 2,
      date: '10 Dic 2023',
      person: 'Carlos Ruiz',
      role: 'Entrenador',
      action: 'Rotación',
      success: true,
      rating: 4,
    },
    {
      id: 3,
      date: '5 Dic 2023',
      person: 'Juan Pérez',
      role: 'Capitán',
      action: 'Remoción',
      success: false,
      rating: 2,
    },
    {
      id: 4,
      date: '1 Dic 2023',
      person: 'María García',
      role: 'Fisioterapeuta',
      action: 'Asignación',
      success: true,
      rating: 5,
    },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Historia de Asignaciones</h3>
            <p className="text-sm text-blue-100">Registro completo de cambios de roles</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6 relative z-10">
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border-2 border-transparent hover:border-indigo-100 hover:shadow-md group"
            >
              {/* Línea vertical del timeline */}
              {index < history.length - 1 && (
                <div className="absolute left-[29px] top-[60px] w-0.5 h-full bg-gradient-to-b from-indigo-200 to-transparent"></div>
              )}

              {/* Avatar/Icono */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                item.success
                  ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                  : 'bg-gradient-to-br from-red-400 to-orange-600'
              }`}>
                <User className="w-6 h-6" />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.person}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.action === 'Asignación'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : item.action === 'Rotación'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      }`}>
                        {item.action}
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>

                {/* Fecha y estado */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs font-medium">{item.date}</span>
                  </div>
                  {item.success && (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-semibold">Exitosa</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer con estadísticas */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Tasa de Éxito</p>
              <p className="text-xs text-gray-600 mt-1">3 de 4 asignaciones exitosas</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                75%
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mt-3 w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoriaAsignaciones;
