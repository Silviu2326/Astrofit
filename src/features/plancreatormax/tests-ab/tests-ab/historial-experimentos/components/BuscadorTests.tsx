import React, { useState } from 'react';

const BuscadorTests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'Type:', filterType, 'Date:', filterDate);
    // Implement search logic here, possibly calling an API function
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-3">Buscador de Tests A/B</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por descripci??n..."
          className="flex-grow p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="UI">UI/UX</option>
          <option value="Content">Contenido</option>
          <option value="Feature">Funcionalidad</option>
        </select>
        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default BuscadorTests;
