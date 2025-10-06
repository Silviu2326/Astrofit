import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Flame, Target } from 'lucide-react';

const HeatmapsMovimiento: React.FC = () => {
  const zonas = [
    { nombre: 'Zona Defensiva', intensidad: 75, color: 'from-blue-500 to-indigo-600' },
    { nombre: 'Zona Central', intensidad: 92, color: 'from-orange-500 to-red-600' },
    { nombre: 'Zona Ofensiva', intensidad: 68, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Flame className="w-6 h-6" />
          </div>
          Heatmaps de Movimiento
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Visualización de heatmaps de <span className="font-bold text-orange-700 px-2 py-1 bg-orange-50 rounded-lg">movimiento y posicionamiento</span> en el campo durante la sesión.
        </p>

        {/* Simulación de heatmap */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-6 border border-emerald-100">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {zonas.map((zona, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className={`h-32 rounded-2xl bg-gradient-to-br ${zona.color} opacity-${Math.floor(zona.intensidad / 20) * 20} flex items-center justify-center mb-3 shadow-lg relative overflow-hidden group`}>
                  <MapPin className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <p className="font-bold text-gray-900 mb-1">{zona.nombre}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${zona.intensidad}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${zona.color} rounded-full`}
                  ></motion.div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{zona.intensidad}% intensidad</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info adicional */}
        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <div className="p-2 bg-blue-500 rounded-xl">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-1">Análisis de Posicionamiento</p>
            <p className="text-sm text-gray-700">Los datos muestran mayor actividad en la zona central del campo, indicando un rol activo en la transición del juego.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeatmapsMovimiento;
