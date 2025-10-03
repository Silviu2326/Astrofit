import React, { useEffect, useState } from 'react';
import { getCategorias } from '../blogNoticiasApi';

const CategoriasFiltro: React.FC = () => {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getCategorias();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    // Aquí se podría añadir lógica para filtrar los artículos en el FeedArticulos
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Aquí se podría añadir lógica para buscar artículos en el FeedArticulos
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
      <div className="w-full md:w-1/3">
        <label htmlFor="categoria" className="sr-only">Filtrar por categoría</label>
        <select
          id="categoria"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-1/3">
        <label htmlFor="search" className="sr-only">Buscar artículos</label>
        <input
          type="text"
          id="search"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default CategoriasFiltro;
