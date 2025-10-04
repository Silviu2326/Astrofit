import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserX, Users, TrendingUp, DollarSign, RefreshCw,
  AlertTriangle, Clock, Mail, Phone, Gift, MessageSquare,
  Target, BarChart3, CheckCircle, XCircle, Calendar,
  Zap, Star, ArrowUpRight, Filter, Search, Download,
  TrendingDown, Award, Heart, Send, Package
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ============================================
// TIPOS E INTERFACES
// ============================================

interface ClienteInactivo {
  id: string;
  nombre: string;
  avatar: string;
  email: string;
  telefono: string;
  diasInactivo: number;
  nivelRiesgo: 'en-riesgo' | 'inactivo' | 'casi-perdido' | 'perdido';
  planActual: string;
  ltv: number;
  probabilidadRetorno: number;
  ultimoContacto: string;
  razonInactividad?: string;
  ultimaActividad: string;
}

interface CampanaReactivacion {
  id: string;
  nombre: string;
  tipo: 'te-extranamos' | 'descuento' | 'nueva-funcionalidad' | 'feedback' | 'ultima-oportunidad';
  descripcion: string;
  tasaExito: number;
  clientesContactados: number;
  clientesReactivados: number;
  ingresoRecuperado: number;
}

interface SecuenciaReactivacion {
  id: string;
  dia: number;
  canal: 'email' | 'sms' | 'push' | 'llamada';
  mensaje: string;
  activo: boolean;
}

interface HistoriaExito {
  id: string;
  cliente: string;
  avatar: string;
  diasInactivo: number;
  estrategia: string;
  fechaRetorno: string;
  estadoActual: string;
}

interface Oferta {
  id: string;
  tipo: string;
  descripcion: string;
  descuento: string;
  codigo: string;
  redenciones: number;
  limite: number;
}

// ============================================
// DATOS MOCKEADOS
// ============================================

const estadisticasRapidas = [
  {
    titulo: 'Clientes en Riesgo',
    valor: '127',
    cambio: '+8.3',
    icono: AlertTriangle,
    color: 'from-yellow-500 to-orange-500',
    progreso: 65
  },
  {
    titulo: 'Reactivados Este Mes',
    valor: '43',
    cambio: '+12.5',
    icono: RefreshCw,
    color: 'from-green-500 to-emerald-500',
    progreso: 78
  },
  {
    titulo: 'Tasa de Reactivación',
    valor: '34%',
    cambio: '+5.2',
    icono: TrendingUp,
    color: 'from-blue-500 to-indigo-500',
    progreso: 34
  },
  {
    titulo: 'Ingresos Recuperados',
    valor: '$28.5K',
    cambio: '+18.7',
    icono: DollarSign,
    color: 'from-purple-500 to-pink-500',
    progreso: 82
  }
];

const segmentosInactividad = [
  {
    nivel: 'en-riesgo',
    titulo: 'En Riesgo',
    descripcion: '7-14 días inactivo',
    cantidad: 45,
    color: 'yellow',
    gradiente: 'from-yellow-400 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50',
    urgencia: 'Acción preventiva'
  },
  {
    nivel: 'inactivo',
    titulo: 'Inactivos',
    descripcion: '15-30 días inactivo',
    cantidad: 82,
    color: 'orange',
    gradiente: 'from-orange-400 to-orange-600',
    bgColor: 'from-orange-50 to-orange-100',
    urgencia: 'Urgencia media'
  },
  {
    nivel: 'casi-perdido',
    titulo: 'Casi Perdidos',
    descripcion: '30-60 días inactivo',
    cantidad: 53,
    color: 'red',
    gradiente: 'from-red-400 to-red-600',
    bgColor: 'from-red-50 to-red-100',
    urgencia: 'Urgencia alta'
  },
  {
    nivel: 'perdido',
    titulo: 'Perdidos',
    descripcion: '>60 días inactivo',
    cantidad: 34,
    color: 'gray',
    gradiente: 'from-gray-400 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    urgencia: 'Difícil recuperación'
  }
];

const clientesInactivos: ClienteInactivo[] = [
  {
    id: 'c1',
    nombre: 'María González',
    avatar: '👩',
    email: 'maria.g@email.com',
    telefono: '+34 600 123 456',
    diasInactivo: 12,
    nivelRiesgo: 'en-riesgo',
    planActual: 'Premium',
    ltv: 2450,
    probabilidadRetorno: 85,
    ultimoContacto: 'Queja sobre horarios',
    razonInactividad: 'Falta de tiempo',
    ultimaActividad: 'Completó sesión de yoga'
  },
  {
    id: 'c2',
    nombre: 'Carlos Ruiz',
    avatar: '👨',
    email: 'carlos.r@email.com',
    telefono: '+34 610 234 567',
    diasInactivo: 25,
    nivelRiesgo: 'inactivo',
    planActual: 'Básico',
    ltv: 890,
    probabilidadRetorno: 62,
    ultimoContacto: 'Preguntó por descuentos',
    razonInactividad: 'Precio elevado',
    ultimaActividad: 'Vio clases online'
  },
  {
    id: 'c3',
    nombre: 'Laura Martínez',
    avatar: '👧',
    email: 'laura.m@email.com',
    telefono: '+34 620 345 678',
    diasInactivo: 45,
    nivelRiesgo: 'casi-perdido',
    planActual: 'Premium Plus',
    ltv: 3200,
    probabilidadRetorno: 48,
    ultimoContacto: 'Sin respuesta a emails',
    razonInactividad: 'Insatisfacción con servicio',
    ultimaActividad: 'Canceló reserva'
  },
  {
    id: 'c4',
    nombre: 'Pedro Sánchez',
    avatar: '🧔',
    email: 'pedro.s@email.com',
    telefono: '+34 630 456 789',
    diasInactivo: 75,
    nivelRiesgo: 'perdido',
    planActual: 'Básico',
    ltv: 620,
    probabilidadRetorno: 22,
    ultimoContacto: 'Solicitó cancelación',
    razonInactividad: 'Logró objetivo',
    ultimaActividad: 'Actualizó perfil'
  },
  {
    id: 'c5',
    nombre: 'Ana López',
    avatar: '👩‍🦰',
    email: 'ana.l@email.com',
    telefono: '+34 640 567 890',
    diasInactivo: 18,
    nivelRiesgo: 'inactivo',
    planActual: 'Premium',
    ltv: 1850,
    probabilidadRetorno: 73,
    ultimoContacto: 'Feedback positivo',
    razonInactividad: 'Viaje temporal',
    ultimaActividad: 'Pausó suscripción'
  },
  {
    id: 'c6',
    nombre: 'David Torres',
    avatar: '👨‍💼',
    email: 'david.t@email.com',
    telefono: '+34 650 678 901',
    diasInactivo: 9,
    nivelRiesgo: 'en-riesgo',
    planActual: 'Básico',
    ltv: 450,
    probabilidadRetorno: 91,
    ultimoContacto: 'Interesado en upgrade',
    razonInactividad: 'Horarios incompatibles',
    ultimaActividad: 'Consultó precios'
  }
];

const campanasReactivacion: CampanaReactivacion[] = [
  {
    id: 'camp1',
    nombre: 'Te Extrañamos',
    tipo: 'te-extranamos',
    descripcion: 'Email emotivo recordando beneficios y momentos',
    tasaExito: 28,
    clientesContactados: 150,
    clientesReactivados: 42,
    ingresoRecuperado: 8400
  },
  {
    id: 'camp2',
    nombre: 'Descuento 30%',
    tipo: 'descuento',
    descripcion: 'Oferta especial de reintegración por tiempo limitado',
    tasaExito: 42,
    clientesContactados: 100,
    clientesReactivados: 42,
    ingresoRecuperado: 12600
  },
  {
    id: 'camp3',
    nombre: 'Nuevas Features',
    tipo: 'nueva-funcionalidad',
    descripcion: 'Mostrar mejoras y funcionalidades añadidas',
    tasaExito: 35,
    clientesContactados: 80,
    clientesReactivados: 28,
    ingresoRecuperado: 5600
  },
  {
    id: 'camp4',
    nombre: '¿Por Qué Te Fuiste?',
    tipo: 'feedback',
    descripcion: 'Encuesta breve con incentivo por responder',
    tasaExito: 52,
    clientesContactados: 120,
    clientesReactivados: 62,
    ingresoRecuperado: 9300
  },
  {
    id: 'camp5',
    nombre: 'Última Oportunidad',
    tipo: 'ultima-oportunidad',
    descripcion: 'Oferta final antes de cerrar cuenta',
    tasaExito: 38,
    clientesContactados: 60,
    clientesReactivados: 23,
    ingresoRecuperado: 6900
  }
];

const secuenciaReactivacion: SecuenciaReactivacion[] = [
  {
    id: 'seq1',
    dia: 0,
    canal: 'email',
    mensaje: '¿Todo bien, {{nombre}}? Te echamos de menos',
    activo: true
  },
  {
    id: 'seq2',
    dia: 3,
    canal: 'sms',
    mensaje: 'Te extrañamos 💙 Vuelve y recibe 20% OFF',
    activo: true
  },
  {
    id: 'seq3',
    dia: 7,
    canal: 'email',
    mensaje: 'Oferta especial: 30% de descuento solo para ti',
    activo: true
  },
  {
    id: 'seq4',
    dia: 14,
    canal: 'push',
    mensaje: '⏰ Última oportunidad: tu oferta expira hoy',
    activo: true
  },
  {
    id: 'seq5',
    dia: 21,
    canal: 'llamada',
    mensaje: 'Llamada personal de seguimiento',
    activo: false
  }
];

const historiasExito: HistoriaExito[] = [
  {
    id: 'h1',
    cliente: 'Sofía Ramírez',
    avatar: '👩‍💻',
    diasInactivo: 32,
    estrategia: 'Descuento 40% + Sesión 1-1 gratis',
    fechaRetorno: 'Hace 5 días',
    estadoActual: 'Activa - 8 sesiones este mes'
  },
  {
    id: 'h2',
    cliente: 'Roberto Díaz',
    avatar: '👨‍🏫',
    diasInactivo: 58,
    estrategia: 'Upgrade temporal a Premium',
    fechaRetorno: 'Hace 12 días',
    estadoActual: 'Activo - Renovó suscripción'
  },
  {
    id: 'h3',
    cliente: 'Isabel Moreno',
    avatar: '👩‍⚕️',
    diasInactivo: 21,
    estrategia: 'Email emotivo + Buddy pass',
    fechaRetorno: 'Hace 3 días',
    estadoActual: 'Activa - Trajo un amigo'
  },
  {
    id: 'h4',
    cliente: 'Miguel Fernández',
    avatar: '👨‍🔧',
    diasInactivo: 67,
    estrategia: 'Llamada personal + Ajuste de horarios',
    fechaRetorno: 'Hace 8 días',
    estadoActual: 'Activo - Plan personalizado'
  }
];

const ofertas: Oferta[] = [
  {
    id: 'of1',
    tipo: 'Descuento Porcentual',
    descripcion: '30% OFF primer mes',
    descuento: '30%',
    codigo: 'VUELVE30',
    redenciones: 23,
    limite: 50
  },
  {
    id: 'of2',
    tipo: 'Sesiones Gratis',
    descripcion: '5 sesiones gratis al volver',
    descuento: '5 sesiones',
    codigo: 'SESIONES5',
    redenciones: 18,
    limite: 30
  },
  {
    id: 'of3',
    tipo: 'Upgrade Temporal',
    descripcion: 'Premium gratis por 1 mes',
    descuento: '100% mes 1',
    codigo: 'PREMIUM1M',
    redenciones: 12,
    limite: 25
  }
];

const razonesPrincipales = [
  { razon: 'Falta de tiempo', cantidad: 42, porcentaje: 32 },
  { razon: 'Precio elevado', cantidad: 35, porcentaje: 27 },
  { razon: 'Insatisfacción', cantidad: 28, porcentaje: 21 },
  { razon: 'Viaje/Mudanza', cantidad: 15, porcentaje: 11 },
  { razon: 'Logró objetivo', cantidad: 12, porcentaje: 9 }
];

const tendenciaChurn = [
  { mes: 'Ene', churnRate: 8.5, reactivados: 32 },
  { mes: 'Feb', churnRate: 9.2, reactivados: 28 },
  { mes: 'Mar', churnRate: 7.8, reactivados: 38 },
  { mes: 'Abr', churnRate: 8.9, reactivados: 35 },
  { mes: 'May', churnRate: 7.2, reactivados: 43 },
  { mes: 'Jun', churnRate: 6.8, reactivados: 47 }
];

const comparativaEstrategias = [
  { estrategia: 'Descuento', tasa: 42, costo: 850, roi: 148 },
  { estrategia: 'Email Emotivo', tasa: 28, costo: 120, roi: 233 },
  { estrategia: 'Upgrade Temp', tasa: 35, costo: 450, roi: 178 },
  { estrategia: 'Llamada Personal', tasa: 58, costo: 1200, roi: 145 },
  { estrategia: 'Feedback', tasa: 52, costo: 320, roi: 291 }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const ReactivacionClientesPage: React.FC = () => {
  const [segmentoSeleccionado, setSegmentoSeleccionado] = useState<string | null>(null);
  const [ordenarPor, setOrdenarPor] = useState<'diasInactivo' | 'ltv' | 'probabilidad'>('probabilidad');
  const [busqueda, setBusqueda] = useState('');

  const clientesFiltrados = clientesInactivos
    .filter(c =>
      (segmentoSeleccionado ? c.nivelRiesgo === segmentoSeleccionado : true) &&
      (busqueda ? c.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true)
    )
    .sort((a, b) => {
      if (ordenarPor === 'diasInactivo') return b.diasInactivo - a.diasInactivo;
      if (ordenarPor === 'ltv') return b.ltv - a.ltv;
      return b.probabilidadRetorno - a.probabilidadRetorno;
    });

  const getNivelRiesgoColor = (nivel: string) => {
    switch (nivel) {
      case 'en-riesgo': return 'from-yellow-400 to-amber-500';
      case 'inactivo': return 'from-orange-400 to-orange-600';
      case 'casi-perdido': return 'from-red-400 to-red-600';
      case 'perdido': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const COLORS = ['#f59e0b', '#f97316', '#ef4444', '#9ca3af'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/30 pb-12">

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <RefreshCw className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Reactivación de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Clientes Inactivos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Recupera clientes <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">antes de perderlos para siempre</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Sistema predictivo con IA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Campañas automatizadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">34% tasa de reactivación</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================
          ESTADÍSTICAS RÁPIDAS
          ============================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estadisticasRapidas.map((stat, index) => (
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
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icono className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.titulo}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.valor}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.cambio}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progreso}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ============================================
          DASHBOARD DE INACTIVIDAD
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 mb-2">
                Segmentación de Inactividad
              </h2>
              <p className="text-gray-600">Clientes organizados por nivel de riesgo</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {segmentosInactividad.map((segmento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSegmentoSeleccionado(segmento.nivel === segmentoSeleccionado ? null : segmento.nivel)}
                className={`cursor-pointer bg-gradient-to-br ${segmento.bgColor} rounded-2xl p-6 border-2 transition-all duration-300 ${
                  segmentoSeleccionado === segmento.nivel
                    ? `border-${segmento.color}-500 shadow-xl`
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 bg-gradient-to-br ${segmento.gradiente} rounded-xl`}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 bg-white/80 text-${segmento.color}-600 text-xs font-bold rounded-full`}>
                    {segmento.urgencia}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold text-${segmento.color}-700 mb-1`}>
                  {segmento.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{segmento.descripcion}</p>

                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-bold text-${segmento.color}-600`}>
                    {segmento.cantidad}
                  </span>
                  <span className="text-lg text-gray-500 mb-2">clientes</span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{segmento.descripcion}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gráfico de distribución */}
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Distribución de Inactividad</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={segmentosInactividad}
                  dataKey="cantidad"
                  nameKey="titulo"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {segmentosInactividad.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* ============================================
          LISTA DE CLIENTES EN RIESGO
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 mb-2">
              Clientes en Riesgo
            </h2>
            <p className="text-gray-600">Prioriza acciones según probabilidad de retorno</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80"
              />
            </div>

            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value as any)}
              className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none bg-white/80 font-semibold text-gray-700"
            >
              <option value="probabilidad">Ordenar por: Probabilidad</option>
              <option value="ltv">Ordenar por: LTV</option>
              <option value="diasInactivo">Ordenar por: Días inactivo</option>
            </select>

            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {clientesFiltrados.map((cliente, index) => (
            <motion.div
              key={cliente.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-300 border border-transparent hover:border-orange-200 hover:shadow-md group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Avatar y info básica */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-orange-400 to-amber-600">
                    {cliente.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{cliente.nombre}</h3>
                      <span className={`px-2 py-1 bg-gradient-to-r ${getNivelRiesgoColor(cliente.nivelRiesgo)} text-white text-xs font-bold rounded-full`}>
                        {cliente.nivelRiesgo.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {cliente.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {cliente.telefono}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Días Inactivo</p>
                    <p className="text-xl font-bold text-orange-600">{cliente.diasInactivo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Plan</p>
                    <p className="text-sm font-bold text-gray-800">{cliente.planActual}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">LTV</p>
                    <p className="text-xl font-bold text-green-600">${cliente.ltv}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Prob. Retorno</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            cliente.probabilidadRetorno > 70 ? 'bg-green-500' :
                            cliente.probabilidadRetorno > 40 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${cliente.probabilidadRetorno}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{cliente.probabilidadRetorno}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Última Actividad</p>
                    <p className="text-xs font-medium text-gray-700">{cliente.ultimaActividad}</p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-2">
                  <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 group/btn">
                    <Mail className="w-5 h-5 text-blue-600 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button className="p-2 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 group/btn">
                    <Phone className="w-5 h-5 text-green-600 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button className="p-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 group/btn">
                    <Gift className="w-5 h-5 text-purple-600 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 group/btn">
                    <XCircle className="w-5 h-5 text-gray-600 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Info adicional expandible */}
              <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span><strong>Último contacto:</strong> {cliente.ultimoContacto}</span>
                </div>
                {cliente.razonInactividad && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span><strong>Razón:</strong> {cliente.razonInactividad}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Grid de 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* ============================================
            CAMPAÑAS DE REACTIVACIÓN
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-1">
                  Campañas de Reactivación
                </h2>
                <p className="text-sm text-gray-600">Templates listos para usar</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Send className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              {campanasReactivacion.map((campana, index) => (
                <motion.div
                  key={campana.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.3 }}
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{campana.nombre}</h3>
                      <p className="text-sm text-gray-600">{campana.descripcion}</p>
                    </div>
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                      {campana.tasaExito}% éxito
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Contactados</p>
                      <p className="text-lg font-bold text-gray-700">{campana.clientesContactados}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reactivados</p>
                      <p className="text-lg font-bold text-green-600">{campana.clientesReactivados}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ingresos</p>
                      <p className="text-lg font-bold text-blue-600">${(campana.ingresoRecuperado / 1000).toFixed(1)}K</p>
                    </div>
                  </div>

                  <button className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-lg">
                    Lanzar Campaña
                  </button>
                </motion.div>
              ))}
            </div>

            <button className="mt-4 w-full py-3 border-2 border-dashed border-purple-300 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300">
              + Crear Nueva Campaña
            </button>
          </div>
        </motion.div>

        {/* ============================================
            SECUENCIA DE REACTIVACIÓN
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
                  Secuencia Automatizada
                </h2>
                <p className="text-sm text-gray-600">Flujo multi-paso de reactivación</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="space-y-4 relative">
              {/* Línea vertical conectora */}
              <div className="absolute left-[21px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-300 via-indigo-300 to-purple-300"></div>

              {secuenciaReactivacion.map((paso, index) => (
                <motion.div
                  key={paso.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.3 }}
                  className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                    paso.activo
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-200 opacity-60'
                  }`}
                >
                  {/* Día badge */}
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold shadow-lg z-10 ${
                    paso.activo
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                      : 'bg-gray-400 text-white'
                  }`}>
                    D{paso.dia}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {paso.canal === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                      {paso.canal === 'sms' && <MessageSquare className="w-4 h-4 text-green-600" />}
                      {paso.canal === 'push' && <Zap className="w-4 h-4 text-yellow-600" />}
                      {paso.canal === 'llamada' && <Phone className="w-4 h-4 text-purple-600" />}
                      <span className="text-xs font-bold text-gray-600 uppercase">{paso.canal}</span>
                    </div>
                    <p className="text-sm text-gray-700">{paso.mensaje}</p>
                  </div>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paso.activo}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-500 rounded-full peer transition-colors duration-300 relative">
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform duration-300"></div>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Editar Secuencia
              </button>
              <button className="px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300">
                Pausar
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================
          WIN-BACK SUCCESS STORIES
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
              Historias de Éxito
            </h2>
            <p className="text-gray-600">Clientes que regresaron exitosamente</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl">
            <Award className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          {historiasExito.map((historia, index) => (
            <motion.div
              key={historia.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.9, duration: 0.4 }}
              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 border border-transparent hover:border-green-200 hover:shadow-md group relative"
            >
              {/* Línea vertical (excepto último) */}
              {index < historiasExito.length - 1 && (
                <div className="absolute left-[37px] top-16 w-0.5 h-full bg-gradient-to-b from-green-200 to-transparent"></div>
              )}

              <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-green-400 to-emerald-600 relative z-10">
                {historia.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{historia.cliente}</h3>
                    <p className="text-sm text-gray-600">Inactivo por <span className="font-bold text-orange-600">{historia.diasInactivo} días</span></p>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Reactivado
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span><strong>Estrategia:</strong> {historia.estrategia}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span><strong>Retornó:</strong> {historia.fechaRetorno}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span><strong>Estado actual:</strong> {historia.estadoActual}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
          <Heart className="w-5 h-5" />
          Ver Todas las Historias de Éxito
        </button>
      </motion.div>

      {/* Grid de 3 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* ============================================
            OFERTAS PERSONALIZADAS
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Ofertas Activas</h3>
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Gift className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            {ofertas.map((oferta, index) => (
              <motion.div
                key={oferta.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 1.1, duration: 0.3 }}
                className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs font-bold text-purple-600 uppercase">{oferta.tipo}</p>
                    <p className="text-sm font-bold text-gray-800">{oferta.descripcion}</p>
                  </div>
                  <div className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-lg">
                    {oferta.descuento}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Código:</span>
                  <span className="text-sm font-mono font-bold text-purple-700">{oferta.codigo}</span>
                </div>

                <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${(oferta.redenciones / oferta.limite) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {oferta.redenciones}/{oferta.limite} redenciones
                </p>
              </motion.div>
            ))}
          </div>

          <button className="mt-4 w-full py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 text-sm">
            + Crear Oferta
          </button>
        </motion.div>

        {/* ============================================
            RAZONES DE INACTIVIDAD
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Razones Principales</h3>
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            {razonesPrincipales.map((razon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 1.2, duration: 0.3 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-700">{razon.razon}</span>
                  <span className="font-bold text-gray-900">{razon.cantidad}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${razon.porcentaje}%` }}
                      transition={{ delay: index * 0.1 + 1.3, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 w-10 text-right">{razon.porcentaje}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <p className="text-sm text-gray-700">
              <strong>Insight:</strong> El <span className="text-orange-600 font-bold">59%</span> de las bajas son por razones solucionables
            </p>
          </div>
        </motion.div>

        {/* ============================================
            PREVENCIÓN PROACTIVA
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Prevención IA</h3>
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-800">Ana López</p>
                  <p className="text-xs text-gray-600">Riesgo de abandono: 78%</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 mb-2">
                <strong>Señales:</strong> Disminución 40% en sesiones, no abre emails
              </p>
              <button className="w-full py-2 bg-yellow-500 text-white rounded-lg text-xs font-bold hover:bg-yellow-600 transition-colors">
                Intervenir Ahora
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500">
              <div className="flex items-start gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-800">Carlos Vega</p>
                  <p className="text-xs text-gray-600">Engagement decreciente</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 mb-2">
                <strong>Señales:</strong> Feedback negativo, canceló 2 reservas
              </p>
              <button className="w-full py-2 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors">
                Check-in Proactivo
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
              <p className="text-xs text-gray-700 mb-2">
                <strong>Detectando patrones...</strong>
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-600">Análisis de comportamiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-600">Predicción de churn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span className="text-xs text-gray-600">Recomendaciones personalizadas</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================
          ANÁLISIS Y COMPARATIVAS
          ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Tendencia de Churn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Tendencia de Churn</h3>
              <p className="text-sm text-gray-600">Últimos 6 meses</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tendenciaChurn}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="churnRate"
                stroke="#ef4444"
                strokeWidth={3}
                name="Churn Rate (%)"
                dot={{ fill: '#ef4444', r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="reactivados"
                stroke="#10b981"
                strokeWidth={3}
                name="Reactivados"
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 rounded-xl border border-red-200">
              <p className="text-xs text-gray-600 mb-1">Churn Promedio</p>
              <p className="text-2xl font-bold text-red-600">8.1%</p>
              <p className="text-xs text-green-600 font-semibold">↓ -15% vs anterior</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Reactivados Mes</p>
              <p className="text-2xl font-bold text-green-600">47</p>
              <p className="text-xs text-green-600 font-semibold">↑ +23% vs anterior</p>
            </div>
          </div>
        </motion.div>

        {/* Comparador de Estrategias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Comparador de Estrategias</h3>
              <p className="text-sm text-gray-600">Efectividad y ROI</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparativaEstrategias}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="estrategia" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="tasa" fill="#3b82f6" name="Tasa Éxito (%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="roi" fill="#10b981" name="ROI (%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <p className="font-bold text-gray-800">Mejor Estrategia</p>
            </div>
            <p className="text-sm text-gray-700">
              <strong className="text-green-600">Feedback</strong> tiene el mejor ROI (291%) y alta tasa de éxito (52%)
            </p>
          </div>
        </motion.div>
      </div>

      {/* ============================================
          REPORTES DE RETENCIÓN
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
              Reporte de Retención
            </h2>
            <p className="text-gray-600">Métricas clave del mes actual</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Churn Rate', value: '6.8%', change: '-15%', color: 'red', icon: TrendingDown },
            { label: 'Tasa Reactivación', value: '34%', change: '+5.2%', color: 'green', icon: RefreshCw },
            { label: 'Valor Recuperado', value: '$28.5K', change: '+18.7%', color: 'blue', icon: DollarSign },
            { label: 'CAC Reactivación', value: '$85', change: '-12%', color: 'purple', icon: Target },
            { label: 'ROI Win-Back', value: '235%', change: '+28%', color: 'emerald', icon: TrendingUp }
          ].map((metrica, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 1.6, duration: 0.3 }}
              className={`p-4 rounded-2xl bg-gradient-to-br from-${metrica.color}-50 to-${metrica.color}-100 border border-${metrica.color}-200`}
            >
              <div className={`w-10 h-10 rounded-xl bg-${metrica.color}-500 flex items-center justify-center text-white mb-3`}>
                <metrica.icon className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-600 mb-1">{metrica.label}</p>
              <p className={`text-2xl font-bold text-${metrica.color}-700 mb-1`}>{metrica.value}</p>
              <p className={`text-xs font-semibold ${metrica.change.startsWith('-') ? 'text-green-600' : 'text-green-600'}`}>
                {metrica.change} vs anterior
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-2xl border border-purple-200">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Resumen Ejecutivo</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">✅ <strong>214 clientes</strong> en programas de reactivación</p>
                </div>
                <div>
                  <p className="text-gray-600">📈 <strong>47 reactivaciones</strong> exitosas este mes</p>
                </div>
                <div>
                  <p className="text-gray-600">💰 <strong>$28.5K ingresos</strong> recuperados</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700 font-semibold">
                La estrategia de reactivación está generando un ROI de 235%, superando el objetivo del 180%
              </p>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default ReactivacionClientesPage;
