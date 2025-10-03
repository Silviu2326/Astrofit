import React from 'react';
import TarjetasMembresia from './components/TarjetasMembresia';
import EstadisticasMembresia from './components/EstadisticasMembresia';
import CrearMembresia from './components/CrearMembresia';

const ListadoMembresiasPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Membresías</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <EstadisticasMembresia />
      </div>

      <div className="mb-8">
        <CrearMembresia />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TarjetasMembresia />
      </div>
    </div>
  );
};

export default ListadoMembresiasPage;
