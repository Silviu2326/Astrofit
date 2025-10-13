import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Clock, 
  Users, 
  TrendingUp, 
  Zap,
  Brain,
  Target,
  Shield,
  Star,
  Play,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Flame,
  Skull,
  Bomb,
  MessageSquare
} from 'lucide-react';

export const EugenioOllerLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Carlos M.",
      role: "Entrenador Personal",
      location: "Madrid",
      image: "https://ui-avatars.com/api/?name=Carlos+M&background=ef4444&color=fff&size=80",
      before: "$2,300/mes",
      after: "$11,800/mes",
      timeframe: "7 meses",
      quote: "De trabajar 12 horas al día a tener 78 clientes y salir a las 6 PM. TrainerPro cambió mi vida.",
      pain: "Antes: Respondiendo WhatsApps a las 11 PM"
    },
    {
      name: "Ana R.",
      role: "Coach Online",
      location: "México",
      image: "https://ui-avatars.com/api/?name=Ana+R&background=8b5cf6&color=fff&size=80",
      before: "$0/mes",
      after: "$10,500/mes",
      timeframe: "4 meses",
      quote: "300 miembros en mi academia online. Todo automatizado, todo pasivo. Esto es lo que siempre quise.",
      pain: "Antes: Kajabi me robó $5k y 0 alumnos"
    },
    {
      name: "Miguel T.",
      role: "Preparador Físico",
      location: "Sevilla FC",
      image: "https://ui-avatars.com/api/?name=Miguel+T&background=10b981&color=fff&size=80",
      before: "Excel caótico",
      after: "IA predictiva",
      timeframe: "1 temporada",
      quote: "La IA predijo 3 lesiones antes de que pasaran. Ajustamos cargas. Las 3 jugadoras terminaron sin lesión.",
      pain: "Antes: Todo en Excel, 0 predicciones"
    }
  ];

  const faqs = [
    {
      q: "¿Por qué no uso Trainerize o TrueCoach?",
      a: "Porque son apps de entrenamiento, NO sistemas de negocio. No tienen CRM real, ni pipeline de ventas, ni IA de verdad. TrainerPro es el sistema operativo completo de tu negocio. La diferencia entre tener un martillo y tener una fábrica."
    },
    {
      q: "¿La IA realmente funciona o es humo?",
      a: "No es ChatGPT con prompt bonito. Son 7 agentes especializados entrenados para fitness. El agente de training conoce +500 ejercicios, el de nutrición calcula macros reales. Es IA que realmente hace el trabajo. No humo, resultados."
    },
    {
      q: "¿Cuánto tiempo toma la migración?",
      a: "Excel: 10-30 minutos para 300 clientes. Otras plataformas: 1-2 horas máximo. Mapeo automático, limpieza de datos, validación. No pierdes nada. Y si tienes un caso raro: migración asistida gratis."
    },
    {
      q: "¿Los $49 son para siempre?",
      a: "Tu precio queda congelado para siempre. Si entras hoy a $49, en 5 años sigues pagando $49. Early adopter privilege. Pero la oferta es hasta que cerremos esta ronda. Después vuelve a $149/mes."
    },
    {
      q: "¿Puedo cancelar cuando quiera?",
      a: "Sí. Cancelas cuando quieras, sin penalizaciones, sin letras chicas. Exportas toda tu data en un click y te vas. Confiamos en que el producto es tan bueno que no lo vas a hacer. Pero puedes."
    },
    {
      q: "¿Qué pasa si tengo 200 clientes y mi plan es de 150?",
      a: "Nada. No cortamos el servicio. Te avisamos y puedes upgrade cuando quieras. Nunca bloqueamos tu negocio por 50 clientes de diferencia. Somos empresarios, sabemos cómo es esto."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-red-500">TRAINERPRO</div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-white hover:text-red-500 transition-colors">Características</a>
              <a href="#testimonials" className="text-white hover:text-red-500 transition-colors">Casos de Éxito</a>
              <a href="#pricing" className="text-white hover:text-red-500 transition-colors">Precios</a>
              <a href="#faq" className="text-white hover:text-red-500 transition-colors">FAQ</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                EMPEZAR AHORA
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-red-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-white hover:text-red-500">Características</a>
              <a href="#testimonials" className="block px-3 py-2 text-white hover:text-red-500">Casos de Éxito</a>
              <a href="#pricing" className="block px-3 py-2 text-white hover:text-red-500">Precios</a>
              <a href="#faq" className="block px-3 py-2 text-white hover:text-red-500">FAQ</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 border border-blue-400">
              <Clock className="w-5 h-5 mr-2" />
              Acceso limitado: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              <span className="text-blue-600">FitOffice:</span><br />
              <span className="text-gray-300">El sistema que automatiza tu negocio de fitness</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Te cuento la historia de Carlos, que pasó de trabajar 12 horas al día a salir a las 6 PM 
              con 3x más clientes. Todo gracias a FitOffice.
            </p>

            <div className="bg-gray-800/50 border-2 border-gray-600 p-6 rounded-2xl mb-8 max-w-4xl mx-auto">
              <p className="text-lg font-bold text-gray-300 mb-4">
                La parte incómoda es esta: el 80% de entrenadores pierde 15 horas/semana 
                en tareas que FitOffice automatiza.
              </p>
              <p className="text-base text-gray-400">
                Mientras tanto, el 20% que usa FitOffice gana 3x más con la mitad del tiempo. 
                No es magia, es sistema.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all flex items-center justify-center">
                <Users className="mr-2 w-5 h-5" />
                Probar FitOffice gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-all flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Ver demo de FitOffice
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <div className="text-2xl font-bold text-blue-500 mb-1">15h menos</div>
                <div className="text-sm text-gray-400">Tiempo recuperado/semana</div>
              </div>
              <div className="text-center bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <div className="text-2xl font-bold text-green-500 mb-1">3x clientes</div>
                <div className="text-sm text-gray-400">Mismo tiempo de trabajo</div>
              </div>
              <div className="text-center bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <div className="text-2xl font-bold text-gray-300 mb-1">$5k+ extra</div>
                <div className="text-sm text-gray-400">Ingresos mensuales</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              <span className="text-gray-300">3 errores que me costaron</span><br />
              <span className="text-blue-600">$8,000/mes</span> <span className="text-gray-300">(y cómo FitOffice los solucionó)</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Vamos a bajarlo a tierra. Te cuento exactamente qué pasó, 
              por qué pasó, y cómo FitOffice me ayudó a solucionarlo.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-blue-600 p-2 rounded-full mr-3">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-3">Error #1: Excel como CRM</h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Lo que pasó:</strong> Perdía 15 horas/semana creando rutinas manualmente. 
                    Mientras tanto, mi competencia atendía 3x más clientes con el mismo tiempo.
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    <strong>Cómo FitOffice lo solucionó:</strong> Agente IA que crea rutinas en 45 segundos.
                  </p>
                  <div className="bg-blue-600/20 border border-blue-500 p-3 rounded">
                    <div className="text-blue-300 font-bold">💰 Costo real: $2,000-5,000/mes</div>
                    <div className="text-gray-400 text-xs mt-1">En tiempo perdido que podrías usar para conseguir más clientes</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-orange-600 p-2 rounded-full mr-3">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-3">Error #2: WhatsApp 24/7</h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Lo que pasó:</strong> Respondía WhatsApps a las 11 PM, daba mi número personal, 
                    y trabajaba 12 horas al día. Pensé que eso era "funcionar bien".
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    <strong>Cómo FitOffice lo solucionó:</strong> Inbox unificado con respuestas automáticas.
                  </p>
                  <div className="bg-orange-600/20 border border-orange-500 p-3 rounded">
                    <div className="text-orange-300 font-bold">😰 Costo: Salud mental + 30% clientes perdidos</div>
                    <div className="text-gray-400 text-xs mt-1">Por mala atención y horarios inconsistentes</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-green-600 p-2 rounded-full mr-3">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-500 mb-3">Error #3: Morosos que no cobras</h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Lo que pasó:</strong> Tenía $3-5k en morosos que nunca cobraba porque "da vergüenza" 
                    perseguirlos. Eso es 1-2 meses de trabajo regalado.
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    <strong>Cómo FitOffice lo solucionó:</strong> Cobros automáticos con corte automático.
                  </p>
                  <div className="bg-green-600/20 border border-green-500 p-3 rounded">
                    <div className="text-green-300 font-bold">🔥 Costo: $3,000-5,000/mes</div>
                    <div className="text-gray-400 text-xs mt-1">Dinero trabajado que nunca vas a ver</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <div className="bg-gray-800 border border-gray-600 p-6 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-300 mb-4">
                ¿Ves el patrón?
              </h3>
              <p className="text-lg text-gray-400 mb-6">
                Estos 3 errores me costaron <strong>$8,000-12,000/mes</strong> en oportunidades perdidas. 
                La buena noticia: FitOffice los soluciona en 30 días.
              </p>
              <div className="bg-blue-600/20 border border-blue-500 p-4 rounded mb-4">
                <p className="text-blue-300 font-bold text-sm">
                  💡 <strong>FitOffice:</strong> Centraliza-Configura-Cobra automáticamente
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-bold transition-all">
                <Target className="w-5 h-5 mr-2 inline" />
                Probar FitOffice gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              <span className="text-gray-300">Cómo FitOffice me evitó</span><br />
              <span className="text-blue-600">$8,000/mes</span> <span className="text-gray-300">en pérdidas</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Sin humo, sin promesas vacías. Te enseño exactamente cómo funciona FitOffice, 
              con números reales y procesos que puedes aplicar hoy.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-blue-600 p-2 rounded-full mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-3">FitOffice: 7 Agentes de IA</h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Lo que hace FitOffice:</strong> Automaticé la creación de rutinas. 
                    De 2 horas por cliente a 45 segundos.
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    <strong>Cómo:</strong> Agente IA de FitOffice que conoce +500 ejercicios y sabe periodizar.
                  </p>
                  <div className="bg-blue-600/20 border border-blue-500 p-3 rounded">
                    <div className="text-blue-300 font-bold">⚡ Resultado: 15 horas/semana ahorradas</div>
                    <div className="text-gray-400 text-xs mt-1">Lo que antes me tomaba 2 horas, ahora 45 segundos</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-green-600 p-2 rounded-full mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-500 mb-3">FitOffice: CRM que convierte</h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Lo que hace FitOffice:</strong> Automatiza el seguimiento de leads. 
                    De 30% a 90% de conversión.
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    <strong>Cómo:</strong> CRM de FitOffice que sigue automáticamente a cada lead con timing perfecto.
                  </p>
                  <div className="bg-green-600/20 border border-green-500 p-3 rounded">
                    <div className="text-green-300 font-bold">📈 Resultado: 3x más conversiones</div>
                    <div className="text-gray-400 text-xs mt-1">De 30% a 90% de conversión de leads</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-purple-600 p-2 rounded-full mr-3">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-500 mb-3">FitOffice: Cobros automáticos</h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Lo que hace FitOffice:</strong> Automatiza los cobros. 
                    De 70% a 98% de cobros exitosos.
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    <strong>Cómo:</strong> Sistema de FitOffice que cobra automáticamente y corta servicios a morosos.
                  </p>
                  <div className="bg-purple-600/20 border border-purple-500 p-3 rounded">
                    <div className="text-purple-300 font-bold">💰 Resultado: 98% de cobros</div>
                    <div className="text-gray-400 text-xs mt-1">De 70% a 98% de cobros exitosos</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:border-red-500 transition-colors">
              <Zap className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Automatizaciones (para dejar de currarte TODO)</h3>
              <p className="text-gray-300 mb-4">
                Flujos de onboarding, reactivación, upsell. Email/SMS automáticos según comportamiento.
              </p>
              <div className="text-red-400 font-semibold">Cliente inactivo 7 días? Flujo automático</div>
            </div>

            <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:border-red-500 transition-colors">
              <Target className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Planes nutricionales sin ser nutricionista</h3>
              <p className="text-gray-300 mb-4">
                Calculadora TMB/TDEE automática, ajuste de macros por objetivo, banco de recetas.
              </p>
              <div className="text-red-400 font-semibold">Plan completo con lista de compras en 90 segundos</div>
            </div>

            <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:border-red-500 transition-colors">
              <Shield className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Tu app (como si hubieras invertido $50k)</h3>
              <p className="text-gray-300 mb-4">
                App móvil white label: TU logo, TU marca, TU color. iOS y Android.
              </p>
              <div className="text-red-400 font-semibold">Cliente ve "App de [TU NOMBRE]" en su teléfono</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gray-800 border border-gray-600 p-6 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-300 mb-4">
                ¿Qué haría distinto si empezara hoy?
              </h3>
              <p className="text-lg text-gray-400 mb-6">
                Usaría <strong>FitOffice</strong> desde el día 1. 
                No escales clientes, escala procesos. Luego, deja que FitOffice escale clientes.
              </p>
              <div className="bg-blue-600/20 border border-blue-500 p-4 rounded mb-4">
                <p className="text-blue-300 font-bold text-sm">
                  🎯 <strong>Micro-tarea de hoy:</strong> Prueba FitOffice gratis. 15 minutos. Mañana, automatiza.
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-bold transition-all">
                <Target className="w-5 h-5 mr-2 inline" />
                Probar FitOffice gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold mb-6">
              <Star className="w-5 h-5 mr-2" />
              CASOS REALES, RESULTADOS REALES
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              NO <span className="text-green-500">TESTIMONIOS</span><br />
              FALSOS, <span className="text-red-500">NÚMEROS</span> REALES
            </h2>
            <p className="text-2xl text-gray-300 font-bold">
              Gente real, resultados reales, dinero real. Sin humo, sin mentiras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black border-2 border-red-500 p-8 rounded-2xl hover:border-green-500 transition-all transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-red-500"
                  />
                  <div>
                    <div className="font-black text-white text-xl">{testimonial.name}</div>
                    <div className="text-gray-400 font-bold">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.location}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 text-lg italic font-semibold">"{testimonial.quote}"</p>
                
                <div className="bg-red-600/20 border border-red-500 p-4 rounded-lg mb-4">
                  <div className="text-red-300 font-bold text-sm mb-2">{testimonial.pain}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div className="bg-red-600/20 border border-red-500 p-4 rounded-lg">
                    <div className="text-red-400 font-black text-xl">{testimonial.before}</div>
                    <div className="text-gray-400 text-sm font-bold">ANTES</div>
                  </div>
                  <div className="bg-green-600/20 border border-green-500 p-4 rounded-lg">
                    <div className="text-green-400 font-black text-xl">{testimonial.after}</div>
                    <div className="text-gray-400 text-sm font-bold">DESPUÉS</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-600/20 border border-yellow-500 p-3 rounded-lg">
                    <div className="text-yellow-400 font-black text-lg">{testimonial.timeframe}</div>
                    <div className="text-gray-400 text-sm font-bold">TIEMPO</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-green-600/20 border-2 border-green-500 p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-3xl font-black text-green-400 mb-4">
                ¿VES LA DIFERENCIA?
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                Mientras otros siguen perdiendo tiempo y dinero, estos entrenadores ya están escalando.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-2xl text-2xl font-black transition-all transform hover:scale-105">
                <TrendingUp className="w-6 h-6 mr-3 inline" />
                SER EL PRÓXIMO CASO DE ÉXITO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 animate-pulse">
              <AlertTriangle className="w-5 h-5 mr-2" />
              OFERTA TERMINA EN: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              PRECIOS QUE <span className="text-red-500">NO VAN</span><br />
              A <span className="text-yellow-400">DURAR</span>
            </h2>
            <p className="text-2xl text-gray-300 font-bold">
              Early adopter pricing. Una vez que subamos, <span className="text-red-400">nunca más</span> verás estos precios.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-12 rounded-3xl text-center relative overflow-hidden border-4 border-red-400 shadow-2xl">
              <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-3 text-lg font-black transform rotate-12 border-2 border-black">
                70% OFF
              </div>
              <div className="absolute top-0 left-0 bg-red-500 text-white px-4 py-2 text-sm font-bold transform -rotate-12">
                ÚLTIMAS HORAS
              </div>
              
              <h3 className="text-4xl font-black mb-6 text-white">SOLO PRO</h3>
              <div className="text-8xl font-black mb-6 text-white">
                $49<span className="text-3xl text-yellow-300">/mes</span>
              </div>
              <div className="text-2xl text-gray-300 mb-8">
                <span className="line-through text-red-300">$149/mes</span> - Precio normal
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">7 Agentes de IA</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">CRM Completo</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">App White Label</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">Automatizaciones</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">Facturación Automática</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">Web de Reservas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">LMS + Cursos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
                    <span className="text-white font-bold text-lg">Analytics Predictivas</span>
                  </div>
                </div>
              </div>
              
              <button className="bg-white text-black px-16 py-8 rounded-2xl text-3xl font-black hover:bg-gray-100 transition-all transform hover:scale-105 w-full shadow-2xl border-4 border-yellow-400">
                <Bomb className="w-8 h-8 mr-4 inline" />
                EMPEZAR AHORA - $49/mes
              </button>
              
              <div className="mt-8 space-y-2">
                <p className="text-lg text-gray-300 font-bold">
                  ✅ Precio congelado para siempre
                </p>
                <p className="text-lg text-gray-300 font-bold">
                  ✅ Sin compromisos
                </p>
                <p className="text-lg text-gray-300 font-bold">
                  ✅ Cancela cuando quieras
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-red-600/20 border-2 border-red-500 p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-3xl font-black text-red-400 mb-4">
                ⚠️ ADVERTENCIA: ESTA OFERTA TERMINA PRONTO
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                Una vez que termine, el precio vuelve a $149/mes. No habrá segunda oportunidad.
              </p>
              <div className="text-4xl font-black text-red-500 mb-4">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              PREGUNTAS QUE SEGURO TE HACES
            </h2>
            <p className="text-xl text-gray-300">
              Respuestas directas, sin rodeos, sin humo.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-black border border-gray-700 rounded-lg">
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-black to-red-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/10"></div>
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-full text-xl font-black mb-8 animate-pulse border-2 border-red-400">
            <Flame className="w-6 h-6 mr-3" />
            ÚLTIMA OPORTUNIDAD
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-red-500">STOP.</span><br />
            ¿CUÁNTO MÁS VAS A<br />
            <span className="text-yellow-400">PERDER DINERO?</span>
          </h2>
          
          <p className="text-3xl text-gray-300 mb-12 font-bold max-w-5xl mx-auto">
            Cada día que esperas es <span className="text-red-400">$200-500 perdidos</span>.<br />
            Cada día que esperas es <span className="text-red-400">tiempo que no recuperas</span>.
          </p>
          
          <div className="bg-red-600 p-12 rounded-3xl mb-12 border-4 border-red-400 shadow-2xl">
            <h3 className="text-4xl font-black mb-6 text-white">OFERTA TERMINA EN:</h3>
            <div className="text-8xl font-black mb-6 text-yellow-300">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <p className="text-2xl text-gray-300 font-bold">
              Una vez que termine, el precio vuelve a <span className="text-red-300 line-through">$149/mes</span>
            </p>
          </div>
          
          <div className="space-y-8">
            <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-20 py-10 rounded-3xl text-4xl font-black transition-all transform hover:scale-105 shadow-2xl border-4 border-red-400">
              <Bomb className="w-10 h-10 mr-4 inline" />
              EMPEZAR AHORA - $49/mes
              <ArrowRight className="ml-4 w-10 h-10 inline" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-green-600/20 border-2 border-green-500 p-6 rounded-2xl">
                <div className="text-2xl font-black text-green-400 mb-2">✅ Sin compromisos</div>
                <div className="text-gray-300">Cancela cuando quieras</div>
              </div>
              <div className="bg-blue-600/20 border-2 border-blue-500 p-6 rounded-2xl">
                <div className="text-2xl font-black text-blue-400 mb-2">🔒 Precio congelado</div>
                <div className="text-gray-300">Para siempre</div>
              </div>
              <div className="bg-yellow-600/20 border-2 border-yellow-500 p-6 rounded-2xl">
                <div className="text-2xl font-black text-yellow-400 mb-2">⚡ Setup gratis</div>
                <div className="text-gray-300">Te ayudamos a empezar</div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-black/50 border-2 border-red-500 p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-black text-red-400 mb-4">
              ⚠️ ADVERTENCIA FINAL
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              Esta es tu última oportunidad. Una vez que termine la oferta, no habrá segunda oportunidad.
            </p>
            <div className="text-6xl font-black text-red-500 mb-4">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-red-500 mb-4">TRAINERPRO</div>
              <p className="text-gray-400">
                El sistema operativo completo para tu negocio de fitness.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Características</a></li>
                <li><a href="#" className="hover:text-white">Precios</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
                <li><a href="#" className="hover:text-white">Estado del Sistema</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>hola@trainerpro.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+34 900 123 456</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Madrid, España</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrainerPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
