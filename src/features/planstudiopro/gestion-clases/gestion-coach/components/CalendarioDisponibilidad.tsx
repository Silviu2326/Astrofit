import React from 'react';
import { Coach } from '../gestionCoachApi';

interface CalendarioDisponibilidadProps {
  coach: Coach | null;
}

const CalendarioDisponibilidad: React.FC<CalendarioDisponibilidadProps> = ({ coach }) => {
  if (!coach) {
    return <div className="bg-white p-4 rounded shadow mb-4">Selecciona un coach para ver su disponibilidad.</div>;
  }

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const mockAvailability = {
    'Lun': 'disponible',
    'Mar': 'ocupado',
    'Mié': 'disponible',
    'Jue': 'libre',
    'Vie': 'disponible',
    'Sáb': 'ocupado',
    'Dom': 'libre',
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Disponibilidad de {coach.name}</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`p-2 rounded
              ${mockAvailability[day as keyof typeof mockAvailability] === 'disponible' ? 'bg-green-200 text-green-800' :
              mockAvailability[day as keyof typeof mockAvailability] === 'ocupado' ? 'bg-red-200 text-red-800' :
              'bg-yellow-200 text-yellow-800'
            }`}
          >
            {mockAvailability[day as keyof typeof mockAvailability].charAt(0).toUpperCase() + mockAvailability[day as keyof typeof mockAvailability].slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarioDisponibilidad;
