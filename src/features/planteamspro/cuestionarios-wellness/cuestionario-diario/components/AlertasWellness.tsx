// src/features/cuestionario-diario/components/AlertasWellness.tsx
import React from 'react';
import { AlertTriangle, Bell, CheckCircle } from 'lucide-react';

const AlertasWellness: React.FC = () => {
  const alertas = [
    { tipo: 'advertencia', mensaje: 'Nivel de energía bajo detectado', activa: true },
    { tipo: 'info', mensaje: 'Todo en orden', activa: false }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden h-full">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Alertas de Wellness</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Sistema de alertas automáticas cuando las métricas caen significativamente
        </p>

        {/* Lista de alertas */}
        <div className="space-y-3">
          {alertas.map((alerta, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                alerta.activa
                  ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${
                  alerta.activa ? 'bg-orange-500' : 'bg-green-500'
                }`}>
                  {alerta.activa ? (
                    <AlertTriangle className="w-5 h-5 text-white" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${
                    alerta.activa ? 'text-orange-700' : 'text-green-700'
                  }`}>
                    {alerta.mensaje}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badge de estado */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-blue-700">Sistema activo</span>
        </div>
      </div>
    </div>
  );
};

export default AlertasWellness;
