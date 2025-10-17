import React, { useState, useEffect } from 'react';
import { AnalisisFlujo, Recomendacion, analisisPredictivoApi } from '../analisisPredictivoApi';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  Zap, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Brain,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface DashboardAnalisisProps {
  flujoId: string;
}

export const DashboardAnalisis: React.FC<DashboardAnalisisProps> = ({ flujoId }) => {
  const [analisis, setAnalisis] = useState<AnalisisFlujo | null>(null);
  const [loading, setLoading] = useState(true);
  const [recomendacionesAplicadas, setRecomendacionesAplicadas] = useState<string[]>([]);

  useEffect(() => {
    cargarAnalisis();
  }, [flujoId]);

  const cargarAnalisis = async () => {
    try {
      setLoading(true);
      const data = await analisisPredictivoApi.obtenerAnalisisFlujo(flujoId);
      setAnalisis(data);
      
      // Cargar recomendaciones aplicadas
      const aplicadas = JSON.parse(localStorage.getItem('recomendacionesAplicadas') || '[]');
      setRecomendacionesAplicadas(aplicadas.map((r: any) => r.id));
    } catch (error) {
      console.error('Error al cargar análisis:', error);
    } finally {
      setLoading(false);
    }
  };

  const aplicarRecomendacion = async (recomendacionId: string) => {
    try {
      await analisisPredictivoApi.aplicarRecomendacion(recomendacionId);
      setRecomendacionesAplicadas(prev => [...prev, recomendacionId]);
    } catch (error) {
      console.error('Error al aplicar recomendación:', error);
    }
  };

  const getRiesgoColor = (riesgo: string) => {
    switch (riesgo) {
      case 'bajo': return 'text-green-600 bg-green-50';
      case 'medio': return 'text-yellow-600 bg-yellow-50';
      case 'alto': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'alto': return 'text-red-600 bg-red-50';
      case 'medio': return 'text-yellow-600 bg-yellow-50';
      case 'bajo': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'creciente': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'decreciente': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">Analizando flujo...</span>
      </div>
    );
  }

  if (!analisis) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">No se pudo cargar el análisis</h3>
        <p className="text-gray-600">Intenta nuevamente en unos momentos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa de Conversión</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(analisis.rendimiento.tasaConversion * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {getTendenciaIcon(analisis.tendencias.crecimiento > 0 ? 'creciente' : 'decreciente')}
            <span className="ml-1 text-sm text-gray-600">
              {Math.abs(analisis.tendencias.crecimiento).toFixed(1)}% vs mes anterior
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analisis.rendimiento.tiempoPromedio.toFixed(1)} días
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfacción</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(analisis.rendimiento.satisfaccion * 100).toFixed(0)}%
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nivel de Riesgo</p>
              <p className="text-2xl font-semibold text-gray-900 capitalize">
                {analisis.riesgo}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${getRiesgoColor(analisis.riesgo).split(' ')[1]}`}>
              <AlertCircle className={`w-6 h-6 ${getRiesgoColor(analisis.riesgo).split(' ')[0]}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Recomendaciones Inteligentes</h3>
              <p className="text-sm text-gray-600">Optimizaciones sugeridas por IA</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {analisis.recomendaciones.map((recomendacion) => {
              const isAplicada = recomendacionesAplicadas.includes(recomendacion.id);
              
              return (
                <div
                  key={recomendacion.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isAplicada 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-800">{recomendacion.titulo}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactoColor(recomendacion.impacto)}`}>
                          Impacto {recomendacion.impacto}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          Esfuerzo {recomendacion.esfuerzo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{recomendacion.descripcion}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Conversión esperada:</span>
                          <span className="ml-1 font-medium text-green-600">
                            +{(recomendacion.metricasEsperadas.conversion * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Retención esperada:</span>
                          <span className="ml-1 font-medium text-blue-600">
                            +{(recomendacion.metricasEsperadas.retencion * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Ingresos esperados:</span>
                          <span className="ml-1 font-medium text-purple-600">
                            +{(recomendacion.metricasEsperadas.ingresos * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {isAplicada ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Aplicada</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => aplicarRecomendacion(recomendacion.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <Zap className="w-4 h-4" />
                          <span>Aplicar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Oportunidades */}
      {analisis.oportunidades.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Oportunidades de Crecimiento</h3>
                <p className="text-sm text-gray-600">Potencial de mejora identificado</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {analisis.oportunidades.map((oportunidad) => (
                <div key={oportunidad.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{oportunidad.titulo}</h4>
                      <p className="text-sm text-gray-600 mt-1">{oportunidad.descripcion}</p>
                      
                      <div className="flex items-center space-x-4 mt-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Potencial:</span>
                          <span className="font-medium text-green-600">
                            {(oportunidad.potencial * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Segmento:</span>
                          <span className="font-medium text-blue-600">{oportunidad.segmento}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Timing:</span>
                          <span className="font-medium text-purple-600 capitalize">
                            {oportunidad.timing.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};






