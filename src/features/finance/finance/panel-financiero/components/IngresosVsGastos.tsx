import React, { useEffect, useState } from 'react';
import { getFinancialSummary, FinancialSummary } from '../panelFinancieroApi';

const IngresosVsGastos: React.FC = () => {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getFinancialSummary();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="bg-white p-4 rounded-lg shadow animate-pulse h-48"></div>;
  }

  const { ingresos, gastos } = summary;
  const total = ingresos + gastos;
  const ingresosWidth = (ingresos / total) * 100;
  const gastosWidth = (gastos / total) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Ingresos vs. Gastos ({summary.currentMonth})</h2>
      <div className="flex items-center mb-2">
        <span className="text-green-600 font-medium w-24">Ingresos:</span>
        <span className="text-green-600 text-lg font-bold">${ingresos.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${ingresosWidth}%` }}
        ></div>
      </div>

      <div className="flex items-center mb-2">
        <span className="text-red-600 font-medium w-24">Gastos:</span>
        <span className="text-red-600 text-lg font-bold">${gastos.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-red-500 h-4 rounded-full"
          style={{ width: `${gastosWidth}%` }}
        ></div>
      </div>

      <div className="text-gray-600 text-sm mt-4">
        <p>Comparativa visual de ingresos y gastos del mes actual.</p>
      </div>
    </div>
  );
};

export default IngresosVsGastos;
