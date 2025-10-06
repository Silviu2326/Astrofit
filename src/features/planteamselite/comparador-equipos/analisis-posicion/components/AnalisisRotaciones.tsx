import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRightLeft, TrendingUp, Users } from 'lucide-react';

const AnalisisRotaciones: React.FC = () => {
  const rotaciones = [
    {
      nombre: 'Rotación Ofensiva',
      descripcion: 'Cambio de delantero a extremo',
      frecuencia: 85,
      efectividad: 92,
      color: 'from-orange-500 to-red-500',
    },
    {
      nombre: 'Rotación Defensiva',
      descripcion: 'Intercambio lateral-central',
      frecuencia: 68,
      efectividad: 78,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      nombre: 'Rotación Mediocampo',
      descripcion: 'Pivote a interior',
      frecuencia: 74,
      efectividad: 88,
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <RefreshCw className="w-6 h-6" />
          </div>
          Análisis de Rotaciones
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 text-lg">
          Análisis de movimientos y rotaciones de posiciones durante el juego.
        </p>

        {/* Grid de rotaciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rotaciones.map((rotacion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-3xl p-6 border border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300"></div>

              <div className="relative z-10">
                {/* Icono y nombre */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rotacion.color} flex items-center justify-center shadow-lg`}>
                    <ArrowRightLeft className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{rotacion.nombre}</h4>
                    <p className="text-xs text-gray-600">{rotacion.descripcion}</p>
                  </div>
                </div>

                {/* Métricas */}
                <div className="space-y-4 mt-6">
                  {/* Frecuencia */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Frecuencia</span>
                      <span className="text-sm font-bold text-gray-900">{rotacion.frecuencia}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rotacion.frecuencia}%` }}
                        transition={{ delay: index * 0.15 + 0.3, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${rotacion.color} rounded-full`}
                      />
                    </div>
                  </div>

                  {/* Efectividad */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Efectividad</span>
                      <span className="text-sm font-bold text-gray-900">{rotacion.efectividad}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rotacion.efectividad}%` }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${rotacion.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>

                {/* Badge de estado */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-green-600">Rendimiento Óptimo</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisRotaciones;
