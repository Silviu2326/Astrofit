import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Activity, Zap, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Macro {
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

interface MacrosCalculatorProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const MacrosCalculator: React.FC<MacrosCalculatorProps> = ({ onNext, onBack, initialData }) => {
  // Calcular TDEE basado en el cliente
  const calcularTDEE = () => {
    if (!initialData.cliente) return 2000;

    const { peso, altura, edad, sexo } = initialData.cliente;

    // Fórmula Mifflin-St Jeor
    let bmr;
    if (sexo === 'M') {
      bmr = 10 * peso + 6.25 * altura - 5 * edad + 5;
    } else {
      bmr = 10 * peso + 6.25 * altura - 5 * edad - 161;
    }

    // Multiplicador de actividad
    const multiplicadores: any = {
      'sedentario': 1.2,
      'ligero': 1.375,
      'moderado': 1.55,
      'intenso': 1.725,
      'muy-intenso': 1.9
    };

    const multiplicador = multiplicadores[initialData.nivelActividad] || 1.55;
    return Math.round(bmr * multiplicador);
  };

  const tdeeBase = calcularTDEE();

  // Ajustar calorías según objetivo
  const ajustarCaloriasPorObjetivo = () => {
    const ajustes: any = {
      'lento': { 'perdida-peso': -250, 'ganancia-muscular': 200, 'mantenimiento': 0, 'recomposicion': -100 },
      'moderado': { 'perdida-peso': -500, 'ganancia-muscular': 350, 'mantenimiento': 0, 'recomposicion': -200 },
      'rapido': { 'perdida-peso': -750, 'ganancia-muscular': 500, 'mantenimiento': 0, 'recomposicion': -300 }
    };

    const velocidad = initialData.velocidadProgreso || 'moderado';
    const objetivo = initialData.objetivoId || 'mantenimiento';
    const ajuste = ajustes[velocidad]?.[objetivo] || 0;

    return tdeeBase + ajuste;
  };

  const [calorias, setCalorias] = useState<number>(initialData.calorias || ajustarCaloriasPorObjetivo());
  const [proteinas, setProteinas] = useState<number>(initialData.proteinas || 30);
  const [carbohidratos, setCarbohidratos] = useState<number>(initialData.carbohidratos || 40);
  const [grasas, setGrasas] = useState<number>(initialData.grasas || 30);

  // Calcular gramos de cada macro
  const proteinasGramos = Math.round((calorias * (proteinas / 100)) / 4);
  const carbohidratosGramos = Math.round((calorias * (carbohidratos / 100)) / 4);
  const grasasGramos = Math.round((calorias * (grasas / 100)) / 9);

  // Aplicar preset de objetivo
  const aplicarPreset = () => {
    if (initialData.objetivo) {
      setProteinas(initialData.objetivo.distribucionMacros.proteinas);
      setCarbohidratos(initialData.objetivo.distribucionMacros.carbohidratos);
      setGrasas(initialData.objetivo.distribucionMacros.grasas);
    }
  };

  useEffect(() => {
    if (initialData.objetivo && !initialData.proteinas) {
      aplicarPreset();
    }
  }, []);

  // Normalizar porcentajes si la suma no es 100%
  const normalizarMacros = () => {
    const total = proteinas + carbohidratos + grasas;
    if (total !== 100) {
      const factor = 100 / total;
      setProteinas(Math.round(proteinas * factor));
      setCarbohidratos(Math.round(carbohidratos * factor));
      setGrasas(100 - Math.round(proteinas * factor) - Math.round(carbohidratos * factor));
    }
  };

  const handleSubmit = () => {
    onNext({
      calorias,
      proteinas,
      carbohidratos,
      grasas,
      proteinasGramos,
      carbohidratosGramos,
      grasasGramos,
      tdee: tdeeBase
    });
  };

  // Datos para el gráfico
  const chartData = [
    { name: 'Proteínas', value: proteinas, gramos: proteinasGramos, color: '#3B82F6' },
    { name: 'Carbohidratos', value: carbohidratos, gramos: carbohidratosGramos, color: '#10B981' },
    { name: 'Grasas', value: grasas, gramos: grasasGramos, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calculator className="w-7 h-7 text-amber-600" />
          Calculadora de Macros
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel izquierdo: Controles */}
          <div className="space-y-6">
            {/* TDEE y Calorías objetivo */}
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-bold text-blue-900">TDEE Calculado</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">{tdeeBase} kcal</p>
                <p className="text-xs text-blue-700 mt-1">Calorías de mantenimiento diarias</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600" />
                  Calorías Objetivo Diarias
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min={tdeeBase - 1000}
                    max={tdeeBase + 1000}
                    step={50}
                    value={calorias}
                    onChange={(e) => setCalorias(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>{tdeeBase - 1000}</span>
                    <span className="font-bold text-amber-600 text-2xl">{calorias} kcal</span>
                    <span>{tdeeBase + 1000}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {calorias < tdeeBase && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                      Déficit: {tdeeBase - calorias} kcal
                    </span>
                  )}
                  {calorias > tdeeBase && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      Superávit: {calorias - tdeeBase} kcal
                    </span>
                  )}
                  {calorias === tdeeBase && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      Mantenimiento
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sliders de macros */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">Distribución de Macros</h3>
                <button
                  onClick={aplicarPreset}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  Usar Preset
                </button>
              </div>

              {/* Proteínas */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700">Proteínas</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-600">{proteinas}%</span>
                    <span className="text-sm text-gray-600">({proteinasGramos}g)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={proteinas}
                  onChange={(e) => setProteinas(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${proteinas}%, #DBEAFE ${proteinas}%, #DBEAFE 100%)`
                  }}
                />
              </div>

              {/* Carbohidratos */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700">Carbohidratos</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">{carbohidratos}%</span>
                    <span className="text-sm text-gray-600">({carbohidratosGramos}g)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={carbohidratos}
                  onChange={(e) => setCarbohidratos(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10B981 0%, #10B981 ${carbohidratos}%, #D1FAE5 ${carbohidratos}%, #D1FAE5 100%)`
                  }}
                />
              </div>

              {/* Grasas */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700">Grasas</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-amber-600">{grasas}%</span>
                    <span className="text-sm text-gray-600">({grasasGramos}g)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={grasas}
                  onChange={(e) => setGrasas(parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${grasas}%, #FEF3C7 ${grasas}%, #FEF3C7 100%)`
                  }}
                />
              </div>

              {/* Total */}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Total</span>
                  <span className={`text-xl font-bold ${proteinas + carbohidratos + grasas === 100 ? 'text-green-600' : 'text-red-600'}`}>
                    {proteinas + carbohidratos + grasas}%
                  </span>
                </div>
                {proteinas + carbohidratos + grasas !== 100 && (
                  <button
                    onClick={normalizarMacros}
                    className="mt-2 w-full px-3 py-2 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-200 transition-all"
                  >
                    Ajustar al 100%
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Panel derecho: Visualización */}
          <div className="space-y-6">
            {/* Gráfico de dona */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Distribución Visual</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any, props: any) => [
                      `${value}% (${props.payload.gramos}g)`,
                      name
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Resumen de macros */}
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-900">Proteínas</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{proteinasGramos}g</p>
                    <p className="text-xs text-blue-700">{proteinas}% • {proteinasGramos * 4} kcal</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-green-900">Carbohidratos</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{carbohidratosGramos}g</p>
                    <p className="text-xs text-green-700">{carbohidratos}% • {carbohidratosGramos * 4} kcal</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-amber-900">Grasas</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-600">{grasasGramos}g</p>
                    <p className="text-xs text-amber-700">{grasas}% • {grasasGramos * 9} kcal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recomendaciones
              </h4>
              <ul className="text-xs text-purple-800 space-y-1">
                <li>• Consume {(proteinasGramos / (initialData.cliente?.peso || 70)).toFixed(1)}g/kg de proteína</li>
                <li>• Mantén las grasas entre 20-35% para salud hormonal</li>
                <li>• Ajusta carbohidratos según tu nivel de actividad</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botones de navegación */}
      <div className="flex gap-4">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onBack}
          className="px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleSubmit}
          disabled={proteinas + carbohidratos + grasas !== 100}
          className={`
            flex-1 py-4 rounded-2xl font-bold text-white text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2
            ${proteinas + carbohidratos + grasas === 100
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:shadow-2xl hover:scale-[1.02]'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          Continuar al Constructor de Comidas
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default MacrosCalculator;
