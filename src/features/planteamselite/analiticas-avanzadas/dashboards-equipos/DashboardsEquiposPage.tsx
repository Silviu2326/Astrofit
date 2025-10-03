import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import WidgetsConfigurables from './components/WidgetsConfigurables';
import TarjetasComparativas from './components/TarjetasComparativas';
import MetricasKPI from './components/MetricasKPI';
import AlertasRendimiento from './components/AlertasRendimiento';
import DashboardTiempoReal from './components/DashboardTiempoReal';
import AnalisisPredictivo from './components/AnalisisPredictivo';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import ExportadorReportes from './components/ExportadorReportes';
import IntegracionVideoanalisis from './components/IntegracionVideoanalisis';
import { getTeamPerformanceData, getExecutiveSummary } from './dashboardsEquiposApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TeamPerformance {
  team: string;
  weeklyLoad: number;
    injuryPercentage: number;
  trainingAdherence: number;
  availability: number;
  performance: number;
}

interface ExecutiveSummary {
  totalTeams: number;
  averageWeeklyLoad: number;
  averageInjuryPercentage: number;
  overallPerformance: string;
}

const DashboardsEquiposPage: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamPerformance[]>([]);
  const [executiveSummary, setExecutiveSummary] = useState<ExecutiveSummary | null>(null);

  useEffect(() => {
    // Fetch mock data
    setTeamData(getTeamPerformanceData());
    setExecutiveSummary(getExecutiveSummary());
  }, []);

  const chartData = {
    labels: teamData.map(data => data.team),
    datasets: [
      {
        label: 'Carga Semanal',
        data: teamData.map(data => data.weeklyLoad),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: '% Lesiones',
        data: teamData.map(data => data.injuryPercentage),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Adherencia Entrenos',
        data: teamData.map(data => data.trainingAdherence),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
        text: 'Métricas Clave por Equipo',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboards de Equipos - Analíticas Avanzadas</h1>

      {executiveSummary && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Resumen Ejecutivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <p className="text-lg font-medium text-blue-800">Total Equipos:</p>
              <p className="text-xl font-bold text-blue-900">{executiveSummary.totalTeams}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-md">
              <p className="text-lg font-medium text-green-800">Carga Semanal Promedio:</p>
              <p className="text-xl font-bold text-green-900">{executiveSummary.averageWeeklyLoad.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-md">
              <p className="text-lg font-medium text-red-800">Porcentaje Lesiones Promedio:</p>
              <p className="text-xl font-bold text-red-900">{executiveSummary.averageInjuryPercentage.toFixed(2)}%</p>
            </div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700">Performance General: <span className="font-bold text-indigo-700">{executiveSummary.overallPerformance}</span></p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Métricas Clave por Equipo</h2>
        {teamData.length > 0 ? (
          <div className="relative h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-gray-600">Cargando datos de equipos...</p>
        )}
      </div>

      <WidgetsConfigurables teamData={teamData} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <TarjetasComparativas />
        <MetricasKPI />
        <AlertasRendimiento />
        <DashboardTiempoReal />
        <AnalisisPredictivo />
        <FiltrosAvanzados />
        <ExportadorReportes />
        <IntegracionVideoanalisis />
      </div>
    </div>
  );
};

export default DashboardsEquiposPage;
