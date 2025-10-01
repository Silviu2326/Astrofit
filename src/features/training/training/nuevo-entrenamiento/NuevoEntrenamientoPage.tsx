import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Target, Calendar, Dumbbell, TrendingUp, CheckCircle,
  ChevronLeft, ChevronRight, Save, Search, Filter, Plus,
  AlertTriangle, Info, Clock, Zap, Copy, GripVertical,
  X, Settings, BarChart, Calculator, ArrowLeft
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type TrainingGoal = 'muscle' | 'fat-loss' | 'strength' | 'endurance' | 'performance' | 'rehab' | 'maintenance';
type TrainingType = 'strength' | 'hypertrophy' | 'crossfit' | 'functional' | 'powerlifting' | 'calisthenics' | 'hiit';
type Level = 'beginner' | 'intermediate' | 'advanced';
type DayFocus = 'strength' | 'hypertrophy' | 'endurance';
type ProgressionMethod = 'linear' | 'undulating' | 'block' | 'autoregulated' | 'none';

interface Client {
  id: string;
  name: string;
  avatar: string;
  lastSession: string;
  level: Level;
}

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  image: string;
}

interface ExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  tempo?: string;
  rpe?: number;
  weight?: number;
  notes?: string;
}

interface TrainingDay {
  day: string;
  name: string;
  focus: DayFocus;
  duration: number;
  exercises: ExerciseConfig[];
}

interface TrainingPlan {
  clientId: string;
  name: string;
  description: string;
  goal: TrainingGoal;
  type: TrainingType;
  level: Level;
  startDate: string;
  duration: number;
  daysPerWeek: string[];
  trainingDays: TrainingDay[];
  progressionMethod: ProgressionMethod;
  progressionRate: number;
  deloadWeeks: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Juan Pérez', avatar: '👨', lastSession: 'Hace 2 días', level: 'intermediate' },
  { id: '2', name: 'María García', avatar: '👩', lastSession: 'Hace 5 días', level: 'beginner' },
  { id: '3', name: 'Carlos Rodríguez', avatar: '🧔', lastSession: 'Hoy', level: 'advanced' },
  { id: '4', name: 'Ana Martínez', avatar: '👱‍♀️', lastSession: 'Hace 1 día', level: 'intermediate' },
  { id: '5', name: 'Luis Sánchez', avatar: '👨‍🦱', lastSession: 'Hace 3 días', level: 'beginner' },
  { id: '6', name: 'Laura Fernández', avatar: '👩‍🦰', lastSession: 'Hace 1 semana', level: 'advanced' },
  { id: '7', name: 'Pedro González', avatar: '👨‍🦲', lastSession: 'Hace 4 días', level: 'intermediate' },
  { id: '8', name: 'Sofia López', avatar: '👩‍🦱', lastSession: 'Hace 2 días', level: 'beginner' },
];

const MOCK_EXERCISES: Exercise[] = [
  { id: 'e1', name: 'Sentadilla con Barra', muscleGroup: 'Piernas', image: '🏋️' },
  { id: 'e2', name: 'Press de Banca', muscleGroup: 'Pecho', image: '💪' },
  { id: 'e3', name: 'Peso Muerto', muscleGroup: 'Espalda', image: '🏋️‍♀️' },
  { id: 'e4', name: 'Press Militar', muscleGroup: 'Hombros', image: '🦾' },
  { id: 'e5', name: 'Remo con Barra', muscleGroup: 'Espalda', image: '💪' },
  { id: 'e6', name: 'Curl de Bíceps', muscleGroup: 'Brazos', image: '💪' },
  { id: 'e7', name: 'Extensión de Tríceps', muscleGroup: 'Brazos', image: '💪' },
  { id: 'e8', name: 'Zancadas', muscleGroup: 'Piernas', image: '🦵' },
  { id: 'e9', name: 'Dominadas', muscleGroup: 'Espalda', image: '🤸' },
  { id: 'e10', name: 'Fondos', muscleGroup: 'Pecho', image: '🤸‍♂️' },
  { id: 'e11', name: 'Plancha', muscleGroup: 'Core', image: '🧘' },
  { id: 'e12', name: 'Hip Thrust', muscleGroup: 'Glúteos', image: '🍑' },
  { id: 'e13', name: 'Face Pull', muscleGroup: 'Hombros', image: '💪' },
  { id: 'e14', name: 'Leg Press', muscleGroup: 'Piernas', image: '🦵' },
  { id: 'e15', name: 'Press Inclinado', muscleGroup: 'Pecho', image: '💪' },
];

const GOALS = [
  { id: 'muscle' as TrainingGoal, label: 'Ganar Masa Muscular', icon: '💪', color: 'bg-blue-500' },
  { id: 'fat-loss' as TrainingGoal, label: 'Perder Grasa', icon: '🔥', color: 'bg-red-500' },
  { id: 'strength' as TrainingGoal, label: 'Fuerza Máxima', icon: '⚡', color: 'bg-yellow-500' },
  { id: 'endurance' as TrainingGoal, label: 'Resistencia', icon: '🏃', color: 'bg-green-500' },
  { id: 'performance' as TrainingGoal, label: 'Rendimiento Deportivo', icon: '🏆', color: 'bg-purple-500' },
  { id: 'rehab' as TrainingGoal, label: 'Rehabilitación', icon: '🩹', color: 'bg-pink-500' },
  { id: 'maintenance' as TrainingGoal, label: 'Mantenimiento', icon: '✅', color: 'bg-gray-500' },
];

const TRAINING_TYPES = [
  { id: 'strength' as TrainingType, label: 'Fuerza' },
  { id: 'hypertrophy' as TrainingType, label: 'Hipertrofia' },
  { id: 'crossfit' as TrainingType, label: 'CrossFit' },
  { id: 'functional' as TrainingType, label: 'Funcional' },
  { id: 'powerlifting' as TrainingType, label: 'Powerlifting' },
  { id: 'calisthenics' as TrainingType, label: 'Calistenia' },
  { id: 'hiit' as TrainingType, label: 'HIIT' },
];

const WEEK_DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const FULL_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const REP_SCHEMES = [
  { name: 'Fuerza', sets: 5, reps: '5', rest: 180 },
  { name: 'Hipertrofia', sets: 4, reps: '10-12', rest: 90 },
  { name: 'Resistencia', sets: 3, reps: '15-20', rest: 60 },
  { name: 'Mixto', sets: 4, reps: '8-12', rest: 90 },
];

const PROGRESSION_METHODS = [
  { id: 'linear' as ProgressionMethod, label: 'Lineal', description: 'Aumentar peso cada semana' },
  { id: 'undulating' as ProgressionMethod, label: 'Ondulante', description: 'Variar intensidad' },
  { id: 'block' as ProgressionMethod, label: 'Bloques', description: 'Periodización por bloques' },
  { id: 'autoregulated' as ProgressionMethod, label: 'Autoregulado', description: 'Según RPE' },
  { id: 'none' as ProgressionMethod, label: 'Sin Progresión', description: 'Mantener' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const NuevoEntrenamientoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [plan, setPlan] = useState<Partial<TrainingPlan>>({
    daysPerWeek: [],
    trainingDays: [],
    duration: 8,
    progressionRate: 2.5,
    deloadWeeks: 4,
  });
  const [searchClient, setSearchClient] = useState('');
  const [searchExercise, setSearchExercise] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [draggedExercise, setDraggedExercise] = useState<Exercise | null>(null);

  const steps = [
    { id: 0, label: 'Cliente y Objetivo', icon: User },
    { id: 1, label: 'Estructura', icon: Calendar },
    { id: 2, label: 'Ejercicios', icon: Dumbbell },
    { id: 3, label: 'Series y Reps', icon: Settings },
    { id: 4, label: 'Progresión', icon: TrendingUp },
    { id: 5, label: 'Revisión', icon: CheckCircle },
  ];

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const canAdvance = () => {
    switch (currentStep) {
      case 0:
        return plan.clientId && plan.name && plan.goal && plan.type && plan.level && plan.startDate;
      case 1:
        return plan.daysPerWeek && plan.daysPerWeek.length > 0 && plan.trainingDays && plan.trainingDays.length > 0;
      case 2:
        return plan.trainingDays?.every(day => day.exercises.length >= 3);
      case 3:
        return plan.trainingDays?.every(day =>
          day.exercises.every(ex => ex.sets > 0 && ex.reps && ex.rest > 0)
        );
      case 4:
        return plan.progressionMethod;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canAdvance() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const filteredClients = MOCK_CLIENTS.filter(c =>
    c.name.toLowerCase().includes(searchClient.toLowerCase())
  );

  const filteredExercises = MOCK_EXERCISES.filter(e =>
    e.name.toLowerCase().includes(searchExercise.toLowerCase()) &&
    (filterMuscle === '' || e.muscleGroup === filterMuscle)
  );

  const muscleGroups = Array.from(new Set(MOCK_EXERCISES.map(e => e.muscleGroup)));

  const toggleDay = (day: string) => {
    const days = plan.daysPerWeek || [];
    if (days.includes(day)) {
      setPlan({
        ...plan,
        daysPerWeek: days.filter(d => d !== day),
        trainingDays: plan.trainingDays?.filter(td => td.day !== day),
      });
    } else {
      setPlan({
        ...plan,
        daysPerWeek: [...days, day],
        trainingDays: [
          ...(plan.trainingDays || []),
          { day, name: `Entrenamiento ${FULL_DAYS[WEEK_DAYS.indexOf(day)]}`, focus: 'hypertrophy', duration: 60, exercises: [] },
        ],
      });
    }
  };

  const updateTrainingDay = (index: number, updates: Partial<TrainingDay>) => {
    const trainingDays = [...(plan.trainingDays || [])];
    trainingDays[index] = { ...trainingDays[index], ...updates };
    setPlan({ ...plan, trainingDays });
  };

  const addExerciseToDay = (dayIndex: number, exercise: Exercise) => {
    const trainingDays = [...(plan.trainingDays || [])];
    trainingDays[dayIndex].exercises.push({
      exerciseId: exercise.id,
      sets: 4,
      reps: '10-12',
      rest: 90,
    });
    setPlan({ ...plan, trainingDays });
  };

  const removeExerciseFromDay = (dayIndex: number, exerciseIndex: number) => {
    const trainingDays = [...(plan.trainingDays || [])];
    trainingDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setPlan({ ...plan, trainingDays });
  };

  const updateExerciseConfig = (dayIndex: number, exerciseIndex: number, updates: Partial<ExerciseConfig>) => {
    const trainingDays = [...(plan.trainingDays || [])];
    trainingDays[dayIndex].exercises[exerciseIndex] = {
      ...trainingDays[dayIndex].exercises[exerciseIndex],
      ...updates,
    };
    setPlan({ ...plan, trainingDays });
  };

  const applyRepScheme = (dayIndex: number, scheme: typeof REP_SCHEMES[0]) => {
    const trainingDays = [...(plan.trainingDays || [])];
    trainingDays[dayIndex].exercises.forEach(ex => {
      ex.sets = scheme.sets;
      ex.reps = scheme.reps;
      ex.rest = scheme.rest;
    });
    setPlan({ ...plan, trainingDays });
  };

  const getExerciseById = (id: string) => MOCK_EXERCISES.find(e => e.id === id);
  const getClientById = (id: string) => MOCK_CLIENTS.find(c => c.id === id);

  const calculateTotalExercises = () => {
    return new Set(plan.trainingDays?.flatMap(day => day.exercises.map(ex => ex.exerciseId))).size;
  };

  const calculateTotalSessions = () => {
    return (plan.daysPerWeek?.length || 0) * (plan.duration || 0);
  };

  const calculateTotalVolume = () => {
    let volume = 0;
    plan.trainingDays?.forEach(day => {
      day.exercises.forEach(ex => {
        volume += ex.sets * (parseInt(ex.reps.split('-')[0]) || 0);
      });
    });
    return volume * (plan.daysPerWeek?.length || 0) * (plan.duration || 0);
  };

  const timeSinceLastSave = Math.floor((new Date().getTime() - lastSaved.getTime()) / 60000);

  // ============================================================================
  // RENDER STEPS
  // ============================================================================

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Seleccionar Cliente</label>
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-indigo-400" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {filteredClients.map((client, index) => (
              <motion.button
                key={client.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setPlan({ ...plan, clientId: client.id, level: client.level })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  plan.clientId === client.id
                    ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                  {client.avatar}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-600">{client.lastSession}</div>
                  <div className="mt-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      client.level === 'beginner' ? 'bg-green-100 text-green-700' :
                      client.level === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {client.level === 'beginner' ? 'Principiante' : client.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                    </span>
                  </div>
                </div>
                {plan.clientId === client.id && (
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                )}
              </motion.button>
            ))}
          </div>
          <button className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-2xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-semibold">
            <Plus className="w-5 h-5" />
            Crear nuevo cliente
          </button>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Nombre del Plan</label>
            <input
              type="text"
              value={plan.name || ''}
              onChange={(e) => setPlan({ ...plan, name: e.target.value })}
              placeholder="Ej: Plan de Hipertrofia 8 semanas"
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Descripción</label>
            <textarea
              value={plan.description || ''}
              onChange={(e) => setPlan({ ...plan, description: e.target.value })}
              placeholder="Notas adicionales sobre el plan..."
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Fecha de Inicio</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
                <input
                  type="date"
                  value={plan.startDate || ''}
                  onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Duración</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
                <select
                  value={plan.duration || 8}
                  onChange={(e) => setPlan({ ...plan, duration: parseInt(e.target.value) })}
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none"
                >
                  <option value="4">4 semanas</option>
                  <option value="6">6 semanas</option>
                  <option value="8">8 semanas</option>
                  <option value="12">12 semanas</option>
                  <option value="16">16 semanas</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Objetivo Principal</label>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {GOALS.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => setPlan({ ...plan, goal: goal.id })}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl border-2 transition-all ${
                plan.goal === goal.id
                  ? `border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg`
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-2">{goal.icon}</div>
              <div className="text-xs font-bold text-gray-700">{goal.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Training Type & Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Tipo de Entrenamiento</label>
          <div className="grid grid-cols-2 gap-2">
            {TRAINING_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => setPlan({ ...plan, type: type.id })}
                className={`py-3 px-4 rounded-2xl border-2 transition-all font-semibold ${
                  plan.type === type.id
                    ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-lg'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Nivel del Cliente</label>
          <div className="grid grid-cols-3 gap-2">
            {(['beginner', 'intermediate', 'advanced'] as Level[]).map(level => (
              <button
                key={level}
                onClick={() => setPlan({ ...plan, level })}
                className={`py-3 px-4 rounded-2xl border-2 transition-all font-semibold ${
                  plan.level === level
                    ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-lg'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {level === 'beginner' ? 'Principiante' : level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Days Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Días de Entrenamiento</label>
        <div className="flex gap-3 justify-center flex-wrap">
          {WEEK_DAYS.map((day, index) => (
            <motion.button
              key={day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => toggleDay(day)}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`w-20 h-20 rounded-2xl border-2 transition-all font-bold text-xl relative overflow-hidden ${
                plan.daysPerWeek?.includes(day)
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl'
                  : 'border-gray-300 bg-white text-gray-400 hover:border-indigo-300 hover:shadow-lg'
              }`}
            >
              {plan.daysPerWeek?.includes(day) && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
              <span className="relative z-10">{day}</span>
            </motion.button>
          ))}
        </div>
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200">
            <span className="text-sm font-bold text-indigo-700">
              {plan.daysPerWeek?.length || 0} días seleccionados
            </span>
          </span>
        </div>
      </div>

      {/* Training Days Configuration */}
      {plan.trainingDays && plan.trainingDays.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600" />
            Configuración de Sesiones
          </h3>
          <div className="space-y-3">
            {plan.trainingDays.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="p-5 bg-gradient-to-r from-white to-indigo-50/30 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all shadow-md hover:shadow-lg"
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                    {day.day}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 min-w-0">
                    <input
                      type="text"
                      value={day.name}
                      onChange={(e) => updateTrainingDay(index, { name: e.target.value })}
                      placeholder="Nombre de la sesión"
                      className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-semibold"
                    />
                    <select
                      value={day.focus}
                      onChange={(e) => updateTrainingDay(index, { focus: e.target.value as DayFocus })}
                      className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-semibold appearance-none"
                    >
                      <option value="strength">💪 Fuerza</option>
                      <option value="hypertrophy">🏋️ Hipertrofia</option>
                      <option value="endurance">🏃 Resistencia</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-indigo-400" />
                        <input
                          type="number"
                          value={day.duration}
                          onChange={(e) => updateTrainingDay(index, { duration: parseInt(e.target.value) })}
                          className="w-full pl-10 pr-3 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-semibold"
                        />
                      </div>
                      <span className="text-gray-600 text-sm font-semibold">min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {plan.daysPerWeek && plan.daysPerWeek.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 px-4 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-3xl border-2 border-dashed border-indigo-200"
        >
          <div className="inline-block p-6 bg-white rounded-3xl shadow-lg mb-4">
            <Calendar className="w-16 h-16 text-indigo-300" />
          </div>
          <p className="text-gray-600 font-semibold text-lg">Selecciona al menos un día de entrenamiento</p>
          <p className="text-gray-500 text-sm mt-2">Haz clic en los días de la semana arriba</p>
        </motion.div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Exercise Library */}
      <div className="lg:col-span-4 space-y-4">
        <div className="sticky top-4 space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              Biblioteca de Ejercicios
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-4 top-3 w-5 h-5 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Buscar ejercicio..."
                  value={searchExercise}
                  onChange={(e) => setSearchExercise(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-3 w-5 h-5 text-indigo-400" />
                <select
                  value={filterMuscle}
                  onChange={(e) => setFilterMuscle(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none font-semibold"
                >
                  <option value="">Todos los grupos</option>
                  {muscleGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {filteredExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                draggable
                onDragStart={() => setDraggedExercise(exercise)}
                onDragEnd={() => setDraggedExercise(null)}
                whileHover={{ scale: 1.02, x: 4 }}
                className="p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-indigo-400 hover:shadow-lg cursor-move transition-all flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {exercise.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 text-sm truncate">{exercise.name}</div>
                  <div className="text-xs font-semibold text-indigo-600">{exercise.muscleGroup}</div>
                </div>
                <GripVertical className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Days */}
      <div className="lg:col-span-8 space-y-4">
        {/* Day Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {plan.trainingDays?.map((day, index) => (
            <motion.button
              key={day.day}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => setSelectedDayIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-md ${
                selectedDayIndex === index
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200'
              }`}
            >
              {day.day} - {day.name}
            </motion.button>
          ))}
        </div>

        {/* Selected Day Exercises Drop Zone */}
        {plan.trainingDays && plan.trainingDays[selectedDayIndex] && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedExercise) {
                addExerciseToDay(selectedDayIndex, draggedExercise);
                setDraggedExercise(null);
              }
            }}
            className="min-h-[400px] p-6 bg-gradient-to-br from-white to-indigo-50/30 border-2 border-dashed border-indigo-300 rounded-3xl space-y-3 transition-all hover:border-indigo-500 hover:bg-indigo-50/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {plan.trainingDays[selectedDayIndex].exercises.length}
                </div>
                Ejercicios del día
              </h4>
              {plan.trainingDays[selectedDayIndex].exercises.length < 3 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">Mínimo 3 ejercicios</span>
                </div>
              )}
            </div>
            {plan.trainingDays[selectedDayIndex].exercises.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-white rounded-3xl shadow-lg mb-4">
                  <Dumbbell className="w-16 h-16 text-indigo-300" />
                </div>
                <p className="text-gray-600 font-bold text-lg mb-2">Arrastra ejercicios aquí</p>
                <p className="text-gray-500 text-sm">Desde la biblioteca de la izquierda</p>
              </div>
            ) : (
              <div className="space-y-2">
                {plan.trainingDays[selectedDayIndex].exercises.map((exConfig, exIndex) => {
                  const exercise = getExerciseById(exConfig.exerciseId);
                  return (
                    <motion.div
                      key={exIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: exIndex * 0.05, duration: 0.3 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 shadow-md hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold shadow-lg">
                        {exIndex + 1}
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl">
                        {exercise?.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900">{exercise?.name}</div>
                        <div className="text-sm font-semibold text-indigo-600">{exercise?.muscleGroup}</div>
                      </div>
                      <button
                        onClick={() => removeExerciseFromDay(selectedDayIndex, exIndex)}
                        className="p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      {/* Rep Scheme Presets */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {REP_SCHEMES.map(scheme => (
          <button
            key={scheme.name}
            onClick={() => applyRepScheme(selectedDayIndex, scheme)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:border-blue-500 transition-all whitespace-nowrap"
          >
            <div className="font-medium">{scheme.name}</div>
            <div className="text-xs text-gray-400">{scheme.sets}x{scheme.reps} • {scheme.rest}s</div>
          </button>
        ))}
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {plan.trainingDays?.map((day, index) => (
          <button
            key={day.day}
            onClick={() => setSelectedDayIndex(index)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedDayIndex === index
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {day.day} - {day.name}
          </button>
        ))}
      </div>

      {/* Exercise Configuration Table */}
      {plan.trainingDays && plan.trainingDays[selectedDayIndex] && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">#</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Ejercicio</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Series</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Reps</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Descanso (s)</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Peso (kg)</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">RPE</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Notas</th>
              </tr>
            </thead>
            <tbody>
              {plan.trainingDays[selectedDayIndex].exercises.map((exConfig, exIndex) => {
                const exercise = getExerciseById(exConfig.exerciseId);
                return (
                  <tr key={exIndex} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-gray-400">{exIndex + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{exercise?.image}</span>
                        <div>
                          <div className="text-white font-medium text-sm">{exercise?.name}</div>
                          <div className="text-gray-400 text-xs">{exercise?.muscleGroup}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={exConfig.sets}
                        onChange={(e) => updateExerciseConfig(selectedDayIndex, exIndex, { sets: parseInt(e.target.value) })}
                        className="w-16 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={exConfig.reps}
                        onChange={(e) => updateExerciseConfig(selectedDayIndex, exIndex, { reps: e.target.value })}
                        placeholder="8-12"
                        className="w-20 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={exConfig.rest}
                        onChange={(e) => updateExerciseConfig(selectedDayIndex, exIndex, { rest: parseInt(e.target.value) })}
                        className="w-20 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                        <option value="120">120</option>
                        <option value="180">180</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={exConfig.weight || ''}
                        onChange={(e) => updateExerciseConfig(selectedDayIndex, exIndex, { weight: parseFloat(e.target.value) })}
                        placeholder="0"
                        className="w-20 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={exConfig.rpe || ''}
                        onChange={(e) => updateExerciseConfig(selectedDayIndex, exIndex, { rpe: parseInt(e.target.value) })}
                        className="w-16 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-</option>
                        {[6, 7, 8, 9, 10].map(rpe => (
                          <option key={rpe} value={rpe}>{rpe}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={exConfig.notes || ''}
                        onChange={(e) => updateExerciseConfig(selectedDayIndex, exIndex, { notes: e.target.value })}
                        placeholder="Opcional..."
                        className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      {/* Progression Method */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">Método de Progresión</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {PROGRESSION_METHODS.map(method => (
            <button
              key={method.id}
              onClick={() => setPlan({ ...plan, progressionMethod: method.id })}
              className={`p-4 rounded-lg border-2 transition-all ${
                plan.progressionMethod === method.id
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="font-medium text-white mb-1">{method.label}</div>
              <div className="text-xs text-gray-400">{method.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progression Configuration */}
      {plan.progressionMethod && plan.progressionMethod !== 'none' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Incremento Semanal (%)</label>
            <input
              type="number"
              step="0.5"
              value={plan.progressionRate || 2.5}
              onChange={(e) => setPlan({ ...plan, progressionRate: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Deload cada X semanas</label>
            <select
              value={plan.deloadWeeks || 4}
              onChange={(e) => setPlan({ ...plan, deloadWeeks: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3">3 semanas</option>
              <option value="4">4 semanas</option>
              <option value="6">6 semanas</option>
              <option value="0">Sin deload</option>
            </select>
          </div>
        </div>
      )}

      {/* Periodization Preview */}
      <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          Vista de Periodización
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {Array.from({ length: plan.duration || 8 }).map((_, i) => {
            const isDeload = plan.deloadWeeks && (i + 1) % plan.deloadWeeks === 0;
            return (
              <div key={i} className="text-center">
                <div
                  className={`h-20 rounded-lg mb-2 ${
                    isDeload ? 'bg-yellow-500/30 border-2 border-yellow-500' : 'bg-gradient-to-t from-blue-500 to-purple-600'
                  }`}
                  style={{ opacity: isDeload ? 0.6 : 0.4 + (i / (plan.duration || 8)) * 0.6 }}
                />
                <div className="text-xs text-gray-400">S{i + 1}</div>
                {isDeload && <div className="text-xs text-yellow-400">Deload</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => {
    const client = getClientById(plan.clientId || '');
    const goal = GOALS.find(g => g.id === plan.goal);

    return (
      <div className="space-y-6">
        {/* Summary Header */}
        <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-blue-500/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{client?.avatar}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              <p className="text-gray-300">{client?.name} • {goal?.label}</p>
            </div>
            <div className="text-4xl">{goal?.icon}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{plan.duration}</div>
              <div className="text-xs text-gray-400">Semanas</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{plan.daysPerWeek?.length}</div>
              <div className="text-xs text-gray-400">Días/Semana</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{calculateTotalSessions()}</div>
              <div className="text-xs text-gray-400">Sesiones</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{calculateTotalExercises()}</div>
              <div className="text-xs text-gray-400">Ejercicios</div>
            </div>
          </div>
        </div>

        {/* Training Days Summary */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Estructura del Plan</h3>
          {plan.trainingDays?.map((day, dayIndex) => (
            <details key={day.day} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <summary className="cursor-pointer font-medium text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                  {day.day}
                </div>
                <span className="flex-1">{day.name}</span>
                <span className="text-sm text-gray-400">{day.exercises.length} ejercicios • {day.duration}min</span>
              </summary>
              <div className="mt-4 space-y-2">
                {day.exercises.map((exConfig, exIndex) => {
                  const exercise = getExerciseById(exConfig.exerciseId);
                  return (
                    <div key={exIndex} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                      <div className="text-gray-400 font-bold">{exIndex + 1}</div>
                      <div className="text-xl">{exercise?.image}</div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{exercise?.name}</div>
                        <div className="text-sm text-gray-400">
                          {exConfig.sets} series × {exConfig.reps} reps • {exConfig.rest}s descanso
                          {exConfig.weight && ` • ${exConfig.weight}kg`}
                          {exConfig.rpe && ` • RPE ${exConfig.rpe}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </details>
          ))}
        </div>

        {/* Final Options */}
        <div className="space-y-4 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white">Opciones Finales</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded bg-gray-900 border-gray-700" />
              <span className="text-white">Guardar como plantilla</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded bg-gray-900 border-gray-700" />
              <span className="text-white">Enviar notificación al cliente</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded bg-gray-900 border-gray-700" />
              <span className="text-white">Añadir a calendario</span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* Hero Section - Wizard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl mb-8"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all border border-white/20">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                  <div className="relative">
                    <Dumbbell className="w-10 h-10 text-yellow-300 animate-pulse" />
                    <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                  </div>
                  Crear Nuevo Entrenamiento
                </h1>
                <p className="text-blue-100 mt-1">
                  Guardado hace {timeSinceLastSave} min • Paso {currentStep + 1} de {steps.length}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all border border-white/20 text-white font-semibold">
              <Save className="w-5 h-5" />
              <span className="hidden md:inline">Guardar Borrador</span>
            </button>
          </div>

          {/* Modern Wizard Stepper */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => setCurrentStep(index)}
                      className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                        currentStep === index
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xl scale-110'
                          : currentStep > index
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg'
                          : 'bg-white/20 text-white/60 backdrop-blur-sm'
                      }`}
                    >
                      {currentStep > index ? (
                        <CheckCircle className="w-7 h-7" />
                      ) : (
                        <step.icon className="w-7 h-7" />
                      )}
                      {currentStep === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ opacity: 0.3, zIndex: -1 }}
                        />
                      )}
                    </button>
                    <span className={`mt-2 text-xs font-semibold text-center hidden md:block ${
                      currentStep === index ? 'text-white' : currentStep > index ? 'text-green-200' : 'text-white/60'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 rounded-full overflow-hidden bg-white/20" style={{ maxWidth: '100px' }}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: currentStep > index ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Area */}
          <div className="lg:col-span-9">
            {/* Step Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && renderStep1()}
                    {currentStep === 1 && renderStep2()}
                    {currentStep === 2 && renderStep3()}
                    {currentStep === 3 && renderStep4()}
                    {currentStep === 4 && renderStep5()}
                    {currentStep === 5 && renderStep6()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center justify-between mt-6"
            >
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-indigo-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </motion.button>
              <div className="flex items-center gap-3">
                {currentStep === steps.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden flex items-center gap-2 px-10 py-4 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl text-white font-bold text-lg group border border-white/20"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <CheckCircle className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">Crear Entrenamiento</span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={nextStep}
                    disabled={!canAdvance()}
                    whileHover={{ scale: canAdvance() ? 1.05 : 1 }}
                    whileTap={{ scale: canAdvance() ? 0.95 : 1 }}
                    className={`relative overflow-hidden flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl ${
                      canAdvance()
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl border border-white/20'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canAdvance() && (
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    )}
                    <span className="relative z-10">Siguiente</span>
                    <ChevronRight className="w-5 h-5 relative z-10" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-4 space-y-4">
              {/* Quick Summary Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
              >
                {/* Decoración */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">Resumen</h3>
                  </div>

                  {plan.clientId && (
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                      <div className="text-3xl">{getClientById(plan.clientId)?.avatar}</div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{getClientById(plan.clientId)?.name}</div>
                        <div className="text-xs text-gray-600">Cliente seleccionado</div>
                      </div>
                    </div>
                  )}

                  {plan.goal && (
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                      <div className="p-2 bg-blue-500 rounded-xl">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">Objetivo</div>
                        <div className="text-sm font-semibold text-gray-900">{GOALS.find(g => g.id === plan.goal)?.label}</div>
                      </div>
                    </div>
                  )}

                  {plan.daysPerWeek && plan.daysPerWeek.length > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                      <div className="p-2 bg-purple-500 rounded-xl">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">Frecuencia</div>
                        <div className="text-sm font-semibold text-gray-900">{plan.daysPerWeek.length} días/semana</div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Progreso</span>
                      <span className="text-xs font-bold text-indigo-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tips Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-yellow-200 relative overflow-hidden"
              >
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900 mb-2">💡 Tip del paso</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {currentStep === 0 && 'Selecciona un objetivo claro para optimizar las recomendaciones del sistema'}
                        {currentStep === 1 && 'Respeta al menos un día de descanso entre sesiones intensas'}
                        {currentStep === 2 && 'Arrastra ejercicios desde la biblioteca o usa plantillas predefinidas'}
                        {currentStep === 3 && 'Ajusta el volumen según el nivel y capacidad del cliente'}
                        {currentStep === 4 && 'La progresión lineal es ideal para principiantes e intermedios'}
                        {currentStep === 5 && 'Revisa cada detalle antes de crear el plan definitivo'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Calculator Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">Métricas</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                      <span className="text-sm font-semibold text-gray-700">Total sesiones</span>
                      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{calculateTotalSessions()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                      <span className="text-sm font-semibold text-gray-700">Ejercicios únicos</span>
                      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">{calculateTotalExercises()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                      <span className="text-sm font-semibold text-gray-700">Volumen total</span>
                      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">{calculateTotalVolume()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoEntrenamientoPage;