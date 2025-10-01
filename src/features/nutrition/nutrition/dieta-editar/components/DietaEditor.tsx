import React, { useState } from 'react';
import { Diet, Meal, Recipe } from '../dietaEditarApi';

interface DietaEditorProps {
  diet: Diet;
  onDietChange: (diet: Diet) => void;
}

const DietaEditor: React.FC<DietaEditorProps> = ({ diet, onDietChange }) => {
  const [editedDiet, setEditedDiet] = useState<Diet>(diet);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDiet({ ...editedDiet, name: e.target.value });
  };

  const handleSave = () => {
    onDietChange(editedDiet);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detalles de la Dieta</h2>
      <div className="mb-4">
        <label htmlFor="dietName" className="block text-sm font-medium text-gray-600">Nombre de la Dieta</label>
        <input
          type="text"
          id="dietName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={editedDiet.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-4">
        <p className="block text-sm font-medium text-gray-600">Versión: <span className="font-normal">V{editedDiet.version}</span></p>
      </div>
      <button
        onClick={handleSave}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Guardar Cambios Generales
      </button>
    </div>
  );
};

export default DietaEditor;
