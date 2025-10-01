import React from 'react';
import { Recommendation } from '../../agenteCopilotoApi';

interface RecomendacionSemanalProps {
  recommendations: Recommendation[];
}

export const RecomendacionSemanal: React.FC<RecomendacionSemanalProps> = ({ recommendations }) => {
  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="font-semibold text-gray-800">{rec.ajuste}</p>
          <p className="text-sm text-gray-600">Categoría: {rec.categoria}</p>
          <p className="text-sm text-gray-600">Impacto Estimado: {rec.impactoEstimado}</p>
        </div>
      ))}
    </div>
  );
};
