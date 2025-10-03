import React from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, DollarSign, Target, Percent } from 'lucide-react';

const ApuestasVirtuales: React.FC = () => {
  const matches = [
    { id: 1, team1: 'Alpha', team2: 'Beta', odds1: 1.85, odds2: 2.10, pool: 5420 },
    { id: 2, team1: 'Gamma', team2: 'Delta', odds1: 1.65, odds2: 2.40, pool: 3890 },
    { id: 3, team1: 'Epsilon', team2: 'Zeta', odds1: 2.25, odds2: 1.70, pool: 2150 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Apuestas Virtuales</h2>
          </div>
          <p className="text-purple-100 ml-12">
            Sistema de predicciones y apuestas virtuales con monedas del torneo
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="space-y-6">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl shadow-xl border border-white/50 bg-white/80 group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10 p-6">
                {/* Pool Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Pool Total</p>
                      <p className="text-lg font-bold text-gray-800">{match.pool.toLocaleString()} coins</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <span className="text-xs font-bold text-green-700">Abierto</span>
                  </div>
                </div>

                {/* Teams & Odds */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Team 1 */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 group/team"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/team:opacity-30 transform -skew-x-12 group-hover/team:translate-x-full transition-all duration-1000"></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                          {match.team1.charAt(0)}
                        </div>
                        <h3 className="font-bold text-gray-800">{match.team1}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-purple-600" />
                        <span className="text-2xl font-bold text-purple-700">{match.odds1}x</span>
                      </div>
                    </div>
                  </motion.button>

                  {/* Team 2 */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 group/team"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/team:opacity-30 transform -skew-x-12 group-hover/team:translate-x-full transition-all duration-1000"></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm">
                          {match.team2.charAt(0)}
                        </div>
                        <h3 className="font-bold text-gray-800">{match.team2}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-700">{match.odds2}x</span>
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Prediction Stats */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-xl">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-gray-700">65% votan {match.team1}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-xl">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700">Tendencia: {match.team2}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 border border-yellow-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Tu Balance</p>
                <p className="text-3xl font-bold text-gray-800">15,750 <span className="text-lg text-gray-600">coins</span></p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Historial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApuestasVirtuales;
