
import React from 'react';
import PlantillaCard from './PlantillaCard';
import { PlantillaDieta } from '../PlantillasDietasPage'; // Assuming PlantillaDieta interface is exported

interface PlantillasGridProps {
  plantillas: PlantillaDieta[];
  onSelectPlantilla: (plantilla: PlantillaDieta) => void;
}

const PlantillasGrid: React.FC<PlantillasGridProps> = ({ plantillas, onSelectPlantilla }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plantillas.map(plantilla => (
        <PlantillaCard key={plantilla.id} plantilla={plantilla} onSelectPlantilla={onSelectPlantilla} />
      ))}
    </div>
  );
};

export default PlantillasGrid;
