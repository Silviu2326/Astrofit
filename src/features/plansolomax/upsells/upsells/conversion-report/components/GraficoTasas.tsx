import React, { useEffect, useState } from 'react';
import { fetchConversionReport } from '../conversionReportApi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoTasas: React.FC = () => {
  const [overallConversionRate, setOverallConversionRate] = useState<number>(0);

  useEffect(() => {
    const getReport = async () => {
      const report = await fetchConversionReport();
      setOverallConversionRate(report.overallConversionRate);
    };
    getReport();
  }, []);

  const data = {
    labels: ['Convertido', 'No Convertido'],
    datasets: [
      {
        data: [overallConversionRate, 100 - overallConversionRate],
        backgroundColor: ['#4CAF50', '#FF6384'],
        hoverBackgroundColor: ['#66BB6A', '#FF9F40'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tasa de Conversión General de Upsells',
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasa de Conversión General</h2>
      <div className="relative w-48 h-48">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">{overallConversionRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default GraficoTasas;
