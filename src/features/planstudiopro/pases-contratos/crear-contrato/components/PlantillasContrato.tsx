import React from 'react';

interface PlantillasContratoProps {
  onSelectPlantilla: (tipo: 'mensual' | 'trimestral' | 'anual') => void;
}

const PlantillasContrato: React.FC<PlantillasContratoProps> = ({ onSelectPlantilla }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onSelectPlantilla('mensual')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Plantilla Mensual
      </button>
      <button
        onClick={() => onSelectPlantilla('trimestral')}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Plantilla Trimestral
      </button>
      <button
        onClick={() => onSelectPlantilla('anual')}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Plantilla Anual
      </button>
    </div>
  );
};

export default PlantillasContrato;
