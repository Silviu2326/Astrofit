
import React from 'react';
import LandingMembresia from './components/LandingMembresia';
import ListaBeneficios from './components/ListaBeneficios';
import PrecioSuscripcion from './components/PrecioSuscripcion';
import BotonUnirse from './components/BotonUnirse';
import TestimoniosMiembros from './components/TestimoniosMiembros';
import FAQMemebresia from './components/FAQMemebresia';

const PaginaMembresiaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <LandingMembresia />
      <ListaBeneficios />
      <PrecioSuscripcion />
      <TestimoniosMiembros />
      <FAQMemebresia />
      <BotonUnirse />
    </div>
  );
};

export default PaginaMembresiaPage;
