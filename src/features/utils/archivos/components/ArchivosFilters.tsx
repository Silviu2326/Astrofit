import React, { useState } from 'react';

interface ArchivosFiltersProps {
  onFilterChange: (filters: any) => void;
  onSearch: (searchTerm: string) => void;
}

const ArchivosFilters: React.FC<ArchivosFiltersProps> = ({ onFilterChange, onSearch }) => {
  const [fileType, setFileType] = useState('');
  const [client, setClient] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [tag, setTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({
      fileType,
      client,
      uploadDate,
      tag,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Filtros de Archivos</h3>

      <div className="mb-3">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar por nombre</label>
        <input
          type="text"
          id="search"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar archivos..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fileType" className="block text-sm font-medium text-gray-700">Tipo de Archivo</label>
        <select
          id="fileType"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="pdf">PDF</option>
          <option value="jpg">JPG</option>
          <option value="png">PNG</option>
          {/* Add more file types as needed */}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente Asociado</label>
        <input
          type="text"
          id="client"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Nombre del cliente..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="uploadDate" className="block text-sm font-medium text-gray-700">Fecha de Subida</label>
        <input
          type="date"
          id="uploadDate"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={uploadDate}
          onChange={(e) => setUploadDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Etiquetas</label>
        <select
          id="tag"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="contratos">Contratos</option>
          <option value="médicos">Médicos</option>
          <option value="programas">Programas</option>
          <option value="fotos">Fotos</option>
          {/* Add more tags as needed */}
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default ArchivosFilters;