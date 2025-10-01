import React from 'react';
import { Curso } from '../cursoDetalleApi';

interface PortadaCursoProps {
  curso: Curso;
}

const PortadaCurso: React.FC<PortadaCursoProps> = ({ curso }) => {
  return (
    <div className="relative w-full h-96 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${curso.imagenPortada})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <h1 className="text-white text-4xl font-bold text-center">{curso.titulo}</h1>
      </div>
    </div>
  );
};

export default PortadaCurso;
