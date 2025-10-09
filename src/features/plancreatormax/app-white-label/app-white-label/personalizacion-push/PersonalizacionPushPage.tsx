import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Send, 
  Users, 
  Clock, 
  Target,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/modal';
import ConfirmationModal from '@/components/ui/confirmation-modal';

const PersonalizacionPushPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Bienvenido a la app',
      message: '¡Gracias por descargar nuestra aplicación!',
      status: 'sent',
      sentAt: '2024-01-15',
      openRate: 85,
      clickRate: 23
    },
    {
      id: 2,
      title: 'Oferta especial',
      message: 'No te pierdas nuestra oferta del 50% de descuento',
      status: 'scheduled',
      sentAt: '2024-01-16',
      openRate: 0,
      clickRate: 0
    }
  ]);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleAt, setScheduleAt] = useState('');
  const [scheduleLoading, setScheduleLoading] = useState(false);

  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Segmentación
  const [segmentFilters, setSegmentFilters] = useState({
    activeUsers: true,
    inactiveUsers: false,
    ios: true,
    android: true,
    minSessions: 0,
  });

  const applySegmentation = () => {
    toast.success('Segmentación aplicada');
  };

  const nextId = useMemo(() => {
    return notifications.length ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
  }, [notifications]);

  const handleSendNow = () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Completa título y mensaje antes de enviar');
      return;
    }
    const newNotification = {
      id: nextId,
      title: title.trim(),
      message: message.trim(),
      status: 'sent',
      sentAt: new Date().toISOString().slice(0, 10),
      openRate: 0,
      clickRate: 0,
    } as any;
    setNotifications(prev => [newNotification, ...prev]);
    setTitle('');
    setMessage('');
    toast.success('Notificación enviada');
  };

  const openSchedule = () => {
    setScheduleAt('');
    setIsScheduleOpen(true);
  };

  const confirmSchedule = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Completa título y mensaje para programar');
      return;
    }
    if (!scheduleAt) {
      toast.error('Selecciona fecha y hora');
      return;
    }
    try {
      setScheduleLoading(true);
      await new Promise(r => setTimeout(r, 600));
      const newNotification = {
        id: nextId,
        title: title.trim(),
        message: message.trim(),
        status: 'scheduled',
        sentAt: scheduleAt,
        openRate: 0,
        clickRate: 0,
      } as any;
      setNotifications(prev => [newNotification, ...prev]);
      setTitle('');
      setMessage('');
      setIsScheduleOpen(false);
      toast.success('Notificación programada');
    } finally {
      setScheduleLoading(false);
    }
  };

  const startEdit = (id: number) => {
    const n = notifications.find(x => x.id === id);
    if (!n) return;
    setEditItemId(id);
    setEditTitle(n.title);
    setEditMessage(n.message);
    setIsEditOpen(true);
  };

  const saveEdit = () => {
    if (!editItemId) return;
    if (!editTitle.trim() || !editMessage.trim()) {
      toast.error('Título y mensaje no pueden estar vacíos');
      return;
    }
    setNotifications(prev => prev.map(n => n.id === editItemId ? { ...n, title: editTitle.trim(), message: editMessage.trim() } : n));
    setIsEditOpen(false);
    setEditItemId(null);
    toast.success('Notificación actualizada');
  };

  const startDelete = (id: number) => {
    setDeleteItemId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteItemId) return;
    setNotifications(prev => prev.filter(n => n.id !== deleteItemId));
    setIsDeleteOpen(false);
    setDeleteItemId(null);
    toast.success('Notificación eliminada');
  };

  const tabs = [
    { id: 'create', name: 'Crear Notificación', icon: Plus },
    { id: 'segment', name: 'Segmentación', icon: Target },
    { id: 'schedule', name: 'Programar', icon: Clock },
    { id: 'analytics', name: 'Analíticas', icon: BarChart3 }
  ];

  const stats = [
    { title: 'Total Enviadas', value: '1,234', change: '+12.5%', icon: Send, color: 'from-blue-500 to-indigo-600' },
    { title: 'Tasa de Apertura', value: '68.2%', change: '+5.3%', icon: Eye, color: 'from-green-500 to-emerald-600' },
    { title: 'Tasa de Clics', value: '23.1%', change: '+2.1%', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
    { title: 'Usuarios Activos', value: '8,456', change: '+8.7%', icon: Users, color: 'from-orange-500 to-red-600' }
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
              <Bell className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Notificaciones <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Push</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Crea, segmenta y programa <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">notificaciones personalizadas</span> para maximizar el engagement
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Send className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Envío Inteligente</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Segmentación Avanzada</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Analíticas en Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
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
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
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
                    animate={{ width: `${Math.random() * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs de Navegación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 mb-8 border border-white/50"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.name}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Panel Principal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
                {activeTab === 'create' && (
                  <>
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Plus className="w-6 h-6" />
                    </div>
                    Crear Nueva Notificación
                  </>
                )}
                {activeTab === 'segment' && (
                  <>
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Target className="w-6 h-6" />
                    </div>
                    Segmentación de Audiencia
                  </>
                )}
                {activeTab === 'schedule' && (
                  <>
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Clock className="w-6 h-6" />
                    </div>
                    Programación de Notificaciones
                  </>
                )}
                {activeTab === 'analytics' && (
                  <>
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    Analíticas de Rendimiento
                  </>
                )}
              </h2>
            </div>

            {/* Contenido según pestaña */}
            {activeTab === 'create' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Título de la Notificación</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: ¡Oferta especial para ti!"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mensaje</label>
                  <textarea
                    placeholder="Escribe el contenido de tu notificación..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                  />
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendNow}
                    className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Ahora
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openSchedule}
                    className="flex-1 bg-white/60 backdrop-blur-sm text-gray-700 font-bold py-4 px-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-5 h-5" />
                    Programar
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'segment' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl border-2 border-gray-200 bg-white/70">
                    <p className="font-semibold text-gray-800 mb-3">Actividad</p>
                    <label className="flex items-center gap-3 text-gray-700 mb-2">
                      <input type="checkbox" checked={segmentFilters.activeUsers} onChange={(e)=>setSegmentFilters(s=>({...s,activeUsers:e.target.checked}))} />
                      Usuarios activos
                    </label>
                    <label className="flex items-center gap-3 text-gray-700">
                      <input type="checkbox" checked={segmentFilters.inactiveUsers} onChange={(e)=>setSegmentFilters(s=>({...s,inactiveUsers:e.target.checked}))} />
                      Usuarios inactivos
                    </label>
                  </div>
                  <div className="p-4 rounded-2xl border-2 border-gray-200 bg-white/70">
                    <p className="font-semibold text-gray-800 mb-3">Plataforma</p>
                    <label className="flex items-center gap-3 text-gray-700 mb-2">
                      <input type="checkbox" checked={segmentFilters.ios} onChange={(e)=>setSegmentFilters(s=>({...s,ios:e.target.checked}))} />
                      iOS
                    </label>
                    <label className="flex items-center gap-3 text-gray-700">
                      <input type="checkbox" checked={segmentFilters.android} onChange={(e)=>setSegmentFilters(s=>({...s,android:e.target.checked}))} />
                      Android
                    </label>
                  </div>
                  <div className="p-4 rounded-2xl border-2 border-gray-200 bg-white/70 md:col-span-2">
                    <p className="font-semibold text-gray-800 mb-3">Mínimo de sesiones</p>
                    <input type="range" min="0" max="50" value={segmentFilters.minSessions} onChange={(e)=>setSegmentFilters(s=>({...s,minSessions: Number(e.target.value)}))} className="w-full" />
                    <div className="text-sm text-gray-600 mt-2">{segmentFilters.minSessions} sesiones</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={applySegmentation} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">Aplicar Segmentación</button>
                  <button onClick={()=>setSegmentFilters({activeUsers:true,inactiveUsers:false,ios:true,android:true,minSessions:0})} className="flex-1 bg-white/70 text-gray-700 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 transition-all">Restablecer</button>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button onClick={() => setActiveTab('create')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Programar nueva
                  </button>
                </div>
                <div className="space-y-3">
                  {notifications.filter(n=>n.status==='scheduled').length===0 && (
                    <div className="p-4 border-2 border-gray-200 rounded-2xl text-gray-600 bg-white/60">No hay notificaciones programadas.</div>
                  )}
                  {notifications.filter(n=>n.status==='scheduled').map(n=> (
                    <div key={n.id} className="p-4 border-2 border-gray-200 rounded-2xl bg-white/70 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{n.title}</p>
                        <p className="text-sm text-gray-600">Se enviará: {n.sentAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setScheduleAt(n.sentAt as any); setIsScheduleOpen(true); }} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-gray-300">Reprogramar</button>
                        <button onClick={() => { setNotifications(prev=>prev.map(x=>x.id===n.id?{...x,status:'sent',sentAt:new Date().toISOString().slice(0,10)}:x)); toast.success('Notificación enviada ahora'); }} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Enviar ahora</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stats.map((s, i)=> (
                    <div key={i} className="p-6 rounded-2xl border-2 border-gray-200 bg-white/70">
                      <p className="text-sm font-semibold text-gray-600 mb-1">{s.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-2">{s.value}</p>
                      <span className="text-sm font-medium text-green-600">{s.change}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl border-2 border-gray-200 bg-white/70">
                  <p className="font-semibold text-gray-800 mb-4">Tendencia de aperturas (mock)</p>
                  <div className="flex items-end gap-2 h-40">
                    {[12, 30, 24, 40, 36, 48, 32, 52, 44, 60].map((h, idx)=> (
                      <div key={idx} className="flex-1 bg-gradient-to-t from-indigo-200 to-indigo-500 rounded-t-xl" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Panel Lateral - Historial */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                </div>
                Historial Reciente
              </h2>
            </div>

            {/* Lista de Notificaciones */}
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{notification.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{notification.message}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEdit(notification.id)}
                        className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startDelete(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Estado y Métricas */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        notification.status === 'sent' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-xs font-medium text-gray-600 capitalize">{notification.status}</span>
                    </div>
                    
                    {notification.status === 'sent' && (
                      <div className="flex gap-3 text-xs">
                        <span className="text-green-600 font-medium">{notification.openRate}% abierto</span>
                        <span className="text-blue-600 font-medium">{notification.clickRate}% clics</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botón Ver Todas */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.history.pushState({}, '', '/historial-notificaciones');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold rounded-2xl border border-indigo-200 hover:border-indigo-300 transition-all duration-300"
            >
              Ver Todas las Notificaciones
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal Programar */}
      <Modal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} title="Programar notificación" size="md">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Fecha y hora</label>
            <input
              type="datetime-local"
              value={scheduleAt}
              onChange={(e) => setScheduleAt(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsScheduleOpen(false)}
              disabled={scheduleLoading}
              className="flex-1 bg-white/70 text-gray-700 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={confirmSchedule}
              disabled={scheduleLoading}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {scheduleLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Programar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Editar */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Editar notificación" size="md">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Título</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Mensaje</label>
            <textarea
              rows={4}
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsEditOpen(false)}
              className="flex-1 bg-white/70 text-gray-700 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={saveEdit}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Eliminar */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar notificación"
        message="Esta acción no se puede deshacer. ¿Deseas continuar?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default PersonalizacionPushPage;
