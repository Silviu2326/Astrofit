import React, { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, ChevronDown, Eye, Edit, Star, MapPin, Calendar,
  Target, Users, Filter, Search, MoreVertical, Download, Share2,
  ArrowUp, ArrowDown, Maximize, Minimize, RefreshCw
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface VirtualScrollingTableProps {
  jugadores: Prospecto[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  selected: Set<string>;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ITEM_HEIGHT = 80;
const CONTAINER_HEIGHT = 600;
const BUFFER_SIZE = 5;

const VirtualScrollingTable: React.FC<VirtualScrollingTableProps> = ({
  jugadores,
  onView,
  onEdit,
  onSelect,
  onSelectAll,
  selected,
  searchTerm,
  onSearchChange
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [sortKey, setSortKey] = useState<keyof Prospecto>('nombre');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Sort and filter data
  const processedJugadores = useMemo(() => {
    let filtered = jugadores.filter(jugador => 
      jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jugador.clubActual.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jugador.nacionalidad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDir === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDir === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [jugadores, searchTerm, sortKey, sortDir]);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
    const endIndex = Math.min(
      processedJugadores.length - 1,
      Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + BUFFER_SIZE
    );
    
    return { startIndex, endIndex };
  }, [scrollTop, processedJugadores.length]);

  // Get visible items
  const visibleItems = useMemo(() => {
    return processedJugadores.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [processedJugadores, visibleRange]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
    
    setIsScrolling(true);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  // Handle sort
  const handleSort = useCallback((key: keyof Prospecto) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }, [sortKey, sortDir]);

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto': return 'bg-green-100 text-green-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPotencialColor = (potencial: string) => {
    switch (potencial) {
      case 'Estrella': return 'bg-purple-100 text-purple-800';
      case 'Alto': return 'bg-blue-100 text-blue-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'fichado': return 'bg-green-100 text-green-800';
      case 'seguimiento activo': return 'bg-blue-100 text-blue-800';
      case 'en evaluación': return 'bg-yellow-100 text-yellow-800';
      case 'descartado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SortIcon: React.FC<{ active: boolean; dir: 'asc' | 'desc' }> = ({ active, dir }) => {
    if (!active) return <ChevronDown className="w-4 h-4 text-gray-400" />;
    return dir === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const allSelected = jugadores.length > 0 && jugadores.every(j => selected.has(j.id));
  const someSelected = jugadores.some(j => selected.has(j.id)) && !allSelected;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Tabla Virtual Optimizada</h2>
            <p className="text-blue-100 mt-1">
              {processedJugadores.length} jugadores • Rendimiento optimizado
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-blue-100">
              {isScrolling ? 'Scrolling...' : 'Listo'}
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Búsqueda rápida..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
            Filtros
          </motion.button>
        </div>

        {/* Performance Stats */}
        <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Renderizando {visibleItems.length} de {processedJugadores.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Índice {visibleRange.startIndex}-{visibleRange.endIndex}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Altura total: {processedJugadores.length * ITEM_HEIGHT}px</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative">
        {/* Virtual Container */}
        <div
          ref={scrollElementRef}
          onScroll={handleScroll}
          className="overflow-auto"
          style={{ height: CONTAINER_HEIGHT }}
        >
          {/* Virtual Spacer - Top */}
          <div style={{ height: visibleRange.startIndex * ITEM_HEIGHT }} />
          
          {/* Visible Items */}
          <div className="relative">
            {visibleItems.map((jugador, index) => {
              const actualIndex = visibleRange.startIndex + index;
              return (
                <motion.div
                  key={jugador.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ height: ITEM_HEIGHT }}
                >
                  {/* Checkbox */}
                  <div className="w-8">
                    <input
                      type="checkbox"
                      checked={selected.has(jugador.id)}
                      onChange={() => onSelect(jugador.id)}
                      className="w-4 h-4 rounded border-gray-300 bg-white"
                    />
                  </div>

                  {/* Photo */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {jugador.fotoUrl ? (
                      <img 
                        src={jugador.fotoUrl} 
                        alt={jugador.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-6 h-6 text-gray-400 mx-auto mt-3" />
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{jugador.nombre}</h3>
                    <p className="text-sm text-gray-600 truncate">{jugador.posicion} • {jugador.edad} años</p>
                  </div>

                  {/* Club */}
                  <div className="hidden md:block w-32 min-w-0">
                    <p className="text-sm text-gray-700 truncate">{jugador.clubActual}</p>
                    <p className="text-xs text-gray-500 truncate">{jugador.nacionalidad}</p>
                  </div>

                  {/* Level */}
                  <div className="hidden lg:block w-20">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNivelColor(jugador.nivel)}`}>
                      {jugador.nivel}
                    </span>
                  </div>

                  {/* Potential */}
                  <div className="hidden lg:block w-24">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPotencialColor(jugador.potencial)}`}>
                      {jugador.potencial}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="hidden xl:block w-32">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(jugador.estado)}`}>
                      {jugador.estado}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onView(jugador.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(jugador.id)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Más opciones"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Virtual Spacer - Bottom */}
          <div style={{ height: (processedJugadores.length - visibleRange.endIndex - 1) * ITEM_HEIGHT }} />
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {isScrolling && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scrolling...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {visibleRange.startIndex + 1}-{Math.min(visibleRange.endIndex + 1, processedJugadores.length)} de {processedJugadores.length} jugadores
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Virtual Scrolling Activo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Rendimiento Optimizado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualScrollingTable;



