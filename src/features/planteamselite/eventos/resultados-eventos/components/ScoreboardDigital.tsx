import React from 'react';

interface ScoreboardDigitalProps {
  eventName: string;
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  timeRemaining: string; // e.g., "15:00" or "Final"
}

const ScoreboardDigital: React.FC<ScoreboardDigitalProps> = ({
  eventName,
  team1Name,
  team2Name,
  team1Score,
  team2Score,
  timeRemaining,
}) => {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg font-mono max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-yellow-400">{eventName}</h2>
        <p className="text-xl text-gray-400">{timeRemaining}</p>
      </div>

      <div className="flex justify-around items-center mb-6">
        <div className="text-center">
          <p className="text-2xl uppercase text-blue-400">{team1Name}</p>
          <p className="text-6xl font-extrabold text-green-500">{team1Score}</p>
        </div>
        <div className="text-center text-5xl font-bold text-red-500">VS</div>
        <div className="text-center">
          <p className="text-2xl uppercase text-blue-400">{team2Name}</p>
          <p className="text-6xl font-extrabold text-green-500">{team2Score}</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        {/* Información adicional o patrocinadores */}
        <p>Scoreboard digital tipo estadio con resultados actualizados.</p>
      </div>
    </div>
  );
};

export default ScoreboardDigital;
