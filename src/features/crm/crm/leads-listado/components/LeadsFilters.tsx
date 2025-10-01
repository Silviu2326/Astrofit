import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search, Calendar, Globe, Tag, Star, RefreshCw } from 'lucide-react';

interface LeadsFiltersProps {
  onApplyFilters: (filters: any) => void;
}

const LeadsFilters: React.FC<LeadsFiltersProps> = ({ onApplyFilters }) => {
  const [origin, setOrigin] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [qualification, setQualification] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyFilters = () => {
    onApplyFilters({ origin, startDate, endDate, qualification, status, searchTerm });
  };

  const handleReset = () => {
    setOrigin('');
    setStartDate('');
    setEndDate('');
    setQualification('');
    setStatus('');
    setSearchTerm('');
    onApplyFilters({});
  };

  const activeFiltersCount = [origin, startDate, endDate, qualification, status, searchTerm].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Filtros de Búsqueda</h3>
              <p className="text-sm text-blue-100">
                {activeFiltersCount > 0 ? `${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''} activo${activeFiltersCount > 1 ? 's' : ''}` : 'Sin filtros aplicados'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className={`w-5 h-5 ${isExpanded ? '' : 'rotate-45'}`} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Origin Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Origen del Lead</span>
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Todos los orígenes</option>
                  <option value="Web">🌐 Web</option>
                  <option value="Referido">👥 Referido</option>
                  <option value="Campaña Email">📧 Campaña Email</option>
                  <option value="Redes Sociales">📱 Redes Sociales</option>
                  <option value="Evento">🎪 Evento</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Tag className="w-4 h-4 text-purple-500" />
                  <span>Estado</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Todos los estados</option>
                  <option value="Nuevo contacto">🆕 Nuevo contacto</option>
                  <option value="Contactado">📞 Contactado</option>
                  <option value="Cita agendada">📅 Cita agendada</option>
                  <option value="Ganado">✅ Ganado</option>
                  <option value="Perdido">❌ Perdido</option>
                </select>
              </div>

              {/* Qualification Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Cualificación</span>
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Todas las cualificaciones</option>
                  <option value="Alta">⭐⭐⭐ Alta</option>
                  <option value="Media">⭐⭐ Media</option>
                  <option value="Baja">⭐ Baja</option>
                  <option value="Sin Calificar">❓ Sin Calificar</option>
                </select>
              </div>

              {/* Start Date Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>Fecha Inicio</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* End Date Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Fecha Fin</span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex items-center justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Limpiar</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyFilters}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200"
              >
                <Filter className="w-4 h-4" />
                <span>Aplicar Filtros</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Tags */}
      {activeFiltersCount > 0 && (
        <div className="px-6 pb-4 flex flex-wrap gap-2">
          {origin && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
            >
              <span>Origen: {origin}</span>
              <button onClick={() => setOrigin('')} className="hover:bg-blue-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          )}
          {status && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
            >
              <span>Estado: {status}</span>
              <button onClick={() => setStatus('')} className="hover:bg-purple-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          )}
          {qualification && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full"
            >
              <span>Cualificación: {qualification}</span>
              <button onClick={() => setQualification('')} className="hover:bg-yellow-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default LeadsFilters;
