import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Target, Calendar, Dumbbell, TrendingUp, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { TrainingGoal, TrainingType, Level } from '../../types/training.types';

interface AIWorkoutGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (plan: any) => void;
}

interface GeneratorConfig {
  goal: TrainingGoal;
  daysPerWeek: number;
  duration: number; // semanas
  equipment: string[];
  level: Level;
  injuries: string[];
  preferences: string[];
}

const AIWorkoutGeneratorModal: React.FC<AIWorkoutGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerate
}) => {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [config, setConfig] = useState<GeneratorConfig>({
    goal: 'muscle',
    daysPerWeek: 4,
    duration: 8,
    equipment: ['barra', 'mancuernas', 'maquinas'],
    level: 'intermediate',
    injuries: [],
    preferences: []
  });

  const goals: { value: TrainingGoal; label: string; icon: string; description: string }[] = [
    { value: 'muscle', label: 'Ganar Músculo', icon: '💪', description: 'Hipertrofia y volumen muscular' },
    { value: 'strength', label: 'Ganar Fuerza', icon: '🏋️', description: 'Aumentar 1RM en levantamientos básicos' },
    { value: 'fat-loss', label: 'Perder Grasa', icon: '🔥', description: 'Déficit calórico + entrenamiento metabólico' },
    { value: 'endurance', label: 'Resistencia', icon: '🏃', description: 'Capacidad aeróbica y anaeróbica' },
    { value: 'performance', label: 'Rendimiento', icon: '⚡', description: 'Optimización deportiva específica' },
    { value: 'rehab', label: 'Rehabilitación', icon: '🩹', description: 'Recuperación post-lesión' },
  ];

  const equipmentOptions = [
    { id: 'barra', label: 'Barra Olímpica', icon: '🏋️' },
    { id: 'mancuernas', label: 'Mancuernas', icon: '💪' },
    { id: 'maquinas', label: 'Máquinas', icon: '🎰' },
    { id: 'peso-corporal', label: 'Peso Corporal', icon: '🤸' },
    { id: 'kettlebells', label: 'Kettlebells', icon: '⚖️' },
    { id: 'bandas', label: 'Bandas Elásticas', icon: '🎗️' },
    { id: 'trx', label: 'TRX/Suspensión', icon: '🪢' },
  ];

  const commonInjuries = [
    { id: 'hombro', label: 'Hombro', icon: '🦾' },
    { id: 'espalda-baja', label: 'Espalda Baja', icon: '🦴' },
    { id: 'rodilla', label: 'Rodilla', icon: '🦵' },
    { id: 'muneca', label: 'Muñeca', icon: '🤚' },
    { id: 'codo', label: 'Codo', icon: '💪' },
  ];

  const handleGenerate = async () => {
    setGenerating(true);

    // Simulación de generación con IA (en producción sería una llamada al backend)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const generatedPlan = {
      name: `Plan ${config.goal === 'muscle' ? 'Hipertrofia' : config.goal === 'strength' ? 'Fuerza' : 'Personalizado'} ${config.duration} semanas`,
      description: `Plan generado por IA optimizado para ${goals.find(g => g.value === config.goal)?.label.toLowerCase()}`,
      goal: config.goal,
      level: config.level,
      duration: config.duration,
      daysPerWeek: Array.from({ length: config.daysPerWeek }, (_, i) => `Día ${i + 1}`),
      // ... resto de la configuración
    };

    setGenerating(false);
    onGenerate(generatedPlan);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 flex items-center justify-between border-b border-purple-400/30">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Generador IA de Entrenamientos</h2>
              <p className="text-purple-100 text-sm">Crea planes optimizados en segundos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                {s < 4 && (
                  <div className={`h-1 w-20 ${step > s ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Objetivo */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-400" />
                  ¿Cuál es el objetivo principal?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => setConfig({ ...config, goal: goal.value })}
                      className={`p-4 rounded-xl text-left transition-all ${
                        config.goal === goal.value
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-2 border-purple-400'
                          : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{goal.icon}</span>
                        <div>
                          <div className="font-bold text-white">{goal.label}</div>
                          <div className="text-sm text-gray-400 mt-1">{goal.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Frecuencia y Duración */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  Frecuencia y Duración
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">
                      Días de entrenamiento por semana
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                        <button
                          key={days}
                          onClick={() => setConfig({ ...config, daysPerWeek: days })}
                          className={`p-3 rounded-lg font-bold transition-all ${
                            config.daysPerWeek === days
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110'
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                        >
                          {days}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">
                      Duración del plan (semanas)
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {[4, 6, 8, 10, 12, 16].map((weeks) => (
                        <button
                          key={weeks}
                          onClick={() => setConfig({ ...config, duration: weeks })}
                          className={`p-3 rounded-lg font-bold transition-all ${
                            config.duration === weeks
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110'
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                        >
                          {weeks}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">
                      Nivel de experiencia
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'beginner' as Level, label: 'Principiante', icon: '🌱' },
                        { value: 'intermediate' as Level, label: 'Intermedio', icon: '💪' },
                        { value: 'advanced' as Level, label: 'Avanzado', icon: '🏆' },
                      ].map((lvl) => (
                        <button
                          key={lvl.value}
                          onClick={() => setConfig({ ...config, level: lvl.value })}
                          className={`p-4 rounded-lg transition-all ${
                            config.level === lvl.value
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-2 border-purple-400'
                              : 'bg-gray-700 border-2 border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <div className="text-2xl mb-1">{lvl.icon}</div>
                          <div className="font-semibold text-white text-sm">{lvl.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Equipamiento */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-purple-400" />
                  Equipamiento disponible
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {equipmentOptions.map((eq) => (
                    <button
                      key={eq.id}
                      onClick={() => {
                        const newEquipment = config.equipment.includes(eq.id)
                          ? config.equipment.filter(e => e !== eq.id)
                          : [...config.equipment, eq.id];
                        setConfig({ ...config, equipment: newEquipment });
                      }}
                      className={`p-4 rounded-lg text-left transition-all ${
                        config.equipment.includes(eq.id)
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-2 border-purple-400'
                          : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{eq.icon}</div>
                      <div className="font-semibold text-white text-sm">{eq.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Lesiones y Preferencias */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                  Lesiones y Preferencias
                </h3>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">
                    Lesiones o limitaciones (opcional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {commonInjuries.map((injury) => (
                      <button
                        key={injury.id}
                        onClick={() => {
                          const newInjuries = config.injuries.includes(injury.id)
                            ? config.injuries.filter(i => i !== injury.id)
                            : [...config.injuries, injury.id];
                          setConfig({ ...config, injuries: newInjuries });
                        }}
                        className={`p-3 rounded-lg transition-all ${
                          config.injuries.includes(injury.id)
                            ? 'bg-red-600 border-2 border-red-400'
                            : 'bg-gray-700 border-2 border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-xl mb-1">{injury.icon}</div>
                        <div className="font-semibold text-white text-xs">{injury.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">
                    Resumen de tu plan
                  </label>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400">Objetivo:</span>
                      <span className="text-white font-semibold">
                        {goals.find(g => g.value === config.goal)?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">Frecuencia:</span>
                      <span className="text-white font-semibold">
                        {config.daysPerWeek} días/semana × {config.duration} semanas
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Dumbbell className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400">Equipamiento:</span>
                      <span className="text-white font-semibold">
                        {config.equipment.length} tipos seleccionados
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-400">Nivel:</span>
                      <span className="text-white font-semibold capitalize">{config.level}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
              >
                Siguiente
                <TrendingUp className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 disabled:opacity-50 transition-all flex items-center gap-2 font-bold"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generando plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generar Plan con IA
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIWorkoutGeneratorModal;
