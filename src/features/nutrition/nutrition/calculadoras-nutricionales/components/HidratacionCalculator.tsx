import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, CloudRain, Activity, Clock, Info, Scale } from 'lucide-react';

const HidratacionCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [climate, setClimate] = useState<'temperate' | 'hot'>('temperate');
  const [exerciseDuration, setExerciseDuration] = useState<number>(0);
  const [waterIntakeMl, setWaterIntakeMl] = useState<number | null>(null);

  const calculateWaterIntake = () => {
    // Fórmula base: 30-40 ml por kg de peso corporal
    let baseIntake = weight * 35;

    // Ajuste por nivel de actividad
    if (activityLevel === 'low') {
      baseIntake *= 0.9;
    } else if (activityLevel === 'high') {
      baseIntake *= 1.15;
    }

    // Ajuste por clima
    if (climate === 'hot') {
      baseIntake *= 1.1;
    }

    // Ajuste por ejercicio adicional (500ml por hora de ejercicio)
    baseIntake += exerciseDuration * 500;

    setWaterIntakeMl(Math.round(baseIntake));
  };

  const glasses = waterIntakeMl ? Math.ceil(waterIntakeMl / 250) : 0; // Vasos de 250ml

  const timeDistribution = [
    { time: '7:00 AM', label: 'Al despertar', glasses: 2 },
    { time: '10:00 AM', label: 'Media mañana', glasses: 1 },
    { time: '12:00 PM', label: 'Antes de almuerzo', glasses: 1 },
    { time: '3:00 PM', label: 'Tarde', glasses: 2 },
    { time: '6:00 PM', label: 'Antes de cena', glasses: 1 },
    { time: '9:00 PM', label: 'Noche', glasses: 1 }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hidratación Calculator</h2>
            <p className="text-sm text-gray-600">Calculadora de Agua Diaria</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-6 mb-6">
          {/* Peso */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              Peso Corporal (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
              placeholder="70"
            />
          </div>

          {/* Nivel de Actividad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Nivel de Actividad Física
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'low', label: 'Bajo', icon: '🚶' },
                { value: 'moderate', label: 'Moderado', icon: '🏃' },
                { value: 'high', label: 'Alto', icon: '💪' }
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value as 'low' | 'moderate' | 'high')}
                  className={`
                    px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex flex-col items-center gap-2
                    ${activityLevel === level.value
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <span className="text-2xl">{level.icon}</span>
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clima */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-blue-600" />
              Clima
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'temperate', label: 'Templado', icon: <CloudRain className="w-5 h-5" /> },
                { value: 'hot', label: 'Caluroso', icon: <Sun className="w-5 h-5" /> }
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => setClimate(c.value as 'temperate' | 'hot')}
                  className={`
                    px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${climate === c.value
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {c.icon}
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duración de ejercicio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Duración de Ejercicio Adicional (horas/día)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="4"
                step="0.5"
                value={exerciseDuration}
                onChange={(e) => setExerciseDuration(Number(e.target.value))}
                className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-2xl font-bold text-blue-600 min-w-[60px]">{exerciseDuration}h</span>
            </div>
          </div>
        </div>

        {/* Botón Calcular */}
        <motion.button
          onClick={calculateWaterIntake}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 via-cyan-600 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-8"
        >
          <span className="flex items-center justify-center gap-2">
            <Droplets className="w-6 h-6" />
            Calcular Hidratación
          </span>
        </motion.button>

        {/* Resultados */}
        {waterIntakeMl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Resultado Principal */}
            <div className="p-8 bg-gradient-to-br from-blue-500 via-cyan-600 to-teal-500 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Pattern decorativo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10 text-center">
                <p className="text-cyan-100 text-sm font-semibold mb-2">INGESTA RECOMENDADA</p>
                <p className="text-6xl font-bold text-white mb-2">{(waterIntakeMl / 1000).toFixed(1)}L</p>
                <p className="text-xl text-cyan-100 font-semibold mb-4">{waterIntakeMl.toLocaleString()} ml/día</p>

                {/* Vasos equivalentes */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {Array.from({ length: Math.min(glasses, 12) }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Droplets className="w-6 h-6 text-white" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-cyan-100 mt-2">≈ {glasses} vasos de 250ml</p>
              </div>
            </div>

            {/* Distribución durante el día */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50/50 rounded-2xl border-2 border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Distribución Sugerida Durante el Día
              </h3>
              <div className="space-y-3">
                {timeDistribution.map((slot, index) => (
                  <motion.div
                    key={slot.time}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-xl border border-blue-200 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{slot.time}</p>
                        <p className="text-xs text-gray-600">{slot.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: slot.glasses }).map((_, i) => (
                        <Droplets key={i} className="w-5 h-5 text-blue-500" />
                      ))}
                      <span className="ml-2 font-bold text-blue-600">{slot.glasses * 250}ml</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ajustes por sudoración */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sun className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Ejercicio Intenso</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">Agrega 500ml adicionales por cada hora de ejercicio intenso</p>
                <p className="text-2xl font-bold text-orange-600">+{exerciseDuration * 500}ml</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border-2 border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sun className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-gray-900">Clima Caluroso</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">En días calurosos aumenta un 10-15% tu ingesta</p>
                <p className="text-2xl font-bold text-amber-600">{climate === 'hot' ? '+10%' : 'N/A'}</p>
              </div>
            </div>

            {/* Recordatorios */}
            <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-teal-600" />
                Consejos de Hidratación
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-0.5">✓</span>
                  <span>Bebe agua al despertar para rehidratar tu cuerpo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-0.5">✓</span>
                  <span>Lleva una botella de agua contigo durante el día</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-0.5">✓</span>
                  <span>Bebe antes de sentir sed (la sed indica deshidratación leve)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-0.5">✓</span>
                  <span>Aumenta la ingesta durante ejercicio y en días calurosos</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HidratacionCalculator;
