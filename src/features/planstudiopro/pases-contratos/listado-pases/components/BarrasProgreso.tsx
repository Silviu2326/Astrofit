import React from 'react';

interface BarrasProgresoProps {
  progreso: number;
  total: number;
}

const BarrasProgreso: React.FC<BarrasProgresoProps> = ({ progreso, total }) => {
  const porcentaje = (progreso / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mt-2">
      <div
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${porcentaje}%` }}
      ></div>
      <p className="text-sm text-gray-600 mt-1">{progreso} de {total} usados</p>
    </div>
  );
};

export default BarrasProgreso;
