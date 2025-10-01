import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchChurnAlerts, ChurnAlert } from '../retencionClientesApi';

const AlertasPerdida: React.FC = () => {
  const { data: alerts, isLoading, error } = useQuery<ChurnAlert[], Error>({
    queryKey: ['churnAlerts'],
    queryFn: fetchChurnAlerts,
  });

  if (isLoading) return <div>Cargando alertas...</div>;
  if (error) return <div>Error al cargar alertas: {error.message}</div>;

  return (
    <div className="space-y-4">
      {alerts && alerts.length > 0 ? (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg ${
              alert.severity === 'high'
                ? 'bg-red-100 border-l-4 border-red-500'
                : alert.severity === 'medium'
                ? 'bg-yellow-100 border-l-4 border-yellow-500'
                : 'bg-blue-100 border-l-4 border-blue-500'
            }`}
          >
            <p className="font-semibold text-gray-800">Cliente: {alert.customerName}</p>
            <p className="text-sm text-gray-700">Motivo: {alert.reason}</p>
            <p className="text-xs text-gray-500">Fecha: {alert.date}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay alertas de pérdida de clientes en este momento.</p>
      )}
    </div>
  );
};

export default AlertasPerdida;
