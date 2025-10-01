import React from 'react';

interface TarjetaUsuarioProps {
  name: string;
  avatar: string;
  points: number;
  medals: { id: number; name: string; icon: string }[];
}

const TarjetaUsuario: React.FC<TarjetaUsuarioProps> = ({ name, avatar, points, medals }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <img src={avatar} alt={name} className="w-16 h-16 rounded-full border-2 border-blue-500" />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">Puntos: <span className="font-bold text-blue-700">{points}</span></p>
        <div className="flex space-x-2 mt-2">
          {medals.map((medal) => (
            <span key={medal.id} className="text-2xl" title={medal.name}>{medal.icon}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TarjetaUsuario;
