import React, { useState, useEffect } from 'react';
import { agenteMarketingApi, ImpactSimulation } from '../agenteMarketingApi';

const SimuladorImpacto: React.FC = () => {
  const [simulation, setSimulation] = useState<ImpactSimulation | null>(null);
  const [loading, setLoading] = useState(false);
  const [campaignId, setCampaignId] = useState('1'); // Mock campaign ID

  const handleSimulateImpact = async () => {
    setLoading(true);
    try {
      const result = await agenteMarketingApi.simulateImpact(campaignId);
      setSimulation(result);
    } catch (error) {
      console.error('Error simulating impact:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSimulateImpact(); // Simulate impact on initial load
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Simulador de Impacto</h2>
      <div className="mb-4">
        <label htmlFor="campaignId" className="block text-sm font-medium text-gray-700">
          ID de Campaña (Mock)
        </label>
        <input
          type="text"
          id="campaignId"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />
        <button
          onClick={handleSimulateImpact}
          className="mt-2 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Simulando...' : 'Simular Impacto'}
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Calculando simulación...</p>}

      {simulation && !loading && (
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Proyección de Leads:</span> {simulation.leadsProjection}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Proyección de Conversiones:</span> {simulation.conversionsProjection}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Proyección de ROI:</span> {(simulation.roiProjection * 100).toFixed(2)}%
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Confianza:</span> {simulation.confidence}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Notas:</span> {simulation.notes}
          </p>
        </div>
      )}

      {!simulation && !loading && <p className="text-center text-gray-500">No hay simulación disponible.</p>}
    </div>
  );
};

export default SimuladorImpacto;
