import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart3, Inbox, Menu, Dumbbell, Activity, DollarSign, Megaphone, Settings, HelpCircle, Download, Zap, Users, UserCheck, TrendingUp, FileText, Target, CheckSquare, Library, Edit3, File, List, Plus, Calculator, Apple, ChefHat, Utensils, BookOpen, PieChart, Heart, Share, CreditCard, Receipt, RefreshCw, Banknote, FileDown, Package, Tag, Percent, UserPlus, Star, MessageSquare, Monitor, ChevronDown, ChevronRight, Globe, Calendar, ShoppingCart, ThumbsUp, CheckCircle, BarChart, Trophy, Video, Clock, MessageCircle, FileEdit, Map, Milestone, AlertTriangle, Palette, Smartphone, Wifi, Workflow, Bot, Gift, Search, FileVideo, Download as DownloadIcon, MessagesSquare, UserCircle, Award, Mail, Send, BarChart2, CreditCard as CardIcon, Shield, Bell, History, FlaskConical, Store, Box, QrCode, ClipboardList, CalendarCheck, RotateCcw, Receipt as ReceiptIcon, Ticket, Lock, Building2, PackageSearch, MonitorSmartphone, Building, ClipboardCheck, Stethoscope, GitCompare, UserSquare2, CalendarRange, ShieldCheck, LineChart, Swords, Flag, UserSearch, Radar, Sparkles, X } from 'lucide-react';
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
      {/* Overlay con animación */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
            onClick={onToggleCollapse}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -320 }}
        animate={{ x: collapsed ? -320 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl shadow-2xl z-30 border-r border-white/50"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header */}
        <div className="relative overflow-hidden rounded-br-3xl">
          {/* Background con gradiente vibrante */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            {/* Pattern de puntos */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            {/* Blur orbs animados */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative flex items-center justify-between p-6 border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                {/* Icono con backdrop blur */}
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
                  <Dumbbell className="w-7 h-7 text-white" />
                </div>
                {/* Pulse indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-xl blur-lg opacity-30"></div>
              </div>
              <div className="space-y-0.5">
                <h1 className="text-xl font-bold text-white tracking-tight">TrainerPro</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
                  <p className="text-xs text-white/80 font-medium">ERP Entrenadores</p>
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleCollapse}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative mt-6 h-[calc(100vh-8rem)] overflow-y-auto pb-32 px-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
          {visibleModules.map((module, moduleIndex) => {
            const ModuleIcon = module.icon;
            const isExpanded = expandedModules.includes(module.id);
            const hasActiveItem = module.items.some(item => item.id === activePage);

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: moduleIndex * 0.03, duration: 0.4 }}
                className="mb-2 relative"
              >
                {/* Module Header */}
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleModule(module.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    hasActiveItem
                      ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-400/40 shadow-xl'
                      : 'bg-white/60 hover:bg-white/80 border border-white/50 hover:border-indigo-200 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Shimmer effect en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                  {/* Decoración de fondo */}
                  {hasActiveItem && (
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20"></div>
                  )}

                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`p-2 rounded-xl transition-all duration-300 shadow-lg ${
                      hasActiveItem
                        ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-indigo-100 group-hover:to-purple-100'
                    }`}>
                      <ModuleIcon className={`w-5 h-5 transition-all duration-300 ${
                        hasActiveItem ? 'text-white' : 'text-gray-600 group-hover:text-indigo-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <span className={`font-bold text-sm tracking-wide transition-colors duration-300 ${
                        hasActiveItem
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700'
                          : 'text-gray-700 group-hover:text-indigo-700'
                      }`}>
                        {module.label}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${
                      hasActiveItem ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'
                    }`} />
                  </motion.div>
                </motion.button>

                {/* Module Items con AnimatePresence */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 ml-6 space-y-1 overflow-hidden"
                    >
                      {/* Línea vertical decorativa */}
                      <div className="absolute left-8 top-14 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-transparent rounded-full"></div>

                      {module.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        const isActive = activePage === item.id;

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.3 }}
                            className="relative"
                          >
                            <motion.button
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => onPageChange(item.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-xl transition-all duration-300 group relative overflow-hidden ${
                                isActive
                                  ? 'bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 border border-indigo-400/50 shadow-lg'
                                  : 'bg-white/40 hover:bg-white/70 border border-white/40 hover:border-indigo-200 hover:shadow-md'
                              }`}
                            >
                              {/* Shimmer effect */}
                              {!isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                              )}

                              <div className="flex items-center gap-3 w-full relative z-10">
                                <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                                  isActive
                                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md'
                                    : 'bg-gray-100 group-hover:bg-indigo-100'
                                }`}>
                                  <ItemIcon className={`w-4 h-4 transition-colors duration-300 ${
                                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'
                                  }`} />
                                </div>
                                <span className={`text-sm font-medium flex-1 transition-colors duration-300 ${
                                  isActive ? 'text-indigo-900 font-semibold' : 'text-gray-600 group-hover:text-indigo-700'
                                }`}>
                                  {item.label}
                                </span>
                                {isActive && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse shadow-lg"
                                  />
                                )}
                              </div>
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
};