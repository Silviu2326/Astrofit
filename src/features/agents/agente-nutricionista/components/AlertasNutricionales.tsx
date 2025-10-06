
import React from 'react';

interface Alert {
  id: string;
  type: 'deficit' | 'excess';
  nutrient: string;
  message: string;
}

interface AlertasNutricionalesProps {
  alerts: Alert[];
}

const AlertasNutricionales: React.FC<AlertasNutricionalesProps> = ({ alerts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Alertas Nutricionales</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-500">No hay alertas nutricionales actualmente.</p>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-md ${alert.type === 'deficit' ? 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700' : 'bg-red-50 border-l-4 border-red-400 text-red-700'}`}
            >
              <p className="font-bold">{alert.type === 'deficit' ? 'Déficit detectado:' : 'Exceso detectado:'} {alert.nutrient}</p>
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertasNutricionales;
