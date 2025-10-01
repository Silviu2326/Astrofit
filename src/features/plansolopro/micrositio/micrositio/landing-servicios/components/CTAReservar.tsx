
import React from 'react';

interface CTAReservarProps {
  brandColors: { primary: string; secondary: string; accent: string };
}

const CTAReservar: React.FC<CTAReservarProps> = ({ brandColors }) => {
  return (
    <section className={`py-20 text-center ${brandColors.primary} mt-16`}>
      <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
        ¿Listo para transformar tu cuerpo y mente?
      </h2>
      <p className="text-white text-xl md:text-2xl mb-10 opacity-90">
        Reserva tu primera sesión o consulta gratuita hoy mismo.
      </p>
      <button
        onClick={() => {
          const event = new CustomEvent('app:navigate', { detail: { page: 'pagina-reserva' } });
          window.dispatchEvent(event);
        }}
        className={`${brandColors.accent} text-gray-900 font-bold py-4 px-12 rounded-full text-xl md:text-2xl uppercase tracking-wide hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-lg`}
      >
        Reservar Ahora
      </button>
    </section>
  );
};

export default CTAReservar;
