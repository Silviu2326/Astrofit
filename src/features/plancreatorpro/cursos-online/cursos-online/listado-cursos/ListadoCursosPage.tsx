import React, { useState } from 'react';
import GridCursos from './components/GridCursos';
import FiltrosCursos from './components/FiltrosCursos';
import EstadisticasCursos from './components/EstadisticasCursos';

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

const DUMMY_CURSOS: Curso[] = [
  {
    id: '1',
    titulo: 'Introducción a React',
    alumnos: 120,
    estado: 'activo',
    precio: 49.99,
    duracion: '10 horas',
    inscritosActuales: 85,
    portadaUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=React',
    categoria: 'Desarrollo Web',
  },
  {
    id: '2',
    titulo: 'TailwindCSS desde cero',
    alumnos: 80,
    estado: 'pausado',
    precio: 29.99,
    duracion: '6 horas',
    inscritosActuales: 50,
    portadaUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Tailwind',
    categoria: 'Diseño UI/UX',
  },
  {
    id: '3',
    titulo: 'Fundamentos de TypeScript',
    alumnos: 150,
    estado: 'activo',
    precio: 59.99,
    duracion: '12 horas',
    inscritosActuales: 110,
    portadaUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=TypeScript',
    categoria: 'Desarrollo Web',
  },
  {
    id: '4',
    titulo: 'Curso de Marketing Digital',
    alumnos: 50,
    estado: 'borrador',
    precio: 99.99,
    duracion: '20 horas',
    inscritosActuales: 20,
    portadaUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Marketing',
    categoria: 'Marketing',
  },
];

const ListadoCursosPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>(DUMMY_CURSOS);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');

  const cursosFiltrados = cursos.filter(curso => {
    const matchEstado = filtroEstado === 'todos' || curso.estado === filtroEstado;
    const matchCategoria = filtroCategoria === 'todas' || curso.categoria === filtroCategoria;
    return matchEstado && matchCategoria;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Listado de Cursos Online</h1>

      <EstadisticasCursos cursos={cursos} />

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <FiltrosCursos
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
        />
      </div>

      <GridCursos cursos={cursosFiltrados} />
    </div>
  );
};

export default ListadoCursosPage;
