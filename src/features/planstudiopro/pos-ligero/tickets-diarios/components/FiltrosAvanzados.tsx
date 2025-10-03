import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, CreditCard, User, DollarSign, Filter,
  CheckCircle, RotateCcw, Search, XCircle
} from 'lucide-react';

interface FiltrosState {
  horaDesde: string;
  horaHasta: string;
  metodosPago: string[];
  cajeros: string[];
  cliente: string;
  montoMin: string;
  montoMax: string;
  estados: string[];
}

interface FiltrosAvanzadosProps {
  tickets: any[];
  onFiltrar: (filtros: FiltrosState) => void;
  onCerrar: () => void;
}

const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({ tickets, onFiltrar, onCerrar }) => {
  const [filtros, setFiltros] = useState<FiltrosState>({
    horaDesde: '',
    horaHasta: '',
    metodosPago: [],
    cajeros: [],
    cliente: '',
    montoMin: '',
    montoMax: '',
    estados: []
  });

  // Extraer valores únicos de los tickets
  const metodosPagoUnicos = Array.from(new Set(tickets.map(t => t.metodoPago)));
  const cajerosUnicos = Array.from(new Set(tickets.map(t => t.cajero)));

  const toggleMetodoPago = (metodo: string) => {
    setFiltros(prev => ({
      ...prev,
      metodosPago: prev.metodosPago.includes(metodo)
        ? prev.metodosPago.filter(m => m !== metodo)
        : [...prev.metodosPago, metodo]
    }));
  };

  const toggleCajero = (cajero: string) => {
    setFiltros(prev => ({
      ...prev,
      cajeros: prev.cajeros.includes(cajero)
        ? prev.cajeros.filter(c => c !== cajero)
        : [...prev.cajeros, cajero]
    }));
  };

  const toggleEstado = (estado: string) => {
    setFiltros(prev => ({
      ...prev,
      estados: prev.estados.includes(estado)
        ? prev.estados.filter(e => e !== estado)
        : [...prev.estados, estado]
    }));
  };

  const limpiarFiltros = () => {
    const filtrosVacios: FiltrosState = {
      horaDesde: '',
      horaHasta: '',
      metodosPago: [],
      cajeros: [],
      cliente: '',
      montoMin: '',
      montoMax: '',
      estados: []
    };
    setFiltros(filtrosVacios);
    onFiltrar(filtrosVacios);
  };

  const aplicarFiltros = () => {
    onFiltrar(filtros);
    onCerrar();
  };

  // Contar filtros activos
  const filtrosActivos = [
    filtros.horaDesde && filtros.horaHasta ? 'Rango de horas' : null,
    ...filtros.metodosPago.map(m => `Método: ${m}`),
    ...filtros.cajeros.map(c => `Cajero: ${c}`),
    filtros.cliente ? `Cliente: ${filtros.cliente}` : null,
    filtros.montoMin || filtros.montoMax ? 'Rango de monto' : null,
    ...filtros.estados.map(e => `Estado: ${e}`)
  ].filter(Boolean);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCerrar}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Panel lateral */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col h-full"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
            {/* Pattern de fondo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Filter className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Filtros Avanzados</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {filtrosActivos.length} filtro{filtrosActivos.length !== 1 ? 's' : ''} activo{filtrosActivos.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onCerrar}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Filtros activos pills */}
          {filtrosActivos.length > 0 && (
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-gray-700">Filtros aplicados:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filtrosActivos.map((filtro, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-indigo-200 rounded-full text-sm font-medium text-indigo-700"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {filtro}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Rango de horas */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">Rango de Horas</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
                  <input
                    type="time"
                    value={filtros.horaDesde}
                    onChange={(e) => setFiltros({ ...filtros, horaDesde: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
                  <input
                    type="time"
                    value={filtros.horaHasta}
                    onChange={(e) => setFiltros({ ...filtros, horaHasta: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Método de pago */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">Método de Pago</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {metodosPagoUnicos.map(metodo => (
                  <motion.button
                    key={metodo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleMetodoPago(metodo)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      filtros.metodosPago.includes(metodo)
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg'
                        : 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-400'
                    }`}
                  >
                    {metodo.charAt(0).toUpperCase() + metodo.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Cajero */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">Cajero</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cajerosUnicos.map(cajero => (
                  <motion.button
                    key={cajero}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCajero(cajero)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      filtros.cajeros.includes(cajero)
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg'
                        : 'bg-white border-2 border-green-200 text-green-700 hover:border-green-400'
                    }`}
                  >
                    {cajero}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Cliente */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 border border-orange-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-900">Buscar Cliente</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={filtros.cliente}
                  onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
                  placeholder="Nombre del cliente..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none"
                />
              </div>
            </motion.div>

            {/* Rango de monto */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 border border-teal-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-gray-900">Rango de Monto</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mínimo</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={filtros.montoMin}
                      onChange={(e) => setFiltros({ ...filtros, montoMin: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Máximo</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={filtros.montoMax}
                      onChange={(e) => setFiltros({ ...filtros, montoMax: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Estado */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-gray-900">Estado</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['completada', 'reembolsada', 'parcial'].map(estado => (
                  <motion.button
                    key={estado}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleEstado(estado)}
                    className={`px-4 py-2 rounded-xl font-medium capitalize transition-all duration-300 ${
                      filtros.estados.includes(estado)
                        ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg'
                        : 'bg-white border-2 border-rose-200 text-rose-700 hover:border-rose-400'
                    }`}
                  >
                    {estado}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer con acciones */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-t border-gray-200 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={limpiarFiltros}
              className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Limpiar Filtros
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={aplicarFiltros}
              className="w-full px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Aplicar Filtros
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FiltrosAvanzados;
