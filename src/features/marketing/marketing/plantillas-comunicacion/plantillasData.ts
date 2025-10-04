export interface Plantilla {
  id: string;
  nombre: string;
  tipo: 'email' | 'sms' | 'whatsapp' | 'push' | 'social';
  categoria: 'bienvenida' | 'seguimiento' | 'promocion' | 'recordatorio' | 'cumpleanos' | 'recuperacion' | 'newsletter';
  descripcion: string;
  preview: string;
  usos: number;
  tasaApertura: number;
  tasaClick: number;
  conversiones: number;
  ultimaActualizacion: string;
  contenido: string;
  asunto?: string;
  variables: string[];
  activa: boolean;
}

export const plantillasMock: Plantilla[] = [
  // BIENVENIDA
  {
    id: 'bienvenida-email-1',
    nombre: 'Bienvenida Premium',
    tipo: 'email',
    categoria: 'bienvenida',
    descripcion: 'Email de bienvenida personalizado para nuevos miembros premium',
    preview: '🎉 Bienvenido a FitPro! Tu viaje fitness comienza aquí...',
    usos: 1543,
    tasaApertura: 87.5,
    tasaClick: 45.2,
    conversiones: 312,
    ultimaActualizacion: '2025-09-28',
    asunto: '🎉 ¡Bienvenido/a a FitPro, {{nombre}}!',
    contenido: 'Hola {{nombre}}, estamos emocionados de tenerte con nosotros. Tu membresía premium te da acceso a...',
    variables: ['nombre', 'plan', 'fecha_inicio'],
    activa: true
  },
  {
    id: 'bienvenida-whatsapp-1',
    nombre: 'Bienvenida WhatsApp Rápida',
    tipo: 'whatsapp',
    categoria: 'bienvenida',
    descripcion: 'Mensaje de bienvenida instantáneo por WhatsApp',
    preview: '👋 Hola! Bienvenido a FitPro. Estamos aquí para ayudarte...',
    usos: 2187,
    tasaApertura: 98.3,
    tasaClick: 62.1,
    conversiones: 543,
    ultimaActualizacion: '2025-09-25',
    contenido: '👋 Hola {{nombre}}! Bienvenido a FitPro 💪\n\nEstamos aquí para ayudarte a alcanzar tus objetivos.',
    variables: ['nombre'],
    activa: true
  },
  {
    id: 'bienvenida-email-2',
    nombre: 'Primera Sesión Gratis',
    tipo: 'email',
    categoria: 'bienvenida',
    descripcion: 'Invitación a primera sesión gratuita para nuevos usuarios',
    preview: '🎁 Tu primera sesión es gratis! Reserva ahora...',
    usos: 1876,
    tasaApertura: 79.8,
    tasaClick: 51.3,
    conversiones: 487,
    ultimaActualizacion: '2025-09-27',
    asunto: '🎁 {{nombre}}, tu primera sesión es GRATIS',
    contenido: 'Queremos que experimentes lo mejor de FitPro. Reserva tu sesión gratuita hoy...',
    variables: ['nombre', 'gym_cercano'],
    activa: true
  },
  {
    id: 'bienvenida-push-1',
    nombre: 'Notificación Bienvenida App',
    tipo: 'push',
    categoria: 'bienvenida',
    descripcion: 'Notificación push al instalar la app',
    preview: '🚀 Configura tu perfil y obtén tu plan personalizado',
    usos: 3421,
    tasaApertura: 71.2,
    tasaClick: 38.9,
    conversiones: 892,
    ultimaActualizacion: '2025-09-26',
    contenido: '¡Completa tu perfil en 2 minutos y obtén tu plan de entrenamiento personalizado!',
    variables: ['nombre'],
    activa: true
  },

  // RECORDATORIOS
  {
    id: 'recordatorio-email-1',
    nombre: 'Recordatorio Clase 24h',
    tipo: 'email',
    categoria: 'recordatorio',
    descripcion: 'Recordatorio de clase 24 horas antes',
    preview: '⏰ Tu clase de {{tipo_clase}} es mañana a las {{hora}}',
    usos: 5432,
    tasaApertura: 82.3,
    tasaClick: 34.7,
    conversiones: 421,
    ultimaActualizacion: '2025-09-29',
    asunto: '⏰ Recordatorio: Clase de {{tipo_clase}} mañana',
    contenido: 'Hola {{nombre}}, te recordamos tu clase de {{tipo_clase}} mañana {{fecha}} a las {{hora}}.',
    variables: ['nombre', 'tipo_clase', 'fecha', 'hora', 'instructor'],
    activa: true
  },
  {
    id: 'recordatorio-sms-1',
    nombre: 'SMS Recordatorio 2h',
    tipo: 'sms',
    categoria: 'recordatorio',
    descripcion: 'SMS 2 horas antes de la sesión',
    preview: 'Tu sesión con {{instructor}} empieza en 2h',
    usos: 4321,
    tasaApertura: 95.7,
    tasaClick: 12.3,
    conversiones: 234,
    ultimaActualizacion: '2025-09-28',
    contenido: 'Hola {{nombre}}! Tu sesión de {{tipo}} con {{instructor}} empieza en 2 horas. Nos vemos!',
    variables: ['nombre', 'tipo', 'instructor'],
    activa: true
  },
  {
    id: 'recordatorio-whatsapp-1',
    nombre: 'WhatsApp Cita Mañana',
    tipo: 'whatsapp',
    categoria: 'recordatorio',
    descripcion: 'Recordatorio por WhatsApp con opción de confirmar',
    preview: '📅 Tienes cita mañana. Confirma tu asistencia',
    usos: 3876,
    tasaApertura: 97.1,
    tasaClick: 67.8,
    conversiones: 1243,
    ultimaActualizacion: '2025-09-29',
    contenido: '📅 Hola {{nombre}}!\n\nTe recordamos tu cita:\n🗓️ {{fecha}}\n⏰ {{hora}}\n👤 {{instructor}}\n\n¿Confirmas tu asistencia?',
    variables: ['nombre', 'fecha', 'hora', 'instructor'],
    activa: true
  },
  {
    id: 'recordatorio-push-1',
    nombre: 'Push Recordatorio 1h',
    tipo: 'push',
    categoria: 'recordatorio',
    descripcion: 'Notificación 1 hora antes',
    preview: '🏋️ Tu clase empieza en 1 hora!',
    usos: 6543,
    tasaApertura: 88.9,
    tasaClick: 45.6,
    conversiones: 987,
    ultimaActualizacion: '2025-09-29',
    contenido: '🏋️ {{nombre}}, tu clase de {{tipo}} empieza en 1 hora. ¡Prepárate!',
    variables: ['nombre', 'tipo'],
    activa: true
  },

  // SEGUIMIENTO
  {
    id: 'seguimiento-email-1',
    nombre: 'Feedback Post-Clase',
    tipo: 'email',
    categoria: 'seguimiento',
    descripcion: 'Solicitud de feedback después de una clase',
    preview: '💭 ¿Cómo fue tu clase con {{instructor}}?',
    usos: 2987,
    tasaApertura: 68.4,
    tasaClick: 42.1,
    conversiones: 654,
    ultimaActualizacion: '2025-09-27',
    asunto: '💭 {{nombre}}, cuéntanos sobre tu clase',
    contenido: 'Hola {{nombre}}, esperamos que hayas disfrutado tu clase. Ayúdanos a mejorar contándonos tu experiencia...',
    variables: ['nombre', 'instructor', 'tipo_clase'],
    activa: true
  },
  {
    id: 'seguimiento-email-2',
    nombre: 'Check-in Semanal',
    tipo: 'email',
    categoria: 'seguimiento',
    descripcion: 'Email de seguimiento semanal de progreso',
    preview: '📊 Tu resumen semanal: {{clases}} clases completadas',
    usos: 4567,
    tasaApertura: 75.2,
    tasaClick: 48.9,
    conversiones: 876,
    ultimaActualizacion: '2025-09-28',
    asunto: '📊 Tu resumen semanal está listo, {{nombre}}',
    contenido: '¡Gran semana {{nombre}}! Completaste {{clases}} clases y quemaste {{calorias}} calorías...',
    variables: ['nombre', 'clases', 'calorias', 'minutos'],
    activa: true
  },
  {
    id: 'seguimiento-whatsapp-1',
    nombre: 'WhatsApp Check-in Personal',
    tipo: 'whatsapp',
    categoria: 'seguimiento',
    descripcion: 'Mensaje personalizado del entrenador',
    preview: '💪 Hola! ¿Cómo vas con tus objetivos?',
    usos: 1234,
    tasaApertura: 91.3,
    tasaClick: 71.2,
    conversiones: 432,
    ultimaActualizacion: '2025-09-26',
    contenido: '💪 Hola {{nombre}}!\n\nSoy {{instructor}}. ¿Cómo te sientes con tus entrenamientos? Cuéntame.',
    variables: ['nombre', 'instructor'],
    activa: true
  },

  // PROMOCIONES
  {
    id: 'promocion-email-1',
    nombre: 'Descuento Mensualidad',
    tipo: 'email',
    categoria: 'promocion',
    descripcion: 'Oferta especial de descuento en membresía',
    preview: '🔥 50% OFF en tu próxima mensualidad!',
    usos: 3456,
    tasaApertura: 84.7,
    tasaClick: 58.3,
    conversiones: 1234,
    ultimaActualizacion: '2025-09-29',
    asunto: '🔥 {{nombre}}, 50% OFF solo por hoy!',
    contenido: 'Oferta especial para ti! Renueva hoy y obtén 50% de descuento en tu próxima mensualidad...',
    variables: ['nombre', 'descuento', 'fecha_vencimiento'],
    activa: true
  },
  {
    id: 'promocion-sms-1',
    nombre: 'SMS Flash Sale',
    tipo: 'sms',
    categoria: 'promocion',
    descripcion: 'Promoción flash por SMS',
    preview: '⚡ FLASH SALE: 3 meses por el precio de 2',
    usos: 2345,
    tasaApertura: 89.1,
    tasaClick: 23.4,
    conversiones: 567,
    ultimaActualizacion: '2025-09-28',
    contenido: '⚡ FLASH SALE {{nombre}}! 3 meses por el precio de 2. Solo hasta las {{hora}}. Usa código: {{codigo}}',
    variables: ['nombre', 'hora', 'codigo'],
    activa: true
  },
  {
    id: 'promocion-push-1',
    nombre: 'Push Clase Gratis',
    tipo: 'push',
    categoria: 'promocion',
    descripcion: 'Notificación de clase gratis disponible',
    preview: '🎁 Clase gratis desbloqueada!',
    usos: 5678,
    tasaApertura: 78.9,
    tasaClick: 52.1,
    conversiones: 1432,
    ultimaActualizacion: '2025-09-27',
    contenido: '🎁 {{nombre}}, tienes 1 clase gratis! Reserva ahora antes que se agoten los cupos.',
    variables: ['nombre'],
    activa: true
  },
  {
    id: 'promocion-social-1',
    nombre: 'Post Promo Instagram',
    tipo: 'social',
    categoria: 'promocion',
    descripcion: 'Template para promoción en Instagram',
    preview: '🔥 NUEVA PROMO! Trae un amigo y ambos obtienen 20% OFF',
    usos: 876,
    tasaApertura: 65.4,
    tasaClick: 34.2,
    conversiones: 234,
    ultimaActualizacion: '2025-09-25',
    contenido: '🔥 PROMO AMIGOS!\n\nTrae un amigo y ambos obtienen 20% OFF en su mensualidad.\n\n#FitPro #Fitness #Promocion',
    variables: ['descuento'],
    activa: true
  },

  // CUMPLEAÑOS
  {
    id: 'cumpleanos-email-1',
    nombre: 'Email Cumpleaños Especial',
    tipo: 'email',
    categoria: 'cumpleanos',
    descripcion: 'Felicitación de cumpleaños con regalo',
    preview: '🎂 Feliz cumpleaños! Te regalamos una clase gratis',
    usos: 1567,
    tasaApertura: 92.3,
    tasaClick: 67.8,
    conversiones: 789,
    ultimaActualizacion: '2025-09-24',
    asunto: '🎂 ¡Feliz cumpleaños {{nombre}}! Tenemos un regalo para ti',
    contenido: '🎉 Feliz cumpleaños {{nombre}}! Para celebrar, te regalamos 1 clase gratis y 20% OFF en accesorios...',
    variables: ['nombre', 'edad'],
    activa: true
  },
  {
    id: 'cumpleanos-whatsapp-1',
    nombre: 'WhatsApp Cumpleaños',
    tipo: 'whatsapp',
    categoria: 'cumpleanos',
    descripcion: 'Mensaje de cumpleaños por WhatsApp',
    preview: '🎉🎂 Feliz cumpleaños! Queremos celebrar contigo',
    usos: 1432,
    tasaApertura: 96.7,
    tasaClick: 78.9,
    conversiones: 654,
    ultimaActualizacion: '2025-09-26',
    contenido: '🎉🎂 ¡FELIZ CUMPLEAÑOS {{nombre}}!\n\nTenemos un regalo especial: 1 clase GRATIS + smoothie de regalo 🥤\n\nÚsalo cuando quieras! 🎁',
    variables: ['nombre'],
    activa: true
  },
  {
    id: 'cumpleanos-push-1',
    nombre: 'Notificación Cumpleaños',
    tipo: 'push',
    categoria: 'cumpleanos',
    descripcion: 'Push notification de cumpleaños',
    preview: '🎉 Feliz cumpleaños! Abre para tu sorpresa',
    usos: 2341,
    tasaApertura: 87.6,
    tasaClick: 72.3,
    conversiones: 987,
    ultimaActualizacion: '2025-09-23',
    contenido: '🎉 ¡Feliz cumpleaños {{nombre}}! 🎂 Tenemos una sorpresa especial para ti. Abre la app!',
    variables: ['nombre'],
    activa: true
  },

  // RECUPERACIÓN
  {
    id: 'recuperacion-email-1',
    nombre: 'Te Extrañamos',
    tipo: 'email',
    categoria: 'recuperacion',
    descripcion: 'Email para usuarios inactivos',
    preview: '💔 Te extrañamos! Vuelve y obtén 30% OFF',
    usos: 2876,
    tasaApertura: 54.3,
    tasaClick: 32.1,
    conversiones: 432,
    ultimaActualizacion: '2025-09-28',
    asunto: '💔 {{nombre}}, te extrañamos en FitPro',
    contenido: 'Han pasado {{dias}} días desde tu última visita. Queremos verte de vuelta! Obtén 30% OFF...',
    variables: ['nombre', 'dias', 'ultima_visita'],
    activa: true
  },
  {
    id: 'recuperacion-whatsapp-1',
    nombre: 'WhatsApp Reactivación',
    tipo: 'whatsapp',
    categoria: 'recuperacion',
    descripcion: 'Mensaje de reactivación personalizado',
    preview: '👋 Hola! ¿Todo bien? Te tenemos una oferta especial',
    usos: 1987,
    tasaApertura: 76.8,
    tasaClick: 45.2,
    conversiones: 321,
    ultimaActualizacion: '2025-09-27',
    contenido: '👋 Hola {{nombre}}!\n\n¿Cómo estás? Notamos que no vienes hace tiempo.\n\n¿Quieres volver? Tenemos 40% OFF para ti 💪',
    variables: ['nombre', 'ultima_clase'],
    activa: true
  },
  {
    id: 'recuperacion-email-2',
    nombre: 'Última Oportunidad',
    tipo: 'email',
    categoria: 'recuperacion',
    descripcion: 'Email de última oportunidad antes de cancelación',
    preview: '⚠️ Tu membresía expira en {{dias}} días',
    usos: 1654,
    tasaApertura: 68.9,
    tasaClick: 41.7,
    conversiones: 278,
    ultimaActualizacion: '2025-09-26',
    asunto: '⚠️ {{nombre}}, tu membresía expira pronto',
    contenido: 'Tu membresía expira en {{dias}} días. Renueva ahora con 25% OFF y no pierdas tus beneficios...',
    variables: ['nombre', 'dias', 'fecha_expiracion'],
    activa: true
  },

  // NEWSLETTERS
  {
    id: 'newsletter-email-1',
    nombre: 'Newsletter Semanal',
    tipo: 'email',
    categoria: 'newsletter',
    descripcion: 'Newsletter con novedades y tips',
    preview: '📰 Esta semana en FitPro: Nuevas clases y tips de nutrición',
    usos: 6543,
    tasaApertura: 61.2,
    tasaClick: 28.7,
    conversiones: 543,
    ultimaActualizacion: '2025-09-29',
    asunto: '📰 Newsletter FitPro - Semana {{numero_semana}}',
    contenido: 'Hola {{nombre}}! Estas son las novedades de esta semana: nuevas clases, tips de nutrición y más...',
    variables: ['nombre', 'numero_semana'],
    activa: true
  },
  {
    id: 'newsletter-email-2',
    nombre: 'Newsletter Mensual Logros',
    tipo: 'email',
    categoria: 'newsletter',
    descripcion: 'Resumen mensual de logros de la comunidad',
    preview: '🏆 Logros del mes: {{total_usuarios}} usuarios alcanzaron sus metas',
    usos: 5432,
    tasaApertura: 64.8,
    tasaClick: 35.9,
    conversiones: 654,
    ultimaActualizacion: '2025-09-28',
    asunto: '🏆 Logros de {{mes}} - FitPro Community',
    contenido: 'Este mes, {{total_usuarios}} miembros alcanzaron sus metas. Celebramos juntos sus logros...',
    variables: ['mes', 'total_usuarios'],
    activa: true
  },
  {
    id: 'newsletter-social-1',
    nombre: 'Post Newsletter Instagram',
    tipo: 'social',
    categoria: 'newsletter',
    descripcion: 'Resumen semanal para redes sociales',
    preview: '📱 Resumen de la semana: Nuevos records y logros',
    usos: 987,
    tasaApertura: 58.3,
    tasaClick: 31.2,
    conversiones: 187,
    ultimaActualizacion: '2025-09-25',
    contenido: '📱 RESUMEN DE LA SEMANA\n\n✅ {{total_clases}} clases\n✅ {{total_asistentes}} asistentes\n✅ Records batidos\n\n#FitProCommunity #Fitness',
    variables: ['total_clases', 'total_asistentes'],
    activa: true
  },

  // MÁS EMAILS
  {
    id: 'email-nutricion-1',
    nombre: 'Tips de Nutrición',
    tipo: 'email',
    categoria: 'newsletter',
    descripcion: 'Consejos semanales de nutrición',
    preview: '🥗 5 tips para mejorar tu alimentación esta semana',
    usos: 4321,
    tasaApertura: 69.4,
    tasaClick: 38.6,
    conversiones: 432,
    ultimaActualizacion: '2025-09-27',
    asunto: '🥗 Tips de nutrición - Semana {{numero_semana}}',
    contenido: 'Hola {{nombre}}! Esta semana te compartimos 5 tips para mejorar tu alimentación...',
    variables: ['nombre', 'numero_semana'],
    activa: true
  },
  {
    id: 'email-motivacion-1',
    nombre: 'Motivación Lunes',
    tipo: 'email',
    categoria: 'seguimiento',
    descripcion: 'Email motivacional para comenzar la semana',
    preview: '💪 Nuevo lunes, nuevas oportunidades!',
    usos: 5678,
    tasaApertura: 72.1,
    tasaClick: 29.8,
    conversiones: 567,
    ultimaActualizacion: '2025-09-29',
    asunto: '💪 {{nombre}}, comienza la semana con energía!',
    contenido: 'Buenos días {{nombre}}! Un nuevo lunes es una nueva oportunidad para ser tu mejor versión...',
    variables: ['nombre'],
    activa: true
  },

  // MÁS SMS
  {
    id: 'sms-confirmacion-1',
    nombre: 'SMS Confirmación Reserva',
    tipo: 'sms',
    categoria: 'recordatorio',
    descripcion: 'Confirmación instantánea de reserva',
    preview: '✅ Reserva confirmada para {{fecha}} a las {{hora}}',
    usos: 7654,
    tasaApertura: 98.9,
    tasaClick: 15.6,
    conversiones: 876,
    ultimaActualizacion: '2025-09-29',
    contenido: '✅ Reserva confirmada!\n{{tipo_clase}} - {{fecha}} {{hora}}\nInstructor: {{instructor}}\nFitPro',
    variables: ['tipo_clase', 'fecha', 'hora', 'instructor'],
    activa: true
  },
  {
    id: 'sms-cancelacion-1',
    nombre: 'SMS Cancelación',
    tipo: 'sms',
    categoria: 'recordatorio',
    descripcion: 'Confirmación de cancelación',
    preview: 'Tu clase del {{fecha}} ha sido cancelada',
    usos: 2345,
    tasaApertura: 97.8,
    tasaClick: 8.9,
    conversiones: 123,
    ultimaActualizacion: '2025-09-28',
    contenido: 'Tu clase de {{tipo}} del {{fecha}} ha sido cancelada. Reserva otra en la app.',
    variables: ['tipo', 'fecha'],
    activa: true
  },

  // MÁS WHATSAPP
  {
    id: 'whatsapp-encuesta-1',
    nombre: 'WhatsApp Encuesta Satisfacción',
    tipo: 'whatsapp',
    categoria: 'seguimiento',
    descripcion: 'Encuesta rápida de satisfacción',
    preview: '⭐ ¿Qué tan satisfecho estás con FitPro? (1-5)',
    usos: 3456,
    tasaApertura: 84.2,
    tasaClick: 56.7,
    conversiones: 987,
    ultimaActualizacion: '2025-09-26',
    contenido: '⭐ Hola {{nombre}}!\n\n¿Qué tan satisfecho estás con FitPro?\n\nResponde del 1 al 5 ⬇️\n1️⃣ Muy insatisfecho\n5️⃣ Muy satisfecho',
    variables: ['nombre'],
    activa: true
  },
  {
    id: 'whatsapp-evento-1',
    nombre: 'Invitación Evento WhatsApp',
    tipo: 'whatsapp',
    categoria: 'promocion',
    descripcion: 'Invitación a eventos especiales',
    preview: '🎉 Evento especial: {{nombre_evento}} el {{fecha}}',
    usos: 2187,
    tasaApertura: 89.7,
    tasaClick: 64.3,
    conversiones: 765,
    ultimaActualizacion: '2025-09-25',
    contenido: '🎉 {{nombre}}, estás invitado!\n\n📍 {{nombre_evento}}\n📅 {{fecha}}\n⏰ {{hora}}\n\n¿Vienes? Confirma aquí ✅',
    variables: ['nombre', 'nombre_evento', 'fecha', 'hora'],
    activa: true
  },

  // MÁS PUSH
  {
    id: 'push-logro-1',
    nombre: 'Push Logro Desbloqueado',
    tipo: 'push',
    categoria: 'seguimiento',
    descripcion: 'Notificación de logro alcanzado',
    preview: '🏆 Logro desbloqueado: {{nombre_logro}}!',
    usos: 4567,
    tasaApertura: 81.2,
    tasaClick: 67.8,
    conversiones: 1234,
    ultimaActualizacion: '2025-09-28',
    contenido: '🏆 ¡Felicitaciones {{nombre}}! Desbloqueaste el logro "{{nombre_logro}}"',
    variables: ['nombre', 'nombre_logro'],
    activa: true
  },
  {
    id: 'push-racha-1',
    nombre: 'Push Racha Activa',
    tipo: 'push',
    categoria: 'seguimiento',
    descripcion: 'Notificación de racha de asistencia',
    preview: '🔥 Racha de {{dias}} días! Sigue así!',
    usos: 3876,
    tasaApertura: 86.4,
    tasaClick: 54.2,
    conversiones: 876,
    ultimaActualizacion: '2025-09-27',
    contenido: '🔥 ¡Increíble {{nombre}}! Llevas {{dias}} días consecutivos. No pares ahora!',
    variables: ['nombre', 'dias'],
    activa: true
  },

  // MÁS SOCIAL
  {
    id: 'social-testimonio-1',
    nombre: 'Post Testimonio Cliente',
    tipo: 'social',
    categoria: 'newsletter',
    descripcion: 'Template para compartir testimonios',
    preview: '💬 "FitPro cambió mi vida" - {{nombre_cliente}}',
    usos: 654,
    tasaApertura: 62.8,
    tasaClick: 29.4,
    conversiones: 156,
    ultimaActualizacion: '2025-09-24',
    contenido: '💬 HISTORIA DE ÉXITO\n\n"{{testimonio}}"\n\n- {{nombre_cliente}}\n\n¿Listo para tu transformación? 💪\n\n#FitProStories #Transformacion',
    variables: ['testimonio', 'nombre_cliente'],
    activa: true
  },
  {
    id: 'social-tip-1',
    nombre: 'Post Tip del Día',
    tipo: 'social',
    categoria: 'newsletter',
    descripcion: 'Tip diario para redes sociales',
    preview: '💡 TIP DEL DÍA: {{tip}}',
    usos: 1234,
    tasaApertura: 69.2,
    tasaClick: 36.8,
    conversiones: 234,
    ultimaActualizacion: '2025-09-26',
    contenido: '💡 TIP DEL DÍA\n\n{{tip}}\n\n¿Lo sabías? Comparte si te sirvió!\n\n#FitProTips #Fitness #Salud',
    variables: ['tip'],
    activa: true
  },

  // ADICIONALES
  {
    id: 'email-programa-1',
    nombre: 'Nuevo Programa Disponible',
    tipo: 'email',
    categoria: 'promocion',
    descripcion: 'Anuncio de nuevo programa de entrenamiento',
    preview: '🚀 Nuevo programa: {{nombre_programa}} ya disponible!',
    usos: 3210,
    tasaApertura: 76.5,
    tasaClick: 49.2,
    conversiones: 765,
    ultimaActualizacion: '2025-09-28',
    asunto: '🚀 {{nombre}}, tenemos un nuevo programa para ti!',
    contenido: 'Presentamos {{nombre_programa}}, nuestro nuevo programa diseñado para {{objetivo}}...',
    variables: ['nombre', 'nombre_programa', 'objetivo'],
    activa: true
  },
  {
    id: 'email-referido-1',
    nombre: 'Programa de Referidos',
    tipo: 'email',
    categoria: 'promocion',
    descripcion: 'Invitación a programa de referidos',
    preview: '👥 Invita amigos y gana recompensas!',
    usos: 2876,
    tasaApertura: 58.9,
    tasaClick: 33.4,
    conversiones: 432,
    ultimaActualizacion: '2025-09-27',
    asunto: '👥 {{nombre}}, gana recompensas por cada amigo!',
    contenido: 'Por cada amigo que traigas, ambos obtienen 1 mes gratis! Comparte tu código: {{codigo_referido}}',
    variables: ['nombre', 'codigo_referido'],
    activa: true
  },
  {
    id: 'sms-urgente-1',
    nombre: 'SMS Cambio de Horario',
    tipo: 'sms',
    categoria: 'recordatorio',
    descripcion: 'Notificación urgente de cambio',
    preview: '⚠️ CAMBIO: Tu clase se movió a las {{nueva_hora}}',
    usos: 1543,
    tasaApertura: 99.1,
    tasaClick: 11.2,
    conversiones: 234,
    ultimaActualizacion: '2025-09-29',
    contenido: '⚠️ CAMBIO HORARIO: Tu clase de {{tipo}} se movió de {{hora_anterior}} a {{nueva_hora}}. FitPro',
    variables: ['tipo', 'hora_anterior', 'nueva_hora'],
    activa: true
  },
  {
    id: 'whatsapp-nutricionista-1',
    nombre: 'Consulta Nutricionista WhatsApp',
    tipo: 'whatsapp',
    categoria: 'seguimiento',
    descripcion: 'Recordatorio de consulta con nutricionista',
    preview: '🥗 Recordatorio: Consulta con {{nutricionista}} mañana',
    usos: 1876,
    tasaApertura: 93.4,
    tasaClick: 61.2,
    conversiones: 543,
    ultimaActualizacion: '2025-09-26',
    contenido: '🥗 Hola {{nombre}}!\n\nTe recordamos tu consulta nutricional:\n👤 {{nutricionista}}\n📅 {{fecha}}\n⏰ {{hora}}\n\nTrae tus dudas!',
    variables: ['nombre', 'nutricionista', 'fecha', 'hora'],
    activa: true
  },
  {
    id: 'push-meta-1',
    nombre: 'Push Cerca de tu Meta',
    tipo: 'push',
    categoria: 'seguimiento',
    descripcion: 'Notificación de progreso hacia meta',
    preview: '🎯 Solo te faltan {{cantidad}} para tu meta!',
    usos: 5432,
    tasaApertura: 79.8,
    tasaClick: 58.9,
    conversiones: 1432,
    ultimaActualizacion: '2025-09-29',
    contenido: '🎯 {{nombre}}, estás cerca! Solo {{cantidad}} {{unidad}} más para alcanzar tu meta de {{meta}}!',
    variables: ['nombre', 'cantidad', 'unidad', 'meta'],
    activa: true
  },
  {
    id: 'social-challenge-1',
    nombre: 'Post Challenge Mensual',
    tipo: 'social',
    categoria: 'promocion',
    descripcion: 'Anuncio de reto mensual',
    preview: '🏆 RETO DEL MES: {{nombre_reto}}',
    usos: 1098,
    tasaApertura: 71.3,
    tasaClick: 44.7,
    conversiones: 321,
    ultimaActualizacion: '2025-09-25',
    contenido: '🏆 RETO DEL MES\n\n{{nombre_reto}}\n\n🎁 Premios:\n{{premios}}\n\n¿Te unes?\n\n#FitProChallenge #Fitness',
    variables: ['nombre_reto', 'premios'],
    activa: true
  },
  {
    id: 'email-aniversario-1',
    nombre: 'Aniversario Membresía',
    tipo: 'email',
    categoria: 'seguimiento',
    descripcion: 'Celebración de aniversario como miembro',
    preview: '🎊 1 año juntos! Gracias por ser parte de FitPro',
    usos: 1234,
    tasaApertura: 88.9,
    tasaClick: 55.6,
    conversiones: 543,
    ultimaActualizacion: '2025-09-24',
    asunto: '🎊 {{nombre}}, cumplimos {{anos}} año(s) juntos!',
    contenido: 'Han pasado {{anos}} año(s) increíbles! Gracias por confiar en FitPro. Te regalamos {{regalo}}...',
    variables: ['nombre', 'anos', 'regalo'],
    activa: true
  },
  {
    id: 'whatsapp-clase-nueva-1',
    nombre: 'WhatsApp Nueva Clase Disponible',
    tipo: 'whatsapp',
    categoria: 'promocion',
    descripcion: 'Aviso de nueva clase agregada',
    preview: '🆕 Nueva clase de {{tipo}} con {{instructor}}!',
    usos: 2654,
    tasaApertura: 91.2,
    tasaClick: 68.4,
    conversiones: 876,
    ultimaActualizacion: '2025-09-28',
    contenido: '🆕 NUEVA CLASE!\n\n{{tipo}} con {{instructor}}\n📅 {{dia}} a las {{hora}}\n\nCupos limitados. Reserva ya! 🔥',
    variables: ['tipo', 'instructor', 'dia', 'hora'],
    activa: true
  },
];

export const categoriasConfig = {
  bienvenida: {
    nombre: 'Bienvenida',
    icono: '👋',
    color: 'from-blue-500 to-cyan-500',
    descripcion: 'Primeras impresiones que importan'
  },
  seguimiento: {
    nombre: 'Seguimiento',
    icono: '📊',
    color: 'from-purple-500 to-pink-500',
    descripcion: 'Mantén el compromiso de tus clientes'
  },
  promocion: {
    nombre: 'Promociones',
    icono: '🔥',
    color: 'from-orange-500 to-red-500',
    descripcion: 'Ofertas que convierten'
  },
  recordatorio: {
    nombre: 'Recordatorios',
    icono: '⏰',
    color: 'from-indigo-500 to-purple-500',
    descripcion: 'Nunca más una cita perdida'
  },
  cumpleanos: {
    nombre: 'Cumpleaños',
    icono: '🎂',
    color: 'from-pink-500 to-rose-500',
    descripcion: 'Celebra con tus clientes'
  },
  recuperacion: {
    nombre: 'Recuperación',
    icono: '💔',
    color: 'from-gray-500 to-slate-500',
    descripcion: 'Reconquista clientes inactivos'
  },
  newsletter: {
    nombre: 'Newsletter',
    icono: '📰',
    color: 'from-emerald-500 to-teal-500',
    descripcion: 'Mantén informada tu comunidad'
  }
};

export const tiposConfig = {
  email: {
    nombre: 'Email Marketing',
    icono: '📧',
    color: 'bg-blue-500'
  },
  sms: {
    nombre: 'SMS',
    icono: '💬',
    color: 'bg-green-500'
  },
  whatsapp: {
    nombre: 'WhatsApp',
    icono: '📱',
    color: 'bg-emerald-500'
  },
  push: {
    nombre: 'Push',
    icono: '🔔',
    color: 'bg-purple-500'
  },
  social: {
    nombre: 'Redes Sociales',
    icono: '📱',
    color: 'bg-pink-500'
  }
};
