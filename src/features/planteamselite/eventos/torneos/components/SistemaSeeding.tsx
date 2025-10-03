import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Award, ArrowUpDown, Crown, Medal } from 'lucide-react';

const SistemaSeeding: React.FC = () => {
  const teams = [
    { id: 1, name: 'Equipo Alpha', seed: 1, rating: 2450, winRate: 85, color: 'from-yellow-500 to-orange-500' },
    { id: 2, name: 'Equipo Beta', seed: 2, rating: 2380, winRate: 78, color: 'from-gray-400 to-gray-500' },
    { id: 3, name: 'Equipo Gamma', seed: 3, rating: 2310, winRate: 72, color: 'from-orange-600 to-red-600' },
    { id: 4, name: 'Equipo Delta', seed: 4, rating: 2250, winRate: 68, color: 'from-blue-500 to-indigo-500' },
    { id: 5, name: 'Equipo Epsilon', seed: 5, rating: 2190, winRate: 64, color: 'from-purple-500 to-pink-500' },
    { id: 6, name: 'Equipo Zeta', seed: 6, rating: 2120, winRate: 58, color: 'from-green-500 to-emerald-500' },
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
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Sistema de Seeding Inteligente</h2>
          </div>
          <p className="text-purple-100 ml-12">
            Clasificación automática basada en rankings y estadísticas históricas
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Rankings */}
        <div className="space-y-4">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 bg-white/80 group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Progress bar de fondo */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-30"></div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${team.color} opacity-5`}
                style={{ width: `${team.winRate}%` }}
              ></div>

              <div className="relative z-10 p-6 flex items-center gap-4">
                {/* Seed Badge */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${team.color} flex items-center justify-center shadow-xl`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">#{team.seed}</div>
                  </div>
                </div>

                {/* Team Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
                    {team.seed <= 3 && (
                      <div className={`p-1 rounded-lg ${
                        team.seed === 1 ? 'bg-yellow-100' :
                        team.seed === 2 ? 'bg-gray-100' :
                        'bg-orange-100'
                      }`}>
                        {team.seed === 1 ? <Crown className="w-5 h-5 text-yellow-600" /> :
                         team.seed === 2 ? <Medal className="w-5 h-5 text-gray-600" /> :
                         <Award className="w-5 h-5 text-orange-600" />}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-600">Rating: <span className="text-purple-700">{team.rating}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-600">Win Rate: <span className="text-green-700">{team.winRate}%</span></span>
                    </div>
                  </div>
                </div>

                {/* Win Rate Progress */}
                <div className="flex-shrink-0 w-32">
                  <div className="text-xs font-semibold text-gray-600 mb-2 text-right">Victoria</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${team.winRate}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${team.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>
                  <div className="text-xs font-bold text-purple-700 mt-1 text-right">{team.winRate}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Acción de reordenamiento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group border border-white/20"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center gap-2">
              <ArrowUpDown className="w-5 h-5" />
              <span>Actualizar Seeding Automático</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SistemaSeeding;
