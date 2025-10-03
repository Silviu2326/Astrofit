import React, { useEffect, useState } from 'react';
import { getLeadSources, LeadSource } from '../fuentesLeadApi';

const ClasificarLeads: React.FC = () => {
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeadSources = async () => {
      const data = await getLeadSources();
      setLeadSources(data);
      setLoading(false);
    };
    fetchLeadSources();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando clasificación de leads...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Clasificación de Leads por Origen</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origen</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clientes</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa Conversión (%)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo/Lead (€)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo/Cliente (€)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leadSources.map((source) => (
              <tr key={source.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{source.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.leads}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.customers}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.conversionRate.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.costPerLead.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.costPerCustomer.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClasificarLeads;
