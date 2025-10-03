import React, { useEffect, useState } from 'react';
import { getCampaigns, Campaign } from '../campanasApi';

const HistorialCampanas: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setCampaigns(data.filter(c => c.status === 'finalizada'));
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Historial de Campañas Finalizadas</h2>
      {campaigns.length === 0 ? (
        <p className="text-gray-600">No hay campañas finalizadas para mostrar.</p>
      ) : (
        <ul className="space-y-3">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">{campaign.name}</h3>
              <p className="text-sm text-gray-600">Objetivo: {campaign.objective}</p>
              <p className="text-sm text-gray-600">Fecha: {campaign.startDate} - {campaign.endDate}</p>
              <p className="text-sm text-gray-600">Leads: {campaign.leadsGenerated}, Clientes: {campaign.customersConverted}</p>
              <p className="text-sm text-gray-600">ROI: {campaign.roi}%</p>
              <p className="text-sm text-gray-600">Template usado: {campaign.template}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorialCampanas;
