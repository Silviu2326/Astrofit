import React from 'react';
import { Plantilla } from '../libreriaPlantillasApi';

interface VistaPreviaProps {
  plantilla: Plantilla;
  onClose: () => void;
}

const VistaPrevia: React.FC<VistaPreviaProps> = ({ plantilla, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Vista Previa: {plantilla.nombre}</h2>
        <p className="mb-4">{plantilla.descripcion}</p>
        <div className="bg-gray-100 p-4 rounded-md h-64 overflow-auto">
          {/* Aquí iría la representación visual del flujo de la plantilla */}
          <p>Representación del flujo de la plantilla "{plantilla.nombre}"...</p>
          <pre>{JSON.stringify(plantilla.flujo, null, 2)}</pre>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default VistaPrevia;
