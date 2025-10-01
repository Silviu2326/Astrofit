import React from 'react';
import { Priority } from '../../agenteCopilotoApi';

interface PrioridadesInteligentesProps {
  priorities: Priority[];
}

export const PrioridadesInteligentes: React.FC<PrioridadesInteligentesProps> = ({ priorities }) => {
  return (
    <div className="space-y-4">
      {priorities.map((prio, index) => (
        <div key={prio.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="font-semibold text-gray-800">{index + 1}. {prio.accion}</p>
          <p className="text-sm text-gray-600">Razón: {prio.razon}</p>
          <p className="text-sm text-gray-600">Impacto: {prio.impacto}</p>
        </div>
      ))}
    </div>
  );
};
