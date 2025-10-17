import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, History, Settings, Shield, Clock, CheckCircle, Download, FileText } from 'lucide-react';
import HistorialPagos from './components/HistorialPagos';
import MetodosPago from './components/MetodosPago';
import ProcesadorPagos from './components/ProcesadorPagos';
import Modal from '../../../../../components/ui/modal';

interface Pago {
  id: string;
  fecha: string;
  monto: number;
  metodo: 'transferencia' | 'paypal' | 'stripe';
  estado: 'pendiente' | 'procesado' | 'fallido';
  comprobanteUrl?: string;
}

interface MetodoPago {
  id: string;
  nombre: string;
  tipo: 'transferencia' | 'paypal' | 'stripe';
  detalles: string;
}

const PagosAfiliadosPage: React.FC = () => {
  const [showComprobanteModal, setShowComprobanteModal] = useState(false);
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [metodoToDelete, setMetodoToDelete] = useState<MetodoPago | null>(null);

  const handleShowComprobante = (pago: Pago) => {
    setSelectedPago(pago);
    setShowComprobanteModal(true);
  };

  const handleCloseComprobanteModal = () => {
    setShowComprobanteModal(false);
    setSelectedPago(null);
  };

  const handleDownloadComprobante = () => {
    if (selectedPago?.comprobanteUrl) {
      // Simular descarga del comprobante
      const link = document.createElement('a');
      link.href = selectedPago.comprobanteUrl;
      link.download = `comprobante-pago-${selectedPago.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShowDeleteModal = (metodo: MetodoPago) => {
    setMetodoToDelete(metodo);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setMetodoToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (metodoToDelete) {
      // Aquí iría la lógica para eliminar el método
      // Por ahora solo cerramos el modal
      setShowDeleteModal(false);
      setMetodoToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <CreditCard className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Pagos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Administra los pagos de afiliados con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">seguridad y eficiencia</span> total
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Pagos Seguros</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Procesamiento Rápido</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Trazabilidad Completa</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sección Procesar Pagos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Procesar Pagos
              </h2>
            </div>
            <ProcesadorPagos />
          </div>
        </div>
      </motion.section>

      {/* Sección Historial de Pagos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <History className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Historial de Pagos
              </h2>
            </div>
            <HistorialPagos onShowComprobante={handleShowComprobante} />
          </div>
        </div>
      </motion.section>

      {/* Sección Métodos de Pago */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                Métodos de Pago
              </h2>
            </div>
            <MetodosPago onShowDeleteModal={handleShowDeleteModal} />
          </div>
        </div>
      </motion.section>

      {/* Modal de Comprobante */}
      <Modal
        isOpen={showComprobanteModal}
        onClose={handleCloseComprobanteModal}
        title="Comprobante de Pago"
        size="xl"
      >
        {selectedPago && (
          <div className="space-y-6">
            {/* Información del pago */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Detalles del Pago</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">ID del Pago</label>
                  <p className="text-lg font-semibold text-gray-900">#{selectedPago.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Fecha</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(selectedPago.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Monto</label>
                  <p className="text-2xl font-bold text-green-600">${selectedPago.monto.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Método de Pago</label>
                  <div className="flex items-center gap-2">
                    {selectedPago.metodo === 'transferencia' && <span className="text-2xl">🏦</span>}
                    {selectedPago.metodo === 'paypal' && <span className="text-2xl">🅿️</span>}
                    {selectedPago.metodo === 'stripe' && <span className="text-2xl">💳</span>}
                    <span className="text-lg font-semibold text-gray-900 capitalize">
                      {selectedPago.metodo}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Estado</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedPago.estado === 'procesado' ? 'bg-green-100 text-green-800' :
                    selectedPago.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedPago.estado === 'procesado' && '✅'}
                    {selectedPago.estado === 'pendiente' && '⏳'}
                    {selectedPago.estado === 'fallido' && '❌'}
                    <span className="ml-1 capitalize">{selectedPago.estado}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Vista previa del comprobante */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Vista Previa del Comprobante</h4>
                <p className="text-gray-600 mb-4">
                  El comprobante se muestra en una nueva ventana para mejor visualización
                </p>
                
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      if (selectedPago.comprobanteUrl) {
                        window.open(selectedPago.comprobanteUrl, '_blank', 'width=800,height=600');
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Comprobante Completo
                  </button>
                  
                  <button
                    onClick={handleDownloadComprobante}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-amber-100 rounded">
                  <Shield className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h5 className="font-medium text-amber-800">Información Importante</h5>
                  <p className="text-sm text-amber-700 mt-1">
                    Este comprobante es válido para efectos fiscales y contables. 
                    Guarda una copia para tus registros.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Confirmación para Eliminar Método */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Confirmar eliminación"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ¿Eliminar método de pago?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Esta acción no se puede deshacer. El método <strong>{metodoToDelete?.nombre}</strong> será eliminado permanentemente.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCloseDeleteModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PagosAfiliadosPage;
