import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Dumbbell, Percent, Activity, Flame, Target, TrendingUp, ArrowLeftRight, Award, X, Save, Share2, Clock, Info, Sparkles } from 'lucide-react';

type CalculatorType = 'rm' | 'percentage' | 'volume' | 'calories' | 'rpe' | 'progression' | 'converter' | 'wilks' | null;

interface HistoryItem {
  id: string;
  type: string;
  exercise: string;
  result: string;
  date: string;
}

const CalculadorasFuerzaPage: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', type: '1RM', exercise: 'Sentadilla', result: '150 kg', date: '2025-09-28' },
    { id: '2', type: 'Porcentajes', exercise: 'Press Banca', result: '80% = 96 kg', date: '2025-09-27' },
    { id: '3', type: 'Volumen', exercise: 'Sesión Completa', result: '12,450 kg', date: '2025-09-26' },
    { id: '4', type: '1RM', exercise: 'Peso Muerto', result: '180 kg', date: '2025-09-25' },
    { id: '5', type: 'Calorías', exercise: 'Entrenamiento HIIT', result: '450 kcal', date: '2025-09-24' },
  ]);

  const calculators = [
    {
      id: 'rm' as CalculatorType,
      title: 'Calculadora de 1RM',
      description: 'Calcula tu máximo teórico en cualquier ejercicio',
      icon: Dumbbell,
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      iconBg: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-600'
    },
    {
      id: 'percentage' as CalculatorType,
      title: 'Porcentajes de 1RM',
      description: 'Determina cargas de entrenamiento basadas en 1RM',
      icon: Percent,
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-600'
    },
    {
      id: 'volume' as CalculatorType,
      title: 'Volumen de Entrenamiento',
      description: 'Calcula volumen total y tonelaje',
      icon: Activity,
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      iconBg: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600'
    },
    {
      id: 'progression' as CalculatorType,
      title: 'Progresión de Cargas',
      description: 'Planifica incrementos progresivos',
      icon: TrendingUp,
      color: 'from-purple-500 via-pink-500 to-rose-500',
      bgGradient: 'from-purple-50 to-pink-50',
      iconBg: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600'
    },
    {
      id: 'rpe' as CalculatorType,
      title: 'Intensidad RPE/RIR',
      description: 'Convierte entre RPE, RIR y % de 1RM',
      icon: Target,
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-amber-50',
      iconBg: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-600'
    },
    {
      id: 'calories' as CalculatorType,
      title: 'Calorías Quemadas',
      description: 'Estima gasto calórico de la sesión',
      icon: Flame,
      color: 'from-red-500 via-orange-500 to-amber-500',
      bgGradient: 'from-red-50 to-orange-50',
      iconBg: 'from-red-500 to-orange-600',
      textColor: 'text-red-600'
    },
    {
      id: 'wilks' as CalculatorType,
      title: 'Calculadora de Wilks',
      description: 'Score de fuerza relativa (powerlifting)',
      icon: Award,
      color: 'from-yellow-500 via-amber-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      iconBg: 'from-yellow-500 to-amber-600',
      textColor: 'text-yellow-600'
    },
    {
      id: 'converter' as CalculatorType,
      title: 'Conversor de Unidades',
      description: 'Convierte kg ↔ lbs, cm ↔ inch',
      icon: ArrowLeftRight,
      color: 'from-slate-500 via-gray-500 to-zinc-500',
      bgGradient: 'from-slate-50 to-gray-50',
      iconBg: 'from-slate-500 to-gray-600',
      textColor: 'text-slate-600'
    },
  ];

  const addToHistory = (type: string, exercise: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      type,
      exercise,
      result,
      date: new Date().toISOString().split('T')[0]
    };
    setHistory([newItem, ...history.slice(0, 9)]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Calculator className="w-10 h-10 md:w-12 md:h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Calculadoras de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Fuerza</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl leading-relaxed mb-6">
            Herramientas profesionales para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">planificar</span> y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">optimizar</span> tu entrenamiento de fuerza
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">8 Calculadoras</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-4 h-4 text-green-300" />
              <span className="text-sm font-semibold text-white">Cálculos Precisos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-white">Progresión Inteligente</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Grid de Calculadoras */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {calculators.map((calc, index) => {
              const Icon = calc.icon;
              return (
                <motion.button
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group text-left`}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                  {/* Decoración de fondo */}
                  <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${calc.iconBg} opacity-5 rounded-full blur-2xl`}></div>

                  <div className="relative z-10">
                    {/* Icono */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${calc.iconBg} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Título */}
                    <h3 className={`text-lg font-bold ${calc.textColor} mb-2`}>
                      {calc.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-sm text-gray-600">
                      {calc.description}
                    </p>

                    {/* Barra decorativa */}
                    <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${calc.color} rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Historial */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 sticky top-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Historial Reciente</h2>
            </div>
            <div className="space-y-3">
              {history.slice(0, 8).map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border border-gray-200 rounded-2xl p-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-200 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{item.type}</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{item.exercise}</p>
                  <p className="text-sm text-gray-600 font-medium">{item.result}</p>
                </motion.div>
              ))}
            </div>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="w-full mt-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                Limpiar historial
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modales de Calculadoras */}
      {activeCalculator === 'rm' && (
        <RMCalculatorModal onClose={() => setActiveCalculator(null)} onSave={addToHistory} />
      )}
      {activeCalculator === 'percentage' && (
        <PercentageCalculatorModal onClose={() => setActiveCalculator(null)} onSave={addToHistory} />
      )}
      {activeCalculator === 'volume' && (
        <VolumeCalculatorModal onClose={() => setActiveCalculator(null)} onSave={addToHistory} />
      )}
      {activeCalculator === 'calories' && (
        <CaloriesCalculatorModal onClose={() => setActiveCalculator(null)} onSave={addToHistory} />
      )}
      {activeCalculator === 'rpe' && (
        <RPECalculatorModal onClose={() => setActiveCalculator(null)} onSave={addToHistory} />
      )}
      {activeCalculator === 'progression' && (
        <ProgressionCalculatorModal onClose={() => setActiveCalculator(null)} onSave={addToHistory} />
      )}
      {activeCalculator === 'converter' && (
        <ConverterModal onClose={() => setActiveCalculator(null)} />
      )}
      {activeCalculator === 'wilks' && (
        <WilksCalculatorModal onClose={() => setActiveCalculator(null)} onSave={addToHistory} />
      )}
    </div>
  );
};

// Calculadora de 1RM
const RMCalculatorModal: React.FC<{ onClose: () => void; onSave: (type: string, exercise: string, result: string) => void }> = ({ onClose, onSave }) => {
  const [exercise, setExercise] = useState('Sentadilla');
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);
  const [formula, setFormula] = useState('brzycki');

  const calculateRM = () => {
    let rm = 0;
    switch (formula) {
      case 'brzycki':
        rm = weight * (36 / (37 - reps));
        break;
      case 'epley':
        rm = weight * (1 + 0.0333 * reps);
        break;
      case 'lander':
        rm = (100 * weight) / (101.3 - 2.67123 * reps);
        break;
      case 'lombardi':
        rm = weight * Math.pow(reps, 0.1);
        break;
      case 'oconner':
        rm = weight * (1 + 0.025 * reps);
        break;
      case 'wathan':
        rm = (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
        break;
    }
    return Math.round(rm * 10) / 10;
  };

  const rm = calculateRM();
  const percentages = [60, 70, 80, 90, 95, 100];
  const repsExpected = [15, 12, 8, 4, 2, 1];

  const handleSave = () => {
    onSave('1RM', exercise, `${rm} kg`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-t-3xl relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Calculadora de 1RM</h2>
                <p className="text-purple-100 text-sm">Calcula tu repetición máxima teórica</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2 transition-colors backdrop-blur-sm">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-indigo-600" />
                Ejercicio
              </label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option>Sentadilla</option>
                <option>Press Banca</option>
                <option>Peso Muerto</option>
                <option>Press Militar</option>
                <option>Dominadas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Peso levantado</label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-4 pr-16 text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-center"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-500">kg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Repeticiones realizadas</label>
              <div className="relative">
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(Math.min(12, Math.max(1, Number(e.target.value))))}
                  min="1"
                  max="12"
                  className="w-full px-4 py-4 pr-16 text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-center"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-500">reps</span>
              </div>
              <input
                type="range"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                min="1"
                max="12"
                className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600" />
                Fórmula
              </label>
              <select
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option value="brzycki">Brzycki (Más usado)</option>
                <option value="epley">Epley</option>
                <option value="lander">Lander</option>
                <option value="lombardi">Lombardi</option>
                <option value="oconner">O'Conner</option>
                <option value="wathan">Wathan</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 text-center border-2 border-indigo-200 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>

              <div className="relative z-10">
                <p className="text-sm font-bold text-indigo-600 mb-2 uppercase tracking-wide">1RM Estimado</p>
                <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">{rm}</p>
                <p className="text-lg text-indigo-600 font-semibold mt-2">kilogramos</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-gray-200 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Tabla de Porcentajes
              </h3>
              <div className="space-y-2">
                {percentages.map((perc, idx) => (
                  <div key={perc} className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 p-3 rounded-xl transition-colors border border-indigo-100 group">
                    <span className="font-bold text-indigo-700 text-lg">{perc}%</span>
                    <span className="text-gray-800 font-bold text-lg group-hover:scale-110 transition-transform">{Math.round(rm * perc / 100)} kg</span>
                    <span className="text-sm text-gray-600 font-semibold bg-white px-2 py-1 rounded-lg">{repsExpected[idx]} reps</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3 bg-gray-50/80 backdrop-blur-sm">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 hover:border-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2 font-semibold hover:scale-105"
          >
            <Save className="w-5 h-5" />
            Guardar Resultado
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Calculadora de Porcentajes
const PercentageCalculatorModal: React.FC<{ onClose: () => void; onSave: (type: string, exercise: string, result: string) => void }> = ({ onClose, onSave }) => {
  const [oneRM, setOneRM] = useState(150);
  const [percentage, setPercentage] = useState(80);

  const weight = Math.round(oneRM * percentage / 100);
  const repsExpected = percentage >= 95 ? '1-2' : percentage >= 90 ? '3-4' : percentage >= 80 ? '6-8' : percentage >= 70 ? '10-12' : '15+';
  const rpe = percentage >= 95 ? '9-10' : percentage >= 90 ? '8-9' : percentage >= 80 ? '7-8' : percentage >= 70 ? '6-7' : '5-6';

  const commonPercentages = [
    { perc: 60, weight: Math.round(oneRM * 0.6), reps: '15+', rpe: '5-6' },
    { perc: 70, weight: Math.round(oneRM * 0.7), reps: '10-12', rpe: '6-7' },
    { perc: 80, weight: Math.round(oneRM * 0.8), reps: '6-8', rpe: '7-8' },
    { perc: 90, weight: Math.round(oneRM * 0.9), reps: '3-4', rpe: '8-9' },
    { perc: 95, weight: Math.round(oneRM * 0.95), reps: '1-2', rpe: '9-10' },
  ];

  const handleSave = () => {
    onSave('Porcentajes', 'Cálculo', `${percentage}% = ${weight} kg`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white p-6 rounded-t-3xl relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Percent className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Calculadora de Porcentajes</h2>
                <p className="text-cyan-100 text-sm">Determina cargas de entrenamiento</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2 transition-colors backdrop-blur-sm">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">1RM del ejercicio</label>
              <div className="relative">
                <input
                  type="number"
                  value={oneRM}
                  onChange={(e) => setOneRM(Number(e.target.value))}
                  className="w-full px-4 py-4 pr-16 text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-center"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-500">kg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Porcentaje deseado: <span className="text-blue-600 font-bold">{percentage}%</span></label>
              <input
                type="range"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                min="50"
                max="100"
                className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 rounded-3xl p-6 border-2 border-blue-200 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wide">Peso a usar</p>
                <p className="text-5xl font-bold text-blue-700">{weight}</p>
                <p className="text-sm text-blue-600 font-semibold mt-1">kilogramos</p>
              </div>
              <div>
                <p className="text-sm font-bold text-cyan-600 mb-1 uppercase tracking-wide">Reps esperadas</p>
                <p className="text-5xl font-bold text-cyan-700">{repsExpected}</p>
                <p className="text-sm text-cyan-600 font-semibold mt-1">repeticiones</p>
              </div>
              <div>
                <p className="text-sm font-bold text-teal-600 mb-1 uppercase tracking-wide">RPE estimado</p>
                <p className="text-5xl font-bold text-teal-700">{rpe}</p>
                <p className="text-sm text-teal-600 font-semibold mt-1">intensidad</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-gray-200 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Porcentajes Comunes
            </h3>
            <div className="space-y-2">
              {commonPercentages.map((item) => {
                const getIntensityColor = (perc: number) => {
                  if (perc >= 90) return 'from-red-50 to-orange-50 border-red-200';
                  if (perc >= 80) return 'from-orange-50 to-amber-50 border-orange-200';
                  if (perc >= 70) return 'from-amber-50 to-yellow-50 border-amber-200';
                  return 'from-green-50 to-emerald-50 border-green-200';
                };

                return (
                  <div key={item.perc} className={`bg-gradient-to-r ${getIntensityColor(item.perc)} p-4 rounded-xl border-2 hover:scale-102 transition-all group flex justify-between items-center`}>
                    <span className="font-bold text-blue-700 text-lg px-3 py-1 bg-white rounded-lg">{item.perc}%</span>
                    <span className="font-bold text-gray-800 text-xl group-hover:scale-110 transition-transform">{item.weight} kg</span>
                    <span className="text-sm text-gray-700 font-semibold bg-white px-3 py-1 rounded-lg">{item.reps} reps</span>
                    <span className="text-sm text-gray-600 font-semibold bg-white px-3 py-1 rounded-lg">RPE {item.rpe}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3 bg-gray-50/80 backdrop-blur-sm">
          <button onClick={onClose} className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 hover:border-gray-400">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2 font-semibold hover:scale-105"
          >
            <Save className="w-5 h-5" />
            Guardar Resultado
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Calculadora de Volumen
const VolumeCalculatorModal: React.FC<{ onClose: () => void; onSave: (type: string, exercise: string, result: string) => void }> = ({ onClose, onSave }) => {
  const [exercises, setExercises] = useState([
    { name: 'Sentadilla', sets: 4, reps: 8, weight: 100 },
    { name: 'Press Banca', sets: 4, reps: 10, weight: 80 },
    { name: 'Peso Muerto', sets: 3, reps: 6, weight: 140 },
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: 'Nuevo Ejercicio', sets: 3, reps: 10, weight: 50 }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const totalVolume = exercises.reduce((sum, ex) => sum + (ex.sets * ex.reps * ex.weight), 0);

  const handleSave = () => {
    onSave('Volumen', 'Sesión Completa', `${totalVolume.toLocaleString()} kg`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6 rounded-t-3xl relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Calculadora de Volumen</h2>
                <p className="text-teal-100 text-sm">Calcula el tonelaje total de tu sesión</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2 transition-colors backdrop-blur-sm">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-6 text-center border-2 border-emerald-200 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10">
              <p className="text-sm font-bold text-emerald-600 mb-2 uppercase tracking-wide">Volumen Total</p>
              <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">{totalVolume.toLocaleString()}</p>
              <p className="text-lg text-emerald-600 font-semibold mt-2">kilogramos (tonelaje)</p>
            </div>
          </div>

          <div className="space-y-4">
            {exercises.map((ex, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-gray-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md">
                <div className="grid grid-cols-5 gap-3 items-center">
                  <input
                    type="text"
                    value={ex.name}
                    onChange={(e) => updateExercise(idx, 'name', e.target.value)}
                    className="col-span-2 px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white"
                    placeholder="Ejercicio"
                  />
                  <input
                    type="number"
                    value={ex.sets}
                    onChange={(e) => updateExercise(idx, 'sets', Number(e.target.value))}
                    className="px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white text-center font-semibold"
                    placeholder="Sets"
                  />
                  <input
                    type="number"
                    value={ex.reps}
                    onChange={(e) => updateExercise(idx, 'reps', Number(e.target.value))}
                    className="px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white text-center font-semibold"
                    placeholder="Reps"
                  />
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={ex.weight}
                        onChange={(e) => updateExercise(idx, 'weight', Number(e.target.value))}
                        className="w-full px-3 py-2 pr-10 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white text-center font-semibold"
                        placeholder="kg"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">kg</span>
                    </div>
                    <button
                      onClick={() => removeExercise(idx)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <p className="text-sm text-gray-700">
                    Volumen parcial: <span className="font-bold text-emerald-600 text-lg">{(ex.sets * ex.reps * ex.weight).toLocaleString()} kg</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addExercise}
            className="w-full py-4 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-2xl hover:bg-emerald-50 hover:border-emerald-400 transition-all font-bold text-lg flex items-center justify-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
              <span className="text-emerald-600 font-bold text-xl">+</span>
            </div>
            Agregar Ejercicio
          </button>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3 bg-gray-50/80 backdrop-blur-sm">
          <button onClick={onClose} className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 hover:border-gray-400">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all flex items-center gap-2 font-semibold hover:scale-105"
          >
            <Save className="w-5 h-5" />
            Guardar Resultado
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Calculadora de Calorías
const CaloriesCalculatorModal: React.FC<{ onClose: () => void; onSave: (type: string, exercise: string, result: string) => void }> = ({ onClose, onSave }) => {
  const [bodyWeight, setBodyWeight] = useState(75);
  const [duration, setDuration] = useState(60);
  const [trainingType, setTrainingType] = useState('strength');
  const [intensity, setIntensity] = useState('medium');

  const metValues: { [key: string]: { [key: string]: number } } = {
    strength: { low: 3.5, medium: 5.0, high: 6.0 },
    hiit: { low: 6.0, medium: 8.0, high: 10.0 },
    cardio: { low: 5.0, medium: 7.0, high: 9.0 },
    functional: { low: 4.0, medium: 6.0, high: 8.0 },
  };

  const met = metValues[trainingType][intensity];
  const calories = Math.round((met * bodyWeight * duration) / 60);

  const handleSave = () => {
    onSave('Calorías', trainingType === 'strength' ? 'Entrenamiento de Fuerza' : trainingType === 'hiit' ? 'HIIT' : 'Cardio', `${calories} kcal`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Flame className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Calorías Quemadas</h2>
                <p className="text-orange-100 text-sm">Estima el gasto calórico</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2 transition-colors backdrop-blur-sm">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Peso corporal (kg)</label>
              <input
                type="number"
                value={bodyWeight}
                onChange={(e) => setBodyWeight(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duración (minutos)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de entrenamiento</label>
              <select
                value={trainingType}
                onChange={(e) => setTrainingType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="strength">Fuerza</option>
                <option value="hiit">HIIT</option>
                <option value="cardio">Cardio</option>
                <option value="functional">Funcional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Intensidad</label>
              <select
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm font-semibold text-orange-600 mb-1">Calorías Quemadas</p>
                <p className="text-5xl font-bold text-orange-700">{calories}</p>
                <p className="text-lg text-orange-600">kcal</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-600 mb-1">MET</p>
                <p className="text-5xl font-bold text-orange-700">{met}</p>
                <p className="text-lg text-orange-600">equivalente</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Comparativa</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Caminar (1 hora)</span>
                <span className="font-bold text-orange-600">~200 kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Correr (1 hora)</span>
                <span className="font-bold text-orange-600">~600 kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Natación (1 hora)</span>
                <span className="font-bold text-orange-600">~500 kcal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center gap-2 font-semibold hover:scale-105"
          >
            <Save className="w-5 h-5" />
            Guardar Resultado
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Calculadora RPE/RIR
const RPECalculatorModal: React.FC<{ onClose: () => void; onSave: (type: string, exercise: string, result: string) => void }> = ({ onClose, onSave }) => {
  const [rpe, setRpe] = useState(8);

  const rpeData = [
    { rpe: 10, rir: 0, percentage: 100, description: 'Fallo muscular total' },
    { rpe: 9.5, rir: 0.5, percentage: 98, description: 'Podría hacer 0.5 reps más' },
    { rpe: 9, rir: 1, percentage: 95, description: '1 rep en reserva' },
    { rpe: 8.5, rir: 1.5, percentage: 92, description: '1-2 reps en reserva' },
    { rpe: 8, rir: 2, percentage: 90, description: '2 reps en reserva' },
    { rpe: 7.5, rir: 2.5, percentage: 87, description: '2-3 reps en reserva' },
    { rpe: 7, rir: 3, percentage: 85, description: '3 reps en reserva' },
    { rpe: 6, rir: 4, percentage: 80, description: '4+ reps en reserva' },
    { rpe: 5, rir: 5, percentage: 75, description: 'Muy fácil' },
  ];

  const current = rpeData.find(d => d.rpe === rpe) || rpeData[4];

  const handleSave = () => {
    onSave('RPE/RIR', 'Cálculo de Intensidad', `RPE ${rpe} = RIR ${current.rir}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Calculadora RPE/RIR</h2>
                <p className="text-purple-100 text-sm">Convierte escalas de intensidad</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-purple-600 rounded-full p-2 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">RPE Actual: {rpe}</label>
            <input
              type="range"
              value={rpe}
              onChange={(e) => setRpe(Number(e.target.value))}
              min="5"
              max="10"
              step="0.5"
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm font-semibold text-purple-600 mb-1">RPE</p>
                <p className="text-5xl font-bold text-purple-700">{current.rpe}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-purple-600 mb-1">RIR</p>
                <p className="text-5xl font-bold text-purple-700">{current.rir}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-purple-600 mb-1">% 1RM</p>
                <p className="text-5xl font-bold text-purple-700">{current.percentage}%</p>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4">{current.description}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Tabla de Conversión</h3>
            <div className="space-y-2">
              {rpeData.map((data) => (
                <div
                  key={data.rpe}
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    data.rpe === rpe ? 'bg-purple-100 border-2 border-purple-300' : 'bg-white'
                  }`}
                >
                  <span className="font-bold text-purple-600">RPE {data.rpe}</span>
                  <span className="text-gray-700">RIR {data.rir}</span>
                  <span className="text-gray-700">{data.percentage}%</span>
                  <span className="text-sm text-gray-500">{data.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">💡 Explicación</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>RPE:</strong> Rating of Perceived Exertion (Esfuerzo Percibido)</li>
              <li><strong>RIR:</strong> Reps In Reserve (Repeticiones en Reserva)</li>
              <li><strong>% 1RM:</strong> Porcentaje de tu Repetición Máxima</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Cerrar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Save className="w-5 h-5" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

// Planificador de Progresión
const ProgressionCalculatorModal: React.FC<{ onClose: () => void; onSave: (type: string, exercise: string, result: string) => void }> = ({ onClose, onSave }) => {
  const [currentRM, setCurrentRM] = useState(100);
  const [weeks, setWeeks] = useState(12);
  const [method, setMethod] = useState('linear');
  const [increment, setIncrement] = useState(2);

  const progression = [];
  for (let i = 0; i <= weeks; i++) {
    const weekRM = method === 'linear'
      ? currentRM + (increment * i)
      : currentRM + (increment * i) + Math.sin(i / 2) * 2; // Ondulante simulado
    progression.push({
      week: i,
      rm: Math.round(weekRM * 10) / 10,
      load80: Math.round(weekRM * 0.8 * 10) / 10,
    });
  }

  const finalRM = progression[progression.length - 1].rm;

  const handleSave = () => {
    onSave('Progresión', `Plan ${weeks} semanas`, `${currentRM}kg → ${finalRM}kg`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Planificador de Progresión</h2>
                <p className="text-emerald-100 text-sm">Planifica tus incrementos de carga</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-emerald-600 rounded-full p-2 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">1RM Actual (kg)</label>
              <input
                type="number"
                value={currentRM}
                onChange={(e) => setCurrentRM(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duración (semanas)</label>
              <input
                type="number"
                value={weeks}
                onChange={(e) => setWeeks(Math.min(52, Math.max(1, Number(e.target.value))))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Método</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="linear">Lineal</option>
                <option value="undulating">Ondulante</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Incremento (kg/sem)</label>
              <input
                type="number"
                value={increment}
                onChange={(e) => setIncrement(Number(e.target.value))}
                step="0.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border-2 border-emerald-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm font-semibold text-emerald-600 mb-1">1RM Inicial</p>
                <p className="text-4xl font-bold text-emerald-700">{currentRM} kg</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-600 mb-1">1RM Objetivo</p>
                <p className="text-4xl font-bold text-emerald-700">{finalRM} kg</p>
              </div>
            </div>
            <p className="text-center text-emerald-600 mt-3 font-semibold">
              Ganancia total: +{(finalRM - currentRM).toFixed(1)} kg ({(((finalRM - currentRM) / currentRM) * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 max-h-80 overflow-y-auto">
            <h3 className="font-bold text-gray-800 mb-3 sticky top-0 bg-gray-50">Progresión Semana a Semana</h3>
            <div className="space-y-2">
              {progression.filter((_, i) => i % Math.ceil(weeks / 12) === 0 || i === weeks).map((week) => (
                <div key={week.week} className="bg-white p-3 rounded-lg flex justify-between items-center">
                  <span className="font-semibold text-emerald-600">Semana {week.week}</span>
                  <span className="text-gray-700">1RM: <strong>{week.rm} kg</strong></span>
                  <span className="text-sm text-gray-500">80%: {week.load80} kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Save className="w-5 h-5" />
            Guardar Plan
          </button>
        </div>
      </div>
    </div>
  );
};

// Conversor de Unidades
const ConverterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [category, setCategory] = useState<'weight' | 'height' | 'distance'>('weight');
  const [value, setValue] = useState(100);

  const conversions = {
    weight: {
      label: 'Peso',
      from: 'kg',
      to: 'lbs',
      factor: 2.20462,
      common: [
        { kg: 20, lbs: 44 },
        { kg: 40, lbs: 88 },
        { kg: 60, lbs: 132 },
        { kg: 80, lbs: 176 },
        { kg: 100, lbs: 220 },
      ],
    },
    height: {
      label: 'Altura',
      from: 'cm',
      to: 'inch',
      factor: 0.393701,
      common: [
        { cm: 150, inch: 59 },
        { cm: 160, inch: 63 },
        { cm: 170, inch: 67 },
        { cm: 180, inch: 71 },
        { cm: 190, inch: 75 },
      ],
    },
    distance: {
      label: 'Distancia',
      from: 'km',
      to: 'miles',
      factor: 0.621371,
      common: [
        { km: 5, miles: 3.1 },
        { km: 10, miles: 6.2 },
        { km: 21, miles: 13.1 },
        { km: 42, miles: 26.2 },
      ],
    },
  };

  const conv = conversions[category];
  const converted = (value * conv.factor).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ArrowLeftRight className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Conversor de Unidades</h2>
                <p className="text-gray-100 text-sm">Convierte entre unidades</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-gray-600 rounded-full p-2 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-2">
            {(['weight', 'height', 'distance'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  category === cat
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {conversions[cat].label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{conv.from}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 text-2xl font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{conv.to}</label>
              <div className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-gray-50 text-2xl font-bold text-center text-gray-700">
                {converted}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Equivalencias Comunes</h3>
            <div className="space-y-2">
              {conv.common.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-3 rounded-lg flex justify-between items-center">
                  <span className="font-bold text-gray-700">
                    {Object.values(item)[0]} {conv.from}
                  </span>
                  <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                  <span className="font-bold text-gray-700">
                    {Object.values(item)[1]} {conv.to}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Calculadora de Wilks
const WilksCalculatorModal: React.FC<{ onClose: () => void; onSave: (type: string, exercise: string, result: string) => void }> = ({ onClose, onSave }) => {
  const [bodyWeight, setBodyWeight] = useState(75);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [squat, setSquat] = useState(150);
  const [bench, setBench] = useState(100);
  const [deadlift, setDeadlift] = useState(180);

  const calculateWilks = () => {
    const total = squat + bench + deadlift;
    const bw = bodyWeight;

    // Coeficientes de Wilks
    const coeff = gender === 'male'
      ? [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863E-06, -1.291E-08]
      : [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582E-05, -9.054E-08];

    const denom = coeff[0] + coeff[1] * bw + coeff[2] * Math.pow(bw, 2) +
                   coeff[3] * Math.pow(bw, 3) + coeff[4] * Math.pow(bw, 4) +
                   coeff[5] * Math.pow(bw, 5);

    return Math.round((500 / denom) * total * 100) / 100;
  };

  const wilks = calculateWilks();
  const total = squat + bench + deadlift;

  const classification =
    wilks >= 400 ? 'Elite Mundial' :
    wilks >= 350 ? 'Elite' :
    wilks >= 300 ? 'Avanzado' :
    wilks >= 250 ? 'Intermedio' :
    'Principiante';

  const handleSave = () => {
    onSave('Wilks', 'Score Powerlifting', `${wilks} pts - ${classification}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Calculadora de Wilks</h2>
                <p className="text-yellow-100 text-sm">Score de fuerza relativa</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-yellow-600 rounded-full p-2 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Peso corporal (kg)</label>
              <input
                type="number"
                value={bodyWeight}
                onChange={(e) => setBodyWeight(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sexo</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sentadilla (kg)</label>
              <input
                type="number"
                value={squat}
                onChange={(e) => setSquat(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Press Banca (kg)</label>
              <input
                type="number"
                value={bench}
                onChange={(e) => setBench(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Peso Muerto (kg)</label>
              <input
                type="number"
                value={deadlift}
                onChange={(e) => setDeadlift(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
              <div>
                <p className="text-sm font-semibold text-yellow-600 mb-1">Total Levantado</p>
                <p className="text-4xl font-bold text-yellow-700">{total}</p>
                <p className="text-sm text-yellow-600">kg</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-600 mb-1">Score Wilks</p>
                <p className="text-4xl font-bold text-yellow-700">{wilks}</p>
                <p className="text-sm text-yellow-600">puntos</p>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full font-bold text-lg">
                {classification}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Clasificación Wilks</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Principiante</span>
                <span className="font-bold">&lt; 250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Intermedio</span>
                <span className="font-bold">250 - 300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avanzado</span>
                <span className="font-bold">300 - 350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Elite</span>
                <span className="font-bold">350 - 400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Elite Mundial</span>
                <span className="font-bold">&gt; 400</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Save className="w-5 h-5" />
            Guardar Resultado
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculadorasFuerzaPage;