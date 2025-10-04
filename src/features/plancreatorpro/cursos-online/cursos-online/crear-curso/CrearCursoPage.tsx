
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import WizardCurso from './components/WizardCurso';
import Modal from '../../../../../components/ui/modal';

const CrearCursoPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [cursoData, setCursoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [finalCursoData, setFinalCursoData] = useState<any>(null);

  // Check if we're in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadCursoData(id);
    }
  }, [id]);

  const loadCursoData = async (cursoId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - in real app, this would fetch from API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real app, this would come from API
      const mockData = {
        id: cursoId,
        titulo: 'Curso de React',
        descripcion: 'Aprende React desde cero',
        precio: 99.99,
        categoria: 'Desarrollo Web',
        // ... other course data
      };
      
      setCursoData(mockData);
      toast.success('Datos del curso cargados');
    } catch (error) {
      toast.error('Error al cargar los datos del curso');
      console.error('Error loading course data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCursos = () => {
    navigate('/listado-cursos');
  };

  const handleShowConfirmModal = (cursoData: any) => {
    setFinalCursoData(cursoData);
    setShowConfirmModal(true);
  };

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    setShowConfirmModal(false);
    
    try {
      // Simular la publicación del curso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Curso finalizado y listo para publicar:', finalCursoData);
      toast.success('¡Curso creado y publicado exitosamente!', {
        duration: 5000,
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
      
      // Redirigir después de publicar
      setTimeout(() => {
        navigate('/listado-cursos');
      }, 2000);
    } catch (error) {
      toast.error('Error al publicar el curso. Inténtalo de nuevo.', {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
    } finally {
      setIsPublishing(false);
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
          className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              onClick={handleBackToCursos}
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
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                {isEditMode ? 'Editar' : 'Crear'} <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Curso</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl leading-relaxed">
              {isEditMode 
                ? `Modifica tu curso "${cursoData?.titulo || ''}" con ` 
                : 'Crea un curso profesional con '
              }
              <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">herramientas avanzadas</span> y contenido interactivo
            </p>

            {/* Indicadores pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">Editor Avanzado</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <BookOpen className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">Múltiples Formatos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">Analytics Integrados</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wizard de Creación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-8">
            <WizardCurso 
              isEditMode={isEditMode}
              cursoData={cursoData}
              isLoading={isLoading}
              onShowConfirmModal={handleShowConfirmModal}
              isPublishing={isPublishing}
            />
          </div>
        </motion.div>
      </div>

      {/* Modal de confirmación renderizado en la página padre */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Publicación"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">¿Estás seguro?</h3>
              <p className="text-sm text-yellow-700">
                Una vez publicado, el curso estará disponible para los estudiantes.
              </p>
            </div>
          </div>
          
          {finalCursoData && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Resumen del curso:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Título:</strong> {finalCursoData.titulo || 'Sin título'}</li>
                <li><strong>Precio:</strong> {finalCursoData.precio ? `${finalCursoData.precio}€` : 'Gratis'}</li>
                <li><strong>Módulos:</strong> {finalCursoData.modulos?.length || 0}</li>
                <li><strong>Estado:</strong> {finalCursoData.esPublico ? 'Público' : 'Privado'}</li>
              </ul>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              disabled={isPublishing}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmPublish}
              disabled={isPublishing}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Confirmar Publicación
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CrearCursoPage;
