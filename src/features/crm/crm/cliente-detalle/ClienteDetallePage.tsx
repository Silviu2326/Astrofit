import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, User as InfoIcon, BarChart3, Dumbbell, Apple, Calendar, DollarSign, Brain, Workflow, Bell, TrendingUp, FileText, FolderOpen, StickyNote, CheckSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ClienteHeader from './components/ClienteHeader';
import ClienteInfo from './components/ClienteInfo';
import ClienteProgreso from './components/ClienteProgreso';
import ClienteEntrenamientos from './components/ClienteEntrenamientos';
import ClienteNutricion from './components/ClienteNutricion';
import ClienteAgenda from './components/ClienteAgenda';
import ClienteFacturacion from './components/ClienteFacturacion';
import ClienteAnalisisPredictivo from './components/ClienteAnalisisPredictivo';
import ClienteWorkflows from './components/ClienteWorkflows';
import ClienteNotificaciones from './components/ClienteNotificaciones';
import ClienteAnalytics from './components/ClienteAnalytics';
import ClienteReportes from './components/ClienteReportes';
import ClienteHistorial from './components/ClienteHistorial';
import ClienteArchivos from './components/ClienteArchivos';
import ClienteNotas from './components/ClienteNotas';
import ClienteTareas from './components/ClienteTareas';
import { useClienteDetalle } from './clienteDetalleApi';

const ClienteDetallePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clienteId = location.state?.clienteId;

  const [activeTab, setActiveTab] = useState<'info' | 'progreso' | 'entrenamientos' | 'nutricion' | 'agenda' | 'facturacion' | 'analisis' | 'workflows' | 'notificaciones' | 'analytics' | 'reportes' | 'historial' | 'archivos' | 'notas' | 'tareas'>('info');
  const { data: cliente, isLoading, error } = useClienteDetalle(clienteId);

  const handleBack = () => {
    navigate('/dashboard/clientes-listado');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Cargando detalles del cliente...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 max-w-md border border-white/50">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error al cargar el cliente</h3>
            <p className="text-gray-600">{error.message}</p>
            <button
              onClick={handleBack}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Volver a clientes
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!cliente || !clienteId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 max-w-md border border-white/50">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cliente no encontrado</h3>
            <p className="text-gray-600">No se pudo encontrar la información del cliente.</p>
            <button
              onClick={handleBack}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Volver a clientes
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'info', label: 'Información', icon: InfoIcon },
    { id: 'progreso', label: 'Progreso', icon: BarChart3 },
    { id: 'entrenamientos', label: 'Entrenamientos', icon: Dumbbell },
    { id: 'nutricion', label: 'Nutrición', icon: Apple },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'facturacion', label: 'Facturación', icon: DollarSign },
    { id: 'analisis', label: 'Análisis Predictivo', icon: Brain },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'reportes', label: 'Reportes', icon: FileText },
    { id: 'historial', label: 'Historial', icon: FileText },
    { id: 'archivos', label: 'Archivos', icon: FolderOpen },
    { id: 'notas', label: 'Notas', icon: StickyNote },
    { id: 'tareas', label: 'Tareas', icon: CheckSquare },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Estilos para el scroll horizontal de las pestañas */
        .tabs-container {
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        
        .tabs-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .tabs-container::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .tabs-container::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 3px;
        }
        
        .tabs-container::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
        
        .tabs-nav {
          display: flex;
          min-width: max-content;
          width: max-content;
        }
      `}</style>
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={handleBack}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors duration-300 border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a clientes
          </motion.button>

          <ClienteHeader cliente={cliente} />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl mb-6 border border-white/50 overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <div className="relative overflow-hidden">
              {/* Contenedor con scroll horizontal */}
              <div className="tabs-container">
                <nav 
                  className="tabs-nav space-x-1 px-6 py-0" 
                  aria-label="Tabs"
                >
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative whitespace-nowrap py-4 px-4 font-semibold text-sm transition-colors duration-300 flex items-center gap-2 flex-shrink-0 ${
                        activeTab === tab.id
                          ? 'text-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      style={{ minWidth: 'fit-content' }}
                    >
                      <tab.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>
              </div>
              
              {/* Indicadores de scroll */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
            </div>
          </div>

          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'info' && <ClienteInfo cliente={cliente} />}
              {activeTab === 'progreso' && <ClienteProgreso clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'entrenamientos' && <ClienteEntrenamientos clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'nutricion' && <ClienteNutricion clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'agenda' && <ClienteAgenda clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'facturacion' && <ClienteFacturacion clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'analisis' && <ClienteAnalisisPredictivo clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'workflows' && <ClienteWorkflows clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'notificaciones' && <ClienteNotificaciones clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'analytics' && <ClienteAnalytics clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'reportes' && <ClienteReportes clienteId={cliente.id} clienteNombre={cliente.nombre} />}
              {activeTab === 'historial' && <ClienteHistorial historial={cliente.historial} />}
              {activeTab === 'archivos' && <ClienteArchivos archivos={cliente.archivos} />}
              {activeTab === 'notas' && <ClienteNotas notas={cliente.notas} />}
              {activeTab === 'tareas' && <ClienteTareas tareas={cliente.tareas} />}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClienteDetallePage;
