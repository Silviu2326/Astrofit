import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Zap,
  Trophy,
  Calendar,
  CheckCircle2,
  Flame,
  Sparkles
} from 'lucide-react';

interface PlantillaObjetivo {
  id: string;
  nombre: string;
  descripcion: string;
  objetivo: string;
  icono: React.ReactNode;
  color: string;
  gradiente: string;
  calorias: number;
  macros: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  semanas: PlantillaSemana[];
}

interface PlantillaSemana {
  semana: number;
  nombre: string;
  descripcion: string;
  ajustes: string[];
}

interface PlantillasInteligentesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (plantilla: PlantillaObjetivo, semana: number) => void;
  clienteObjetivo?: string;
}

// Plantillas predefinidas
const PLANTILLAS: PlantillaObjetivo[] = [
  {
    id: 'perdida-peso',
    nombre: 'Pérdida de Peso',
    descripcion: 'Déficit calórico progresivo con alta saciedad',
    objetivo: 'perdida_peso',
    icono: <TrendingDown className="w-6 h-6" />,
    color: 'from-red-500 to-orange-500',
    gradiente: 'bg-gradient-to-br from-red-500 to-orange-500',
    calorias: 1800,
    macros: {
      proteinas: 150,
      carbohidratos: 120,
      grasas: 70
    },
    semanas: [
      {
        semana: 1,
        nombre: 'Semana de Adaptación',
        descripcion: 'Introducción suave al déficit',
        ajustes: ['2000 kcal', 'Déficit leve (-300 kcal)', 'Alta fibra', '5 comidas/día']
      },
      {
        semana: 2,
        nombre: 'Semana de Intensificación',
        descripcion: 'Aumento progresivo del déficit',
        ajustes: ['1800 kcal', 'Déficit moderado (-500 kcal)', 'Proteína alta', 'Carb cycling']
      },
      {
        semana: 3,
        nombre: 'Semana Sostenida',
        descripcion: 'Mantenimiento del ritmo',
        ajustes: ['1800 kcal', 'Mismos macros', 'Variedad de recetas', 'Refeed 1 día']
      },
      {
        semana: 4,
        nombre: 'Semana de Consolidación',
        descripcion: 'Estabilización antes de continuar',
        ajustes: ['1900 kcal', 'Mantenimiento', 'Reintroducción carbos', 'Preparar siguiente fase']
      }
    ]
  },
  {
    id: 'ganancia-muscular',
    nombre: 'Ganancia Muscular',
    descripcion: 'Superávit calórico con timing de nutrientes',
    objetivo: 'ganancia_muscular',
    icono: <TrendingUp className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    gradiente: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    calorias: 2800,
    macros: {
      proteinas: 180,
      carbohidratos: 320,
      grasas: 90
    },
    semanas: [
      {
        semana: 1,
        nombre: 'Fase de Volumen Inicial',
        descripcion: 'Establecer nuevo set point calórico',
        ajustes: ['2600 kcal', 'Superávit +200', '2g/kg proteína', 'Carbos pre/post entreno']
      },
      {
        semana: 2,
        nombre: 'Fase de Carga',
        descripcion: 'Maximizar síntesis proteica',
        ajustes: ['2800 kcal', 'Superávit +400', '2.2g/kg proteína', '6 comidas/día']
      },
      {
        semana: 3,
        nombre: 'Fase de Volumen Sostenido',
        descripcion: 'Mantener ganancia limpia',
        ajustes: ['2800 kcal', 'Mismos macros', 'Timing óptimo', 'Controlar grasa corporal']
      },
      {
        semana: 4,
        nombre: 'Semana de Mini-Cut',
        descripcion: 'Reducción ligera para control',
        ajustes: ['2400 kcal', 'Mantenimiento', 'Reducir carbos 20%', 'Preservar músculo']
      }
    ]
  },
  {
    id: 'definicion',
    nombre: 'Definición Muscular',
    descripcion: 'Pérdida de grasa preservando músculo',
    objetivo: 'definicion',
    icono: <Activity className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    gradiente: 'bg-gradient-to-br from-purple-500 to-pink-500',
    calorias: 2000,
    macros: {
      proteinas: 180,
      carbohidratos: 150,
      grasas: 65
    },
    semanas: [
      {
        semana: 1,
        nombre: 'Semana de Transición',
        descripcion: 'De volumen a definición',
        ajustes: ['2200 kcal', 'Déficit leve', 'Proteína muy alta', 'Reducir grasas']
      },
      {
        semana: 2,
        nombre: 'Fase de Definición Activa',
        descripcion: 'Máxima quema de grasa',
        ajustes: ['2000 kcal', 'Déficit -400', 'Carb cycling', 'Refeeds estratégicos']
      },
      {
        semana: 3,
        nombre: 'Fase Pre-Competición',
        descripcion: 'Ajuste fino de composición',
        ajustes: ['1900 kcal', 'Déficit intenso', 'Carbos bajos', 'Día trampa controlado']
      },
      {
        semana: 4,
        nombre: 'Semana Peak Week',
        descripcion: 'Maximizar definición visual',
        ajustes: ['Variable', 'Depleción/carga', 'Manipulación agua/sodio', 'Timing perfecto']
      }
    ]
  },
  {
    id: 'rendimiento',
    nombre: 'Rendimiento Deportivo',
    descripcion: 'Optimización para atletas de resistencia',
    objetivo: 'rendimiento',
    icono: <Zap className="w-6 h-6" />,
    color: 'from-yellow-500 to-amber-500',
    gradiente: 'bg-gradient-to-br from-yellow-500 to-amber-500',
    calorias: 3200,
    macros: {
      proteinas: 140,
      carbohidratos: 450,
      grasas: 100
    },
    semanas: [
      {
        semana: 1,
        nombre: 'Base de Entrenamiento',
        descripcion: 'Construcción de resistencia',
        ajustes: ['3000 kcal', 'Carbos moderados', '60% carbos', 'Hidratación óptima']
      },
      {
        semana: 2,
        nombre: 'Intensificación',
        descripcion: 'Aumentar volumen de entreno',
        ajustes: ['3200 kcal', 'Carbos altos', '65% carbos', 'Suplementación intra-entreno']
      },
      {
        semana: 3,
        nombre: 'Semana de Carga',
        descripcion: 'Máximo aporte energético',
        ajustes: ['3400 kcal', 'Carb loading', '70% carbos', 'Timing de nutrientes']
      },
      {
        semana: 4,
        nombre: 'Semana de Competición',
        descripcion: 'Peak de rendimiento',
        ajustes: ['Variable', 'Carb loading tapering', 'Estrategia de carrera', 'Recovery optimizado']
      }
    ]
  },
  {
    id: 'salud',
    nombre: 'Salud General',
    descripcion: 'Balance nutricional y sostenibilidad',
    objetivo: 'salud_general',
    icono: <Heart className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    gradiente: 'bg-gradient-to-br from-green-500 to-emerald-500',
    calorias: 2200,
    macros: {
      proteinas: 120,
      carbohidratos: 250,
      grasas: 75
    },
    semanas: [
      {
        semana: 1,
        nombre: 'Establecer Hábitos',
        descripcion: 'Crear rutina sostenible',
        ajustes: ['2200 kcal', 'Balance 40/30/30', 'Variedad amplia', '5 frutas/verduras']
      },
      {
        semana: 2,
        nombre: 'Optimización Digestiva',
        descripcion: 'Mejorar salud intestinal',
        ajustes: ['2200 kcal', 'Alta fibra', 'Probióticos', 'Antiinflamatorios naturales']
      },
      {
        semana: 3,
        nombre: 'Energía Sostenida',
        descripcion: 'Estabilizar glucosa',
        ajustes: ['2200 kcal', 'Bajo IG', 'Grasas saludables', 'Comidas regulares']
      },
      {
        semana: 4,
        nombre: 'Longevidad',
        descripcion: 'Nutrientes esenciales',
        ajustes: ['2200 kcal', 'Arco iris de colores', 'Omega-3', 'Antioxidantes']
      }
    ]
  },
  {
    id: 'recomposicion',
    nombre: 'Recomposición Corporal',
    descripcion: 'Ganar músculo y perder grasa simultáneamente',
    objetivo: 'recomposicion',
    icono: <Trophy className="w-6 h-6" />,
    color: 'from-indigo-500 to-violet-500',
    gradiente: 'bg-gradient-to-br from-indigo-500 to-violet-500',
    calorias: 2400,
    macros: {
      proteinas: 180,
      carbohidratos: 220,
      grasas: 75
    },
    semanas: [
      {
        semana: 1,
        nombre: 'Establecer Baseline',
        descripcion: 'Calibración metabólica',
        ajustes: ['2400 kcal', 'Mantenimiento', '2g/kg proteína', 'Días alternados entreno/descanso']
      },
      {
        semana: 2,
        nombre: 'Cycling de Calorías',
        descripcion: 'Alta/baja según entreno',
        ajustes: ['Días A: 2600 / Días B: 2200', 'Proteína constante', 'Carb cycling', 'Grasas inversas']
      },
      {
        semana: 3,
        nombre: 'Fase de Intensificación',
        descripcion: 'Maximizar partición de nutrientes',
        ajustes: ['2500 kcal prom', 'Timing preciso', 'Pre/post entreno', 'Déficit días descanso']
      },
      {
        semana: 4,
        nombre: 'Consolidación',
        descripcion: 'Estabilizar nuevos niveles',
        ajustes: ['2400 kcal', 'Balance sostenible', 'Evaluar composición', 'Ajustar siguiente fase']
      }
    ]
  }
];

export const PlantillasInteligentesModal: React.FC<PlantillasInteligentesModalProps> = ({
  isOpen,
  onClose,
  onApply,
  clienteObjetivo
}) => {
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaObjetivo | null>(null);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Plantillas Inteligentes</h2>
                  <p className="text-sm text-purple-100">Semanas prediseñadas por objetivo nutricional</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            {!plantillaSeleccionada ? (
              // Vista de selección de plantilla
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Selecciona un objetivo</h3>
                  <p className="text-sm text-gray-600">Cada plantilla incluye 4 semanas progresivas diseñadas por nutricionistas profesionales</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PLANTILLAS.map((plantilla) => (
                    <motion.button
                      key={plantilla.id}
                      onClick={() => setPlantillaSeleccionada(plantilla)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-left p-6 rounded-2xl border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all"
                    >
                      <div className={`w-12 h-12 rounded-xl ${plantilla.gradiente} flex items-center justify-center text-white mb-4`}>
                        {plantilla.icono}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{plantilla.nombre}</h4>
                      <p className="text-sm text-gray-600 mb-4">{plantilla.descripcion}</p>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Calorías base</span>
                          <span className="font-bold text-gray-900">{plantilla.calorias} kcal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="text-gray-600 mb-1">Proteínas</div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${(plantilla.macros.proteinas / 200) * 100}%` }}
                              />
                            </div>
                            <div className="text-gray-900 font-semibold mt-1">{plantilla.macros.proteinas}g</div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              // Vista de selección de semana
              <div className="p-6">
                <button
                  onClick={() => setPlantillaSeleccionada(null)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                  <span>←</span>
                  <span>Volver a plantillas</span>
                </button>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl ${plantillaSeleccionada.gradiente} flex items-center justify-center text-white`}>
                      {plantillaSeleccionada.icono}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plantillaSeleccionada.nombre}</h3>
                      <p className="text-sm text-gray-600">{plantillaSeleccionada.descripcion}</p>
                    </div>
                  </div>
                </div>

                {/* Macros objetivo */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                  <h4 className="text-sm font-bold text-gray-700 mb-4">Macros Base de la Plantilla</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Flame className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{plantillaSeleccionada.calorias}</div>
                      <div className="text-xs text-gray-600">kcal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-2">Proteínas</div>
                      <div className="text-2xl font-bold text-blue-600">{plantillaSeleccionada.macros.proteinas}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-2">Carbohidratos</div>
                      <div className="text-2xl font-bold text-amber-600">{plantillaSeleccionada.macros.carbohidratos}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-2">Grasas</div>
                      <div className="text-2xl font-bold text-purple-600">{plantillaSeleccionada.macros.grasas}g</div>
                    </div>
                  </div>
                </div>

                {/* Selección de semana */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Selecciona la semana a aplicar</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plantillaSeleccionada.semanas.map((semana) => (
                      <motion.button
                        key={semana.semana}
                        onClick={() => setSemanaSeleccionada(semana.semana)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`text-left p-6 rounded-2xl border-2 transition-all ${
                          semanaSeleccionada === semana.semana
                            ? 'border-indigo-500 bg-indigo-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${
                              semanaSeleccionada === semana.semana 
                                ? plantillaSeleccionada.gradiente 
                                : 'bg-gray-200'
                            } flex items-center justify-center text-white font-bold`}>
                              {semana.semana}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{semana.nombre}</div>
                              <div className="text-xs text-gray-600">{semana.descripcion}</div>
                            </div>
                          </div>
                          {semanaSeleccionada === semana.semana && (
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                          )}
                        </div>
                        
                        <div className="space-y-1.5">
                          {semana.ajustes.map((ajuste, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              <span className="text-indigo-600 mt-0.5">•</span>
                              <span className="text-gray-700">{ajuste}</span>
                            </div>
                          ))}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Nota informativa */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <div className="font-semibold mb-1">¿Cómo funciona?</div>
                      <div className="text-blue-700">
                        Al aplicar esta plantilla, se generará automáticamente una semana completa con recetas 
                        que cumplen los macros objetivo. Podrás personalizarla posteriormente según las preferencias 
                        del cliente.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {plantillaSeleccionada && (
            <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-between">
              <button
                onClick={() => setPlantillaSeleccionada(null)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={() => {
                  onApply(plantillaSeleccionada, semanaSeleccionada);
                  onClose();
                }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Aplicar Semana {semanaSeleccionada}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};



