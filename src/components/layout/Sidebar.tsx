import React, { useState, useEffect } from 'react';
import { Home, BarChart3, Inbox, Menu, Dumbbell, Activity, DollarSign, Megaphone, Settings, HelpCircle, Download, Zap, Users, UserCheck, TrendingUp, FileText, Target, CheckSquare, Library, Edit3, File, List, Plus, Calculator, Apple, ChefHat, Utensils, BookOpen, PieChart, Heart, Share, CreditCard, Receipt, RefreshCw, Banknote, FileDown, Package, Tag, Percent, UserPlus, Star, MessageSquare, Monitor, ChevronDown, ChevronRight, Globe, Calendar, ShoppingCart, ThumbsUp, CheckCircle, BarChart, Trophy, Video, Clock, MessageCircle, FileEdit, Map, Milestone, AlertTriangle, Palette, Smartphone, Wifi, Workflow, Bot, Gift, Search, FileVideo, Download as DownloadIcon, MessagesSquare, UserCircle, Award, Mail, Send, BarChart2, CreditCard as CardIcon, Shield, Bell, History, FlaskConical, Store, Box, QrCode, ClipboardList, CalendarCheck, RotateCcw, Receipt as ReceiptIcon, Ticket, Lock, Building2, PackageSearch, MonitorSmartphone, Building, ClipboardCheck, Stethoscope, GitCompare, UserSquare2, CalendarRange, ShieldCheck, LineChart, Swords, Flag, UserSearch, Radar } from 'lucide-react';
import type { User, PlanType } from '../../features/core/login/mockUsers';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// Helper function to check if user has access to a module
const hasModuleAccess = (moduleId: string, userPlan: PlanType | null): boolean => {
  if (!userPlan) return true; // Show all if no user logged in (fallback)

  // Core modules - available to everyone
  if (['core', 'crm', 'training', 'nutrition', 'finance', 'marketing', 'agents'].includes(moduleId)) {
    return true;
  }

  // Plan Solo family
  if (moduleId === 'plansolopro-micrositio' && ['plansolo-pro', 'plansolo-max'].includes(userPlan)) return true;
  if (moduleId === 'plansolopro-habitos' && ['plansolo-pro', 'plansolo-max'].includes(userPlan)) return true;
  if (moduleId === 'plansolopro-telesessions' && ['plansolo-pro', 'plansolo-max'].includes(userPlan)) return true;
  if (moduleId === 'plansolopro-cupones' && ['plansolo-pro', 'plansolo-max'].includes(userPlan)) return true;
  if (moduleId === 'plansolopro-journey' && ['plansolo-pro', 'plansolo-max'].includes(userPlan)) return true;

  // Plan Solo Max exclusive
  if (moduleId === 'plansolomax-analytics' && userPlan === 'plansolo-max') return true;
  if (moduleId === 'plansolomax-automatizaciones' && userPlan === 'plansolo-max') return true;
  if (moduleId === 'plansolomax-branding' && userPlan === 'plansolo-max') return true;
  if (moduleId === 'plansolomax-upsells' && userPlan === 'plansolo-max') return true;
  if (moduleId === 'plansolomax-wearables' && userPlan === 'plansolo-max') return true;

  // Plan Creator family
  if (moduleId === 'plancreatorpro-biblioteca' && ['plancreator-pro', 'plancreator-max'].includes(userPlan)) return true;
  if (moduleId === 'plancreatorpro-comunidad' && ['plancreator-pro', 'plancreator-max'].includes(userPlan)) return true;
  if (moduleId === 'plancreatorpro-cursos' && ['plancreator-pro', 'plancreator-max'].includes(userPlan)) return true;
  if (moduleId === 'plancreatorpro-email' && ['plancreator-pro', 'plancreator-max'].includes(userPlan)) return true;
  if (moduleId === 'plancreatorpro-membresias' && ['plancreator-pro', 'plancreator-max'].includes(userPlan)) return true;

  // Plan Creator Max exclusive
  if (moduleId === 'plancreatormax-app' && userPlan === 'plancreator-max') return true;
  if (moduleId === 'plancreatormax-engagement' && userPlan === 'plancreator-max') return true;
  if (moduleId === 'plancreatormax-afiliados' && userPlan === 'plancreator-max') return true;
  if (moduleId === 'plancreatormax-tests' && userPlan === 'plancreator-max') return true;
  if (moduleId === 'plancreatormax-tienda' && userPlan === 'plancreator-max') return true;

  // Plan Studio family
  if (moduleId === 'planstudiopro-checkin' && ['planstudio-pro', 'planstudio-max'].includes(userPlan)) return true;
  if (moduleId === 'planstudiopro-clases' && ['planstudio-pro', 'planstudio-max'].includes(userPlan)) return true;
  if (moduleId === 'planstudiopro-pases' && ['planstudio-pro', 'planstudio-max'].includes(userPlan)) return true;
  if (moduleId === 'planstudiopro-pos' && ['planstudio-pro', 'planstudio-max'].includes(userPlan)) return true;
  if (moduleId === 'planstudiopro-whiteboard' && ['planstudio-pro', 'planstudio-max'].includes(userPlan)) return true;

  // Plan Studio Max exclusive
  if (moduleId === 'planstudiomax-accesos' && userPlan === 'planstudio-max') return true;
  if (moduleId === 'planstudiomax-empresas' && userPlan === 'planstudio-max') return true;
  if (moduleId === 'planstudiomax-inventario' && userPlan === 'planstudio-max') return true;
  if (moduleId === 'planstudiomax-kiosko' && userPlan === 'planstudio-max') return true;
  if (moduleId === 'planstudiomax-multisedes' && userPlan === 'planstudio-max') return true;

  // Plan Teams family
  if (moduleId === 'planteamspro-convocatorias' && ['planteams-pro', 'planteams-elite'].includes(userPlan)) return true;
  if (moduleId === 'planteamspro-wellness' && ['planteams-pro', 'planteams-elite'].includes(userPlan)) return true;
  if (moduleId === 'planteamspro-laboratorio' && ['planteams-pro', 'planteams-elite'].includes(userPlan)) return true;
  if (moduleId === 'planteamspro-atletas' && ['planteams-pro', 'planteams-elite'].includes(userPlan)) return true;
  if (moduleId === 'planteamspro-mesociclos' && ['planteams-pro', 'planteams-elite'].includes(userPlan)) return true;
  if (moduleId === 'planteamspro-roles' && ['planteams-pro', 'planteams-elite'].includes(userPlan)) return true;

  // Plan Teams Elite exclusive
  if (moduleId === 'planteamselite-analiticas' && userPlan === 'planteams-elite') return true;
  if (moduleId === 'planteamselite-comparador' && userPlan === 'planteams-elite') return true;
  if (moduleId === 'planteamselite-eventos' && userPlan === 'planteams-elite') return true;
  if (moduleId === 'planteamselite-scouting' && userPlan === 'planteams-elite') return true;
  if (moduleId === 'planteamselite-sensores' && userPlan === 'planteams-elite') return true;

  return false;
};

const menuModules = [
  {
    id: 'core',
    label: 'Sistema Central',
    icon: Settings,
    items: [
      { id: 'inicio', label: 'Inicio', icon: Home },
      { id: 'panel-control', label: 'Panel de Control', icon: BarChart3 },
      { id: 'asistente-onboarding', label: 'Asistente Inicial', icon: Settings },
      { id: 'centro-ayuda', label: 'Centro de Ayuda', icon: HelpCircle },
      { id: 'importador-datos', label: 'Importar Datos', icon: Download },
      { id: 'integraciones-esenciales', label: 'Integraciones', icon: Zap },
    ]
  },
  {
    id: 'crm',
    label: 'CRM & Clientes',
    icon: Users,
    items: [
      { id: 'clientes-listado', label: 'Clientes', icon: Users },
      { id: 'cliente-detalle', label: 'Detalle Cliente', icon: UserCheck },
      { id: 'leads-listado', label: 'Leads', icon: TrendingUp },
      { id: 'lead-detalle', label: 'Detalle Lead', icon: UserCheck },
      { id: 'bandeja-entrada', label: 'Bandeja de Entrada', icon: Inbox },
      { id: 'notas', label: 'Notas', icon: FileText },
      { id: 'segmentos', label: 'Segmentos', icon: Target },
      { id: 'tareas', label: 'Tareas', icon: CheckSquare },
    ]
  },
  {
    id: 'training',
    label: 'Entrenamiento',
    icon: Dumbbell,
    items: [
      { id: 'biblioteca-ejercicios', label: 'Biblioteca Ejercicios', icon: Library },
      { id: 'editor-ejercicio', label: 'Editor Ejercicio', icon: Edit3 },
      { id: 'plantillas-entrenos', label: 'Plantillas Entrenos', icon: File },
      { id: 'entrenamientos-listado', label: 'Entrenamientos', icon: List },
      { id: 'nuevo-entrenamiento', label: 'Nuevo Entrenamiento', icon: Plus },
      { id: 'calculadoras-fuerza', label: 'Calculadoras Fuerza', icon: Calculator },
    ]
  },
  {
    id: 'nutrition',
    label: 'Nutrición',
    icon: Apple,
    items: [
      { id: 'plantillas-dietas', label: 'Plantillas Dietas', icon: File },
      { id: 'dietas-listado', label: 'Dietas', icon: Apple },
      { id: 'dieta-nueva', label: 'Nueva Dieta', icon: Plus },
      { id: 'dieta-editar', label: 'Editar Dieta', icon: Edit3 },
      { id: 'recetas-biblioteca', label: 'Biblioteca Recetas', icon: BookOpen },
      { id: 'receta-nueva', label: 'Nueva Receta', icon: ChefHat },
      { id: 'receta-editar', label: 'Editar Receta', icon: Utensils },
      { id: 'calculadoras-nutricionales', label: 'Calculadoras Nutrición', icon: PieChart },
      { id: 'adherencia-nutricional', label: 'Adherencia Nutricional', icon: Heart },
      { id: 'derivaciones-nutricion', label: 'Derivaciones Nutrición', icon: Share },
    ]
  },
  {
    id: 'finance',
    label: 'Finanzas',
    icon: DollarSign,
    items: [
      { id: 'panel-financiero', label: 'Panel Financiero', icon: BarChart3 },
      { id: 'cobros-facturacion', label: 'Cobros y Facturación', icon: CreditCard },
      { id: 'conciliacion-pagos', label: 'Conciliación Pagos', icon: RefreshCw },
      { id: 'gastos', label: 'Gastos', icon: Receipt },
      { id: 'impuestos', label: 'Impuestos', icon: Banknote },
      { id: 'exportar-contabilidad', label: 'Exportar Contabilidad', icon: FileDown },
      { id: 'productos-servicios', label: 'Productos y Servicios', icon: Package },
      { id: 'planes-precios', label: 'Planes y Precios', icon: Tag },
      { id: 'cupones', label: 'Cupones', icon: Percent },
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing & Ventas',
    icon: Megaphone,
    items: [
      { id: 'campanas', label: 'Campañas', icon: Megaphone },
      { id: 'fuentes-lead', label: 'Fuentes Lead', icon: TrendingUp },
      { id: 'referidos', label: 'Referidos', icon: UserPlus },
      { id: 'encuestas-nps', label: 'Encuestas NPS', icon: BarChart3 },
      { id: 'opiniones-resenas', label: 'Opiniones y Reseñas', icon: Star },
      { id: 'plantillas-comunicacion', label: 'Plantillas Comunicación', icon: MessageSquare },
      { id: 'widget-captacion', label: 'Widget Captación', icon: Monitor },
    ]
  },
  {
    id: 'agents',
    label: 'Agentes IA',
    icon: Activity,
    items: [
      { id: 'agente-entrenador', label: 'Agente Entrenador', icon: Activity },
      { id: 'agente-financiero', label: 'Agente Financiero', icon: DollarSign },
      { id: 'agente-marketing', label: 'Agente Marketing', icon: Megaphone },
    ]
  },
  {
    id: 'plansolopro-micrositio',
    label: 'Micrositio Reservas',
    icon: Globe,
    items: [
      { id: 'landing-servicios', label: 'Landing Servicios', icon: Globe },
      { id: 'calendario-publico', label: 'Calendario Público', icon: Calendar },
      { id: 'pagina-reserva', label: 'Página Reserva', icon: ShoppingCart },
      { id: 'testimonios-clientes', label: 'Testimonios', icon: ThumbsUp },
      { id: 'blog-noticias', label: 'Blog Noticias', icon: FileText },
    ]
  },
  {
    id: 'plansolopro-habitos',
    label: 'Hábitos Avanzados',
    icon: CheckCircle,
    items: [
      { id: 'listado-habitos', label: 'Listado Hábitos', icon: List },
      { id: 'crear-habito', label: 'Crear Hábito', icon: Plus },
      { id: 'estadisticas-habitos', label: 'Estadísticas', icon: BarChart },
      { id: 'retos-habitos', label: 'Retos Hábitos', icon: Trophy },
    ]
  },
  {
    id: 'plansolopro-telesessions',
    label: 'Tele-Sesiones',
    icon: Video,
    items: [
      { id: 'videollamada-sala', label: 'Sala Videollamada', icon: Video },
      { id: 'grabaciones-sesiones', label: 'Grabaciones', icon: Clock },
      { id: 'chat-sesion', label: 'Chat Sesión', icon: MessageCircle },
      { id: 'notas-sesion', label: 'Notas Sesión', icon: FileEdit },
    ]
  },
  {
    id: 'plansolopro-cupones',
    label: 'Cupones Avanzados',
    icon: Tag,
    items: [
      { id: 'listado-cupones', label: 'Listado Cupones', icon: Tag },
      { id: 'crear-cupon', label: 'Crear Cupón', icon: Plus },
      { id: 'reportes-uso', label: 'Reportes Uso', icon: BarChart },
    ]
  },
  {
    id: 'plansolopro-journey',
    label: 'Recorrido Cliente',
    icon: Map,
    items: [
      { id: 'customer-journey', label: 'Customer Journey', icon: Map },
      { id: 'hitos-clientes', label: 'Hitos Clientes', icon: Milestone },
      { id: 'alertas-retencion', label: 'Alertas Retención', icon: AlertTriangle },
    ]
  },
  {
    id: 'plansolomax-analytics',
    label: 'Analytics Avanzadas',
    icon: BarChart3,
    items: [
      { id: 'analitica-ingresos', label: 'Analítica Ingresos', icon: TrendingUp },
      { id: 'cohortes-clientes', label: 'Cohortes Clientes', icon: Users },
      { id: 'ltv-clientes', label: 'LTV Clientes', icon: DollarSign },
      { id: 'retencion-clientes-analytics', label: 'Retención Clientes', icon: Heart },
    ]
  },
  {
    id: 'plansolomax-automatizaciones',
    label: 'Automatizaciones',
    icon: Bot,
    items: [
      { id: 'crear-flujo', label: 'Crear Flujo', icon: Plus },
      { id: 'constructor-visual', label: 'Constructor Visual', icon: Workflow },
      { id: 'historial-flujos', label: 'Historial Flujos', icon: Clock },
      { id: 'libreria-plantillas', label: 'Librería Plantillas', icon: Library },
      { id: 'listado-automatizaciones', label: 'Listado Automatizaciones', icon: List },
    ]
  },
  {
    id: 'plansolomax-branding',
    label: 'Branding',
    icon: Palette,
    items: [
      { id: 'personalizacion-app-cliente', label: 'App Cliente', icon: Smartphone },
      { id: 'personalizacion-dominio', label: 'Dominio', icon: Globe },
      { id: 'personalizacion-estilos', label: 'Estilos', icon: Palette },
    ]
  },
  {
    id: 'plansolomax-upsells',
    label: 'Upsells',
    icon: Gift,
    items: [
      { id: 'configuracion-upsells', label: 'Configuración Upsells', icon: Settings },
      { id: 'conversion-report', label: 'Reporte Conversión', icon: BarChart3 },
      { id: 'sugerencias-productos', label: 'Sugerencias Productos', icon: Package },
    ]
  },
  {
    id: 'plansolomax-wearables',
    label: 'Wearables',
    icon: Wifi,
    items: [
      { id: 'dispositivos-conectados', label: 'Dispositivos Conectados', icon: Smartphone },
      { id: 'panel-datos-wearables', label: 'Panel Datos', icon: Monitor },
      { id: 'reportes-rendimiento', label: 'Reportes Rendimiento', icon: TrendingUp },
    ]
  },
  {
    id: 'plancreatorpro-biblioteca',
    label: 'Biblioteca Contenidos',
    icon: Library,
    items: [
      { id: 'buscador-contenidos', label: 'Buscador Contenidos', icon: Search },
      { id: 'contenidos-video', label: 'Contenidos Video', icon: FileVideo },
      { id: 'contenidos-articulos', label: 'Contenidos Artículos', icon: FileText },
      { id: 'contenidos-descargables', label: 'Contenidos Descargables', icon: DownloadIcon },
    ]
  },
  {
    id: 'plancreatorpro-comunidad',
    label: 'Comunidad',
    icon: Users,
    items: [
      { id: 'feed-comunidad', label: 'Feed Comunidad', icon: MessagesSquare },
      { id: 'grupos-comunidad', label: 'Grupos Comunidad', icon: Users },
      { id: 'moderacion-comunidad', label: 'Moderación', icon: Shield },
      { id: 'ranking-actividad', label: 'Ranking Actividad', icon: Award },
    ]
  },
  {
    id: 'plancreatorpro-cursos',
    label: 'Cursos Online',
    icon: BookOpen,
    items: [
      { id: 'listado-cursos', label: 'Listado Cursos', icon: List },
      { id: 'crear-curso', label: 'Crear Curso', icon: Plus },
      { id: 'curso-detalle', label: 'Detalle Curso', icon: BookOpen },
      { id: 'gestion-lecciones', label: 'Gestión Lecciones', icon: FileEdit },
      { id: 'quizzes-evaluaciones', label: 'Quizzes y Evaluaciones', icon: CheckSquare },
    ]
  },
  {
    id: 'plancreatorpro-email',
    label: 'Email Broadcast',
    icon: Mail,
    items: [
      { id: 'listado-emails', label: 'Listado Emails', icon: List },
      { id: 'crear-email', label: 'Crear Email', icon: Plus },
      { id: 'plantillas-email', label: 'Plantillas Email', icon: File },
      { id: 'reportes-envio', label: 'Reportes Envío', icon: BarChart2 },
    ]
  },
  {
    id: 'plancreatorpro-membresias',
    label: 'Membresías',
    icon: CardIcon,
    items: [
      { id: 'listado-membresias', label: 'Listado Membresías', icon: List },
      { id: 'pagina-membresia', label: 'Página Membresía', icon: Globe },
      { id: 'beneficios-membresia', label: 'Beneficios', icon: Gift },
      { id: 'pagos-membresia', label: 'Pagos Membresía', icon: DollarSign },
    ]
  },
  {
    id: 'plancreatormax-app',
    label: 'App White Label',
    icon: Smartphone,
    items: [
      { id: 'configuracion-app', label: 'Configuración App', icon: Settings },
      { id: 'vista-preview-app', label: 'Vista Preview', icon: Monitor },
      { id: 'personalizacion-push', label: 'Notificaciones Push', icon: Bell },
    ]
  },
  {
    id: 'plancreatormax-engagement',
    label: 'Automatizaciones Engagement',
    icon: Bot,
    items: [
      { id: 'flujos-retencion', label: 'Flujos Retención', icon: Workflow },
      { id: 'mensajes-personalizados', label: 'Mensajes Personalizados', icon: MessageSquare },
      { id: 'reactivacion-clientes', label: 'Reactivación Clientes', icon: TrendingUp },
    ]
  },
  {
    id: 'plancreatormax-afiliados',
    label: 'Sistema Afiliados',
    icon: UserPlus,
    items: [
      { id: 'listado-afiliados', label: 'Listado Afiliados', icon: List },
      { id: 'panel-comisiones', label: 'Panel Comisiones', icon: DollarSign },
      { id: 'pagos-afiliados', label: 'Pagos Afiliados', icon: CreditCard },
      { id: 'recursos-afiliados', label: 'Recursos Afiliados', icon: Package },
    ]
  },
  {
    id: 'plancreatormax-tests',
    label: 'Tests A/B',
    icon: FlaskConical,
    items: [
      { id: 'experimentos-ab', label: '🧪 Experimentos A/B', icon: FlaskConical },
      { id: 'experimentos', label: 'Experimentos', icon: FlaskConical },
      { id: 'resultados-test', label: 'Resultados Test', icon: BarChart3 },
      { id: 'historial-experimentos', label: 'Historial Experimentos', icon: History },
    ]
  },
  {
    id: 'plancreatormax-tienda',
    label: 'Tienda Merchandising',
    icon: Store,
    items: [
      { id: 'catalogo-productos', label: 'Catálogo Productos', icon: Box },
      { id: 'configuracion-tienda', label: 'Configuración Tienda', icon: Settings },
      { id: 'pedidos-clientes', label: 'Pedidos Clientes', icon: ShoppingCart },
      { id: 'informes-ventas', label: 'Informes Ventas', icon: BarChart3 },
    ]
  },
  {
    id: 'planstudiopro-checkin',
    label: 'Check-In QR',
    icon: QrCode,
    items: [
      { id: 'escaner-entrada', label: 'Escáner Entrada', icon: QrCode },
      { id: 'pases-virtuales', label: 'Pases Virtuales', icon: Ticket },
      { id: 'historial-asistencias', label: 'Historial Asistencias', icon: ClipboardList },
    ]
  },
  {
    id: 'planstudiopro-clases',
    label: 'Gestión Clases',
    icon: Calendar,
    items: [
      { id: 'calendario-clases', label: 'Calendario Clases', icon: Calendar },
      { id: 'reservas-clase', label: 'Reservas Clase', icon: CalendarCheck },
      { id: 'gestion-coach', label: 'Gestión Coach', icon: Users },
      { id: 'reportes-asistencia', label: 'Reportes Asistencia', icon: BarChart3 },
    ]
  },
  {
    id: 'planstudiopro-pases',
    label: 'Pases y Contratos',
    icon: FileText,
    items: [
      { id: 'listado-pases', label: 'Listado Pases', icon: List },
      { id: 'crear-contrato', label: 'Crear Contrato', icon: Plus },
      { id: 'renovaciones', label: 'Renovaciones', icon: RotateCcw },
    ]
  },
  {
    id: 'planstudiopro-pos',
    label: 'POS Ligero',
    icon: ReceiptIcon,
    items: [
      { id: 'ventas-rapidas', label: 'Ventas Rápidas', icon: Zap },
      { id: 'tickets-diarios', label: 'Tickets Diarios', icon: Ticket },
      { id: 'caja-diaria', label: 'Caja Diaria', icon: DollarSign },
    ]
  },
  {
    id: 'planstudiopro-whiteboard',
    label: 'Whiteboard',
    icon: Monitor,
    items: [
      { id: 'wod-dia', label: 'WOD del Día', icon: Dumbbell },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
      { id: 'historial-marcas', label: 'Historial Marcas', icon: History },
    ]
  },
  {
    id: 'planstudiomax-accesos',
    label: 'Control Accesos',
    icon: Lock,
    items: [
      { id: 'gestion-tornos', label: 'Gestión Tornos', icon: Lock },
      { id: 'tarjetas-socios', label: 'Tarjetas Socios', icon: CreditCard },
      { id: 'reportes-accesos', label: 'Reportes Accesos', icon: BarChart3 },
    ]
  },
  {
    id: 'planstudiomax-empresas',
    label: 'CRM Empresas',
    icon: Building2,
    items: [
      { id: 'convenios-corporativos', label: 'Convenios Corporativos', icon: FileText },
      { id: 'empleados-socios', label: 'Empleados Socios', icon: Users },
      { id: 'facturacion-empresas', label: 'Facturación Empresas', icon: Receipt },
    ]
  },
  {
    id: 'planstudiomax-inventario',
    label: 'Inventario Avanzado',
    icon: PackageSearch,
    items: [
      { id: 'catalogo-stock', label: 'Catálogo Stock', icon: Package },
      { id: 'control-pedidos', label: 'Control Pedidos', icon: ClipboardList },
      { id: 'alertas-inventario', label: 'Alertas Inventario', icon: Bell },
    ]
  },
  {
    id: 'planstudiomax-kiosko',
    label: 'Kiosko',
    icon: MonitorSmartphone,
    items: [
      { id: 'interfaz-cliente', label: 'Interfaz Cliente', icon: Monitor },
      { id: 'historial-kiosko', label: 'Historial Kiosko', icon: History },
    ]
  },
  {
    id: 'planstudiomax-multisedes',
    label: 'Multi-Sedes',
    icon: Building,
    items: [
      { id: 'listado-sedes', label: 'Listado Sedes', icon: List },
      { id: 'comparativa-sedes', label: 'Comparativa Sedes', icon: BarChart3 },
      { id: 'transferencias-clientes', label: 'Transferencias Clientes', icon: TrendingUp },
    ]
  },
  {
    id: 'planteamspro-convocatorias',
    label: 'Convocatorias',
    icon: ClipboardCheck,
    items: [
      { id: 'lista-convocatorias', label: 'Lista Convocatorias', icon: List },
      { id: 'gestion-plantillas-convocatoria', label: 'Plantillas', icon: File },
      { id: 'asistencia-eventos', label: 'Asistencia Eventos', icon: CalendarCheck },
    ]
  },
  {
    id: 'planteamspro-wellness',
    label: 'Cuestionarios Wellness',
    icon: Stethoscope,
    items: [
      { id: 'cuestionario-diario', label: 'Cuestionario Diario', icon: ClipboardCheck },
      { id: 'informes-semanales', label: 'Informes Semanales', icon: BarChart3 },
      { id: 'alertas-fatiga', label: 'Alertas Fatiga', icon: AlertTriangle },
    ]
  },
  {
    id: 'planteamspro-laboratorio',
    label: 'Laboratorio Tests',
    icon: FlaskConical,
    items: [
      { id: 'pruebas-fisicas', label: 'Pruebas Físicas', icon: Activity },
      { id: 'resultados-historicos', label: 'Resultados Históricos', icon: History },
      { id: 'comparador-resultados', label: 'Comparador Resultados', icon: GitCompare },
    ]
  },
  {
    id: 'planteamspro-atletas',
    label: 'Perfiles Atletas',
    icon: UserSquare2,
    items: [
      { id: 'ficha-atleta', label: 'Ficha Atleta', icon: UserCircle },
      { id: 'historial-rendimiento', label: 'Historial Rendimiento', icon: TrendingUp },
      { id: 'comparador-atletas', label: 'Comparador Atletas', icon: GitCompare },
    ]
  },
  {
    id: 'planteamspro-mesociclos',
    label: 'Planificación Mesociclos',
    icon: CalendarRange,
    items: [
      { id: 'calendario-periodizacion', label: 'Calendario Periodización', icon: Calendar },
      { id: 'plantillas-mesociclos', label: 'Plantillas Mesociclos', icon: File },
      { id: 'editar-mesociclo', label: 'Editar Mesociclo', icon: Edit3 },
    ]
  },
  {
    id: 'planteamspro-roles',
    label: 'Roles Equipo',
    icon: ShieldCheck,
    items: [
      { id: 'listado-roles', label: 'Listado Roles', icon: List },
      { id: 'asignacion-roles', label: 'Asignación Roles', icon: UserCheck },
      { id: 'permisos-entrenadores', label: 'Permisos Entrenadores', icon: Shield },
    ]
  },
  {
    id: 'planteamselite-analiticas',
    label: 'Analíticas Avanzadas',
    icon: LineChart,
    items: [
      { id: 'dashboards-equipos', label: 'Dashboards Equipos', icon: Monitor },
      { id: 'reportes-rendimiento-elite', label: 'Reportes Rendimiento', icon: BarChart3 },
      { id: 'comparativas-longitudinales', label: 'Comparativas Longitudinales', icon: TrendingUp },
    ]
  },
  {
    id: 'planteamselite-comparador',
    label: 'Comparador Equipos',
    icon: Swords,
    items: [
      { id: 'equipo-a-vs-b', label: 'Equipo A vs B', icon: GitCompare },
      { id: 'analisis-posicion', label: 'Análisis Posición', icon: Target },
      { id: 'proyeccion-partido', label: 'Proyección Partido', icon: TrendingUp },
    ]
  },
  {
    id: 'planteamselite-eventos',
    label: 'Eventos',
    icon: Flag,
    items: [
      { id: 'torneos', label: 'Torneos', icon: Trophy },
      { id: 'campeonatos', label: 'Campeonatos', icon: Award },
      { id: 'resultados-eventos', label: 'Resultados Eventos', icon: BarChart },
    ]
  },
  {
    id: 'planteamselite-scouting',
    label: 'Scouting',
    icon: UserSearch,
    items: [
      { id: 'listado-jugadores', label: 'Listado Jugadores', icon: Users },
      { id: 'evaluacion-jugador', label: 'Evaluación Jugador', icon: ClipboardCheck },
      { id: 'historial-scouting', label: 'Historial Scouting', icon: History },
    ]
  },
  {
    id: 'planteamselite-sensores',
    label: 'Sensores',
    icon: Radar,
    items: [
      { id: 'dispositivos-conectados-elite', label: 'Dispositivos Conectados', icon: Wifi },
      { id: 'datos-tiempo-real', label: 'Datos Tiempo Real', icon: Activity },
      { id: 'informes-sensores', label: 'Informes Sensores', icon: FileText },
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onPageChange,
  collapsed,
  onToggleCollapse,
}) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(['core']); // Core expandido por defecto
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load current user from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);

  // Filter modules based on user plan
  const visibleModules = menuModules.filter(module =>
    hasModuleAccess(module.id, currentUser?.plan || null)
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Encontrar el módulo activo basado en la página actual
  const activeModule = visibleModules.find(module =>
    module.items.some(item => item.id === activePage)
  );

  // Auto-expandir el módulo activo
  useEffect(() => {
    if (activeModule && !expandedModules.includes(activeModule.id)) {
      setExpandedModules(prev => [...prev, activeModule.id]);
    }
  }, [activePage, activeModule, expandedModules]);

  return (
    <>
      {/* Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggleCollapse}
        />
      )}

      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-500 ease-in-out z-30 border-r border-slate-700
        ${collapsed ? '-translate-x-full' : 'translate-x-0 w-80'}`}>

        {/* Header */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative flex items-center justify-between p-5 border-b border-white/10">
            <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center w-full' : ''}`}>
              <div className="relative">
                <div className="bg-gradient-to-br from-white to-blue-50 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                  <Dumbbell className="h-6 w-6 text-blue-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              {!collapsed && (
                <div className="space-y-1">
                  <h1 className="text-xl font-bold text-white tracking-tight">TrainerPro</h1>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-blue-100 font-medium">ERP Entrenadores • Online</p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-white/10 rounded-lg text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 h-full overflow-y-auto pb-20 px-3">
          {visibleModules.map((module) => {
            const ModuleIcon = module.icon;
            const isExpanded = expandedModules.includes(module.id);
            const hasActiveItem = module.items.some(item => item.id === activePage);

            return (
              <div key={module.id} className="mb-3">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-xl transition-all duration-300 group backdrop-blur-sm ${
                    hasActiveItem
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/10'
                      : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      hasActiveItem
                        ? 'bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg'
                        : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                      <ModuleIcon className={`h-4 w-4 ${
                        hasActiveItem ? 'text-white' : 'text-gray-300'
                      } group-hover:text-white transition-colors duration-300`} />
                    </div>
                    {!collapsed && (
                      <div className="flex-1">
                        <span className={`font-semibold text-sm tracking-wide ${
                          hasActiveItem ? 'text-blue-300' : 'text-gray-300'
                        } group-hover:text-white transition-colors duration-300`}>
                          {module.label}
                        </span>
                        <div className={`h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 ${
                          hasActiveItem ? 'w-full mt-1' : 'w-0 group-hover:w-1/2'
                        }`}></div>
                      </div>
                    )}
                  </div>
                  {!collapsed && (
                    <div className={`transition-all duration-300 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}>
                      <ChevronRight className={`h-4 w-4 ${
                        hasActiveItem ? 'text-blue-300' : 'text-gray-400'
                      } group-hover:text-white transition-colors duration-300`} />
                    </div>
                  )}
                </button>

                {/* Module Items */}
                {(!collapsed && isExpanded) && (
                  <div className="mt-2 ml-4 space-y-1">
                    <div className="border-l-2 border-gradient-to-b from-blue-400/30 to-purple-500/30 pl-4">
                      {module.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        const isActive = activePage === item.id;

                        return (
                          <div key={item.id} className="relative">
                            <button
                              onClick={() => onPageChange(item.id)}
                              className={`w-full flex items-center px-4 py-2.5 text-left rounded-lg transition-all duration-300 group ${
                                isActive
                                  ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/40 shadow-lg backdrop-blur-sm transform scale-[1.02]'
                                  : 'hover:bg-white/5 border border-transparent hover:border-white/10 hover:transform hover:scale-[1.01]'
                              }`}
                            >
                              <div className={`flex items-center space-x-3 w-full`}>
                                <div className={`p-1.5 rounded-md transition-all duration-300 ${
                                  isActive
                                    ? 'bg-gradient-to-br from-blue-400 to-purple-500 shadow-md'
                                    : 'bg-white/5 group-hover:bg-white/10'
                                }`}>
                                  <ItemIcon className={`h-3.5 w-3.5 ${
                                    isActive ? 'text-white' : 'text-gray-400'
                                  } group-hover:text-white transition-colors duration-300`} />
                                </div>
                                <span className={`text-sm font-medium flex-1 ${
                                  isActive ? 'text-blue-200' : 'text-gray-300'
                                } group-hover:text-white transition-colors duration-300`}>
                                  {item.label}
                                </span>
                                {isActive && (
                                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                                )}
                              </div>
                            </button>

                            {/* Connection Line */}
                            {index < module.items.length - 1 && (
                              <div className="absolute left-2 top-full w-0.5 h-2 bg-gradient-to-b from-white/20 to-transparent"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Collapsed state - show tooltip on hover */}
                {collapsed && (
                  <div className="relative group">
                    <div className="absolute left-16 top-1/2 -translate-y-1/2 invisible group-hover:visible bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-50 shadow-xl border border-gray-700 backdrop-blur-sm">
                      <div className="font-medium">{module.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{module.items.length} elementos</div>
                      {/* Arrow */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-gray-700"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};