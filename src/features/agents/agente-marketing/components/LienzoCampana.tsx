import React, { useState } from 'react';
import { AgenteMarketingApi, Campaign } from '../agenteMarketingApi';

const LienzoCampana: React.FC = () => {
  const [campaignName, setCampaignName] = useState('');
  const [objective, setObjective] = useState('');
  const [targetSegment, setTargetSegment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // In a real app, you'd call the API to create a campaign
      // For now, we just simulate it.
      const newCampaign: Omit<Campaign, 'id' | 'status' | 'date'> = {
        name: campaignName,
        objective,
        targetSegment,
      };
      // await AgenteMarketingApi.createCampaign(newCampaign); // Uncomment to use actual API call
      console.log('Campaign created (mock):', newCampaign);
      setMessage('Campaña creada exitosamente!');
      setCampaignName('');
      setObjective('');
      setTargetSegment('');
    } catch (error) {
      setMessage('Error al crear la campaña.');
      console.error('Error creating campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Lienzo de Campaña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">
            Nombre de la Campaña
          </label>
          <input
            type="text"
            id="campaignName"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
            Objetivo
          </label>
          <textarea
            id="objective"
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="targetSegment" className="block text-sm font-medium text-gray-700">
            Segmento Destinatario
          </label>
          <input
            type="text"
            id="targetSegment"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={targetSegment}
            onChange={(e) => setTargetSegment(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Campaña'}
        </button>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default LienzoCampana;
