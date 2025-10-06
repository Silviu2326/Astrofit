import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TarjetasComparativas: React.FC = () => {
  const equipos = [
    { nombre: 'Equipo A', rendimiento: 92, cambio: '+8%', positivo: true },
    { nombre: 'Equipo B', rendimiento: 78, cambio: '-3%', positivo: false },
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
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
            <Users className="w-5 h-5 text-white" />
          </div>
          Tarjetas Comparativas
        </h3>

        <div className="space-y-4">
          {equipos.map((equipo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-800">{equipo.nombre}</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${equipo.positivo ? 'bg-green-100' : 'bg-red-100'}`}>
                  {equipo.positivo ? (
                    <ArrowUpRight className={`w-4 h-4 ${equipo.positivo ? 'text-green-600' : 'text-red-600'}`} />
                  ) : (
                    <ArrowDownRight className={`w-4 h-4 ${equipo.positivo ? 'text-green-600' : 'text-red-600'}`} />
                  )}
                  <span className={`text-xs font-bold ${equipo.positivo ? 'text-green-600' : 'text-red-600'}`}>
                    {equipo.cambio}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${equipo.rendimiento}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  className={`h-full rounded-full ${equipo.positivo ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-red-600'}`}
                ></motion.div>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Rendimiento: <span className="font-bold text-gray-800">{equipo.rendimiento}%</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TarjetasComparativas;
