import React, { useState } from 'react';

const FiltrosCliente: React.FC = () => {
  const [cliente, setCliente] = useState<string>('');
  const [tipoHabito, setTipoHabito] = useState<string>('');

  const handleSearch = () => {
    console.log('Filtrando por:', { cliente, tipoHabito });
    // Lógica para aplicar filtros
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder="Filtrar por cliente"
        className="p-2 border border-gray-300 rounded-md flex-grow"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <select
        className="p-2 border border-gray-300 rounded-md flex-grow"
        value={tipoHabito}
        onChange={(e) => setTipoHabito(e.target.value)}
      >
        <option value="">Todos los tipos</option>
        <option value="Salud">Salud</option>
        <option value="Desarrollo Personal">Desarrollo Personal</option>
        <option value="Bienestar">Bienestar</option>
        <option value="Educación">Educación</option>
      </select>
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FiltrosCliente;
