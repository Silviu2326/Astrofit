import React from 'react';
import CentroComando from './components/CentroComando';
import GestorLogistica from './components/GestorLogistica';
import CoberturaMediatica from './components/CoberturaMediatica';
import ProtocolosCOVID from './components/ProtocolosCOVID';
import SistemaEmergencias from './components/SistemaEmergencias';
import IntegracionTicketing from './components/IntegracionTicketing';
import DashboardSponsors from './components/DashboardSponsors';
import SistemaSustentabilidad from './components/SistemaSustentabilidad';

const CampeonatosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Campeonatos</h1>
      <p>Página principal para la gestión de campeonatos multi-equipo.</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Gestión Federativa Profesional</h2>
        {/* Aquí se integrarán los componentes de gestión federativa */}
        <p>Módulo para la gestión y coordinación con federaciones y entidades profesionales.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Módulos de Coordinación y Operaciones</h2>
        <CentroComando />
        <GestorLogistica />
        <CoberturaMediatica />
        <ProtocolosCOVID />
        <SistemaEmergencias />
        <IntegracionTicketing />
        <DashboardSponsors />
        <SistemaSustentabilidad />
      </div>
    </div>
  );
};

export default CampeonatosPage;
