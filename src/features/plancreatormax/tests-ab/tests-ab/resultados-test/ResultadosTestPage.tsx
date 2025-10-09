import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Download, Brain, Target, FileText, Share2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardResultados from './components/DashboardResultados';
import GraficosComparativos from './components/GraficosComparativos';
import AnalisisEstadistico from './components/AnalisisEstadistico';
import RecomendacionesIA from './components/RecomendacionesIA';
import { exportReport } from './resultadosTestApi';

const ResultadosTestPage: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Función para exportar reporte completo
  const handleExportFullReport = async () => {
    setIsExporting(true);
    try {
      await exportReport('PDF');
      toast.success('Reporte completo exportado exitosamente', {
        duration: 4000,
        icon: '📊',
      });
    } catch (error) {
      toast.error('Error al exportar el reporte completo', {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Función para exportar resumen
  const handleExportSummary = async () => {
    setIsExporting(true);
    try {
      await exportReport('Resumen');
      toast.success('Resumen exportado exitosamente', {
        duration: 4000,
        icon: '📋',
      });
    } catch (error) {
      toast.error('Error al exportar el resumen', {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Función para refrescar datos
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      // Simular recarga de datos
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Datos actualizados correctamente', {
        duration: 3000,
        icon: '🔄',
      });
    } catch (error) {
      toast.error('Error al actualizar los datos', {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Función para compartir resultados
  const handleShareResults = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Resultados Tests A/B - Astrofit',
          text: 'Revisa los resultados de nuestros experimentos A/B',
          url: window.location.href,
        });
        toast.success('Resultados compartidos exitosamente', {
          duration: 3000,
          icon: '🔗',
        });
      } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(window.location.href);
        toast.success('Enlace copiado al portapapeles', {
          duration: 3000,
          icon: '📋',
        });
      }
    } catch (error) {
      toast.error('Error al compartir los resultados', {
        duration: 4000,
        icon: '❌',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
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
              Resultados <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Tests A/B</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Analiza el rendimiento de tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">experimentos</span> con métricas detalladas y insights accionables
          </p>

          {/* Indicadores pills y botones de acción */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">+23.5% Conversión</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">95% Confianza</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Brain className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">IA Insights</span>
            </div>
            
            {/* Botones de acción */}
            <motion.button
              onClick={handleRefreshData}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-semibold text-white">
                {isRefreshing ? 'Actualizando...' : 'Actualizar'}
              </span>
            </motion.button>

            <motion.button
              onClick={handleShareResults}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Share2 className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Compartir</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Grid de Contenido Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Dashboard de Resultados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <DashboardResultados />
          </div>
        </motion.div>

        {/* Gráficos Comparativos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <GraficosComparativos />
          </div>
        </motion.div>
      </div>

      {/* Grid de Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Análisis Estadístico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <AnalisisEstadistico />
          </div>
        </motion.div>

        {/* Recomendaciones IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <RecomendacionesIA />
          </div>
        </motion.div>
      </div>

      {/* Sección de Exportación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Exportación de Reportes</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            Descarga reportes completos con todos los datos, gráficos y análisis estadísticos de tus experimentos A/B.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={handleExportFullReport}
              disabled={isExporting}
              whileHover={{ scale: isExporting ? 1 : 1.05 }}
              whileTap={{ scale: isExporting ? 1 : 0.95 }}
              className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 text-white font-semibold border border-white/20 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Efecto hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Decoración */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10 flex items-center gap-2">
                {isExporting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {isExporting ? 'Exportando...' : 'Exportar Reporte Completo'}
              </div>
            </motion.button>

            <motion.button
              onClick={handleExportSummary}
              disabled={isExporting}
              whileHover={{ scale: isExporting ? 1 : 1.05 }}
              whileTap={{ scale: isExporting ? 1 : 0.95 }}
              className="px-6 py-3 border-2 border-indigo-500 text-indigo-600 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
              {isExporting ? 'Exportando...' : 'Exportar Resumen'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultadosTestPage;
