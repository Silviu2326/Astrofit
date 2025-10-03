import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Award } from 'lucide-react';

const BenchmarkingNormativo: React.FC = () => {
  const metricas = [
    { nombre: 'Distancia Total', valor: 5.2, promedio: 4.8, percentil: 72, color: 'from-blue-500 to-indigo-600' },
    { nombre: 'Sprint Total', valor: 285, promedio: 320, percentil: 58, color: 'from-purple-500 to-pink-600' },
    { nombre: 'Aceleraciones', valor: 42, promedio: 38, percentil: 68, color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart2 className="w-6 h-6" />
          </div>
          Benchmarking Normativo
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Benchmarking automático con <span className="font-bold text-blue-700 px-2 py-1 bg-blue-50 rounded-lg">bases de datos normativas de posición</span>.
        </p>

        <div className="space-y-4 mb-6">
          {metricas.map((metrica, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">{metrica.nombre}</h3>
                <div className="flex items-center gap-2">
                  <Award className={`w-5 h-5 ${metrica.percentil >= 70 ? 'text-green-600' : metrica.percentil >= 50 ? 'text-yellow-600' : 'text-orange-600'}`} />
                  <span className={`text-sm font-bold ${metrica.percentil >= 70 ? 'text-green-700' : metrica.percentil >= 50 ? 'text-yellow-700' : 'text-orange-700'}`}>
                    P{metrica.percentil}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tu Valor</p>
                  <p className="text-2xl font-bold text-gray-900">{metrica.valor}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Promedio Posición</p>
                  <p className="text-2xl font-bold text-gray-600">{metrica.promedio}</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metrica.percentil}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${metrica.color} rounded-full relative`}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumen */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-3">
          <div className="p-2 bg-blue-500 rounded-xl">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-1">Evaluación General</p>
            <p className="text-sm text-gray-700">El rendimiento está por encima del promedio en distancia total y aceleraciones. Trabajar en mejorar la velocidad de sprint.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BenchmarkingNormativo;
