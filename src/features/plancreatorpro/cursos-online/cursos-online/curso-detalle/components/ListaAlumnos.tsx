import React from 'react';
import { Curso } from '../../curso-detalle/cursoDetalleApi';

interface ListaAlumnosProps {
  alumnos: Curso['alumnos'];
}

const ListaAlumnos: React.FC<ListaAlumnosProps> = ({ alumnos }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Alumnos Inscritos</h2>
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.id} className="flex items-center mb-2">
            <img src={alumno.avatar} alt={alumno.nombre} className="w-10 h-10 rounded-full mr-3" />
            <span className="text-gray-800">{alumno.nombre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaAlumnos;
