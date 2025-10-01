import React, { useState, useEffect } from 'react';
import { agenteMarketingApi, Copy } from '../agenteMarketingApi';

const CopysAutomaticos: React.FC = () => {
  const [copies, setCopies] = useState<Copy[]>([]);
  const [loading, setLoading] = useState(false);
  const [objective, setObjective] = useState('Generar leads para un nuevo software SaaS');
  const [targetSegment, setTargetSegment] = useState('Pequeñas y medianas empresas');

  const handleGenerateCopies = async () => {
    setLoading(true);
    try {
      const generatedCopies = await agenteMarketingApi.generateCopies({ objective, targetSegment });
      setCopies(generatedCopies);
    } catch (error) {
      console.error('Error generating copies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateCopies(); // Generate copies on initial load
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Copys Automáticos</h2>
      <div className="mb-4 space-y-2">
        <div>
          <label htmlFor="copyObjective" className="block text-sm font-medium text-gray-700">
            Objetivo para Copys
          </label>
          <input
            type="text"
            id="copyObjective"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="copyTargetSegment" className="block text-sm font-medium text-gray-700">
            Segmento para Copys
          </label>
          <input
            type="text"
            id="copyTargetSegment"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={targetSegment}
            onChange={(e) => setTargetSegment(e.target.value)}
          />
        </div>
        <button
          onClick={handleGenerateCopies}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Generando...' : 'Generar Copys'}
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Generando copys...</p>}

      {!loading && copies.length === 0 && <p className="text-center text-gray-500">No se han generado copys aún.</p>}

      <div className="space-y-4">
        {copies.map((copy, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <h3 className="font-medium text-gray-800 capitalize">{copy.channel.replace('_', ' ')}</h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Título:</span> {copy.title}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Cuerpo:</span> {copy.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CopysAutomaticos;
