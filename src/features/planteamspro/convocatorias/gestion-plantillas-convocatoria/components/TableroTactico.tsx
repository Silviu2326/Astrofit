import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { Maximize2, Grid3x3, Users } from 'lucide-react';
import { Player } from '../gestionPlantillasConvocatoriaApi';

interface TableroTacticoProps {
  // Puedes pasar props como la lista de jugadores, el deporte seleccionado, etc.
}

const TableroTactico: React.FC<TableroTacticoProps> = () => {
  const [playersOnField, setPlayersOnField] = useState<Player[]>([]);

  const [, drop] = useDrop(() => ({
    accept: 'player',
    drop: (item: { id: string; name: string; photoUrl: string; role: string }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as { x: number; y: number };
      const left = Math.round(item.position?.x || 0 + delta.x);
      const top = Math.round(item.position?.y || 0 + delta.y);

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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con controles */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Grid3x3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Tablero Táctico</h3>
          </div>

          {/* Badges de estado */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">{playersOnField.length} Jugadores</span>
            </div>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/30 transition-colors duration-300">
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Campo de juego */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          ref={drop}
          className="relative w-full h-[500px] bg-gradient-to-br from-green-600 to-green-700 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80"
          style={{
            backgroundImage: 'url("https://via.placeholder.com/800x400/008000/FFFFFF?text=Cancha+Deportiva")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay con patrón */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 2px, transparent 2px),
                               linear-gradient(90deg, rgba(255,255,255,0.2) 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Jugadores en el campo */}
          {playersOnField.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="absolute flex flex-col items-center cursor-move group"
              style={{ left: player.position?.x, top: player.position?.y }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 w-14 h-14 bg-blue-400 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>

              {/* Avatar */}
              <div className="relative">
                <img
                  src={player.photoUrl}
                  alt={player.name}
                  className="w-14 h-14 rounded-full border-4 border-white shadow-xl relative z-10 group-hover:border-yellow-300 transition-colors duration-300"
                />
                {/* Badge de rol */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-20 border-2 border-white">
                  {player.role?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Nombre */}
              <div className="mt-2 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white">
                <span className="text-xs font-bold text-gray-900 whitespace-nowrap">{player.name}</span>
              </div>
            </motion.div>
          ))}

          {/* Mensaje de guía cuando está vacío */}
          {playersOnField.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Tablero Táctico</h4>
                <p className="text-lg text-white/90 drop-shadow">Arrastra jugadores aquí para crear tu formación</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Leyenda inferior */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Defensa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Medio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Delantero</span>
            </div>
          </div>

          <div className="text-sm text-gray-500 font-medium">
            Doble clic para editar jugador
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableroTactico;
