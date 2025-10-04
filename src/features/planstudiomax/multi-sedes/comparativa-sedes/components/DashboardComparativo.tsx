import React, { useEffect, useState } from 'react';
import { fetchComparativaSedes, SedeMetrics } from '../comparativaSedesApi';

const DashboardComparativo: React.FC = () => {
  const [sedesData, setSedesData] = useState<SedeMetrics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSedesData = async () => {
      const data = await fetchComparativaSedes();
      setSedesData(data);
      setLoading(false);
    };
    getSedesData();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando datos...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard Comparativo de Sedes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sede
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ingresos
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clientes Activos
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rendimiento (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sedesData.map((sede) => (
              <tr key={sede.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sede.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${sede.ingresos.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sede.clientesActivos.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sede.indicadorRendimiento}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardComparativo;
