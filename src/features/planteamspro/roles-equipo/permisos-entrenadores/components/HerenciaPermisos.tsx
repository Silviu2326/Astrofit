import React from 'react';
import { GitBranch, ArrowRight } from 'lucide-react';

const HerenciaPermisos: React.FC = () => {
  const herencias = [
    { id: 1, parent: 'Entrenador Principal', child: 'Asistente 1', inherited: 12 },
    { id: 2, parent: 'Entrenador Principal', child: 'Asistente 2', inherited: 12 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <GitBranch className="w-6 h-6" />
          </div>
          Herencia de Permisos
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-4">
          {herencias.map((herencia) => (
            <div
              key={herencia.id}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100"
            >
              <div className="px-3 py-2 bg-white rounded-xl shadow-sm">
                <p className="text-xs font-bold text-cyan-900">{herencia.parent}</p>
              </div>

              <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0" />

              <div className="px-3 py-2 bg-white rounded-xl shadow-sm">
                <p className="text-xs font-bold text-blue-900">{herencia.child}</p>
              </div>

              <div className="ml-auto">
                <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full">
                  {herencia.inherited} permisos
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HerenciaPermisos;
