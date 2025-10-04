import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Star, Clock } from 'lucide-react';

interface Hito {
  id: string;
  type: 'cumpleanos' | 'aniversario' | 'sesion_completada' | 'meta_alcanzada' | 'transformacion';
  date: string;
  description: string;
  icon?: string;
  color?: string;
  clientName?: string;
  achievement?: string;
}

interface TarjetaHitoProps {
  hito: Hito;
}

const TarjetaHito: React.FC<TarjetaHitoProps> = ({ hito }) => {
  const getGradientAndBadge = (type: Hito['type']) => {
    switch (type) {
      case 'meta_alcanzada':
        return {
          gradient: hito.color || 'from-amber-500 to-yellow-500',
          badge: 'Meta Alcanzada',
          badgeColor: 'bg-amber-100 text-amber-800'
        };
      case 'transformacion':
        return {
          gradient: hito.color || 'from-yellow-500 to-lime-500',
          badge: 'Transformación',
          badgeColor: 'bg-yellow-100 text-yellow-800'
        };
      case 'sesion_completada':
        return {
          gradient: hito.color || 'from-lime-500 to-green-500',
          badge: 'Sesión Completada',
          badgeColor: 'bg-green-100 text-green-800'
        };
      case 'cumpleanos':
        return {
          gradient: hito.color || 'from-pink-500 to-rose-500',
          badge: 'Cumpleaños',
          badgeColor: 'bg-pink-100 text-pink-800'
        };
      case 'aniversario':
        return {
          gradient: hito.color || 'from-purple-500 to-pink-500',
          badge: 'Aniversario',
          badgeColor: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          badge: 'Hito',
          badgeColor: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const { gradient, badge, badgeColor } = getGradientAndBadge(hito.type);
  const icon = hito.icon || '✨';

  // Formatear fecha
  const formattedDate = new Date(hito.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="relative pl-14">
      {/* Punto de timeline con icono */}
      <div className={`absolute left-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-xl z-10 border-4 border-white`}>
        <span className="text-xl">{icon}</span>
      </div>

      {/* Card del hito */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-gray-200 group relative overflow-hidden"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

        {/* Decoración de fondo */}
        <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-2xl`}></div>

        <div className="relative z-10">
          {/* Header con badge y fecha */}
          <div className="flex items-start justify-between mb-3">
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
              {badge}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </div>
          </div>

          {/* Nombre del cliente */}
          {hito.clientName && (
            <h4 className="text-base font-bold text-gray-900 mb-1">
              {hito.clientName}
            </h4>
          )}

          {/* Descripción */}
          <p className="text-sm text-gray-700 mb-2">
            {hito.description}
          </p>

          {/* Logro */}
          {hito.achievement && (
            <div className="flex items-start gap-2 mb-3">
              <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 italic">
                {hito.achievement}
              </p>
            </div>
          )}

          {/* Acciones */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg text-xs font-semibold text-amber-700 hover:from-amber-100 hover:to-yellow-100 transition-all duration-300 border border-amber-200"
            >
              <Share2 className="w-3 h-3" />
              Compartir
            </motion.button>

            <div className={`ml-auto w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300`}>
              <span className="text-sm">{icon}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TarjetaHito;
