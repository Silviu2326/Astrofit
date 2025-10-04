import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap, Users, Crown, Rocket, Sparkles, Dumbbell,
  Building2, Trophy, Award, CheckCircle2, XCircle, ArrowRight,
  DollarSign, Coins, Star, TrendingUp, Database, UserCheck, AlertTriangle
} from 'lucide-react';

interface Plan {
  id: string;
  category: string;
  name: string;
  target: string;
  icon: React.ReactNode;
  tagline: string;
  painPoint: string;
  roi: string;
  limits: {
    clients: string;
    storage: string;
    users: string;
  };
  features: string[];
  realTalk: string;
  notIncluded: string[];
  popular?: boolean;
}

interface PlansGridProps {
  selectedCategory: 'solo' | 'creator' | 'studio' | 'teams';
}

export const PlansGrid: React.FC<PlansGridProps> = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const plans: Plan[] = [
    {
      id: 'core',
      category: 'base',
      name: 'CORE',
      target: 'El que NO quiere seguir perdiendo dinero',
      icon: <Zap className="w-8 h-8" />,
      tagline: 'Deja el Excel antes de que te cueste más dinero',
      painPoint: 'Estás SANGRANDO $2-5k/mes por desorganización. Cada. Puto. Mes.',
      roi: 'Se paga solo en 3 días. El resto es ganancia pura.',
      limits: {
        clients: '50 clientes (suficiente para empezar, insuficiente para escalar)',
        storage: '20 GB',
        users: '1 usuario (solo tú, campeón)'
      },
      features: [
        'CRM básico (deja el Excel de una vez)',
        'Entrenamientos y dietas ilimitados',
        'Facturación automática (cobra mientras duermes)',
        'Marketing básico que SÍ funciona',
        '3 Agentes de IA (no chatbots de mierda)',
        'Calendario inteligente',
        'Analytics que entiende tu abuela'
      ],
      realTalk: 'Si tienes menos de 50 clientes y sigues usando Excel: este es tu plan. O quiebras en 6 meses. Tú decides.',
      notIncluded: [
        'App white label',
        'Videollamadas',
        'Multi-sede',
        'Automatizaciones avanzadas'
      ]
    },
    {
      id: 'solo-pro',
      category: 'solo',
      name: 'SOLO PRO',
      target: 'Entrenadores que quieren trabajar MENOS',
      icon: <Users className="w-8 h-8" />,
      popular: true,
      tagline: 'Pasa de sobrevivir a facturar $10k/mes',
      painPoint: 'Trabajas 60 horas para ganar $3k. Algo está MAL. Muy mal.',
      roi: 'Ahorras 15h/semana = $3,600/mes de oportunidad que estás desperdiciando',
      limits: {
        clients: '150 clientes (sin volverte loco)',
        storage: '50 GB',
        users: '1 usuario'
      },
      features: [
        'Todo CORE + lo que realmente necesitas',
        'Hasta 150 clientes (sin volverte loco)',
        'Micrositio web con reservas online',
        'Videollamadas ilimitadas (no Zoom de mierda)',
        'Tracking de hábitos (adherencia real)',
        'Cupones que SÍ convierten',
        'Customer journey mapeado',
        'Inbox unificado (WhatsApp + Email + SMS)',
        'Automatizaciones que funcionan'
      ],
      realTalk: 'Si tienes +30 clientes y aún respondes WhatsApps a las 11 PM: necesitas esto YA. Tu salud mental te lo agradecerá. Tus seres queridos también.',
      notIncluded: [
        'App white label',
        'Analytics predictivas',
        'Wearables',
        'Clientes ilimitados'
      ]
    },
    {
      id: 'solo-max',
      category: 'solo',
      name: 'SOLO MAX',
      target: 'Entrenadores ELITE que facturan $15k+',
      icon: <Crown className="w-8 h-8" />,
      tagline: 'Escala a $30k/mes sin trabajar el doble',
      painPoint: 'Facturar más = trabajar más. Eso NO escala. Ese camino termina en burnout.',
      roi: 'Duplica ingresos sin duplicar horas. Eso es escalar de verdad.',
      limits: {
        clients: 'Ilimitados (hasta 500 reales sin morir)',
        storage: '200 GB',
        users: '1 usuario'
      },
      features: [
        'Todo SOLO PRO + el kit de escalabilidad',
        'Clientes ilimitados (hasta 500 reales)',
        'Analytics predictivas con IA (sabe quién se va a ir antes que tú)',
        'Motor de automatizaciones completo',
        'App móvil white label (TU marca)',
        'Dominio personalizado',
        'Integración con wearables (Apple Watch, Garmin, etc)',
        'Upsells inteligentes automáticos',
        '7 Agentes IA premium',
        'API para integraciones custom'
      ],
      realTalk: 'Si facturas +$10k/mes pero sigues haciendo todo manual: estás dejando $5-10k en la mesa cada mes. Fix that shit.',
      notIncluded: [
        'Multi-sede',
        'Programa de afiliados',
        'LMS'
      ]
    },
    {
      id: 'creator-pro',
      category: 'creator',
      name: 'CREATOR PRO',
      target: 'Influencers que quieren ingresos PASIVOS reales',
      icon: <Rocket className="w-8 h-8" />,
      popular: true,
      tagline: 'Convierte followers en $$$',
      painPoint: '100k seguidores y ganas $2k/mes. WTF. Estás regalando tu influencia.',
      roi: 'Promedio: $9-15k/mes en ingresos pasivos mientras duermes',
      limits: {
        clients: '1,000 miembros',
        storage: '500 GB',
        users: '3 usuarios'
      },
      features: [
        'Todo CORE + tu academia digital completa',
        'Hasta 1,000 miembros (comunidad + cursos)',
        'LMS completo (vende cursos como Hotmart pero sin comisiones de mierda)',
        'Comunidad privada estilo red social',
        'Email marketing masivo (sin límites)',
        'Biblioteca de contenidos ilimitada',
        'Membresías recurrentes automáticas',
        'Sistema de cupones avanzado',
        '5 Agentes IA'
      ],
      realTalk: 'Si tienes +10k seguidores y NO vendes programas online recurrentes: estás regalando dinero a Hotmart y Kajabi. Literalmente.',
      notIncluded: [
        'Programa de afiliados',
        'Tests A/B',
        'App white label',
        'Tienda merchandising'
      ]
    },
    {
      id: 'creator-max',
      category: 'creator',
      name: 'CREATOR MAX',
      target: 'Influencers ELITE ($50k+/mes)',
      icon: <Sparkles className="w-8 h-8" />,
      tagline: 'Construye tu imperio digital',
      painPoint: 'Dependes 100% de Instagram. Mañana cambia el algoritmo y quiebras. Simple.',
      roi: 'Promedio: $50k+/mes en MRR. Eso es un imperio, no un hobby.',
      limits: {
        clients: 'Ilimitados',
        storage: '2 TB',
        users: '10 usuarios'
      },
      features: [
        'Todo CREATOR PRO + el kit de imperio',
        'Miembros ilimitados (hasta 10,000 reales)',
        'Programa de afiliados completo (deja que otros vendan por ti mientras duermes)',
        'Tests A/B para optimizar TODO',
        'Tienda de merchandising integrada',
        'App móvil white label (TU marca en App Store)',
        'Automatizaciones de engagement avanzadas',
        'API completa para integraciones',
        '7 Agentes IA completos',
        'Multi-idioma',
        'Soporte prioritario'
      ],
      realTalk: 'Si tienes +100k followers y NO tienes tu propia app + academia + afiliados: estás 3 años atrás de tu competencia. Ponte las pilas.',
      notIncluded: [
        'Multi-sede',
        'Check-in físico',
        'POS'
      ]
    },
    {
      id: 'studio-pro',
      category: 'studio',
      name: 'STUDIO PRO',
      target: 'Gimnasios y Boxes que quieren profesionalizarse',
      icon: <Dumbbell className="w-8 h-8" />,
      popular: true,
      tagline: 'Deja de operar como changarro',
      painPoint: '200 miembros y no sabes cuánto ganas. En serio? Así es como quiebran los gimnasios.',
      roi: 'Reduce 20 horas admin/semana. Enfócate en lo que importa: tus miembros.',
      limits: {
        clients: '300 miembros (pasa de eso y necesitas MAX)',
        storage: '500 GB',
        users: '5 usuarios'
      },
      features: [
        'Todo CORE + gestión operativa completa',
        'Hasta 300 miembros activos',
        'Check-in con código QR',
        'Gestión de clases grupales completa',
        'Pases y contratos automatizados',
        'POS integrado (vende suplementos, ropa)',
        'Whiteboard para WODs (CrossFit)',
        'Control de asistencias',
        'Reportes financieros automáticos',
        'Multi-usuario (5 coaches)'
      ],
      realTalk: 'Si tu gimnasio tiene +50 miembros y sigues usando cuaderno para check-in: estás perdiendo $2-5k/mes en fugas. Así de simple.',
      notIncluded: [
        'Multi-sede',
        'Control de torniquetes',
        'CRM B2B corporativo',
        'Kiosko autoservicio'
      ]
    },
    {
      id: 'studio-max',
      category: 'studio',
      name: 'STUDIO MAX',
      target: 'Cadenas y Franquicias (300+ miembros)',
      icon: <Building2 className="w-8 h-8" />,
      tagline: 'Enterprise real, no juguetes',
      painPoint: 'Tienes 3 sedes y no sabes cuál pierde dinero. Probablemente las 3.',
      roi: 'Incremento 15-25% en retención. Eso son decenas de miles de dólares al año.',
      limits: {
        clients: 'Ilimitados',
        storage: '2 TB',
        users: 'Ilimitados'
      },
      features: [
        'Todo STUDIO PRO + gestión multi-sede',
        'Sedes ilimitadas (hasta 10 reales)',
        'Miembros ilimitados',
        'Control de accesos con torniquetes/biométricos',
        'CRM para empresas B2B (convenios corporativos)',
        'Inventario multi-sede avanzado',
        'Kiosko de autoservicio',
        'Reportes consolidados por sede',
        'Usuarios ilimitados con roles y permisos',
        'Soporte prioritario 12h',
        'API completa'
      ],
      realTalk: 'Si tienes 2+ sedes o +300 miembros y NO tienes control centralizado: estás sangrando dinero y ni te has dado cuenta. Fix it now.',
      notIncluded: [
        'Scouting deportivo',
        'Analytics predictivas IA',
        'Integración sensores GPS'
      ]
    },
    {
      id: 'teams-pro',
      category: 'teams',
      name: 'TEAMS PRO',
      target: 'Equipos Deportivos y Clubes',
      icon: <Trophy className="w-8 h-8" />,
      popular: true,
      tagline: 'Preparación física profesional',
      painPoint: 'Planillas en Excel y datos en servilletas. Profesional de verdad usa data.',
      roi: 'Reduce lesiones 40% con data. Menos lesiones = más victorias.',
      limits: {
        clients: '50 atletas (pasa de eso, necesitas ELITE)',
        storage: '500 GB',
        users: '5 usuarios'
      },
      features: [
        'Todo CORE adaptado a equipos deportivos',
        'Hasta 50 atletas',
        'Gestión de convocatorias',
        'Planificación por mesociclos',
        'Cuestionarios de wellness diarios',
        'Laboratorio de tests físicos',
        'Perfiles completos de atletas',
        'Sistema de roles (DT, PF, Médico, etc)',
        'Comparativas de rendimiento',
        'Reportes por posición/jugador'
      ],
      realTalk: 'Si entrenas un equipo y NO tienes data objetiva de cada atleta: estás entrenando a ciegas. Así se lesionan. Así se pierde.',
      notIncluded: [
        'Analytics predictivas IA',
        'Sistema de scouting',
        'Integración GPS/IMU',
        'Atletas ilimitados'
      ]
    },
    {
      id: 'teams-elite',
      category: 'teams',
      name: 'TEAMS ELITE',
      target: 'Alto Rendimiento y Profesionales',
      icon: <Award className="w-8 h-8" />,
      tagline: 'Lo que usan selecciones nacionales',
      painPoint: 'Juegas en primera división con herramientas de tercera. Tus rivales ya tienen esto.',
      roi: 'Ventaja competitiva real vs rivales. Data = victorias.',
      limits: {
        clients: 'Ilimitados',
        storage: '5 TB',
        users: 'Ilimitados'
      },
      features: [
        'Todo TEAMS PRO + kit de alto rendimiento',
        'Atletas ilimitados',
        'Analytics predictivas con IA (prevé lesiones antes de que pasen)',
        'Sistema completo de scouting',
        'Integración con sensores GPS/IMU en tiempo real',
        'Comparador de equipos (benchmarking)',
        'Gestión de torneos y eventos',
        'Datos en tiempo real durante partidos',
        'Video análisis integrado',
        'Usuarios ilimitados',
        'Soporte 24/7',
        'Onboarding personalizado'
      ],
      realTalk: 'Si tu club es profesional y NO usas analytics predictivas: tus rivales ya te llevan ventaja. En deportes, data = victorias. Simple.',
      notIncluded: [
        'Esto ya lo tiene TODO. Literalmente.'
      ]
    }
  ];

  const filteredPlans = selectedCategory === 'solo'
    ? plans.filter(p => ['core', 'solo-pro', 'solo-max'].includes(p.id))
    : selectedCategory === 'creator'
    ? plans.filter(p => ['core', 'creator-pro', 'creator-max'].includes(p.id))
    : selectedCategory === 'studio'
    ? plans.filter(p => ['core', 'studio-pro', 'studio-max'].includes(p.id))
    : plans.filter(p => ['core', 'teams-pro', 'teams-elite'].includes(p.id));

  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPlans.map((plan, index) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up opacity-0 ${
              plan.popular
                ? 'border-blue-500 bg-gradient-to-br from-blue-900/40 to-purple-900/40 shadow-2xl shadow-blue-500/20'
                : 'border-gray-700 bg-gray-800/50'
            }`}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full animate-pulse">
                <Star className="inline w-4 h-4 mr-1 -mt-0.5" />
                MÁS POPULAR
              </div>
            )}

            {plan.id === 'core' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                <Zap className="inline w-4 h-4 mr-1 -mt-0.5" />
                EMPIEZA AQUÍ
              </div>
            )}

            <div className="flex items-center justify-center mb-4">
              {plan.icon}
            </div>

            <h3 className="text-2xl font-black text-center mb-2">{plan.name}</h3>
            <p className="text-gray-400 text-center text-sm mb-6">{plan.target}</p>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 transition-all duration-300 hover:bg-red-900/50">
              <p className="text-red-300 font-bold text-sm mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-red-500" />
                Pain Point:
              </p>
              <p className="text-red-200 text-sm">{plan.painPoint}</p>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6 transition-all duration-300 hover:bg-green-900/50">
              <p className="text-green-300 font-bold text-sm mb-2 flex items-center">
                <Coins className="w-4 h-4 mr-1 text-green-500" />
                ROI Real:
              </p>
              <p className="text-green-200 text-sm">{plan.roi}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 text-xs mb-2 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1 text-orange-500" />
                LÍMITES:
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-300 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-400" />
                  {plan.limits.clients}
                </p>
                <p className="text-gray-300 flex items-center">
                  <Database className="w-4 h-4 mr-2 text-gray-400" />
                  {plan.limits.storage}
                </p>
                <p className="text-gray-300 flex items-center">
                  <UserCheck className="w-4 h-4 mr-2 text-blue-400" />
                  {plan.limits.users}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-white font-bold mb-3 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Incluye:
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 bg-gray-900/50 rounded-lg p-4 border border-yellow-700 transition-all duration-300 hover:bg-yellow-900/20">
              <p className="text-yellow-400 font-bold text-sm mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-yellow-500" />
                Real Talk:
              </p>
              <p className="text-gray-300 text-xs italic">{plan.realTalk}</p>
            </div>

            {plan.notIncluded.length > 0 && plan.notIncluded[0] !== 'Esto ya lo tiene TODO. Literalmente.' && (
              <div className="mb-6">
                <p className="text-red-400 font-bold mb-2 text-sm flex items-center">
                  <XCircle className="w-4 h-4 mr-1 text-red-500" />
                  NO Incluye:
                </p>
                <ul className="space-y-1">
                  {plan.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start text-xs">
                      <XCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => navigate('/login')}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              Solicitar Demo Ahora
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>

            <p className="text-center text-gray-500 text-xs mt-3">
              Hablemos de tu negocio (sin bullshit)
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm mb-4">¿Todavía no sabes cuál elegir o sigues perdiendo dinero?</p>
        <p className="text-white font-bold text-lg mb-6">
          Empieza con <span className="text-blue-400">CORE</span> o <span className="text-blue-400">[TU] PRO</span>.<br />
          Upgrade cuando lo necesites. Downgrade si te pasaste.
        </p>
        <p className="text-gray-500 text-sm">Sin permanencia. Sin penalizaciones. Sin sorpresas.</p>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(2.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};
