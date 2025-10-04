import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Copy, Archive, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchCampaigns, duplicateCampaign, archiveCampaign } from '../listadoEmailsApi';
import ConfirmationModal from '../../../../../../components/ui/confirmation-modal';

interface Campaign {
  id: string;
  subject: string;
  date: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled';
  performance: 'good' | 'average' | 'bad';
}

const TablaCampanas: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [campaignToArchive, setCampaignToArchive] = useState<Campaign | null>(null);
  const [isArchiving, setIsArchiving] = useState<boolean>(false);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError('Error al cargar las campañas.');
        toast.error('Error al cargar las campañas');
      } finally {
        setLoading(false);
      }
    };
    getCampaigns();
  }, []);

  // Handlers for actions
  const handleDuplicate = async (campaign: Campaign) => {
    try {
      await duplicateCampaign(campaign.id);
      toast.success(`Campaña "${campaign.subject}" duplicada exitosamente`);
      // Refresh campaigns list
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (error) {
      toast.error('Error al duplicar la campaña');
    }
  };

  const handleArchiveClick = (campaign: Campaign) => {
    setCampaignToArchive(campaign);
    setShowArchiveModal(true);
  };

  const handleArchiveConfirm = async () => {
    if (!campaignToArchive) return;
    
    setIsArchiving(true);
    try {
      await archiveCampaign(campaignToArchive.id);
      toast.success(`Campaña "${campaignToArchive.subject}" archivada exitosamente`);
      // Remove from list
      setCampaigns(prev => prev.filter(c => c.id !== campaignToArchive.id));
      setShowArchiveModal(false);
      setCampaignToArchive(null);
    } catch (error) {
      toast.error('Error al archivar la campaña');
    } finally {
      setIsArchiving(false);
    }
  };

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || campaign.status === statusFilter;
    const matchesDate = !dateFilter || campaign.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-lg font-medium text-gray-600">Cargando campañas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Error al cargar las campañas</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const getPerformanceTag = (performance: 'good' | 'average' | 'bad') => {
    switch (performance) {
      case 'good':
        return <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Bueno</span>;
      case 'average':
        return <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Medio</span>;
      case 'bad':
        return <span className="bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Malo</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Gestión de Campañas
              </h2>
              <p className="text-gray-600 mt-1">Administra y supervisa todas tus campañas de email</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {filteredCampaigns.length} de {campaigns.length} campañas
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
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
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm appearance-none min-w-[180px]"
              >
                <option value="">Todos los estados</option>
                <option value="sent">Enviado</option>
                <option value="draft">Borrador</option>
                <option value="scheduled">Programado</option>
              </select>
            </div>

            {/* Date Filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Asunto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Destinatarios
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tasa Apertura
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tasa Clics
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
                    <div className="font-medium text-gray-900">{campaign.subject}</div>
                    <div className="text-sm text-gray-500 capitalize">{campaign.status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(campaign.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.recipients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-semibold">{(campaign.openRate * 100).toFixed(1)}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-semibold">{(campaign.clickRate * 100).toFixed(1)}%</span>
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
                        className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span className="hidden sm:inline">Ver</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDuplicate(campaign)}
                        className="flex items-center gap-1 px-3 py-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Duplicar campaña"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Duplicar</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleArchiveClick(campaign)}
                        className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Archivar campaña"
                      >
                        <Archive className="w-4 h-4" />
                        <span className="hidden sm:inline">Archivar</span>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No se encontraron campañas</p>
              <p className="text-gray-400 text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Archive Confirmation Modal */}
      <ConfirmationModal
        isOpen={showArchiveModal}
        onClose={() => {
          setShowArchiveModal(false);
          setCampaignToArchive(null);
        }}
        onConfirm={handleArchiveConfirm}
        title="Archivar Campaña"
        message={`¿Estás seguro de que quieres archivar la campaña "${campaignToArchive?.subject}"? Esta acción no se puede deshacer.`}
        confirmText="Archivar"
        cancelText="Cancelar"
        type="warning"
        isLoading={isArchiving}
      />
    </>
  );
};

export default TablaCampanas;
