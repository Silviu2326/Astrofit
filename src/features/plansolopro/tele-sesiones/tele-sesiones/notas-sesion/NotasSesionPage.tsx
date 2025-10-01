import React from 'react';
import EditorNotas from './components/EditorNotas';
import PlantillasRapidas from './components/PlantillasRapidas';
import HistorialNotas from './components/HistorialNotas';

const NotasSesionPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notas de Sesión</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <EditorNotas />
        </div>
        <div>
          <PlantillasRapidas />
          <HistorialNotas />
        </div>
      </div>
    </div>
  );
};

export default NotasSesionPage;
