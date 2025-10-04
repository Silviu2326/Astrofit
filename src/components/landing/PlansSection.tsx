import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Flame, Users, Clock, Trophy, Coins, AlertTriangle, DollarSign } from 'lucide-react';

interface Plan {
  name: string;
  category: string;
  target: string;
  price: string;
  priceAnual: string;
  oldPrice: string;
  description: string;
  painPoints: string[];
  features: string[];
  limits: string;
  included: string;
  notIncluded: string;
  savings: string;
  roi: string;
  realTalk: string;
  badge: string;
}

interface UrgencyReason {
  icon: React.ReactNode;
  text: string;
  impact: string;
}

export const PlansSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'solo' | 'creator' | 'studio' | 'teams'>('solo');

  // Planes completos del sistema (9 planes)
  const allPlans: Record<string, Plan> = {
    core: {
      name: 'CORE',
      category: 'base',
      target: 'Base Universal',
      price: '$29',
      priceAnual: '$23',
      oldPrice: '$59',
      description: 'Lo mínimo para no seguir REGALANDO dinero. Si sigues en Excel, estás jodido.',
      painPoints: [
        'Estás perdiendo $500/mes en clientes por desorganización total',
        'Excel te roba 10+ horas/semana que podrías usar para vender',
        'Morosos que nunca cobras: $300-800/mes PERDIDOS para siempre'
      ],
      features: [
        'Hasta 50 clientes activos',
        'CRM básico + gestión de leads',
        'Entrenamientos ilimitados (biblioteca +500 ejercicios)',
        'Planes nutricionales básicos',
        'Calendario con recordatorios automáticos',
        'Facturación y cobros (Stripe, PayPal)',
        '1 Agente de IA (Copiloto Training)',
        'App móvil para clientes',
        '20 GB almacenamiento',
        'NO tiene: CRM avanzado, automatizaciones, email marketing'
      ],
      limits: '50 clientes. Si tienes más: SOLO PRO.',
      included: 'CRM + Training + Nutrition + Pagos',
      notIncluded: 'LMS, Comunidad, Multi-sede, Equipos',
      savings: 'Ahorras $1,200/mes vs Excel + apps sueltas',
      roi: '41x ROI primer mes ($29 vs $1,200 ahorrados)',
      realTalk: 'Si tienes más de 10 clientes y sigues en Excel: estás REGALANDO dinero. $29/mes o seguir perdiendo $1,200/mes. Tú decides.',
      badge: ''
    },
    soloPro: {
      name: 'SOLO PRO',
      category: 'solo',
      target: 'Entrenadores Personales',
      price: '$79',
      priceAnual: '$63',
      oldPrice: '$159',
      description: 'Para entrenadores que quieren escalar a 100+ clientes sin morir siendo esclavo de su propio negocio.',
      painPoints: [
        'Trabajas 14h/día pero sigues facturando mierda ($2-3k/mes)',
        'Respondes WhatsApps hasta las 11 PM como un desesperado',
        'Cada rutina te toma 2-3 horas hacer (¿en serio?)',
        'Pierdes 70% de leads porque no tienes sistema de seguimiento'
      ],
      features: [
        'Todo de CORE +',
        'Hasta 150 clientes activos',
        'CRM PRO + Pipeline de ventas visual',
        'Lead scoring automático (quién está listo para comprar)',
        '3 Agentes de IA (Training + Nutrition + Marketing)',
        'Automatizaciones básicas (seguimiento, recordatorios)',
        'Micrositio web con reservas online',
        'Videollamadas integradas (no Zoom)',
        'Inbox unificado (WhatsApp + Email + SMS)',
        'Analytics completos',
        '50 GB almacenamiento',
        'NO tiene: LMS, Comunidad, Multi-sede'
      ],
      limits: '150 clientes. Más? Upgrade a SOLO MAX.',
      included: 'Todo CORE + CRM PRO + Automatizaciones + Web',
      notIncluded: 'LMS, Comunidad, Multi-sede',
      savings: 'Recupera 15 horas/semana = $3,600/mes',
      roi: '45x ROI ($79 vs $3,600 recuperados)',
      realTalk: 'Si tienes 30+ clientes y sigues usando Excel/WhatsApp: estás dejando $3-5k/mes en la mesa. Este plan se paga solo en 1 semana o sigues siendo esclavo de tu negocio.',
      badge: 'MÁS POPULAR'
    },
    soloMax: {
      name: 'SOLO MAX',
      category: 'solo',
      target: 'Entrenadores Elite',
      price: '$149',
      priceAnual: '$119',
      oldPrice: '$299',
      description: 'Para entrenadores serios que quieren facturar 6 cifras y dejar de vender tiempo por dinero.',
      painPoints: [
        'Ya tienes 100+ clientes pero el sistema colapsa (eres el cuello de botella)',
        'Necesitas automatizar TODO o vas a explotar',
        'Quieres ingresos pasivos REALES (no los del coach de Instagram)'
      ],
      features: [
        'Todo de SOLO PRO +',
        'Clientes ILIMITADOS (200, 500, 1000... los que quieras)',
        '7 Agentes de IA (TODOS)',
        'Automatizaciones avanzadas (flujos complejos)',
        'LMS completo (tu academia online)',
        'Comunidad privada (monetiza tu audiencia)',
        'Email marketing masivo (10k+ emails)',
        'Sistema de afiliados',
        'A/B testing',
        'App white label (tu marca en App Store)',
        '200 GB almacenamiento',
        'Soporte prioritario'
      ],
      limits: 'Sin límites. Escala a infinito.',
      included: 'Todo SOLO PRO + LMS + Comunidad + Afiliados',
      notIncluded: 'Multi-sede (eso es STUDIO), Equipos (eso es TEAMS)',
      savings: '$9-15k/mes en ingresos pasivos',
      roi: 'ROI infinito (ingresos pasivos > costo)',
      realTalk: 'Si ya facturas $5k+/mes: este plan te lleva a $15-30k/mes. Si no tienes 50+ clientes: todavía no lo necesitas. SOLO PRO primero.',
      badge: ''
    },
    creatorPro: {
      name: 'CREATOR PRO',
      category: 'creator',
      target: 'Influencers & Creadores',
      price: '$129',
      priceAnual: '$103',
      oldPrice: '$259',
      description: 'Para influencers cansados de ganar mierda con ads. Monetiza tu audiencia con comunidad premium.',
      painPoints: [
        'Tienes 50k+ seguidores pero solo ganas $1-2k/mes con ads de mierda',
        'Intentaste Patreon/OnlyFans y no funciona (no tienes sistema)',
        'Quieres ingresos recurrentes REALES, no migajas de patrocinadores'
      ],
      features: [
        'Todo de CORE +',
        'Hasta 1,000 miembros activos',
        'LMS completo (tu academia online tipo Kajabi)',
        'Comunidad privada (tipo red social)',
        'Sistema de membresías recurrentes',
        'Email marketing masivo',
        'Biblioteca de contenido ilimitada',
        'Sistema de afiliados',
        'Landing pages ilimitadas',
        'A/B testing',
        'App white label',
        '5 Agentes IA',
        '100 GB almacenamiento'
      ],
      limits: '1,000 miembros. Más? CREATOR MAX.',
      included: 'LMS + Comunidad + Membresías + Marketing',
      notIncluded: 'Multi-sede, Equipos',
      savings: '$9-15k/mes promedio en MRR',
      roi: '93x ROI ($129 vs $12k MRR promedio)',
      realTalk: 'Si tienes 20k+ seguidores y no estás haciendo $10k+/mes: estás REGALANDO dinero. Monta tu comunidad premium y cobra lo que vales o sigue mendigando patrocinadores.',
      badge: 'MÁS POPULAR'
    },
    creatorMax: {
      name: 'CREATOR MAX',
      category: 'creator',
      target: 'Influencers Elite',
      price: '$299',
      priceAnual: '$239',
      oldPrice: '$599',
      description: 'Para influencers grandes (100k+ seguidores) que quieren construir un imperio digital de verdad.',
      painPoints: [
        'Ya tienes audiencia masiva pero ingresos inconsistentes (vives en montaña rusa)',
        'Quieres escalar a 5,000+ miembros pagando (números reales)',
        'Necesitas CERO límites técnicos para crecer sin frenos'
      ],
      features: [
        'Todo de CREATOR PRO +',
        'Miembros ILIMITADOS',
        '7 Agentes IA (TODOS)',
        'Automatizaciones avanzadas',
        'Email marketing ILIMITADO',
        'Webinars en vivo integrados',
        'Sistema de certificaciones',
        'Multi-idioma',
        'API completa (integraciones custom)',
        'White label TOTAL (tu dominio, tu marca)',
        '500 GB almacenamiento',
        'Soporte 24/7 prioritario',
        'Account manager dedicado'
      ],
      limits: 'Sin límites. Escala a millones.',
      included: 'Todo CREATOR PRO + Sin límites + Account Manager',
      notIncluded: 'Multi-sede (eso es STUDIO)',
      savings: '$30-100k/mes en MRR (casos reales)',
      roi: '300x+ ROI posible',
      realTalk: 'Si no tienes 100k+ seguidores o 500+ miembros pagando: todavía no lo necesitas. CREATOR PRO primero. Este es para los grandes.',
      badge: ''
    },
    studioPro: {
      name: 'STUDIO PRO',
      category: 'studio',
      target: 'Gimnasios & Boxes',
      price: '$179',
      priceAnual: '$143',
      oldPrice: '$359',
      description: 'Para gimnasios que quieren automatizar operaciones y abrir más sedes sin perder la cordura.',
      painPoints: [
        'Staff pierde 20h/semana en tareas manuales estúpidas',
        '15-20% de morosos cada mes (dinero que NUNCA vas a cobrar)',
        'Check-ins manuales = caos total y clientes frustrados',
        'Quieres abrir 2da sede pero tu sistema actual no escala'
      ],
      features: [
        'Todo de CORE +',
        'Hasta 300 miembros activos',
        'Check-in QR automático',
        'Gestión de clases grupales',
        'POS integrado (punto de venta)',
        'Sistema de pases y contratos',
        'Multi-sede ILIMITADA (1, 5, 20 sedes)',
        'Control de accesos (torniquetes)',
        'Kiosko de autoservicio',
        'Inventario avanzado',
        'Reportes por sede',
        '3 Agentes IA',
        '100 GB almacenamiento'
      ],
      limits: '300 miembros. Más? STUDIO MAX.',
      included: 'Multi-sede + Check-in + POS + Clases',
      notIncluded: 'LMS avanzado, Comunidad grande',
      savings: '25 horas/semana de staff = $6,000/mes',
      roi: '33x ROI ($179 vs $6,000 ahorrados)',
      realTalk: 'Si tienes 100+ miembros y sigues con papel/Excel: estás perdiendo $5-10k/mes. Este plan se paga solo en check-ins automatizados.',
      badge: 'MÁS POPULAR'
    },
    studioMax: {
      name: 'STUDIO MAX',
      category: 'studio',
      target: 'Cadenas & Franquicias',
      price: '$399',
      priceAnual: '$319',
      oldPrice: '$799',
      description: 'Para cadenas de gimnasios (3+ sedes) que necesitan control total centralizado o van a colapsar.',
      painPoints: [
        'Tienes 3+ sedes pero cada una es un caos diferente (no hay estandarización)',
        'No sabes qué pasa en cada sede en tiempo real (te enteras cuando ya es tarde)',
        'Necesitas estandarizar procesos YA o el negocio se va al carajo'
      ],
      features: [
        'Todo de STUDIO PRO +',
        'Miembros ILIMITADOS',
        'Sedes ILIMITADAS',
        'Dashboard ejecutivo multi-sede',
        'Roles y permisos avanzados (por sede/rol)',
        '7 Agentes IA (TODOS)',
        'Automatizaciones enterprise',
        'Integraciones custom (API completa)',
        'Analytics predictivas IA',
        'Sistema de franquicias',
        'White label total',
        '1 TB almacenamiento',
        'Soporte 24/7 prioritario',
        'Account manager dedicado'
      ],
      limits: 'Sin límites. 50 sedes? No problem.',
      included: 'Todo STUDIO PRO + Ilimitado + Account Manager',
      notIncluded: 'Nada. Es todo.',
      savings: '$15-30k/mes en operaciones',
      roi: '50x+ ROI posible',
      realTalk: 'Si tienes menos de 3 sedes: no lo necesitas. STUDIO PRO primero. Este es para cadenas serias que mueven $100k+/mes.',
      badge: ''
    },
    teamsPro: {
      name: 'TEAMS PRO',
      category: 'teams',
      target: 'Equipos Deportivos',
      price: '$249',
      priceAnual: '$199',
      oldPrice: '$499',
      description: 'Para preparadores físicos de equipos que quieren resultados medibles, no "sensaciones".',
      painPoints: [
        'Todo en Excel: tests, cargas, wellness = CAOS absoluto',
        'No puedes predecir lesiones (y después te preguntas por qué pasan)',
        'No sabes si el entrenamiento funciona (cero datos, cero mejora)'
      ],
      features: [
        'Todo de CORE adaptado para equipos +',
        'Hasta 50 atletas profesionales',
        'Gestión de convocatorias',
        'Batería completa de tests físicos',
        'Planificación por mesociclos',
        'Cuestionarios de wellness diarios',
        'Comparador de rendimiento',
        'Sistema de scouting básico',
        'Reportes por jugador/posición',
        '3 Agentes IA especializados en deporte',
        'Integración básica GPS/IMU',
        '100 GB almacenamiento'
      ],
      limits: '50 atletas. Más? TEAMS ELITE.',
      included: 'Tests + Wellness + Planificación + Scouting',
      notIncluded: 'Analytics IA predictivas, Multi-equipo',
      savings: 'Previene 2-3 lesiones/año = $50-150k ahorrados',
      roi: '200x+ ROI (una lesión prevenida paga años)',
      realTalk: 'Si entrenas equipos y sigues en Excel: estás JUGANDO con la salud de tus atletas. Una lesión por mala gestión de cargas te cuesta $50k+. Esto cuesta $249/mes.',
      badge: 'MÁS POPULAR'
    },
    teamsElite: {
      name: 'TEAMS ELITE',
      category: 'teams',
      target: 'Alto Rendimiento',
      price: '$599',
      priceAnual: '$479',
      oldPrice: '$1199',
      description: 'Para equipos profesionales de elite que buscan ventaja competitiva con IA predictiva.',
      painPoints: [
        'Necesitas predecir lesiones ANTES de que pasen (no después)',
        'Entrenas varios equipos/categorías (el caos se multiplica)',
        'Necesitas ventaja competitiva vs rivales (o te comen vivo)'
      ],
      features: [
        'Todo de TEAMS PRO +',
        'Atletas ILIMITADOS',
        'Equipos ILIMITADOS',
        'Analytics predictivas con IA (predice lesiones)',
        '7 Agentes IA especializados deporte',
        'Integración avanzada GPS/IMU/wearables',
        'Sistema completo de scouting',
        'Video analysis integrado',
        'Comparador vs equipos rivales',
        'Gestión de torneos/competencias',
        'Dashboard ejecutivo multi-equipo',
        '500 GB almacenamiento',
        'Soporte 24/7 prioritario',
        'Account manager + Sports scientist'
      ],
      limits: 'Sin límites. 10 equipos? 500 atletas? Adelante.',
      included: 'Todo TEAMS PRO + IA Predictiva + Ilimitado',
      notIncluded: 'Nada. Es el top absoluto.',
      savings: 'Ventaja competitiva: invaluable',
      roi: 'Previene 1 lesión de crack = ROI de 10 años',
      realTalk: 'Si no tienes presupuesto de equipo profesional ($500k+/año): no lo necesitas. TEAMS PRO primero. Esto es para equipos serios de Primera División.',
      badge: ''
    }
  };

  // Función para obtener planes según categoría
  const getPlansForCategory = (category: 'solo' | 'creator' | 'studio' | 'teams') => {
    const categoryPlans = Object.values(allPlans).filter(plan => plan.category === category);
    return [allPlans.core, ...categoryPlans];
  };

  const urgencyReasons: UrgencyReason[] = [
    { icon: <Flame className="w-6 h-6" />, text: "El precio sube $20/mes el 15 de Octubre", impact: "Pierdes $240/año" },
    { icon: <Users className="w-6 h-6" />, text: "Solo aceptamos 50 nuevos usuarios esta semana", impact: "Después: lista de espera" },
    { icon: <Clock className="w-6 h-6" />, text: "Cada día sin sistema pierdes clientes", impact: "~$150-300/día perdidos" },
    { icon: <Trophy className="w-6 h-6" />, text: "Early adopters: precio congelado forever", impact: "Los demás pagarán 3x" }
  ];

  return (
    <section id="planes" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgency Banner */}
        <div className="bg-red-600 border-2 border-red-400 rounded-2xl p-6 mb-12 max-w-4xl mx-auto animate-pulse">
          <p className="text-center text-2xl font-black mb-4 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            ÚLTIMO AVISO: PRECIO SUBE EN 72 HORAS
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {urgencyReasons.map((reason, idx) => (
              <div key={idx} className="bg-red-700/50 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-2">{reason.icon}</div>
                <p className="text-sm font-bold mb-1">{reason.text}</p>
                <p className="text-xs text-red-200">{reason.impact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            9 planes. Un objetivo.
            <span className="block text-blue-400 mt-2">Que ESCALES o te quedes fuera del mercado.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Desde $29/mes (base) hasta $599/mes (alto rendimiento). El software crece contigo o te quedas atrás.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('solo')}
            className={`px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 ${
              selectedCategory === 'solo'
                ? 'bg-blue-600 text-white scale-105 shadow-2xl'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
            }`}
          >
            SOLO (Entrenadores)
          </button>
          <button
            onClick={() => setSelectedCategory('creator')}
            className={`px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 ${
              selectedCategory === 'creator'
                ? 'bg-blue-600 text-white scale-105 shadow-2xl'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
            }`}
          >
            CREATOR (Influencers)
          </button>
          <button
            onClick={() => setSelectedCategory('studio')}
            className={`px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 ${
              selectedCategory === 'studio'
                ? 'bg-blue-600 text-white scale-105 shadow-2xl'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
            }`}
          >
            STUDIO (Gimnasios)
          </button>
          <button
            onClick={() => setSelectedCategory('teams')}
            className={`px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 ${
              selectedCategory === 'teams'
                ? 'bg-blue-600 text-white scale-105 shadow-2xl'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
            }`}
          >
            TEAMS (Equipos)
          </button>
        </div>

        {/* Planes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {getPlansForCategory(selectedCategory).map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white text-gray-900 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 ${
                plan.badge ? 'border-4 border-yellow-400 ring-4 ring-yellow-400/20' : 'border-2 border-gray-200'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-pulse">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full text-sm font-black shadow-lg flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-black mb-2">{plan.name}</h3>
                <p className="text-blue-600 font-bold text-lg mb-4">{plan.target}</p>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-gray-400 line-through">{plan.oldPrice}</span>
                    <span className="text-5xl font-black text-blue-600">{plan.price}</span>
                    <span className="text-xl text-gray-600">/mes</span>
                  </div>
                  <p className="text-sm text-green-600 font-bold">
                    ${plan.priceAnual}/mes anual (20% OFF)
                  </p>
                </div>

                <p className="text-base text-gray-700 leading-relaxed">{plan.description}</p>
              </div>

              {/* Pain Points */}
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded hover:bg-red-100 transition-colors duration-300">
                <p className="text-xs font-black text-red-700 mb-2 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  SIN ESTO:
                </p>
                <div className="space-y-1">
                  {plan.painPoints.map((pain, i) => (
                    <p key={i} className="text-xs text-red-700">{pain}</p>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {feature.startsWith('NO tiene') ? (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>

              {/* ROI */}
              <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-4 hover:bg-green-100 transition-colors duration-300">
                <p className="text-xs text-green-700 mb-1 flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  Retorno:
                </p>
                <p className="text-lg font-black text-green-700 mb-2">{plan.savings}</p>
                <p className="text-xs text-green-700 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {plan.roi}
                </p>
              </div>

              {/* Real Talk */}
              <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded hover:bg-yellow-100 transition-colors duration-300">
                <p className="text-xs font-black text-yellow-800 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  REAL TALK:
                </p>
                <p className="text-xs text-yellow-800 leading-relaxed">{plan.realTalk}</p>
              </div>

              {/* Limits & Included */}
              <div className="mb-6 text-xs space-y-2">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-black text-gray-700 mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    LÍMITES:
                  </p>
                  <p className="text-gray-700">{plan.limits}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-black text-blue-700 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    INCLUYE:
                  </p>
                  <p className="text-blue-700">{plan.included}</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-black text-red-700 mb-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    NO INCLUYE:
                  </p>
                  <p className="text-red-700">{plan.notIncluded}</p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate('/login')}
                className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-300 shadow-lg hover:scale-105 ${
                  plan.badge
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Empezar con {plan.name}
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">14 días gratis · Sin tarjeta · Cancela cuando quieras</p>
            </div>
          ))}
        </div>

        {/* Plan Comparison Helper */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-3xl font-black mb-4">¿No sabes cuál elegir?</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <p className="font-black text-2xl mb-2">CORE</p>
              <p className="text-sm text-gray-300">Si tienes menos de 50 clientes y aún usas Excel</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <p className="font-black text-2xl mb-2">PRO</p>
              <p className="text-sm text-gray-300">Si tienes 50-150 clientes y quieres escalar</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <p className="font-black text-2xl mb-2">MAX</p>
              <p className="text-sm text-gray-300">Si ya facturas $5k+/mes y quieres llegar a $20k+</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <p className="font-black text-2xl mb-2">ELITE</p>
              <p className="text-sm text-gray-300">Si eres equipo profesional o cadena multi-sede</p>
            </div>
          </div>
          <p className="text-gray-300 mt-6 text-sm flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            ¿Dudas? Todos los planes tienen 14 días gratis. Prueba y decide.
          </p>
        </div>
      </div>
    </section>
  );
};
