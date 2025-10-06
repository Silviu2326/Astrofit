import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode, Users, TrendingUp, Calendar, Download, Send, Mail,
  Eye, RefreshCw, Ban, Search, Filter, CheckCircle, XCircle,
  AlertTriangle, Clock, Smartphone, Camera, Zap, Share2, Wallet,
  CreditCard, Shield, Bell, Settings, BarChart3, Activity,
  ArrowUpRight, Copy, Phone, MessageCircle, FileText, Apple,
  Image as ImageIcon, Sparkles, ChevronDown, MapPin, Edit, Trash2
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// ==================== INTERFACES Y TIPOS ====================

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  membershipType: string;
  membershipNumber: string;
  status: 'active' | 'expired' | 'suspended';
}

interface VirtualPass {
  id: string;
  member: Member;
  qrCode: string;
  qrData: string;
  generatedDate: string;
  expirationDate: string;
  lastUpdated: string;
  lastUsed: string | null;
  status: 'active' | 'expired' | 'suspended' | 'revoked';
  creditsRemaining: number | null;
  totalCredits: number | null;
  restrictions: string[];
  template: string;
}

interface ScanLog {
  id: string;
  timestamp: string;
  member: Member;
  type: 'check-in' | 'check-out';
  method: 'qr-scan' | 'manual';
  location: string;
  status: 'success' | 'denied';
  reason?: string;
  scannedBy?: string;
}

// ==================== DATOS MOCKEADOS ====================

const membershipTemplates = {
  unlimited: { gradient: 'from-yellow-400 via-orange-500 to-red-500', name: 'Unlimited' },
  pack: { gradient: 'from-blue-400 via-indigo-500 to-purple-500', name: 'Pack de Clases' },
  student: { gradient: 'from-green-400 via-emerald-500 to-teal-500', name: 'Estudiante' },
  corporate: { gradient: 'from-purple-400 via-pink-500 to-rose-500', name: 'Corporativo' },
  trial: { gradient: 'from-gray-400 via-gray-500 to-gray-600', name: 'Trial' },
};

const mockMembers: Member[] = Array.from({ length: 100 }, (_, i) => ({
  id: `M${1000 + i}`,
  name: ['Ana García', 'Carlos Ruiz', 'María López', 'Juan Pérez', 'Laura Martínez', 'Diego Torres', 'Sofia Ramos', 'Miguel Ángel', 'Carmen Silva', 'Fernando Cruz'][i % 10],
  email: `member${i}@example.com`,
  phone: `+34 ${600 + i} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
  avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  membershipType: ['unlimited', 'pack', 'student', 'corporate', 'trial'][i % 5],
  membershipNumber: `#${10000 + i}`,
  status: i % 10 === 0 ? 'expired' : i % 15 === 0 ? 'suspended' : 'active',
}));

const mockVirtualPasses: VirtualPass[] = mockMembers.slice(0, 75).map((member, i) => ({
  id: `VP${1000 + i}`,
  member,
  qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BOX-${member.id}-MEM${member.membershipNumber}-${Math.random().toString(36).substring(7)}-${new Date().getFullYear()}1231`,
  qrData: `BOX-${member.id}-MEM${member.membershipNumber}-${Math.random().toString(36).substring(7)}-${new Date().getFullYear()}1231`,
  generatedDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  expirationDate: new Date(Date.now() + (i % 10 === 0 ? -10 : 90) * 24 * 60 * 60 * 1000).toISOString(),
  lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  lastUsed: i % 3 === 0 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
  status: member.status === 'expired' ? 'expired' : member.status === 'suspended' ? 'suspended' : i % 20 === 0 ? 'revoked' : 'active',
  creditsRemaining: member.membershipType === 'pack' ? Math.floor(Math.random() * 10) : null,
  totalCredits: member.membershipType === 'pack' ? 10 : null,
  restrictions: member.membershipType === 'student' ? ['Lunes a Viernes', '6:00 - 16:00'] : [],
  template: member.membershipType,
}));

const mockScanLogs: ScanLog[] = Array.from({ length: 50 }, (_, i) => {
  const member = mockMembers[Math.floor(Math.random() * mockMembers.length)];
  const isSuccess = Math.random() > 0.2;
  const deniedReasons = ['Membresía vencida', 'Sin créditos', 'Pase revocado', 'Restricción de horario', 'Ya hizo check-in hoy'];

  return {
    id: `SL${1000 + i}`,
    timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    member,
    type: Math.random() > 0.5 ? 'check-in' : 'check-out',
    method: Math.random() > 0.3 ? 'qr-scan' : 'manual',
    location: ['Recepción', 'Puerta Principal', 'Área de Entrenamiento'][Math.floor(Math.random() * 3)],
    status: isSuccess ? 'success' : 'denied',
    reason: !isSuccess ? deniedReasons[Math.floor(Math.random() * deniedReasons.length)] : undefined,
    scannedBy: isSuccess ? ['Admin', 'Recepcionista', 'Coach'][Math.floor(Math.random() * 3)] : undefined,
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

const statsData = [
  { name: 'Lun', escaneos: 45 },
  { name: 'Mar', escaneos: 52 },
  { name: 'Mié', escaneos: 48 },
  { name: 'Jue', escaneos: 61 },
  { name: 'Vie', escaneos: 55 },
  { name: 'Sáb', escaneos: 38 },
  { name: 'Dom', escaneos: 28 },
];

const adoptionData = [
  { month: 'Ene', digital: 45, fisico: 55 },
  { month: 'Feb', digital: 52, fisico: 48 },
  { month: 'Mar', digital: 61, fisico: 39 },
  { month: 'Abr', digital: 68, fisico: 32 },
  { month: 'May', digital: 75, fisico: 25 },
  { month: 'Jun', digital: 82, fisico: 18 },
];

const methodDistribution = [
  { name: 'QR Scan', value: 65, color: '#6366f1' },
  { name: 'Manual', value: 25, color: '#8b5cf6' },
  { name: 'Tarjeta Física', value: 10, color: '#ec4899' },
];

// ==================== COMPONENTE PRINCIPAL ====================

const PasesVirtualesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showPassDetails, setShowPassDetails] = useState<VirtualPass | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [scanResult, setScanResult] = useState<{ status: 'success' | 'denied', data?: any } | null>(null);
  const [showDesignConfig, setShowDesignConfig] = useState(false);

  // Estadísticas calculadas
  const totalPasesActivos = mockVirtualPasses.filter(p => p.status === 'active').length;
  const checkinsHoy = mockScanLogs.filter(log => {
    const today = new Date().toDateString();
    const logDate = new Date(log.timestamp).toDateString();
    return today === logDate && log.type === 'check-in' && log.status === 'success';
  }).length;
  const pasesGeneradosMes = mockVirtualPasses.filter(p => {
    const thisMonth = new Date().getMonth();
    const passMonth = new Date(p.generatedDate).getMonth();
    return thisMonth === passMonth;
  }).length;
  const tasaUsoDigital = Math.round((totalPasesActivos / mockMembers.length) * 100);

  // Filtrado de pases
  const filteredPasses = mockVirtualPasses.filter(pass => {
    const matchesSearch =
      pass.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pass.member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pass.qrData.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || pass.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleGeneratePass = (member: Member) => {
    console.log('Generando pase para:', member);
    alert(`Pase generado para ${member.name}`);
    setSelectedMember(null);
  };

  const handleRegeneratePass = (pass: VirtualPass) => {
    console.log('Regenerando pase:', pass);
    alert(`Pase regenerado para ${pass.member.name}`);
  };

  const handleDownloadPass = (pass: VirtualPass, format: 'png' | 'pdf') => {
    console.log(`Descargando pase en formato ${format}:`, pass);
    alert(`Descargando pase de ${pass.member.name} en formato ${format.toUpperCase()}`);
  };

  const handleSendPass = (pass: VirtualPass, method: 'email' | 'sms' | 'whatsapp') => {
    console.log(`Enviando pase por ${method}:`, pass);
    alert(`Pase enviado a ${pass.member.name} por ${method}`);
  };

  const handleRevokePass = (pass: VirtualPass) => {
    if (confirm(`¿Estás seguro de revocar el pase de ${pass.member.name}?`)) {
      console.log('Revocando pase:', pass);
      alert(`Pase de ${pass.member.name} revocado`);
    }
  };

  const simulateScan = (success: boolean) => {
    const randomMember = mockMembers[Math.floor(Math.random() * mockMembers.length)];

    if (success) {
      setScanResult({
        status: 'success',
        data: {
          member: randomMember,
          credits: 8,
          lastVisit: '2 días',
        }
      });
    } else {
      setScanResult({
        status: 'denied',
        data: {
          member: randomMember,
          reason: ['Membresía vencida', 'Sin créditos', 'Restricción de horario'][Math.floor(Math.random() * 3)],
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* ==================== HERO SECTION ==================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <QrCode className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Pases <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Virtuales</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Acceso digital <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">sin contacto</span> para tus miembros
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Sistema Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Check-in Instantáneo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Shield className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Encriptación QR</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== ESTADÍSTICAS RÁPIDAS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Pases Activos', value: totalPasesActivos, change: '+12.5', icon: QrCode, gradient: 'from-blue-500 to-indigo-600', progress: 85 },
          { title: 'Check-ins Hoy', value: checkinsHoy, change: '+8.3', icon: Users, gradient: 'from-green-500 to-emerald-600', progress: 72 },
          { title: 'Generados Este Mes', value: pasesGeneradosMes, change: '+15.2', icon: Calendar, gradient: 'from-purple-500 to-pink-600', progress: 68 },
          { title: 'Tasa de Uso Digital', value: `${tasaUsoDigital}%`, change: '+5.7', icon: TrendingUp, gradient: 'from-orange-500 to-red-600', progress: tasaUsoDigital },
        ].map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
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
                <span className="text-sm font-bold text-green-600">{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==================== GENERADOR DE PASES ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Generador de Pases</h2>
              <p className="text-sm text-gray-600">Crea o regenera pases virtuales para tus miembros</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Búsqueda de miembro */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar Miembro</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o ID..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 2) {
                      const found = mockMembers.find(m =>
                        m.name.toLowerCase().includes(value.toLowerCase()) ||
                        m.email.toLowerCase().includes(value.toLowerCase())
                      );
                      setSelectedMember(found || null);
                    } else {
                      setSelectedMember(null);
                    }
                  }}
                />
              </div>

              {selectedMember && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={selectedMember.avatar} alt={selectedMember.name} className="w-12 h-12 rounded-xl object-cover shadow-md" />
                    <div>
                      <p className="font-bold text-gray-900">{selectedMember.name}</p>
                      <p className="text-sm text-gray-600">{selectedMember.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`px-3 py-1 bg-gradient-to-r ${membershipTemplates[selectedMember.membershipType as keyof typeof membershipTemplates].gradient} text-white text-xs font-bold rounded-full`}>
                      {membershipTemplates[selectedMember.membershipType as keyof typeof membershipTemplates].name}
                    </div>
                    <div className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                      {selectedMember.membershipNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => handleGeneratePass(selectedMember)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generar Pase Virtual
                  </button>
                </motion.div>
              )}
            </div>

            {/* Acciones rápidas */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowScanner(true)}
                className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Camera className="w-8 h-8 mb-3" />
                <p className="font-bold text-lg mb-1">Escanear QR</p>
                <p className="text-sm text-green-100">Check-in rápido</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDesignConfig(true)}
                className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Settings className="w-8 h-8 mb-3" />
                <p className="font-bold text-lg mb-1">Diseño</p>
                <p className="text-sm text-purple-100">Personalizar pases</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Wallet className="w-8 h-8 mb-3" />
                <p className="font-bold text-lg mb-1">Wallet</p>
                <p className="text-sm text-blue-100">Apple/Google Pay</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <BarChart3 className="w-8 h-8 mb-3" />
                <p className="font-bold text-lg mb-1">Reportes</p>
                <p className="text-sm text-orange-100">Analytics completo</p>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== LISTADO DE PASES ACTIVOS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pases Activos</h2>
                <p className="text-sm text-gray-600">{filteredPasses.length} pases encontrados</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-sm"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-sm appearance-none bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="active">Activos</option>
                  <option value="expired">Expirados</option>
                  <option value="suspended">Suspendidos</option>
                  <option value="revoked">Revocados</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Tabla de pases */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Miembro</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Membresía</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">QR Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Generado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Último Uso</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPasses.slice(0, 10).map((pass, index) => (
                  <motion.tr
                    key={pass.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img src={pass.member.avatar} alt={pass.member.name} className="w-10 h-10 rounded-xl object-cover shadow-md" />
                        <div>
                          <p className="font-semibold text-gray-900">{pass.member.name}</p>
                          <p className="text-xs text-gray-500">{pass.member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`inline-block px-3 py-1 bg-gradient-to-r ${membershipTemplates[pass.template as keyof typeof membershipTemplates].gradient} text-white text-xs font-bold rounded-full`}>
                        {membershipTemplates[pass.template as keyof typeof membershipTemplates].name}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-block p-2 bg-white rounded-lg shadow-md">
                        <img src={pass.qrCode} alt="QR Code" className="w-12 h-12" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-700">{new Date(pass.generatedDate).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{new Date(pass.generatedDate).toLocaleTimeString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      {pass.lastUsed ? (
                        <>
                          <p className="text-sm text-gray-700">{new Date(pass.lastUsed).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">{new Date(pass.lastUsed).toLocaleTimeString()}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Nunca usado</p>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {pass.status === 'active' && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-200">
                          <CheckCircle className="w-3 h-3" />
                          Activo
                        </div>
                      )}
                      {pass.status === 'expired' && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-200">
                          <XCircle className="w-3 h-3" />
                          Expirado
                        </div>
                      )}
                      {pass.status === 'suspended' && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full border border-yellow-200">
                          <AlertTriangle className="w-3 h-3" />
                          Suspendido
                        </div>
                      )}
                      {pass.status === 'revoked' && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
                          <Ban className="w-3 h-3" />
                          Revocado
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setShowPassDetails(pass)}
                          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Ver pase"
                        >
                          <Eye className="w-4 h-4 text-indigo-600" />
                        </button>
                        <button
                          onClick={() => handleDownloadPass(pass, 'png')}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Descargar"
                        >
                          <Download className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleSendPass(pass, 'email')}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Reenviar"
                        >
                          <Send className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          onClick={() => handleRegeneratePass(pass)}
                          className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Regenerar"
                        >
                          <RefreshCw className="w-4 h-4 text-purple-600" />
                        </button>
                        <button
                          onClick={() => handleRevokePass(pass)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Revocar"
                        >
                          <Ban className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPasses.length === 0 && (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No se encontraron pases</p>
              <p className="text-sm text-gray-400">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* ==================== HISTORIAL DE ESCANEOS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Historial de Escaneos</h2>
              <p className="text-sm text-gray-600">Log de check-ins en tiempo real</p>
            </div>
          </div>

          <div className="space-y-3">
            {mockScanLogs.slice(0, 8).map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  log.status === 'success'
                    ? 'bg-green-50 border-green-200 hover:border-green-300'
                    : 'bg-red-50 border-red-200 hover:border-red-300'
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                  log.status === 'success' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-rose-500'
                }`}>
                  {log.status === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </div>

                <img src={log.member.avatar} alt={log.member.name} className="w-10 h-10 rounded-xl object-cover shadow-md" />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{log.member.name}</p>
                  <p className="text-sm text-gray-600">
                    {log.type === 'check-in' ? 'Check-in' : 'Check-out'} • {log.method === 'qr-scan' ? 'QR Scan' : 'Manual'} • {log.location}
                  </p>
                  {log.status === 'denied' && log.reason && (
                    <p className="text-xs text-red-600 font-medium mt-1">⚠️ {log.reason}</p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== ANALYTICS Y REPORTES ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Escaneos por día */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Escaneos Esta Semana
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statsData}>
                <defs>
                  <linearGradient id="colorEscaneos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <Bar dataKey="escaneos" fill="url(#colorEscaneos)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Adopción digital */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Adopción Digital vs Físico
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={adoptionData}>
                <defs>
                  <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorFisico" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="digital" stroke="#10b981" fill="url(#colorDigital)" name="Digital" />
                <Area type="monotone" dataKey="fisico" stroke="#f59e0b" fill="url(#colorFisico)" name="Físico" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Distribución por método */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" />
            Métodos de Check-in
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={methodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {methodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {methodDistribution.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: method.color }}></div>
                    <span className="font-semibold text-gray-900">{method.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-700">{method.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== MODAL: SCANNER DE QR ==================== */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowScanner(false);
              setScanResult(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {!scanResult ? (
                <>
                  {/* Header del scanner */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Camera className="w-8 h-8 text-white" />
                        <h3 className="text-2xl font-bold text-white">Escanear QR Code</h3>
                      </div>
                      <button
                        onClick={() => setShowScanner(false)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <XCircle className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Área de escaneo */}
                  <div className="p-8">
                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-6">
                      {/* Marco de escaneo */}
                      <div className="relative aspect-square max-w-sm mx-auto border-4 border-green-400 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="w-24 h-24 text-white/30" />
                        </div>

                        {/* Línea de escaneo animada */}
                        <motion.div
                          animate={{ y: [0, '100%', 0] }}
                          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                        />

                        {/* Esquinas del marco */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
                      </div>

                      <p className="text-center text-white mt-4 text-sm">
                        Coloca el código QR dentro del marco
                      </p>
                    </div>

                    {/* Input manual */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">O ingresa el código manualmente</label>
                      <input
                        type="text"
                        placeholder="BOX-M1234-MEM5678-abc123xyz-20251231"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white"
                      />
                    </div>

                    {/* Botones de prueba */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => simulateScan(true)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                      >
                        ✅ Simular Éxito
                      </button>
                      <button
                        onClick={() => simulateScan(false)}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                      >
                        ❌ Simular Error
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Resultado del escaneo */}
                  {scanResult.status === 'success' ? (
                    <div className="p-8">
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', duration: 0.6 }}
                          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-4 shadow-2xl"
                        >
                          <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-green-600 mb-2">¡Acceso Permitido!</h3>
                        <p className="text-gray-600">Check-in exitoso</p>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <img src={scanResult.data.member.avatar} alt={scanResult.data.member.name} className="w-16 h-16 rounded-xl object-cover shadow-lg" />
                          <div>
                            <p className="text-2xl font-bold text-gray-900">¡Bienvenido/a {scanResult.data.member.name.split(' ')[0]}!</p>
                            <p className="text-sm text-gray-600">{scanResult.data.member.membershipType}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-xl p-3">
                            <p className="text-xs text-gray-500 mb-1">Créditos Restantes</p>
                            <p className="text-2xl font-bold text-gray-900">{scanResult.data.credits}</p>
                          </div>
                          <div className="bg-white rounded-xl p-3">
                            <p className="text-xs text-gray-500 mb-1">Última Visita</p>
                            <p className="text-2xl font-bold text-gray-900">Hace {scanResult.data.lastVisit}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowScanner(false);
                          setScanResult(null);
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                      >
                        Cerrar
                      </button>
                    </div>
                  ) : (
                    <div className="p-8">
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', duration: 0.6 }}
                          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-rose-500 mb-4 shadow-2xl"
                        >
                          <XCircle className="w-12 h-12 text-white" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-red-600 mb-2">Acceso Denegado</h3>
                        <p className="text-gray-600">{scanResult.data.reason}</p>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 border border-red-200 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <img src={scanResult.data.member.avatar} alt={scanResult.data.member.name} className="w-16 h-16 rounded-xl object-cover shadow-lg" />
                          <div>
                            <p className="text-xl font-bold text-gray-900">{scanResult.data.member.name}</p>
                            <p className="text-sm text-gray-600">{scanResult.data.member.membershipType}</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Acción Sugerida:</p>
                          <p className="text-sm text-gray-600">
                            {scanResult.data.reason === 'Membresía vencida' && 'Renovar membresía en recepción'}
                            {scanResult.data.reason === 'Sin créditos' && 'Comprar pack adicional de clases'}
                            {scanResult.data.reason === 'Restricción de horario' && 'Verificar horarios permitidos'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowScanner(false);
                          setScanResult(null);
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                      >
                        Cerrar
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL: DETALLES DEL PASE ==================== */}
      <AnimatePresence>
        {showPassDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowPassDetails(null);
              setIsFlipped(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Pase Virtual</h3>
                  <button
                    onClick={() => {
                      setShowPassDetails(null);
                      setIsFlipped(false);
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                {/* Tarjeta 3D con flip */}
                <div className="perspective-1000 mb-6">
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-[1.6/1] cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    {/* Front */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${membershipTemplates[showPassDetails.template as keyof typeof membershipTemplates].gradient} rounded-2xl shadow-2xl p-6 ${isFlipped ? 'hidden' : 'block'}`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="h-full flex flex-col justify-between text-white">
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div className="text-2xl font-bold">CROSSFIT BOX</div>
                            <QrCode className="w-8 h-8" />
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <img src={showPassDetails.member.avatar} alt={showPassDetails.member.name} className="w-16 h-16 rounded-xl object-cover shadow-lg border-2 border-white" />
                            <div>
                              <p className="text-2xl font-bold">{showPassDetails.member.name}</p>
                              <p className="text-sm opacity-90">{showPassDetails.member.membershipNumber}</p>
                            </div>
                          </div>

                          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 mb-4">
                            <span className="text-sm font-semibold">{membershipTemplates[showPassDetails.template as keyof typeof membershipTemplates].name}</span>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="inline-block bg-white p-4 rounded-xl shadow-xl mb-4">
                            <img src={showPassDetails.qrCode} alt="QR Code" className="w-32 h-32" />
                          </div>
                          <p className="text-sm font-semibold">Válido hasta: {new Date(showPassDetails.expirationDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 ${isFlipped ? 'block' : 'hidden'}`}
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="h-full flex flex-col justify-between text-white">
                        <div>
                          <h4 className="text-xl font-bold mb-4">Detalles del Pase</h4>

                          {showPassDetails.creditsRemaining !== null && (
                            <div className="mb-4">
                              <p className="text-sm opacity-75 mb-1">Créditos Restantes</p>
                              <p className="text-3xl font-bold">{showPassDetails.creditsRemaining} / {showPassDetails.totalCredits}</p>
                            </div>
                          )}

                          {showPassDetails.restrictions.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm opacity-75 mb-2">Restricciones</p>
                              {showPassDetails.restrictions.map((restriction, i) => (
                                <div key={i} className="flex items-center gap-2 mb-1">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm">{restriction}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mb-4">
                            <p className="text-sm opacity-75 mb-1">Contacto</p>
                            <p className="text-sm">info@crossfitbox.com</p>
                            <p className="text-sm">+34 123 456 789</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs opacity-50">ID: {showPassDetails.id}</p>
                          <p className="text-xs opacity-50 mt-1">Click para ver frente</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <p className="text-center text-sm text-gray-500 mb-6">Click en la tarjeta para voltearla</p>

                {/* Acciones */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleDownloadPass(showPassDetails, 'png')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-200"
                  >
                    <Download className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-900">Descargar PNG</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPass(showPassDetails, 'pdf')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all border border-purple-200"
                  >
                    <FileText className="w-6 h-6 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-900">Descargar PDF</span>
                  </button>

                  <button
                    onClick={() => handleSendPass(showPassDetails, 'email')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all border border-green-200"
                  >
                    <Mail className="w-6 h-6 text-green-600" />
                    <span className="text-xs font-semibold text-green-900">Enviar Email</span>
                  </button>

                  <button
                    onClick={() => handleSendPass(showPassDetails, 'whatsapp')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all border border-orange-200"
                  >
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                    <span className="text-xs font-semibold text-orange-900">WhatsApp</span>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleRegeneratePass(showPassDetails)}
                    className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Regenerar Pase
                  </button>

                  <button
                    onClick={() => handleRevokePass(showPassDetails)}
                    className="px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Ban className="w-5 h-5" />
                    Revocar Pase
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL: CONFIGURACIÓN DE DISEÑO ==================== */}
      <AnimatePresence>
        {showDesignConfig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDesignConfig(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden z-10">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-8 h-8 text-white" />
                    <h3 className="text-2xl font-bold text-white">Personalización de Diseño</h3>
                  </div>
                  <button
                    onClick={() => setShowDesignConfig(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Plantillas por tipo de membresía */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Plantillas de Membresía</h4>
                    <div className="space-y-3">
                      {Object.entries(membershipTemplates).map(([key, template]) => (
                        <div key={key} className={`p-4 rounded-2xl bg-gradient-to-r ${template.gradient} text-white cursor-pointer hover:scale-105 transition-transform`}>
                          <p className="font-bold">{template.name}</p>
                          <p className="text-sm opacity-90">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Opciones de personalización */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Opciones</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Logo del Box</label>
                        <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition-colors text-gray-600 hover:text-indigo-600 flex items-center justify-center gap-2">
                          <ImageIcon className="w-5 h-5" />
                          Subir Logo
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Color Principal</label>
                        <div className="grid grid-cols-6 gap-2">
                          {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'].map(color => (
                            <button
                              key={color}
                              className="w-full aspect-square rounded-lg border-2 border-white shadow-md hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Estilo del QR</label>
                        <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
                          <option>Cuadrado (por defecto)</option>
                          <option>Redondeado</option>
                          <option>Con logo en centro</option>
                          <option>Puntos circulares</option>
                        </select>
                      </div>

                      <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300">
                        Guardar Configuración
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasesVirtualesPage;
