import React from 'react';
import { Activity, Flame, Wind } from 'lucide-react';

const AnalisisZonasIntensidad: React.FC = () => {
  const zones = [
    { name: 'Alta', percentage: 35, color: 'from-red-500 to-orange-500', icon: Flame },
    { name: 'Media', percentage: 45, color: 'from-orange-500 to-yellow-500', icon: Activity },
    { name: 'Baja', percentage: 20, color: 'from-emerald-500 to-teal-500', icon: Wind },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Zonas de Intensidad</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Análisis automático durante la sesión</p>

      <div className="space-y-3">
        {zones.map((zone, index) => {
          const IconComponent = zone.icon;
          return (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">{zone.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{zone.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${zone.color} rounded-full transition-all duration-500 relative`}
                  style={{ width: `${zone.percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen */}
      <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
        <p className="text-xs font-semibold text-indigo-700 mb-1">DISTRIBUCIÓN TOTAL</p>
        <div className="flex gap-1 h-2 rounded-full overflow-hidden">
          {zones.map((zone, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${zone.color}`}
              style={{ width: `${zone.percentage}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalisisZonasIntensidad;
