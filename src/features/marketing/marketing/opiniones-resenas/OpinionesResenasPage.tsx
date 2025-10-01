import React from 'react';
import ResenasPrivadas from './components/ResenasPrivadas';
import TestimoniosPublicos from './components/TestimoniosPublicos';
import HistoriasTransformacion from './components/HistoriasTransformacion';
import ModeracionContenido from './components/ModeracionContenido';
import WidgetResenas from './components/WidgetReseñas';

const OpinionesResenasPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Opiniones y Reseñas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ResenasPrivadas />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <TestimoniosPublicos />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <HistoriasTransformacion />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ModeracionContenido />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-full">
          <WidgetResenas />
        </div>
      </div>
    </div>
  );
};

export default OpinionesResenasPage;
