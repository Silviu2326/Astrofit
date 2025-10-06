import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Receta } from '../recetasBibliotecaApi';
import { Clock, ChefHat, Flame, Star, Heart, Play } from 'lucide-react';

interface RecetaCardProps {
  receta: Receta;
  onSelectReceta: (receta: Receta) => void;
}

export const RecetaCard: React.FC<RecetaCardProps> = ({ receta, onSelectReceta }) => {
  const [isFavorite, setIsFavorite] = useState(receta.isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'from-green-500 to-emerald-600';
      case 'Media':
        return 'from-orange-500 to-amber-600';
      case 'Difícil':
        return 'from-red-500 to-rose-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Desayuno':
        return 'from-yellow-500 to-orange-500';
      case 'Almuerzo':
        return 'from-blue-500 to-indigo-500';
      case 'Cena':
        return 'from-purple-500 to-pink-500';
      case 'Snack':
        return 'from-pink-500 to-rose-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelectReceta(receta)}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000 z-10"></div>

      {/* Imagen de la receta */}
      <div className="relative h-56 overflow-hidden">
        {receta.photoUrl && (
          <img src={receta.photoUrl} alt={receta.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        )}

        {/* Play overlay si tiene video */}
        {receta.videoUrl && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
              <Play className="w-8 h-8 text-pink-600 ml-1" />
            </div>
          </div>
        )}

        {/* Botón favorito */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg z-20"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} transition-colors duration-300`} />
        </motion.button>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {receta.badge && (
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1">
              <span>⭐</span>
              {receta.badge}
            </div>
          )}
          <div className={`px-3 py-1 bg-gradient-to-r ${getTypeColor(receta.type)} rounded-full text-white text-xs font-bold shadow-lg`}>
            {receta.type}
          </div>
          <div className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(receta.difficulty)} rounded-full text-white text-xs font-bold shadow-lg`}>
            {receta.difficulty}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Nombre */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{receta.name}</h3>

        {/* Info rápida */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-pink-600" />
            <span className="font-medium">{receta.prepTime + receta.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-600" />
            <span className="font-bold text-gray-900">{receta.nutritionalValues.calories} kcal</span>
          </div>
        </div>

        {/* Macros resumidos */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-2 border border-blue-100">
            <p className="text-xs text-gray-600 font-medium">Proteínas</p>
            <p className="text-lg font-bold text-blue-700">{receta.nutritionalValues.protein}g</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-2 border border-orange-100">
            <p className="text-xs text-gray-600 font-medium">Carbos</p>
            <p className="text-lg font-bold text-orange-700">{receta.nutritionalValues.carbs}g</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-2 border border-green-100">
            <p className="text-xs text-gray-600 font-medium">Grasas</p>
            <p className="text-lg font-bold text-green-700">{receta.nutritionalValues.fat}g</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < receta.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm font-bold text-gray-700 ml-1">{receta.rating}.0</span>
        </div>

        {/* Tags de restricciones */}
        {receta.restrictions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {receta.restrictions.map((restriction) => (
              <span
                key={restriction}
                className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full text-green-700 text-xs font-semibold border border-green-200"
              >
                {restriction}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
