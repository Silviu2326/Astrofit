import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Clock, Users, Zap, Heart, Flame, Sun, Moon, Leaf } from 'lucide-react';
import { Recipe } from '../types';

interface VisualRecipeGalleryProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  onRecipeAdd: (recipe: Recipe) => void;
  className?: string;
}

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'high-protein' | 'low-carb' | 'vegan' | 'quick';

const filterOptions = [
  { id: 'all', label: 'Todas', icon: Grid, color: 'gray' },
  { id: 'breakfast', label: 'Desayuno', icon: Sun, color: 'yellow' },
  { id: 'lunch', label: 'Almuerzo', icon: Users, color: 'blue' },
  { id: 'dinner', label: 'Cena', icon: Moon, color: 'purple' },
  { id: 'snack', label: 'Snack', icon: Zap, color: 'green' },
  { id: 'high-protein', label: 'Alta Proteína', icon: Flame, color: 'red' },
  { id: 'low-carb', label: 'Bajo Carbos', icon: Leaf, color: 'emerald' },
  { id: 'vegan', label: 'Vegano', icon: Heart, color: 'pink' },
  { id: 'quick', label: 'Rápido', icon: Clock, color: 'orange' }
];

export const VisualRecipeGallery: React.FC<VisualRecipeGalleryProps> = ({
  recipes,
  onRecipeSelect,
  onRecipeAdd,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<'name' | 'calories' | 'protein' | 'time'>('name');

  // Filtrar y ordenar recetas
  const filteredRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || 
        (activeFilter === 'breakfast' && recipe.tipoComida === 'desayuno') ||
        (activeFilter === 'lunch' && recipe.tipoComida === 'almuerzo') ||
        (activeFilter === 'dinner' && recipe.tipoComida === 'cena') ||
        (activeFilter === 'snack' && recipe.tipoComida === 'snack') ||
        (activeFilter === 'high-protein' && recipe.macros.proteinas > 25) ||
        (activeFilter === 'low-carb' && recipe.macros.carbohidratos < 30) ||
        (activeFilter === 'vegan' && recipe.vegano) ||
        (activeFilter === 'quick' && recipe.tiempoPreparacion <= 15);

      return matchesSearch && matchesFilter;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.nombre.localeCompare(b.nombre);
        case 'calories':
          return b.calorias - a.calorias;
        case 'protein':
          return b.macros.proteinas - a.macros.proteinas;
        case 'time':
          return a.tiempoPreparacion - b.tiempoPreparacion;
        default:
          return 0;
      }
    });

    return filtered;
  }, [recipes, searchTerm, activeFilter, sortBy]);

  const getMacroColor = (macro: string, value: number) => {
    switch (macro) {
      case 'proteinas':
        return value > 20 ? 'text-red-600' : value > 15 ? 'text-orange-600' : 'text-gray-600';
      case 'carbohidratos':
        return value > 50 ? 'text-amber-600' : value > 30 ? 'text-yellow-600' : 'text-gray-600';
      case 'grasas':
        return value > 15 ? 'text-purple-600' : value > 10 ? 'text-indigo-600' : 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const RecipeCard: React.FC<{ recipe: Recipe; index: number }> = ({ recipe, index }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={() => onRecipeSelect(recipe)}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
        {/* Imagen de la receta */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.imagen || '/api/placeholder/300/200'}
            alt={recipe.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay con información rápida */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{recipe.tiempoPreparacion} min</span>
                <Users className="w-4 h-4 ml-2" />
                <span className="text-sm font-medium">{recipe.porciones} porciones</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {recipe.vegano && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                🌱 Vegano
              </span>
            )}
            {recipe.sinGluten && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                🌾 Sin Gluten
              </span>
            )}
            {recipe.macros.proteinas > 25 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                💪 Alta Proteína
              </span>
            )}
          </div>

          {/* Favorito */}
          <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Contenido de la card */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {recipe.nombre}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.descripcion}
          </p>

          {/* Macros visuales */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{recipe.calorias}</div>
              <div className="text-xs text-gray-500">kcal</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${getMacroColor('proteinas', recipe.macros.proteinas)}`}>
                {recipe.macros.proteinas}g
              </div>
              <div className="text-xs text-gray-500">P</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${getMacroColor('carbohidratos', recipe.macros.carbohidratos)}`}>
                {recipe.macros.carbohidratos}g
              </div>
              <div className="text-xs text-gray-500">C</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${getMacroColor('grasas', recipe.macros.grasas)}`}>
                {recipe.macros.grasas}g
              </div>
              <div className="text-xs text-gray-500">G</div>
            </div>
          </div>

          {/* Barra de progreso de macros */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((recipe.macros.proteinas / 30) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((recipe.macros.carbohidratos / 60) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((recipe.macros.grasas / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onRecipeAdd(recipe);
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Añadir Receta
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con controles */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar recetas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Filtros */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as FilterType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Nombre</option>
            <option value="calories">Calorías</option>
            <option value="protein">Proteínas</option>
            <option value="time">Tiempo</option>
          </select>

          {/* Vista */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map(option => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id as FilterType)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === option.id
                  ? `bg-${option.color}-500 text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Grid de recetas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${activeFilter}-${searchTerm}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Estado vacío */}
      {filteredRecipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron recetas</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Limpiar filtros
          </button>
        </motion.div>
      )}
    </div>
  );
};
