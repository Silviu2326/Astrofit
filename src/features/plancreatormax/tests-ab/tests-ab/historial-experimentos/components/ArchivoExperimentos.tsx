import React, { useEffect, useState } from 'react';
import { experimentosHistoricos, Experimento } from '../historialExperimentosApi';

const ArchivoExperimentos: React.FC = () => {
  const [experiments, setExperiments] = useState<Experimento[]>([]);

  useEffect(() => {
    setExperiments(experimentosHistoricos);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Archivo de Experimentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{exp.nombre}</h3>
            <p><strong>Tipo:</strong> {exp.tipo}</p>
            <p><strong>Fecha:</strong> {exp.fechaInicio} - {exp.fechaFin}</p>
            <p><strong>Ganador:</strong> {exp.ganadora}</p>
            <p><strong>Mejora:</strong> {exp.mejora}%</p>
            <p className="mt-2"><strong>Estado:</strong> {exp.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivoExperimentos;
