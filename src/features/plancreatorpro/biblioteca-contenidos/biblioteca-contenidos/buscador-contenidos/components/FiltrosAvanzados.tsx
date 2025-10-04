import React, { useState, useEffect } from 'react';
import { Filter, X, Search, Clock, Tag } from 'lucide-react';

interface FiltrosAvanzadosProps {
  onApplyFilters?: (filters: any) => void;
  onClearFilters?: () => void;
  appliedFilters?: any;
}

const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({ onApplyFilters, onClearFilters, appliedFilters = {} }) => {
  const [resourceType, setResourceType] = useState(appliedFilters.resourceType || '');
  const [duration, setDuration] = useState(appliedFilters.duration || '');
  const [topic, setTopic] = useState(appliedFilters.topic || '');

  // Sincronizar con los filtros aplicados del padre
  useEffect(() => {
    setResourceType(appliedFilters.resourceType || '');
    setDuration(appliedFilters.duration || '');
    setTopic(appliedFilters.topic || '');
  }, [appliedFilters]);

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({ resourceType, duration, topic });
    }
  };

  const handleClearFilters = () => {
    setResourceType('');
    setDuration('');
    setTopic('');
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const hasActiveFilters = resourceType || duration || topic;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Filtros Avanzados</h2>
            <p className="text-sm text-gray-600">Refina tu búsqueda con filtros específicos</p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tipo de Recurso */}
        <div className="space-y-2">
          <label htmlFor="resourceType" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Search className="w-4 h-4" />
            Tipo de Recurso
          </label>
          <select
            id="resourceType"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="Artículo">📄 Artículo</option>
            <option value="Video">🎥 Video</option>
            <option value="Ebook">📚 Ebook</option>
            <option value="Audio">🎧 Audio</option>
            <option value="Infografía">📊 Infografía</option>
            <option value="Plantilla">📋 Plantilla</option>
          </select>
        </div>

        {/* Duración */}
        <div className="space-y-2">
          <label htmlFor="duration" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock className="w-4 h-4" />
            Duración
          </label>
          <select
            id="duration"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Cualquier duración</option>
            <option value="<15min">⚡ Rápido (menos de 15 min)</option>
            <option value="15-30min">⏱️ Medio (15-30 min)</option>
            <option value=">30min">📖 Extenso (más de 30 min)</option>
          </select>
        </div>

        {/* Tema */}
        <div className="space-y-2">
          <label htmlFor="topic" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Tag className="w-4 h-4" />
            Tema o Categoría
          </label>
          <input
            type="text"
            id="topic"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: Marketing, Nutrición, Entrenamiento..."
          />
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={handleApplyFilters}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Filter className="w-5 h-5" />
          Aplicar Filtros
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Limpiar Todo
          </button>
        )}
      </div>

      {/* Indicador de Filtros Activos */}
      {hasActiveFilters && (
        <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-semibold text-purple-800">Filtros Activos:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {resourceType && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                Tipo: {resourceType}
                <button
                  onClick={() => setResourceType('')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {duration && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                Duración: {duration}
                <button
                  onClick={() => setDuration('')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {topic && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                Tema: {topic}
                <button
                  onClick={() => setTopic('')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltrosAvanzados;
