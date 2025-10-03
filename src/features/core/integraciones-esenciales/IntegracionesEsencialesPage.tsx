import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, X, Check, Star, Users, Clock, TrendingUp,
  Calendar, CreditCard, Mail, Video, MessageCircle, Database,
  Zap, Globe, FileText, ArrowRight, ExternalLink, ArrowUpRight,
  RefreshCw, CheckCircle2, AlertCircle, Sparkles, Activity
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  features: string[];
  pricing: string;
  status: 'connected' | 'available' | 'coming-soon';
  rating: number;
  users: string;
  lastSync?: string;
  dataSynced?: string;
  requirements?: string[];
  screenshots?: string[];
  popular?: boolean;
  recommended?: boolean;
}

const IntegracionesEsencialesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todas');
  const [sortBy, setSortBy] = useState('popularidad');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectStep, setConnectStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);

  const integrations: Integration[] = [
    {
      id: 'stripe',
      name: 'Stripe',
      logo: '💳',
      category: 'Pagos',
      description: 'Procesamiento de pagos online seguro y confiable',
      fullDescription: 'Stripe es la plataforma líder en procesamiento de pagos online. Acepta tarjetas de crédito, débito y más de 135 métodos de pago locales.',
      benefits: ['Pagos recurrentes automáticos', 'Dashboard financiero completo', 'Protección contra fraude'],
      features: ['Pagos únicos y recurrentes', 'Facturación automática', 'Análisis en tiempo real', 'API completa'],
      pricing: '2.9% + €0.30 por transacción',
      status: 'connected',
      rating: 4.9,
      users: '50M+',
      lastSync: 'Hace 2 minutos',
      dataSynced: '€12,453.00 (último mes)',
      requirements: ['Cuenta de empresa verificada', 'Documento de identidad'],
      popular: true
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      logo: '📅',
      category: 'Calendario',
      description: 'Sincronización bidireccional de eventos y citas',
      fullDescription: 'Sincroniza automáticamente todas tus clases, citas y eventos con Google Calendar. Tus clientes pueden ver disponibilidad en tiempo real.',
      benefits: ['Sincronización en tiempo real', 'Recordatorios automáticos', 'Gestión de disponibilidad'],
      features: ['Sincronización bidireccional', 'Zonas horarias automáticas', 'Invitaciones por email', 'Recordatorios personalizados'],
      pricing: 'Gratis',
      status: 'connected',
      rating: 4.8,
      users: '1B+',
      lastSync: 'Hace 5 minutos',
      dataSynced: '124 eventos sincronizados',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: '🅿️',
      category: 'Pagos',
      description: 'Acepta pagos globales de forma segura',
      fullDescription: 'PayPal permite recibir pagos de más de 200 países con protección al vendedor incluida.',
      benefits: ['Aceptado mundialmente', 'Protección al vendedor', 'Sin costos de setup'],
      features: ['Pagos internacionales', 'Checkout rápido', 'Facturación', 'Pagos móviles'],
      pricing: '3.4% + €0.35 por transacción',
      status: 'connected',
      rating: 4.6,
      users: '400M+',
      lastSync: 'Hace 1 hora',
      dataSynced: '€8,234.00 (último mes)',
      requirements: ['Cuenta PayPal Business']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      logo: '📧',
      category: 'Email Marketing',
      description: 'Email marketing y automatizaciones potentes',
      fullDescription: 'Crea campañas de email profesionales, automatiza comunicaciones y segmenta tu audiencia con Mailchimp.',
      benefits: ['Automatización de campañas', 'Segmentación avanzada', 'Análisis detallados'],
      features: ['Templates profesionales', 'A/B Testing', 'Automatizaciones', 'Landing pages'],
      pricing: 'Desde €10/mes',
      status: 'available',
      rating: 4.7,
      users: '12M+',
      popular: true,
      recommended: true
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      logo: '✉️',
      category: 'Email Marketing',
      description: 'Envío de emails transaccionales y marketing',
      fullDescription: 'SendGrid by Twilio es una plataforma robusta para emails transaccionales y campañas de marketing.',
      benefits: ['Alta entregabilidad', 'Escalabilidad ilimitada', 'Analytics en tiempo real'],
      features: ['API de emails', 'Templates dinámicos', 'Validación de emails', 'Webhooks'],
      pricing: 'Desde €15/mes',
      status: 'available',
      rating: 4.5,
      users: '80K+'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      logo: '🎥',
      category: 'Videollamadas',
      description: 'Clases virtuales y videollamadas HD',
      fullDescription: 'Realiza entrenamientos en vivo, consultorías y clases grupales con Zoom, la plataforma líder en videoconferencias.',
      benefits: ['Video HD y audio crystal clear', 'Grabaciones en la nube', 'Salas de espera'],
      features: ['Hasta 1000 participantes', 'Compartir pantalla', 'Breakout rooms', 'Transcripciones'],
      pricing: 'Desde €13.99/mes',
      status: 'available',
      rating: 4.6,
      users: '300M+',
      popular: true
    },
    {
      id: 'google-meet',
      name: 'Google Meet',
      logo: '📹',
      category: 'Videollamadas',
      description: 'Videollamadas integradas con Google Workspace',
      fullDescription: 'Google Meet ofrece videollamadas seguras integradas perfectamente con tu Google Calendar.',
      benefits: ['Integración con Calendar', 'Encriptación por defecto', 'Sin instalación'],
      features: ['Hasta 500 participantes', 'Grabación en Drive', 'Subtítulos en vivo', 'Fondos virtuales'],
      pricing: 'Gratis / Desde €6/mes',
      status: 'available',
      rating: 4.4,
      users: '200M+'
    },
    {
      id: 'whatsapp-business',
      name: 'WhatsApp Business',
      logo: '💬',
      category: 'Comunicación',
      description: 'Comunicación directa por WhatsApp',
      fullDescription: 'Comunícate con tus clientes donde ya están. Envía confirmaciones, recordatorios y responde consultas por WhatsApp.',
      benefits: ['Mensajes automáticos', 'Catálogo de productos', 'Respuestas rápidas'],
      features: ['Auto-respuestas', 'Etiquetas de chats', 'Estadísticas', 'Mensajes masivos'],
      pricing: 'Gratis',
      status: 'available',
      rating: 4.7,
      users: '50M+',
      recommended: true
    },
    {
      id: 'slack',
      name: 'Slack',
      logo: '💼',
      category: 'Comunicación',
      description: 'Comunicación de equipo y notificaciones',
      fullDescription: 'Recibe notificaciones importantes de tu negocio directamente en Slack. Colabora con tu equipo en tiempo real.',
      benefits: ['Notificaciones en tiempo real', 'Canales organizados', 'Integraciones múltiples'],
      features: ['Mensajería instantánea', 'Llamadas de voz/video', 'Compartir archivos', 'Buscador potente'],
      pricing: 'Gratis / Desde €6.75/mes',
      status: 'available',
      rating: 4.5,
      users: '18M+'
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      logo: '📊',
      category: 'Contabilidad',
      description: 'Contabilidad y gestión financiera completa',
      fullDescription: 'QuickBooks simplifica tu contabilidad. Sincroniza ingresos, gastos y genera reportes fiscales automáticamente.',
      benefits: ['Contabilidad automatizada', 'Reportes fiscales', 'Gestión de facturas'],
      features: ['Facturación', 'Tracking de gastos', 'Reportes financieros', 'Inventario'],
      pricing: 'Desde €25/mes',
      status: 'available',
      rating: 4.3,
      users: '7M+'
    },
    {
      id: 'xero',
      name: 'Xero',
      logo: '💰',
      category: 'Contabilidad',
      description: 'Software de contabilidad en la nube',
      fullDescription: 'Xero es un software de contabilidad potente y fácil de usar, diseñado para pequeñas y medianas empresas.',
      benefits: ['Interfaz intuitiva', 'Conciliación bancaria', 'Multi-moneda'],
      features: ['Facturas personalizadas', 'Control de inventario', 'Proyectos', 'Compras'],
      pricing: 'Desde €12/mes',
      status: 'available',
      rating: 4.4,
      users: '3.5M+'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      logo: '🎯',
      category: 'CRM',
      description: 'CRM completo con marketing automation',
      fullDescription: 'HubSpot es una plataforma todo-en-uno para ventas, marketing y servicio al cliente. Gestiona tus leads y clientes eficientemente.',
      benefits: ['CRM gratuito', 'Marketing automation', 'Seguimiento de leads'],
      features: ['Gestión de contactos', 'Pipeline de ventas', 'Email tracking', 'Formularios'],
      pricing: 'Gratis / Desde €45/mes',
      status: 'available',
      rating: 4.5,
      users: '150K+',
      recommended: true
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      logo: '☁️',
      category: 'CRM',
      description: 'CRM empresarial líder mundial',
      fullDescription: 'Salesforce es el CRM #1 del mundo. Gestiona clientes, ventas y servicio en una plataforma unificada.',
      benefits: ['Altamente personalizable', 'Ecosistema completo', 'IA integrada'],
      features: ['Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Analytics'],
      pricing: 'Desde €25/mes',
      status: 'available',
      rating: 4.4,
      users: '150K+'
    },
    {
      id: 'instagram-business',
      name: 'Instagram Business',
      logo: '📸',
      category: 'Redes Sociales',
      description: 'Marketing y publicación en Instagram',
      fullDescription: 'Conecta tu cuenta de Instagram Business para programar posts, ver analytics y gestionar mensajes directos.',
      benefits: ['Programación de posts', 'Stories automáticas', 'Analytics detallados'],
      features: ['Auto-posting', 'Estadísticas', 'Gestión de DMs', 'Hashtags sugeridos'],
      pricing: 'Gratis',
      status: 'available',
      rating: 4.6,
      users: '200M+'
    },
    {
      id: 'facebook-business',
      name: 'Facebook Business',
      logo: '👥',
      category: 'Redes Sociales',
      description: 'Publicación y ads en Facebook',
      fullDescription: 'Gestiona tu presencia en Facebook, programa publicaciones y administra campañas publicitarias.',
      benefits: ['Publicación programada', 'Ads manager', 'Insights detallados'],
      features: ['Páginas empresariales', 'Eventos', 'Marketplace', 'Grupos'],
      pricing: 'Gratis',
      status: 'available',
      rating: 4.3,
      users: '3B+'
    },
    {
      id: 'myfitnesspal',
      name: 'MyFitnessPal',
      logo: '🍎',
      category: 'Nutrición',
      description: 'Tracking nutricional para tus clientes',
      fullDescription: 'Sincroniza datos nutricionales de MyFitnessPal para seguir el progreso de tus clientes en tiempo real.',
      benefits: ['Base de datos de 14M+ alimentos', 'Tracking de macros', 'Objetivos personalizados'],
      features: ['Diario de comidas', 'Recetas', 'Scanner de código de barras', 'Reportes'],
      pricing: 'Gratis',
      status: 'available',
      rating: 4.6,
      users: '200M+'
    },
    {
      id: 'apple-health',
      name: 'Apple Health',
      logo: '❤️',
      category: 'Wearables',
      description: 'Integración con Apple Health y HealthKit',
      fullDescription: 'Accede a datos de salud y fitness de Apple Health: pasos, calorías, frecuencia cardíaca y más.',
      benefits: ['Datos en tiempo real', 'Sincronización automática', 'Privacidad garantizada'],
      features: ['Actividad física', 'Métricas cardíacas', 'Sueño', 'Nutrición'],
      pricing: 'Gratis',
      status: 'available',
      rating: 4.7,
      users: '1B+',
      popular: true
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      logo: '⌚',
      category: 'Wearables',
      description: 'Sincronización con dispositivos Fitbit',
      fullDescription: 'Integra datos de actividad, sueño y frecuencia cardíaca de dispositivos Fitbit de tus clientes.',
      benefits: ['Métricas detalladas', 'Análisis de sueño', 'Zonas cardíacas'],
      features: ['Pasos y distancia', 'Calorías quemadas', 'Minutos activos', 'Peso'],
      pricing: 'Gratis',
      status: 'available',
      rating: 4.5,
      users: '30M+'
    },
    {
      id: 'garmin',
      name: 'Garmin Connect',
      logo: '🏃',
      category: 'Wearables',
      description: 'Datos de entrenamiento de Garmin',
      fullDescription: 'Conecta con Garmin Connect para acceder a métricas avanzadas de entrenamiento de atletas.',
      benefits: ['Métricas de rendimiento', 'VO2 Max', 'Recuperación'],
      features: ['Actividades deportivas', 'Rutas GPS', 'Métricas avanzadas', 'Training load'],
      pricing: 'Gratis',
      status: 'available',
      rating: 4.6,
      users: '15M+'
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      logo: '📁',
      category: 'Almacenamiento',
      description: 'Almacenamiento y compartir archivos',
      fullDescription: 'Almacena planes de entrenamiento, dietas y documentos en Google Drive. Comparte fácilmente con clientes.',
      benefits: ['15GB gratis', 'Colaboración en tiempo real', 'Acceso desde cualquier lugar'],
      features: ['Almacenamiento en nube', 'Compartir archivos', 'Edición colaborativa', 'Búsqueda potente'],
      pricing: 'Gratis / Desde €1.99/mes',
      status: 'available',
      rating: 4.6,
      users: '1B+'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      logo: '📦',
      category: 'Almacenamiento',
      description: 'Sincronización de archivos en la nube',
      fullDescription: 'Dropbox ofrece almacenamiento seguro y sincronización automática de archivos en todos tus dispositivos.',
      benefits: ['Sincronización automática', 'Versiones de archivos', 'Compartir seguro'],
      features: ['Smart Sync', 'Dropbox Paper', 'Firma electrónica', 'Passwords'],
      pricing: 'Gratis / Desde €9.99/mes',
      status: 'available',
      rating: 4.5,
      users: '700M+'
    },
    {
      id: 'notion',
      name: 'Notion',
      logo: '📝',
      category: 'Productividad',
      description: 'Workspace todo-en-uno',
      fullDescription: 'Crea bases de conocimiento, wikis y documentación para tu negocio con Notion.',
      benefits: ['Flexible y personalizable', 'Colaboración en equipo', 'Templates variados'],
      features: ['Wikis', 'Bases de datos', 'Kanban boards', 'Calendarios'],
      pricing: 'Gratis / Desde €8/mes',
      status: 'coming-soon',
      rating: 4.7,
      users: '30M+'
    },
    {
      id: 'trello',
      name: 'Trello',
      logo: '📋',
      category: 'Productividad',
      description: 'Gestión de proyectos con tableros Kanban',
      fullDescription: 'Organiza proyectos, tareas y workflows con tableros Kanban visuales de Trello.',
      benefits: ['Visual e intuitivo', 'Colaboración simple', 'Power-Ups'],
      features: ['Tableros ilimitados', 'Checklists', 'Etiquetas', 'Automatizaciones'],
      pricing: 'Gratis / Desde €5/mes',
      status: 'coming-soon',
      rating: 4.5,
      users: '50M+'
    },
    {
      id: 'asana',
      name: 'Asana',
      logo: '✅',
      category: 'Productividad',
      description: 'Gestión de trabajo y proyectos',
      fullDescription: 'Asana ayuda a equipos a organizar, rastrear y gestionar su trabajo de manera efectiva.',
      benefits: ['Múltiples vistas', 'Timeline de proyectos', 'Automatizaciones'],
      features: ['Tareas', 'Proyectos', 'Portfolios', 'Formularios'],
      pricing: 'Gratis / Desde €10.99/mes',
      status: 'coming-soon',
      rating: 4.4,
      users: '100K+'
    },
    {
      id: 'telegram',
      name: 'Telegram Business',
      logo: '✈️',
      category: 'Comunicación',
      description: 'Mensajería segura con bots',
      fullDescription: 'Comunícate con clientes por Telegram, crea bots personalizados y canales de difusión.',
      benefits: ['Encriptación fuerte', 'Bots personalizables', 'Canales ilimitados'],
      features: ['Mensajes', 'Grupos', 'Canales', 'Bots API'],
      pricing: 'Gratis',
      status: 'coming-soon',
      rating: 4.6,
      users: '800M+'
    }
  ];

  const categories = [
    'Todas',
    'Pagos',
    'Calendario',
    'Email Marketing',
    'Videollamadas',
    'Comunicación',
    'CRM',
    'Contabilidad',
    'Redes Sociales',
    'Nutrición',
    'Wearables',
    'Almacenamiento',
    'Productividad'
  ];

  const statusFilters = ['Todas', 'Conectadas', 'Disponibles', 'Próximamente'];

  // URLs de documentación por integración
  const docsUrls: Record<string, string> = {
    'stripe': 'https://stripe.com/docs',
    'google-calendar': 'https://support.google.com/calendar',
    'paypal': 'https://developer.paypal.com/docs/',
    'mailchimp': 'https://mailchimp.com/help/',
    'sendgrid': 'https://docs.sendgrid.com/',
    'zoom': 'https://support.zoom.com/hc',
    'google-meet': 'https://support.google.com/meet',
    'whatsapp-business': 'https://www.whatsapp.com/business/',
    'slack': 'https://api.slack.com/',
    'quickbooks': 'https://quickbooks.intuit.com/learn-support/',
    'xero': 'https://developer.xero.com/documentation',
    'hubspot': 'https://knowledge.hubspot.com/',
    'salesforce': 'https://help.salesforce.com/',
    'instagram-business': 'https://business.instagram.com/resources',
    'facebook-business': 'https://www.facebook.com/business/help',
    'myfitnesspal': 'https://www.myfitnesspal.com/es/help',
    'apple-health': 'https://support.apple.com/es-es/guide/iphone/iphb2b2b3b2/ios',
    'fitbit': 'https://help.fitbit.com/',
    'garmin': 'https://support.garmin.com/',
    'google-drive': 'https://support.google.com/drive',
    'dropbox': 'https://help.dropbox.com/es-es',
    'notion': 'https://www.notion.so/help',
    'trello': 'https://support.atlassian.com/trello/',
    'asana': 'https://help.asana.com/',
    'telegram': 'https://core.telegram.org/bots'
  };

  const openDocsForIntegration = (integration: Integration) => {
    const url = docsUrls[integration.id] || `https://www.google.com/search?q=${encodeURIComponent(integration.name + ' documentación')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const lastSyncTime = 'Hace 2 minutos';

  // Filtrado
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || integration.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Todas' ||
                         (selectedStatus === 'Conectadas' && integration.status === 'connected') ||
                         (selectedStatus === 'Disponibles' && integration.status === 'available') ||
                         (selectedStatus === 'Próximamente' && integration.status === 'coming-soon');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Ordenamiento
  const sortedIntegrations = [...filteredIntegrations].sort((a, b) => {
    if (sortBy === 'popularidad') {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating;
    } else if (sortBy === 'a-z') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConnectModal(true);
    setConnectStep(1);
  };

  const handleConnectProcess = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      if (connectStep < 3) {
        setConnectStep(connectStep + 1);
      } else {
        setShowConnectModal(false);
        setSelectedIntegration(null);
      }
    }, 1500);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Pagos': 'from-green-500 to-emerald-600',
      'Calendario': 'from-blue-500 to-indigo-600',
      'Email Marketing': 'from-purple-500 to-pink-600',
      'Videollamadas': 'from-red-500 to-orange-600',
      'Comunicación': 'from-cyan-500 to-blue-600',
      'CRM': 'from-indigo-500 to-purple-600',
      'Contabilidad': 'from-yellow-500 to-orange-600',
      'Redes Sociales': 'from-pink-500 to-rose-600',
      'Nutrición': 'from-lime-500 to-green-600',
      'Wearables': 'from-violet-500 to-purple-600',
      'Almacenamiento': 'from-blue-500 to-cyan-600',
      'Productividad': 'from-orange-500 to-red-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Conectada
        </div>
      );
    } else if (status === 'coming-soon') {
      return (
        <div className="px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full">
          Próximamente
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Zap className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Conecta tus <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">herramientas favoritas</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed mb-8">
            Potencia tu negocio conectando las mejores herramientas del mercado. <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">Todo en un solo lugar</span>
          </p>

          {/* Barra de búsqueda */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar integraciones..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-white/30 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-200/50 transition-all duration-300 outline-none bg-white/90 backdrop-blur-md text-gray-900 placeholder-gray-500 text-lg font-medium shadow-xl"
              />
            </div>
          </div>

          {/* Contador */}
          <div className="mt-6 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 w-fit">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold text-white">{integrations.length} integraciones disponibles</span>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Integraciones Activas',
            value: connectedIntegrations.length,
            icon: CheckCircle2,
            gradient: 'from-green-500 to-emerald-600',
            change: '+2'
          },
          {
            title: 'Sincronizaciones Hoy',
            value: '47',
            icon: RefreshCw,
            gradient: 'from-blue-500 to-indigo-600',
            change: '+12'
          },
          {
            title: 'Datos Sincronizados',
            value: '€20,687',
            icon: Activity,
            gradient: 'from-purple-500 to-pink-600',
            change: '+8%'
          },
          {
            title: 'Última Actualización',
            value: lastSyncTime,
            icon: Clock,
            gradient: 'from-orange-500 to-red-600',
            change: 'Activo'
          }
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

            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7" />
              </div>

              <p className="text-xs font-bold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-2">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="text-xs font-bold text-green-600">{stat.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FILTROS Y BÚSQUEDA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        {/* Pills de filtro de estado */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Estado:</span>
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Pills de categorías */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ordenar */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none bg-white text-gray-700 font-medium"
          >
            <option value="popularidad">Popularidad</option>
            <option value="a-z">A-Z</option>
            <option value="rating">Rating</option>
          </select>

          <span className="ml-auto text-sm text-gray-600 font-medium">
            {sortedIntegrations.length} {sortedIntegrations.length === 1 ? 'integración encontrada' : 'integraciones encontradas'}
          </span>
        </div>
      </motion.div>

      {/* INTEGRACIONES CONECTADAS (destacadas) */}
      {connectedIntegrations.length > 0 && selectedStatus !== 'Disponibles' && selectedStatus !== 'Próximamente' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Integraciones Conectadas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border-2 border-green-200 p-6 relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-30"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl">
                        {integration.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(integration.category)} text-white`}>
                          {integration.category}
                        </span>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 font-medium">{integration.lastSync}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 font-medium">{integration.dataSynced}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setSelectedIntegration(integration)}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Configurar
                    </button>
                    <button
                      onClick={() => openDocsForIntegration(integration)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300"
                    >
                      <FileText className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* GRID DE INTEGRACIONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedIntegration(integration)}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 cursor-pointer relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

            {/* Badges en esquina */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              {integration.popular && (
                <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Popular
                </div>
              )}
              {integration.recommended && (
                <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Recomendado
                </div>
              )}
            </div>

            <div className="p-6 relative z-10">
              {/* Logo y header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                  {integration.logo}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{integration.name}</h3>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(integration.category)} text-white shadow-md`}>
                    {integration.category}
                  </span>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {integration.description}
              </p>

              {/* Rating y usuarios */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-gray-900">{integration.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{integration.users}</span>
                </div>
              </div>

              {/* Estado y botón */}
              <div className="flex items-center gap-2">
                {integration.status === 'connected' ? (
                  <>
                    {getStatusBadge(integration.status)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIntegration(integration);
                      }}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Configurar
                    </button>
                  </>
                ) : integration.status === 'coming-soon' ? (
                  <>
                    {getStatusBadge(integration.status)}
                    <button
                      disabled
                      className="flex-1 py-2 px-4 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                    >
                      No disponible
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConnect(integration);
                    }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Conectar
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {sortedIntegrations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600">No se encontraron integraciones</p>
          <p className="text-gray-500 mt-2">Intenta con otros filtros o términos de búsqueda</p>
        </motion.div>
      )}

      {/* MODAL DE DETALLES */}
      <AnimatePresence>
        {selectedIntegration && !showConnectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIntegration(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(selectedIntegration.category)} p-8 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors duration-300 z-10"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-5xl">
                    {selectedIntegration.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-4xl font-bold text-white">{selectedIntegration.name}</h2>
                      {getStatusBadge(selectedIntegration.status)}
                    </div>
                    <p className="text-xl text-white/90 mb-4">{selectedIntegration.fullDescription}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5">
                        <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                        <span className="text-sm font-bold text-white">{selectedIntegration.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5">
                        <Users className="w-4 h-4 text-white" />
                        <span className="text-sm font-bold text-white">{selectedIntegration.users} usuarios</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                {/* Características principales */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    Características principales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedIntegration.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Beneficios */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Beneficios</h3>
                  <div className="space-y-2">
                    {selectedIntegration.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-300">
                        <div className="p-1 bg-green-100 rounded-lg mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing y requisitos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-gray-900">Precio</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{selectedIntegration.pricing}</p>
                  </div>

                  {selectedIntegration.requirements && (
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-gray-900">Requisitos</h4>
                      </div>
                      <ul className="space-y-1">
                        {selectedIntegration.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4">
                  {selectedIntegration.status === 'connected' ? (
                    <>
                      <button
                        onClick={() => {
                          setShowConnectModal(true);
                          setConnectStep(3);
                        }}
                        className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Ver Configuración
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Seguro que deseas desconectar ${selectedIntegration.name}?`)) {
                            alert(`${selectedIntegration.name} desconectada. Puedes reconectarla cuando quieras.`);
                            setSelectedIntegration(null);
                          }
                        }}
                        className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        Desconectar
                      </button>
                    </>
                  ) : selectedIntegration.status === 'available' ? (
                    <>
                      <button
                        onClick={() => {
                          setShowConnectModal(true);
                          setSelectedIntegration(selectedIntegration);
                        }}
                        className="flex-1 py-4 px-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-bold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Zap className="w-5 h-5" />
                        Conectar Ahora
                      </button>
                      <button
                        onClick={() => openDocsForIntegration(selectedIntegration)}
                        className="py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Documentación
                      </button>
                    </>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-4 px-6 bg-gray-200 text-gray-500 rounded-2xl font-bold cursor-not-allowed"
                    >
                      Próximamente disponible
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE CONEXIÓN */}
      <AnimatePresence>
        {showConnectModal && selectedIntegration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowConnectModal(false);
              setSelectedIntegration(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(selectedIntegration.category)} p-6 rounded-t-3xl relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-3xl">
                    {selectedIntegration.logo}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Conectar con {selectedIntegration.name}</h3>
                    <p className="text-white/80">Paso {connectStep} de 3</p>
                  </div>
                </div>
              </div>

              {/* Body - Wizard */}
              <div className="p-8">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-1/3 h-2 rounded-full mx-1 transition-all duration-300 ${
                          step <= connectStep ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step content */}
                {connectStep === 1 && (
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Permisos necesarios</h4>
                    <p className="text-gray-600 mb-6">
                      {selectedIntegration.name} necesita los siguientes permisos para funcionar correctamente:
                    </p>
                    <div className="space-y-3 mb-6">
                      {['Acceso a datos de perfil', 'Lectura de información', 'Envío de notificaciones'].map((permission, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-gray-700">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {connectStep === 2 && (
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Credenciales</h4>
                    <p className="text-gray-600 mb-6">
                      Ingresa tus credenciales de {selectedIntegration.name}:
                    </p>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">API Key</label>
                        <input
                          type="text"
                          placeholder="Ingresa tu API key"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Secret Key (opcional)</label>
                        <input
                          type="password"
                          placeholder="Ingresa tu secret key"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {connectStep === 3 && (
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Configuración inicial</h4>
                    <p className="text-gray-600 mb-6">
                      Personaliza la configuración de la integración:
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700">Sincronización automática</span>
                        <div className="w-12 h-6 bg-purple-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700">Notificaciones</span>
                        <div className="w-12 h-6 bg-purple-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botones */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowConnectModal(false);
                      setSelectedIntegration(null);
                    }}
                    className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConnectProcess}
                    disabled={isConnecting}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Procesando...
                      </>
                    ) : connectStep === 3 ? (
                      <>
                        <Check className="w-5 h-5" />
                        Finalizar
                      </>
                    ) : (
                      <>
                        Siguiente
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntegracionesEsencialesPage;