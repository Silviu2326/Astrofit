import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp, ArrowLeft, Star, Play, Download, Share2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import IndiceTemario from './components/IndiceTemario';
import ListaAlumnos from './components/ListaAlumnos';
import ProgresoMedio from './components/ProgresoMedio';
import PestanasInfo from './components/PestanasInfo';

const CursoDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [curso, setCurso] = useState<any>(null);

  // Mock data for demonstration - this would come from an API call
  const mockCurso = {
    id: '1',
    titulo: 'Master en React: Aprender ReactJS, Hooks, MERN, NodeJS, JWT+',
    descripcion: 'Aprende React desde cero hasta convertirte en un experto. Cubre Hooks, MERN stack, NodeJS, JWT y mucho más.',
    imagenPortada: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMxNzhDODtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6Izg0N0VGRjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNBMzU2RkY7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1hc3RlciBlbiBSZWFjdDwvdGV4dD48L3N2Zz4=',
    modulos: [
      { id: 'm1', titulo: 'Introducción a React', lecciones: [{ id: 'l1', titulo: '¿Qué es React?' }, { id: 'l2', titulo: 'Configuración del entorno' }] },
      { id: 'm2', titulo: 'Hooks en React', lecciones: [{ id: 'l3', titulo: 'useState' }, { id: 'l4', titulo: 'useEffect' }] },
    ],
    alumnos: [
      { id: 'a1', nombre: 'Juan Pérez', avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiM2MzY2RjEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SlA8L3RleHQ+PC9zdmc+' },
      { id: 'a2', nombre: 'María García', avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNFQzQ4OTciLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TUc8L3RleHQ+PC9zdmc+' },
    ],
    progresoMedio: 75,
  };

  // Load course data based on ID
  useEffect(() => {
    const loadCurso = async () => {
      setIsLoading(true);
      try {
        // Simulate API call - in real app, this would fetch from API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (id) {
          // In a real app, you would fetch the course by ID
          // const cursoData = await getCursoById(id);
          setCurso(mockCurso);
        } else {
          setCurso(mockCurso);
        }
      } catch (error) {
        toast.error('Error al cargar el curso');
        console.error('Error loading course:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurso();
  }, [id]);

  // Handler functions
  const handleBackToCourses = () => {
    navigate('/listado-cursos');
  };

  const handleViewCourse = async () => {
    setIsLoading(true);
    toast.loading('Cargando el curso...');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('¡Curso cargado exitosamente!');
      // In a real app, this would open the course player or navigate to it
    } catch (error) {
      toast.error('Error al cargar el curso');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareCourse = () => {
    if (navigator.share) {
      navigator.share({
        title: curso.titulo,
        text: curso.descripcion,
        url: window.location.href,
      }).then(() => {
        toast.success('Curso compartido exitosamente');
      }).catch(() => {
        toast.error('Error al compartir el curso');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Enlace copiado al portapapeles');
      }).catch(() => {
        toast.error('Error al copiar el enlace');
      });
    }
  };

  const handleDownloadMaterials = () => {
    toast.loading('Preparando materiales para descarga...');
    setTimeout(() => {
      toast.success('Materiales listos para descarga');
    }, 1500);
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Curso no encontrado</h2>
          <p className="text-gray-600 mb-4">El curso que buscas no existe o ha sido eliminado.</p>
          <button
            onClick={handleBackToCourses}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Volver a Cursos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      <div className="container mx-auto p-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
            {/* Navegación */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToCourses}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Volver a Cursos</span>
            </motion.button>

            {/* Título con icono animado */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <BookOpen className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {curso.titulo}
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-lg md:text-xl text-blue-100 max-w-4xl leading-relaxed mb-6">
              {curso.descripcion}
            </p>

            {/* Estadísticas del curso */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Users className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">{curso.alumnos.length} Alumnos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <BookOpen className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">{curso.modulos.length} Módulos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">{curso.progresoMedio}% Progreso</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">4.8/5 Rating</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewCourse}
                disabled={isLoading}
                className="relative overflow-hidden bg-white/20 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white border border-white/30 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                  <span className="font-semibold">{isLoading ? 'Cargando...' : 'Ver Curso'}</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareCourse}
                className="relative overflow-hidden bg-white/10 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white border border-white/20 group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Compartir</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadMaterials}
                className="relative overflow-hidden bg-white/10 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white border border-white/20 group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Materiales</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenido principal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10 p-8">
                <PestanasInfo curso={curso} />
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:w-1/3 space-y-6"
          >
            {/* Índice del temario */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10 p-6">
                <IndiceTemario modulos={curso.modulos} />
              </div>
            </div>

            {/* Lista de alumnos */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10 p-6">
                <ListaAlumnos alumnos={curso.alumnos} />
              </div>
            </div>

            {/* Progreso medio */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10 p-6">
                <ProgresoMedio progreso={curso.progresoMedio} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CursoDetallePage;
