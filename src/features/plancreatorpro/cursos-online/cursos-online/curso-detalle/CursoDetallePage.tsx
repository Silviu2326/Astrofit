import React from 'react';
import PortadaCurso from './components/PortadaCurso';
import IndiceTemario from './components/IndiceTemario';
import ListaAlumnos from './components/ListaAlumnos';
import ProgresoMedio from './components/ProgresoMedio';
import PestanasInfo from './components/PestanasInfo';

const CursoDetallePage: React.FC = () => {
  // Mock data for demonstration
  const curso = {
    id: '1',
    titulo: 'Master en React: Aprender ReactJS, Hooks, MERN, NodeJS, JWT+',
    descripcion: 'Aprende React desde cero hasta convertirte en un experto. Cubre Hooks, MERN stack, NodeJS, JWT y mucho más.',
    imagenPortada: 'https://via.placeholder.com/1200x400',
    modulos: [
      { id: 'm1', titulo: 'Introducción a React', lecciones: [{ id: 'l1', titulo: '¿Qué es React?' }, { id: 'l2', titulo: 'Configuración del entorno' }] },
      { id: 'm2', titulo: 'Hooks en React', lecciones: [{ id: 'l3', titulo: 'useState' }, { id: 'l4', titulo: 'useEffect' }] },
    ],
    alumnos: [
      { id: 'a1', nombre: 'Juan Pérez', avatar: 'https://via.placeholder.com/50' },
      { id: 'a2', nombre: 'María García', avatar: 'https://via.placeholder.com/50' },
    ],
    progresoMedio: 75,
  };

  return (
    <div className="container mx-auto p-4">
      <PortadaCurso curso={curso} />
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-2/3">
          <PestanasInfo curso={curso} />
        </div>
        <div className="lg:w-1/3">
          <IndiceTemario modulos={curso.modulos} />
          <ListaAlumnos alumnos={curso.alumnos} />
          <ProgresoMedio progreso={curso.progresoMedio} />
        </div>
      </div>
    </div>
  );
};

export default CursoDetallePage;
