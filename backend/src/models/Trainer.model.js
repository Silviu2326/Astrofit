import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email inválido'
    ]
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6,
    select: false
  },
  plan: {
    type: String,
    enum: [
      'core',
      'plansolo-pro',
      'plansolo-max',
      'plancreator-pro',
      'plancreator-max',
      'planstudio-pro',
      'planstudio-max',
      'planteams-pro',
      'planteams-elite'
    ],
    required: [true, 'El plan es requerido'],
    default: 'core'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'trial', 'cancelled'],
    default: 'trial'
  },
  subscriptionStartDate: {
    type: Date,
    default: Date.now
  },
  subscriptionEndDate: {
    type: Date
  },
  avatar: {
    type: String,
    default: null
  },
  telefono: {
    type: String,
    trim: true
  },
  especialidad: {
    type: String,
    trim: true
  },
  certificaciones: [String],
  biografia: {
    type: String,
    maxlength: 500
  },
  redesSociales: {
    instagram: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    youtube: String
  },
  configuracion: {
    idioma: { type: String, default: 'es' },
    timezone: { type: String, default: 'Europe/Madrid' },
    notificaciones: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Encrypt password before save
trainerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
trainerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Get plan features (based on mockUsers.ts logic)
trainerSchema.methods.getFeatures = function() {
  const planFeatures = {
    'core': [
      'inicio', 'panel-control', 'asistente-onboarding', 'centro-ayuda',
      'importador-datos', 'integraciones-esenciales', 'clientes-listado',
      'cliente-detalle', 'leads-listado', 'bandeja-entrada',
      'biblioteca-ejercicios', 'plantillas-entrenos', 'entrenamientos-listado',
      'plantillas-dietas', 'dietas-listado', 'panel-financiero',
      'cobros-facturacion', 'productos-servicios', 'campanas', 'fuentes-lead',
      'tareas-listado', 'crear-tarea', 'editar-tarea', 'eliminar-tarea'
    ],
    'plansolo-pro': [
      'landing-servicios', 'calendario-publico', 'pagina-reserva',
      'testimonios-clientes', 'blog-noticias', 'listado-habitos',
      'crear-habito', 'estadisticas-habitos', 'retos-habitos',
      'videollamada-sala', 'grabaciones-sesiones', 'chat-sesion',
      'notas-sesion', 'listado-cupones', 'crear-cupon', 'reportes-uso',
      'customer-journey', 'hitos-clientes', 'alertas-retencion'
    ],
    'plansolo-max': [
      'analitica-ingresos', 'cohortes-clientes', 'ltv-clientes',
      'retencion-clientes-analytics', 'crear-flujo', 'constructor-visual',
      'historial-flujos', 'libreria-plantillas', 'listado-automatizaciones',
      'personalizacion-app-cliente', 'personalizacion-dominio',
      'personalizacion-estilos', 'configuracion-upsells', 'conversion-report',
      'sugerencias-productos', 'dispositivos-conectados',
      'panel-datos-wearables', 'reportes-rendimiento'
    ],
    'plancreator-pro': [
      'buscador-contenidos', 'contenidos-video', 'contenidos-articulos',
      'contenidos-descargables', 'feed-comunidad', 'grupos-comunidad',
      'moderacion-comunidad', 'ranking-actividad', 'listado-cursos',
      'crear-curso', 'curso-detalle', 'gestion-lecciones',
      'quizzes-evaluaciones', 'listado-emails', 'crear-email',
      'plantillas-email', 'reportes-envio', 'listado-membresias',
      'pagina-membresia', 'beneficios-membresia', 'pagos-membresia'
    ],
    'plancreator-max': [
      'configuracion-app', 'vista-preview-app', 'personalizacion-push',
      'flujos-retencion', 'mensajes-personalizados', 'reactivacion-clientes',
      'listado-afiliados', 'panel-comisiones', 'pagos-afiliados',
      'recursos-afiliados', 'experimentos', 'resultados-test',
      'historial-experimentos', 'catalogo-productos', 'configuracion-tienda',
      'pedidos-clientes', 'informes-ventas'
    ],
    'planstudio-pro': [
      'escaner-entrada', 'pases-virtuales', 'historial-asistencias',
      'calendario-clases', 'reservas-clase', 'gestion-coach',
      'reportes-asistencia', 'listado-pases', 'crear-contrato',
      'renovaciones', 'ventas-rapidas', 'tickets-diarios', 'caja-diaria',
      'wod-dia', 'leaderboard', 'historial-marcas'
    ],
    'planstudio-max': [
      'gestion-tornos', 'tarjetas-socios', 'reportes-accesos',
      'convenios-corporativos', 'empleados-socios', 'facturacion-empresas',
      'catalogo-stock', 'control-pedidos', 'alertas-inventario',
      'interfaz-cliente', 'historial-kiosko', 'listado-sedes',
      'comparativa-sedes', 'transferencias-clientes'
    ],
    'planteams-pro': [
      'lista-convocatorias', 'gestion-plantillas-convocatoria',
      'asistencia-eventos', 'cuestionario-diario', 'informes-semanales',
      'alertas-fatiga', 'pruebas-fisicas', 'resultados-historicos',
      'comparador-resultados', 'ficha-atleta', 'historial-rendimiento',
      'comparador-atletas', 'calendario-periodizacion',
      'plantillas-mesociclos', 'editar-mesociclo', 'listado-roles',
      'asignacion-roles', 'permisos-entrenadores'
    ],
    'planteams-elite': [
      'dashboards-equipos', 'reportes-rendimiento-elite',
      'comparativas-longitudinales', 'equipo-a-vs-b', 'analisis-posicion',
      'proyeccion-partido', 'torneos', 'campeonatos', 'resultados-eventos',
      'listado-jugadores', 'evaluacion-jugador', 'historial-scouting',
      'dispositivos-conectados-elite', 'datos-tiempo-real', 'informes-sensores'
    ]
  };

  // Always include core features + plan specific features
  const coreFeatures = planFeatures['core'] || [];
  const specificFeatures = planFeatures[this.plan] || [];

  return [...new Set([...coreFeatures, ...specificFeatures])];
};

// Check if trainer has access to a feature
trainerSchema.methods.hasFeatureAccess = function(featureId) {
  const features = this.getFeatures();
  return features.includes(featureId);
};

export default mongoose.model('Trainer', trainerSchema);
