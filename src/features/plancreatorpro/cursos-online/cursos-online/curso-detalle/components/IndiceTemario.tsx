import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Play, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Curso } from '../../curso-detalle/cursoDetalleApi';

interface IndiceTemarioProps {
  modulos: Curso['modulos'];
}

const IndiceTemario: React.FC<IndiceTemarioProps> = ({ modulos }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['m1']));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['l1']));

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleLessonClick = (lessonId: string, lessonTitle: string) => {
    if (completedLessons.has(lessonId)) {
      toast.success(`Revisando: ${lessonTitle}`);
    } else {
      toast.loading(`Iniciando: ${lessonTitle}`);
      setTimeout(() => {
        setCompletedLessons(prev => new Set([...prev, lessonId]));
        toast.success(`¡Lección completada: ${lessonTitle}!`);
      }, 2000);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Play className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Índice del Temario</h2>
      </div>
      
      <nav className="space-y-3">
        {modulos.map((modulo, index) => {
          const isExpanded = expandedModules.has(modulo.id);
          const completedInModule = modulo.lecciones.filter(leccion => 
            completedLessons.has(leccion.id)
          ).length;
          const progress = (completedInModule / modulo.lecciones.length) * 100;

          return (
            <motion.div
              key={modulo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-gradient-to-r from-gray-50 to-white"
            >
              <button
                onClick={() => toggleModule(modulo.id)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-gray-900">
                      {modulo.titulo}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {completedInModule}/{modulo.lecciones.length}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {modulo.lecciones.length * 15} min
                  </span>
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100"
                >
                  <div className="p-4 space-y-2">
                    {modulo.lecciones.map((leccion, lessonIndex) => {
                      const isCompleted = completedLessons.has(leccion.id);
                      return (
                        <motion.button
                          key={leccion.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: lessonIndex * 0.05 }}
                          onClick={() => handleLessonClick(leccion.id, leccion.titulo)}
                          className={`w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group ${
                            isCompleted 
                              ? 'bg-green-50 border border-green-200 hover:bg-green-100' 
                              : 'bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-300 text-gray-600 group-hover:bg-blue-500 group-hover:text-white'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Play className="w-3 h-3 ml-0.5" />
                            )}
                          </div>
                          <span className={`font-medium ${
                            isCompleted ? 'text-green-800' : 'text-gray-700 group-hover:text-blue-800'
                          }`}>
                            {leccion.titulo}
                          </span>
                          <div className="ml-auto">
                            <Clock className="w-4 h-4 text-gray-400" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </nav>
    </div>
  );
};

export default IndiceTemario;
