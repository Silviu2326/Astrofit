import React from 'react';
import { Lightbulb, ArrowRight, Target, Users } from 'lucide-react';

const RecomendacionesTacticas: React.FC = () => {
  const recomendaciones = [
    { titulo: 'Presión alta', descripcion: 'Aprovechar velocidad para recuperar balón rápido', prioridad: 'Alta' },
    { titulo: 'Juego por bandas', descripcion: 'Explotar espacios laterales contra mediocampo rival', prioridad: 'Media' },
    { titulo: 'Balones largos', descripcion: 'Buscar delantero en espacios a espalda defensas', prioridad: 'Alta' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white shadow-lg">
          <Lightbulb className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
          Recomendaciones Tácticas
        </h3>
      </div>

      <div className="space-y-3">
        {recomendaciones.map((rec, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-800">{rec.titulo}</h4>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  rec.prioridad === 'Alta'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {rec.prioridad}
                </span>
              </div>
              <p className="text-sm text-gray-600">{rec.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomendacionesTacticas;
