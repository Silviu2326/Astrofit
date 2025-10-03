import React, { useState } from 'react';

interface FiltrosAvanzadosProps {
  onApplyFilters?: (filters: any) => void;
}

const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({ onApplyFilters }) => {
  const [resourceType, setResourceType] = useState('');
  const [duration, setDuration] = useState('');
  const [topic, setTopic] = useState('');

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({ resourceType, duration, topic });
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtros Avanzados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700">Tipo de Recurso</label>
          <select
            id="resourceType"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Artículo">Artículo</option>
            <option value="Video">Video</option>
            <option value="Ebook">Ebook</option>
            <option value="Audio">Audio</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duración</label>
          <select
            id="duration"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Cualquiera</option>
            <option value="<15min">Menos de 15 min</option>
            <option value="15-30min">15-30 min</option>
            <option value=">30min">Más de 30 min</option>
          </select>
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Tema</label>
          <input
            type="text"
            id="topic"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: Marketing, Desarrollo Web"
          />
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleApplyFilters}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FiltrosAvanzados;
