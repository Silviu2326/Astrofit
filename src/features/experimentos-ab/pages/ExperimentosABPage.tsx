import React, { useState } from 'react';
import { Plus, Play, Pause, BarChart3, Settings, Trash2, Copy } from 'lucide-react';
import { ABTestBuilder } from '../components/ABTestBuilder';
import { ABTestMetrics } from '../components/ABTestMetrics';
import { ABTestResults } from '../components/ABTestResults';
import { ABTest, ABTestVariant, ABTestStatus } from '../types';

export const ExperimentosABPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'running' | 'completed'>('all');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Estado del nuevo test
  const [newTest, setNewTest] = useState<Partial<ABTest>>({
    name: '',
    description: '',
    status: 'draft',
    variants: [],
    goals: [],
  });

  // Tests de ejemplo
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'Optimización de CTA Homepage',
      description: 'Test del botón principal en la página de inicio',
      status: 'running',
      variants: [
        {
          id: 'v1',
          name: 'Control - Botón Azul',
          description: 'Versión actual con botón azul',
          traffic: 50,
          content: {
            headline: 'Transforma tu Marketing con IA',
            description: 'Aumenta tus conversiones hasta 10x con nuestro agente de marketing impulsado por IA',
            buttonText: 'Comenzar Ahora',
            buttonColor: '#3b82f6',
          },
          isControl: true,
        },
        {
          id: 'v2',
          name: 'Variante - Botón Rojo',
          description: 'Nuevo diseño con botón rojo más llamativo',
          traffic: 50,
          content: {
            headline: 'Transforma tu Marketing con IA',
            description: 'Aumenta tus conversiones hasta 10x con nuestro agente de marketing impulsado por IA',
            buttonText: 'Prueba Gratis',
            buttonColor: '#ef4444',
          },
          isControl: false,
        },
      ],
      goals: [
        { id: 'g1', name: 'Registros', type: 'conversion' },
        { id: 'g2', name: 'Clicks en CTA', type: 'click' },
      ],
      createdAt: '2025-09-28',
      updatedAt: '2025-09-28',
      createdBy: 'admin',
    },
    {
      id: '2',
      name: 'Título de Landing Page',
      description: 'Test de diferentes propuestas de valor',
      status: 'completed',
      variants: [
        {
          id: 'v3',
          name: 'Control',
          traffic: 33,
          content: {
            headline: 'Marketing Automation Made Easy',
            buttonText: 'Get Started',
            buttonColor: '#8b5cf6',
          },
          isControl: true,
        },
        {
          id: 'v4',
          name: 'Variante A',
          traffic: 33,
          content: {
            headline: 'Grow Your Business 10x Faster',
            buttonText: 'Start Free Trial',
            buttonColor: '#8b5cf6',
          },
          isControl: false,
        },
        {
          id: 'v5',
          name: 'Variante B',
          traffic: 34,
          content: {
            headline: 'AI-Powered Marketing That Works',
            buttonText: 'Try It Free',
            buttonColor: '#8b5cf6',
          },
          isControl: false,
        },
      ],
      goals: [{ id: 'g3', name: 'Sign ups', type: 'conversion' }],
      result: {
        testId: '2',
        winner: 'v4',
        confidence: 95.3,
        metrics: [
          {
            variantId: 'v3',
            impressions: 8432,
            clicks: 421,
            conversions: 84,
            revenue: 8400,
            engagementRate: 4.99,
            conversionRate: 19.95,
            confidenceLevel: 92,
            uplift: 0,
          },
          {
            variantId: 'v4',
            impressions: 8521,
            clicks: 512,
            conversions: 128,
            revenue: 12800,
            engagementRate: 6.01,
            conversionRate: 25.0,
            confidenceLevel: 95.3,
            uplift: 25.31,
          },
          {
            variantId: 'v5',
            impressions: 8398,
            clicks: 445,
            conversions: 96,
            revenue: 9600,
            engagementRate: 5.30,
            conversionRate: 21.57,
            confidenceLevel: 88,
            uplift: 8.12,
          },
        ],
        startDate: '2025-09-15',
        endDate: '2025-09-25',
        duration: 10,
        totalSampleSize: 25351,
        statisticalSignificance: true,
      },
      createdAt: '2025-09-15',
      updatedAt: '2025-09-25',
      createdBy: 'admin',
    },
  ]);

  const filteredTests = tests.filter(test => {
    if (activeTab === 'all') return true;
    if (activeTab === 'running') return test.status === 'running';
    if (activeTab === 'completed') return test.status === 'completed';
    return true;
  });

  const selectedTestData = tests.find(t => t.id === selectedTest);

  const handleCreateTest = () => {
    if (!newTest.name || !newTest.variants || newTest.variants.length < 2) {
      alert('Por favor completa el nombre y crea al menos 2 variantes');
      return;
    }

    const test: ABTest = {
      id: `test-${Date.now()}`,
      name: newTest.name,
      description: newTest.description || '',
      status: 'draft',
      variants: newTest.variants,
      goals: newTest.goals || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
    };

    setTests([...tests, test]);
    setIsCreating(false);
    setNewTest({
      name: '',
      description: '',
      status: 'draft',
      variants: [],
      goals: [],
    });
  };

  const toggleTestStatus = (testId: string) => {
    setTests(tests.map(test => {
      if (test.id === testId) {
        return {
          ...test,
          status: test.status === 'running' ? 'paused' : 'running' as ABTestStatus,
        };
      }
      return test;
    }));
  };

  const deleteTest = (testId: string) => {
    if (confirm('¿Estás seguro de eliminar este test?')) {
      setTests(tests.filter(t => t.id !== testId));
      if (selectedTest === testId) setSelectedTest(null);
    }
  };

  const duplicateTest = (test: ABTest) => {
    const newTest: ABTest = {
      ...test,
      id: `test-${Date.now()}`,
      name: `${test.name} (Copia)`,
      status: 'draft',
      result: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTests([...tests, newTest]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                Experimentos A/B
              </h1>
              <p className="text-gray-400">
                Crea y gestiona tests A/B con métricas en tiempo real
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Nuevo Experimento
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-700">
            {[
              { key: 'all', label: 'Todos', count: tests.length },
              { key: 'running', label: 'En Ejecución', count: tests.filter(t => t.status === 'running').length },
              { key: 'completed', label: 'Completados', count: tests.filter(t => t.status === 'completed').length },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 font-medium transition-all ${
                  activeTab === tab.key
                    ? 'text-orange-400 border-b-2 border-orange-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Modal de creación */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Crear Nuevo Experimento</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Información básica */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre del Experimento *
                    </label>
                    <input
                      type="text"
                      value={newTest.name || ''}
                      onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                      placeholder="Ej: Test de CTA en Homepage"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={newTest.description || ''}
                      onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                      placeholder="Describe el objetivo de este experimento..."
                      rows={3}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Constructor de variantes */}
                <ABTestBuilder
                  variants={newTest.variants || []}
                  onVariantsChange={(variants) => setNewTest({ ...newTest, variants })}
                />

                {/* Botones */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateTest}
                    className="px-6 py-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all font-semibold"
                  >
                    Crear Experimento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de tests */}
        {!selectedTest ? (
          <div className="grid gap-6">
            {filteredTests.map(test => (
              <div
                key={test.id}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{test.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        test.status === 'running'
                          ? 'bg-green-500/20 text-green-400'
                          : test.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {test.status === 'running' ? 'En Ejecución' : test.status === 'completed' ? 'Completado' : 'Borrador'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{test.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{test.variants.length} variantes</span>
                      <span>•</span>
                      <span>Creado {new Date(test.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleTestStatus(test.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        test.status === 'running'
                          ? 'hover:bg-yellow-500/20 text-yellow-400'
                          : 'hover:bg-green-500/20 text-green-400'
                      }`}
                      title={test.status === 'running' ? 'Pausar' : 'Iniciar'}
                    >
                      {test.status === 'running' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => duplicateTest(test)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      title="Duplicar"
                    >
                      <Copy className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setSelectedTest(test.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => deleteTest(test.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Mini preview de variantes */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {test.variants.map((variant, idx) => (
                    <div key={variant.id} className="bg-gray-900/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-sm text-white font-medium truncate">{variant.name}</span>
                      </div>
                      <div className="text-xs text-gray-400">Tráfico: {variant.traffic}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filteredTests.length === 0 && (
              <div className="text-center py-16">
                <Settings className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No hay experimentos {activeTab !== 'all' && activeTab}</p>
                <p className="text-gray-500 text-sm">Crea tu primer experimento A/B para comenzar</p>
              </div>
            )}
          </div>
        ) : (
          // Vista detallada del test
          <div className="space-y-6">
            <button
              onClick={() => setSelectedTest(null)}
              className="text-gray-400 hover:text-white flex items-center gap-2 mb-4"
            >
              ← Volver a la lista
            </button>

            {selectedTestData && (
              <>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedTestData.name}</h2>
                      <p className="text-gray-400">{selectedTestData.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleTestStatus(selectedTestData.id)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                          selectedTestData.status === 'running'
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        {selectedTestData.status === 'running' ? (
                          <>
                            <Pause className="w-4 h-4" />
                            Pausar Test
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Iniciar Test
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Métricas en tiempo real */}
                <ABTestMetrics
                  variants={selectedTestData.variants}
                  testId={selectedTestData.id}
                  isRunning={selectedTestData.status === 'running'}
                />

                {/* Resultados (si el test está completado) */}
                {selectedTestData.result && (
                  <ABTestResults
                    result={selectedTestData.result}
                    variants={selectedTestData.variants}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
