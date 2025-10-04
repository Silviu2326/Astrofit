import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Plus,
  BarChart3,
  Settings,
  DollarSign,
  Percent,
  ShoppingCart,
  Zap,
  Eye,
  MousePointerClick,
  CheckCircle,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  Target,
  Users,
  Package,
  Gift,
  ArrowRight,
  ArrowDown,
  TrendingDown,
  Sparkles,
  Mail,
  Calendar,
  Filter,
  X,
  ChevronRight,
  Lightbulb,
  Star,
  Brain,
  Layers,
  Clock,
  Tag,
  ArrowUpRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Tipos
type OfferType = 'upsell' | 'cross-sell' | 'downsell' | 'bundle';
type OfferStatus = 'activa' | 'pausada' | 'borrador' | 'finalizada';
type TriggerType = 'checkout' | 'post-compra' | 'email' | 'perfil' | 'popup';
type DiscountType = 'none' | 'percentage' | 'fixed';

interface Offer {
  id: string;
  name: string;
  type: OfferType;
  status: OfferStatus;
  baseProduct: string;
  suggestedProduct: string;
  trigger: TriggerType;
  discount: number;
  discountType: DiscountType;
  views: number;
  conversions: number;
  revenue: number;
  message: string;
  segments: string[];
  createdAt: string;
  performanceData: { date: string; conversions: number; revenue: number }[];
}

interface KPI {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
  trend: { date: string; value: number }[];
}

// Datos mockeados
const mockOffers: Offer[] = [
  {
    id: '1',
    name: 'Upgrade a Premium',
    type: 'upsell',
    status: 'activa',
    baseProduct: 'Membresía Básica',
    suggestedProduct: 'Membresía Premium (+€20/mes)',
    trigger: 'checkout',
    discount: 10,
    discountType: 'percentage',
    views: 1234,
    conversions: 223,
    revenue: 3400,
    message: '¡Mejora a Premium y obtén sesiones ilimitadas!',
    segments: ['Nuevos clientes', 'Clientes activos >3 meses'],
    createdAt: '2025-07-15',
    performanceData: [
      { date: '1 Ene', conversions: 45, revenue: 680 },
      { date: '8 Ene', conversions: 62, revenue: 930 },
      { date: '15 Ene', conversions: 56, revenue: 840 },
      { date: '22 Ene', conversions: 60, revenue: 950 }
    ]
  },
  {
    id: '2',
    name: 'Añade Nutrición',
    type: 'cross-sell',
    status: 'activa',
    baseProduct: 'Membresía Básica',
    suggestedProduct: 'Plan de Nutrición (+€15/mes)',
    trigger: 'post-compra',
    discount: 0,
    discountType: 'none',
    views: 892,
    conversions: 107,
    revenue: 1800,
    message: 'Añade nutrición personalizada a tu plan',
    segments: ['Todos los clientes'],
    createdAt: '2025-07-10',
    performanceData: [
      { date: '1 Ene', conversions: 20, revenue: 340 },
      { date: '8 Ene', conversions: 28, revenue: 480 },
      { date: '15 Ene', conversions: 31, revenue: 520 },
      { date: '22 Ene', conversions: 28, revenue: 460 }
    ]
  },
  {
    id: '3',
    name: 'Bundle Completo',
    type: 'bundle',
    status: 'activa',
    baseProduct: 'Membresía Premium + Nutrición + 1-on-1',
    suggestedProduct: 'Pack Completo (€80/mes)',
    trigger: 'checkout',
    discount: 16,
    discountType: 'percentage',
    views: 567,
    conversions: 125,
    revenue: 4200,
    message: 'Pack Completo - Ahorra 16%',
    segments: ['Clientes de alto valor'],
    createdAt: '2025-08-01',
    performanceData: [
      { date: '1 Ene', conversions: 28, revenue: 940 },
      { date: '8 Ene', conversions: 35, revenue: 1170 },
      { date: '15 Ene', conversions: 32, revenue: 1070 },
      { date: '22 Ene', conversions: 30, revenue: 1020 }
    ]
  },
  {
    id: '4',
    name: 'Sesiones Extra',
    type: 'cross-sell',
    status: 'pausada',
    baseProduct: 'Membresía Premium',
    suggestedProduct: 'Pack 5 Sesiones 1-on-1 (+€50)',
    trigger: 'perfil',
    discount: 15,
    discountType: 'fixed',
    views: 445,
    conversions: 36,
    revenue: 1260,
    message: 'Añade sesiones personalizadas con descuento',
    segments: ['Clientes con alta adherencia'],
    createdAt: '2025-06-20',
    performanceData: [
      { date: '1 Ene', conversions: 8, revenue: 280 },
      { date: '8 Ene', conversions: 10, revenue: 350 },
      { date: '15 Ene', conversions: 9, revenue: 315 },
      { date: '22 Ene', conversions: 9, revenue: 315 }
    ]
  },
  {
    id: '5',
    name: 'Renovación Anual con Descuento',
    type: 'upsell',
    status: 'borrador',
    baseProduct: 'Membresía Mensual',
    suggestedProduct: 'Membresía Anual (Ahorra 2 meses)',
    trigger: 'email',
    discount: 20,
    discountType: 'percentage',
    views: 0,
    conversions: 0,
    revenue: 0,
    message: 'Paga anual y ahorra €120 al año',
    segments: ['Clientes activos >6 meses'],
    createdAt: '2025-09-28',
    performanceData: []
  },
  {
    id: '6',
    name: 'Descuento Primera Semana',
    type: 'downsell',
    status: 'activa',
    baseProduct: 'Membresía Premium',
    suggestedProduct: 'Membresía Básica (-€10/mes)',
    trigger: 'checkout',
    discount: 25,
    discountType: 'percentage',
    views: 234,
    conversions: 18,
    revenue: 540,
    message: 'Comienza con Básica y ahorra - siempre puedes mejorar',
    segments: ['Nuevos clientes'],
    createdAt: '2025-08-15',
    performanceData: [
      { date: '1 Ene', conversions: 4, revenue: 120 },
      { date: '8 Ene', conversions: 5, revenue: 150 },
      { date: '15 Ene', conversions: 5, revenue: 150 },
      { date: '22 Ene', conversions: 4, revenue: 120 }
    ]
  },
  {
    id: '7',
    name: 'Recompensa por Referido',
    type: 'cross-sell',
    status: 'activa',
    baseProduct: 'Cualquier membresía',
    suggestedProduct: '1 Mes Gratis por cada referido',
    trigger: 'popup',
    discount: 0,
    discountType: 'none',
    views: 1567,
    conversions: 89,
    revenue: 2670,
    message: 'Invita amigos y gana meses gratis',
    segments: ['Todos los clientes'],
    createdAt: '2025-07-01',
    performanceData: [
      { date: '1 Ene', conversions: 18, revenue: 540 },
      { date: '8 Ene', conversions: 24, revenue: 720 },
      { date: '15 Ene', conversions: 25, revenue: 750 },
      { date: '22 Ene', conversions: 22, revenue: 660 }
    ]
  },
  {
    id: '8',
    name: 'Upgrade Post-Sesión',
    type: 'upsell',
    status: 'activa',
    baseProduct: 'Membresía Básica',
    suggestedProduct: 'Membresía Premium (+€20/mes)',
    trigger: 'popup',
    discount: 0,
    discountType: 'none',
    views: 678,
    conversions: 95,
    revenue: 1900,
    message: 'Desbloquea más sesiones después de tu entreno',
    segments: ['Clientes con alta adherencia'],
    createdAt: '2025-08-10',
    performanceData: [
      { date: '1 Ene', conversions: 20, revenue: 400 },
      { date: '8 Ene', conversions: 26, revenue: 520 },
      { date: '15 Ene', conversions: 25, revenue: 500 },
      { date: '22 Ene', conversions: 24, revenue: 480 }
    ]
  }
];

const mockKPIs: KPI[] = [
  {
    title: 'Upsells Este Mes',
    value: '€15,770',
    change: 23.5,
    icon: DollarSign,
    color: 'text-emerald-600',
    trend: [
      { date: '1', value: 3200 },
      { date: '5', value: 4100 },
      { date: '10', value: 5800 },
      { date: '15', value: 7200 },
      { date: '20', value: 9500 },
      { date: '25', value: 12300 },
      { date: '30', value: 15770 }
    ]
  },
  {
    title: 'Tasa de Conversión',
    value: '16.8%',
    change: 3.2,
    icon: Percent,
    color: 'text-green-600',
    trend: [
      { date: '1', value: 14.2 },
      { date: '5', value: 15.1 },
      { date: '10', value: 14.8 },
      { date: '15', value: 15.9 },
      { date: '20', value: 16.4 },
      { date: '25', value: 16.2 },
      { date: '30', value: 16.8 }
    ]
  },
  {
    title: 'Ticket Promedio',
    value: '€22.40',
    change: 12.8,
    icon: TrendingUp,
    color: 'text-teal-600',
    trend: [
      { date: '1', value: 18.5 },
      { date: '5', value: 19.2 },
      { date: '10', value: 20.1 },
      { date: '15', value: 20.8 },
      { date: '20', value: 21.5 },
      { date: '25', value: 21.9 },
      { date: '30', value: 22.4 }
    ]
  },
  {
    title: 'ROI de Sugerencias',
    value: '385%',
    change: 42.3,
    icon: Target,
    color: 'text-cyan-600',
    trend: [
      { date: '1', value: 280 },
      { date: '5', value: 305 },
      { date: '10', value: 320 },
      { date: '15', value: 340 },
      { date: '20', value: 355 },
      { date: '25', value: 370 },
      { date: '30', value: 385 }
    ]
  }
];

// Motor de recomendaciones - Algoritmos
const recommendationAlgorithms = [
  {
    id: 'historial',
    name: 'Basado en Historial',
    description: 'Analiza compras previas del cliente',
    weight: 35,
    enabled: true,
    icon: Clock
  },
  {
    id: 'complementarios',
    name: 'Productos Complementarios',
    description: 'Encuentra productos que se compran juntos',
    weight: 30,
    enabled: true,
    icon: Package
  },
  {
    id: 'tendencias',
    name: 'Tendencias Similares',
    description: 'Clientes similares también compraron',
    weight: 20,
    enabled: true,
    icon: Users
  },
  {
    id: 'ia-predictiva',
    name: 'IA Predictiva',
    description: 'Predicción basada en machine learning',
    weight: 15,
    enabled: true,
    icon: Brain
  }
];

// Productos sugeridos con scores
const suggestedProducts = [
  {
    id: 'p1',
    name: 'Membresía Premium Anual',
    baseProduct: 'Membresía Básica',
    price: 199,
    discount: 20,
    relevanceScore: 94,
    reason: 'Alta adherencia (15 sesiones/mes)',
    image: '💎',
    conversions: 156,
    revenue: 31104,
    reasons: [
      { algorithm: 'Historial', weight: 32 },
      { algorithm: 'IA Predictiva', weight: 28 },
      { algorithm: 'Tendencias', weight: 24 },
      { algorithm: 'Complementarios', weight: 10 }
    ]
  },
  {
    id: 'p2',
    name: 'Plan de Nutrición Personalizado',
    baseProduct: 'Membresía Premium',
    price: 45,
    discount: 0,
    relevanceScore: 87,
    reason: 'Perfil ideal: Sin plan nutricional activo',
    image: '🥗',
    conversions: 203,
    revenue: 9135,
    reasons: [
      { algorithm: 'Complementarios', weight: 38 },
      { algorithm: 'Tendencias', weight: 30 },
      { algorithm: 'Historial', weight: 12 },
      { algorithm: 'IA Predictiva', weight: 7 }
    ]
  },
  {
    id: 'p3',
    name: 'Pack 10 Sesiones 1-on-1',
    baseProduct: 'Membresía Premium',
    price: 95,
    discount: 15,
    relevanceScore: 82,
    reason: 'Clientes con LTV >€800',
    image: '🎯',
    conversions: 89,
    revenue: 7605,
    reasons: [
      { algorithm: 'IA Predictiva', weight: 35 },
      { algorithm: 'Historial', weight: 28 },
      { algorithm: 'Tendencias', weight: 22 },
      { algorithm: 'Complementarios', weight: 15 }
    ]
  },
  {
    id: 'p4',
    name: 'Bundle Completo: Entreno + Nutrición + Coaching',
    baseProduct: 'Cualquiera',
    price: 129,
    discount: 25,
    relevanceScore: 78,
    reason: 'Ahorro de 25% vs productos individuales',
    image: '🎁',
    conversions: 134,
    revenue: 12978,
    reasons: [
      { algorithm: 'Complementarios', weight: 42 },
      { algorithm: 'Tendencias', weight: 28 },
      { algorithm: 'Historial', weight: 18 },
      { algorithm: 'IA Predictiva', weight: 12 }
    ]
  },
  {
    id: 'p5',
    name: 'Programa de Referidos VIP',
    baseProduct: 'Membresía Premium',
    price: 0,
    discount: 0,
    relevanceScore: 71,
    reason: 'Cliente activo >6 meses con alta satisfacción',
    image: '👥',
    conversions: 267,
    revenue: 8010,
    reasons: [
      { algorithm: 'Historial', weight: 40 },
      { algorithm: 'IA Predictiva', weight: 30 },
      { algorithm: 'Tendencias', weight: 20 },
      { algorithm: 'Complementarios', weight: 10 }
    ]
  },
  {
    id: 'p6',
    name: 'Acceso App Mobile Premium',
    baseProduct: 'Membresía Básica',
    price: 12,
    discount: 0,
    relevanceScore: 68,
    reason: 'Clientes que entrenan fuera del gym',
    image: '📱',
    conversions: 412,
    revenue: 4944,
    reasons: [
      { algorithm: 'Tendencias', weight: 35 },
      { algorithm: 'Complementarios', weight: 30 },
      { algorithm: 'Historial', weight: 20 },
      { algorithm: 'IA Predictiva', weight: 15 }
    ]
  }
];

const mockRecommendations = [
  {
    id: 'r1',
    title: '15 clientes con Básica listos para Premium',
    description: 'Alta adherencia (>12 sesiones/mes) en los últimos 3 meses',
    potentialRevenue: 300,
    icon: TrendingUp,
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700'
  },
  {
    id: 'r2',
    title: 'Oportunidad: 23 clientes activos sin nutrición',
    description: 'Perfil ideal para cross-sell de plan nutricional',
    potentialRevenue: 345,
    icon: Package,
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  {
    id: 'r3',
    title: 'Crear bundle para segmento de alto valor',
    description: '8 clientes con LTV >€800 sin ofertas activas',
    potentialRevenue: 640,
    icon: Gift,
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  }
];

const templates = [
  {
    id: 't1',
    name: 'Upgrade a Premium',
    type: 'upsell' as OfferType,
    description: 'Oferta clásica de mejora a membresía premium'
  },
  {
    id: 't2',
    name: 'Añade Nutrición Personalizada',
    type: 'cross-sell' as OfferType,
    description: 'Cross-sell de plan nutricional'
  },
  {
    id: 't3',
    name: 'Pack Completo: Entreno + Nutrición',
    type: 'bundle' as OfferType,
    description: 'Bundle de productos con descuento'
  },
  {
    id: 't4',
    name: 'Sesiones 1-on-1 Adicionales',
    type: 'cross-sell' as OfferType,
    description: 'Añadir sesiones personalizadas'
  },
  {
    id: 't5',
    name: 'Descuento por Renovación Anual',
    type: 'upsell' as OfferType,
    description: 'Convertir mensual a anual con ahorro'
  },
  {
    id: 't6',
    name: 'Recompensa por Referido',
    type: 'cross-sell' as OfferType,
    description: 'Programa de referidos con incentivos'
  }
];

const SugerenciasProductosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'activas' | 'borradores' | 'finalizadas' | 'plantillas'>('activas');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [createStep, setCreateStep] = useState(1);

  // Estados del formulario de creación
  const [formData, setFormData] = useState({
    name: '',
    type: 'upsell' as OfferType,
    description: '',
    baseProduct: '',
    suggestedProduct: '',
    message: '',
    benefits: [''],
    discountType: 'none' as DiscountType,
    discountValue: 0,
    discountDuration: 'first-month',
    urgency: false,
    trigger: 'checkout' as TriggerType,
    segments: [] as string[],
    maxShows: 5,
    frequency: 7,
    template: 'card-large'
  });

  const filteredOffers = mockOffers.filter(offer => {
    if (activeTab === 'activas') return offer.status === 'activa';
    if (activeTab === 'borradores') return offer.status === 'borrador';
    if (activeTab === 'finalizadas') return offer.status === 'finalizada';
    return false;
  });

  const getTypeColor = (type: OfferType) => {
    switch (type) {
      case 'upsell': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'cross-sell': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'downsell': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'bundle': return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

  const getTypeLabel = (type: OfferType) => {
    switch (type) {
      case 'upsell': return 'Upsell';
      case 'cross-sell': return 'Cross-sell';
      case 'downsell': return 'Downsell';
      case 'bundle': return 'Bundle';
    }
  };

  const getStatusColor = (status: OfferStatus) => {
    switch (status) {
      case 'activa': return 'bg-green-100 text-green-700 border-green-200';
      case 'pausada': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'borrador': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'finalizada': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getTriggerLabel = (trigger: TriggerType) => {
    switch (trigger) {
      case 'checkout': return 'En checkout';
      case 'post-compra': return 'Post-compra';
      case 'email': return 'Email';
      case 'perfil': return 'Perfil';
      case 'popup': return 'Pop-up';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Star className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Sugerencias <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Inteligentes</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed mb-6">
            Aumenta tus ingresos con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">recomendaciones personalizadas</span>
          </p>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Crear Nueva Oferta
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfigModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              <Settings className="w-5 h-5" />
              Configuración
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS (4 cards con glassmorphism) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-8">
        {mockKPIs.map((kpi, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 ${
              kpi.color === 'text-emerald-600' ? 'bg-gradient-to-br from-emerald-200 to-emerald-300' :
              kpi.color === 'text-green-600' ? 'bg-gradient-to-br from-green-200 to-green-300' :
              kpi.color === 'text-teal-600' ? 'bg-gradient-to-br from-teal-200 to-teal-300' :
              'bg-gradient-to-br from-cyan-200 to-cyan-300'
            } rounded-full blur-3xl opacity-20`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl ${
                kpi.color === 'text-emerald-600' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                kpi.color === 'text-green-600' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                kpi.color === 'text-teal-600' ? 'bg-gradient-to-br from-teal-500 to-teal-600' :
                'bg-gradient-to-br from-cyan-500 to-cyan-600'
              } flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <kpi.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {kpi.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {kpi.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 ${kpi.change > 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  <ArrowUpRight className={`w-4 h-4 ${kpi.change > 0 ? 'text-green-600' : 'text-red-600 rotate-90'}`} />
                </div>
                <span className={`text-sm font-bold ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full ${
                    kpi.color === 'text-emerald-600' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                    kpi.color === 'text-green-600' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    kpi.color === 'text-teal-600' ? 'bg-gradient-to-r from-teal-500 to-teal-600' :
                    'bg-gradient-to-r from-cyan-500 to-cyan-600'
                  } rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOTOR DE RECOMENDACIONES */}
      <div className="px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Motor de Recomendaciones IA</h2>
                  <p className="text-gray-600">Algoritmos inteligentes para sugerencias personalizadas</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl font-semibold border border-purple-200 hover:border-purple-300 transition-all"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Algoritmos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {recommendationAlgorithms.map((algo, index) => (
                <motion.div
                  key={algo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-4 border-2 border-gray-200 hover:border-purple-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <algo.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={algo.enabled} />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{algo.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{algo.description}</p>

                  {/* Peso del algoritmo */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-medium">Peso</span>
                      <span className="font-bold text-purple-700">{algo.weight}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${algo.weight}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Estado del motor */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-900">Motor activo y aprendiendo</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-purple-700">1,247 sugerencias esta semana</span>
              </div>
              <button className="text-sm font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1">
                Ver rendimiento <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PRODUCTOS SUGERIDOS */}
      <div className="px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Productos Recomendados</h2>
              <p className="text-gray-600">Basado en análisis de IA y comportamiento de clientes</p>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 focus:border-emerald-500 focus:outline-none">
                <option>Todos los segmentos</option>
                <option>Nuevos clientes</option>
                <option>Clientes activos</option>
                <option>Alto valor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Badge de relevancia */}
                <div className="absolute top-4 right-4 z-20">
                  <div className={`px-3 py-1 rounded-full font-bold text-sm ${
                    product.relevanceScore >= 90 ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' :
                    product.relevanceScore >= 80 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' :
                    product.relevanceScore >= 70 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                    'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                  } shadow-lg flex items-center gap-1`}>
                    <Star className="w-3 h-3" />
                    {product.relevanceScore}
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                <div className="relative z-10">
                  {/* Imagen del producto */}
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg">
                    {product.image}
                  </div>

                  {/* Nombre y base */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">Para: {product.baseProduct}</p>

                  {/* Razón de sugerencia */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 mb-4 border border-purple-200">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-purple-700 font-medium">{product.reason}</p>
                    </div>
                  </div>

                  {/* Precio y descuento */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">€{product.price}</p>
                      {product.discount > 0 && (
                        <p className="text-sm text-green-600 font-semibold">{product.discount}% descuento</p>
                      )}
                    </div>
                    {product.discount > 0 && (
                      <div className="p-2 bg-green-100 rounded-xl">
                        <Tag className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Score de relevancia - barras de razones */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Factores de Relevancia</p>
                    {product.reasons.map((reason, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">{reason.algorithm}</span>
                          <span className="font-bold text-gray-700">{reason.weight}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${reason.weight}%` }}
                            transition={{ delay: 0.7 + index * 0.1 + idx * 0.05, duration: 0.6 }}
                            className={`h-full ${
                              idx === 0 ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                              idx === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                              idx === 2 ? 'bg-gradient-to-r from-teal-500 to-teal-600' :
                              'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            } rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Conversiones</p>
                      <p className="text-lg font-bold text-gray-900">{product.conversions}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Ingresos</p>
                      <p className="text-lg font-bold text-emerald-600">€{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Crear Campaña
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recomendaciones rápidas (las originales) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-8 mb-8"
      >
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Oportunidades Detectadas</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {mockRecommendations.map((rec) => (
              <motion.div
                key={rec.id}
                whileHover={{ scale: 1.02 }}
                className={`${rec.color} rounded-2xl p-4 border-2`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <rec.icon className="w-5 h-5 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{rec.title}</h3>
                    <p className="text-sm opacity-80">{rec.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">+€{rec.potentialRevenue} potencial</span>
                  <button className="text-sm font-semibold hover:underline">Crear Oferta →</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {(['activas', 'borradores', 'finalizadas', 'plantillas'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold capitalize transition-all relative ${
              activeTab === tab
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
            {tab !== 'plantillas' && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab === 'activas' ? mockOffers.filter(o => o.status === 'activa').length :
                 tab === 'borradores' ? mockOffers.filter(o => o.status === 'borrador').length :
                 mockOffers.filter(o => o.status === 'finalizada').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Plantillas */}
      {activeTab === 'plantillas' && (
        <div className="grid grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-dashed border-gray-300 hover:border-emerald-400 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-lg border ${getTypeColor(template.type)}`}>
                  <span className="text-sm font-semibold">{getTypeLabel(template.type)}</span>
                </div>
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Usar Plantilla
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lista de Ofertas */}
      {activeTab !== 'plantillas' && (
        <div className="grid grid-cols-2 gap-6">
          {filteredOffers.map((offer) => {
            const conversionRate = offer.views > 0 ? ((offer.conversions / offer.views) * 100).toFixed(1) : '0.0';
            const isHighPerformer = parseFloat(conversionRate) >= 15;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getStatusColor(offer.status)}`}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getTypeColor(offer.type)}`}>
                        {getTypeLabel(offer.type)}
                      </span>
                      {isHighPerformer && (
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-sm font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Top Performer
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{offer.name}</h3>
                    <p className="text-sm text-gray-600">{getTriggerLabel(offer.trigger)}</p>
                  </div>
                  {offer.status === 'activa' && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  )}
                </div>

                {/* Productos */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-gray-700">{offer.baseProduct}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-700">{offer.suggestedProduct}</span>
                  </div>
                  {offer.discount > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-700">
                        {offer.discountType === 'percentage' ? `${offer.discount}% descuento` : `€${offer.discount} descuento`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Mensaje */}
                <p className="text-sm text-gray-700 mb-4 italic">"{offer.message}"</p>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-gray-900">{offer.views.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-gray-600">Vistas</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-gray-900">{offer.conversions}</span>
                    </div>
                    <span className="text-xs text-gray-600">Conversiones</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span className="text-lg font-bold text-gray-900">€{offer.revenue.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-gray-600">Ingresos</span>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Tasa de Conversión</span>
                    <span className={`text-lg font-bold ${isHighPerformer ? 'text-green-600' : 'text-gray-900'}`}>
                      {conversionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${isHighPerformer ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-400'}`}
                      style={{ width: `${Math.min(parseFloat(conversionRate) * 4, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Mini Chart */}
                {offer.performanceData.length > 0 && (
                  <div className="h-20 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={offer.performanceData}>
                        <defs>
                          <linearGradient id={`perf-${offer.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" fill={`url(#perf-${offer.id})`} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Segmentos */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {offer.segments.map((segment, idx) => (
                      <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg border border-indigo-200">
                        {segment}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-100 transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedOffer(offer);
                      setShowAnalyticsModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition-all"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg font-semibold hover:bg-red-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal de Analytics */}
      <AnimatePresence>
        {showAnalyticsModal && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
            onClick={() => setShowAnalyticsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedOffer.name}</h2>
                    <p className="text-gray-600">Analytics Detallados</p>
                  </div>
                  <button
                    onClick={() => setShowAnalyticsModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* KPIs de la Oferta */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-700 font-semibold">Impresiones</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{selectedOffer.views.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MousePointerClick className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-700 font-semibold">Clicks en CTA</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{Math.round(selectedOffer.views * 0.45).toLocaleString()}</p>
                    <p className="text-xs text-purple-600 mt-1">45% CTR</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-700 font-semibold">Conversiones</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{selectedOffer.conversions}</p>
                    <p className="text-xs text-green-600 mt-1">{((selectedOffer.conversions / selectedOffer.views) * 100).toFixed(1)}% tasa</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-emerald-700 font-semibold">Ingresos</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-900">€{selectedOffer.revenue.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600 mt-1">€{(selectedOffer.revenue / selectedOffer.conversions).toFixed(2)} por conversión</p>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Rendimiento en el Tiempo</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedOffer.performanceData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          formatter={(value: any) => [`€${value}`, 'Ingresos']}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#colorRevenue)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Funnel */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Funnel de Conversión</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">Vistas</span>
                        <span className="font-bold text-gray-900">{selectedOffer.views.toLocaleString()} (100%)</span>
                      </div>
                      <div className="w-full bg-white rounded-lg h-12 flex items-center px-4 shadow-sm">
                        <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-lg" />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">Clicks en CTA</span>
                        <span className="font-bold text-gray-900">{Math.round(selectedOffer.views * 0.45).toLocaleString()} (45%)</span>
                      </div>
                      <div className="w-full bg-white rounded-lg h-12 flex items-center px-4 shadow-sm">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-6 rounded-lg" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">Conversiones</span>
                        <span className="font-bold text-gray-900">{selectedOffer.conversions} ({((selectedOffer.conversions / selectedOffer.views) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-white rounded-lg h-12 flex items-center px-4 shadow-sm">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-6 rounded-lg" style={{ width: `${(selectedOffer.conversions / selectedOffer.views) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mejores Segmentos */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Mejores Segmentos</h3>
                  <div className="space-y-3">
                    {selectedOffer.segments.map((segment, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${idx === 0 ? 'bg-amber-100' : 'bg-gray-100'} flex items-center justify-center`}>
                            <span className="font-bold text-sm">{idx + 1}</span>
                          </div>
                          <span className="font-semibold text-gray-700">{segment}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{20 - idx * 2}% conversión</span>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold">
                            €{(800 - idx * 150).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Configuración */}
      <AnimatePresence>
        {showConfigModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
            onClick={() => setShowConfigModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Configuración Global</h2>
                    <p className="text-gray-600">Ajusta el comportamiento de los upsells</p>
                  </div>
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">Habilitar upsells en checkout</p>
                      <p className="text-sm text-gray-600">Mostrar ofertas durante el proceso de compra</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">Habilitar cross-sells en perfil</p>
                      <p className="text-sm text-gray-600">Mostrar productos complementarios en el dashboard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block font-semibold text-gray-900 mb-2">Frecuencia máxima por cliente</label>
                    <p className="text-sm text-gray-600 mb-3">Número máximo de ofertas por mes</p>
                    <input type="number" defaultValue="5" className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">Excluir clientes que rechazaron</p>
                      <p className="text-sm text-gray-600">No mostrar ofertas rechazadas anteriormente</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div>
                      <p className="font-semibold text-amber-900">Modo de prueba</p>
                      <p className="text-sm text-amber-700">No mostrar ofertas a clientes reales</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Crear Oferta */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
            onClick={() => {
              setShowCreateModal(false);
              setCreateStep(1);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Header con Steps */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear Nueva Oferta</h2>
                    <div className="flex items-center gap-2 mt-4">
                      {[1, 2, 3, 4, 5, 6].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                            createStep === step ? 'bg-emerald-600 text-white' :
                            createStep > step ? 'bg-emerald-100 text-emerald-700' :
                            'bg-gray-200 text-gray-500'
                          }`}>
                            {step}
                          </div>
                          {step < 6 && <div className={`w-8 h-1 ${createStep > step ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setCreateStep(1);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Paso 1: Información Básica */}
                {createStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">Nombre de la Oferta</label>
                      <input
                        type="text"
                        placeholder="Ej: Upgrade a Premium"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-900 mb-3">Tipo de Oferta</label>
                      <div className="grid grid-cols-2 gap-4">
                        {(['upsell', 'cross-sell', 'downsell', 'bundle'] as const).map((type) => (
                          <label
                            key={type}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.type === type ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="type"
                              value={type}
                              checked={formData.type === type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value as OfferType })}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                formData.type === type ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                              } flex items-center justify-center`}>
                                {formData.type === type && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{getTypeLabel(type)}</p>
                                <p className="text-xs text-gray-600">
                                  {type === 'upsell' && 'Vender producto superior'}
                                  {type === 'cross-sell' && 'Producto complementario'}
                                  {type === 'downsell' && 'Alternativa más económica'}
                                  {type === 'bundle' && 'Paquete de productos'}
                                </p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">Descripción (opcional)</label>
                      <textarea
                        placeholder="Describe el objetivo de esta oferta..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Paso 2: Configurar Productos */}
                {createStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">Producto Base</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none">
                        <option>Membresía Básica</option>
                        <option>Membresía Premium</option>
                        <option>Plan de Nutrición</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">
                        {formData.type === 'bundle' ? 'Productos Incluidos' : 'Producto a Sugerir'}
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none">
                        <option>Membresía Premium (+€20/mes)</option>
                        <option>Plan de Nutrición (+€15/mes)</option>
                        <option>Pack 5 Sesiones 1-on-1 (+€50)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">Mensaje de la Oferta</label>
                      <input
                        type="text"
                        placeholder="¡Mejora a Premium y obtén sesiones ilimitadas!"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">Beneficios Adicionales</label>
                      <div className="space-y-2">
                        {formData.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Ej: Sesiones ilimitadas"
                              value={benefit}
                              onChange={(e) => {
                                const newBenefits = [...formData.benefits];
                                newBenefits[idx] = e.target.value;
                                setFormData({ ...formData, benefits: newBenefits });
                              }}
                              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            />
                            {formData.benefits.length > 1 && (
                              <button
                                onClick={() => {
                                  const newBenefits = formData.benefits.filter((_, i) => i !== idx);
                                  setFormData({ ...formData, benefits: newBenefits });
                                }}
                                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => setFormData({ ...formData, benefits: [...formData.benefits, ''] })}
                          className="text-emerald-600 font-semibold text-sm hover:text-emerald-700"
                        >
                          + Añadir Beneficio
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paso 3: Descuento y Pricing */}
                {createStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold text-gray-900 mb-3">Tipo de Descuento</label>
                      <div className="grid grid-cols-3 gap-4">
                        {(['none', 'percentage', 'fixed'] as const).map((type) => (
                          <label
                            key={type}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.discountType === type ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="discountType"
                              value={type}
                              checked={formData.discountType === type}
                              onChange={(e) => setFormData({ ...formData, discountType: e.target.value as DiscountType })}
                              className="sr-only"
                            />
                            <p className="font-semibold text-center">
                              {type === 'none' && 'Sin Descuento'}
                              {type === 'percentage' && 'Porcentaje (%)'}
                              {type === 'fixed' && 'Cantidad Fija (€)'}
                            </p>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.discountType !== 'none' && (
                      <>
                        <div>
                          <label className="block font-semibold text-gray-900 mb-2">Valor del Descuento</label>
                          <input
                            type="number"
                            placeholder={formData.discountType === 'percentage' ? '10' : '15'}
                            value={formData.discountValue}
                            onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                          <p className="text-sm text-emerald-700 font-semibold">Precio Final</p>
                          <p className="text-2xl font-bold text-emerald-900 mt-1">
                            €{formData.discountType === 'percentage' ? (20 - (20 * formData.discountValue / 100)).toFixed(2) : (20 - formData.discountValue).toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <label className="block font-semibold text-gray-900 mb-3">Duración del Descuento</label>
                          <div className="space-y-2">
                            {['first-month', 'first-3-months', 'permanent'].map((duration) => (
                              <label
                                key={duration}
                                className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer ${
                                  formData.discountDuration === duration ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="discountDuration"
                                  value={duration}
                                  checked={formData.discountDuration === duration}
                                  onChange={(e) => setFormData({ ...formData, discountDuration: e.target.value })}
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 ${
                                  formData.discountDuration === duration ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                                } flex items-center justify-center`}>
                                  {formData.discountDuration === duration && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <span className="font-semibold">
                                  {duration === 'first-month' && 'Solo primer mes'}
                                  {duration === 'first-3-months' && 'Primeros 3 meses'}
                                  {duration === 'permanent' && 'Permanente'}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <div>
                            <p className="font-semibold text-amber-900">Añadir Urgencia</p>
                            <p className="text-sm text-amber-700">Mostrar "¡Oferta limitada!"</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.urgency}
                              onChange={(e) => setFormData({ ...formData, urgency: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Paso 4: Trigger y Segmentación */}
                {createStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold text-gray-900 mb-3">¿Cuándo mostrar la oferta?</label>
                      <div className="space-y-2">
                        {(['checkout', 'post-compra', 'email', 'perfil', 'popup'] as const).map((trigger) => (
                          <label
                            key={trigger}
                            className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer ${
                              formData.trigger === trigger ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="trigger"
                                value={trigger}
                                checked={formData.trigger === trigger}
                                onChange={(e) => setFormData({ ...formData, trigger: e.target.value as TriggerType })}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                formData.trigger === trigger ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                              } flex items-center justify-center`}>
                                {formData.trigger === trigger && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <span className="font-semibold">{getTriggerLabel(trigger)}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {trigger === 'checkout' && 'Antes de pagar'}
                              {trigger === 'post-compra' && 'Página de gracias'}
                              {trigger === 'email' && 'X días después'}
                              {trigger === 'perfil' && 'Banner en dashboard'}
                              {trigger === 'popup' && 'Tras X sesiones'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-900 mb-3">¿A quién mostrar?</label>
                      <div className="space-y-2">
                        {['Todos los clientes', 'Solo nuevos clientes', 'Clientes con membresía básica', 'Clientes activos >3 meses', 'Clientes con alta adherencia', 'Clientes de alto valor (LTV >€500)'].map((segment) => (
                          <label
                            key={segment}
                            className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                          >
                            <input
                              type="checkbox"
                              checked={formData.segments.includes(segment)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({ ...formData, segments: [...formData.segments, segment] });
                                } else {
                                  setFormData({ ...formData, segments: formData.segments.filter(s => s !== segment) });
                                }
                              }}
                              className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="font-semibold">{segment}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">Mostrar máximo</label>
                        <input
                          type="number"
                          value={formData.maxShows}
                          onChange={(e) => setFormData({ ...formData, maxShows: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-600 mt-1">veces por cliente</p>
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">Frecuencia</label>
                        <input
                          type="number"
                          value={formData.frequency}
                          onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-600 mt-1">días entre ofertas</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paso 5: Diseño */}
                {createStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold text-gray-900 mb-3">Plantilla Visual</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['card-small', 'card-large', 'banner', 'modal', 'inline'].map((template) => (
                          <label
                            key={template}
                            className={`p-4 border-2 rounded-lg cursor-pointer ${
                              formData.template === template ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="template"
                              value={template}
                              checked={formData.template === template}
                              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className={`w-full h-16 rounded ${template === 'card-small' ? 'bg-gradient-to-br from-emerald-100 to-green-100' : template === 'card-large' ? 'bg-gradient-to-br from-blue-100 to-indigo-100' : template === 'banner' ? 'bg-gradient-to-r from-purple-100 to-pink-100' : template === 'modal' ? 'bg-gradient-to-br from-amber-100 to-yellow-100' : 'bg-gradient-to-br from-gray-100 to-slate-100'} mb-2`} />
                              <p className="text-sm font-semibold capitalize">{template.replace('-', ' ')}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">Vista Previa</h3>
                      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-200 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-emerald-700" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{formData.name || 'Nombre de la Oferta'}</h4>
                            <p className="text-gray-600 mb-3">{formData.message || 'Mensaje de la oferta'}</p>
                            {formData.benefits.filter(b => b).length > 0 && (
                              <ul className="space-y-1 mb-4">
                                {formData.benefits.filter(b => b).map((benefit, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            )}
                            <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold">
                              Mejorar Ahora
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paso 6: Revisión */}
                {createStep === 6 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de la Oferta</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nombre:</span>
                          <span className="font-semibold text-gray-900">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tipo:</span>
                          <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getTypeColor(formData.type)}`}>
                            {getTypeLabel(formData.type)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Trigger:</span>
                          <span className="font-semibold text-gray-900">{getTriggerLabel(formData.trigger)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Descuento:</span>
                          <span className="font-semibold text-gray-900">
                            {formData.discountType === 'none' ? 'Sin descuento' :
                             formData.discountType === 'percentage' ? `${formData.discountValue}%` :
                             `€${formData.discountValue}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Segmentos:</span>
                          <span className="font-semibold text-gray-900">{formData.segments.length || 'Todos'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-semibold text-blue-900">Test A/B</p>
                        <p className="text-sm text-blue-700">Crear variante B para comparar</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navegación */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                  {createStep > 1 && (
                    <button
                      onClick={() => setCreateStep(createStep - 1)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                    >
                      Anterior
                    </button>
                  )}
                  {createStep < 6 ? (
                    <button
                      onClick={() => setCreateStep(createStep + 1)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setShowCreateModal(false);
                          setCreateStep(1);
                        }}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                      >
                        Guardar como Borrador
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateModal(false);
                          setCreateStep(1);
                        }}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        Activar Oferta
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SugerenciasProductosPage;
