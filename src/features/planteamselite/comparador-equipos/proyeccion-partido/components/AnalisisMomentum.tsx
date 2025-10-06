import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Zap, ArrowUp, ArrowDown } from 'lucide-react';

const AnalisisMomentum: React.FC = () => {
  const teams = [
    {
      name: 'Equipo Local',
      momentum: 85,
      trend: 'up',
      form: 'Excelente',
      lastResults: ['W', 'W', 'W', 'D', 'W'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Equipo Visitante',
      momentum: 62,
      trend: 'down',
      form: 'Regular',
      lastResults: ['L', 'W', 'D', 'L', 'W'],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getResultColor = (result: string) => {
    if (result === 'W') return 'bg-green-500';
    if (result === 'D') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
          <Activity className="w-6 h-6 text-white" />
        </div>
        Análisis de Momentum
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Evaluación del <span className="font-bold text-green-600">momentum actual</span>, la forma reciente y el peso temporal de los equipos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">{team.name}</h3>
              <div className={`p-2 rounded-full ${team.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                {team.trend === 'up' ? (
                  <ArrowUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>

            {/* Momentum Score */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Momentum Score
                </span>
                <span className="text-2xl font-bold text-gray-800">{team.momentum}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${team.momentum}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 + 0.3 }}
                  className={`h-full bg-gradient-to-r ${team.color} rounded-full relative`}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </div>

            {/* Forma */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">Forma Actual</p>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                <span className="text-sm font-bold text-purple-700">{team.form}</span>
              </div>
            </div>

            {/* Últimos resultados */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Últimos 5 Partidos</p>
              <div className="flex gap-2">
                {team.lastResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 ${getResultColor(result)} rounded-lg flex items-center justify-center text-white font-bold shadow-md`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalisisMomentum;
