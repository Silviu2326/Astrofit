import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAnalisisPosicional, PosicionEstadisticas } from '../analisisPosicionApi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BarChart3, TrendingUp } from 'lucide-react';

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
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderRadius: 8,
      },
      {
        label: 'Promedio de Asistencias',
        data: data.map(d => d.promedioAsistencias),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 13,
            weight: '600' as const,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Diferencias Posicionales Clave',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          Tablas Comparativas por Posición
        </h2>
      </div>

      {/* Tabla */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-indigo-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Posición
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Promedio Goles
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Promedio Asistencias
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Paradas/Gol
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Pases Completados
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, index) => (
                <motion.tr
                  key={item.posicion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full">
                        {item.posicion}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {item.promedioGoles.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {item.promedioAsistencias.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.paradasPorGol !== undefined ? item.paradasPorGol.toFixed(2) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.pasesCompletados !== undefined ? item.pasesCompletados.toFixed(2) : 'N/A'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráfico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-2xl p-6 border border-indigo-100"
        >
          <Bar data={chartData} options={chartOptions} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TablasPosicionales;
