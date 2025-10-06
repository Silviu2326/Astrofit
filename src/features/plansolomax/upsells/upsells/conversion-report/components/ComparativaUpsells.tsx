import React, { useEffect, useState } from 'react';
import { fetchConversionReport } from '../conversionReportApi';
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

const ComparativaUpsells: React.FC = () => {
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
        label: 'Upsells Ofrecidos',
        data: upsellData.map(upsell => upsell.offered),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Upsells Aceptados',
        data: upsellData.map(upsell => upsell.accepted),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
        text: 'Comparativa de Upsells Ofrecidos vs. Aceptados',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Comparativa de Ofertas de Upsells</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ComparativaUpsells;
