import React, { useState } from 'react';
import {
  Shield,
  Flag,
  UserX,
  FileText,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity
} from 'lucide-react';
import { ReportsQueue } from './components/ReportsQueue';
import { ContentModerationPanel } from './components/ContentModerationPanel';
import { BannedUsersManagement } from './components/BannedUsersManagement';
import { Report } from './types';

type TabType = 'overview' | 'reports' | 'content' | 'users';

export const CommunityModerationAgent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Estadísticas generales
  const stats = {
    totalReports: 47,
    pendingReports: 12,
    resolvedToday: 8,
    activeBans: 5,
    activeSuspensions: 3,
    contentRemoved: 15,
    warningsIssued: 23,
    avgResponseTime: '2.3h',
  };

  const recentActivity = [
    { id: 1, action: 'Reporte resuelto', user: 'spammer_account', time: '5 min', type: 'success' },
    { id: 2, action: 'Usuario suspendido', user: 'toxic_user', time: '15 min', type: 'warning' },
    { id: 3, action: 'Contenido eliminado', user: 'inappropriate_user', time: '30 min', type: 'error' },
    { id: 4, action: 'Advertencia emitida', user: 'rule_breaker', time: '1 h', type: 'info' },
    { id: 5, action: 'Reporte revisado', user: 'fake_profile', time: '2 h', type: 'info' },
  ];

  const tabs = [
    { id: 'overview' as TabType, label: 'Resumen', icon: Activity },
    { id: 'reports' as TabType, label: 'Reportes', icon: Flag },
    { id: 'content' as TabType, label: 'Contenido', icon: FileText },
    { id: 'users' as TabType, label: 'Usuarios Sancionados', icon: UserX },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 rounded-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Moderación de Comunidad</h1>
              <p className="text-gray-600">Panel de control de moderación y gestión de reportes</p>
            </div>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-red-600 text-red-600 bg-red-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido de las pestañas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Resumen General</h2>

              {/* Estadísticas principales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Reportes</p>
                      <p className="text-3xl font-bold text-blue-900">{stats.totalReports}</p>
                    </div>
                    <Flag className="w-10 h-10 text-blue-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Pendientes</p>
                      <p className="text-3xl font-bold text-yellow-900">{stats.pendingReports}</p>
                    </div>
                    <Clock className="w-10 h-10 text-yellow-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Resueltos Hoy</p>
                      <p className="text-3xl font-bold text-green-900">{stats.resolvedToday}</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600 font-medium">Sanciones Activas</p>
                      <p className="text-3xl font-bold text-red-900">{stats.activeBans + stats.activeSuspensions}</p>
                    </div>
                    <UserX className="w-10 h-10 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Estadísticas detalladas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones de Moderación</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <UserX className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Bans Permanentes</p>
                          <p className="text-sm text-gray-600">Usuarios expulsados</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-red-600">{stats.activeBans}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Suspensiones</p>
                          <p className="text-sm text-gray-600">Temporales activas</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-orange-600">{stats.activeSuspensions}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Contenido Eliminado</p>
                          <p className="text-sm text-gray-600">Posts y comentarios</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">{stats.contentRemoved}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Advertencias</p>
                          <p className="text-sm text-gray-600">Avisos enviados</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">{stats.warningsIssued}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' :
                          activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Métricas de rendimiento */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-indigo-900">Métricas de Rendimiento</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-indigo-600">Tiempo Promedio de Respuesta</p>
                    <p className="text-2xl font-bold text-indigo-900">{stats.avgResponseTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600">Tasa de Resolución</p>
                    <p className="text-2xl font-bold text-indigo-900">87%</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600">Satisfacción</p>
                    <p className="text-2xl font-bold text-indigo-900">4.5/5</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cola de Reportes</h2>
              <ReportsQueue onSelectReport={setSelectedReport} />
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Moderación de Contenido</h2>
              <ContentModerationPanel />
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Usuarios Sancionados</h2>
              <BannedUsersManagement />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
