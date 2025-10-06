import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Award,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  plan?: string;
  role?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  createdAt?: string;
}

export const PerfilPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        setFormData(user);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const formatPlanName = (plan?: string) => {
    if (!plan) return 'Plan Core';

    const planNames: { [key: string]: string } = {
      'core': 'Plan Core',
      'plansolo-pro': 'Plan Solo Pro',
      'plansolo-max': 'Plan Solo Max',
      'plancreator-pro': 'Plan Creator Pro',
      'plancreator-max': 'Plan Creator Max',
      'planstudio-pro': 'Plan Studio Pro',
      'planstudio-max': 'Plan Studio Max',
      'planteams-pro': 'Plan Teams Pro',
      'planteams-elite': 'Plan Teams Elite'
    };

    return planNames[plan] || plan;
  };

  const getPlanColor = (plan?: string) => {
    const planColors: { [key: string]: string } = {
      'core': 'from-gray-500 to-gray-600',
      'plansolo-pro': 'from-blue-500 to-indigo-600',
      'plansolo-max': 'from-purple-500 to-pink-600',
      'plancreator-pro': 'from-emerald-500 to-teal-600',
      'plancreator-max': 'from-orange-500 to-red-600',
      'planstudio-pro': 'from-cyan-500 to-blue-600',
      'planstudio-max': 'from-violet-500 to-purple-600',
      'planteams-pro': 'from-rose-500 to-pink-600',
      'planteams-elite': 'from-yellow-500 to-orange-600'
    };

    return planColors[plan || 'core'] || 'from-indigo-500 to-purple-600';
  };

  const handleSave = () => {
    // Save to localStorage
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setIsEditing(false);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData(currentUser || {});
    setIsEditing(false);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden bg-gradient-to-r ${getPlanColor(currentUser?.plan)} rounded-3xl shadow-2xl mb-8 p-8 md:p-12`}
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Mi <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Perfil</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona tu información personal y preferencias
          </p>
        </div>
      </motion.div>

      {/* Success message */}
      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-2xl flex items-start gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-800">Cambios guardados</p>
            <p className="text-sm text-green-600">Tu perfil ha sido actualizado correctamente</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getPlanColor(currentUser?.plan)} flex items-center justify-center text-white font-bold text-4xl shadow-xl`}>
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    getInitials(currentUser?.name || currentUser?.email)
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {currentUser?.name || 'Usuario'}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{currentUser?.email}</p>

              {/* Plan Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getPlanColor(currentUser?.plan)} rounded-full shadow-lg mb-6`}>
                <Award className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">{formatPlanName(currentUser?.plan)}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-600 font-semibold">Clientes</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-600 font-semibold">Rutinas</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <User className="w-6 h-6" />
                  </div>
                  Información Personal
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm text-white font-semibold transition-all duration-300"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm text-white font-semibold transition-all duration-300"
                    >
                      <Save className="w-4 h-4" />
                      Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm text-white font-semibold transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    placeholder="Tu nombre completo"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 font-medium">{currentUser?.name || 'No especificado'}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 font-medium">{currentUser?.email}</span>
                  <div className="ml-auto">
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Verificado
                    </div>
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    placeholder="+34 600 000 000"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 font-medium">{currentUser?.phone || 'No especificado'}</span>
                  </div>
                )}
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ubicación
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    placeholder="Madrid, España"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 font-medium">{currentUser?.location || 'No especificado'}</span>
                  </div>
                )}
              </div>

              {/* Biografía */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Biografía
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="Cuéntanos sobre ti..."
                  />
                ) : (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                    <p className="text-gray-900 leading-relaxed">{currentUser?.bio || 'No especificado'}</p>
                  </div>
                )}
              </div>

              {/* Plan */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Plan actual
                </label>
                <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-indigo-100 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{formatPlanName(currentUser?.plan)}</p>
                      <p className="text-sm text-gray-600">Acceso completo a todas las funciones</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Cambiar Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
