import React from 'react';
import ListadoArticulos from './components/ListadoArticulos';
import BlogInterno from './components/BlogInterno';

const ContenidosArticulosPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Biblioteca de Contenidos: Artículos</h1>
      <BlogInterno />
      <ListadoArticulos />
    </div>
  );
};

export default ContenidosArticulosPage;
