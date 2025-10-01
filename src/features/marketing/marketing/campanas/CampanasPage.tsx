import React from 'react';
import CrearCampana from './components/CrearCampana';
import SeguimientoResultados from './components/SeguimientoResultados';
import HistorialCampanas from './components/HistorialCampanas';
import MetricasCampana from './components/MetricasCampana';
import CalendarioCampanas from './components/CalendarioCampanas';

const CampanasPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Organizador de Iniciativas de Promoción</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <CrearCampana />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <SeguimientoResultados />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <HistorialCampanas />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <MetricasCampana />
        </div>
        <div className="bg-white p-4 rounded-lg shadow col-span-full">
          <CalendarioCampanas />
        </div>
      </div>
    </div>
  );
};

export default CampanasPage;
