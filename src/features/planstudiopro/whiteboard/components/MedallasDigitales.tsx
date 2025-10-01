import React from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';

interface Medalla {
  tipo: 'oro' | 'plata' | 'bronce' | 'participacion';
  titulo: string;
  fecha: string;
  categoria?: string;
}

interface MedallasDigitalesProps {
  atleta: string;
  medallas: Medalla[];
}

const MedallasDigitales: React.FC<MedallasDigitalesProps> = ({ atleta, medallas }) => {
  const getMedallaIcon = (tipo: string) => {
    switch (tipo) {
      case 'oro':
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 'plata':
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 'bronce':
        return <Award className="h-8 w-8 text-amber-600" />;
      case 'participacion':
        return <Star className="h-8 w-8 text-blue-500" />;
      default:
        return <Trophy className="h-8 w-8 text-gray-400" />;
    }
  };

  const getMedallaColor = (tipo: string) => {
    switch (tipo) {
      case 'oro':
        return 'from-yellow-400 to-yellow-600';
      case 'plata':
        return 'from-gray-300 to-gray-500';
      case 'bronce':
        return 'from-amber-500 to-amber-700';
      case 'participacion':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-gray-300 to-gray-500';
    }
  };

  const contarMedallas = () => {
    return {
      oro: medallas.filter(m => m.tipo === 'oro').length,
      plata: medallas.filter(m => m.tipo === 'plata').length,
      bronce: medallas.filter(m => m.tipo === 'bronce').length,
      participacion: medallas.filter(m => m.tipo === 'participacion').length
    };
  };

  const stats = contarMedallas();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
        <h3 className="text-lg font-semibold text-white mb-2">Medallas Digitales</h3>
        <p className="text-sm text-blue-100">{atleta}</p>
      </div>

      {/* Estadísticas resumidas */}
      <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
        <div className="text-center">
          <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-gray-900">{stats.oro}</p>
          <p className="text-xs text-gray-500">Oro</p>
        </div>
        <div className="text-center">
          <Medal className="h-6 w-6 text-gray-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-gray-900">{stats.plata}</p>
          <p className="text-xs text-gray-500">Plata</p>
        </div>
        <div className="text-center">
          <Award className="h-6 w-6 text-amber-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-gray-900">{stats.bronce}</p>
          <p className="text-xs text-gray-500">Bronce</p>
        </div>
        <div className="text-center">
          <Star className="h-6 w-6 text-blue-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-gray-900">{stats.participacion}</p>
          <p className="text-xs text-gray-500">Estrellas</p>
        </div>
      </div>

      {/* Lista de medallas */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Logros Recientes</h4>
        {medallas.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm">
            Aún no hay medallas registradas
          </p>
        ) : (
          <div className="space-y-3">
            {medallas.slice(0, 5).map((medalla, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`p-2 rounded-full bg-gradient-to-br ${getMedallaColor(medalla.tipo)}`}>
                  {getMedallaIcon(medalla.tipo)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {medalla.titulo}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">
                      {new Date(medalla.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    {medalla.categoria && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-500">{medalla.categoria}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {medallas.length > 5 && (
        <div className="px-6 pb-6">
          <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Ver todas las medallas ({medallas.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default MedallasDigitales;
