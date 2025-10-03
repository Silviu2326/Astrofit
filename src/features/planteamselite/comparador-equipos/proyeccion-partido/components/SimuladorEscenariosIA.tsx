import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, BarChart2, Shuffle, Zap } from 'lucide-react';

const SimuladorEscenariosIA: React.FC = () => {
  const scenarios = [
    { label: 'Escenario Optimista', percentage: 65, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50' },
    { label: 'Escenario Base', percentage: 50, color: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-50' },
    { label: 'Escenario Pesimista', percentage: 35, color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-50' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        Simulador de Escenarios IA
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Este componente modela <span className="font-bold text-purple-600">miles de partidos virtuales</span> para simular diferentes escenarios posibles.
      </p>

      {/* Grid de escenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`${scenario.bgColor} p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300`}
          >
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600 mb-3">{scenario.label}</p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-4">
                {scenario.percentage}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scenario.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                  className={`h-full bg-gradient-to-r ${scenario.color} rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Shuffle className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm mb-1">Simulaciones Ejecutadas</p>
            <p className="text-2xl font-bold text-indigo-600">10,000+</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm mb-1">Precisión del Modelo</p>
            <p className="text-2xl font-bold text-purple-600">92.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorEscenariosIA;
