import React, { useEffect, useState } from 'react';
import { getFinancialSummary, FinancialSummary } from '../panelFinancieroApi';

const MargenMensual: React.FC = () => {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getFinancialSummary();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="bg-white p-4 rounded-lg shadow animate-pulse h-32"></div>;
  }

  const { margen, margenPorcentaje } = summary;
  const isPositive = margen > 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Margen Mensual ({summary.currentMonth})</h2>
      <div className="flex flex-col items-center justify-center h-24">
        <p className={`text-4xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          ${margen.toLocaleString()}
        </p>
        <p className={`text-lg ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          ({margenPorcentaje.toFixed(2)}%)
        </p>
      </div>
      <p className="text-gray-600 text-sm mt-4 text-center">Margen aproximado del mes para saber la rentabilidad actual.</p>
    </div>
  );
};

export default MargenMensual;
