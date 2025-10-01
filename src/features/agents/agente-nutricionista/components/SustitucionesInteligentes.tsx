
import React, { useState } from 'react';

interface SuggestedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const mockSuggestions: SuggestedMeal[] = [
  { id: 's1', name: 'Alternativa 1: Ensalada de garbanzos', calories: 380, protein: 18, carbs: 45, fat: 15 },
  { id: 's2', name: 'Alternativa 2: Sándwich integral de pavo', calories: 320, protein: 25, carbs: 30, fat: 12 },
  { id: 's3', name: 'Alternativa 3: Yogur con frutos rojos y semillas', calories: 250, protein: 15, carbs: 25, fat: 10 },
];

const SustitucionesInteligentes: React.FC = () => {
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestedMeal[]>([]);

  const handleMealClick = (mealId: string) => {
    setSelectedMealId(mealId);
    // In a real application, you would fetch suggestions based on mealId
    setSuggestions(mockSuggestions); // Using mock data for now
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Sugerencias de Sustitución</h3>
      {selectedMealId ? (
        <div>
          <p className="text-gray-600 mb-3">Sugerencias para la comida seleccionada (ID: {selectedMealId}):</p>
          <ul className="space-y-2">
            {suggestions.map(suggestion => (
              <li key={suggestion.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{suggestion.name}</p>
                  <p className="text-sm text-gray-500">{suggestion.calories} kcal | P: {suggestion.protein}g | C: {suggestion.carbs}g | G: {suggestion.fat}g</p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md">Sustituir</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">Selecciona una comida en el calendario para ver sugerencias.</p>
      )}
    </div>
  );
};

export default SustitucionesInteligentes;
