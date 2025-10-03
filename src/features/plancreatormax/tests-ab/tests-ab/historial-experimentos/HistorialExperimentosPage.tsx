import React from 'react';
import ArchivoExperimentos from './components/ArchivoExperimentos';
import BuscadorTests from './components/BuscadorTests';
import LeccionesAprendidas from './components/LeccionesAprendidas';

const HistorialExperimentosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Experimentos A/B</h1>
      <BuscadorTests />
      <ArchivoExperimentos />
      <LeccionesAprendidas />
    </div>
  );
};

export default HistorialExperimentosPage;
