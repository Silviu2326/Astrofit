import React from 'react';
import GaleriaPlantillas from './components/GaleriaPlantillas';
import CategoriasFiltro from './components/CategoriasFiltro';

const LibreriaPlantillasPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Librería de Plantillas de Automatización</h1>
      <CategoriasFiltro />
      <GaleriaPlantillas />
    </div>
  );
};

export default LibreriaPlantillasPage;
