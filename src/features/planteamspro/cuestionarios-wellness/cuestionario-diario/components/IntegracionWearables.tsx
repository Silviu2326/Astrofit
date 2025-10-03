// src/features/cuestionario-diario/components/IntegracionWearables.tsx
import React from 'react';
import { Watch, Heart, Activity, Zap } from 'lucide-react';

const IntegracionWearables: React.FC = () => {
  const dispositivos = [
    { nombre: 'Apple Watch', conectado: true, ultimoSync: '2 min', icono: Watch },
    { nombre: 'Fitbit', conectado: false, ultimoSync: 'N/A', icono: Activity }
  ];

  const metricas = [
    { label: 'Frecuencia cardíaca', valor: '72 bpm', icono: Heart, color: 'text-red-500' },
    { label: 'Pasos hoy', valor: '8,234', icono: Activity, color: 'text-emerald-500' },
    { label: 'Calorías', valor: '1,856 kcal', icono: Zap, color: 'text-orange-500' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
            <Watch className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Integración de Wearables</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Integración simulada con wearables para métricas objetivas en tiempo real
        </p>

        {/* Estado de dispositivos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {dispositivos.map((dispositivo, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border ${
                dispositivo.conectado
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <dispositivo.icono className={`w-5 h-5 ${dispositivo.conectado ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold text-gray-800">{dispositivo.nombre}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${dispositivo.conectado ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              </div>
              <p className="text-xs text-gray-600">Último sync: {dispositivo.ultimoSync}</p>
            </div>
          ))}
        </div>

        {/* Métricas actuales */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Métricas en tiempo real</h3>
          <div className="space-y-3">
            {metricas.map((metrica, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metrica.icono className={`w-5 h-5 ${metrica.color}`} />
                  <span className="text-sm text-gray-700">{metrica.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{metrica.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badge de sincronización */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-bold">Sincronizado</span>
        </div>
      </div>
    </div>
  );
};

export default IntegracionWearables;
