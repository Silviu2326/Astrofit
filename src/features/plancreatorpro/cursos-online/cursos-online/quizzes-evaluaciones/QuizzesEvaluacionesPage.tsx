import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  HelpCircle, 
  Plus, 
  BarChart3, 
  Users, 
  Clock, 
  ArrowLeft,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Copy,
  Download,
  Calendar
} from 'lucide-react';
import Modal from '../../../../../components/ui/modal';
import QuizForm from './components/QuizForm';
import { quizzesEvaluacionesApi, type Quiz, type QuizFormData, type QuizStatistics } from './quizzesEvaluacionesApi';

const QuizzesEvaluacionesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'resultados' | 'estadisticas'>('quizzes');
  
  // Estados para modales
  const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);
  const [isEditQuizModalOpen, setIsEditQuizModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewResultsModalOpen, setIsViewResultsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para los quizzes
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizStatistics, setQuizStatistics] = useState<QuizStatistics | null>(null);
  const [generalStatistics, setGeneralStatistics] = useState<any>(null);
  const [allResults, setAllResults] = useState<any[]>([]);
  const [selectedQuizForResults, setSelectedQuizForResults] = useState<string>('all');

  // Cargar datos iniciales
  React.useEffect(() => {
    loadQuizzes();
    loadGeneralStatistics();
    loadAllResults();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await quizzesEvaluacionesApi.getQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      toast.error('Error al cargar los quizzes');
    }
  };

  const loadGeneralStatistics = async () => {
    try {
      const stats = await quizzesEvaluacionesApi.getGeneralStatistics();
      setGeneralStatistics(stats);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const loadQuizStatistics = async (quizId: string) => {
    try {
      const stats = await quizzesEvaluacionesApi.getQuizStatistics(quizId);
      setQuizStatistics(stats);
    } catch (error) {
      console.error('Error loading quiz statistics:', error);
    }
  };

  const loadAllResults = async () => {
    try {
      const results = await quizzesEvaluacionesApi.getAllResults();
      setAllResults(results);
    } catch (error) {
      console.error('Error loading results:', error);
    }
  };

  // Funciones para manejar acciones
  const handleCreateQuiz = async (quizData: QuizFormData) => {
    setIsLoading(true);
    try {
      const newQuiz = await quizzesEvaluacionesApi.createQuiz(quizData);
      setQuizzes(prev => [...prev, newQuiz]);
      await loadGeneralStatistics();
      setIsLoading(false);
      setIsCreateQuizModalOpen(false);
      toast.success(`Quiz "${quizData.titulo}" creado exitosamente! 🎉`);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al crear el quiz');
    }
  };

  const handleEditQuiz = async (quizData: QuizFormData) => {
    if (!selectedQuiz) return;
    
    setIsLoading(true);
    try {
      const updatedQuiz = await quizzesEvaluacionesApi.updateQuiz(selectedQuiz.id, quizData);
      if (updatedQuiz) {
        setQuizzes(prev => prev.map(quiz => 
          quiz.id === selectedQuiz.id ? updatedQuiz : quiz
        ));
        await loadGeneralStatistics();
        setIsLoading(false);
        setIsEditQuizModalOpen(false);
        setSelectedQuiz(null);
        toast.success(`Quiz "${quizData.titulo}" actualizado exitosamente! ✏️`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al actualizar el quiz');
    }
  };

  const handleDeleteQuiz = async () => {
    if (!selectedQuiz) return;
    
    setIsLoading(true);
    try {
      const success = await quizzesEvaluacionesApi.deleteQuiz(selectedQuiz.id);
      if (success) {
        setQuizzes(prev => prev.filter(quiz => quiz.id !== selectedQuiz.id));
        await loadGeneralStatistics();
        setIsLoading(false);
        setIsDeleteModalOpen(false);
        toast.success(`Quiz "${selectedQuiz.titulo}" eliminado exitosamente! 🗑️`);
        setSelectedQuiz(null);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al eliminar el quiz');
    }
  };

  const handleViewResults = async (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    await loadQuizStatistics(quiz.id);
    setIsViewResultsModalOpen(true);
    toast.success(`Mostrando resultados de "${quiz.titulo}" 📊`);
  };

  const handleToggleQuizStatus = async (quiz: Quiz) => {
    const newStatus = quiz.estado === 'activo' ? 'pausado' : 'activo';
    try {
      const updatedQuiz = await quizzesEvaluacionesApi.updateQuiz(quiz.id, { ...quiz, estado: newStatus });
      if (updatedQuiz) {
        setQuizzes(prev => prev.map(q => 
          q.id === quiz.id ? updatedQuiz : q
        ));
        toast.success(`Quiz "${quiz.titulo}" ${newStatus === 'activo' ? 'activado' : 'pausado'} exitosamente! ${newStatus === 'activo' ? '▶️' : '⏸️'}`);
      }
    } catch (error) {
      toast.error('Error al cambiar el estado del quiz');
    }
  };

  const handleCopyQuiz = async (quiz: Quiz) => {
    try {
      const newQuizData: QuizFormData = {
        ...quiz,
        titulo: `${quiz.titulo} (Copia)`,
        estado: 'borrador'
      };
      const newQuiz = await quizzesEvaluacionesApi.createQuiz(newQuizData);
      setQuizzes(prev => [...prev, newQuiz]);
      await loadGeneralStatistics();
      toast.success(`Quiz "${quiz.titulo}" copiado exitosamente! 📋`);
    } catch (error) {
      toast.error('Error al copiar el quiz');
    }
  };

  const handleDownloadResults = (quiz: Quiz) => {
    toast.success(`Descargando resultados de "${quiz.titulo}"... 📥`);
  };

  const handleBackToCourse = () => {
    toast.success('Regresando al curso... 🔙');
    // Aquí iría la navegación real
  };

  // Calcular estadísticas dinámicas
  const estadisticas = [
    { 
      titulo: 'Total Quizzes', 
      valor: generalStatistics?.totalQuizzes?.toString() || '0', 
      cambio: '+3', 
      icono: HelpCircle, 
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      titulo: 'Alumnos Evaluados', 
      valor: generalStatistics?.totalIntentos?.toString() || '0', 
      cambio: '+24', 
      icono: Users, 
      color: 'from-emerald-500 to-teal-600' 
    },
    { 
      titulo: 'Promedio General', 
      valor: `${Math.round(generalStatistics?.promedioGeneral || 0)}%`, 
      cambio: '+5%', 
      icono: TrendingUp, 
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      titulo: 'Tasa de Aprobación', 
      valor: `${Math.round(generalStatistics?.tasaAprobacion || 0)}%`, 
      cambio: '+2%', 
      icono: Award, 
      color: 'from-orange-500 to-red-600' 
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
          className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <HelpCircle className="w-10 h-10 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Quizzes & <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Evaluaciones</span>
                </h1>
              </div>
              
              {/* Botón crear quiz */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateQuizModalOpen(true)}
                className="relative overflow-hidden bg-white/20 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white border border-white/30 group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-2">
                  <Plus className="w-6 h-6" />
                  <span className="font-semibold">Crear Quiz</span>
                </div>
              </motion.button>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed">
              Crea evaluaciones interactivas y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">analiza el progreso</span> de tus alumnos
            </p>

            {/* Indicadores pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Target className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">{quizzes.length} Quizzes Activos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <BarChart3 className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">Analytics Avanzados</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">Feedback Automático</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estadisticas.map((stat, index) => (
            <motion.div
              key={stat.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icono className="w-8 h-8" />
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.titulo}
                </p>

                {/* Valor */}
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.valor}
                </p>

                {/* Cambio */}
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.cambio}</span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs de Navegación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
        >
          <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1">
            {[
              { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
              { id: 'resultados', label: 'Resultados', icon: BarChart3 },
              { id: 'estadisticas', label: 'Estadísticas', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenido de Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-8">
            {activeTab === 'quizzes' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista de Quizzes</h2>
                <div className="grid gap-4">
                  {quizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <HelpCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{quiz.titulo}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <HelpCircle className="w-4 h-4" />
                              {quiz.preguntas.length} preguntas
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {quiz.duracion} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {quiz.intentos} intentos
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{quiz.promedio}%</p>
                          <p className="text-sm text-gray-600">Promedio</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          quiz.estado === 'activo' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {quiz.estado}
                        </div>
                        
                        {/* Botones de acción */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleViewResults(quiz)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                            title="Ver resultados"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setIsEditQuizModalOpen(true);
                            }}
                            className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                            title="Editar quiz"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleToggleQuizStatus(quiz)}
                            className={`p-2 rounded-lg transition-colors ${
                              quiz.estado === 'activo' 
                                ? 'bg-orange-100 hover:bg-orange-200 text-orange-600' 
                                : 'bg-green-100 hover:bg-green-200 text-green-600'
                            }`}
                            title={quiz.estado === 'activo' ? 'Pausar quiz' : 'Activar quiz'}
                          >
                            {quiz.estado === 'activo' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleCopyQuiz(quiz)}
                            className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg transition-colors"
                            title="Copiar quiz"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDownloadResults(quiz)}
                            className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg transition-colors"
                            title="Descargar resultados"
                          >
                            <Download className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                            title="Eliminar quiz"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resultados' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Resultados de Estudiantes</h2>
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Filtrar por quiz:</label>
                    <select
                      value={selectedQuizForResults}
                      onChange={(e) => setSelectedQuizForResults(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">Todos los quizzes</option>
                      {quizzes.map(quiz => (
                        <option key={quiz.id} value={quiz.id}>{quiz.titulo}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {allResults
                    .filter(result => selectedQuizForResults === 'all' || result.quizId === selectedQuizForResults)
                    .map((result, index) => {
                      const quiz = quizzes.find(q => q.id === result.quizId);
                      return (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                                result.aprobado 
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                                  : 'bg-gradient-to-br from-red-500 to-pink-600'
                              }`}>
                                {result.aprobado ? (
                                  <Award className="w-6 h-6" />
                                ) : (
                                  <HelpCircle className="w-6 h-6" />
                                )}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{result.estudianteNombre}</h3>
                                <p className="text-sm text-gray-600">{quiz?.titulo || 'Quiz no encontrado'}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {result.tiempoUtilizado} min
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(result.fechaCompletado).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl font-bold text-gray-900">{result.porcentaje}%</span>
                                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  result.aprobado 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {result.aprobado ? 'Aprobado' : 'Reprobado'}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">
                                {result.puntuacion}/{result.puntuacionMaxima} puntos
                              </p>
                            </div>
                          </div>
                          
                          {/* Detalles de respuestas */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Respuestas:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {result.respuestas.map((respuesta: any, respIndex: number) => {
                                const pregunta = quiz?.preguntas.find(p => p.id === respuesta.questionId);
                                return (
                                  <div key={respIndex} className={`p-3 rounded-lg border ${
                                    respuesta.esCorrecta 
                                      ? 'bg-green-50 border-green-200' 
                                      : 'bg-red-50 border-red-200'
                                  }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className={`w-2 h-2 rounded-full ${
                                        respuesta.esCorrecta ? 'bg-green-500' : 'bg-red-500'
                                      }`}></div>
                                      <span className="text-xs font-medium text-gray-600">
                                        {pregunta?.pregunta.substring(0, 50)}...
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                      <strong>Respuesta:</strong> {typeof respuesta.answerText === 'boolean' 
                                        ? (respuesta.answerText ? 'Verdadero' : 'Falso')
                                        : respuesta.answerText}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {respuesta.puntosObtenidos}/{pregunta?.puntos} puntos
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  
                  {allResults.filter(result => selectedQuizForResults === 'all' || result.quizId === selectedQuizForResults).length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
                        <BarChart3 className="w-12 h-12" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No hay resultados</h3>
                      <p className="text-gray-600">No se encontraron resultados para el filtro seleccionado</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'estadisticas' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Avanzados</h2>
                
                {/* Estadísticas por Quiz */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {quizzes.map((quiz, index) => {
                    const quizResults = allResults.filter(r => r.quizId === quiz.id);
                    const promedioQuiz = quizResults.length > 0 
                      ? quizResults.reduce((sum, r) => sum + r.porcentaje, 0) / quizResults.length 
                      : 0;
                    const tasaAprobacion = quizResults.length > 0 
                      ? (quizResults.filter(r => r.aprobado).length / quizResults.length) * 100 
                      : 0;
                    
                    return (
                      <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{quiz.titulo}</h3>
                            <p className="text-sm text-gray-600">{quiz.preguntas.length} preguntas • {quiz.duracion} min</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">{quizResults.length}</p>
                            <p className="text-sm text-gray-600">Intentos</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{Math.round(promedioQuiz)}%</p>
                            <p className="text-sm text-gray-600">Promedio</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tasa de Aprobación</span>
                            <span className="font-semibold text-gray-900">{Math.round(tasaAprobacion)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${tasaAprobacion}%` }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Gráfico de Rendimiento General */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución de Calificaciones General</h3>
                  <div className="space-y-3">
                    {[
                      { range: '90-100%', color: 'bg-green-500' },
                      { range: '80-89%', color: 'bg-blue-500' },
                      { range: '70-79%', color: 'bg-yellow-500' },
                      { range: '60-69%', color: 'bg-orange-500' },
                      { range: '0-59%', color: 'bg-red-500' }
                    ].map((item, index) => {
                      const cantidad = allResults.filter(r => {
                        if (item.range === '90-100%') return r.porcentaje >= 90;
                        if (item.range === '80-89%') return r.porcentaje >= 80 && r.porcentaje < 90;
                        if (item.range === '70-79%') return r.porcentaje >= 70 && r.porcentaje < 80;
                        if (item.range === '60-69%') return r.porcentaje >= 60 && r.porcentaje < 70;
                        return r.porcentaje < 60;
                      }).length;
                      const porcentaje = allResults.length > 0 ? (cantidad / allResults.length) * 100 : 0;
                      
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <span className="w-16 text-sm text-gray-600">{item.range}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${item.color} transition-all duration-1000`}
                              style={{ width: `${porcentaje}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm font-medium text-gray-900">{cantidad}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Estudiantes */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Top Estudiantes</h3>
                  <div className="space-y-3">
                    {allResults
                      .sort((a, b) => b.porcentaje - a.porcentaje)
                      .slice(0, 5)
                      .map((result, index) => {
                        const quiz = quizzes.find(q => q.id === result.quizId);
                        return (
                          <div key={result.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{result.estudianteNombre}</p>
                              <p className="text-sm text-gray-600">{quiz?.titulo}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{result.porcentaje}%</p>
                              <p className="text-xs text-gray-500">{result.tiempoUtilizado} min</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Modales */}
        {/* Formulario para crear quiz */}
        <QuizForm
          isOpen={isCreateQuizModalOpen}
          onClose={() => setIsCreateQuizModalOpen(false)}
          onSave={handleCreateQuiz}
          isLoading={isLoading}
        />

        {/* Formulario para editar quiz */}
        <QuizForm
          isOpen={isEditQuizModalOpen}
          onClose={() => {
            setIsEditQuizModalOpen(false);
            setSelectedQuiz(null);
          }}
          onSave={handleEditQuiz}
          initialData={selectedQuiz}
          isLoading={isLoading}
        />

        {/* Modal para confirmar eliminación */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirmar Eliminación"
          size="sm"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¿Eliminar Quiz?
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar el quiz <strong>"{selectedQuiz?.titulo}"</strong>? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteQuiz}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                Eliminar
              </button>
            </div>
          </div>
        </Modal>

        {/* Modal para ver resultados */}
        <Modal
          isOpen={isViewResultsModalOpen}
          onClose={() => setIsViewResultsModalOpen(false)}
          title={`Resultados - ${selectedQuiz?.titulo}`}
          size="lg"
        >
          <div className="space-y-6">
            {/* Información del quiz */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedQuiz?.preguntas.length}</p>
                  <p className="text-sm text-gray-600">Preguntas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedQuiz?.duracion} min</p>
                  <p className="text-sm text-gray-600">Duración</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedQuiz?.intentos}</p>
                  <p className="text-sm text-gray-600">Intentos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{selectedQuiz?.promedio}%</p>
                  <p className="text-sm text-gray-600">Promedio</p>
                </div>
              </div>
            </div>

            {/* Gráfico de resultados */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Distribución de Calificaciones</h4>
              <div className="space-y-3">
                {quizStatistics?.distribucionCalificaciones?.map((item, index) => {
                  const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-16 text-sm text-gray-600">{item.rango}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${colors[index]} transition-all duration-1000`}
                          style={{ width: `${item.porcentaje}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm font-medium text-gray-900">{item.cantidad}</span>
                    </div>
                  );
                }) || (
                  <div className="text-center text-gray-500 py-4">
                    No hay datos de distribución disponibles
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas adicionales */}
            {quizStatistics && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Tiempo Promedio</h5>
                  <p className="text-2xl font-bold text-blue-600">{Math.round(quizStatistics.tiempoPromedio)} min</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <h5 className="font-semibold text-green-900 mb-2">Tasa de Aprobación</h5>
                  <p className="text-2xl font-bold text-green-600">{Math.round(quizStatistics.tasaAprobacion)}%</p>
                </div>
              </div>
            )}

            {/* Preguntas más falladas */}
            {quizStatistics?.preguntasMasFalladas && quizStatistics.preguntasMasFalladas.length > 0 && (
              <div className="bg-red-50 rounded-xl p-6">
                <h4 className="font-semibold text-red-900 mb-4">Preguntas Más Falladas</h4>
                <div className="space-y-3">
                  {quizStatistics.preguntasMasFalladas.slice(0, 3).map((pregunta, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-red-200">
                      <p className="text-sm text-gray-700 mb-1">{pregunta.pregunta}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-red-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-red-500 transition-all duration-1000"
                            style={{ width: `${pregunta.porcentajeFallos}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-red-600">{Math.round(pregunta.porcentajeFallos)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={() => selectedQuiz && handleDownloadResults(selectedQuiz)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Descargar Reporte
              </button>
              <button
                onClick={() => setIsViewResultsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QuizzesEvaluacionesPage;
