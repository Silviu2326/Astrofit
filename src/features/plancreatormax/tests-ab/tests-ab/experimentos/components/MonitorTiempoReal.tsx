import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, RefreshCw, Eye, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchExperiments, Experiment } from '../experimentosApi';

interface MonitorTiempoRealProps {
  onViewDetails: (experiment: Experiment) => void;
}

const MonitorTiempoReal: React.FC<MonitorTiempoRealProps> = ({ onViewDetails }) => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      const data = await fetchExperiments();
      // Simulate real-time updates for conversion rates and significance
      const updatedData = data.map(exp => ({
        ...exp,
        conversionRateA: parseFloat((exp.conversionRateA + (Math.random() * 0.001 - 0.0005)).toFixed(4)),
        conversionRateB: parseFloat((exp.conversionRateB + (Math.random() * 0.001 - 0.0005)).toFixed(4)),
        significance: parseFloat((exp.significance + (Math.random() * 0.01 - 0.005)).toFixed(2)),
      }));
      setExperiments(updatedData);
      setLastUpdate(new Date());
    } catch (error) {
      toast.error('Error al actualizar los datos');
      console.error(error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    toast.success('Datos actualizados');
  };

  const handleExportData = () => {
    const csvContent = [
      ['Experimento', 'Variante A (%)', 'Variante B (%)', 'Significancia (%)', 'Estado'],
      ...experiments.map(exp => [
        exp.name,
        (exp.conversionRateA * 100).toFixed(2),
        (exp.conversionRateB * 100).toFixed(2),
        (exp.significance * 100).toFixed(2),
        exp.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experimentos-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Datos exportados correctamente');
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (rateA: number, rateB: number) => {
    if (rateB > rateA) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (rateB < rateA) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getSignificanceColor = (significance: number) => {
    if (significance >= 0.95) return 'text-green-600 bg-green-100';
    if (significance >= 0.80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSignificanceText = (significance: number) => {
    if (significance >= 0.95) return 'Muy Significativo';
    if (significance >= 0.80) return 'Significativo';
    return 'No Significativo';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Activity className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Monitor en Tiempo Real</h2>
            <p className="text-sm text-gray-600">Seguimiento de métricas en vivo</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Actualizado: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="Actualizar datos"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExportData}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Exportar datos"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {experiments.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Esperando datos de experimentos...</p>
          <p className="text-gray-400 text-sm">Los datos aparecerán aquí cuando tengas experimentos activos</p>
        </div>
      ) : (
        <div className="space-y-6">
          {experiments.map((exp) => (
            <div key={exp.id} className="bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-2xl p-6 border border-slate-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{exp.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSignificanceColor(exp.significance)}`}>
                    {getSignificanceText(exp.significance)}
                  </span>
                  <button 
                    onClick={() => onViewDetails(exp)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Variante A</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Control</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {(exp.conversionRateA * 100).toFixed(2)}%
                  </div>
                  <div className="text-xs text-blue-600">Tasa de conversión</div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">Variante B</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Test</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-green-900">
                      {(exp.conversionRateB * 100).toFixed(2)}%
                    </div>
                    {getTrendIcon(exp.conversionRateA, exp.conversionRateB)}
                  </div>
                  <div className="text-xs text-green-600">Tasa de conversión</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700">Significancia</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">95%</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {(exp.significance * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-purple-600">Nivel de confianza</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Mejora: {((exp.conversionRateB - exp.conversionRateA) / exp.conversionRateA * 100).toFixed(1)}%</span>
                  <span>Estado: {exp.status === 'active' ? 'Activo' : exp.status === 'paused' ? 'Pausado' : 'Completado'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonitorTiempoReal;
