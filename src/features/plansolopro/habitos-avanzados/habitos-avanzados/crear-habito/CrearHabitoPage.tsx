import React from 'react';
import FormularioHabito from './components/FormularioHabito';
import SelectorFrecuencia from './components/SelectorFrecuencia';
import ConfiguracionRecordatorios from './components/ConfiguracionRecordatorios';
import VistaPrevia from './components/VistaPrevia';

const CrearHabitoPage: React.FC = () => {
  // TODO: Implement state management for habit creation form
  // TODO: Implement form submission logic and API integration

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Hábito</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormularioHabito />
          <SelectorFrecuencia />
          <ConfiguracionRecordatorios />
        </div>
        <div>
          <VistaPrevia />
        </div>
      </div>
    </div>
  );
};

export default CrearHabitoPage;
