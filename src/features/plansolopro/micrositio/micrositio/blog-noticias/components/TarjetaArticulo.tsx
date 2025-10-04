import React from 'react';
import { motion } from 'framer-motion';
import { Articulo } from '../blogNoticiasApi';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface TarjetaArticuloProps {
  articulo: Articulo;
  index?: number;
}

const TarjetaArticulo: React.FC<TarjetaArticuloProps> = ({ articulo, index = 0 }) => {
  const categoryColors: { [key: string]: string } = {
    'tips fitness': 'from-blue-500 to-indigo-600',
    'nutrición': 'from-green-500 to-emerald-600',
    'noticias personales': 'from-purple-500 to-pink-600'
  };

  const categoryGradient = categoryColors[articulo.categoria] || 'from-violet-500 to-fuchsia-600';

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/articulo/${articulo.id}`}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden h-full flex flex-col">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Imagen destacada */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={articulo.imagen}
              alt={articulo.titulo}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Categoría badge */}
            <div className="absolute top-4 left-4">
              <div className={`px-4 py-2 bg-gradient-to-r ${categoryGradient} rounded-full shadow-lg`}>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{articulo.categoria}</span>
                </div>
              </div>
            </div>

            {/* Tiempo de lectura */}
            <div className="absolute bottom-4 right-4">
              <div className="px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-semibold text-white">5 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 flex-1 flex flex-col relative z-10">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10 flex-1 flex flex-col">
              {/* Fecha */}
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">
                  {formatDate(articulo.fechaPublicacion)}
                </span>
              </div>

              {/* Título */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors duration-300 line-clamp-2">
                {articulo.titulo}
              </h2>

              {/* Extracto */}
              <p className="text-gray-700 mb-4 line-clamp-3 flex-1">
                {articulo.extracto}
              </p>

              {/* Botón leer más */}
              <div className="flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Leer artículo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Barra decorativa inferior */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${categoryGradient} transition-all duration-500`}></div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TarjetaArticulo;
