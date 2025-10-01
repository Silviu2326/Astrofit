import React from 'react';

interface SegmentoPreviewProps {
  count: number;
}

const SegmentoPreview: React.FC<SegmentoPreviewProps> = ({ count }) => {
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
      <h3 className="text-xl font-semibold text-blue-800 mb-2">Previsualización del Segmento</h3>
      {count > 0 ? (
        <p className="text-blue-700">Actualmente, <span className="font-bold text-2xl">{count}</span> clientes/leads cumplen con estas reglas.</p>
      ) : (
        <p className="text-blue-700">Ajusta las reglas para ver una previsualización de los miembros.</p>
      )}
    </div>
  );
};

export default SegmentoPreview;