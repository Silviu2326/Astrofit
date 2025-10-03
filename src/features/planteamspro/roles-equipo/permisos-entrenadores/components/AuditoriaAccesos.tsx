import React from 'react';
import { Activity, Clock, User, Shield } from 'lucide-react';

const AuditoriaAccesos: React.FC = () => {
  const logs = [
    { id: 1, user: 'Carlos Pérez', action: 'Modificó permisos', timestamp: 'Hace 5 min', type: 'warning' },
    { id: 2, user: 'Ana García', action: 'Acceso denegado', timestamp: 'Hace 12 min', type: 'error' },
    { id: 3, user: 'Luis Torres', action: 'Ingreso exitoso', timestamp: 'Hace 20 min', type: 'success' },
  ];

  const typeStyles = {
    warning: 'bg-orange-100 text-orange-700 border-orange-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    success: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Activity className="w-6 h-6" />
          </div>
          Auditoría de Accesos
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-300 border border-transparent hover:border-teal-100 hover:shadow-md group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-teal-400 to-cyan-600">
                <User className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 leading-relaxed">
                  <span className="font-bold">{log.user}</span>
                  {' '}<span className="text-gray-700">{log.action}</span>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">{log.timestamp}</span>
                </div>
              </div>

              <div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${typeStyles[log.type as keyof typeof typeStyles]}`}>
                  {log.type === 'success' ? 'Exitoso' : log.type === 'warning' ? 'Alerta' : 'Error'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditoriaAccesos;
