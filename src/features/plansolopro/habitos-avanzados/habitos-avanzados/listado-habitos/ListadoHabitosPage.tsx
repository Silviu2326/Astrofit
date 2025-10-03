import React from 'react';
import TablaHabitos from './components/TablaHabitos';
import FiltrosCliente from './components/FiltrosCliente';

const ListadoHabitosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Hábitos Avanzados</h1>
      <FiltrosCliente />
      <TablaHabitos />
    </div>
  );
};

export default ListadoHabitosPage;
