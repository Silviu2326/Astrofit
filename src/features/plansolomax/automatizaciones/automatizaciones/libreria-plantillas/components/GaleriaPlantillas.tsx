import React, { useEffect, useState } from 'react';
import TarjetaPlantilla from './TarjetaPlantilla';
import VistaPrevia from './VistaPrevia';
import { fetchPlantillas, Plantilla } from '../libreriaPlantillasApi';

const GaleriaPlantillas: React.FC = () => {
  const [plantillas, setPlantillas] = useState<Plantilla[]>([]);
  const [selectedPlantilla, setSelectedPlantilla] = useState<Plantilla | null>(null);

  useEffect(() => {
    const getPlantillas = async () => {
      const data = await fetchPlantillas();
      setPlantillas(data);
    };
    getPlantillas();
  }, []);

  const handleViewPreview = (plantilla: Plantilla) => {
    setSelectedPlantilla(plantilla);
  };

  const handleClosePreview = () => {
    setSelectedPlantilla(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {plantillas.map((plantilla) => (
        <TarjetaPlantilla
          key={plantilla.id}
          plantilla={plantilla}
          onViewPreview={handleViewPreview}
        />
      ))}
      {selectedPlantilla && (
        <VistaPrevia plantilla={selectedPlantilla} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default GaleriaPlantillas;
