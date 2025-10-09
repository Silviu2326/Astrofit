import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import ListadoPedidos from './components/ListadoPedidos';
import DetallePedido from './components/DetallePedido';
import SeguimientoEnvio from './components/SeguimientoEnvio';
import GestorEstados from './components/GestorEstados';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';
import { ToastProvider } from '../../../../../components/ui/toast';

const PedidosClientesPage: React.FC = () => {
  // Estados para modales
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmType, setConfirmType] = useState<'danger' | 'warning' | 'info'>('info');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para pedido seleccionado
  const [selectedPedidoId, setSelectedPedidoId] = useState<string>('');

  const stats = [
    { title: 'Pedidos Totales', value: '1,234', change: '+12.5%', icon: ShoppingCart, color: 'from-blue-500 to-purple-600' },
    { title: 'En Proceso', value: '89', change: '+5.2%', icon: Clock, color: 'from-orange-500 to-red-500' },
    { title: 'Completados', value: '1,145', change: '+8.1%', icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
    { title: 'Clientes Activos', value: '456', change: '+15.3%', icon: Users, color: 'from-purple-500 to-pink-500' }
  ];

  // Función para mostrar confirmación
  const showConfirmation = (
    title: string, 
    message: string, 
    action: () => void, 
    type: 'danger' | 'warning' | 'info' = 'info'
  ) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  // Función para confirmar acción
  const handleConfirm = async () => {
    if (confirmAction) {
      setIsLoading(true);
      try {
        await confirmAction();
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error en la acción:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Función para cancelar confirmación
  const handleCancel = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
    setIsLoading(false);
  };

  return (
    <>
      <ToastProvider />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <ShoppingCart className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Pedidos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Administra y supervisa todos los <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">pedidos de clientes</span> de manera eficiente
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Package className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Pedidos Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Truck className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">En Tránsito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Crecimiento</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4">
        {/* Grid de Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Decoración de fondo */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

                <div className="relative z-10">
                  {/* Icono */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Título */}
                  <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                    {stat.title}
                  </p>

                  {/* Valor */}
                  <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                    {stat.value}
                  </p>

                  {/* Cambio */}
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-green-50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-bold text-green-600">+{stat.change}</span>
                    <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Grid de Componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Listado de Pedidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                  <Package className="w-6 h-6" />
                </div>
                Listado de Pedidos
              </h2>
              <ListadoPedidos 
                onPedidoSelect={(pedido) => {
                  setSelectedPedidoId(pedido.id);
                  toast.success(`Pedido ${pedido.id} seleccionado`);
                }}
              />
            </div>
          </motion.div>

          {/* Detalle de Pedido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
                  <CheckCircle className="w-6 h-6" />
                </div>
                Detalle de Pedido
              </h2>
              <DetallePedido pedidoId={selectedPedidoId} />
            </div>
          </motion.div>

          {/* Seguimiento de Envío */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
                  <Truck className="w-6 h-6" />
                </div>
                Seguimiento de Envío
              </h2>
              <SeguimientoEnvio 
                onTrackingSuccess={(trackingId) => {
                  toast.success(`Información de seguimiento obtenida para: ${trackingId}`);
                }}
                onTrackingError={(error) => {
                  toast.error(`Error al obtener seguimiento: ${error}`);
                }}
              />
            </div>
          </motion.div>

          {/* Gestor de Estados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white">
                  <AlertCircle className="w-6 h-6" />
                </div>
                Gestor de Estados
              </h2>
              <GestorEstados 
                onUpdateSuccess={(pedidoId, estado) => {
                  toast.success(`Estado del pedido ${pedidoId} actualizado a "${estado}"`);
                }}
                onUpdateError={(error) => {
                  toast.error(`Error al actualizar estado: ${error}`);
                }}
                onDevolucionSuccess={(pedidoId) => {
                  toast.success(`Solicitud de devolución procesada para pedido ${pedidoId}`);
                }}
                onDevolucionError={(error) => {
                  toast.error(`Error al procesar devolución: ${error}`);
                }}
                onConfirmAction={showConfirmation}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={confirmTitle}
        message={confirmMessage}
        type={confirmType}
        isLoading={isLoading}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />
    </div>
    </>
  );
};

export default PedidosClientesPage;
