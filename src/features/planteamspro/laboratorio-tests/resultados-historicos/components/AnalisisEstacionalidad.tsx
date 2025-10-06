// components/AnalisisEstacionalidad.tsx - Análisis estacionalidad rendimiento
import React from 'react';
import { Calendar, Sun, Cloud, Snowflake } from 'lucide-react';

const AnalisisEstacionalidad: React.FC = () => {
  // Datos de ejemplo
  const mejorTemporada = 'Verano';
  const rendimientoPromedio = {
    verano: 85,
    invierno: 72,
    primavera: 78,
    otoño: 80
  };

  const getIconTemporada = (temporada: string) => {
    switch(temporada.toLowerCase()) {
      case 'verano': return <Sun className="w-4 h-4" />;
      case 'invierno': return <Snowflake className="w-4 h-4" />;
      default: return <Cloud className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Análisis de Estacionalidad</h3>
      </div>

      <div className="space-y-3">
        <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Mejor Temporada</p>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-yellow-100 rounded-lg text-yellow-600">
              {getIconTemporada(mejorTemporada)}
            </div>
            <p className="text-2xl font-bold text-cyan-600">{mejorTemporada}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700">Rendimiento por Temporada</p>
          {Object.entries(rendimientoPromedio).map(([temporada, valor]) => (
            <div key={temporada} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-100 rounded text-blue-600">
                  {getIconTemporada(temporada)}
                </div>
                <span className="text-sm font-medium text-gray-700 capitalize">{temporada}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    style={{ width: `${valor}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-blue-600 w-8">{valor}%</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Patrones de rendimiento según época del año.
        </p>
      </div>
    </div>
  );
};

export default AnalisisEstacionalidad;
