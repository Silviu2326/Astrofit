import React, { useState, useEffect } from 'react';
import { fetchGamifiedChallenges, GamifiedChallenge } from '../agenteBienestarApi';

const RetosGamificados: React.FC = () => {
  const [challenges, setChallenges] = useState<GamifiedChallenge[]>([]);

  useEffect(() => {
    const getChallenges = async () => {
      const data = await fetchGamifiedChallenges();
      setChallenges(data);
    };
    getChallenges();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Retos Gamificados</h2>
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="p-4 border border-gray-200 rounded-md bg-blue-50">
            <h3 className="text-lg font-medium text-blue-800">{challenge.title}</h3>
            <p className="text-gray-600 mt-1">Progreso: {challenge.progress}</p>
            {challenge.completed ? (
              <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">Completado</span>
            ) : (
              <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded-full">En progreso</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetosGamificados;
