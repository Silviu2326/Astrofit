import React from 'react';
import { Plantilla, importPlantilla } from '../libreriaPlantillasApi';

interface TarjetaPlantillaProps {
  plantilla: Plantilla;
  onViewPreview: (plantilla: Plantilla) => void;
}

const TarjetaPlantilla: React.FC<TarjetaPlantillaProps> = ({ plantilla, onViewPreview }) => {
  const handleImport = async () => {
    await importPlantilla(plantilla.id);
    alert(`Plantilla "${plantilla.nombre}" importada con éxito.`);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{plantilla.nombre}</h3>
      <p className="text-gray-600 mb-4">{plantilla.descripcion}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => onViewPreview(plantilla)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Vista Previa
        </button>
        <button
          onClick={handleImport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Usar Plantilla
        </button>
      </div>
    </div>
  );
};

export default TarjetaPlantilla;
