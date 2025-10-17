import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Edit3, Video, FileText, Upload, FolderOpen, ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import EditorModular from './components/EditorModular';
import BloquesContenido from './components/BloquesContenido';
import SubirVideos from './components/SubirVideos';
import EditorTexto from './components/EditorTexto';
import GestorArchivos from './components/GestorArchivos';

const GestionLeccionesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToCourse = () => {
    // Verificar si hay cambios sin guardar
    const hasUnsavedChanges = localStorage.getItem('hasUnsavedChanges') === 'true';
    
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?'
      );
      if (!confirmLeave) {
        return;
      }
    }
    
    toast.success('Volviendo al curso...');
    // En una app real, esto navegaría a la página del curso específico
    navigate('/cursos-online');
  };
  const herramientas = [
    {
      id: 'editor',
      titulo: 'Editor de Contenido',
      descripcion: 'Crea y edita lecciones con herramientas avanzadas',
      icono: Edit3,
      color: 'from-blue-500 to-indigo-600',
      componente: <EditorModular />
    },
    {
      id: 'bloques',
      titulo: 'Bloques de Contenido',
      descripcion: 'Organiza contenido en bloques modulares',
      icono: BookOpen,
      color: 'from-purple-500 to-pink-600',
      componente: <BloquesContenido />
    },
    {
      id: 'videos',
      titulo: 'Subir Videos',
      descripcion: 'Gestiona contenido multimedia y videos',
      icono: Video,
      color: 'from-emerald-500 to-teal-600',
      componente: <SubirVideos />
    },
    {
      id: 'texto',
      titulo: 'Editor de Texto',
      descripcion: 'Editor de texto enriquecido con formato',
      icono: FileText,
      color: 'from-orange-500 to-red-600',
      componente: <EditorTexto />
    },
    {
      id: 'archivos',
      titulo: 'Gestor de Archivos',
      descripcion: 'Organiza y gestiona archivos del curso',
      icono: FolderOpen,
      color: 'from-cyan-500 to-blue-600',
      componente: <GestorArchivos />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      <div className="container mx-auto p-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              onClick={handleBackToCourse}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Volver al Curso</span>
            </motion.button>

            {/* Título con icono animado */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Edit3 className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Lecciones</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl leading-relaxed">
              Crea contenido interactivo con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">herramientas profesionales</span> de edición
            </p>

            {/* Indicadores pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">Editor Avanzado</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Video className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">Multimedia</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Upload className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">Drag & Drop</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid de Herramientas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {herramientas.map((herramienta, index) => (
            <motion.div
              key={herramienta.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${herramienta.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${herramienta.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <herramienta.icono className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{herramienta.titulo}</h2>
                    <p className="text-sm text-gray-600">{herramienta.descripcion}</p>
                  </div>
                </div>

                {/* Contenido */}
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                  {herramienta.componente}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota sobre funcionalidades futuras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Próximas Funcionalidades</h3>
              <p className="text-gray-600">Implementaremos orden de lecciones drag & drop y preview en tiempo real</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GestionLeccionesPage;
