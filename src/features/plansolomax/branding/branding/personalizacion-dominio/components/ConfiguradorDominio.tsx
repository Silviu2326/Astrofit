import React, { useState } from 'react';
import { verifyDomain, saveDomainConfiguration } from '../personalizacionDominioApi';

const ConfiguradorDominio: React.FC = () => {
  const [domain, setDomain] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValidDomain = (domainString: string): boolean => {
    // Regex simple para validar dominios (puede ser más robusto)
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domainString);
  };

  const handleSaveDomain = async () => {
    if (!isValidDomain(domain)) {
      setMessage({ type: 'error', text: 'Por favor, introduce un dominio válido (ej: entrenaconana.com).' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: 'info', text: 'Guardando y verificando dominio...' });
    try {
      await saveDomainConfiguration(domain);
      const verificationResult = await verifyDomain(domain);
      setMessage({ type: verificationResult.status === 'error' ? 'error' : 'success', text: verificationResult.message });
    } catch (error) {
      setMessage({ type: 'error', text: 'Ocurrió un error al procesar el dominio.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Configurar Dominio Propio</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="ej: entrenaconana.com"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
            setMessage(null); // Limpiar mensaje al escribir
          }}
        />
        <button
          onClick={handleSaveDomain}
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Guardar y Verificar Dominio'}
        </button>
      </div>
      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' :
            message.type === 'error' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ConfiguradorDominio;
