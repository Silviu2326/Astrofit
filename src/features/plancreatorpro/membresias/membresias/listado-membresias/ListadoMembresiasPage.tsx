import React from 'react';
import TarjetasMembresia from './components/TarjetasMembresia';
import EstadisticasMembresia from './components/EstadisticasMembresia';
import CrearMembresia from './components/CrearMembresia';
import PricingTable from './components/PricingTable';

const ListadoMembresiasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Section con Gradiente */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Gestión de Membresías
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Administra tus planes, suscripciones y ofrece la mejor experiencia a tus clientes
          </p>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 -mt-12">
          <EstadisticasMembresia />
        </div>

        {/* Tabla de Precios Principal */}
        <div className="mb-12">
          <PricingTable />
        </div>

        {/* Crear Membresía */}
        <div className="mb-8">
          <CrearMembresia />
        </div>

        {/* Tarjetas de Membresía Existentes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Membresías Activas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TarjetasMembresia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListadoMembresiasPage;
