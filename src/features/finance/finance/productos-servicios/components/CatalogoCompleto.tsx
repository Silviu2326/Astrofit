import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Edit,
  Copy,
  Trash2,
  Eye,
  Users,
  TrendingUp,
  MoreVertical,
  Check,
  X,
  Package,
  Clock,
} from 'lucide-react';
import Modal from '../../../../../components/ui/modal';
import { getProductos, getBestSellingProducts, Producto } from '../productosServiciosApi';

interface CatalogoCompletoProps {
  viewMode: 'grid' | 'list';
  searchTerm: string;
}

const CatalogoCompleto: React.FC<CatalogoCompletoProps> = ({ viewMode, searchTerm }) => {
  const [todosProductos, setTodosProductos] = useState<Producto[]>([]);
  const [bestSellers, setBestSellers] = useState<Producto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const allData = await getProductos();
        setTodosProductos(allData);
        const bestSellerData = await getBestSellingProducts();
        setBestSellers(bestSellerData);
      } catch (error) {
        toast.error('Error al cargar los productos');
      }
    };
    fetchProductos();
  }, []);

  const handleViewProduct = (producto: Producto) => {
    setSelectedProduct(producto);
    setShowProductDetail(true);
  };

  const handleEditProduct = (producto: Producto) => {
    setSelectedProduct(producto);
    setShowEditModal(true);
  };

  const handleDuplicateProduct = (producto: Producto) => {
    // Simular duplicación
    toast.success(`Producto "${producto.nombre}" duplicado exitosamente`);
  };

  const handleDeleteProduct = (producto: Producto) => {
    setSelectedProduct(producto);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      toast.success(`Producto "${selectedProduct.nombre}" eliminado exitosamente`);
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  const handleSaveEdit = () => {
    if (selectedProduct) {
      toast.success(`Producto "${selectedProduct.nombre}" actualizado exitosamente`);
      setShowEditModal(false);
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = todosProductos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(todosProductos);
    }
  }, [searchTerm, todosProductos]);

  const getCategoryBadgeColor = (tipo: string) => {
    const colors: { [key: string]: string } = {
      individual: 'bg-blue-100 text-blue-700 border-blue-200',
      grupal: 'bg-purple-100 text-purple-700 border-purple-200',
      membresia: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      programa: 'bg-orange-100 text-orange-700 border-orange-200',
      bono: 'bg-pink-100 text-pink-700 border-pink-200',
    };
    return colors[tipo] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getModalityBadgeColor = (modalidad: string) => {
    const colors: { [key: string]: string } = {
      presencial: 'bg-indigo-100 text-indigo-700',
      online: 'bg-cyan-100 text-cyan-700',
      hibrido: 'bg-violet-100 text-violet-700',
    };
    return colors[modalidad] || 'bg-gray-100 text-gray-700';
  };

  const getIconGradient = (tipo: string) => {
    const gradients: { [key: string]: string } = {
      individual: 'from-blue-500 to-indigo-600',
      grupal: 'from-purple-500 to-pink-600',
      membresia: 'from-emerald-500 to-teal-600',
      programa: 'from-orange-500 to-red-600',
      bono: 'from-pink-500 to-rose-600',
    };
    return gradients[tipo] || 'from-gray-500 to-gray-600';
  };

  const renderProductCard = (producto: Producto, index: number) => (
    <motion.div
      key={producto.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header con gradiente e icono */}
      <div className={`relative p-6 bg-gradient-to-br ${getIconGradient(producto.tipo)} overflow-hidden`}>
        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Package className="w-8 h-8 text-white" />
          </div>

          {/* Menú de acciones */}
          <div className="relative">
            <button 
              onClick={() => handleViewProduct(producto)}
              className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-colors"
              title="Ver opciones"
            >
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeColor(producto.tipo)}`}>
            {producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getModalityBadgeColor(producto.modalidad)}`}>
            {producto.modalidad}
          </span>
          {producto.disponibilidad ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Activo
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
              <X className="w-3 h-3" />
              Inactivo
            </span>
          )}
        </div>

        {/* Nombre */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {producto.nombre}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {producto.descripcion}
        </p>

        {/* Precio destacado */}
        <div className="mb-4">
          <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            €{producto.precio}
            {producto.tipo === 'membresia' && <span className="text-lg text-gray-500 ml-1">/ mes</span>}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4 inline mr-1" />
            {producto.duracion}
          </p>
        </div>

        {/* Características */}
        <div className="space-y-2 mb-4">
          {producto.caracteristicas.slice(0, 2).map((car, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-gray-700">{car}</span>
            </div>
          ))}
        </div>

        {/* Footer con stats */}
        <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="font-semibold">
                {producto.cupos ? `${producto.cupos} cupos` : 'Sin límite'}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleViewProduct(producto)}
              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors"
              title="Ver detalle"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEditProduct(producto)}
              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors"
              title="Editar"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDuplicateProduct(producto)}
              className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl transition-colors"
              title="Duplicar"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDeleteProduct(producto)}
              className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Productos Más Vendidos */}
      {bestSellers.length > 0 && !searchTerm && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Más Vendidos</h2>
              <p className="text-sm text-gray-600">Los productos con mejor rendimiento</p>
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}>
            {bestSellers.map((producto, index) => renderProductCard(producto, index))}
          </div>
        </section>
      )}

      {/* Todos los Productos */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm ? 'Resultados de búsqueda' : 'Catálogo Completo'}
              </h2>
              <p className="text-sm text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} disponibles
              </p>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? 'Intenta con otros términos de búsqueda'
                : 'Comienza agregando tu primer producto'}
            </p>
          </motion.div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((producto, index) => renderProductCard(producto, index))}
          </div>
        )}
      </section>

      {/* Modal Detalle del Producto */}
      <Modal
        isOpen={showProductDetail}
        onClose={() => setShowProductDetail(false)}
        title={selectedProduct?.nombre || 'Detalle del Producto'}
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Información General</h3>
                <div className="space-y-2">
                  <p><span className="font-semibold">Precio:</span> €{selectedProduct.precio}</p>
                  <p><span className="font-semibold">Duración:</span> {selectedProduct.duracion}</p>
                  <p><span className="font-semibold">Modalidad:</span> {selectedProduct.modalidad}</p>
                  <p><span className="font-semibold">Tipo:</span> {selectedProduct.tipo}</p>
                  <p><span className="font-semibold">Estado:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedProduct.disponibilidad 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedProduct.disponibilidad ? 'Activo' : 'Inactivo'}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-600">{selectedProduct.descripcion}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Características</h3>
              <ul className="space-y-1">
                {selectedProduct.caracteristicas.map((caracteristica, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{caracteristica}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedProduct.cupos && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Disponibilidad</h3>
                <p className="text-gray-600">Cupos disponibles: {selectedProduct.cupos}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal Editar Producto */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Producto"
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                defaultValue={selectedProduct.nombre}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                defaultValue={selectedProduct.descripcion}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio (€)
                </label>
                <input
                  type="number"
                  defaultValue={selectedProduct.precio}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duración
                </label>
                <input
                  type="text"
                  defaultValue={selectedProduct.duracion}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked={selectedProduct.disponibilidad}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <label className="text-sm font-semibold text-gray-700">
                Producto activo
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Confirmar Eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Eliminar producto?
              </h3>
              <p className="text-gray-600">
                ¿Estás seguro de que quieres eliminar <strong>"{selectedProduct.nombre}"</strong>? 
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CatalogoCompleto;
