import React, { useEffect, useState } from 'react';
import { getCampaigns, updateCampaign, Campaign } from '../campanasApi';

const SeguimientoResultados: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [leads, setLeads] = useState(0);
  const [conversions, setConversions] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const campaignId = e.target.value;
    setSelectedCampaignId(campaignId);
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setLeads(campaign.leadsGenerated);
      setConversions(campaign.customersConverted);
    } else {
      setLeads(0);
      setConversions(0);
    }
  };

  const handleUpdateResults = async () => {
    if (selectedCampaignId) {
      const campaignToUpdate = campaigns.find(c => c.id === selectedCampaignId);
      if (campaignToUpdate) {
        const updatedCampaign = {
          ...campaignToUpdate,
          leadsGenerated: leads,
          customersConverted: conversions,
          // Recalculate ROI if needed, or assume it's handled elsewhere
        };
        await updateCampaign(updatedCampaign);
        alert('Resultados actualizados!');
        // Refresh campaigns
        const data = await getCampaigns();
        setCampaigns(data);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Seguimiento de Resultados</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="selectCampaign" className="block text-sm font-medium text-gray-700">Seleccionar Campaña</label>
          <select
            id="selectCampaign"
            onChange={handleCampaignChange}
            value={selectedCampaignId || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">-- Selecciona una campaña --</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCampaignId && (
          <>
            <div>
              <label htmlFor="leads" className="block text-sm font-medium text-gray-700">Leads Generados</label>
              <input
                type="number"
                id="leads"
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="conversions" className="block text-sm font-medium text-gray-700">Clientes Convertidos</label>
              <input
                type="number"
                id="conversions"
                value={conversions}
                onChange={(e) => setConversions(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <button
              onClick={handleUpdateResults}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Actualizar Resultados
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SeguimientoResultados;
