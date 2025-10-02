import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, Flame, Star, Zap, Award, TrendingUp, ChevronRight } from 'lucide-react';
import { fetchGamifiedChallenges, GamifiedChallenge } from '../agenteBienestarApi';

const RetosGamificados: React.FC = () => {
  const [challenges, setChallenges] = useState<GamifiedChallenge[]>([]);

  useEffect(() => {
    const getChallenges = async () => {
      const data = await fetchGamifiedChallenges();
      setChallenges(data);
    };
    getChallenges();
  }, []);

  // Mock data para retos adicionales con tipos
  const mockChallenges = [
    {
      id: '1',
      title: '7 Días de Meditación',
      progress: '5/7',
      completed: false,
      type: 'diario',
      reward: 150,
      timeLeft: '2 días',
      percentage: 71,
      icon: Flame,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '2',
      title: 'Bebe 2L de Agua Diarios',
      progress: '14/30',
      completed: false,
      type: 'mensual',
      reward: 500,
      timeLeft: '16 días',
      percentage: 47,
      icon: Target,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: '3',
      title: 'Completar 50,000 Pasos',
      progress: '50000/50000',
      completed: true,
      type: 'semanal',
      reward: 300,
      timeLeft: 'Completado',
      percentage: 100,
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: '4',
      title: 'Sin Azúcar por 5 Días',
      progress: '3/5',
      completed: false,
      type: 'diario',
      reward: 200,
      timeLeft: '2 días',
      percentage: 60,
      icon: Star,
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const getTipoColor = (type: string) => {
    switch (type) {
      case 'diario':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'semanal':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'mensual':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Retos Gamificados</h3>
              <p className="text-sm text-gray-600">Desafíos activos y recompensas</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <span className="hidden sm:inline">Explorar Más</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Retos Activos */}
        <div className="space-y-4">
          {mockChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                challenge.completed
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-lg'
                  : 'bg-white/50 border-gray-200 hover:border-yellow-300 hover:shadow-md'
              }`}
            >
              {/* Shimmer effect para completados */}
              {challenge.completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transform -skew-x-12 hover:translate-x-full transition-all duration-1000"></div>
              )}

              <div className="p-4 relative z-10">
                <div className="flex items-start gap-4">
                  {/* Icono del reto */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-white shadow-xl`}>
                    <challenge.icon className="w-7 h-7" />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    {/* Título y tipo */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{challenge.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTipoColor(challenge.type)} uppercase tracking-wide flex-shrink-0`}>
                        {challenge.type}
                      </span>
                    </div>

                    {/* Progreso */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progreso: {challenge.progress}</span>
                        <span className="text-sm font-bold text-gray-900">{challenge.percentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${challenge.percentage}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${challenge.color} rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Footer: tiempo y recompensa */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Tiempo restante */}
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{challenge.timeLeft}</span>
                        </div>

                        {/* Estado */}
                        {challenge.completed ? (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-bold text-green-700">Completado</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-full">
                            <Zap className="w-4 h-4 text-yellow-600" />
                            <span className="text-xs font-bold text-yellow-700">En Progreso</span>
                          </div>
                        )}
                      </div>

                      {/* Recompensa */}
                      <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border border-yellow-300">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-sm font-bold text-yellow-800">{challenge.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Historial de Retos Completados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Logros Recientes
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: '10K Pasos', points: 100, color: 'from-blue-400 to-cyan-400' },
              { name: 'Semana Perfecta', points: 250, color: 'from-purple-400 to-pink-400' },
              { name: 'Hidratación Pro', points: 150, color: 'from-cyan-400 to-teal-400' },
              { name: 'Madrugador', points: 200, color: 'from-orange-400 to-yellow-400' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-center"
              >
                <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${badge.color} flex flex-col items-center justify-center text-white shadow-lg mb-2 relative overflow-hidden`}>
                  <Award className="w-8 h-8 mb-1" />
                  <div className="text-xs font-bold px-2">{badge.name}</div>
                  {/* Brillo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20"></div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-gray-700">{badge.points}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RetosGamificados;
