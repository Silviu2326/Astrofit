
import React, { useState } from 'react';
import { agenteComunicacionApi } from '../agenteComunicacionApi';

const CajaCreativa: React.FC = () => {
  const [originalMessage, setOriginalMessage] = useState<string>('');
  const [variations, setVariations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateVariations = async () => {
    setLoading(true);
    try {
      const generatedVariations = await agenteComunicacionApi.generateMessageVariations(originalMessage, 3);
      setVariations(generatedVariations);
    } catch (error) {
      console.error('Error generating message variations:', error);
      setVariations(['Error al generar variaciones.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Caja Creativa</h2>
      <p className="text-gray-600 mb-4">Genera variaciones de un mismo mensaje para elegir la que más te guste.</p>
      <div className="mb-4">
        <label htmlFor="originalMessage" className="block text-gray-700 text-sm font-bold mb-2">Mensaje Original:</label>
        <textarea
          id="originalMessage"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          value={originalMessage}
          onChange={(e) => setOriginalMessage(e.target.value)}
          placeholder="Escribe el mensaje del que quieres generar variaciones..."
        ></textarea>
      </div>
      <button
        onClick={handleGenerateVariations}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        {loading ? 'Generando Variaciones...' : 'Generar Variaciones'}
      </button>

      {variations.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-lg text-gray-800 mb-3">Variaciones Generadas:</h3>
          <div className="space-y-3">
            {variations.map((variation, index) => (
              <div key={index} className="p-3 border border-purple-200 rounded-md bg-purple-50 text-purple-800">
                <p className="whitespace-pre-wrap">{variation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CajaCreativa;
