
import React from 'react';
import GaleriaPlantillas from './components/GaleriaPlantillas';
import EditorPlantillas from './components/EditorPlantillas';

const PlantillasEmailPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Plantillas de Email</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <GaleriaPlantillas />
        </div>
        <div>
          <EditorPlantillas />
        </div>
      </div>
    </div>
  );
};

export default PlantillasEmailPage;
