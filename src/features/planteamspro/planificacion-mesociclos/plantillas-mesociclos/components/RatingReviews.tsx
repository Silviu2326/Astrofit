import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';

const RatingReviews: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Star className="w-6 h-6" />
          </div>
          Sistema de Calificación y Reseñas
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Evalúa y comenta plantillas basándote en tu experiencia de uso
        </p>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <div className="text-2xl font-bold text-yellow-900">4.8</div>
            </div>
            <p className="text-sm text-yellow-700">Calificación promedio</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div className="text-2xl font-bold text-blue-900">342</div>
            </div>
            <p className="text-sm text-blue-700">Reseñas totales</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-5 h-5 text-green-500" />
              <div className="text-2xl font-bold text-green-900">89%</div>
            </div>
            <p className="text-sm text-green-700">Recomendadas</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RatingReviews;
