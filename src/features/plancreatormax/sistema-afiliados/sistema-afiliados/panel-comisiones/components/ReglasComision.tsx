import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Percent, RefreshCw, Gift, Clock, DollarSign } from 'lucide-react';

const ReglasComision: React.FC = () => {
  const [comisionBase, setComisionBase] = useState({
    bronce: 10,
    plata: 12,
    oro: 15,
    platino: 20
  });

  const [comisionRecurrente, setComisionRecurrente] = useState({
    primerPago: 15,
    recurrencias: 8,
    duracion: 'lifetime' as 'lifetime' | '12meses' | '24meses'
  });

  const [periodoValidacion, setPeriodoValidacion] = useState(7);
  const [periodoGracia, setPeriodoGracia] = useState(30);
  const [productosExcluidos, setProductosExcluidos] = useState<string[]>([]);
  const [bonificaciones, setBonificaciones] = useState({
    volumen10: 5,
    volumen25: 10,
    primerCliente: 50
  });

  const guardarConfiguracion = () => {
    console.log('Guardando configuración:', {
      comisionBase,
      comisionRecurrente,
      periodoValidacion,
      periodoGracia,
      productosExcluidos,
      bonificaciones
    });
    alert('¡Configuración guardada exitosamente!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Reglas de Comisión</h2>
              <p className="text-orange-100 text-lg">Configura cómo se calculan las comisiones</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Comisión Base por Tier */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Percent className="w-6 h-6 text-orange-600" />
          Comisión Base por Tier
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(comisionBase).map(([tier, value]) => (
            <div key={tier} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
              <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">{tier}</label>
              <div className="relative">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setComisionBase({ ...comisionBase, [tier]: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white font-bold text-2xl"
                  min="0"
                  max="100"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-600 font-bold text-xl">%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Comisión Recurrente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-blue-600" />
          Comisión Recurrente (Suscripciones)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Primer Pago (%)</label>
            <div className="relative">
              <input
                type="number"
                value={comisionRecurrente.primerPago}
                onChange={(e) => setComisionRecurrente({ ...comisionRecurrente, primerPago: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white font-bold text-xl"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Recurrencias (%)</label>
            <div className="relative">
              <input
                type="number"
                value={comisionRecurrente.recurrencias}
                onChange={(e) => setComisionRecurrente({ ...comisionRecurrente, recurrencias: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white font-bold text-xl"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Duración</label>
            <select
              value={comisionRecurrente.duracion}
              onChange={(e) => setComisionRecurrente({ ...comisionRecurrente, duracion: e.target.value as any })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white font-bold"
            >
              <option value="lifetime">Lifetime</option>
              <option value="12meses">12 Meses</option>
              <option value="24meses">24 Meses</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
          <p className="text-sm text-blue-700">
            <strong>Ejemplo:</strong> Primera compra: {comisionRecurrente.primerPago}%, renovaciones mensuales: {comisionRecurrente.recurrencias}%
            {comisionRecurrente.duracion === 'lifetime' ? ' de por vida' : ` durante ${comisionRecurrente.duracion}`}
          </p>
        </div>
      </motion.div>

      {/* Períodos y Validaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-600" />
          Períodos de Validación
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Período de Validación (días)</label>
            <input
              type="number"
              value={periodoValidacion}
              onChange={(e) => setPeriodoValidacion(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white font-bold text-xl"
            />
            <p className="text-sm text-gray-600 mt-2">Días antes de aprobar automáticamente una comisión</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Período de Gracia (días)</label>
            <input
              type="number"
              value={periodoGracia}
              onChange={(e) => setPeriodoGracia(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white font-bold text-xl"
            />
            <p className="text-sm text-gray-600 mt-2">Días para revertir comisión si hay reembolso</p>
          </div>
        </div>
      </motion.div>

      {/* Bonificaciones Especiales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Gift className="w-6 h-6 text-green-600" />
          Bonificaciones Especiales
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Bonificación por Volumen (10+ ventas/mes)</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">+{bonificaciones.volumen10}%</span>
                <input
                  type="number"
                  value={bonificaciones.volumen10}
                  onChange={(e) => setBonificaciones({ ...bonificaciones, volumen10: parseFloat(e.target.value) })}
                  className="w-20 px-3 py-2 rounded-lg border-2 border-green-300 focus:border-green-500 outline-none text-center font-bold"
                  min="0"
                  max="50"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Bonificación por Volumen (25+ ventas/mes)</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">+{bonificaciones.volumen25}%</span>
                <input
                  type="number"
                  value={bonificaciones.volumen25}
                  onChange={(e) => setBonificaciones({ ...bonificaciones, volumen25: parseFloat(e.target.value) })}
                  className="w-20 px-3 py-2 rounded-lg border-2 border-blue-300 focus:border-blue-500 outline-none text-center font-bold"
                  min="0"
                  max="50"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Bono Primer Cliente</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-purple-600">${bonificaciones.primerCliente}</span>
                <input
                  type="number"
                  value={bonificaciones.primerCliente}
                  onChange={(e) => setBonificaciones({ ...bonificaciones, primerCliente: parseFloat(e.target.value) })}
                  className="w-24 px-3 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 outline-none text-center font-bold"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Política de Reembolsos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-red-600" />
          Política de Reembolsos
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-200">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer" />
            <label className="text-sm font-semibold text-gray-700">
              Revertir comisión automáticamente si el cliente solicita reembolso
            </label>
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-200">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer" />
            <label className="text-sm font-semibold text-gray-700">
              Aplicar período de gracia de {periodoGracia} días antes de revertir
            </label>
          </div>

          <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
            <input type="checkbox" className="w-5 h-5 rounded cursor-pointer" />
            <label className="text-sm font-semibold text-gray-700">
              Permitir que el afiliado conserve la comisión si el cliente recompra dentro de 60 días
            </label>
          </div>
        </div>
      </motion.div>

      {/* Botón Guardar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-end"
      >
        <button
          onClick={guardarConfiguracion}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <Save className="w-6 h-6" />
          Guardar Configuración
        </button>
      </motion.div>
    </div>
  );
};

export default ReglasComision;
