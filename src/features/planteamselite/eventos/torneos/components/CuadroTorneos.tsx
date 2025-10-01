import React from 'react';
import { Tournament, Team, Match } from '../torneosApi';

interface CuadroTorneosProps {
  tournament: Tournament;
}

const CuadroTorneos: React.FC<CuadroTorneosProps> = ({ tournament }) => {
  const getTeamName = (teamId: string | null): string => {
    if (!teamId) return 'TBD';
    const team = tournament.teams.find(t => t.id === teamId);
    return team ? team.name : 'Equipo Desconocido';
  };

  // Simple rendering of rounds. This can be made more sophisticated for complex brackets.
  const renderRound = (roundNumber: number) => {
    const matchesInRound = tournament.matches.filter(match => match.round === roundNumber);

    if (matchesInRound.length === 0) {
      return null; // No matches for this round yet
    }

    return (
      <div key={roundNumber} className="flex flex-col items-center mx-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Ronda {roundNumber}</h3>
        {matchesInRound.map(match => (
          <div key={match.id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-64">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-medium text-gray-800">{getTeamName(match.team1)}</span>
              <span className="text-gray-500">vs</span>
              <span className="font-medium text-gray-800">{getTeamName(match.team2)}</span>
            </div>
            <div className="text-center text-sm text-gray-600">
              Ganador: {getTeamName(match.winner)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Determine the number of rounds based on the matches data
  const maxRound = Math.max(...tournament.matches.map(m => m.round), 0);
  const rounds = Array.from({ length: maxRound }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cuadro de {tournament.name}</h2>
      <div className="flex justify-center flex-wrap">
        {rounds.map(round => renderRound(round))}
      </div>
      {maxRound === 0 && (
        <p className="text-gray-500">No hay partidos definidos para este torneo aún.</p>
      )}
    </div>
  );
};

export default CuadroTorneos;
