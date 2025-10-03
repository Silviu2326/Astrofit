import React, { useEffect, useState } from 'react';
import { fetchTestResults, performStatisticalAnalysis } from '../resultadosTestApi';

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

const AnalisisEstadistico: React.FC = () => {
  const [analysis, setAnalysis] = useState<StatisticalAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const runAnalysis = async () => {
      setLoading(true);
      const results = await fetchTestResults();
      const statisticalAnalysis = await performStatisticalAnalysis(results);
      setAnalysis(statisticalAnalysis);
      setLoading(false);
    };
    runAnalysis();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Análisis Estadístico</h2>
      {loading ? (
        <p>Realizando análisis estadístico...</p>
      ) : analysis ? (
        <div className="space-y-2">
          <p><strong>Valor P:</strong> {analysis.pValue.toFixed(3)}</p>
          <p><strong>Significancia Estadística:</strong> {' '}
            <span className={`font-bold ${analysis.isSignificant ? 'text-green-600' : 'text-red-600'}`}>
              {analysis.isSignificant ? 'Sí' : 'No'}
            </span>
          </p>
          <p><strong>Intervalo de Confianza:</strong> [{analysis.confidenceInterval[0].toFixed(3)}, {analysis.confidenceInterval[1].toFixed(3)}]</p>
          <p className="text-sm text-gray-600 mt-4">
            Un valor P menor a 0.05 generalmente indica significancia estadística.
          </p>
        </div>
      ) : (
        <p>No se pudo realizar el análisis estadístico.</p>
      )}
    </div>
  );
};

export default AnalisisEstadistico;
