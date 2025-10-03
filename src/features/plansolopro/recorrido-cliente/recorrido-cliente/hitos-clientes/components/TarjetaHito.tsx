import React from 'react';

interface Hito {
  id: string;
  type: 'cumpleanos' | 'aniversario' | 'sesion_completada';
  date: string;
  description: string;
  icon?: string;
  color?: string;
}

interface TarjetaHitoProps {
  hito: Hito;
}

const TarjetaHito: React.FC<TarjetaHitoProps> = ({ hito }) => {
  const getIconAndColor = (type: Hito['type']) => {
    switch (type) {
      case 'cumpleanos':
        return { icon: hito.icon || '🎂', color: hito.color || 'bg-pink-100 text-pink-800' };
      case 'aniversario':
        return { icon: hito.icon || '🎉', color: hito.color || 'bg-yellow-100 text-yellow-800' };
      case 'sesion_completada':
        return { icon: hito.icon || '✅', color: hito.color || 'bg-green-100 text-green-800' };
      default:
        return { icon: '✨', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const { icon, color } = getIconAndColor(hito.type);

  return (
    <div className="mb-8 flex items-start">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="ml-4 p-4 border rounded-lg shadow-sm flex-grow">
        <p className="text-sm text-gray-500">{hito.date}</p>
        <p className="font-semibold">{hito.description}</p>
        {/* Add more details or actions here if needed */}
      </div>
    </div>
  );
};

export default TarjetaHito;
