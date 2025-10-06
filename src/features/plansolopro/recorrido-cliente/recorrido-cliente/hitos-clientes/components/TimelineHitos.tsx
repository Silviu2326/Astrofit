import React from 'react';
import TarjetaHito from './TarjetaHito';

interface Hito {
  id: string;
  type: 'cumpleanos' | 'aniversario' | 'sesion_completada';
  date: string;
  description: string;
  icon?: string;
  color?: string;
}

const mockHitos: Hito[] = [
  {
    id: '1',
    type: 'cumpleanos',
    date: '2025-09-28',
    description: '¡Feliz cumpleaños a Juan Pérez!',
    icon: '🎂',
    color: 'bg-pink-100',
  },
  {
    id: '2',
    type: 'aniversario',
    date: '2025-03-15',
    description: 'Aniversario de contrato con María García.',
    icon: '🎉',
    color: 'bg-yellow-100',
  },
  {
    id: '3',
    type: 'sesion_completada',
    date: '2025-09-20',
    description: 'Sesión #5 completada con Pedro López.',
    icon: '✅',
    color: 'bg-green-100',
  },
  {
    id: '4',
    type: 'cumpleanos',
    date: '2025-10-05',
    description: '¡Feliz cumpleaños a Ana Rodríguez!',
    icon: '🎂',
    color: 'bg-pink-100',
  },
];

const TimelineHitos: React.FC = () => {
  return (
    <div className="relative border-l-4 border-gray-200 ml-4 pl-4">
      {mockHitos.map((hito) => (
        <TarjetaHito key={hito.id} hito={hito} />
      ))}
    </div>
  );
};

export default TimelineHitos;
