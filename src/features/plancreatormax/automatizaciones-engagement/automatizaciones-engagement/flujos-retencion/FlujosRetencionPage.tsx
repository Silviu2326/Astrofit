
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, 
  Zap, 
  Clock, 
  Heart, 
  BarChart3, 
  Target, 
  Users, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Play,
  Settings,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/modal';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import InputModal from '@/components/ui/input-modal';
import { flujosRetencionApi } from './flujosRetencionApi';
import ConstructorFlujos, { ConstructorFlujosHandle } from './components/ConstructorFlujos';
import SecuenciasAutomaticas from './components/SecuenciasAutomaticas';
import DisparadoresInactividad from './components/DisparadoresInactividad';
import AccionesFidelizacion from './components/AccionesFidelizacion';

interface MetricsData {
  retentionRate?: number;
  reactivated?: number;
  roi?: number;
}

const FlujosRetencionPage: React.FC = () => {
  const [isABConfigOpen, setIsABConfigOpen] = useState(false);
  const [isRunTestOpen, setIsRunTestOpen] = useState(false);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const [isAddTriggerOpen, setIsAddTriggerOpen] = useState(false);
  const [triggerName] = useState('Disparador de Inactividad');
  const [isSaveActionsOpen, setIsSaveActionsOpen] = useState(false);
  const [isSavingFlow, setIsSavingFlow] = useState(false);
  const [isBuilderFullscreen, setIsBuilderFullscreen] = useState(false);
  const builderRef = useRef<ConstructorFlujosHandle | null>(null);
  const [isCreateSeqOpen, setIsCreateSeqOpen] = useState(false);
  const [seqName, setSeqName] = useState('Te echamos de menos');
  const [seqChannel, setSeqChannel] = useState<'email' | 'push' | 'sms'>('push');
  const [seqDelay, setSeqDelay] = useState(24);
  const [isCreatingSeq, setIsCreatingSeq] = useState(false);

  // En un escenario real, este ID vendría del flujo seleccionado o la URL
  const flujoId = 'retencion-general';

  // Estado para configuración A/B
  const [experimentName, setExperimentName] = useState('Retención - Push Reactivación v1');
  const [variantA, setVariantA] = useState('Te echamos de menos - 10% de descuento');
  const [variantB, setVariantB] = useState('Regresa hoy y recibe 1 semana premium');
  const [audiencePct, setAudiencePct] = useState(50);
  const [durationDays, setDurationDays] = useState(7);
  const [targetMetric, setTargetMetric] = useState<'Reactivaciones' | 'CTR Push' | 'Ingresos'>('Reactivaciones');

  const handleViewMetrics = async () => {
    try {
      const metrics = await flujosRetencionApi.getMetrics(flujoId);
      setMetricsData(metrics);
      setIsMetricsOpen(true);
    } catch {
      toast.error('No se pudieron cargar las métricas');
    }
  };

  const handleOpenABConfig = () => {
    setIsABConfigOpen(true);
  };

  const handleCloseABConfig = () => {
    setIsABConfigOpen(false);
  };

  const handleOpenRunTest = () => {
    setIsRunTestOpen(true);
  };

  const handleConfirmRunTest = async () => {
    setIsRunningTest(true);
    try {
      const testConfig = {
        name: experimentName,
        variants: {
          A: variantA,
          B: variantB,
        },
        audiencePercent: audiencePct,
        durationDays,
        targetMetric,
      };
      await flujosRetencionApi.startABTest(flujoId, testConfig);
      toast.success('Test A/B iniciado correctamente');
    } catch {
      toast.error('No se pudo iniciar el test A/B');
    } finally {
      setIsRunningTest(false);
      setIsRunTestOpen(false);
    }
  };
  const stats = [
    { title: 'Flujos Activos', value: '12', change: '+8.2%', icon: Workflow, color: 'from-blue-500 to-indigo-600' },
    { title: 'Tasa Retención', value: '87%', change: '+12.5%', icon: Heart, color: 'from-emerald-500 to-teal-600' },
    { title: 'Clientes Reactivados', value: '234', change: '+15.3%', icon: Users, color: 'from-purple-500 to-pink-600' },
    { title: 'ROI Automatización', value: '340%', change: '+22.1%', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
  ];

  const features = [
    {
      title: 'Constructor Visual de Flujos',
      description: 'Diseña tus flujos de retención con un intuitivo constructor drag & drop.',
      icon: Workflow,
      component: (
        <ConstructorFlujos
          ref={builderRef}
          onAddTriggerRequest={() => {
            console.log('🔍 [DEBUG] onAddTriggerRequest called');
            console.log('🔍 [DEBUG] builderRef.current:', builderRef.current);
            console.log('🔍 [DEBUG] isAddTriggerOpen state:', isAddTriggerOpen);
            
            toast('⚙️ Configurando disparador...', { 
              icon: '⚙️',
              duration: 2000,
              style: {
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: '600',
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
              }
            });
            
            console.log('🔍 [DEBUG] Setting timeout to open modal...');
            setTimeout(() => {
              console.log('🔍 [DEBUG] Timeout executed, opening modal');
              setIsAddTriggerOpen(true);
              console.log('🔍 [DEBUG] Modal should be open now');
            }, 500);
          }}
          onSaveActionsRequest={() => {
            console.log('🔍 [DEBUG] onSaveActionsRequest called');
            console.log('🔍 [DEBUG] builderRef.current:', builderRef.current);
            console.log('🔍 [DEBUG] isSaveActionsOpen state:', isSaveActionsOpen);
            
            toast('💾 Preparando guardado de flujo...', { 
              icon: '💾',
              duration: 2000,
              style: {
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: '#fff',
                fontWeight: '600',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)'
              }
            });
            
            console.log('🔍 [DEBUG] Setting timeout to open save modal...');
            setTimeout(() => {
              console.log('🔍 [DEBUG] Timeout executed, opening save modal');
              setIsSaveActionsOpen(true);
              console.log('🔍 [DEBUG] Save modal should be open now');
            }, 500);
          }}
          isFullscreen={isBuilderFullscreen}
          onToggleFullscreen={() => setIsBuilderFullscreen((v) => !v)}
        />
      ),
      gradient: 'from-indigo-500 via-purple-500 to-pink-500'
    },
    {
      title: 'Secuencias Automáticas',
      description: 'Configura secuencias automáticas para clientes inactivos, por ejemplo: "Te echamos de menos - descuento reactivación".',
      icon: Zap,
      component: <SecuenciasAutomaticas onCreateRequest={() => setIsCreateSeqOpen(true)} />,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    {
      title: 'Disparadores de Inactividad',
      description: 'Define disparadores basados en el tiempo de inactividad del cliente.',
      icon: Clock,
      component: <DisparadoresInactividad />,
      gradient: 'from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'Acciones de Fidelización',
      description: 'Elige entre diversas acciones como email, notificaciones push, descuentos o llamadas.',
      icon: Heart,
      component: <AccionesFidelizacion />,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500'
    }
  ];

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
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Flujos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Retención</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Automatiza la <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">retención de clientes</span> con flujos inteligentes que se adaptan al comportamiento de cada usuario.
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">87% Retención</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">12 Flujos Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">+22% ROI</span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Modal: Añadir Disparador (renderizado en padre) */}
      <InputModal
        isOpen={isAddTriggerOpen}
        onClose={() => setIsAddTriggerOpen(false)}
        onConfirm={(value) => {
          console.log('🔍 [DEBUG] InputModal onConfirm called with value:', value);
          console.log('🔍 [DEBUG] builderRef.current before addTriggerNode:', builderRef.current);
          
          setIsAddTriggerOpen(false);
          
          if (builderRef.current) {
            console.log('🔍 [DEBUG] Calling addTriggerNode...');
            builderRef.current.addTriggerNode({ name: value });
            console.log('🔍 [DEBUG] addTriggerNode called successfully');
          } else {
            console.error('❌ [ERROR] builderRef.current is null!');
          }
          
          toast.success('✅ Disparador añadido exitosamente!', { 
            icon: '🎯',
            duration: 3000,
            style: { 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontWeight: '600',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            } 
          });
        }}
        title="Añadir Disparador"
        message="Especifica un nombre para el disparador"
        placeholder="Disparador de Inactividad"
        defaultValue={triggerName}
      />

      {/* Modal: Guardar Acciones/Flujo (renderizado en padre) */}
      <ConfirmationModal
        isOpen={isSaveActionsOpen}
        onClose={() => setIsSaveActionsOpen(false)}
        onConfirm={async () => {
          console.log('🔍 [DEBUG] ConfirmationModal onConfirm called');
          console.log('🔍 [DEBUG] builderRef.current before getFlowData:', builderRef.current);
          
          try {
            setIsSavingFlow(true);
            console.log('🔍 [DEBUG] Getting flow data...');
            
            const flow = builderRef.current?.getFlowData();
            console.log('🔍 [DEBUG] Flow data received:', flow);
            
            if (!flow || flow.nodes.length === 0) {
              console.log('⚠️ [WARNING] No flow data or empty nodes');
              toast.error('⚠️ Añade al menos un nodo antes de guardar', {
                duration: 3000,
                style: {
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#fff',
                  fontWeight: '600',
                  boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }
              });
              setIsSavingFlow(false);
              return;
            }
            
            const payload = {
              name: 'Flujo de Retención',
              nodes: flow.nodes.map((n) => ({ id: n.id, position: n.position, data: n.data })),
              edges: flow.edges.map((e) => ({ id: e.id, source: e.source, target: e.target })),
            };
            
            console.log('🔍 [DEBUG] Payload to save:', payload);
            console.log('🔍 [DEBUG] Calling flujosRetencionApi.createFlujo...');
            
            await flujosRetencionApi.createFlujo(payload);
            
            console.log('✅ [SUCCESS] Flow saved successfully');
            toast.success('🚀 Flujo guardado exitosamente!', {
              icon: '🎉',
              duration: 3000,
              style: {
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: '#fff',
                fontWeight: '600',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }
            });
            setIsSaveActionsOpen(false);
          } catch (error) {
            console.error('❌ [ERROR] Failed to save flow:', error);
            toast.error('❌ Error al guardar el flujo', {
              duration: 3000,
              style: {
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: '#fff',
                fontWeight: '600',
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }
            });
          } finally {
            console.log('🔍 [DEBUG] Finally block executed');
            setIsSavingFlow(false);
          }
        }}
        title="Guardar acciones del flujo"
        message="Se guardarán los nodos y conexiones actuales del constructor."
        confirmText={isSavingFlow ? 'Guardando…' : 'Guardar' }
        cancelText="Cancelar"
        type="info"
        isLoading={isSavingFlow}
      />

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${75 + index * 5}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grid de Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
          >
            {/* Header con gradiente */}
            <div className={`bg-gradient-to-r ${feature.gradient} p-6 relative overflow-hidden`}>
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{feature.title}</h2>
                  <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {feature.component}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Métricas y A/B Testing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Métricas de Efectividad y A/B Testing
              </h2>
              <p className="text-gray-600 mt-2">Analiza el rendimiento de tus flujos y optimiza con A/B testing para maximizar la retención.</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewMetrics}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              Ver Métricas
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenABConfig}
              className="flex items-center gap-2 px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
              Configurar A/B Test
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenRunTest}
              className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-500 text-indigo-600 rounded-2xl font-semibold hover:bg-indigo-50 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Ejecutar Test
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
      {/* Modal: Configurar A/B Test */}
      <Modal isOpen={isABConfigOpen} onClose={handleCloseABConfig} title="Configurar A/B Test" size="lg">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del experimento</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Retención - Push Reactivación v1"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variante A</label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Mensaje A"
                value={variantA}
                onChange={(e) => setVariantA(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variante B</label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Mensaje B"
                value={variantB}
                onChange={(e) => setVariantB(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audiencia (%)</label>
              <input
                type="number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={audiencePct}
                onChange={(e) => setAudiencePct(Number(e.target.value))}
                min={1}
                max={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duración (días)</label>
              <input
                type="number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                min={1}
                max={60}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Métrica objetivo</label>
              <select
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={targetMetric}
                onChange={(e) => setTargetMetric(e.target.value as 'Reactivaciones' | 'CTR Push' | 'Ingresos')}
              >
                <option value="Reactivaciones">Reactivaciones</option>
                <option value="CTR Push">CTR Push</option>
                <option value="Ingresos">Ingresos</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCloseABConfig}
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleCloseABConfig();
                toast.success('Configuración guardada');
              }}
              className="px-5 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Métricas de efectividad */}
      <Modal isOpen={isMetricsOpen} onClose={() => setIsMetricsOpen(false)} title="Métricas de Efectividad" size="lg">
        <div className="space-y-4">
          {!metricsData && (
            <div className="text-gray-600">Cargando métricas…</div>
          )}
          {metricsData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-500">Retención</p>
                <p className="text-2xl font-bold text-gray-900">{metricsData.retentionRate ?? '—'}%</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-500">Reactivados</p>
                <p className="text-2xl font-bold text-gray-900">{metricsData.reactivated ?? '—'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-500">ROI</p>
                <p className="text-2xl font-bold text-gray-900">{metricsData.roi ?? '—'}%</p>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Modal de confirmación: Ejecutar Test */}
      <ConfirmationModal
        isOpen={isRunTestOpen}
        onClose={() => setIsRunTestOpen(false)}
        onConfirm={handleConfirmRunTest}
        title="Iniciar Test A/B"
        message="¿Deseas iniciar el experimento A/B seleccionado? Se notificará a la audiencia definida."
        confirmText={isRunningTest ? 'Iniciando…' : 'Iniciar ahora'}
        cancelText="Cancelar"
        type="info"
        isLoading={isRunningTest}
      />

      {/* Overlay Pantalla Completa para el Constructor Visual (widget bloqueante) */}
      {isBuilderFullscreen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop que bloquea interacción y oculta capas detrás */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
            <div className="relative w-full h-full max-w-[1600px] max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <div className="font-semibold text-gray-800">Constructor Visual de Flujos</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsBuilderFullscreen(false)}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
              {/* Contenido: instancia fullscreen del builder */}
              <div className="h-[calc(92vh-64px)]">
                <ConstructorFlujos
                  ref={builderRef}
                  onAddTriggerRequest={() => setIsAddTriggerOpen(true)}
                  onSaveActionsRequest={() => setIsSaveActionsOpen(true)}
                  isFullscreen
                  onToggleFullscreen={() => setIsBuilderFullscreen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Crear Nueva Secuencia (renderizado en padre) */}
      <Modal isOpen={isCreateSeqOpen} onClose={() => setIsCreateSeqOpen(false)} title="Crear Nueva Secuencia" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              value={seqName}
              onChange={(e) => setSeqName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de la secuencia"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Canal</label>
            <select
              value={seqChannel}
              onChange={(e) => setSeqChannel(e.target.value as 'email' | 'push' | 'sms')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email</option>
              <option value="push">Push</option>
              <option value="sms">SMS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Retraso inicial (horas)</label>
            <input
              type="number"
              value={seqDelay}
              onChange={(e) => setSeqDelay(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsCreateSeqOpen(false)}
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={isCreatingSeq}
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                try {
                  setIsCreatingSeq(true);
                  await flujosRetencionApi.createSecuencia({ name: seqName, channel: seqChannel, delayHours: seqDelay });
                  toast.success('Secuencia creada');
                  setIsCreateSeqOpen(false);
                } catch {
                  toast.error('No se pudo crear la secuencia');
                } finally {
                  setIsCreatingSeq(false);
                }
              }}
              className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={isCreatingSeq || !seqName.trim()}
            >
              {isCreatingSeq ? 'Creando…' : 'Crear'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FlujosRetencionPage;
