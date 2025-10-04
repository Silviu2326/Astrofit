import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Clock, Calendar, FileText, Tag,
  ChevronRight, Trash2, Edit3
} from 'lucide-react';
import { getNotasByCliente } from '../notasSesionApi';

// Función debounce personalizada
const debounce = (func: (value: string) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  };
};

interface Nota {
  id: string;
  clienteId: string;
  entrenadorId: string;
  fecha: string;
  contenido: string;
  categoria: string;
}

const HistorialNotas: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const clienteId = 'cliente123';

  useEffect(() => {
    const fetchNotas = async () => {
      const fetchedNotas = await getNotasByCliente(clienteId);
      setNotas(fetchedNotas);
    };
    fetchNotas();
  }, [clienteId]);

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  const filteredNotas = notas.filter(nota => {
    const matchesSearch = nota.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        nota.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? nota.categoria === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(notas.map(nota => nota.categoria)));

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'sesion': 'from-blue-500 to-indigo-600',
      'progreso': 'from-green-500 to-emerald-600',
      'tecnica': 'from-purple-500 to-pink-600',
      'observacion': 'from-orange-500 to-red-600',
      'objetivo': 'from-yellow-500 to-orange-600',
    };
    return colors[category] || 'from-gray-500 to-slate-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Historial de Notas</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Búsqueda y filtros */}
        <div className="space-y-3 mb-6">
          {/* Barra de búsqueda */}
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en notas..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {/* Filtro de categoría */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
              onChange={(e) => setFilterCategory(e.target.value)}
              value={filterCategory}
            >
              <option value="">Todas las categorías</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Contador de resultados */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
          >
            <p className="text-sm text-blue-900">
              <span className="font-bold">{filteredNotas.length}</span> {filteredNotas.length === 1 ? 'resultado' : 'resultados'} encontrados
            </p>
          </motion.div>
        )}

        {/* Lista de notas */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredNotas.length > 0 ? (
            filteredNotas.map((nota, index) => (
              <motion.div
                key={nota.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-white hover:to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

                <div className="relative z-10">
                  {/* Header de la nota */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-gray-600">{nota.fecha}</span>

                      {/* Badge de categoría */}
                      <div className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(nota.categoria)} text-white text-xs font-bold rounded-full`}>
                        {nota.categoria}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Contenido de la nota */}
                  <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">
                    {nota.contenido}
                  </p>

                  {/* Footer */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-purple-50">
                      <FileText className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Nota de sesión</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-slate-300 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-600 font-medium">No hay notas para mostrar</p>
              <p className="text-sm text-gray-500 mt-1">Crea tu primera nota usando el editor</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
      `}</style>
    </motion.div>
  );
};

export default HistorialNotas;
