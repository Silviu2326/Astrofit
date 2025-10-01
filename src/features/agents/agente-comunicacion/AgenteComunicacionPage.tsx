
import React from 'react';
import GeneradorMensajes from './components/GeneradorMensajes';
import PlantillasRapidas from './components/PlantillasRapidas';
import VistaPreviaEnvio from './components/VistaPreviaEnvio';
import CalendarioEditorial from './components/CalendarioEditorial';
import CajaCreativa from './components/CajaCreativa';

const AgenteComunicacionPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agente de Comunicación - El Copy Fitness</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full lg:col-span-2">
          <GeneradorMensajes />
        </div>
        <div className="col-span-full lg:col-span-1">
          <PlantillasRapidas />
        </div>
        <div className="col-span-full">
          <CajaCreativa />
        </div>
        <div className="col-span-full lg:col-span-2">
          <VistaPreviaEnvio />
        </div>
        <div className="col-span-full lg:col-span-1">
          <CalendarioEditorial />
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Funcionalidades Adicionales</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Editor de contenido con IA</li>
          <li>Personalización automática por cliente</li>
          <li>Análisis de efectividad de mensajes</li>
          <li>Biblioteca de copys exitosos</li>
        </ul>
      </div>
    </div>
  );
};

export default AgenteComunicacionPage;
