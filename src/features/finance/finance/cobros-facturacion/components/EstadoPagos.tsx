import React, { useEffect, useState } from 'react';
import { getCobros, Cobro } from '../cobrosFacturacionApi';

const EstadoPagos: React.FC = () => {
  const [cobros, setCobros] = useState<Cobro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCobros = async () => {
      try {
        const data = await getCobros();
        setCobros(data);
      } catch (err) {
        setError('Error al cargar el estado de pagos.');
      } finally {
        setLoading(false);
      }
    };
    fetchCobros();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando estado de pagos...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  const getStatusColor = (estado: Cobro['estado']) => {
    switch (estado) {
      case 'Pagado': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Fallido': return 'bg-red-100 text-red-800';
      case 'En Proceso': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Estado de Pagos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Cobro</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actualización</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cobros.map((cobro) => (
              <tr key={cobro.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cobro.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cobro.cliente}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{cobro.monto.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(cobro.estado)}`}>
                    {cobro.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cobro.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstadoPagos;
