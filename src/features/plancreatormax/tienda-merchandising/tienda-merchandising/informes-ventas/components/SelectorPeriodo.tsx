import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, RefreshCw } from 'lucide-react';

export type PeriodoQuick = 'hoy' | 'ayer' | '7dias' | '30dias' | 'este_mes' | 'mes_anterior' | 'este_ano' | 'custom';

interface SelectorPeriodoProps {
  onPeriodoChange?: (periodo: PeriodoQuick) => void;
  onCompararChange?: (comparar: boolean) => void;
}

const SelectorPeriodo: React.FC<SelectorPeriodoProps> = ({
  onPeriodoChange,
  onCompararChange
}) => {
  const [periodoActivo, setPeriodoActivo] = useState<PeriodoQuick>('30dias');
  const [comparar, setComparar] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const quickFilters: { label: string; value: PeriodoQuick }[] = [
    { label: 'Hoy', value: 'hoy' },
    { label: 'Ayer', value: 'ayer' },
    { label: 'Últimos 7 días', value: '7dias' },
    { label: 'Últimos 30 días', value: '30dias' },
    { label: 'Este mes', value: 'este_mes' },
    { label: 'Mes anterior', value: 'mes_anterior' },
    { label: 'Este año', value: 'este_ano' },
    { label: 'Custom', value: 'custom' },
  ];

  const handlePeriodoChange = (periodo: PeriodoQuick) => {
    setPeriodoActivo(periodo);
    if (periodo === 'custom') {
      setShowDatePicker(true);
    }
    onPeriodoChange?.(periodo);
  };

  const handleCompararToggle = () => {
    const newValue = !comparar;
    setComparar(newValue);
    onCompararChange?.(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Título */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Período de Análisis</h3>
            <p className="text-sm text-gray-600">Selecciona el rango temporal</p>
          </div>
        </div>

        {/* Comparar toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCompararToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              comparar
                ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Comparar con período anterior</span>
          </button>
        </div>
      </div>

      {/* Quick Filters Pills */}
      <div className="mt-6 flex flex-wrap gap-3">
        {quickFilters.map((filter) => (
          <motion.button
            key={filter.value}
            onClick={() => handlePeriodoChange(filter.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
              periodoActivo === filter.value
                ? 'bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 text-white shadow-lg'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      {/* Custom Date Range Picker (Placeholder) */}
      {showDatePicker && periodoActivo === 'custom' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-gray-200"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Fecha Fin
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
              />
            </div>
            <div className="flex items-end">
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                Aplicar
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Período seleccionado info */}
      <div className="mt-4 flex items-center gap-2 text-sm">
        <div className="px-4 py-2 bg-green-50 rounded-xl border border-green-200">
          <span className="font-semibold text-green-700">
            Mostrando: <span className="font-bold">Últimos 30 días</span>
          </span>
        </div>
        {comparar && (
          <div className="px-4 py-2 bg-cyan-50 rounded-xl border border-cyan-200">
            <span className="font-semibold text-cyan-700">
              vs. <span className="font-bold">30 días anteriores</span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SelectorPeriodo;
