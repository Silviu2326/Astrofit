import React from 'react';
import { useGetFeedbackQuery } from '../encuestasNpsApi';

const CalculadoraNPS: React.FC = () => {
  const { data: feedback, isLoading } = useGetFeedbackQuery();

  if (isLoading) return <div className="p-4 bg-white rounded-lg shadow">Cargando datos...</div>;

  if (!feedback || feedback.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calculadora NPS</h2>
        <p className="text-gray-600">No hay datos de feedback para calcular el NPS.</p>
      </div>
    );
  }

  const totalResponses = feedback.length;
  const promoters = feedback.filter((f) => f.score >= 9).length;
  const passives = feedback.filter((f) => f.score >= 7 && f.score <= 8).length;
  const detractors = feedback.filter((f) => f.score >= 0 && f.score <= 6).length;

  const nps = ((promoters - detractors) / totalResponses) * 100;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calculadora NPS</h2>
      <p className="text-gray-600 mb-4">
        El Net Promoter Score (NPS) mide la lealtad del cliente.
      </p>
      <div className="flex items-center justify-center mb-6">
        <div
          className={`text-5xl font-bold ${
            nps >= 50 ? 'text-green-600' : nps >= 0 ? 'text-yellow-600' : 'text-red-600'
          }`}
        >
          {nps.toFixed(1)}%
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-medium text-green-600">{promoters}</p>
          <p className="text-sm text-gray-500">Promotores (9-10)</p>
        </div>
        <div>
          <p className="text-lg font-medium text-yellow-600">{passives}</p>
          <p className="text-sm text-gray-500">Pasivos (7-8)</p>
        </div>
        <div>
          <p className="text-lg font-medium text-red-600">{detractors}</p>
          <p className="text-sm text-gray-500">Detractores (0-6)</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">Basado en {totalResponses} respuestas.</p>
    </div>
  );
};

export default CalculadoraNPS;