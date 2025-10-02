import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TarjetaArticulo from './TarjetaArticulo';
import { getArticulos, Articulo } from '../blogNoticiasApi';
import { Loader2, BookOpen, Search } from 'lucide-react';

interface FeedArticulosProps {
  selectedCategory: string;
  searchTerm: string;
}

const FeedArticulos: React.FC<FeedArticulosProps> = ({ selectedCategory, searchTerm }) => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true);
      const data = await getArticulos(selectedCategory, searchTerm);
      setArticulos(data);
      setLoading(false);
    };
    fetchArticulos();
  }, [selectedCategory, searchTerm]);

  // Estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full mx-auto flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-violet-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>
          <p className="text-xl font-semibold text-gray-700">Cargando artículos...</p>
          <p className="text-sm text-gray-500 mt-2">Preparando el mejor contenido para ti</p>
        </motion.div>
      </div>
    );
  }

  // Sin resultados
  if (articulos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Search className="w-12 h-12 text-violet-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No se encontraron artículos</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            No hay artículos que coincidan con tu búsqueda. Intenta con otros términos o categorías.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Header de resultados */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-3"
      >
        <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl text-white">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm
              ? `Resultados para "${searchTerm}"`
              : selectedCategory !== 'Todas'
              ? `Artículos de ${selectedCategory}`
              : 'Todos los artículos'}
          </h2>
          <p className="text-sm text-gray-600">
            {articulos.length} {articulos.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
          </p>
        </div>
      </motion.div>

      {/* Grid de artículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articulos.map((articulo, index) => (
          <TarjetaArticulo key={articulo.id} articulo={articulo} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FeedArticulos;
