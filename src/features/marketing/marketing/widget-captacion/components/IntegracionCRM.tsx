import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw, Check, X, Settings, Database, Link2,
  Users, ArrowUpRight, Clock, CheckCircle, XCircle,
  Download, Upload, Activity, Zap, Cloud
} from 'lucide-react';

// Datos mockeados de CRMs disponibles
const mockCRMIntegrations = [
  {
    id: 'crm-1',
    name: 'Salesforce',
    logo: '☁️',
    status: 'Conectado' as const,
    lastSync: '2025-09-26 14:30',
    leadsSynced: 1245,
    color: 'from-blue-500 to-cyan-500',
    description: 'CRM líder para empresas',
    autoSync: true
  },
  {
    id: 'crm-2',
    name: 'HubSpot',
    logo: '🧲',
    status: 'Conectado' as const,
    lastSync: '2025-09-26 12:15',
    leadsSynced: 892,
    color: 'from-orange-500 to-red-500',
    description: 'Marketing y ventas todo en uno',
    autoSync: true
  },
  {
    id: 'crm-3',
    name: 'Pipedrive',
    logo: '📊',
    status: 'Desconectado' as const,
    lastSync: 'N/A',
    leadsSynced: 0,
    color: 'from-green-500 to-emerald-500',
    description: 'CRM visual para equipos de ventas',
    autoSync: false
  },
  {
    id: 'crm-4',
    name: 'Zoho CRM',
    logo: '⚡',
    status: 'Conectado' as const,
    lastSync: '2025-09-26 10:00',
    leadsSynced: 567,
    color: 'from-purple-500 to-pink-500',
    description: 'Suite completa de productividad',
    autoSync: false
  },
  {
    id: 'crm-5',
    name: 'Microsoft Dynamics',
    logo: '💼',
    status: 'Desconectado' as const,
    lastSync: 'N/A',
    leadsSynced: 0,
    color: 'from-indigo-500 to-blue-500',
    description: 'Integración con Microsoft 365',
    autoSync: false
  }
];

// Leads pendientes de sincronizar
const mockPendingLeads = [
  {
    id: 'lead-1',
    widgetId: 'widget-1',
    widgetName: 'Reserva de Consultoría',
    nombre: 'Ana García',
    email: 'ana@ejemplo.com',
    telefono: '612345678',
    origen: '/servicios',
    timestamp: '2025-09-26 15:30',
    status: 'pending' as const
  },
  {
    id: 'lead-2',
    widgetId: 'widget-2',
    widgetName: 'Newsletter',
    nombre: 'Carlos López',
    email: 'carlos@ejemplo.com',
    telefono: '623456789',
    origen: '/blog',
    timestamp: '2025-09-26 14:45',
    status: 'pending' as const
  },
  {
    id: 'lead-3',
    widgetId: 'widget-1',
    widgetName: 'Reserva de Consultoría',
    nombre: 'María Fernández',
    email: 'maria@ejemplo.com',
    telefono: '634567890',
    origen: '/contacto',
    timestamp: '2025-09-26 13:20',
    status: 'synced' as const
  },
  {
    id: 'lead-4',
    widgetId: 'widget-3',
    widgetName: 'Descarga Ebook',
    nombre: 'Pedro Martínez',
    email: 'pedro@ejemplo.com',
    telefono: '645678901',
    origen: '/recursos',
    timestamp: '2025-09-26 11:10',
    status: 'pending' as const
  }
];

const IntegracionCRM: React.FC = () => {
  const [integrations, setIntegrations] = useState(mockCRMIntegrations);
  const [leads, setLeads] = useState(mockPendingLeads);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleToggleConnection = (id: string) => {
    setIntegrations(prev =>
      prev.map(crm =>
        crm.id === id
          ? {
              ...crm,
              status: crm.status === 'Conectado' ? 'Desconectado' : 'Conectado',
              lastSync: crm.status === 'Desconectado' ? new Date().toLocaleString('es-ES') : 'N/A'
            }
          : crm
      )
    );
  };

  const handleSyncLeads = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setIntegrations(prev =>
        prev.map(crm =>
          crm.id === id
            ? {
                ...crm,
                leadsSynced: crm.leadsSynced + leads.filter(l => l.status === 'pending').length,
                lastSync: new Date().toLocaleString('es-ES')
              }
            : crm
        )
      );
      setLeads(prev => prev.map(lead => ({ ...lead, status: 'synced' as const })));
      setSyncingId(null);
    }, 2000);
  };

  const handleToggleAutoSync = (id: string) => {
    setIntegrations(prev =>
      prev.map(crm =>
        crm.id === id ? { ...crm, autoSync: !crm.autoSync } : crm
      )
    );
  };

  const connectedCount = integrations.filter(crm => crm.status === 'Conectado').length;
  const totalLeadsSynced = integrations.reduce((sum, crm) => sum + crm.leadsSynced, 0);
  const pendingLeadsCount = leads.filter(l => l.status === 'pending').length;

  return (
    <div className="space-y-8">
      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'CRMs Conectados', value: `${connectedCount}/5`, icon: Link2, color: 'from-blue-500 to-cyan-500' },
          { label: 'Leads Sincronizados', value: totalLeadsSynced.toLocaleString(), icon: Users, color: 'from-emerald-500 to-teal-500' },
          { label: 'Pendientes de Sync', value: pendingLeadsCount, icon: Clock, color: 'from-orange-500 to-red-500' },
          { label: 'Sincronización Auto', value: integrations.filter(c => c.autoSync).length, icon: Zap, color: 'from-violet-500 to-purple-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.label}
                </p>

                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Grid de CRMs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Integraciones Disponibles</h2>
              <p className="text-gray-600">Conecta tus CRMs favoritos</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((crm, index) => (
            <motion.div
              key={crm.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group"
            >
              {/* Header con gradiente */}
              <div className={`bg-gradient-to-r ${crm.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-5xl">{crm.logo}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    crm.status === 'Conectado'
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'bg-black/20 text-white backdrop-blur-sm'
                  }`}>
                    {crm.status === 'Conectado' ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Conectado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Desconectado
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{crm.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{crm.description}</p>

                {crm.status === 'Conectado' && (
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Leads sincronizados
                      </span>
                      <span className="font-bold text-gray-900">{crm.leadsSynced.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Última sincronización
                      </span>
                      <span className="font-medium text-gray-700 text-xs">{crm.lastSync}</span>
                    </div>

                    {/* Toggle de auto-sync */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Auto-sincronización
                      </span>
                      <button
                        onClick={() => handleToggleAutoSync(crm.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          crm.autoSync ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            crm.autoSync ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex gap-2">
                  {crm.status === 'Conectado' ? (
                    <>
                      <button
                        onClick={() => handleSyncLeads(crm.id)}
                        disabled={syncingId === crm.id || pendingLeadsCount === 0}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {syncingId === crm.id ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Sincronizando...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Sincronizar
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleConnection(crm.id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-red-600 border border-red-200 rounded-xl text-sm font-semibold hover:from-red-100 hover:to-orange-100 transition-all duration-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleToggleConnection(crm.id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Link2 className="w-4 h-4" />
                      Conectar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabla de Leads Pendientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Leads Recientes</h2>
              <p className="text-gray-600">{pendingLeadsCount} pendientes de sincronizar</p>
            </div>
          </div>

          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>

        {/* Tabla responsive */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Lead</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Contacto</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Widget</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Origen</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      lead.status === 'synced'
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}>
                      {lead.status === 'synced' ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Sincronizado
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          Pendiente
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-bold text-gray-900">{lead.nombre}</p>
                      <p className="text-sm text-gray-600">{lead.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="text-gray-900">{lead.email}</p>
                      <p className="text-gray-600">{lead.telefono}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold border border-cyan-200">
                      {lead.widgetName}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono">
                      {lead.origen}
                    </code>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{lead.timestamp}</p>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default IntegracionCRM;
