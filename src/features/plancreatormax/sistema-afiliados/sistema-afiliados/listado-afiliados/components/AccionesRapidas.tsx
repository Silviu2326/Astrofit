
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, UserX, MessageCircle, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import Modal from '@/components/ui/modal';

export const AccionesRapidas: React.FC = () => {
  const [isPayingCommissions, setIsPayingCommissions] = useState(false);
  const [isSuspendingAffiliate, setIsSuspendingAffiliate] = useState(false);
  const [isContactingAffiliate, setIsContactingAffiliate] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handlePayCommissions = async () => {
    setIsPayingCommissions(true);
    try {
      // Simular proceso de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Comisiones pagadas exitosamente', {
        icon: '💰',
        duration: 4000,
      });
    } catch (error) {
      toast.error('Error al pagar comisiones');
    } finally {
      setIsPayingCommissions(false);
    }
  };

  const handleSuspendAffiliate = () => {
    setShowSuspendModal(true);
  };

  const confirmSuspendAffiliate = async () => {
    setIsSuspendingAffiliate(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Afiliado suspendido correctamente', {
        icon: '⚠️',
        duration: 4000,
      });
      setShowSuspendModal(false);
    } catch (error) {
      toast.error('Error al suspender afiliado');
    } finally {
      setIsSuspendingAffiliate(false);
    }
  };

  const handleContactAffiliate = () => {
    setShowContactModal(true);
  };

  const confirmContactAffiliate = async () => {
    setIsContactingAffiliate(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Mensaje enviado al afiliado', {
        icon: '📧',
        duration: 4000,
      });
      setShowContactModal(false);
    } catch (error) {
      toast.error('Error al contactar afiliado');
    } finally {
      setIsContactingAffiliate(false);
    }
  };

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  const confirmGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Reporte generado y descargado', {
        icon: '📊',
        duration: 4000,
      });
      setShowReportModal(false);
    } catch (error) {
      toast.error('Error al generar reporte');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const buttons = [
    {
      label: 'Pagar Comisiones',
      icon: DollarSign,
      onClick: handlePayCommissions,
      loading: isPayingCommissions,
      className: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
    },
    {
      label: 'Suspender Afiliado',
      icon: UserX,
      onClick: handleSuspendAffiliate,
      loading: false,
      className: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white',
    },
    {
      label: 'Contactar Afiliado',
      icon: MessageCircle,
      onClick: handleContactAffiliate,
      loading: false,
      className: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
    },
    {
      label: 'Generar Reporte',
      icon: FileText,
      onClick: handleGenerateReport,
      loading: false,
      className: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white',
    },
  ];

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {buttons.map((button, index) => (
            <motion.button
              key={button.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={button.onClick}
              disabled={button.loading}
              className={`${button.className} font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {button.loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <button.icon className="w-4 h-4" />
              )}
              {button.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal de Suspensión */}
      <ConfirmationModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={confirmSuspendAffiliate}
        title="Suspender Afiliado"
        message="¿Estás seguro de que deseas suspender este afiliado? Esta acción puede revertirse posteriormente."
        confirmText="Suspender"
        cancelText="Cancelar"
        type="warning"
        isLoading={isSuspendingAffiliate}
      />

      {/* Modal de Contacto */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contactar Afiliado"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Afiliado
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Selecciona un afiliado</option>
              <option value="1">Juan Pérez (JP2023)</option>
              <option value="2">María García (MG2023)</option>
              <option value="3">Carlos Ruíz (CR2023)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje
            </label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowContactModal(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmContactAffiliate}
              disabled={isContactingAffiliate}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isContactingAffiliate && <Loader2 className="w-4 h-4 animate-spin" />}
              Enviar Mensaje
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Reporte */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Generar Reporte"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Reporte
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="sales">Reporte de Ventas</option>
              <option value="commissions">Reporte de Comisiones</option>
              <option value="performance">Reporte de Rendimiento</option>
              <option value="complete">Reporte Completo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="last-month">Último Mes</option>
              <option value="last-3-months">Últimos 3 Meses</option>
              <option value="last-6-months">Últimos 6 Meses</option>
              <option value="last-year">Último Año</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowReportModal(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmGenerateReport}
              disabled={isGeneratingReport}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGeneratingReport && <Loader2 className="w-4 h-4 animate-spin" />}
              Generar Reporte
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
