import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Percent, TrendingUp } from 'lucide-react';

const CalculadoraComisiones: React.FC = () => {
  const [montoVenta, setMontoVenta] = useState<string>('1000');
  const [tierSeleccionado, setTierSeleccionado] = useState<'bronce' | 'plata' | 'oro' | 'platino'>('bronce');
  const [montoComision, setMontoComision] = useState<number>(0);
  const [tuGanancia, setTuGanancia] = useState<number>(0);

  const tiers = {
    bronce: { porcentaje: 10, color: 'from-orange-600 to-red-700' },
    plata: { porcentaje: 12, color: 'from-gray-400 to-gray-600' },
    oro: { porcentaje: 15, color: 'from-yellow-500 to-orange-600' },
    platino: { porcentaje: 20, color: 'from-purple-500 to-pink-600' }
  };

  useEffect(() => {
    const venta = parseFloat(montoVenta) || 0;
    const porcentaje = tiers[tierSeleccionado].porcentaje / 100;
    const comision = venta * porcentaje;
    const ganancia = venta - comision;

    setMontoComision(comision);
    setTuGanancia(ganancia);
  }, [montoVenta, tierSeleccionado]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calculator className="w-6 h-6" />
          </div>
          Calculadora de Comisiones
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Input de venta */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Valor de Venta ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={montoVenta}
              onChange={(e) => setMontoVenta(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Selector de tier */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-3">Seleccionar Tier del Afiliado</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(tiers).map(([tier, config]) => (
              <button
                key={tier}
                onClick={() => setTierSeleccionado(tier as any)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  tierSeleccionado === tier
                    ? `bg-gradient-to-r ${config.color} text-white border-transparent shadow-lg scale-105`
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-bold capitalize mb-1">{tier}</div>
                <div className="text-sm flex items-center justify-center gap-1">
                  <Percent className="w-4 h-4" />
                  {config.porcentaje}%
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4 mb-6">
          {/* Comisión calculada */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
            <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Comisión del Afiliado ({tiers[tierSeleccionado].porcentaje}%)
            </p>
            <motion.p
              key={montoComision}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600"
            >
              ${montoComision.toFixed(2)}
            </motion.p>
          </div>

          {/* Tu ganancia */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
            <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tu Ganancia Neta ({100 - tiers[tierSeleccionado].porcentaje}%)
            </p>
            <motion.p
              key={tuGanancia}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              ${tuGanancia.toFixed(2)}
            </motion.p>
          </div>
        </div>

        {/* Tabla de ejemplos */}
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Ejemplos por Tier</h4>
          <div className="space-y-2">
            {Object.entries(tiers).map(([tier, config]) => {
              const venta = parseFloat(montoVenta) || 1000;
              const comision = (venta * config.porcentaje) / 100;
              return (
                <div key={tier} className="flex items-center justify-between text-sm">
                  <span className="font-semibold capitalize text-gray-700">{tier} ({config.porcentaje}%):</span>
                  <span className="font-bold text-purple-700">${comision.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculadoraComisiones;
