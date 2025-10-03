// src/features/alertas-fatiga/components/IntegracionBiomarcadores.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Droplet, TrendingDown, TrendingUp } from 'lucide-react';

const IntegracionBiomarcadores: React.FC = () => {
  const biomarcadores = [
    {
      nombre: 'HRV (Variabilidad Cardíaca)',
      valor: 42,
      unidad: 'ms',
      estado: 'Bajo',
      tendencia: 'down',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50'
    },
    {
      nombre: 'Cortisol',
      valor: 18.5,
      unidad: 'μg/dL',
      estado: 'Elevado',
      tendencia: 'up',
      icon: Droplet,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    },
    {
      nombre: 'Frecuencia Cardíaca en Reposo',
      valor: 68,
      unidad: 'bpm',
      estado: 'Normal',
      tendencia: 'up',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Biomarcadores</h3>
            <p className="text-xs text-gray-600">Indicadores fisiológicos</p>
          </div>
        </div>

        {/* Lista de Biomarcadores */}
        <div className="space-y-4">
          {biomarcadores.map((bio, index) => {
            const Icon = bio.icon;
            const TrendIcon = bio.tendencia === 'up' ? TrendingUp : TrendingDown;
            const trendColor = bio.tendencia === 'up' ? 'text-red-500' : 'text-green-500';

            return (
              <motion.div
                key={bio.nombre}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`${bio.bgColor} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 bg-gradient-to-br ${bio.color} rounded-xl shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm">{bio.nombre}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-gray-900">{bio.valor}</span>
                        <span className="text-xs text-gray-600">{bio.unidad}</span>
                        <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 ${bio.estado === 'Normal' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold rounded-full shadow-md`}>
                    {bio.estado}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <p className="text-xs text-purple-700 font-medium">
            <span className="font-bold">🔬 Datos en tiempo real:</span> Los biomarcadores se actualizan automáticamente mediante integración con dispositivos wearables.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntegracionBiomarcadores;
