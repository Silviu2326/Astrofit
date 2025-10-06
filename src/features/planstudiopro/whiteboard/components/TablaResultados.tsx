import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

interface Resultado {
  id: string;
  posicion: number;
  atleta: string;
  tiempo?: string;
  puntos?: number;
  rondas?: number;
  reps?: number;
  notas?: string;
}

interface TablaResultadosProps {
  resultados: Resultado[];
  tipo?: 'tiempo' | 'rondas' | 'puntos';
}

const TablaResultados: React.FC<TablaResultadosProps> = ({ resultados, tipo = 'tiempo' }) => {
  const getPodiumIcon = (posicion: number) => {
    switch (posicion) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getPodiumColor = (posicion: number) => {
    switch (posicion) {
      case 1:
        return 'bg-yellow-50 border-yellow-200';
      case 2:
        return 'bg-gray-50 border-gray-200';
      case 3:
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const formatResultado = (resultado: Resultado) => {
    switch (tipo) {
      case 'tiempo':
        return resultado.tiempo || '-';
      case 'rondas':
        return `${resultado.rondas || 0} + ${resultado.reps || 0}`;
      case 'puntos':
        return `${resultado.puntos || 0} pts`;
      default:
        return '-';
    }
  };

  if (!resultados || resultados.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Resultados</h3>
        <p className="text-gray-500 text-center py-8">No hay resultados disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Resultados del Leaderboard</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {resultados.map((resultado) => {
          const isPodium = resultado.posicion <= 3;

          return (
            <div
              key={resultado.id}
              className={`p-4 flex items-center gap-4 transition-colors hover:bg-gray-50 border-l-4 ${getPodiumColor(resultado.posicion)}`}
            >
              {/* Posición */}
              <div className="flex items-center justify-center w-12 h-12">
                {isPodium ? (
                  getPodiumIcon(resultado.posicion)
                ) : (
                  <span className="text-2xl font-bold text-gray-400">
                    {resultado.posicion}
                  </span>
                )}
              </div>

              {/* Información del atleta */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {resultado.atleta}
                </p>
                {resultado.notas && (
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {resultado.notas}
                  </p>
                )}
              </div>

              {/* Resultado */}
              <div className="text-right">
                <p className={`text-lg font-bold ${isPodium ? 'text-blue-600' : 'text-gray-900'}`}>
                  {formatResultado(resultado)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estadísticas */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Total de participantes: <span className="font-semibold text-gray-900">{resultados.length}</span>
        </p>
      </div>
    </div>
  );
};

export default TablaResultados;
