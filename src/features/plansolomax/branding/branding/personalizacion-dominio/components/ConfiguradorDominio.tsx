import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle2, AlertCircle, Loader2, Search, Link as LinkIcon } from 'lucide-react';
import { verifyDomain, saveDomainConfiguration } from '../personalizacionDominioApi';

const ConfiguradorDominio: React.FC = () => {
  const [domain, setDomain] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showExistingDomain, setShowExistingDomain] = useState<boolean>(false);

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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <Globe className="w-7 h-7 text-blue-600" />
            Configurar Dominio
          </h2>
          <p className="text-sm text-gray-600">Conecta tu dominio personalizado en minutos</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowExistingDomain(false)}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              !showExistingDomain
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              <span className="text-sm">Verificar Disponibilidad</span>
            </div>
          </button>
          <button
            onClick={() => setShowExistingDomain(true)}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              showExistingDomain
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm">Conectar Existente</span>
            </div>
          </button>
        </div>

        {/* Input de dominio destacado */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {showExistingDomain ? 'Tu dominio existente' : 'Dominio deseado'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ej: entrenaconana.com"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium text-gray-900 placeholder-gray-400"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setMessage(null);
              }}
            />
          </div>
          {domain && isValidDomain(domain) && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-green-600 flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              Formato válido
            </motion.p>
          )}
        </div>

        {/* Botón principal */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveDomain}
          disabled={isLoading}
          className={`w-full px-6 py-4 rounded-2xl font-bold text-white shadow-xl transition-all duration-300 relative overflow-hidden group ${
            isLoading
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:shadow-2xl'
          }`}
        >
          {/* Efecto hover */}
          {!isLoading && (
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          )}

          <div className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verificando dominio...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>{showExistingDomain ? 'Conectar y Verificar' : 'Verificar Disponibilidad'}</span>
              </>
            )}
          </div>
        </motion.button>

        {/* Mensaje de resultado */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-2xl border-2 ${
              message.type === 'success'
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                : message.type === 'error'
                ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}
              {message.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
              {message.type === 'info' && <Loader2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />}
              <div className="flex-1">
                <p className={`text-sm font-semibold ${
                  message.type === 'success'
                    ? 'text-green-900'
                    : message.type === 'error'
                    ? 'text-red-900'
                    : 'text-blue-900'
                }`}>
                  {message.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Información adicional */}
        {showExistingDomain && (
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
            <p className="text-xs font-semibold text-indigo-900 mb-2">📋 Instrucciones DNS</p>
            <p className="text-xs text-indigo-700">
              Después de conectar tu dominio, deberás configurar los registros DNS.
              Te mostraremos las instrucciones detalladas paso a paso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfiguradorDominio;
