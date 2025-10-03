import React, { useState, useEffect } from 'react';
import { fetchMotivationalPhrases, toggleMotivationalPhrase, MotivationalPhrase } from '../agenteBienestarApi';

const PanelMotivacional: React.FC = () => {
  const [phrases, setPhrases] = useState<MotivationalPhrase[]>([]);

  useEffect(() => {
    const getPhrases = async () => {
      const data = await fetchMotivationalPhrases();
      setPhrases(data);
    };
    getPhrases();
  }, []);

  const handleToggleActive = async (id: string) => {
    const updatedPhrases = await toggleMotivationalPhrase(id);
    setPhrases(updatedPhrases);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Panel Motivacional</h2>
      <div className="space-y-4">
        {phrases.map((phrase) => (
          <div
            key={phrase.id}
            className={`p-4 border rounded-md cursor-pointer transition-all duration-200
              ${phrase.active ? 'bg-purple-100 border-purple-400 shadow-lg' : 'bg-gray-50 border-gray-200'}`}
            onClick={() => handleToggleActive(phrase.id)}
          >
            <p className={`text-lg font-medium ${phrase.active ? 'text-purple-800' : 'text-gray-700'}`}>
              {phrase.text}
            </p>
            {phrase.active && (
              <span className="mt-2 block text-sm text-purple-600">¡Activa hoy!</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelMotivacional;
