import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Store, CheckCircle, CreditCard, Truck, Calculator,
  ShoppingCart, Bell, Palette, Package, Globe, Mail, Phone,
  MapPin, Facebook, Instagram, Twitter, Upload, DollarSign,
  Zap, AlertCircle, Eye, Save, Tag, Calendar, FileText,
  Code, Lock, Shield, ArrowUpRight, Check, X
} from 'lucide-react';

const ConfiguracionTiendaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Estadísticas rápidas
  const stats = [
    {
      title: 'Estado de la Tienda',
      value: 'Activa',
      icon: Store,
      status: 'success',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/5 to-emerald-600/5'
    },
    {
      title: 'Métodos de Pago',
      value: '3/5',
      icon: CreditCard,
      status: 'warning',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/5 to-indigo-600/5'
    },
    {
      title: 'Zonas de Envío',
      value: '4',
      icon: Truck,
      status: 'success',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500/5 to-pink-600/5'
    },
    {
      title: 'Configuración',
      value: '78%',
      icon: CheckCircle,
      status: 'info',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/5 to-red-600/5'
    }
  ];

  // Tabs de navegación
  const tabs = [
    { id: 'general', label: 'General', icon: Settings, progress: 90 },
    { id: 'pagos', label: 'Pagos', icon: CreditCard, progress: 60 },
    { id: 'envios', label: 'Envíos', icon: Truck, progress: 75 },
    { id: 'impuestos', label: 'Impuestos', icon: Calculator, progress: 40 },
    { id: 'checkout', label: 'Checkout', icon: ShoppingCart, progress: 85 },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell, progress: 50 },
    { id: 'diseno', label: 'Diseño', icon: Palette, progress: 70 }
  ];

  // Checklist de completitud
  const checklist = [
    { label: 'Información general', completed: true },
    { label: 'Método de pago activo', completed: true },
    { label: 'Zona de envío configurada', completed: true },
    { label: 'Impuestos pendientes', completed: false },
    { label: 'Diseño personalizado', completed: true }
  ];

  const completionPercentage = Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Settings className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Configuración de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Tienda</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Personaliza la experiencia de compra de tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tienda online</span>
          </p>
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* NAVEGACIÓN POR TABS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
      >
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-xl scale-105'
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:shadow-lg hover:scale-105'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {tab.progress}%
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Contenido de tabs */}
        <div className="mt-6">
          {activeTab === 'general' && <TabGeneral />}
          {activeTab === 'pagos' && <TabPagos />}
          {activeTab === 'envios' && <TabEnvios />}
          {activeTab === 'impuestos' && <TabImpuestos />}
          {activeTab === 'checkout' && <TabCheckout />}
          {activeTab === 'notificaciones' && <TabNotificaciones />}
          {activeTab === 'diseno' && <TabDiseno />}
        </div>
      </motion.div>

      {/* ESTADO DE CONFIGURACIÓN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-purple-600" />
          Estado de Configuración
        </h3>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Completitud General</span>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-purple-100 rounded-full h-6 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {checklist.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                item.completed
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                  : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                item.completed
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                  : 'bg-gradient-to-br from-orange-500 to-red-600 text-white'
              }`}>
                {item.completed ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </div>
              <span className={`font-semibold ${
                item.completed ? 'text-green-700' : 'text-orange-700'
              }`}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// TAB: GENERAL
const TabGeneral: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Información básica */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <h4 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
          <Store className="w-6 h-6" />
          Información Básica
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Tienda</label>
            <input
              type="text"
              defaultValue="Mi Tienda Online"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subdominio</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue="mitienda"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
              />
              <span className="text-sm text-gray-600 font-medium">.miapp.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo y Favicon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Logo de la Tienda
          </h4>
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-3 text-blue-400" />
            <p className="text-sm text-gray-600">Click para subir PNG/SVG</p>
            <p className="text-xs text-gray-500 mt-1">Máx. 2MB</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Favicon
          </h4>
          <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-3 text-green-400" />
            <p className="text-sm text-gray-600">Click para subir .ico/.png</p>
            <p className="text-xs text-gray-500 mt-1">32x32 o 64x64 px</p>
          </div>
        </div>
      </div>

      {/* Contacto */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <h4 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
          <Mail className="w-6 h-6" />
          Información de Contacto
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email de Contacto
            </label>
            <input
              type="email"
              defaultValue="contacto@mitienda.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Teléfono
            </label>
            <input
              type="tel"
              defaultValue="+34 912 345 678"
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Dirección Física
            </label>
            <input
              type="text"
              defaultValue="Calle Principal 123, Madrid, España"
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
        <h4 className="text-xl font-bold text-pink-900 mb-4">Redes Sociales</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
              <Facebook className="w-5 h-5" />
            </div>
            <input
              type="url"
              placeholder="https://facebook.com/mitienda"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
              <Instagram className="w-5 h-5" />
            </div>
            <input
              type="url"
              placeholder="https://instagram.com/mitienda"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center text-white">
              <Twitter className="w-5 h-5" />
            </div>
            <input
              type="url"
              placeholder="https://twitter.com/mitienda"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Moneda e Idioma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
          <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Moneda
          </h4>
          <select className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none">
            <option>USD - Dólar Estadounidense ($)</option>
            <option>EUR - Euro (€)</option>
            <option>MXN - Peso Mexicano ($)</option>
            <option>GBP - Libra Esterlina (£)</option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
          <h4 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Idioma Principal
          </h4>
          <select className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none">
            <option>Español</option>
            <option>English</option>
            <option>Français</option>
            <option>Deutsch</option>
          </select>
        </div>
      </div>

      {/* Botón Guardar */}
      <button className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group">
        <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Guardar Cambios
      </button>
    </div>
  );
};

// TAB: PAGOS
const TabPagos: React.FC = () => {
  const metodoPagos = [
    { name: 'Stripe', connected: true, icon: CreditCard, color: 'from-blue-500 to-indigo-600' },
    { name: 'PayPal', connected: true, icon: DollarSign, color: 'from-blue-400 to-blue-600' },
    { name: 'Mercado Pago', connected: true, icon: Package, color: 'from-cyan-500 to-blue-600' },
    { name: 'Transferencia Bancaria', connected: false, icon: Mail, color: 'from-green-500 to-emerald-600' },
    { name: 'Pago Contra Entrega', connected: false, icon: Truck, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <h4 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <CreditCard className="w-7 h-7" />
          Métodos de Pago
        </h4>
        <p className="text-blue-700">Configura los métodos de pago disponibles para tus clientes</p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-blue-900">3 de 5 métodos activos</span>
        </div>
      </div>

      {/* Grid de métodos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metodoPagos.map((metodo, index) => {
          const Icon = metodo.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metodo.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{metodo.name}</h5>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mt-1 ${
                      metodo.connected
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {metodo.connected ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {metodo.connected ? 'Conectado' : 'No conectado'}
                    </div>
                  </div>
                </div>
              </div>

              {metodo.connected ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">API Key</label>
                    <input
                      type="password"
                      defaultValue="sk_test_••••••••••••••••"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm">
                      <option>Modo Test</option>
                      <option>Modo Producción</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600">
                      Test
                    </button>
                  </div>
                </div>
              ) : (
                <button className={`w-full py-3 bg-gradient-to-r ${metodo.color} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all`}>
                  Conectar {metodo.name}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// TAB: ENVÍOS
const TabEnvios: React.FC = () => {
  const zonas = [
    { name: 'España', paises: 1, tarifa: '€5.00', gratis: '€50', metodo: 'Correos' },
    { name: 'Unión Europea', paises: 27, tarifa: '€12.00', gratis: '€100', metodo: 'DHL' },
    { name: 'América Latina', paises: 20, tarifa: '€25.00', gratis: '€200', metodo: 'FedEx' },
    { name: 'Internacional', paises: 150, tarifa: '€35.00', gratis: '€300', metodo: 'UPS' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <h4 className="text-2xl font-bold text-purple-900 mb-2 flex items-center gap-2">
          <Truck className="w-7 h-7" />
          Zonas de Envío
        </h4>
        <p className="text-purple-700">Configura tarifas y métodos de envío por región</p>
      </div>

      {/* Tabla de zonas */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/50 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Zona</th>
                <th className="px-6 py-4 text-left font-bold">Países</th>
                <th className="px-6 py-4 text-left font-bold">Tarifa</th>
                <th className="px-6 py-4 text-left font-bold">Envío Gratis</th>
                <th className="px-6 py-4 text-left font-bold">Método</th>
                <th className="px-6 py-4 text-left font-bold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {zonas.map((zona, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-purple-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{zona.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full inline-block text-sm font-semibold">
                      {zona.paises} {zona.paises === 1 ? 'país' : 'países'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{zona.tarifa}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">desde {zona.gratis}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-medium">{zona.metodo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors">
                      Editar
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón agregar zona */}
      <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2">
        <Package className="w-5 h-5" />
        Agregar Nueva Zona de Envío
      </button>
    </div>
  );
};

// TAB: IMPUESTOS
const TabImpuestos: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <h4 className="text-2xl font-bold text-orange-900 mb-2 flex items-center gap-2">
          <Calculator className="w-7 h-7" />
          Configuración de Impuestos
        </h4>
        <p className="text-orange-700">Gestiona IVA, Sales Tax y otras tasas fiscales</p>
      </div>

      {/* Toggle principal */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-lg font-bold text-gray-900">Habilitar Cobro de Impuestos</h5>
            <p className="text-sm text-gray-600 mt-1">Activa el cálculo automático de impuestos</p>
          </div>
          <button className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
            <span className="inline-block h-6 w-6 transform translate-x-9 rounded-full bg-white transition-transform" />
          </button>
        </div>
      </div>

      {/* Configuración por región */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EU/IVA */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h5 className="text-lg font-bold text-blue-900 mb-4">Unión Europea (IVA)</h5>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Tasa IVA Estándar</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue="21"
                  className="w-24 px-3 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <span className="text-gray-700 font-semibold">%</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Tasa Reducida</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue="10"
                  className="w-24 px-3 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <span className="text-gray-700 font-semibold">%</span>
              </div>
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" defaultChecked />
                <span className="text-sm font-medium text-gray-700">Validación VIES</span>
              </label>
            </div>
          </div>
        </div>

        {/* USA/Sales Tax */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h5 className="text-lg font-bold text-green-900 mb-4">USA (Sales Tax)</h5>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Estados con Nexus</label>
              <select multiple className="w-full px-3 py-2 rounded-lg border-2 border-green-200 focus:border-green-500 h-24">
                <option>California (7.25%)</option>
                <option>New York (4%)</option>
                <option>Texas (6.25%)</option>
                <option>Florida (6%)</option>
              </select>
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded text-green-600" />
                <span className="text-sm font-medium text-gray-700">Integrar Tax Jar</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar precios */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <h5 className="text-lg font-bold text-purple-900 mb-4">Visualización de Precios</h5>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition-colors">
            <input type="radio" name="precio" className="w-5 h-5 text-purple-600" defaultChecked />
            <div>
              <div className="font-semibold text-gray-900">Impuestos Incluidos</div>
              <div className="text-sm text-gray-600">Mostrar precio final (ej: €100)</div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition-colors">
            <input type="radio" name="precio" className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-semibold text-gray-900">Sin Impuestos</div>
              <div className="text-sm text-gray-600">Se agregan en checkout (ej: €82.64 + IVA)</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

// TAB: CHECKOUT
const TabCheckout: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
        <h4 className="text-2xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
          <ShoppingCart className="w-7 h-7" />
          Proceso de Checkout
        </h4>
        <p className="text-indigo-700">Configura la experiencia de compra de tus clientes</p>
      </div>

      {/* Tipo de checkout */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
        <h5 className="text-lg font-bold text-gray-900 mb-4">Tipo de Checkout</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 cursor-pointer hover:border-blue-400 transition-colors">
            <input type="radio" name="checkout-type" className="w-5 h-5 text-blue-600 mt-1" defaultChecked />
            <div>
              <div className="font-bold text-gray-900">Single Page</div>
              <div className="text-sm text-gray-600 mt-1">Todo en una sola página - más rápido</div>
            </div>
          </label>
          <label className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition-colors">
            <input type="radio" name="checkout-type" className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <div className="font-bold text-gray-900">Multi-Step</div>
              <div className="text-sm text-gray-600 mt-1">Paso a paso - más guiado</div>
            </div>
          </label>
        </div>
      </div>

      {/* Campos requeridos */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
        <h5 className="text-lg font-bold text-green-900 mb-4">Campos Requeridos</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-green-600" defaultChecked disabled />
            <span className="font-medium text-gray-700">Email (obligatorio)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-green-600" defaultChecked />
            <span className="font-medium text-gray-700">Teléfono</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-green-600" />
            <span className="font-medium text-gray-700">Dirección línea 2</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-green-600" defaultChecked />
            <span className="font-medium text-gray-700">Nota del pedido</span>
          </label>
        </div>
      </div>

      {/* Opciones de cuenta */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <h5 className="text-lg font-bold text-orange-900 mb-4">Opciones de Cuenta</h5>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-orange-600" defaultChecked />
            <span className="font-medium text-gray-700">Permitir checkout como invitado</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-orange-600" defaultChecked />
            <span className="font-medium text-gray-700">Crear cuenta durante checkout</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-orange-600" />
            <span className="font-medium text-gray-700">Requerir login obligatorio</span>
          </label>
        </div>
      </div>

      {/* Descuentos y términos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
          <h5 className="text-lg font-bold text-pink-900 mb-4">Cupones y Descuentos</h5>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded text-pink-600" defaultChecked />
              <span className="font-medium text-gray-700">Habilitar campo de cupón</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded text-pink-600" defaultChecked />
              <span className="font-medium text-gray-700">Habilitar gift cards</span>
            </label>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <h5 className="text-lg font-bold text-blue-900 mb-4">Términos y Marketing</h5>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded text-blue-600" defaultChecked />
              <span className="font-medium text-gray-700">Checkbox T&C obligatorio</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded text-blue-600" defaultChecked />
              <span className="font-medium text-gray-700">Opt-in newsletter</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// TAB: NOTIFICACIONES
const TabNotificaciones: React.FC = () => {
  const emails = [
    { name: 'Confirmación de Pedido', to: 'Cliente', active: true, color: 'from-green-500 to-emerald-600' },
    { name: 'Envío/Tracking', to: 'Cliente', active: true, color: 'from-blue-500 to-indigo-600' },
    { name: 'Entrega Confirmada', to: 'Cliente', active: true, color: 'from-purple-500 to-pink-600' },
    { name: 'Nuevo Pedido', to: 'Admin', active: true, color: 'from-orange-500 to-red-600' },
    { name: 'Carrito Abandonado 24h', to: 'Cliente', active: false, color: 'from-yellow-500 to-orange-600' },
    { name: 'Review Post-Compra', to: 'Cliente', active: false, color: 'from-pink-500 to-purple-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <h4 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Bell className="w-7 h-7" />
          Notificaciones por Email
        </h4>
        <p className="text-blue-700">Configura emails automáticos para clientes y administradores</p>
      </div>

      {/* SMTP Config */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
        <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-purple-600" />
          Configuración SMTP
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Provider</label>
            <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100">
              <option>SendGrid</option>
              <option>Mailgun</option>
              <option>Amazon SES</option>
              <option>Custom SMTP</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">API Key</label>
            <input
              type="password"
              defaultValue="SG.••••••••••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">From Email</label>
            <input
              type="email"
              defaultValue="noreply@mitienda.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">From Name</label>
            <input
              type="text"
              defaultValue="Mi Tienda Online"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />
          </div>
        </div>
      </div>

      {/* Lista de emails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emails.map((email, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${email.color} flex items-center justify-center text-white shadow-lg`}>
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">{email.name}</h5>
                  <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold inline-block mt-1">
                    Para: {email.to}
                  </div>
                </div>
              </div>
              <button className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                email.active ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-300'
              }`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  email.active ? 'translate-x-8' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold rounded-lg hover:from-purple-200 hover:to-pink-200 transition-colors">
                Editar Template
              </button>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold rounded-lg hover:from-blue-200 hover:to-indigo-200 transition-colors">
                Enviar Prueba
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// TAB: DISEÑO
const TabDiseno: React.FC = () => {
  const temas = [
    { name: 'Minimal', preview: 'from-gray-100 to-gray-200' },
    { name: 'Vibrant', preview: 'from-purple-400 to-pink-500' },
    { name: 'Nature', preview: 'from-green-400 to-emerald-500' },
    { name: 'Ocean', preview: 'from-blue-400 to-cyan-500' },
    { name: 'Sunset', preview: 'from-orange-400 to-red-500' },
    { name: 'Professional', preview: 'from-indigo-900 to-blue-900' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
        <h4 className="text-2xl font-bold text-pink-900 mb-2 flex items-center gap-2">
          <Palette className="w-7 h-7" />
          Diseño de la Tienda
        </h4>
        <p className="text-pink-700">Personaliza el aspecto visual de tu tienda online</p>
      </div>

      {/* Temas */}
      <div>
        <h5 className="text-lg font-bold text-gray-900 mb-4">Temas Predefinidos</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {temas.map((tema, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${tema.preview} shadow-lg group-hover:shadow-2xl transition-all border-4 border-white`}>
                <div className="h-full p-2 flex flex-col">
                  <div className="flex-1"></div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center">
                    <span className="text-xs font-bold text-gray-900">{tema.name}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Colores */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
        <h5 className="text-lg font-bold text-gray-900 mb-4">Colores de Marca</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Color Primario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                defaultValue="#8B5CF6"
                className="w-16 h-16 rounded-xl cursor-pointer border-4 border-gray-200"
              />
              <input
                type="text"
                defaultValue="#8B5CF6"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Color Secundario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                defaultValue="#EC4899"
                className="w-16 h-16 rounded-xl cursor-pointer border-4 border-gray-200"
              />
              <input
                type="text"
                defaultValue="#EC4899"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Color de Acento</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                defaultValue="#F59E0B"
                className="w-16 h-16 rounded-xl cursor-pointer border-4 border-gray-200"
              />
              <input
                type="text"
                defaultValue="#F59E0B"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tipografía */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h5 className="text-lg font-bold text-blue-900 mb-4">Tipografía</h5>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Fuente de Encabezados</label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500">
                <option>Poppins (Bold)</option>
                <option>Montserrat (Bold)</option>
                <option>Playfair Display</option>
                <option>Inter (Bold)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Fuente de Cuerpo</label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500">
                <option>Inter (Regular)</option>
                <option>Open Sans</option>
                <option>Roboto</option>
                <option>Lato</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h5 className="text-lg font-bold text-green-900 mb-4">Layout</h5>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Ancho del Contenedor</label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500">
                <option>Boxed (1200px)</option>
                <option>Wide (1400px)</option>
                <option>Full Width</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Espaciado</label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500">
                <option>Normal</option>
                <option>Compact</option>
                <option>Spacious</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Preview de tienda */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            Vista Previa en Vivo
          </h5>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-300">
              📱 Móvil
            </button>
            <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
              💻 Desktop
            </button>
          </div>
        </div>
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-4 border-gray-300">
          <div className="text-center">
            <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 font-semibold">Preview de la tienda</p>
            <p className="text-sm text-gray-500">Los cambios se reflejan en tiempo real</p>
          </div>
        </div>
      </div>

      {/* Botón guardar y publicar */}
      <button className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group">
        <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Guardar y Publicar Cambios
      </button>
    </div>
  );
};

export default ConfiguracionTiendaPage;
