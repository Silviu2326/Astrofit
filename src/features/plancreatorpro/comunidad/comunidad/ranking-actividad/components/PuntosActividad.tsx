import React from 'react';

interface PuntosActividadProps {
  currentPoints: number;
  nextRewardPoints: number;
  activityCategories: { name: string; pointsEarned: number }[];
}

const PuntosActividad: React.FC<PuntosActividadProps> = ({ currentPoints, nextRewardPoints, activityCategories }) => {
  const progress = (currentPoints / nextRewardPoints) * 100;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Tus Puntos de Actividad</h2>
      <div className="text-center mb-4">
        <p className="text-4xl font-bold text-green-600">{currentPoints} Puntos</p>
        <p className="text-gray-600">Faltan {nextRewardPoints - currentPoints} puntos para la siguiente recompensa.</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      <h3 className="text-xl font-medium mb-3">Actividad Reciente por Categoría:</h3>
      <ul className="list-disc list-inside space-y-2">
        {activityCategories.map((category, index) => (
          <li key={index} className="flex justify-between items-center text-gray-700">
            <span>{category.name}</span>
            <span className="font-semibold text-blue-500">{category.pointsEarned} Puntos</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PuntosActividad;
