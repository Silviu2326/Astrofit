import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Target, 
  Zap, 
  BarChart3, 
  Send, 
  Edit3, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Play,
  Pause,
  Settings,
  Eye,
  Copy,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/modal';
import ConfirmationModal from '@/components/ui/confirmation-modal';

const MensajesPersonalizadosPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState(() => [
    {
      id: 'welcome',
      title: 'Bienvenida Personalizada',
      description: 'Mensaje de bienvenida con nombre y objetivos personalizados',
      icon: MessageSquare,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      status: 'active' as 'active' | 'paused',
      sent: 1247,
      openRate: 96,
      conversionRate: 28
    },
    {
      id: 'reactivation',
      title: 'Reactivación de Clientes',
      description: 'Secuencia para reactivar clientes inactivos con ofertas especiales',
      icon: Zap,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      status: 'active' as 'active' | 'paused',
      sent: 892,
      openRate: 89,
      conversionRate: 19
    },
    {
      id: 'milestone',
      title: 'Celebración de Logros',
      description: 'Mensajes automáticos para celebrar hitos y logros del cliente',
      icon: CheckCircle,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      status: 'paused' as 'active' | 'paused',
      sent: 456,
      openRate: 92,
      conversionRate: 31
    },
    {
      id: 'reminder',
      title: 'Recordatorios Inteligentes',
      description: 'Recordatorios personalizados basados en el comportamiento',
      icon: Clock,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      status: 'active' as 'active' | 'paused',
      sent: 1783,
      openRate: 87,
      conversionRate: 15
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [toggleTarget, setToggleTarget] = useState<string | null>(null);
  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  type RecentMessage = {
    id: number;
    recipient: string;
    template: string;
    sent: string;
    status: 'delivered' | 'opened' | 'converted';
    openRate: number;
    action: string;
  };
  const [viewMessage, setViewMessage] = useState<RecentMessage | null>(null);

  // Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(200);
  const [defaultChannel, setDefaultChannel] = useState<'push' | 'email' | 'sms'>('push');

  // Filters
  const [filters, setFilters] = useState<{ query: string; status: 'all' | 'delivered' | 'opened' | 'converted'; template: 'all' | string; }>({ query: '', status: 'all', template: 'all' });
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Template forms
  const iconMap = {
    MessageSquare,
    Zap,
    CheckCircle,
    Clock,
    Edit3,
  } as const;
  type IconKey = keyof typeof iconMap;
  const gradientOptions = [
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-emerald-500 via-teal-500 to-cyan-500',
    'from-orange-500 via-red-500 to-pink-500',
    'from-blue-500 via-indigo-500 to-purple-500',
  ];
  type TemplateForm = {
    title: string;
    description: string;
    status: 'active' | 'paused';
    gradient: string;
    iconKey: IconKey;
  };
  const [createForm, setCreateForm] = useState<TemplateForm | null>(null);
  const [editForm, setEditForm] = useState<TemplateForm | null>(null);

  const stats = [
    { title: 'Mensajes Enviados', value: '2,847', change: '+18.3%', icon: Send, color: 'from-blue-500 to-indigo-600' },
    { title: 'Tasa Apertura', value: '94%', change: '+5.2%', icon: Eye, color: 'from-emerald-500 to-teal-600' },
    { title: 'Tasa Conversión', value: '23%', change: '+12.1%', icon: Target, color: 'from-purple-500 to-pink-600' },
    { title: 'ROI Mensajería', value: '450%', change: '+28.7%', icon: BarChart3, color: 'from-orange-500 to-red-600' }
  ];

  const messageTemplates = templates;

  const recentMessages: RecentMessage[] = [
    {
      id: 1,
      recipient: 'María González',
      template: 'Bienvenida Personalizada',
      sent: '2024-01-15 14:30',
      status: 'delivered',
      openRate: 100,
      action: 'Se unió al plan Premium'
    },
    {
      id: 2,
      recipient: 'Carlos Ruiz',
      template: 'Reactivación de Clientes',
      sent: '2024-01-15 12:15',
      status: 'opened',
      openRate: 100,
      action: 'Completó entrenamiento'
    },
    {
      id: 3,
      recipient: 'Ana Martínez',
      template: 'Celebración de Logros',
      sent: '2024-01-15 10:45',
      status: 'converted',
      openRate: 100,
      action: 'Renovó suscripción'
    }
  ];

  const filteredRecentMessages = useMemo(() => {
    return recentMessages.filter((m) => {
      const matchQuery = filters.query
        ? (
            m.recipient.toLowerCase().includes(filters.query.toLowerCase()) ||
            m.template.toLowerCase().includes(filters.query.toLowerCase()) ||
            m.action.toLowerCase().includes(filters.query.toLowerCase())
          )
        : true;
      const matchStatus = filters.status === 'all' ? true : m.status === filters.status;
      const matchTemplate = filters.template === 'all' ? true : m.template === filters.template;
      return matchQuery && matchStatus && matchTemplate;
    });
  }, [recentMessages, filters]);

  const editTarget = useMemo(() => templates.find(t => t.id === editTargetId) || null, [templates, editTargetId]);

  const openCreate = () => {
    setCreateForm({
      title: '',
      description: '',
      status: 'active',
      gradient: gradientOptions[0],
      iconKey: 'MessageSquare',
    });
    setIsCreateOpen(true);
  };

  const saveCreateTemplate = () => {
    if (!createForm) return;
    const name = createForm.title.trim();
    if (!name) { toast.error('El título es obligatorio'); return; }
    const newTemplateId = name.toLowerCase().replace(/\s+/g, '-');
    if (templates.some(t => t.id === newTemplateId)) {
      toast.error('Ya existe una plantilla con ese nombre');
      return;
    }
    const newTemplate = {
      id: newTemplateId,
      title: name,
      description: createForm.description || 'Plantilla personalizada',
      icon: iconMap[createForm.iconKey],
      gradient: createForm.gradient,
      status: createForm.status,
      sent: 0,
      openRate: 0,
      conversionRate: 0,
    };
    setTemplates(prev => [newTemplate, ...prev]);
    toast.success('Plantilla creada');
    setIsCreateOpen(false);
    setCreateForm(null);
  };

  const handleEditTemplateOpen = (targetId: string) => {
    const t = templates.find(x => x.id === targetId);
    if (!t) return;
    // reverse map icon to key
    const iconKey = (Object.keys(iconMap) as IconKey[]).find(k => iconMap[k] === t.icon) || 'Edit3';
    setEditForm({
      title: t.title,
      description: t.description,
      status: t.status,
      gradient: t.gradient,
      iconKey,
    });
  };

  const saveEditTemplate = () => {
    if (!editTarget || !editForm) return;
    const newTitle = editForm.title.trim();
    if (!newTitle) { toast.error('El título es obligatorio'); return; }
    const newId = newTitle.toLowerCase().replace(/\s+/g, '-');
    const idChanged = newId !== editTarget.id;
    if (idChanged && templates.some(t => t.id === newId)) {
      toast.error('Ya existe una plantilla con ese nombre');
      return;
    }
    setTemplates(prev => prev.map(t => t.id === editTarget.id ? {
      ...t,
      id: newId,
      title: newTitle,
      description: editForm.description,
      status: editForm.status,
      gradient: editForm.gradient,
      icon: iconMap[editForm.iconKey],
    } : t));
    toast.success('Plantilla actualizada');
    setIsEditOpen(false);
    setEditForm(null);
  };

  const confirmToggle = () => {
    if (!toggleTarget) return;
    setTemplates(prev => prev.map(t => t.id === toggleTarget ? { ...t, status: t.status === 'active' ? 'paused' : 'active' } : t));
    const updated = templates.find(t => t.id === toggleTarget);
    toast.success(updated?.status === 'active' ? 'Plantilla pausada' : 'Plantilla activada');
    setToggleTarget(null);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copiado al portapapeles');
    } catch {
      toast.error('No se pudo copiar');
    }
  };

  const openEdit = (id: string) => {
    setEditTargetId(id);
    handleEditTemplateOpen(id);
    setIsEditOpen(true);
  };

  const openToggleConfirm = (id: string) => {
    setToggleTarget(id);
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
              <MessageSquare className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Mensajes <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Personalizados</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Crea <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">mensajes únicos</span> que conecten con cada cliente en el momento perfecto.
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">94% Apertura</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">23% Conversión</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">450% ROI</span>
            </div>
          </div>
        </div>
      </motion.div>

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
                  <ArrowRight className="w-4 h-4 text-green-600" />
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

      {/* Plantillas de Mensajes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Plantillas de Mensajes
                </h2>
                <p className="text-gray-600 mt-1">Gestiona y personaliza tus plantillas de mensajería</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCreate}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Nueva Plantilla
            </motion.button>
          </div>

          {/* Grid de Plantillas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messageTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 relative group cursor-pointer ${
                  selectedTemplate === template.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${template.gradient} p-4 relative overflow-hidden`}>
                  {/* Pattern de fondo */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <template.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{template.title}</h3>
                        <p className="text-blue-100 text-sm">{template.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      template.status === 'active' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {template.status === 'active' ? 'Activo' : 'Pausado'}
                    </div>
                  </div>
                </div>

                {/* Body con métricas */}
    <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{template.sent}</p>
                      <p className="text-xs text-gray-500 font-medium">Enviados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">{template.openRate}%</p>
                      <p className="text-xs text-gray-500 font-medium">Apertura</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{template.conversionRate}%</p>
                      <p className="text-xs text-gray-500 font-medium">Conversión</p>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); openEdit(template.id); }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-100 transition-colors duration-300"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); openToggleConfirm(template.id); }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-100 transition-colors duration-300"
                    >
                      {template.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {template.status === 'active' ? 'Pausar' : 'Activar'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); setIsSettingsOpen(true); }}
                      className="px-3 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                    >
                      <Settings className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mensajes Recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  Mensajes Recientes
                </h2>
                <p className="text-gray-600 mt-1">Últimos mensajes enviados y su rendimiento</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterPanelOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                Filtrar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsFilterPanelOpen(true); setTimeout(() => searchInputRef.current?.focus(), 0); }}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                Buscar
              </motion.button>
            </div>
          </div>

          {isFilterPanelOpen && (
            <div className="mb-6 p-4 bg-white/70 border border-white/60 rounded-2xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Búsqueda</label>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={filters.query}
                    onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                    placeholder="Nombre, plantilla o acción..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Estado</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as any }))}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">Todos</option>
                    <option value="delivered">Entregado</option>
                    <option value="opened">Abierto</option>
                    <option value="converted">Convertido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Plantilla</label>
                  <select
                    value={filters.template}
                    onChange={(e) => setFilters((f) => ({ ...f, template: e.target.value as any }))}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">Todas</option>
                    {templates.map((t) => (
                      <option key={t.id} value={t.title}>{t.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{filteredRecentMessages.length} resultados</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilters({ query: '', status: 'all', template: 'all' })}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                  >
                    Limpiar filtros
                  </button>
                  <button
                    onClick={() => toast.success('Filtros aplicados')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lista de Mensajes */}
          <div className="space-y-4">
            {filteredRecentMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 + 1, duration: 0.35 }}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-blue-400 to-indigo-600">
                  <span className="text-lg">{message.recipient.charAt(0)}</span>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-gray-900">{message.recipient}</p>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      message.status === 'converted' 
                        ? 'bg-green-100 text-green-700' 
                        : message.status === 'opened'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {message.status === 'converted' ? 'Convertido' : 
                       message.status === 'opened' ? 'Abierto' : 'Entregado'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">{message.template}</span> • {message.action}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Enviado: {message.sent}</span>
                    <span>Apertura: {message.openRate}%</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMessage(message)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(`${message.template} • ${message.action}`)}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* MODALS */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => { setIsCreateOpen(false); setCreateForm(null); }}
        title="Nueva Plantilla"
        size="lg"
      >
        {createForm && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Título</label>
                <input
                  value={createForm.title}
                  onChange={(e) => setCreateForm(f => f ? { ...f, title: e.target.value } : f)}
                  placeholder="Ej. Bienvenida Personalizada"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Estado</label>
                <select
                  value={createForm.status}
                  onChange={(e) => setCreateForm(f => f ? { ...f, status: e.target.value as any } : f)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Activo</option>
                  <option value="paused">Pausado</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Descripción</label>
              <textarea
                value={createForm.description}
                onChange={(e) => setCreateForm(f => f ? { ...f, description: e.target.value } : f)}
                rows={3}
                placeholder="Describe el propósito y contenido del mensaje"
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Gradiente</label>
                <select
                  value={createForm.gradient}
                  onChange={(e) => setCreateForm(f => f ? { ...f, gradient: e.target.value } : f)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {gradientOptions.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Icono</label>
                <select
                  value={createForm.iconKey}
                  onChange={(e) => setCreateForm(f => f ? { ...f, iconKey: e.target.value as any } : f)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {(Object.keys(iconMap) as Array<keyof typeof iconMap>).map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setIsCreateOpen(false); setCreateForm(null); }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={saveCreateTemplate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Crear
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => { setIsEditOpen(false); setEditForm(null); }}
        title="Editar Plantilla"
        size="lg"
      >
        {editForm && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Título</label>
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm(f => f ? { ...f, title: e.target.value } : f)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Estado</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm(f => f ? { ...f, status: e.target.value as any } : f)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Activo</option>
                  <option value="paused">Pausado</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Descripción</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm(f => f ? { ...f, description: e.target.value } : f)}
                rows={3}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Gradiente</label>
                <select
                  value={editForm.gradient}
                  onChange={(e) => setEditForm(f => f ? { ...f, gradient: e.target.value } : f)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {gradientOptions.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Icono</label>
                <select
                  value={editForm.iconKey}
                  onChange={(e) => setEditForm(f => f ? { ...f, iconKey: e.target.value as any } : f)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {(Object.keys(iconMap) as Array<keyof typeof iconMap>).map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setIsEditOpen(false); setEditForm(null); }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={saveEditTemplate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmationModal
        isOpen={!!toggleTarget}
        onClose={() => setToggleTarget(null)}
        onConfirm={confirmToggle}
        title="Cambiar estado"
        message="¿Seguro que deseas activar/pausar esta plantilla?"
        confirmText="Confirmar"
        type="warning"
      />

      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Configuración de Plantillas"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Notificaciones</p>
                  <p className="text-sm text-gray-500">Activar/desactivar el envío de notificaciones</p>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(v => !v)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${notificationsEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {notificationsEnabled ? 'Activadas' : 'Desactivadas'}
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Horas silenciosas</p>
                  <p className="text-sm text-gray-500">Evitar envíos nocturnos</p>
                </div>
                <button
                  onClick={() => setQuietHoursEnabled(v => !v)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${quietHoursEnabled ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {quietHoursEnabled ? 'Activas' : 'Inactivas'}
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-2xl">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Canal predeterminado</label>
              <select
                value={defaultChannel}
                onChange={(e) => setDefaultChannel(e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="push">Push</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div className="p-4 border rounded-2xl">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Límite diario de mensajes</label>
              <input
                type="number"
                min={0}
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-1 text-xs text-gray-500">Para evitar saturación de usuarios</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => { toast.success('Preferencias guardadas'); setIsSettingsOpen(false); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </Modal>

      {/* Filtro y búsqueda ahora están en un panel inline */}

      <Modal
        isOpen={!!viewMessage}
        onClose={() => setViewMessage(null)}
        title="Detalle del Mensaje"
      >
        {viewMessage && (
          <div className="space-y-2 text-gray-800">
            <p><span className="font-semibold">Para:</span> {viewMessage.recipient}</p>
            <p><span className="font-semibold">Plantilla:</span> {viewMessage.template}</p>
            <p><span className="font-semibold">Estado:</span> {viewMessage.status}</p>
            <p><span className="font-semibold">Apertura:</span> {viewMessage.openRate}%</p>
            <p><span className="font-semibold">Acción:</span> {viewMessage.action}</p>
            <p><span className="font-semibold">Enviado:</span> {viewMessage.sent}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MensajesPersonalizadosPage;
