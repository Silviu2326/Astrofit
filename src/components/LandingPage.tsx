import React from 'react';
import {
  Dumbbell, Users, TrendingUp, Calendar, MessageSquare, DollarSign,
  Brain, Target, Zap, Lock, Globe, Smartphone, BarChart3,
  Award, TrendingDown, Video, Mail, Database, Code, FileText, BarChart2,
  Clock, Rocket
} from 'lucide-react';
import {
  LandingHeader,
  HeroSection,
  RealityCheckSection,
  ProblemsSection,
  ComparisonTable,
  FeaturesSection,
  PlansSection,
  TestimonialsSection,
  FAQSection,
  LandingFooter
} from './landing';

export const LandingPage: React.FC = () => {
  const realityCheck = [
    {
      myth: "\"Ya tengo un Excel, no necesito software\"",
      reality: "Mientras tú pierdes 15 horas/semana en tu Excel, tu competencia atiende 3x más clientes con el mismo tiempo.",
      pain: "💸 Pierdes $2,000-5,000/mes en oportunidad"
    },
    {
      myth: "\"WhatsApp me funciona bien\"",
      reality: "Claro, si trabajar 12 horas al día, dar tu número personal y responder a las 11 PM es 'funcionar bien'.",
      pain: "😰 Tu salud mental: destruida"
    },
    {
      myth: "\"Mis clientes pagan... más o menos\"",
      reality: "Tienes $3-5k en morosos que nunca vas a cobrar porque 'da vergüenza' perseguirlos. Eso es 1-2 meses de trabajo REGALADO.",
      pain: "🔥 Dinero trabajado que nunca verás"
    },
    {
      myth: "\"No necesito marketing, me vienen por Instagram\"",
      reality: "Instagram hoy, nada mañana. Sin sistema de captación y conversión, estás a un cambio de algoritmo de quebrar.",
      pain: "📉 Tu negocio depende 100% de la suerte"
    }
  ];

  const problems = [
    { problem: "Pierdes clientes por desorganización", cost: "-$500/mes", icon: <Users className="w-6 h-6 text-red-500" /> },
    { problem: "15 horas/semana haciendo rutinas manualmente", cost: "-$1,200/mes", icon: <Clock className="w-6 h-6 text-red-500" /> },
    { problem: "Morosos que nunca cobras", cost: "-$800/mes", icon: <DollarSign className="w-6 h-6 text-red-500" /> },
    { problem: "Sin sistema de reactivación de clientes", cost: "-$1,000/mes", icon: <TrendingDown className="w-6 h-6 text-red-500" /> },
    { problem: "Respondiendo WhatsApps 24/7", cost: "Tu salud mental", icon: <MessageSquare className="w-6 h-6 text-red-500" /> },
    { problem: "No sabes qué funciona y qué no", cost: "Decisiones a ciegas", icon: <BarChart2 className="w-6 h-6 text-red-500" /> },
    { problem: "Cada cliente es un Excel diferente", cost: "Caos total", icon: <FileText className="w-6 h-6 text-red-500" /> },
    { problem: "Cero automatización = cero escalabilidad", cost: "Atrapado", icon: <Rocket className="w-6 h-6 text-red-500" /> }
  ];

  const competitorComparison = [
    { feature: "CRM Completo", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Pipeline de Ventas", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "7 Agentes de IA", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Facturación Automática", us: true, trainerize: true, trucoach: false, excel: false },
    { feature: "App White Label", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Automatizaciones", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Web de Reservas", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "LMS + Cursos", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Multi-sede", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Analytics Predictivas", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Inbox Unificado", us: true, trainerize: false, trucoach: false, excel: false },
    { feature: "Precio", us: "$49-249", trainerize: "$99+", trucoach: "$149+", excel: "Tu tiempo" }
  ];

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: '7 Agentes de IA (no chatbots de mierda)',
      description: 'Copiloto IA que crea rutinas, nutricionista que calcula macros, agente financiero que analiza tu negocio, marketing que escribe tus posts. Es como tener 7 empleados expertos trabajando 24/7. Sin pagarles.',
      highlight: 'IA REAL',
      realExample: 'Crea una rutina de hipertrofia 4 días en 45 segundos. Lo que antes te tomaba 2 horas.'
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'CRM que SÍ convierte leads en clientes',
      description: 'Pipeline visual tipo Salesforce, lead scoring automático (sabe quién está listo para comprar), seguimiento inteligente. Deja de perder el 70% de tus leads por mala gestión.',
      highlight: 'CRM PRO',
      realExample: 'Seguimiento automático: email día 1, WhatsApp día 3, llamada día 7. Sin que muevas un dedo.'
    },
    {
      icon: <Dumbbell className="w-12 h-12 text-blue-600" />,
      title: 'Rutinas en 3 minutos (no en 3 horas)',
      description: '+500 ejercicios con vídeos, plantillas por objetivo, progresiones automáticas, superset/circuit builder. Copy/paste y personaliza. Lo que te tomaba una tarde, ahora 3 minutos.',
      highlight: 'TRAINING',
      realExample: 'Asigna 12 semanas de periodización en 5 minutos. Ahorra 10 horas/semana.'
    },
    {
      icon: <Target className="w-12 h-12 text-blue-600" />,
      title: 'Planes nutricionales sin ser nutricionista',
      description: 'Calculadora TMB/TDEE automática, ajuste de macros por objetivo, banco de recetas, tracking de adherencia. Si ERES nutricionista: automatiza TODO y cobra por consultas, no por hacer cálculos.',
      highlight: 'NUTRITION',
      realExample: 'Plan completo con lista de compras en 90 segundos. Antes: 1 hora mínimo.'
    },
    {
      icon: <DollarSign className="w-12 h-12 text-blue-600" />,
      title: 'Cobra mientras duermes (literal)',
      description: 'Pagos recurrentes automáticos, control de morosos con corte automático, reportes fiscales listos. Stripe, PayPal, MercadoPago. Deja de perseguir a nadie. El sistema cobra por ti.',
      highlight: 'FINANZAS',
      realExample: 'Cliente moroso? Auto-suspensión día 5. Auto-recordatorio día 1, 3 y 5. Cobro 98% vs 70% manual.'
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-blue-600" />,
      title: 'Deja de dar tu número personal',
      description: 'Inbox unificado: WhatsApp Business API, SMS, email, Instagram DMs. Todo en un sitio. Respuestas automáticas, chatbot IA 24/7, horarios de no molestar. Tu vida personal vuelve a ser tuya.',
      highlight: 'COMUNICACIÓN',
      realExample: 'Bot responde 80% de preguntas frecuentes. Solo intervienes en lo importante.'
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: 'Números reales, no humo',
      description: 'MRR, churn, LTV, CAC, ROI por canal. Dashboards que te dicen exactamente dónde está el dinero y dónde lo estás perdiendo. Analytics predictivas con IA: te dice qué cliente se va a dar de baja ANTES de que pase.',
      highlight: 'ANALYTICS',
      realExample: 'IA detecta que María tiene 85% de probabilidad de cancelar. Flujo de retención automático. La salvas.'
    },
    {
      icon: <Smartphone className="w-12 h-12 text-blue-600" />,
      title: 'Tu app (como si hubieras invertido $50k)',
      description: 'App móvil white label: TU logo, TU marca, TU color. iOS y Android. Tus clientes la descargan de la App Store. Parece que gastaste $50-100k en desarrollo. Está incluida.',
      highlight: 'APP PROPIA',
      realExample: 'Cliente ve "App de [TU NOMBRE]" en su teléfono. Branding nivel Netflix. Fidelización x10.'
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: 'Tu web de reservas en 10 minutos',
      description: 'Micrositio profesional con TU dominio, calendario online, pagos integrados, lead capture. No code, no diseñador, no developer. Arrastra, personaliza, publica. Tu web trabajando 24/7.',
      highlight: 'WEB',
      realExample: 'tuEntrenamiento.com/reserva → Clientes reservan y pagan solos. Tú ni te enteras hasta que ves el dinero.'
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: 'Automatizaciones (para dejar de currarte TODO)',
      description: 'Flujos de onboarding, reactivación, upsell. Email/SMS automáticos según comportamiento. Cliente inactivo 7 días? Flujo automático. Cliente cumple objetivo? Upsell automático. Sin tocar nada.',
      highlight: 'AUTOMATIZACIÓN',
      realExample: 'Cliente termina mes 3: email automático ofreciendo plan anual con 20% off. Conversión 35%.'
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: 'Cursos online + Comunidad = Pasivos reales',
      description: 'LMS completo (como Kajabi pero que funciona), comunidad privada tipo red social, biblioteca de contenido ilimitado. Monetiza tu conocimiento sin estar presente. Escala a 1000+ miembros.',
      highlight: 'PASIVOS',
      realExample: 'Academia online: 300 miembros × $30/mes = $9k MRR. Tiempo invertido: 10h/mes.'
    },
    {
      icon: <Lock className="w-12 h-12 text-blue-600" />,
      title: 'De 1 a 50 gimnasios con el mismo software',
      description: 'Multi-sede ilimitada, check-in QR, control de acceso con torniquetes, kiosko autoservicio, POS integrado, inventario. Box, gimnasio boutique o cadena. El software crece contigo.',
      highlight: 'ENTERPRISE',
      realExample: 'Box con 200 miembros → 3 boxes con 600 miembros. Mismo software, 3x ingresos.'
    },
    {
      icon: <Video className="w-12 h-12 text-blue-600" />,
      title: 'Videollamadas integradas (no Zoom externo)',
      description: 'Sistema de videollamadas nativo, grabación automática, calendario integrado. Cliente reserva, paga, y entra a la sesión. Todo desde la plataforma. Cero fricciones.',
      highlight: 'ONLINE',
      realExample: 'Cliente reserva sesión online → link automático → se conecta → tú cobras. Sin Zoom, sin Calendly.'
    },
    {
      icon: <Mail className="w-12 h-12 text-blue-600" />,
      title: 'Email marketing (sin Mailchimp ni nada externo)',
      description: 'Campañas masivas, segmentación avanzada, A/B testing, automatizaciones, plantillas. Envía a 10,000 personas en un click. Open rate promedio 35% (vs 18% industria). Convierte emails en clientes.',
      highlight: 'MARKETING',
      realExample: 'Email a 500 leads: "Última oportunidad 30% off" → 47 conversiones = $8,460 en un email.'
    },
    {
      icon: <Database className="w-12 h-12 text-blue-600" />,
      title: 'Migración automática (no empieces de cero)',
      description: 'Importa desde Excel, Trainerize, TrueCoach, MyFitnessPal, lo que sea. Mapeo inteligente con IA, limpieza de datos, validación. Tu data migrada en minutos, no meses.',
      highlight: 'MIGRACIÓN',
      realExample: 'Excel con 300 clientes + 2000 sesiones → migrado en 8 minutos. Cero pérdida de data.'
    },
    {
      icon: <Code className="w-12 h-12 text-blue-600" />,
      title: 'API completa (intégralo con lo que quieras)',
      description: 'API REST completa, webhooks, Zapier, Make (Integromat). Conéctalo con tu stack. Wearables, CRMs externos, lo que necesites. El ecosistema se adapta a ti, no al revés.',
      highlight: 'INTEGRACIONES',
      realExample: 'Garmin → TrainerPro → análisis IA → ajuste automático de plan. Todo conectado.'
    }
  ];

  const testimonials = [
    {
      name: "Carlos Méndez",
      role: "Entrenador Personal • Madrid",
      image: "https://ui-avatars.com/api/?name=Carlos+Mendez&background=3b82f6&color=fff&size=128",
      text: "Antes: 15 clientes, trabajando hasta las 11 PM, respondiendo WhatsApps en la cena, $2,300/mes. Después: 78 clientes, salgo a las 6 PM, teléfono apagado después de las 8, $11,800/mes. La diferencia? TrainerPro hace el 80% del trabajo sucio.",
      results: "De $2.3k a $11.8k/mes",
      timeframe: "En 7 meses",
      metric: "412% de crecimiento"
    },
    {
      name: "Ana Rodríguez",
      role: "Coach Online • México",
      image: "https://ui-avatars.com/api/?name=Ana+Rodriguez&background=ec4899&color=fff&size=128",
      text: "Intenté montar mi academia con Kajabi. 3 meses, $5k gastados, cero alumnos. Con TrainerPro: configuré todo en 2 semanas, lancé, 300 miembros en 4 meses. El LMS funciona, la comunidad engancha, los pagos entran solos. Esto es lo que Kajabi debería ser.",
      results: "300 miembros × $35/mes",
      timeframe: "4 meses después de lanzar",
      metric: "$10,500 MRR pasivos"
    },
    {
      name: "Fit Studio Barcelona",
      role: "Box CrossFit • 2 Sedes",
      image: "https://ui-avatars.com/api/?name=Fit+Studio&background=10b981&color=fff&size=128",
      text: "El check-in QR eliminó 8 horas/semana de trabajo de recepción. Los pagos automáticos redujeron morosos de 18% a 3%. Las automatizaciones recuperan clientes inactivos (22% de reactivación). Con ese tiempo y ese dinero: abrimos segunda sede en 8 meses. Sin TrainerPro, imposible.",
      results: "2 sedes en 8 meses",
      timeframe: "De 180 a 420 miembros",
      metric: "18% → 3% morosos"
    },
    {
      name: "Miguel Ángel Torres",
      role: "Preparador Físico • Sevilla FC Femenino",
      image: "https://ui-avatars.com/api/?name=Miguel+Torres&background=f59e0b&color=fff&size=128",
      text: "Teníamos todo en Excel. Tests físicos, cargas, wellness. Un desastre. Cambio a TrainerPro: analytics predictivas nos avisaron que 3 jugadoras iban a lesionarse. Ajustamos cargas. Las 3 terminaron la temporada sin lesión. Solo eso vale 10 años de suscripción.",
      results: "0 lesiones prevenidas → 3 lesiones prevenidas",
      timeframe: "Primera temporada",
      metric: "IA predictiva funcionando"
    },
    {
      name: "Laura Fitness",
      role: "Influencer • 180k followers",
      image: "https://ui-avatars.com/api/?name=Laura+Fitness&background=8b5cf6&color=fff&size=128",
      text: "Monetizaba con ads de mierda: $1,500/mes. Monté mi comunidad premium en TrainerPro: rutinas exclusivas, retos mensuales, coaching grupal. 480 miembros a $25/mes. De $1,500 a $12,000 MRR. Y es todo pasivo. Solo subo contenido 2 días a la semana.",
      results: "$1.5k → $12k MRR",
      timeframe: "100% pasivo",
      metric: "480 miembros activos"
    },
    {
      name: "PowerGym Chain",
      role: "Cadena de Gimnasios • 5 Sedes",
      image: "https://ui-avatars.com/api/?name=PowerGym&background=ef4444&color=fff&size=128",
      text: "Teníamos 5 softwares diferentes. Uno por cada cosa. Un caos. Migramos todo a TrainerPro: CRM, accesos, POS, clases, facturación. Dashboard ejecutivo ve las 5 sedes en tiempo real. Ahorramos $2,800/mes en subscripciones + 35 horas/semana en trabajo manual.",
      results: "5 sedes unificadas",
      timeframe: "$2,800/mes ahorrados",
      metric: "35 horas/semana recuperadas"
    }
  ];

  const faqs = [
    {
      q: "¿Por qué no uso Trainerize, TrueCoach o cualquier otra?",
      a: "Porque esas son apps de entrenamiento, NO sistemas de negocio. No tienen CRM real, ni pipeline de ventas, ni automatizaciones, ni IA de verdad, ni app white label, ni LMS, ni multi-sede. Son herramientas. TrainerPro es el sistema operativo completo de tu negocio. La diferencia entre tener un martillo y tener una fábrica."
    },
    {
      q: "¿Realmente funciona la IA o es humo?",
      a: "No es ChatGPT con prompt bonito. Son 7 agentes especializados entrenados específicamente para fitness. El agente de training conoce +500 ejercicios, sabe periodizar, entiende de progresiones. El de nutrición calcula macros reales. El de marketing escribe copy que convierte. No es humo, es IA que realmente hace el trabajo."
    },
    {
      q: "¿Cuánto tiempo toma la migración desde Excel/otro software?",
      a: "Excel: 10-30 minutos para 300 clientes. Otras plataformas: 1-2 horas máximo. El sistema mapea los campos automáticamente, limpia duplicados, valida data. No pierdes nada. Y si tienes un caso raro: migración asistida gratis."
    },
    {
      q: "¿Los $49 son para siempre o luego sube?",
      a: "Tu precio queda congelado para siempre. Si entras hoy a $49, en 5 años sigues pagando $49 aunque el plan cueste $149. Early adopter privilege. Eso sí: la oferta es hasta que cerremos esta ronda de onboarding."
    },
    {
      q: "¿Puedo cancelar cuando quiera?",
      a: "Sí. Cancelas cuando quieras, sin penalizaciones, sin letras chicas. Exportas toda tu data en un click y te vas. Confiamos en que el producto es tan bueno que no lo vas a hacer. Pero puedes."
    },
    {
      q: "¿Qué pasa si tengo 200 clientes y mi plan es de 150?",
      a: "Nada. No cortamos el servicio. Te avisamos y puedes upgrade cuando quieras. Nunca bloqueamos tu negocio por 50 clientes de diferencia. Somos empresarios, sabemos cómo es esto."
    },
    {
      q: "¿Funciona en mi país? (Latam, España, USA...)",
      a: "Sí. Está en 15 idiomas, acepta todas las monedas, integrado con pasarelas de pago locales (MercadoPago Latam, Stripe global, Conekta México, etc). RGPD compliant (Europa), PCI DSS (USA), todo legal en todos lados."
    },
    {
      q: "¿Hay contrato largo o es mensual?",
      a: "Mes a mes. Pagas un mes, usas un mes. Cero compromisos anuales. Aunque si pagas anual te damos 2 meses gratis (20% off). Pero no es obligatorio."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection problems={problems} />
      <RealityCheckSection realityCheck={realityCheck} />
      <ProblemsSection />
      <ComparisonTable competitorComparison={competitorComparison} />
      <FeaturesSection features={features} />
      <PlansSection />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <LandingFooter />
    </div>
  );
};
