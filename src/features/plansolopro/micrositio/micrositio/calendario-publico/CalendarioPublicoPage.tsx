import React from 'react';
import CalendarioVisual from './components/CalendarioVisual';
import FranjasDisponibles from './components/FranjasDisponibles';

const CalendarioPublicoPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendario Público del Entrenador</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CalendarioVisual />
        <FranjasDisponibles />
      </div>
    </div>
  );
};

export default CalendarioPublicoPage;
