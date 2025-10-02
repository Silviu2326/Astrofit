import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Microscope, Brain, FileText, TrendingUp, Award, CheckCircle,
  Search, Send, BookOpen, ExternalLink, Download, Filter,
  ChevronDown, ChevronUp, BarChart3, AlertTriangle, Lightbulb,
  FlaskConical, Sparkles, Target, Scale, ChevronRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Tipos
interface Study {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  doi: string;
  evidenceLevel: 'Alta' | 'Media' | 'Baja';
  summary: string;
}

interface Message {
  id: string;
  type: 'user' | 'agent';
  text: string;
  references?: number[];
  evidenceLevel?: 'Alta' | 'Media' | 'Baja';
  expandedExplanation?: string;
}

interface Myth {
  id: string;
  claim: string;
  verdict: 'Verdadero' | 'Falso' | 'Parcial';
  explanation: string;
  references: number[];
}

interface Protocol {
  id: string;
  name: string;
  type: string;
  efficacy: number;
  adherence: number;
  risks: string;
  recommendations: string;
}

const AgenteCientificoPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      text: 'Bienvenido al Agente Científico. Puedo ayudarte a analizar evidencia científica sobre fisiología del ejercicio, nutrición deportiva, y adaptaciones al entrenamiento.',
      evidenceLevel: 'Alta'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTab, setSelectedTab] = useState<'chat' | 'mitos' | 'comparador' | 'biblioteca'>('chat');
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de estadísticas
  const stats = [
    {
      title: 'Estudios Consultados',
      value: '2,847',
      change: 24,
      icon: FileText,
      gradient: 'from-purple-500 to-indigo-500',
      progress: 85
    },
    {
      title: 'Análisis Realizados',
      value: '1,234',
      change: 18,
      icon: Brain,
      gradient: 'from-indigo-500 to-blue-500',
      progress: 72
    },
    {
      title: 'Referencias Citadas',
      value: '5,629',
      change: 32,
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
      progress: 90
    },
    {
      title: 'Confianza Promedio',
      value: '94%',
      change: 8,
      icon: Award,
      gradient: 'from-cyan-500 to-teal-500',
      progress: 94
    }
  ];

  // Estudios mockeados
  const studies: Study[] = [
    {
      id: '1',
      title: 'Effects of High-Intensity Interval Training on VO2max and Muscle Oxidative Capacity',
      authors: 'Gibala, M.J., et al.',
      year: 2021,
      journal: 'Journal of Applied Physiology',
      doi: '10.1152/japplphysiol.00234.2021',
      evidenceLevel: 'Alta',
      summary: 'Estudio randomizado controlado que demuestra mejoras significativas en VO2max (+15%) tras 6 semanas de HIIT.'
    },
    {
      id: '2',
      title: 'Protein Timing and Muscle Protein Synthesis: A Meta-Analysis',
      authors: 'Schoenfeld, B.J., Aragon, A.A.',
      year: 2022,
      journal: 'Sports Medicine',
      doi: '10.1007/s40279-022-01234-5',
      evidenceLevel: 'Alta',
      summary: 'Meta-análisis de 47 estudios. El timing de proteína tiene un efecto trivial comparado con la ingesta total diaria.'
    },
    {
      id: '3',
      title: 'Ketogenic Diet and Exercise Performance: Current State of Evidence',
      authors: 'Burke, L.M., et al.',
      year: 2020,
      journal: 'International Journal of Sport Nutrition',
      doi: '10.1123/ijsnem.2020-0156',
      evidenceLevel: 'Media',
      summary: 'La dieta cetogénica puede perjudicar el rendimiento en ejercicios de alta intensidad pero beneficiar ultra-resistencia.'
    },
    {
      id: '4',
      title: 'Resistance Training Frequency and Hypertrophy: Systematic Review',
      authors: 'Schoenfeld, B.J., Grgic, J.',
      year: 2021,
      journal: 'Journal of Strength and Conditioning Research',
      doi: '10.1519/JSC.0000000000003854',
      evidenceLevel: 'Alta',
      summary: 'Mayor frecuencia de entrenamiento (2-3x/semana por grupo muscular) produce mayores ganancias de hipertrofia.'
    },
    {
      id: '5',
      title: 'Cold Water Immersion and Recovery: A Dose-Response Study',
      authors: 'Roberts, L.A., et al.',
      year: 2019,
      journal: 'European Journal of Applied Physiology',
      doi: '10.1007/s00421-019-04234-9',
      evidenceLevel: 'Media',
      summary: 'La inmersión en agua fría puede reducir dolor muscular pero atenuar adaptaciones hipertróficas a largo plazo.'
    }
  ];

  // Mitos vs Realidad
  const myths: Myth[] = [
    {
      id: '1',
      claim: '¿El cardio en ayunas quema más grasa?',
      verdict: 'Parcial',
      explanation: 'Aunque se oxida más grasa durante el ejercicio en ayunas, el balance de grasa de 24h es idéntico cuando las calorías son iguales. El efecto es mínimo para composición corporal.',
      references: [1, 2]
    },
    {
      id: '2',
      claim: '¿Necesito proteína dentro de 30 minutos post-entreno?',
      verdict: 'Falso',
      explanation: 'El "anabolic window" es mucho más amplio de lo que se pensaba. La ingesta proteica total diaria es mucho más importante que el timing exacto.',
      references: [2]
    },
    {
      id: '3',
      claim: '¿Los carbohidratos de noche engordan más?',
      verdict: 'Falso',
      explanation: 'El timing de carbohidratos no afecta la ganancia de grasa. Lo que importa es el balance calórico total del día. Algunos estudios sugieren que carbos nocturnos pueden mejorar el sueño.',
      references: [1, 3]
    },
    {
      id: '4',
      claim: '¿Más frecuencia de entrenamiento = más músculo?',
      verdict: 'Verdadero',
      explanation: 'La evidencia muestra que entrenar cada grupo muscular 2-3 veces por semana produce mayores ganancias que 1 vez por semana, cuando el volumen total es igualado.',
      references: [4]
    },
    {
      id: '5',
      claim: '¿Los baños de hielo mejoran la recuperación?',
      verdict: 'Parcial',
      explanation: 'Reducen el dolor muscular a corto plazo, pero pueden interferir con las adaptaciones de fuerza e hipertrofia cuando se usan crónicamente.',
      references: [5]
    }
  ];

  // Protocolos para comparar
  const protocols: Protocol[] = [
    {
      id: '1',
      name: 'HIIT (High-Intensity Interval Training)',
      type: 'Cardio',
      efficacy: 90,
      adherence: 65,
      risks: 'Mayor riesgo de lesión, requiere buena base de fitness',
      recommendations: 'Ideal para mejorar VO2max y capacidad oxidativa en poco tiempo'
    },
    {
      id: '2',
      name: 'LISS (Low-Intensity Steady State)',
      type: 'Cardio',
      efficacy: 70,
      adherence: 85,
      risks: 'Bajo riesgo de lesión, puede ser aburrido',
      recommendations: 'Excelente para principiantes, recuperación activa, y volumen aeróbico'
    },
    {
      id: '3',
      name: 'Dieta Cetogénica',
      type: 'Nutrición',
      efficacy: 75,
      adherence: 55,
      risks: 'Difícil adherencia, puede reducir rendimiento en ejercicios intensos',
      recommendations: 'Útil para pérdida de peso y deportes de ultra-resistencia'
    },
    {
      id: '4',
      name: 'Dieta Low-Fat',
      type: 'Nutrición',
      efficacy: 70,
      adherence: 70,
      risks: 'Puede afectar hormonas si grasa es demasiado baja',
      recommendations: 'Efectiva para pérdida de peso, mejor adherencia que keto'
    }
  ];

  // Datos para gráficos
  const adaptationData = [
    { semana: 1, fuerza: 100, hipertrofia: 100, vo2max: 100 },
    { semana: 2, fuerza: 108, hipertrofia: 102, vo2max: 105 },
    { semana: 4, fuerza: 118, hipertrofia: 108, vo2max: 112 },
    { semana: 6, fuerza: 125, hipertrofia: 115, vo2max: 118 },
    { semana: 8, fuerza: 132, hipertrofia: 122, vo2max: 123 },
    { semana: 12, fuerza: 145, hipertrofia: 135, vo2max: 128 }
  ];

  const doseResponseData = [
    { sets: 0, ganancia: 0 },
    { sets: 5, ganancia: 45 },
    { sets: 10, ganancia: 75 },
    { sets: 15, ganancia: 90 },
    { sets: 20, ganancia: 95 },
    { sets: 25, ganancia: 92 }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue
    };

    const agentResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'agent',
      text: `Según la evidencia actual [1][2], ${inputValue.toLowerCase().includes('proteína') ? 'la proteína total diaria (1.6-2.2g/kg) es más importante que el timing específico. La ventana anabólica es mucho más amplia de lo que se creía.' : inputValue.toLowerCase().includes('cardio') ? 'tanto HIIT como LISS son efectivos, pero para diferentes objetivos. HIIT maximiza adaptaciones en menor tiempo, mientras LISS es más sostenible y de menor impacto.' : 'la evidencia sugiere un enfoque individualizado basado en tus objetivos específicos y contexto personal.'}`,
      references: [1, 2],
      evidenceLevel: 'Alta',
      expandedExplanation: 'El análisis completo incluye: mecanismos fisiológicos subyacentes, variabilidad inter-individual, y consideraciones prácticas para implementación. Los estudios citados son RCTs con tamaños de muestra >30 y duración >8 semanas.'
    };

    setMessages([...messages, newUserMessage, agentResponse]);
    setInputValue('');
  };

  const getEvidenceBadgeColor = (level: 'Alta' | 'Media' | 'Baja') => {
    switch (level) {
      case 'Alta':
        return 'bg-green-500';
      case 'Media':
        return 'bg-yellow-500';
      case 'Baja':
        return 'bg-orange-500';
    }
  };

  const getVerdictBadgeColor = (verdict: 'Verdadero' | 'Falso' | 'Parcial') => {
    switch (verdict) {
      case 'Verdadero':
        return 'from-green-500 to-emerald-500';
      case 'Falso':
        return 'from-red-500 to-pink-500';
      case 'Parcial':
        return 'from-yellow-500 to-orange-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Microscope className="w-12 h-12 text-cyan-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-cyan-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Agente <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-300">Científico</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Análisis basado en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">evidencia peer-reviewed</span> y estudios científicos
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Brain className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Análisis Profundo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Referencias Citadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-pink-300" />
              <span className="text-sm font-semibold text-white">Alta Confianza</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TABS DE NAVEGACIÓN */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: 'chat', label: 'Chat Científico', icon: Brain },
          { id: 'mitos', label: 'Mitos vs Realidad', icon: Scale },
          { id: 'comparador', label: 'Comparador', icon: BarChart3 },
          { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl'
                : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* CONTENIDO POR TAB */}
      {selectedTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CHAT CIENTÍFICO */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Brain className="w-6 h-6" />
                  </div>
                  Chat de Investigación
                </h3>
              </div>

              {/* Messages */}
              <div className="p-6 h-[500px] overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'bg-gray-50'} rounded-2xl p-4`}>
                      <p className={`text-sm leading-relaxed ${msg.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                        {msg.text}
                      </p>

                      {msg.type === 'agent' && msg.references && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.references.map((ref) => (
                            <span key={ref} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                              [{ref}]
                            </span>
                          ))}
                        </div>
                      )}

                      {msg.type === 'agent' && msg.evidenceLevel && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`px-3 py-1 ${getEvidenceBadgeColor(msg.evidenceLevel)} text-white text-xs font-bold rounded-full`}>
                            Evidencia {msg.evidenceLevel}
                          </div>
                        </div>
                      )}

                      {msg.type === 'agent' && msg.expandedExplanation && (
                        <div className="mt-3">
                          <button
                            onClick={() => setExpandedMessage(expandedMessage === msg.id ? null : msg.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            {expandedMessage === msg.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            Explicación técnica
                          </button>
                          {expandedMessage === msg.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-2 p-3 bg-white rounded-xl text-xs text-gray-700 border border-gray-200"
                            >
                              {msg.expandedExplanation}
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Pregunta sobre fisiología, nutrición, ejercicio..."
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* ANÁLISIS TÉCNICO - GRÁFICOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  Análisis Técnico
                </h3>
              </div>

              <div className="p-6 space-y-8">
                {/* Gráfico de Curvas de Adaptación */}
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    Curvas de Adaptación al Entrenamiento
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={adaptationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="semana" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="fuerza" stroke="#8b5cf6" strokeWidth={3} name="Fuerza (%)" />
                      <Line type="monotone" dataKey="hipertrofia" stroke="#3b82f6" strokeWidth={3} name="Hipertrofia (%)" />
                      <Line type="monotone" dataKey="vo2max" stroke="#06b6d4" strokeWidth={3} name="VO2max (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico Dosis-Respuesta */}
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    Relación Dosis-Respuesta (Sets por Semana)
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={doseResponseData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="sets" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
                      <Bar dataKey="ganancia" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-sm text-gray-600 mt-3 italic">
                    * Ganancia de hipertrofia relativa. Note el punto de rendimiento decreciente después de ~20 sets.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* PANEL DE REFERENCIAS */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden sticky top-4"
            >
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  Referencias Citadas
                </h3>
              </div>

              <div className="p-6 space-y-4 max-h-[700px] overflow-y-auto">
                {studies.slice(0, 5).map((study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-indigo-600">[{index + 1}]</span>
                      <div className={`px-2 py-1 ${getEvidenceBadgeColor(study.evidenceLevel)} text-white text-xs font-bold rounded`}>
                        {study.evidenceLevel}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-gray-800 mb-2 leading-snug">
                      {study.title}
                    </h4>

                    <p className="text-xs text-gray-600 mb-2">
                      {study.authors} ({study.year})
                    </p>

                    <p className="text-xs text-gray-700 mb-3 italic">
                      {study.journal}
                    </p>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-white border border-indigo-300 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Ver DOI
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Botón exportar referencias */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Exportar Referencias (APA)
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* TAB: MITOS VS REALIDAD */}
      {selectedTab === 'mitos' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Validador de Mitos</h2>
                <p className="text-gray-600">Separando hechos de ficción con evidencia científica</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myths.map((myth, index) => (
                <motion.div
                  key={myth.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
                >
                  {/* Claim */}
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-bold text-gray-800 leading-snug">
                      {myth.claim}
                    </h3>
                  </div>

                  {/* Veredicto Badge */}
                  <div className="mb-4">
                    <div className={`inline-flex px-4 py-2 bg-gradient-to-r ${getVerdictBadgeColor(myth.verdict)} text-white text-sm font-bold rounded-full shadow-lg`}>
                      {myth.verdict === 'Verdadero' && <CheckCircle className="w-4 h-4 mr-2" />}
                      {myth.verdict === 'Falso' && <AlertTriangle className="w-4 h-4 mr-2" />}
                      {myth.verdict === 'Parcial' && <Scale className="w-4 h-4 mr-2" />}
                      {myth.verdict}
                    </div>
                  </div>

                  {/* Explicación */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {myth.explanation}
                  </p>

                  {/* Referencias */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-gray-500">Referencias:</span>
                    {myth.references.map((ref) => (
                      <span key={ref} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                        [{ref}]
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB: COMPARADOR DE PROTOCOLOS */}
      {selectedTab === 'comparador' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Comparador de Protocolos</h2>
              <p className="text-gray-600">Análisis comparativo basado en evidencia científica</p>
            </div>
          </div>

          {/* Tabla comparativa */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Protocolo</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Eficacia</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Adherencia</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Riesgos</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Recomendación</th>
                </tr>
              </thead>
              <tbody>
                {protocols.map((protocol, index) => (
                  <motion.tr
                    key={protocol.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-indigo-500" />
                        <span className="font-bold text-gray-800">{protocol.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        {protocol.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${protocol.efficacy}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                          ></motion.div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{protocol.efficacy}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${protocol.adherence}%` }}
                            transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                          ></motion.div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{protocol.adherence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-600 max-w-xs">{protocol.risks}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-700 max-w-xs italic">{protocol.recommendations}</p>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notas al pie */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Nota Metodológica</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Los porcentajes de eficacia se basan en meta-análisis y revisiones sistemáticas.
                  La adherencia refleja tasas reportadas en estudios a largo plazo (>6 meses).
                  Las recomendaciones consideran contexto individual, objetivos y preferencias personales.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB: BIBLIOTECA DE ESTUDIOS */}
      {selectedTab === 'biblioteca' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Biblioteca de Estudios</h2>
                <p className="text-gray-600">Base de datos curada de investigación científica</p>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar estudios..."
                className="pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg">
              <Filter className="w-4 h-4" />
              Todos
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Fuerza
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Hipertrofia
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Nutrición
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Recuperación
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Evidencia Alta
            </button>
          </div>

          {/* Grid de estudios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Header con nivel de evidencia */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 ${getEvidenceBadgeColor(study.evidenceLevel)} text-white text-xs font-bold rounded-full`}>
                    {study.evidenceLevel}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{study.year}</span>
                </div>

                {/* Título */}
                <h3 className="text-base font-bold text-gray-800 mb-3 leading-snug line-clamp-2">
                  {study.title}
                </h3>

                {/* Autores y Journal */}
                <p className="text-xs text-gray-600 mb-1">{study.authors}</p>
                <p className="text-xs text-gray-700 italic mb-4">{study.journal}</p>

                {/* Summary */}
                <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                  {study.summary}
                </p>

                {/* Acciones */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Ver Completo
                  </button>
                  <button className="px-3 py-2 border-2 border-indigo-300 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-50 transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-8 flex justify-center gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold">
              1
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-1">
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AgenteCientificoPage;
