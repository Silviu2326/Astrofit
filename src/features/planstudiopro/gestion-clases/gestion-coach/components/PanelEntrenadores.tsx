import React from 'react';
import { Coach } from '../gestionCoachApi';

interface PanelEntrenadoresProps {
  coaches: Coach[];
  onSelectCoach: (coach: Coach) => void;
}

const PanelEntrenadores: React.FC<PanelEntrenadoresProps> = ({ coaches, onSelectCoach }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Nuestros Coaches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="border p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectCoach(coach)}
          >
            <img src={coach.photo} alt={coach.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="font-bold text-lg">{coach.name}</h3>
            <p className="text-gray-600">{coach.specialty}</p>
            <p
              className={`text-sm font-medium ${
                coach.status === 'disponible' ? 'text-green-600' :
                coach.status === 'ocupado' ? 'text-red-600' :
                'text-yellow-600'
              }`}
            >
              {coach.status.charAt(0).toUpperCase() + coach.status.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelEntrenadores;
