import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  Eye, 
  MousePointer, 
  Calendar,
  Clock,
  DollarSign,
  Activity,
  Download,
  Share2,
  Edit,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { fetchCampaignDetail, fetchCampaignAnalytics, exportCampaignReport } from './campaignDetailApi';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';

interface CampaignDetail {
  id: string;
  subject: string;
  date: string;
  time: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled' | 'failed';
  performance: 'good' | 'average' | 'bad';
  revenue?: number;
  unsubscribeRate?: number;
  bounceRate?: number;
  segment?: string;
  template?: string;
  content?: string;
  senderName?: string;
  senderEmail?: string;
  replyTo?: string;
  tags?: string[];
  abTestVariant?: string;
  abTestWinner?: boolean;
}

interface CampaignAnalytics {
  opens: {
    total: number;
    unique: number;
    rate: number;
    timeline: Array<{ date: string; opens: number }>;
  };
  clicks: {
    total: number;
    unique: number;
    rate: number;
    timeline: Array<{ date: string; clicks: number }>;
  };
  devices: Array<{ device: string; percentage: number; opens: number }>;
  locations: Array<{ country: string; percentage: number; opens: number }>;
  links: Array<{ url: string; clicks: number; percentage: number }>;
  unsubscribes: number;
  bounces: number;
  complaints: number;
}

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
  const [analytics, setAnalytics] = useState<CampaignAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'content' | 'recipients'>('overview');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      loadCampaignData();
    }
  }, [id]);

  const loadCampaignData = async () => {
    try {
      setLoading(true);
      const [campaignData, analyticsData] = await Promise.all([
        fetchCampaignDetail(id!),
        fetchCampaignAnalytics(id!)
      ]);
      setCampaign(campaignData);
      setAnalytics(analyticsData);
    } catch (err) {
      setError('Error al cargar los detalles de la campaña');
      toast.error('Error al cargar los detalles de la campaña');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!campaign) return;
    
    setIsExporting(true);
    try {
      await exportCampaignReport(campaign.id);
      toast.success('Reporte exportado exitosamente');
    } catch (error) {
      toast.error('Error al exportar el reporte');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async () => {
    if (!campaign) return;
    
    setIsDeleting(true);
    try {
      // Simulate delete API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Campaña eliminada exitosamente');
      navigate('/email-broadcast/listado-emails');
    } catch (error) {
      toast.error('Error al eliminar la campaña');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'draft':
        return <Edit className="w-5 h-5 text-yellow-500" />;
      case 'scheduled':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Enviado';
      case 'draft':
        return 'Borrador';
      case 'scheduled':
        return 'Programado';
      case 'failed':
        return 'Fallido';
      default:
        return status;
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'good':
        return 'text-green-600';
      case 'average':
        return 'text-yellow-600';
      case 'bad':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Cargando detalles de la campaña...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">Error al cargar la campaña</div>
          <p className="text-gray-600 mb-4">{error || 'Campaña no encontrada'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Back Button */}
        <div className="relative z-10 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </motion.button>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getStatusIcon(campaign.status)}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                  {campaign.subject}
                </h1>
                <div className="flex items-center gap-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(campaign.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{campaign.time}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {getStatusText(campaign.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                {isExporting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Exportar</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.success('Funcionalidad de compartir próximamente')}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Compartir</span>
              </motion.button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="text-sm text-blue-100">Destinatarios</span>
              </div>
              <p className="text-2xl font-bold text-white">{campaign.recipients.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-green-300" />
                <span className="text-sm text-blue-100">Apertura</span>
              </div>
              <p className="text-2xl font-bold text-white">{(campaign.openRate * 100).toFixed(1)}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="w-5 h-5 text-purple-300" />
                <span className="text-sm text-blue-100">Clics</span>
              </div>
              <p className="text-2xl font-bold text-white">{(campaign.clickRate * 100).toFixed(1)}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-yellow-300" />
                <span className="text-sm text-blue-100">Ingresos</span>
              </div>
              <p className="text-2xl font-bold text-white">${campaign.revenue?.toLocaleString() || '0'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
      >
        <div className="flex items-center gap-2 bg-gray-100/50 rounded-xl p-1">
          {(['overview', 'analytics', 'content', 'recipients'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' ? 'Resumen' : 
               tab === 'analytics' ? 'Analíticas' : 
               tab === 'content' ? 'Contenido' : 'Destinatarios'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6"
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Campaign Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Información de la Campaña</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-medium">{campaign.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Segmento:</span>
                    <span className="font-medium">{campaign.segment || 'Todos los segmentos'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plantilla:</span>
                    <span className="font-medium">{campaign.template || 'Personalizada'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remitente:</span>
                    <span className="font-medium">{campaign.senderName || 'Sistema'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{campaign.senderEmail || 'noreply@empresa.com'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Métricas de Rendimiento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rendimiento:</span>
                    <span className={`font-medium ${getPerformanceColor(campaign.performance)}`}>
                      {campaign.performance === 'good' ? 'Excelente' : 
                       campaign.performance === 'average' ? 'Regular' : 'Bajo'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rebotes:</span>
                    <span className="font-medium">{((campaign.bounceRate || 0) * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bajas:</span>
                    <span className="font-medium">{((campaign.unsubscribeRate || 0) * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">A/B Test:</span>
                    <span className="font-medium">{campaign.abTestVariant || 'No aplicado'}</span>
                  </div>
                  {campaign.abTestWinner && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ganador A/B:</span>
                      <span className="font-medium text-green-600">Sí</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            {campaign.tags && campaign.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && analytics && (
          <div className="space-y-8">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Aperturas</h3>
                    <p className="text-2xl font-bold text-blue-600">{analytics.opens.unique.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {analytics.opens.total.toLocaleString()} aperturas totales
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                    <MousePointer className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Clics</h3>
                    <p className="text-2xl font-bold text-green-600">{analytics.clicks.unique.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {analytics.clicks.total.toLocaleString()} clics totales
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Engagement</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {((analytics.clicks.unique / analytics.opens.unique) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Tasa de clics por apertura
                </p>
              </div>
            </div>

            {/* Devices and Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispositivos</h3>
                <div className="space-y-3">
                  {analytics.devices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{device.device}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full" 
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{device.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubicaciones</h3>
                <div className="space-y-3">
                  {analytics.locations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{location.country}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces Más Clickeados</h3>
              <div className="space-y-3">
                {analytics.links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{link.url}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{link.clicks} clics</span>
                      <span className="text-sm font-medium text-indigo-600">{link.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenido del Email</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: campaign.content || '<p>Contenido no disponible</p>' 
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recipients' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Segmentación</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Segmento:</span>
                    <span className="font-medium">{campaign.segment || 'Todos los segmentos'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total destinatarios:</span>
                    <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aperturas:</span>
                    <span className="font-medium">{Math.round(campaign.recipients * campaign.openRate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clics:</span>
                    <span className="font-medium">{Math.round(campaign.recipients * campaign.clickRate).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas de Entrega</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entregados:</span>
                    <span className="font-medium text-green-600">
                      {Math.round(campaign.recipients * (1 - (campaign.bounceRate || 0))).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rebotes:</span>
                    <span className="font-medium text-red-600">
                      {Math.round(campaign.recipients * (campaign.bounceRate || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bajas:</span>
                    <span className="font-medium text-orange-600">
                      {Math.round(campaign.recipients * (campaign.unsubscribeRate || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasa de entrega:</span>
                    <span className="font-medium">
                      {((1 - (campaign.bounceRate || 0)) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar Campaña"
        message={`¿Estás seguro de que quieres eliminar permanentemente la campaña "${campaign.subject}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isDeleting}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#f59e0b',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default CampaignDetailPage;
