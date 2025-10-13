import React, { useEffect, useState } from 'react';
import { getCategorias } from '../blogNoticiasApi';

interface CategoriasFiltroProps {
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
}

const CategoriasFiltro: React.FC<CategoriasFiltroProps> = ({ onCategoryChange, onSearchChange }) => {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCategorias();
        setCategorias(response.data);
      } catch (err) {
        setError('Error al cargar categorías');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchTerm(search);
    onSearchChange?.(search);
  };

  if (loading) {
    return <div className='text-center p-4'>Cargando categorías...</div>;
  }

  if (error) {
    return <div className='text-red-500 text-center p-4'>Error: {error}</div>;
  }

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
