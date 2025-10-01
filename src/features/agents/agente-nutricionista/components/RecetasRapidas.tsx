
import React from 'react';

interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface RecetasRapidasProps {
  recipes: Recipe[];
}

const RecetasRapidas: React.FC<RecetasRapidasProps> = ({ recipes }) => {
  const handleDragStart = (e: React.DragEvent, recipeId: string) => {
    e.dataTransfer.setData('recipeId', recipeId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recetas Rápidas</h2>
      <p className="text-gray-600 mb-4">Arrastra y suelta para reemplazar comidas en el calendario.</p>
      <div className="space-y-3">
        {recipes.map(recipe => (
          <div
            key={recipe.id}
            draggable
            onDragStart={(e) => handleDragStart(e, recipe.id)}
            className="bg-blue-50 p-3 rounded-md border border-blue-200 cursor-grab active:cursor-grabbing"
          >
            <p className="font-medium text-blue-800">{recipe.name}</p>
            <p className="text-sm text-blue-600">{recipe.calories} kcal | P: {recipe.protein}g | C: {recipe.carbs}g | G: {recipe.fat}g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetasRapidas;
