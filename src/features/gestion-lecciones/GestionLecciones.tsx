import React, { useState } from 'react';
import { Plus, BookOpen, Video, FileText, CheckSquare, Download, Search, Filter } from 'lucide-react';
import { LessonList } from './components/LessonList';
import { LessonForm } from './components/LessonForm';
import { Lesson, LessonFormData, LessonType } from './types';

// Mock data - en producción vendría de una API
const mockLessons: Lesson[] = [
  {
    id: '1',
    courseId: 'course-1',
    title: 'Introducción al curso',
    description: 'Bienvenida y presentación del contenido',
    type: 'video',
    order: 0,
    duration: 15,
    content: {
      type: 'video',
      videoUrl: 'https://example.com/video1.mp4',
      thumbnailUrl: 'https://example.com/thumb1.jpg',
    },
    isPublished: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    courseId: 'course-1',
    title: 'Conceptos básicos',
    description: 'Fundamentos teóricos que debes conocer',
    type: 'texto',
    order: 1,
    duration: 20,
    content: {
      type: 'texto',
      html: '<h1>Conceptos básicos</h1><p>Contenido...</p>',
    },
    isPublished: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    courseId: 'course-1',
    title: 'Evaluación módulo 1',
    description: 'Quiz de comprobación de conocimientos',
    type: 'quiz',
    order: 2,
    duration: 10,
    content: {
      type: 'quiz',
      questions: [
        {
          id: 'q1',
          question: '¿Cuál es la respuesta correcta?',
          options: [
            { id: 'opt1', text: 'Opción A' },
            { id: 'opt2', text: 'Opción B' },
            { id: 'opt3', text: 'Opción C' },
          ],
          correctOptionId: 'opt2',
          explanation: 'La opción B es correcta porque...',
        },
      ],
      passingScore: 70,
    },
    isPublished: false,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: '4',
    courseId: 'course-1',
    title: 'Material complementario',
    description: 'PDF con recursos adicionales',
    type: 'descargable',
    order: 3,
    content: {
      type: 'descargable',
      fileUrl: 'https://example.com/material.pdf',
      fileName: 'material-complementario.pdf',
      fileSize: 2048576,
      fileType: 'application/pdf',
    },
    isPublished: true,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
];

export const GestionLecciones: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<LessonType | 'all'>('all');
  const [selectedCourse] = useState('course-1'); // En producción vendría de un selector

  const filteredLessons = lessons
    .filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || lesson.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => a.order - b.order);

  const handleCreateLesson = () => {
    setEditingLesson(undefined);
    setIsFormOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsFormOpen(true);
  };

  const handleSubmitLesson = (data: LessonFormData) => {
    if (editingLesson) {
      // Editar lección existente
      setLessons(
        lessons.map((lesson) =>
          lesson.id === editingLesson.id
            ? {
                ...lesson,
                ...data,
                updatedAt: new Date(),
              }
            : lesson
        )
      );
    } else {
      // Crear nueva lección
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        courseId: selectedCourse,
        ...data,
        order: lessons.length,
        content: data.content as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setLessons([...lessons, newLesson]);
    }
    setIsFormOpen(false);
    setEditingLesson(undefined);
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta lección?')) {
      setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
    }
  };

  const handleTogglePublish = (lessonId: string) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, isPublished: !lesson.isPublished, updatedAt: new Date() }
          : lesson
      )
    );
  };

  const handleReorderLessons = (reorderedLessons: Lesson[]) => {
    setLessons(reorderedLessons);
  };

  const stats = {
    total: lessons.length,
    published: lessons.filter((l) => l.isPublished).length,
    draft: lessons.filter((l) => !l.isPublished).length,
    byType: {
      video: lessons.filter((l) => l.type === 'video').length,
      texto: lessons.filter((l) => l.type === 'texto').length,
      quiz: lessons.filter((l) => l.type === 'quiz').length,
      descargable: lessons.filter((l) => l.type === 'descargable').length,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Gestión de Lecciones</h1>
                <p className="text-green-100 mt-1">
                  Organiza y estructura el contenido de tus cursos
                </p>
              </div>
            </div>
            <button
              onClick={handleCreateLesson}
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Lección
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-green-100">Total</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{stats.published}</div>
              <div className="text-sm text-green-100">Publicadas</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold flex items-center gap-2">
                <Video className="w-5 h-5" />
                {stats.byType.video}
              </div>
              <div className="text-sm text-green-100">Videos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {stats.byType.texto}
              </div>
              <div className="text-sm text-green-100">Textos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                {stats.byType.quiz}
              </div>
              <div className="text-sm text-green-100">Quizzes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold flex items-center gap-2">
                <Download className="w-5 h-5" />
                {stats.byType.descargable}
              </div>
              <div className="text-sm text-green-100">Archivos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar lecciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as LessonType | 'all')}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Todos los tipos</option>
                <option value="video">Videos</option>
                <option value="texto">Textos</option>
                <option value="quiz">Quizzes</option>
                <option value="descargable">Descargables</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Lecciones del Curso
              {filteredLessons.length !== lessons.length && (
                <span className="text-gray-500 font-normal ml-2">
                  ({filteredLessons.length} de {lessons.length})
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Arrastra las lecciones para reordenarlas
            </p>
          </div>

          <LessonList
            lessons={filteredLessons}
            onReorder={handleReorderLessons}
            onEdit={handleEditLesson}
            onDelete={handleDeleteLesson}
            onTogglePublish={handleTogglePublish}
          />
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <LessonForm
          lesson={editingLesson}
          courseId={selectedCourse}
          onSubmit={handleSubmitLesson}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingLesson(undefined);
          }}
        />
      )}
    </div>
  );
};
