import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  CheckCircle2,
  Shield,
  TrendingUp,
  Clock,
  Copy,
  Plus,
  ExternalLink,
  AlertCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import ConfiguradorDominio from './components/ConfiguradorDominio';
import EstadoDominio from './components/EstadoDominio';
import GuiaPasoAPaso from './components/GuiaPasoAPaso';

const PersonalizacionDominioPage: React.FC = () => {
  // Estado del dominio
  const [domainStatus] = useState<'active' | 'pending' | 'error'>('pending');
  const [customDomain] = useState('entrenaconana.com');
  const [sslActive] = useState(true);
  const [visitsThisMonth] = useState(12584);
  const [uptime] = useState(99.9);

  // Subdominios configurados
  const [subdominios] = useState([
    { name: 'app', purpose: 'Aplicación principal', status: 'active' },
    { name: 'blog', purpose: 'Blog corporativo', status: 'active' },
    { name: 'api', purpose: 'API REST', status: 'pending' }
  ]);

  // DNS Records
  const dnsRecords = [
    { type: 'A', name: '@', value: '185.199.108.153', ttl: '3600' },
    { type: 'CNAME', name: 'www', value: 'micrositio.com', ttl: '3600' }
  ];

  // Copiar al portapapeles
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Estadísticas rápidas
  const stats = [
    {
      icon: Globe,
      title: 'Estado del Dominio',
      value: domainStatus === 'active' ? 'Activo' : domainStatus === 'pending' ? 'Pendiente' : 'Error',
      color: domainStatus === 'active' ? 'from-green-500 to-emerald-600' : domainStatus === 'pending' ? 'from-orange-500 to-yellow-600' : 'from-red-500 to-pink-600',
      bgColor: domainStatus === 'active' ? 'from-green-50 to-emerald-50' : 'from-orange-50 to-yellow-50'
    },
    {
      icon: Shield,
      title: 'SSL Activo',
      value: sslActive ? 'Habilitado' : 'Deshabilitado',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      icon: TrendingUp,
      title: 'Visitas Este Mes',
      value: visitsThisMonth.toLocaleString(),
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Clock,
      title: 'Uptime',
      value: `${uptime}%`,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50'
    }
  ];

  // Checklist de configuración
  const configSteps = [
    { title: 'Dominio verificado', completed: true, progress: 100 },
    { title: 'DNS configurado', completed: true, progress: 100 },
    { title: 'SSL activo', completed: true, progress: 100 },
    { title: 'Propagación DNS', completed: false, progress: 65, timeRemaining: '2h 15min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Globe className="w-10 h-10 text-blue-200 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-blue-200 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Dominio <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">Personalizado</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Tu marca, tu dominio. Personaliza completamente tu presencia online con{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">white-labeling completo</span>
          </p>

          {/* Badge de dominio actual */}
          {customDomain && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Globe className="w-5 h-5 text-blue-200" />
              <span className="text-sm font-semibold text-white">{customDomain}</span>
              <ExternalLink className="w-4 h-4 text-blue-200 cursor-pointer hover:text-white transition-colors" />
            </div>
          )}
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
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
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CONFIGURADOR DE DOMINIO + ESTADO DE CONFIGURACIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Configurador */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ConfiguradorDominio />
        </motion.div>

        {/* Estado de Configuración con Checklist */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Header gradiente */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-7 h-7 text-indigo-600" />
            Estado de Configuración
          </h2>

          {/* Checklist de pasos */}
          <div className="space-y-4 mb-6">
            {configSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Icono de estado */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-500' : 'bg-orange-500'
                }`}>
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{step.title}</p>
                    {!step.completed && step.timeRemaining && (
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        {step.timeRemaining} restantes
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full ${
                        step.completed
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                          : 'bg-gradient-to-r from-orange-500 to-yellow-600'
                      } rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Alerta informativa */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Propagación DNS en curso</p>
                <p className="text-xs text-blue-700">Los cambios DNS pueden tardar hasta 48 horas en propagarse completamente.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* DNS RECORDS + GUÍA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* DNS Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Globe className="w-7 h-7 text-purple-600" />
            Registros DNS
          </h2>

          <div className="space-y-3">
            {dnsRecords.map((record, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                    {record.type}
                  </span>
                  <button
                    onClick={() => copyToClipboard(record.value)}
                    className="p-2 hover:bg-purple-100 rounded-xl transition-colors group"
                  >
                    <Copy className="w-4 h-4 text-purple-600 group-hover:text-purple-700" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600 text-xs font-medium">Nombre</p>
                    <p className="font-mono font-semibold text-gray-900">{record.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-medium">TTL</p>
                    <p className="font-mono font-semibold text-gray-900">{record.ttl}s</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 text-xs font-medium">Valor</p>
                    <p className="font-mono font-semibold text-gray-900 break-all">{record.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Guía Paso a Paso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <GuiaPasoAPaso />
        </motion.div>
      </div>

      {/* GESTIÓN DE SUBDOMINIOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-7 h-7 text-teal-600" />
            Gestión de Subdominios
          </h2>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Agregar Subdominio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subdominios.map((sub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900">{sub.name}</h3>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  sub.status === 'active'
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white'
                }`}>
                  {sub.status === 'active' ? 'Activo' : 'Pendiente'}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{sub.purpose}</p>
              <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                Configurar
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SSL Y SEGURIDAD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Shield className="w-7 h-7" />
            </div>
            SSL y Seguridad
          </h2>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SSL Status */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase">Certificado SSL</p>
                  <p className="text-lg font-bold text-green-700">Activo y Válido</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">Válido hasta: 15 Mar 2026</p>
            </div>

            {/* Auto-renovación */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase">Auto-renovación</p>
                  <p className="text-lg font-bold text-blue-700">Configurada</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">Próxima renovación: 14 Feb 2026</p>
            </div>
          </div>

          {/* Opciones de seguridad */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">HTTPS Forzado</span>
              </div>
              <span className="text-sm font-medium text-green-600">Habilitado</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">HSTS</span>
              </div>
              <span className="text-sm font-medium text-green-600">Habilitado</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalizacionDominioPage;
