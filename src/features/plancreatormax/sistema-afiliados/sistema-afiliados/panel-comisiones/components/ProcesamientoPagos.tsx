import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Send, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { mockComisiones, mockAfiliados } from '../mockData';

const ProcesamientoPagos: React.FC = () => {
  const [selectedComisiones, setSelectedComisiones] = useState<Set<string>>(new Set());
  const [metodoPago, setMetodoPago] = useState<'transferencia' | 'paypal' | 'stripe' | 'wire'>('paypal');
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split('T')[0]);
  const [notas, setNotas] = useState('');

  // Comisiones aprobadas no pagadas
  const comisionesAprobadas = mockComisiones.filter(c => c.estado === 'aprobada');

  // Agrupar por afiliado
  const comisionesPorAfiliado = comisionesAprobadas.reduce((acc, comision) => {
    if (!acc[comision.afiliadoId]) {
      acc[comision.afiliadoId] = {
        afiliado: mockAfiliados.find(a => a.id === comision.afiliadoId)!,
        comisiones: []
      };
    }
    acc[comision.afiliadoId].comisiones.push(comision);
    return acc;
  }, {} as Record<string, { afiliado: any; comisiones: typeof comisionesAprobadas }>);

  const toggleComision = (id: string) => {
    const newSelection = new Set(selectedComisiones);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedComisiones(newSelection);
  };

  const toggleAfiliado = (afiliadoId: string) => {
    const comisiones = comisionesPorAfiliado[afiliadoId].comisiones;
    const allSelected = comisiones.every(c => selectedComisiones.has(c.id));

    const newSelection = new Set(selectedComisiones);
    if (allSelected) {
      comisiones.forEach(c => newSelection.delete(c.id));
    } else {
      comisiones.forEach(c => newSelection.add(c.id));
    }
    setSelectedComisiones(newSelection);
  };

  const comisionesSeleccionadas = comisionesAprobadas.filter(c => selectedComisiones.has(c.id));
  const totalAPagar = comisionesSeleccionadas.reduce((sum, c) => sum + c.montoComision, 0);

  const procesarPagos = () => {
    if (selectedComisiones.size === 0) {
      alert('Selecciona al menos una comisión para procesar');
      return;
    }

    const confirmacion = confirm(
      `¿Confirmar pago de $${totalAPagar.toFixed(2)} a ${new Set(comisionesSeleccionadas.map(c => c.afiliadoId)).size} afiliado(s)?`
    );

    if (confirmacion) {
      console.log('Procesando pagos:', {
        comisiones: Array.from(selectedComisiones),
        metodoPago,
        fechaPago,
        notas,
        total: totalAPagar
      });
      alert('¡Pagos procesados exitosamente!');
      setSelectedComisiones(new Set());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Send className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Procesamiento de Pagos</h2>
              <p className="text-blue-100 text-lg">{comisionesAprobadas.length} comisiones aprobadas listas para pagar</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Configuración de pago */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Configuración del Pago</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Método de Pago</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white"
            >
              <option value="transferencia">Transferencia Bancaria</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
              <option value="wire">Wire Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha Programada</label>
            <input
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Total Seleccionado</label>
            <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-2xl text-center">
              ${totalAPagar.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Notas del Pago (Opcional)</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white resize-none"
            placeholder="Agrega notas o instrucciones especiales..."
          />
        </div>
      </motion.div>

      {/* Comisiones agrupadas por afiliado */}
      <div className="space-y-4">
        {Object.entries(comisionesPorAfiliado).map(([afiliadoId, { afiliado, comisiones }], index) => {
          const totalAfiliado = comisiones.reduce((sum, c) => sum + c.montoComision, 0);
          const todasSeleccionadas = comisiones.every(c => selectedComisiones.has(c.id));

          return (
            <motion.div
              key={afiliadoId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
            >
              {/* Header del afiliado */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={todasSeleccionadas}
                      onChange={() => toggleAfiliado(afiliadoId)}
                      className="w-6 h-6 rounded-lg border-2 border-white cursor-pointer"
                    />
                    <img
                      src={afiliado.avatar}
                      alt={afiliado.nombre}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-white">{afiliado.nombre}</h4>
                      <p className="text-indigo-100 text-sm">{afiliado.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-indigo-100">Total a Pagar</p>
                    <p className="text-3xl font-bold text-white">${totalAfiliado.toFixed(2)}</p>
                    <p className="text-sm text-indigo-100">{comisiones.length} comisiones</p>
                  </div>
                </div>
              </div>

              {/* Lista de comisiones */}
              <div className="p-6">
                <div className="space-y-3">
                  {comisiones.map((comision) => (
                    <div
                      key={comision.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedComisiones.has(comision.id)
                          ? 'bg-indigo-50 border-indigo-300'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedComisiones.has(comision.id)}
                          onChange={() => toggleComision(comision.id)}
                          className="w-5 h-5 rounded cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{comision.id}</p>
                          <p className="text-sm text-gray-600">{comision.productoVendido}</p>
                          <p className="text-xs text-gray-500">{comision.fechaVenta}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                          ${comision.montoComision.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">{(comision.porcentajeComision * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Botón de procesamiento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Comisiones seleccionadas</p>
            <p className="text-2xl font-bold text-gray-900">{selectedComisiones.size} de {comisionesAprobadas.length}</p>
          </div>

          <button
            onClick={procesarPagos}
            disabled={selectedComisiones.size === 0}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-6 h-6" />
            <span className="text-lg">Procesar Pagos</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              ${totalAPagar.toFixed(2)}
            </span>
          </button>
        </div>

        {selectedComisiones.size > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-bold mb-1">Se generarán comprobantes automáticos</p>
                <p>Los afiliados recibirán una notificación por email con los detalles del pago.</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProcesamientoPagos;
