import React from 'react';
import GaleriaRecursos from './components/GaleriaRecursos';
import BannersMarketing from './components/BannersMarketing';
import EnlacesReferido from './components/EnlacesReferido';
import TextosPrehechos from './components/TextosPrehechos';
import KitMarketing from './components/KitMarketing';

const RecursosAfiliadosPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recursos para Afiliados</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Material de Marketing Listo para Compartir</h2>
        <p className="text-gray-700">
          Accede a una variedad de materiales de marketing diseñados para ayudarte a promocionar nuestros productos y servicios de manera efectiva.
        </p>
      </section>

      <GaleriaRecursos />
      <BannersMarketing />
      <EnlacesReferido />
      <TextosPrehechos />
      <KitMarketing />
    </div>
  );
};

export default RecursosAfiliadosPage;
