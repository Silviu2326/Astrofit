import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, 
  BookOpen, 
  Users, 
  BarChart3, 
  Download, 
  Share2, 
  Star, 
  Clock, 
  Award,
  TrendingUp,
  MessageCircle,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Curso } from '../../curso-detalle/cursoDetalleApi';

interface PestanasInfoProps {
  curso: Curso;
}

const PestanasInfo: React.FC<PestanasInfoProps> = ({ curso }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'Información', icon: Info },
    { id: 'temario', label: 'Temario', icon: BookOpen },
    { id: 'alumnos', label: 'Alumnos', icon: Users },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    toast.success(`Cambiando a ${tabs.find(t => t.id === tabId)?.label}`);
  };

  const handleDownloadSyllabus = () => {
    toast.loading('Preparando temario para descarga...');
    setTimeout(() => {
      toast.success('Temario descargado exitosamente');
    }, 2000);
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
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Enlace copiado al portapapeles');
      }).catch(() => {
        toast.error('Error al copiar el enlace');
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
          <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Descripción del Curso</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{curso.descripcion}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Duración</h4>
                </div>
                <p className="text-blue-700">40 horas de contenido</p>
                <p className="text-sm text-blue-600">8 semanas de estudio</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-800">Certificación</h4>
                </div>
                <p className="text-emerald-700">Certificado de finalización</p>
                <p className="text-sm text-emerald-600">Válido internacionalmente</p>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadSyllabus}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Temario</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareCourse}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </motion.button>
          </div>
          </motion.div>
        );
        
      case 'temario':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Temario Completo</h3>
              <div className="text-sm text-gray-500">
                {curso.modulos.length} módulos • {curso.modulos.reduce((acc, mod) => acc + mod.lecciones.length, 0)} lecciones
              </div>
            </div>
            
            <div className="space-y-4">
              {curso.modulos.map((modulo, index) => (
                <motion.div
                  key={modulo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">{modulo.titulo}</h4>
                    <div className="ml-auto text-sm text-gray-500">
                      {modulo.lecciones.length} lecciones
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {modulo.lecciones.map((leccion, lessonIndex) => (
                      <div
                        key={leccion.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors duration-200"
                      >
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                          {lessonIndex + 1}
                        </div>
                        <span className="text-gray-700">{leccion.titulo}</span>
                        <Clock className="w-4 h-4 text-gray-400 ml-auto" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
          </motion.div>
        );
        
      case 'alumnos':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Alumnos Inscritos</h3>
              <div className="text-sm text-gray-500">
                {curso.alumnos.length} estudiantes activos
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curso.alumnos.map((alumno, index) => (
                <motion.div
                  key={alumno.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={alumno.avatar} 
                      alt={alumno.nombre} 
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md" 
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">{alumno.nombre}</h4>
                      <p className="text-gray-600">Estudiante activo</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                            style={{ width: `${Math.floor(Math.random() * 100) + 1}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 100) + 1}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          toast.success(`Abriendo chat con ${alumno.nombre}`);
                          navigate(`/mensajeria?chat=${alumno.id}`);
                        }}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toast.success(`Enviando email a ${alumno.nombre}`)}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
          </motion.div>
        );
        
      case 'estadisticas':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">Estadísticas del Curso</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Progreso Medio</h4>
                </div>
                <div className="text-3xl font-bold text-blue-900">{curso.progresoMedio}%</div>
                <p className="text-sm text-blue-600">de finalización</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-800">Total Alumnos</h4>
                </div>
                <div className="text-3xl font-bold text-emerald-900">{curso.alumnos.length}</div>
                <p className="text-sm text-emerald-600">estudiantes inscritos</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-800">Rating</h4>
                </div>
                <div className="text-3xl font-bold text-yellow-900">4.8</div>
                <p className="text-sm text-yellow-600">de 5 estrellas</p>
              </motion.div>
            </div>

            <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Métricas Adicionales</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">95%</div>
                  <div className="text-sm text-gray-600">Satisfacción</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">2.5h</div>
                  <div className="text-sm text-gray-600">Tiempo promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">87%</div>
                  <div className="text-sm text-gray-600">Retención</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">24</div>
                  <div className="text-sm text-gray-600">Lecciones</div>
                </div>
              </div>
          </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <nav className="flex" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-8">
        <AnimatePresence mode="wait">
        {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PestanasInfo;
