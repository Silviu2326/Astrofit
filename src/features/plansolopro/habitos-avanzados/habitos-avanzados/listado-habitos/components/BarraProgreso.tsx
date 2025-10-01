import React from 'react';

interface BarraProgresoProps {
  porcentaje: number;
}

const BarraProgreso: React.FC<BarraProgresoProps> = ({ porcentaje }) => {
  let colorClass = 'bg-gray-300';
  if (porcentaje >= 70) {
    colorClass = 'bg-green-500';
  } else if (porcentaje >= 40) {
    colorClass = 'bg-yellow-500';
  } else {
    colorClass = 'bg-red-500';
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`h-2.5 rounded-full ${colorClass}`}
        style={{ width: `${porcentaje}%` }}
      ></div>
    </div>
  );
};

export default BarraProgreso;
