import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Edit,
  Eye,
  TrendingUp,
  Calendar,
  Target,
  Activity,
  Flame,
  Scale,
  Clock
} from 'lucide-react';
import { Dieta } from '../dietasListadoApi';

interface DietaCardProps {
  dieta: Dieta;
}

export const DietaCard: React.FC<DietaCardProps> = ({ dieta }) => {
  const navigate = useNavigate();
  const getEstadoBadge = (estado: string) => {
    const badges = {
      activo: 'bg-green-50 text-green-700 border-green-200',
      'en pausa': 'bg-orange-50 text-orange-700 border-orange-200',
      completado: 'bg-blue-50 text-blue-700 border-blue-200',
      pausado: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return badges[estado as keyof typeof badges] || badges.activo;
  };

  const caloriasPorcentaje = Math.round((dieta.calorias.consumidas / dieta.calorias.objetivo) * 100);
  const proteinasPorcentaje = Math.round((dieta.macros.proteinas.actual / dieta.macros.proteinas.objetivo) * 100);
  const carbohidratosPorcentaje = Math.round((dieta.macros.carbohidratos.actual / dieta.macros.carbohidratos.objetivo) * 100);
  const grasasPorcentaje = Math.round((dieta.macros.grasas.actual / dieta.macros.grasas.objetivo) * 100);
  const perdidaPeso = dieta.pesoInicial - dieta.pesoActual;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group relative"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-lime-200 to-green-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con avatar y estado */}
        <div className="bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar grande */}
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl border-2 border-white/30 shadow-lg">
                {dieta.cliente.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{dieta.cliente.nombre}</h3>
                <p className="text-sm text-green-100">{dieta.plan}</p>
              </div>
            </div>

            {/* Badge de estado */}
            <div className={`px-3 py-1 rounded-full border text-xs font-bold ${getEstadoBadge(dieta.estado)} backdrop-blur-sm`}>
              {dieta.estado.charAt(0).toUpperCase() + dieta.estado.slice(1)}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Objetivo */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl border border-lime-200">
            <Target className="w-5 h-5 text-lime-600" />
            <span className="text-sm font-bold text-lime-700">{dieta.objetivo}</span>
          </div>

          {/* Calorías objetivo vs consumidas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-700">Calorías del día</span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {dieta.calorias.consumidas} / {dieta.calorias.objetivo} kcal
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(caloriasPorcentaje, 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full rounded-full ${
                  caloriasPorcentaje > 105
                    ? 'bg-gradient-to-r from-red-400 to-red-500'
                    : caloriasPorcentaje > 95
                    ? 'bg-gradient-to-r from-green-400 to-green-500'
                    : 'bg-gradient-to-r from-lime-400 to-green-400'
                }`}
              >
                <div className="h-full bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
          </div>

          {/* Macros del día - Mini barras */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Macronutrientes Hoy</h4>

            {/* Proteínas */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-600">Proteínas</span>
                <span className="text-xs font-bold text-gray-900">
                  {dieta.macros.proteinas.actual}g / {dieta.macros.proteinas.objetivo}g
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(proteinasPorcentaje, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                ></motion.div>
              </div>
            </div>

            {/* Carbohidratos */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-600">Carbohidratos</span>
                <span className="text-xs font-bold text-gray-900">
                  {dieta.macros.carbohidratos.actual}g / {dieta.macros.carbohidratos.objetivo}g
                </span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(carbohidratosPorcentaje, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                ></motion.div>
              </div>
            </div>

            {/* Grasas */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-600">Grasas</span>
                <span className="text-xs font-bold text-gray-900">
                  {dieta.macros.grasas.actual}g / {dieta.macros.grasas.objetivo}g
                </span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(grasasPorcentaje, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>

          {/* Progreso de duración */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-semibold text-gray-700">Progreso del plan</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{dieta.progreso}%</span>
            </div>
            <div className="w-full bg-indigo-100 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dieta.progreso}%` }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full relative"
              >
                <div className="h-full bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Día {Math.round((dieta.duracion * dieta.progreso) / 100)} de {dieta.duracion}
            </p>
          </div>

          {/* Adherencia semanal */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">Adherencia</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-teal-700">{dieta.adherencia}%</span>
              {dieta.adherencia >= 90 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : dieta.adherencia >= 75 ? (
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              ) : (
                <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />
              )}
            </div>
          </div>

          {/* Cambio de peso */}
          {perdidaPeso !== 0 && (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Cambio de peso</span>
              </div>
              <span className="text-lg font-bold text-green-700">
                {perdidaPeso > 0 ? '-' : '+'}{Math.abs(perdidaPeso).toFixed(1)} kg
              </span>
            </div>
          )}

          {/* Última actualización */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            Actualizado: {new Date(dieta.ultimaActualizacion).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short'
            })}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/dashboard/nutrition/dietas/editar/${dieta.id}`)}
              className="flex-1 px-4 py-3 bg-gradient-to-br from-lime-500 to-green-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ver detalles
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/dashboard/nutrition/dietas/editar/${dieta.id}`)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
