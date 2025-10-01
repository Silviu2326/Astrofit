import React, { useEffect, useState } from 'react';
import { getFacturas, Factura } from '../cobrosFacturacionApi';

const FacturasAutomaticas: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await getFacturas();
        setFacturas(data);
      } catch (err) {
        setError('Error al cargar las facturas.');
      } finally {
        setLoading(false);
      }
    };
    fetchFacturas();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando facturas automáticas...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Facturas Automáticas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalle</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{factura.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.cliente}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{factura.montoTotal.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    factura.estado === 'Pagada' ? 'bg-green-100 text-green-800' :
                    factura.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {factura.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Ver Detalle</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacturasAutomaticas;
