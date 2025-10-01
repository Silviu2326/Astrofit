
// src/features/referidos/components/ProgramaRecompensas.tsx

import React, { useState, useEffect } from 'react';
import { getRewardLevels, RewardLevel } from '../referidosApi';

const ProgramaRecompensas: React.FC = () => {
  const [rewardLevels, setRewardLevels] = useState<RewardLevel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRewardLevels = async () => {
      try {
        const data = await getRewardLevels();
        setRewardLevels(data);
      } catch (err) {
        setError('Error al cargar los niveles de recompensa.');
      } finally {
        setLoading(false);
      }
    };
    fetchRewardLevels();
  }, []);

  if (loading) return <div className="text-center py-4">Cargando programa de recompensas...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Programa de Recompensas</h2>
      <p className="text-gray-600 mb-4">Cuantos más amigos refieras, mayores serán tus beneficios. ¡Alcanza nuevos niveles!</p>
      
      <div className="space-y-4">
        {rewardLevels.map((level) => (
          <div key={level.level} className="bg-purple-50 p-4 rounded-md border border-purple-200 flex items-center">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4">
              {level.level}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-purple-800">Nivel {level.level}: {level.minReferrals} Referidos Exitosos</h3>
              <p className="text-gray-700">Beneficio: {level.benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramaRecompensas;
