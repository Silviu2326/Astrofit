import React, { useState } from 'react';
import { Package, Plus, Filter, Grid, List, Search, TrendingDown, AlertTriangle } from 'lucide-react';
import type { Producto, FiltrosProducto, EstadisticasCatalogo } from './types';
import ProductCard from './components/ProductCard';
import ProductoFormModal from './components/ProductoFormModal';
import InventarioManager from './components/InventarioManager';

const CatalogoProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: '1',
      nombre: 'Camiseta Premium Fan Club',
      descripcion: 'Camiseta oficial de algodón premium con logo bordado',
      categoria: 'Ropa',
      subcategoria: 'Camisetas',
      marca: 'Fan Official',
      imagenes: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
      precioBase: 29.99,
      precioComparacion: 39.99,
      tieneVariantes: true,
      opcionesVariantes: [
        { id: '1', nombre: 'Talla', valores: ['S', 'M', 'L', 'XL'] },
        { id: '2', nombre: 'Color', valores: ['Negro', 'Blanco', 'Azul'] }
      ],
      variantes: [
        {
          id: 'v1',
          sku: 'CAM-PREM-S-NEG',
          nombre: 'S / Negro',
          atributos: { Talla: 'S', Color: 'Negro' },
          precio: 29.99,
          precioComparacion: 39.99,
          stock: 15,
          stockMinimo: 5,
          activo: true
        },
        {
          id: 'v2',
          sku: 'CAM-PREM-M-NEG',
          nombre: 'M / Negro',
          atributos: { Talla: 'M', Color: 'Negro' },
          precio: 29.99,
          stock: 8,
          stockMinimo: 10,
          activo: true
        },
        {
          id: 'v3',
          sku: 'CAM-PREM-L-BLA',
          nombre: 'L / Blanco',
          atributos: { Talla: 'L', Color: 'Blanco' },
          precio: 29.99,
          stock: 25,
          stockMinimo: 5,
          activo: true
        }
      ],
      stockTotal: 48,
      estado: 'activo',
      etiquetas: ['Nuevo', 'Popular', 'Oferta'],
      seo: {
        titulo: 'Camiseta Premium Fan Club - Algodón Bordado',
        descripcion: 'Camiseta oficial de alta calidad',
        palabrasClave: ['camiseta', 'fan club', 'merchandising']
      },
      fechaCreacion: new Date('2024-01-15'),
      fechaActualizacion: new Date('2024-03-10')
    },
    {
      id: '2',
      nombre: 'Gorra Snapback Edición Limitada',
      descripcion: 'Gorra ajustable con bordado 3D y cierre snapback',
      categoria: 'Accesorios',
      subcategoria: 'Gorras',
      marca: 'Fan Official',
      imagenes: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400'],
      precioBase: 24.99,
      tieneVariantes: false,
      opcionesVariantes: [],
      variantes: [
        {
          id: 'v4',
          sku: 'GOR-SNAP-UNI',
          nombre: 'Única',
          atributos: {},
          precio: 24.99,
          stock: 3,
          stockMinimo: 10,
          activo: true
        }
      ],
      stockTotal: 3,
      estado: 'activo',
      etiquetas: ['Edición Limitada', 'Trending'],
      seo: {},
      fechaCreacion: new Date('2024-02-01'),
      fechaActualizacion: new Date('2024-03-08')
    }
  ]);

  const [filtros, setFiltros] = useState<FiltrosProducto>({
    busqueda: '',
    stockBajo: false
  });

  const [vistaGrid, setVistaGrid] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [inventarioAbierto, setInventarioAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | undefined>();
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const estadisticas: EstadisticasCatalogo = {
    totalProductos: productos.length,
    productosActivos: productos.filter(p => p.estado === 'activo').length,
    productosStockBajo: productos.filter(p =>
      p.variantes.some(v => v.stock <= v.stockMinimo)
    ).length,
    valorInventarioTotal: productos.reduce((total, p) =>
      total + p.variantes.reduce((sum, v) => sum + (v.precio * v.stock), 0), 0
    ),
    categorias: new Set(productos.map(p => p.categoria)).size,
    variantesTotal: productos.reduce((sum, p) => sum + p.variantes.length, 0)
  };

  const productosFiltrados = productos.filter(producto => {
    if (filtros.busqueda && !producto.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) &&
        !producto.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase())) {
      return false;
    }
    if (filtros.categoria && producto.categoria !== filtros.categoria) return false;
    if (filtros.subcategoria && producto.subcategoria !== filtros.subcategoria) return false;
    if (filtros.estado && producto.estado !== filtros.estado) return false;
    if (filtros.stockBajo && !producto.variantes.some(v => v.stock <= v.stockMinimo)) return false;
    if (filtros.precioMin && producto.precioBase < filtros.precioMin) return false;
    if (filtros.precioMax && producto.precioBase > filtros.precioMax) return false;
    return true;
  });

  const handleGuardarProducto = (producto: Producto) => {
    if (productoSeleccionado) {
      setProductos(productos.map(p => p.id === producto.id ? producto : p));
    } else {
      setProductos([...productos, { ...producto, id: Date.now().toString() }]);
    }
    setModalAbierto(false);
    setProductoSeleccionado(undefined);
  };

  const handleEditarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const handleEliminarProducto = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  const categorias = Array.from(new Set(productos.map(p => p.categoria)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Catálogo de Productos
                </h1>
                <p className="text-gray-600">Gestión de merchandising y tienda</p>
              </div>
            </div>
            <button
              onClick={() => {
                setProductoSeleccionado(undefined);
                setModalAbierto(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Nuevo Producto
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-blue-600 text-sm font-medium">Total Productos</p>
              <p className="text-2xl font-bold text-blue-900">{estadisticas.totalProductos}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-green-600 text-sm font-medium">Activos</p>
              <p className="text-2xl font-bold text-green-900">{estadisticas.productosActivos}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-orange-600" />
                <p className="text-orange-600 text-sm font-medium">Stock Bajo</p>
              </div>
              <p className="text-2xl font-bold text-orange-900">{estadisticas.productosStockBajo}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-purple-600 text-sm font-medium">Categorías</p>
              <p className="text-2xl font-bold text-purple-900">{estadisticas.categorias}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
              <p className="text-indigo-600 text-sm font-medium">Variantes</p>
              <p className="text-2xl font-bold text-indigo-900">{estadisticas.variantesTotal}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
              <p className="text-emerald-600 text-sm font-medium">Valor Total</p>
              <p className="text-2xl font-bold text-emerald-900">
                ${estadisticas.valorInventarioTotal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  mostrarFiltros ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filtros
              </button>

              <button
                onClick={() => setInventarioAbierto(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Package className="w-5 h-5" />
                Inventario
              </button>

              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setVistaGrid(true)}
                  className={`p-2 ${vistaGrid ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setVistaGrid(false)}
                  className={`p-2 ${!vistaGrid ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Panel de filtros expandible */}
          {mostrarFiltros && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={filtros.categoria || ''}
                  onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={filtros.estado || ''}
                  onChange={(e) => setFiltros({ ...filtros, estado: e.target.value as any || undefined })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="activo">Activo</option>
                  <option value="borrador">Borrador</option>
                  <option value="archivado">Archivado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Mín</label>
                <input
                  type="number"
                  value={filtros.precioMin || ''}
                  onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="$0"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filtros.stockBajo}
                    onChange={(e) => setFiltros({ ...filtros, stockBajo: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Solo stock bajo
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Grid de productos */}
        <div className={vistaGrid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {productosFiltrados.map(producto => (
            <ProductCard
              key={producto.id}
              producto={producto}
              vistaGrid={vistaGrid}
              onEditar={handleEditarProducto}
              onEliminar={handleEliminarProducto}
            />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta ajustar los filtros o crea un nuevo producto</p>
          </div>
        )}
      </div>

      {/* Modales */}
      {modalAbierto && (
        <ProductoFormModal
          producto={productoSeleccionado}
          onGuardar={handleGuardarProducto}
          onCerrar={() => {
            setModalAbierto(false);
            setProductoSeleccionado(undefined);
          }}
        />
      )}

      {inventarioAbierto && (
        <InventarioManager
          productos={productos}
          onActualizar={setProductos}
          onCerrar={() => setInventarioAbierto(false)}
        />
      )}
    </div>
  );
};

export default CatalogoProductos;
