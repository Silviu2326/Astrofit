import React, { useState, useEffect } from 'react';
import { DynamicVariable, getDynamicVariables, Template, getSuccessfulMessagesLibrary, runABTest } from '../plantillasComunicacionApi';

const PersonalizacionReutilizacion: React.FC = () => {
  const [dynamicVariables, setDynamicVariables] = useState<DynamicVariable[]>([]);
  const [successfulMessages, setSuccessfulMessages] = useState<Template[]>([]);
  const [abTestResult, setAbTestResult] = useState<{ winner: string; conversionRateA: number; conversionRateB: number } | null>(null);
  const [selectedTemplateA, setSelectedTemplateA] = useState<string>('');
  const [selectedTemplateB, setSelectedTemplateB] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const vars = await getDynamicVariables();
      setDynamicVariables(vars);
      const successful = await getSuccessfulMessagesLibrary();
      setSuccessfulMessages(successful);
    };
    fetchData();
  }, []);

  const handleRunABTest = async () => {
    if (selectedTemplateA && selectedTemplateB) {
      const result = await runABTest(selectedTemplateA, selectedTemplateB);
      setAbTestResult(result);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Personalización y Reutilización</h2>
      <p className="text-gray-600 mb-6">Sistema de personalización y reutilización en campañas.</p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Variables Dinámicas Disponibles</h3>
        <div className="flex flex-wrap gap-3">
          {dynamicVariables.map(variable => (
            <div key={variable.id} className="bg-gray-100 p-3 rounded-md border border-gray-200">
              <p className="font-mono text-sm text-blue-700">{variable.name}</p>
              <p className="text-xs text-gray-600">{variable.description}</p>
              <p className="text-xs text-gray-500">Ejemplo: <span className="italic">{variable.example}</span></p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Biblioteca de Mensajes Exitosos</h3>
        <p className="text-gray-600 mb-4">Inspírate con mensajes que han demostrado ser efectivos.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {successfulMessages.map(message => (
            <div key={message.id} className="border border-green-200 rounded-lg p-4 bg-green-50 shadow-sm">
              <h4 className="font-semibold text-green-800">{message.name}</h4>
              {message.subject && <p className="text-sm text-green-700">Asunto: {message.subject}</p>}
              <p className="text-sm text-green-600 line-clamp-2">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">A/B Testing de Mensajes</h3>
        <p className="text-gray-600 mb-4">Compara el rendimiento de diferentes versiones de tus mensajes.</p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <select
            className="block w-full md:w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedTemplateA}
            onChange={(e) => setSelectedTemplateA(e.target.value)}
          >
            <option value="">Seleccionar Plantilla A</option>
            {successfulMessages.map(template => (
              <option key={template.id} value={template.id}>{template.name} ({template.type === 'email' ? 'Email' : 'SMS'})</option>
            ))}
          </select>
          <select
            className="block w-full md:w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedTemplateB}
            onChange={(e) => setSelectedTemplateB(e.target.value)}
          >
            <option value="">Seleccionar Plantilla B</option>
            {successfulMessages.map(template => (
              <option key={template.id} value={template.id}>{template.name} ({template.type === 'email' ? 'Email' : 'SMS'})</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleRunABTest}
          disabled={!selectedTemplateA || !selectedTemplateB}
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ejecutar A/B Test
        </button>

        {abTestResult && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Resultados del A/B Test:</h4>
            <p className="text-sm text-blue-700">Plantilla A ({successfulMessages.find(t => t.id === selectedTemplateA)?.name}): Tasa de Conversión = {(abTestResult.conversionRateA * 100).toFixed(2)}%</p>
            <p className="text-sm text-blue-700">Plantilla B ({successfulMessages.find(t => t.id === selectedTemplateB)?.name}): Tasa de Conversión = {(abTestResult.conversionRateB * 100).toFixed(2)}%</p>
            <p className="text-base font-bold text-blue-900 mt-2">Ganador: {successfulMessages.find(t => t.id === abTestResult.winner)?.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizacionReutilizacion;
