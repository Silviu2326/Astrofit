import React from 'react';
import { motion } from 'framer-motion';
import { History, CheckCircle, XCircle, Clock, FileText, Mail } from 'lucide-react';
import { mockHistorialPagos } from '../mockData';

const HistorialPagos: React.FC = () => {
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completado':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fallido':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pendiente':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'from-green-500 to-emerald-500';
      case 'fallido':
        return 'from-red-500 to-pink-500';
      case 'pendiente':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getMetodoPagoLabel = (metodo: string) => {
    const labels: Record<string, string> = {
      transferencia: 'Transferencia Bancaria',
      paypal: 'PayPal',
      stripe: 'Stripe',
      wire: 'Wire Transfer'
    };
    return labels[metodo] || metodo;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
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
              <History className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Historial de Pagos</h2>
              <p className="text-pink-100 text-lg">Registro completo de todas las transacciones</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline de pagos */}
      <div className="relative">
        {/* Línea vertical del timeline */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-200 via-pink-200 to-transparent"></div>

        <div className="space-y-6">
          {mockHistorialPagos.map((pago, index) => (
            <motion.div
              key={pago.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="relative pl-20"
            >
              {/* Punto en la línea */}
              <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getEstadoColor(pago.estado)} flex items-center justify-center shadow-lg`}>
                  {getEstadoIcon(pago.estado)}
                </div>
              </div>

              {/* Card del pago */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Información principal */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{pago.id}</h3>
                        <p className="text-sm text-gray-500">{new Date(pago.fecha).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>

                      {/* Badge de estado */}
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getEstadoColor(pago.estado)}`}>
                        <span className="text-sm font-bold text-white capitalize">{pago.estado}</span>
                      </div>
                    </div>

                    {/* Afiliados pagados */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Afiliados Pagados:</p>
                      <div className="flex flex-wrap gap-2">
                        {pago.afiliados.slice(0, 5).map((afiliado, i) => (
                          <div key={i} className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                            <span className="text-sm font-medium text-purple-700">{afiliado}</span>
                          </div>
                        ))}
                        {pago.afiliados.length > 5 && (
                          <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                            <span className="text-sm font-medium text-gray-700">+{pago.afiliados.length - 5} más</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detalles del pago */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Método de Pago</p>
                        <p className="font-semibold text-gray-900">{getMetodoPagoLabel(pago.metodoPago)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Referencia</p>
                        <p className="font-mono text-sm font-semibold text-gray-900">{pago.referencia}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Comisiones Pagadas</p>
                        <p className="font-semibold text-gray-900">{pago.comisionesIds.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monto Total</p>
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                          ${pago.montoTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <FileText className="w-5 h-5" />
                      Ver Recibo (PDF)
                    </button>

                    <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-purple-300 text-purple-700 font-semibold rounded-2xl hover:bg-purple-50 transition-all duration-300">
                      <Mail className="w-5 h-5" />
                      Reenviar Notificación
                    </button>

                    {pago.estado === 'fallido' && (
                      <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <Clock className="w-5 h-5" />
                        Reintentar Pago
                      </button>
                    )}

                    <div className="mt-auto p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-600 text-center">
                        {pago.afiliados.length} afiliado(s)<br/>
                        {pago.comisionesIds.length} transacción(es)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información adicional si está pendiente */}
                {pago.estado === 'pendiente' && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-bold mb-1">Pago en Proceso</p>
                        <p>Este pago está siendo procesado por el proveedor. Tiempo estimado: 1-3 días hábiles.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Información adicional si falló */}
                {pago.estado === 'fallido' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-700">
                        <p className="font-bold mb-1">Pago Fallido</p>
                        <p>El pago no pudo ser procesado. Motivo: Fondos insuficientes en la cuenta.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resumen del historial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del Historial</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Pagos Completados</p>
            <p className="text-3xl font-bold text-green-700">
              {mockHistorialPagos.filter(p => p.estado === 'completado').length}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Pendientes</p>
            <p className="text-3xl font-bold text-yellow-700">
              {mockHistorialPagos.filter(p => p.estado === 'pendiente').length}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200">
            <p className="text-sm text-gray-600 mb-1">Fallidos</p>
            <p className="text-3xl font-bold text-red-700">
              {mockHistorialPagos.filter(p => p.estado === 'fallido').length}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Total Pagado</p>
            <p className="text-2xl font-bold text-purple-700">
              ${mockHistorialPagos.reduce((sum, p) => p.estado === 'completado' ? sum + p.montoTotal : sum, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HistorialPagos;
