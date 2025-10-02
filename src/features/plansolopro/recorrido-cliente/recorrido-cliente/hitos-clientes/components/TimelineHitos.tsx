import React from 'react';
import { motion } from 'framer-motion';
import TarjetaHito from './TarjetaHito';

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

const mockHitos: Hito[] = [
  {
    id: '1',
    type: 'meta_alcanzada',
    date: '2025-10-02',
    description: 'Meta de peso alcanzada',
    clientName: 'Juan Pérez',
    achievement: 'Perdió 10kg en 3 meses',
    icon: '🏆',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: '2',
    type: 'transformacion',
    date: '2025-10-01',
    description: 'Transformación impresionante',
    clientName: 'María García',
    achievement: 'Completó su programa de 6 meses',
    icon: '⭐',
    color: 'from-yellow-500 to-lime-500',
  },
  {
    id: '3',
    type: 'sesion_completada',
    date: '2025-09-30',
    description: 'Sesión #50 completada',
    clientName: 'Pedro López',
    achievement: 'Medio camino del objetivo',
    icon: '💪',
    color: 'from-lime-500 to-green-500',
  },
  {
    id: '4',
    type: 'cumpleanos',
    date: '2025-09-28',
    description: 'Cumpleaños especial',
    clientName: 'Ana Rodríguez',
    achievement: 'Celebrando un año más saludable',
    icon: '🎂',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: '5',
    type: 'aniversario',
    date: '2025-09-25',
    description: 'Aniversario de contrato',
    clientName: 'Carlos Martínez',
    achievement: '1 año transformando su vida',
    icon: '🎉',
    color: 'from-purple-500 to-pink-500',
  },
];

const TimelineHitos: React.FC = () => {
  return (
    <div className="relative space-y-4">
      {/* Línea vertical con gradiente */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-yellow-200 to-lime-200"></div>

      {mockHitos.map((hito, index) => (
        <motion.div
          key={hito.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <TarjetaHito hito={hito} />
        </motion.div>
      ))}

      {/* Notificación de hito reciente */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg">
            <span className="text-xl">🎊</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-900">¡Celebración!</p>
            <p className="text-xs text-amber-700">3 hitos alcanzados esta semana</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineHitos;
