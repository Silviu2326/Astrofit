import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getHabitRanking, RankingHabitosData } from '../estadisticasHabitosApi';
import { Trophy, Loader, Medal, TrendingUp } from 'lucide-react';

const RankingHabitos: React.FC = () => {
  const [ranking, setRanking] = useState<RankingHabitosData | null>(null);

  useEffect(() => {
    getHabitRanking().then(data => setRanking(data));
  }, []);

  if (!ranking) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-orange-500 animate-spin" />
          <span className="ml-3 text-gray-600">Cargando ranking...</span>
        </div>
      </div>
    );
  }

  // Asignar medallas a los top 3
  const getMedalColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600'; // Oro
    if (index === 1) return 'from-gray-300 to-gray-500'; // Plata
    if (index === 2) return 'from-orange-400 to-orange-600'; // Bronce
    return 'from-orange-500 to-red-500'; // Otros
  };

  const getMedalIcon = (index: number) => {
    if (index < 3) return Medal;
    return TrendingUp;
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Ranking de Hábitos</h2>
        </div>

        {/* Lista de ranking */}
        <div className="space-y-3">
          {ranking.map((item, index) => {
            const MedalIcon = getMedalIcon(index);
            const isTopThree = index < 3;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                  isTopThree
                    ? 'bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-orange-200 shadow-md'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 border-transparent hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                {/* Posición */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg bg-gradient-to-br ${getMedalColor(index)} text-white`}>
                  {isTopThree ? (
                    <MedalIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">#{index + 1}</span>
                  )}
                </div>

                {/* Información del hábito */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{item.habit}</p>
                  {isTopThree && (
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      {index === 0 ? '🥇 Primer lugar' : index === 1 ? '🥈 Segundo lugar' : '🥉 Tercer lugar'}
                    </p>
                  )}
                </div>

                {/* Barra de progreso y porcentaje */}
                <div className="flex-shrink-0 w-32">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-600">Adherencia</span>
                    <span className="text-sm font-bold text-orange-600">{item.adherence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.adherence}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${getMedalColor(index)} rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resumen */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-white rounded-lg">
              <Trophy className="w-4 h-4 text-orange-600" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Resumen del Ranking</h4>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            Mostrando los {ranking.length} hábitos más cumplidos. El promedio de adherencia es del{' '}
            <span className="font-bold text-orange-600">
              {Math.round(ranking.reduce((sum, item) => sum + item.adherence, 0) / ranking.length)}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankingHabitos;
