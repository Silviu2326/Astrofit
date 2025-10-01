import React, { useEffect, useState } from 'react';
import { getInvestmentAnalysis, InvestmentAnalysis } from '../fuentesLeadApi';

const AnalisisInversion: React.FC = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      const data = await getInvestmentAnalysis();
      setInvestmentData(data);
      setLoading(false);
    };
    fetchInvestmentData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando análisis de inversión...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Análisis de Inversión por Canal</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inversión (€)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clientes Adquiridos</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo/Cliente (€)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI (%)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investmentData.map((item) => (
              <tr key={item.channel}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.channel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.investment.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.customersAcquired}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.costPerCustomer.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.roi.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalisisInversion;
