import React, { useState } from 'react';
import { AlertTriangle, Bell, AlertCircle, CheckCircle } from 'lucide-react';

interface Alert {
  id: string;
  level: 'normal' | 'warning' | 'critical';
  message: string;
  timestamp: string;
}

const SistemaAlertas: React.FC = () => {
  const [alerts] = useState<Alert[]>([
    { id: '1', level: 'critical', message: 'FC atleta #3 > 180 bpm', timestamp: 'Hace 2 min' },
    { id: '2', level: 'warning', message: 'Carga atleta #1 cerca del límite', timestamp: 'Hace 5 min' },
    { id: '3', level: 'normal', message: 'Todos los parámetros normales', timestamp: 'Hace 8 min' },
  ]);

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getAlertStyle = (level: string) => {
    switch (level) {
      case 'critical':
        return 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50';
      case 'warning':
        return 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50';
      default:
        return 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50';
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Sistema de Alertas Multi-Nivel</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Sistema de alertas con escalamiento automático para el staff médico</p>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 border-2 ${getAlertStyle(alert.level)} rounded-xl transition-all duration-300 hover:shadow-md relative overflow-hidden`}
          >
            {/* Decoración de fondo */}
            {alert.level === 'critical' && (
              <div className="absolute inset-0 bg-red-500 opacity-5 animate-pulse"></div>
            )}

            <div className="flex items-start gap-3 relative z-10">
              <div className="mt-0.5">{getAlertIcon(alert.level)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SistemaAlertas;
