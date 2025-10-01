import React from 'react';

interface FiltroCategoriasProps {
  onSelectCategory: (category: string | null) => void;
}

const categorias = [
  { name: 'Todas', value: null },
  { name: 'Fuerza', value: 'fuerza' },
  { name: 'Cardio', value: 'cardio' },
  { name: 'Yoga', value: 'yoga' },
  { name: 'Funcional', value: 'funcional' },
];

const FiltroCategorias: React.FC<FiltroCategoriasProps> = ({ onSelectCategory }) => {
  return (
    <div className="mb-4 flex space-x-2">
      {categorias.map(cat => (
        <button
          key={cat.name}
          onClick={() => onSelectCategory(cat.value)}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default FiltroCategorias;
