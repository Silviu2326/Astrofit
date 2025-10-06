import React, { useState, useEffect } from 'react';
import { pagosAfiliadosApi } from '../pagosAfiliadosApi';

interface Pago {
  id: string;
  fecha: string;
  monto: number;
  metodo: 'transferencia' | 'paypal' | 'stripe';
  estado: 'pendiente' | 'procesado' | 'fallido';
  comprobanteUrl?: string;
}

const HistorialPagos: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
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
    try {
      const data = await pagosAfiliadosApi.obtenerHistorialPagos(filtros);
      setPagos(data);
    } catch (error) {
      // Manejar error
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
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            name="fechaInicio"
            id="fechaInicio"
            value={filtros.fechaInicio}
            onChange={handleFiltroChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            name="fechaFin"
            id="fechaFin"
            value={filtros.fechaFin}
            onChange={handleFiltroChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="metodo" className="block text-sm font-medium text-gray-700">Método</label>
          <select
            name="metodo"
            id="metodo"
            value={filtros.metodo}
            onChange={handleFiltroChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="transferencia">Transferencia</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            id="estado"
            value={filtros.estado}
            onChange={handleFiltroChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="procesado">Procesado</option>
            <option value="fallido">Fallido</option>
          </select>
        </div>
      </div>

      {pagos.length === 0 ? (
        <p className="text-gray-500">No hay pagos registrados para los filtros seleccionados.</p>
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
                      <a href={pago.comprobanteUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                        Ver Comprobante
                      </a>
                    ) : (
                      <span>No disponible</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistorialPagos;
