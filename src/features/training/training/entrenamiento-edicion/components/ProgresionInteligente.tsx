import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Brain, Zap, Target, Dumbbell, Clock, 
  CheckCircle, AlertTriangle, ArrowRight, Sparkles,
  BarChart3, Activity, Heart, Flame, Award, Settings
} from 'lucide-react';
import { Ejercicio, MetricasEntrenamiento } from '../types';

interface ProgresionInteligenteProps {
  ejercicios: Ejercicio[];
  metricasActuales: MetricasEntrenamiento;
  metricasAnteriores: MetricasEntrenamiento;
  objetivos: any;
  onAplicarProgresion?: (ejercicioId: string, cambios: CambioProgresion) => void;
  onRechazarProgresion?: (ejercicioId: string) => void;
  onPersonalizarProgresion?: (ejercicioId: string, configuracion: ConfiguracionProgresion) => void;
}

interface CambioProgresion {
  tipo: 'peso' | 'repeticiones' | 'series' | 'intensidad';
  valorAnterior: number;
  valorNuevo: number;
  incremento: number;
  razon: string;
}

interface ConfiguracionProgresion {
  agresividad: 'conservadora' | 'moderada' | 'agresiva';
  tipoProgresion: 'lineal' | 'ondulada' | 'escalonada';
  frecuencia: 'semanal' | 'quincenal' | 'mensual';
}

interface RecomendacionIA {
  id: string;
  ejercicioId: string;
  ejercicioNombre: string;
  tipo: 'incremento' | 'decremento' | 'mantener';
  cambios: CambioProgresion[];
  confianza: number;
  razon: string;
  beneficios: string[];
  riesgos: string[];
  alternativa?: string;
}

const ProgresionInteligente: React.FC<ProgresionInteligenteProps> = ({
  ejercicios,
  metricasActuales,
  metricasAnteriores,
  objetivos,
  onAplicarProgresion,
  onRechazarProgresion,
  onPersonalizarProgresion
}) => {
  const [recomendaciones, setRecomendaciones] = useState<RecomendacionIA[]>([]);
  const [cargando, setCargando] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>('todas');
  const [recomendacionesAplicadas, setRecomendacionesAplicadas] = useState<Set<string>>(new Set());

  // Simular análisis de IA
  useEffect(() => {
    setCargando(true);
    
    // Simular delay de análisis
    setTimeout(() => {
      const nuevasRecomendaciones: RecomendacionIA[] = [
        {
          id: '1',
          ejercicioId: 'sentadilla',
          ejercicioNombre: 'Sentadilla',
          tipo: 'incremento',
          cambios: [
            {
              tipo: 'peso',
              valorAnterior: 80,
              valorNuevo: 82.5,
              incremento: 2.5,
              razon: 'Rendimiento consistente en las últimas 3 sesiones'
            }
          ],
          confianza: 0.92,
          razon: 'Tu rendimiento en sentadilla ha sido consistente y puedes incrementar el peso',
          beneficios: ['Mayor estímulo muscular', 'Progresión sostenible', 'Mejora de fuerza'],
          riesgos: ['Riesgo mínimo si mantienes la técnica']
        },
        {
          id: '2',
          ejercicioId: 'press-banca',
          ejercicioNombre: 'Press de Banca',
          tipo: 'incremento',
          cambios: [
            {
              tipo: 'repeticiones',
              valorAnterior: 8,
              valorNuevo: 10,
              incremento: 2,
              razon: 'Completaste todas las series con facilidad'
            }
          ],
          confianza: 0.85,
          razon: 'Has completado todas las series con facilidad, puedes incrementar las repeticiones',
          beneficios: ['Mayor volumen de entrenamiento', 'Mejora de resistencia muscular'],
          riesgos: ['Fatiga adicional', 'Posible reducción de intensidad']
        },
        {
          id: '3',
          ejercicioId: 'peso-muerto',
          ejercicioNombre: 'Peso Muerto',
          tipo: 'mantener',
          cambios: [],
          confianza: 0.78,
          razon: 'El peso actual es óptimo para tu nivel de desarrollo',
          beneficios: ['Consolidación de la técnica', 'Prevención de lesiones'],
          riesgos: ['Progresión más lenta']
        }
      ];
      
      setRecomendaciones(nuevasRecomendaciones);
      setCargando(false);
    }, 2000);
  }, [ejercicios, metricasActuales, metricasAnteriores]);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'incremento':
        return 'text-green-600 bg-green-100';
      case 'decremento':
        return 'text-red-600 bg-red-100';
      case 'mantener':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfianzaColor = (confianza: number) => {
    if (confianza >= 0.9) return 'text-green-600';
    if (confianza >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAplicarRecomendacion = (recomendacion: RecomendacionIA) => {
    setRecomendacionesAplicadas(prev => new Set([...prev, recomendacion.id]));
    recomendacion.cambios.forEach(cambio => {
      onAplicarProgresion?.(recomendacion.ejercicioId, cambio);
    });
  };

  const handleRechazarRecomendacion = (recomendacion: RecomendacionIA) => {
    onRechazarProgresion?.(recomendacion.ejercicioId);
  };

  const recomendacionesFiltradas = recomendaciones.filter(rec => {
    if (filtroTipo === 'todas') return true;
    return rec.tipo === filtroTipo;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Progresión Inteligente</h3>
            <p className="text-gray-600">IA analiza tu rendimiento y sugiere mejoras</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {['todas', 'incremento', 'decremento', 'mantener'].map(tipo => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                  filtroTipo === tipo
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Estado de carga */}
      {cargando && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Analizando tu rendimiento...</h4>
          <p className="text-gray-600">La IA está evaluando tus métricas para generar recomendaciones personalizadas.</p>
        </motion.div>
      )}

      {/* Recomendaciones */}
      <AnimatePresence>
        {!cargando && (
          <div className="space-y-4">
            {recomendacionesFiltradas.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Perfecto!</h3>
                <p className="text-gray-600">Tu entrenamiento está optimizado. No hay recomendaciones en este momento.</p>
              </motion.div>
            ) : (
              recomendacionesFiltradas.map((recomendacion, index) => (
                <motion.div
                  key={recomendacion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${
                    recomendacionesAplicadas.has(recomendacion.id) ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icono del tipo */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      recomendacion.tipo === 'incremento' ? 'bg-green-100' :
                      recomendacion.tipo === 'decremento' ? 'bg-red-100' :
                      'bg-blue-100'
                    }`}>
                      {recomendacion.tipo === 'incremento' ? (
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      ) : recomendacion.tipo === 'decremento' ? (
                        <TrendingUp className="w-6 h-6 text-red-600 rotate-180" />
                      ) : (
                        <Target className="w-6 h-6 text-blue-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Header de la recomendación */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {recomendacion.ejercicioNombre}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTipoColor(recomendacion.tipo)}`}>
                              {recomendacion.tipo.charAt(0).toUpperCase() + recomendacion.tipo.slice(1)}
                            </span>
                            <span className={`text-sm font-semibold ${getConfianzaColor(recomendacion.confianza)}`}>
                              {Math.round(recomendacion.confianza * 100)}% confianza
                            </span>
                          </div>
                        </div>
                        
                        {recomendacion.confianza >= 0.9 && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-semibold">Recomendado</span>
                          </div>
                        )}
                      </div>

                      {/* Razón de la recomendación */}
                      <p className="text-gray-700 mb-4">{recomendacion.razon}</p>

                      {/* Cambios específicos */}
                      {recomendacion.cambios.length > 0 && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <h5 className="font-semibold text-gray-900 mb-3">Cambios Sugeridos:</h5>
                          <div className="space-y-2">
                            {recomendacion.cambios.map((cambio, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    {cambio.tipo === 'peso' ? <Dumbbell className="w-4 h-4 text-blue-600" /> :
                                     cambio.tipo === 'repeticiones' ? <Target className="w-4 h-4 text-blue-600" /> :
                                     cambio.tipo === 'series' ? <BarChart3 className="w-4 h-4 text-blue-600" /> :
                                     <Activity className="w-4 h-4 text-blue-600" />}
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-900 capitalize">
                                      {cambio.tipo === 'peso' ? 'Peso' :
                                       cambio.tipo === 'repeticiones' ? 'Repeticiones' :
                                       cambio.tipo === 'series' ? 'Series' : 'Intensidad'}
                                    </span>
                                    <p className="text-sm text-gray-600">{cambio.razon}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">
                                    {cambio.valorAnterior} → {cambio.valorNuevo}
                                  </div>
                                  <div className="text-sm text-green-600 font-semibold">
                                    +{cambio.incremento}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Beneficios y riesgos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-green-50 rounded-xl p-4">
                          <h6 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Beneficios
                          </h6>
                          <ul className="space-y-1">
                            {recomendacion.beneficios.map((beneficio, idx) => (
                              <li key={idx} className="text-sm text-green-700">• {beneficio}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {recomendacion.riesgos.length > 0 && (
                          <div className="bg-red-50 rounded-xl p-4">
                            <h6 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              Consideraciones
                            </h6>
                            <ul className="space-y-1">
                              {recomendacion.riesgos.map((riesgo, idx) => (
                                <li key={idx} className="text-sm text-red-700">• {riesgo}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAplicarRecomendacion(recomendacion)}
                          disabled={recomendacionesAplicadas.has(recomendacion.id)}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Aplicar Cambios
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRechazarRecomendacion(recomendacion)}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Rechazar
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Personalizar
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Resumen de progresión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">Resumen de Progresión</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">+15%</div>
            <div className="text-sm text-gray-600">Incremento Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Ejercicios Optimizados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
            <div className="text-sm text-gray-600">Precisión de IA</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgresionInteligente;

