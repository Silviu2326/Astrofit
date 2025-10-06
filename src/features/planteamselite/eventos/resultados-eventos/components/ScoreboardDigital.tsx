import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';

interface ScoreboardDigitalProps {
  eventName: string;
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  timeRemaining: string; // e.g., "15:00" or "Final"
}

const ScoreboardDigital: React.FC<ScoreboardDigitalProps> = ({
  eventName,
  team1Name,
  team2Name,
  team1Score,
  team2Score,
  timeRemaining,
}) => {
  const isWinning1 = team1Score > team2Score;
  const isWinning2 = team2Score > team1Score;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 max-w-4xl mx-auto">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">{eventName}</h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-blue-200" />
            <p className="text-lg text-blue-100 font-semibold">{timeRemaining}</p>
          </div>
        </div>
      </div>

      {/* Body - Marcador */}
      <div className="p-8 md:p-12">
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Equipo 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative"
          >
            {isWinning1 && (
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            )}
            <div className="relative">
              <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                {team1Name}
              </p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`text-6xl md:text-7xl font-extrabold ${
                  isWinning1
                    ? 'bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'text-gray-600'
                }`}
              >
                {team1Score}
              </motion.p>
              {isWinning1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"
                >
                  Ganando
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* VS */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl md:text-4xl font-bold rounded-full w-20 h-20 flex items-center justify-center shadow-2xl">
                VS
              </div>
            </div>
          </motion.div>

          {/* Equipo 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative"
          >
            {isWinning2 && (
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            )}
            <div className="relative">
              <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                {team2Name}
              </p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`text-6xl md:text-7xl font-extrabold ${
                  isWinning2
                    ? 'bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'text-gray-600'
                }`}
              >
                {team2Score}
              </motion.p>
              {isWinning2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"
                >
                  Ganando
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer decorativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <p className="text-center text-sm text-gray-500 font-medium">
            Marcador digital en tiempo real
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ScoreboardDigital;
