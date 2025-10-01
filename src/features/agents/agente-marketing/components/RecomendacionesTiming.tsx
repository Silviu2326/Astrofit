import React, { useState, useEffect } from 'react';
import { agenteMarketingApi, TimingRecommendation } from '../agenteMarketingApi';

const RecomendacionesTiming: React.FC = () => {
  const [recommendations, setRecommendations] = useState<TimingRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('Leads "oficina"'); // Mock segment

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const result = await agenteMarketingApi.getTimingRecommendations(selectedSegment);
      setRecommendations(result);
    } catch (error) {
      console.error('Error fetching timing recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRecommendations(); // Get recommendations on initial load
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recomendaciones de Timing</h2>
      <div className="mb-4">
        <label htmlFor="segmentSelect" className="block text-sm font-medium text-gray-700">
          Seleccionar Segmento
        </label>
        <select
          id="segmentSelect"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
        >
          <option value='Leads "oficina"'>Leads "oficina"</option>
          <option value='Audiencia joven (18-24)'>Audiencia joven (18-24)</option>
          {/* Add more mock segments as needed */}
        </select>
        <button
          onClick={handleGetRecommendations}
          className="mt-2 w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Obtener Recomendaciones'}
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Cargando recomendaciones...</p>}

      {!loading && recommendations.length === 0 && <p className="text-center text-gray-500">No hay recomendaciones de timing disponibles para este segmento.</p>}

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-gray-700">
              <span className="font-semibold">Segmento:</span> {rec.segment}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Mejor Momento:</span> {rec.bestTime}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Razón:</span> {rec.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomendacionesTiming;
