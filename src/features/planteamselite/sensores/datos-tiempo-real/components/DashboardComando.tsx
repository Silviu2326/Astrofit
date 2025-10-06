import React from 'react';
import { MonitorCheck, Wifi, Users } from 'lucide-react';

const DashboardComando: React.FC = () => {
  const systemStatus = [
    { name: 'Sensores', status: 'online', count: 24 },
    { name: 'Atletas', status: 'online', count: 18 },
    { name: 'Cámaras', status: 'online', count: 6 },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-slate-700 to-gray-900 rounded-xl">
          <MonitorCheck className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Mission Control</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Dashboard de comando para staff técnico</p>

      <div className="space-y-3">
        {systemStatus.map((system, index) => (
          <div
            key={index}
            className="p-3 border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full blur-md opacity-50"></div>
                </div>
                <span className="text-sm font-semibold text-gray-800">{system.name}</span>
              </div>
              <span className="text-lg font-bold text-emerald-700">{system.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Estado del Sistema */}
      <div className="mt-4 p-4 bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl border border-gray-700 relative overflow-hidden">
        {/* Efecto glow */}
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Wifi className="w-5 h-5 text-emerald-400" />
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Sistema Operacional</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-400">95%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Todos los sistemas funcionando correctamente</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardComando;
