import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Tag, 
  Calendar,
  TrendingUp,
  DollarSign,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface BusquedaGlobalProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  onClear: () => void;
  isLoading?: boolean;
}

interface SearchFilters {
  tipo: 'todos' | 'nombre' | 'email' | 'telefono' | 'ubicacion' | 'etiquetas';
  fechaInicio?: string;
  fechaFin?: string;
  valorMin?: number;
  valorMax?: number;
  estado?: string[];
  etiquetas?: string[];
  ubicacion?: string;
  fuente?: string;
  satisfaccion?: number;
  riesgo?: 'bajo' | 'medio' | 'alto';
}

interface SugerenciaBusqueda {
  id: string;
  tipo: 'cliente' | 'etiqueta' | 'ubicacion' | 'fecha';
  texto: string;
  subtitulo?: string;
  icono: React.ReactNode;
  accion: () => void;
}

const BusquedaGlobal: React.FC<BusquedaGlobalProps> = ({ onSearch, onClear, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    tipo: 'todos'
  });
  const [sugerencias, setSugerencias] = useState<SugerenciaBusqueda[]>([]);
  const [historial, setHistorial] = useState<string[]>([]);

  // Sugerencias inteligentes basadas en la query
  useEffect(() => {
    if (query.length > 1) {
      const nuevasSugerencias: SugerenciaBusqueda[] = [
        {
          id: '1',
          tipo: 'cliente',
          texto: `Buscar clientes que contengan "${query}"`,
          subtitulo: 'En nombre, email o teléfono',
          icono: <User className="w-4 h-4" />,
          accion: () => {
            setFilters(prev => ({ ...prev, tipo: 'todos' }));
            handleSearch(query);
          }
        },
        {
          id: '2',
          tipo: 'etiqueta',
          texto: `Filtrar por etiqueta "${query}"`,
          subtitulo: 'Mostrar solo clientes con esta etiqueta',
          icono: <Tag className="w-4 h-4" />,
          accion: () => {
            setFilters(prev => ({ ...prev, etiquetas: [query] }));
            handleSearch(query);
          }
        },
        {
          id: '3',
          tipo: 'ubicacion',
          texto: `Buscar en "${query}"`,
          subtitulo: 'Filtrar por ubicación',
          icono: <MapPin className="w-4 h-4" />,
          accion: () => {
            setFilters(prev => ({ ...prev, ubicacion: query }));
            handleSearch(query);
          }
        }
      ];
      setSugerencias(nuevasSugerencias);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      // Agregar al historial
      setHistorial(prev => {
        const nuevo = [searchQuery, ...prev.filter(h => h !== searchQuery)].slice(0, 5);
        return nuevo;
      });
      
      onSearch(searchQuery, filters);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setFilters({ tipo: 'todos' });
    onClear();
    setShowSuggestions(false);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getFiltrosActivos = () => {
    const activos = [];
    if (filters.tipo !== 'todos') activos.push(`Tipo: ${filters.tipo}`);
    if (filters.fechaInicio) activos.push(`Desde: ${filters.fechaInicio}`);
    if (filters.fechaFin) activos.push(`Hasta: ${filters.fechaFin}`);
    if (filters.valorMin) activos.push(`Valor min: €${filters.valorMin}`);
    if (filters.valorMax) activos.push(`Valor max: €${filters.valorMax}`);
    if (filters.estado?.length) activos.push(`Estados: ${filters.estado.join(', ')}`);
    if (filters.etiquetas?.length) activos.push(`Etiquetas: ${filters.etiquetas.join(', ')}`);
    if (filters.ubicacion) activos.push(`Ubicación: ${filters.ubicacion}`);
    if (filters.fuente) activos.push(`Fuente: ${filters.fuente}`);
    if (filters.satisfaccion) activos.push(`Satisfacción: ${filters.satisfaccion}+`);
    if (filters.riesgo) activos.push(`Riesgo: ${filters.riesgo}`);
    return activos;
  };

  return (
    <div className="relative">
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Buscar clientes, etiquetas, ubicaciones..."
            className="w-full pl-12 pr-20 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim() || isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Buscar'
              )}
            </button>
          </div>
        </div>

        {/* Filtros activos */}
        {getFiltrosActivos().length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {getFiltrosActivos().map((filtro, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              >
                {filtro}
              </span>
            ))}
          </div>
        )}

        {/* Sugerencias */}
        <AnimatePresence>
          {showSuggestions && (sugerencias.length > 0 || historial.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
            >
              {/* Historial de búsquedas */}
              {historial.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Búsquedas recientes
                  </h4>
                  <div className="space-y-1">
                    {historial.slice(0, 3).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(item);
                          handleSearch(item);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sugerencias inteligentes */}
              {sugerencias.length > 0 && (
                <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Sugerencias
                  </h4>
                  <div className="space-y-1">
                    {sugerencias.map((sugerencia) => (
                      <button
                        key={sugerencia.id}
                        onClick={sugerencia.accion}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                      >
                        <div className="text-gray-400">{sugerencia.icono}</div>
                        <div>
                          <div className="font-medium text-gray-900">{sugerencia.texto}</div>
                          {sugerencia.subtitulo && (
                            <div className="text-xs text-gray-500">{sugerencia.subtitulo}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Panel de filtros avanzados */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white border border-gray-200 rounded-xl shadow-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tipo de búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de búsqueda</label>
                <select
                  value={filters.tipo}
                  onChange={(e) => handleFilterChange('tipo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="todos">Todos los campos</option>
                  <option value="nombre">Solo nombres</option>
                  <option value="email">Solo emails</option>
                  <option value="telefono">Solo teléfonos</option>
                  <option value="ubicacion">Solo ubicaciones</option>
                  <option value="etiquetas">Solo etiquetas</option>
                </select>
              </div>

              {/* Rango de fechas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de alta</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={filters.fechaInicio || ''}
                    onChange={(e) => handleFilterChange('fechaInicio', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Desde"
                  />
                  <input
                    type="date"
                    value={filters.fechaFin || ''}
                    onChange={(e) => handleFilterChange('fechaFin', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Hasta"
                  />
                </div>
              </div>

              {/* Rango de valor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor del cliente</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.valorMin || ''}
                    onChange={(e) => handleFilterChange('valorMin', Number(e.target.value))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Mín"
                  />
                  <input
                    type="number"
                    value={filters.valorMax || ''}
                    onChange={(e) => handleFilterChange('valorMax', Number(e.target.value))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Máx"
                  />
                </div>
              </div>

              {/* Estados */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estados</label>
                <div className="space-y-2">
                  {['activo', 'inactivo', 'premium', 'online'].map((estado) => (
                    <label key={estado} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.estado?.includes(estado) || false}
                        onChange={(e) => {
                          const estados = filters.estado || [];
                          if (e.target.checked) {
                            handleFilterChange('estado', [...estados, estado]);
                          } else {
                            handleFilterChange('estado', estados.filter(s => s !== estado));
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{estado}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                <input
                  type="text"
                  value={filters.ubicacion || ''}
                  onChange={(e) => handleFilterChange('ubicacion', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ciudad, país..."
                />
              </div>

              {/* Satisfacción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Satisfacción mínima</label>
                <select
                  value={filters.satisfaccion || ''}
                  onChange={(e) => handleFilterChange('satisfaccion', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Cualquier nivel</option>
                  <option value="1">1+ estrella</option>
                  <option value="2">2+ estrellas</option>
                  <option value="3">3+ estrellas</option>
                  <option value="4">4+ estrellas</option>
                  <option value="5">5 estrellas</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSearch()}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Aplicar Filtros
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusquedaGlobal;

