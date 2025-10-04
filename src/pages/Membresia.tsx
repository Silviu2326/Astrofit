import React, { useState } from 'react';
import { Check, X, Star, ChevronDown, ChevronUp } from 'lucide-react';

const Membresia = () => {
  const [selectedPlan, setSelectedPlan] = useState<'mensual' | 'anual'>('anual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const planes = [
    {
      nombre: 'Básico',
      precio: { mensual: 29, anual: 290 },
      descripcion: 'Perfecto para emprendedores individuales',
      caracteristicas: [
        '5 proyectos activos',
        'Análisis de mercado básico',
        'Plantillas de marketing',
        'Soporte por email',
        'Reportes mensuales',
      ],
      noIncluye: [
        'IA avanzada',
        'Automatizaciones ilimitadas',
        'Soporte prioritario',
      ],
      destacado: false,
    },
    {
      nombre: 'Profesional',
      precio: { mensual: 79, anual: 790 },
      descripcion: 'Para negocios en crecimiento',
      caracteristicas: [
        'Proyectos ilimitados',
        'IA avanzada para marketing',
        'Automatizaciones completas',
        'Análisis predictivo',
        'Integraciones premium',
        'Soporte prioritario 24/7',
        'Reportes personalizados',
        'Consultoría mensual',
      ],
      noIncluye: [],
      destacado: true,
    },
    {
      nombre: 'Enterprise',
      precio: { mensual: 199, anual: 1990 },
      descripcion: 'Solución completa para empresas',
      caracteristicas: [
        'Todo de Profesional',
        'API personalizada',
        'Equipo de hasta 50 usuarios',
        'Implementación dedicada',
        'SLA garantizado',
        'Gestor de cuenta dedicado',
        'Capacitación del equipo',
        'Desarrollo de funciones a medida',
      ],
      noIncluye: [],
      destacado: false,
    },
  ];

  const testimonios = [
    {
      nombre: 'María González',
      empresa: 'StartupTech',
      rol: 'CEO',
      foto: 'https://i.pravatar.cc/150?img=5',
      comentario: 'Desde que implementamos esta plataforma, nuestro ROI en marketing digital aumentó un 340%. Las herramientas de IA nos ahorran 20 horas semanales.',
      rating: 5,
    },
    {
      nombre: 'Carlos Rodríguez',
      empresa: 'EcoCommerce',
      rol: 'Director de Marketing',
      foto: 'https://i.pravatar.cc/150?img=12',
      comentario: 'La automatización y el análisis predictivo nos permitieron escalar nuestras campañas sin aumentar el equipo. Resultados impresionantes.',
      rating: 5,
    },
    {
      nombre: 'Ana Martínez',
      empresa: 'DigitalBrand',
      rol: 'Fundadora',
      foto: 'https://i.pravatar.cc/150?img=9',
      comentario: 'El soporte es excepcional y las herramientas son intuitivas. Pasamos de 0 a 10,000 clientes en 6 meses gracias a sus estrategias de marketing.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      pregunta: '¿Puedo cambiar de plan en cualquier momento?',
      respuesta: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente y ajustamos el cobro de forma proporcional.',
    },
    {
      pregunta: '¿Ofrecen garantía de devolución?',
      respuesta: 'Ofrecemos una garantía de devolución de 30 días sin preguntas. Si no estás satisfecho, te devolvemos el 100% de tu dinero.',
    },
    {
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal, transferencias bancarias y pagos con criptomonedas.',
    },
    {
      pregunta: '¿Los datos están seguros?',
      respuesta: 'Absolutamente. Utilizamos encriptación de nivel bancario (SSL 256-bit), cumplimos con GDPR y nuestros servidores están certificados ISO 27001.',
    },
    {
      pregunta: '¿Incluye capacitación?',
      respuesta: 'Todos los planes incluyen acceso a nuestra academia con tutoriales y webinars. Los planes Profesional y Enterprise incluyen sesiones de capacitación personalizadas.',
    },
    {
      pregunta: '¿Hay costos ocultos?',
      respuesta: 'No. El precio que ves es el precio que pagas. Sin cargos por configuración, sin tarifas ocultas. Todo está incluido en tu membresía.',
    },
  ];

  const caracteristicasComparacion = [
    { nombre: 'Proyectos activos', basico: '5', profesional: 'Ilimitados', enterprise: 'Ilimitados' },
    { nombre: 'Usuarios del equipo', basico: '1', profesional: '5', enterprise: '50' },
    { nombre: 'IA para marketing', basico: false, profesional: true, enterprise: true },
    { nombre: 'Automatizaciones', basico: '10/mes', profesional: 'Ilimitadas', enterprise: 'Ilimitadas' },
    { nombre: 'Análisis predictivo', basico: false, profesional: true, enterprise: true },
    { nombre: 'Integraciones', basico: 'Básicas', profesional: 'Premium', enterprise: 'Custom API' },
    { nombre: 'Soporte', basico: 'Email', profesional: '24/7 Prioritario', enterprise: 'Dedicado' },
    { nombre: 'Reportes', basico: 'Mensuales', profesional: 'Personalizados', enterprise: 'A medida' },
    { nombre: 'Consultoría', basico: false, profesional: 'Mensual', enterprise: 'Semanal' },
    { nombre: 'SLA', basico: false, profesional: false, enterprise: '99.9%' },
  ];

  const descuentoAnual = Math.round((1 - (790 / (79 * 12))) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Impulsa tu Negocio con IA
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Únete a más de 10,000 empresas que están transformando su marketing
              con inteligencia artificial
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i}`}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex text-yellow-300">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white">+10,000 clientes satisfechos</p>
              </div>
            </div>

            {/* Toggle de precio */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-lg ${selectedPlan === 'mensual' ? 'text-white font-semibold' : 'text-purple-200'}`}>
                Mensual
              </span>
              <button
                onClick={() => setSelectedPlan(selectedPlan === 'mensual' ? 'anual' : 'mensual')}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    selectedPlan === 'anual' ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${selectedPlan === 'anual' ? 'text-white font-semibold' : 'text-purple-200'}`}>
                Anual
              </span>
              {selectedPlan === 'anual' && (
                <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                  Ahorra {descuentoAnual}%
                </span>
              )}
            </div>
          </div>

          {/* Planes */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {planes.map((plan) => (
              <div
                key={plan.nombre}
                className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 ${
                  plan.destacado ? 'ring-4 ring-yellow-400 md:scale-105' : ''
                }`}
              >
                {plan.destacado && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-purple-900 px-4 py-1 text-sm font-bold rounded-bl-lg">
                    MÁS POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.nombre}</h3>
                  <p className="text-gray-600 mb-6">{plan.descripcion}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-purple-600">
                      ${plan.precio[selectedPlan]}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{selectedPlan === 'mensual' ? 'mes' : 'año'}
                    </span>
                    {selectedPlan === 'anual' && (
                      <div className="text-sm text-gray-500 mt-1">
                        ${(plan.precio.anual / 12).toFixed(0)}/mes facturado anualmente
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.destacado
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Comenzar Ahora
                  </button>

                  <div className="mt-8 space-y-4">
                    {plan.caracteristicas.map((caracteristica) => (
                      <div key={caracteristica} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                    {plan.noIncluye.map((item) => (
                      <div key={item} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-500 line-through">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de Comparación */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Compara todos los planes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Característica</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Básico</th>
                  <th className="text-center py-4 px-6 font-semibold text-purple-600 bg-purple-50">
                    Profesional
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {caracteristicasComparacion.map((caracteristica, index) => (
                  <tr key={caracteristica.nombre} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-4 px-6 font-medium text-gray-900">{caracteristica.nombre}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof caracteristica.basico === 'boolean' ? (
                        caracteristica.basico ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{caracteristica.basico}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-purple-50">
                      {typeof caracteristica.profesional === 'boolean' ? (
                        caracteristica.profesional ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-purple-700 font-semibold">{caracteristica.profesional}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof caracteristica.enterprise === 'boolean' ? (
                        caracteristica.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{caracteristica.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-center text-purple-100 mb-12 text-lg">
            Más de 10,000 empresas confían en nosotros
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((testimonio) => (
              <div
                key={testimonio.nombre}
                className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonio.foto}
                    alt={testimonio.nombre}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonio.nombre}</h4>
                    <p className="text-sm text-gray-600">{testimonio.rol}</p>
                    <p className="text-sm text-purple-600 font-semibold">{testimonio.empresa}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonio.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonio.comentario}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.pregunta}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tu marketing?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Únete hoy y obtén 30 días de garantía de devolución
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
              Comenzar Prueba Gratis
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
              Hablar con Ventas
            </button>
          </div>
          <p className="text-purple-100 mt-6 text-sm">
            No se requiere tarjeta de crédito • Cancela en cualquier momento
          </p>
        </div>
      </div>
    </div>
  );
};

export default Membresia;
