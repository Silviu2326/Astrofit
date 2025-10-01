import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, TrendingUp, TrendingDown, Info, Heart, Scale } from 'lucide-react';

type Formula = 'mifflin' | 'harris' | 'katch';

const TDEECalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [formula, setFormula] = useState<Formula>('mifflin');
  const [bodyFat, setBodyFat] = useState<number>(20); // Para Katch-McArdle
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateBMR = (): number => {
    let calculatedBmr: number;

    if (formula === 'mifflin') {
      // Mifflin-St Jeor (Más precisa y moderna)
      if (gender === 'male') {
        calculatedBmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        calculatedBmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
    } else if (formula === 'harris') {
      // Harris-Benedict (Clásica)
      if (gender === 'male') {
        calculatedBmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        calculatedBmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
    } else {
      // Katch-McArdle (Basada en masa magra)
      const leanMass = weight * (1 - bodyFat / 100);
      calculatedBmr = 370 + (21.6 * leanMass);
    }

    return calculatedBmr;
  };

  const calculateTDEE = () => {
    const calculatedBmr = calculateBMR();

    let activityFactor: number;
    switch (activityLevel) {
      case 'sedentary':
        activityFactor = 1.2;
        break;
      case 'light':
        activityFactor = 1.375;
        break;
      case 'moderate':
        activityFactor = 1.55;
        break;
      case 'active':
        activityFactor = 1.725;
        break;
      case 'very_active':
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.2;
    }

    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedBmr * activityFactor));
  };

  const getMetabolicLevel = (): { level: string; color: string; percentage: number } => {
    if (!bmr) return { level: 'Sin calcular', color: 'gray', percentage: 0 };

    const bmrPerKg = bmr / weight;

    if (bmrPerKg < 20) return { level: 'Bajo', color: 'orange', percentage: 40 };
    if (bmrPerKg < 22) return { level: 'Normal', color: 'green', percentage: 60 };
    if (bmrPerKg < 25) return { level: 'Alto', color: 'cyan', percentage: 80 };
    return { level: 'Muy Alto', color: 'indigo', percentage: 95 };
  };

  const metabolicData = getMetabolicLevel();

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">TDEE Calculator</h2>
            <p className="text-sm text-gray-600">Calculadora de Gasto Energético Total Diario</p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Peso */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-600" />
              Peso (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
              placeholder="70"
            />
          </div>

          {/* Altura */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600" />
              Altura (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
              placeholder="175"
            />
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
              placeholder="30"
            />
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Género</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>

          {/* Nivel de Actividad */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nivel de Actividad</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
            >
              <option value="sedentary">🛋️ Sedentario (poco o ningún ejercicio)</option>
              <option value="light">🚶 Ligero (ejercicio 1-3 días/semana)</option>
              <option value="moderate">🏃 Moderado (ejercicio 3-5 días/semana)</option>
              <option value="active">💪 Activo (ejercicio 6-7 días/semana)</option>
              <option value="very_active">🔥 Muy Activo (ejercicio intenso + trabajo físico)</option>
            </select>
          </div>

          {/* Fórmula */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              Fórmula de Cálculo
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-50">
                  <strong>Mifflin-St Jeor:</strong> Más precisa y moderna<br/>
                  <strong>Harris-Benedict:</strong> Clásica<br/>
                  <strong>Katch-McArdle:</strong> Requiere % grasa corporal
                </div>
              </div>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'mifflin', label: 'Mifflin-St Jeor' },
                { value: 'harris', label: 'Harris-Benedict' },
                { value: 'katch', label: 'Katch-McArdle' }
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormula(f.value as Formula)}
                  className={`
                    px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                    ${formula === f.value
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grasa Corporal (solo para Katch-McArdle) */}
          {formula === 'katch' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">% Grasa Corporal</label>
              <input
                type="number"
                value={bodyFat}
                onChange={(e) => setBodyFat(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
                placeholder="20"
              />
            </div>
          )}
        </div>

        {/* Botón Calcular */}
        <motion.button
          onClick={calculateTDEE}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-8"
        >
          <span className="flex items-center justify-center gap-2">
            <Flame className="w-6 h-6" />
            Calcular TDEE
          </span>
        </motion.button>

        {/* Resultados */}
        {tdee && bmr && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* BMR */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-cyan-50/50 rounded-2xl border-2 border-cyan-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-cyan-600" />
                  BMR (Metabolismo Basal)
                </span>
                <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full">
                  {metabolicData.level}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-3">{bmr.toLocaleString()} kcal/día</p>

              {/* Gauge visual */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metabolicData.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r from-${metabolicData.color}-400 to-${metabolicData.color}-600 rounded-full`}
                  style={{
                    background: `linear-gradient(to right, rgb(34, 211, 238), rgb(59, 130, 246))`
                  }}
                />
              </div>
            </div>

            {/* TDEE */}
            <div className="p-8 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Pattern decorativo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10">
                <p className="text-cyan-100 text-sm font-semibold mb-2">TU TDEE ESTIMADO</p>
                <p className="text-6xl font-bold text-white mb-2">{tdee.toLocaleString()}</p>
                <p className="text-2xl text-cyan-100 font-semibold">calorías/día</p>
              </div>
            </div>

            {/* Recomendaciones según objetivo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Déficit (Perder peso) */}
              <div className="p-5 bg-white rounded-2xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Perder Peso</h3>
                </div>
                <p className="text-3xl font-bold text-orange-600 mb-1">{(tdee - 500).toLocaleString()}</p>
                <p className="text-xs text-gray-600">Déficit de 500 kcal/día<br/>~0.5kg pérdida/semana</p>
              </div>

              {/* Mantenimiento */}
              <div className="p-5 bg-white rounded-2xl border-2 border-green-200 hover:border-green-400 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-gray-900">Mantener</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-1">{tdee.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Sin déficit ni superávit<br/>Mantenimiento</p>
              </div>

              {/* Superávit (Ganar peso) */}
              <div className="p-5 bg-white rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Ganar Masa</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-1">{(tdee + 300).toLocaleString()}</p>
                <p className="text-xs text-gray-600">Superávit de 300 kcal/día<br/>~0.25kg ganancia/semana</p>
              </div>
            </div>

            {/* Info adicional */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Nota importante:</p>
                  <p className="text-blue-800">Estos cálculos son estimaciones. Los resultados pueden variar según metabolismo individual, composición corporal y otros factores. Consulta con un profesional de la salud para planes personalizados.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TDEECalculator;
