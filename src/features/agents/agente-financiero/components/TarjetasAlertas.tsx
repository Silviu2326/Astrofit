
import React, { useEffect, useState } from 'react';
import { fetchAlerts, AlertCard } from '../agenteFinancieroApi';

const TarjetasAlertas: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertCard[]>([]);

  useEffect(() => {
    fetchAlerts().then(setAlerts);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Alertas Importantes</h2>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-gray-600">No hay alertas pendientes.</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="p-3 border border-gray-200 rounded-md">
              <p className="font-medium text-gray-700">{alert.message}</p>
              {alert.clientName && <p className="text-sm text-gray-500">Cliente: {alert.clientName}</p>}
              {alert.amount && <p className="text-sm text-gray-500">Monto: {alert.amount} €</p>}
              {alert.dueDate && <p className="text-sm text-gray-500">Fecha Límite: {alert.dueDate}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TarjetasAlertas;
