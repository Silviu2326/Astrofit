import React, { useEffect, useState } from 'react';
import { fetchCampaigns } from '../listadoEmailsApi';

interface Campaign {
  id: string;
  subject: string;
  date: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled';
  performance: 'good' | 'average' | 'bad';
}

const TablaCampanas: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError('Error al cargar las campañas.');
      } finally {
        setLoading(false);
      }
    };
    getCampaigns();
  }, []);

  if (loading) return <p>Cargando campañas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const getPerformanceTag = (performance: 'good' | 'average' | 'bad') => {
    switch (performance) {
      case 'good':
        return <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Bueno</span>;
      case 'average':
        return <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Medio</span>;
      case 'bad':
        return <span className="bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Malo</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Tabla de Campañas</h2>
      {/* Filtros por fecha y estado */}
      <div className="mb-4">
        {/* Implementar filtros aquí */}
        <input type="date" className="border p-2 rounded mr-2" />
        <select className="border p-2 rounded">
          <option value="">Todos los estados</option>
          <option value="sent">Enviado</option>
          <option value="draft">Borrador</option>
          <option value="scheduled">Programado</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asunto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinatarios</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa Apertura</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa Clics</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rendimiento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="px-6 py-4 whitespace-nowrap">{campaign.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{campaign.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{campaign.recipients}</td>
                <td className="px-6 py-4 whitespace-nowrap">{(campaign.openRate * 100).toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-nowrap">{(campaign.clickRate * 100).toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-nowrap">{getPerformanceTag(campaign.performance)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">Duplicar</button>
                  <button className="text-red-600 hover:text-red-900">Archivar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCampanas;
