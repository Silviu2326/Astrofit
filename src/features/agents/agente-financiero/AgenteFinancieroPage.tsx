
import React from 'react';
import CuadroMandoFinanciero from './components/CuadroMandoFinanciero';
import TarjetasAlertas from './components/TarjetasAlertas';
import SugerenciasPrecios from './components/SugerenciasPrecios';
import UpsellsDetectados from './components/UpsellsDetectados';
import ProyeccionMensual from './components/ProyeccionMensual';

const AgenteFinancieroPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Agente Financiero - El Contable Fitness</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CuadroMandoFinanciero />
        <TarjetasAlertas />
        <SugerenciasPrecios />
        <UpsellsDetectados />
        <ProyeccionMensual />
      </div>
      {/* Additional components for An??lisis de rentabilidad por cliente, Detecci??n autom??tica de oportunidades comerciales, Gesti??n de cobranza inteligente, M??tricas de lifetime value */}
    </div>
  );
};

export default AgenteFinancieroPage;
