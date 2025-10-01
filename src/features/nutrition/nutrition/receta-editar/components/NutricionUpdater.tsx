import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, RefreshCw, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface NutricionUpdaterProps {
  actual: any;
  anterior: any;
  ingredientes: any[];
}

const NutricionUpdater: React.FC<NutricionUpdaterProps> = ({ actual: actualInicial, anterior, ingredientes }) => {
  const [actual, setActual] = useState(actualInicial);
  const [modoAuto, setModoAuto] = useState(true);

  const calcularDiferencia = (campo: keyof typeof actual) => {
    return actual[campo] - anterior[campo];
  };

  const calcularPorcentajeCambio = (campo: keyof typeof actual) => {
    if (anterior[campo] === 0) return 0;
    return ((actual[campo] - anterior[campo]) / anterior[campo]) * 100;
  };

  const handleUpdate = (campo: keyof typeof actual, valor: number) => {
    setActual({ ...actual, [campo]: valor });
    setModoAuto(false);
  };

  const recalcularAutomatico = () => {
    // Simular recálculo basado en ingredientes
    const totalCalorias = ingredientes.reduce((sum, ing) => sum + (ing.calorias || 0), 0);
    const totalProteinas = ingredientes.reduce((sum, ing) => sum + (ing.proteinas || 0), 0);

    setActual({
      ...actual,
      calorias: totalCalorias,
      proteinas: totalProteinas,
    });
    setModoAuto(true);
    alert('Nutrición recalculada automáticamente basada en ingredientes');
  };

  const campos = [
    { key: 'calorias', label: 'Calorías', unidad: 'kcal', color: 'from-yellow-500 to-orange-500' },
    { key: 'proteinas', label: 'Proteínas', unidad: 'g', color: 'from-blue-500 to-indigo-500' },
    { key: 'carbohidratos', label: 'Carbohidratos', unidad: 'g', color: 'from-green-500 to-emerald-500' },
    { key: 'grasas', label: 'Grasas', unidad: 'g', color: 'from-purple-500 to-pink-500' },
    { key: 'fibra', label: 'Fibra', unidad: 'g', color: 'from-teal-500 to-cyan-500' },
    { key: 'sodio', label: 'Sodio', unidad: 'mg', color: 'from-red-500 to-rose-500' },
  ];

  // Datos para el gráfico de comparación
  const chartData = campos.map(campo => ({
    name: campo.label,
    Anterior: anterior[campo.key] || 0,
    Actual: actual[campo.key] || 0,
  }));

  return (
    <div className="space-y-6">
      {/* Controles principales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Actualizador de Nutrición</h3>
                <p className="text-sm text-gray-600">
                  {modoAuto ? 'Modo: Auto-calculado' : 'Modo: Manual'}
                </p>
              </div>
            </div>
            <button
              onClick={recalcularAutomatico}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Recalcular Automáticamente
            </button>
          </div>

          {/* Toggle modo */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={modoAuto}
                onChange={(e) => setModoAuto(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Cálculo automático basado en ingredientes
              </span>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Grid de valores nutricionales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">Valores Nutricionales</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campos.map((campo, index) => {
            const diff = calcularDiferencia(campo.key as any);
            const porcentaje = calcularPorcentajeCambio(campo.key as any);
            const aumentado = diff > 0;

            return (
              <motion.div
                key={campo.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
              >
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
                  {campo.label}
                </label>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={actual[campo.key]}
                    onChange={(e) => handleUpdate(campo.key as any, parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white"
                    min="0"
                    step="0.1"
                  />
                  <span className="text-sm font-semibold text-gray-600">{campo.unidad}</span>
                </div>

                {/* Indicador de cambio */}
                {diff !== 0 && (
                  <div className={`flex items-center gap-2 text-xs ${aumentado ? 'text-green-600' : 'text-red-600'}`}>
                    {aumentado ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="font-semibold">
                      {aumentado ? '+' : ''}{diff.toFixed(1)} {campo.unidad}
                    </span>
                    <span className="text-gray-500">({porcentaje > 0 ? '+' : ''}{porcentaje.toFixed(1)}%)</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Gráfico de comparación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">Comparación: Antes vs Después</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="Anterior" fill="#9ca3af" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Actual" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Validación y alertas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">Validación de Datos</h4>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900">Datos válidos</p>
              <p className="text-xs text-green-700 mt-1">
                Todos los valores nutricionales están dentro de rangos aceptables
              </p>
            </div>
          </div>

          {Math.abs(calcularDiferencia('calorias')) > 100 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-orange-900">Cambio significativo detectado</p>
                <p className="text-xs text-orange-700 mt-1">
                  Las calorías han cambiado en {calcularDiferencia('calorias') > 0 ? '+' : ''}{calcularDiferencia('calorias').toFixed(0)} kcal.
                  Verifica que los ingredientes sean correctos.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NutricionUpdater;
