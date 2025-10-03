
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { fetchWeeklyWellnessReport, WeeklyWellnessReport, DailyWellnessData, AthleteWellnessSummary } from '../informesSemanalesApi';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface DashboardWellnessProps {
  // Props can be added here if needed, e.g., to pass a specific week to display
}

const DashboardWellness: React.FC<DashboardWellnessProps> = () => {
  const [currentWeekData, setCurrentWeekData] = useState<WeeklyWellnessReport | null>(null);
  const [previousWeekData, setPreviousWeekData] = useState<WeeklyWellnessReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const current = await fetchWeeklyWellnessReport('current');
        const previous = await fetchWeeklyWellnessReport('previous');
        setCurrentWeekData(current);
        setPreviousWeekData(previous);
      } catch (err) {
        setError('Error al cargar los datos del informe semanal.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="text-center py-4">Cargando informe de wellness...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (!currentWeekData || !previousWeekData) return <div className="text-center py-4">No hay datos disponibles.</div>;

  const createRadarChartData = (data: DailyWellnessData[], labelPrefix: string) => {
    const labels = data.map(d => d.day);
    const sleepData = data.map(d => d.sleep);
    const fatigueData = data.map(d => d.fatigue);
    const moodData = data.map(d => d.mood);

    return {
      labels,
      datasets: [
        {
          label: `${labelPrefix} Sueño (horas)`,
          data: sleepData,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
        },
        {
          label: `${labelPrefix} Fatiga (1-5)`,
          data: fatigueData,
          backgroundColor: 'rgba(234, 179, 8, 0.2)',
          borderColor: 'rgba(234, 179, 8, 1)',
          borderWidth: 1,
        },
        {
          label: `${labelPrefix} Ánimo (1-5)`,
          data: moodData,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 5, // Adjust max for sleep if needed, or have separate scales
        ticks: { backdropColor: 'transparent' },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Promedios Diarios de Wellness',
      },
    },
  };

  const currentWeekRadarData = createRadarChartData(currentWeekData.dailyAverages, 'Actual');
  const previousWeekRadarData = createRadarChartData(previousWeekData.dailyAverages, 'Anterior');

  const renderAthleteSummary = (athlete: AthleteWellnessSummary) => (
    <div key={athlete.id} className="p-4 border rounded-lg shadow-sm bg-white">
      <h4 className="font-semibold text-lg text-gray-800">{athlete.name}</h4>
      <p className="text-sm text-gray-600">Sueño promedio: <span className="font-medium">{athlete.averageSleep.toFixed(1)}h</span></p>
      <p className="text-sm text-gray-600">Fatiga promedio: <span className="font-medium">{athlete.averageFatigue.toFixed(1)}</span></p>
      <p className="text-sm text-gray-600">Ánimo promedio: <span className="font-medium">{athlete.averageMood.toFixed(1)}</span></p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard de Wellness Semanal</h2>

      {/* Comparativa Semana Actual vs Anterior */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comparativa Semanal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-medium text-gray-700 mb-3">{currentWeekData.week} ({currentWeekData.startDate} - {currentWeekData.endDate})</h4>
            <div className="h-80">
              <Radar data={currentWeekRadarData} options={radarChartOptions} />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-medium text-gray-700 mb-3">{previousWeekData.week} ({previousWeekData.startDate} - {previousWeekData.endDate})</h4>
            <div className="h-80">
              <Radar data={previousWeekRadarData} options={radarChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Vista de equipo completo con indicadores por atleta */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Resumen del Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentWeekData.teamSummary.map(renderAthleteSummary)}
        </div>
      </div>
    </div>
  );
};

export default DashboardWellness;
