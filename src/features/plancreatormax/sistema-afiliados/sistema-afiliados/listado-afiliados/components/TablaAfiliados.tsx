
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, DollarSign, MessageCircle, UserX } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAffiliates, Affiliate, payCommission, suspendAffiliate, contactAffiliate } from '../listadoAfiliadosApi';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import Modal from '@/components/ui/modal';

export const TablaAfiliados: React.FC = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchAffiliates = async () => {
      const data = await getAffiliates();
      setAffiliates(data);
      setLoading(false);
    };
    fetchAffiliates();
  }, []);

  const handleViewDetails = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setShowDetailModal(true);
  };


  const handleSuspendAffiliate = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setShowSuspendModal(true);
  };

  const handleContactAffiliate = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setShowContactModal(true);
  };

  const confirmSuspendAffiliate = async () => {
    if (!selectedAffiliate) return;
    
    setIsProcessing(true);
    try {
      await suspendAffiliate(selectedAffiliate.id);
      toast.success(`Afiliado ${selectedAffiliate.name} suspendido correctamente`, {
        icon: '⚠️',
        duration: 4000,
      });
      setShowSuspendModal(false);
      // Refresh data
      const data = await getAffiliates();
      setAffiliates(data);
    } catch (error) {
      toast.error('Error al suspender afiliado');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayCommission = async (affiliate: Affiliate) => {
    setIsProcessing(true);
    try {
      await payCommission(affiliate.id);
      toast.success(`Comisión pagada a ${affiliate.name}`, {
        icon: '💰',
        duration: 4000,
      });
      // Refresh data
      const data = await getAffiliates();
      setAffiliates(data);
    } catch (error) {
      toast.error('Error al pagar comisión');
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmContactAffiliate = async () => {
    if (!selectedAffiliate) return;
    
    setIsProcessing(true);
    try {
      await contactAffiliate(selectedAffiliate.id);
      toast.success(`Mensaje enviado a ${selectedAffiliate.name}`, {
        icon: '📧',
        duration: 4000,
      });
      setShowContactModal(false);
    } catch (error) {
      toast.error('Error al contactar afiliado');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteAffiliate = async (affiliate: Affiliate) => {
    setIsProcessing(true);
    try {
      // Simular eliminación
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Afiliado ${affiliate.name} eliminado`, {
        icon: '🗑️',
        duration: 4000,
      });
      // Refresh data
      const data = await getAffiliates();
      setAffiliates(data);
    } catch (error) {
      toast.error('Error al eliminar afiliado');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Cargando afiliados...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Afiliados Registrados</h2>
          <p className="text-sm text-gray-600 mt-1">Gestiona tu red de afiliados y sus comisiones</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Afiliado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Referido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventas Generadas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión Pendiente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rendimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {affiliates.map((affiliate, index) => (
                <motion.tr
                  key={affiliate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={affiliate.photo} alt={affiliate.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">ID: {affiliate.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {affiliate.referralCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    ${affiliate.salesGenerated.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    ${affiliate.pendingCommission.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        affiliate.performance === 'high' ? 'bg-green-100 text-green-800' :
                        affiliate.performance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {affiliate.performance === 'high' ? 'Alto' : 
                       affiliate.performance === 'medium' ? 'Medio' : 'Bajo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        affiliate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {affiliate.status === 'active' ? 'Activo' : 'Suspendido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(affiliate)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePayCommission(affiliate)}
                        disabled={isProcessing || affiliate.pendingCommission === 0}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Pagar comisión"
                      >
                        <DollarSign className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleContactAffiliate(affiliate)}
                        className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Contactar"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSuspendAffiliate(affiliate)}
                        disabled={isProcessing || affiliate.status === 'suspended'}
                        className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Suspender"
                      >
                        <UserX className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteAffiliate(affiliate)}
                        disabled={isProcessing}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`Detalles de ${selectedAffiliate?.name}`}
        size="md"
      >
        {selectedAffiliate && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src={selectedAffiliate.photo} 
                alt={selectedAffiliate.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedAffiliate.name}</h3>
                <p className="text-gray-600">Código: {selectedAffiliate.referralCode}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700">Ventas Generadas</h4>
                <p className="text-2xl font-bold text-green-600">${selectedAffiliate.salesGenerated.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700">Comisión Pendiente</h4>
                <p className="text-2xl font-bold text-blue-600">${selectedAffiliate.pendingCommission.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedAffiliate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                Estado: {selectedAffiliate.status === 'active' ? 'Activo' : 'Suspendido'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedAffiliate.performance === 'high' ? 'bg-green-100 text-green-800' :
                selectedAffiliate.performance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Rendimiento: {selectedAffiliate.performance === 'high' ? 'Alto' : 
                             selectedAffiliate.performance === 'medium' ? 'Medio' : 'Bajo'}
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Suspensión */}
      <ConfirmationModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={confirmSuspendAffiliate}
        title="Suspender Afiliado"
        message={`¿Estás seguro de que deseas suspender a ${selectedAffiliate?.name}? Esta acción puede revertirse posteriormente.`}
        confirmText="Suspender"
        cancelText="Cancelar"
        type="warning"
        isLoading={isProcessing}
      />

      {/* Modal de Contacto */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title={`Contactar a ${selectedAffiliate?.name}`}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asunto
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Asunto del mensaje"
            />
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
              disabled={isProcessing}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Enviar Mensaje
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
