import React, { useState, useEffect } from 'react';
import { DashboardAnalisis } from './components/DashboardAnalisis';
import { 
  Brain, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap,
  Target,
  Lightbulb,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export const AnalisisPredictivoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'segmentos' | 'predicciones' | 'recomendaciones'>('dashboard');
  const [flujoSeleccionado, setFlujoSeleccionado] = useState<string>('flujo_1');
  const [metricas, setMetricas] = useState({
    totalFlujos: 0,
    flujosActivos: 0,
    conversionPromedio: 0,
    satisfaccionPromedio: 0,
    recomendacionesAplicadas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMetricas();
  }, []);

  const cargarMetricas = async () => {
    try {
      setLoading(true);
      // Simular carga de métricas
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetricas({
        totalFlujos: 25,
        flujosActivos: 18,
        conversionPromedio: 0.28,
        satisfaccionPromedio: 0.82,
        recomendacionesAplicadas: 12
      });
    } catch (error) {
      console.error('Error al cargar métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'segmentos', label: 'Segmentos', icon: Users },
    { id: 'predicciones', label: 'Predicciones', icon: TrendingUp },
    { id: 'recomendaciones', label: 'Recomendaciones', icon: Lightbulb }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando análisis predictivo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Análisis Predictivo</h1>
                <p className="text-sm text-gray-600">IA para optimización de automatizaciones</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={flujoSeleccionado}
                onChange={(e) => setFlujoSeleccionado(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="flujo_1">Flujo de Onboarding</option>
                <option value="flujo_2">Flujo de Retención</option>
                <option value="flujo_3">Flujo de Upsell</option>
                <option value="flujo_4">Flujo de Reactivación</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Flujos</p>
                <p className="text-2xl font-semibold text-gray-900">{metricas.totalFlujos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Flujos Activos</p>
                <p className="text-2xl font-semibold text-gray-900">{metricas.flujosActivos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversión Promedio</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(metricas.conversionPromedio * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Satisfacción</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(metricas.satisfaccionPromedio * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recomendaciones Aplicadas</p>
                <p className="text-2xl font-semibold text-gray-900">{metricas.recomendacionesAplicadas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <DashboardAnalisis flujoId={flujoSeleccionado} />
            )}

            {activeTab === 'segmentos' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Segmentación Inteligente</h3>
                    <p className="text-sm text-gray-600">Análisis de comportamiento por segmentos</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">Clientes VIP</h4>
                        <p className="text-sm text-blue-600">Segmento de alto valor</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">LTV Promedio:</span>
                        <span className="font-medium text-blue-800">$2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Churn Rate:</span>
                        <span className="font-medium text-green-600">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Engagement:</span>
                        <span className="font-medium text-blue-800">85%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-orange-600 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-800">Clientes en Riesgo</h4>
                        <p className="text-sm text-orange-600">Requieren atención inmediata</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-orange-700">LTV Promedio:</span>
                        <span className="font-medium text-orange-800">$800</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Churn Rate:</span>
                        <span className="font-medium text-red-600">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Engagement:</span>
                        <span className="font-medium text-orange-800">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'predicciones' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Predicciones de IA</h3>
                    <p className="text-sm text-gray-600">Pronósticos basados en datos históricos</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Target className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Conversión Esperada</h4>
                        <p className="text-sm text-gray-600">Próximos 30 días</p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">28.5%</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span>+3.2% vs mes anterior</span>
                    </div>
                  </div>

                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Riesgo de Churn</h4>
                        <p className="text-sm text-gray-600">Clientes en peligro</p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-red-600 mb-2">12.3%</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span>+1.8% vs mes anterior</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recomendaciones' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Recomendaciones Inteligentes</h3>
                    <p className="text-sm text-gray-600">Optimizaciones sugeridas por IA</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-blue-600 rounded-lg">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-800">Automatizar Seguimiento Post-Compra</h4>
                            <p className="text-sm text-blue-600">Impacto Alto • Esfuerzo Medio</p>
                          </div>
                        </div>
                        <p className="text-sm text-blue-700 mb-4">
                          Crear flujo automático para clientes que completan compra, mejorando la experiencia y retención.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-blue-600">Conversión:</span>
                            <span className="ml-1 font-medium text-green-600">+20%</span>
                          </div>
                          <div>
                            <span className="text-blue-600">Retención:</span>
                            <span className="ml-1 font-medium text-green-600">+25%</span>
                          </div>
                          <div>
                            <span className="text-blue-600">Ingresos:</span>
                            <span className="ml-1 font-medium text-green-600">+30%</span>
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Aplicar</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-green-600 rounded-lg">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-green-800">Segmentar por Comportamiento</h4>
                            <p className="text-sm text-green-600">Impacto Medio • Esfuerzo Alto</p>
                          </div>
                        </div>
                        <p className="text-sm text-green-700 mb-4">
                          Crear segmentos basados en patrones de compra para personalizar mensajes.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-green-600">Conversión:</span>
                            <span className="ml-1 font-medium text-green-600">+12%</span>
                          </div>
                          <div>
                            <span className="text-green-600">Retención:</span>
                            <span className="ml-1 font-medium text-green-600">+18%</span>
                          </div>
                          <div>
                            <span className="text-green-600">Ingresos:</span>
                            <span className="ml-1 font-medium text-green-600">+22%</span>
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Aplicar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};






