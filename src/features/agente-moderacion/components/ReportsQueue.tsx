import React, { useState } from 'react';
import {
  AlertTriangle,
  Flag,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { Report } from '../types';

interface ReportsQueueProps {
  onSelectReport: (report: Report) => void;
}

export const ReportsQueue: React.FC<ReportsQueueProps> = ({ onSelectReport }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewing' | 'resolved'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const reports: Report[] = [
    {
      id: 'R001',
      reportedBy: 'user123',
      reportedUser: 'spammer_account',
      contentType: 'post',
      contentId: 'POST_789',
      reason: 'Spam comercial repetitivo',
      category: 'spam',
      description: 'Este usuario ha publicado el mismo enlace comercial 15 veces en diferentes hilos',
      status: 'pending',
      priority: 'high',
      createdAt: '2025-10-02T09:15:00Z',
    },
    {
      id: 'R002',
      reportedBy: 'moderator_team',
      reportedUser: 'toxic_user',
      contentType: 'comment',
      contentId: 'CMT_456',
      reason: 'Lenguaje ofensivo y acoso',
      category: 'harassment',
      description: 'Comentarios dirigidos a atacar a otro usuario con insultos',
      status: 'reviewing',
      priority: 'critical',
      createdAt: '2025-10-02T08:30:00Z',
    },
    {
      id: 'R003',
      reportedBy: 'user456',
      reportedUser: 'fake_profile',
      contentType: 'profile',
      contentId: 'USER_321',
      reason: 'Perfil falso suplantando identidad',
      category: 'other',
      description: 'Este perfil está usando fotos de otra persona para hacerse pasar por ella',
      status: 'pending',
      priority: 'medium',
      createdAt: '2025-10-02T07:45:00Z',
    },
    {
      id: 'R004',
      reportedBy: 'user789',
      reportedUser: 'hate_account',
      contentType: 'post',
      contentId: 'POST_654',
      reason: 'Discurso de odio',
      category: 'hate_speech',
      description: 'Publicación con contenido discriminatorio hacia un grupo específico',
      status: 'pending',
      priority: 'critical',
      createdAt: '2025-10-02T06:20:00Z',
    },
    {
      id: 'R005',
      reportedBy: 'user101',
      reportedUser: 'resolved_user',
      contentType: 'comment',
      contentId: 'CMT_111',
      reason: 'Contenido inapropiado',
      category: 'explicit_content',
      description: 'Comentario con contenido explícito no marcado como NSFW',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2025-10-01T15:30:00Z',
      resolvedAt: '2025-10-01T16:45:00Z',
      resolvedBy: 'mod_admin',
      action: 'Contenido eliminado, usuario advertido',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'reviewing': return <Eye className="w-4 h-4 text-blue-600" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'dismissed': return <XCircle className="w-4 h-4 text-gray-600" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'spam': return 'bg-purple-100 text-purple-800';
      case 'harassment': return 'bg-red-100 text-red-800';
      case 'hate_speech': return 'bg-pink-100 text-pink-800';
      case 'violence': return 'bg-red-100 text-red-800';
      case 'explicit_content': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Filtros y búsqueda */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar reportes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('reviewing')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'reviewing'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            En revisión
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'resolved'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Resueltos
          </button>
        </div>
      </div>

      {/* Lista de reportes */}
      <div className="space-y-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => onSelectReport(report)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(report.status)}
                  <span className="font-semibold text-gray-900">
                    {report.reportedUser}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                    {report.category.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(report.priority)}`}>
                    {report.priority.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-900 font-medium mb-1">{report.reason}</p>
                <p className="text-gray-600 text-sm mb-2">{report.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Tipo: {report.contentType}</span>
                  <span>•</span>
                  <span>ID: {report.contentId}</span>
                  <span>•</span>
                  <span>Reportado por: {report.reportedBy}</span>
                  <span>•</span>
                  <span>{new Date(report.createdAt).toLocaleString('es-ES')}</span>
                </div>

                {report.status === 'resolved' && report.action && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
                    <span className="font-medium text-green-800">Acción: </span>
                    <span className="text-green-700">{report.action}</span>
                  </div>
                )}
              </div>

              <AlertTriangle className={`w-6 h-6 ${
                report.priority === 'critical' ? 'text-red-600' :
                report.priority === 'high' ? 'text-orange-600' :
                report.priority === 'medium' ? 'text-yellow-600' :
                'text-blue-600'
              }`} />
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Flag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No se encontraron reportes</p>
        </div>
      )}
    </div>
  );
};
