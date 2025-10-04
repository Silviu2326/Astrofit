import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Target, 
  PieChart,
  Activity,
  ArrowUpRight,
  Star
} from 'lucide-react';
import DashboardVentas from './components/DashboardVentas';
import TopProductos from './components/TopProductos';
import AnalisisMargen from './components/AnalisisMargen';
import TendenciasVenta from './components/TendenciasVenta';

const InformesVentasPage: React.FC = () => {
  const metrics = [
    { title: 'Ventas Totales', value: '$45,678', change: '+18.2%', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
    { title: 'Productos Vendidos', value: '1,234', change: '+12.5%', icon: Target, color: 'from-blue-500 to-purple-600' },
    { title: 'Margen Promedio', value: '34.5%', change: '+2.1%', icon: PieChart, color: 'from-purple-500 to-pink-500' },
    { title: 'Crecimiento', value: '+25.3%', change: '+5.7%', icon: TrendingUp, color: 'from-orange-500 to-red-500' }
  ];

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

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
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
              <DashboardVentas />
            </div>
          </motion.div>

          {/* Top Productos */}
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
              <TopProductos />
            </div>
          </motion.div>

          {/* Análisis de Margen */}
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

          {/* Tendencias de Venta */}
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
              <TendenciasVenta />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InformesVentasPage;
