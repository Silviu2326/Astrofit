import React, { useEffect, useState } from 'react';
import { fetchExperiments, Experiment } from '../experimentosApi';
import TarjetasComparativas from './TarjetasComparativas';

const PanelExperimentos: React.FC = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  useEffect(() => {
    const getExperiments = async () => {
      const data = await fetchExperiments();
      setExperiments(data);
    };
    getExperiments();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Panel de Pruebas A/B Activas</h2>
      {experiments.length === 0 ? (
        <p className="text-gray-500">No hay experimentos activos.</p>
      ) : (
        <div className="space-y-4">
          {experiments.map((exp) => (
            <div key={exp.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-medium text-gray-800">{exp.name}</h3>
              <p className="text-sm text-gray-600">Estado: <span className={`font-semibold ${exp.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{exp.status}</span></p>
              <p className="text-sm text-gray-600">Duración: {exp.duration}</p>
              {exp.winningVariant && <p className="text-sm text-gray-600">Variante Ganadora Parcial: {exp.winningVariant}</p>}
              <TarjetasComparativas experiment={exp} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PanelExperimentos;
