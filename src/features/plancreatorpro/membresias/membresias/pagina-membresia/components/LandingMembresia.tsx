
import React from 'react';

const LandingMembresia: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Desbloquea tu Potencial con Nuestra Membresía Premium</h1>
        <p className="text-xl mb-8">Accede a contenido exclusivo, herramientas avanzadas y una comunidad de expertos.</p>
        <button className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300">
          ¡Únete Ahora!
        </button>
      </div>
    </section>
  );
};

export default LandingMembresia;
