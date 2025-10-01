import React, { useEffect, useState } from 'react';
import { fetchTestResults, performStatisticalAnalysis, getAIRecommendations } from '../resultadosTestApi';

interface TestResult {
  variant: string;
  conversions: number;
  clicks: number;
  revenue: number;
  participants: number;
}

interface StatisticalAnalysis {
  pValue: number;
  isSignificant: boolean;
  confidenceInterval: [number, number];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  action: string;
}

const RecomendacionesIA: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const results = await fetchTestResults();
      const analysis = await performStatisticalAnalysis(results);
      const aiRecommendations = await getAIRecommendations(analysis);
      setRecommendations(aiRecommendations);
      setLoading(false);
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recomendaciones de IA</h2>
      {loading ? (
        <p>Generando recomendaciones de IA...</p>
      ) : recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border-b pb-2 last:border-b-0">
              <h3 className="text-lg font-medium text-gray-800">{rec.title}</h3>
              <p className="text-gray-600">{rec.description}</p>
              <p className="text-sm text-blue-600">Acción sugerida: {rec.action}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay recomendaciones de IA disponibles en este momento.</p>
      )}
    </div>
  );
};

export default RecomendacionesIA;
