import React from 'react';
import GaleriaPlantillas from './components/GaleriaPlantillas';
import RecomendadorIA from './components/RecomendadorIA';
import EditorPlantillas from './components/EditorPlantillas';
import BibliotecaComunitaria from './components/BibliotecaComunitaria';
import RatingReviews from './components/RatingReviews';
import AdaptacionAutomatica from './components/AdaptacionAutomatica';
import VersionadoPlantillas from './components/VersionadoPlantillas';
import AnalisisEfectividad from './components/AnalisisEfectividad';
import MarketplacePremium from './components/MarketplacePremium';

const PlantillasMesociclosPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Banco de Plantillas de Mesociclos</h1>
      <RecomendadorIA />
      <EditorPlantillas />
      <BibliotecaComunitaria />
      <RatingReviews />
      <AdaptacionAutomatica />
      <VersionadoPlantillas />
      <AnalisisEfectividad />
      <MarketplacePremium />
      <GaleriaPlantillas />
    </div>
  );
};

export default PlantillasMesociclosPage;
