import React, { useEffect, useState } from 'react';
import { getExperiments, Experiment } from '../historialExperimentosApi';

const ArchivoExperimentos: React.FC = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  useEffect(() => {
    const fetchExperiments = async () => {
      const data = await getExperiments();
      setExperiments(data);
    };
    fetchExperiments();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Archivo de Experimentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{exp.description}</h3>
            <p><strong>Fecha:</strong> {exp.date}</p>
            <p><strong>Ganador:</strong> {exp.winner}</p>
            <p className="mt-2"><strong>Notas:</strong> {exp.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivoExperimentos;
