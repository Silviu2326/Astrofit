import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Brain, Sparkles, Filter, Target, Users, Star, MapPin, 
  Calendar, Globe, Award, Activity, Zap, Shield, Heart, DollarSign, 
  Clock, ChevronDown, X, CheckCircle, AlertCircle, Info, 
  TrendingUp, TrendingDown, ArrowRight, RefreshCw
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface SemanticSearchProps {
  jugadores: Prospecto[];
  onSearchResults: (results: Prospecto[]) => void;
  onSearchChange: (query: string) => void;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'player' | 'position' | 'club' | 'nationality' | 'skill' | 'query';
  confidence: number;
  icon: React.ComponentType<any>;
}

interface SearchFilter {
  id: string;
  label: string;
  type: 'range' | 'select' | 'multiselect' | 'boolean';
  options?: string[];
  min?: number;
  max?: number;
  value: any;
}

const SemanticSearch: React.FC<SemanticSearchProps> = ({
  jugadores,
  onSearchResults,
  onSearchChange
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize filters
  useEffect(() => {
    const initialFilters: SearchFilter[] = [
      {
        id: 'edad',
        label: 'Edad',
        type: 'range',
        min: 16,
        max: 40,
        value: { min: 16, max: 40 }
      },
      {
        id: 'posicion',
        label: 'Posición',
        type: 'multiselect',
        options: ['Portero', 'Defensa', 'Mediocampista', 'Delantero'],
        value: []
      },
      {
        id: 'nivel',
        label: 'Nivel',
        type: 'multiselect',
        options: ['Bajo', 'Medio', 'Alto'],
        value: []
      },
      {
        id: 'potencial',
        label: 'Potencial',
        type: 'multiselect',
        options: ['Bajo', 'Medio', 'Alto', 'Estrella'],
        value: []
      },
      {
        id: 'estado',
        label: 'Estado',
        type: 'multiselect',
        options: ['seguimiento activo', 'en evaluación', 'descartado', 'fichado'],
        value: []
      },
      {
        id: 'nacionalidad',
        label: 'Nacionalidad',
        type: 'multiselect',
        options: Array.from(new Set(jugadores.map(j => j.nacionalidad))),
        value: []
      }
    ];
    setActiveFilters(initialFilters);
  }, [jugadores]);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const generateSuggestions = (): SearchSuggestion[] => {
      const suggestions: SearchSuggestion[] = [];
      const queryLower = query.toLowerCase();

      // Player name suggestions
      jugadores.forEach(jugador => {
        if (jugador.nombre.toLowerCase().includes(queryLower)) {
          suggestions.push({
            id: `player-${jugador.id}`,
            text: jugador.nombre,
            type: 'player',
            confidence: 95,
            icon: Users
          });
        }
      });

      // Position suggestions
      const positions = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];
      positions.forEach(pos => {
        if (pos.toLowerCase().includes(queryLower)) {
          suggestions.push({
            id: `position-${pos}`,
            text: pos,
            type: 'position',
            confidence: 90,
            icon: Target
          });
        }
      });

      // Club suggestions
      const clubs = Array.from(new Set(jugadores.map(j => j.clubActual)));
      clubs.forEach(club => {
        if (club.toLowerCase().includes(queryLower)) {
          suggestions.push({
            id: `club-${club}`,
            text: club,
            type: 'club',
            confidence: 85,
            icon: MapPin
          });
        }
      });

      // Skill suggestions
      const skills = ['velocidad', 'técnica', 'pase', 'tiro', 'defensa', 'liderazgo'];
      skills.forEach(skill => {
        if (skill.includes(queryLower)) {
          suggestions.push({
            id: `skill-${skill}`,
            text: skill,
            type: 'skill',
            confidence: 80,
            icon: Zap
          });
        }
      });

      // Natural language queries
      const naturalQueries = [
        'jugadores jóvenes con potencial',
        'estrellas del futuro',
        'defensores experimentados',
        'delanteros rápidos',
        'mediocampistas creativos'
      ];

      naturalQueries.forEach(nq => {
        if (nq.includes(queryLower)) {
          suggestions.push({
            id: `query-${nq}`,
            text: nq,
            type: 'query',
            confidence: 75,
            icon: Brain
          });
        }
      });

      return suggestions.slice(0, 8);
    };

    setSuggestions(generateSuggestions());
  }, [query, jugadores]);

  // Perform semantic search
  const performSearch = async (searchQuery: string, filters: SearchFilter[]) => {
    setIsSearching(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let results = [...jugadores];
    
    // Apply text search
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      results = results.filter(jugador => 
        jugador.nombre.toLowerCase().includes(queryLower) ||
        jugador.posicion.toLowerCase().includes(queryLower) ||
        jugador.clubActual.toLowerCase().includes(queryLower) ||
        jugador.nacionalidad.toLowerCase().includes(queryLower) ||
        jugador.caracteristicas.some(c => c.toLowerCase().includes(queryLower))
      );
    }
    
    // Apply filters
    filters.forEach(filter => {
      if (filter.value && (Array.isArray(filter.value) ? filter.value.length > 0 : filter.value !== '')) {
        switch (filter.id) {
          case 'edad':
            if (filter.value.min !== undefined && filter.value.max !== undefined) {
              results = results.filter(j => j.edad >= filter.value.min && j.edad <= filter.value.max);
            }
            break;
          case 'posicion':
            if (Array.isArray(filter.value) && filter.value.length > 0) {
              results = results.filter(j => filter.value.includes(j.posicion));
            }
            break;
          case 'nivel':
            if (Array.isArray(filter.value) && filter.value.length > 0) {
              results = results.filter(j => filter.value.includes(j.nivel));
            }
            break;
          case 'potencial':
            if (Array.isArray(filter.value) && filter.value.length > 0) {
              results = results.filter(j => filter.value.includes(j.potencial));
            }
            break;
          case 'estado':
            if (Array.isArray(filter.value) && filter.value.length > 0) {
              results = results.filter(j => filter.value.includes(j.estado));
            }
            break;
          case 'nacionalidad':
            if (Array.isArray(filter.value) && filter.value.length > 0) {
              results = results.filter(j => filter.value.includes(j.nacionalidad));
            }
            break;
        }
      }
    });
    
    onSearchResults(results);
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setSearchHistory(prev => [query, ...prev.filter(h => h !== query)].slice(0, 5));
    }
    performSearch(query, activeFilters);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    performSearch(suggestion.text, activeFilters);
  };

  const handleFilterChange = (filterId: string, value: any) => {
    setActiveFilters(prev => 
      prev.map(f => f.id === filterId ? { ...f, value } : f)
    );
  };

  const clearFilters = () => {
    setActiveFilters(prev => 
      prev.map(f => ({ ...f, value: Array.isArray(f.value) ? [] : f.type === 'range' ? { min: f.min, max: f.max } : '' }))
    );
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'player': return Users;
      case 'position': return Target;
      case 'club': return MapPin;
      case 'nationality': return Globe;
      case 'skill': return Zap;
      case 'query': return Brain;
      default: return Search;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'player': return 'text-blue-600 bg-blue-100';
      case 'position': return 'text-green-600 bg-green-100';
      case 'club': return 'text-purple-600 bg-purple-100';
      case 'nationality': return 'text-orange-600 bg-orange-100';
      case 'skill': return 'text-yellow-600 bg-yellow-100';
      case 'query': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Búsqueda Semántica IA</h2>
          <p className="text-gray-600">Encuentra jugadores con lenguaje natural y filtros inteligentes</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearchChange(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Buscar jugadores... (ej: 'delanteros jóvenes con potencial')"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => {
                const Icon = getSuggestionIcon(suggestion.type);
                return (
                  <motion.button
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSuggestionColor(suggestion.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{suggestion.text}</div>
                      <div className="text-sm text-gray-500 capitalize">{suggestion.type}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{suggestion.confidence}%</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Búsquedas Recientes</h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((history, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQuery(history);
                  performSearch(history, activeFilters);
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {history}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filtros Avanzados</h3>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Limpiar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl"
            >
              {activeFilters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{filter.label}</label>
                  
                  {filter.type === 'range' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={filter.value.min}
                          onChange={(e) => handleFilterChange(filter.id, { ...filter.value, min: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 rounded-lg border border-gray-300 text-sm"
                          placeholder="Min"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          value={filter.value.max}
                          onChange={(e) => handleFilterChange(filter.id, { ...filter.value, max: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 rounded-lg border border-gray-300 text-sm"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  )}
                  
                  {filter.type === 'multiselect' && (
                    <div className="space-y-2">
                      {filter.options?.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filter.value.includes(option)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...filter.value, option]
                                : filter.value.filter((v: string) => v !== option);
                              handleFilterChange(filter.id, newValue);
                            }}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI • Búsqueda semántica avanzada</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={isSearching}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {isSearching ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Buscar
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default SemanticSearch;



