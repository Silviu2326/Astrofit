import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Bot,
  Send,
  Mic,
  MicOff,
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  Zap,
  MessageCircle,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Settings,
  BookOpen,
  BarChart3,
  Heart,
  Calendar,
  Activity,
  Shield,
  AlertTriangle,
  Users,
  Play,
  Download,
  Share,
  PieChart,
  LineChart,
  Dumbbell
} from 'lucide-react';

interface FitCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: {
    nombre: string;
    nivel: string;
    objetivos: string[];
    restricciones: string[];
    lesiones: string[];
  };
  sesionesSemana: { [key: string]: any[] };
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

interface AdvancedMetrics {
  volumeDistribution: {
    upper: number;
    lower: number;
    core: number;
    cardio: number;
  };
  intensityProgression: number[];
  recoveryIndex: number;
  injuryRisk: 'low' | 'medium' | 'high';
  adaptationRate: 'slow' | 'optimal' | 'fast';
  weeklyLoad: number;
  fatigueLevel: number;
}

interface HealthMonitoring {
  injuryRisk: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
    prevention: string[];
  };
  overtrainingSigns: {
    detected: boolean;
    symptoms: string[];
    recommendations: string[];
  };
  recoveryStatus: {
    sleepQuality: number;
    stressLevel: number;
    hrv: number;
    readiness: number;
  };
}

interface IntelligentPlanning {
  currentPhase: string;
  nextPhase: string;
  transitionDate: string;
  weeklyProgression: string;
  deloadWeek: number;
  periodization: {
    week: number;
    focus: string;
    intensity: number;
    volume: number;
  }[];
}

interface EducationContent {
  id: string;
  type: 'technique' | 'nutrition' | 'recovery' | 'psychology';
  title: string;
  content: string;
  videoUrl?: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const FitCoachModal: React.FC<FitCoachModalProps> = ({
  isOpen,
  onClose,
  cliente,
  sesionesSemana
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `¡Hola ${cliente.nombre}! Soy FitCoach AI, tu asistente personal de entrenamiento. Estoy aquí para ayudarte a optimizar tu plan de entrenamiento. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
      suggestions: [
        'Analizar mi plan de entrenamiento',
        'Sugerir mejoras',
        'Optimizar volumen e intensidad',
        'Crear variaciones de ejercicios'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'analysis' | 'suggestions' | 'health' | 'education' | 'planning'>('chat');

  // Acciones rápidas
  const quickActions: QuickAction[] = [
    {
      id: 'analyze',
      title: 'Analizar Plan',
      description: 'Revisar tu plan actual',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      action: () => handleQuickAction('analyze')
    },
    {
      id: 'optimize',
      title: 'Optimizar',
      description: 'Mejorar tu rutina',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      action: () => handleQuickAction('optimize')
    },
    {
      id: 'suggest',
      title: 'Sugerir',
      description: 'Nuevas ideas',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600',
      action: () => handleQuickAction('suggest')
    },
    {
      id: 'progress',
      title: 'Progresión',
      description: 'Plan de avance',
      icon: <TrendingUp className="w-5 h-5" />,
      action: () => handleQuickAction('progress')
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta del AI
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: generateSuggestions(inputMessage)
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      analyze: 'Analiza mi plan de entrenamiento actual y dame feedback sobre qué está funcionando bien y qué se puede mejorar.',
      optimize: 'Optimiza mi rutina de entrenamiento para maximizar los resultados y minimizar el riesgo de lesiones.',
      suggest: 'Sugiere ejercicios alternativos y variaciones para mantener mi rutina interesante y efectiva.',
      progress: 'Crea un plan de progresión para las próximas 4 semanas basado en mi nivel actual.'
    };

    setInputMessage(actionMessages[action as keyof typeof actionMessages]);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = {
      analyze: `Basándome en tu plan actual, veo que tienes ${Object.values(sesionesSemana).flat().length} sesiones programadas esta semana. Tu distribución parece equilibrada, pero te sugiero ajustar la intensidad en los días de piernas para evitar fatiga.`,
      optimize: `Para optimizar tu rutina, recomiendo: 1) Aumentar el volumen en ejercicios compuestos, 2) Reducir el descanso entre series en ejercicios de aislamiento, 3) Implementar técnicas de intensidad como superseries.`,
      suggest: `Te sugiero estas variaciones: Sentadilla búlgara para mayor estabilidad, Press inclinado con mancuernas para mayor rango de movimiento, y Remo con cable para mejor activación de dorsales.`,
      progress: `Tu plan de progresión incluye: Semana 1-2: Adaptación, Semana 3-4: Intensificación. Aumentaremos el peso en 5-10% cada dos semanas y añadiremos una serie extra en ejercicios principales.`
    };

    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('analizar') || lowerInput.includes('análisis')) return responses.analyze;
    if (lowerInput.includes('optimizar') || lowerInput.includes('mejorar')) return responses.optimize;
    if (lowerInput.includes('sugerir') || lowerInput.includes('variaciones')) return responses.suggest;
    if (lowerInput.includes('progresión') || lowerInput.includes('progreso')) return responses.progress;
    
    return `Entiendo tu consulta sobre "${userInput}". Como tu FitCoach AI, te recomiendo enfocarte en la consistencia y progresión gradual. ¿Te gustaría que profundice en algún aspecto específico?`;
  };

  const generateSuggestions = (userInput: string): string[] => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('analizar')) {
      return ['Ver métricas detalladas', 'Revisar distribución semanal', 'Analizar balance muscular'];
    }
    if (lowerInput.includes('optimizar')) {
      return ['Ajustar volumen', 'Modificar intensidad', 'Optimizar descansos'];
    }
    return ['¿Necesitas más detalles?', '¿Quieres ver ejemplos?', '¿Te ayudo con algo más?'];
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Aquí implementarías la lógica de reconocimiento de voz
    if (!isListening) {
      // Simular captura de voz
      setTimeout(() => {
        setInputMessage('Analiza mi plan de entrenamiento');
        setIsListening(false);
      }, 2000);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const rateMessage = (messageId: string, rating: 'up' | 'down') => {
    console.log(`Rating message ${messageId}: ${rating}`);
  };

  const getAnalysisData = () => {
    const totalSessions = Object.values(sesionesSemana).flat().length;
    const totalExercises = Object.values(sesionesSemana).flat().reduce((sum, s) => sum + (s.ejercicios?.length || 0), 0);
    
    return {
      totalSessions,
      totalExercises,
      weeklyVolume: totalExercises * 3, // Estimación
      intensity: 7.2,
      balance: 85,
      recommendations: [
        'Aumentar volumen en piernas',
        'Reducir intensidad en hombros',
        'Añadir ejercicios de core'
      ]
    };
  };

  const getAdvancedMetrics = (): AdvancedMetrics => {
    return {
      volumeDistribution: {
        upper: 40,
        lower: 35,
        core: 15,
        cardio: 10
      },
      intensityProgression: [7.2, 7.5, 7.8, 8.1],
      recoveryIndex: 85,
      injuryRisk: 'low',
      adaptationRate: 'optimal',
      weeklyLoad: 450,
      fatigueLevel: 3.2
    };
  };

  const getHealthMonitoring = (): HealthMonitoring => {
    return {
      injuryRisk: {
        level: 'low',
        factors: ['Volumen moderado', 'Buena técnica'],
        prevention: ['Mantener movilidad', 'Calentamiento adecuado']
      },
      overtrainingSigns: {
        detected: false,
        symptoms: [],
        recommendations: ['Monitorear fatiga', 'Ajustar intensidad si es necesario']
      },
      recoveryStatus: {
        sleepQuality: 8.2,
        stressLevel: 3.1,
        hrv: 42,
        readiness: 85
      }
    };
  };

  const getIntelligentPlanning = (): IntelligentPlanning => {
    return {
      currentPhase: 'Hipertrofia',
      nextPhase: 'Fuerza',
      transitionDate: '2024-02-15',
      weeklyProgression: '+2.5% peso',
      deloadWeek: 4,
      periodization: [
        { week: 1, focus: 'Adaptación', intensity: 7, volume: 18 },
        { week: 2, focus: 'Acumulación', intensity: 7.5, volume: 20 },
        { week: 3, focus: 'Intensificación', intensity: 8, volume: 22 },
        { week: 4, focus: 'Deload', intensity: 6, volume: 15 }
      ]
    };
  };

  const getEducationContent = (): EducationContent[] => {
    return [
      {
        id: '1',
        type: 'technique',
        title: 'Técnica Perfecta de Sentadilla',
        content: 'Aprende la biomecánica correcta para maximizar resultados y prevenir lesiones.',
        duration: 5,
        difficulty: 'beginner'
      },
      {
        id: '2',
        type: 'nutrition',
        title: 'Timing de Proteínas Post-Entreno',
        content: 'La ventana anabólica y cómo optimizar la síntesis de proteínas.',
        duration: 3,
        difficulty: 'intermediate'
      },
      {
        id: '3',
        type: 'recovery',
        title: 'Importancia del Sueño para el Crecimiento',
        content: 'Cómo el sueño afecta la recuperación muscular y el rendimiento.',
        duration: 4,
        difficulty: 'beginner'
      },
      {
        id: '4',
        type: 'psychology',
        title: 'Mentalidad de Crecimiento en el Entrenamiento',
        content: 'Desarrolla una mentalidad que impulse tu progreso a largo plazo.',
        duration: 6,
        difficulty: 'advanced'
      }
    ];
  };

  const analysisData = getAnalysisData();
  const advancedMetrics = getAdvancedMetrics();
  const healthData = getHealthMonitoring();
  const planningData = getIntelligentPlanning();
  const educationData = getEducationContent();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">FitCoach AI</h2>
                  <p className="text-purple-100 text-sm">Asistente personal de entrenamiento</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Navegación por pestañas */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex">
              {[
                { id: 'chat', name: 'Chat', icon: <MessageCircle className="w-4 h-4" /> },
                { id: 'analysis', name: 'Análisis', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'suggestions', name: 'Sugerencias', icon: <Lightbulb className="w-4 h-4" /> },
                { id: 'health', name: 'Salud', icon: <Heart className="w-4 h-4" /> },
                { id: 'education', name: 'Educación', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'planning', name: 'Planificación', icon: <Calendar className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Panel izquierdo - Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col">
                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.type === 'assistant' && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => copyMessage(message.content)}
                                className="p-1 hover:bg-gray-200 rounded"
                                title="Copiar"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => rateMessage(message.id, 'up')}
                                className="p-1 hover:bg-gray-200 rounded"
                                title="Útil"
                              >
                                <ThumbsUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => rateMessage(message.id, 'down')}
                                className="p-1 hover:bg-gray-200 rounded"
                                title="No útil"
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* Sugerencias */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => setInputMessage(suggestion)}
                                className="block w-full text-left p-2 bg-white/20 rounded-lg text-xs hover:bg-white/30 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Indicador de escritura */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-4 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-sm text-gray-600">FitCoach está escribiendo...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Escribe tu pregunta a FitCoach AI..."
                        className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleVoiceInput}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                          isListening 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={isListening ? 'Detener grabación' : 'Grabar voz'}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                    <motion.button
                      onClick={handleSendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!inputMessage.trim()}
                      className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {/* Panel derecho - Acciones rápidas y análisis */}
            <div className="w-80 border-l border-gray-200 p-6 overflow-y-auto">
              {activeTab === 'chat' && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                  <div className="space-y-3 mb-6">
                    {quickActions.map((action) => (
                      <motion.button
                        key={action.id}
                        onClick={action.action}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white`}>
                            {action.icon}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{action.title}</p>
                            <p className="text-sm text-gray-500">{action.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'analysis' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-4">Análisis Avanzado de Datos</h3>
                  
                  <div className="space-y-4">
                    {/* Métricas Básicas */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">Resumen General</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Sesiones:</span>
                          <span className="ml-2 font-medium">{analysisData.totalSessions}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Ejercicios:</span>
                          <span className="ml-2 font-medium">{analysisData.totalExercises}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Volumen:</span>
                          <span className="ml-2 font-medium">{analysisData.weeklyVolume}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Intensidad:</span>
                          <span className="ml-2 font-medium">{analysisData.intensity}/10</span>
                        </div>
                      </div>
                    </div>

                    {/* Distribución de Volumen */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <PieChart className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">Distribución de Volumen</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Tren Superior</span>
                          <span className="font-medium">{advancedMetrics.volumeDistribution.upper}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Tren Inferior</span>
                          <span className="font-medium">{advancedMetrics.volumeDistribution.lower}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Core</span>
                          <span className="font-medium">{advancedMetrics.volumeDistribution.core}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Cardio</span>
                          <span className="font-medium">{advancedMetrics.volumeDistribution.cardio}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Progresión de Intensidad */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <LineChart className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-gray-900">Progresión de Intensidad</span>
                      </div>
                      <div className="flex items-center justify-between">
                        {advancedMetrics.intensityProgression.map((intensity, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-lg font-bold text-orange-600">{intensity}</div>
                            <div className="text-xs text-gray-600">Sem {idx + 1}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Métricas de Rendimiento */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">Índice de Recuperación</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{advancedMetrics.recoveryIndex}%</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">Carga Semanal</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{advancedMetrics.weeklyLoad}</div>
                      </div>
                    </div>

                    {/* Estado de Adaptación */}
                    <div className={`p-4 rounded-lg ${
                      advancedMetrics.adaptationRate === 'optimal' ? 'bg-green-50' :
                      advancedMetrics.adaptationRate === 'slow' ? 'bg-yellow-50' : 'bg-red-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className={`w-5 h-5 ${
                          advancedMetrics.adaptationRate === 'optimal' ? 'text-green-600' :
                          advancedMetrics.adaptationRate === 'slow' ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                        <span className="font-medium text-gray-900">Estado de Adaptación</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          advancedMetrics.adaptationRate === 'optimal' ? 'bg-green-100 text-green-700' :
                          advancedMetrics.adaptationRate === 'slow' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {advancedMetrics.adaptationRate === 'optimal' ? 'Óptimo' :
                           advancedMetrics.adaptationRate === 'slow' ? 'Lento' : 'Rápido'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {advancedMetrics.adaptationRate === 'optimal' ? 'Tu cuerpo se está adaptando perfectamente al entrenamiento.' :
                         advancedMetrics.adaptationRate === 'slow' ? 'Considera aumentar la intensidad gradualmente.' : 'Reduce la intensidad para evitar sobreentrenamiento.'}
                      </p>
                    </div>
                    
                    {/* Recomendaciones */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Recomendaciones Inteligentes</h4>
                      <ul className="space-y-2">
                        {analysisData.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'suggestions' && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-4">Sugerencias Inteligentes</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">Optimización IA</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Basado en tu nivel y objetivos, te sugiero aumentar el volumen en ejercicios compuestos.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">Progresión</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Tu plan está bien estructurado. Considera añadir técnicas de intensidad en 2 semanas.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-gray-900">Variaciones</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Prueba sentadilla búlgara y press inclinado para mayor variedad y estímulo.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Pestaña de Salud */}
              {activeTab === 'health' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-4">Monitoreo de Salud</h3>
                  
                  {/* Estado de Recuperación */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Estado de Recuperación</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{healthData.recoveryStatus.readiness}%</div>
                        <div className="text-sm text-gray-600">Preparación</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{healthData.recoveryStatus.hrv}</div>
                        <div className="text-sm text-gray-600">HRV</div>
                      </div>
                    </div>
                  </div>

                  {/* Riesgo de Lesión */}
                  <div className={`p-4 rounded-lg mb-4 ${
                    healthData.injuryRisk.level === 'low' ? 'bg-green-50' : 
                    healthData.injuryRisk.level === 'medium' ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className={`w-5 h-5 ${
                        healthData.injuryRisk.level === 'low' ? 'text-green-600' : 
                        healthData.injuryRisk.level === 'medium' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                      <span className="font-medium text-gray-900">Riesgo de Lesión</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        healthData.injuryRisk.level === 'low' ? 'bg-green-100 text-green-700' : 
                        healthData.injuryRisk.level === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {healthData.injuryRisk.level === 'low' ? 'Bajo' : 
                         healthData.injuryRisk.level === 'medium' ? 'Medio' : 'Alto'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Factores:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {healthData.injuryRisk.factors.map((factor, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Prevención:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {healthData.injuryRisk.prevention.map((prevention, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {prevention}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Métricas de Salud */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Calidad de Sueño</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{healthData.recoveryStatus.sleepQuality}/10</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-gray-700">Nivel de Estrés</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">{healthData.recoveryStatus.stressLevel}/10</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pestaña de Educación */}
              {activeTab === 'education' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-4">Contenido Educativo</h3>
                  
                  <div className="space-y-4">
                    {educationData.map((content) => (
                      <motion.div
                        key={content.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              content.type === 'technique' ? 'bg-blue-500' :
                              content.type === 'nutrition' ? 'bg-green-500' :
                              content.type === 'recovery' ? 'bg-purple-500' : 'bg-orange-500'
                            }`} />
                            <span className="text-sm font-medium text-gray-600 capitalize">{content.type}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              content.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                              content.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {content.difficulty === 'beginner' ? 'Principiante' :
                               content.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            {content.duration} min
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{content.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{content.content}</p>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            Ver Lección
                          </motion.button>
                          {content.videoUrl && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Descargar
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pestaña de Planificación */}
              {activeTab === 'planning' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-4">Planificación Inteligente</h3>
                  
                  {/* Fase Actual */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Fase Actual</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Fase Actual</div>
                        <div className="text-lg font-semibold text-purple-600">{planningData.currentPhase}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Próxima Fase</div>
                        <div className="text-lg font-semibold text-blue-600">{planningData.nextPhase}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      Transición: {planningData.transitionDate}
                    </div>
                  </div>

                  {/* Progresión Semanal */}
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Progresión Semanal</span>
                    </div>
                    <div className="text-lg font-semibold text-green-600">{planningData.weeklyProgression}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Semana de descanso: Semana {planningData.deloadWeek}
                    </div>
                  </div>

                  {/* Periodización */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Plan de Periodización</h4>
                    {planningData.periodization.map((week, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Semana {week.week}</span>
                          <span className="text-sm text-gray-600">{week.focus}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Intensidad:</span>
                            <span className="ml-2 font-medium">{week.intensity}/10</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Volumen:</span>
                            <span className="ml-2 font-medium">{week.volume} series</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
