import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RecetasGrid } from './components/RecetasGrid';
import { RecetasFilters } from './components/RecetasFilters';
import { RecetaViewer } from './components/RecetaViewer';
import { Receta, fetchRecetas } from './recetasBibliotecaApi';
import { BookOpen, Heart, FolderOpen, TrendingUp, Plus, SlidersHorizontal, Coffee, Sun, Moon, Cookie, ArrowUpDown } from 'lucide-react';

const RecetasBibliotecaPage: React.FC = () => {
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [allRecetas, setAllRecetas] = useState<Receta[]>([]);
  const [sortBy, setSortBy] = useState<'alphabetic' | 'popular' | 'time' | 'calories'>('popular');
  const [filters, setFilters] = useState<{
    search: string;
    type: string;
    prepTime: string;
    difficulty: string;
    restrictions: string[];
    caloriesRange: string;
    macroType: string;
  }>({
    search: '',
    type: '',
    prepTime: '',
    difficulty: '',
    restrictions: [],
    caloriesRange: '',
    macroType: '',
  });

  useEffect(() => {
    fetchRecetas().then(setAllRecetas);
  }, []);

  const filteredRecetas = allRecetas.filter((receta) => {
    const matchesSearch =
      receta.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      receta.ingredients.some((ing) => ing.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesType = filters.type === '' || receta.type === filters.type;
    const matchesDifficulty = filters.difficulty === '' || receta.difficulty === filters.difficulty;
    const matchesPrepTime =
      filters.prepTime === '' ||
      (filters.prepTime === '0-15' && receta.prepTime <= 15) ||
      (filters.prepTime === '15-30' && receta.prepTime > 15 && receta.prepTime <= 30) ||
      (filters.prepTime === '30-60' && receta.prepTime > 30 && receta.prepTime <= 60) ||
      (filters.prepTime === '60+' && receta.prepTime > 60);
    const matchesRestrictions =
      filters.restrictions.length === 0 ||
      filters.restrictions.some((r) => receta.restrictions.includes(r));
    const matchesCalories =
      filters.caloriesRange === '' ||
      (filters.caloriesRange === '0-200' && receta.nutritionalValues.calories <= 200) ||
      (filters.caloriesRange === '200-400' && receta.nutritionalValues.calories > 200 && receta.nutritionalValues.calories <= 400) ||
      (filters.caloriesRange === '400-600' && receta.nutritionalValues.calories > 400 && receta.nutritionalValues.calories <= 600) ||
      (filters.caloriesRange === '600+' && receta.nutritionalValues.calories > 600);
    const matchesMacros =
      filters.macroType === '' ||
      (filters.macroType === 'alta-proteina' && receta.nutritionalValues.protein >= 25) ||
      (filters.macroType === 'bajo-carbos' && receta.nutritionalValues.carbs <= 30) ||
      (filters.macroType === 'bajo-grasas' && receta.nutritionalValues.fat <= 10);

    return matchesSearch && matchesType && matchesDifficulty && matchesPrepTime && matchesRestrictions && matchesCalories && matchesMacros;
  });

  // Ordenar recetas
  const sortedRecetas = [...filteredRecetas].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetic':
        return a.name.localeCompare(b.name);
      case 'popular':
        return b.rating - a.rating;
      case 'time':
        return (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime);
      case 'calories':
        return a.nutritionalValues.calories - b.nutritionalValues.calories;
      default:
        return 0;
    }
  });

  const stats = [
    { title: 'Total de Recetas', value: allRecetas.length, icon: BookOpen, gradient: 'from-pink-500 to-rose-600' },
    { title: 'Recetas Favoritas', value: allRecetas.filter((r) => r.isFavorite).length, icon: Heart, gradient: 'from-rose-500 to-red-600' },
    { title: 'Categorías', value: 4, icon: FolderOpen, gradient: 'from-red-500 to-orange-600' },
    { title: 'Más Usadas', value: Math.floor(allRecetas.length * 0.3), icon: TrendingUp, gradient: 'from-orange-500 to-amber-600' },
  ];

  const categories = [
    { type: 'Desayuno', icon: Coffee, count: allRecetas.filter(r => r.type === 'Desayuno').length, gradient: 'from-yellow-500 to-orange-500' },
    { type: 'Almuerzo', icon: Sun, count: allRecetas.filter(r => r.type === 'Almuerzo').length, gradient: 'from-blue-500 to-indigo-500' },
    { type: 'Cena', icon: Moon, count: allRecetas.filter(r => r.type === 'Cena').length, gradient: 'from-purple-500 to-pink-500' },
    { type: 'Snack', icon: Cookie, count: allRecetas.filter(r => r.type === 'Snack').length, gradient: 'from-pink-500 to-rose-500' },
  ];

  const featuredRecetas = allRecetas.filter(r => r.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <BookOpen className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Biblioteca de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Recetas Saludables</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed mb-6">
            Descubre recetas deliciosas y nutritivas para tu día a día
          </p>

          {/* Barra de búsqueda destacada */}
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar recetas, ingredientes..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-pink-200 focus:border-white focus:ring-4 focus:ring-white/20 transition-all duration-300 outline-none text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70">🔍</div>
            </div>
          </div>

          {/* Contador de recetas */}
          <div className="mt-6 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 inline-flex">
            <span className="text-sm font-semibold text-white">{sortedRecetas.length} recetas disponibles</span>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">{stat.title}</p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Categorías Visuales */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explorar por Categoría</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setFilters({ ...filters, type: filters.type === category.type ? '' : category.type })}
              className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 group ${
                filters.type === category.type
                  ? `bg-gradient-to-br ${category.gradient}`
                  : 'bg-white/80 backdrop-blur-xl border border-white/50'
              }`}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg ${
                  filters.type === category.type
                    ? 'bg-white/20 text-white'
                    : `bg-gradient-to-br ${category.gradient} text-white`
                }`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className={`text-lg font-bold mb-1 ${
                  filters.type === category.type ? 'text-white' : 'text-gray-800'
                }`}>
                  {category.type}
                </h3>
                <p className={`text-sm font-semibold ${
                  filters.type === category.type ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {category.count} recetas
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recetas Destacadas */}
      {featuredRecetas.length > 0 && !filters.search && !filters.type && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-pink-600" />
            Recetas Destacadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecetas.map((receta, index) => (
              <motion.div
                key={receta.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -8 }}
                onClick={() => setSelectedReceta(receta)}
                className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000 z-10"></div>

                <div className="relative h-48 overflow-hidden">
                  {receta.photoUrl && (
                    <img src={receta.photoUrl} alt={receta.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                  {receta.badge && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-xs font-bold shadow-lg z-20">
                      {receta.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{receta.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>{receta.prepTime + receta.cookTime} min</span>
                    <span>•</span>
                    <span className="font-bold">{receta.nutritionalValues.calories} kcal</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Botón flotante para filtros en móvil */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <SlidersHorizontal className="w-5 h-5" />
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtros */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <RecetasFilters currentFilters={filters} onApplyFilters={setFilters} />
        </div>

        {/* Grid de Recetas */}
        <div className="lg:w-3/4">
          {/* Barra de ordenamiento */}
          <div className="mb-6 flex items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-white/50">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-pink-600" />
              <span className="font-semibold text-gray-700">Ordenar por:</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  sortBy === 'popular'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Popularidad
              </button>
              <button
                onClick={() => setSortBy('alphabetic')}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  sortBy === 'alphabetic'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                A-Z
              </button>
              <button
                onClick={() => setSortBy('time')}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  sortBy === 'time'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tiempo
              </button>
              <button
                onClick={() => setSortBy('calories')}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  sortBy === 'calories'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Calorías
              </button>
            </div>
          </div>

          <RecetasGrid recetas={sortedRecetas} onSelectReceta={setSelectedReceta} />
        </div>
      </div>

      {/* Modal Visor de Receta */}
      {selectedReceta && (
        <RecetaViewer receta={selectedReceta} onClose={() => setSelectedReceta(null)} />
      )}

      {/* Botón flotante Nueva Receta */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-pink-600 to-rose-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-pink-500/50 transition-all duration-300 z-40"
        onClick={() => alert('Funcionalidad de agregar receta (no implementada)')}
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </div>
  );
};

export default RecetasBibliotecaPage;
