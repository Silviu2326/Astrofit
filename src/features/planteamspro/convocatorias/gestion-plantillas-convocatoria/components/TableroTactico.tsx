import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Player } from '../gestionPlantillasConvocatoriaApi';
import { PlaceholderImages } from '../../../../../utils/placeholderImages';

interface TableroTacticoProps {
  // Puedes pasar props como la lista de jugadores, el deporte seleccionado, etc.
}

const TableroTactico: React.FC<TableroTacticoProps> = () => {
  const [playersOnField, setPlayersOnField] = useState<Player[]>([]);

  const [, drop] = useDrop(() => ({
    accept: 'player',
    drop: (item: { id: string; name: string; photoUrl: string; role: string }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as { x: number; y: number };
      const left = Math.round(0 + delta.x);
      const top = Math.round(0 + delta.y);

      setPlayersOnField((prevPlayers) => {
        const existingPlayer = prevPlayers.find((p) => p.id === item.id);
        if (existingPlayer) {
          return prevPlayers.map((p) =>
            p.id === item.id ? { ...p, position: { x: left, y: top } } : p
          );
        }
        return [...prevPlayers, { ...item, position: { x: left, y: top } }];
      });
      return undefined;
    },
  }));

  return (
    <div
      ref={drop}
      className="relative w-full h-96 bg-green-700 border-4 border-white rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${PlaceholderImages.generic(800, 400, 'Cancha Deportiva')})`, // Placeholder de cancha
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Aqu?? se renderizar??n los jugadores arrastrados */}
      {playersOnField.map((player) => (
        <div
          key={player.id}
          className="absolute flex flex-col items-center"
          style={{ left: player.position?.x, top: player.position?.y }}
        >
          <img src={player.photoUrl} alt={player.name} className="w-12 h-12 rounded-full border-2 border-blue-400" />
          <span className="text-white text-xs mt-1">{player.name}</span>
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold opacity-50">
        Tablero T??ctico
      </div>
    </div>
  );
};

export default TableroTactico;
