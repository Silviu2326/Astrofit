import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface TarjetasResumenProps {
  data: {
    totalGenerado: number;
    totalPendiente: number;
    totalPagado: number;
    totalProcesando: number;
  };
}

const TarjetasResumen: React.FC<TarjetasResumenProps> = ({ data }) => {
  const { totalGenerado, totalPendiente, totalPagado, totalProcesando } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const handleRefresh = () => {
    toast.success('Actualizando datos de comisiones...');
    // Aquí se implementaría la lógica para refrescar los datos
  };

  const handleViewDetails = (tipo: string) => {
    toast.success(`Mostrando detalles de ${tipo}`);
    // Aquí se implementaría la lógica para mostrar detalles específicos
  };

  return (
    <div className="space-y-4">
      {/* Botón de actualizar */}
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar Datos
        </button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium opacity-90">Total Generado</p>
            <button
              onClick={() => handleViewDetails('Total Generado')}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(totalGenerado)}</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5%</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium opacity-90">Pendiente de Pago</p>
            <button
              onClick={() => handleViewDetails('Pendiente de Pago')}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(totalPendiente)}</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
            <TrendingDown className="w-4 h-4" />
            <span>-3.2%</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium opacity-90">Total Pagado</p>
            <button
              onClick={() => handleViewDetails('Total Pagado')}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(totalPagado)}</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            <span>+8.7%</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium opacity-90">En Procesamiento</p>
            <button
              onClick={() => handleViewDetails('En Procesamiento')}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(totalProcesando)}</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            <span>+5.1%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarjetasResumen;
