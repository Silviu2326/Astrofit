import React from 'react';

const ModeloPredictivo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Modelo Predictivo Básico</h3>
      <p className="text-gray-700 mb-3">
        Este modelo utiliza una combinación de datos históricos para generar las probabilidades de resultado.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Datos históricos de victorias, empates y derrotas de ambos equipos.</li>
        <li>Diferencia de goles a favor y en contra.</li>
        <li>Forma reciente de los equipos (ej. resultados de los últimos 5 partidos).</li>
        <li>Consideración de la localía.</li>
      </ul>
      <p className="text-gray-700 mt-4">
        <span className="font-medium">Nota:</span> Este es un modelo simplificado para demostración. Un modelo real
        incorporaría algoritmos de Machine Learning más avanzados y una mayor cantidad de variables.
      </p>
    </div>
  );
};

export default ModeloPredictivo;
