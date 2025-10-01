import React, { useEffect, useState } from 'react';
import { fetchTestResults } from '../resultadosTestApi';

interface TestResult {
  variant: string;
  conversions: number;
  clicks: number;
  revenue: number;
  participants: number;
}

const GraficosComparativos: React.FC = () => {
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
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Gráficos Comparativos</h2>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
        {/* Placeholder for comparative charts (e.g., using Chart.js or Recharts) */}
        <p className="text-gray-500">Gráficos de barras comparativos de métricas (conversión, clicks, ingresos)</p>
      </div>
      <div className="mt-4">
        {results.map((result) => (
          <div key={result.variant} className="flex justify-between items-center py-1">
            <span className="font-medium">Variante {result.variant}:</span>
            <span className="text-sm text-gray-600">Conversión: {(result.conversions / result.participants * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraficosComparativos;
