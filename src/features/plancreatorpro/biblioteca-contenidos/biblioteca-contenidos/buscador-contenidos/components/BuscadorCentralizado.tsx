import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Mic, Sparkles } from 'lucide-react';
import { getSearchSuggestions } from '../buscadorContenidosApi';

const BuscadorCentralizado: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Búsquedas populares mockeadas
  const popularSearches = [
    'Nutrición deportiva',
    'Rutinas HIIT',
    'Meditación guiada',
    'Marketing digital',
    'Recetas saludables',
    'Yoga para principiantes'
  ];

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true);
      const fetchSuggestions = async () => {
        const res = await getSearchSuggestions(searchTerm) as string[];
        setSuggestions(res);
        setIsSearching(false);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory([searchTerm, ...searchHistory.slice(0, 4)]);
    }
    console.log('Searching for:', searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="relative">
      {/* BARRA DE BÚSQUEDA PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-2 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <form onSubmit={handleSearch} className="relative z-10 flex items-center gap-3">
          {/* Icono de búsqueda */}
          <div className="ml-4 p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Search className="w-6 h-6 text-white" />
          </div>

          {/* Input de búsqueda */}
          <input
            type="text"
            className="flex-1 px-4 py-4 text-lg bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
            placeholder="Busca artículos, videos, guías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Botón limpiar */}
          {searchTerm && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              type="button"
              onClick={clearSearch}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>
          )}

          {/* Botón de voz (decorativo) */}
          <button
            type="button"
            className="p-3 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
            title="Búsqueda por voz"
          >
            <Mic className="w-5 h-5 text-gray-500 group-hover:text-purple-600" />
          </button>

          {/* Botón de búsqueda con gradiente */}
          <button
            type="submit"
            className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group mr-2"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              Buscar
              {isSearching && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </span>
          </button>
        </form>

        {/* SUGERENCIAS DROPDOWN */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full left-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-2 max-h-96 overflow-y-auto">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-2">
                  Sugerencias
                </p>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setSuggestions([]);
                    }}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer rounded-xl transition-all duration-200 flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{suggestion}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* BÚSQUEDAS POPULARES */}
      {!searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Búsquedas Populares
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSearchTerm(search)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-full border border-indigo-200 hover:border-indigo-300 transition-all duration-200 group"
              >
                <span className="text-sm font-semibold text-indigo-700 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                  {search}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* HISTORIAL DE BÚSQUEDA */}
      {searchHistory.length > 0 && !searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/50"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Historial Reciente
              </h3>
            </div>
            <button
              onClick={clearHistory}
              className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
            >
              Limpiar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSearchTerm(item)}
                className="px-4 py-2 bg-white/80 hover:bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {item}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BuscadorCentralizado;
