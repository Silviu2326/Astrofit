import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LeadHeader from './components/LeadHeader';
import LeadQualification from './components/LeadQualification';
import LeadTimeline from './components/LeadTimeline';
import LeadConversion from './components/LeadConversion';
import { Lead } from './leadDetalleApi';
import leadService from '../../../../services/leadService';

const LeadDetallePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extraer el leadId de la URL - formato: /lead-detalle/leadId
  const pathParts = location.pathname.split('/');
  const leadId = pathParts[pathParts.length - 1] !== 'lead-detalle' ? pathParts[pathParts.length - 1] : null;

  const [activeTab, setActiveTab] = useState<'info' | 'timeline' | 'conversion'>('info');
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!leadId) {
      setIsLoading(false);
      setError(new Error('No se proporcionó ID de lead'));
      return;
    }

    const fetchLead = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await leadService.getLead(leadId);

        if (!response.success || !response.data) {
          throw new Error('No se encontró el lead');
        }

        const backendLead = response.data;

        // Transform backend lead to match component interface
        const transformedLead: Lead = {
          id: backendLead.id || backendLead._id || '',
          name: backendLead.nombre,
          email: backendLead.email,
          phone: backendLead.telefono || '',
          status: mapEstadoToStatus(backendLead.estado),
          company: '', // Not in backend model yet
          objective: backendLead.interes || backendLead.notas || '',
          availability: '', // Not in backend model yet
          budget: backendLead.presupuesto ? `${backendLead.presupuesto} EUR/mes` : '',
          urgency: backendLead.prioridad === 'alta' ? 'Alta' : backendLead.prioridad === 'media' ? 'Media' : 'Baja',
          interactions: [
            {
              id: 'int-001',
              type: 'Nota',
              date: backendLead.fechaContacto ? new Date(backendLead.fechaContacto).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              notes: backendLead.notas || 'Sin notas'
            }
          ],
          nextActions: backendLead.proximoSeguimiento ? [
            {
              id: 'act-001',
              description: 'Seguimiento programado',
              date: new Date(backendLead.proximoSeguimiento).toISOString().split('T')[0]
            }
          ] : []
        };

        setLead(transformedLead);
      } catch (err: any) {
        console.error('Error al cargar lead:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);

  const mapEstadoToStatus = (estado: string): string => {
    const mapping: { [key: string]: string } = {
      'nuevo': 'Nuevo',
      'contactado': 'Contactado',
      'interesado': 'Calificado',
      'convertido': 'Ganado',
      'perdido': 'Perdido',
      'no-interesado': 'Perdido'
    };
    return mapping[estado] || 'Nuevo';
  };

  const handleBack = () => {
    navigate('/dashboard/leads-listado');
  };

  const handleConvertLead = () => {
    alert('Lead convertido a cliente!');
    // TODO: Implementar conversión real al backend
  };

  const handleAddInteraction = (newInteraction: any) => {
    if (!lead) return;
    const interaction = {
      id: `int-${Date.now()}`,
      ...newInteraction,
    };
    setLead(prev => prev ? ({
      ...prev,
      interactions: [...prev.interactions, interaction],
    }) : null);
  };

  const handleEditLeadInfo = (updatedLead: Lead) => {
    setLead(updatedLead);
    // TODO: Guardar cambios en el backend
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Cargando detalles del lead...</p>
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
              <span className="text-3xl">😕</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error al cargar el lead</h3>
            <p className="text-gray-600">{error.message}</p>
            <button
              onClick={handleBack}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Volver a leads
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!lead || !leadId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 max-w-md border border-white/50">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Lead no encontrado</h3>
            <p className="text-gray-600">No se pudo encontrar la información del lead.</p>
            <button
              onClick={handleBack}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Volver a leads
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'info', label: 'Información' },
    { id: 'timeline', label: 'Historial' },
    { id: 'conversion', label: 'Conversión' },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
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
            Volver a leads
          </motion.button>

          <LeadHeader lead={lead} onEdit={handleEditLeadInfo} />
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
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative whitespace-nowrap py-4 px-1 font-semibold text-sm transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
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

          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'info' && <LeadQualification lead={lead} onUpdate={handleEditLeadInfo} />}
              {activeTab === 'timeline' && <LeadTimeline interactions={lead.interactions} nextActions={lead.nextActions} onAddInteraction={handleAddInteraction} />}
              {activeTab === 'conversion' && <LeadConversion onConvert={handleConvertLead} />}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadDetallePage;
