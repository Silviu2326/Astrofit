import React from 'react';
import CreadorRetos from './components/CreadorRetos';
import ListadoParticipantes from './components/ListadoParticipantes';
import TablaClasificacion from './components/TablaClasificacion';
import InsigniasLogros from './components/InsigniasLogros';

const RetosHabitosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Retos de Hábitos Avanzados</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Crear Nuevo Reto</h2>
        <CreadorRetos />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Participantes del Reto Actual</h2>
        <ListadoParticipantes />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tabla de Clasificación</h2>
        <TablaClasificacion />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mis Insignias y Logros</h2>
        <InsigniasLogros />
      </section>
    </div>
  );
};

export default RetosHabitosPage;
