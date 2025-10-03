
import React from 'react';

interface Sugerencia {
  id: string;
  cliente: string;
  probabilidadReactivacion: number; // 0-100
  accionSugerida: string;
}

const SugerenciasReactivacion: React.FC = () => {
  const sugerencias: Sugerencia[] = [
    { id: 's1', cliente: 'Cliente D', probabilidadReactivacion: 75, accionSugerida: 'Ofrecer descuento personalizado.' },
    { id: 's2', cliente: 'Cliente E', probabilidadReactivacion: 50, accionSugerida: 'Enviar encuesta de satisfacción.' },
    { id: 's3', cliente: 'Cliente F', probabilidadReactivacion: 90, accionSugerida: 'Llamada de seguimiento urgente.' },
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability > 70) return 'text-green-600';
    if (probability > 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-2">Sugerencias de Reactivación</h3>
      <ul className="space-y-2">
        {sugerencias.map(sugerencia => (
          <li key={sugerencia.id} className="border-b pb-2">
            <p className="font-semibold">{sugerencia.cliente}</p>
            <p className="text-sm">Probabilidad de Reactivación: <span className={getProbabilityColor(sugerencia.probabilidadReactivacion)}>{sugerencia.probabilidadReactivacion}%</span></p>
            <p className="text-sm">Acción Sugerida: {sugerencia.accionSugerida}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-600">Motor de sugerencias automáticas y predictor de probabilidad.</p>
    </div>
  );
};

export default SugerenciasReactivacion;
