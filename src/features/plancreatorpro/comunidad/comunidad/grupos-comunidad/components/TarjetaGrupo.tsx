import React from 'react';

interface TarjetaGrupoProps {
  grupo: {
    id: string;
    nombre: string;
    miembrosActivos: number;
    imagenPortada: string;
  };
}

const TarjetaGrupo: React.FC<TarjetaGrupoProps> = ({ grupo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={grupo.imagenPortada} alt={grupo.nombre} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{grupo.nombre}</h3>
        <p className="text-gray-600">Miembros activos: {grupo.miembrosActivos}</p>
        {/* TODO: Add button to view group details or join */}
      </div>
    </div>
  );
};

export default TarjetaGrupo;
