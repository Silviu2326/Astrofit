import React from 'react';

interface GestorAforoProps {
  aforoActual: number;
  capacidadMaxima: number;
}

const GestorAforo: React.FC<GestorAforoProps> = ({ aforoActual, capacidadMaxima }) => {
  const porcentajeAforo = (aforoActual / capacidadMaxima) * 100;

  let colorClase = 'bg-green-500';
  if (porcentajeAforo >= 80) {
    colorClase = 'bg-red-500';
  } else if (porcentajeAforo >= 50) {
    colorClase = 'bg-yellow-500';
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Gestor de Aforo</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">Aforo Actual:</span>
        <span className="text-lg font-bold">{aforoActual} / {capacidadMaxima}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${colorClase} h-4 rounded-full`}
          style={{ width: `${porcentajeAforo}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">Ocupaci��n: {porcentajeAforo.toFixed(0)}%</p>
    </div>
  );
};

export default GestorAforo;
