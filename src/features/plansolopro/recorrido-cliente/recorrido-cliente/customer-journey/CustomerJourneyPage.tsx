
import React from 'react';
import EmbudoVisual from './components/EmbudoVisual';
import TarjetasClientes from './components/TarjetasClientes';
import BarrasConversion from './components/BarrasConversion';
import AlertasEstancados from './components/AlertasEstancados';

const CustomerJourneyPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recorrido del Cliente</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EmbudoVisual />
        </div>
        <div className="lg:col-span-1">
          <AlertasEstancados />
        </div>
      </div>
      <div className="mt-6">
        <TarjetasClientes />
      </div>
      <div className="mt-6">
        <BarrasConversion />
      </div>
    </div>
  );
};

export default CustomerJourneyPage;
