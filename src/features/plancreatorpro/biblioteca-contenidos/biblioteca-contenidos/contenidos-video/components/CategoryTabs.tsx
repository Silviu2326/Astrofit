import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Dumbbell, Apple, Zap, Users, Grid } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { name: 'Todos', icon: Grid, color: 'from-gray-500 to-gray-600' },
    { name: 'Tutoriales', icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
    { name: 'Entrenamientos', icon: Dumbbell, color: 'from-red-500 to-pink-600' },
    { name: 'Nutrición', icon: Apple, color: 'from-green-500 to-emerald-600' },
    { name: 'Motivación', icon: Zap, color: 'from-yellow-500 to-orange-600' },
    { name: 'Webinars', icon: Users, color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Explorar por Categoría</h3>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.name;

          return (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.name)}
              className={`
                relative overflow-hidden px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2
                ${isActive
                  ? `bg-gradient-to-r ${category.color} text-white shadow-xl`
                  : 'bg-white/80 backdrop-blur-xl text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }
              `}
            >
              {/* Shimmer effect para tabs activos */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 hover:translate-x-full transition-all duration-1000"></div>
              )}

              <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="relative z-10">{category.name}</span>

              {/* Indicador de selección */}
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Playlists Curadas (opcional - se muestra solo en ciertas categorías) */}
      {(selectedCategory === 'Tutoriales' || selectedCategory === 'Entrenamientos') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Playlists Curadas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedCategory === 'Tutoriales' && (
              <>
                <PlaylistCard
                  title="Fundamentos de Nutrición"
                  videoCount={8}
                  thumbnail="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=225&fit=crop"
                  gradient="from-green-500 to-emerald-600"
                />
                <PlaylistCard
                  title="Técnicas de Entrenamiento"
                  videoCount={12}
                  thumbnail="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop"
                  gradient="from-red-500 to-pink-600"
                />
              </>
            )}
            {selectedCategory === 'Entrenamientos' && (
              <>
                <PlaylistCard
                  title="Serie de Entrenamiento"
                  videoCount={10}
                  thumbnail="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=225&fit=crop"
                  gradient="from-orange-500 to-red-600"
                />
                <PlaylistCard
                  title="HIIT Intensivo"
                  videoCount={6}
                  thumbnail="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=225&fit=crop"
                  gradient="from-purple-500 to-pink-600"
                />
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

interface PlaylistCardProps {
  title: string;
  videoCount: number;
  thumbnail: string;
  gradient: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, videoCount, thumbnail, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 cursor-pointer group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <BookOpen className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-bold">{videoCount} Videos</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">Playlist completa</p>
      </div>
    </motion.div>
  );
};

export default CategoryTabs;
