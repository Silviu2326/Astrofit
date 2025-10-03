import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

const AprobacionMultinivel: React.FC = () => {
  const aprobaciones = [
    { id: 1, nivel: 1, aprobador: 'Director Técnico', estado: 'aprobado', time: 'Aprobado ayer' },
    { id: 2, nivel: 2, aprobador: 'Director Deportivo', estado: 'pendiente', time: 'En espera' },
    { id: 3, nivel: 3, aprobador: 'Presidente', estado: 'pendiente', time: 'No iniciado' },
  ];

  const statusStyles = {
    aprobado: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' },
    pendiente: { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' },
    rechazado: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' },
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          Aprobación Multinivel
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-3">
          {aprobaciones.map((aprobacion, index) => {
            const style = statusStyles[aprobacion.estado as keyof typeof statusStyles];
            const Icon = style.icon;

            return (
              <div key={aprobacion.id} className="relative">
                {/* Línea conectora */}
                {index < aprobaciones.length - 1 && (
                  <div className="absolute left-[21px] top-12 w-0.5 h-8 bg-gradient-to-b from-purple-200 to-transparent"></div>
                )}

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {aprobacion.nivel}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900">{aprobacion.aprobador}</h4>
                    <p className="text-xs text-gray-600 mt-1">{aprobacion.time}</p>
                  </div>

                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${style.border} ${style.bg}`}>
                    <Icon className={`w-4 h-4 ${style.color}`} />
                    <span className={`text-xs font-bold ${style.color}`}>
                      {aprobacion.estado.charAt(0).toUpperCase() + aprobacion.estado.slice(1)}
                    </span>
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

export default AprobacionMultinivel;
