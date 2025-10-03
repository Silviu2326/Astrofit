import React from 'react';
import ConfiguradorDominio from './components/ConfiguradorDominio';
import EstadoDominio from './components/EstadoDominio';
import GuiaPasoAPaso from './components/GuiaPasoAPaso';

const PersonalizacionDominioPage: React.FC = () => {
  // Aquí iría la lógica para gestionar el estado del dominio, la API, etc.
  const domainStatus = 'pending'; // Ejemplo: 'activo', 'pending', 'error'
  const customDomain = 'entrenaconana.com'; // Ejemplo de dominio

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Personalización de Dominio</h1>
      <p className="text-gray-600 mb-8">Configura tu propio dominio para tu micrositio.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ConfiguradorDominio />
          <EstadoDominio status={domainStatus} domain={customDomain} />
        </div>
        <div>
          <GuiaPasoAPaso />
        </div>
      </div>

      <div className="mt-10 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
        <p className="font-bold">Preview del Micrositio:</p>
        <p>Tu micrositio estará disponible en: <a href={`http://${customDomain}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{customDomain}</a></p>
      </div>

      <div className="mt-8 text-center text-gray-500">
        <p>¿Necesitas ayuda? Contacta con soporte técnico.</p>
      </div>
    </div>
  );
};

export default PersonalizacionDominioPage;
