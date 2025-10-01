import React from 'react';
import BuscadorCentralizado from './components/BuscadorCentralizado';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import ResultadosOrganizados from './components/ResultadosOrganizados';

const BuscadorContenidosPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Buscador de Contenidos</h1>
      <div className="mb-8">
        <BuscadorCentralizado />
      </div>
      <div className="mb-8">
        <FiltrosAvanzados />
      </div>
      <div>
        <ResultadosOrganizados />
      </div>
    </div>
  );
};

export default BuscadorContenidosPage;
