import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, TrendingUp, DollarSign, Target, Share2, Copy, Check,
  Gift, Award, Star, Download, Mail, MessageCircle, Facebook,
  Twitter, Linkedin, QrCode, Filter, FileDown, Clock,
  TrendingDown, CheckCircle, UserPlus, MousePointerClick,
  Zap, Trophy, Medal, Crown, Sparkles, Link, Image as ImageIcon,
  FileText, ChevronRight, ArrowUpRight, ArrowDownRight, Settings,
  ToggleLeft, ToggleRight, Save, Info, DollarSign as Dollar
} from 'lucide-react';
import {
  TrainerReferralSettings,
  getTrainerReferralSettings,
  updateTrainerReferralSettings
} from './referidosApi';

const ReferidosPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<TrainerReferralSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getTrainerReferralSettings('trainer1');
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      await updateTrainerReferralSettings('trainer1', settings);
      setSaveMessage('Configuración guardada correctamente');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error al guardar la configuración');
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = <K extends keyof TrainerReferralSettings>(
    key: K,
    value: TrainerReferralSettings[K]
  ) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  // Mock data para estadísticas
  const stats = [
    {
      title: 'Total Referidos',
      value: '47',
      change: '+23.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      progress: 78
    },
    {
      title: 'Conversiones',
      value: '32',
      change: '+18.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-600',
      progress: 68
    },
    {
      title: 'Comisiones Pagadas',
      value: '$2,450',
      change: '+31.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-pink-500 to-rose-600',
      progress: 85
    },
    {
      title: 'Tasa de Conversión',
      value: '68%',
      change: '+5.3%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-indigo-600',
      progress: 68
    }
  ];

  // Embudo de conversión
  const funnelData = [
    { stage: 'Clicks en Link', value: 250, percentage: 100, color: 'from-blue-500 to-blue-600' },
    { stage: 'Registros', value: 120, percentage: 48, color: 'from-indigo-500 to-indigo-600' },
    { stage: 'Activaciones', value: 75, percentage: 30, color: 'from-purple-500 to-purple-600' },
    { stage: 'Conversiones a Pago', value: 32, percentage: 13, color: 'from-pink-500 to-pink-600' }
  ];

  // Referidos mockeados (nombre del cliente que refiere y nombre del referido)
  const referidos = [
    { id: 1, clienteReferidor: 'María González', nombreReferido: 'Juan Pérez', emailReferido: 'juan@email.com', fecha: '2024-01-15', estado: 'Convertido', recompensa: '$50', canal: 'WhatsApp' },
    { id: 2, clienteReferidor: 'Pedro Sánchez', nombreReferido: 'Ana García', emailReferido: 'ana@email.com', fecha: '2024-01-18', estado: 'Activo', recompensa: '$50', canal: 'Email' },
    { id: 3, clienteReferidor: 'María González', nombreReferido: 'Carlos López', emailReferido: 'carlos@email.com', fecha: '2024-01-20', estado: 'Convertido', recompensa: '$50', canal: 'Facebook' },
    { id: 4, clienteReferidor: 'Laura Martínez', nombreReferido: 'María Rodríguez', emailReferido: 'maria@email.com', fecha: '2024-01-22', estado: 'Registrado', recompensa: '$0', canal: 'Twitter' },
    { id: 5, clienteReferidor: 'Pedro Sánchez', nombreReferido: 'Pedro Martínez', emailReferido: 'pedro@email.com', fecha: '2024-01-25', estado: 'Convertido', recompensa: '$50', canal: 'LinkedIn' },
    { id: 6, clienteReferidor: 'Carlos Ruiz', nombreReferido: 'Laura Sánchez', emailReferido: 'laura@email.com', fecha: '2024-01-28', estado: 'Activo', recompensa: '$50', canal: 'WhatsApp' },
    { id: 7, clienteReferidor: 'María González', nombreReferido: 'Diego Fernández', emailReferido: 'diego@email.com', fecha: '2024-02-01', estado: 'Convertido', recompensa: '$50', canal: 'Email' },
    { id: 8, clienteReferidor: 'Ana López', nombreReferido: 'Sofía Torres', emailReferido: 'sofia@email.com', fecha: '2024-02-03', estado: 'Registrado', recompensa: '$0', canal: 'Facebook' },
    { id: 9, clienteReferidor: 'Diego Torres', nombreReferido: 'Roberto Díaz', emailReferido: 'roberto@email.com', fecha: '2024-02-05', estado: 'Activo', recompensa: '$50', canal: 'Twitter' },
    { id: 10, clienteReferidor: 'Laura Martínez', nombreReferido: 'Carmen Ruiz', emailReferido: 'carmen@email.com', fecha: '2024-02-08', estado: 'Convertido', recompensa: '$50', canal: 'LinkedIn' },
  ];

  // Historial de comisiones pagadas a clientes
  const commissionHistory = [
    { id: 1, cliente: 'María González', fecha: '2024-02-01', monto: '$150', referidos: 3, estado: 'Pagado', metodo: 'Transferencia' },
    { id: 2, cliente: 'Pedro Sánchez', fecha: '2024-01-01', monto: '$100', referidos: 2, estado: 'Pagado', metodo: 'Descuento' },
    { id: 3, cliente: 'Laura Martínez', fecha: '2023-12-01', monto: '$100', referidos: 2, estado: 'Pagado', metodo: 'Transferencia' },
    { id: 4, cliente: 'Carlos Ruiz', fecha: '2023-11-01', monto: '$50', referidos: 1, estado: 'Pagado', metodo: 'Descuento' }
  ];

  // Ranking de top referidores (clientes que más han referido)
  const topReferrers = [
    { id: 1, nombre: 'María González', avatar: '🏆', referidos: 8, comisiones: '$400', nivel: 'Oro', badge: '👑' },
    { id: 2, nombre: 'Pedro Sánchez', avatar: '🥈', referidos: 7, comisiones: '$350', nivel: 'Oro', badge: '⭐' },
    { id: 3, nombre: 'Laura Martínez', avatar: '🥉', referidos: 6, comisiones: '$300', nivel: 'Plata', badge: '💎' },
    { id: 4, nombre: 'Carlos Ruiz', avatar: '👤', referidos: 4, comisiones: '$200', nivel: 'Plata', badge: '🌟' },
    { id: 5, nombre: 'Ana López', avatar: '👤', referidos: 3, comisiones: '$150', nivel: 'Plata', badge: '✨' },
    { id: 6, nombre: 'Diego Torres', avatar: '👤', referidos: 2, comisiones: '$100', nivel: 'Bronce', badge: '🔥' },
    { id: 7, nombre: 'Sofía Díaz', avatar: '👤', referidos: 2, comisiones: '$100', nivel: 'Bronce', badge: '⚡' },
    { id: 8, nombre: 'Roberto García', avatar: '👤', referidos: 1, comisiones: '$50', nivel: 'Bronce', badge: '💫' },
  ];

  // Materiales de marketing
  const marketingMaterials = [
    { id: 'banner1', nombre: 'Banner Cuadrado', tipo: 'Imagen', formato: '1080x1080', preview: '🖼️' },
    { id: 'banner2', nombre: 'Banner Horizontal', tipo: 'Imagen', formato: '1200x628', preview: '🖼️' },
    { id: 'story', nombre: 'Instagram Story', tipo: 'Imagen', formato: '1080x1920', preview: '📱' },
    { id: 'email', nombre: 'Template Email', tipo: 'HTML', formato: 'HTML/CSS', preview: '📧' },
    { id: 'texto', nombre: 'Textos Sugeridos', tipo: 'Texto', formato: 'TXT', preview: '📝' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, { bg: string; text: string; icon: any }> = {
      'Convertido': { bg: 'bg-emerald-100 text-emerald-700', text: 'Convertido', icon: CheckCircle },
      'Activo': { bg: 'bg-blue-100 text-blue-700', text: 'Activo', icon: Zap },
      'Registrado': { bg: 'bg-gray-100 text-gray-700', text: 'Registrado', icon: UserPlus }
    };
    const badge = badges[estado];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${badge.bg}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    );
  };

  const filteredReferidos = statusFilter === 'todos'
    ? referidos
    : referidos.filter(r => r.estado === statusFilter);

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Sistema de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Referidos</span>
                </h1>
                <p className="text-lg text-pink-100 mt-2">
                  Gestión de Referidos de tus Clientes
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/30 text-white transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Configuración</span>
            </button>
          </div>

          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed">
            Motiva a tus clientes para que <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">traigan nuevos clientes</span> y gestiona las recompensas
          </p>
        </div>
      </motion.div>

      {/* PANEL DE CONFIGURACIÓN DEL PROGRAMA DE REFERIDOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Configuración del Programa de Referidos</h3>
                <p className="text-purple-100 text-sm mt-1">Personaliza cómo funcionan los referidos para ti y tus clientes</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
            >
              <ChevronRight className={`w-6 h-6 text-white transition-transform ${showSettings ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="p-6 space-y-6">
            {/* Mensaje de guardado */}
            {saveMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${
                  saveMessage.includes('Error')
                    ? 'bg-red-50 border border-red-200 text-red-700'
                    : 'bg-green-50 border border-green-200 text-green-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <p className="font-semibold">{saveMessage}</p>
                </div>
              </motion.div>
            )}

            {/* Sección 1: Activación del Programa */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
              <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Activación del Programa
              </h4>

              <div className="space-y-4">
                {/* Activar programa para clientes */}
                <div className="flex items-start justify-between p-4 bg-white rounded-xl border border-purple-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-bold text-gray-900">Programa de Referidos para Clientes</h5>
                      {!settings.clientReferralEnabled && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                          Desactivado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Permite que tus clientes traigan nuevos clientes y ganen recompensas
                    </p>
                  </div>
                  <button
                    onClick={() => updateSetting('clientReferralEnabled', !settings.clientReferralEnabled)}
                    className={`flex-shrink-0 ml-4 p-2 rounded-xl transition-all duration-300 ${
                      settings.clientReferralEnabled
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {settings.clientReferralEnabled ? (
                      <ToggleRight className="w-8 h-8" />
                    ) : (
                      <ToggleLeft className="w-8 h-8" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sección 2: Comisiones para Clientes */}
            {settings.clientReferralEnabled && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Comisiones que Pagas a tus Clientes
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tipo de comisión para clientes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Comisión
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateSetting('clientCommissionType', 'percentage')}
                        className={`p-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                          settings.clientCommissionType === 'percentage'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        Porcentaje
                      </button>
                      <button
                        onClick={() => updateSetting('clientCommissionType', 'fixed')}
                        className={`p-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                          settings.clientCommissionType === 'fixed'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        Monto Fijo
                      </button>
                    </div>
                  </div>

                  {/* Valor de comisión para clientes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {settings.clientCommissionType === 'percentage' ? 'Porcentaje (%)' : 'Monto Fijo ($)'}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={settings.clientCommissionValue}
                        onChange={(e) => updateSetting('clientCommissionValue', Number(e.target.value))}
                        className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg font-bold"
                        min="0"
                        step={settings.clientCommissionType === 'percentage' ? '1' : '10'}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                        {settings.clientCommissionType === 'percentage' ? '%' : '$'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Límite de referidos por cliente */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Máximo de Referidos por Cliente (0 = Ilimitado)
                    </label>
                    <input
                      type="number"
                      value={settings.maxReferralsPerClient}
                      onChange={(e) => updateSetting('maxReferralsPerClient', Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg font-bold"
                      min="0"
                    />
                  </div>

                  {/* Auto-aprobar referidos */}
                  <div className="flex items-start justify-between p-4 bg-white rounded-xl border border-blue-200">
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 mb-1">Aprobar Automáticamente</h5>
                      <p className="text-sm text-gray-600">
                        Los referidos de tus clientes se aprueban sin tu intervención
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('autoApproveReferrals', !settings.autoApproveReferrals)}
                      className={`flex-shrink-0 ml-4 p-2 rounded-xl transition-all duration-300 ${
                        settings.autoApproveReferrals
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {settings.autoApproveReferrals ? (
                        <ToggleRight className="w-8 h-8" />
                      ) : (
                        <ToggleLeft className="w-8 h-8" />
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        {settings.clientCommissionType === 'percentage'
                          ? `Pagarás el ${settings.clientCommissionValue}% a tus clientes por cada referido convertido`
                          : `Pagarás $${settings.clientCommissionValue} a tus clientes por cada referido convertido`
                        }
                        {settings.maxReferralsPerClient > 0 &&
                          `, con un máximo de ${settings.maxReferralsPerClient} referidos por cliente`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botón de guardar */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Guardar Configuración
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Mostrar el resto del contenido solo si el programa está activado */}
      {!settings.clientReferralEnabled && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Programa de Referidos de Clientes Desactivado
            </h3>
            <p className="text-gray-600 mb-6">
              Activa el programa de referidos para que tus clientes puedan traer nuevos clientes y ganar recompensas.
            </p>
            <button
              onClick={() => setShowSettings(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
            >
              Activar Programa
            </button>
          </div>
        </div>
      )}

      {settings.clientReferralEnabled && (
        <>
      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
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
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono con progress circular */}
                <div className="relative w-16 h-16 mb-4">
                  {/* Progress circle */}
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - stat.progress / 100) }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white m-2`}>
                    <Icon className="w-6 h-6" />
                  </div>
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
                  <div className={`p-1 ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                    {stat.trend === 'up' ?
                      <ArrowUpRight className="w-4 h-4 text-green-600" /> :
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    }
                  </div>
                  <span className={`text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PROGRAMA DE REFERIDOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Gift className="w-6 h-6" />
            </div>
            Programa de Referidos
          </h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Beneficios para referidor */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-pink-500 rounded-xl">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-pink-900">Beneficios para ti</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-pink-800">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Gana <strong>$100</strong> por cada registro exitoso</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-pink-800">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Recibe <strong>$150 extra</strong> cuando convierten a pago</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-pink-800">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Bonos especiales por volumen</span>
                </li>
              </ul>
            </div>

            {/* Beneficios para referido */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-500 rounded-xl">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-purple-900">Beneficios para referidos</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-purple-800">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>20% de descuento</strong> en primer mes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-purple-800">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Acceso anticipado a nuevas funciones</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-purple-800">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Soporte prioritario durante 3 meses</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cómo funciona */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-600" />
              ¿Cómo funciona?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { num: '1', titulo: 'Comparte', desc: 'Envía tu código o link' },
                { num: '2', titulo: 'Registro', desc: 'El usuario se registra' },
                { num: '3', titulo: 'Activación', desc: 'Completa el onboarding' },
                { num: '4', titulo: 'Recompensa', desc: 'Recibe tu comisión' }
              ].map((paso, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {paso.num}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{paso.titulo}</p>
                    <p className="text-xs text-gray-600">{paso.desc}</p>
                  </div>
                  {idx < 3 && <ChevronRight className="w-5 h-5 text-gray-400 mt-2 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* EMBUDO DE CONVERSIÓN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              Embudo de Conversión
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {funnelData.map((stage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stage.color}`}></div>
                    <span className="text-sm font-semibold text-gray-700">{stage.stage}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{stage.value}</span>
                    <span className="text-xs text-gray-500 ml-2">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${stage.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
                {index < funnelData.length - 1 && (
                  <div className="flex items-center justify-center my-2">
                    <TrendingDown className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}

            {/* Tasa de conversión total */}
            <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-600 uppercase">Tasa de Conversión Total</p>
                  <p className="text-3xl font-bold text-purple-900">13%</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      {/* TABLA DE REFERIDOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="w-5 h-5" />
              </div>
              Tus Referidos
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-colors">
              <FileDown className="w-4 h-4" />
              <span className="text-sm font-semibold">Exportar</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Filtros */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Filtrar por estado:</span>
            {['todos', 'Convertido', 'Activo', 'Registrado'].map((estado) => (
              <button
                key={estado}
                onClick={() => setStatusFilter(estado)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  statusFilter === estado
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {estado === 'todos' ? 'Todos' : estado}
              </button>
            ))}
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Cliente Referidor</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Nuevo Cliente</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Fecha</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Estado</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Recompensa</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Canal</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferidos.map((referido, index) => (
                  <motion.tr
                    key={referido.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                  >
                    <td className="py-4 px-4">
                      <p className="font-semibold text-purple-600 text-sm">{referido.clienteReferidor}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900 text-sm">{referido.nombreReferido}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-600 text-sm">{referido.emailReferido}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-600 text-sm">{referido.fecha}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getEstadoBadge(referido.estado)}
                    </td>
                    <td className="py-4 px-4">
                      <p className={`font-bold text-sm ${referido.recompensa === '$0' ? 'text-gray-400' : 'text-green-600'}`}>
                        {referido.recompensa}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {referido.canal}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* PANEL DE COMISIONES Y RANKING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* PANEL DE COMISIONES */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <DollarSign className="w-5 h-5" />
              </div>
              Comisiones Pagadas a Clientes
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Resumen de comisiones pagadas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                <p className="text-xs font-semibold text-yellow-600 uppercase mb-1">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-900">$250</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <p className="text-xs font-semibold text-green-600 uppercase mb-1">Pagado</p>
                <p className="text-2xl font-bold text-green-900">$400</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Total</p>
                <p className="text-2xl font-bold text-blue-900">$650</p>
              </div>
            </div>

            {/* Historial de pagos - Timeline */}
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-4">Historial de Pagos</h4>
              <div className="space-y-4 relative">
                {/* Línea vertical */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 to-transparent"></div>

                {commissionHistory.map((pago, index) => (
                  <motion.div
                    key={pago.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4 relative"
                  >
                    {/* Punto en timeline */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg z-10">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-bold text-purple-600 text-sm">{pago.cliente}</p>
                          <p className="font-bold text-green-600 text-lg">{pago.monto}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          {pago.estado}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pago.fecha}
                        </span>
                        <div className="flex items-center gap-2">
                          <span>{pago.referidos} referidos</span>
                          <span>•</span>
                          <span className="font-semibold">{pago.metodo}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RANKING DE TOP REFERIDORES */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Trophy className="w-5 h-5" />
              </div>
              Top Clientes Referidores
            </h3>
          </div>

          <div className="p-6">
            {/* Podio - Top 3 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* 2do Lugar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 text-center border-2 border-gray-300"
              >
                <div className="text-4xl mb-2">{topReferrers[1].avatar}</div>
                <p className="text-xs font-bold text-gray-700 mb-1 truncate">{topReferrers[1].nombre}</p>
                <p className="text-lg font-bold text-gray-900">{topReferrers[1].referidos}</p>
                <p className="text-xs text-gray-600">referidos</p>
              </motion.div>

              {/* 1er Lugar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-4 text-center border-2 border-yellow-400 -mt-4"
              >
                <div className="text-5xl mb-2">{topReferrers[0].avatar}</div>
                <p className="text-xs font-bold text-yellow-800 mb-1 truncate">{topReferrers[0].nombre}</p>
                <p className="text-2xl font-bold text-yellow-900">{topReferrers[0].referidos}</p>
                <p className="text-xs text-yellow-700">referidos</p>
                <Crown className="w-6 h-6 text-yellow-600 mx-auto mt-2" />
              </motion.div>

              {/* 3er Lugar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-4 text-center border-2 border-orange-300"
              >
                <div className="text-4xl mb-2">{topReferrers[2].avatar}</div>
                <p className="text-xs font-bold text-orange-700 mb-1 truncate">{topReferrers[2].nombre}</p>
                <p className="text-lg font-bold text-orange-900">{topReferrers[2].referidos}</p>
                <p className="text-xs text-orange-600">referidos</p>
              </motion.div>
            </div>

            {/* Resto del ranking */}
            <div className="space-y-2">
              {topReferrers.slice(3).map((referrer, index) => (
                <motion.div
                  key={referrer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.05, duration: 0.3 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-200 border border-transparent hover:border-yellow-200"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-700 text-sm">
                    {index + 4}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{referrer.nombre}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{referrer.referidos} referidos</span>
                      <span className="font-bold text-green-600">{referrer.comisiones}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{referrer.badge}</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      referrer.nivel === 'Oro' ? 'bg-yellow-100 text-yellow-700' :
                      referrer.nivel === 'Plata' ? 'bg-gray-200 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {referrer.nivel}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* SISTEMA DE INCENTIVOS PARA CLIENTES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Award className="w-5 h-5" />
            </div>
            Sistema de Incentivos para Clientes
          </h3>
          <p className="text-purple-100 text-sm mt-2">Define los niveles de recompensas para motivar a tus clientes</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Niveles de recompensa */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-700 mb-3">Niveles de Recompensa</h4>
            {[
              { nivel: 'Bronce', referidos: '1-2 referidos', recompensa: '$50 c/u', badge: '🥉', color: 'from-orange-100 to-orange-200 border-orange-300' },
              { nivel: 'Plata', referidos: '3-5 referidos', recompensa: '$50 + Bono $25', badge: '🥈', color: 'from-gray-100 to-gray-200 border-gray-400' },
              { nivel: 'Oro', referidos: '6+ referidos', recompensa: '$50 + Bono $50', badge: '🏆', color: 'from-yellow-100 to-yellow-200 border-yellow-400' }
            ].map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 border-2 bg-gradient-to-br ${tier.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{tier.badge}</div>
                    <div>
                      <p className="font-bold text-gray-900">{tier.nivel}</p>
                      <p className="text-xs text-gray-600">{tier.referidos}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{tier.recompensa}</p>
                    <p className="text-xs text-gray-600">por referido</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Configuración actual */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Configuración Actual</p>
                <p className="text-sm text-gray-700">
                  {settings?.clientCommissionType === 'percentage'
                    ? `Pagas el ${settings.clientCommissionValue}% del valor de la membresía del nuevo cliente`
                    : `Pagas $${settings?.clientCommissionValue} fijos por cada nuevo cliente convertido`
                  }
                </p>
                {settings && settings.maxReferralsPerClient > 0 && (
                  <p className="text-xs text-gray-600 mt-2">
                    Máximo {settings.maxReferralsPerClient} referidos por cliente
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ideas para incentivar */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-pink-600" />
              <p className="font-bold text-pink-900">Ideas para Incentivar</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span>Ofrece descuentos en su próxima mensualidad</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span>Regala sesiones extras por alcanzar metas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span>Crea competencias mensuales con premios</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span>Reconocimiento público en redes sociales</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
        </>
      )}
    </div>
  );
};

export default ReferidosPage;
