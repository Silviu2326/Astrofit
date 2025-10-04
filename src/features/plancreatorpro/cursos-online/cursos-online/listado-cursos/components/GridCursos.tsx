import React from 'react';
import TarjetaCurso from './TarjetaCurso';

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

interface GridCursosProps {
  cursos: Curso[];
}

const GridCursos: React.FC<GridCursosProps> = ({ cursos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cursos.map((curso) => (
        <TarjetaCurso key={curso.id} curso={curso} />
      ))}
    </div>
  );
};

export default GridCursos;
