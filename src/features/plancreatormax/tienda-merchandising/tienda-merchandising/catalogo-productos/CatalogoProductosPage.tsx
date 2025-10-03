import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package, TrendingUp, DollarSign, AlertTriangle,
  Plus, Search, Filter, Grid, List, Download, Upload,
  ShoppingBag
} from 'lucide-react';
import { getProductos, getEstadisticasCatalogo, Producto, CategoriaProducto, EstadoProducto } from './catalogoProductosApi';
import TarjetaProducto from './components/TarjetaProducto';
import EditorProducto from './components/EditorProducto';

const CatalogoProductosPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [vistaGrid, setVistaGrid] = useState(true);

  // Estados del editor
  const [editorAbierto, setEditorAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);

  // Estados de filtros
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<CategoriaProducto | 'Todos'>('Todos');
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoProducto | 'Todos'>('Todos');
  const [precioMin, setPrecioMin] = useState<number>(0);
  const [precioMax, setPrecioMax] = useState<number>(500);
  const [ordenar, setOrdenar] = useState<string>('recientes');

  // Estadísticas
  const [stats, setStats] = useState({
    totalProductos: 0,
    productosPublicados: 0,
    productosAgotados: 0,
    productosStockBajo: 0,
    valorTotalInventario: 0,
  });

  // Cargar productos
  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const data = await getProductos();
        setProductos(data);
        setProductosFiltrados(data);
        const estadisticas = getEstadisticasCatalogo();
        setStats(estadisticas);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...productos];

    // Filtro de búsqueda
    if (busqueda) {
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.sku.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()))
      );
    }

    // Filtro de categoría
    if (categoriaFiltro !== 'Todos') {
      resultado = resultado.filter(p => p.categoria === categoriaFiltro);
    }

    // Filtro de estado
    if (estadoFiltro !== 'Todos') {
      resultado = resultado.filter(p => p.estado === estadoFiltro);
    }

    // Filtro de precio
    resultado = resultado.filter(p => {
      const precio = p.precioOferta || p.precioRegular;
      return precio >= precioMin && precio <= precioMax;
    });

    // Ordenar
    switch (ordenar) {
      case 'nombre-asc':
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombre-desc':
        resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precio-asc':
        resultado.sort((a, b) => (a.precioOferta || a.precioRegular) - (b.precioOferta || b.precioRegular));
        break;
      case 'precio-desc':
        resultado.sort((a, b) => (b.precioOferta || b.precioRegular) - (a.precioOferta || a.precioRegular));
        break;
      case 'stock-asc':
        resultado.sort((a, b) => a.stock - b.stock);
        break;
      case 'vendidos':
        resultado.sort((a, b) => b.ventas - a.ventas);
        break;
      case 'recientes':
      default:
        resultado.sort((a, b) => new Date(b.fechaActualizacion).getTime() - new Date(a.fechaActualizacion).getTime());
        break;
    }

    setProductosFiltrados(resultado);
  }, [busqueda, categoriaFiltro, estadoFiltro, precioMin, precioMax, ordenar, productos]);

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaFiltro('Todos');
    setEstadoFiltro('Todos');
    setPrecioMin(0);
    setPrecioMax(500);
    setOrdenar('recientes');
  };

  const abrirEditor = (producto?: Producto) => {
    setProductoEditando(producto || null);
    setEditorAbierto(true);
  };

  const cerrarEditor = () => {
    setEditorAbierto(false);
    setProductoEditando(null);
  };

  const guardarProducto = async (producto: Producto) => {
    // Actualizar la lista de productos
    const data = await getProductos();
    setProductos(data);
    const estadisticas = getEstadisticasCatalogo();
    setStats(estadisticas);
    cerrarEditor();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <ShoppingBag className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Catálogo de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Productos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona tu tienda de merchandising con{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">control total</span>
          </p>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            titulo: 'Total Productos',
            valor: stats.totalProductos,
            icono: Package,
            color: 'from-blue-500 to-indigo-600',
            cambio: null,
          },
          {
            titulo: 'Publicados',
            valor: stats.productosPublicados,
            icono: TrendingUp,
            color: 'from-green-500 to-emerald-600',
            cambio: null,
          },
          {
            titulo: 'Valor Inventario',
            valor: `$${stats.valorTotalInventario.toFixed(0)}`,
            icono: DollarSign,
            color: 'from-purple-500 to-pink-600',
            cambio: null,
          },
          {
            titulo: 'Stock Bajo',
            valor: stats.productosStockBajo,
            icono: AlertTriangle,
            color: 'from-orange-500 to-red-600',
            cambio: null,
            alerta: stats.productosStockBajo > 0,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icono className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.titulo}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.valor}
              </p>

              {stat.alerta && (
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-orange-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-bold text-orange-600">Requiere atención</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* BARRA DE HERRAMIENTAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Búsqueda */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, SKU o tags..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => abrirEditor()}
              className="px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 border border-white/20"
            >
              <Plus className="w-5 h-5" />
              Agregar Producto
            </motion.button>

            <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Importar
            </button>

            <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar
            </button>

            {/* Toggle vista */}
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setVistaGrid(true)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${vistaGrid ? 'bg-white shadow-md' : 'text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setVistaGrid(false)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${!vistaGrid ? 'bg-white shadow-md' : 'text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Categoría */}
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value as CategoriaProducto | 'Todos')}
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
            >
              <option value="Todos">Todas las categorías</option>
              <option value="Ropa">Ropa</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Equipo">Equipo</option>
              <option value="Digital">Digital</option>
            </select>

            {/* Estado */}
            <select
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value as EstadoProducto | 'Todos')}
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
            >
              <option value="Todos">Todos los estados</option>
              <option value="publicado">Publicado</option>
              <option value="borrador">Borrador</option>
              <option value="agotado">Agotado</option>
              <option value="programado">Programado</option>
            </select>

            {/* Ordenar */}
            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
            >
              <option value="recientes">Más recientes</option>
              <option value="nombre-asc">Nombre (A-Z)</option>
              <option value="nombre-desc">Nombre (Z-A)</option>
              <option value="precio-asc">Precio (bajo-alto)</option>
              <option value="precio-desc">Precio (alto-bajo)</option>
              <option value="stock-asc">Stock (bajo-alto)</option>
              <option value="vendidos">Más vendidos</option>
            </select>

            {/* Limpiar filtros */}
            <button
              onClick={limpiarFiltros}
              className="px-4 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-2xl transition-colors duration-300"
            >
              Limpiar filtros
            </button>
          </div>

          {/* Resultados */}
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{productosFiltrados.length}</span> productos encontrados
          </div>
        </div>
      </motion.div>

      {/* GRID DE PRODUCTOS */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No se encontraron productos</p>
          <p className="text-gray-400 mt-2">Intenta ajustar tus filtros o agrega nuevos productos</p>
        </div>
      ) : (
        <div className={vistaGrid ?
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :
          'flex flex-col gap-4'
        }>
          {productosFiltrados.map((producto, index) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <TarjetaProducto
                producto={producto}
                onEditar={() => abrirEditor(producto)}
                vistaLista={!vistaGrid}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* EDITOR DE PRODUCTO */}
      {editorAbierto && (
        <EditorProducto
          producto={productoEditando}
          onSave={guardarProducto}
          onClose={cerrarEditor}
        />
      )}
    </div>
  );
};

export default CatalogoProductosPage;
