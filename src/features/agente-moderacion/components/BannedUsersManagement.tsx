import React, { useState } from 'react';
import {
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  AlertTriangle,
  Calendar,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { BannedUser } from '../types';

export const BannedUsersManagement: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'ban' | 'suspension'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'revoked'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const bannedUsers: BannedUser[] = [
    {
      id: 'BU001',
      userId: 'USER_789',
      username: 'spammer_account',
      email: 'spammer@example.com',
      reason: 'Spam comercial repetitivo y violación de términos de servicio',
      type: 'ban',
      startDate: '2025-10-02T09:00:00Z',
      bannedBy: 'mod_admin',
      status: 'active',
      appealStatus: 'none',
    },
    {
      id: 'BU002',
      userId: 'USER_456',
      username: 'toxic_user',
      email: 'toxic@example.com',
      reason: 'Acoso continuado a otros usuarios',
      type: 'suspension',
      duration: 7,
      startDate: '2025-10-02T08:30:00Z',
      endDate: '2025-10-09T08:30:00Z',
      bannedBy: 'mod_admin',
      status: 'active',
      appealStatus: 'pending',
    },
    {
      id: 'BU003',
      userId: 'USER_321',
      username: 'fake_profile',
      email: 'fake@example.com',
      reason: 'Suplantación de identidad',
      type: 'ban',
      startDate: '2025-10-01T15:00:00Z',
      bannedBy: 'mod_team',
      status: 'active',
      appealStatus: 'rejected',
    },
    {
      id: 'BU004',
      userId: 'USER_654',
      username: 'hate_account',
      email: 'hate@example.com',
      reason: 'Discurso de odio y discriminación',
      type: 'ban',
      startDate: '2025-09-30T12:00:00Z',
      bannedBy: 'mod_admin',
      status: 'active',
      appealStatus: 'none',
    },
    {
      id: 'BU005',
      userId: 'USER_111',
      username: 'reformed_user',
      email: 'reformed@example.com',
      reason: 'Comportamiento inapropiado (suspensión expirada)',
      type: 'suspension',
      duration: 3,
      startDate: '2025-09-25T10:00:00Z',
      endDate: '2025-09-28T10:00:00Z',
      bannedBy: 'mod_team',
      status: 'expired',
      appealStatus: 'approved',
    },
    {
      id: 'BU006',
      userId: 'USER_222',
      username: 'revoked_ban',
      email: 'revoked@example.com',
      reason: 'Ban erróneo (revocado tras apelación)',
      type: 'ban',
      startDate: '2025-09-28T14:00:00Z',
      bannedBy: 'mod_junior',
      status: 'revoked',
      appealStatus: 'approved',
    },
  ];

  const getTypeColor = (type: string) => {
    return type === 'ban'
      ? 'bg-red-100 text-red-800 border-red-200'
      : 'bg-orange-100 text-orange-800 border-orange-200';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600';
      case 'expired': return 'text-gray-600';
      case 'revoked': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getAppealBadge = (status?: string) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Apelación Pendiente</span>;
      case 'approved': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Apelación Aprobada</span>;
      case 'rejected': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">Apelación Rechazada</span>;
      default: return null;
    }
  };

  const filteredUsers = bannedUsers.filter(user => {
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    totalBanned: bannedUsers.length,
    activeBans: bannedUsers.filter(u => u.type === 'ban' && u.status === 'active').length,
    activeSuspensions: bannedUsers.filter(u => u.type === 'suspension' && u.status === 'active').length,
    pendingAppeals: bannedUsers.filter(u => u.appealStatus === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sancionados</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBanned}</p>
            </div>
            <UserX className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bans Activos</p>
              <p className="text-2xl font-bold text-red-600">{stats.activeBans}</p>
            </div>
            <Shield className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspensiones Activas</p>
              <p className="text-2xl font-bold text-orange-600">{stats.activeSuspensions}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Apelaciones Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingAppeals}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Todos los tipos</option>
              <option value="ban">Bans</option>
              <option value="suspension">Suspensiones</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="expired">Expirados</option>
              <option value="revoked">Revocados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de usuarios baneados */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <UserX className={`w-6 h-6 ${getStatusColor(user.status)}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{user.username}</span>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getTypeColor(user.type)}`}>
                      {user.type === 'ban' ? 'BAN PERMANENTE' : 'SUSPENSIÓN'}
                    </span>
                    {getAppealBadge(user.appealStatus)}
                  </div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">ID: {user.userId}</p>
                </div>
              </div>

              <span className={`text-sm font-medium ${getStatusColor(user.status)}`}>
                {user.status === 'active' ? 'ACTIVO' :
                 user.status === 'expired' ? 'EXPIRADO' : 'REVOCADO'}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-3">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Razón:</p>
                  <p className="text-sm text-gray-700">{user.reason}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Sancionado por:</p>
                <p className="font-medium text-gray-900">{user.bannedBy}</p>
              </div>
              <div>
                <p className="text-gray-600">Fecha inicio:</p>
                <p className="font-medium text-gray-900">
                  {new Date(user.startDate).toLocaleDateString('es-ES')}
                </p>
              </div>
              {user.type === 'suspension' && user.duration && (
                <>
                  <div>
                    <p className="text-gray-600">Duración:</p>
                    <p className="font-medium text-gray-900">{user.duration} días</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fecha fin:</p>
                    <p className="font-medium text-gray-900">
                      {user.endDate ? new Date(user.endDate).toLocaleDateString('es-ES') : '-'}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Acciones */}
            {user.status === 'active' && (
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  Revocar {user.type === 'ban' ? 'Ban' : 'Suspensión'}
                </button>
                {user.type === 'suspension' && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Shield className="w-4 h-4" />
                    Convertir a Ban Permanente
                  </button>
                )}
                {user.appealStatus === 'pending' && (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Aprobar Apelación
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      <XCircle className="w-4 h-4" />
                      Rechazar Apelación
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <UserX className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No se encontraron usuarios sancionados</p>
        </div>
      )}
    </div>
  );
};
