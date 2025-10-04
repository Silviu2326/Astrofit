import React, { useState } from 'react';
import { Mail, Eye, MousePointer, TrendingUp, Clock, Send, FileText, Calendar, ChevronDown, Search, Filter } from 'lucide-react';

interface EmailCampaign {
  id: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent';
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
  metrics: {
    sent: number;
    opens: number;
    clicks: number;
    conversions: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
}

const EmailList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'scheduled' | 'sent'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'opens' | 'clicks'>('date');

  // Datos de ejemplo
  const campaigns: EmailCampaign[] = [
    {
      id: '1',
      subject: 'Lanzamiento de Producto - Primavera 2025',
      status: 'sent',
      createdAt: '2025-09-28',
      sentAt: '2025-09-30',
      metrics: {
        sent: 5420,
        opens: 2845,
        clicks: 1230,
        conversions: 245,
        openRate: 52.5,
        clickRate: 22.7,
        conversionRate: 4.5
      }
    },
    {
      id: '2',
      subject: 'Newsletter Semanal - Octubre',
      status: 'scheduled',
      createdAt: '2025-10-01',
      scheduledAt: '2025-10-05 10:00',
      metrics: {
        sent: 0,
        opens: 0,
        clicks: 0,
        conversions: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0
      }
    },
    {
      id: '3',
      subject: 'Promoción Flash - 50% Descuento',
      status: 'sent',
      createdAt: '2025-09-25',
      sentAt: '2025-09-26',
      metrics: {
        sent: 8750,
        opens: 6125,
        clicks: 3580,
        conversions: 892,
        openRate: 70.0,
        clickRate: 40.9,
        conversionRate: 10.2
      }
    },
    {
      id: '4',
      subject: 'Encuesta de Satisfacción Q3',
      status: 'draft',
      createdAt: '2025-10-02',
      metrics: {
        sent: 0,
        opens: 0,
        clicks: 0,
        conversions: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0
      }
    },
    {
      id: '5',
      subject: 'Webinar: Estrategias de Marketing Digital',
      status: 'sent',
      createdAt: '2025-09-20',
      sentAt: '2025-09-22',
      metrics: {
        sent: 3200,
        opens: 1920,
        clicks: 960,
        conversions: 320,
        openRate: 60.0,
        clickRate: 30.0,
        conversionRate: 10.0
      }
    }
  ];

  const getStatusBadge = (status: EmailCampaign['status']) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border border-gray-300',
      scheduled: 'bg-blue-100 text-blue-700 border border-blue-300',
      sent: 'bg-green-100 text-green-700 border border-green-300'
    };

    const icons = {
      draft: <FileText className="w-3 h-3" />,
      scheduled: <Clock className="w-3 h-3" />,
      sent: <Send className="w-3 h-3" />
    };

    const labels = {
      draft: 'Borrador',
      scheduled: 'Programado',
      sent: 'Enviado'
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'opens') {
        return b.metrics.opens - a.metrics.opens;
      } else {
        return b.metrics.clicks - a.metrics.clicks;
      }
    });

  const totalMetrics = campaigns
    .filter(c => c.status === 'sent')
    .reduce((acc, campaign) => ({
      sent: acc.sent + campaign.metrics.sent,
      opens: acc.opens + campaign.metrics.opens,
      clicks: acc.clicks + campaign.metrics.clicks,
      conversions: acc.conversions + campaign.metrics.conversions
    }), { sent: 0, opens: 0, clicks: 0, conversions: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Campañas de Email</h1>
              <p className="text-orange-100">Gestiona y analiza tus campañas de email marketing</p>
            </div>
          </div>
        </div>

        {/* Métricas Globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Emails Enviados</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {totalMetrics.sent.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <Send className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Aperturas</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {totalMetrics.opens.toLocaleString()}
                </p>
                <p className="text-xs text-orange-200 mt-1">
                  {((totalMetrics.opens / totalMetrics.sent) * 100).toFixed(1)}% tasa
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Clicks</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {totalMetrics.clicks.toLocaleString()}
                </p>
                <p className="text-xs text-orange-200 mt-1">
                  {((totalMetrics.clicks / totalMetrics.sent) * 100).toFixed(1)}% tasa
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Conversiones</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {totalMetrics.conversions.toLocaleString()}
                </p>
                <p className="text-xs text-orange-200 mt-1">
                  {((totalMetrics.conversions / totalMetrics.sent) * 100).toFixed(1)}% tasa
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-200" />
              <input
                type="text"
                placeholder="Buscar campañas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-gray-800">Todos los estados</option>
                <option value="draft" className="bg-gray-800">Borradores</option>
                <option value="scheduled" className="bg-gray-800">Programados</option>
                <option value="sent" className="bg-gray-800">Enviados</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
              >
                <option value="date" className="bg-gray-800">Más recientes</option>
                <option value="opens" className="bg-gray-800">Más aperturas</option>
                <option value="clicks" className="bg-gray-800">Más clicks</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Campañas */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-orange-100 uppercase tracking-wider">
                    Campaña
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-orange-100 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-orange-100 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-orange-100 uppercase tracking-wider">
                    Enviados
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-orange-100 uppercase tracking-wider">
                    Aperturas
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-orange-100 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-orange-100 uppercase tracking-wider">
                    Conversiones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{campaign.subject}</p>
                          <p className="text-xs text-orange-200">ID: {campaign.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(campaign.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {campaign.status === 'sent' && campaign.sentAt && (
                          <div className="flex items-center gap-1">
                            <Send className="w-3 h-3" />
                            {new Date(campaign.sentAt).toLocaleDateString('es-ES')}
                          </div>
                        )}
                        {campaign.status === 'scheduled' && campaign.scheduledAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {campaign.scheduledAt}
                          </div>
                        )}
                        {campaign.status === 'draft' && (
                          <div className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {new Date(campaign.createdAt).toLocaleDateString('es-ES')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm font-semibold text-white">
                        {campaign.metrics.sent.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {campaign.metrics.opens.toLocaleString()}
                        </p>
                        {campaign.status === 'sent' && (
                          <p className="text-xs text-orange-200">
                            {campaign.metrics.openRate.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {campaign.metrics.clicks.toLocaleString()}
                        </p>
                        {campaign.status === 'sent' && (
                          <p className="text-xs text-orange-200">
                            {campaign.metrics.clickRate.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {campaign.metrics.conversions.toLocaleString()}
                        </p>
                        {campaign.status === 'sent' && (
                          <p className="text-xs text-orange-200">
                            {campaign.metrics.conversionRate.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-orange-200 mx-auto mb-4" />
              <p className="text-white font-medium">No se encontraron campañas</p>
              <p className="text-orange-200 text-sm mt-1">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between text-sm text-orange-100">
            <p>Mostrando {filteredCampaigns.length} de {campaigns.length} campañas</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>{campaigns.filter(c => c.status === 'sent').length} Enviadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>{campaigns.filter(c => c.status === 'scheduled').length} Programadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>{campaigns.filter(c => c.status === 'draft').length} Borradores</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
