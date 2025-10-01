import React from 'react';
import DashboardFuentes from './components/DashboardFuentes';
import ClasificarLeads from './components/ClasificarLeads';
import AnalisisInversion from './components/AnalisisInversion';
import TendenciasCanales from './components/TendenciasCanales';
import EtiquetasCanales from './components/EtiquetasCanales';

const FuentesLeadPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Análisis de Origen de Clientes (Fuentes de Lead)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Dashboard General</h2>
          <DashboardFuentes />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Clasificación de Leads</h2>
          <ClasificarLeads />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Análisis de Inversión</h2>
          <AnalisisInversion />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tendencias de Canales</h2>
          <TendenciasCanales />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Gestión de Etiquetas</h2>
          <EtiquetasCanales />
        </div>
      </div>

      {/* Future sections for alerts, recommendations, UTM tracking */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Alertas y Recomendaciones (Próximamente)</h2>
        <p className="text-gray-600">Funcionalidades para alertas de canales poco efectivos y recomendaciones automáticas.</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tracking de UTMs y Códigos de Seguimiento (Próximamente)</h2>
        <p className="text-gray-600">Integración para el seguimiento detallado de campañas y fuentes.</p>
      </div>
    </div>
  );
};

export default FuentesLeadPage;
