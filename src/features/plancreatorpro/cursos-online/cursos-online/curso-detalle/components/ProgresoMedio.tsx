import React from 'react';

interface ProgresoMedioProps {
  progreso: number;
}

const ProgresoMedio: React.FC<ProgresoMedioProps> = ({ progreso }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Progreso Medio del Curso</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>
      <p className="text-center mt-2 text-gray-700">{progreso}% completado</p>
    </div>
  );
};

export default ProgresoMedio;
