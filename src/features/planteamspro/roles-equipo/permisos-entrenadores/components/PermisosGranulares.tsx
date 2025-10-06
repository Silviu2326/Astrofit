import React from 'react';
import { Settings, Sliders, Lock } from 'lucide-react';

const PermisosGranulares: React.FC = () => {
  const granularPermisos = [
    { id: 1, name: 'Ver estadísticas', module: 'Dashboard', enabled: true },
    { id: 2, name: 'Editar jugadores', module: 'Plantilla', enabled: true },
    { id: 3, name: 'Aprobar fichajes', module: 'Fichajes', enabled: false },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Sliders className="w-6 h-6" />
          </div>
          Permisos Granulares
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-3">
          {granularPermisos.map((permiso) => (
            <div
              key={permiso.id}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 border border-transparent hover:border-orange-100 hover:shadow-md group bg-white/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{permiso.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">Módulo: {permiso.module}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only" checked={permiso.enabled} readOnly />
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-all duration-300 ${
                    permiso.enabled
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                      : 'bg-gray-300'
                  }`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ${
                    permiso.enabled ? 'translate-x-5' : ''
                  }`}></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermisosGranulares;
