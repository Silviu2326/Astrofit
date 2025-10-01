import React, { useEffect, useState } from 'react';
import { getCampaigns, Campaign } from '../campanasApi';

const MetricasCampana: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{
    leadsGenerated: number;
    customersConverted: number;
    conversionRate: string;
    roi: number;
    costPerLead: string;
  } | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (selectedCampaignId) {
      const campaign = campaigns.find(c => c.id === selectedCampaignId);
      if (campaign) {
        const conversionRate = campaign.leadsGenerated > 0
          ? ((campaign.customersConverted / campaign.leadsGenerated) * 100).toFixed(2) + '%'
          : '0.00%';
        const costPerLead = campaign.leadsGenerated > 0
          ? (campaign.cost / campaign.leadsGenerated).toFixed(2)
          : '0.00';

        setMetrics({
          leadsGenerated: campaign.leadsGenerated,
          customersConverted: campaign.customersConverted,
          conversionRate,
          roi: campaign.roi,
          costPerLead: `$${costPerLead}`,
        });
      }
    } else {
      setMetrics(null);
    }
  }, [selectedCampaignId, campaigns]);

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCampaignId(e.target.value);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Métricas de Campaña</h2>
      <div className="mb-4">
        <label htmlFor="selectCampaignMetrics" className="block text-sm font-medium text-gray-700">Seleccionar Campaña</label>
        <select
          id="selectCampaignMetrics"
          onChange={handleCampaignChange}
          value={selectedCampaignId || ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">-- Selecciona una campaña --</option>
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name} ({campaign.status})
            </option>
          ))}
        </select>
      </div>

      {metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm font-medium text-blue-700">Leads Generados</p>
            <p className="text-2xl font-bold text-blue-900">{metrics.leadsGenerated}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <p className="text-sm font-medium text-green-700">Clientes Convertidos</p>
            <p className="text-2xl font-bold text-green-900">{metrics.customersConverted}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-md">
            <p className="text-sm font-medium text-purple-700">Tasa de Conversión</p>
            <p className="text-2xl font-bold text-purple-900">{metrics.conversionRate}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-md">
            <p className="text-sm font-medium text-yellow-700">ROI</p>
            <p className="text-2xl font-bold text-yellow-900">{metrics.roi}%</p>
          </div>
          <div className="bg-red-50 p-3 rounded-md">
            <p className="text-sm font-medium text-red-700">Costo por Lead</p>
            <p className="text-2xl font-bold text-red-900">{metrics.costPerLead}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Selecciona una campaña para ver sus métricas.</p>
      )}
    </div>
  );
};

export default MetricasCampana;
