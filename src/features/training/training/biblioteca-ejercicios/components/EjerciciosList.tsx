import React from 'react';
import { motion } from 'framer-motion';
import { Search, Frown, Heart, Play, Star, Dumbbell, TrendingUp, Sparkles } from 'lucide-react';
import { Ejercicio } from '../bibliotecaEjerciciosApi';

interface EjerciciosListProps {
  ejercicios: Ejercicio[];
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

export const EjerciciosList: React.FC<EjerciciosListProps> = ({ ejercicios }) => {
  if (ejercicios.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 max-w-md w-full text-center relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            {/* Icono animado */}
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6 shadow-xl"
            >
              <Search className="w-10 h-10" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No se encontraron ejercicios
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              No hay ejercicios que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros o buscar con otros términos.
            </p>

            {/* Sugerencias */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-sm font-semibold text-gray-700 mb-2">Sugerencias:</p>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Usa palabras más generales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Reduce los filtros aplicados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Revisa la ortografía</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 uppercase tracking-wide">
          <div className="col-span-4">Ejercicio</div>
          <div className="col-span-2">Categoría</div>
          <div className="col-span-2">Dificultad</div>
          <div className="col-span-2">Material</div>
          <div className="col-span-1">Rating</div>
          <div className="col-span-1">Uso</div>
        </div>
      </div>

      {/* Lista de ejercicios */}
      <div className="divide-y divide-gray-100">
        {ejercicios.map((ejercicio, index) => {
          const categoryColors = getCategoryColor(ejercicio.category);
          
          return (
            <motion.div
              key={ejercicio.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.02)' }}
              className="grid grid-cols-12 gap-4 p-6 hover:bg-blue-50/30 transition-colors duration-200 group cursor-pointer"
            >
              {/* Ejercicio - Imagen, nombre y descripción */}
              <div className="col-span-4 flex items-center gap-4">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                  {ejercicio.imageUrl ? (
                    <img
                      src={ejercicio.imageUrl}
                      alt={ejercicio.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${categoryColors.gradient} flex items-center justify-center`}>
                      <Dumbbell className="w-6 h-6 text-white/70" />
                    </div>
                  )}
                  
                  {/* Play overlay */}
                  {ejercicio.videoUrl && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <Play className="w-4 h-4 text-gray-900" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info del ejercicio */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                      {ejercicio.name}
                    </h3>
                    {ejercicio.isNew && (
                      <div className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        NUEVO
                      </div>
                    )}
                    {ejercicio.isTrending && (
                      <div className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        TRENDING
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {ejercicio.description}
                  </p>
                  
                  {/* Músculos objetivo */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ejercicio.muscleGroups.slice(0, 2).map((muscle, idx) => (
                      <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {muscle}
                      </span>
                    ))}
                    {ejercicio.muscleGroups.length > 2 && (
                      <span className="text-xs text-gray-400">
                        +{ejercicio.muscleGroups.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Categoría */}
              <div className="col-span-2 flex items-center">
                <div className={`px-3 py-1 ${categoryColors.badge} text-white text-sm font-bold rounded-full capitalize`}>
                  {ejercicio.category}
                </div>
              </div>

              {/* Dificultad */}
              <div className="col-span-2 flex items-center">
                <div className={`px-3 py-1 text-sm font-bold rounded-full border ${getDifficultyColor(ejercicio.difficulty)} capitalize`}>
                  {ejercicio.difficulty}
                </div>
              </div>

              {/* Material */}
              <div className="col-span-2 flex items-center">
                <div className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                  {ejercicio.material}
                </div>
              </div>

              {/* Rating */}
              <div className="col-span-1 flex items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-gray-700">{ejercicio.rating}</span>
                </div>
              </div>

              {/* Uso */}
              <div className="col-span-1 flex items-center justify-end">
                <div className="flex items-center gap-1">
                  <div className="p-1 bg-indigo-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{ejercicio.usageFrequency}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


