import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, User, Mail, Phone, Globe, Building2, Users, DollarSign,
  CheckCircle, Check, Calendar, MessageCircle, CreditCard, Send,
  Bell, Shield, Languages, Palette, PartyPopper, ArrowRight, X,
  Upload, Target, TrendingUp, Zap
} from 'lucide-react';

const AsistenteOnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    tipoDenegocio: '',
    numeroClientes: '',
    servicios: [] as string[],
    idioma: 'es',
    moneda: 'EUR',
    invitaciones: [] as { email: string; rol: string }[]
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = 5;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === totalSteps - 1) {
      setShowConfetti(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const paises = ['España', 'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 'Estados Unidos', 'Reino Unido'];
  const tiposNegocio = [
    { id: 'gym', label: 'Gimnasio', icon: Building2 },
    { id: 'personal', label: 'Entrenador Personal', icon: User },
    { id: 'nutricion', label: 'Nutricionista', icon: Target },
    { id: 'crossfit', label: 'Box/CrossFit', icon: Zap },
  ];

  const serviciosDisponibles = [
    'Entrenamiento Personal',
    'Clases Grupales',
    'Planes Nutricionales',
    'Evaluaciones Físicas',
    'Fisioterapia',
    'Yoga/Pilates'
  ];

  const toggleServicio = (servicio: string) => {
    setFormData(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="Juan Pérez"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="juan@ejemplo.com"
                />
              </motion.div>

              {/* Teléfono */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="+34 600 000 000"
                />
              </motion.div>

              {/* País */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  País
                </label>
                <select
                  value={formData.pais}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                >
                  <option value="">Selecciona tu país</option>
                  {paises.map(pais => (
                    <option key={pais} value={pais}>{pais}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Avatar Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border-2 border-dashed border-indigo-200"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {formData.nombre.charAt(0) || <Upload className="w-10 h-10" />}
              </div>
              <button className="px-6 py-2 bg-white rounded-full text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors duration-300 shadow-md">
                Subir Foto de Perfil
              </button>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Tipo de Negocio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Tipo de Negocio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tiposNegocio.map((tipo, index) => (
                  <motion.button
                    key={tipo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, tipoDenegocio: tipo.id })}
                    className={`relative overflow-hidden p-6 rounded-3xl border-2 transition-all duration-300 ${
                      formData.tipoDenegocio === tipo.id
                        ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl'
                        : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-indigo-300 shadow-lg'
                    }`}
                  >
                    {formData.tipoDenegocio === tipo.id && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        formData.tipoDenegocio === tipo.id
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <tipo.icon className="w-8 h-8" />
                      </div>
                      <span className="font-semibold text-gray-900">{tipo.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Número de Clientes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                <Users className="w-4 h-4 inline mr-2" />
                Número de Clientes Objetivo
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['0-50', '51-100', '101-300', '300+'].map((rango, index) => (
                  <motion.button
                    key={rango}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, numeroClientes: rango })}
                    className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      formData.numeroClientes === rango
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl'
                        : 'bg-white/80 border-2 border-gray-200 text-gray-700 hover:border-indigo-300'
                    }`}
                  >
                    {rango}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Servicios */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Servicios que Ofreces
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviciosDisponibles.map((servicio, index) => (
                  <motion.button
                    key={servicio}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleServicio(servicio)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      formData.servicios.includes(servicio)
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 shadow-lg'
                        : 'bg-white/80 border-2 border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      formData.servicios.includes(servicio)
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                        : 'bg-gray-200'
                    }`}>
                      {formData.servicios.includes(servicio) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className={`font-medium ${
                      formData.servicios.includes(servicio) ? 'text-emerald-900' : 'text-gray-700'
                    }`}>
                      {servicio}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Idioma y Moneda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Languages className="w-4 h-4 inline mr-2" />
                  Idioma
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'es', label: 'Español' },
                    { value: 'en', label: 'English' },
                    { value: 'fr', label: 'Français' }
                  ].map(idioma => (
                    <button
                      key={idioma.value}
                      onClick={() => setFormData({ ...formData, idioma: idioma.value })}
                      className={`w-full px-4 py-3 rounded-2xl text-left font-medium transition-all duration-300 ${
                        formData.idioma === idioma.value
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl'
                          : 'bg-white/80 border-2 border-gray-200 text-gray-700 hover:border-indigo-300'
                      }`}
                    >
                      {idioma.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Moneda
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'EUR', label: 'EUR (€)' },
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'GBP', label: 'GBP (£)' }
                  ].map(moneda => (
                    <button
                      key={moneda.value}
                      onClick={() => setFormData({ ...formData, moneda: moneda.value })}
                      className={`w-full px-4 py-3 rounded-2xl text-left font-medium transition-all duration-300 ${
                        formData.moneda === moneda.value
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl'
                          : 'bg-white/80 border-2 border-gray-200 text-gray-700 hover:border-indigo-300'
                      }`}
                    >
                      {moneda.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 border border-indigo-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">Preview de tu Dashboard</h3>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 space-y-3">
                <div className="h-4 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl"></div>
                  <div className="h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl"></div>
                  <div className="h-16 bg-gradient-to-br from-pink-100 to-indigo-100 rounded-xl"></div>
                </div>
              </div>
            </motion.div>

            {/* Notificaciones Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                <Bell className="w-4 h-4 inline mr-2" />
                Habilitar Notificaciones
              </label>
              <div className="space-y-3">
                {[
                  { id: 'email', label: 'Notificaciones por Email', icon: Mail },
                  { id: 'push', label: 'Notificaciones Push', icon: Bell },
                  { id: 'sms', label: 'Notificaciones SMS', icon: MessageCircle }
                ].map((notif, index) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <notif.icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="font-medium text-gray-700">{notif.label}</span>
                    </div>
                    <button className="w-12 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">Invita a tu Equipo</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Colabora mejor invitando a tu equipo. Puedes saltar este paso y hacerlo más tarde.
              </p>

              <div className="flex gap-3 mb-4">
                <input
                  type="email"
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="email@ejemplo.com"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Añadir
                </motion.button>
              </div>

              {/* Lista de roles */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Roles Disponibles</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { rol: 'Admin', color: 'from-purple-500 to-pink-500' },
                    { rol: 'Entrenador', color: 'from-blue-500 to-indigo-500' },
                    { rol: 'Recepcionista', color: 'from-emerald-500 to-teal-500' },
                    { rol: 'Nutricionista', color: 'from-orange-500 to-red-500' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.rol}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className={`px-4 py-2 bg-gradient-to-r ${item.color} text-white text-sm font-semibold rounded-full shadow-lg`}
                    >
                      {item.rol}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Integraciones */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Integraciones Populares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Google Calendar', icon: Calendar, color: 'from-blue-500 to-blue-600' },
                  { name: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-green-600' },
                  { name: 'Stripe', icon: CreditCard, color: 'from-purple-500 to-purple-600' },
                  { name: 'Zoom', icon: Users, color: 'from-indigo-500 to-indigo-600' }
                ].map((integration, index) => (
                  <motion.button
                    key={integration.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg`}>
                        <integration.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900">{integration.name}</p>
                        <p className="text-xs text-gray-500">Conectar más tarde</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full py-3 text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
            >
              Saltar por ahora →
            </motion.button>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            {/* Confetti Animation */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                    animate={{
                      y: window.innerHeight + 100,
                      rotate: Math.random() * 360,
                      opacity: 0
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      ease: "linear"
                    }}
                    className={`absolute w-3 h-3 rounded-full`}
                    style={{
                      background: ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6'][Math.floor(Math.random() * 4)]
                    }}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
              <PartyPopper className="w-16 h-16 text-white relative z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  ¡Felicidades!
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Tu plataforma está lista para empezar a transformar tu negocio
              </p>
            </motion.div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 max-w-md mx-auto border border-indigo-200"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                Configuración Completada
              </h3>
              <div className="space-y-3 text-left">
                {[
                  'Perfil personal configurado',
                  'Tipo de negocio seleccionado',
                  'Preferencias establecidas',
                  'Todo listo para empezar'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Próximos pasos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 max-w-md mx-auto border-2 border-gray-200"
            >
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Próximos Pasos</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: User, label: 'Añadir Clientes', color: 'from-blue-500 to-indigo-500' },
                  { icon: TrendingUp, label: 'Ver Dashboard', color: 'from-purple-500 to-pink-500' },
                  { icon: Target, label: 'Crear Rutinas', color: 'from-emerald-500 to-teal-500' },
                  { icon: Calendar, label: 'Agendar Citas', color: 'from-orange-500 to-red-500' }
                ].map((step, index) => (
                  <motion.button
                    key={step.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <step.icon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs font-semibold">{step.label}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
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

        {/* Skip button */}
        <button className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2 z-20">
          <X className="w-4 h-4" />
          Saltar onboarding
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Bienvenido a <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">FitnessHub</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Configuremos tu plataforma en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">5 pasos simples</span>
          </p>

          {/* Indicador de progreso */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Paso {currentStep} de {totalSteps}</span>
            </div>
            <div className="flex-1 max-w-xs bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-yellow-300 via-yellow-200 to-white rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Wizard Stepper */}
      <div className="max-w-5xl mx-auto mb-8 px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <React.Fragment key={step}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-2 relative"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    step < currentStep
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl'
                      : step === currentStep
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl ring-4 ring-indigo-200'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? <Check className="w-6 h-6" /> : step}
                  </div>
                  <span className={`text-xs font-semibold hidden md:block ${
                    step === currentStep ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {['Personal', 'Negocio', 'Config', 'Equipo', 'Listo'][step - 1]}
                  </span>
                </motion.div>
                {index < 4 && (
                  <div className={`flex-1 h-1 rounded-full mx-2 transition-all duration-500 ${
                    step < currentStep
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                      : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            {/* Step Title */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  {['Información Personal', 'Preferencias de Negocio', 'Configuración Inicial', 'Invitar Equipo', '¡Todo Listo!'][currentStep - 1]}
                </span>
              </h2>
              <p className="text-gray-600">
                {[
                  'Cuéntanos sobre ti para personalizar tu experiencia',
                  'Ayúdanos a entender tu negocio',
                  'Configura las preferencias básicas',
                  'Opcional: Invita a tu equipo a colaborar',
                  'Tu configuración está completa'
                ][currentStep - 1]}
              </p>
            </motion.div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation */}
            {currentStep < 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between mt-8 pt-8 border-t-2 border-gray-100"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-8 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                >
                  Anterior
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextStep}
                  className="relative overflow-hidden px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative z-10">Siguiente</span>
                  <ArrowRight className="w-5 h-5 relative z-10" />
                </motion.button>
              </motion.div>
            )}

            {/* Final Button */}
            {currentStep === 5 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Ir al Dashboard
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AsistenteOnboardingPage;