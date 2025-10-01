
import React from 'react';
import ConstructorFlujos from './components/ConstructorFlujos';
import SecuenciasAutomaticas from './components/SecuenciasAutomaticas';
import DisparadoresInactividad from './components/DisparadoresInactividad';
import AccionesFidelizacion from './components/AccionesFidelizacion';

const FlujosRetencionPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Automatizaciones de Engagement - Flujos de Retención</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Constructor Visual de Flujos</h2>
          <p className="text-gray-600 mb-4">Diseña tus flujos de retención con un intuitivo constructor drag & drop.</p>
          <ConstructorFlujos />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Secuencias Automáticas</h2>
          <p className="text-gray-600 mb-4">Configura secuencias automáticas para clientes inactivos, por ejemplo: "Te echamos de menos - descuento reactivación".</p>
          <SecuenciasAutomaticas />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Disparadores de Inactividad</h2>
          <p className="text-gray-600 mb-4">Define disparadores basados en el tiempo de inactividad del cliente.</p>
          <DisparadoresInactividad />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acciones de Fidelización</h2>
          <p className="text-gray-600 mb-4">Elige entre diversas acciones como email, notificaciones push, descuentos o llamadas.</p>
          <AccionesFidelizacion />
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Métricas de Efectividad y A/B Testing</h2>
        <p className="text-gray-600">Analiza el rendimiento de tus flujos y optimiza con A/B testing para maximizar la retención.</p>
        {/* Aquí se integrarían componentes para mostrar métricas y configurar A/B testing */}
      </div>
    </div>
  );
};

export default FlujosRetencionPage;
