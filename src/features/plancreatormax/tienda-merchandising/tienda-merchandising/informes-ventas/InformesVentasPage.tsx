import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Target, 
  PieChart,
  Activity,
  ArrowUpRight,
  Star,
  Download,
  RefreshCw,
  Settings,
  Filter,
  Bell,
  Eye,
  Save
} from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { ToastProvider } from '../../../../../components/ui/toast';
import Modal from '../../../../../components/ui/modal';
import DashboardVentas from './components/DashboardVentas';
import TopProductos from './components/TopProductos';
import AnalisisMargen from './components/AnalisisMargen';
import TendenciasVenta from './components/TendenciasVenta';
import toast from 'react-hot-toast';

const InformesVentasPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isSalesDetailModalOpen, setIsSalesDetailModalOpen] = useState(false);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);
  const [isProductEditModalOpen, setIsProductEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editedProduct, setEditedProduct] = useState<any>(null);
  
  // Configuración de informes
  const [config, setConfig] = useState({
    autoRefresh: true,
    refreshInterval: 30, // minutos
    showMetrics: {
      dashboard: true,
      topProductos: true,
      analisisMargen: true,
      tendencias: true
    },
    notifications: {
      emailAlerts: true,
      salesThreshold: 10000,
      marginThreshold: 30
    },
    exportSettings: {
      format: 'pdf',
      includeCharts: true,
      includeRawData: false
    },
    displaySettings: {
      theme: 'light',
      chartType: 'bar',
      showAnimations: true
    }
  });

  const metrics = [
    { title: 'Ventas Totales', value: '$45,678', change: '+18.2%', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
    { title: 'Productos Vendidos', value: '1,234', change: '+12.5%', icon: Target, color: 'from-blue-500 to-purple-600' },
    { title: 'Margen Promedio', value: '34.5%', change: '+2.1%', icon: PieChart, color: 'from-purple-500 to-pink-500' },
    { title: 'Crecimiento', value: '+25.3%', change: '+5.7%', icon: TrendingUp, color: 'from-orange-500 to-red-500' }
  ];

  // Cargar configuración guardada al inicializar
  useEffect(() => {
    const savedConfig = localStorage.getItem('informesVentasConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Error loading saved config:', error);
      }
    }
  }, []);

  const handleExportAllReports = () => {
    setIsLoading(true);
    toast.loading('Generando reporte completo de ventas...', { id: 'export-all' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Reporte completo exportado correctamente', { id: 'export-all' });
    }, 3000);
  };

  const handleRefreshAllData = () => {
    setIsLoading(true);
    toast.loading('Actualizando todos los datos...', { id: 'refresh-all' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Todos los datos han sido actualizados', { id: 'refresh-all' });
    }, 2000);
  };

  const handleConfigureReports = () => {
    setIsConfigModalOpen(true);
  };

  const handleCloseConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  const handleSaveConfig = () => {
    // Aquí se guardaría la configuración en localStorage o en la API
    localStorage.setItem('informesVentasConfig', JSON.stringify(config));
    toast.success('Configuración guardada correctamente');
    setIsConfigModalOpen(false);
  };

  const handleConfigChange = (section: string, key: string, value: any) => {
    setConfig(prev => {
      if (key === '') {
        // Para propiedades directas como autoRefresh
        return {
          ...prev,
          [section]: value
        };
      }
      return {
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as any),
          [key]: value
        }
      };
    });
  };

  const handleToggleMetric = (metric: string) => {
    setConfig(prev => ({
      ...prev,
      showMetrics: {
        ...prev.showMetrics,
        [metric]: !prev.showMetrics[metric as keyof typeof prev.showMetrics]
      }
    }));
  };

  const handleFilterReports = () => {
    toast.success('Aplicando filtros a los informes');
  };

  const handleViewSalesDetails = () => {
    setIsSalesDetailModalOpen(true);
  };

  const handleCloseSalesDetailModal = () => {
    setIsSalesDetailModalOpen(false);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsProductDetailModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleViewForecast = () => {
    setIsForecastModalOpen(true);
  };

  const handleCloseForecastModal = () => {
    setIsForecastModalOpen(false);
  };

  const handleEditProduct = () => {
    setEditedProduct({ ...selectedProduct });
    setIsProductEditModalOpen(true);
  };

  const handleCloseProductEditModal = () => {
    setIsProductEditModalOpen(false);
    setEditedProduct(null);
  };

  const handleSaveProduct = () => {
    // Aquí se guardaría el producto editado en la API
    setSelectedProduct(editedProduct);
    toast.success(`Producto ${editedProduct.name} actualizado correctamente`);
    setIsProductEditModalOpen(false);
    setEditedProduct(null);
  };

  const handleProductFieldChange = (field: string, value: any) => {
    setEditedProduct((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      <ToastProvider />
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
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Informes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ventas</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Analiza el rendimiento y las <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tendencias de ventas</span> de tu tienda
          </p>

          {/* Indicadores pills y botones de acción */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Activity className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">Rendimiento Alto</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">Productos Top</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">Crecimiento</span>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex items-center gap-3 ml-auto">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm focus:ring-2 focus:ring-white/30 focus:border-transparent"
              >
                <option value="7d" className="text-gray-900">Últimos 7 días</option>
                <option value="30d" className="text-gray-900">Últimos 30 días</option>
                <option value="90d" className="text-gray-900">Últimos 90 días</option>
                <option value="1y" className="text-gray-900">Último año</option>
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleFilterReports}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshAllData}
                disabled={isLoading}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportAllReports}
                disabled={isLoading}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Todo
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleConfigureReports}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4">
        {/* Grid de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
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
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-5 rounded-full blur-2xl`}></div>

                <div className="relative z-10">
                  {/* Icono */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Título */}
                  <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                    {metric.title}
                  </p>

                  {/* Valor */}
                  <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                    {metric.value}
                  </p>

                  {/* Cambio */}
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-green-50 rounded-lg">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-bold text-green-600">{metric.change}</span>
                    <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                  </div>

                  {/* Barra decorativa */}
                  <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${75 + index * 5}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Grid de Componentes de Informes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dashboard de Ventas */}
          {config.showMetrics.dashboard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  Dashboard de Ventas
                </h2>
                <DashboardVentas 
                  onViewDetails={handleViewSalesDetails}
                  selectedPeriod={selectedPeriod}
                />
              </div>
            </motion.div>
          )}

          {/* Top Productos */}
          {config.showMetrics.topProductos && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                    <Star className="w-6 h-6" />
                  </div>
                  Top Productos
                </h2>
                <TopProductos 
                  onViewProduct={handleViewProduct}
                />
              </div>
            </motion.div>
          )}

          {/* Análisis de Margen */}
          {config.showMetrics.analisisMargen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
                    <PieChart className="w-6 h-6" />
                  </div>
                  Análisis de Margen
                </h2>
                <AnalisisMargen />
              </div>
            </motion.div>
          )}

          {/* Tendencias de Venta */}
          {config.showMetrics.tendencias && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  Tendencias de Venta
                </h2>
                <TendenciasVenta 
                  onViewForecast={handleViewForecast}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal de Vista Detallada de Ventas */}
      <Modal
        isOpen={isSalesDetailModalOpen}
        onClose={handleCloseSalesDetailModal}
        title="Vista Detallada de Ventas"
        size="xl"
      >
        <div className="space-y-6">
          {/* Resumen ejecutivo */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500 rounded-lg text-white">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Resumen Ejecutivo</h3>
                <p className="text-sm text-gray-600">Período: {selectedPeriod}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-900">$124,000</p>
                <p className="text-sm text-emerald-600">Ventas Totales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">+18.5%</p>
                <p className="text-sm text-blue-600">Crecimiento</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-900">1,234</p>
                <p className="text-sm text-purple-600">Transacciones</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-900">$100.5</p>
                <p className="text-sm text-orange-600">Ticket Promedio</p>
              </div>
            </div>
          </div>

          {/* Análisis por período */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Análisis por Período</h4>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Período
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ventas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meta
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cumplimiento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crecimiento
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { period: 'Enero', sales: 12000, target: 15000, growth: 5.2 },
                      { period: 'Febrero', sales: 18000, target: 15000, growth: 15.8 },
                      { period: 'Marzo', sales: 22000, target: 20000, growth: 22.1 },
                      { period: 'Abril', sales: 19000, target: 20000, growth: -13.6 },
                      { period: 'Mayo', sales: 25000, target: 25000, growth: 31.6 },
                      { period: 'Junio', sales: 28000, target: 30000, growth: 12.0 }
                    ].map((data, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{data.period}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${data.sales.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${data.target.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              (data.sales / data.target) >= 1 ? 'bg-green-500' :
                              (data.sales / data.target) >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium text-gray-900">
                              {((data.sales / data.target) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center gap-1 text-sm font-medium ${
                            data.growth >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Insights y recomendaciones */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Insights y Recomendaciones
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Fortaleza:</strong> Las ventas han mostrado un crecimiento consistente del 18.5% en el período analizado.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Atención:</strong> Abril mostró una caída del 13.6% que requiere análisis adicional.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Oportunidad:</strong> Mayo y Junio superaron las metas, indicando potencial para objetivos más ambiciosos.
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCloseSalesDetailModal}
            >
              Cerrar
            </Button>
            <Button
              onClick={() => {
                toast.success('Generando reporte detallado de ventas');
                handleCloseSalesDetailModal();
              }}
            >
              Generar Reporte
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Detalles de Producto */}
      <Modal
        isOpen={isProductDetailModalOpen}
        onClose={handleCloseProductModal}
        title={selectedProduct?.name || 'Detalles del Producto'}
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Header del producto */}
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{selectedProduct.rating}</span>
                    <span className="text-gray-500">({selectedProduct.reviews} reseñas)</span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProduct.seasonality === 'high' ? 'bg-green-100 text-green-700' :
                    selectedProduct.seasonality === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedProduct.seasonality === 'high' ? 'Alta demanda' :
                     selectedProduct.seasonality === 'medium' ? 'Demanda media' :
                     'Baja demanda'}
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg text-white">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Precio</p>
                    <p className="text-xl font-bold text-blue-900">${selectedProduct.price?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg text-white">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">Margen</p>
                    <p className="text-xl font-bold text-green-900">{selectedProduct.marginPercent?.toFixed(1) || '0.0'}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg text-white">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Stock</p>
                    <p className="text-xl font-bold text-purple-900">{selectedProduct.stock || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg text-white">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Crecimiento</p>
                    <p className="text-xl font-bold text-orange-900">{selectedProduct.growth >= 0 ? '+' : ''}{selectedProduct.growth?.toFixed(1) || '0.0'}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles financieros */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Análisis Financiero</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Costo de Producción</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedProduct.cost?.toFixed(2) || '0.00'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Precio de Venta</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedProduct.price?.toFixed(2) || '0.00'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Margen Absoluto</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedProduct.margin?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div>

            {/* Estadísticas de ventas */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Estadísticas de Ventas</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unidades Vendidas</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedProduct.sales?.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ingresos Generados</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedProduct.revenue?.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Última Venta</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedProduct.lastSale || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleCloseProductModal}
              >
                Cerrar
              </Button>
              <Button
                onClick={handleEditProduct}
              >
                Editar Producto
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Proyecciones */}
      <Modal
        isOpen={isForecastModalOpen}
        onClose={handleCloseForecastModal}
        title="Proyección de Tendencias Futuras"
        size="xl"
      >
        <div className="space-y-6">
          {/* Resumen de proyección */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Proyección Inteligente</h3>
                <p className="text-sm text-gray-600">Basado en análisis de datos históricos y patrones estacionales</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">+18.5%</p>
                <p className="text-sm text-blue-600">Crecimiento esperado</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-900">$156k</p>
                <p className="text-sm text-green-600">Ventas proyectadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-900">82%</p>
                <p className="text-sm text-purple-600">Confianza promedio</p>
              </div>
            </div>
          </div>

          {/* Proyecciones mensuales */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Proyecciones por Mes</h4>
            {[
              { period: 'Jul', predictedSales: 32000, confidence: 85, factors: ['Temporada alta', 'Nuevos productos', 'Marketing estacional'], riskLevel: 'low' },
              { period: 'Ago', predictedSales: 35000, confidence: 78, factors: ['Back to school', 'Promociones especiales'], riskLevel: 'medium' },
              { period: 'Sep', predictedSales: 28000, confidence: 72, factors: ['Fin de temporada', 'Competencia aumentada'], riskLevel: 'high' },
              { period: 'Oct', predictedSales: 30000, confidence: 80, factors: ['Halloween promotions', 'Nuevos lanzamientos'], riskLevel: 'medium' }
            ].map((forecast) => (
              <div key={forecast.period} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {forecast.period}
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        ${(forecast.predictedSales / 1000).toFixed(0)}k proyectados
                      </h5>
                      <p className="text-sm text-gray-600">
                        Confianza: {forecast.confidence}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      forecast.riskLevel === 'low' ? 'bg-green-100 text-green-700' :
                      forecast.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {forecast.riskLevel === 'low' ? 'Bajo riesgo' :
                       forecast.riskLevel === 'medium' ? 'Riesgo medio' :
                       'Alto riesgo'}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {forecast.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Factores de influencia */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Factores clave:</p>
                  <div className="flex flex-wrap gap-2">
                    {forecast.factors.map((factor, factorIndex) => (
                      <span
                        key={factorIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recomendaciones */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Recomendaciones Estratégicas
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Julio:</strong> Aumentar inventario en un 20% para aprovechar la temporada alta
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Agosto:</strong> Lanzar campaña "Back to School" con descuentos del 15%
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Septiembre:</strong> Monitorear competencia y ajustar precios estratégicamente
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCloseForecastModal}
            >
              Cerrar
            </Button>
            <Button
              onClick={() => {
                toast.success('Generando reporte de proyección detallado');
                handleCloseForecastModal();
              }}
            >
              Generar Reporte
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Edición de Producto */}
      <Modal
        isOpen={isProductEditModalOpen}
        onClose={handleCloseProductEditModal}
        title={`Editar ${editedProduct?.name || 'Producto'}`}
        size="lg"
      >
        {editedProduct && (
          <div className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    value={editedProduct.name || ''}
                    onChange={(e) => handleProductFieldChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={editedProduct.category || ''}
                    onChange={(e) => handleProductFieldChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Suplementos">Suplementos</option>
                    <option value="Equipamiento">Equipamiento</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={editedProduct.description || ''}
                  onChange={(e) => handleProductFieldChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Información financiera */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Información Financiera</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio de Venta ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editedProduct.price || 0}
                    onChange={(e) => handleProductFieldChange('price', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Costo de Producción ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editedProduct.cost || 0}
                    onChange={(e) => handleProductFieldChange('cost', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Disponible
                  </label>
                  <input
                    type="number"
                    value={editedProduct.stock || 0}
                    onChange={(e) => handleProductFieldChange('stock', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Configuración de temporada */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Configuración de Temporada</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de Demanda Estacional
                </label>
                <select
                  value={editedProduct.seasonality || 'medium'}
                  onChange={(e) => handleProductFieldChange('seasonality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Baja demanda</option>
                  <option value="medium">Demanda media</option>
                  <option value="high">Alta demanda</option>
                </select>
              </div>
            </div>

            {/* Resumen de cambios */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Resumen de Cambios</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Margen calculado:</p>
                  <p className="font-semibold text-gray-900">
                    ${((editedProduct.price || 0) - (editedProduct.cost || 0)).toFixed(2)} 
                    ({(((editedProduct.price || 0) - (editedProduct.cost || 0)) / (editedProduct.price || 1) * 100).toFixed(1)}%)
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Valor total del inventario:</p>
                  <p className="font-semibold text-gray-900">
                    ${((editedProduct.cost || 0) * (editedProduct.stock || 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleCloseProductEditModal}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProduct}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Configuración */}
      <Modal
        isOpen={isConfigModalOpen}
        onClose={handleCloseConfigModal}
        title="Configuración de Informes"
        size="xl"
      >
        <div className="space-y-8">
          {/* Configuración de Actualización Automática */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              Actualización Automática
            </h3>
            <div className="bg-gray-50 p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Actualización automática</p>
                  <p className="text-sm text-gray-600">Los datos se actualizarán automáticamente</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.autoRefresh}
                    onChange={(e) => handleConfigChange('autoRefresh', '', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Intervalo de actualización:</label>
                <select
                  value={config.refreshInterval}
                  onChange={(e) => handleConfigChange('refreshInterval', '', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={120}>2 horas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Configuración de Métricas Visibles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              Métricas Visibles
            </h3>
            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              {Object.entries(config.showMetrics).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      {key === 'dashboard' && <BarChart3 className="w-4 h-4 text-blue-600" />}
                      {key === 'topProductos' && <Star className="w-4 h-4 text-blue-600" />}
                      {key === 'analisisMargen' && <PieChart className="w-4 h-4 text-blue-600" />}
                      {key === 'tendencias' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {key === 'dashboard' ? 'Dashboard de Ventas' :
                         key === 'topProductos' ? 'Top Productos' :
                         key === 'analisisMargen' ? 'Análisis de Margen' :
                         'Tendencias de Venta'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {key === 'dashboard' ? 'Muestra el dashboard principal de ventas' :
                         key === 'topProductos' ? 'Ranking de productos más vendidos' :
                         key === 'analisisMargen' ? 'Análisis de márgenes por producto' :
                         'Análisis de tendencias temporales'}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleToggleMetric(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Configuración de Notificaciones */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-yellow-600" />
              Notificaciones
            </h3>
            <div className="bg-gray-50 p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Alertas por email</p>
                  <p className="text-sm text-gray-600">Recibir notificaciones por correo electrónico</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.notifications.emailAlerts}
                    onChange={(e) => handleConfigChange('notifications', 'emailAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Umbral de ventas ($)
                  </label>
                  <input
                    type="number"
                    value={config.notifications.salesThreshold}
                    onChange={(e) => handleConfigChange('notifications', 'salesThreshold', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Umbral de margen (%)
                  </label>
                  <input
                    type="number"
                    value={config.notifications.marginThreshold}
                    onChange={(e) => handleConfigChange('notifications', 'marginThreshold', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Configuración de Exportación */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-600" />
              Configuración de Exportación
            </h3>
            <div className="bg-gray-50 p-4 rounded-xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de exportación
                </label>
                <select
                  value={config.exportSettings.format}
                  onChange={(e) => handleConfigChange('exportSettings', 'format', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Incluir gráficos</p>
                    <p className="text-sm text-gray-600">Agregar gráficos al reporte exportado</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.exportSettings.includeCharts}
                      onChange={(e) => handleConfigChange('exportSettings', 'includeCharts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Incluir datos raw</p>
                    <p className="text-sm text-gray-600">Agregar datos sin procesar al reporte</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.exportSettings.includeRawData}
                      onChange={(e) => handleConfigChange('exportSettings', 'includeRawData', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCloseConfigModal}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveConfig}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Configuración
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InformesVentasPage;
