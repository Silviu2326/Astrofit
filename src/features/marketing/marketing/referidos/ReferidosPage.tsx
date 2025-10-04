import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, TrendingUp, DollarSign, Target, Share2, Copy, Check,
  Gift, Award, Star, Download, Mail, MessageCircle, Facebook,
  Twitter, Linkedin, QrCode, Filter, FileDown, Clock,
  TrendingDown, CheckCircle, UserPlus, MousePointerClick,
  Zap, Trophy, Medal, Crown, Sparkles, Link, Image as ImageIcon,
  FileText, ChevronRight, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const ReferidosPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('banner1');

  // Código de referido del usuario
  const referralCode = 'MARIA2024';
  const referralLink = `https://app.miempresa.com/registro?ref=${referralCode}`;

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
      title: 'Comisiones Ganadas',
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

  // Referidos mockeados
  const referidos = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', fecha: '2024-01-15', estado: 'Convertido', recompensa: '$150', canal: 'WhatsApp' },
    { id: 2, nombre: 'Ana García', email: 'ana@email.com', fecha: '2024-01-18', estado: 'Activo', recompensa: '$100', canal: 'Email' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@email.com', fecha: '2024-01-20', estado: 'Convertido', recompensa: '$150', canal: 'Facebook' },
    { id: 4, nombre: 'María Rodríguez', email: 'maria@email.com', fecha: '2024-01-22', estado: 'Registrado', recompensa: '$0', canal: 'Twitter' },
    { id: 5, nombre: 'Pedro Martínez', email: 'pedro@email.com', fecha: '2024-01-25', estado: 'Convertido', recompensa: '$150', canal: 'LinkedIn' },
    { id: 6, nombre: 'Laura Sánchez', email: 'laura@email.com', fecha: '2024-01-28', estado: 'Activo', recompensa: '$100', canal: 'WhatsApp' },
    { id: 7, nombre: 'Diego Fernández', email: 'diego@email.com', fecha: '2024-02-01', estado: 'Convertido', recompensa: '$150', canal: 'Email' },
    { id: 8, nombre: 'Sofía Torres', email: 'sofia@email.com', fecha: '2024-02-03', estado: 'Registrado', recompensa: '$0', canal: 'Facebook' },
    { id: 9, nombre: 'Roberto Díaz', email: 'roberto@email.com', fecha: '2024-02-05', estado: 'Activo', recompensa: '$100', canal: 'Twitter' },
    { id: 10, nombre: 'Carmen Ruiz', email: 'carmen@email.com', fecha: '2024-02-08', estado: 'Convertido', recompensa: '$150', canal: 'LinkedIn' },
  ];

  // Historial de comisiones
  const commissionHistory = [
    { id: 1, fecha: '2024-02-01', monto: '$450', estado: 'Pagado', metodo: 'Transferencia' },
    { id: 2, fecha: '2024-01-01', monto: '$380', estado: 'Pagado', metodo: 'PayPal' },
    { id: 3, fecha: '2023-12-01', monto: '$520', estado: 'Pagado', metodo: 'Transferencia' },
    { id: 4, fecha: '2023-11-01', monto: '$300', estado: 'Pagado', metodo: 'PayPal' }
  ];

  // Ranking de top referidores
  const topReferrers = [
    { id: 1, nombre: 'María González', avatar: '🏆', referidos: 85, comisiones: '$8,500', nivel: 'Oro', badge: '👑' },
    { id: 2, nombre: 'Pedro Sánchez', avatar: '🥈', referidos: 72, comisiones: '$7,200', nivel: 'Oro', badge: '⭐' },
    { id: 3, nombre: 'Laura Martínez', avatar: '🥉', referidos: 65, comisiones: '$6,500', nivel: 'Plata', badge: '💎' },
    { id: 4, nombre: 'Carlos Ruiz', avatar: '👤', referidos: 47, comisiones: '$4,700', nivel: 'Plata', badge: '🌟' },
    { id: 5, nombre: 'Ana López', avatar: '👤', referidos: 38, comisiones: '$3,800', nivel: 'Plata', badge: '✨' },
    { id: 6, nombre: 'Diego Torres', avatar: '👤', referidos: 29, comisiones: '$2,900', nivel: 'Bronce', badge: '🔥' },
    { id: 7, nombre: 'Sofía Díaz', avatar: '👤', referidos: 24, comisiones: '$2,400', nivel: 'Bronce', badge: '⚡' },
    { id: 8, nombre: 'Roberto García', avatar: '👤', referidos: 18, comisiones: '$1,800', nivel: 'Bronce', badge: '💫' },
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Share2 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Sistema de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Referidos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed mb-8">
            Convierte a tus clientes en embajadores y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">gana comisiones</span> por cada nuevo usuario
          </p>

          {/* Código de referido destacado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 max-w-2xl"
          >
            <p className="text-sm font-semibold text-pink-100 mb-2">TU CÓDIGO DE REFERIDO</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 font-mono text-2xl font-bold text-pink-600">
                {referralCode}
              </div>
              <button
                onClick={() => copyToClipboard(referralCode)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors duration-200"
              >
                {copied ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6 text-pink-600" />}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

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

      {/* GENERADOR DE LINKS Y EMBUDO DE CONVERSIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* GENERADOR DE LINKS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
                <Link className="w-5 h-5" />
              </div>
              Generador de Links
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {/* Link personalizado */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tu link de referido</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-purple-900">Código QR</p>
                <button className="text-xs font-bold text-purple-600 hover:text-purple-700">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-400" />
              </div>
            </div>

            {/* Compartir */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Compartir en:</p>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">WhatsApp</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-semibold">Email</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                  <span className="text-xs font-semibold">Facebook</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span className="text-xs font-semibold">Twitter</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-xs font-semibold">LinkedIn</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs font-semibold">Más</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EMBUDO DE CONVERSIÓN */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
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
      </div>

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
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase">Nombre</th>
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
                      <p className="font-semibold text-gray-900 text-sm">{referido.nombre}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-600 text-sm">{referido.email}</p>
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
              Panel de Comisiones
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Resumen de ganancias */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                <p className="text-xs font-semibold text-yellow-600 uppercase mb-1">Pendiente</p>
                <p className="text-2xl font-bold text-yellow-900">$650</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <p className="text-xs font-semibold text-green-600 uppercase mb-1">Pagado</p>
                <p className="text-2xl font-bold text-green-900">$1,650</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Próximo Pago</p>
                <p className="text-sm font-bold text-blue-900">15 Mar</p>
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
                        <p className="font-bold text-green-600 text-lg">{pago.monto}</p>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          {pago.estado}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pago.fecha}
                        </span>
                        <span className="font-semibold">{pago.metodo}</span>
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
              Top Referidores
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

      {/* MATERIALES DE MARKETING E INCENTIVOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MATERIALES DE MARKETING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <ImageIcon className="w-5 h-5" />
              </div>
              Materiales de Marketing
            </h3>
          </div>

          <div className="p-6">
            {/* Lista de materiales */}
            <div className="space-y-3 mb-4">
              {marketingMaterials.map((material) => (
                <div
                  key={material.id}
                  onClick={() => setSelectedMaterial(material.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedMaterial === material.id
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-4xl">{material.preview}</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{material.nombre}</p>
                    <p className="text-xs text-gray-600">{material.tipo} • {material.formato}</p>
                  </div>
                  <button className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Preview del material seleccionado */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <p className="text-xs font-bold text-purple-600 uppercase mb-3">Preview</p>
              <div className="bg-white rounded-xl p-8 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Vista previa del material</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SISTEMA DE INCENTIVOS Y RECOMPENSAS */}
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
              Incentivos y Recompensas
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {/* Progreso actual */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-bold text-indigo-600 uppercase">Tu Nivel Actual</p>
                  <p className="text-2xl font-bold text-indigo-900">Plata 🥈</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Progreso a Oro</p>
                  <p className="text-lg font-bold text-indigo-900">47 / 50</p>
                </div>
              </div>
              <div className="w-full bg-indigo-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '94%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
              <p className="text-xs text-gray-600 mt-2">¡Solo 3 referidos más para nivel Oro! 🎉</p>
            </div>

            {/* Niveles escalonados */}
            <div className="space-y-3">
              {[
                { nivel: 'Bronce', referidos: '1-5', comision: '5%', badge: '🥉', color: 'from-orange-100 to-orange-200 border-orange-300', active: false },
                { nivel: 'Plata', referidos: '6-15', comision: '10%', badge: '🥈', color: 'from-gray-100 to-gray-200 border-gray-400', active: true },
                { nivel: 'Oro', referidos: '16+', comision: '15%', badge: '🏆', color: 'from-yellow-100 to-yellow-200 border-yellow-400', active: false }
              ].map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 border-2 bg-gradient-to-br ${tier.color} ${
                    tier.active ? 'ring-4 ring-purple-300 shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{tier.badge}</div>
                      <div>
                        <p className="font-bold text-gray-900">{tier.nivel}</p>
                        <p className="text-xs text-gray-600">{tier.referidos} referidos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{tier.comision}</p>
                      <p className="text-xs text-gray-600">comisión</p>
                    </div>
                    {tier.active && (
                      <div className="absolute top-2 right-2">
                        <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold">
                          Actual
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desafío mensual */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-pink-600" />
                <p className="font-bold text-pink-900">Desafío de Marzo</p>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Refiere 10 nuevos usuarios este mes y gana <strong className="text-pink-600">$500 de bonus</strong>
              </p>
              <div className="w-full bg-pink-200 rounded-full h-2 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full"
                />
              </div>
              <p className="text-xs text-gray-600">7 de 10 completados</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferidosPage;
