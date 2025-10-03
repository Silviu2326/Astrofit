import React, { useEffect, useState } from 'react';
import { experimentosHistoricos, Experimento } from '../historialExperimentosApi';

const LeccionesAprendidas: React.FC = () => {
  const [experiments, setExperiments] = useState<Experimento[]>([]);

  useEffect(() => {
    setExperiments(experimentosHistoricos);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Lecciones Aprendidas y Patrones de ??xito</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{exp.nombre}</h3>
            <div className="mt-2">
              <strong>Aprendizajes:</strong>
              <ul className="list-disc list-inside mt-1">
                {exp.aprendizajes.map((aprendizaje, idx) => (
                  <li key={idx} className="text-sm">{aprendizaje}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeccionesAprendidas;
