import React from 'react';

interface TeamPerformance {
  team: string;
  weeklyLoad: number;
  injuryPercentage: number;
  trainingAdherence: number;
  availability: number;
  performance: number;
}

interface WidgetsConfigurablesProps {
  teamData: TeamPerformance[];
}

const WidgetsConfigurables: React.FC<WidgetsConfigurablesProps> = ({ teamData }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Widgets Configurables por Equipo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamData.map((team, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{team.team}</h3>
            <p className="text-gray-600">Carga de Trabajo: <span className="font-semibold">{team.weeklyLoad}</span></p>
            <p className="text-gray-600">Disponibilidad: <span className="font-semibold">{team.availability}%</span></p>
            <p className="text-gray-600">Performance: <span className="font-semibold">{team.performance}%</span></p>
            <p className="text-gray-600">% Lesiones: <span className="font-semibold">{team.injuryPercentage}%</span></p>
            <p className="text-gray-600">Adherencia Entrenos: <span className="font-semibold">{team.trainingAdherence}%</span></p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-gray-500 text-sm">* Estos widgets son configurables y muestran métricas agrupadas por equipo.</p>
    </div>
  );
};

export default WidgetsConfigurables;
