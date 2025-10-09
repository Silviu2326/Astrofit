import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, Search, BookOpen, Clock, Filter, TrendingUp, Target, Plus, FileText, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../../../../components/ui/modal';
import ArchivoExperimentos from './components/ArchivoExperimentos';
import BuscadorTests from './components/BuscadorTests';
import LeccionesAprendidas from './components/LeccionesAprendidas';

const HistorialExperimentosPage: React.FC = () => {
  const [isNewExperimentModalOpen, setIsNewExperimentModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLessonsModalOpen, setIsLessonsModalOpen] = useState(false);
  const [isExperimentDetailsModalOpen, setIsExperimentDetailsModalOpen] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState<any>(null);

  const handleNewExperiment = () => {
    setIsNewExperimentModalOpen(true);
    toast.success('Abriendo creador de experimentos');
  };

  const handleFilterResults = () => {
    setIsFilterModalOpen(true);
    toast.success('Aplicando filtros avanzados');
  };

  const handleViewLessons = () => {
    setIsLessonsModalOpen(true);
    toast.success('Mostrando insights detallados');
  };

  const handleCreateExperiment = (formData: any) => {
    toast.success(`Experimento "${formData.name}" creado exitosamente`);
    setIsNewExperimentModalOpen(false);
  };

  const handleViewExperimentDetails = (experiment: any) => {
    setSelectedExperiment(experiment);
    setIsExperimentDetailsModalOpen(true);
  };

  const handleApplyLearning = (learning: string) => {
    toast.success(`Aplicando lección: ${learning.substring(0, 50)}...`);
  };

  const handleDownloadReport = (experiment: any) => {
    toast.success(`Descargando reporte de: ${experiment.description}`);
  };

  const handleShareExperiment = (experiment: any) => {
    navigator.clipboard.writeText(`Experimento: ${experiment.description} - Resultado: ${experiment.winner}`);
    toast.success('Enlace copiado al portapapeles');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Archive className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Historial <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Experimentos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Explora el <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">archivo completo</span> de experimentos A/B y aprende de cada resultado
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">127 Experimentos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">+18.3% Promedio</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BookOpen className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Lecciones Aprendidas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sección de Búsqueda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden mb-6"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Búsqueda y Filtros</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <BuscadorTests />
        </div>
      </motion.div>

      {/* Grid de Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Archivo de Experimentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <ArchivoExperimentos onViewDetails={handleViewExperimentDetails} />
          </div>
        </motion.div>

        {/* Lecciones Aprendidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="lg:col-span-1 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <LeccionesAprendidas onApplyLearning={handleApplyLearning} />
          </div>
        </motion.div>
      </div>

      {/* Sección de Acciones Rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Acciones Rápidas</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewExperiment}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-2 bg-indigo-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Nuevo Experimento</p>
                <p className="text-sm text-gray-600">Crear test A/B</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFilterResults}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-2 bg-emerald-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <Filter className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Filtrar Resultados</p>
                <p className="text-sm text-gray-600">Por fecha y métricas</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewLessons}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-2 bg-orange-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Ver Lecciones</p>
                <p className="text-sm text-gray-600">Insights aprendidos</p>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal para Nuevo Experimento */}
      <Modal
        isOpen={isNewExperimentModalOpen}
        onClose={() => setIsNewExperimentModalOpen(false)}
        title="Crear Nuevo Experimento A/B"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Experimento
              </label>
              <input
                type="text"
                placeholder="Ej: Cambio de color en botón CTA"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Experimento
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="">Seleccionar tipo</option>
                <option value="UI">UI/UX</option>
                <option value="Content">Contenido</option>
                <option value="Feature">Funcionalidad</option>
                <option value="Performance">Rendimiento</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              rows={3}
              placeholder="Describe el objetivo y las variantes del experimento..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (días)
              </label>
              <input
                type="number"
                placeholder="14"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCreateExperiment({ name: 'Nuevo Experimento' })}
              className="flex-1 bg-indigo-500 text-white px-4 py-3 rounded-xl hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crear Experimento
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsNewExperimentModalOpen(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Modal para Filtros Avanzados */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filtros Avanzados"
        size="md"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Fechas
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  placeholder="Fecha inicio"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="date"
                  placeholder="Fecha fin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Métricas
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">Tasa de Conversión</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">Tiempo en Página</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">Clics</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado del Experimento
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700">Completados</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700">En Curso</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700">Pausados</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700">Cancelados</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                toast.success('Filtros aplicados correctamente');
                setIsFilterModalOpen(false);
              }}
              className="flex-1 bg-emerald-500 text-white px-4 py-3 rounded-xl hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Aplicar Filtros
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Modal para Insights Detallados */}
      <Modal
        isOpen={isLessonsModalOpen}
        onClose={() => setIsLessonsModalOpen(false)}
        title="Insights y Lecciones Detalladas"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-700">127</p>
                  <p className="text-sm text-emerald-600">Experimentos Totales</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">85%</p>
                  <p className="text-sm text-blue-600">Tasa de Éxito</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">+18.3%</p>
                  <p className="text-sm text-purple-600">Mejora Promedio</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Lecciones Clave
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Los colores cálidos generan 15% más conversiones que los fríos</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Mensajes claros superan a propuestas complejas en 23%</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">CTAs prominentes aumentan clics en 31%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Recomendaciones
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Priorizar experimentos de UI/UX para mayor impacto</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Evitar cambios simultáneos en múltiples elementos</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Documentar contexto para futuros experimentos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                toast.success('Reporte de insights generado');
                setIsLessonsModalOpen(false);
              }}
              className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-xl hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generar Reporte
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLessonsModalOpen(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cerrar
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Modal de Detalles del Experimento */}
      <Modal
        isOpen={isExperimentDetailsModalOpen}
        onClose={() => setIsExperimentDetailsModalOpen(false)}
        title="Detalles del Experimento"
        size="lg"
      >
        {selectedExperiment && (
          <div className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                <p className="text-gray-700">{selectedExperiment.description}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Fecha</h4>
                <p className="text-gray-700">{new Date(selectedExperiment.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Resultados */}
            <div className="bg-green-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Resultado
              </h4>
              <p className="text-gray-700 font-semibold">{selectedExperiment.winner}</p>
            </div>

            {/* Notas */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Notas del Experimento</h4>
              <p className="text-gray-700">{selectedExperiment.notes}</p>
            </div>

            {/* Lecciones aprendidas */}
            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Lecciones Aprendidas</h4>
              <p className="text-gray-700">{selectedExperiment.learnings}</p>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDownloadReport(selectedExperiment)}
                className="flex-1 bg-indigo-500 text-white px-4 py-3 rounded-xl hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Descargar Reporte
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShareExperiment(selectedExperiment)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4" />
                Compartir
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistorialExperimentosPage;
