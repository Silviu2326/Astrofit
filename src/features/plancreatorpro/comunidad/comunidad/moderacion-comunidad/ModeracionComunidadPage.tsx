import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  MessageSquare, 
  User, 
  Flag,
  Clock,
  Users,
  Activity,
  Search,
  MoreVertical,
  Ban,
  Check,
  AlertCircle,
  UserX,
  MessageCircle
} from 'lucide-react';
import Modal from '../../../../../components/ui/modal';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';

const ModeracionComunidadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReporte, setSelectedReporte] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<{
    type: string;
    reporte: any;
  } | null>(null);

  // Mock data para reportes
  const reportes = [
    {
      id: 1,
      type: 'spam',
      user: 'usuario123',
      content: 'Post promocional no autorizado',
      reportedBy: 'moderador1',
      timestamp: '2 horas',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'inappropriate',
      user: 'fitness_guru',
      content: 'Comentario con lenguaje inapropiado',
      reportedBy: 'usuario456',
      timestamp: '4 horas',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'harassment',
      user: 'trainer_pro',
      content: 'Acoso a otros usuarios',
      reportedBy: 'victim_user',
      timestamp: '6 horas',
      status: 'reviewed',
      priority: 'high'
    },
    {
      id: 4,
      type: 'spam',
      user: 'spammer_bot',
      content: 'Múltiples posts promocionales',
      reportedBy: 'auto_mod',
      timestamp: '1 día',
      status: 'resolved',
      priority: 'high'
    }
  ];

  const stats = [
    { label: 'Reportes Pendientes', value: 12, icon: AlertTriangle, color: 'orange' },
    { label: 'Usuarios Moderados', value: 8, icon: User, color: 'blue' },
    { label: 'Posts Revisados', value: 45, icon: MessageSquare, color: 'green' },
    { label: 'Actividad Hoy', value: 156, icon: Activity, color: 'purple' }
  ];

  const tabs = [
    { id: 'pending', label: 'Pendientes', count: 8, icon: Clock },
    { id: 'reviewed', label: 'Revisados', count: 15, icon: Eye },
    { id: 'resolved', label: 'Resueltos', count: 32, icon: CheckCircle },
    { id: 'users', label: 'Usuarios', count: 5, icon: Users }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'reviewed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spam': return Flag;
      case 'inappropriate': return AlertTriangle;
      case 'harassment': return Ban;
      default: return AlertCircle;
    }
  };

  // Funciones para manejar acciones
  const handleApproveReport = (reporte: any) => {
    setConfirmationAction({ type: 'approve', reporte });
    setIsConfirmationOpen(true);
  };

  const handleRejectReport = (reporte: any) => {
    setConfirmationAction({ type: 'reject', reporte });
    setIsConfirmationOpen(true);
  };

  const handleMoreActions = (reporte: any) => {
    setSelectedReporte(reporte);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (!confirmationAction) return;

    const { type, reporte } = confirmationAction;
    
    switch (type) {
      case 'approve':
        toast.success(`Reporte #${reporte.id} aprobado correctamente`);
        break;
      case 'reject':
        toast.success(`Reporte #${reporte.id} rechazado`);
        break;
      case 'ban_user':
        toast.success(`Usuario ${reporte.user} suspendido temporalmente`);
        break;
      case 'delete_content':
        toast.success(`Contenido eliminado del reporte #${reporte.id}`);
        break;
    }
    
    setIsConfirmationOpen(false);
    setConfirmationAction(null);
  };

  const handleBanUser = (reporte: any) => {
    setConfirmationAction({ type: 'ban_user', reporte });
    setIsConfirmationOpen(true);
    setIsModalOpen(false);
  };

  const handleDeleteContent = (reporte: any) => {
    setConfirmationAction({ type: 'delete_content', reporte });
    setIsConfirmationOpen(true);
    setIsModalOpen(false);
  };

  const filteredReportes = reportes.filter(reporte => {
    const matchesSearch = reporte.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reporte.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'pending') return matchesSearch && reporte.status === 'pending';
    if (activeTab === 'reviewed') return matchesSearch && reporte.status === 'reviewed';
    if (activeTab === 'resolved') return matchesSearch && reporte.status === 'resolved';
    if (activeTab === 'users') return matchesSearch; // Para usuarios, mostrar todos
    
    return matchesSearch;
  });

  return (
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
              <Shield className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Panel de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Moderación</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona la comunidad y mantén un ambiente seguro para todos los usuarios
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Comunidad Segura</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Monitoreo Activo</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Decoración de fondo */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  {/* Icono */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Título */}
                  <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                    {stat.label}
                  </p>

                  {/* Valor */}
                  <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Panel principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            {/* Header con tabs */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white/50 hover:bg-white/80 text-gray-700 hover:shadow-md'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="font-semibold">{tab.label}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {tab.count}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Búsqueda */}
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar reportes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido de la tabla */}
            <div className="p-6">
              <div className="space-y-4">
                {filteredReportes.map((reporte, index) => {
                  const TypeIcon = getTypeIcon(reporte.type);
                  
                  return (
                    <motion.div
                      key={reporte.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group"
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-blue-400 to-indigo-600">
                        <TypeIcon className="w-6 h-6" />
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-bold text-gray-900">{reporte.user}</h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(reporte.status)}`}>
                            {reporte.status}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(reporte.priority)}`}>
                            {reporte.priority}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{reporte.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Reportado por: {reporte.reportedBy}</span>
                          <span>•</span>
                          <span>Hace {reporte.timestamp}</span>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleApproveReport(reporte)}
                          className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors duration-300"
                          title="Aprobar reporte"
                        >
                          <Check className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRejectReport(reporte)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors duration-300"
                          title="Rechazar reporte"
                        >
                          <XCircle className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleMoreActions(reporte)}
                          className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors duration-300"
                          title="Más acciones"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de acciones adicionales */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Acciones de Moderación"
        size="md"
      >
        {selectedReporte && (
          <div className="space-y-6">
            {/* Información del reporte */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Detalles del Reporte</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Usuario:</span>
                  <span className="font-medium">{selectedReporte.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium capitalize">{selectedReporte.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prioridad:</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedReporte.priority)}`}>
                    {selectedReporte.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reportado por:</span>
                  <span className="font-medium">{selectedReporte.reportedBy}</span>
                </div>
              </div>
            </div>

            {/* Contenido reportado */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Contenido Reportado</h4>
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border">
                {selectedReporte.content}
              </p>
            </div>

            {/* Acciones disponibles */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Acciones Disponibles</h4>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBanUser(selectedReporte)}
                className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors duration-300"
              >
                <UserX className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-semibold text-red-900">Suspender Usuario</div>
                  <div className="text-sm text-red-700">Bloquear temporalmente al usuario</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDeleteContent(selectedReporte)}
                className="w-full flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <div className="font-semibold text-orange-900">Eliminar Contenido</div>
                  <div className="text-sm text-orange-700">Remover el contenido reportado</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toast.success(`Enviando advertencia a ${selectedReporte.user}`);
                  setIsModalOpen(false);
                }}
                className="w-full flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-xl transition-colors duration-300"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div className="text-left">
                  <div className="font-semibold text-yellow-900">Enviar Advertencia</div>
                  <div className="text-sm text-yellow-700">Notificar al usuario sobre la violación</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toast.success(`Marcando como revisado el reporte #${selectedReporte.id}`);
                  setIsModalOpen(false);
                }}
                className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors duration-300"
              >
                <Eye className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-blue-900">Marcar como Revisado</div>
                  <div className="text-sm text-blue-700">Cambiar estado a revisado</div>
                </div>
              </motion.button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => {
          setIsConfirmationOpen(false);
          setConfirmationAction(null);
        }}
        onConfirm={confirmAction}
        title={
          confirmationAction?.type === 'approve' ? 'Aprobar Reporte' :
          confirmationAction?.type === 'reject' ? 'Rechazar Reporte' :
          confirmationAction?.type === 'ban_user' ? 'Suspender Usuario' :
          confirmationAction?.type === 'delete_content' ? 'Eliminar Contenido' :
          'Confirmar Acción'
        }
        message={
          confirmationAction?.type === 'approve' ? 
            `¿Estás seguro de que quieres aprobar el reporte #${confirmationAction?.reporte?.id}?` :
          confirmationAction?.type === 'reject' ? 
            `¿Estás seguro de que quieres rechazar el reporte #${confirmationAction?.reporte?.id}?` :
          confirmationAction?.type === 'ban_user' ? 
            `¿Estás seguro de que quieres suspender temporalmente al usuario ${confirmationAction?.reporte?.user}?` :
          confirmationAction?.type === 'delete_content' ? 
            `¿Estás seguro de que quieres eliminar el contenido del reporte #${confirmationAction?.reporte?.id}?` :
          '¿Estás seguro de que quieres realizar esta acción?'
        }
        confirmText={
          confirmationAction?.type === 'approve' ? 'Aprobar' :
          confirmationAction?.type === 'reject' ? 'Rechazar' :
          confirmationAction?.type === 'ban_user' ? 'Suspender' :
          confirmationAction?.type === 'delete_content' ? 'Eliminar' :
          'Confirmar'
        }
        type={
          confirmationAction?.type === 'ban_user' || confirmationAction?.type === 'delete_content' ? 'danger' :
          confirmationAction?.type === 'reject' ? 'warning' : 'info'
        }
      />
    </div>
  );
};

export default ModeracionComunidadPage;
