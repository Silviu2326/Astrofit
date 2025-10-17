import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  Eye, 
  MousePointer,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Copy,
  Edit,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { fetchAllCampaigns, exportCampaigns, deleteCampaign, duplicateCampaign } from './historialCompletoApi';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';

interface Campaign {
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
}

const HistorialCompletoPage: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [performanceFilter, setPerformanceFilter] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'recipients' | 'openRate' | 'clickRate'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  // Función para calcular fechas de período
  const getPeriodDates = (period: 'week' | 'month' | 'quarter' | 'all') => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (period) {
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return {
          from: weekAgo.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        };
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return {
          from: monthAgo.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        };
      case 'quarter':
        const quarterAgo = new Date(today);
        quarterAgo.setMonth(today.getMonth() - 3);
        return {
          from: quarterAgo.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        };
      case 'all':
      default:
        return {
          from: '',
          to: ''
        };
    }
  };

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const data = await fetchAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError('Error al cargar las campañas');
      toast.error('Error al cargar las campañas');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (campaign: Campaign) => {
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!campaignToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteCampaign(campaignToDelete.id);
      toast.success(`Campaña "${campaignToDelete.subject}" eliminada exitosamente`);
      setCampaigns(prev => prev.filter(c => c.id !== campaignToDelete.id));
      setShowDeleteModal(false);
      setCampaignToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar la campaña');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicate = async (campaign: Campaign) => {
    try {
      await duplicateCampaign(campaign.id);
      toast.success(`Campaña "${campaign.subject}" duplicada exitosamente`);
      // Refresh campaigns
      await loadCampaigns();
    } catch (error) {
      toast.error('Error al duplicar la campaña');
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportCampaigns(filteredCampaigns);
      toast.success('Reporte exportado exitosamente');
    } catch (error) {
      toast.error('Error al exportar el reporte');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePeriodChange = (period: 'week' | 'month' | 'quarter' | 'all') => {
    setSelectedPeriod(period);
    const periodDates = getPeriodDates(period);
    setDateFrom(periodDates.from);
    setDateTo(periodDates.to);
    
    // Debug: mostrar las fechas calculadas
    console.log(`Período seleccionado: ${period}`);
    console.log(`Fechas calculadas:`, periodDates);
    
    // Feedback al usuario
    const periodText = period === 'all' ? 'Todos los períodos' :
                      period === 'week' ? 'Última semana' :
                      period === 'month' ? 'Último mes' : 'Último trimestre';
    toast.success(`Filtro aplicado: ${periodText}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'draft':
        return <Edit className="w-4 h-4 text-yellow-500" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
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

  const getPerformanceTag = (performance: 'good' | 'average' | 'bad') => {
    switch (performance) {
      case 'good':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Excelente</span>;
      case 'average':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Regular</span>;
      case 'bad':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Bajo</span>;
      default:
        return null;
    }
  };

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || campaign.status === statusFilter;
      const matchesPerformance = !performanceFilter || campaign.performance === performanceFilter;
      
      // Mejorar la lógica de filtrado de fechas
      let matchesDateFrom = true;
      let matchesDateTo = true;
      
      if (dateFrom || dateTo) {
        const campaignDate = new Date(campaign.date);
        const fromDate = dateFrom ? new Date(dateFrom) : null;
        const toDate = dateTo ? new Date(dateTo) : null;
        
        if (fromDate) {
          matchesDateFrom = campaignDate >= fromDate;
        }
        if (toDate) {
          matchesDateTo = campaignDate <= toDate;
        }
        
        // Debug: mostrar información de filtrado
        if (campaign.id === '1') { // Solo para la primera campaña para no saturar el console
          console.log(`Campaña: ${campaign.subject} (${campaign.date})`);
          console.log(`Filtro desde: ${dateFrom}, hasta: ${dateTo}`);
          console.log(`Fecha campaña: ${campaignDate.toISOString().split('T')[0]}`);
          console.log(`Desde: ${fromDate?.toISOString().split('T')[0]}, Hasta: ${toDate?.toISOString().split('T')[0]}`);
          console.log(`Matches desde: ${matchesDateFrom}, hasta: ${matchesDateTo}`);
        }
      }
      
      return matchesSearch && matchesStatus && matchesPerformance && matchesDateFrom && matchesDateTo;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'recipients':
          aValue = a.recipients;
          bValue = b.recipients;
          break;
        case 'openRate':
          aValue = a.openRate;
          bValue = b.openRate;
          break;
        case 'clickRate':
          aValue = a.clickRate;
          bValue = b.clickRate;
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Cargando historial completo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">Error al cargar las campañas</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadCampaigns}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Reintentar
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <BarChart3 className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Historial <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Completo</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mt-2">
                Todas tus campañas de email marketing en un solo lugar
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Mail className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">
                {filteredCampaigns.length} Campañas
                {selectedPeriod !== 'all' && (
                  <span className="text-xs text-blue-200 ml-1">
                    ({selectedPeriod === 'week' ? 'Última semana' : 
                      selectedPeriod === 'month' ? 'Último mes' : 'Último trimestre'})
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">
                {filteredCampaigns.reduce((acc, c) => acc + c.recipients, 0).toLocaleString()} Destinatarios
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">
                {filteredCampaigns.length > 0 
                  ? ((filteredCampaigns.reduce((acc, c) => acc + c.openRate, 0) / filteredCampaigns.length) * 100).toFixed(1)
                  : '0.0'
                }% Apertura Promedio
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar campañas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm appearance-none"
            >
              <option value="">Todos los estados</option>
              <option value="sent">Enviado</option>
              <option value="draft">Borrador</option>
              <option value="scheduled">Programado</option>
              <option value="failed">Fallido</option>
            </select>
          </div>

          {/* Performance Filter */}
          <select
            value={performanceFilter}
            onChange={(e) => setPerformanceFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
          >
            <option value="">Todos los rendimientos</option>
            <option value="good">Excelente</option>
            <option value="average">Regular</option>
            <option value="bad">Bajo</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field as any);
              setSortOrder(order as any);
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
          >
            <option value="date-desc">Fecha (Más reciente)</option>
            <option value="date-asc">Fecha (Más antiguo)</option>
            <option value="recipients-desc">Destinatarios (Mayor)</option>
            <option value="recipients-asc">Destinatarios (Menor)</option>
            <option value="openRate-desc">Apertura (Mayor)</option>
            <option value="openRate-asc">Apertura (Menor)</option>
            <option value="clickRate-desc">Clics (Mayor)</option>
            <option value="clickRate-asc">Clics (Menor)</option>
          </select>
        </div>

        {/* Period Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filtrar por Período</h3>
            {selectedPeriod !== 'all' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-indigo-600 font-medium">
                  Filtro activo: {selectedPeriod === 'week' ? 'Última semana' : 
                                 selectedPeriod === 'month' ? 'Último mes' : 'Último trimestre'}
                </span>
                <button
                  onClick={() => handlePeriodChange('all')}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Limpiar
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 bg-gray-100/50 rounded-xl p-1 w-fit">
            {(['all', 'week', 'month', 'quarter'] as const).map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period === 'all' ? 'Todos' : 
                 period === 'week' ? 'Última Semana' : 
                 period === 'month' ? 'Último Mes' : 'Último Trimestre'}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              placeholder="Fecha desde"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              placeholder="Fecha hasta"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Exportar Reporte
          </motion.button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {filteredCampaigns.length} de {campaigns.length} campañas
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setDateFrom('');
              setDateTo('');
              setPerformanceFilter('');
              setSelectedPeriod('all');
            }}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </motion.div>

      {/* Campaigns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Campaña
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Destinatarios
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Apertura
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Clics
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rendimiento
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-200/50">
              {filteredCampaigns.map((campaign, index) => (
                <motion.tr
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/80 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {getStatusIcon(campaign.status)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 max-w-xs truncate">
                          {campaign.subject}
                        </div>
                        <div className="text-sm text-gray-500">
                          {campaign.segment || 'Todos los segmentos'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusText(campaign.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{new Date(campaign.date).toLocaleDateString('es-ES')}</div>
                    <div className="text-xs text-gray-500">{campaign.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.recipients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">{(campaign.openRate * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <MousePointer className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">{(campaign.clickRate * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPerformanceTag(campaign.performance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/email-broadcast/campaign-detail/${campaign.id}`)}
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDuplicate(campaign)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteClick(campaign)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
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

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <BarChart3 className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No se encontraron campañas</p>
              <p className="text-gray-400 text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCampaignToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Campaña"
        message={`¿Estás seguro de que quieres eliminar permanentemente la campaña "${campaignToDelete?.subject}"? Esta acción no se puede deshacer.`}
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

export default HistorialCompletoPage;
