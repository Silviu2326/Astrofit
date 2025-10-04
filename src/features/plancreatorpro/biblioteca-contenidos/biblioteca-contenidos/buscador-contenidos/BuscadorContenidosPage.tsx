import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileText } from 'lucide-react';
import BuscadorCentralizado from './components/BuscadorCentralizado';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import ResultadosOrganizados from './components/ResultadosOrganizados';
import { searchContent } from './buscadorContenidosApi';

const BuscadorContenidosPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [hasSearched, setHasSearched] = useState(false);

  // Cargar todos los contenidos al inicio
  useEffect(() => {
    const loadAllContent = async () => {
      setIsSearching(true);
      try {
        const results = await searchContent('', {}); // Búsqueda vacía para obtener todo
        setSearchResults(results as any[]);
        setHasSearched(true);
      } catch (error) {
        console.error('Error loading content:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    loadAllContent();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = await searchContent(query, appliedFilters);
      setSearchResults(results as any[]);
    } catch (error) {
      console.error('Error searching content:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = searchContent(searchQuery, filters);
      results.then((res) => {
        setSearchResults(res as any[]);
        setIsSearching(false);
      });
    } catch (error) {
      console.error('Error applying filters:', error);
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    setSearchQuery('');
    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = searchContent('', {});
      results.then((res) => {
        setSearchResults(res as any[]);
        setIsSearching(false);
      });
    } catch (error) {
      console.error('Error clearing filters:', error);
      setSearchResults([]);
      setIsSearching(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Search className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Buscador <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Contenidos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Encuentra y organiza todo tu contenido con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">búsqueda inteligente</span> y filtros avanzados
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Search className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Búsqueda Inteligente</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Filter className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Filtros Avanzados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Organización Automática</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="space-y-8">
        {/* Buscador Centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <BuscadorCentralizado onSearch={handleSearch} isSearching={isSearching} searchQuery={searchQuery} />
          </div>
        </motion.div>

        {/* Filtros Avanzados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <FiltrosAvanzados onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} appliedFilters={appliedFilters} />
          </div>
        </motion.div>

        {/* Resultados Organizados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <ResultadosOrganizados results={searchResults} isLoading={isSearching} hasSearched={hasSearched} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuscadorContenidosPage;
