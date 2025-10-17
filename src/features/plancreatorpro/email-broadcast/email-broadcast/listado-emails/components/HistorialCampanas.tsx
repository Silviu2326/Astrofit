import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, TrendingUp, Users, Mail, Eye, MousePointer, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentCampaign {
  id: string;
  subject: string;
  date: string;
  time: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled';
}

const HistorialCampanas: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');

  // Mock data for recent campaigns
  const recentCampaigns: RecentCampaign[] = [
    {
      id: '1',
      subject: 'Newsletter Semanal - Ofertas Especiales',
      date: '2024-01-15',
      time: '10:30',
      recipients: 2500,
      openRate: 0.28,
      clickRate: 0.06,
      status: 'sent'
    },
    {
      id: '2',
      subject: 'Recordatorio: Webinar Gratuito',
      date: '2024-01-14',
      time: '14:15',
      recipients: 1800,
      openRate: 0.22,
      clickRate: 0.08,
      status: 'sent'
    },
    {
      id: '3',
      subject: 'Nuevos Productos en Stock',
      date: '2024-01-13',
      time: '09:45',
      recipients: 3200,
      openRate: 0.31,
      clickRate: 0.12,
      status: 'sent'
    },
    {
      id: '4',
      subject: 'Encuesta de Satisfacción',
      date: '2024-01-12',
      time: '16:20',
      recipients: 1500,
      openRate: 0.19,
      clickRate: 0.04,
      status: 'sent'
    }
  ];

  const handleViewDetails = (campaign: RecentCampaign) => {
    navigate(`/email-broadcast/campaign-detail/${campaign.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
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
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Historial de Campañas
              </h2>
              <p className="text-gray-600 text-sm">Actividad reciente y rendimiento</p>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2 bg-gray-100/50 rounded-xl p-1">
            {(['week', 'month', 'quarter'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Trimestre'}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Enviados</p>
              <p className="text-xl font-bold text-gray-900">{recentCampaigns.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Apertura Promedio</p>
              <p className="text-xl font-bold text-gray-900">
                {((recentCampaigns.reduce((acc, c) => acc + c.openRate, 0) / recentCampaigns.length) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white">
              <MousePointer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clics Promedio</p>
              <p className="text-xl font-bold text-gray-900">
                {((recentCampaigns.reduce((acc, c) => acc + c.clickRate, 0) / recentCampaigns.length) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="p-6">
        <div className="space-y-4">
          {recentCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200/50 hover:bg-white/80 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Date/Time */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(campaign.date).toLocaleDateString('es-ES')}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{campaign.time}</span>
                </div>

                {/* Campaign Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                    {campaign.subject}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{campaign.recipients.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{(campaign.openRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MousePointer className="w-4 h-4" />
                      <span>{(campaign.clickRate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                  {getStatusText(campaign.status)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleViewDetails(campaign)}
                  className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Ver detalles"
                >
                  <TrendingUp className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            onClick={() => navigate('/email-broadcast/historial-completo')}
          >
            Ver Todas las Campañas
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HistorialCampanas;
