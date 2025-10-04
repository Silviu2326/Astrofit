import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPostSesion: React.FC = () => {
  // Datos de ejemplo para las gráficas
  const cargaTotalData = {
    labels: ['Sesión 1', 'Sesión 2', 'Sesión 3', 'Sesión Actual'],
    datasets: [
      {
        label: 'Carga Total (UA)',
        data: [120, 135, 110, 145],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const aceleracionesData = {
    labels: ['0-10m', '10-20m', '20-30m'],
    datasets: [
      {
        label: 'Aceleraciones (m/s²)',
        data: [3.5, 2.8, 2.1],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard de Análisis Post-Sesión</h2>

      {/* Resumen Ejecutivo */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Resumen Ejecutivo de la Sesión</h3>
        <p className="text-gray-700">
          Esta sesión mostró una carga total elevada, con picos de intensidad en los primeros 30 minutos.
          El atleta mantuvo un buen rendimiento en las zonas de alta intensidad, pero se observa un incremento
          en los indicadores de fatiga hacia el final.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Carga Total: 145 UA (Alto)</li>
          <li>Distancia Recorrida: 5.2 km</li>
          <li>Aceleraciones Máximas: 3.5 m/s²</li>
          <li>Fatiga Acumulada: Moderada</li>
        </ul>
      </div>

      {/* Métricas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Carga Total y Comparativa</h3>
          <div className="h-64">
            <Line data={cargaTotalData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Aceleraciones</h3>
          <div className="h-64">
            <Bar data={aceleracionesData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Datos Básicos por Atleta */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Datos por Atleta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Tiempo en Zonas de Intensidad:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Zona 1 (Baja): 30 min</li>
              <li>Zona 2 (Moderada): 45 min</li>
              <li>Zona 3 (Alta): 20 min</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Picos de Intensidad:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Pico 1: 180 bpm (min 15)</li>
              <li>Pico 2: 175 bpm (min 40)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparativa con Sesiones Anteriores */}
      <div>
        <h3 className="text-lg font-medium mb-2">Comparativa con Sesiones Anteriores</h3>
        <p className="text-gray-700">
          La carga total de esta sesión es un 10% superior al promedio de las últimas 5 sesiones de este tipo.
          Se observa una mejora en la capacidad de mantener la intensidad en periodos prolongados.
        </p>
      </div>
    </div>
  );
};

export default DashboardPostSesion;
