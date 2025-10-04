import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Copy, Check, Code2, Layout, MessageSquare, Download,
  ExternalLink, Settings, ArrowUpRight, TrendingUp, Users,
  Maximize2, MousePointerClick, X, Smartphone, Monitor
} from 'lucide-react';
import { widgetCaptacionApi, WidgetConfig } from '../widgetCaptacionApi';

// Templates prediseñados con datos mockeados
const widgetTemplates = [
  {
    id: 'popup-modal',
    name: 'Pop-up Modal',
    description: 'Modal centrado con overlay oscuro',
    icon: Maximize2,
    gradient: 'from-purple-500 to-pink-500',
    preview: '📱',
    type: 'reserva' as const
  },
  {
    id: 'slide-in',
    name: 'Slide-in Lateral',
    description: 'Widget deslizante desde la derecha',
    icon: ArrowUpRight,
    gradient: 'from-blue-500 to-cyan-500',
    preview: '📊',
    type: 'info' as const
  },
  {
    id: 'banner-top',
    name: 'Banner Superior',
    description: 'Barra fija en la parte superior',
    icon: Layout,
    gradient: 'from-orange-500 to-red-500',
    preview: '🎯',
    type: 'info' as const
  },
  {
    id: 'embedded-form',
    name: 'Formulario Embebido',
    description: 'Formulario integrado en el contenido',
    icon: MessageSquare,
    gradient: 'from-green-500 to-teal-500',
    preview: '📝',
    type: 'descarga' as const
  },
  {
    id: 'exit-intent',
    name: 'Exit Intent',
    description: 'Aparece cuando el usuario intenta salir',
    icon: ExternalLink,
    gradient: 'from-indigo-500 to-purple-500',
    preview: '🚪',
    type: 'reserva' as const
  },
  {
    id: 'chat-widget',
    name: 'Chat Widget',
    description: 'Widget de chat flotante',
    icon: MessageSquare,
    gradient: 'from-cyan-500 to-blue-500',
    preview: '💬',
    type: 'info' as const
  }
];

// Datos mockeados de widgets activos con métricas
const mockActiveWidgets = [
  {
    id: 'widget-1',
    name: 'Reserva de Consultoría',
    type: 'reserva' as const,
    templateId: 'popup-modal',
    leads: 245,
    conversions: '8.2%',
    status: 'Activo',
    lastEdit: '2025-09-25'
  },
  {
    id: 'widget-2',
    name: 'Descarga Ebook Marketing',
    type: 'descarga' as const,
    templateId: 'embedded-form',
    leads: 892,
    conversions: '12.5%',
    status: 'Activo',
    lastEdit: '2025-09-24'
  },
  {
    id: 'widget-3',
    name: 'Newsletter Slide-in',
    type: 'info' as const,
    templateId: 'slide-in',
    leads: 456,
    conversions: '6.8%',
    status: 'Activo',
    lastEdit: '2025-09-26'
  },
  {
    id: 'widget-4',
    name: 'Banner Promo Black Friday',
    type: 'info' as const,
    templateId: 'banner-top',
    leads: 1243,
    conversions: '15.3%',
    status: 'Pausado',
    lastEdit: '2025-09-20'
  }
];

const GeneradorWidget: React.FC = () => {
  const [widgets, setWidgets] = useState<typeof mockActiveWidgets>(mockActiveWidgets);
  const [selectedWidget, setSelectedWidget] = useState<WidgetConfig | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleCopyEmbedCode = (widgetId: string) => {
    const embedCode = `<script src="https://widgets.tudominio.com/${widgetId}.js"></script>`;
    navigator.clipboard.writeText(embedCode).then(() => {
      console.log(`Código copiado para widget: ${widgetId}`);
      setCopiedId(widgetId);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('Error al copiar código:', err);
      alert('Error al copiar el código. Por favor, inténtalo de nuevo.');
    });
  };

  const handleUseTemplate = (template: typeof widgetTemplates[0]) => {
    alert(`Creando nuevo widget con template: ${template.name}`);
  };

  const handleToggleWidgetStatus = (widgetId: string) => {
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => 
        widget.id === widgetId 
          ? { ...widget, status: widget.status === 'Activo' ? 'Pausado' : 'Activo' }
          : widget
      )
    );
    console.log(`Estado del widget ${widgetId} cambiado`);
  };

  const handleDeleteWidget = (widgetId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este widget?')) {
      setWidgets(prevWidgets => prevWidgets.filter(widget => widget.id !== widgetId));
      console.log(`Widget ${widgetId} eliminado`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Widgets Activos', value: '7', icon: Layout, color: 'from-cyan-500 to-blue-500', change: '+2' },
          { label: 'Leads Generados', value: '2,836', icon: Users, color: 'from-emerald-500 to-teal-500', change: '+18%' },
          { label: 'Tasa de Conversión', value: '10.7%', icon: TrendingUp, color: 'from-violet-500 to-purple-500', change: '+2.3%' },
          { label: 'Mejor Rendimiento', value: '15.3%', icon: ArrowUpRight, color: 'from-orange-500 to-red-500', change: 'Banner' }
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
              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.label}
                </p>

                {/* Valor */}
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.value}
                </p>

                {/* Cambio */}
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500 font-medium">este mes</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Galería de Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Galería de Templates</h2>
            <p className="text-gray-600">Elige un template prediseñado y personalízalo</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl">
            <Layout className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgetTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                onClick={() => handleUseTemplate(template)}
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${template.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <Icon className="w-10 h-10 text-white" />
                    <span className="text-4xl">{template.preview}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full text-xs font-semibold text-cyan-700 border border-cyan-200">
                      {template.type}
                    </span>
                    <button className="ml-auto px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      Usar Template
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Widgets Activos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tus Widgets Activos</h2>
            <p className="text-gray-600">Gestiona e instala tus widgets en tu sitio web</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
            <Settings className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          {widgets.map((widget, index) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Info principal */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                      {widget.name.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{widget.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          widget.status === 'Activo'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                          {widget.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Layout className="w-4 h-4" />
                          <span className="capitalize">{widget.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{widget.leads} leads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-semibold text-green-600">{widget.conversions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      console.log(`Abriendo preview del widget: ${widget.name}`);
                      setShowPreview(widget.id);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 rounded-xl text-sm font-semibold hover:from-cyan-100 hover:to-blue-100 transition-all duration-300 border border-cyan-200 flex items-center gap-2"
                  >
                    <MousePointerClick className="w-4 h-4" />
                    Preview
                  </button>

                  <button
                    onClick={() => handleCopyEmbedCode(widget.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border flex items-center gap-2 ${
                      copiedId === widget.id
                        ? 'bg-green-500 text-white border-green-600'
                        : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 hover:from-indigo-100 hover:to-purple-100'
                    }`}
                  >
                    {copiedId === widget.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Code2 className="w-4 h-4" />
                        Código
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => {
                      // Aquí se puede implementar la lógica para editar el widget
                      alert(`Editando widget: ${widget.name}`);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 border border-gray-300 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Editar
                  </button>

                  <button 
                    onClick={() => handleToggleWidgetStatus(widget.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border flex items-center gap-2 ${
                      widget.status === 'Activo'
                        ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border-orange-200 hover:from-orange-100 hover:to-red-100'
                        : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 hover:from-green-100 hover:to-emerald-100'
                    }`}
                  >
                    {widget.status === 'Activo' ? (
                      <>
                        <X className="w-4 h-4" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        Activar
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => handleDeleteWidget(widget.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 rounded-xl text-sm font-semibold hover:from-red-100 hover:to-pink-100 transition-all duration-300 border border-red-200 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>

              {/* Código de instalación (expandible) */}
              {copiedId === widget.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    <code>{`<script src="https://widgets.tudominio.com/${widget.id}.js"></script>`}</code>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal de Preview */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Preview del Widget: {widgets.find(w => w.id === showPreview)?.name}
                </h3>
                <p className="text-cyan-100 mb-3">
                  Tipo: {widgets.find(w => w.id === showPreview)?.type} • 
                  Leads: {widgets.find(w => w.id === showPreview)?.leads} • 
                  Conversión: {widgets.find(w => w.id === showPreview)?.conversions}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      previewDevice === 'desktop'
                        ? 'bg-white text-cyan-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      previewDevice === 'mobile'
                        ? 'bg-white text-cyan-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Móvil
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(null)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Body del modal con iframe simulado */}
            <div className="p-8 bg-gray-50">
              <div className={`mx-auto bg-white rounded-2xl shadow-xl overflow-hidden ${
                previewDevice === 'desktop' ? 'max-w-3xl' : 'max-w-sm'
              }`}>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-semibold">Preview del Widget</p>
                    <p className="text-sm text-gray-500 mt-2">Vista en {previewDevice === 'desktop' ? 'Desktop' : 'Móvil'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GeneradorWidget;
