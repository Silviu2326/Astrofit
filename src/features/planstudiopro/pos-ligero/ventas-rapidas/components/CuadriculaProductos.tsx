import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchProductos } from '../ventasRapidasApi';
import { Producto } from '../../../types';
import { Package, AlertCircle, Search } from 'lucide-react';

interface CuadriculaProductosProps {
  onProductoClick: (producto: Producto) => void;
}

const CuadriculaProductos: React.FC<CuadriculaProductosProps> = ({ onProductoClick }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    fetchProductos().then(setProductos);
  }, []);

  const categorias = [
    { id: 'todos', nombre: 'Todos', icono: '🛒' },
    { id: 'bebidas', nombre: 'Bebidas', icono: '🍹' },
    { id: 'snacks', nombre: 'Snacks', icono: '🍫' },
    { id: 'merch', nombre: 'Merch', icono: '👕' },
    { id: 'suplementos', nombre: 'Suplementos', icono: '💊' },
    { id: 'pases', nombre: 'Pases', icono: '🎟️' },
    { id: 'servicios', nombre: 'Servicios', icono: '🏋️' },
  ];

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = categoriaActiva === 'todos' || producto.categoria === categoriaActiva;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const obtenerColorStock = (stock?: number) => {
    if (!stock || stock === 999) return 'text-gray-400';
    if (stock > 50) return 'text-green-600';
    if (stock > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const obtenerBadgeStock = (stock?: number) => {
    if (!stock || stock === 999) return null;
    if (stock > 50) return { text: 'Disponible', color: 'bg-green-100 text-green-700' };
    if (stock > 10) return { text: 'Stock Bajo', color: 'bg-yellow-100 text-yellow-700' };
    return { text: 'Agotado', color: 'bg-red-100 text-red-700' };
  };

  return (
    <div className="space-y-6">
      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
        />
      </div>

      {/* Filtros de Categoría */}
      <div className="flex flex-wrap gap-3">
        {categorias.map((categoria) => (
          <motion.button
            key={categoria.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
              categoriaActiva === categoria.id
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="mr-2">{categoria.icono}</span>
            {categoria.nombre}
          </motion.button>
        ))}
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productosFiltrados.map((producto, index) => {
          const badge = obtenerBadgeStock(producto.stock);
          const stockColor = obtenerColorStock(producto.stock);

          return (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onProductoClick(producto)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 cursor-pointer border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

              <div className="relative z-10">
                {/* Imagen/Icono */}
                <div className="w-full h-24 flex items-center justify-center mb-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <span className="text-5xl">{producto.imagen}</span>
                </div>

                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {producto.enOferta && (
                    <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg">
                      -{producto.descuento}%
                    </div>
                  )}
                  {badge && (
                    <div className={`px-2 py-1 text-xs font-bold rounded-lg ${badge.color}`}>
                      {badge.text}
                    </div>
                  )}
                </div>

                {/* Nombre */}
                <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                  {producto.nombre}
                </h3>

                {/* Descripción */}
                {producto.descripcion && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {producto.descripcion}
                  </p>
                )}

                {/* Precio */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    {producto.enOferta ? (
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">
                          ${producto.precio.toFixed(2)}
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          ${(producto.precio * (1 - (producto.descuento || 0) / 100)).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ${producto.precio.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  {producto.stock && producto.stock !== 999 && (
                    <div className={`flex items-center gap-1 ${stockColor}`}>
                      <Package className="w-4 h-4" />
                      <span className="text-xs font-semibold">{producto.stock}</span>
                    </div>
                  )}
                </div>

                {/* Botón agregar */}
                <div className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-lg text-center group-hover:from-green-700 group-hover:to-emerald-700 transition-all duration-300">
                  Agregar
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sin resultados */}
      {productosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-semibold">No se encontraron productos</p>
          <p className="text-gray-400 text-sm">Intenta con otra búsqueda o categoría</p>
        </div>
      )}
    </div>
  );
};

export default CuadriculaProductos;
