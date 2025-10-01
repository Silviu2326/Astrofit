import React from 'react';
import PanelAlertas from './components/PanelAlertas';
import ModeloPredictivoFatiga from './components/ModeloPredictivoFatiga';
import ProtocolosIntervencion from './components/ProtocolosIntervencion';
import SeguimientoRecuperacion from './components/SeguimientoRecuperacion';
import IntegracionBiomarcadores from './components/IntegracionBiomarcadores';
import ClasificadorFatiga from './components/ClasificadorFatiga';
import SistemaEscalamiento from './components/SistemaEscalamiento';
import AnalisisFactores from './components/AnalisisFactores';
import RecomendacionesEspecificas from './components/RecomendacionesEspecificas';

const AlertasFatigaPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alertas de Fatiga - Detección de Sobrecarga</h1>
      <PanelAlertas />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ModeloPredictivoFatiga />
        <ProtocolosIntervencion />
        <SeguimientoRecuperacion />
        <IntegracionBiomarcadores />
        <ClasificadorFatiga />
        <SistemaEscalamiento />
        <AnalisisFactores />
        <RecomendacionesEspecificas />
      </div>
    </div>
  );
};

export default AlertasFatigaPage;
