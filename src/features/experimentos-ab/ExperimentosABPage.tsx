import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical, Plus, TrendingUp, CheckCircle2, Calendar,
  ArrowUpRight, Play, Pause, Trophy, Sparkles, Crown,
  Image, Type, MousePointerClick, BarChart3, ArrowRight,
  Lock, Zap, TrendingDown, AlertCircle
} from 'lucide-react';

// Tier básico: Máximo 5 tests activos
const MAX_ACTIVE_TESTS = 5;

// Datos mockeados para tests activos
const mockActiveTests = [
  {
    id: '1',
    name: 'Test Headline Homepage',
    type: 'Headline',
    status: 'active',
    startDate: '2025-01-15',
    variantA: { name: 'Original', conversion: 3.2, visitors: 1240 },
    variantB: { name: 'Nueva versión', conversion: 4.1, visitors: 1198 },
    confidence: 78,
    daysRunning: 8
  },
  {
    id: '2',
    name: 'Color CTA Principal',
    type: 'CTA',
    status: 'active',
    startDate: '2025-01-20',
    variantA: { name: 'Azul', conversion: 5.5, visitors: 890 },
    variantB: { name: 'Verde', conversion: 6.8, visitors: 912 },
    confidence: 85,
    daysRunning: 3
  },
  {
    id: '3',
    name: 'Imagen Hero Principal',
    type: 'Imagen',
    status: 'active',
    startDate: '2025-01-18',
    variantA: { name: 'Persona', conversion: 4.0, visitors: 1050 },
    variantB: { name: 'Producto', conversion: 3.8, visitors: 1072 },
    confidence: 45,
    daysRunning: 5
  }
];

// Datos mockeados para historial
const mockHistory = [
  {
    id: 'h1',
    name: 'Test de Título Motivacional',
    winner: 'Variante B',
    improvement: 28,
    date: '2025-01-10'
  },
  {
    id: 'h2',
    name: 'Botón "Comenzar" vs "Empezar"',
    winner: 'Variante A',
    improvement: 12,
    date: '2025-01-05'
  },
  {
    id: 'h3',
    name: 'Imagen Producto en Hero',
    winner: 'Variante B',
    improvement: 35,
    date: '2024-12-28'
  },
  {
    id: 'h4',
    name: 'Color de CTA Secundario',
    winner: 'Variante A',
    improvement: 8,
    date: '2024-12-20'
  },
  {
    id: 'h5',
    name: 'Headline de Landing Page',
    winner: 'Variante B',
    improvement: 22,
    date: '2024-12-15'
  }
];

// Templates predefinidos
const mockTemplates = [
  {
    id: 't1',
    name: 'Test de Headline Motivacional',
    type: 'Headline',
    variantA: 'Alcanza tus metas hoy',
    variantB: '¡Comienza tu transformación ahora!'
  },
  {
    id: 't2',
    name: 'Test de CTA Color',
    type: 'CTA',
    variantA: 'Botón Azul',
    variantB: 'Botón Verde'
  },
  {
    id: 't3',
    name: 'Test de Imagen Hero',
    type: 'Imagen',
    variantA: 'Imagen de Persona',
    variantB: 'Imagen de Producto'
  }
];

type ViewMode = 'dashboard' | 'create' | 'results';

export function ExperimentosABPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState(1);

  // Stats básicas
  const stats = {
    active: mockActiveTests.length,
    completed: mockHistory.length,
    bestImprovement: Math.max(...mockHistory.map(h => h.improvement)),
    thisMonth: 2
  };

  const canCreateNew = mockActiveTests.length < MAX_ACTIVE_TESTS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <FlaskConical className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Experimentos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">A/B</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Optimiza con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tests simples</span> y efectivos
          </p>

          {/* Badge de limitación tier básico */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Lock className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Máximo {MAX_ACTIVE_TESTS} tests activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Solo 2 variantes A/B</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Play,
            title: 'Tests Activos',
            value: stats.active,
            color: 'from-orange-500 to-amber-600',
            bgColor: 'from-orange-500 to-amber-600'
          },
          {
            icon: CheckCircle2,
            title: 'Tests Completados',
            value: stats.completed,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'from-green-500 to-emerald-600'
          },
          {
            icon: Trophy,
            title: 'Mejor Mejora',
            value: `${stats.bestImprovement}%`,
            color: 'from-yellow-500 to-amber-600',
            bgColor: 'from-yellow-500 to-amber-600'
          },
          {
            icon: Calendar,
            title: 'Tests Este Mes',
            value: stats.thisMonth,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'from-blue-500 to-indigo-600'
          }
        ].map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgColor} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <AnimatePresence mode="wait">
        {/* WIZARD DE CREACIÓN */}
        {viewMode === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-4xl mx-auto">
              {/* Header wizard */}
              <div className="mb-8">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-semibold"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Volver al Dashboard
                </button>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Crear Nuevo Test A/B</h2>

                  {/* Progress bar */}
                  <div className="flex items-center gap-4 mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                          wizardStep >= step
                            ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`flex-1 h-1 mx-2 ${
                            wizardStep > step ? 'bg-gradient-to-r from-orange-500 to-amber-600' : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm font-semibold text-gray-600 mb-8">
                    <span className={wizardStep === 1 ? 'text-orange-600' : ''}>¿Qué testear?</span>
                    <span className={wizardStep === 2 ? 'text-orange-600' : ''}>Crear variantes</span>
                    <span className={wizardStep === 3 ? 'text-orange-600' : ''}>Lanzar test</span>
                  </div>

                  {/* Paso 1: ¿Qué quieres testear? */}
                  {wizardStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6">¿Qué quieres testear?</h3>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { type: 'headline', icon: Type, label: 'Headline (título)', desc: 'Prueba diferentes títulos' },
                          { type: 'cta', icon: MousePointerClick, label: 'Call-to-Action', desc: 'Prueba botones y CTAs' },
                          { type: 'image', icon: Image, label: 'Imagen Principal', desc: 'Prueba diferentes imágenes' }
                        ].map((option) => (
                          <button
                            key={option.type}
                            className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all text-left"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mb-3 shadow-lg">
                              <option.icon className="w-6 h-6" />
                            </div>
                            <p className="font-bold text-gray-900 mb-1">{option.label}</p>
                            <p className="text-sm text-gray-600">{option.desc}</p>
                          </button>
                        ))}
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Objetivo del test</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="p-4 bg-white rounded-xl border-2 border-orange-300 text-left hover:shadow-md transition-all">
                            <p className="font-bold text-gray-900">Clicks</p>
                            <p className="text-sm text-gray-600">Medir clics en el elemento</p>
                          </button>
                          <button className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-orange-300 text-left hover:shadow-md transition-all">
                            <p className="font-bold text-gray-900">Conversiones</p>
                            <p className="text-sm text-gray-600">Medir conversiones finales</p>
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => setWizardStep(2)}
                          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl transition-all"
                        >
                          Siguiente
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Paso 2: Crear variantes */}
                  {wizardStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Crea tus variantes</h3>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Variante A */}
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-300">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                              VARIANTE A
                            </div>
                            <span className="text-sm text-gray-600">(Original)</span>
                          </div>

                          <label className="block text-sm font-bold text-gray-700 mb-2">Texto del headline</label>
                          <textarea
                            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white/80 backdrop-blur-sm mb-4"
                            rows={3}
                            placeholder="Ej: Alcanza tus metas hoy"
                          />

                          <div className="p-4 bg-white rounded-xl border border-blue-200">
                            <p className="text-xs font-semibold text-gray-500 mb-2">PREVIEW</p>
                            <p className="text-lg font-bold text-gray-900">Alcanza tus metas hoy</p>
                          </div>
                        </div>

                        {/* Variante B */}
                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                              VARIANTE B
                            </div>
                            <span className="text-sm text-gray-600">(Nueva)</span>
                          </div>

                          <label className="block text-sm font-bold text-gray-700 mb-2">Texto del headline</label>
                          <textarea
                            className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-white/80 backdrop-blur-sm mb-4"
                            rows={3}
                            placeholder="Ej: ¡Comienza tu transformación ahora!"
                          />

                          <div className="p-4 bg-white rounded-xl border border-green-200">
                            <p className="text-xs font-semibold text-gray-500 mb-2">PREVIEW</p>
                            <p className="text-lg font-bold text-gray-900">¡Comienza tu transformación ahora!</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => setWizardStep(1)}
                          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          <ArrowRight className="w-5 h-5 rotate-180" />
                          Anterior
                        </button>
                        <button
                          onClick={() => setWizardStep(3)}
                          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl transition-all"
                        >
                          Siguiente
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Paso 3: Lanzar test */}
                  {wizardStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Confirmar y lanzar</h3>

                      <div className="space-y-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm font-semibold text-gray-600 mb-1">Tipo de test</p>
                          <p className="text-lg font-bold text-gray-900">Headline (título)</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm font-semibold text-gray-600 mb-1">Objetivo</p>
                          <p className="text-lg font-bold text-gray-900">Clicks</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Distribución de tráfico</p>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-blue-600">Variante A</span>
                                <span className="text-sm font-bold text-blue-600">50%</span>
                              </div>
                              <div className="w-full bg-blue-200 rounded-full h-2">
                                <div className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-green-600">Variante B</span>
                                <span className="text-sm font-bold text-green-600">50%</span>
                              </div>
                              <div className="w-full bg-green-200 rounded-full h-2">
                                <div className="w-1/2 h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                          <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-orange-600 mt-1" />
                            <div>
                              <p className="font-bold text-gray-900 mb-1">Duración recomendada</p>
                              <p className="text-sm text-gray-700">7-14 días para obtener resultados confiables</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => setWizardStep(2)}
                          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          <ArrowRight className="w-5 h-5 rotate-180" />
                          Anterior
                        </button>
                        <button
                          onClick={() => {
                            setViewMode('dashboard');
                            setWizardStep(1);
                          }}
                          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all hover:scale-105"
                        >
                          <Play className="w-5 h-5" />
                          Activar Test
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VISTA DE RESULTADOS */}
        {viewMode === 'results' && selectedTestId && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-5xl mx-auto">
              <button
                onClick={() => {
                  setViewMode('dashboard');
                  setSelectedTestId(null);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                Volver al Dashboard
              </button>

              {(() => {
                const test = mockActiveTests.find(t => t.id === selectedTestId);
                if (!test) return null;

                const winner = test.variantB.conversion > test.variantA.conversion ? 'B' : 'A';
                const improvement = ((test.variantB.conversion - test.variantA.conversion) / test.variantA.conversion * 100);

                return (
                  <>
                    {/* Header de resultados */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 mb-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">{test.name}</h2>
                          <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                              {test.type}
                            </div>
                            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              Activo - {test.daysRunning} días
                            </div>
                          </div>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-700 rounded-xl font-semibold hover:bg-red-100 transition-colors border border-red-200">
                          <Pause className="w-5 h-5" />
                          Pausar Test
                        </button>
                      </div>

                      {/* Recomendación */}
                      <div className={`p-6 rounded-2xl border-2 ${
                        test.confidence >= 90
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                          : test.confidence >= 70
                          ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300'
                          : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
                      }`}>
                        <div className="flex items-start gap-4">
                          {test.confidence >= 90 ? (
                            <Trophy className="w-8 h-8 text-green-600 flex-shrink-0" />
                          ) : test.confidence >= 70 ? (
                            <TrendingUp className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-lg font-bold text-gray-900 mb-2">
                              {test.confidence >= 90
                                ? `¡Variante ${winner} está ganando por ${Math.abs(improvement).toFixed(1)}%!`
                                : test.confidence >= 70
                                ? `Variante ${winner} va en la delantera`
                                : 'Continuar test para obtener más datos'
                              }
                            </p>
                            <p className="text-sm text-gray-700">
                              {test.confidence >= 90
                                ? 'Resultados confiables. Puedes aplicar el ganador con seguridad.'
                                : test.confidence >= 70
                                ? 'Continuar test 3-5 días más para aumentar confianza estadística.'
                                : 'No hay diferencia clara aún. Recomendamos esperar más tiempo o probar variantes más distintas.'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comparación A vs B (detallada) */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {/* Variante A */}
                      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
                        <div className="mb-6">
                          <div className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full inline-block mb-3">
                            VARIANTE A
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{test.variantA.name}</h3>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Tasa de Conversión</p>
                            <p className="text-5xl font-bold text-blue-600">{test.variantA.conversion}%</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-xl">
                              <p className="text-xs font-semibold text-gray-600 mb-1">Visitantes</p>
                              <p className="text-2xl font-bold text-gray-900">{test.variantA.visitors}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl">
                              <p className="text-xs font-semibold text-gray-600 mb-1">Conversiones</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {Math.round(test.variantA.visitors * test.variantA.conversion / 100)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Variante B */}
                      <div className={`backdrop-blur-xl rounded-3xl shadow-xl border p-6 ${
                        winner === 'B'
                          ? 'bg-green-50/80 border-green-300'
                          : 'bg-white/80 border-white/50'
                      }`}>
                        <div className="mb-6">
                          <div className={`px-4 py-2 text-white text-sm font-bold rounded-full inline-block mb-3 ${
                            winner === 'B' ? 'bg-green-600' : 'bg-gray-600'
                          }`}>
                            VARIANTE B {winner === 'B' && '🏆'}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{test.variantB.name}</h3>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Tasa de Conversión</p>
                            <p className={`text-5xl font-bold ${winner === 'B' ? 'text-green-600' : 'text-gray-600'}`}>
                              {test.variantB.conversion}%
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className={`p-4 rounded-xl ${winner === 'B' ? 'bg-green-100' : 'bg-gray-50'}`}>
                              <p className="text-xs font-semibold text-gray-600 mb-1">Visitantes</p>
                              <p className="text-2xl font-bold text-gray-900">{test.variantB.visitors}</p>
                            </div>
                            <div className={`p-4 rounded-xl ${winner === 'B' ? 'bg-green-100' : 'bg-gray-50'}`}>
                              <p className="text-xs font-semibold text-gray-600 mb-1">Conversiones</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {Math.round(test.variantB.visitors * test.variantB.conversion / 100)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gráfico simple de barras */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Comparación Visual</h3>

                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-blue-600">Variante A</span>
                            <span className="text-lg font-bold text-blue-600">{test.variantA.conversion}%</span>
                          </div>
                          <div className="w-full bg-blue-100 rounded-full h-12 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${test.variantA.conversion * 10}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-end pr-4"
                            >
                              <span className="text-white font-bold text-sm">{test.variantA.conversion}%</span>
                            </motion.div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-bold ${winner === 'B' ? 'text-green-600' : 'text-gray-600'}`}>
                              Variante B {winner === 'B' && '👑'}
                            </span>
                            <span className={`text-lg font-bold ${winner === 'B' ? 'text-green-600' : 'text-gray-600'}`}>
                              {test.variantB.conversion}%
                            </span>
                          </div>
                          <div className={`w-full rounded-full h-12 overflow-hidden ${
                            winner === 'B' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${test.variantB.conversion * 10}%` }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className={`h-full rounded-full flex items-center justify-end pr-4 ${
                                winner === 'B'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
                              }`}
                            >
                              <span className="text-white font-bold text-sm">{test.variantB.conversion}%</span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Nivel de confianza */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Nivel de Confianza Estadística</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${test.confidence}%` }}
                              transition={{ duration: 1.5, delay: 0.3 }}
                              className={`h-full rounded-full relative flex items-center justify-center ${
                                test.confidence >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                test.confidence >= 70 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                                'bg-gradient-to-r from-gray-400 to-gray-500'
                              }`}
                            >
                              <span className="text-white font-bold text-sm">{test.confidence}%</span>
                            </motion.div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900">{test.confidence}%</p>
                          <p className="text-sm text-gray-600">
                            {test.confidence >= 90 ? 'Muy confiable' : test.confidence >= 70 ? 'Moderado' : 'Bajo'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    {test.confidence >= 90 && (
                      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">¿Listo para aplicar el ganador?</h3>
                            <p className="text-green-100">
                              Variante {winner} tiene {test.confidence}% de confianza. Puedes aplicar estos cambios de forma segura.
                            </p>
                          </div>
                          <button className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                            Aplicar Variante {winner}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}

        {viewMode === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* TESTS ACTIVOS */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Tests Activos</h2>
                {canCreateNew ? (
                  <button
                    onClick={() => setViewMode('create')}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    Crear Test
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-red-50 text-red-700 rounded-xl font-semibold border border-red-200">
                      Límite alcanzado ({MAX_ACTIVE_TESTS}/{MAX_ACTIVE_TESTS})
                    </div>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300">
                      <Crown className="w-5 h-5" />
                      Upgrade a Pro
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {mockActiveTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 relative overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setSelectedTestId(test.id);
                      setViewMode('results');
                    }}
                  >
                    {/* Decoración */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{test.name}</h3>
                            <div className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                              {test.type}
                            </div>
                            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              Activo
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            Iniciado: {test.startDate} • {test.daysRunning} días corriendo
                          </p>
                        </div>

                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                          <Pause className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      {/* Comparación A vs B */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Variante A */}
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                          <p className="text-xs font-bold text-blue-600 uppercase mb-2">Variante A</p>
                          <p className="text-sm text-gray-700 font-semibold mb-3">{test.variantA.name}</p>
                          <div className="flex items-baseline gap-2 mb-1">
                            <p className="text-3xl font-bold text-blue-600">{test.variantA.conversion}%</p>
                            <p className="text-xs text-gray-600">conversión</p>
                          </div>
                          <p className="text-xs text-gray-500">{test.variantA.visitors} visitantes</p>
                        </div>

                        {/* Variante B */}
                        <div className={`p-4 rounded-2xl border ${
                          test.variantB.conversion > test.variantA.conversion
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                            : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'
                        }`}>
                          <p className={`text-xs font-bold uppercase mb-2 ${
                            test.variantB.conversion > test.variantA.conversion ? 'text-green-600' : 'text-gray-600'
                          }`}>Variante B</p>
                          <p className="text-sm text-gray-700 font-semibold mb-3">{test.variantB.name}</p>
                          <div className="flex items-baseline gap-2 mb-1">
                            <p className={`text-3xl font-bold ${
                              test.variantB.conversion > test.variantA.conversion ? 'text-green-600' : 'text-gray-600'
                            }`}>{test.variantB.conversion}%</p>
                            <p className="text-xs text-gray-600">conversión</p>
                          </div>
                          <p className="text-xs text-gray-500">{test.variantB.visitors} visitantes</p>
                        </div>
                      </div>

                      {/* Diferencia */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {test.variantB.conversion > test.variantA.conversion ? (
                            <>
                              <div className="p-1 bg-green-50 rounded-lg">
                                <ArrowUpRight className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-sm font-bold text-green-600">
                                Variante B está ganando por {((test.variantB.conversion - test.variantA.conversion) / test.variantA.conversion * 100).toFixed(1)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="p-1 bg-blue-50 rounded-lg">
                                <TrendingDown className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="text-sm font-bold text-blue-600">
                                Variante A está ganando
                              </span>
                            </>
                          )}
                        </div>

                        <button className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
                          Ver detalles
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Barra de confianza */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-gray-600 uppercase">Nivel de Confianza</p>
                          <p className="text-sm font-bold text-gray-900">{test.confidence}%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${test.confidence}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                            className={`h-full rounded-full relative ${
                              test.confidence >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                              test.confidence >= 70 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                              'bg-gradient-to-r from-gray-400 to-gray-500'
                            }`}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                          </motion.div>
                        </div>
                        {test.confidence < 70 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Continuar test 3-5 días más para resultados confiables
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* TEMPLATES PREDEFINIDOS */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Templates Listos para Usar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 relative overflow-hidden group cursor-pointer"
                    onClick={() => canCreateNew && setViewMode('create')}
                  >
                    {/* Decoración */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mb-4 shadow-lg">
                        {template.type === 'Headline' && <Type className="w-6 h-6" />}
                        {template.type === 'CTA' && <MousePointerClick className="w-6 h-6" />}
                        {template.type === 'Imagen' && <Image className="w-6 h-6" />}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>

                      <div className="space-y-2 mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <p className="text-xs font-semibold text-blue-600">A: {template.variantA}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                          <p className="text-xs font-semibold text-green-600">B: {template.variantB}</p>
                        </div>
                      </div>

                      {canCreateNew ? (
                        <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
                          Usar Template
                        </button>
                      ) : (
                        <div className="w-full py-2 bg-gray-200 text-gray-500 rounded-xl font-semibold text-sm text-center flex items-center justify-center gap-2">
                          <Lock className="w-4 h-4" />
                          Límite alcanzado
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* HISTORIAL BÁSICO */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Historial de Tests</h2>
                <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl text-sm font-semibold">
                  Últimos 10 tests
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-orange-500 to-amber-600">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Test</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Ganador</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Mejora</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockHistory.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="hover:bg-orange-50/50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm font-semibold text-gray-700">{item.winner}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-green-50 rounded-lg">
                                <ArrowUpRight className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-sm font-bold text-green-600">+{item.improvement}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{item.date}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* UPGRADE CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 border border-white/20"
            >
              {/* Decoración */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-8 h-8 text-yellow-300" />
                    <h3 className="text-2xl font-bold text-white">Upgrade a Plan Pro</h3>
                  </div>
                  <p className="text-lg text-indigo-100 mb-4">
                    Desbloquea tests ilimitados, multivariate testing y segmentación avanzada
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-white">
                      <Zap className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold">Tests ilimitados activos</span>
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <BarChart3 className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold">Multivariate testing (A/B/C/D)</span>
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <Target className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold">Segmentación de audiencia avanzada</span>
                    </li>
                  </ul>
                  <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                    Ver Planes Pro
                  </button>
                </div>

                <div className="hidden lg:block">
                  <div className="w-48 h-48 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 flex items-center justify-center">
                    <Crown className="w-32 h-32 text-yellow-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
