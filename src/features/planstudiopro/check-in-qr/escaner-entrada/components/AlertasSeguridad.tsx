
import React, { useState } from 'react';

const AlertasSeguridad: React.FC = () => {
  const [alertas, setAlertas] = useState([
    { id: 1, mensaje: 'Persona no autorizada detectada en Zona A', timestamp: '2025-09-28 10:30:00', severidad: 'Alta' },
    { id: 2, mensaje: 'Intento de acceso fallido en Puerta Principal', timestamp: '2025-09-28 10:25:15', severidad: 'Media' },
  ]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Alertas de Seguridad (Detecci??n de Personas No Autorizadas)</h3>
      <p>Notificaciones instant??neas ante eventos de seguridad cr??ticos.</p>
      <div className="mt-4 space-y-2">
        {alertas.map(alerta => (
          <div key={alerta.id} className="bg-red-700 p-3 rounded-md flex justify-between items-center">
            <div>
              <p className="font-semibold">{alerta.mensaje}</p>
              <p className="text-sm text-gray-200">{alerta.timestamp} - Severidad: {alerta.severidad}</p>
            </div>
            <button className="bg-red-900 hover:bg-red-800 text-white text-xs px-2 py-1 rounded">Resolver</button>
          </div>
        ))}
        {alertas.length === 0 && <p className="text-gray-400">No hay alertas activas.</p>}
      </div>
    </div>
  );
};

export default AlertasSeguridad;
