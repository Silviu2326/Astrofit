
import React from 'react';

const MapaUbicaciones: React.FC = () => {
  return (
    <div className="mapa-ubicaciones">
      <h3>Mapa de Ubicaciones</h3>
      {/* Aquí se integraría el mapa (ej. Google Maps, Leaflet) */}
      <div style={{ height: '300px', background: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        [Mapa integrado de la ubicación exacta de la sede]
      </div>
    </div>
  );
};

export default MapaUbicaciones;
