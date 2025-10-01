import React from 'react';

const PanelModerador: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Panel del Moderador</h2>
      <p>Panel de control administrativo del entrenador.</p>
      {/* Herramientas para bloquear usuarios, borrado de contenido problemático, banderas rojas */}
    </div>
  );
};

export default PanelModerador;
