import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, TrendingUp, Save, RotateCcw, FileText } from 'lucide-react';
import { Diet } from '../dietaEditarApi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MacrosAdjusterProps {
  diet: Diet;
  onDietChange: (diet: Diet) => void;
}

const MacrosAdjuster: React.FC<MacrosAdjusterProps> = ({ diet, onDietChange }) => {
  const [editedMacros, setEditedMacros] = useState(diet.macros);
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const handleMacroChange = (name: string, value: number) => {
    const newMacros = { ...editedMacros, [name]: value };

    // Recalcular calorías automáticamente
    if (name !== 'calories') {
      newMacros.calories = (newMacros.protein * 4) + (newMacros.carbs * 4) + (newMacros.fats * 9);
    }

    setEditedMacros(newMacros);
  };

  const handleSliderChange = (name: string, value: string) => {
    handleMacroChange(name, parseFloat(value) || 0);
  };

  const handleSave = () => {
    if (!adjustmentReason.trim()) {
      alert('Por favor ingresa una razón para el ajuste');
      return;
    }
    onDietChange({ ...diet, macros: editedMacros });
    setAdjustmentReason('');
    setShowComparison(false);
  };

  const handleReset = () => {
    setEditedMacros(diet.macros);
    setAdjustmentReason('');
    setShowComparison(false);
  };

  // Datos para gráfico de dona
  const chartData = [
    { name: 'Proteínas', value: editedMacros.protein * 4, color: '#3b82f6' },
    { name: 'Carbohidratos', value: editedMacros.carbs * 4, color: '#10b981' },
    { name: 'Grasas', value: editedMacros.fats * 9, color: '#a855f7' },
  ];

  const originalChartData = [
    { name: 'Proteínas', value: diet.macros.protein * 4, color: '#3b82f6' },
    { name: 'Carbohidratos', value: diet.macros.carbs * 4, color: '#10b981' },
    { name: 'Grasas', value: diet.macros.fats * 9, color: '#a855f7' },
  ];

  const hasChanges = JSON.stringify(editedMacros) !== JSON.stringify(diet.macros);

  // Historial de ajustes (mock)
  const adjustmentHistory = [
    { date: '2025-09-15', reason: 'Incremento para fase de volumen', protein: 180, carbs: 320, fats: 70 },
    { date: '2025-09-01', reason: 'Configuración inicial', protein: 160, carbs: 300, fats: 65 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sliders className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Ajustador de Macros</h2>
          </div>
        </div>

        {/* Sliders de ajuste */}
        <div className="space-y-6 mb-6">
          {/* Proteínas */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-blue-700">Proteínas (g)</label>
              <input
                type="number"
                value={editedMacros.protein}
                onChange={(e) => handleMacroChange('protein', parseFloat(e.target.value) || 0)}
                className="w-20 px-3 py-1 text-center bg-white border-2 border-blue-300 rounded-lg font-bold text-blue-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={editedMacros.protein}
              onChange={(e) => handleSliderChange('protein', e.target.value)}
              className="w-full h-3 bg-blue-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-blue-600 mt-1">
              <span>0g</span>
              <span>300g</span>
            </div>
          </div>

          {/* Carbohidratos */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-green-700">Carbohidratos (g)</label>
              <input
                type="number"
                value={editedMacros.carbs}
                onChange={(e) => handleMacroChange('carbs', parseFloat(e.target.value) || 0)}
                className="w-20 px-3 py-1 text-center bg-white border-2 border-green-300 rounded-lg font-bold text-green-700 focus:outline-none focus:border-green-500"
              />
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={editedMacros.carbs}
              onChange={(e) => handleSliderChange('carbs', e.target.value)}
              className="w-full h-3 bg-green-200 rounded-full appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-green-600 mt-1">
              <span>0g</span>
              <span>500g</span>
            </div>
          </div>

          {/* Grasas */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-purple-700">Grasas (g)</label>
              <input
                type="number"
                value={editedMacros.fats}
                onChange={(e) => handleMacroChange('fats', parseFloat(e.target.value) || 0)}
                className="w-20 px-3 py-1 text-center bg-white border-2 border-purple-300 rounded-lg font-bold text-purple-700 focus:outline-none focus:border-purple-500"
              />
            </div>
            <input
              type="range"
              min="0"
              max="150"
              step="5"
              value={editedMacros.fats}
              onChange={(e) => handleSliderChange('fats', e.target.value)}
              className="w-full h-3 bg-purple-200 rounded-full appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-purple-600 mt-1">
              <span>0g</span>
              <span>150g</span>
            </div>
          </div>

          {/* Calorías totales */}
          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-orange-700">Calorías Totales</label>
              <div className="text-3xl font-bold text-orange-700">{Math.round(editedMacros.calories)}</div>
            </div>
            <p className="text-xs text-orange-600 mt-2">Calculadas automáticamente: 4 cal/g (proteínas y carbos), 9 cal/g (grasas)</p>
          </div>
        </div>

        {/* Gráfico de dona */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-800">Distribución de Macros</h3>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="ml-auto text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              {showComparison ? 'Ocultar' : 'Comparar con anterior'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gráfico actual */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <p className="text-center text-sm font-bold text-gray-700 mb-2">Nuevo</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
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
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="text-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                  <p className="text-xs font-semibold text-gray-700">{editedMacros.protein}g</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                  <p className="text-xs font-semibold text-gray-700">{editedMacros.carbs}g</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
                  <p className="text-xs font-semibold text-gray-700">{editedMacros.fats}g</p>
                </div>
              </div>
            </div>

            {/* Gráfico anterior (si está en modo comparación) */}
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
              >
                <p className="text-center text-sm font-bold text-gray-700 mb-2">Anterior</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={originalChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {originalChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-xs font-semibold text-gray-700">{diet.macros.protein}g</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-xs font-semibold text-gray-700">{diet.macros.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-xs font-semibold text-gray-700">{diet.macros.fats}g</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Razón del ajuste */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Razón del Ajuste
            </label>
            <textarea
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              placeholder="Ej: Incremento de carbohidratos para fase de volumen..."
            />
          </motion.div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex-1 relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold flex items-center justify-center gap-2 ${
              hasChanges
                ? 'bg-gradient-to-br from-orange-500 to-yellow-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Save className="w-5 h-5" />
            Aplicar Cambios
          </button>

          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-5 h-5" />
            Resetear
          </button>
        </div>

        {/* Historial de ajustes */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Historial de Ajustes</h3>
          <div className="space-y-2">
            {adjustmentHistory.map((adjustment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-bold text-gray-700">{adjustment.date}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">P: {adjustment.protein}g</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">C: {adjustment.carbs}g</span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold">G: {adjustment.fats}g</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{adjustment.reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacrosAdjuster;
