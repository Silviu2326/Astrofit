import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Activity } from 'lucide-react';

const MapaCalorPosicional: React.FC = () => {
  // Datos de ejemplo para el mapa de calor
  const zonasActividad = [
    { zona: 'Ataque Central', intensidad: 85, x: 50, y: 20, color: 'from-red-500 to-orange-500' },
    { zona: 'Banda Derecha', intensidad: 72, x: 75, y: 35, color: 'from-orange-500 to-yellow-500' },
    { zona: 'Banda Izquierda', intensidad: 68, x: 25, y: 35, color: 'from-yellow-500 to-green-500' },
    { zona: 'Mediocampo', intensidad: 90, x: 50, y: 50, color: 'from-green-500 to-emerald-500' },
    { zona: 'Defensa Central', intensidad: 78, x: 50, y: 80, color: 'from-blue-500 to-indigo-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <MapPin className="w-6 h-6" />
          </div>
          Mapa de Calor Posicional
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 text-lg">
          Visualización de zonas de mayor actividad posicional en el campo.
        </p>

        {/* Campo de juego simulado */}
        <div className="relative bg-gradient-to-b from-green-500 to-green-600 rounded-2xl p-6 overflow-hidden" style={{ height: '500px' }}>
          {/* Líneas del campo */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 right-0 h-px bg-white"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white"></div>
            {/* Círculo central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
          </div>

          {/* Zonas de actividad */}
          {zonasActividad.map((zona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="absolute"
              style={{
                left: `${zona.x}%`,
                top: `${zona.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Halo de calor */}
              <div
                className={`absolute w-32 h-32 bg-gradient-to-br ${zona.color} rounded-full blur-2xl`}
                style={{ opacity: zona.intensidad / 200 }}
              ></div>

              {/* Punto central */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`relative w-12 h-12 bg-gradient-to-br ${zona.color} rounded-full shadow-xl border-2 border-white flex items-center justify-center cursor-pointer`}
              >
                <Activity className="w-6 h-6 text-white" />
              </motion.div>

              {/* Tooltip */}
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/50 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <p className="text-sm font-bold text-gray-900">{zona.zona}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-gray-700">
                    Intensidad: {zona.intensidad}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leyenda */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {zonasActividad.map((zona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
              className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-xl p-3 border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${zona.color}`}></div>
                <span className="text-xs font-bold text-gray-700">{zona.zona}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${zona.intensidad}%` }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${zona.color} rounded-full`}
                />
              </div>
              <span className="text-xs text-gray-600 mt-1 block">{zona.intensidad}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MapaCalorPosicional;
