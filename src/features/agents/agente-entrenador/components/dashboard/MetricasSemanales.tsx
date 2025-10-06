
import React from 'react';

interface MetricasSemanalesProps {
  volumen: string;
  intensidad: string;
  frecuencia: string;
}

const MetricasSemanales: React.FC<MetricasSemanalesProps> = ({ volumen, intensidad, frecuencia }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Volumen</h3>
        <p className="text-2xl font-bold text-blue-600">{volumen}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Intensidad</h3>
        <p className="text-2xl font-bold text-green-600">{intensidad}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Frecuencia</h3>
        <p className="text-2xl font-bold text-purple-600">{frecuencia}</p>
      </div>
    </div>
  );
};

export default MetricasSemanales;
