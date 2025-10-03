import React, { useState, useEffect } from 'react';
import { fetchAdherenceData, AdherenceData } from '../agenteBienestarApi';

const SemaforoAdherencia: React.FC = () => {
  const [adherence, setAdherence] = useState<AdherenceData | null>(null);

  useEffect(() => {
    const getAdherenceData = async () => {
      const data = await fetchAdherenceData();
      setAdherence(data);
    };
    getAdherenceData();
  }, []);

  const getColorClass = (status: 'verde' | 'amarillo' | 'rojo') => {
    switch (status) {
      case 'verde':
        return 'bg-green-500';
      case 'amarillo':
        return 'bg-yellow-500';
      case 'rojo':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (!adherence) {
    return <div className="bg-white p-6 rounded-lg shadow-md text-center">Cargando adherencia...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Semáforo de Adherencia</h2>
      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${getColorClass(adherence.status)}`}>
        <span className="text-white text-3xl font-bold">{adherence.percentage}%</span>
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Tu nivel de adherencia es <span className={`font-bold ${adherence.status === 'verde' ? 'text-green-600' : adherence.status === 'amarillo' ? 'text-yellow-600' : 'text-red-600'}`}>{adherence.status.toUpperCase()}</span>.
      </p>
    </div>
  );
};

export default SemaforoAdherencia;
