import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCategorias } from '../blogNoticiasApi';
import { Search, Filter, X } from 'lucide-react';

interface CategoriasFiltroProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CategoriasFiltro: React.FC<CategoriasFiltroProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm
}) => {
  const [categorias, setCategorias] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getCategorias();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const categoryColors: { [key: string]: string } = {
    'Todas': 'from-gray-500 to-gray-600',
    'tips fitness': 'from-blue-500 to-indigo-600',
    'nutrición': 'from-green-500 to-emerald-600',
    'noticias personales': 'from-purple-500 to-pink-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl text-white">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Filtros y Búsqueda</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Búsqueda */}
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
              Buscar Artículos
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="search"
                className="w-full pl-12 pr-12 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                placeholder="Buscar por título o contenido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Categorías como Pills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categorías
            </label>
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <motion.button
                  key={categoria}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(categoria)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === categoria
                      ? `bg-gradient-to-r ${categoryColors[categoria] || 'from-violet-500 to-fuchsia-600'} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoria}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores activos */}
        {(searchTerm || selectedCategory !== 'Todas') && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Filtros activos:</span>
              {searchTerm && (
                <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-violet-900">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {selectedCategory !== 'Todas' && (
                <div className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium flex items-center gap-2">
                  <Filter className="w-3 h-3" />
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('Todas')} className="hover:text-fuchsia-900">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todas');
                }}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium underline"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoriasFiltro;
