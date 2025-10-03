import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

const AnalisisCarga: React.FC = () => {
  const [workloadData] = useState([
    { person: 'Juan Pérez', roles: 3, workload: 85, status: 'high' },
    { person: 'Ana López', roles: 2, workload: 65, status: 'medium' },
    { person: 'Carlos Ruiz', roles: 1, workload: 40, status: 'low' },
    { person: 'María García', roles: 2, workload: 55, status: 'medium' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return { bg: 'from-red-500 to-orange-500', light: 'from-red-50 to-orange-50', border: 'border-red-300', text: 'text-red-700' };
      case 'medium':
        return { bg: 'from-yellow-500 to-amber-500', light: 'from-yellow-50 to-amber-50', border: 'border-yellow-300', text: 'text-yellow-700' };
      case 'low':
        return { bg: 'from-green-500 to-emerald-500', light: 'from-green-50 to-emerald-50', border: 'border-green-300', text: 'text-green-700' };
      default:
        return { bg: 'from-gray-500 to-slate-500', light: 'from-gray-50 to-slate-50', border: 'border-gray-300', text: 'text-gray-700' };
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* Icono y título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Análisis</p>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Carga de Trabajo
            </h3>
          </div>
        </div>

        {/* Lista de carga */}
        <div className="space-y-3">
          {workloadData.map((data, index) => {
            const colors = getStatusColor(data.status);
            return (
              <motion.div
                key={data.person}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl bg-gradient-to-r ${colors.light} border-2 ${colors.border} transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{data.person}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">
                        <span className="font-semibold">{data.roles}</span> roles
                      </span>
                      {data.status === 'high' && (
                        <AlertCircle className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${colors.bg} shadow-sm`}>
                    <span className="text-sm font-bold text-white">{data.workload}%</span>
                  </div>
                </div>

                {/* Barra de progreso con gradiente */}
                <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.workload}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${colors.bg} rounded-full relative`}
                  >
                    {/* Efecto de pulso interno */}
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer con estadísticas */}
        <div className="mt-6 flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-white border border-indigo-100">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-semibold text-indigo-700">Promedio: 61% de carga</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisCarga;
