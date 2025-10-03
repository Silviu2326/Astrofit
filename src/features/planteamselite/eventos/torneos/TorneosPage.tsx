import React from 'react';
import CuadroTorneos from './components/CuadroTorneos';
import GeneradorBrackets from './components/GeneradorBrackets';
import SistemaSeeding from './components/SistemaSeeding';
import StreamingTorneo from './components/StreamingTorneo';
import ApuestasVirtuales from './components/ApuestasVirtuales';
import GestionArbitros from './components/GestionArbitros';
import AnalyticsTorneo from './components/AnalyticsTorneo';
import SistemaPremios from './components/SistemaPremios';
import IntegracionRedesSociales from './components/IntegracionRedesSociales';

const TorneosPage: React.FC = () => {
  // Mock data for demonstration
  const mockTournament = {
    id: '1',
    name: 'Torneo de Verano',
    teams: [
      { id: 't1', name: 'Equipo Alpha' },
      { id: 't2', name: 'Equipo Beta' },
      { id: 't3', name: 'Equipo Gamma' },
      { id: 't4', name: 'Equipo Delta' },
    ],
    matches: [
      { id: 'm1', round: 1, team1: 't1', team2: 't2', winner: null },
      { id: 'm2', round: 1, team1: 't3', team2: 't4', winner: null },
      // More matches would be added as the tournament progresses
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Organización de Torneos</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Próximos Eventos</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">Aquí se mostrará un calendario de eventos y fases eliminatorias.</p>
          {/* Placeholder for a calendar component */}
          <div className="mt-4 p-4 border border-gray-200 rounded-md text-center text-gray-500">
            Calendario de eventos (próximamente)
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Cuadro de Torneos</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <CuadroTorneos tournament={mockTournament} />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Inscripciones y Sorteos</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">Sistema básico de inscripciones y sorteos de equipos.</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Abrir Inscripciones
          </button>
          <button className="mt-4 ml-4 px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Realizar Sorteo
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Gestión de Resultados</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">Interfaz para registrar resultados y avanzar fases.</p>
          <button className="mt-4 px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Registrar Resultados
          </button>
        </div>
      </section>

      {/* Nuevas secciones de componentes */}
      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <GeneradorBrackets />
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <SistemaSeeding />
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <StreamingTorneo />
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <ApuestasVirtuales />
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <GestionArbitros />
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <AnalyticsTorneo />
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <SistemaPremios />
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <IntegracionRedesSociales />
        </div>
      </section>
    </div>
  );
};

export default TorneosPage;
