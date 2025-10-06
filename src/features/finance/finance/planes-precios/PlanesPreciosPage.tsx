import React, { useState } from 'react';
import {
  Layers,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Check,
  X,
  Edit2,
  Eye,
  CreditCard,
  Bell,
  Download,
  ChevronRight,
  Clock,
  AlertCircle,
  Zap,
  Crown,
  Star,
  Sparkles,
  Building2,
  HelpCircle,
  MessageSquare,
  Shield,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Trash2,
  Copy,
  Phone,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';
import Modal from '../../../../components/ui/modal';
import ConfirmationModal from '../../../../components/ui/confirmation-modal';

// ==================== TIPOS ====================
type PlanFrequency = 'monthly' | 'quarterly' | 'annual' | 'custom';
type PlanStatus = 'active' | 'inactive' | 'coming-soon';
type SubscriptionStatus = 'active' | 'trial' | 'paused' | 'cancelled' | 'payment-failed';
type CancellationPolicy = 'immediate' | 'end-of-period' | 'with-notice';

interface Feature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  limit?: string;
  icon: string;
}

interface Plan {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  badge?: string;
  color: string;
  price: number;
  frequency: PlanFrequency;
  status: PlanStatus;
  features: Feature[];
  subscribers: number;
  trialDays?: number;
  trialRequiresCard: boolean;
  annualDiscount?: number;
  setupFee?: number;
  autoRenew: boolean;
  cancellationPolicy: CancellationPolicy;
  isPopular?: boolean;
  mrr: number;
}

interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  startDate: string;
  nextRenewal: string;
  paymentMethod: string;
  mrr: number;
}

interface Alert {
  id: string;
  type: 'payment-failed' | 'trial-ending' | 'renewal-soon' | 'cancellation';
  message: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface Testimonial {
  id: string;
  name: string;
  business: string;
  plan: string;
  avatar: string;
  quote: string;
  rating: number;
}


// ==================== DATOS MOCKEADOS ====================
const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Básico',
    shortDescription: 'Perfecto para comenzar tu viaje fitness',
    longDescription: 'Ideal para personas que inician su transformación física con acceso a entrenamientos básicos.',
    badge: 'Mejor Inicio',
    color: '#3B82F6',
    price: 30,
    frequency: 'monthly',
    status: 'active',
    features: [
      { id: 'f1', name: '3 sesiones al mes', description: 'Entrenamientos personalizados', included: true, limit: '3/mes', icon: 'check' },
      { id: 'f2', name: 'Plan nutricional básico', description: 'Guía de alimentación', included: true, icon: 'check' },
      { id: 'f3', name: 'App móvil', description: 'Acceso a la aplicación', included: true, icon: 'check' },
      { id: 'f4', name: 'Seguimiento personalizado', description: 'Coach dedicado', included: false, icon: 'x' },
      { id: 'f5', name: 'Acceso 24/7 al gimnasio', description: 'Sin restricciones', included: false, icon: 'x' },
      { id: 'f6', name: 'Clases grupales', description: 'Ilimitadas', included: false, icon: 'x' },
    ],
    subscribers: 50,
    trialDays: 7,
    trialRequiresCard: false,
    setupFee: 0,
    autoRenew: true,
    cancellationPolicy: 'end-of-period',
    mrr: 1500,
  },
  {
    id: '2',
    name: 'Pro',
    shortDescription: 'Para atletas comprometidos',
    longDescription: 'El plan más popular para quienes buscan resultados serios con acompañamiento profesional.',
    badge: 'Más Popular',
    color: '#8B5CF6',
    price: 60,
    frequency: 'monthly',
    status: 'active',
    features: [
      { id: 'f1', name: '10 sesiones al mes', description: 'Entrenamientos personalizados', included: true, limit: '10/mes', icon: 'check' },
      { id: 'f2', name: 'Plan nutricional avanzado', description: 'Macros personalizados', included: true, icon: 'check' },
      { id: 'f3', name: 'App móvil', description: 'Acceso completo', included: true, icon: 'check' },
      { id: 'f4', name: 'Seguimiento personalizado', description: 'Coach dedicado', included: true, icon: 'check' },
      { id: 'f5', name: 'Acceso 24/7 al gimnasio', description: 'Sin restricciones', included: true, icon: 'check' },
      { id: 'f6', name: 'Clases grupales', description: 'Hasta 4/semana', included: true, limit: '4/semana', icon: 'check' },
    ],
    subscribers: 35,
    trialDays: 14,
    trialRequiresCard: true,
    annualDiscount: 15,
    setupFee: 0,
    autoRenew: true,
    cancellationPolicy: 'end-of-period',
    isPopular: true,
    mrr: 2100,
  },
  {
    id: '3',
    name: 'Premium',
    shortDescription: 'Máximo rendimiento y resultados',
    longDescription: 'Para profesionales y atletas de élite que buscan el máximo nivel de servicio y resultados.',
    badge: 'Mejor Valor',
    color: '#EC4899',
    price: 100,
    frequency: 'monthly',
    status: 'active',
    features: [
      { id: 'f1', name: 'Sesiones ilimitadas', description: 'Entrenamientos sin límite', included: true, limit: 'Ilimitado', icon: 'check' },
      { id: 'f2', name: 'Plan nutricional premium', description: 'Nutricionista dedicado', included: true, icon: 'check' },
      { id: 'f3', name: 'App móvil', description: 'Funciones exclusivas', included: true, icon: 'check' },
      { id: 'f4', name: 'Seguimiento personalizado', description: 'Coach + Nutricionista', included: true, icon: 'check' },
      { id: 'f5', name: 'Acceso 24/7 al gimnasio', description: 'Acceso VIP', included: true, icon: 'check' },
      { id: 'f6', name: 'Clases grupales', description: 'Ilimitadas', included: true, limit: 'Ilimitado', icon: 'check' },
      { id: 'f7', name: 'Evaluaciones mensuales', description: 'Composición corporal', included: true, icon: 'check' },
      { id: 'f8', name: 'Masajes deportivos', description: '2 sesiones/mes', included: true, limit: '2/mes', icon: 'check' },
    ],
    subscribers: 15,
    trialDays: 14,
    trialRequiresCard: true,
    annualDiscount: 20,
    setupFee: 50,
    autoRenew: true,
    cancellationPolicy: 'with-notice',
    mrr: 1500,
  },
  {
    id: '4',
    name: 'Elite',
    shortDescription: 'Experiencia VIP exclusiva',
    longDescription: 'El plan definitivo con acceso total, entrenadores personales 24/7 y beneficios exclusivos.',
    badge: 'VIP',
    color: '#F59E0B',
    price: 200,
    frequency: 'monthly',
    status: 'active',
    features: [
      { id: 'f1', name: 'Entrenador personal exclusivo', description: 'Dedicado 100%', included: true, icon: 'check' },
      { id: 'f2', name: 'Nutricionista personal', description: 'Planes semanales', included: true, icon: 'check' },
      { id: 'f3', name: 'App móvil VIP', description: 'Funcionalidad completa', included: true, icon: 'check' },
      { id: 'f4', name: 'Seguimiento 24/7', description: 'Respuesta inmediata', included: true, icon: 'check' },
      { id: 'f5', name: 'Acceso VIP gimnasio', description: 'Áreas exclusivas', included: true, icon: 'check' },
      { id: 'f6', name: 'Todas las clases', description: 'Ilimitadas + privadas', included: true, limit: 'Ilimitado', icon: 'check' },
      { id: 'f7', name: 'Evaluaciones semanales', description: 'Seguimiento detallado', included: true, icon: 'check' },
      { id: 'f8', name: 'Spa y masajes', description: 'Ilimitado', included: true, limit: 'Ilimitado', icon: 'check' },
      { id: 'f9', name: 'Suplementación premium', description: 'Incluida', included: true, icon: 'check' },
      { id: 'f10', name: 'Eventos exclusivos', description: 'Acceso VIP', included: true, icon: 'check' },
    ],
    subscribers: 5,
    trialDays: 30,
    trialRequiresCard: true,
    annualDiscount: 25,
    setupFee: 100,
    autoRenew: true,
    cancellationPolicy: 'with-notice',
    mrr: 1000,
  },
];

const mockSubscriptions: Subscription[] = [
  {
    id: 's1',
    customerId: 'c1',
    customerName: 'Ana García',
    customerAvatar: 'AG',
    planId: '2',
    planName: 'Pro',
    status: 'active',
    startDate: '2025-01-15',
    nextRenewal: '2025-10-15',
    paymentMethod: 'Visa ****4532',
    mrr: 60,
  },
  {
    id: 's2',
    customerId: 'c2',
    customerName: 'Carlos Ruiz',
    customerAvatar: 'CR',
    planId: '3',
    planName: 'Premium',
    status: 'active',
    startDate: '2024-12-01',
    nextRenewal: '2025-10-01',
    paymentMethod: 'Mastercard ****8821',
    mrr: 100,
  },
  {
    id: 's3',
    customerId: 'c3',
    customerName: 'María López',
    customerAvatar: 'ML',
    planId: '1',
    planName: 'Básico',
    status: 'trial',
    startDate: '2025-09-25',
    nextRenewal: '2025-10-02',
    paymentMethod: 'No registrado',
    mrr: 0,
  },
  {
    id: 's4',
    customerId: 'c4',
    customerName: 'Pedro Sánchez',
    customerAvatar: 'PS',
    planId: '2',
    planName: 'Pro',
    status: 'payment-failed',
    startDate: '2025-03-10',
    nextRenewal: '2025-10-10',
    paymentMethod: 'Visa ****1234',
    mrr: 60,
  },
  {
    id: 's5',
    customerId: 'c5',
    customerName: 'Laura Martín',
    customerAvatar: 'LM',
    planId: '4',
    planName: 'Elite',
    status: 'active',
    startDate: '2024-08-01',
    nextRenewal: '2025-11-01',
    paymentMethod: 'Amex ****9876',
    mrr: 200,
  },
];

const mockMRRHistory = [
  { month: 'Ene', mrr: 4200, arr: 50400 },
  { month: 'Feb', mrr: 4500, arr: 54000 },
  { month: 'Mar', mrr: 4800, arr: 57600 },
  { month: 'Abr', mrr: 5100, arr: 61200 },
  { month: 'May', mrr: 5400, arr: 64800 },
  { month: 'Jun', mrr: 5700, arr: 68400 },
  { month: 'Jul', mrr: 6000, arr: 72000 },
  { month: 'Ago', mrr: 6200, arr: 74400 },
  { month: 'Sep', mrr: 6100, arr: 73200 },
  { month: 'Oct', mrr: 6300, arr: 75600 },
];

const mockAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'payment-failed',
    message: 'Pago fallido: Pedro Sánchez - Plan Pro',
    date: '2025-09-28',
    severity: 'high',
  },
  {
    id: 'a2',
    type: 'trial-ending',
    message: '3 usuarios finalizan trial en 2 días',
    date: '2025-09-30',
    severity: 'medium',
  },
  {
    id: 'a3',
    type: 'renewal-soon',
    message: '12 renovaciones pendientes esta semana',
    date: '2025-09-29',
    severity: 'low',
  },
];

const mockFAQs: FAQ[] = [
  {
    id: 'faq1',
    question: '¿Puedo cambiar de plan en cualquier momento?',
    answer: 'Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplican inmediatamente y ajustamos el cobro proporcionalmente.',
  },
  {
    id: 'faq2',
    question: '¿Qué pasa si supero el límite de clientes?',
    answer: 'Te notificaremos cuando te acerques al límite. Puedes actualizar tu plan o pagar por clientes adicionales a $5 por cliente extra.',
  },
  {
    id: 'faq3',
    question: '¿Hay costos ocultos?',
    answer: 'No, todos nuestros precios son transparentes. Solo pagas lo que ves. Sin tarifas de configuración adicionales (excepto plan Elite).',
  },
  {
    id: 'faq4',
    question: '¿Ofrecen descuentos por volumen?',
    answer: 'Sí, ofrecemos descuentos del 15-25% en planes anuales y descuentos especiales para gimnasios con múltiples ubicaciones.',
  },
  {
    id: 'faq5',
    question: '¿Cómo funciona la facturación?',
    answer: 'La facturación es automática y se realiza mensual o anualmente según tu elección. Aceptamos todas las tarjetas principales y transferencias bancarias.',
  },
  {
    id: 'faq6',
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí, puedes cancelar cuando quieras sin penalización. Tu acceso continuará hasta el final del período pagado.',
  },
  {
    id: 'faq7',
    question: '¿Qué incluye el período de prueba?',
    answer: 'Todos los planes incluyen acceso completo durante el período de prueba. No requiere tarjeta de crédito en el plan Básico.',
  },
  {
    id: 'faq8',
    question: '¿Ofrecen soporte técnico?',
    answer: 'Sí, todos los planes incluyen soporte por email. Planes Pro y superiores incluyen soporte prioritario por chat en vivo.',
  },
  {
    id: 'faq9',
    question: '¿Los datos están seguros?',
    answer: 'Absolutamente. Utilizamos encriptación de nivel bancario y cumplimos con GDPR. Tus datos están alojados en servidores seguros en Europa.',
  },
  {
    id: 'faq10',
    question: '¿Puedo importar mis datos existentes?',
    answer: 'Sí, ofrecemos asistencia gratuita de migración para todos los planes. Nuestro equipo te ayudará a importar tus datos.',
  },
];

const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Carlos Rodríguez',
    business: 'Fitness Pro Madrid',
    plan: 'Pro',
    avatar: 'CR',
    quote: 'La mejor inversión para mi gimnasio. Los clientes están más comprometidos y la gestión es mucho más fácil.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Ana Martínez',
    business: 'Centro Wellness Barcelona',
    plan: 'Premium',
    avatar: 'AM',
    quote: 'El plan Premium vale cada euro. Las funciones avanzadas nos han ayudado a duplicar nuestra retención de clientes.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Luis Fernández',
    business: 'CrossFit Valencia',
    plan: 'Básico',
    avatar: 'LF',
    quote: 'Perfecto para empezar. Es económico pero tiene todas las funciones esenciales que necesitaba.',
    rating: 4,
  },
  {
    id: 't4',
    name: 'María García',
    business: 'Elite Gym Network',
    plan: 'Elite',
    avatar: 'MG',
    quote: 'Gestiono 5 gimnasios con el plan Elite. El soporte personalizado y las funciones VIP son increíbles.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Jorge Sánchez',
    business: 'Studio Personal Training',
    plan: 'Pro',
    avatar: 'JS',
    quote: 'La relación calidad-precio del plan Pro es insuperable. Mis clientes aman la app móvil.',
    rating: 5,
  },
];


// ==================== COMPONENTE PRINCIPAL ====================
const PlanesPreciosPage: React.FC = () => {
  const [viewMode] = useState<'pricing-table' | 'list'>('pricing-table');
  const [showActiveOnly] = useState(true);
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showSubscribersModal, setShowSubscribersModal] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [numClients, setNumClients] = useState<number>(50);
  const [numUsers, setNumUsers] = useState<number>(3);
  
  // Estados para modales y confirmaciones
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTrialActionsModal, setShowTrialActionsModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalSubscribers = mockPlans.reduce((acc, plan) => acc + plan.subscribers, 0);
  const totalMRR = mockPlans.reduce((acc, plan) => acc + plan.mrr, 0);
  const totalARR = totalMRR * 12;
  const retentionRate = 94.5;
  const churnRate = 5.5;

  const stats = [
    {
      title: 'Planes Activos',
      value: mockPlans.filter((p) => p.status === 'active').length,
      change: '+1',
      trend: 'up' as const,
      icon: Layers,
      color: 'bg-blue-500',
    },
    {
      title: 'Suscripciones Totales',
      value: totalSubscribers,
      change: '+8',
      trend: 'up' as const,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'MRR',
      value: `€${totalMRR.toLocaleString()}`,
      change: '+3.2%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'ARR',
      value: `€${totalARR.toLocaleString()}`,
      change: '+3.2%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'bg-emerald-500',
    },
    {
      title: 'Tasa de Retención',
      value: `${retentionRate}%`,
      change: '+1.2%',
      trend: 'up' as const,
      icon: Target,
      color: 'bg-cyan-500',
    },
    {
      title: 'Churn Rate',
      value: `${churnRate}%`,
      change: '-0.8%',
      trend: 'down' as const,
      icon: TrendingDown,
      color: 'bg-red-500',
    },
  ];

  const filteredPlans = showActiveOnly ? mockPlans.filter((p) => p.status === 'active') : mockPlans;

  const calculatePrice = (basePrice: number, discount?: number) => {
    if (billingPeriod === 'annual' && discount) {
      return basePrice * (1 - discount / 100);
    }
    return basePrice;
  };

  // ==================== FUNCIONES DE MANEJO ====================
  
  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPlanDetailsModal(true);
    toast.success(`Plan ${plan.name} seleccionado`, {
      icon: '🎯',
    });
  };

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowEditPlanModal(true);
  };

  const handleDeletePlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowDeleteConfirmation(true);
  };

  const confirmDeletePlan = async () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Plan ${selectedPlan.name} eliminado correctamente`, {
        icon: '🗑️',
      });
      setShowDeleteConfirmation(false);
      setSelectedPlan(null);
    } catch (error) {
      toast.error('Error al eliminar el plan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    setShowExportModal(true);
  };

  const confirmExport = async (format: 'csv' | 'excel' | 'pdf') => {
    setIsLoading(true);
    try {
      // Simular exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Datos exportados en formato ${format.toUpperCase()}`, {
        icon: '📊',
      });
      setShowExportModal(false);
    } catch (error) {
      toast.error('Error al exportar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSales = () => {
    setShowContactModal(true);
  };

  const handleTrialAction = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowTrialActionsModal(true);
  };

  const confirmTrialAction = async (action: 'convert' | 'extend') => {
    if (!selectedSubscription) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const actionText = action === 'convert' ? 'convertido' : 'extendido';
      toast.success(`Trial ${actionText} para ${selectedSubscription.customerName}`, {
        icon: action === 'convert' ? '✅' : '⏰',
      });
      setShowTrialActionsModal(false);
      setSelectedSubscription(null);
    } catch (error) {
      toast.error('Error al procesar la acción');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPlanLink = (plan: Plan) => {
    const link = `${window.location.origin}/plans/${plan.id}`;
    navigator.clipboard.writeText(link);
    toast.success('Enlace copiado al portapapeles', {
      icon: '📋',
    });
  };

  const handleViewSubscribers = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowSubscribersModal(true);
  };

  const handleAlertAction = (alert: Alert) => {
    toast(`Procesando alerta: ${alert.message}`, {
      icon: '🔔',
    });
  };

  const handleSpecialOffer = (offer: string) => {
    toast.success(`¡Oferta ${offer} aplicada!`, {
      icon: '🎁',
      duration: 6000,
    });
  };

  const handleFAQCopy = (faq: FAQ) => {
    const text = `P: ${faq.question}\nR: ${faq.answer}`;
    navigator.clipboard.writeText(text);
    toast.success('FAQ copiada al portapapeles', {
      icon: '📋',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* HERO SECTION - PRICING */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Elige el Plan <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Perfecto</span>
            </h1>
          </div>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed mb-6">
            Planes flexibles para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">gimnasios de todos los tamaños</span>
          </p>

          {/* Toggle Mensual/Anual */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`text-lg font-semibold ${billingPeriod === 'monthly' ? 'text-white' : 'text-purple-200'}`}>
              Mensual
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 transition-all"
            >
              <motion.div
                animate={{ x: billingPeriod === 'monthly' ? 2 : 30 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </button>
            <span className={`text-lg font-semibold ${billingPeriod === 'annual' ? 'text-white' : 'text-purple-200'}`}>
              Anual
            </span>
            {billingPeriod === 'annual' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full"
              >
                Ahorra 20%
              </motion.div>
            )}
          </div>

          {/* Pills con métricas */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Building2 className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">+1,500 Gimnasios Confían en Nosotros</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">4.9/5 Valoración</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Shield className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Garantía 30 Días</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* ALERTAS */}
      {mockAlerts.length > 0 && (
        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">Alertas y Notificaciones</h2>
          </div>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${
                  alert.severity === 'high'
                    ? 'bg-red-50 border-red-500'
                    : alert.severity === 'medium'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 ${
                    alert.severity === 'high'
                      ? 'text-red-500'
                      : alert.severity === 'medium'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-600">{alert.date}</p>
                </div>
                <button 
                  onClick={() => handleAlertAction(alert)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Procesar alerta"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPARADOR DE PLANES - Pricing Cards */}
      {viewMode === 'pricing-table' && (
        <div className="mb-12 px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compara Nuestros Planes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlans.map((plan, index) => {
              const finalPrice = calculatePrice(plan.price, plan.annualDiscount);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-2 overflow-hidden ${
                    plan.isPopular ? 'border-purple-500' : 'border-white/50'
                  }`}
                >
                  {/* Decoración de fondo */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

                  {/* Shimmer effect en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                  {/* BADGE */}
                  {plan.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                        plan.isPopular ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse' : ''
                      }`}
                      style={{ backgroundColor: !plan.isPopular ? plan.color : undefined }}
                    >
                      {plan.badge}
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    {/* HEADER */}
                    <div className="text-center mb-6 mt-4">
                      {/* Icono del plan */}
                      <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl"
                        style={{ background: `linear-gradient(to br, ${plan.color}, ${plan.color}dd)` }}
                      >
                        {plan.id === '1' && <Users className="w-8 h-8 text-white" />}
                        {plan.id === '2' && <Zap className="w-8 h-8 text-white" />}
                        {plan.id === '3' && <Crown className="w-8 h-8 text-white" />}
                        {plan.id === '4' && <Star className="w-8 h-8 text-white" />}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{plan.shortDescription}</p>

                      {/* PRECIO */}
                      <div className="mb-4">
                        {billingPeriod === 'annual' && plan.annualDiscount && (
                          <span className="text-gray-400 line-through text-lg block mb-1">
                            €{plan.price}
                          </span>
                        )}
                        <div className="flex items-baseline justify-center gap-1">
                          <span className={`text-5xl font-bold ${plan.isPopular ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600' : ''}`}
                            style={{ color: !plan.isPopular ? plan.color : undefined }}
                          >
                            €{Math.round(finalPrice)}
                          </span>
                          <span className="text-gray-600 text-sm">/{billingPeriod === 'monthly' ? 'mes' : 'año'}</span>
                        </div>
                        {billingPeriod === 'annual' && plan.annualDiscount && (
                          <motion.p
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                            Ahorras {plan.annualDiscount}%
                          </motion.p>
                        )}
                      </div>

                      {/* Trial */}
                      {plan.trialDays && (
                        <div className="px-4 py-2 bg-blue-50 rounded-xl border border-blue-200 mb-4">
                          <p className="text-sm text-blue-700 font-semibold">
                            🎁 {plan.trialDays} días de prueba gratis
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CARACTERÍSTICAS */}
                    <div className="space-y-3 mb-6">
                      {plan.features.slice(0, 6).map((feature) => (
                        <div key={feature.id} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className="p-1 bg-green-50 rounded-lg flex-shrink-0">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="p-1 bg-gray-50 rounded-lg flex-shrink-0">
                              <X className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className={`text-sm ${feature.included ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                              {feature.name}
                            </p>
                            {feature.limit && feature.included && (
                              <p className="text-xs text-gray-500 mt-0.5">{feature.limit}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-2 ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                          : 'border-2 text-gray-700 hover:bg-gray-50'
                      }`}
                      style={{
                        borderColor: !plan.isPopular ? plan.color : undefined,
                        color: !plan.isPopular ? plan.color : undefined,
                      }}
                    >
                      {plan.isPopular ? 'Comenzar Ahora' : 'Seleccionar Plan'}
                    </motion.button>

                    <button 
                      onClick={() => handlePlanSelect(plan)}
                      className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Ver detalles completos →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISTA LISTA */}
      {viewMode === 'list' && (
        <div className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Frecuencia
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Suscriptores
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">MRR</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: plan.color }}
                        >
                          {plan.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{plan.name}</p>
                          {plan.badge && (
                            <span className="text-xs text-gray-500">{plan.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">€{plan.price}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 capitalize">{plan.frequency}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{plan.subscribers}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold" style={{ color: plan.color }}>
                        €{plan.mrr.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          plan.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : plan.status === 'inactive'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {plan.status === 'active'
                          ? 'Activo'
                          : plan.status === 'inactive'
                          ? 'Inactivo'
                          : 'Próximamente'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPlan(plan)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Editar plan"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleViewSubscribers(plan)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Ver suscriptores"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleCopyPlanLink(plan)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Copiar enlace"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Eliminar plan"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* MRR/ARR TIMELINE */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Evolución MRR/ARR</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMRRHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="mrr"
                stroke="#8B5CF6"
                strokeWidth={3}
                name="MRR (€)"
              />
              <Line
                type="monotone"
                dataKey="arr"
                stroke="#3B82F6"
                strokeWidth={3}
                name="ARR (€)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* DISTRIBUCIÓN POR PLAN */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Distribución de Suscriptores
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockPlans.map(plan => ({ name: plan.name, subscribers: plan.subscribers, color: plan.color }))}
                dataKey="subscribers"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {mockPlans.map((plan) => (
                  <Cell key={plan.id} fill={plan.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CONFIGURADOR DE PRECIOS INTERACTIVO */}
      <div className="mb-12 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Calculadora de Precio Personalizado</h2>
              <p className="text-gray-600">Ajusta los sliders para estimar tu inversión</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Slider Clientes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Número de Clientes: <span className="text-purple-600">{numClients}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={numClients}
                  onChange={(e) => setNumClients(parseInt(e.target.value))}
                  className="w-full h-3 bg-purple-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(numClients / 500) * 100}%, #e9d5ff ${(numClients / 500) * 100}%, #e9d5ff 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>500+</span>
                </div>
              </div>

              {/* Slider Usuarios */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Usuarios del Sistema: <span className="text-purple-600">{numUsers}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={numUsers}
                  onChange={(e) => setNumUsers(parseInt(e.target.value))}
                  className="w-full h-3 bg-pink-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(numUsers / 20) * 100}%, #fce7f3 ${(numUsers / 20) * 100}%, #fce7f3 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            {/* Resultado del cálculo */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Precio Estimado Mensual</p>
                <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  €{Math.round(50 + (numClients * 0.5) + (numUsers * 10))}
                </p>
                <p className="text-sm text-gray-600">
                  Recomendado: <span className="font-bold text-purple-600">Plan {numClients > 200 ? 'Premium' : numClients > 100 ? 'Pro' : 'Básico'}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContactSales}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg"
                >
                  Hablar con Ventas
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PAQUETES PROMOCIONALES */}
      <div className="mb-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ofertas Especiales 🎁</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Oferta 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-2 border-orange-500 overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

            <div className="relative z-10">
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full inline-block mb-4 animate-pulse">
                OFERTA LIMITADA
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Black Friday</h3>
              <p className="text-gray-600 mb-4">Ahorra hasta 50% en plan anual</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-400 line-through">€720</span>
                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">€360</span>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Plan Pro completo</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>12 meses por el precio de 6</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Soporte prioritario gratis</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSpecialOffer('Black Friday')}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg"
              >
                Aprovechar Oferta
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-3">⏰ Quedan 3 días</p>
            </div>
          </motion.div>

          {/* Oferta 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-2 border-green-500 overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10">
              <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full inline-block mb-4">
                MEJOR VALOR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Paquete Anual</h3>
              <p className="text-gray-600 mb-4">2 meses gratis al pagar anual</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-400 line-through">€1,200</span>
                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">€1,000</span>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Plan Premium por 10 meses</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Sin costos de configuración</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Migración asistida incluida</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSpecialOffer('Paquete Anual')}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg"
              >
                Seleccionar Paquete
              </motion.button>
            </div>
          </motion.div>

          {/* Oferta 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-2 border-blue-500 overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10">
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold rounded-full inline-block mb-4">
                LANZAMIENTO
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter Pack</h3>
              <p className="text-gray-600 mb-4">Perfecto para empezar</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-400 line-through">€180</span>
                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">€99</span>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Plan Básico - 3 meses</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Onboarding personalizado</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>45% de descuento</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSpecialOffer('Starter Pack')}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg"
              >
                Comenzar Ahora
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* TESTIMONIOS DE CLIENTES */}
      <div className="mb-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Lo Que Dicen Nuestros Clientes</h2>
        <p className="text-gray-600 text-center mb-8">Miles de gimnasios confían en nuestra plataforma</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>

              <div className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full inline-block">
                Plan {testimonial.plan}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQs DE PRECIOS */}
      <div className="mb-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Preguntas Frecuentes</h2>
        <p className="text-gray-600 text-center mb-8">Todo lo que necesitas saber sobre nuestros planes</p>

        <div className="max-w-3xl mx-auto space-y-4">
          {mockFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden"
            >
              <div className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFAQCopy(faq);
                    }}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copiar FAQ"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-2">
                      <p className="text-gray-700 leading-relaxed pl-11">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION FINAL - Contacto Enterprise */}
      <div className="mb-12 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* Decoración de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <Crown className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">¿Necesitas un Plan Personalizado?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Para gimnasios con múltiples ubicaciones o requisitos especiales, ofrecemos planes Enterprise totalmente personalizados
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="w-10 h-10 text-green-300 mx-auto mb-3" />
                <p className="text-white font-semibold">SLA Garantizado</p>
                <p className="text-purple-200 text-sm mt-2">99.9% uptime</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Users className="w-10 h-10 text-blue-300 mx-auto mb-3" />
                <p className="text-white font-semibold">Soporte Dedicado</p>
                <p className="text-purple-200 text-sm mt-2">Account manager 24/7</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Zap className="w-10 h-10 text-yellow-300 mx-auto mb-3" />
                <p className="text-white font-semibold">Integraciones Custom</p>
                <p className="text-purple-200 text-sm mt-2">APIs personalizadas</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactSales}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Hablar con Ventas
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* GARANTÍA Y CONFIANZA */}
      <div className="mb-12 px-4 md:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Compra con Confianza</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Garantía 30 Días</p>
              <p className="text-sm text-gray-600">Devolución completa</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Pagos Seguros</p>
              <p className="text-sm text-gray-600">Encriptación SSL</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <X className="w-8 h-8 text-purple-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Sin Compromiso</p>
              <p className="text-sm text-gray-600">Cancela cuando quieras</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-8 h-8 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">GDPR Compliant</p>
              <p className="text-sm text-gray-600">Datos protegidos</p>
            </div>
          </div>
        </div>
      </div>

      {/* USUARIOS EN TRIAL */}
      <div className="px-4 md:px-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">Usuarios en Trial</h3>
          </div>
          <span className="text-sm text-gray-600">
            Tasa de conversión:{' '}
            <span className="font-bold text-green-600">68%</span>
          </span>
        </div>
        <div className="space-y-4">
          {mockSubscriptions
            .filter((s) => s.status === 'trial')
            .map((sub) => {
              const daysLeft = 5;
              const progress = (daysLeft / 7) * 100;
              return (
                <div
                  key={sub.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {sub.customerAvatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{sub.customerName}</p>
                    <p className="text-sm text-gray-600">Plan: {sub.planName}</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{daysLeft} días restantes</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleTrialAction(sub)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-medium"
                    >
                      Convertir
                    </button>
                    <button 
                      onClick={() => handleTrialAction(sub)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium"
                    >
                      Extender
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* SUSCRIPCIONES RECIENTES */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Suscripciones Activas</h3>
          <button 
            onClick={handleExportData}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Inicio
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Renovación
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Pago</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">MRR</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {sub.customerAvatar}
                      </div>
                      <p className="font-medium text-gray-900">{sub.customerName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {sub.planName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sub.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : sub.status === 'trial'
                          ? 'bg-blue-100 text-blue-700'
                          : sub.status === 'payment-failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {sub.status === 'active'
                        ? 'Activa'
                        : sub.status === 'trial'
                        ? 'Trial'
                        : sub.status === 'payment-failed'
                        ? 'Pago Fallido'
                        : sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{sub.startDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{sub.nextRenewal}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-600">{sub.paymentMethod}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-purple-600">€{sub.mrr}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NUEVO PLAN (Simplificado - solo UI) */}
      <AnimatePresence>
        {showNewPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewPlanModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Crear Nuevo Plan</h2>
                <button
                  onClick={() => setShowNewPlanModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Wizard de 4 pasos para crear un nuevo plan
                </p>
                <p className="text-gray-500 mt-2">
                  Información Básica → Precios → Características → Renovación
                </p>
              </div>
              <button
                onClick={() => {
                  setShowNewPlanModal(false);
                  toast.success('Iniciando wizard de creación de plan', {
                    icon: '✨',
                  });
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Comenzar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DETALLES DEL PLAN */}
      <Modal
        isOpen={showPlanDetailsModal}
        onClose={() => setShowPlanDetailsModal(false)}
        title={`Detalles del Plan ${selectedPlan?.name}`}
        size="lg"
      >
        {selectedPlan && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: selectedPlan.color }}
                >
                  {selectedPlan.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h3>
                  <p className="text-gray-600">{selectedPlan.longDescription}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Precio</p>
                  <p className="text-2xl font-bold" style={{ color: selectedPlan.color }}>
                    €{selectedPlan.price}/mes
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Suscriptores</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPlan.subscribers}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Características</h4>
              <div className="space-y-3">
                {selectedPlan.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                        {feature.name}
                      </p>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                      {feature.limit && feature.included && (
                        <p className="text-xs text-purple-600 font-medium">{feature.limit}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPlanDetailsModal(false);
                  setShowEditPlanModal(true);
                }}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-all"
              >
                Editar Plan
              </button>
              <button
                onClick={() => {
                  setShowPlanDetailsModal(false);
                  handleCopyPlanLink(selectedPlan);
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                Copiar Enlace
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL EDITAR PLAN */}
      <Modal
        isOpen={showEditPlanModal}
        onClose={() => setShowEditPlanModal(false)}
        title={`Editar Plan ${selectedPlan?.name}`}
        size="lg"
      >
        <div className="text-center py-12">
          <Edit2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Editor de Plan</h3>
          <p className="text-gray-600 mb-6">
            Formulario completo para editar precios, características y configuraciones del plan
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setShowEditPlanModal(false);
                toast.success('Plan actualizado correctamente', {
                  icon: '✅',
                });
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-all"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setShowEditPlanModal(false)}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL CONFIRMACIÓN ELIMINAR */}
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDeletePlan}
        title="Eliminar Plan"
        message={`¿Estás seguro de que quieres eliminar el plan "${selectedPlan?.name}"? Esta acción no se puede deshacer y afectará a ${selectedPlan?.subscribers} suscriptores.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />

      {/* MODAL EXPORTAR DATOS */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Exportar Datos"
        size="md"
      >
        <div className="space-y-6">
          <p className="text-gray-600">Selecciona el formato para exportar los datos de suscripciones:</p>
          
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => confirmExport('csv')}
              disabled={isLoading}
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">CSV</p>
                <p className="text-sm text-gray-600">Formato de hoja de cálculo</p>
              </div>
            </button>

            <button
              onClick={() => confirmExport('excel')}
              disabled={isLoading}
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Excel</p>
                <p className="text-sm text-gray-600">Archivo .xlsx con formato</p>
              </div>
            </button>

            <button
              onClick={() => confirmExport('pdf')}
              disabled={isLoading}
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">PDF</p>
                <p className="text-sm text-gray-600">Reporte en formato PDF</p>
              </div>
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-4">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Generando archivo...</p>
            </div>
          )}
        </div>
      </Modal>

      {/* MODAL CONTACTO VENTAS */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contactar con Ventas"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Necesitas ayuda personalizada?</h3>
            <p className="text-gray-600">
              Nuestro equipo de ventas está listo para ayudarte a encontrar el plan perfecto para tu gimnasio.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => {
                setShowContactModal(false);
                toast.success('Redirigiendo a WhatsApp...', {
                  icon: '💬',
                });
              }}
              className="flex items-center gap-3 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">Chat en Vivo</p>
                <p className="text-sm opacity-90">Respuesta inmediata</p>
              </div>
            </button>

            <button
              onClick={() => {
                setShowContactModal(false);
                toast.success('Abriendo llamada telefónica...', {
                  icon: '📞',
                });
              }}
              className="flex items-center gap-3 p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
            >
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">Llamada Telefónica</p>
                <p className="text-sm opacity-90">+34 900 123 456</p>
              </div>
            </button>

            <button
              onClick={() => {
                setShowContactModal(false);
                toast.success('Abriendo cliente de email...', {
                  icon: '📧',
                });
              }}
              className="flex items-center gap-3 p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all"
            >
              <Mail className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">Email</p>
                <p className="text-sm opacity-90">ventas@astrofit.com</p>
              </div>
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Horario de Atención</h4>
            <p className="text-sm text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
            <p className="text-sm text-gray-600">Sábados: 10:00 - 14:00</p>
          </div>
        </div>
      </Modal>

      {/* MODAL ACCIONES TRIAL */}
      <Modal
        isOpen={showTrialActionsModal}
        onClose={() => setShowTrialActionsModal(false)}
        title={`Acciones para ${selectedSubscription?.customerName}`}
        size="md"
      >
        {selectedSubscription && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedSubscription.customerAvatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedSubscription.customerName}</p>
                  <p className="text-sm text-gray-600">Plan: {selectedSubscription.planName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Estado actual: <span className="font-medium text-blue-600">Trial activo</span>
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => confirmTrialAction('convert')}
                disabled={isLoading}
                className="w-full flex items-center gap-3 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all disabled:opacity-50"
              >
                <Check className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-semibold">Convertir a Suscripción</p>
                  <p className="text-sm opacity-90">Activar pago automático</p>
                </div>
              </button>

              <button
                onClick={() => confirmTrialAction('extend')}
                disabled={isLoading}
                className="w-full flex items-center gap-3 p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50"
              >
                <Clock className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-semibold">Extender Trial</p>
                  <p className="text-sm opacity-90">Añadir 7 días más</p>
                </div>
              </button>
            </div>

            {isLoading && (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Procesando acción...</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* MODAL SUSCRIPTORES */}
      <Modal
        isOpen={showSubscribersModal}
        onClose={() => setShowSubscribersModal(false)}
        title={`Suscriptores del Plan ${selectedPlan?.name}`}
        size="lg"
      >
        {selectedPlan && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedPlan.name}</h3>
                  <p className="text-gray-600">{selectedPlan.subscribers} suscriptores activos</p>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: selectedPlan.color }}
                >
                  {selectedPlan.name[0]}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {mockSubscriptions
                .filter(sub => sub.planId === selectedPlan.id)
                .map((sub) => (
                  <div key={sub.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {sub.customerAvatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{sub.customerName}</p>
                      <p className="text-sm text-gray-600">
                        {sub.status === 'active' ? 'Activo' : 
                         sub.status === 'trial' ? 'Trial' : 
                         sub.status === 'payment-failed' ? 'Pago Fallido' : sub.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">€{sub.mrr}</p>
                      <p className="text-sm text-gray-600">MRR</p>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSubscribersModal(false);
                  handleExportData();
                }}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar Lista
              </button>
              <button
                onClick={() => setShowSubscribersModal(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PlanesPreciosPage;