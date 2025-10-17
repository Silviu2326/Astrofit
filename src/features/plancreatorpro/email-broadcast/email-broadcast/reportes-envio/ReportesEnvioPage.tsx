import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, Eye, MousePointer, Users, FileText, Table, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardMetricas from './components/DashboardMetricas';
import EmbudoConversion from './components/EmbudoConversion';
import AnalisisIngresos from './components/AnalisisIngresos';
import ComparativaCampanas from './components/ComparativaCampanas';
import Modal from '../../../../../components/ui/modal';

const ReportesEnvioPage: React.FC = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'excel' | 'csv' | null>(null);

  const handleExport = async (type: 'pdf' | 'excel' | 'csv') => {
    setExportType(type);
    setIsExportModalOpen(true);
  };

  const confirmExport = async () => {
    if (!exportType) return;

    const loadingToast = toast.loading(`Generando reporte ${exportType.toUpperCase()}...`);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Reporte ${exportType.toUpperCase()} generado exitosamente`, {
        id: loadingToast,
        duration: 4000,
      });
      
      // Simulate file download
      const fileName = `reporte-email-${new Date().toISOString().split('T')[0]}.${exportType}`;
      const link = document.createElement('a');
      link.href = '#'; // In a real app, this would be the actual file URL
      link.download = fileName;
      link.click();
      
    } catch (error) {
      toast.error(`Error al generar el reporte ${exportType.toUpperCase()}`, {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsExportModalOpen(false);
      setExportType(null);
    }
  };

  const getExportIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'excel': return <FileSpreadsheet className="w-5 h-5" />;
      case 'csv': return <Table className="w-5 h-5" />;
      default: return <Download className="w-5 h-5" />;
    }
  };

  const getExportDescription = (type: string) => {
    switch (type) {
      case 'pdf': return 'Genera un reporte completo en formato PDF con gráficos y métricas detalladas.';
      case 'excel': return 'Exporta los datos en formato Excel para análisis avanzado y manipulación de datos.';
      case 'csv': return 'Descarga los datos en formato CSV para importar en otras herramientas de análisis.';
      default: return '';
    }
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
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Reportes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Email</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Analiza el rendimiento de tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">campañas de email</span> con métricas detalladas y insights accionables
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Eye className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">22.5% Apertura</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <MousePointer className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">4.8% Clics</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">2.5K Suscriptores</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Métricas principales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <DashboardMetricas />
      </motion.div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <EmbudoConversion />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <AnalisisIngresos />
        </motion.div>
      </div>

      {/* Comparativa de campañas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <ComparativaCampanas />
      </motion.div>

      {/* Opciones de exportación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl backdrop-blur-sm">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              Opciones de Exportación
            </h2>
          </div>
          <p className="text-gray-600 mb-6">Exporta tus reportes en diferentes formatos para análisis externos o presentaciones.</p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              Exportar PDF
            </button>
            <button 
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Exportar Excel
            </button>
            <button 
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Table className="w-5 h-5" />
              Exportar CSV
            </button>
          </div>
        </div>
      </motion.div>

      {/* Export Confirmation Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => {
          setIsExportModalOpen(false);
          setExportType(null);
        }}
        title={`Confirmar Exportación ${exportType?.toUpperCase()}`}
        size="md"
      >
        {exportType && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-3 bg-blue-100 rounded-xl">
                {getExportIcon(exportType)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Exportar como {exportType.toUpperCase()}
                </h3>
                <p className="text-sm text-gray-600">
                  {getExportDescription(exportType)}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Incluir en el reporte:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Métricas principales de email marketing</li>
                <li>• Embudo de conversión</li>
                <li>• Análisis de ingresos por campaña</li>
                <li>• Comparativa de campañas</li>
                <li>• Gráficos y visualizaciones</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsExportModalOpen(false);
                  setExportType(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmExport}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Generar Reporte
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReportesEnvioPage;