import React from 'react';
import TableroHabitos from './components/TableroHabitos';
import SemaforoAdherencia from './components/SemaforoAdherencia';
import RetosGamificados from './components/RetosGamificados';
import PanelMotivacional from './components/PanelMotivacional';
import TendenciasEstiloVida from './components/TendenciasEstiloVida';

const AgenteBienestarPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agente de Bienestar - El Coach de Hábitos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <TableroHabitos />
        </div>
        <div>
          <SemaforoAdherencia />
        </div>
        <div>
          <RetosGamificados />
        </div>
        <div>
          <PanelMotivacional />
        </div>
        <div className="col-span-full">
          <TendenciasEstiloVida />
        </div>
      </div>
    </div>
  );
};

export default AgenteBienestarPage;
