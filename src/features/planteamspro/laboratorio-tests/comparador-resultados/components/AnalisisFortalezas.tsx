import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const AnalisisFortalezas: React.FC = () => {
  const fortalezas = [
    { nombre: 'Velocidad', valor: 92, cambio: '+8%' },
    { nombre: 'Resistencia', valor: 88, cambio: '+5%' },
  ];

  const debilidades = [
    { nombre: 'Fuerza', valor: 65, cambio: '-3%' },
    { nombre: 'Agilidad', valor: 72, cambio: '+1%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white shadow-lg">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Fortalezas y Debilidades</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Fortalezas</p>
            {fortalezas.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">{item.nombre}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-600">{item.valor}%</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-medium">{item.cambio}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.valor}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Áreas de Mejora</p>
            {debilidades.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">{item.nombre}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-600">{item.valor}%</span>
                    <div className="flex items-center gap-1 text-orange-600">
                      <TrendingDown className="w-3 h-3" />
                      <span className="text-xs font-medium">{item.cambio}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.valor}%` }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisFortalezas;
