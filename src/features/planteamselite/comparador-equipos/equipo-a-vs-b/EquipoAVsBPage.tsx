import React, { useState, useEffect } from 'react';
import GraficoRadar from './components/GraficoRadar';
import AnalisisVentajasCompetitivas from './components/AnalisisVentajasCompetitivas';
import RecomendacionesTacticas from './components/RecomendacionesTacticas';
import SimuladorEncuentro from './components/SimuladorEncuentro';
import AnalisisJugadoresClave from './components/AnalisisJugadoresClave';
import ScoutingEspecifico from './components/ScoutingEspecifico';
import CondicionesAmbientales from './components/CondicionesAmbientales';
import PrediccionAlineaciones from './components/PrediccionAlineaciones';
import DashboardPrePartido from './components/DashboardPrePartido';
import { getTeamStats, getHistoricalMatches } from './equipoAVsBApi';

interface TeamStats {
  name: string;
  metrics: {
    attack: number;
    defense: number;
    midfield: number;
    overall: number;
  };
}

interface Match {
  id: string;
  date: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  winner: string;
}

const EquipoAVsBPage: React.FC = () => {
  const [teamAStats, setTeamAStats] = useState<TeamStats | null>(null);
  const [teamBStats, setTeamBStats] = useState<TeamStats | null>(null);
  const [historicalMatches, setHistoricalMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsA = await getTeamStats('Equipo A');
        const statsB = await getTeamStats('Equipo B');
        const matches = await getHistoricalMatches('Equipo A', 'Equipo B');

        setTeamAStats(statsA);
        setTeamBStats(statsB);
        setHistoricalMatches(matches);
      } catch (err) {
        setError('Error al cargar los datos de los equipos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!teamAStats || !teamBStats) {
    return <div className="text-center p-4">No se pudieron cargar las estadísticas de los equipos.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Equipo A vs Equipo B - Comparativa Directa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">{teamAStats.name}</h2>
          <p className="text-gray-700">Fortalezas: Ataque fuerte, buena defensa.</p>
          <p className="text-gray-700">Debilidades: Mediocampo inconsistente.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">{teamBStats.name}</h2>
          <p className="text-gray-700">Fortalezas: Mediocampo dominante, buena posesión.</p>
          <p className="text-gray-700">Debilidades: Ataque menos efectivo.</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Métricas Clave</h2>
        <GraficoRadar teamA={teamAStats.metrics} teamB={teamBStats.metrics} />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Historial de Enfrentamientos Directos</h2>
        {historicalMatches.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Equipo A</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Equipo B</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Resultado</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Ganador</th>
                </tr>
              </thead>
              <tbody>
                {historicalMatches.map((match) => (
                  <tr key={match.id}>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{match.date}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{match.teamA}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{match.teamB}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{match.scoreA} - {match.scoreB}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{match.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No hay enfrentamientos históricos disponibles.</p>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <AnalisisVentajasCompetitivas />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <RecomendacionesTacticas />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <SimuladorEncuentro />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <AnalisisJugadoresClave />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <ScoutingEspecifico />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <CondicionesAmbientales />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <PrediccionAlineaciones />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <DashboardPrePartido />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Análisis de Tendencias Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-medium text-blue-600 mb-2">{teamAStats.name}</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Ganó 3 de sus últimos 5 partidos.</li>
              <li>Promedio de 2 goles por partido.</li>
              <li>Defensa sólida en casa.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium text-red-600 mb-2">{teamBStats.name}</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Ganó 2 de sus últimos 5 partidos.</li>
              <li>Promedio de 1.5 goles por partido.</li>
              <li>Luchando en partidos fuera de casa.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipoAVsBPage;
