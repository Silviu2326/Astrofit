import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Ticket,
  CheckCircle,
  TrendingDown,
  Target,
  Star,
  DollarSign,
  Plus,
  Calendar,
  Download,
  QrCode,
  Share2,
  Copy,
  Edit,
  Trash2,
  Play,
  Pause,
  Eye,
  Gift,
  Zap,
  Truck,
  Percent,
  Search,
  Grid,
  List,
  MoreVertical,
  Send,
  BarChart3,
  Mail,
  FileText
} from 'lucide-react';
import ConfirmationModal from '../../../../components/ui/confirmation-modal';
import InputModal from '../../../../components/ui/input-modal';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Types
type CouponType = 'percentage' | 'fixed' | 'free-shipping' | '2x1';
type CouponStatus = 'active' | 'scheduled' | 'expired' | 'paused';
type ApplicableTo = 'all' | 'products' | 'categories' | 'plans';

interface CouponUse {
  id: string;
  customerName: string;
  date: string;
  product: string;
  discountApplied: number;
  orderTotal: number;
  channel: string;
}

interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  status: CouponStatus;
  description: string;
  startDate: string;
  endDate: string | null;
  usageLimit: number | null;
  usageCount: number;
  totalDiscount: number;
  revenue: number;
  applicableTo: ApplicableTo;
  products?: string[];
  minPurchase?: number;
  onePerCustomer: boolean;
  campaign?: string;
  tags: string[];
  uses: CouponUse[];
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  coupons: string[];
  totalUses: number;
  totalDiscount: number;
  roi: number;
  status: 'active' | 'completed' | 'paused';
}

// Mock Data
const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'VERANO2025',
    type: 'percentage',
    value: 20,
    status: 'active',
    description: 'Descuento especial de verano',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    usageLimit: 500,
    usageCount: 347,
    totalDiscount: 8675,
    revenue: 34700,
    applicableTo: 'all',
    onePerCustomer: false,
    campaign: 'Verano 2025',
    tags: ['verano', 'temporada'],
    uses: Array(347).fill(null).map((_, i) => ({
      id: `use-${i}`,
      customerName: `Cliente ${i + 1}`,
      date: '2025-06-15',
      product: 'Membresía Premium',
      discountApplied: 25,
      orderTotal: 125,
      channel: 'web'
    }))
  },
  {
    id: '2',
    code: 'BIENVENIDO',
    type: 'fixed',
    value: 15,
    status: 'active',
    description: 'Descuento de bienvenida para nuevos clientes',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 892,
    totalDiscount: 13380,
    revenue: 89200,
    applicableTo: 'all',
    onePerCustomer: true,
    campaign: 'Captación',
    tags: ['bienvenida', 'nuevos'],
    uses: []
  },
  {
    id: '3',
    code: 'ENVIOGRATIS',
    type: 'free-shipping',
    value: 0,
    status: 'active',
    description: 'Envío gratuito en todos los pedidos',
    startDate: '2025-03-01',
    endDate: '2025-12-31',
    usageLimit: 1000,
    usageCount: 654,
    totalDiscount: 3924,
    revenue: 39240,
    applicableTo: 'products',
    products: ['Productos físicos'],
    minPurchase: 50,
    onePerCustomer: false,
    campaign: 'Logística',
    tags: ['envío', 'logística'],
    uses: []
  },
  {
    id: '4',
    code: '2X1GYM',
    type: '2x1',
    value: 50,
    status: 'active',
    description: '2x1 en sesiones de entrenamiento',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    usageLimit: 200,
    usageCount: 178,
    totalDiscount: 4450,
    revenue: 8900,
    applicableTo: 'products',
    products: ['Sesiones GYM'],
    onePerCustomer: true,
    campaign: 'Fitness Mayo',
    tags: ['gym', 'fitness', '2x1'],
    uses: []
  },
  {
    id: '5',
    code: 'PRIMERAVEZ',
    type: 'percentage',
    value: 50,
    status: 'active',
    description: '50% de descuento en tu primera compra',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 1247,
    totalDiscount: 31175,
    revenue: 62350,
    applicableTo: 'all',
    onePerCustomer: true,
    campaign: 'Captación',
    tags: ['primera compra', 'nuevos'],
    uses: []
  },
  {
    id: '6',
    code: 'BLACK2024',
    type: 'percentage',
    value: 40,
    status: 'expired',
    description: 'Black Friday 2024',
    startDate: '2024-11-29',
    endDate: '2024-11-30',
    usageLimit: 1000,
    usageCount: 1000,
    totalDiscount: 50000,
    revenue: 125000,
    applicableTo: 'all',
    onePerCustomer: false,
    campaign: 'Black Friday',
    tags: ['black friday', 'especial'],
    uses: []
  },
  {
    id: '7',
    code: 'NAVIDAD25',
    type: 'percentage',
    value: 25,
    status: 'scheduled',
    description: 'Promoción navideña 2025',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    usageLimit: 800,
    usageCount: 0,
    totalDiscount: 0,
    revenue: 0,
    applicableTo: 'all',
    onePerCustomer: false,
    campaign: 'Navidad 2025',
    tags: ['navidad', 'temporada'],
    uses: []
  },
  {
    id: '8',
    code: 'PREMIUM10',
    type: 'percentage',
    value: 10,
    status: 'active',
    description: 'Descuento para plan Premium',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 567,
    totalDiscount: 5670,
    revenue: 56700,
    applicableTo: 'plans',
    onePerCustomer: false,
    tags: ['premium', 'planes'],
    uses: []
  },
  {
    id: '9',
    code: 'REFERIDO20',
    type: 'fixed',
    value: 20,
    status: 'active',
    description: 'Bono por referido',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 423,
    totalDiscount: 8460,
    revenue: 42300,
    applicableTo: 'all',
    onePerCustomer: true,
    campaign: 'Referidos',
    tags: ['referido', 'viral'],
    uses: []
  },
  {
    id: '10',
    code: 'CUMPLE',
    type: 'percentage',
    value: 15,
    status: 'active',
    description: 'Regalo de cumpleaños',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 234,
    totalDiscount: 3510,
    revenue: 23400,
    applicableTo: 'all',
    onePerCustomer: true,
    campaign: 'Fidelización',
    tags: ['cumpleaños', 'fidelización'],
    uses: []
  },
  {
    id: '11',
    code: 'STUDENT30',
    type: 'percentage',
    value: 30,
    status: 'active',
    description: 'Descuento para estudiantes',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 156,
    totalDiscount: 4680,
    revenue: 15600,
    applicableTo: 'plans',
    onePerCustomer: false,
    tags: ['estudiantes', 'educación'],
    uses: []
  },
  {
    id: '12',
    code: 'WEEKEND',
    type: 'percentage',
    value: 15,
    status: 'active',
    description: 'Descuento de fin de semana',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    usageLimit: 2000,
    usageCount: 987,
    totalDiscount: 14805,
    revenue: 98700,
    applicableTo: 'all',
    onePerCustomer: false,
    tags: ['weekend', 'fin de semana'],
    uses: []
  },
  {
    id: '13',
    code: 'REACTIVATE50',
    type: 'percentage',
    value: 50,
    status: 'active',
    description: 'Reactivación de clientes inactivos',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    usageLimit: 300,
    usageCount: 87,
    totalDiscount: 4350,
    revenue: 8700,
    applicableTo: 'all',
    onePerCustomer: true,
    campaign: 'Reactivación',
    tags: ['reactivación', 'inactivos'],
    uses: []
  },
  {
    id: '14',
    code: 'VIP25',
    type: 'percentage',
    value: 25,
    status: 'active',
    description: 'Descuento exclusivo VIP',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 345,
    totalDiscount: 8625,
    revenue: 34500,
    applicableTo: 'all',
    onePerCustomer: false,
    tags: ['vip', 'exclusivo'],
    uses: []
  },
  {
    id: '15',
    code: 'FLASH10',
    type: 'percentage',
    value: 10,
    status: 'expired',
    description: 'Flash sale 24h',
    startDate: '2025-04-15',
    endDate: '2025-04-16',
    usageLimit: 500,
    usageCount: 456,
    totalDiscount: 4560,
    revenue: 45600,
    applicableTo: 'all',
    onePerCustomer: false,
    campaign: 'Flash Sale',
    tags: ['flash', 'urgente'],
    uses: []
  },
  {
    id: '16',
    code: 'FAMILIA20',
    type: 'fixed',
    value: 20,
    status: 'active',
    description: 'Plan familiar',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 123,
    totalDiscount: 2460,
    revenue: 12300,
    applicableTo: 'plans',
    onePerCustomer: false,
    tags: ['familia', 'planes'],
    uses: []
  },
  {
    id: '17',
    code: 'EARLYBIRD',
    type: 'percentage',
    value: 35,
    status: 'active',
    description: 'Madrugadores - Compras antes 10am',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    usageLimit: 1000,
    usageCount: 234,
    totalDiscount: 8190,
    revenue: 23400,
    applicableTo: 'all',
    onePerCustomer: false,
    tags: ['early bird', 'horario'],
    uses: []
  },
  {
    id: '18',
    code: 'BUNDLE3X2',
    type: '2x1',
    value: 33,
    status: 'active',
    description: 'Compra 3 paga 2',
    startDate: '2025-05-01',
    endDate: '2025-07-31',
    usageLimit: 400,
    usageCount: 189,
    totalDiscount: 6237,
    revenue: 18900,
    applicableTo: 'products',
    onePerCustomer: false,
    tags: ['bundle', 'multi'],
    uses: []
  },
  {
    id: '19',
    code: 'LOYALTY100',
    type: 'fixed',
    value: 100,
    status: 'active',
    description: 'Recompensa por lealtad',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: 100,
    usageCount: 67,
    totalDiscount: 6700,
    revenue: 67000,
    applicableTo: 'all',
    onePerCustomer: true,
    campaign: 'Fidelización',
    tags: ['lealtad', 'premium'],
    uses: []
  },
  {
    id: '20',
    code: 'INFLUENCER',
    type: 'percentage',
    value: 30,
    status: 'active',
    description: 'Código de influencer',
    startDate: '2025-02-01',
    endDate: '2025-12-31',
    usageLimit: 500,
    usageCount: 312,
    totalDiscount: 9360,
    revenue: 31200,
    applicableTo: 'all',
    onePerCustomer: false,
    campaign: 'Influencers',
    tags: ['influencer', 'marketing'],
    uses: []
  },
  {
    id: '21',
    code: 'APP15',
    type: 'percentage',
    value: 15,
    status: 'active',
    description: 'Descuento exclusivo app móvil',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 445,
    totalDiscount: 6675,
    revenue: 44500,
    applicableTo: 'all',
    onePerCustomer: false,
    tags: ['app', 'móvil'],
    uses: []
  },
  {
    id: '22',
    code: 'SUSCRIBE10',
    type: 'percentage',
    value: 10,
    status: 'active',
    description: 'Descuento por suscripción newsletter',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 678,
    totalDiscount: 6780,
    revenue: 67800,
    applicableTo: 'all',
    onePerCustomer: true,
    tags: ['newsletter', 'captación'],
    uses: []
  },
  {
    id: '23',
    code: 'MEGASALE',
    type: 'percentage',
    value: 60,
    status: 'scheduled',
    description: 'Mega venta aniversario',
    startDate: '2025-10-01',
    endDate: '2025-10-07',
    usageLimit: 2000,
    usageCount: 0,
    totalDiscount: 0,
    revenue: 0,
    applicableTo: 'all',
    onePerCustomer: false,
    campaign: 'Aniversario',
    tags: ['aniversario', 'mega'],
    uses: []
  },
  {
    id: '24',
    code: 'SOCIAL20',
    type: 'percentage',
    value: 20,
    status: 'active',
    description: 'Por seguirnos en redes sociales',
    startDate: '2025-01-01',
    endDate: null,
    usageLimit: null,
    usageCount: 534,
    totalDiscount: 10680,
    revenue: 53400,
    applicableTo: 'all',
    onePerCustomer: true,
    tags: ['social', 'rrss'],
    uses: []
  },
  {
    id: '25',
    code: 'MIDNIGHT',
    type: 'percentage',
    value: 25,
    status: 'paused',
    description: 'Venta de medianoche (pausado temporalmente)',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    usageLimit: 500,
    usageCount: 123,
    totalDiscount: 3075,
    revenue: 12300,
    applicableTo: 'all',
    onePerCustomer: false,
    tags: ['nocturno', 'especial'],
    uses: []
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Verano 2025',
    description: 'Campaña de verano con múltiples cupones',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    budget: 20000,
    coupons: ['VERANO2025', 'WEEKEND'],
    totalUses: 1334,
    totalDiscount: 23480,
    roi: 3.2,
    status: 'active'
  },
  {
    id: '2',
    name: 'Captación',
    description: 'Captación de nuevos clientes',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: 50000,
    coupons: ['BIENVENIDO', 'PRIMERAVEZ', 'SUSCRIBE10'],
    totalUses: 2817,
    totalDiscount: 51835,
    roi: 2.8,
    status: 'active'
  },
  {
    id: '3',
    name: 'Black Friday',
    description: 'Evento Black Friday 2024',
    startDate: '2024-11-29',
    endDate: '2024-11-30',
    budget: 60000,
    coupons: ['BLACK2024'],
    totalUses: 1000,
    totalDiscount: 50000,
    roi: 2.5,
    status: 'completed'
  }
];

const usageOverTimeData = [
  { date: 'Ene', uses: 234 },
  { date: 'Feb', uses: 345 },
  { date: 'Mar', uses: 456 },
  { date: 'Abr', uses: 567 },
  { date: 'May', uses: 678 },
  { date: 'Jun', uses: 543 }
];

const topCouponsData = [
  { code: 'BIENVENIDO', uses: 892 },
  { code: 'WEEKEND', uses: 987 },
  { code: 'PRIMERAVEZ', uses: 1247 },
  { code: 'SUSCRIBE10', uses: 678 },
  { code: 'PREMIUM10', uses: 567 }
];

const channelData = [
  { name: 'Web', value: 45 },
  { name: 'App', value: 25 },
  { name: 'Email', value: 15 },
  { name: 'Redes Sociales', value: 10 },
  { name: 'Influencers', value: 5 }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

const CuponesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'scheduled' | 'expired' | 'top'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showNewCouponModal, setShowNewCouponModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [newCouponStep, setNewCouponStep] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);
  const [couponToEdit, setCouponToEdit] = useState<Coupon | null>(null);
  const [couponToShare, setCouponToShare] = useState<Coupon | null>(null);
  const [couponToEmail, setCouponToEmail] = useState<Coupon | null>(null);
  const [couponToQR, setCouponToQR] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar menú desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSelectedCoupon(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // New coupon form state
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percentage' as CouponType,
    value: 0,
    description: '',
    applicableTo: 'all' as ApplicableTo,
    startDate: '',
    endDate: '',
    usageLimit: null as number | null,
    onePerCustomer: false,
    minPurchase: 0,
    campaign: '',
    tags: [] as string[]
  });

  // Filter coupons
  const filteredCoupons = useMemo(() => {
    let filtered = mockCoupons;

    // Filter by tab
    if (activeTab === 'active') {
      filtered = filtered.filter(c => c.status === 'active');
    } else if (activeTab === 'scheduled') {
      filtered = filtered.filter(c => c.status === 'scheduled');
    } else if (activeTab === 'expired') {
      filtered = filtered.filter(c => c.status === 'expired');
    } else if (activeTab === 'top') {
      filtered = filtered.filter(c => c.usageCount > 500).sort((a, b) => b.usageCount - a.usageCount);
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchTerm]);

  // Calculate stats
  const stats = useMemo(() => {
    const activeCoupons = mockCoupons.filter(c => c.status === 'active').length;
    const totalRedeemed = mockCoupons.reduce((sum, c) => sum + c.usageCount, 0);
    const totalDiscount = mockCoupons.reduce((sum, c) => sum + c.totalDiscount, 0);
    const totalRevenue = mockCoupons.reduce((sum, c) => sum + c.revenue, 0);
    const usageRate = totalRevenue > 0 ? ((totalDiscount / totalRevenue) * 100) : 0;
    const topCoupon = [...mockCoupons].sort((a, b) => b.usageCount - a.usageCount)[0];
    const avgSavings = totalRedeemed > 0 ? totalDiscount / totalRedeemed : 0;

    return {
      activeCoupons,
      totalRedeemed,
      totalDiscount,
      usageRate,
      topCoupon: topCoupon?.code || '-',
      avgSavings
    };
  }, []);

  const getCouponTypeIcon = (type: CouponType) => {
    switch (type) {
      case 'percentage': return <Percent className="w-5 h-5" />;
      case 'fixed': return <DollarSign className="w-5 h-5" />;
      case 'free-shipping': return <Truck className="w-5 h-5" />;
      case '2x1': return <Gift className="w-5 h-5" />;
    }
  };

  const getCouponTypeLabel = (type: CouponType) => {
    switch (type) {
      case 'percentage': return 'Porcentaje';
      case 'fixed': return 'Cantidad Fija';
      case 'free-shipping': return 'Envío Gratis';
      case '2x1': return '2x1';
    }
  };

  const getStatusColor = (status: CouponStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'expired': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'paused': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusLabel = (status: CouponStatus) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'scheduled': return 'Programado';
      case 'expired': return 'Expirado';
      case 'paused': return 'Pausado';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon({ ...newCoupon, code });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Código copiado al portapapeles');
    }).catch(() => {
      toast.error('Error al copiar el código');
    });
  };

  const handleDeleteCoupon = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setShowDeleteModal(true);
  };

  const confirmDeleteCoupon = async () => {
    if (!couponToDelete) return;
    
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Cupón ${couponToDelete.code} eliminado correctamente`);
      setShowDeleteModal(false);
      setCouponToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar el cupón');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setCouponToEdit(coupon);
    setShowEditModal(true);
  };

  const handleShareCoupon = (coupon: Coupon) => {
    setCouponToShare(coupon);
    setShowShareModal(true);
  };

  const handleEmailCoupon = (coupon: Coupon) => {
    setCouponToEmail(coupon);
    setShowEmailModal(true);
  };

  const handleGenerateQR = (coupon: Coupon) => {
    setCouponToQR(coupon);
    setShowQRModal(true);
  };

  const handleExportData = () => {
    setShowExportModal(true);
  };

  const handleToggleCouponStatus = async (coupon: Coupon) => {
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newStatus = coupon.status === 'paused' ? 'active' : 'paused';
      toast.success(`Cupón ${newStatus === 'active' ? 'activado' : 'pausado'} correctamente`);
    } catch (error) {
      toast.error('Error al cambiar el estado del cupón');
    } finally {
      setIsLoading(false);
    }
  };


  const handleCreateCoupon = async () => {
    if (!newCoupon.code || !newCoupon.description) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Cupón ${newCoupon.code} creado correctamente`);
      setShowNewCouponModal(false);
      setNewCouponStep(1);
      setNewCoupon({
        code: '',
        type: 'percentage',
        value: 0,
        description: '',
        applicableTo: 'all',
        startDate: '',
        endDate: '',
        usageLimit: null,
        onePerCustomer: false,
        minPurchase: 0,
        campaign: '',
        tags: []
      });
    } catch (error) {
      toast.error('Error al crear el cupón');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Campaña creada correctamente');
      setShowCampaignModal(false);
    } catch (error) {
      toast.error('Error al crear la campaña');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareViaSocial = (platform: string) => {
    if (!couponToShare) return;
    
    const shareText = `¡Descubre este increíble descuento! Código: ${couponToShare.code} - ${couponToShare.description}`;
    const shareUrl = `${window.location.origin}/cupon/${couponToShare.code}`;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      toast.success(`Compartiendo en ${platform}...`);
    }
  };

  const handleSendEmail = async (email: string) => {
    if (!couponToEmail) return;
    
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Cupón enviado a ${email}`);
      setShowEmailModal(false);
      setCouponToEmail(null);
    } catch (error) {
      toast.error('Error al enviar el email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportToFormat = async (format: string) => {
    setIsLoading(true);
    try {
      // Simular generación de archivo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Datos exportados en formato ${format.toUpperCase()}`);
      setShowExportModal(false);
    } catch (error) {
      toast.error('Error al exportar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Ticket className="w-10 h-10 text-green-600" />
              Cupones y Promociones
            </h1>
            <p className="text-gray-600 mt-2">Gestiona códigos de descuento y ofertas especiales</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="all">Todo el tiempo</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCampaignModal(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700"
            >
              <Zap className="w-5 h-5" />
              Campaña Promocional
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNewCouponModal(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
              Nuevo Cupón
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Ticket className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.activeCoupons}</div>
          <div className="text-sm text-gray-600">Cupones Activos</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+18%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalRedeemed.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Canjeados</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="w-8 h-8 text-red-600" />
            <span className="text-xs text-red-600 font-medium">-8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalDiscount)}</div>
          <div className="text-sm text-gray-600">Descuentos Aplicados</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-green-600 font-medium">+5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.usageRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Tasa de Uso</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="text-lg font-bold text-gray-900 truncate">{stats.topCoupon}</div>
          <div className="text-sm text-gray-600">Cupón Más Usado</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+15%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgSavings)}</div>
          <div className="text-sm text-gray-600">Ahorro Promedio</div>
        </motion.div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex gap-2">
            {['all', 'active', 'scheduled', 'expired', 'top'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'all' && 'Todos los Cupones'}
                {tab === 'active' && 'Activos'}
                {tab === 'scheduled' && 'Programados'}
                {tab === 'expired' && 'Expirados'}
                {tab === 'top' && 'Más Usados'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cupones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setShowAnalyticsModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Análisis
            </button>
            <button 
              onClick={handleExportData}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 overflow-hidden relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #f3f4f6 0px, #f3f4f6 10px, transparent 10px, transparent 20px)',
                backgroundSize: '100% 4px',
                backgroundPosition: '0 0, 0 100%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(coupon.status)}`}>
                  {getStatusLabel(coupon.status)}
                </span>
              </div>

              {/* Coupon Content */}
              <div className="p-6">
                {/* Code */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getCouponTypeIcon(coupon.type)}
                    <span className="text-xs text-gray-500 font-medium">{getCouponTypeLabel(coupon.type)}</span>
                  </div>
                  <div
                    className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-600 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => copyToClipboard(coupon.code)}
                  >
                    <div className="font-mono text-2xl font-bold text-green-700 text-center tracking-wider">
                      {coupon.code}
                    </div>
                  </div>
                </div>

                {/* Value */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {coupon.type === 'percentage' && `${coupon.value}% OFF`}
                    {coupon.type === 'fixed' && formatCurrency(coupon.value)}
                    {coupon.type === 'free-shipping' && 'ENVÍO GRATIS'}
                    {coupon.type === '2x1' && '2x1'}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 text-center mb-4 min-h-[40px]">{coupon.description}</p>

                {/* Dates */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(coupon.startDate).toLocaleDateString('es-ES')}
                    {coupon.endDate && ` - ${new Date(coupon.endDate).toLocaleDateString('es-ES')}`}
                  </span>
                </div>

                {/* Usage Progress */}
                {coupon.usageLimit && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{coupon.usageCount} usos</span>
                      <span>{coupon.usageLimit} máx</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {!coupon.usageLimit && (
                  <div className="text-center text-xs text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Usos ilimitados</span>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500">Veces usado</div>
                    <div className="text-lg font-bold text-gray-900">{coupon.usageCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Descuento total</div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(coupon.totalDiscount)}</div>
                  </div>
                </div>

                {/* Tags */}
                {coupon.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {coupon.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCoupon(coupon);
                      setShowDetailsModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button 
                    onClick={() => copyToClipboard(coupon.code)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Copiar código"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleShareCoupon(coupon)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Compartir cupón"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setSelectedCoupon(selectedCoupon?.id === coupon.id ? null : coupon)}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      title="Más opciones"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {selectedCoupon?.id === coupon.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button 
                          onClick={() => handleEditCoupon(coupon)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button 
                          onClick={() => handleToggleCouponStatus(coupon)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          {coupon.status === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                          {coupon.status === 'paused' ? 'Activar' : 'Pausar'}
                        </button>
                        <button 
                          onClick={() => handleGenerateQR(coupon)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <QrCode className="w-4 h-4" />
                          Generar QR
                        </button>
                        <button 
                          onClick={() => handleEmailCoupon(coupon)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Enviar por Email
                        </button>
                        <hr className="my-1" />
                        <button 
                          onClick={() => handleDeleteCoupon(coupon)}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veces usado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descuento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-green-700">{coupon.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getCouponTypeIcon(coupon.type)}
                      <span className="text-sm">{getCouponTypeLabel(coupon.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">
                    {coupon.type === 'percentage' && `${coupon.value}%`}
                    {coupon.type === 'fixed' && formatCurrency(coupon.value)}
                    {coupon.type === 'free-shipping' && '-'}
                    {coupon.type === '2x1' && '2x1'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>{new Date(coupon.startDate).toLocaleDateString('es-ES')}</div>
                    {coupon.endDate && <div className="text-gray-500">{new Date(coupon.endDate).toLocaleDateString('es-ES')}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {coupon.usageLimit ? `${coupon.usageCount}/${coupon.usageLimit}` : 'Ilimitado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{coupon.usageCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">
                    {formatCurrency(coupon.totalDiscount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(coupon.status)}`}>
                      {getStatusLabel(coupon.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setShowDetailsModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditCoupon(coupon)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Editar cupón"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => copyToClipboard(coupon.code)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Copiar código"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleCouponStatus(coupon)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={coupon.status === 'paused' ? 'Activar cupón' : 'Pausar cupón'}
                      >
                        {coupon.status === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Coupon Modal */}
      <AnimatePresence>
        {showNewCouponModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewCouponModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Crear Nuevo Cupón</h2>
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex-1 h-2 rounded-full ${
                        step <= newCouponStep ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Code & Type */}
                {newCouponStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Código del Cupón</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCoupon.code}
                          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                          placeholder="Ej: VERANO2025"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 font-mono text-lg"
                        />
                        <button
                          onClick={generateRandomCode}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                        >
                          Generar
                        </button>
                      </div>
                      {newCoupon.code && (
                        <div className="mt-3 p-4 bg-green-50 border-2 border-green-600 rounded-lg">
                          <div className="text-center font-mono text-2xl font-bold text-green-700">
                            {newCoupon.code}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de Descuento</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(['percentage', 'fixed', 'free-shipping', '2x1'] as CouponType[]).map((type) => (
                          <button
                            key={type}
                            onClick={() => setNewCoupon({ ...newCoupon, type })}
                            className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
                              newCoupon.type === type
                                ? 'border-green-600 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {getCouponTypeIcon(type)}
                            <span className="font-medium">{getCouponTypeLabel(type)}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {newCoupon.type !== 'free-shipping' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor del Descuento
                          {newCoupon.type === 'percentage' && ' (%)'}
                          {newCoupon.type === 'fixed' && ' (€)'}
                        </label>
                        <input
                          type="number"
                          value={newCoupon.value}
                          onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Applicability */}
                {newCouponStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">¿A qué se aplica?</label>
                      <div className="space-y-2">
                        {(['all', 'products', 'categories', 'plans'] as ApplicableTo[]).map((type) => (
                          <button
                            key={type}
                            onClick={() => setNewCoupon({ ...newCoupon, applicableTo: type })}
                            className={`w-full p-4 border-2 rounded-lg text-left ${
                              newCoupon.applicableTo === type
                                ? 'border-green-600 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {type === 'all' && 'Todo el catálogo'}
                            {type === 'products' && 'Productos/servicios específicos'}
                            {type === 'categories' && 'Categorías específicas'}
                            {type === 'plans' && 'Planes de suscripción'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compra Mínima (€)</label>
                      <input
                        type="number"
                        value={newCoupon.minPurchase}
                        onChange={(e) => setNewCoupon({ ...newCoupon, minPurchase: Number(e.target.value) })}
                        placeholder="0 = sin mínimo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newCoupon.onePerCustomer}
                          onChange={(e) => setNewCoupon({ ...newCoupon, onePerCustomer: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Un uso por cliente</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3: Validity & Limits */}
                {newCouponStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                      <input
                        type="date"
                        value={newCoupon.startDate}
                        onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Fin (opcional)</label>
                      <input
                        type="date"
                        value={newCoupon.endDate}
                        onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Límite de Usos (dejar vacío para ilimitado)
                      </label>
                      <input
                        type="number"
                        value={newCoupon.usageLimit || ''}
                        onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value ? Number(e.target.value) : null })}
                        placeholder="Ilimitado"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Additional Config */}
                {newCouponStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                      <textarea
                        value={newCoupon.description}
                        onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="Describe el cupón..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Campaña</label>
                      <select
                        value={newCoupon.campaign}
                        onChange={(e) => setNewCoupon({ ...newCoupon, campaign: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Sin campaña</option>
                        {mockCampaigns.map((camp) => (
                          <option key={camp.id} value={camp.name}>{camp.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags (separados por coma)</label>
                      <input
                        type="text"
                        placeholder="verano, promoción, especial"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    {/* Preview */}
                    <div className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-dashed border-green-600 rounded-xl">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">VISTA PREVIA</div>
                        <div className="font-mono text-3xl font-bold text-green-700 mb-3">
                          {newCoupon.code || 'CÓDIGO'}
                        </div>
                        <div className="text-xl font-bold text-gray-900 mb-2">
                          {newCoupon.type === 'percentage' && `${newCoupon.value}% OFF`}
                          {newCoupon.type === 'fixed' && `${newCoupon.value}€ OFF`}
                          {newCoupon.type === 'free-shipping' && 'ENVÍO GRATIS'}
                          {newCoupon.type === '2x1' && '2x1'}
                        </div>
                        <p className="text-sm text-gray-600">{newCoupon.description || 'Descripción del cupón'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={() => {
                    if (newCouponStep > 1) {
                      setNewCouponStep(newCouponStep - 1);
                    } else {
                      setShowNewCouponModal(false);
                    }
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {newCouponStep === 1 ? 'Cancelar' : 'Anterior'}
                </button>
                <button
                  onClick={() => {
                    if (newCouponStep < 4) {
                      setNewCouponStep(newCouponStep + 1);
                    } else {
                      handleCreateCoupon();
                    }
                  }}
                  disabled={isLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {newCouponStep === 4 ? 'Crear Cupón' : 'Siguiente'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-mono">{selectedCoupon.code}</h2>
                    <p className="text-gray-600 mt-1">{selectedCoupon.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedCoupon.status)}`}>
                    {getStatusLabel(selectedCoupon.status)}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Veces usado</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedCoupon.usageCount}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Descuento total</div>
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(selectedCoupon.totalDiscount)}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Ingresos</div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedCoupon.revenue)}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">ROI</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedCoupon.totalDiscount > 0 ? (selectedCoupon.revenue / selectedCoupon.totalDiscount).toFixed(1) : 0}x
                    </div>
                  </div>
                </div>

                {/* Usage Chart */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Usos en el Tiempo</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={usageOverTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="uses" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Share Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                    <Copy className="w-5 h-5" />
                    Copiar Código
                  </button>
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <QrCode className="w-5 h-5" />
                    Generar QR
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Compartir
                  </button>
                  <button className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Enviar Email
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditCoupon(selectedCoupon);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Editar Cupón
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalyticsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAnalyticsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Análisis y Reportes</h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Top Coupons */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Cupones Más Exitosos</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topCouponsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="code" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="uses" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Channel Distribution */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución por Canal</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) => `${props.name}: ${(props.percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {channelData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Campaigns */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Rendimiento de Campañas</h3>
                  <div className="space-y-3">
                    {mockCampaigns.map((campaign) => (
                      <div key={campaign.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{campaign.name}</h4>
                            <p className="text-sm text-gray-600">{campaign.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                            campaign.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {campaign.status === 'active' ? 'Activa' : campaign.status === 'completed' ? 'Completada' : 'Pausada'}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-3">
                          <div>
                            <div className="text-xs text-gray-500">Usos totales</div>
                            <div className="text-lg font-bold">{campaign.totalUses}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Descuento total</div>
                            <div className="text-lg font-bold text-red-600">{formatCurrency(campaign.totalDiscount)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Presupuesto</div>
                            <div className="text-lg font-bold">{formatCurrency(campaign.budget)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">ROI</div>
                            <div className="text-lg font-bold text-green-600">{campaign.roi}x</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaign Modal */}
      <AnimatePresence>
        {showCampaignModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCampaignModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Nueva Campaña Promocional</h2>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Campaña</label>
                  <input
                    type="text"
                    placeholder="Ej: Black Friday 2025"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    rows={3}
                    placeholder="Describe la campaña..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Fin</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Presupuesto de Descuentos (€)</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Nuevos clientes</option>
                    <option>Reactivación</option>
                    <option>Fidelización</option>
                    <option>Temporada</option>
                    <option>Clearance</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateCampaign}
                  disabled={isLoading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  Crear Campaña
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCouponToDelete(null);
        }}
        onConfirm={confirmDeleteCoupon}
        title="Eliminar Cupón"
        message={`¿Estás seguro de que quieres eliminar el cupón "${couponToDelete?.code}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && couponToShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Compartir Cupón</h2>
                <p className="text-gray-600 mt-1">Comparte el cupón {couponToShare.code} en redes sociales</p>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => handleShareViaSocial('twitter')}
                  className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 text-xs font-bold">𝕏</span>
                  </div>
                  Compartir en Twitter
                </button>
                <button
                  onClick={() => handleShareViaSocial('facebook')}
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">f</span>
                  </div>
                  Compartir en Facebook
                </button>
                <button
                  onClick={() => handleShareViaSocial('whatsapp')}
                  className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-green-500 text-xs font-bold">W</span>
                  </div>
                  Compartir en WhatsApp
                </button>
                <button
                  onClick={() => handleShareViaSocial('telegram')}
                  className="w-full p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-400 text-xs font-bold">T</span>
                  </div>
                  Compartir en Telegram
                </button>
                <button
                  onClick={() => copyToClipboard(couponToShare.code)}
                  className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-3"
                >
                  <Copy className="w-5 h-5" />
                  Copiar Código
                </button>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <InputModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setCouponToEmail(null);
        }}
        onConfirm={handleSendEmail}
        title="Enviar Cupón por Email"
        message={`Envía el cupón ${couponToEmail?.code} por correo electrónico`}
        placeholder="email@ejemplo.com"
        confirmText="Enviar"
        cancelText="Cancelar"
        type="email"
        isLoading={isLoading}
      />

      {/* QR Modal */}
      <AnimatePresence>
        {showQRModal && couponToQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQRModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Código QR</h2>
                <p className="text-gray-600 mt-1">Código QR para el cupón {couponToQR.code}</p>
              </div>
              <div className="p-6 text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  El código QR contiene el enlace directo al cupón
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </button>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowQRModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Exportar Datos</h2>
                <p className="text-gray-600 mt-1">Selecciona el formato de exportación</p>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => handleExportToFormat('csv')}
                  className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">CSV</div>
                    <div className="text-sm text-gray-600">Para Excel y Google Sheets</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExportToFormat('xlsx')}
                  className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">Excel</div>
                    <div className="text-sm text-gray-600">Archivo Excel completo</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExportToFormat('pdf')}
                  className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                >
                  <FileText className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <div className="font-medium">PDF</div>
                    <div className="text-sm text-gray-600">Reporte en PDF</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExportToFormat('json')}
                  className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                >
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">JSON</div>
                    <div className="text-sm text-gray-600">Datos estructurados</div>
                  </div>
                </button>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && couponToEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Editar Cupón</h2>
                <p className="text-gray-600 mt-1">Modifica los datos del cupón {couponToEdit.code}</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Código del Cupón</label>
                  <input
                    type="text"
                    defaultValue={couponToEdit.code}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    defaultValue={couponToEdit.description}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                    <input
                      type="date"
                      defaultValue={couponToEdit.startDate}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Fin</label>
                    <input
                      type="date"
                      defaultValue={couponToEdit.endDate || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Límite de Usos</label>
                  <input
                    type="number"
                    defaultValue={couponToEdit.usageLimit || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={couponToEdit.onePerCustomer}
                    className="rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">Un uso por cliente</label>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    toast.success('Cupón actualizado correctamente');
                    setShowEditModal(false);
                    setCouponToEdit(null);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CuponesPage;