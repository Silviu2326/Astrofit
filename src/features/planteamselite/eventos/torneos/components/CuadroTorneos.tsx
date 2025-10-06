import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Swords, Crown } from 'lucide-react';
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

  const getTeamAvatar = (teamId: string | null): string => {
    if (!teamId) return '?';
    const team = tournament.teams.find(t => t.id === teamId);
    return team ? team.name.charAt(0).toUpperCase() : '?';
  };

  // Simple rendering of rounds. This can be made more sophisticated for complex brackets.
  const renderRound = (roundNumber: number) => {
    const matchesInRound = tournament.matches.filter(match => match.round === roundNumber);

    if (matchesInRound.length === 0) {
      return null; // No matches for this round yet
    }

    const roundLabels = ['Octavos', 'Cuartos', 'Semifinales', 'Final'];
    const roundLabel = roundLabels[roundNumber - 1] || `Ronda ${roundNumber}`;

    return (
      <div key={roundNumber} className="flex flex-col items-center mx-4">
        {/* Round Header */}
        <div className="mb-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
          <h3 className="text-lg font-bold text-white">{roundLabel}</h3>
        </div>

        {/* Matches */}
        <div className="space-y-6">
          {matchesInRound.map((match, idx) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 w-72 border border-white/50 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

              {/* VS Badge central */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg">
                  <Swords className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                {/* Team 1 */}
                <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${
                  match.winner === match.team1
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-br from-purple-400 to-pink-400">
                    <span className="text-sm">{getTeamAvatar(match.team1)}</span>
                  </div>
                  <span className="font-semibold text-gray-800 flex-1">{getTeamName(match.team1)}</span>
                  {match.winner === match.team1 && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </div>

                {/* Team 2 */}
                <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${
                  match.winner === match.team2
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-br from-indigo-400 to-purple-400">
                    <span className="text-sm">{getTeamAvatar(match.team2)}</span>
                  </div>
                  <span className="font-semibold text-gray-800 flex-1">{getTeamName(match.team2)}</span>
                  {match.winner === match.team2 && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </div>

                {/* Match Status */}
                {!match.winner && (
                  <div className="text-center pt-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                      Por Jugar
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Determine the number of rounds based on the matches data
  const maxRound = Math.max(...tournament.matches.map(m => m.round), 0);
  const rounds = Array.from({ length: maxRound }, (_, i) => i + 1);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Cuadro de {tournament.name}</h2>
        </div>

        {/* Tournament Info Pills */}
        <div className="relative z-10 mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <Users className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">{tournament.teams.length} Equipos</span>
          </div>
          <div className="px-4 py-2 bg-green-400/20 backdrop-blur-md rounded-full border border-green-300/30">
            <span className="text-sm font-semibold text-white">En Curso</span>
          </div>
        </div>
      </div>

      {/* Body - Brackets */}
      <div className="p-8">
        {maxRound > 0 ? (
          <div className="flex justify-center items-start flex-wrap gap-8">
            {rounds.map(round => renderRound(round))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
              <Trophy className="w-10 h-10 text-purple-500" />
            </div>
            <p className="text-gray-500 text-lg">No hay partidos definidos para este torneo aún</p>
            <p className="text-gray-400 text-sm mt-2">Los brackets se generarán automáticamente al iniciar el torneo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CuadroTorneos;
