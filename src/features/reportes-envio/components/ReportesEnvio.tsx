import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson, Calendar, RefreshCw } from 'lucide-react';
import { useEmailAnalytics } from '../hooks/useEmailAnalytics';
import EmailMetrics from './EmailMetrics';
import EmailCharts from './EmailCharts';
import { exportToCSV, exportToPDF, exportToJSON } from '../utils/exportReports';

const ReportesEnvio: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Últimos 30 días
    end: new Date(),
  });

  const { analytics, loading, error } = useEmailAnalytics(dateRange);

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!analytics) return;

    const filename = `reporte-email-${new Date().toISOString().split('T')[0]}`;

    switch (format) {
      case 'csv':
        exportToCSV(analytics, filename);
        break;
      case 'pdf':
        exportToPDF(analytics, filename);
        break;
      case 'json':
        exportToJSON(analytics, filename);
        break;
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <p className="text-red-600 dark:text-red-400">{error || 'Error al cargar los datos'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                📊 Reportes de Envío
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analytics y métricas de rendimiento de tus campañas de email
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Selector de Rango de Fechas */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Últimos 30 días
                </span>
              </div>

              {/* Botón Refrescar */}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span className="hidden sm:inline">Refrescar</span>
              </button>

              {/* Botones de Exportación */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport('csv')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  title="Exportar a CSV"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  <span className="hidden sm:inline">CSV</span>
                </button>

                <button
                  onClick={() => handleExport('pdf')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  title="Exportar a PDF"
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden sm:inline">PDF</span>
                </button>

                <button
                  onClick={() => handleExport('json')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  title="Exportar a JSON"
                >
                  <FileJson className="w-5 h-5" />
                  <span className="hidden sm:inline">JSON</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Principales */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-600 via-teal-600 to-cyan-600 rounded-full"></div>
            Métricas Generales
          </h2>
          <EmailMetrics metrics={analytics.metrics} />
        </div>

        {/* Gráficos y Análisis */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-600 via-teal-600 to-cyan-600 rounded-full"></div>
            Análisis Detallado
          </h2>
          <EmailCharts analytics={analytics} />
        </div>

        {/* Insights y Recomendaciones */}
        <div className="bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            💡 Insights y Recomendaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">📈 Rendimiento General</h3>
              <p className="text-sm opacity-90">
                Tu tasa de apertura del {analytics.metrics.openRate}% está{' '}
                {analytics.metrics.openRate >= 50 ? 'por encima' : 'por debajo'} del promedio de la
                industria (50%).
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">🎯 Engagement</h3>
              <p className="text-sm opacity-90">
                Tu tasa de clicks del {analytics.metrics.clickRate}% indica un{' '}
                {analytics.metrics.clickRate >= 30 ? 'excelente' : 'buen'} nivel de engagement con
                tu contenido.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">✅ Calidad de Lista</h3>
              <p className="text-sm opacity-90">
                Con una tasa de rebote del {analytics.metrics.bounceRate}%, tu lista está{' '}
                {analytics.metrics.bounceRate <= 5 ? 'en excelente estado' : 'necesita limpieza'}.
              </p>
            </div>
          </div>
        </div>

        {/* Footer con Información */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Datos actualizados el {new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportesEnvio;
