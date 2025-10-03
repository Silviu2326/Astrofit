import React from 'react';
import FichaTecnica from './components/FichaTecnica';
import AnalisisVideoIA from './components/AnalisisVideoIA';
import PerfilPsicologico from './components/PerfilPsicologico';
import ProyeccionCarrera from './components/ProyeccionCarrera';
import AnalisisBiomecanico from './components/AnalisisBiomecanico';
import RiskAssessment from './components/RiskAssessment';
import AdaptabilidadCultural from './components/AdaptabilidadCultural';
import CompatibilidadSistema from './components/CompatibilidadSistema';
import ValoracionEconomica from './components/ValoracionEconomica';

const EvaluacionJugadorPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Análisis Detallado del Jugador</h1>
      <FichaTecnica />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <AnalisisVideoIA />
        <PerfilPsicologico />
        <ProyeccionCarrera />
        <AnalisisBiomecanico />
        <RiskAssessment />
        <AdaptabilidadCultural />
        <CompatibilidadSistema />
        <ValoracionEconomica />
      </div>
    </div>
  );
};

export default EvaluacionJugadorPage;
