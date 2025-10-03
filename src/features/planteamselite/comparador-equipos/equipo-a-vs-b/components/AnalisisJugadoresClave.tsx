import React from 'react';
import { Users, Star, TrendingUp, Award } from 'lucide-react';

const AnalisisJugadoresClave: React.FC = () => {
  const jugadores = [
    { nombre: 'Jugador A1', equipo: 'A', posicion: 'Delantero', rating: 9.2, color: 'red' },
    { nombre: 'Jugador B1', equipo: 'B', posicion: 'Mediocampista', rating: 8.8, color: 'blue' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white shadow-lg">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Jugadores Clave
        </h3>
      </div>

      <div className="space-y-3">
        {jugadores.map((jugador, index) => (
          <div
            key={index}
            className={`p-4 bg-gradient-to-r ${
              jugador.color === 'red' ? 'from-red-50 to-pink-50' : 'from-blue-50 to-indigo-50'
            } rounded-xl border ${
              jugador.color === 'red' ? 'border-red-200' : 'border-blue-200'
            } hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                  jugador.color === 'red' ? 'from-red-500 to-pink-600' : 'from-blue-500 to-indigo-600'
                } flex items-center justify-center text-white shadow-lg font-bold text-lg`}>
                  {jugador.nombre.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{jugador.nombre}</h4>
                  <p className="text-sm text-gray-600">{jugador.posicion}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-full">
                  <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="font-bold text-yellow-700">{jugador.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalisisJugadoresClave;
