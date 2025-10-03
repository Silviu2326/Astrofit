import React from 'react';
import { Articulo } from '../blogNoticiasApi';
import { Link } from 'react-router-dom';

interface TarjetaArticuloProps {
  articulo: Articulo;
}

const TarjetaArticulo: React.FC<TarjetaArticuloProps> = ({ articulo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={articulo.imagen} alt={articulo.titulo} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{articulo.titulo}</h2>
        <p className="text-gray-600 text-sm mb-2">{articulo.fechaPublicacion}</p>
        <p className="text-gray-700 mb-4">{articulo.extracto}</p>
        <Link to={`/articulo/${articulo.id}`} className="text-blue-500 hover:underline">
          Leer más
        </Link>
      </div>
    </div>
  );
};

export default TarjetaArticulo;
