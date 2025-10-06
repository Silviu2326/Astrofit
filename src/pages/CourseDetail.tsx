import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen, Clock, Award, Download, Play, CheckCircle,
  Lock, FileText, Video, Headphones, ArrowLeft, Share2,
  Star, Users, Calendar
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed: boolean;
  locked: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Material {
  id: string;
  title: string;
  type: string;
  size: string;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  rating: number;
  students: number;
  modules: Module[];
  materials: Material[];
  certificateAvailable: boolean;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const [expandedModules, setExpandedModules] = useState<string[]>(['1']);

  // Datos de ejemplo
  const course: Course = {
    id: id || '1',
    title: 'Desarrollo Web Full Stack con React y Node.js',
    instructor: 'María González',
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    duration: '24 horas',
    rating: 4.8,
    students: 1234,
    modules: [
      {
        id: '1',
        title: 'Fundamentos de React',
        lessons: [
          { id: '1-1', title: 'Introducción a React', duration: '15:30', type: 'video', completed: true, locked: false },
          { id: '1-2', title: 'Componentes y Props', duration: '20:45', type: 'video', completed: true, locked: false },
          { id: '1-3', title: 'Estado y Ciclo de Vida', duration: '25:15', type: 'video', completed: true, locked: false },
          { id: '1-4', title: 'Quiz: Fundamentos', duration: '10:00', type: 'quiz', completed: false, locked: false },
        ]
      },
      {
        id: '2',
        title: 'Hooks Avanzados',
        lessons: [
          { id: '2-1', title: 'useState y useEffect', duration: '18:30', type: 'video', completed: true, locked: false },
          { id: '2-2', title: 'useContext y useReducer', duration: '22:00', type: 'video', completed: true, locked: false },
          { id: '2-3', title: 'Custom Hooks', duration: '16:45', type: 'reading', completed: false, locked: false },
          { id: '2-4', title: 'Práctica: Creando Hooks', duration: '30:00', type: 'video', completed: false, locked: false },
        ]
      },
      {
        id: '3',
        title: 'Backend con Node.js',
        lessons: [
          { id: '3-1', title: 'Introducción a Node.js', duration: '20:00', type: 'video', completed: false, locked: false },
          { id: '3-2', title: 'Express.js Framework', duration: '25:30', type: 'video', completed: false, locked: false },
          { id: '3-3', title: 'APIs RESTful', duration: '28:15', type: 'video', completed: false, locked: true },
          { id: '3-4', title: 'Autenticación JWT', duration: '22:45', type: 'video', completed: false, locked: true },
        ]
      },
      {
        id: '4',
        title: 'Proyecto Final',
        lessons: [
          { id: '4-1', title: 'Planificación del Proyecto', duration: '15:00', type: 'reading', completed: false, locked: true },
          { id: '4-2', title: 'Desarrollo Frontend', duration: '45:00', type: 'video', completed: false, locked: true },
          { id: '4-3', title: 'Desarrollo Backend', duration: '45:00', type: 'video', completed: false, locked: true },
          { id: '4-4', title: 'Despliegue', duration: '20:00', type: 'video', completed: false, locked: true },
        ]
      }
    ],
    materials: [
      { id: '1', title: 'Guía de React.pdf', type: 'PDF', size: '2.5 MB' },
      { id: '2', title: 'Código Fuente - Módulo 1', type: 'ZIP', size: '1.2 MB' },
      { id: '3', title: 'Cheat Sheet de Hooks', type: 'PDF', size: '850 KB' },
      { id: '4', title: 'Plantilla de Proyecto', type: 'ZIP', size: '3.1 MB' },
    ],
    certificateAvailable: false
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'reading':
        return <FileText className="w-4 h-4" />;
      case 'quiz':
        return <Headphones className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a mis cursos
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.students.toLocaleString()} estudiantes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-white text-sm">
                <span>Progreso del curso</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-white/80 text-sm">
                <span>{course.completedLessons} de {course.totalLessons} lecciones completadas</span>
                {course.certificateAvailable && (
                  <span className="flex items-center gap-1 text-yellow-300">
                    <Award className="w-4 h-4" />
                    Certificado disponible
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Modules */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Contenido del Curso</h2>

              <div className="space-y-3">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                          {moduleIndex + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-white">{module.title}</h3>
                          <p className="text-sm text-white/70">{module.lessons.length} lecciones</p>
                        </div>
                      </div>
                      <div className={`transform transition-transform ${expandedModules.includes(module.id) ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {expandedModules.includes(module.id) && (
                      <div className="px-6 pb-4 space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                              lesson.locked
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/5 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : lesson.locked ? (
                                <Lock className="w-5 h-5 text-white/50" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                              )}

                              <div className="flex items-center gap-2 text-white/70">
                                {getLessonIcon(lesson.type)}
                              </div>

                              <div className="flex-1">
                                <p className={`font-medium ${lesson.completed ? 'text-white/80' : 'text-white'}`}>
                                  {lessonIndex + 1}. {lesson.title}
                                </p>
                              </div>

                              <span className="text-sm text-white/60">{lesson.duration}</span>

                              {!lesson.locked && !lesson.completed && (
                                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                  <Play className="w-4 h-4 text-white" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certificate Section */}
            {course.progress === 100 ? (
              <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  ¡Felicitaciones!
                </h3>
                <p className="text-white/90 text-center mb-4">
                  Has completado el curso. Descarga tu certificado.
                </p>
                <button className="w-full bg-white text-orange-600 font-semibold py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Descargar Certificado
                </button>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-16 h-16 text-white/50" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  Certificado de Finalización
                </h3>
                <p className="text-white/70 text-center mb-4">
                  Completa el {100 - course.progress}% restante para obtener tu certificado
                </p>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Materials */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Materiales del Curso
              </h3>
              <div className="space-y-3">
                {course.materials.map(material => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{material.title}</p>
                        <p className="text-xs text-white/60">{material.type} • {material.size}</p>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Tiempo dedicado</span>
                  <span className="text-white font-semibold">12.5 horas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Racha actual</span>
                  <span className="text-white font-semibold">7 días</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Última actividad</span>
                  <span className="text-white font-semibold">Hoy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Quizzes aprobados</span>
                  <span className="text-white font-semibold">8/12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
