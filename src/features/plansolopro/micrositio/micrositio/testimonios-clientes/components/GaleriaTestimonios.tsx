import React from 'react';
import { Testimonio } from '../testimoniosClientesApi';
import { TarjetaTestimonio } from './TarjetaTestimonio';

interface GaleriaTestimoniosProps {
  testimonios: Testimonio[];
}

export const GaleriaTestimonios: React.FC<GaleriaTestimoniosProps> = ({ testimonios }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {testimonios.map(testimonio => (
        <TarjetaTestimonio key={testimonio.id} testimonio={testimonio} />
      ))}
    </div>
  );
};
