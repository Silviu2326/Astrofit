import React from 'react';
import { EstimatedImpact } from '../../agenteCopilotoApi';

interface ImpactoEstimadoProps {
  estimatedImpact: EstimatedImpact;
}

export const ImpactoEstimado: React.FC<ImpactoEstimadoProps> = ({ estimatedImpact }) => {
  return (
    <div className="space-y-3 text-gray-700">
      <p className="text-lg">
        <strong className="text-gray-800">Mejora Esperada:</strong> {estimatedImpact.mejoraEsperada}
      </p>
      <p className="text-lg">
        <strong className="text-gray-800">Tiempo Estimado:</strong> {estimatedImpact.tiempoEstimado}
      </p>
      <div>
        <p className="font-semibold text-gray-800 mb-1">Métricas Clave:</p>
        <ul className="list-disc list-inside ml-4">
          {estimatedImpact.metricasClave.map((metric, index) => (
            <li key={index} className="text-gray-600">{metric}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
