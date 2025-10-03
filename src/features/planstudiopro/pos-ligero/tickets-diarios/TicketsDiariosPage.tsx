import React, { useState } from 'react';
import TablaTransacciones from './components/TablaTransacciones';
import ResumenVentas from './components/ResumenVentas';
import FiltroPeriodo from './components/FiltroPeriodo';
import { useTicketsDiarios } from './ticketsDiariosApi';

// Nuevos componentes de Contabilidad Inteligente
import IntegracionSoftwareContable from './components/IntegracionSoftwareContable';
import FacturacionElectronica from './components/FacturacionElectronica';
import ConciliacionBancaria from './components/ConciliacionBancaria';
import CategorizacionInteligente from './components/CategorizacionInteligente';
import ReportesFiscales from './components/ReportesFiscales';
import DeteccionFraudes from './components/DeteccionFraudes';
import AprobacionesMultinivel from './components/AprobacionesMultinivel';
import AuditoriaTrail from './components/AuditoriaTrail';
import ForecastingCashFlow from './components/ForecastingCashFlow';
import IntegracionBancos from './components/IntegracionBancos';
import DashboardCFO from './components/DashboardCFO';
import AlertasAnomalias from './components/AlertasAnomalias';
import ReportesStakeholders from './components/ReportesStakeholders';
import ModoContador from './components/ModoContador';
import ExportacionFormatos from './components/ExportacionFormatos';
import WizardsConfiguracion from './components/WizardsConfiguracion';

const TicketsDiariosPage: React.FC = () => {
  const [periodo, setPeriodo] = useState<'hoy' | 'ayer' | 'semana'>('hoy');
  const { tickets, totalVentas } = useTicketsDiarios(periodo);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets Diarios</h1>
      <FiltroPeriodo periodo={periodo} onSelectPeriodo={setPeriodo} />
      <ResumenVentas totalVentas={totalVentas} />
      <TablaTransacciones tickets={tickets} />

      {/* Sección de Contabilidad Inteligente */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">Contabilidad Inteligente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegracionSoftwareContable />
          <FacturacionElectronica />
          <ConciliacionBancaria />
          <CategorizacionInteligente />
          <ReportesFiscales />
          <DeteccionFraudes />
          <AprobacionesMultinivel />
          <AuditoriaTrail />
          <ForecastingCashFlow />
          <IntegracionBancos />
          <DashboardCFO />
          <AlertasAnomalias />
          <ReportesStakeholders />
          <ModoContador />
          <ExportacionFormatos />
          <WizardsConfiguracion />
        </div>
      </div>
    </div>
  );
};

export default TicketsDiariosPage;
