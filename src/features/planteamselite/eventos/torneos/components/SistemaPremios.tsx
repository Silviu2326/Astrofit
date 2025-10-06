import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Crown, Star, Gift } from 'lucide-react';

const SistemaPremios: React.FC = () => {
  const prizes = [
    { position: 1, title: 'Campeón', prize: '$10,000', icon: Crown, color: 'from-yellow-400 to-yellow-600', bgColor: 'from-yellow-50 to-orange-50' },
    { position: 2, title: 'Subcampeón', prize: '$5,000', icon: Trophy, color: 'from-gray-400 to-gray-600', bgColor: 'from-gray-50 to-slate-50' },
    { position: 3, title: 'Tercer Lugar', prize: '$2,500', icon: Medal, color: 'from-orange-500 to-red-600', bgColor: 'from-orange-50 to-red-50' },
  ];

  const specialAwards = [
    { title: 'Mejor Jugador', recipient: 'TBD', icon: Star, color: 'from-purple-500 to-pink-500' },
    { title: 'Mayor Racha', recipient: 'TBD', icon: Award, color: 'from-blue-500 to-indigo-500' },
    { title: 'Fair Play', recipient: 'TBD', icon: Gift, color: 'from-green-500 to-emerald-500' },
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
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Sistema de Premios</h2>
          </div>
          <p className="text-purple-100 ml-12">
            Reconocimientos y recompensas automáticas para los participantes
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Top 3 Premios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.position}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -12 }}
              className={`relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 ${
                prize.position === 1 ? 'border-yellow-300' : 'border-white/50'
              }`}
            >
              {/* Background gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-br ${prize.bgColor}`}></div>

              {/* Decoración */}
              <div className={`absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br ${prize.color} opacity-20 rounded-full blur-3xl`}></div>

              <div className="relative z-10 p-8 text-center">
                {/* Icono grande */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${prize.color} flex items-center justify-center shadow-2xl`}
                  >
                    <prize.icon className="w-12 h-12 text-white" />
                  </motion.div>
                </div>

                {/* Position Badge */}
                <div className="mb-3">
                  <span className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${prize.color}`}>
                    #{prize.position}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{prize.title}</h3>

                {/* Premio */}
                <div className={`inline-block px-6 py-3 bg-gradient-to-r ${prize.color} rounded-2xl shadow-lg`}>
                  <p className="text-2xl font-bold text-white">{prize.prize}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premios Especiales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-purple-600" />
            Reconocimientos Especiales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specialAwards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden rounded-2xl shadow-lg border border-white/50 bg-white/80 p-4 group"
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center shadow-lg`}>
                    <award.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800">{award.title}</h4>
                    <p className="text-xs text-gray-600">{award.recipient}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Total Pool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Pool Total de Premios</p>
                <p className="text-4xl font-bold text-gray-800">$25,000</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Detalles
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SistemaPremios;
