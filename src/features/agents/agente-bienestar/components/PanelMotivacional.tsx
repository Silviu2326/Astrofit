import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote, Share2, Heart, Award, TrendingUp, Zap, MessageCircle } from 'lucide-react';
import { fetchMotivationalPhrases, toggleMotivationalPhrase, MotivationalPhrase } from '../agenteBienestarApi';

const PanelMotivacional: React.FC = () => {
  const [phrases, setPhrases] = useState<MotivationalPhrase[]>([]);

  useEffect(() => {
    const getPhrases = async () => {
      const data = await fetchMotivationalPhrases();
      setPhrases(data);
    };
    getPhrases();
  }, []);

  const handleToggleActive = async (id: string) => {
    const updatedPhrases = await toggleMotivationalPhrase(id);
    setPhrases(updatedPhrases);
  };

  // Quote del día destacado
  const quoteOfDay = {
    text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    author: "Robert Collier",
    category: "Motivación"
  };

  // Mock de logros/badges
  const achievements = [
    {
      name: 'Racha de 7 días',
      icon: Zap,
      color: 'from-yellow-400 to-orange-400',
      unlocked: true,
      progress: 100
    },
    {
      name: 'Hidratación Pro',
      icon: Heart,
      color: 'from-cyan-400 to-blue-400',
      unlocked: true,
      progress: 100
    },
    {
      name: 'Madrugador',
      icon: TrendingUp,
      color: 'from-purple-400 to-pink-400',
      unlocked: false,
      progress: 60
    },
  ];

  // Nivel de energía del día (gauge)
  const energyLevel = 75;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Panel Motivacional</h3>
            <p className="text-sm text-gray-600">Tu dosis diaria de inspiración</p>
          </div>
        </div>

        {/* Quote del Día - Destacado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 shadow-xl"
        >
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Quote className="w-6 h-6 text-yellow-200" />
                <span className="text-xs font-bold text-yellow-200 uppercase tracking-wider">Quote del Día</span>
              </div>
              <button className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors duration-300 backdrop-blur-sm">
                <Share2 className="w-4 h-4 text-white" />
              </button>
            </div>

            <blockquote className="text-lg md:text-xl font-bold text-white mb-4 leading-relaxed italic">
              "{quoteOfDay.text}"
            </blockquote>

            <div className="flex items-center justify-between">
              <p className="text-sm text-pink-100 font-medium">— {quoteOfDay.author}</p>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                {quoteOfDay.category}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Galería de Logros */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            Tus Logros
          </h4>

          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: achievement.unlocked ? 1.1 : 1.05, rotate: achievement.unlocked ? 5 : 0 }}
                className="relative"
              >
                {/* Badge */}
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${achievement.color} flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden ${
                  !achievement.unlocked ? 'opacity-40 grayscale' : ''
                }`}>
                  <achievement.icon className="w-8 h-8 mb-1" />
                  <div className="text-xs font-bold text-center px-2">{achievement.name}</div>

                  {/* Brillo para desbloqueados */}
                  {achievement.unlocked && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20"></div>
                  )}

                  {/* Candado para bloqueados */}
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-xs">🔒</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progreso hacia próximo logro */}
                {!achievement.unlocked && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${achievement.color}`}
                      />
                    </div>
                    <p className="text-xs text-center text-gray-600 mt-1">{achievement.progress}%</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nivel de Energía del Día */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <h4 className="text-lg font-bold text-gray-900">Nivel de Energía</h4>
            </div>
            <span className="text-2xl font-bold text-orange-600">{energyLevel}%</span>
          </div>

          {/* Gauge animado */}
          <div className="relative h-4 bg-orange-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${energyLevel}%` }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>

          <p className="text-xs text-gray-600 mt-2 text-center">
            {energyLevel >= 75 ? '¡Excelente! Aprovecha este momento productivo.' :
             energyLevel >= 50 ? 'Buen nivel. Mantén el ritmo.' :
             '¿Necesitas un descanso? Recarga energías.'}
          </p>
        </motion.div>

        {/* Frases Motivacionales */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-500" />
            Más Inspiración
          </h4>

          <div className="space-y-3">
            {phrases.slice(0, 3).map((phrase, index) => (
              <motion.div
                key={phrase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onClick={() => handleToggleActive(phrase.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                  phrase.active
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-md'
                    : 'bg-white/50 border-gray-200 hover:border-purple-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    phrase.active ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${phrase.active ? 'text-purple-900' : 'text-gray-700'}`}>
                      {phrase.text}
                    </p>
                    {phrase.active && (
                      <span className="inline-block mt-2 text-xs font-bold text-purple-600">
                        ✨ Activa hoy
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PanelMotivacional;
