import React from 'react';
import {
  Dumbbell, Users, Brain, DollarSign, MessageSquare, Zap, Globe, Target,
  CheckCircle2, TrendingUp, XCircle
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  category: string;
}

interface Feature {
  name: string;
  description: string;
  metric: string;
}

interface Module {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  titleIsra: string;
  painPoint: string;
  features: Feature[];
  realTalk: string;
  availableIn: string[];
}

interface ModulesSectionProps {
  selectedCategory: 'solo' | 'creator' | 'studio' | 'teams';
}

export const ModulesSection: React.FC<ModulesSectionProps> = ({ selectedCategory }) => {
  // Los 9 planes del sistema
  const allPlans: Plan[] = [
    { id: 'core', name: 'CORE', category: 'base' },
    { id: 'solo-pro', name: 'SOLO PRO', category: 'solo' },
    { id: 'solo-max', name: 'SOLO MAX', category: 'solo' },
    { id: 'creator-pro', name: 'CREATOR PRO', category: 'creator' },
    { id: 'creator-max', name: 'CREATOR MAX', category: 'creator' },
    { id: 'studio-pro', name: 'STUDIO PRO', category: 'studio' },
    { id: 'studio-max', name: 'STUDIO MAX', category: 'studio' },
    { id: 'teams-pro', name: 'TEAMS PRO', category: 'teams' },
    { id: 'teams-elite', name: 'TEAMS ELITE', category: 'teams' }
  ];

  // 8 Módulos principales del sistema
  const modules: Module[] = [
    {
      id: 'crm',
      name: 'CRM & Ventas',
      icon: <Users className="w-12 h-12" />,
      color: 'blue',
      titleIsra: 'Deja de perder leads como un puto amateur',
      painPoint: 'Pierdes $5-10k/mes en leads que desaparecen en tu WhatsApp. Pain real.',
      features: [
        {
          name: 'Pipeline Visual Kanban',
          description: 'Drag & drop. Lead scoring automático. Sabes exactamente quién está listo para comprar.',
          metric: 'Conversión: de 18% a 47% promedio'
        },
        {
          name: 'Ficha 360° del Cliente',
          description: 'Toda la info en UN sitio: datos, entrenamientos, pagos, mensajes, documentos, historial completo.',
          metric: 'Vista completa en 1 click'
        },
        {
          name: 'Seguimiento Automático',
          description: 'Email día 1, WhatsApp día 3, llamada día 7. El sistema persigue leads por ti. Tú solo cierras.',
          metric: '70% de leads recuperados automáticamente'
        },
        {
          name: 'Analytics Predictivas con IA',
          description: 'Sabe qué cliente va a cancelar ANTES de que pase. Activa flujo de retención solo.',
          metric: '22% menos churn, $3-8k/mes salvados'
        }
      ],
      realTalk: 'Si guardas leads en Excel o notas de iPhone: estás regalando $500-1k/mes mínimo. Fix that.',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'training',
      name: 'Training (Entrenamientos)',
      icon: <Dumbbell className="w-12 h-12" />,
      color: 'purple',
      titleIsra: 'Rutinas en 3 minutos, no en 3 puta horas',
      painPoint: 'Gastas 10-15 horas/semana programando rutinas. Eso son $2-4k que NO facturas.',
      features: [
        {
          name: 'Biblioteca +500 Ejercicios HD',
          description: 'Videos profesionales, instrucciones, músculos trabajados. Drag & drop. Cero diseño desde cero.',
          metric: '500+ ejercicios listos para usar'
        },
        {
          name: 'Plantillas por Objetivo',
          description: 'Hipertrofia, fuerza, pérdida grasa, funcional, CrossFit. Copy/paste, personaliza, done.',
          metric: 'Ahorra 10 horas/semana en programación'
        },
        {
          name: 'Progresiones Automáticas',
          description: 'El sistema ajusta cargas según progreso. Periodización lineal, ondulada, block. Tú solo supervises.',
          metric: 'Progresión inteligente sin calculadora'
        },
        {
          name: 'Tracking en Tiempo Real',
          description: 'Cliente completa sesión, tú ves datos al instante. PRs, volumen, intensidad, todo.',
          metric: 'Adherencia +35%, resultados +50%'
        }
      ],
      realTalk: 'Si tardas más de 30 minutos en hacer una rutina de 4 días: estás perdiendo tiempo = dinero. Simple.',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'nutrition',
      name: 'Nutrition (Nutrición)',
      icon: <Target className="w-12 h-12" />,
      color: 'green',
      titleIsra: 'Planes nutricionales sin ser nutricionista',
      painPoint: 'Mandas "come limpio" como consejo nutricional. Tus clientes no ven resultados y se van. Pain brutal.',
      features: [
        {
          name: 'Calculadora Automática',
          description: 'TMB, TDEE, macros por objetivo. Plan completo generado en 30 segundos, no 2 horas.',
          metric: 'Plan nutricional completo en 90 segundos'
        },
        {
          name: 'Banco de +300 Recetas',
          description: 'Recetas con macros calculados. Crea menús semanales en minutos. Exporta PDF para cliente.',
          metric: '300+ recetas listas con macros'
        },
        {
          name: 'Tracking de Adherencia',
          description: 'Cliente sube foto de comida, IA valida si cumple macros. Alertas si se desvía.',
          metric: 'Adherencia +40% con validación IA'
        },
        {
          name: 'Lista de Compras Auto',
          description: 'Plan nutricional genera lista de supermercado automática. Exporta PDF en 1 click.',
          metric: 'Cliente sabe QUÉ comprar exactamente'
        }
      ],
      realTalk: 'Si no das nutrición estructurada pierdes 50% de resultados. Y clientes que pagan $200/mes se van a la mierda.',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'finance',
      name: 'Finance (Finanzas)',
      icon: <DollarSign className="w-12 h-12" />,
      color: 'yellow',
      titleIsra: 'Cobra mientras duermes (literal, no metáfora de coach)',
      painPoint: '30% de morosos promedio. Pierdes $3-8k/mes persiguiendo pagos como idiota. Ridículo.',
      features: [
        {
          name: 'Cobros Recurrentes Automáticos',
          description: 'Stripe, PayPal, MercadoPago. Cliente paga solo. Tú solo ves el dinero entrar.',
          metric: '98% cobro vs 70% manual. +$5k/mes'
        },
        {
          name: 'Control de Morosos',
          description: 'Auto-recordatorio día 1, 3, 5. Auto-suspensión día 7. Sin perseguir a nadie manualmente.',
          metric: 'Morosos: de 30% a 3%. Brutal.'
        },
        {
          name: 'Facturación Fiscal Automática',
          description: 'Facturas fiscales generadas solas. Cumple con SUNAT, SAT, AFIP, lo que necesites.',
          metric: 'Facturas en 1 click, legales'
        },
        {
          name: 'Dashboards Financieros',
          description: 'MRR, ingresos por producto, forecasting, LTV, churn rate. Sabes si ganas o pierdes.',
          metric: 'Visibilidad total de tu negocio'
        }
      ],
      realTalk: 'Si persigues pagos por WhatsApp: trabajas GRATIS. El sistema cobra por ti o quiebras. Así de simple.',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'communication',
      name: 'Communication (Comunicaciones)',
      icon: <MessageSquare className="w-12 h-12" />,
      color: 'pink',
      titleIsra: 'Deja de dar tu número personal (en serio)',
      painPoint: 'Respondes WhatsApps a las 11 PM de clientes borrachos. Tu vida personal no existe. Pain brutal.',
      features: [
        {
          name: 'Inbox Unificado',
          description: 'WhatsApp Business API, SMS, email, Instagram DMs. TODO en un inbox. Cero pestañas.',
          metric: 'Un solo inbox para TODO'
        },
        {
          name: 'Chatbot IA 24/7',
          description: 'Responde preguntas frecuentes automático. Horarios, precios, disponibilidad. Solo intervienes si es importante.',
          metric: '80% consultas resueltas sin ti'
        },
        {
          name: 'Respuestas Rápidas',
          description: 'Templates con variables dinámicas. Nombre, plan, próxima sesión. Personaliza en 2 seg.',
          metric: 'Ahorra 5 horas/semana respondiendo'
        },
        {
          name: 'Horarios No Molestar',
          description: 'Fuera de horario: bot responde automático. Tu número personal NUNCA se da.',
          metric: 'Vida personal: RECUPERADA'
        }
      ],
      realTalk: 'Si clientes te escriben de noche: NO tienes negocio, tienes esclavitud. Automation fixes that shit.',
      availableIn: ['solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'automation',
      name: 'Automation (Automatizaciones)',
      icon: <Zap className="w-12 h-12" />,
      color: 'orange',
      titleIsra: 'Para dejar de currarte TODO manualmente',
      painPoint: 'Haces TODO manual: bienvenida, seguimiento, reactivación. 15 horas/semana perdidas = $3k/mes tirados.',
      features: [
        {
          name: 'Flujos de Onboarding',
          description: 'Cliente nuevo → email bienvenida → asignación plan → recordatorio primera sesión. 100% automático.',
          metric: 'Onboarding 100% automatizado'
        },
        {
          name: 'Reactivación Automática',
          description: 'Cliente inactivo 7 días → email → WhatsApp día 10 → oferta especial día 14. Sin levantar un dedo.',
          metric: '22% reactivación vs 5% manual'
        },
        {
          name: 'Upsells Inteligentes',
          description: 'Cliente cumple objetivo → oferta plan superior. Cliente mes 3 → plan anual 20% off.',
          metric: '35% conversión upsell automático'
        },
        {
          name: 'Triggers por Comportamiento',
          description: 'Asistencia baja → email motivacional. PRs nuevos → felicitación. Cumpleaños → descuento.',
          metric: 'Engagement +45% sin esfuerzo'
        }
      ],
      realTalk: 'Si haces seguimiento manual estás trabajando EN tu negocio, no EN escalar. Big fucking difference.',
      availableIn: ['solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'ia',
      name: 'IA (7 Agentes de Inteligencia Artificial)',
      icon: <Brain className="w-12 h-12" />,
      color: 'indigo',
      titleIsra: 'No chatbots de mierda. IA REAL que trabaja.',
      painPoint: 'Haces TODO tú: rutinas, planes, copys, análisis. Es como tener 7 empleados gratis. Literal.',
      features: [
        {
          name: 'Agente Copiloto (Training IA)',
          description: 'Crea rutinas completas en 45 segundos. Entiende de periodización, progresiones, objetivos específicos.',
          metric: 'Rutina 4 días en 45 segundos'
        },
        {
          name: 'Agente Nutricionista (Nutrition IA)',
          description: 'Calcula macros, crea planes nutricionales, ajusta según progreso. Como tener nutricionista IA.',
          metric: 'Plan completo en 90 segundos'
        },
        {
          name: 'Agente Financiero (Finance IA)',
          description: 'Analiza tu negocio, detecta fugas de dinero, sugiere optimizaciones de pricing y churn.',
          metric: 'Encuentra $500-2k/mes en fugas'
        },
        {
          name: 'Agente Marketing (Growth IA)',
          description: 'Escribe posts, emails, copys que convierten. Optimiza campañas solo. Testea headlines.',
          metric: 'Open rate +65% con copys IA'
        }
      ],
      realTalk: 'ChatGPT es un juguete para hacer chistes. Estos agentes están entrenados en fitness y entienden TU negocio específico.',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'online',
      name: 'Online (Cursos, Comunidad, App)',
      icon: <Globe className="w-12 h-12" />,
      color: 'cyan',
      titleIsra: 'Escala a 1000+ clientes sin trabajar 80h/semana',
      painPoint: 'Quieres ingresos pasivos pero no sabes cómo. Hotmart te roba 20% comisión. WTF.',
      features: [
        {
          name: 'App White Label (Tu Marca)',
          description: 'App con TU marca en App Store y Play Store. Como si hubieras invertido $50k en desarrollo.',
          metric: 'App propia incluida (iOS + Android)'
        },
        {
          name: 'Micrositio Web con Reservas',
          description: 'Web con TU dominio. Calendario, pagos online, lead capture. Setup en 10 minutos.',
          metric: 'Web funcionando en 10 minutos'
        },
        {
          name: 'LMS Completo (Academia Online)',
          description: 'Tu academia digital. Cursos, lecciones, quizzes, certificados. Como Kajabi pero sin pagar $3k.',
          metric: 'Escala a 1000+ alumnos sin límites'
        },
        {
          name: 'Comunidad Privada',
          description: 'Feed tipo Instagram/Facebook. Posts, comentarios, likes. Tu tribu en TU plataforma, no Zuck.',
          metric: 'Engagement orgánico en tu app'
        }
      ],
      realTalk: 'Si tienes +50 clientes y NO tienes app: estás dejando $5-10k/mes en la mesa. Real fucking talk.',
      availableIn: ['solo-max', 'creator-pro', 'creator-max', 'studio-max']
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          8 Módulos que trabajan por ti
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          No son herramientas sueltas. Es un SISTEMA completo.<br />
          Cada módulo habla con los demás. Automation real.
        </p>
      </div>

      <div className="space-y-16">
        {modules.map((module, idx) => {
          const availablePlansForCategory = allPlans.filter(plan =>
            module.availableIn.includes(plan.id) &&
            (plan.category === 'base' || plan.category === selectedCategory)
          );

          return (
            <div
              key={module.id}
              className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Module Header */}
              <div className={`bg-gradient-to-r ${
                module.color === 'blue' ? 'from-blue-900/60 to-blue-800/60' :
                module.color === 'purple' ? 'from-purple-900/60 to-purple-800/60' :
                module.color === 'green' ? 'from-green-900/60 to-green-800/60' :
                module.color === 'yellow' ? 'from-yellow-900/60 to-yellow-800/60' :
                module.color === 'pink' ? 'from-pink-900/60 to-pink-800/60' :
                module.color === 'orange' ? 'from-orange-900/60 to-orange-800/60' :
                module.color === 'indigo' ? 'from-indigo-900/60 to-indigo-800/60' :
                'from-cyan-900/60 to-cyan-800/60'
              } p-8 border-b-2 border-gray-700`}>
                <div className="flex items-center gap-6 mb-4">
                  <div className={`p-4 rounded-xl transition-transform duration-300 hover:scale-110 hover:rotate-6 ${
                    module.color === 'blue' ? 'bg-blue-600' :
                    module.color === 'purple' ? 'bg-purple-600' :
                    module.color === 'green' ? 'bg-green-600' :
                    module.color === 'yellow' ? 'bg-yellow-600' :
                    module.color === 'pink' ? 'bg-pink-600' :
                    module.color === 'orange' ? 'bg-orange-600' :
                    module.color === 'indigo' ? 'bg-indigo-600' :
                    'bg-cyan-600'
                  }`}>
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-black mb-2">{module.name}</h3>
                    <p className="text-xl md:text-2xl font-bold text-yellow-300">{module.titleIsra}</p>
                  </div>
                </div>

                {/* Pain Point */}
                <div className="bg-red-900/40 border-l-4 border-red-500 rounded-lg p-4 mb-4">
                  <p className="text-red-300 font-bold text-sm mb-1">PAIN POINT:</p>
                  <p className="text-red-100 text-base md:text-lg font-bold">{module.painPoint}</p>
                </div>
              </div>

              {/* Features */}
              <div className="p-8">
                <h4 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  4 Features Principales
                </h4>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {module.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:scale-105 hover:shadow-xl transition-all duration-300"
                      style={{ animationDelay: `${(idx * 100) + (fIdx * 50)}ms` }}
                    >
                      <h5 className="text-xl font-black mb-3 text-blue-400">{feature.name}</h5>
                      <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                      <div className="bg-green-900/30 border-l-4 border-green-500 rounded px-4 py-2">
                        <p className="text-green-300 font-bold text-sm">
                          <TrendingUp className="inline w-4 h-4 mr-1" />
                          {feature.metric}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real Talk */}
                <div className="bg-yellow-900/20 border-2 border-yellow-600 rounded-xl p-6 mb-8 hover:scale-105 transition-transform duration-300">
                  <p className="text-yellow-400 font-black text-sm mb-2">REAL TALK:</p>
                  <p className="text-yellow-100 text-lg italic font-bold">{module.realTalk}</p>
                </div>

                {/* Disponible en estos planes */}
                <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-6">
                  <p className="text-gray-400 font-bold text-sm mb-4">DISPONIBLE EN ESTOS PLANES:</p>
                  <div className="flex flex-wrap gap-3">
                    {availablePlansForCategory.map(plan => (
                      <div key={plan.id} className="flex items-center gap-2 bg-green-900/30 border border-green-700 rounded-lg px-4 py-2 hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="font-bold text-green-300">{plan.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Planes que NO lo tienen */}
                  {allPlans.filter(p => !module.availableIn.includes(p.id) && (p.category === 'base' || p.category === selectedCategory)).length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {allPlans.filter(p => !module.availableIn.includes(p.id) && (p.category === 'base' || p.category === selectedCategory)).map(plan => (
                        <div key={plan.id} className="flex items-center gap-2 bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2">
                          <XCircle className="w-5 h-5 text-gray-500" />
                          <span className="font-bold text-gray-500">{plan.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
