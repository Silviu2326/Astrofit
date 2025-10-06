
import React, { useEffect, useState } from 'react';
import { fetchPriceSuggestions, PriceSuggestion } from '../agenteFinancieroApi';

const SugerenciasPrecios: React.FC = () => {
  const [suggestions, setSuggestions] = useState<PriceSuggestion[]>([]);

  useEffect(() => {
    fetchPriceSuggestions().then(setSuggestions);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sugerencias de Precios</h2>
      <div className="space-y-3">
        {suggestions.length === 0 ? (
          <p className="text-gray-600">No hay sugerencias de precios en este momento.</p>
        ) : (
          suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-3 border border-gray-200 rounded-md">
              <p className="font-medium text-gray-700">{suggestion.service}</p>
              <p className="text-sm text-gray-500">Precio Actual: {suggestion.currentPrice} €</p>
              <p className="text-sm text-gray-500">Precio Recomendado: <span className="font-medium text-blue-600">{suggestion.recommendedPrice} €</span></p>
              <p className="text-sm text-gray-500">Razón: {suggestion.reason}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SugerenciasPrecios;
