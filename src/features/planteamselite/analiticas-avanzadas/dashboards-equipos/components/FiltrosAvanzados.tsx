import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, Users as UsersIcon, Activity } from 'lucide-react';

const FiltrosAvanzados: React.FC = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');

  const filtros = [
    { id: 'todos', label: 'Todos', icon: UsersIcon },
    { id: 'activos', label: 'Activos', icon: Activity },
    { id: 'fecha', label: 'Por Fecha', icon: Calendar },
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
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
            <Filter className="w-5 h-5 text-white" />
          </div>
          Filtros Avanzados
        </h3>

        <div className="space-y-3">
          {filtros.map((filtro, index) => {
            const Icon = filtro.icon;
            const isActive = filtroActivo === filtro.id;

            return (
              <motion.button
                key={filtro.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFiltroActivo(filtro.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 border-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 border-teal-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br from-teal-500 to-cyan-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
                </div>
                <span className={`font-semibold ${isActive ? 'text-white' : 'text-gray-700'}`}>
                  {filtro.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Badge de filtro activo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-full border border-teal-200 text-center"
        >
          <span className="text-sm font-medium text-gray-700">Filtro activo: </span>
          <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
            {filtros.find(f => f.id === filtroActivo)?.label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FiltrosAvanzados;
