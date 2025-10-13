import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Dumbbell,
  Paintbrush,
  Target,
  Zap,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Plus,
  Minus,
  Search,
  Filter,
  Calendar,
  Clock,
  Weight,
  Repeat,
  Timer,
  Eye,
  FileText,
  BarChart3,
  TrendingUp,
  Activity,
  Brain,
  Download,
  Copy,
  Settings,
  Layers,
  PieChart,
  LineChart,
  Map,
  Users,
  Star,
  Bookmark,
  History,
  Lightbulb,
  Shield,
  AlertCircle
} from 'lucide-react';

interface BatchTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  sesionesSemana: { [key: string]: any[] };
  onApplyChanges: (changes: BatchChange[]) => void;
}

interface BatchChange {
  id: string;
  type: 'volume' | 'intensity' | 'substitution' | 'progression';
  target: 'sessions' | 'exercises' | 'series';
  value: number | string;
  sessions: string[];
  description: string;
}

interface BatchTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface BatchTemplate {
  id: string;
  name: string;
  description: string;
  category: 'progression' | 'recovery' | 'intensity' | 'volume' | 'custom';
  changes: BatchChange[];
  icon: React.ReactNode;
  color: string;
  usage: number;
}

interface SessionFilter {
  id: string;
  name: string;
  type: 'muscle' | 'intensity' | 'equipment' | 'duration';
  options: string[];
  selected: string[];
}

interface ImpactAnalysis {
  volumeChange: number;
  intensityChange: number;
  timeChange: number;
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  suggestions: string[];
}

interface PreviewData {
  before: {
    totalSessions: number;
    totalVolume: number;
    avgIntensity: number;
    totalTime: number;
  };
  after: {
    totalSessions: number;
    totalVolume: number;
    avgIntensity: number;
    totalTime: number;
  };
  changes: Array<{
    session: string;
    change: string;
    impact: 'positive' | 'neutral' | 'negative';
  }>;
}

export const BatchTrainingModal: React.FC<BatchTrainingModalProps> = ({
  isOpen,
  onClose,
  sesionesSemana,
  onApplyChanges
}) => {
  const [activeTool, setActiveTool] = useState<string>('volume');
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [batchChanges, setBatchChanges] = useState<BatchChange[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'tools' | 'templates' | 'filters' | 'preview' | 'analysis'>('tools');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [filters, setFilters] = useState<SessionFilter[]>([]);
  const [impactAnalysis, setImpactAnalysis] = useState<ImpactAnalysis | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  // Herramientas disponibles
  const tools: BatchTool[] = [
    {
      id: 'volume',
      name: 'Pincel de Volumen',
      icon: <Repeat className="w-5 h-5" />,
      description: 'Ajustar series y repeticiones',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'intensity',
      name: 'Pincel de Intensidad',
      icon: <Weight className="w-5 h-5" />,
      description: 'Modificar pesos y RPE',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'substitution',
      name: 'Sustituciones',
      icon: <RotateCcw className="w-5 h-5" />,
      description: 'Cambiar ejercicios',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'progression',
      name: 'Progresión',
      icon: <Target className="w-5 h-5" />,
      description: 'Aplicar progresión semanal',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Días de la semana
  const diasSemana = [
    { key: '1', name: 'Lunes', short: 'L' },
    { key: '2', name: 'Martes', short: 'M' },
    { key: '3', name: 'Miércoles', short: 'X' },
    { key: '4', name: 'Jueves', short: 'J' },
    { key: '5', name: 'Viernes', short: 'V' },
    { key: '6', name: 'Sábado', short: 'S' },
    { key: '0', name: 'Domingo', short: 'D' }
  ];

  // Plantillas de cambios batch
  const batchTemplates: BatchTemplate[] = [
    {
      id: 'progression-weekly',
      name: 'Progresión Semanal Estándar',
      description: '+10% volumen, +5% intensidad',
      category: 'progression',
      changes: [
        { id: '1', type: 'volume', target: 'sessions', value: 10, sessions: [], description: 'Aumentar volumen 10%' },
        { id: '2', type: 'intensity', target: 'sessions', value: 5, sessions: [], description: 'Aumentar intensidad 5%' }
      ],
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      usage: 45
    },
    {
      id: 'recovery-week',
      name: 'Semana de Recuperación',
      description: '-20% volumen, -10% intensidad',
      category: 'recovery',
      changes: [
        { id: '1', type: 'volume', target: 'sessions', value: -20, sessions: [], description: 'Reducir volumen 20%' },
        { id: '2', type: 'intensity', target: 'sessions', value: -10, sessions: [], description: 'Reducir intensidad 10%' }
      ],
      icon: <Shield className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      usage: 23
    },
    {
      id: 'intensity-focus',
      name: 'Enfoque en Intensidad',
      description: '+15% peso, -2 repeticiones',
      category: 'intensity',
      changes: [
        { id: '1', type: 'intensity', target: 'sessions', value: 15, sessions: [], description: 'Aumentar peso 15%' },
        { id: '2', type: 'volume', target: 'sessions', value: -2, sessions: [], description: 'Reducir repeticiones 2' }
      ],
      icon: <Zap className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      usage: 18
    },
    {
      id: 'volume-boost',
      name: 'Impulso de Volumen',
      description: '+25% series, +1 sesión extra',
      category: 'volume',
      changes: [
        { id: '1', type: 'volume', target: 'sessions', value: 25, sessions: [], description: 'Aumentar series 25%' },
        { id: '2', type: 'progression', target: 'sessions', value: 1, sessions: [], description: 'Agregar sesión extra' }
      ],
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      usage: 12
    }
  ];

  // Filtros inteligentes
  const sessionFilters: SessionFilter[] = [
    {
      id: 'muscle',
      name: 'Grupo Muscular',
      type: 'muscle',
      options: ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core'],
      selected: []
    },
    {
      id: 'intensity',
      name: 'Intensidad',
      type: 'intensity',
      options: ['Baja (1-4)', 'Media (5-7)', 'Alta (8-10)'],
      selected: []
    },
    {
      id: 'equipment',
      name: 'Equipamiento',
      type: 'equipment',
      options: ['Peso Libre', 'Máquinas', 'Cables', 'Calistenia', 'Kettlebells'],
      selected: []
    },
    {
      id: 'duration',
      name: 'Duración',
      type: 'duration',
      options: ['Corta (<45min)', 'Media (45-75min)', 'Larga (>75min)'],
      selected: []
    }
  ];

  const handleSessionToggle = (dia: string) => {
    setSelectedSessions(prev => 
      prev.includes(dia) 
        ? prev.filter(d => d !== dia)
        : [...prev, dia]
    );
  };

  const handleSelectAll = () => {
    const allDays = diasSemana.map(d => d.key);
    setSelectedSessions(allDays);
  };

  const handleClearSelection = () => {
    setSelectedSessions([]);
  };

  const addBatchChange = (change: Omit<BatchChange, 'id'>) => {
    const newChange: BatchChange = {
      ...change,
      id: Date.now().toString()
    };
    setBatchChanges(prev => [...prev, newChange]);
  };

  const removeBatchChange = (id: string) => {
    setBatchChanges(prev => prev.filter(change => change.id !== id));
  };

  const handleApplyChanges = () => {
    onApplyChanges(batchChanges);
    setBatchChanges([]);
    setSelectedSessions([]);
    onClose();
  };

  const getSessionCount = (dia: string) => {
    return sesionesSemana[dia]?.length || 0;
  };

  const getTotalChanges = () => {
    return batchChanges.reduce((total, change) => total + change.sessions.length, 0);
  };

  const handleTemplateSelect = (template: BatchTemplate) => {
    setSelectedTemplate(template.id);
    // Aplicar cambios de la plantilla
    const templateChanges = template.changes.map(change => ({
      ...change,
      id: Date.now().toString() + Math.random(),
      sessions: selectedSessions
    }));
    setBatchChanges(prev => [...prev, ...templateChanges]);
  };

  const handleFilterChange = (filterId: string, option: string) => {
    setFilters(prev => prev.map(filter => 
      filter.id === filterId 
        ? {
            ...filter,
            selected: filter.selected.includes(option)
              ? filter.selected.filter(s => s !== option)
              : [...filter.selected, option]
          }
        : filter
    ));
  };

  const calculateImpactAnalysis = (): ImpactAnalysis => {
    const totalVolumeChange = batchChanges
      .filter(c => c.type === 'volume')
      .reduce((sum, c) => sum + (typeof c.value === 'number' ? c.value : 0), 0);
    
    const totalIntensityChange = batchChanges
      .filter(c => c.type === 'intensity')
      .reduce((sum, c) => sum + (typeof c.value === 'number' ? c.value : 0), 0);

    const riskLevel = Math.abs(totalVolumeChange) > 30 || Math.abs(totalIntensityChange) > 20 ? 'high' :
                     Math.abs(totalVolumeChange) > 15 || Math.abs(totalIntensityChange) > 10 ? 'medium' : 'low';

    const warnings = [];
    const suggestions = [];

    if (totalVolumeChange > 25) {
      warnings.push('Alto aumento de volumen - riesgo de sobreentrenamiento');
      suggestions.push('Considerar reducir el aumento a 15%');
    }
    if (totalIntensityChange > 15) {
      warnings.push('Aumento significativo de intensidad');
      suggestions.push('Monitorear fatiga y técnica');
    }
    if (riskLevel === 'high') {
      warnings.push('Cambios de alto riesgo detectados');
      suggestions.push('Revisar planificación y descanso');
    }

    return {
      volumeChange: totalVolumeChange,
      intensityChange: totalIntensityChange,
      timeChange: totalVolumeChange * 0.3, // Estimación
      riskLevel,
      warnings,
      suggestions
    };
  };

  const generatePreviewData = (): PreviewData => {
    const currentSessions = Object.values(sesionesSemana).flat();
    const currentVolume = currentSessions.reduce((sum, s) => sum + (s.ejercicios?.length || 0), 0);
    const currentIntensity = 7.2; // Mock
    const currentTime = currentSessions.reduce((sum, s) => sum + (s.duracion || 0), 0);

    const impact = calculateImpactAnalysis();
    
    return {
      before: {
        totalSessions: currentSessions.length,
        totalVolume: currentVolume,
        avgIntensity: currentIntensity,
        totalTime: currentTime
      },
      after: {
        totalSessions: currentSessions.length,
        totalVolume: Math.round(currentVolume * (1 + impact.volumeChange / 100)),
        avgIntensity: Math.round((currentIntensity + impact.intensityChange / 10) * 10) / 10,
        totalTime: Math.round(currentTime * (1 + impact.timeChange / 100))
      },
      changes: batchChanges.map(change => ({
        session: diasSemana.find(d => d.key === change.sessions[0])?.name || 'Sesión',
        change: change.description,
        impact: change.type === 'volume' && typeof change.value === 'number' && change.value > 0 ? 'positive' :
                change.type === 'intensity' && typeof change.value === 'number' && change.value > 0 ? 'positive' : 'neutral'
      }))
    };
  };

  const handleAnalyzeImpact = () => {
    const analysis = calculateImpactAnalysis();
    const preview = generatePreviewData();
    setImpactAnalysis(analysis);
    setPreviewData(preview);
    setActiveTab('analysis');
  };

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
          className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Batch Training</h2>
                  <p className="text-purple-100 text-sm">Edición masiva de entrenamientos</p>
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
                { id: 'tools', name: 'Herramientas', icon: <Paintbrush className="w-4 h-4" /> },
                { id: 'templates', name: 'Plantillas', icon: <FileText className="w-4 h-4" /> },
                { id: 'filters', name: 'Filtros', icon: <Filter className="w-4 h-4" /> },
                { id: 'preview', name: 'Vista Previa', icon: <Eye className="w-4 h-4" /> },
                { id: 'analysis', name: 'Análisis', icon: <BarChart3 className="w-4 h-4" /> }
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

          <div className="flex flex-1 overflow-hidden">
            {/* Panel izquierdo - Contenido dinámico */}
            <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
              {activeTab === 'tools' && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-4">Herramientas</h3>
                  
                  {/* Herramientas disponibles */}
                  <div className="space-y-3 mb-6">
                    {tools.map((tool) => (
                      <motion.button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-3 rounded-lg border-2 transition-all ${
                          activeTool === tool.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center text-white`}>
                            {tool.icon}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{tool.name}</p>
                            <p className="text-sm text-gray-500">{tool.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'templates' && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-4">Plantillas de Cambios</h3>
                  
                  {/* Plantillas disponibles */}
                  <div className="space-y-3 mb-6">
                    {batchTemplates.map((template) => (
                      <motion.button
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-3 rounded-lg border-2 transition-all ${
                          selectedTemplate === template.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center text-white`}>
                            {template.icon}
                          </div>
                          <div className="text-left flex-1">
                            <p className="font-medium text-gray-900">{template.name}</p>
                            <p className="text-sm text-gray-500">{template.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-400">Usado {template.usage} veces</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'filters' && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-4">Filtros Inteligentes</h3>
                  
                  {/* Filtros disponibles */}
                  <div className="space-y-4 mb-6">
                    {sessionFilters.map((filter) => (
                      <div key={filter.id} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{filter.name}</label>
                        <div className="flex flex-wrap gap-2">
                          {filter.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleFilterChange(filter.id, option)}
                              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                                filter.selected.includes(option)
                                  ? 'bg-purple-100 text-purple-700 border-purple-300'
                                  : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'preview' && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-4">Vista Previa</h3>
                  
                  {previewData ? (
                    <div className="space-y-4">
                      {/* Comparación antes/después */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Antes</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Sesiones:</span> {previewData.before.totalSessions}</p>
                            <p><span className="font-medium">Volumen:</span> {previewData.before.totalVolume}</p>
                            <p><span className="font-medium">Intensidad:</span> {previewData.before.avgIntensity}</p>
                            <p><span className="font-medium">Tiempo:</span> {previewData.before.totalTime}min</p>
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-2">Después</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Sesiones:</span> {previewData.after.totalSessions}</p>
                            <p><span className="font-medium">Volumen:</span> {previewData.after.totalVolume}</p>
                            <p><span className="font-medium">Intensidad:</span> {previewData.after.avgIntensity}</p>
                            <p><span className="font-medium">Tiempo:</span> {previewData.after.totalTime}min</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Lista de cambios */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Cambios Detallados</h4>
                        <div className="space-y-2">
                          {previewData.changes.map((change, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <div className={`w-2 h-2 rounded-full ${
                                change.impact === 'positive' ? 'bg-green-500' :
                                change.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                              }`} />
                              <span className="text-sm text-gray-700">
                                <span className="font-medium">{change.session}:</span> {change.change}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No hay datos de vista previa</p>
                      <p className="text-sm">Agrega cambios para ver la vista previa</p>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'analysis' && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-4">Análisis de Impacto</h3>
                  
                  {impactAnalysis ? (
                    <div className="space-y-4">
                      {/* Métricas principales */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-600 font-medium">Cambio de Volumen</p>
                          <p className="text-lg font-bold text-blue-800">
                            {impactAnalysis.volumeChange > 0 ? '+' : ''}{impactAnalysis.volumeChange}%
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-xs text-purple-600 font-medium">Cambio de Intensidad</p>
                          <p className="text-lg font-bold text-purple-800">
                            {impactAnalysis.intensityChange > 0 ? '+' : ''}{impactAnalysis.intensityChange}%
                          </p>
                        </div>
                      </div>
                      
                      {/* Nivel de riesgo */}
                      <div className={`p-3 rounded-lg ${
                        impactAnalysis.riskLevel === 'high' ? 'bg-red-50 border border-red-200' :
                        impactAnalysis.riskLevel === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-green-50 border border-green-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className={`w-4 h-4 ${
                            impactAnalysis.riskLevel === 'high' ? 'text-red-600' :
                            impactAnalysis.riskLevel === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`} />
                          <span className="font-medium text-gray-900">
                            Nivel de Riesgo: {impactAnalysis.riskLevel === 'high' ? 'Alto' :
                                           impactAnalysis.riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Advertencias */}
                      {impactAnalysis.warnings.length > 0 && (
                        <div className="bg-red-50 p-3 rounded-lg">
                          <h4 className="font-medium text-red-900 mb-2">Advertencias</h4>
                          <ul className="space-y-1">
                            {impactAnalysis.warnings.map((warning, idx) => (
                              <li key={idx} className="text-sm text-red-700 flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Sugerencias */}
                      {impactAnalysis.suggestions.length > 0 && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Sugerencias</h4>
                          <ul className="space-y-1">
                            {impactAnalysis.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="text-sm text-blue-700 flex items-center gap-2">
                                <Lightbulb className="w-3 h-3" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No hay análisis disponible</p>
                      <p className="text-sm">Agrega cambios y haz clic en "Analizar Impacto"</p>
                    </div>
                  )}
                </>
              )}

              {/* Selección de sesiones */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Sesiones</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSelectAll}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Todas
                    </button>
                    <button
                      onClick={handleClearSelection}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {diasSemana.map((dia) => (
                    <motion.button
                      key={dia.key}
                      onClick={() => handleSessionToggle(dia.key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSessions.includes(dia.key)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <p className="font-medium text-sm">{dia.short}</p>
                        <p className="text-xs text-gray-500">{getSessionCount(dia.key)} sesiones</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel central - Configuración de herramienta */}
            <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
              <h3 className="font-semibold text-gray-900 mb-4">
                {tools.find(t => t.id === activeTool)?.name}
              </h3>
              
              {/* Configuración específica por herramienta */}
              {activeTool === 'volume' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ajuste de Series
                    </label>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-gray-100 rounded-lg">
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                        placeholder="0"
                      />
                      <button className="p-2 bg-gray-100 rounded-lg">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ajuste de Repeticiones
                    </label>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-gray-100 rounded-lg">
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                        placeholder="0"
                      />
                      <button className="p-2 bg-gray-100 rounded-lg">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTool === 'intensity' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ajuste de Peso (%)
                    </label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>-20%</span>
                      <span>0%</span>
                      <span>+20%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Descanso (min)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="2"
                    />
                  </div>
                </div>
              )}

              {activeTool === 'substitution' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ejercicio a Reemplazar
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Buscar ejercicio..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nuevo Ejercicio
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Seleccionar reemplazo..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTool === 'progression' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Progresión
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Volumen (+10% series)</option>
                      <option>Intensidad (+5% peso)</option>
                      <option>Frecuencia (+1 sesión)</option>
                      <option>Densidad (-10% descanso)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intensidad de Progresión
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5%</span>
                      <span>15%</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón para agregar cambio */}
              <div className="mt-6">
                <motion.button
                  onClick={() => {
                    const tool = tools.find(t => t.id === activeTool);
                    addBatchChange({
                      type: activeTool as any,
                      target: 'sessions',
                      value: 0,
                      sessions: selectedSessions,
                      description: `${tool?.name} aplicado a ${selectedSessions.length} sesiones`
                    });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  disabled={selectedSessions.length === 0}
                >
                  <Plus className="w-4 h-4" />
                  Agregar Cambio
                </motion.button>
              </div>
            </div>

            {/* Panel derecho - Vista previa y cambios */}
            <div className="w-1/3 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Cambios Pendientes</h3>
                <span className="text-sm text-gray-500">
                  {getTotalChanges()} cambios
                </span>
              </div>

              {/* Lista de cambios */}
              <div className="space-y-3 mb-6 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {batchChanges.map((change) => (
                  <motion.div
                    key={change.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {change.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {change.sessions.length} sesiones
                        </p>
                      </div>
                      <button
                        onClick={() => removeBatchChange(change.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <motion.button
                  onClick={() => {
                    const preview = generatePreviewData();
                    setPreviewData(preview);
                    setActiveTab('preview');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Vista Previa
                </motion.button>

                <motion.button
                  onClick={handleAnalyzeImpact}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-purple-100 text-purple-700 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Analizar Impacto
                </motion.button>

                <motion.button
                  onClick={handleApplyChanges}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  disabled={batchChanges.length === 0}
                >
                  <CheckCircle className="w-4 h-4" />
                  Aplicar Cambios
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
