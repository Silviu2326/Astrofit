import React from 'react';
import EncuestasRapidas from './components/EncuestasRapidas';
import CalculadoraNPS from './components/CalculadoraNPS';
import ComentariosUtiles from './components/ComentariosUtiles';
import TendenciasSatisfaccion from './components/TendenciasSatisfaccion';
import AccionesMejora from './components/AccionesMejora';

const EncuestasNpsPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Sistema de Satisfacción - Encuestas NPS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EncuestasRapidas />
        </div>
        <CalculadoraNPS />
        <div className="lg:col-span-3">
          <ComentariosUtiles />
        </div>
        <div className="lg:col-span-2">
          <TendenciasSatisfaccion />
        </div>
        <AccionesMejora />
      </div>
    </div>
  );
};

export default EncuestasNpsPage;