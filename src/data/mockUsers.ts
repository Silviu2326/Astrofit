// Mock users - One user per plan tier

export interface User {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  name: string;
  plan: PlanType;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  createdAt: string;
  features: string[];
}

export type PlanType =
  | 'core'
  | 'plansolo-pro'
  | 'plansolo-max'
  | 'plancreator-pro'
  | 'plancreator-max'
  | 'planstudio-pro'
  | 'planstudio-max'
  | 'planteams-pro'
  | 'planteams-elite';

export const mockUsers: User[] = [
  {
    id: 'user-core-001',
    email: 'core@trainerpro.com',
    password: 'core123',
    name: 'Usuario Core',
    plan: 'core',
    subscriptionStatus: 'active',
    createdAt: '2024-01-15',
    features: [
      'inicio',
      'panel-control',
      'asistente-onboarding',
      'centro-ayuda',
      'importador-datos',
      'integraciones-esenciales',
      'clientes-listado',
      'cliente-detalle',
      'leads-listado',
      'bandeja-entrada',
      'biblioteca-ejercicios',
      'plantillas-entrenos',
      'entrenamientos-listado',
      'plantillas-dietas',
      'dietas-listado',
      'panel-financiero',
      'cobros-facturacion',
      'productos-servicios',
      'campanas',
      'fuentes-lead',
    ]
  },
  {
    id: 'user-solopro-001',
    email: 'solopro@trainerpro.com',
    password: 'solopro123',
    name: 'Usuario Solo Pro',
    plan: 'plansolo-pro',
    subscriptionStatus: 'active',
    createdAt: '2024-02-10',
    features: [
      // Includes all core features plus:
      'landing-servicios',
      'calendario-publico',
      'pagina-reserva',
      'testimonios-clientes',
      'blog-noticias',
      'listado-habitos',
      'crear-habito',
      'estadisticas-habitos',
      'retos-habitos',
      'videollamada-sala',
      'grabaciones-sesiones',
      'chat-sesion',
      'notas-sesion',
      'listado-cupones',
      'crear-cupon',
      'reportes-uso',
      'customer-journey',
      'hitos-clientes',
      'alertas-retencion',
    ]
  },
  {
    id: 'user-solomax-001',
    email: 'solomax@trainerpro.com',
    password: 'solomax123',
    name: 'Usuario Solo Max',
    plan: 'plansolo-max',
    subscriptionStatus: 'active',
    createdAt: '2024-03-05',
    features: [
      // Includes all Solo Pro features plus:
      'analitica-ingresos',
      'cohortes-clientes',
      'ltv-clientes',
      'retencion-clientes-analytics',
      'crear-flujo',
      'constructor-visual',
      'historial-flujos',
      'libreria-plantillas',
      'listado-automatizaciones',
      'personalizacion-app-cliente',
      'personalizacion-dominio',
      'personalizacion-estilos',
      'configuracion-upsells',
      'conversion-report',
      'sugerencias-productos',
      'dispositivos-conectados',
      'panel-datos-wearables',
      'reportes-rendimiento',
    ]
  },
  {
    id: 'user-creatorpro-001',
    email: 'creatorpro@trainerpro.com',
    password: 'creatorpro123',
    name: 'Usuario Creator Pro',
    plan: 'plancreator-pro',
    subscriptionStatus: 'active',
    createdAt: '2024-04-12',
    features: [
      // For content creators and online coaches
      'buscador-contenidos',
      'contenidos-video',
      'contenidos-articulos',
      'contenidos-descargables',
      'feed-comunidad',
      'grupos-comunidad',
      'moderacion-comunidad',
      'ranking-actividad',
      'listado-cursos',
      'crear-curso',
      'curso-detalle',
      'gestion-lecciones',
      'quizzes-evaluaciones',
      'listado-emails',
      'crear-email',
      'plantillas-email',
      'reportes-envio',
      'listado-membresias',
      'pagina-membresia',
      'beneficios-membresia',
      'pagos-membresia',
    ]
  },
  {
    id: 'user-creatormax-001',
    email: 'creatormax@trainerpro.com',
    password: 'creatormax123',
    name: 'Usuario Creator Max',
    plan: 'plancreator-max',
    subscriptionStatus: 'active',
    createdAt: '2024-05-20',
    features: [
      // Includes all Creator Pro features plus:
      'configuracion-app',
      'vista-preview-app',
      'personalizacion-push',
      'flujos-retencion',
      'mensajes-personalizados',
      'reactivacion-clientes',
      'listado-afiliados',
      'panel-comisiones',
      'pagos-afiliados',
      'recursos-afiliados',
      'experimentos',
      'resultados-test',
      'historial-experimentos',
      'catalogo-productos',
      'configuracion-tienda',
      'pedidos-clientes',
      'informes-ventas',
    ]
  },
  {
    id: 'user-studiopro-001',
    email: 'studiopro@trainerpro.com',
    password: 'studiopro123',
    name: 'Usuario Studio Pro',
    plan: 'planstudio-pro',
    subscriptionStatus: 'active',
    createdAt: '2024-06-08',
    features: [
      // For gyms and fitness studios
      'escaner-entrada',
      'pases-virtuales',
      'historial-asistencias',
      'calendario-clases',
      'reservas-clase',
      'gestion-coach',
      'reportes-asistencia',
      'listado-pases',
      'crear-contrato',
      'renovaciones',
      'ventas-rapidas',
      'tickets-diarios',
      'caja-diaria',
      'wod-dia',
      'leaderboard',
      'historial-marcas',
    ]
  },
  {
    id: 'user-studiomax-001',
    email: 'studiomax@trainerpro.com',
    password: 'studiomax123',
    name: 'Usuario Studio Max',
    plan: 'planstudio-max',
    subscriptionStatus: 'active',
    createdAt: '2024-07-15',
    features: [
      // Includes all Studio Pro features plus:
      'gestion-tornos',
      'tarjetas-socios',
      'reportes-accesos',
      'convenios-corporativos',
      'empleados-socios',
      'facturacion-empresas',
      'catalogo-stock',
      'control-pedidos',
      'alertas-inventario',
      'interfaz-cliente',
      'historial-kiosko',
      'listado-sedes',
      'comparativa-sedes',
      'transferencias-clientes',
    ]
  },
  {
    id: 'user-teamspro-001',
    email: 'teamspro@trainerpro.com',
    password: 'teamspro123',
    name: 'Usuario Teams Pro',
    plan: 'planteams-pro',
    subscriptionStatus: 'active',
    createdAt: '2024-08-22',
    features: [
      // For sports teams and clubs
      'lista-convocatorias',
      'gestion-plantillas-convocatoria',
      'asistencia-eventos',
      'cuestionario-diario',
      'informes-semanales',
      'alertas-fatiga',
      'pruebas-fisicas',
      'resultados-historicos',
      'comparador-resultados',
      'ficha-atleta',
      'historial-rendimiento',
      'comparador-atletas',
      'calendario-periodizacion',
      'plantillas-mesociclos',
      'editar-mesociclo',
      'listado-roles',
      'asignacion-roles',
      'permisos-entrenadores',
    ]
  },
  {
    id: 'user-teamselite-001',
    email: 'teamselite@trainerpro.com',
    password: 'teamselite123',
    name: 'Usuario Teams Elite',
    plan: 'planteams-elite',
    subscriptionStatus: 'active',
    createdAt: '2024-09-10',
    features: [
      // Includes all Teams Pro features plus:
      'dashboards-equipos',
      'reportes-rendimiento-elite',
      'comparativas-longitudinales',
      'equipo-a-vs-b',
      'analisis-posicion',
      'proyeccion-partido',
      'torneos',
      'campeonatos',
      'resultados-eventos',
      'listado-jugadores',
      'evaluacion-jugador',
      'historial-scouting',
      'dispositivos-conectados-elite',
      'datos-tiempo-real',
      'informes-sensores',
    ]
  },
];

// Helper function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

// Helper function to validate credentials
export const validateCredentials = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Helper function to check if user has access to a feature
export const hasFeatureAccess = (user: User, featureId: string): boolean => {
  return user.features.includes(featureId);
};

// Get all available plans
export const getAvailablePlans = (): PlanType[] => {
  return [
    'core',
    'plansolo-pro',
    'plansolo-max',
    'plancreator-pro',
    'plancreator-max',
    'planstudio-pro',
    'planstudio-max',
    'planteams-pro',
    'planteams-elite',
  ];
};

export default mockUsers;
