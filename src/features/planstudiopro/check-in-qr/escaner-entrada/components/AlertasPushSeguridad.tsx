
import React, { useState } from 'react';

const AlertasPushSeguridad: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: 'Alerta Cr??tica: Intruso detectado en Sector C', leida: false },
    { id: 2, mensaje: 'Advertencia: Aforo cercano al l??mite (85%)', leida: true },
  ]);

  const marcarComoLeida = (id: number) => {
    setNotificaciones(notificaciones.map(n => (n.id === id ? { ...n, leida: true } : n)));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Alertas Push de Seguridad (Notificaciones al Staff)</h3>
      <p>Env??o de notificaciones en tiempo real a dispositivos del personal de seguridad.</p>
      <div className="mt-4 space-y-2">
        {notificaciones.map(notif => (
          <div
            key={notif.id}
            className={`p-3 rounded-md flex justify-between items-center ${notif.leida ? 'bg-gray-700' : 'bg-red-700'}`}
          >
            <div>
              <p className={`font-semibold ${notif.leida ? 'text-gray-300' : 'text-white'}`}>{notif.mensaje}</p>
              {!notif.leida && <p className="text-sm text-red-200">??NUEVA ALERTA!</p>}
            </div>
            {!notif.leida && (
              <button
                onClick={() => marcarComoLeida(notif.id)}
                className="bg-red-900 hover:bg-red-800 text-white text-xs px-2 py-1 rounded"
              >
                Marcar como le??da
              </button>
            )}
          </div>
        ))}
        {notificaciones.length === 0 && <p className="text-gray-400">No hay notificaciones pendientes.</p>}
      </div>
    </div>
  );
};

export default AlertasPushSeguridad;
