import React from 'react';
import { Check, Star, Sparkles, Crown } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  icon: 'star' | 'sparkles' | 'crown';
  popular?: boolean;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'premium';
}

const PricingTable: React.FC = () => {
  const plans: MembershipPlan[] = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: 29,
      currency: '$',
      period: 'mes',
      description: 'Perfecto para empezar tu transformación',
      icon: 'star',
      features: [
        { text: 'Acceso a planes de entrenamiento básicos', included: true },
        { text: 'Biblioteca de ejercicios', included: true },
        { text: 'Seguimiento de progreso', included: true },
        { text: 'Soporte por email', included: true },
        { text: 'Planes de nutrición personalizados', included: false },
        { text: 'Asesoría personalizada', included: false },
        { text: 'Acceso a contenido premium', included: false },
      ],
      buttonText: 'Comenzar ahora',
      buttonVariant: 'secondary',
    },
    {
      id: 'pro',
      name: 'Plan Pro',
      price: 59,
      currency: '$',
      period: 'mes',
      description: 'Para atletas comprometidos con resultados',
      icon: 'sparkles',
      popular: true,
      features: [
        { text: 'Todo lo del Plan Básico', included: true },
        { text: 'Planes de nutrición personalizados', included: true },
        { text: 'Análisis de progreso avanzado', included: true },
        { text: 'Videollamadas mensuales con coach', included: true },
        { text: 'Acceso a contenido premium', included: true },
        { text: 'Comunidad privada', included: true },
        { text: 'Asesoría personalizada 24/7', included: false },
      ],
      buttonText: 'Suscribirse ahora',
      buttonVariant: 'primary',
    },
    {
      id: 'elite',
      name: 'Plan Elite',
      price: 99,
      currency: '$',
      period: 'mes',
      description: 'La experiencia definitiva de transformación',
      icon: 'crown',
      features: [
        { text: 'Todo lo del Plan Pro', included: true },
        { text: 'Asesoría personalizada 24/7', included: true },
        { text: 'Planes completamente personalizados', included: true },
        { text: 'Ajustes semanales de programa', included: true },
        { text: 'Acceso prioritario a eventos', included: true },
        { text: 'Análisis de composición corporal', included: true },
        { text: 'Consultas ilimitadas', included: true },
      ],
      buttonText: 'Acceso Elite',
      buttonVariant: 'premium',
    },
  ];

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'star':
        return <Star className="w-8 h-8" />;
      case 'sparkles':
        return <Sparkles className="w-8 h-8" />;
      case 'crown':
        return <Crown className="w-8 h-8" />;
      default:
        return <Star className="w-8 h-8" />;
    }
  };

  const getButtonStyles = (variant: string, isPopular: boolean) => {
    if (variant === 'premium') {
      return 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/50';
    }
    if (variant === 'primary' || isPopular) {
      return 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/50';
    }
    return 'bg-white text-gray-900 border-2 border-gray-200 hover:border-indigo-300 hover:bg-gray-50';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            <h2 className="text-5xl font-extrabold mb-4">
              Planes de Membresía
            </h2>
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elige el plan perfecto para alcanzar tus objetivos de fitness y bienestar
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
              plan.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-0 right-0 z-10">
                <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white px-4 py-1 rounded-bl-2xl text-sm font-semibold">
                  Más Popular
                </div>
              </div>
            )}

            {/* Card Header */}
            <div className={`p-8 ${plan.popular ? 'bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50' : 'bg-gray-50'}`}>
              <div className={`inline-flex p-3 rounded-xl mb-4 ${
                plan.id === 'elite'
                  ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white'
                  : plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white'
                    : 'bg-gray-200 text-gray-700'
              }`}>
                {getIconComponent(plan.icon)}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="flex items-baseline mb-2">
                <span className="text-5xl font-extrabold text-gray-900">{plan.currency}{plan.price}</span>
                <span className="text-xl text-gray-500 ml-2">/{plan.period}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      feature.included
                        ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600'
                        : 'bg-gray-200'
                    }`}>
                      <Check className={`w-3 h-3 ${feature.included ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`ml-3 text-sm ${
                      feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${getButtonStyles(
                  plan.buttonVariant,
                  plan.popular || false
                )}`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 text-center">
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Cancela cuando quieras</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>14 días de garantía</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Soporte prioritario</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
