import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Filter, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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
    portadaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY2MzQ3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJlYWN0PC90ZXh0Pjwvc3ZnPg==',
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
    portadaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTA5NjYzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRhaWx3aW5kPC90ZXh0Pjwvc3ZnPg==',
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
    portadaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzE3OEM4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlR5cGVTY3JpcHQ8L3RleHQ+PC9zdmc+',
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
    portadaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY5MDAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1hcmtldGluZzwvdGV4dD48L3N2Zz4=',
    categoria: 'Marketing',
  },
];

const ListadoCursosPage: React.FC = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Curso[]>(DUMMY_CURSOS);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

  const cursosFiltrados = cursos.filter(curso => {
    const matchEstado = filtroEstado === 'todos' || curso.estado === filtroEstado;
    const matchCategoria = filtroCategoria === 'todas' || curso.categoria === filtroCategoria;
    const matchBusqueda = busqueda === '' || 
      curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      curso.categoria.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchCategoria && matchBusqueda;
  });

  const handleCrearCurso = () => {
    toast.success('Redirigiendo al creador de cursos...', {
      duration: 1500,
      icon: '📚',
    });
    setTimeout(() => {
      navigate('/crear-curso');
    }, 1500);
  };

  const handleVerCurso = (cursoId: string) => {
    const curso = cursos.find(c => c.id === cursoId);
    if (curso) {
      toast.success(`Abriendo curso: ${curso.titulo}`, {
        duration: 1500,
        icon: '👁️',
      });
      setTimeout(() => {
        navigate(`/curso-detalle/${cursoId}`);
      }, 1500);
    }
  };

  const handleEditarCurso = (cursoId: string) => {
    const curso = cursos.find(c => c.id === cursoId);
    if (curso) {
      toast.success(`Editando curso: ${curso.titulo}`, {
        duration: 1500,
        icon: '✏️',
      });
      setTimeout(() => {
        navigate(`/crear-curso/${cursoId}`);
      }, 1500);
    }
  };

  const handleEliminarCurso = (cursoId: string) => {
    const curso = cursos.find(c => c.id === cursoId);
    if (curso) {
      setCursos(prevCursos => prevCursos.filter(c => c.id !== cursoId));
      toast.success(`Curso "${curso.titulo}" eliminado correctamente`, {
        duration: 3000,
        icon: '🗑️',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      <div className="container mx-auto p-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
        >
          {/* Efectos de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10">
            {/* Título con icono animado */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <BookOpen className="w-10 h-10 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Cursos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Online</span>
                </h1>
              </div>
              
              {/* Botón crear curso */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCrearCurso}
                className="relative overflow-hidden bg-white/20 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white border border-white/30 group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-2">
                  <Plus className="w-6 h-6" />
                  <span className="font-semibold">Crear Curso</span>
                </div>
              </motion.button>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
              Gestiona y crea cursos online con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">herramientas profesionales</span>
            </p>

            {/* Indicadores pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Users className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">{cursos.length} Cursos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">{cursos.reduce((acc, curso) => acc + curso.alumnos, 0)} Alumnos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <DollarSign className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">${cursos.reduce((acc, curso) => acc + curso.precio, 0).toFixed(2)} Ingresos</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <EstadisticasCursos cursos={cursos} />
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Filtros y Búsqueda</h2>
            </div>
            
            <FiltrosCursos
              filtroEstado={filtroEstado}
              setFiltroEstado={setFiltroEstado}
              filtroCategoria={filtroCategoria}
              setFiltroCategoria={setFiltroCategoria}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
            />
          </div>
        </motion.div>

        {/* Grid de Cursos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <GridCursos 
            cursos={cursosFiltrados} 
            onVerCurso={handleVerCurso}
            onEditarCurso={handleEditarCurso}
            onEliminarCurso={handleEliminarCurso}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ListadoCursosPage;
