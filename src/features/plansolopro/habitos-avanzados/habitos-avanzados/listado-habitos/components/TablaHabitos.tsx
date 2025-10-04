import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Circle, Flame, TrendingUp, Award, Clock,
  MoreVertical, Edit, Trash2, BarChart3
} from 'lucide-react';
import { Habito, getHabitos } from '../listadoHabitosApi';

const TablaHabitos: React.FC = () => {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [habitosSeleccionados, setHabitosSeleccionados] = useState<Set<string>>(new Set());

  useEffect(() => {
    getHabitos().then(setHabitos);
  }, []);

  const toggleHabito = (id: string) => {
    const habito = habitos.find(h => h.id === id);
    if (habito) {
      setHabitos(habitos.map(h =>
        h.id === id ? { ...h, completadoHoy: !h.completadoHoy } : h
      ));
    }
  };

  const getColorClasses = (color: string | undefined) => {
    const colorMap: Record<string, { gradient: string; bg: string; text: string }> = {
      blue: { gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-700' },
      green: { gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50', text: 'text-green-700' },
      purple: { gradient: 'from-purple-500 to-pink-600', bg: 'bg-purple-50', text: 'text-purple-700' },
      teal: { gradient: 'from-teal-500 to-cyan-600', bg: 'bg-teal-50', text: 'text-teal-700' },
      indigo: { gradient: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50', text: 'text-indigo-700' },
      pink: { gradient: 'from-pink-500 to-rose-600', bg: 'bg-pink-50', text: 'text-pink-700' },
      orange: { gradient: 'from-orange-500 to-red-600', bg: 'bg-orange-50', text: 'text-orange-700' },
      cyan: { gradient: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-50', text: 'text-cyan-700' },
    };
    return colorMap[color || 'blue'] || colorMap.blue;
  };

  return (
    <div className="space-y-4">
      {habitos.map((habito, index) => {
        const colorClasses = getColorClasses(habito.color);
        const isCompletado = habito.completadoHoy;

        return (
          <motion.div
            key={habito.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.01, y: -4 }}
            className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group ${
              habito.estado === 'inactivo' ? 'opacity-60' : ''
            }`}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${colorClasses.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10 flex items-center gap-6">
              {/* Checkbox Interactivo */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleHabito(habito.id)}
                disabled={habito.estado === 'inactivo'}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isCompletado
                    ? `bg-gradient-to-br ${colorClasses.gradient} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {isCompletado ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <Circle className="w-7 h-7" />
                )}
              </motion.button>

              {/* Icono y Nombre */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{habito.icono || '📝'}</span>
                  <div>
                    <h3 className={`text-lg font-bold ${isCompletado ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {habito.nombre}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-3 py-1 ${colorClasses.bg} ${colorClasses.text} text-xs font-bold rounded-full`}>
                        {habito.tipo}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                        <Clock className="w-3 h-3" />
                        {habito.frecuencia}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Racha */}
              <div className="flex-shrink-0 text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className={`w-5 h-5 ${(habito.racha || 0) > 0 ? 'text-orange-500' : 'text-gray-300'}`} />
                  <span className="text-2xl font-bold text-gray-900">{habito.racha || 0}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">días</p>
              </div>

              {/* Progreso Semanal */}
              <div className="flex-shrink-0 w-40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600 uppercase">Progreso</span>
                  <span className="text-sm font-bold text-gray-900">{habito.cumplimientoSemanal}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${habito.cumplimientoSemanal}%` }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${colorClasses.gradient} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              {/* Badges de Logro */}
              {(habito.racha || 0) >= 7 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="flex-shrink-0"
                >
                  {(habito.racha || 0) >= 30 ? (
                    <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  ) : (habito.racha || 0) >= 14 ? (
                    <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Acciones */}
              <div className="flex-shrink-0 relative group/menu">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>

                {/* Dropdown Menu (placeholder) */}
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-20 min-w-[150px]">
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    Ver detalles
                  </button>
                  <button className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Empty State */}
      {habitos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay hábitos registrados</h3>
          <p className="text-gray-600 mb-6">Comienza a construir tus rutinas hoy</p>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300">
            Crear primer hábito
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TablaHabitos;
