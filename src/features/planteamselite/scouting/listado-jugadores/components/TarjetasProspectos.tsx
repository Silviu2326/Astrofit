import React from 'react';
import { Prospecto } from '../listadoJugadoresApi';

interface TarjetasProspectosProps {
  prospecto?: Prospecto; // Hacerlo opcional para el placeholder inicial
}

const TarjetasProspectos: React.FC<TarjetasProspectosProps> = ({ prospecto }) => {
  // Datos de ejemplo si no se proporciona un prospecto (para el placeholder)
  const defaultProspecto: Prospecto = {
    id: '0',
    nombre: 'Nombre del Jugador',
    edad: 19,
    posicion: 'Posición',
    clubActual: 'Club Ejemplo',
    nacionalidad: 'Nacionalidad',
    fotoUrl: 'https://via.placeholder.com/150',
    nivel: 'Medio',
    potencial: 'Alto',
    estado: 'en evaluación',
    caracteristicas: ['Característica 1', 'Característica 2'],
  };

  const currentProspecto = prospecto || defaultProspecto;

  const getEstadoColor = (estado: Prospecto['estado']) => {
    switch (estado) {
      case 'seguimiento activo': return 'bg-green-200 text-green-800';
      case 'en evaluación': return 'bg-yellow-200 text-yellow-800';
      case 'descartado': return 'bg-red-200 text-red-800';
      case 'fichado': return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getNivelPotencialColor = (value: Prospecto['nivel'] | Prospecto['potencial']) => {
    switch (value) {
      case 'Bajo': return 'bg-red-500';
      case 'Medio': return 'bg-yellow-500';
      case 'Alto': return 'bg-green-500';
      case 'Estrella': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img className="w-full h-48 object-cover" src={currentProspecto.fotoUrl} alt={currentProspecto.nombre} />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{currentProspecto.nombre}</h3>
        <p className="text-gray-600 text-sm mb-2">{currentProspecto.posicion} | {currentProspecto.edad} años</p>
        <p className="text-gray-700 mb-2">Club: {currentProspecto.clubActual}</p>
        <p className="text-gray-700 mb-2">Nacionalidad: {currentProspecto.nacionalidad}</p>

        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(currentProspecto.estado)}`}>
            {currentProspecto.estado}
          </span>
          <div className="flex space-x-1">
            <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getNivelPotencialColor(currentProspecto.nivel)}`}>Nivel: {currentProspecto.nivel}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getNivelPotencialColor(currentProspecto.potencial)}`}>Potencial: {currentProspecto.potencial}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {currentProspecto.caracteristicas.map((char, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TarjetasProspectos;
