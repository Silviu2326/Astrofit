
import React from 'react';

const ReactivacionClientesPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reactivación de Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Radar de Clientes Inactivos */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Radar de Clientes Inactivos</h2>
          {/* Componente RadarInactivos */}
        </div>

        {/* Tarjetas de Alerta */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Alertas de Reactivación</h2>
          {/* Componente TarjetasAlerta */}
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Acciones Rápidas</h2>
          {/* Componente AccionesRapidas */}
        </div>

        {/* Sugerencias de Reactivación */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Sugerencias de Reactivación</h2>
          {/* Componente SugerenciasReactivacion */}
        </div>
      </div>
    </div>
  );
};

export default ReactivacionClientesPage;
