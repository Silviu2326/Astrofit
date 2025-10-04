import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle, CheckCircle, XCircle, Eye, Info, MapPin, CreditCard, AlertTriangle
} from 'lucide-react';
import { mockComisiones } from '../mockData';

const ComisionesPendientes: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filtrar comisiones pendientes de validación
  const comisionesPendientes = mockComisiones.filter(
    c => c.estado === 'pendiente_validacion'
  );

  const aprobarComision = (id: string) => {
    console.log('Aprobar comisión:', id);
    alert(`Comisión ${id} aprobada`);
  };

  const rechazarComision = (id: string) => {
    console.log('Rechazar comisión:', id);
    alert(`Comisión ${id} rechazada`);
  };

  const solicitarInfo = (id: string) => {
    console.log('Solicitar más información:', id);
    alert(`Solicitando información adicional para ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
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
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Comisiones Pendientes de Aprobación</h2>
              <p className="text-orange-100 text-lg">
                {comisionesPendientes.length} comisiones requieren tu revisión
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lista de comisiones pendientes */}
      <div className="grid grid-cols-1 gap-6">
        {comisionesPendientes.map((comision, index) => (
          <motion.div
            key={comision.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-yellow-200 relative group hover:shadow-2xl transition-all duration-300"
          >
            {/* Indicador de urgencia */}
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-orange-500"></div>

            <div className="p-6 pl-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información principal */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {comision.id}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={comision.afiliadoAvatar}
                          alt={comision.afiliadoNombre}
                          className="w-10 h-10 rounded-full border-2 border-yellow-300"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-700">{comision.afiliadoNombre}</p>
                          <p className="text-xs text-gray-500 uppercase">{comision.tier}</p>
                        </div>
                      </div>
                    </div>

                    {/* Badge de motivo */}
                    <div className="px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-full">
                      <span className="text-xs font-bold text-yellow-700">Requiere Revisión</span>
                    </div>
                  </div>

                  {/* Motivo de revisión */}
                  <div className="mb-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-yellow-900 mb-1">Motivo de Revisión:</p>
                        <p className="text-sm text-yellow-700">{comision.motivoRevision}</p>
                      </div>
                    </div>
                  </div>

                  {/* Detalles de la venta */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Fecha de Venta:</span>
                      <span className="font-semibold text-gray-900">{comision.fechaVenta}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cliente Referido:</span>
                      <span className="font-semibold text-gray-900">{comision.clienteReferido}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Producto:</span>
                      <span className="font-semibold text-gray-900">{comision.productoVendido}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Valor de Venta:</span>
                      <span className="font-bold text-lg text-gray-900">${comision.valorVenta.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Comisión ({(comision.porcentajeComision * 100).toFixed(0)}%):</span>
                      <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                        ${comision.montoComision.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Información adicional y acciones */}
                <div>
                  {/* Información de la transacción */}
                  <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      Información de la Venta
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">Forma de pago:</span>
                        <span className="font-semibold text-gray-900">Tarjeta de Crédito</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">Ubicación:</span>
                        <span className="font-semibold text-gray-900">Madrid, España</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">IP:</span>
                        <span className="font-mono text-xs font-semibold text-gray-900">192.168.1.{Math.floor(Math.random() * 255)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">Cliente:</span>
                        <span className="font-semibold text-gray-900">{Math.random() > 0.5 ? 'Nuevo' : 'Recurrente'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notas adicionales */}
                  {comision.esRecurrente && (
                    <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-xl">
                      <p className="text-sm text-purple-700 font-medium">
                        ⚡ Comisión Recurrente - Genera pagos mensuales
                      </p>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="space-y-3">
                    <button
                      onClick={() => aprobarComision(comision.id)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Aprobar Comisión
                    </button>

                    <button
                      onClick={() => rechazarComision(comision.id)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <XCircle className="w-5 h-5" />
                      Rechazar
                    </button>

                    <button
                      onClick={() => solicitarInfo(comision.id)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <Info className="w-5 h-5" />
                      Solicitar Más Información
                    </button>

                    <button
                      onClick={() => setExpandedId(expandedId === comision.id ? null : comision.id)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-300 text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300"
                    >
                      <Eye className="w-5 h-5" />
                      Ver Detalles Completos
                    </button>
                  </div>
                </div>
              </div>

              {/* Detalles expandidos */}
              {expandedId === comision.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t-2 border-gray-200"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Historial del Afiliado</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <p className="text-sm text-gray-600 mb-1">Total Generado</p>
                      <p className="text-2xl font-bold text-green-700">$5,280</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Ventas Totales</p>
                      <p className="text-2xl font-bold text-blue-700">23</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <p className="text-sm text-gray-600 mb-1">Tasa Conversión</p>
                      <p className="text-2xl font-bold text-purple-700">4.2%</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {comisionesPendientes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Todo al día!</h3>
          <p className="text-gray-600">No hay comisiones pendientes de aprobación</p>
        </motion.div>
      )}
    </div>
  );
};

export default ComisionesPendientes;
