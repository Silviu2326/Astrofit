import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Package,
  Star,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  ShoppingBag,
  Users,
  Sparkles,
  ArrowUpRight,
  CreditCard,
  Award,
  Target,
} from 'lucide-react';
import CatalogoCompleto from './components/CatalogoCompleto';
import MembresiasMenuales from './components/MembresiasMenuales';
import BonosClases from './components/BonosClases';
import SesionesIndividuales from './components/SesionesIndividuales';
import ProgramasOnline from './components/ProgramasOnline';
import Modal from '../../../../components/ui/modal';
import { getProductos, getBestSellingProducts } from './productosServiciosApi';

type TabType = 'catalogo' | 'membresias' | 'bonos' | 'sesiones' | 'programas';

interface StatsData {
  totalProductos: number;
  productosActivos: number;
  ingresosMensuales: number;
  masVendidos: number;
}

const ProductosServiciosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('catalogo');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [stats, setStats] = useState<StatsData>({
    totalProductos: 0,
    productosActivos: 0,
    ingresosMensuales: 0,
    masVendidos: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const allProducts = await getProductos();
        const bestSellers = await getBestSellingProducts();

        setStats({
          totalProductos: allProducts.length,
          productosActivos: allProducts.filter(p => p.disponibilidad).length,
          ingresosMensuales: 12450, // Mock data
          masVendidos: bestSellers.length,
        });
      } catch (error) {
        toast.error('Error al cargar las estadísticas');
      }
    };

    fetchStats();
  }, []);

  const handleNewProduct = () => {
    setShowNewProductModal(true);
  };

  const handleFilters = () => {
    setShowFiltersModal(true);
  };

  const handleCreateProduct = () => {
    // Simular creación de producto
    toast.success('Producto creado exitosamente');
    setShowNewProductModal(false);
    // Aquí se actualizarían las estadísticas
  };

  const tabs = [
    { id: 'catalogo' as TabType, label: 'Catálogo Completo', icon: Package },
    { id: 'membresias' as TabType, label: 'Membresías Mensuales', icon: CreditCard },
    { id: 'bonos' as TabType, label: 'Bonos de Clases', icon: Award },
    { id: 'sesiones' as TabType, label: 'Sesiones Individuales', icon: Users },
    { id: 'programas' as TabType, label: 'Programas Online', icon: Target },
  ];

  const statsCards = [
    {
      title: 'Total Productos',
      value: stats.totalProductos,
      icon: ShoppingBag,
      gradient: 'from-blue-500 to-indigo-600',
      change: '+8%',
      bgGradient: 'from-blue-500/10 to-indigo-500/10',
    },
    {
      title: 'Productos Activos',
      value: stats.productosActivos,
      icon: Package,
      gradient: 'from-emerald-500 to-teal-600',
      change: '+12%',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
    },
    {
      title: 'Ingresos del Mes',
      value: `€${stats.ingresosMensuales.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-600',
      change: '+24%',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      title: 'Más Vendidos',
      value: stats.masVendidos,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-600',
      change: '+5%',
      bgGradient: 'from-orange-500/10 to-red-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestiona tu <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Catálogo</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed mb-6">
            Administra productos, servicios y planes de tu negocio en un solo lugar
          </p>

          {/* Indicadores rápidos */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Package className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-semibold text-white">{stats.totalProductos} Productos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{stats.productosActivos} Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <DollarSign className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">€{stats.ingresosMensuales.toLocaleString()} / mes</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
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
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.title}
                </p>

                {/* Valor */}
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.value}
                </p>

                {/* Cambio */}
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Barra de herramientas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 mb-6 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Búsqueda */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos y servicios..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Controles */}
          <div className="flex items-center gap-3">
            {/* Toggle de vista */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-md text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-white shadow-md text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filtros */}
            <button
              onClick={handleFilters}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors duration-300 flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>

            {/* Botón nuevo producto */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewProduct}
              className="px-6 py-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuevo Producto
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Navegación por Categorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl'
                    : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Contenido por Tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'catalogo' && <CatalogoCompleto viewMode={viewMode} searchTerm={searchTerm} />}
          {activeTab === 'membresias' && <MembresiasMenuales />}
          {activeTab === 'bonos' && <BonosClases />}
          {activeTab === 'sesiones' && <SesionesIndividuales />}
          {activeTab === 'programas' && <ProgramasOnline />}
        </motion.div>
      </AnimatePresence>

      {/* Modal Nuevo Producto */}
      <Modal
        isOpen={showNewProductModal}
        onClose={() => setShowNewProductModal(false)}
        title="Crear Nuevo Producto"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Ej: Sesión Personalizada"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              rows={3}
              placeholder="Describe tu producto o servicio..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Precio (€)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="individual">Individual</option>
                <option value="grupal">Grupal</option>
                <option value="membresia">Membresía</option>
                <option value="programa">Programa</option>
                <option value="bono">Bono</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowNewProductModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateProduct}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Crear Producto
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Filtros */}
      <Modal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        title="Filtrar Productos"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tipo de Producto
            </label>
            <div className="space-y-2">
              {['Individual', 'Grupal', 'Membresía', 'Programa', 'Bono'].map((tipo) => (
                <label key={tipo} className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                  <span className="text-sm text-gray-700">{tipo}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Modalidad
            </label>
            <div className="space-y-2">
              {['Presencial', 'Online', 'Híbrido'].map((modalidad) => (
                <label key={modalidad} className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                  <span className="text-sm text-gray-700">{modalidad}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rango de Precio
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Mínimo"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <input
                type="number"
                placeholder="Máximo"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowFiltersModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={() => {
                toast.success('Filtros aplicados');
                setShowFiltersModal(false);
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductosServiciosPage;
