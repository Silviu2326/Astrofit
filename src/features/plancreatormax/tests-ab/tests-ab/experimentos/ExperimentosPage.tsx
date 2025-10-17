import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TestTube, Zap, BarChart3, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import PanelExperimentos from './components/PanelExperimentos';
import CreadorTest from './components/CreadorTest';
import MonitorTiempoReal from './components/MonitorTiempoReal';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';
import Modal from '../../../../../components/ui/modal';
import { Experiment } from './experimentosApi';

const ExperimentosPage: React.FC = () => {
  // Estados para modales
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: string;
    experimentId: string;
    experimentName: string;
  }>({
    isOpen: false,
    action: '',
    experimentId: '',
    experimentName: ''
  });

  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    experiment: Experiment | null;
  }>({
    isOpen: false,
    experiment: null
  });

  const [optionsModal, setOptionsModal] = useState<{
    isOpen: boolean;
    experiment: Experiment | null;
  }>({
    isOpen: false,
    experiment: null
  });

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    experiment: Experiment | null;
  }>({
    isOpen: false,
    experiment: null
  });

  const [reportModal, setReportModal] = useState<{
    isOpen: boolean;
    experiment: Experiment | null;
  }>({
    isOpen: false,
    experiment: null
  });

  const [scheduleModal, setScheduleModal] = useState<{
    isOpen: boolean;
    experiment: Experiment | null;
  }>({
    isOpen: false,
    experiment: null
  });

  // Handlers para modales
  const handleExperimentAction = (action: string, experimentId: string, experimentName: string) => {
    setConfirmModal({
      isOpen: true,
      action,
      experimentId,
      experimentName
    });
  };

  const handleViewDetails = (experiment: Experiment) => {
    setDetailModal({
      isOpen: true,
      experiment
    });
  };

  const handleShowOptions = (experiment: Experiment) => {
    setOptionsModal({
      isOpen: true,
      experiment
    });
  };

  const confirmAction = async () => {
    const { action, experimentId, experimentName } = confirmModal;
    const loadingToast = toast.loading(`Procesando ${action}...`);
    
    try {
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log para desarrollo
      console.log(`Procesando ${action} para experimento ${experimentName} (${experimentId})`);
      
      toast.success(`Experimento "${experimentName}" ${action === 'pausar' ? 'pausado' : action === 'reanudar' ? 'reanudado' : action === 'eliminar' ? 'eliminado' : 'finalizado'} correctamente`, { id: loadingToast });
    } catch (error) {
      toast.error(`Error al ${action} el experimento`, { id: loadingToast });
    } finally {
      setConfirmModal({ isOpen: false, action: '', experimentId: '', experimentName: '' });
    }
  };

  // Handlers para opciones del modal
  const handleEditExperiment = (experiment: Experiment) => {
    setOptionsModal({ isOpen: false, experiment: null });
    setEditModal({ isOpen: true, experiment });
  };

  const handleViewReport = (experiment: Experiment) => {
    setOptionsModal({ isOpen: false, experiment: null });
    setReportModal({ isOpen: true, experiment });
  };

  const handleExportData = async (experiment: Experiment) => {
    setOptionsModal({ isOpen: false, experiment: null });
    const loadingToast = toast.loading('Preparando exportación...');
    
    try {
      // Simular exportación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Crear CSV con datos del experimento
      const csvContent = [
        ['Experimento', 'Variante A (%)', 'Variante B (%)', 'Significancia (%)', 'Estado'],
        [
          experiment.name,
          (experiment.conversionRateA * 100).toFixed(2),
          (experiment.conversionRateB * 100).toFixed(2),
          (experiment.significance * 100).toFixed(2),
          experiment.status
        ]
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `experimento-${experiment.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success('Datos exportados correctamente', { id: loadingToast });
    } catch (error) {
      toast.error('Error al exportar los datos', { id: loadingToast });
    }
  };

  const handleScheduleEnd = (experiment: Experiment) => {
    setOptionsModal({ isOpen: false, experiment: null });
    setScheduleModal({ isOpen: true, experiment });
  };

  const handleDeleteExperiment = (experiment: Experiment) => {
    setOptionsModal({ isOpen: false, experiment: null });
    setConfirmModal({
      isOpen: true,
      action: 'eliminar',
      experimentId: experiment.id,
      experimentName: experiment.name
    });
  };

  const handleSaveEdit = async (updatedExperiment: Experiment) => {
    const loadingToast = toast.loading('Guardando cambios...');
    
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log para desarrollo
      console.log('Guardando experimento actualizado:', updatedExperiment);
      
      toast.success('Experimento actualizado correctamente', { id: loadingToast });
      setEditModal({ isOpen: false, experiment: null });
    } catch (error) {
      toast.error('Error al actualizar el experimento', { id: loadingToast });
    }
  };

  const handleScheduleConfirm = async (experiment: Experiment, endDate: string) => {
    const loadingToast = toast.loading('Programando finalización...');
    
    try {
      // Simular programación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log para desarrollo
      console.log(`Programando finalización para experimento ${experiment.name} el ${endDate}`);
      
      toast.success(`Finalización programada para el ${endDate}`, { id: loadingToast });
      setScheduleModal({ isOpen: false, experiment: null });
    } catch (error) {
      toast.error('Error al programar la finalización', { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <TestTube className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Tests A/B <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Experimentos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Optimiza tu aplicación con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">experimentos controlados</span> y toma decisiones basadas en datos reales
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Experimentos Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Análisis en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Optimización Automática</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Panel de Experimentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <PanelExperimentos 
                onExperimentAction={handleExperimentAction}
                onViewDetails={handleViewDetails}
                onShowOptions={handleShowOptions}
              />
            </div>
          </div>
        </motion.div>

        {/* Creador de Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <CreadorTest />
            </div>
          </div>
        </motion.div>

        {/* Monitor en Tiempo Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="md:col-span-2 lg:col-span-3"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <MonitorTiempoReal onViewDetails={handleViewDetails} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modales */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: '', experimentId: '', experimentName: '' })}
        onConfirm={confirmAction}
        title={`${confirmModal.action === 'pausar' ? 'Pausar' : 
               confirmModal.action === 'reanudar' ? 'Reanudar' : 
               confirmModal.action === 'finalizar' ? 'Finalizar' : 
               'Eliminar'} Experimento`}
        message={`¿Estás seguro de que quieres ${confirmModal.action} el experimento "${confirmModal.experimentName}"?${
          confirmModal.action === 'eliminar' ? ' Esta acción no se puede deshacer.' : ''
        }`}
        confirmText={confirmModal.action === 'pausar' ? 'Pausar' : 
                    confirmModal.action === 'reanudar' ? 'Reanudar' : 
                    confirmModal.action === 'finalizar' ? 'Finalizar' : 
                    'Eliminar'}
        type={confirmModal.action === 'finalizar' || confirmModal.action === 'eliminar' ? 'danger' : 'warning'}
      />

      {/* Modal de Vista Detallada */}
      <Modal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ isOpen: false, experiment: null })}
        title="Detalles del Experimento"
        size="lg"
      >
        {detailModal.experiment && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{detailModal.experiment.name}</h3>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  detailModal.experiment.status === 'active' ? 'text-green-600 bg-green-100' :
                  detailModal.experiment.status === 'paused' ? 'text-yellow-600 bg-yellow-100' :
                  'text-blue-600 bg-blue-100'
                }`}>
                  {detailModal.experiment.status === 'active' ? 'Activo' : 
                   detailModal.experiment.status === 'paused' ? 'Pausado' : 'Completado'}
                </span>
                <span className="text-gray-600">Duración: {detailModal.experiment.duration}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Variante A (Control)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Tasa de Conversión:</span>
                    <span className="font-bold text-blue-900">{(detailModal.experiment.conversionRateA * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Usuarios:</span>
                    <span className="font-bold text-blue-900">500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Conversiones:</span>
                    <span className="font-bold text-blue-900">25</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="text-lg font-semibold text-green-900 mb-4">Variante B (Test)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-700">Tasa de Conversión:</span>
                    <span className="font-bold text-green-900">{(detailModal.experiment.conversionRateB * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Usuarios:</span>
                    <span className="font-bold text-green-900">500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Conversiones:</span>
                    <span className="font-bold text-green-900">30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Análisis Estadístico</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{(detailModal.experiment.significance * 100).toFixed(1)}%</div>
                  <div className="text-sm text-purple-700">Significancia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">
                    {((detailModal.experiment.conversionRateB - detailModal.experiment.conversionRateA) / detailModal.experiment.conversionRateA * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-purple-700">Mejora</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">95%</div>
                  <div className="text-sm text-purple-700">Confianza</div>
                </div>
              </div>
            </div>

            {detailModal.experiment.winningVariant && (
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">🏆 Variante Ganadora</h4>
                <p className="text-yellow-800">
                  La variante <strong>{detailModal.experiment.winningVariant}</strong> está mostrando mejores resultados con una significancia estadística del {(detailModal.experiment.significance * 100).toFixed(1)}%.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de Opciones */}
      <Modal
        isOpen={optionsModal.isOpen}
        onClose={() => setOptionsModal({ isOpen: false, experiment: null })}
        title="Opciones del Experimento"
        size="md"
      >
        {optionsModal.experiment && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{optionsModal.experiment.name}</h3>
              <p className="text-sm text-gray-600">Estado: {optionsModal.experiment.status}</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => handleEditExperiment(optionsModal.experiment!)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Editar Experimento</div>
                  <div className="text-sm text-gray-600">Modificar configuración y parámetros</div>
                </div>
              </button>

              <button 
                onClick={() => handleViewReport(optionsModal.experiment!)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Ver Reporte Completo</div>
                  <div className="text-sm text-gray-600">Análisis detallado y gráficos</div>
                </div>
              </button>

              <button 
                onClick={() => handleExportData(optionsModal.experiment!)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Exportar Datos</div>
                  <div className="text-sm text-gray-600">Descargar resultados en CSV/Excel</div>
                </div>
              </button>

              <button 
                onClick={() => handleScheduleEnd(optionsModal.experiment!)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Programar Finalización</div>
                  <div className="text-sm text-gray-600">Establecer fecha de cierre automático</div>
                </div>
              </button>

              <div className="border-t pt-3">
                <button 
                  onClick={() => handleDeleteExperiment(optionsModal.experiment!)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <div>
                    <div className="font-medium">Eliminar Experimento</div>
                    <div className="text-sm text-red-500">Esta acción no se puede deshacer</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Editar Experimento */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, experiment: null })}
        title="Editar Experimento"
        size="lg"
      >
        {editModal.experiment && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{editModal.experiment.name}</h3>
              <p className="text-gray-600">Modifica la configuración del experimento</p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Experimento
                </label>
                <input
                  type="text"
                  defaultValue={editModal.experiment.name}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duración
                </label>
                <select
                  defaultValue={editModal.experiment.duration}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="3 days">3 días</option>
                  <option value="7 days">7 días</option>
                  <option value="14 days">14 días</option>
                  <option value="30 days">30 días</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  defaultValue={editModal.experiment.status}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Activo</option>
                  <option value="paused">Pausado</option>
                  <option value="completed">Completado</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditModal({ isOpen: false, experiment: null })}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveEdit(editModal.experiment!)}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>

      {/* Modal de Reporte Completo */}
      <Modal
        isOpen={reportModal.isOpen}
        onClose={() => setReportModal({ isOpen: false, experiment: null })}
        title="Reporte Completo"
        size="xl"
      >
        {reportModal.experiment && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{reportModal.experiment.name}</h3>
              <p className="text-gray-600">Análisis detallado y métricas avanzadas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Métricas de Rendimiento</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversiones Totales:</span>
                    <span className="font-semibold">55</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usuarios Únicos:</span>
                    <span className="font-semibold">1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo Promedio:</span>
                    <span className="font-semibold">2.5 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasa de Rebote:</span>
                    <span className="font-semibold">35%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">📈 Análisis Estadístico</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">P-valor:</span>
                    <span className="font-semibold">0.023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Intervalo de Confianza:</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potencia Estadística:</span>
                    <span className="font-semibold">0.87</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tamaño del Efecto:</span>
                    <span className="font-semibold">Medio</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Recomendaciones</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">La variante B muestra una mejora significativa del 20% en conversiones</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Se recomienda implementar la variante B como versión principal</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Considerar realizar un test adicional para validar los resultados</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setReportModal({ isOpen: false, experiment: null })}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => handleExportData(reportModal.experiment!)}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                Exportar Reporte
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Programar Finalización */}
      <Modal
        isOpen={scheduleModal.isOpen}
        onClose={() => setScheduleModal({ isOpen: false, experiment: null })}
        title="Programar Finalización"
        size="md"
      >
        {scheduleModal.experiment && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{scheduleModal.experiment.name}</h3>
              <p className="text-gray-600">Establece una fecha para finalizar automáticamente el experimento</p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hora de Finalización
                </label>
                <input
                  type="time"
                  defaultValue="23:59"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">Nota importante</p>
                    <p className="text-sm text-yellow-700">El experimento se finalizará automáticamente en la fecha y hora especificadas. Esta acción no se puede deshacer.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setScheduleModal({ isOpen: false, experiment: null })}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleScheduleConfirm(scheduleModal.experiment!, new Date().toLocaleDateString())}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
                >
                  Programar Finalización
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ExperimentosPage;
