import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Star, X, Dumbbell, TrendingUp, Sparkles, Edit } from 'lucide-react';
import { Ejercicio } from '../bibliotecaEjerciciosApi';

interface EjercicioCardProps {
  ejercicio: Ejercicio;
  index?: number;
  onEdit?: (ejercicio: Ejercicio) => void;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, { gradient: string; badge: string; icon: string }> = {
    'piernas': { gradient: 'from-blue-500 to-indigo-600', badge: 'bg-blue-500', icon: 'text-blue-600' },
    'torso': { gradient: 'from-purple-500 to-pink-600', badge: 'bg-purple-500', icon: 'text-purple-600' },
    'core': { gradient: 'from-orange-500 to-red-600', badge: 'bg-orange-500', icon: 'text-orange-600' },
    'brazos': { gradient: 'from-green-500 to-emerald-600', badge: 'bg-green-500', icon: 'text-green-600' },
    'espalda': { gradient: 'from-cyan-500 to-blue-600', badge: 'bg-cyan-500', icon: 'text-cyan-600' },
    'cardio': { gradient: 'from-red-500 to-pink-600', badge: 'bg-red-500', icon: 'text-red-600' },
    'flexibilidad': { gradient: 'from-teal-500 to-cyan-600', badge: 'bg-teal-500', icon: 'text-teal-600' },
    'funcional': { gradient: 'from-indigo-500 to-purple-600', badge: 'bg-indigo-500', icon: 'text-indigo-600' }
  };
  return colors[category] || colors['torso'];
};

const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    'principiante': 'bg-green-100 text-green-700 border-green-300',
    'intermedio': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'avanzado': 'bg-red-100 text-red-700 border-red-300'
  };
  return colors[difficulty] || colors['intermedio'];
};

export const EjercicioCard: React.FC<EjercicioCardProps> = ({ ejercicio, index = 0, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(ejercicio.isFavorite);
  const categoryColors = getCategoryColor(ejercicio.category);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(ejercicio);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        whileHover={{ scale: 1.02, y: -8 }}
        onClick={() => setShowModal(true)}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group cursor-pointer"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

        {/* Decoración de fondo */}
        <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${categoryColors.gradient} opacity-5 rounded-full blur-2xl`}></div>

        {/* Image/Video Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {ejercicio.imageUrl ? (
            <img
              src={ejercicio.imageUrl}
              alt={ejercicio.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${categoryColors.gradient} flex items-center justify-center`}>
              <Dumbbell className="w-16 h-16 text-white/50" />
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl">
              <Play className="w-8 h-8 text-gray-900" fill="currentColor" />
            </div>
          </div>

          {/* Badges superiores */}
          <div className="absolute top-3 left-3 flex gap-2">
            {ejercicio.isNew && (
              <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3" />
                NUEVO
              </div>
            )}
            {ejercicio.isTrending && (
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <TrendingUp className="w-3 h-3" />
                TRENDING
              </div>
            )}
          </div>

          {/* Botón favorito */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-10"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          {/* Título */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
            {ejercicio.name}
          </h3>

          {/* Descripción */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {ejercicio.description}
          </p>

          {/* Badges - Categoría y Dificultad */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className={`px-3 py-1 ${categoryColors.badge} text-white text-xs font-bold rounded-full capitalize`}>
              {ejercicio.category}
            </div>
            <div className={`px-3 py-1 text-xs font-bold rounded-full border ${getDifficultyColor(ejercicio.difficulty)} capitalize`}>
              {ejercicio.difficulty}
            </div>
            <div className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
              {ejercicio.material}
            </div>
          </div>

          {/* Rating y Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(ejercicio.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm font-bold text-gray-700 ml-1">{ejercicio.rating}</span>
            </div>

            {/* Veces usado */}
            <div className="flex items-center gap-1">
              <div className="p-1 bg-indigo-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">{ejercicio.usageFrequency} veces</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de Detalles */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50 relative"
            >
              {/* Header con gradiente */}
              <div className={`bg-gradient-to-r ${categoryColors.gradient} p-6 relative overflow-hidden`}>
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">{ejercicio.name}</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        <span className="text-sm font-semibold text-white capitalize">{ejercicio.category}</span>
                      </div>
                      <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        <span className="text-sm font-semibold text-white capitalize">{ejercicio.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(ejercicio.rating) ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={handleEdit}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        title="Editar ejercicio"
                      >
                        <Edit className="w-5 h-5 text-white" />
                      </button>
                    )}
                    <button
                      onClick={() => setShowModal(false)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Video */}
                {ejercicio.videoUrl && (
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <div className="aspect-video">
                      <iframe
                        src={ejercicio.videoUrl}
                        title={`${ejercicio.name} video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Descripción */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{ejercicio.description}</p>
                </div>

                {/* Grupos Musculares */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Grupos Musculares</h3>
                  <div className="flex flex-wrap gap-2">
                    {ejercicio.muscleGroups.map((muscle, idx) => (
                      <div key={idx} className={`px-4 py-2 bg-gradient-to-r ${categoryColors.gradient} text-white rounded-xl text-sm font-semibold shadow-md`}>
                        {muscle}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instrucciones */}
                {ejercicio.instructions && ejercicio.instructions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Instrucciones</h3>
                    <ol className="space-y-2">
                      {ejercicio.instructions.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${categoryColors.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                            {idx + 1}
                          </div>
                          <p className="text-gray-700 pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Tips */}
                {ejercicio.tips && ejercicio.tips.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      Consejos Pro
                    </h3>
                    <ul className="space-y-2">
                      {ejercicio.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <p className="text-gray-700">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Variaciones */}
                {ejercicio.variations && ejercicio.variations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Variaciones</h3>
                    <div className="flex flex-wrap gap-2">
                      {ejercicio.variations.map((variation, idx) => (
                        <div key={idx} className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                          <span className="text-sm font-semibold text-purple-700">{variation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Popularidad</p>
                    <p className="text-2xl font-bold text-green-600">{ejercicio.popularity}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Veces Usado</p>
                    <p className="text-2xl font-bold text-indigo-600">{ejercicio.usageFrequency}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};