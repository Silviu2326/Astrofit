import React, { useState } from 'react';

const CategoriasFiltro: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Onboarding', 'Retención', 'Engagement', 'Marketing']; // Ejemplo de categorías

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar plantillas..."
        className="p-2 border rounded-md flex-grow"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriasFiltro;
