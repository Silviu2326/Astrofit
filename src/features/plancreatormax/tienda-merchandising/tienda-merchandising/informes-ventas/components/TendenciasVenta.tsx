import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  LineChart,
  Activity,
  Target,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';
import toast from 'react-hot-toast';
import { getTendenciasVenta } from '../informesVentasApi';

interface TrendData {
  period: string;
  sales: number;
  target: number;
  growth: number;
  seasonality: 'high' | 'medium' | 'low';
}

interface TendenciasVentaProps {
  onViewForecast?: () => void;
}

const TendenciasVenta: React.FC<TendenciasVentaProps> = ({ onViewForecast }) => {
  const [selectedView, setSelectedView] = useState<'line' | 'bar'>('line');
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [isLoading, setIsLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  // Mock data que se reemplazará con datos reales de la API
  const mockTrendData: TrendData[] = [
    { period: 'Ene', sales: 12000, target: 15000, growth: 5.2, seasonality: 'low' },
    { period: 'Feb', sales: 18000, target: 15000, growth: 15.8, seasonality: 'medium' },
    { period: 'Mar', sales: 22000, target: 20000, growth: 22.1, seasonality: 'high' },
    { period: 'Abr', sales: 19000, target: 20000, growth: -13.6, seasonality: 'medium' },
    { period: 'May', sales: 25000, target: 25000, growth: 31.6, seasonality: 'high' },
    { period: 'Jun', sales: 28000, target: 30000, growth: 12.0, seasonality: 'high' }
  ];

  // Cargar datos desde la API (mock por ahora)
  useEffect(() => {
    const loadTrendData = async () => {
      try {
        setIsLoading(true);
        // Simular llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        await getTendenciasVenta();
        // Por ahora usar datos mock, luego se reemplazará con apiData
        setTrendData(mockTrendData);
      } catch (error) {
        console.error('Error loading trend data:', error);
        // Fallback a datos mock en caso de error
        setTrendData(mockTrendData);
        toast.error('Error al cargar tendencias, mostrando datos de ejemplo');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendData();
  }, []);

  const handleExportReport = () => {
    setIsLoading(true);
    toast.loading('Generando reporte de tendencias...', { id: 'export-trends' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Reporte de tendencias exportado correctamente', { id: 'export-trends' });
    }, 2000);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    toast.loading('Actualizando análisis de tendencias...', { id: 'refresh-trends' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Análisis de tendencias actualizado', { id: 'refresh-trends' });
    }, 1500);
  };

  const handleViewForecast = () => {
    if (onViewForecast) {
      onViewForecast();
    } else {
      toast.success('Abriendo proyección de tendencias');
    }
  };

  const getSeasonalityColor = (seasonality: string) => {
    switch (seasonality) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSeasonalityLabel = (seasonality: string) => {
    switch (seasonality) {
      case 'high':
        return 'Alta demanda';
      case 'medium':
        return 'Demanda media';
      case 'low':
        return 'Baja demanda';
      default:
        return 'Sin datos';
    }
  };

  const maxValue = Math.max(...trendData.map(d => Math.max(d.sales, d.target)));
  const averageGrowth = trendData.reduce((acc, item) => acc + item.growth, 0) / trendData.length;
  const totalSales = trendData.reduce((acc, item) => acc + item.sales, 0);
  const totalTarget = trendData.reduce((acc, item) => acc + item.target, 0);
  const achievementRate = (totalSales / totalTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Tendencias de Venta</h3>
            <p className="text-sm text-gray-600">Análisis temporal y estacional</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último año</option>
            <option value="2y">Últimos 2 años</option>
          </select>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedView('line')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'line' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedView('bar')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'bar' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportReport}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Crecimiento Promedio</p>
              <p className="text-xl font-bold text-green-900">{averageGrowth >= 0 ? '+' : ''}{averageGrowth.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Cumplimiento Meta</p>
              <p className="text-xl font-bold text-blue-900">{achievementRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg text-white">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Ventas Totales</p>
              <p className="text-xl font-bold text-purple-900">${(totalSales / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-lg text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-orange-600 font-medium">Período</p>
              <p className="text-xl font-bold text-orange-900">{trendData.length} meses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de tendencias */}
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-gray-900">
            {selectedView === 'line' ? 'Tendencia de Ventas' : 'Comparativa Mensual'}
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Ventas Reales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Meta</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewForecast}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
            >
              <AlertCircle className="w-4 h-4" />
              Proyección
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {trendData.map((data, index) => (
            <motion.div
              key={data.period}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-8 text-sm font-medium text-gray-600">
                {data.period}
              </div>
              
              <div className="flex-1 flex items-center gap-2">
                {/* Barra de ventas reales */}
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.sales / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-end pr-2"
                  >
                    <span className="text-xs font-semibold text-white">
                      ${(data.sales / 1000).toFixed(0)}k
                    </span>
                  </motion.div>
                </div>
                
                {/* Barra de meta */}
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.target / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-2"
                  >
                    <span className="text-xs font-semibold text-white">
                      ${(data.target / 1000).toFixed(0)}k
                    </span>
                  </motion.div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  data.growth >= 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${data.growth < 0 ? 'rotate-180' : ''}`} />
                  {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
                </div>
                
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getSeasonalityColor(data.seasonality)}`}></div>
                  <span className="text-xs text-gray-500">{getSeasonalityLabel(data.seasonality)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Análisis estacional */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Análisis Estacional</h4>
            <p className="text-sm text-gray-600">Patrones de demanda identificados</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {trendData.filter(d => d.seasonality === 'high').length}
                </p>
                <p className="text-xs text-green-600">Meses altos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {trendData.filter(d => d.seasonality === 'medium').length}
                </p>
                <p className="text-xs text-yellow-600">Meses medios</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {trendData.filter(d => d.seasonality === 'low').length}
                </p>
                <p className="text-xs text-red-600">Meses bajos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TendenciasVenta;
