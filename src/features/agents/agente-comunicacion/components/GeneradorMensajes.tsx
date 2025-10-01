
import React, { useState } from 'react';
import { agenteComunicacionApi, MessageTone } from '../agenteComunicacionApi';

const GeneradorMensajes: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [tone, setTone] = useState<MessageTone>('warm');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateMessage = async () => {
    setLoading(true);
    try {
      const message = await agenteComunicacionApi.generateMessage(content, tone, length);
      setGeneratedMessage(message);
    } catch (error) {
      console.error('Error generating message:', error);
      setGeneratedMessage('Error al generar el mensaje.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Generador de Mensajes</h2>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Contenido Principal:</label>
        <textarea
          id="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe la idea principal de tu mensaje..."
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="tone" className="block text-gray-700 text-sm font-bold mb-2">Tono:</label>
        <select
          id="tone"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={tone}
          onChange={(e) => setTone(e.target.value as MessageTone)}
        >
          <option value="warm">Cálido</option>
          <option value="technical">Técnico</option>
          <option value="motivational">Motivador</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="length" className="block text-gray-700 text-sm font-bold mb-2">Longitud:</label>
        <select
          id="length"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={length}
          onChange={(e) => setLength(e.target.value as 'short' | 'medium' | 'long')}
        >
          <option value="short">Corto</option>
          <option value="medium">Medio</option>
          <option value="long">Largo</option>
        </select>
      </div>
      <button
        onClick={handleGenerateMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        {loading ? 'Generando...' : 'Generar Mensaje'}
      </button>

      {generatedMessage && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
          <h3 className="font-bold">Mensaje Generado:</h3>
          <p className="mt-2 whitespace-pre-wrap">{generatedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default GeneradorMensajes;
