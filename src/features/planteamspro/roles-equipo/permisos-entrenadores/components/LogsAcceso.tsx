import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

const LogsAcceso: React.FC = () => {
  const logs = [
    { id: 1, user: 'Juan Martínez', action: 'Login exitoso', ip: '192.168.1.10', time: '10:30 AM' },
    { id: 2, user: 'María López', action: 'Cambió permisos', ip: '192.168.1.15', time: '09:45 AM' },
    { id: 3, user: 'Carlos Pérez', action: 'Logout', ip: '192.168.1.20', time: '08:15 AM' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="flex items-center justify-between relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileText className="w-6 h-6" />
            </div>
            Logs de Acceso
          </h3>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
              <Filter className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Usuario</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Acción</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">IP</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Hora</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 transition-all duration-300"
                >
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">{log.user}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{log.action}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-mono rounded-lg">
                      {log.ip}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsAcceso;
