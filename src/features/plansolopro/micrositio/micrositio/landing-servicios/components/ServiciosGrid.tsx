
import React from 'react';
import { motion } from 'framer-motion';
import { mockServicios, Servicio } from '../landingServiciosApi';
import { Dumbbell, Users, Rocket, Apple } from 'lucide-react';

interface ServiciosGridProps {
  brandColors: { primary: string; secondary: string; accent: string };
}

const iconMap: Record<string, any> = {
  '💪': Dumbbell,
  '🏋️': Users,
  '🚀': Rocket,
  '🍎': Apple,
};

const ServiciosGrid: React.FC<ServiciosGridProps> = ({ brandColors }) => {
  const gradients = [
    'from-blue-500 via-indigo-500 to-purple-500',
    'from-emerald-500 via-teal-500 to-cyan-500',
    'from-purple-500 via-pink-500 to-rose-500',
    'from-orange-500 via-amber-500 to-yellow-500',
  ];

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-4">
          Servicios de Entrenamiento
        </h2>
        <p className="text-xl text-gray-600">Elige el plan perfecto para alcanzar tus objetivos</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockServicios.map((servicio: Servicio, index: number) => {
          const Icon = iconMap[servicio.icon] || Dumbbell;
          const gradient = gradients[index % gradients.length];

          return (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Header con gradiente */}
              <div className={`bg-gradient-to-r ${gradient} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {servicio.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {servicio.description}
                </p>
                <div className="flex items-baseline justify-between">
                  <p className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
                    {servicio.price}
                  </p>
                </div>

                {/* Botón CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-4 w-full py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Ver detalles
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiciosGrid;
