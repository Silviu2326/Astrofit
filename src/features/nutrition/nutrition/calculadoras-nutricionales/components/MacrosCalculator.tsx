import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calculator, Target, Beef, Wheat, Droplet, Info, Flame } from 'lucide-react';

type DietPreference = 'balanced' | 'keto' | 'high-protein' | 'low-fat';

const MacrosCalculator: React.FC = () => {
  const [tdee, setTdee] = useState<number>(2000);
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain');
  const [dietPreference, setDietPreference] = useState<DietPreference>('balanced');
  const [proteinRatio, setProteinRatio] = useState<number>(30);
  const [carbRatio, setCarbRatio] = useState<number>(40);
  const [fatRatio, setFatRatio] = useState<number>(30);
  const [calculated, setCalculated] = useState<boolean>(false);

  const dietPresets: Record<DietPreference, { protein: number; carb: number; fat: number }> = {
    balanced: { protein: 30, carb: 40, fat: 30 },
    keto: { protein: 30, carb: 10, fat: 60 },
    'high-protein': { protein: 40, carb: 35, fat: 25 },
    'low-fat': { protein: 30, carb: 50, fat: 20 }
  };

  const applyPreset = (preset: DietPreference) => {
    setDietPreference(preset);
    setProteinRatio(dietPresets[preset].protein);
    setCarbRatio(dietPresets[preset].carb);
    setFatRatio(dietPresets[preset].fat);
  };

  const normalizeRatios = () => {
    const total = proteinRatio + carbRatio + fatRatio;
    if (total !== 100) {
      setProteinRatio(Math.round((proteinRatio / total) * 100));
      setCarbRatio(Math.round((carbRatio / total) * 100));
      setFatRatio(Math.round((fatRatio / total) * 100));
    }
  };

  const calculateMacros = () => {
    normalizeRatios();
    setCalculated(true);
  };

  let adjustedTdee = tdee;
  if (goal === 'lose') {
    adjustedTdee = tdee - 500;
  } else if (goal === 'gain') {
    adjustedTdee = tdee + 300;
  }

  const proteinCals = adjustedTdee * (proteinRatio / 100);
  const carbCals = adjustedTdee * (carbRatio / 100);
  const fatCals = adjustedTdee * (fatRatio / 100);

  const proteinGrams = Math.round(proteinCals / 4);
  const carbGrams = Math.round(carbCals / 4);
  const fatGrams = Math.round(fatCals / 9);

  const chartData = [
    { name: 'Proteína', value: proteinRatio, grams: proteinGrams, calories: proteinCals, color: '#3b82f6' },
    { name: 'Carbohidratos', value: carbRatio, grams: carbGrams, calories: carbCals, color: '#10b981' },
    { name: 'Grasas', value: fatRatio, grams: fatGrams, calories: fatCals, color: '#f59e0b' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Macros Calculator</h2>
            <p className="text-sm text-gray-600">Distribución de Macronutrientes</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-6 mb-6">
          {/* TDEE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-purple-600" />
              TDEE o Calorías Objetivo
            </label>
            <input
              type="number"
              value={tdee}
              onChange={(e) => setTdee(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
              placeholder="2000"
            />
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Objetivo
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'lose', label: 'Perder', icon: '📉' },
                { value: 'maintain', label: 'Mantener', icon: '⚖️' },
                { value: 'gain', label: 'Ganar', icon: '📈' }
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value as 'maintain' | 'lose' | 'gain')}
                  className={`
                    px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${goal === g.value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <span>{g.icon}</span>
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preferencia de dieta (Presets) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferencia de Dieta</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'balanced', label: 'Balanceada', desc: '30/40/30' },
                { value: 'keto', label: 'Keto', desc: '30/10/60' },
                { value: 'high-protein', label: 'Alta Proteína', desc: '40/35/25' },
                { value: 'low-fat', label: 'Baja Grasa', desc: '30/50/20' }
              ].map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => applyPreset(preset.value as DietPreference)}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-300 border-2
                    ${dietPreference === preset.value
                      ? 'bg-purple-50 border-purple-500'
                      : 'bg-white border-gray-200 hover:border-purple-300'
                    }
                  `}
                >
                  <p className="font-bold text-gray-900 mb-1">{preset.label}</p>
                  <p className="text-xs text-gray-600">P/C/G: {preset.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders para ajuste manual */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-600" />
              Ajuste Manual de Ratios
            </h3>

            {/* Proteína */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Beef className="w-4 h-4 text-blue-600" />
                  Proteína
                </label>
                <span className="text-lg font-bold text-blue-600">{proteinRatio}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={proteinRatio}
                onChange={(e) => setProteinRatio(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Carbohidratos */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Wheat className="w-4 h-4 text-green-600" />
                  Carbohidratos
                </label>
                <span className="text-lg font-bold text-green-600">{carbRatio}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="70"
                value={carbRatio}
                onChange={(e) => setCarbRatio(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            {/* Grasas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-amber-600" />
                  Grasas
                </label>
                <span className="text-lg font-bold text-amber-600">{fatRatio}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={fatRatio}
                onChange={(e) => setFatRatio(Number(e.target.value))}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t-2 border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Total</span>
                <span className={`text-lg font-bold ${proteinRatio + carbRatio + fatRatio === 100 ? 'text-green-600' : 'text-red-600'}`}>
                  {proteinRatio + carbRatio + fatRatio}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Calcular */}
        <motion.button
          onClick={calculateMacros}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-8"
        >
          Calcular Macros
        </motion.button>

        {/* Resultados */}
        {calculated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Calorías ajustadas */}
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                {goal === 'lose' ? '📉 Déficit Calórico' : goal === 'gain' ? '📈 Superávit Calórico' : '⚖️ Mantenimiento'}
              </p>
              <p className="text-4xl font-bold text-purple-600">{adjustedTdee.toLocaleString()}</p>
              <p className="text-sm text-gray-600">calorías/día</p>
            </div>

            {/* Gráfico de dona */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Chart */}
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Detalles */}
              <div className="w-full md:w-1/2 space-y-4">
                {chartData.map((macro) => (
                  <div key={macro.name} className="p-4 bg-white rounded-2xl border-2" style={{ borderColor: macro.color }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{macro.name}</h4>
                      <span className="px-3 py-1 rounded-full text-white font-bold text-sm" style={{ backgroundColor: macro.color }}>
                        {macro.value}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <p className="text-3xl font-bold" style={{ color: macro.color }}>{macro.grams}g</p>
                      <p className="text-sm text-gray-600">({Math.round(macro.calories)} kcal)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribución en comidas (ejemplo) */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600" />
                Distribución Sugerida en 4 Comidas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Desayuno', 'Almuerzo', 'Merienda', 'Cena'].map((meal, index) => {
                  const factor = index === 2 ? 0.15 : 0.283; // Merienda más pequeña
                  return (
                    <div key={meal} className="p-3 bg-white rounded-xl border border-purple-200">
                      <p className="text-sm font-bold text-gray-900 mb-2">{meal}</p>
                      <p className="text-xs text-gray-600">P: {Math.round(proteinGrams * factor)}g</p>
                      <p className="text-xs text-gray-600">C: {Math.round(carbGrams * factor)}g</p>
                      <p className="text-xs text-gray-600">G: {Math.round(fatGrams * factor)}g</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MacrosCalculator;
