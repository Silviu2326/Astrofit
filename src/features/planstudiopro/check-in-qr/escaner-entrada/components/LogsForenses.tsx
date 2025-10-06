
import React from 'react';

const LogsForenses: React.FC = () => {
  const logs = [
    { id: 1, evento: 'Acceso concedido - Usuario: admin', timestamp: '2025-09-28 10:35:00' },
    { id: 2, evento: 'Intento de acceso denegado - IP: 192.168.1.10', timestamp: '2025-09-28 10:32:45' },
    { id: 3, evento: 'Modificaci??n de configuraci??n - Usuario: sysadmin', timestamp: '2025-09-28 10:20:10' },
  ];

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Logs Forenses (Auditor??as y Trazabilidad)</h3>
      <p>Registro detallado de todos los eventos del sistema para auditor??as de seguridad.</p>
      <div className="mt-4 h-48 overflow-y-auto bg-gray-700 p-3 rounded-md text-sm">
        {logs.map(log => (
          <p key={log.id} className="mb-1 text-gray-300">
            <span className="font-mono text-gray-400">[{log.timestamp}]</span> {log.evento}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LogsForenses;
