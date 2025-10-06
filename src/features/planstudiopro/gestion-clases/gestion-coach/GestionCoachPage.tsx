import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserCheck, Star, TrendingUp, Plus, Search, Filter,
  Calendar, Award, MessageSquare, Eye, Edit, Clock, Mail, Phone,
  Instagram, Facebook, MapPin, Briefcase, X, ChevronRight,
  AlertCircle, CheckCircle, XCircle, BookOpen, Target,
  FileText, DollarSign, Copy, CheckCheck, ArrowUpRight,
  Heart, Zap, Activity
} from 'lucide-react';
import { Coach, fetchCoaches } from './gestionCoachApi';

const GestionCoachPage: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'absent'>('all');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const getCoaches = async () => {
      const data = await fetchCoaches();
      setCoaches(data);
    };
    getCoaches();
  }, []);

  // Stats calculations
  const totalCoaches = coaches.length;
  const activeToday = coaches.filter(c => c.status === 'active').length;
  const averageRating = (coaches.reduce((sum, c) => sum + c.rating, 0) / coaches.length).toFixed(1);
  const totalClassesThisMonth = coaches.reduce((sum, c) => sum + c.classesThisMonth, 0);

  // Get all unique specialties
  const allSpecialties = Array.from(new Set(coaches.flatMap(c => c.specialties)));

  // Filter coaches
  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch =
      `${coach.name} ${coach.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || coach.status === filterStatus;
    const matchesSpecialty = filterSpecialty === 'all' || coach.specialties.includes(filterSpecialty);
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const handleViewProfile = (coach: Coach) => {
    setSelectedCoach(coach);
    setShowProfileModal(true);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getStatusConfig = (status: Coach['status']) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-500', text: 'Activo', icon: CheckCircle };
      case 'inactive':
        return { color: 'bg-gray-500', text: 'Inactivo', icon: XCircle };
      case 'absent':
        return { color: 'bg-orange-500', text: 'Ausente', icon: AlertCircle };
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = [
      'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
    ];
    const index = allSpecialties.indexOf(specialty) % colors.length;
    return colors[index];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : star - 0.5 <= rating
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Animated background effects */}
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
              <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Coaches</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Administra tu equipo de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">instructores profesionales</span>
          </p>
        </div>
      </motion.div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Coaches', value: totalCoaches, icon: Users, gradient: 'from-blue-500 to-indigo-600', change: '+8%' },
          { title: 'Activos Hoy', value: activeToday, icon: UserCheck, gradient: 'from-green-500 to-emerald-600', change: '+12%' },
          { title: 'Rating Promedio', value: averageRating, icon: Star, gradient: 'from-yellow-500 to-orange-600', change: '+5%' },
          { title: 'Clases Este Mes', value: totalClassesThisMonth, icon: TrendingUp, gradient: 'from-purple-500 to-pink-600', change: '+15%' }
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
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Background decoration */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.title}
                </p>

                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.value}
                </p>

                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FILTERS AND SEARCH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-12 pr-8 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 appearance-none cursor-pointer"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="absent">Ausentes</option>
            </select>
          </div>

          {/* Specialty Filter */}
          <div className="relative">
            <Award className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 appearance-none cursor-pointer"
            >
              <option value="all">Todas las especialidades</option>
              {allSpecialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

          {/* Add New Coach Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Agregar Coach
          </motion.button>
        </div>
      </motion.div>

      {/* COACHES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCoaches.map((coach, index) => {
          const statusConfig = getStatusConfig(coach.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
            >
              {/* Background decoration */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

              <div className="relative z-10 p-6">
                {/* Avatar and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      src={coach.photo}
                      alt={`${coach.name} ${coach.lastName}`}
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                    />
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${statusConfig.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
                      <StatusIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleViewProfile(coach)}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Name and Rating */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {coach.name} {coach.lastName}
                </h3>
                <div className="mb-3">
                  {renderStars(coach.rating)}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {coach.specialties.slice(0, 3).map((specialty, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 ${getSpecialtyColor(specialty)} text-white text-xs font-bold rounded-full`}
                    >
                      {specialty}
                    </span>
                  ))}
                  {coach.specialties.length > 3 && (
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                      +{coach.specialties.length - 3}
                    </span>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Clases</p>
                    <p className="text-lg font-bold text-indigo-600">{coach.classesThisMonth}</p>
                  </div>
                  <div className="text-center border-x border-indigo-200">
                    <p className="text-xs text-gray-600 mb-1">Alumnos</p>
                    <p className="text-lg font-bold text-purple-600">{coach.totalStudents}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Años exp.</p>
                    <p className="text-lg font-bold text-pink-600">{coach.yearsExperience}</p>
                  </div>
                </div>

                {/* Next Class */}
                {coach.nextClass && (
                  <div className="p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <p className="text-xs font-semibold text-gray-600">Próxima clase</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{coach.nextClass.className}</p>
                    <p className="text-xs text-gray-600">{coach.nextClass.date} • {coach.nextClass.time}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 flex items-center justify-center"
                    title="Ver horario"
                  >
                    <Calendar className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 flex items-center justify-center"
                    title="Enviar mensaje"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 flex items-center justify-center"
                    title="Ver perfil completo"
                    onClick={() => handleViewProfile(coach)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PROFILE MODAL */}
      <AnimatePresence>
        {showProfileModal && selectedCoach && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-t-3xl z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedCoach.photo}
                      alt={`${selectedCoach.name} ${selectedCoach.lastName}`}
                      className="w-20 h-20 rounded-2xl object-cover shadow-xl ring-4 ring-white"
                    />
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">
                        {selectedCoach.name} {selectedCoach.lastName}
                      </h2>
                      <div className="flex items-center gap-2">
                        {renderStars(selectedCoach.rating)}
                        <span className="ml-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                          {getStatusConfig(selectedCoach.status).text}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowProfileModal(false)}
                    className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Info */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-indigo-600" />
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedCoach.email}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopyEmail(selectedCoach.email)}
                        className="p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        {copiedEmail ? <CheckCheck className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                      </motion.button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Teléfono</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedCoach.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Tipo de contrato</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{selectedCoach.contractType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Fecha de inicio</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedCoach.dateJoined}</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  {selectedCoach.socialMedia && (
                    <div className="mt-4 flex items-center gap-3">
                      {selectedCoach.socialMedia.instagram && (
                        <a
                          href={`https://instagram.com/${selectedCoach.socialMedia.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-pink-50 transition-colors"
                        >
                          <Instagram className="w-4 h-4 text-pink-600" />
                          <span className="text-sm font-semibold text-gray-700">{selectedCoach.socialMedia.instagram}</span>
                        </a>
                      )}
                      {selectedCoach.socialMedia.facebook && (
                        <a
                          href={`https://facebook.com/${selectedCoach.socialMedia.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          <Facebook className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{selectedCoach.socialMedia.facebook}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Bio */}
                {selectedCoach.bio && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      Biografía
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{selectedCoach.bio}</p>
                  </div>
                )}

                {/* Specialties & Expertise */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-purple-600" />
                    Especialidades y Nivel de Experticia
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedCoach.specialties.map((specialty, idx) => {
                      const level = selectedCoach.expertiseLevel?.[specialty];
                      const levelConfig = {
                        expert: { color: 'bg-green-500', text: 'Experto' },
                        intermediate: { color: 'bg-blue-500', text: 'Intermedio' },
                        basic: { color: 'bg-gray-500', text: 'Básico' }
                      };
                      const config = level ? levelConfig[level] : null;

                      return (
                        <div key={idx} className="px-4 py-2 bg-white rounded-xl shadow-sm flex items-center gap-2">
                          <span className="font-bold text-gray-900">{specialty}</span>
                          {config && (
                            <span className={`px-2 py-0.5 ${config.color} text-white text-xs font-bold rounded-full`}>
                              {config.text}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-green-600" />
                    Estadísticas de Rendimiento
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-3xl font-bold text-green-600">{selectedCoach.totalClasses}</p>
                      <p className="text-sm text-gray-600 mt-1">Clases totales</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-3xl font-bold text-blue-600">{selectedCoach.classesThisMonth}</p>
                      <p className="text-sm text-gray-600 mt-1">Este mes</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-3xl font-bold text-purple-600">{selectedCoach.totalStudents}</p>
                      <p className="text-sm text-gray-600 mt-1">Alumnos</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-3xl font-bold text-orange-600">{selectedCoach.attendanceRate}%</p>
                      <p className="text-sm text-gray-600 mt-1">Asistencia</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                {selectedCoach.certifications && selectedCoach.certifications.length > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-yellow-600" />
                      Certificaciones
                    </h3>
                    <div className="space-y-3">
                      {selectedCoach.certifications.map((cert) => {
                        const statusConfig = {
                          valid: { color: 'bg-green-500', icon: CheckCircle },
                          expiring: { color: 'bg-yellow-500', icon: AlertCircle },
                          expired: { color: 'bg-red-500', icon: XCircle }
                        }[cert.status];

                        return (
                          <div key={cert.id} className="p-4 bg-white rounded-xl flex items-center gap-4">
                            <div className={`p-3 ${statusConfig.color} rounded-xl`}>
                              <Award className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900">{cert.name}</p>
                              <p className="text-sm text-gray-600">{cert.institution}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Obtenida: {cert.dateObtained}
                                {cert.expiryDate && ` • Vence: ${cert.expiryDate}`}
                              </p>
                            </div>
                            <div className={`px-3 py-1 ${statusConfig.color} text-white text-xs font-bold rounded-full capitalize`}>
                              {cert.status === 'valid' ? 'Vigente' : cert.status === 'expiring' ? 'Por vencer' : 'Vencida'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {selectedCoach.reviews && selectedCoach.reviews.length > 0 && (
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-pink-600" />
                      Opiniones de Alumnos
                    </h3>
                    <div className="space-y-3">
                      {selectedCoach.reviews.slice(0, 5).map((review) => (
                        <div key={review.id} className="p-4 bg-white rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-bold text-gray-900">{review.studentName}</p>
                              <p className="text-xs text-gray-500">{review.className} • {review.date}</p>
                            </div>
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-gray-700 italic">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compensation */}
                {selectedCoach.ratePerClass && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                      Compensación
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-xl text-center">
                        <p className="text-2xl font-bold text-emerald-600">€{selectedCoach.ratePerClass}</p>
                        <p className="text-sm text-gray-600 mt-1">Por clase</p>
                      </div>
                      {selectedCoach.attendanceBonus && (
                        <div className="p-4 bg-white rounded-xl text-center">
                          <p className="text-2xl font-bold text-blue-600">{selectedCoach.attendanceBonus}%</p>
                          <p className="text-sm text-gray-600 mt-1">Bono asistencia</p>
                        </div>
                      )}
                      {selectedCoach.salesCommission && (
                        <div className="p-4 bg-white rounded-xl text-center">
                          <p className="text-2xl font-bold text-purple-600">{selectedCoach.salesCommission}%</p>
                          <p className="text-sm text-gray-600 mt-1">Comisión ventas</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200 rounded-b-3xl flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Editar Perfil
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 border-2 border-indigo-500 text-indigo-600 font-semibold rounded-2xl hover:bg-indigo-50 transition-colors duration-300"
                >
                  Ver Horario
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE MODAL PLACEHOLDER */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Agregar Nuevo Coach
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <p className="text-center text-gray-600 py-12">
                Formulario de creación de coach (por implementar)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GestionCoachPage;
