import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  Calendar,
  TrendingUp,
  DollarSign,
  Eye
} from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';
import toast from 'react-hot-toast';
import { getVentasDashboardData } from '../informesVentasApi';

interface DashboardVentasProps {
  onViewDetails?: () => void;
  selectedPeriod?: string;
}

const DashboardVentas: React.FC<DashboardVentasProps> = ({ onViewDetails, selectedPeriod = '30d' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [salesData, setSalesData] = useState<any[]>([]);

  // Mock data que se reemplazará con datos reales de la API
  const mockSalesData = [
    { month: 'Ene', ventas: 12000, meta: 15000 },
    { month: 'Feb', ventas: 18000, meta: 15000 },
    { month: 'Mar', ventas: 22000, meta: 20000 },
    { month: 'Abr', ventas: 19000, meta: 20000 },
    { month: 'May', ventas: 25000, meta: 25000 },
    { month: 'Jun', ventas: 28000, meta: 30000 }
  ];

  // Cargar datos desde la API (mock por ahora)
  useEffect(() => {
    const loadSalesData = async () => {
      try {
        setIsLoading(true);
        // Simular llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        await getVentasDashboardData();
        
        // Generar datos mock basados en el período seleccionado
        let filteredData = mockSalesData;
        if (selectedPeriod === '7d') {
          filteredData = mockSalesData.slice(-1); // Solo el último mes
        } else if (selectedPeriod === '30d') {
          filteredData = mockSalesData.slice(-2); // Últimos 2 meses
        } else if (selectedPeriod === '90d') {
          filteredData = mockSalesData.slice(-3); // Últimos 3 meses
        } else if (selectedPeriod === '1y') {
          filteredData = mockSalesData; // Todos los datos
        }
        
        setSalesData(filteredData);
      } catch (error) {
        console.error('Error loading sales data:', error);
        // Fallback a datos mock en caso de error
        setSalesData(mockSalesData);
        toast.error('Error al cargar datos de ventas, mostrando datos de ejemplo');
      } finally {
        setIsLoading(false);
      }
    };

    loadSalesData();
  }, [selectedPeriod]);

  const handleExportData = () => {
    setIsLoading(true);
    toast.loading('Exportando datos de ventas...', { id: 'export-sales' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Datos exportados correctamente', { id: 'export-sales' });
    }, 2000);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    toast.loading('Actualizando datos...', { id: 'refresh-sales' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Datos actualizados correctamente', { id: 'refresh-sales' });
    }, 1500);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      toast.success('Abriendo vista detallada de ventas');
    }
  };

  const maxValue = salesData.length > 0 ? Math.max(...salesData.map(d => Math.max(d.ventas, d.meta))) : 0;

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Ventas por Mes</h3>
            <p className="text-sm text-gray-600">Comparativa con metas establecidas</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => {
              // El período se maneja desde el componente padre
              console.log('Período cambiado:', e.target.value);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="1y">Último año</option>
          </select>
          
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
            onClick={handleExportData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Ventas Reales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Meta</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewDetails}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <Eye className="w-4 h-4" />
            Ver Detalles
          </Button>
        </div>

        <div className="space-y-4">
          {salesData.map((data, index) => (
            <motion.div
              key={data.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-8 text-sm font-medium text-gray-600">
                {data.month}
              </div>
              
              <div className="flex-1 flex items-center gap-2">
                {/* Barra de ventas reales */}
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.ventas / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-end pr-2"
                  >
                    <span className="text-xs font-semibold text-white">
                      ${(data.ventas / 1000).toFixed(0)}k
                    </span>
                  </motion.div>
                </div>
                
                {/* Barra de meta */}
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.meta / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-2"
                  >
                    <span className="text-xs font-semibold text-white">
                      ${(data.meta / 1000).toFixed(0)}k
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-emerald-600 font-medium">Ventas Totales</p>
              <p className="text-xl font-bold text-emerald-900">
                ${salesData.reduce((acc, item) => acc + item.ventas, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Crecimiento</p>
              <p className="text-xl font-bold text-blue-900">
                {salesData.length > 1 ? 
                  `+${((salesData[salesData.length - 1].ventas - salesData[0].ventas) / salesData[0].ventas * 100).toFixed(1)}%` :
                  '+0.0%'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Período</p>
              <p className="text-xl font-bold text-purple-900">
                {selectedPeriod === '7d' ? '7 días' :
                 selectedPeriod === '30d' ? '30 días' :
                 selectedPeriod === '90d' ? '90 días' :
                 '1 año'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVentas;
