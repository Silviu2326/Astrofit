import React from 'react';
import ProtocolosSugeridos from './components/ProtocolosSugeridos';
import ResumenesInvestigacion from './components/ResumenesInvestigacion';
import RecomendacionesSeguras from './components/RecomendacionesSeguras';
import ValidacionPlanes from './components/ValidacionPlanes';
import MiniBiblioteca from './components/MiniBiblioteca';

const AgenteCientificoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Agente Científico - El Friki de la Evidencia</h1>
        <p className="text-xl text-gray-600">Tu asistente personal para decisiones fitness basadas en ciencia.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProtocolosSugeridos />
          <ResumenesInvestigacion />
          <RecomendacionesSeguras />
        </div>
        <div className="lg:col-span-1">
          <ValidacionPlanes />
          <MiniBiblioteca />
          {/* Additional features can be added here */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Base de Datos de Estudios Científicos</h2>
            <p className="text-gray-600">Acceso a una vasta colección de estudios para profundizar en cualquier tema.</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700">Explorar Base de Datos</button>
          </div>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Alertas de Contraindicaciones</h2>
            <p className="text-gray-600">Recibe avisos sobre ejercicios o protocolos que podrían ser perjudiciales para tu condición.</p>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700">Configurar Alertas</button>
          </div>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Actualizaciones Automáticas de Evidencia</h2>
            <p className="text-gray-600">Mantente al día con los últimos descubrimientos científicos sin esfuerzo.</p>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700">Ver Novedades</button>
          </div>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Validador de Protocolos contra Literatura Científica</h2>
            <p className="text-gray-600">Sube tu propio protocolo y obtén un análisis detallado basado en la evidencia.</p>
            <button className="mt-4 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-700">Validar Protocolo</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgenteCientificoPage;
