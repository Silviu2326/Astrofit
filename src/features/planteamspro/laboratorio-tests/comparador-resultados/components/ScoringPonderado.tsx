import React from 'react';
import { motion } from 'framer-motion';
import { Target, Star, Award } from 'lucide-react';

const ScoringPonderado: React.FC = () => {
  const scores = [
    { atleta: 'Atleta A', score: 92, peso: 'Alto', ranking: 1 },
    { atleta: 'Atleta B', score: 85, peso: 'Medio', ranking: 2 },
    { atleta: 'Atleta C', score: 78, peso: 'Medio', ranking: 3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl text-white shadow-lg">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Sistema de Scoring Ponderado</h3>
        </div>

        <div className="space-y-3">
          {scores.map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="p-3 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                    'bg-gradient-to-br from-orange-400 to-orange-500'
                  }`}>
                    {score.ranking === 1 ? <Award className="w-5 h-5" /> : score.ranking}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{score.atleta}</p>
                    <p className="text-xs text-gray-600">Peso: {score.peso}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
                      {score.score}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">puntos</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ScoringPonderado;
