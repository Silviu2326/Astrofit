import React from 'react';

interface DashboardMetricasProps {
  data: any; // Considerar tipado más específico
}

const DashboardMetricas: React.FC<DashboardMetricasProps> = ({ data }) => {
  if (!data) return <p>Cargando métricas...</p>;

  const totalSteps = data.dailySteps.reduce((sum: number, day: any) => sum + day.steps, 0);
  const avgSleepQuality = (data.sleepQuality.reduce((sum: number, day: any) => sum + day.quality, 0) / data.sleepQuality.length).toFixed(1);
  const totalCaloriesBurned = data.caloriesBurned.reduce((sum: number, day: any) => sum + day.calories, 0);
  const totalWorkouts = data.workouts.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Pasos Totales (Semana)</h3>
        <p className="text-3xl font-bold text-blue-600">{totalSteps}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Calidad Sueño Promedio</h3>
        <p className="text-3xl font-bold text-green-600">{avgSleepQuality} / 10</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Calorías Quemadas (Semana)</h3>
        <p className="text-3xl font-bold text-red-600">{totalCaloriesBurned}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Entrenamientos Registrados</h3>
        <p className="text-3xl font-bold text-purple-600">{totalWorkouts}</p>
      </div>
    </div>
  );
};

export default DashboardMetricas;
