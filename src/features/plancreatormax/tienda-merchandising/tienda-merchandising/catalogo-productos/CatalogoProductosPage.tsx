
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, TrendingUp, Star, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import GridProductos from './components/GridProductos';
import GestorInventario from './components/GestorInventario';
import Modal from '../../../../../components/ui/modal';
import { Producto, getProductoById, deleteProducto, updateProducto, createProducto } from './catalogoProductosApi';

const CatalogoProductosPage: React.FC = () => {
  // Estados para modales y funcionalidades
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [productoToDelete, setProductoToDelete] = useState<Producto | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Producto>>({});
  const [addFormData, setAddFormData] = useState<Omit<Producto, 'id'>>({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagenes: [],
    stock: 0,
    estado: 'disponible',
    variantes: []
  });

  // Función para mostrar detalles del producto
  const handleViewDetails = async (productoId: string) => {
    try {
      const producto = await getProductoById(productoId);
      setSelectedProducto(producto);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error('Error al cargar detalles del producto:', error);
      toast.error('Error al cargar los detalles del producto');
    }
  };

  // Función para confirmar eliminación
  const handleDeleteProduct = (producto: Producto) => {
    setProductoToDelete(producto);
    setIsDeleteModalOpen(true);
  };

  // Función para ejecutar eliminación
  const confirmDelete = async () => {
    if (!productoToDelete) return;
    
    try {
      await deleteProducto(productoToDelete.id);
      toast.success('Producto eliminado correctamente');
      setIsDeleteModalOpen(false);
      setProductoToDelete(null);
      // Aquí podrías refrescar la lista de productos si es necesario
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      toast.error('Error al eliminar el producto');
    }
  };

  // Función para editar producto
  const handleEditProduct = (producto: Producto) => {
    setSelectedProducto(producto);
    setEditFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      estado: producto.estado
    });
    setIsEditModalOpen(true);
  };

  // Función para guardar cambios del producto
  const handleSaveEdit = async () => {
    if (!selectedProducto) return;
    
    try {
      await updateProducto(selectedProducto.id, editFormData);
      toast.success('Producto actualizado correctamente');
      setIsEditModalOpen(false);
      setSelectedProducto(null);
      setEditFormData({});
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      toast.error('Error al actualizar el producto');
    }
  };

  // Función para manejar cambios en el formulario de edición
  const handleEditFormChange = (field: keyof Producto, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para agregar producto
  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  // Función para guardar nuevo producto
  const handleSaveAdd = async () => {
    try {
      await createProducto(addFormData);
      toast.success('Producto creado correctamente');
      setIsAddModalOpen(false);
      setAddFormData({
        nombre: '',
        descripcion: '',
        precio: 0,
        imagenes: [],
        stock: 0,
        estado: 'disponible',
        variantes: []
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      toast.error('Error al crear el producto');
    }
  };

  // Función para manejar cambios en el formulario de agregar
  const handleAddFormChange = (field: keyof Omit<Producto, 'id'>, value: any) => {
    setAddFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para cerrar modales
  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedProducto(null);
    setProductoToDelete(null);
    setEditFormData({});
    setAddFormData({
      nombre: '',
      descripcion: '',
      precio: 0,
      imagenes: [],
      stock: 0,
      estado: 'disponible',
      variantes: []
    });
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
              <Package className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Catálogo de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Productos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona tu inventario y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">catálogo de productos</span> de manera eficiente
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <ShoppingBag className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Productos Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Ventas en Aumento</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Productos Destacados</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4">
        {/* Gestor de Inventario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                  <Package className="w-6 h-6" />
                </div>
                Gestión de Inventario
              </h2>
              <GestorInventario onEditProduct={handleEditProduct} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />
            </div>
          </div>
        </motion.div>

        {/* Grid de Productos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                Catálogo de Productos
              </h2>
              <GridProductos onViewDetails={handleViewDetails} onDeleteProduct={handleDeleteProduct} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de Detalles del Producto */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={closeModals}
        title={selectedProducto ? `Detalles de ${selectedProducto.nombre}` : "Detalles del Producto"}
        size="lg"
      >
        {selectedProducto && (
          <div className="space-y-6">
            {/* Imágenes del producto */}
            <div className="grid grid-cols-2 gap-4">
              {selectedProducto.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`${selectedProducto.nombre} - Imagen ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Información del producto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProducto.nombre}</h3>
                <p className="text-gray-600 mb-4">{selectedProducto.descripcion}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-indigo-600">€{selectedProducto.precio.toFixed(2)}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedProducto.estado === 'disponible' ? 'bg-green-100 text-green-800' :
                    selectedProducto.estado === 'agotado' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedProducto.estado}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <strong>Stock disponible:</strong> {selectedProducto.stock} unidades
                </div>
              </div>

              {/* Variantes */}
              {selectedProducto.variantes && selectedProducto.variantes.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Variantes disponibles</h4>
                  <div className="space-y-2">
                    {selectedProducto.variantes.map((variante, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          {variante.talla && <span className="font-medium">Talla: {variante.talla}</span>}
                          {variante.color && <span className="ml-2 font-medium">Color: {variante.color}</span>}
                        </div>
                        <span className="text-sm text-gray-600">Stock: {variante.stock}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  handleEditProduct(selectedProducto);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Edit className="w-5 h-5" />
                Editar Producto
              </button>
              <button
                onClick={() => {
                  toast.success('Producto agregado al carrito exitosamente');
                  closeModals();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  handleDeleteProduct(selectedProducto);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Trash2 className="w-5 h-5" />
                Eliminar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        title="Confirmar Eliminación"
        size="sm"
      >
        {productoToDelete && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <Trash2 className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-semibold text-gray-900">¿Estás seguro de que quieres eliminar este producto?</p>
                <p className="text-sm text-gray-600 mt-1">{productoToDelete.nombre}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </p>
            <div className="flex gap-3 pt-4">
              <button
                onClick={closeModals}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                Eliminar Permanentemente
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Edición de Producto */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        title={`Editar ${selectedProducto?.nombre || 'Producto'}`}
        size="lg"
      >
        {selectedProducto && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  value={editFormData.nombre || ''}
                  onChange={(e) => handleEditFormChange('nombre', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editFormData.precio || 0}
                  onChange={(e) => handleEditFormChange('precio', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={editFormData.stock || 0}
                  onChange={(e) => handleEditFormChange('stock', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={editFormData.estado || 'disponible'}
                  onChange={(e) => handleEditFormChange('estado', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="disponible">Disponible</option>
                  <option value="agotado">Agotado</option>
                  <option value="preventa">Preventa</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={editFormData.descripcion || ''}
                onChange={(e) => handleEditFormChange('descripcion', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={closeModals}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Agregar Producto */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeModals}
        title="Agregar Nuevo Producto"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                value={addFormData.nombre}
                onChange={(e) => handleAddFormChange('nombre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Ej: Camiseta Fitness Premium"
                required
              />
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (€) *
              </label>
              <input
                type="number"
                step="0.01"
                value={addFormData.precio}
                onChange={(e) => handleAddFormChange('precio', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                value={addFormData.stock}
                onChange={(e) => handleAddFormChange('stock', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0"
                required
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                value={addFormData.estado}
                onChange={(e) => handleAddFormChange('estado', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="disponible">Disponible</option>
                <option value="agotado">Agotado</option>
                <option value="preventa">Preventa</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={addFormData.descripcion}
              onChange={(e) => handleAddFormChange('descripcion', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Describe las características y beneficios del producto..."
              required
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={closeModals}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveAdd}
              disabled={!addFormData.nombre || !addFormData.descripcion || addFormData.precio <= 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              Crear Producto
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CatalogoProductosPage;
