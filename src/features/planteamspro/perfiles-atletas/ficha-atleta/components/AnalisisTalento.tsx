// Análisis talento potencial métricas múltiples
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Star, Zap, Target } from 'lucide-react';

const AnalisisTalento = () => {
  const categorias = [
    { categoria: 'Técnica', puntuacion: 88, icono: Target, color: 'from-blue-500 to-indigo-600' },
    { categoria: 'Físico', puntuacion: 92, icono: Zap, color: 'from-emerald-500 to-teal-600' },
    { categoria: 'Táctico', puntuacion: 85, icono: Star, color: 'from-purple-500 to-pink-600' },
    { categoria: 'Mental', puntuacion: 90, icono: Sparkles, color: 'from-orange-500 to-red-600' }
  ];

  const talentoGlobal = Math.round(categorias.reduce((acc, cat) => acc + cat.puntuacion, 0) / categorias.length);

  return (
    <div className="space-y-6">
      {/* Talent Score Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl p-8 border border-white/20"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Análisis de Talento</h2>
          <p className="text-xl text-blue-100 mb-6">Evaluación de potencial y métricas múltiples</p>

          <div className="inline-block">
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">Puntuación Global</p>
              <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                {talentoGlobal}
              </p>
              <p className="text-sm text-white/70 mt-2">sobre 100</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categorias.map((cat, index) => {
          const Icono = cat.icono;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icono className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{cat.categoria}</p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    {cat.puntuacion}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.puntuacion}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${cat.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(cat.puntuacion / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalisisTalento;
