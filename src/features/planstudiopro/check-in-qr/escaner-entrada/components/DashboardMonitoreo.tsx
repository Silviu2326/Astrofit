
import React from 'react';

const DashboardMonitoreo: React.FC = () => {
  // Datos simulados para el dashboard
  const data = {
    accesosHoy: 1250,
    accesosDenegados: 15,
    alertasActivas: 3,
    aforoActual: 65,
    temperaturaMedia: 36.8,
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Dashboard de Monitoreo en Tiempo Real</h3>
      <p>Visualizaci??n centralizada de m??tricas clave y estado del sistema.</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-400">Accesos Hoy</p>
          <p className="text-2xl font-bold">{data.accesosHoy}</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-400">Denegados</p>
          <p className="text-2xl font-bold text-red-400">{data.accesosDenegados}</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-400">Alertas Activas</p>
          <p className="text-2xl font-bold text-yellow-400">{data.alertasActivas}</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-400">Aforo Actual</p>
          <p className="text-2xl font-bold">{data.aforoActual}%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMonitoreo;
