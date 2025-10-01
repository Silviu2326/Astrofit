import React from 'react';
import DashboardMetricas from './components/DashboardMetricas';
import GraficosEvolucion from './components/GraficosEvolucion';
import AlertasRiesgo from './components/AlertasRiesgo';
import InformeAutomatico from './components/InformeAutomatico';
import ModuloInsights from './components/ModuloInsights';

const AgenteProgresoPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agente de Progreso - El Analista</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full lg:col-span-2">
          <DashboardMetricas />
        </div>
        <div className="col-span-full lg:col-span-1">
          <AlertasRiesgo />
        </div>
        <div className="col-span-full">
          <GraficosEvolucion />
        </div>
        <div className="col-span-full lg:col-span-2">
          <ModuloInsights />
        </div>
        <div className="col-span-full lg:col-span-1">
          <InformeAutomatico />
        </div>
      </div>
    </div>
  );
};

export default AgenteProgresoPage;
