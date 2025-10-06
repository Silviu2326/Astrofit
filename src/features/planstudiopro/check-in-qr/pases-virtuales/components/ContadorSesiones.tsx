import React from 'react';

interface ContadorSesionesProps {
  sesionesRestantes: number;
  totalSesiones: number;
}

const ContadorSesiones: React.FC<ContadorSesionesProps> = ({ sesionesRestantes, totalSesiones }) => {
  const progreso = (sesionesRestantes / totalSesiones) * 100;

  const getProgressBarColor = (progress: number) => {
    if (progress <= 25) return 'bg-red-500';
    if (progress <= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Sesiones:</span>
        <span className="font-medium">{sesionesRestantes} / {totalSesiones}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getProgressBarColor(progreso)}`}
          style={{ width: `${progreso}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ContadorSesiones;
