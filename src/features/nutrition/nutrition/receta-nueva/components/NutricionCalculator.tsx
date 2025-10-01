import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Beef, Wheat, Droplet, TrendingUp, Calculator } from 'lucide-react';
import { recetaNuevaApi } from '../recetaNuevaApi';

interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface NutricionCalculatorProps {
  ingredientes: Ingrediente[];
  porciones: number;
}

interface ValoresNutricionales {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

const NutricionCalculator: React.FC<NutricionCalculatorProps> = ({
  ingredientes,
  porciones = 1,
}) => {
  const [valoresNutricionales, setValoresNutricionales] = useState<ValoresNutricionales | null>(null);
  const [valoresPorPorcion, setValoresPorPorcion] = useState<ValoresNutricionales | null>(null);

  useEffect(() => {
    if (ingredientes.length > 0) {
      const calculated = recetaNuevaApi.calculateNutritionalValues(ingredientes);
      setValoresNutricionales(calculated);

      // Calcular valores por porción
      setValoresPorPorcion({
        calorias: Math.round(calculated.calorias / porciones),
        proteinas: Math.round(calculated.proteinas / porciones),
        carbohidratos: Math.round(calculated.carbohidratos / porciones),
        grasas: Math.round(calculated.grasas / porciones),
      });
    } else {
      setValoresNutricionales(null);
      setValoresPorPorcion(null);
    }
  }, [ingredientes, porciones]);

  // Calcular porcentajes para gráfico de dona
  const calcularPorcentajes = (valores: ValoresNutricionales) => {
    const totalGramos = valores.proteinas + valores.carbohidratos + valores.grasas;
    if (totalGramos === 0) return { proteinas: 0, carbohidratos: 0, grasas: 0 };

    return {
      proteinas: Math.round((valores.proteinas / totalGramos) * 100),
      carbohidratos: Math.round((valores.carbohidratos / totalGramos) * 100),
      grasas: Math.round((valores.grasas / totalGramos) * 100),
    };
  };

  if (!valoresNutricionales || !valoresPorPorcion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Información Nutricional</h3>
          </div>

          {/* Estado vacío */}
          <div className="text-center py-12">
            <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-sm font-medium text-gray-500 mb-1">Sin datos nutricionales</p>
            <p className="text-xs text-gray-400">Añade ingredientes para calcular automáticamente</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const porcentajes = calcularPorcentajes(valoresPorPorcion);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Información Nutricional</h3>
            <p className="text-sm text-gray-600">Calculado automáticamente</p>
          </div>
        </div>

        {/* Calorías destacadas */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white"
        >
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-yellow-200" />
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-100">Calorías por porción</p>
            </div>
            <p className="text-5xl font-bold mb-1">{valoresPorPorcion.calorias}</p>
            <p className="text-sm text-orange-100">kcal / porción ({porciones} porciones totales)</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-orange-100">Total receta: <span className="font-bold text-white">{valoresNutricionales.calorias} kcal</span></p>
            </div>
          </div>
        </motion.div>

        {/* Macronutrientes - Gráfico visual */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-600" />
            Macronutrientes (por porción)
          </h4>

          {/* Barras de progreso visuales */}
          <div className="space-y-4">
            {/* Proteínas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 rounded-lg">
                    <Beef className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Proteínas</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{valoresPorPorcion.proteinas}g</span>
                  <span className="text-xs text-gray-500 ml-2">({porcentajes.proteinas}%)</span>
                </div>
              </div>
              <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${porcentajes.proteinas}%` }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                ></motion.div>
              </div>
            </motion.div>

            {/* Carbohidratos */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-100 rounded-lg">
                    <Wheat className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Carbohidratos</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{valoresPorPorcion.carbohidratos}g</span>
                  <span className="text-xs text-gray-500 ml-2">({porcentajes.carbohidratos}%)</span>
                </div>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${porcentajes.carbohidratos}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                ></motion.div>
              </div>
            </motion.div>

            {/* Grasas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-100 rounded-lg">
                    <Droplet className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Grasas</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{valoresPorPorcion.grasas}g</span>
                  <span className="text-xs text-gray-500 ml-2">({porcentajes.grasas}%)</span>
                </div>
              </div>
              <div className="w-full bg-yellow-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${porcentajes.grasas}%` }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Distribución visual de macros */}
        <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700">P: {porcentajes.proteinas}%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700">C: {porcentajes.carbohidratos}%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700">G: {porcentajes.grasas}%</span>
            </div>
          </div>
        </div>

        {/* Nota disclaimer */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            * Cálculos estimados basados en datos nutricionales promedio. Los valores reales pueden variar según la marca y preparación de los ingredientes.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NutricionCalculator;
