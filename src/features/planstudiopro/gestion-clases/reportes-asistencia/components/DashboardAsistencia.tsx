import React from 'react';

interface DashboardAsistenciaProps {
  totalAsistencias: number;
  porcentajePromedio: number;
  clasesPopulares: { clase: string; cantidad: number }[];
}

const DashboardAsistencia: React.FC<DashboardAsistenciaProps> = ({
  totalAsistencias,
  porcentajePromedio,
  clasesPopulares,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow col-span-1">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumen de Asistencia</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">Total Asistencias:</span>
          <span className="text-2xl font-bold text-indigo-600">{totalAsistencias}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">% Promedio de Asistencia:</span>
          <span className="text-2xl font-bold text-green-600">{porcentajePromedio.toFixed(1)}%</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Clases Populares:</h3>
          <ul className="list-disc list-inside ml-4">
            {clasesPopulares.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item.clase}: <span className="font-semibold">{item.cantidad} asistencias</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardAsistencia;
