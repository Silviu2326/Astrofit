import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';
import toast from 'react-hot-toast';

interface MarginData {
  id: number;
  product: string;
  category: string;
  cost: number;
  price: number;
  margin: number;
  marginPercent: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

const AnalisisMargen: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'table' | 'chart'>('table');
  const [isLoading, setIsLoading] = useState(false);

  const marginData: MarginData[] = [
    {
      id: 1,
      product: 'Proteína Whey Premium',
      category: 'Suplementos',
      cost: 25.00,
      price: 45.00,
      margin: 20.00,
      marginPercent: 44.4,
      trend: 'up',
      status: 'good'
    },
    {
      id: 2,
      product: 'Creatina Monohidrato',
      category: 'Suplementos',
      cost: 15.00,
      price: 30.00,
      margin: 15.00,
      marginPercent: 50.0,
      trend: 'up',
      status: 'good'
    },
    {
      id: 3,
      product: 'Pre-entrenamiento Energy',
      category: 'Suplementos',
      cost: 18.00,
      price: 35.00,
      margin: 17.00,
      marginPercent: 48.6,
      trend: 'stable',
      status: 'good'
    },
    {
      id: 4,
      product: 'Cinturón de Levantamiento',
      category: 'Equipamiento',
      cost: 35.00,
      price: 60.00,
      margin: 25.00,
      marginPercent: 41.7,
      trend: 'down',
      status: 'warning'
    },
    {
      id: 5,
      product: 'Guantes de Gimnasio',
      category: 'Equipamiento',
      cost: 8.00,
      price: 15.00,
      margin: 7.00,
      marginPercent: 46.7,
      trend: 'up',
      status: 'good'
    },
    {
      id: 6,
      product: 'Camiseta Deportiva',
      category: 'Ropa',
      cost: 12.00,
      price: 25.00,
      margin: 13.00,
      marginPercent: 52.0,
      trend: 'up',
      status: 'good'
    }
  ];

  const handleExportReport = () => {
    setIsLoading(true);
    toast.loading('Generando reporte de márgenes...', { id: 'export-margins' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Reporte de márgenes exportado correctamente', { id: 'export-margins' });
    }, 2000);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    toast.loading('Actualizando análisis de márgenes...', { id: 'refresh-margins' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Análisis de márgenes actualizado', { id: 'refresh-margins' });
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const averageMargin = marginData.reduce((acc, item) => acc + item.marginPercent, 0) / marginData.length;
  const totalRevenue = marginData.reduce((acc, item) => acc + (item.price * 100), 0);
  const totalCost = marginData.reduce((acc, item) => acc + (item.cost * 100), 0);
  const totalMargin = totalRevenue - totalCost;

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Análisis de Margen</h3>
            <p className="text-sm text-gray-600">Margen bruto por producto</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedView('table')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'table' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tabla
            </button>
            <button
              onClick={() => setSelectedView('chart')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'chart' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Gráfico
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Margen Promedio</p>
              <p className="text-xl font-bold text-green-900">{averageMargin.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Margen Total</p>
              <p className="text-xl font-bold text-blue-900">${totalMargin.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg text-white">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Productos</p>
              <p className="text-xl font-bold text-purple-900">{marginData.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      {selectedView === 'table' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Costo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Margen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marginData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.cost.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.margin.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{item.marginPercent.toFixed(1)}%</span>
                        {getTrendIcon(item.trend)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className={`text-sm font-medium ${
                          item.status === 'good' ? 'text-green-600' :
                          item.status === 'warning' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {item.status === 'good' ? 'Óptimo' :
                           item.status === 'warning' ? 'Atención' :
                           'Crítico'}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-gray-900">Distribución de Márgenes</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Óptimo (&gt;45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Atención (35-45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Crítico (&lt;35%)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {marginData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-32 text-sm font-medium text-gray-600 truncate">
                  {item.product}
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.marginPercent}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className={`h-full rounded-full flex items-center justify-end pr-2 ${
                      item.marginPercent >= 45 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      item.marginPercent >= 35 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                  >
                    <span className="text-xs font-semibold text-white">
                      {item.marginPercent.toFixed(1)}%
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalisisMargen;
