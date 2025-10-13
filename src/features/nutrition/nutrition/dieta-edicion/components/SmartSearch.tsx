import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Mic, 
  MicOff, 
  X, 
  Clock, 
  TrendingUp, 
  Target,
  Zap,
  Star,
  Heart,
  Flame,
  Leaf,
  Beef,
  Apple,
  Coffee,
  Sparkles,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { Recipe, Comida } from '../types';

interface SearchResult {
  id: string;
  type: 'recipe' | 'ingredient' | 'meal' | 'goal' | 'note';
  title: string;
  description: string;
  relevance: number;
  category: string;
  tags: string[];
  macros?: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    calorias: number;
  };
  image?: string;
  isFavorite?: boolean;
  isRecent?: boolean;
  isRecommended?: boolean;
}

interface SmartSearchProps {
  onResultSelect: (result: SearchResult) => void;
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
}

interface SearchFilters {
  category: string[];
  macros: {
    minProtein: number;
    maxProtein: number;
    minCarbs: number;
    maxCarbs: number;
    minFats: number;
    maxFats: number;
    minCalories: number;
    maxCalories: number;
  };
  timeRange: {
    min: number;
    max: number;
  };
  difficulty: string[];
  dietary: string[];
  ingredients: string[];
}

interface SearchSuggestion {
  text: string;
  type: 'recent' | 'popular' | 'recommended' | 'trending';
  icon: React.ReactNode;
  category: string;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  onResultSelect,
  onSearch,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    category: [],
    macros: {
      minProtein: 0,
      maxProtein: 200,
      minCarbs: 0,
      maxCarbs: 300,
      minFats: 0,
      maxFats: 100,
      minCalories: 0,
      maxCalories: 2000
    },
    timeRange: { min: 0, max: 120 },
    difficulty: [],
    dietary: [],
    ingredients: []
  });
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Mock de sugerencias inteligentes
  const suggestions: SearchSuggestion[] = useMemo(() => [
    {
      text: 'Recetas altas en proteína',
      type: 'popular',
      icon: <Beef className="w-4 h-4" />,
      category: 'macros'
    },
    {
      text: 'Desayunos rápidos',
      type: 'trending',
      icon: <Coffee className="w-4 h-4" />,
      category: 'time'
    },
    {
      text: 'Comidas para ganar músculo',
      type: 'recommended',
      icon: <Target className="w-4 h-4" />,
      category: 'goal'
    },
    {
      text: 'Snacks saludables',
      type: 'popular',
      icon: <Apple className="w-4 h-4" />,
      category: 'type'
    },
    {
      text: 'Recetas veganas',
      type: 'trending',
      icon: <Leaf className="w-4 h-4" />,
      category: 'dietary'
    },
    {
      text: 'Comidas para perder peso',
      type: 'recommended',
      icon: <TrendingUp className="w-4 h-4" />,
      category: 'goal'
    }
  ], []);

  // Mock de resultados de búsqueda
  const mockResults: SearchResult[] = useMemo(() => [
    {
      id: '1',
      type: 'recipe',
      title: 'Bowl de quinoa con pollo',
      description: 'Alto en proteínas, perfecto para post-entrenamiento',
      relevance: 95,
      category: 'Almuerzo',
      tags: ['proteína', 'post-entrenamiento', 'quinoa'],
      macros: { proteinas: 35, carbohidratos: 45, grasas: 12, calorias: 420 },
      image: '/api/placeholder/200/150',
      isFavorite: true,
      isRecommended: true
    },
    {
      id: '2',
      type: 'recipe',
      title: 'Avena nocturna con frutas',
      description: 'Desayuno preparado la noche anterior, rico en fibra',
      relevance: 88,
      category: 'Desayuno',
      tags: ['fibra', 'preparación', 'frutas'],
      macros: { proteinas: 15, carbohidratos: 55, grasas: 8, calorias: 320 },
      image: '/api/placeholder/200/150',
      isRecent: true
    },
    {
      id: '3',
      type: 'ingredient',
      title: 'Quinoa',
      description: 'Superalimento rico en proteínas completas',
      relevance: 82,
      category: 'Ingrediente',
      tags: ['proteína', 'superalimento', 'gluten-free'],
      macros: { proteinas: 14, carbohidratos: 64, grasas: 6, calorias: 368 },
      isFavorite: false
    },
    {
      id: '4',
      type: 'meal',
      title: 'Plan de comidas para definición',
      description: 'Plan completo de 7 días para fase de definición muscular',
      relevance: 90,
      category: 'Plan',
      tags: ['definición', 'plan completo', '7 días'],
      isRecommended: true
    }
  ], []);

  // Filtros avanzados
  const filterCategories = [
    { id: 'breakfast', label: 'Desayuno', icon: <Coffee className="w-4 h-4" />, color: 'yellow' },
    { id: 'lunch', label: 'Almuerzo', icon: <Target className="w-4 h-4" />, color: 'blue' },
    { id: 'dinner', label: 'Cena', icon: <Moon className="w-4 h-4" />, color: 'purple' },
    { id: 'snack', label: 'Snack', icon: <Apple className="w-4 h-4" />, color: 'green' },
    { id: 'high-protein', label: 'Alta Proteína', icon: <Beef className="w-4 h-4" />, color: 'red' },
    { id: 'low-carb', label: 'Bajo Carbos', icon: <Leaf className="w-4 h-4" />, color: 'emerald' },
    { id: 'vegan', label: 'Vegano', icon: <Leaf className="w-4 h-4" />, color: 'green' },
    { id: 'quick', label: 'Rápido', icon: <Zap className="w-4 h-4" />, color: 'orange' }
  ];

  const dietaryOptions = [
    { id: 'vegan', label: 'Vegano', icon: <Leaf className="w-4 h-4" /> },
    { id: 'vegetarian', label: 'Vegetariano', icon: <Apple className="w-4 h-4" /> },
    { id: 'gluten-free', label: 'Sin Gluten', icon: <X className="w-4 h-4" /> },
    { id: 'keto', label: 'Keto', icon: <Flame className="w-4 h-4" /> },
    { id: 'paleo', label: 'Paleo', icon: <Beef className="w-4 h-4" /> }
  ];

  const difficultyOptions = [
    { id: 'beginner', label: 'Principiante', color: 'green' },
    { id: 'intermediate', label: 'Intermedio', color: 'yellow' },
    { id: 'advanced', label: 'Avanzado', color: 'red' }
  ];

  // Búsqueda por voz
  const startVoiceSearch = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'es-ES';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  }, []);

  // Manejar búsqueda
  const handleSearch = useCallback((searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);

    // Simular búsqueda con delay
    setTimeout(() => {
      const filteredResults = mockResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = activeFilters.category.length === 0 ||
                               activeFilters.category.some(cat => result.category.toLowerCase().includes(cat));

        return matchesQuery && matchesCategory;
      });

      setSearchResults(filteredResults);
      setIsSearching(false);

      // Añadir a historial
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory(prev => [searchQuery, ...prev.slice(0, 9)]);
      }

      onSearch(searchQuery, activeFilters);
    }, 500);
  }, [query, activeFilters, mockResults, searchHistory, onSearch]);

  // Manejar selección de sugerencia
  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    handleSearch(suggestion.text);
  }, [handleSearch]);

  // Manejar selección de resultado
  const handleResultClick = useCallback((result: SearchResult) => {
    onResultSelect(result);
  }, [onResultSelect]);

  // Manejar filtros
  const toggleFilter = useCallback((filterType: keyof SearchFilters, value: string) => {
    setActiveFilters(prev => {
      const currentArray = prev[filterType] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [filterType]: newArray
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({
      category: [],
      macros: {
        minProtein: 0,
        maxProtein: 200,
        minCarbs: 0,
        maxCarbs: 300,
        minFats: 0,
        maxFats: 100,
        minCalories: 0,
        maxCalories: 2000
      },
      timeRange: { min: 0, max: 120 },
      difficulty: [],
      dietary: [],
      ingredients: []
    });
  }, []);

  // Auto-completado
  useEffect(() => {
    if (query.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const SearchBar: React.FC = () => (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Buscar recetas, ingredientes, planes..."
          className="w-full pl-12 pr-20 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isListening && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-3 h-3 bg-red-500 rounded-full"
            />
          )}
          <button
            onClick={startVoiceSearch}
            disabled={isListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-100 text-red-600' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Sugerencias */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            {/* Sugerencias inteligentes */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Sugerencias inteligentes
              </h3>
              <div className="space-y-2">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    {suggestion.icon}
                    <span className="text-gray-900">{suggestion.text}</span>
                    <span className="ml-auto text-xs text-gray-500 capitalize">
                      {suggestion.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Historial de búsquedas */}
            {searchHistory.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Búsquedas recientes
                </h3>
                <div className="space-y-1">
                  {searchHistory.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(search);
                        handleSearch(search);
                      }}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left text-sm text-gray-600"
                    >
                      <Search className="w-4 h-4" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterPanel: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros Avanzados
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Limpiar todo
        </button>
      </div>

      {/* Categorías */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Categorías</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {filterCategories.map(category => (
            <button
              key={category.id}
              onClick={() => toggleFilter('category', category.id)}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                activeFilters.category.includes(category.id)
                  ? `border-${category.color}-300 bg-${category.color}-50 text-${category.color}-700`
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {category.icon}
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Macros */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Macros</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Proteínas (g)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={activeFilters.macros.minProtein}
                onChange={(e) => setActiveFilters(prev => ({
                  ...prev,
                  macros: { ...prev.macros, minProtein: Number(e.target.value) }
                }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={activeFilters.macros.maxProtein}
                onChange={(e) => setActiveFilters(prev => ({
                  ...prev,
                  macros: { ...prev.macros, maxProtein: Number(e.target.value) }
                }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Calorías</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={activeFilters.macros.minCalories}
                onChange={(e) => setActiveFilters(prev => ({
                  ...prev,
                  macros: { ...prev.macros, minCalories: Number(e.target.value) }
                }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={activeFilters.macros.maxCalories}
                onChange={(e) => setActiveFilters(prev => ({
                  ...prev,
                  macros: { ...prev.macros, maxCalories: Number(e.target.value) }
                }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Restricciones dietéticas */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Restricciones Dietéticas</h4>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map(option => (
            <button
              key={option.id}
              onClick={() => toggleFilter('dietary', option.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                activeFilters.dietary.includes(option.id)
                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {option.icon}
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dificultad */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Dificultad</h4>
        <div className="flex gap-2">
          {difficultyOptions.map(option => (
            <button
              key={option.id}
              onClick={() => toggleFilter('difficulty', option.id)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                activeFilters.difficulty.includes(option.id)
                  ? `border-${option.color}-300 bg-${option.color}-50 text-${option.color}-700`
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const SearchResults: React.FC = () => (
    <div className="space-y-4">
      {isSearching ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
          />
          <span className="ml-3 text-gray-600">Buscando...</span>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map(result => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => handleResultClick(result)}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{result.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{result.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {result.category}
                    </span>
                    {result.isFavorite && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        <Heart className="w-3 h-3 inline mr-1" />
                        Favorito
                      </span>
                    )}
                    {result.isRecommended && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        <Star className="w-3 h-3 inline mr-1" />
                        Recomendado
                      </span>
                    )}
                  </div>
                </div>
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
              </div>

              {result.macros && (
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-red-600">{result.macros.proteinas}g</div>
                    <div className="text-xs text-gray-500">Proteína</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-600">{result.macros.carbohidratos}g</div>
                    <div className="text-xs text-gray-500">Carbos</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{result.macros.grasas}g</div>
                    <div className="text-xs text-gray-500">Grasas</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{result.macros.calorias}</div>
                    <div className="text-xs text-gray-500">Calorías</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {result.relevance}% relevancia
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : query && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar los filtros o usar términos de búsqueda diferentes
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Panel de filtros */}
      <FilterPanel />

      {/* Resultados */}
      <SearchResults />
    </div>
  );
};


