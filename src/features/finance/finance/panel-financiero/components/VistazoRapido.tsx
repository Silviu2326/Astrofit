import React, { useEffect, useState } from 'react';
import { getFinancialSummary, FinancialSummary } from '../panelFinancieroApi';

const VistazoRapido: React.FC = () => {
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

  const { cierraEnPositivo, currentMonth } = summary;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Vistazo Rápido ({currentMonth})</h2>
      <div className="flex flex-col items-center justify-center h-24">
        {cierraEnPositivo ? (
          <p className="text-5xl font-bold text-green-600">¡Positivo!</p>
        ) : (
          <p className="text-5xl font-bold text-red-600">¡Negativo!</p>
        )}
      </div>
      <p className="text-gray-600 text-sm mt-4 text-center">Saber de un golpe de vista si el mes cierra en positivo.</p>
    </div>
  );
};

export default VistazoRapido;
