import React, { useState } from 'react';

const FiltrosCompetencia: React.FC = () => {
  const [gender, setGender] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
    // Aquí se podría añadir lógica para aplicar el filtro
    console.log('Filtrar por género:', event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    // Aquí se podría añadir lógica para aplicar el filtro
    console.log('Filtrar por categoría:', event.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <select
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={gender}
        onChange={handleGenderChange}
      >
        <option value="">Todos los géneros</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
      </select>

      <select
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las categorías</option>
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>
        <option value="veteran">Veterano</option>
      </select>
    </div>
  );
};

export default FiltrosCompetencia;