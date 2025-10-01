import React, { useState } from 'react';
import EmailsBienvenida from './components/EmailsBienvenida';
import RecordatoriosSesion from './components/RecordatoriosSesion';
import MensajesMotivacion from './components/MensajesMotivacion';
import SMSBasicos from './components/SMSBasicos';
import PersonalizacionReutilizacion from './components/PersonalizacionReutilizacion';

const PlantillasComunicacionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bienvenida');

  const renderContent = () => {
    switch (activeTab) {
      case 'bienvenida':
        return <EmailsBienvenida />;
      case 'recordatorios':
        return <RecordatoriosSesion />;
      case 'motivacion':
        return <MensajesMotivacion />;
      case 'sms':
        return <SMSBasicos />;
      case 'personalizacion':
        return <PersonalizacionReutilizacion />;
      default:
        return <EmailsBienvenida />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Plantillas de Comunicación - Mensajería Automatizada</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Gestiona y automatiza tus comunicaciones con clientes de manera eficiente. Desde emails de bienvenida hasta mensajes de motivación y recordatorios de sesión, personaliza cada interacción para maximizar el compromiso y los resultados.
        </p>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('bienvenida')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'bienvenida' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Emails de Bienvenida
          </button>
          <button
            onClick={() => setActiveTab('recordatorios')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'recordatorios' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Recordatorios de Sesión
          </button>
          <button
            onClick={() => setActiveTab('motivacion')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'motivacion' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Mensajes de Motivación
          </button>
          <button
            onClick={() => setActiveTab('sms')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'sms' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            SMS Básicos
          </button>
          <button
            onClick={() => setActiveTab('personalizacion')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'personalizacion' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Personalización y Reutilización
          </button>
        </nav>
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default PlantillasComunicacionPage;
