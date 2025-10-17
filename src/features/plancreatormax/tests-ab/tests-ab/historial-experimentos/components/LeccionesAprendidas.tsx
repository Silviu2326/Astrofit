import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, TrendingUp, Target, Star, Award, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { getExperiments, Experiment } from '../historialExperimentosApi';

interface LeccionesAprendidasProps {
  onApplyLearning: (learning: string) => void;
}

const LeccionesAprendidas: React.FC<LeccionesAprendidasProps> = ({ onApplyLearning }) => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteLessons, setFavoriteLessons] = useState<Set<string>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        setIsLoading(true);
        const data = await getExperiments();
        setExperiments(data);
        toast.success('Lecciones aprendidas cargadas');
      } catch (error) {
        toast.error('Error al cargar las lecciones');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiments();
  }, []);

  const handleApplyLearning = (learning: string) => {
    onApplyLearning(learning);
  };

  const handleToggleFavorite = (experimentId: string) => {
    const newFavorites = new Set(favoriteLessons);
    if (newFavorites.has(experimentId)) {
      newFavorites.delete(experimentId);
      toast.success('Lección removida de favoritos');
    } else {
      newFavorites.add(experimentId);
      toast.success('Lección marcada como favorita');
    }
    setFavoriteLessons(newFavorites);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Cargando lecciones...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <BookOpen className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lecciones Aprendidas</h2>
          <p className="text-gray-600">
            Patrones de éxito y insights clave
            {favoriteLessons.size > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <Star className="w-3 h-3 fill-current" />
                {favoriteLessons.size} favorita{favoriteLessons.size !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-700">{experiments.length}</p>
              <p className="text-sm text-emerald-600">Experimentos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">85%</p>
              <p className="text-sm text-blue-600">Tasa de éxito</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-700">+18.3%</p>
              <p className="text-sm text-purple-600">Mejora promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtro de favoritos */}
      {favoriteLessons.size > 0 && (
        <div className="mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200 ${
              showOnlyFavorites
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <Star className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
            {showOnlyFavorites ? 'Mostrar todas las lecciones' : 'Mostrar solo favoritas'}
          </motion.button>
        </div>
      )}

      {/* Lista de lecciones */}
      <div className="space-y-4">
        {experiments
          .filter(exp => !showOnlyFavorites || favoriteLessons.has(exp.id))
          .map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            {/* Header de la lección */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-xl group-hover:bg-yellow-200 transition-colors duration-200">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{exp.description}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>Ganador: {exp.winner}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  favoriteLessons.has(exp.id) 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  <Star className={`w-3 h-3 ${favoriteLessons.has(exp.id) ? 'fill-current' : ''}`} />
                  {favoriteLessons.has(exp.id) ? 'Favorita' : 'Lección Clave'}
                </div>
              </div>
            </div>

            {/* Contenido de la lección */}
            <div className="p-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Lección Aprendida
                </h4>
                <p className="text-emerald-800 leading-relaxed">{exp.learnings}</p>
              </div>
              
              {exp.notes && (
                <div className="mt-4 bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Contexto</h4>
                  <p className="text-blue-800 text-sm">{exp.notes}</p>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="p-6 pt-0">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyLearning(exp.learnings)}
                  className="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Zap className="w-4 h-4" />
                  Aplicar Lección
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToggleFavorite(exp.id)}
                  className={`px-4 py-2 border rounded-xl transition-colors duration-200 ${
                    favoriteLessons.has(exp.id)
                      ? 'bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Star className={`w-4 h-4 ${favoriteLessons.has(exp.id) ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resumen de patrones */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200">
        <h3 className="font-bold text-lg text-indigo-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Patrones de Éxito Identificados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">🎨 UI/UX</h4>
            <p className="text-sm text-gray-600">Los colores cálidos y contrastes altos generan mejor conversión</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Contenido</h4>
            <p className="text-sm text-gray-600">Mensajes claros y directos superan a propuestas complejas</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">⚡ Performance</h4>
            <p className="text-sm text-gray-600">Cargas rápidas impactan directamente en engagement</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Conversión</h4>
            <p className="text-sm text-gray-600">CTAs prominentes con texto de acción específico</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeccionesAprendidas;
