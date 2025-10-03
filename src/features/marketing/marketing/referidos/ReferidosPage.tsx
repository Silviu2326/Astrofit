
// src/features/referidos/ReferidosPage.tsx

import React from 'react';
import CodigosReferido from './components/CodigosReferido';
import DescuentosBeneficios from './components/DescuentosBeneficios';
import ControlNuevosClientes from './components/ControlNuevosClientes';
import ProgramaRecompensas from './components/ProgramaRecompensas';
import EstadisticasReferidos from './components/EstadisticasReferidos';

const ReferidosPage: React.FC = () => {
  // Mock user ID for demonstration. In a real app, this would come from auth context.
  const currentUserId = 'user1'; 

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Sistema de Recomendaciones</h1>
      <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl mx-auto">
        ¡Convierte a tus clientes en los mejores embajadores de tu marca! Profesionaliza el boca a boca y recompensa a quienes te traen nuevos clientes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <CodigosReferido currentUserId={currentUserId} />
        </div>
        <DescuentosBeneficios />
        <ProgramaRecompensas />
        <div className="lg:col-span-2">
          <ControlNuevosClientes currentUserId={currentUserId} />
        </div>
        <div className="lg:col-span-2">
          <EstadisticasReferidos currentUserId={currentUserId} />
        </div>
      </div>

      {/* Sección de Notificaciones Automáticas (conceptual, no implementada visualmente aquí) */}
      <div className="bg-white shadow rounded-lg p-6 mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Notificaciones y Herramientas</h3>
        <p className="text-gray-600">Se enviarán notificaciones automáticas cuando tus códigos de referido sean utilizados.</p>
        <p className="text-gray-600 mt-2">Pronto: Templates de mensajes para promover el programa y un Dashboard de performance.</p>
      </div>
    </div>
  );
};

export default ReferidosPage;
