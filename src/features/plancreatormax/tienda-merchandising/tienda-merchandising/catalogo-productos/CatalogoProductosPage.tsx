
import React from 'react';
import GridProductos from './components/GridProductos';
import GestorInventario from './components/GestorInventario';

const CatalogoProductosPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Productos</h1>
      <GestorInventario />
      <GridProductos />
    </div>
  );
};

export default CatalogoProductosPage;
