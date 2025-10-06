import React from 'react';
import { Search, Tag, Filter } from 'lucide-react';

export interface NotasFilter {
  searchText: string;
  clientId: string;
  tag: string;
  author: string;
  assignedTo: string;
  priority: 'all' | 'alta' | 'media' | 'baja';
  dateRange: 'all' | 'today' | 'last7days' | 'last30days';
}

interface NotasFiltersProps {
  filters: NotasFilter;
  onFilterChange: (newFilters: Partial<NotasFilter>) => void;
}

const NotasFilters: React.FC<NotasFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-gray-800">Filtros de Notas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Búsqueda */}
        <div className="md:col-span-2 lg:col-span-3">
          <label htmlFor="searchText" className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4 inline mr-2" />
            Buscar en contenido
          </label>
          <input
            type="text"
            id="searchText"
            name="searchText"
            value={filters.searchText}
            onChange={handleChange}
            placeholder="Buscar por título o contenido..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Etiqueta */}
        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 inline mr-2" />
            Etiqueta
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={filters.tag}
            onChange={handleChange}
            placeholder="Filtrar por etiqueta..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Categoría (usando el campo priority como placeholder) */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            <option value="alta">Importante</option>
            <option value="media">Seguimiento</option>
            <option value="baja">General</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <select
            id="dateRange"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">Cualquier fecha</option>
            <option value="today">Hoy</option>
            <option value="last7days">Últimos 7 días</option>
            <option value="last30days">Últimos 30 días</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NotasFilters;
