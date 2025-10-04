import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, TrendingUp } from 'lucide-react';

interface EjerciciosSearchProps {
  onSearch: (searchTerm: string) => void;
}

const SEARCH_SUGGESTIONS = [
  'Press Banca',
  'Sentadilla',
  'Dominadas',
  'Plancha',
  'Peso Muerto',
  'Curl Bíceps',
  'Press Militar',
  'Remo'
];

export const EjerciciosSearch: React.FC<EjerciciosSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(s =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        {/* Barra de búsqueda XL */}
        <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl transition-all duration-300 border ${isFocused ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20' : 'border-white/50'}`}>
          {/* Decoración de fondo */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 flex items-center p-2 md:p-3">
            {/* Icono de búsqueda animado */}
            <motion.div
              animate={isFocused ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 ml-3 md:ml-4"
            >
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Search className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
            </motion.div>

            {/* Input */}
            <input
              type="text"
              placeholder="Buscar ejercicios por nombre, descripción o músculo..."
              className="flex-1 px-4 md:px-6 py-4 text-base md:text-lg bg-transparent outline-none text-gray-900 placeholder-gray-500 font-medium"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => {
                setIsFocused(true);
                if (searchTerm.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                // Delay para permitir click en sugerencias
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />

            {/* Botón limpiar */}
            {searchTerm && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="flex-shrink-0 mr-3 md:mr-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            )}
          </div>

          {/* Contador de resultados o mensaje */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-3"
            >
              <p className="text-sm text-gray-600">
                Buscando: <span className="font-bold text-indigo-600">{searchTerm}</span>
              </p>
            </motion.div>
          )}
        </div>

        {/* Sugerencias de búsqueda */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden z-20"
          >
            <div className="p-3">
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Búsquedas populares</span>
              </div>
              <div className="space-y-1">
                {filteredSuggestions.slice(0, 6).map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 group-hover:bg-indigo-100 rounded-lg transition-colors">
                        <Search className="w-4 h-4 text-gray-600 group-hover:text-indigo-600" />
                      </div>
                      <span className="text-gray-700 group-hover:text-indigo-900 font-medium">{suggestion}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Búsquedas rápidas (chips) */}
      {!searchTerm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          <span className="text-sm font-semibold text-gray-600">Búsquedas rápidas:</span>
          {SEARCH_SUGGESTIONS.slice(0, 5).map((suggestion, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white text-gray-700 rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-transparent"
            >
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
