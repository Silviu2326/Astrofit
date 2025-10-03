import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const AlertasSeguridad: React.FC = () => {
  const alertas = [
    { id: 1, type: 'critical', message: 'Intento de acceso no autorizado detectado', time: 'Hace 2 min' },
    { id: 2, type: 'warning', message: 'Cambios masivos en permisos', time: 'Hace 15 min' },
    { id: 3, type: 'info', message: 'Actualización de políticas de seguridad', time: 'Hace 1 hora' },
  ];

  const alertStyles = {
    critical: { bg: 'from-red-500 to-rose-500', icon: AlertTriangle, badge: 'bg-red-100 text-red-700' },
    warning: { bg: 'from-orange-500 to-amber-500', icon: AlertCircle, badge: 'bg-orange-100 text-orange-700' },
    info: { bg: 'from-blue-500 to-cyan-500', icon: Info, badge: 'bg-blue-100 text-blue-700' },
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          Alertas de Seguridad
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-3">
          {alertas.map((alerta) => {
            const style = alertStyles[alerta.type as keyof typeof alertStyles];
            const Icon = style.icon;

            return (
              <div
                key={alerta.id}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.bg} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 mb-2">{alerta.message}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${style.badge}`}>
                      {alerta.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{alerta.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlertasSeguridad;
