import React from 'react';
import TimelineHitos from './components/TimelineHitos';
import CalendarioEventos from './components/CalendarioEventos';

const HitosClientesPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hitos de Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Timeline de Hitos</h2>
          <TimelineHitos />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Calendario de Eventos</h2>
          <CalendarioEventos />
        </div>
      </div>
    </div>
  );
};

export default HitosClientesPage;
