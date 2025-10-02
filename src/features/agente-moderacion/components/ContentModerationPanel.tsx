import React, { useState } from 'react';
import {
  Shield,
  Eye,
  EyeOff,
  Trash2,
  AlertCircle,
  CheckCircle,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  TrendingUp,
  Filter
} from 'lucide-react';
import { ContentModeration } from '../types';

export const ContentModerationPanel: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'flagged' | 'approved' | 'removed'>('all');
  const [filterType, setFilterType] = useState<'all' | 'post' | 'comment' | 'message'>('all');

  // Datos de ejemplo
  const content: ContentModeration[] = [
    {
      id: 'C001',
      contentType: 'post',
      contentId: 'POST_789',
      content: '¡Compra ahora! Descuento del 90% en productos premium. Haz clic aquí: bit.ly/spam123',
      author: 'spammer_account',
      status: 'flagged',
      aiScore: 0.95,
      flags: ['spam', 'enlaces_sospechosos', 'lenguaje_comercial'],
      createdAt: '2025-10-02T09:15:00Z',
    },
    {
      id: 'C002',
      contentType: 'comment',
      contentId: 'CMT_456',
      content: 'Eres un completo idiota, nadie te quiere aquí.',
      author: 'toxic_user',
      status: 'removed',
      aiScore: 0.98,
      flags: ['lenguaje_ofensivo', 'acoso', 'toxicidad_alta'],
      createdAt: '2025-10-02T08:30:00Z',
      moderatedAt: '2025-10-02T09:00:00Z',
      moderatedBy: 'mod_admin',
    },
    {
      id: 'C003',
      contentType: 'post',
      contentId: 'POST_123',
      content: 'Me encanta esta comunidad, todos son muy amables y siempre aprendo algo nuevo.',
      author: 'nice_user',
      status: 'approved',
      aiScore: 0.05,
      flags: [],
      createdAt: '2025-10-02T07:00:00Z',
      moderatedAt: '2025-10-02T07:05:00Z',
      moderatedBy: 'auto_moderator',
    },
    {
      id: 'C004',
      contentType: 'comment',
      contentId: 'CMT_789',
      content: 'Este grupo de personas no merece estar aquí. Deberían prohibirlos a todos.',
      author: 'hate_account',
      status: 'flagged',
      aiScore: 0.92,
      flags: ['discurso_odio', 'discriminacion', 'contenido_ofensivo'],
      createdAt: '2025-10-02T06:20:00Z',
    },
    {
      id: 'C005',
      contentType: 'message',
      contentId: 'MSG_321',
      content: '[Contenido explícito censurado]',
      author: 'inappropriate_user',
      status: 'removed',
      aiScore: 0.99,
      flags: ['contenido_explicito', 'nsfw_no_marcado', 'inapropiado'],
      createdAt: '2025-10-02T05:45:00Z',
      moderatedAt: '2025-10-02T06:00:00Z',
      moderatedBy: 'mod_team',
    },
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'post': return <FileText className="w-5 h-5" />;
      case 'comment': return <MessageSquare className="w-5 h-5" />;
      case 'message': return <MessageSquare className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-200';
      case 'removed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-red-600 bg-red-50';
    if (score >= 0.7) return 'text-orange-600 bg-orange-50';
    if (score >= 0.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const filteredContent = content.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.contentType === filterType;
    return matchesStatus && matchesType;
  });

  const stats = {
    totalContent: content.length,
    flagged: content.filter(c => c.status === 'flagged').length,
    removed: content.filter(c => c.status === 'removed').length,
    avgAiScore: (content.reduce((sum, c) => sum + (c.aiScore || 0), 0) / content.length).toFixed(2),
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contenido</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalContent}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Marcados</p>
              <p className="text-2xl font-bold text-red-600">{stats.flagged}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Eliminados</p>
              <p className="text-2xl font-bold text-gray-600">{stats.removed}</p>
            </div>
            <Trash2 className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Score IA Promedio</p>
              <p className="text-2xl font-bold text-orange-600">{stats.avgAiScore}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700">Estado:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">Todos</option>
              <option value="flagged">Marcados</option>
              <option value="approved">Aprobados</option>
              <option value="removed">Eliminados</option>
            </select>
          </div>
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700">Tipo:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">Todos</option>
              <option value="post">Posts</option>
              <option value="comment">Comentarios</option>
              <option value="message">Mensajes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de contenido */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getContentIcon(item.contentType)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{item.author}</span>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.contentType} • {item.contentId} • {new Date(item.createdAt).toLocaleString('es-ES')}
                  </p>
                </div>
              </div>

              {item.aiScore !== undefined && (
                <div className={`px-3 py-1 rounded-lg font-bold ${getAIScoreColor(item.aiScore)}`}>
                  AI: {(item.aiScore * 100).toFixed(0)}%
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-3">
              <p className="text-gray-800">{item.content}</p>
            </div>

            {item.flags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {item.flags.map((flag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium"
                  >
                    {flag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            )}

            {item.moderatedBy && (
              <div className="text-xs text-gray-600 border-t pt-2">
                Moderado por <span className="font-medium">{item.moderatedBy}</span>
                {item.moderatedAt && ` el ${new Date(item.moderatedAt).toLocaleString('es-ES')}`}
              </div>
            )}

            {/* Acciones */}
            {item.status === 'flagged' && (
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  Aprobar
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Eye className="w-4 h-4" />
                  Revisar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No se encontró contenido</p>
        </div>
      )}
    </div>
  );
};
