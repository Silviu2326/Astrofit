import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const CurvasIntensidad: React.FC = () => {
  const picos = [
    { momento: 'Min 15', valor: '92%', tipo: 'Pico', icon: TrendingUp, color: 'from-red-500 to-pink-500' },
    { momento: 'Min 35', valor: '28%', tipo: 'Valle', icon: TrendingDown, color: 'from-blue-500 to-indigo-500' },
    { momento: 'Min 58', valor: '88%', tipo: 'Pico', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Activity className="w-6 h-6" />
          </div>
          Curvas de Intensidad
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Análisis detallado de curvas de intensidad, identificando <span className="font-bold text-indigo-700 px-2 py-1 bg-indigo-50 rounded-lg">picos y valles</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {picos.map((pico, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${pico.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pico.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  <pico.icon className="w-7 h-7" />
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full inline-block mb-2">
                  <span className="text-xs font-bold text-purple-700">{pico.tipo}</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">{pico.momento}</p>
                <p className="text-3xl font-bold text-gray-900">{pico.valor}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumen */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-purple-700">Conclusión:</span> Se observan 2 picos principales de intensidad que coinciden con ejercicios de alta demanda, y un valle significativo durante el período de recuperación activa.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CurvasIntensidad;
