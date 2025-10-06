import React, { useEffect, useState } from 'react';
import { fetchConversionReport, calculateROI } from '../conversionReportApi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface UpsellData {
  id: string;
  name: string;
  offered: number;
  accepted: number;
  revenue: number;
  cost: number;
}

const DashboardConversiones: React.FC = () => {
  const [upsellData, setUpsellData] = useState<UpsellData[]>([]);

  useEffect(() => {
    const getReport = async () => {
      const report = await fetchConversionReport();
      setUpsellData(report.upsells);
    };
    getReport();
  }, []);

  const chartData = {
    labels: upsellData.map(upsell => upsell.name),
    datasets: [
      {
        label: 'Tasa de Conversión (%)',
        data: upsellData.map(upsell => (upsell.offered > 0 ? (upsell.accepted / upsell.offered) * 100 : 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'ROI (%)',
        data: upsellData.map(upsell => calculateROI(upsell.revenue, upsell.cost)),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Conversión y ROI por Upsell',
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detalle de Upsells</h2>
      <div className="mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600">Upsell</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600">Ofrecidos</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600">Aceptados</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600">Tasa Conversión</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600">Ingresos Extra</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600">Costo</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600">ROI (%)</th>
            </tr>
          </thead>
          <tbody>
            {upsellData.map((upsell) => (
              <tr key={upsell.id}>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">{upsell.name}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">{upsell.offered}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">{upsell.accepted}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">{(upsell.offered > 0 ? (upsell.accepted / upsell.offered) * 100 : 0).toFixed(2)}%</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">${upsell.revenue.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">${upsell.cost.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm">{calculateROI(upsell.revenue, upsell.cost).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardConversiones;
