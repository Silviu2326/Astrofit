import React from 'react';
import { Testimonio } from '../../testimoniosClientesApi';
import { TarjetaTestimonio } from './TarjetaTestimonio';

interface CarruselPrincipalProps {
  testimonios: Testimonio[];
}

export const CarruselPrincipal: React.FC<CarruselPrincipalProps> = ({ testimonios }) => {
  // En un proyecto real, aquí se integraría una librería de carrusel como react-slick o swiper.
  // Para este ejemplo, usaremos un scroll horizontal básico con TailwindCSS.
  return (
    <div className="relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 p-4 scrollbar-hide">
        {testimonios.map(testimonio => (
          <div key={testimonio.id} className="flex-shrink-0 w-80 snap-center">
            <TarjetaTestimonio testimonio={testimonio} />
          </div>
        ))}
      </div>
      {/* Aquí se podrían añadir botones de navegación o paginación para el carrusel */}
    </div>
  );
};
