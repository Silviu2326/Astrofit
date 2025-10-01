import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wheat, Target, TrendingUp, Apple, Info, Scale } from 'lucide-react';

interface FiberSource {
  food: string;
  serving: string;
  fiber: number;
  icon: string;
}

const FibraCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [calories, setCalories] = useState<number>(2000);
  const [goal, setGoal] = useState<'general' | 'digestive_health' | 'weight_loss'>('general');
  const [fiberIntakeGrams, setFiberIntakeGrams] = useState<number | null>(null);

  const fiberSources: FiberSource[] = [
    { food: 'Lentejas (cocidas)', serving: '1 taza', fiber: 15.6, icon: '🫘' },
    { food: 'Frijoles negros', serving: '1 taza', fiber: 15.0, icon: '🫘' },
    { food: 'Pera (con piel)', serving: '1 mediana', fiber: 5.5, icon: '🍐' },
    { food: 'Aguacate', serving: '1 mediano', fiber: 10.0, icon: '🥑' },
    { food: 'Avena', serving: '1 taza', fiber: 8.0, icon: '🥣' },
    { food: 'Almendras', serving: '28g', fiber: 3.5, icon: '🌰' },
    { food: 'Brócoli (cocido)', serving: '1 taza', fiber: 5.1, icon: '🥦' },
    { food: 'Manzana (con piel)', serving: '1 mediana', fiber: 4.4, icon: '🍎' },
    { food: 'Pan integral', serving: '2 rebanadas', fiber: 4.0, icon: '🍞' },
    { food: 'Semillas de chía', serving: '28g', fiber: 10.6, icon: '🌾' }
  ];

  const calculateFiberIntake = () => {
    let recommendedGrams: number;

    // Recomendación basada en calorías: 14g por 1000 kcal
    recommendedGrams = (calories / 1000) * 14;

    // Ajuste por género (hombres necesitan más)
    if (gender === 'male' && recommendedGrams < 30) {
      recommendedGrams = 30;
    } else if (gender === 'female' && recommendedGrams < 25) {
      recommendedGrams = 25;
    }

    // Ajuste por objetivo
    if (goal === 'digestive_health') {
      recommendedGrams += 5;
    } else if (goal === 'weight_loss') {
      recommendedGrams += 3;
    }

    // Límite superior seguro
    if (recommendedGrams > 50) {
      recommendedGrams = 50;
    }

    setFiberIntakeGrams(Math.round(recommendedGrams));
  };

  const getMealDistribution = () => {
    if (!fiberIntakeGrams) return [];

    return [
      { meal: 'Desayuno', fiber: Math.round(fiberIntakeGrams * 0.25), percentage: 25 },
      { meal: 'Almuerzo', fiber: Math.round(fiberIntakeGrams * 0.35), percentage: 35 },
      { meal: 'Merienda', fiber: Math.round(fiberIntakeGrams * 0.15), percentage: 15 },
      { meal: 'Cena', fiber: Math.round(fiberIntakeGrams * 0.25), percentage: 25 }
    ];
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
            <Wheat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fibra Calculator</h2>
            <p className="text-sm text-gray-600">Calculadora de Fibra Dietética</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-6 mb-6">
          {/* Edad y Género */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
                placeholder="30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Género</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
          </div>

          {/* Calorías consumidas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              Calorías Consumidas Diariamente
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
              placeholder="2000"
            />
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              Objetivo de Salud
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'general', label: 'Salud General', icon: '💚' },
                { value: 'digestive_health', label: 'Salud Digestiva', icon: '🌿' },
                { value: 'weight_loss', label: 'Control de Peso', icon: '📉' }
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value as 'general' | 'digestive_health' | 'weight_loss')}
                  className={`
                    px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex flex-col items-center gap-2
                    ${goal === g.value
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <span className="text-2xl">{g.icon}</span>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Botón Calcular */}
        <motion.button
          onClick={calculateFiberIntake}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-red-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-8"
        >
          <span className="flex items-center justify-center gap-2">
            <Wheat className="w-6 h-6" />
            Calcular Fibra Recomendada
          </span>
        </motion.button>

        {/* Resultados */}
        {fiberIntakeGrams && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Resultado Principal */}
            <div className="p-8 bg-gradient-to-br from-amber-500 via-orange-600 to-red-500 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Pattern decorativo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10 text-center">
                <p className="text-orange-100 text-sm font-semibold mb-2">FIBRA DIARIA RECOMENDADA</p>
                <p className="text-6xl font-bold text-white mb-2">{fiberIntakeGrams}g</p>
                <p className="text-xl text-orange-100 font-semibold">gramos/día</p>
              </div>
            </div>

            {/* Progreso vs objetivo */}
            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-2xl border-2 border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Tu Objetivo Diario
                </h3>
                <span className="px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded-full">
                  {goal === 'digestive_health' ? 'Alto' : goal === 'weight_loss' ? 'Moderado' : 'Normal'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-600 rounded-full flex items-center justify-end pr-3"
                >
                  <span className="text-white font-bold text-sm">{fiberIntakeGrams}g</span>
                </motion.div>
              </div>

              <p className="text-sm text-gray-700">
                Objetivo basado en {calories} kcal/día ({gender === 'male' ? 'hombre' : 'mujer'})
              </p>
            </div>

            {/* Distribución en comidas */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-amber-50/30 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-600" />
                Distribución en Comidas
              </h3>
              <div className="space-y-3">
                {getMealDistribution().map((meal, index) => (
                  <motion.div
                    key={meal.meal}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-amber-200 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                        {meal.percentage}%
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{meal.meal}</p>
                        <p className="text-xs text-gray-600">{meal.fiber}g de fibra</p>
                      </div>
                    </div>

                    {/* Mini progress */}
                    <div className="flex-1 mx-4 max-w-[150px]">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                          style={{ width: `${meal.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fuentes principales de fibra */}
            <div className="p-6 bg-white rounded-2xl border-2 border-amber-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Apple className="w-5 h-5 text-amber-600" />
                Principales Fuentes de Fibra
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-amber-200">
                      <th className="text-left py-3 px-2 text-sm font-bold text-gray-700"></th>
                      <th className="text-left py-3 px-2 text-sm font-bold text-gray-700">Alimento</th>
                      <th className="text-left py-3 px-2 text-sm font-bold text-gray-700">Porción</th>
                      <th className="text-right py-3 px-2 text-sm font-bold text-gray-700">Fibra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiberSources.slice(0, 8).map((source, index) => (
                      <motion.tr
                        key={source.food}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-amber-50 transition-colors"
                      >
                        <td className="py-3 px-2 text-2xl">{source.icon}</td>
                        <td className="py-3 px-2 font-semibold text-gray-900 text-sm">{source.food}</td>
                        <td className="py-3 px-2 text-gray-600 text-sm">{source.serving}</td>
                        <td className="py-3 px-2 text-right">
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-sm">
                            {source.fiber}g
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Beneficios */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-green-600" />
                Beneficios de una Dieta Alta en Fibra
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Salud digestiva:</strong> Mejora el tránsito intestinal y previene el estreñimiento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Control de peso:</strong> Aumenta la saciedad y reduce el apetito</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Salud cardiovascular:</strong> Ayuda a reducir el colesterol LDL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Control de azúcar:</strong> Ralentiza la absorción de azúcar en sangre</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FibraCalculator;
