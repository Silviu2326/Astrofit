import React, { useEffect, useState } from 'react';
import { getCampaigns, Campaign } from '../campanasApi';

const CalendarioCampanas: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  // Simple representation of a calendar, could be replaced with a full calendar library
  const getCampaignsForMonth = (month: number, year: number) => {
    return campaigns.filter(campaign => {
      const start = new Date(campaign.startDate);
      const end = new Date(campaign.endDate);
      return (start.getMonth() === month && start.getFullYear() === year) ||
             (end.getMonth() === month && end.getFullYear() === year) ||
             (start.getTime() < new Date(year, month, 1).getTime() && end.getTime() > new Date(year, month + 1, 0).getTime());
    });
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const campaignsThisMonth = getCampaignsForMonth(currentMonth, currentYear);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Calendario de Campañas</h2>
      <h3 className="text-lg font-medium mb-3">Campaña para {new Date(currentYear, currentMonth).toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h3>
      {campaignsThisMonth.length === 0 ? (
        <p className="text-gray-600">No hay campañas planificadas para este mes.</p>
      ) : (
        <ul className="space-y-3">
          {campaignsThisMonth.map((campaign) => (
            <li key={campaign.id} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <h4 className="font-bold text-md text-gray-800">{campaign.name}</h4>
              <p className="text-sm text-gray-600">Estado: <span className={`font-semibold ${
                campaign.status === 'activa' ? 'text-green-600' :
                campaign.status === 'planificada' ? 'text-blue-600' :
                campaign.status === 'finalizada' ? 'text-gray-600' :
                'text-yellow-600'
              }`}>{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</span></p>
              <p className="text-sm text-gray-600">Periodo: {campaign.startDate} a {campaign.endDate}</p>
              <p className="text-sm text-gray-600">Objetivo: {campaign.objective}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm text-gray-500">
        (Este es un calendario simplificado. En una aplicación real, se integraría una librería de calendario más robusta.)
      </p>
    </div>
  );
};

export default CalendarioCampanas;
