import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Sparkles, Target, TrendingUp, Star, Zap, Lightbulb, 
  ArrowRight, CheckCircle, XCircle, RefreshCw, Settings,
  Users, Award, MapPin, Calendar, Globe, Shield, Heart,
  BarChart3, PieChart, LineChart, Activity, DollarSign, Clock
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface AIRecommendationsProps {
  jugadores: Prospecto[];
  selectedJugadores: Set<string>;
  onRecommendationClick: (jugadorId: string) => void;
}

interface Recommendation {
  id: string;
  type: 'similar' | 'complement' | 'upgrade' | 'bargain' | 'rising';
  title: string;
  description: string;
  confidence: number;
  reasoning: string[];
  jugador: Prospecto;
  matchScore: number;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  jugadores,
  selectedJugadores,
  onRecommendationClick
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    generateRecommendations();
  }, [selectedJugadores]);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        type: 'similar',
        title: 'Jugadores Similares',
        description: 'Encontrados 3 jugadores con perfil similar a los seleccionados',
        confidence: 92,
        reasoning: ['Misma posición', 'Edad similar', 'Nivel comparable'],
        jugador: jugadores[0],
        matchScore: 87
      },
      {
        id: '2',
        type: 'complement',
        title: 'Complementos Perfectos',
        description: 'Jugadores que complementarían perfectamente tu selección',
        confidence: 88,
        reasoning: ['Posición complementaria', 'Estilo de juego compatible'],
        jugador: jugadores[1],
        matchScore: 91
      },
      {
        id: '3',
        type: 'upgrade',
        title: 'Mejores Alternativas',
        description: 'Versiones mejoradas de los jugadores seleccionados',
        confidence: 85,
        reasoning: ['Mayor potencial', 'Mejor rendimiento', 'Menor costo'],
        jugador: jugadores[2],
        matchScore: 89
      },
      {
        id: '4',
        type: 'bargain',
        title: 'Oportunidades de Mercado',
        description: 'Jugadores infravalorados con gran potencial',
        confidence: 90,
        reasoning: ['Precio bajo', 'Alto potencial', 'Mercado favorable'],
        jugador: jugadores[0],
        matchScore: 94
      },
      {
        id: '5',
        type: 'rising',
        title: 'Estrellas Emergentes',
        description: 'Jóvenes talentos en rápido ascenso',
        confidence: 87,
        reasoning: ['Tendencia alcista', 'Edad joven', 'Proyección alta'],
        jugador: jugadores[1],
        matchScore: 88
      }
    ];
    
    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'similar': return Users;
      case 'complement': return Target;
      case 'upgrade': return TrendingUp;
      case 'bargain': return DollarSign;
      case 'rising': return Star;
      default: return Brain;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'similar': return 'from-blue-500 to-cyan-500';
      case 'complement': return 'from-green-500 to-emerald-500';
      case 'upgrade': return 'from-purple-500 to-pink-500';
      case 'bargain': return 'from-orange-500 to-red-500';
      case 'rising': return 'from-yellow-500 to-amber-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'similar': return 'Similares';
      case 'complement': return 'Complementos';
      case 'upgrade': return 'Mejores';
      case 'bargain': return 'Oportunidades';
      case 'rising': return 'Emergentes';
      default: return 'Recomendaciones';
    }
  };

  const filteredRecommendations = selectedType === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.type === selectedType);

  if (selectedJugadores.size === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">IA Recomendaciones</h3>
        <p className="text-gray-600 mb-4">Selecciona jugadores para obtener recomendaciones inteligentes</p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recomendaciones IA</h2>
              <p className="text-gray-600">Análisis inteligente basado en {selectedJugadores.size} jugadores seleccionados</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateRecommendations}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Analizando...' : 'Actualizar'}
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              selectedType === 'all' 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          {['similar', 'complement', 'upgrade', 'bargain', 'rising'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedType === type 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {getTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
                <span className="text-lg font-semibold text-gray-900">IA Analizando...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                />
              </div>
              <p className="text-gray-600 mt-4">Procesando datos y generando recomendaciones inteligentes...</p>
            </motion.div>
          ) : (
            filteredRecommendations.map((rec, index) => {
              const Icon = getTypeIcon(rec.type);
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(rec.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{rec.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                              {rec.confidence}% confianza
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                              {rec.matchScore}% match
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{rec.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                              {rec.jugador.fotoUrl ? (
                                <img 
                                  src={rec.jugador.fotoUrl} 
                                  alt={rec.jugador.nombre}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Users className="w-6 h-6 text-gray-400 mx-auto mt-3" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{rec.jugador.nombre}</h4>
                              <p className="text-sm text-gray-600">{rec.jugador.posicion} • {rec.jugador.edad} años</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              rec.jugador.nivel === 'Alto' ? 'bg-green-100 text-green-800' :
                              rec.jugador.nivel === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {rec.jugador.nivel}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              rec.jugador.potencial === 'Estrella' ? 'bg-purple-100 text-purple-800' :
                              rec.jugador.potencial === 'Alto' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {rec.jugador.potencial}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {rec.reasoning.map((reason, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowDetails(showDetails === rec.id ? null : rec.id)}
                              className="px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                            >
                              {showDetails === rec.id ? 'Menos' : 'Más'} detalles
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onRecommendationClick(rec.jugador.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                            >
                              Ver Jugador
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {showDetails === rec.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <h4 className="font-semibold text-gray-900 mb-2">Análisis Detallado</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Fortalezas</h5>
                              <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Excelente técnica individual</li>
                                <li>• Gran velocidad y agilidad</li>
                                <li>• Visión de juego superior</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Áreas de Mejora</h5>
                              <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Juego aéreo</li>
                                <li>• Resistencia física</li>
                                <li>• Liderazgo en campo</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIRecommendations;



