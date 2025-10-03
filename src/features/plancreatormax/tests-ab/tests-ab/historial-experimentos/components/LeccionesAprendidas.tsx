import React, { useEffect, useState } from 'react';
import { getExperiments, Experiment } from '../historialExperimentosApi';

const LeccionesAprendidas: React.FC = () => {
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
      <h2 className="text-xl font-semibold mb-3">Lecciones Aprendidas y Patrones de ??xito</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{exp.description}</h3>
            <p className="mt-2"><strong>Aprendizajes:</strong> {exp.learnings}</p>
            {/* Here we could add logic to identify and display patterns of success */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeccionesAprendidas;
