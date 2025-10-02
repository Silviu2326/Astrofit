import React, { useState } from 'react';
import { Plus, BookOpen, TrendingUp, Award, Search, Filter } from 'lucide-react';
import { QuizBuilder } from '../components/QuizBuilder';
import { QuizTaker } from '../components/QuizTaker';
import { QuizResults } from '../components/QuizResults';
import { QuizCard } from '../components/QuizCard';
import { Quiz, QuizSubmission } from '../types';

type View = 'list' | 'builder' | 'taking' | 'results';

export function QuizzesPage() {
  const [view, setView] = useState<View>('list');
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 'quiz-1',
      title: 'Introducción al Marketing Digital',
      description: 'Evalúa tus conocimientos básicos sobre marketing digital y estrategias online',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: '¿Qué es el SEO?',
          points: 2,
          options: [
            'Search Engine Optimization',
            'Social Engine Optimization',
            'Search Email Optimization',
            'Social Email Optimization'
          ],
          correctAnswer: 0,
          explanation: 'SEO significa Search Engine Optimization, la optimización para motores de búsqueda.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'El marketing de contenidos es una estrategia a largo plazo',
          points: 1,
          options: ['Verdadero', 'Falso'],
          correctAnswer: 0,
          explanation: 'El marketing de contenidos requiere tiempo para generar resultados consistentes.'
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: '¿Cuál de estas NO es una red social profesional?',
          points: 2,
          options: ['LinkedIn', 'Instagram', 'Xing', 'AngelList'],
          correctAnswer: 1,
        },
        {
          id: 'q4',
          type: 'open-ended',
          question: 'Describe brevemente qué es el funnel de conversión',
          points: 3,
        }
      ],
      totalPoints: 8,
      timeLimit: 15,
      passingScore: 70,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'quiz-2',
      title: 'Fundamentos de Google Ads',
      description: 'Prueba tus conocimientos sobre publicidad en Google Ads y PPC',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: '¿Qué significa CPC?',
          points: 1,
          options: [
            'Cost Per Click',
            'Cost Per Customer',
            'Click Per Cost',
            'Customer Per Click'
          ],
          correctAnswer: 0,
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'El Quality Score afecta el costo de los anuncios',
          points: 1,
          options: ['Verdadero', 'Falso'],
          correctAnswer: 0,
        }
      ],
      totalPoints: 2,
      timeLimit: 10,
      passingScore: 75,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    }
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<QuizSubmission | null>(null);
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  const handleSaveQuiz = (quiz: Quiz) => {
    const exists = quizzes.find(q => q.id === quiz.id);
    if (exists) {
      setQuizzes(quizzes.map(q => q.id === quiz.id ? quiz : q));
    } else {
      setQuizzes([...quizzes, quiz]);
    }
    setView('list');
    setSelectedQuiz(null);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setView('taking');
  };

  const handleSubmitQuiz = (submission: QuizSubmission) => {
    setSubmissions([...submissions, submission]);
    setCurrentSubmission(submission);
    setView('results');
  };

  const handleRetakeQuiz = () => {
    setView('taking');
    setCurrentSubmission(null);
  };

  const handleDeleteQuiz = (quizId: string) => {
    if (confirm('¿Estás seguro de eliminar este quiz?')) {
      setQuizzes(quizzes.filter(q => q.id !== quizId));
    }
  };

  const getQuizStats = (quizId: string) => {
    const quizSubmissions = submissions.filter(s => s.quizId === quizId);
    if (quizSubmissions.length === 0) return null;

    const lastSubmission = quizSubmissions[quizSubmissions.length - 1];
    return {
      lastScore: lastSubmission.percentage,
      isPassed: lastSubmission.passed,
    };
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;

    const stats = getQuizStats(quiz.id);
    if (filterStatus === 'completed') return matchesSearch && stats !== null;
    if (filterStatus === 'pending') return matchesSearch && stats === null;

    return matchesSearch;
  });

  const totalQuizzes = quizzes.length;
  const completedQuizzes = quizzes.filter(q => getQuizStats(q.id) !== null).length;
  const passedQuizzes = quizzes.filter(q => {
    const stats = getQuizStats(q.id);
    return stats?.isPassed;
  }).length;
  const averageScore = submissions.length > 0
    ? submissions.reduce((sum, s) => sum + s.percentage, 0) / submissions.length
    : 0;

  if (view === 'builder') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => {
              setView('list');
              setSelectedQuiz(null);
            }}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            ← Volver a Quizzes
          </button>
          <QuizBuilder
            onSave={handleSaveQuiz}
            initialQuiz={selectedQuiz || undefined}
          />
        </div>
      </div>
    );
  }

  if (view === 'taking' && selectedQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="px-4">
          <QuizTaker
            quiz={selectedQuiz}
            onSubmit={handleSubmitQuiz}
          />
        </div>
      </div>
    );
  }

  if (view === 'results' && selectedQuiz && currentSubmission) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="px-4">
          <QuizResults
            quiz={selectedQuiz}
            submission={currentSubmission}
            onRetake={handleRetakeQuiz}
            onClose={() => {
              setView('list');
              setSelectedQuiz(null);
              setCurrentSubmission(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Quizzes y Evaluaciones</h1>
              <p className="text-blue-100">Evalúa tus conocimientos y mejora tu aprendizaje</p>
            </div>
            <button
              onClick={() => setView('builder')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Crear Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Quizzes</p>
                <p className="text-3xl font-bold text-gray-900">{totalQuizzes}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completados</p>
                <p className="text-3xl font-bold text-gray-900">{completedQuizzes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Aprobados</p>
                <p className="text-3xl font-bold text-gray-900">{passedQuizzes}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Promedio</p>
                <p className="text-3xl font-bold text-gray-900">{Math.round(averageScore)}%</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar quizzes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => {
              const stats = getQuizStats(quiz.id);
              return (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={() => handleStartQuiz(quiz)}
                  onEdit={() => {
                    setSelectedQuiz(quiz);
                    setView('builder');
                  }}
                  onDelete={() => handleDeleteQuiz(quiz.id)}
                  lastScore={stats?.lastScore}
                  isPassed={stats?.isPassed}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No se encontraron quizzes' : 'No hay quizzes disponibles'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Intenta con otros términos de búsqueda'
                : 'Crea tu primer quiz para comenzar a evaluar conocimientos'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setView('builder')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Crear Primer Quiz
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
