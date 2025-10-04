import React from 'react';
import { Curso } from '../../curso-detalle/cursoDetalleApi';

interface IndiceTemarioProps {
  modulos: Curso['modulos'];
}

const IndiceTemario: React.FC<IndiceTemarioProps> = ({ modulos }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Índice del Temario</h2>
      <nav>
        <ul>
          {modulos.map((modulo) => (
            <li key={modulo.id} className="mb-2">
              <h3 className="font-semibold text-lg">{modulo.titulo}</h3>
              <ul className="ml-4">
                {modulo.lecciones.map((leccion) => (
                  <li key={leccion.id} className="text-gray-700">
                    - {leccion.titulo}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default IndiceTemario;
