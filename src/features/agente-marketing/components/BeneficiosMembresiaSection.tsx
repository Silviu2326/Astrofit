import React from 'react';
import { Check, X } from 'lucide-react';

interface Feature {
  name: string;
  basico: boolean;
  pro: boolean;
  premium: boolean;
}

const features: Feature[] = [
  {
    name: 'Acceso a contenido exclusivo',
    basico: true,
    pro: true,
    premium: true,
  },
  {
    name: 'Soporte por email',
    basico: true,
    pro: true,
    premium: true,
  },
  {
    name: 'Consultas mensuales',
    basico: false,
    pro: true,
    premium: true,
  },
  {
    name: 'Asesoría personalizada',
    basico: false,
    pro: true,
    premium: true,
  },
  {
    name: 'Acceso prioritario a eventos',
    basico: false,
    pro: false,
    premium: true,
  },
  {
    name: 'Networking exclusivo',
    basico: false,
    pro: false,
    premium: true,
  },
  {
    name: 'Sesiones 1:1 ilimitadas',
    basico: false,
    pro: false,
    premium: true,
  },
  {
    name: 'Recursos descargables',
    basico: true,
    pro: true,
    premium: true,
  },
  {
    name: 'Certificaciones',
    basico: false,
    pro: true,
    premium: true,
  },
  {
    name: 'API access',
    basico: false,
    pro: false,
    premium: true,
  },
];

interface TierBenefit {
  title: string;
  price: string;
  period: string;
  description: string;
  highlights: string[];
  color: string;
}

const tiers: TierBenefit[] = [
  {
    title: 'Básico',
    price: '$29',
    period: '/mes',
    description: 'Perfecto para comenzar tu camino',
    highlights: [
      'Acceso a contenido base',
      'Soporte por email',
      'Recursos descargables',
      'Comunidad online',
    ],
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    title: 'Pro',
    price: '$79',
    period: '/mes',
    description: 'Para profesionales en crecimiento',
    highlights: [
      'Todo lo del plan Básico',
      'Consultas mensuales',
      'Asesoría personalizada',
      'Certificaciones',
      'Webinars exclusivos',
    ],
    color: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Premium',
    price: '$199',
    period: '/mes',
    description: 'Máximo nivel de servicio',
    highlights: [
      'Todo lo del plan Pro',
      'Sesiones 1:1 ilimitadas',
      'Acceso VIP a eventos',
      'Networking exclusivo',
      'API access completo',
      'Soporte prioritario 24/7',
    ],
    color: 'from-red-500 to-red-600',
  },
];

export const BeneficiosMembresiaSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Beneficios de Membresía
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y comienza a transformar tu negocio
          </p>
        </div>

        {/* Tarjetas de planes */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, index) => (
            <div
              key={tier.title}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                index === 1 ? 'md:scale-105 border-4 border-orange-500' : ''
              }`}
            >
              {/* Badge para plan más popular */}
              {index === 1 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Más Popular
                </div>
              )}

              {/* Header del plan */}
              <div className={`bg-gradient-to-r ${tier.color} p-8 text-white`}>
                <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span className="text-xl ml-1">{tier.period}</span>
                </div>
                <p className="text-white/90">{tier.description}</p>
              </div>

              {/* Contenido del plan */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {tier.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full bg-gradient-to-r ${tier.color} text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                  Comenzar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla comparativa detallada */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Comparación Detallada de Planes
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Características
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div className="flex flex-col items-center">
                      <span className="text-yellow-600">Básico</span>
                      <span className="text-xs font-normal text-gray-500 mt-1">$29/mes</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-orange-50">
                    <div className="flex flex-col items-center">
                      <span className="text-orange-600">Pro</span>
                      <span className="text-xs font-normal text-gray-500 mt-1">$79/mes</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600">Premium</span>
                      <span className="text-xs font-normal text-gray-500 mt-1">$199/mes</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.basico ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center bg-orange-50/50">
                      {feature.pro ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.premium ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer de la tabla */}
          <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-200">
            <p className="text-center text-sm text-gray-600">
              💡 Todos los planes incluyen actualizaciones gratuitas y acceso a la comunidad
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿No estás seguro qué plan elegir?
          </p>
          <button className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Habla con un Asesor
          </button>
        </div>
      </div>
    </section>
  );
};
