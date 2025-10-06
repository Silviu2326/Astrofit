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

interface EstadisticasCursosProps {
  cursos: Curso[];
}

const EstadisticasCursos: React.FC<EstadisticasCursosProps> = ({ cursos }) => {
  const totalCursos = cursos.length;
  const cursosActivos = cursos.filter(curso => curso.estado === 'activo').length;
  const totalAlumnos = cursos.reduce((sum, curso) => sum + curso.alumnos, 0);
  const totalInscritosActuales = cursos.reduce((sum, curso) => sum + curso.inscritosActuales, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-2xl font-bold mb-4">Estadísticas Generales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-700">Total de Cursos</p>
          <p className="text-2xl font-semibold text-blue-900">{totalCursos}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-md">
          <p className="text-sm text-green-700">Cursos Activos</p>
          <p className="text-2xl font-semibold text-green-900">{cursosActivos}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <p className="text-sm text-purple-700">Total Alumnos Registrados</p>
          <p className="text-2xl font-semibold text-purple-900">{totalAlumnos}</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-md">
          <p className="text-sm text-orange-700">Inscritos Actuales</p>
          <p className="text-2xl font-semibold text-orange-900">{totalInscritosActuales}</p>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasCursos;
