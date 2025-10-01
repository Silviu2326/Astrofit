import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Camera, Save, Bell, Shield, 
  Palette, Globe, Database, Download, Upload, Eye, EyeOff, Lock,
  CheckCircle, AlertCircle, Settings, UserCircle, Building, CreditCard,
  Smartphone, Monitor, Wifi, Zap, Moon, Sun, Volume2, VolumeX, UserPlus,
  MessageSquare, BarChart
} from 'lucide-react';

interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  specialty: string;
  experience: number;
  certifications: string[];
  bio: string;
  profileImage: string;
  businessName: string;
  businessType: string;
  taxId: string;
  website: string;
}

interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    newClients: boolean;
    appointments: boolean;
    payments: boolean;
    reminders: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
    shareProgress: boolean;
    dataAnalytics: boolean;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: string;
    cloudSync: boolean;
  };
}

const ConfiguracionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'app' | 'notifications' | 'privacy' | 'backup'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estado del perfil del entrenador
  const [profile, setProfile] = useState<TrainerProfile>({
    id: '1',
    name: 'Juan Carlos Entrenador',
    email: 'juan@entrenador.com',
    phone: '+34 666 123 456',
    address: 'Calle del Fitness 123, Madrid, España',
    birthDate: '1985-06-15',
    specialty: 'Entrenamiento Personal y Nutrición',
    experience: 8,
    certifications: ['Certified Personal Trainer', 'Nutrition Specialist', 'CrossFit Level 2'],
    bio: 'Entrenador personal certificado con más de 8 años de experiencia ayudando a personas a alcanzar sus objetivos de fitness y bienestar.',
    profileImage: '',
    businessName: 'FitLife Studio',
    businessType: 'Gimnasio Personal',
    taxId: '12345678A',
    website: 'www.fitlifestudio.com'
  });

  // Estado de configuraciones de la app
  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'light',
    language: 'es',
    timezone: 'Europe/Madrid',
    dateFormat: 'DD/MM/YYYY',
    currency: 'EUR',
    notifications: {
      email: true,
      push: true,
      sms: false,
      newClients: true,
      appointments: true,
      payments: true,
      reminders: true
    },
    privacy: {
      showOnlineStatus: true,
      allowDirectMessages: true,
      shareProgress: false,
      dataAnalytics: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      cloudSync: true
    }
  });

  const tabs = [
    { id: 'profile', label: 'Perfil Personal', icon: User },
    { id: 'business', label: 'Negocio', icon: Building },
    { id: 'app', label: 'Aplicación', icon: Settings },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'privacy', label: 'Privacidad', icon: Shield },
    { id: 'backup', label: 'Respaldo', icon: Database }
  ];

  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar los datos
    console.log('Guardando configuración...', { profile, appSettings });
    setIsEditing(false);
    // Mostrar notificación de éxito
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, profileImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
              <p className="text-gray-600">Gestiona tu perfil, preferencias y configuraciones de la aplicación</p>
            </div>
            <div className="flex items-center gap-4">
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors duration-200"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isEditing 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg'
                }`}
              >
                {isEditing ? <Save className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                {isEditing ? 'Guardar Cambios' : 'Editar'}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de navegación */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Secciones</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Contenido principal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
              {/* Perfil Personal */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Perfil Personal</h2>
                  </div>

                  {/* Foto de perfil */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                        {profile.profileImage ? (
                          <img src={profile.profileImage} alt="Profile" className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          profile.name.charAt(0)
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <Camera className="w-4 h-4 text-gray-600" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                      <p className="text-gray-600">{profile.specialty}</p>
                      <p className="text-sm text-gray-500">{profile.experience} años de experiencia</p>
                    </div>
                  </div>

                  {/* Información personal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de nacimiento</label>
                      <input
                        type="date"
                        value={profile.birthDate}
                        onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección</label>
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidad</label>
                      <input
                        type="text"
                        value={profile.specialty}
                        onChange={(e) => setProfile(prev => ({ ...prev, specialty: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Años de experiencia</label>
                      <input
                        type="number"
                        value={profile.experience}
                        onChange={(e) => setProfile(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sitio web</label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Biografía</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Certificaciones */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Certificaciones</label>
                    <div className="space-y-2">
                      {profile.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{cert}</span>
                          {isEditing && (
                            <button
                              onClick={() => setProfile(prev => ({
                                ...prev,
                                certifications: prev.certifications.filter((_, i) => i !== index)
                              }))}
                              className="ml-auto text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
                          + Agregar certificación
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Información del Negocio */}
              {activeTab === 'business' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Información del Negocio</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del negocio</label>
                      <input
                        type="text"
                        value={profile.businessName}
                        onChange={(e) => setProfile(prev => ({ ...prev, businessName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de negocio</label>
                      <select
                        value={profile.businessType}
                        onChange={(e) => setProfile(prev => ({ ...prev, businessType: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="Gimnasio Personal">Gimnasio Personal</option>
                        <option value="Estudio de Fitness">Estudio de Fitness</option>
                        <option value="Centro de Wellness">Centro de Wellness</option>
                        <option value="Clínica de Nutrición">Clínica de Nutrición</option>
                        <option value="Online">Servicios Online</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">NIF/CIF</label>
                      <input
                        type="text"
                        value={profile.taxId}
                        onChange={(e) => setProfile(prev => ({ ...prev, taxId: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sitio web del negocio</label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Métodos de pago */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Métodos de Pago Aceptados</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Efectivo', 'Tarjeta', 'Transferencia', 'Bizum'].map((method) => (
                        <label key={method} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Configuraciones de la Aplicación */}
              {activeTab === 'app' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Configuraciones de la Aplicación</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tema</label>
                      <select
                        value={appSettings.theme}
                        onChange={(e) => setAppSettings(prev => ({ ...prev, theme: e.target.value as any }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                        <option value="auto">Automático</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Idioma</label>
                      <select
                        value={appSettings.language}
                        onChange={(e) => setAppSettings(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Zona horaria</label>
                      <select
                        value={appSettings.timezone}
                        onChange={(e) => setAppSettings(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Europe/Madrid">Madrid (GMT+1)</option>
                        <option value="Europe/London">Londres (GMT+0)</option>
                        <option value="America/New_York">Nueva York (GMT-5)</option>
                        <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Formato de fecha</label>
                      <select
                        value={appSettings.dateFormat}
                        onChange={(e) => setAppSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Moneda</label>
                      <select
                        value={appSettings.currency}
                        onChange={(e) => setAppSettings(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dólar ($)</option>
                        <option value="GBP">Libra (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notificaciones */}
              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Configuración de Notificaciones</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Canales de notificación</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-700">Notificaciones por email</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.notifications.email}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, email: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">Notificaciones push</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.notifications.push}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, push: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-purple-500" />
                            <span className="text-gray-700">Notificaciones SMS</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.notifications.sms}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, sms: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Tipos de notificaciones</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <UserPlus className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-700">Nuevos clientes</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.notifications.newClients}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, newClients: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">Recordatorios de citas</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.notifications.appointments}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, appointments: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-emerald-500" />
                            <span className="text-gray-700">Pagos recibidos</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.notifications.payments}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, payments: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-orange-500" />
                            <span className="text-gray-700">Recordatorios generales</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.notifications.reminders}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, reminders: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacidad */}
              {activeTab === 'privacy' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Privacidad y Seguridad</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración de privacidad</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Eye className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">Mostrar estado en línea</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.privacy.showOnlineStatus}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, showOnlineStatus: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-700">Permitir mensajes directos</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.privacy.allowDirectMessages}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, allowDirectMessages: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <BarChart className="w-5 h-5 text-purple-500" />
                            <span className="text-gray-700">Compartir progreso con clientes</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.privacy.shareProgress}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, shareProgress: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Database className="w-5 h-5 text-orange-500" />
                            <span className="text-gray-700">Permitir análisis de datos</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.privacy.dataAnalytics}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, dataAnalytics: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Seguridad de la cuenta</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700 font-medium">Cambiar contraseña</span>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                              Cambiar
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">Última actualización: hace 3 meses</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700 font-medium">Autenticación de dos factores</span>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                              Activar
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">Añade una capa extra de seguridad</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Respaldo */}
              {activeTab === 'backup' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Respaldo y Sincronización</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración de respaldo</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Database className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-700">Respaldo automático</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.backup.autoBackup}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              backup: { ...prev.backup, autoBackup: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Frecuencia de respaldo</label>
                          <select
                            value={appSettings.backup.backupFrequency}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              backup: { ...prev.backup, backupFrequency: e.target.value }
                            }))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="daily">Diario</option>
                            <option value="weekly">Semanal</option>
                            <option value="monthly">Mensual</option>
                          </select>
                        </div>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Wifi className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">Sincronización en la nube</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={appSettings.backup.cloudSync}
                            onChange={(e) => setAppSettings(prev => ({
                              ...prev,
                              backup: { ...prev.backup, cloudSync: e.target.checked }
                            }))}
                            className="w-4 h-4 text-blue-600"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones de respaldo</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                          <Download className="w-5 h-5 text-blue-500" />
                          <span className="text-gray-700">Descargar respaldo</span>
                        </button>
                        <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                          <Upload className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">Restaurar respaldo</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">Información importante</h4>
                          <p className="text-sm text-blue-700">
                            Los respaldos incluyen todos tus datos: clientes, entrenamientos, dietas, pagos y configuraciones. 
                            Se recomienda hacer respaldos regulares para proteger tu información.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;
