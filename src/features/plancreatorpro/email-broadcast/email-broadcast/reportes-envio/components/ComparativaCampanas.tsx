import React, { useEffect, useState } from 'react';
import { fetchComparativaCampanas, ComparativaCampana } from '../reportesEnvioApi';

const ComparativaCampanas: React.FC = () => {
  const [campaigns, setCampaigns] = useState<ComparativaCampana[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCampaigns = async () => {
      const data = await fetchComparativaCampanas();
      setCampaigns(data);
      setLoading(false);
    };
    getCampaigns();
  }, []);

  if (loading) {
    return <div className="p-4 bg-white rounded-lg shadow col-span-full">Cargando comparativa de campañas...</div>;
  }

  if (!campaigns || campaigns.length === 0) {
    return <div className="p-4 bg-white rounded-lg shadow col-span-full">No hay campañas para comparar.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Comparativa de Campañas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaña
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Envío
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasa Apertura (%)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasa Clics (%)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ingresos
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campana) => (
              <tr key={campana.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {campana.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campana.fechaEnvio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campana.tasaApertura}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campana.tasaClics}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${campana.ingresos.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparativaCampanas;