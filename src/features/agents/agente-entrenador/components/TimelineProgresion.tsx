import React, { useState, useEffect } from 'react';
import { agenteEntrenadorApi, Progression } from '../agenteEntrenadorApi';

const TimelineProgresion: React.FC = () => {
  const [progressions, setProgressions] = useState<Progression[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const data = agenteEntrenadorApi.getProgressions();
      setProgressions(data);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <div className="text-gray-600">Cargando timeline de progresión...</div>;
  if (!progressions.length) return <div className="text-red-600">Error al cargar datos de progresión.</div>;

  const maxLoad = Math.max(...progressions.map(p => p.load));
  const maxVolume = Math.max(...progressions.map(p => p.volume));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Evolución de Cargas y Volumen (Semanas)</h3>

      {/* Legend */}
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Carga (kg)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Volumen (kg*reps)</span>
        </div>
      </div>

      {/* Dual chart with bars */}
      <div className="h-64 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="h-full flex items-end justify-between space-x-2">
          {progressions.map((progression) => (
            <div key={progression.week} className="flex flex-col items-center space-y-1 flex-1">
              {/* Values display */}
              <div className="text-xs text-center">
                <div className="text-blue-600 font-medium">{progression.load}kg</div>
                <div className="text-green-600 font-medium">{progression.volume}</div>
              </div>

              {/* Bars container */}
              <div className="flex space-x-1 items-end h-full">
                {/* Load bar */}
                <div
                  className="bg-blue-500 w-4 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{
                    height: `${(progression.load / maxLoad) * 80}%`,
                    minHeight: '8px'
                  }}
                ></div>

                {/* Volume bar */}
                <div
                  className="bg-green-500 w-4 rounded-t transition-all duration-300 hover:bg-green-600"
                  style={{
                    height: `${(progression.volume / maxVolume) * 80}%`,
                    minHeight: '8px'
                  }}
                ></div>
              </div>

              {/* Week label */}
              <div className="text-xs text-gray-500 font-medium">S{progression.week}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom labels */}
      <div className="mt-4 grid grid-cols-3 text-xs text-gray-500">
        <span>Semana</span>
        <span className="text-center">Carga (kg)</span>
        <span className="text-right">Volumen (kg*reps)</span>
      </div>

      {/* Summary stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-2 rounded">
          <div className="text-blue-600 font-medium">Incremento de Carga</div>
          <div className="text-gray-600">
            {progressions.length > 1 ?
              `+${((progressions[progressions.length - 1].load - progressions[0].load) / progressions[0].load * 100).toFixed(1)}%`
              : 'N/A'
            }
          </div>
        </div>
        <div className="bg-green-50 p-2 rounded">
          <div className="text-green-600 font-medium">Incremento de Volumen</div>
          <div className="text-gray-600">
            {progressions.length > 1 ?
              `+${((progressions[progressions.length - 1].volume - progressions[0].volume) / progressions[0].volume * 100).toFixed(1)}%`
              : 'N/A'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineProgresion;
