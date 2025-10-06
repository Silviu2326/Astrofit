import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp } from 'lucide-react';

const SimuladorAlineacion: React.FC = () => {
  const formaciones = [
    { nombre: '4-3-3', efectividad: 85, compatibilidad: 'Alta' },
    { nombre: '4-4-2', efectividad: 78, compatibilidad: 'Media' },
    { nombre: '3-5-2', efectividad: 72, compatibilidad: 'Media' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Simulador de Alineaciones</h3>
        </div>

        <div className="space-y-3">
          {formaciones.map((form, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500 rounded-lg">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-800">{form.nombre}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  form.compatibilidad === 'Alta' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {form.compatibilidad}
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 font-medium">Efectividad</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                  <span className="text-sm font-bold text-blue-600">{form.efectividad}%</span>
                </div>
              </div>

              <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${form.efectividad}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SimuladorAlineacion;
