import React from 'react';
import { Segment } from '../SegmentosPage';

interface SegmentoActionsProps {
  segment: Segment;
}

const SegmentoActions: React.FC<SegmentoActionsProps> = ({ segment }) => {
  const handleTag = () => {
    alert(`Acción: Etiquetar miembros del segmento "${segment.name}"`);
    // Implement actual tagging logic
  };

  const handleExport = () => {
    alert(`Acción: Exportar miembros del segmento "${segment.name}"`);
    // Implement actual export logic
  };

  const handleSendForm = () => {
    alert(`Acción: Enviar formulario a miembros del segmento "${segment.name}"`);
    // Implement actual send form logic
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el segmento "${segment.name}"?`)) {
      alert(`Acción: Eliminar segmento "${segment.name}"`);
      // Implement actual delete logic
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Acciones sobre el Segmento: {segment.name}</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleTag}
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors text-sm"
        >
          Etiquetar Miembros
        </button>
        <button
          onClick={handleExport}
          className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors text-sm"
        >
          Exportar Miembros
        </button>
        <button
          onClick={handleSendForm}
          className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors text-sm"
        >
          Enviar Formulario
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          Eliminar Segmento
        </button>
      </div>
    </div>
  );
};

export default SegmentoActions;