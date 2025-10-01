import React from 'react';

interface Curso {
  id: string;
  titulo: string;
  alumnos: number;
  estado: 'borrador' | 'activo' | 'pausado';
  precio: number;
  duracion: string;
  inscritosActuales: number;
  portadaUrl: string;
  categoria: string;
}

interface TarjetaCursoProps {
  curso: Curso;
}

const TarjetaCurso: React.FC<TarjetaCursoProps> = ({ curso }) => {
  const getEstadoClasses = (estado: Curso['estado']) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'pausado':
        return 'bg-yellow-100 text-yellow-800';
      case 'borrador':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={curso.portadaUrl} alt={curso.titulo} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate">{curso.titulo}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Alumnos: {curso.alumnos}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoClasses(curso.estado)}`}>
            {curso.estado.charAt(0).toUpperCase() + curso.estado.slice(1)}
          </span>
        </div>
        <p className="text-gray-700 mb-2">Precio: ${curso.precio.toFixed(2)}</p>
        <p className="text-gray-700 mb-2">Duración: {curso.duracion}</p>
        <p className="text-gray-700 mb-4">Inscritos actuales: {curso.inscritosActuales}</p>
        <div className="flex justify-end space-x-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">Ver</button>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">Editar</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaCurso;
