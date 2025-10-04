import React, { useState, useEffect } from 'react';
import TarjetasBonos from './components/TarjetasBonos';
import BarrasProgreso from './components/BarrasProgreso';
import FiltroEstados from './components/FiltroEstados';
import { getPases, Pase } from './listadoPasesApi';
import ScoringClientesML from './components/ScoringClientesML';
import CampañasMarketingAutomatizadas from './components/CampañasMarketingAutomatizadas';
import SegmentacionDinamica from './components/SegmentacionDinamica';
import CustomerJourneyMapping from './components/CustomerJourneyMapping';
import TicketsSoporte from './components/TicketsSoporte';
import NetPromoterScore from './components/NetPromoterScore';
import SistemaWinBack from './components/SistemaWinBack';
import AnalisisSentiment from './components/AnalisisSentiment';
import IntegracionMarketing from './components/IntegracionMarketing';
import ProgramaEmbajadores from './components/ProgramaEmbajadores';
import CustomerView360 from './components/CustomerView360';
import ComunicacionOmnicanal from './components/ComunicacionOmnicanal';
import AutomationBuilder from './components/AutomationBuilder';
import DashboardsPersonalizados from './components/DashboardsPersonalizados';
import MobileCRM from './components/MobileCRM';
import VoiceNotesTranscripcion from './components/VoiceNotesTranscripcion';

const ListadoPasesPage: React.FC = () => {
  const [pases, setPases] = useState<Pase[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  useEffect(() => {
    const fetchedPases = getPases();
    setPases(fetchedPases);
  }, []);

  const pasesFiltrados = pases.filter(pase => {
    if (filtroEstado === 'todos') return true;
    return pase.estado === filtroEstado;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Listado de Pases</h1>
      <FiltroEstados onSelectEstado={setFiltroEstado} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {pasesFiltrados.map(pase => (
          <div key={pase.id} className="bg-white shadow-lg rounded-lg p-6">
            <TarjetasBonos cliente={pase.cliente} tipo={pase.tipo} />
            <BarrasProgreso progreso={pase.progreso} total={pase.total} />
            <p className="text-sm text-gray-600 mt-2">Estado: {pase.estado}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6 mt-10">CRM Avanzado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <ScoringClientesML />
        <CampañasMarketingAutomatizadas />
        <SegmentacionDinamica />
        <CustomerJourneyMapping />
        <TicketsSoporte />
        <NetPromoterScore />
        <SistemaWinBack />
        <AnalisisSentiment />
        <IntegracionMarketing />
        <ProgramaEmbajadores />
        <CustomerView360 />
        <ComunicacionOmnicanal />
        <AutomationBuilder />
        <DashboardsPersonalizados />
        <MobileCRM />
        <VoiceNotesTranscripcion />
      </div>
    </div>
  );
};

export default ListadoPasesPage;
