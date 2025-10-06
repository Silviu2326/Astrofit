import React from 'react';

interface ResumenSemanalProps {
  data: any; // Considerar tipado más específico
}

const ResumenSemanal: React.FC<ResumenSemanalProps> = ({ data }) => {
  if (!data) return <p>Cargando resumen semanal...</p>;

  // Ejemplo de cálculo de resumen semanal (simplificado)
  const avgSteps = (data.dailySteps.reduce((sum: number, day: any) => sum + day.steps, 0) / data.dailySteps.length).toFixed(0);
  const avgCalories = (data.caloriesBurned.reduce((sum: number, day: any) => sum + day.calories, 0) / data.caloriesBurned.length).toFixed(0);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Resumen Semanal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Pasos Promedio Diarios:</h3>
          <p className="text-2xl text-blue-700">{avgSteps}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Calorías Promedio Diarias Quemadas:</h3>
          <p className="text-2xl text-red-700">{avgCalories}</p>
        </div>
        {/* Más métricas comparativas aquí */}
      </div>
    </div>
  );
};

export default ResumenSemanal;
