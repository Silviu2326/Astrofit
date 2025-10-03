import React, { useEffect, useState } from 'react';
import { fetchTestResults } from '../resultadosTestApi';

interface TestResult {
  variant: string;
  conversions: number;
  clicks: number;
  revenue: number;
  participants: number;
}

const DashboardResultados: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const getResults = async () => {
      const data = await fetchTestResults();
      setResults(data);
    };
    getResults();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Dashboard de Resultados</h2>
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.variant} className="border-b pb-2 last:border-b-0">
            <h3 className="text-lg font-medium text-gray-800">Variante {result.variant}</h3>
            <p><strong>Participantes:</strong> {result.participants.toLocaleString()}</p>
            <p><strong>Conversiones:</strong> {result.conversions.toLocaleString()} ({(result.conversions / result.participants * 100).toFixed(2)}%)</p>
            <p><strong>Clicks:</strong> {result.clicks.toLocaleString()}</p>
            <p><strong>Ingresos:</strong> ${result.revenue.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardResultados;
