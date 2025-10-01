
// src/features/analisis-posicion/components/TablasPosicionales.tsx

import React, { useEffect, useState } from 'react';
import { fetchAnalisisPosicional, PosicionEstadisticas } from '../analisisPosicionApi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TablasPosicionales: React.FC = () => {
  const [data, setData] = useState<PosicionEstadisticas[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchAnalisisPosicional();
      setData(result);
    };
    getData();
  }, []);

  const chartData = {
    labels: data.map(d => d.posicion),
    datasets: [
      {
        label: 'Promedio de Goles',
        data: data.map(d => d.promedioGoles),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Promedio de Asistencias',
        data: data.map(d => d.promedioAsistencias),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      // Añadir más datasets para otras métricas si es necesario
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
        text: 'Diferencias Posicionales Clave',
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-3">Tablas Comparativas por Posición</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio Goles</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio Asistencias</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paradas/Gol (Porteros)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pases Completados (Medios)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.posicion}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.posicion}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.promedioGoles.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.promedioAsistencias.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.paradasPorGol !== undefined ? item.paradasPorGol.toFixed(2) : 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pasesCompletados !== undefined ? item.pasesCompletados.toFixed(2) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TablasPosicionales;
