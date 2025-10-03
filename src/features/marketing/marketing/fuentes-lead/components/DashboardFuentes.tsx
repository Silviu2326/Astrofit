import React, { useEffect, useState } from 'react';
import { getLeadSources, getLeadQuality, LeadSource, LeadQuality } from '../fuentesLeadApi';

// Mock Chart Component (replace with actual chart library like Recharts, Chart.js, etc.)
const PieChart: React.FC<{ data: { name: string; value: number; fill: string }[] }> = ({ data }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  let startAngle = 0;

  return (
    <svg width="100%" height="200" viewBox="0 0 200 200">
      {data.map((entry, index) => {
        const angle = (entry.value / total) * 360;
        const largeArcFlag = angle > 180 ? 1 : 0;

        const startRad = (Math.PI / 180) * startAngle;
        const endRad = (Math.PI / 180) * (startAngle + angle);

        const x1 = 100 + 90 * Math.cos(startRad);
        const y1 = 100 + 90 * Math.sin(startRad);
        const x2 = 100 + 90 * Math.cos(endRad);
        const y2 = 100 + 90 * Math.sin(endRad);

        const d = [
          `M 100,100`,
          `L ${x1},${y1}`,
          `A 90,90 0 ${largeArcFlag} 1 ${x2},${y2}`,
          `Z`,
        ].join(' ');

        startAngle += angle;

        return <path key={index} d={d} fill={entry.fill} />;
      })}
      {/* Center circle for donut effect */}
      <circle cx="100" cy="100" r="40" fill="white" />
    </svg>
  );
};

const DashboardFuentes: React.FC = () => {
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [leadQuality, setLeadQuality] = useState<LeadQuality[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const sources = await getLeadSources();
      const quality = await getLeadQuality();
      setLeadSources(sources);
      setLeadQuality(quality);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando dashboard...</div>;
  }

  const leadDistributionData = leadSources.map(source => ({
    name: source.name,
    value: source.leads,
    fill: `#${Math.floor(Math.random() * 16777215).toString(16)}` // Random color for mock
  }));

  const customerDistributionData = leadSources.map(source => ({
    name: source.name,
    value: source.customers,
    fill: `#${Math.floor(Math.random() * 16777215).toString(16)}` // Random color for mock
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Dashboard de Fuentes de Lead</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-md font-medium text-gray-600 mb-2">Distribución de Leads</h4>
          <PieChart data={leadDistributionData} />
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {leadDistributionData.map((entry, index) => (
              <span key={index} className="flex items-center text-sm text-gray-600">
                <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.fill }}></span>
                {entry.name} ({((entry.value / leadSources.reduce((sum, s) => sum + s.leads, 0)) * 100).toFixed(1)}%)
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-600 mb-2">Distribución de Clientes</h4>
          <PieChart data={customerDistributionData} />
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {customerDistributionData.map((entry, index) => (
              <span key={index} className="flex items-center text-sm text-gray-600">
                <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.fill }}></span>
                {entry.name} ({((entry.value / leadSources.reduce((sum, s) => sum + s.customers, 0)) * 100).toFixed(1)}%)
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-600 mb-2">Calidad de Leads por Fuente</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuente</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calidad (1-10)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. a MQL (%)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. a SQL (%)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leadQuality.map((item) => (
                <tr key={item.source}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qualityScore.toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.conversionToMQL * 100).toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.conversionToSQL * 100).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-600 mb-2">Métricas Clave</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-600">Total Leads</p>
            <p className="text-xl font-bold text-blue-800">{leadSources.reduce((sum, s) => sum + s.leads, 0)}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-600">Total Clientes</p>
            <p className="text-xl font-bold text-green-800">{leadSources.reduce((sum, s) => sum + s.customers, 0)}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-yellow-600">ROI Promedio</p>
            <p className="text-xl font-bold text-yellow-800">{((leadSources.reduce((sum, s) => sum + s.roi, 0) / leadSources.filter(s => s.roi !== Infinity).length) || 0).toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFuentes;
