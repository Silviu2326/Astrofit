import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AsistenciaData } from '../reportesAsistenciaApi';

// Registrar los componentes de Chart.js necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GraficoClasesProps {
  datosClases: AsistenciaData[];
}

const GraficoClases: React.FC<GraficoClasesProps> = ({ datosClases }) => {
  const data = {
    labels: datosClases.map((d) => d.clase),
    datasets: [
      {
        label: 'Número de Asistencias',
        data: datosClases.map((d) => d.asistencias),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        display: false,
        text: 'Asistencia por Clase',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Asistencias',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Clase',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GraficoClases;
