import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Download, Eye, Calendar, Filter, RefreshCw, X, Search, History } from 'lucide-react';
import { pagosAfiliadosApi } from '../pagosAfiliadosApi';

interface Pago {
  id: string;
  fecha: string;
  monto: number;
  metodo: 'transferencia' | 'paypal' | 'stripe';
  estado: 'pendiente' | 'procesado' | 'fallido';
  comprobanteUrl?: string;
}

interface HistorialPagosProps {
  onShowComprobante?: (pago: Pago) => void;
}

const HistorialPagos: React.FC<HistorialPagosProps> = ({ onShowComprobante }) => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: '',
    metodo: '',
    estado: '',
  });

  useEffect(() => {
    fetchPagos();
  }, [filtros]);

  const fetchPagos = async () => {
    setIsLoading(true);
    try {
      const data = await pagosAfiliadosApi.obtenerHistorialPagos(filtros);
      // Ensure data is always an array
      setPagos(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Error al cargar el historial de pagos');
      console.error('Error al obtener historial de pagos:', error);
      // Set empty array on error to prevent crashes
      setPagos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  const getMetodoIcon = (metodo: Pago['metodo']) => {
    switch (metodo) {
      case 'transferencia':
        return <span className="text-blue-500">🏦</span>; // Icono de banco
      case 'paypal':
        return <span className="text-indigo-600">🅿️</span>; // Icono de PayPal
      case 'stripe':
        return <span className="text-purple-600">💳</span>; // Icono de tarjeta (Stripe)
      default:
        return null;
    }
  };

  const handleRefresh = () => {
    toast.loading('Actualizando historial...', { duration: 1000 });
    fetchPagos();
  };

  const handleExportReport = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const reportData = await pagosAfiliadosApi.exportarReporteFiscal(currentYear);
      
      // Crear y descargar el archivo
      const blob = new Blob([reportData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte-pagos-${currentYear}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Reporte exportado correctamente');
    } catch (error) {
      toast.error('Error al exportar el reporte');
      console.error('Error al exportar reporte:', error);
    }
  };

  const handleClearFilters = () => {
    setFiltros({
      fechaInicio: '',
      fechaFin: '',
      metodo: '',
      estado: '',
    });
    toast.success('Filtros limpiados');
  };

  const hasActiveFilters = () => {
    return filtros.fechaInicio || filtros.fechaFin || filtros.metodo || filtros.estado;
  };

  const getEstadoColor = (estado: Pago['estado']) => {
    switch (estado) {
      case 'pendiente':
        return 'text-yellow-600';
      case 'procesado':
        return 'text-green-600';
      case 'fallido':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative z-10 p-6">
        {/* Header con acciones */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Historial de Pagos
              </h3>
              <p className="text-sm text-gray-500">Gestiona y consulta todos los pagos realizados</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-200 hover:shadow-md"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
            <button
              onClick={handleExportReport}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>

      {/* Filtros Mejorados */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-6 border border-slate-200/50 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Filtros de Búsqueda</h4>
            </div>
            {hasActiveFilters() && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
                Limpiar Filtros
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="fechaInicio" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-blue-500" />
                Fecha Inicio
              </label>
              <input
                type="date"
                name="fechaInicio"
                id="fechaInicio"
                value={filtros.fechaInicio}
                onChange={handleFiltroChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="fechaFin" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-blue-500" />
                Fecha Fin
              </label>
              <input
                type="date"
                name="fechaFin"
                id="fechaFin"
                value={filtros.fechaFin}
                onChange={handleFiltroChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="metodo" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Filter className="w-4 h-4 text-purple-500" />
                Método de Pago
              </label>
              <select
                name="metodo"
                id="metodo"
                value={filtros.metodo}
                onChange={handleFiltroChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
              >
                <option value="">Todos los métodos</option>
                <option value="transferencia">🏦 Transferencia</option>
                <option value="paypal">🅿️ PayPal</option>
                <option value="stripe">💳 Stripe</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="estado" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Filter className="w-4 h-4 text-emerald-500" />
                Estado del Pago
              </label>
              <select
                name="estado"
                id="estado"
                value={filtros.estado}
                onChange={handleFiltroChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">⏳ Pendiente</option>
                <option value="procesado">✅ Procesado</option>
                <option value="fallido">❌ Fallido</option>
              </select>
            </div>
          </div>
          
          {hasActiveFilters() && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {filtros.fechaInicio && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Desde: {new Date(filtros.fechaInicio).toLocaleDateString()}
                  <button
                    onClick={() => setFiltros({...filtros, fechaInicio: ''})}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filtros.fechaFin && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Hasta: {new Date(filtros.fechaFin).toLocaleDateString()}
                  <button
                    onClick={() => setFiltros({...filtros, fechaFin: ''})}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filtros.metodo && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Método: {filtros.metodo}
                  <button
                    onClick={() => setFiltros({...filtros, metodo: ''})}
                    className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filtros.estado && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                  Estado: {filtros.estado}
                  <button
                    onClick={() => setFiltros({...filtros, estado: ''})}
                    className="ml-1 hover:bg-emerald-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {!Array.isArray(pagos) || pagos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {isLoading ? 'Cargando pagos...' : 'No hay pagos registrados para los filtros seleccionados.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comprobante
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pagos.map((pago) => (
                <tr key={pago.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(pago.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${pago.monto.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    {getMetodoIcon(pago.metodo)}
                    <span className="ml-2 capitalize">{pago.metodo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(pago.estado)} bg-opacity-20`}>
                      {pago.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pago.comprobanteUrl ? (
                      <button
                        onClick={() => {
                          if (onShowComprobante) {
                            onShowComprobante(pago);
                          } else {
                            // Fallback si no se pasa la función
                            window.open(pago.comprobanteUrl, '_blank');
                            toast.success('Abriendo comprobante de pago');
                          }
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors hover:shadow-sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Comprobante
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1.5 text-sm text-gray-400 bg-gray-50 rounded-lg">
                        No disponible
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default HistorialPagos;
