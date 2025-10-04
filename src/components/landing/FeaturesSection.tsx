import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  realExample: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            El sistema que tus competidores
            <span className="block text-blue-600 mt-2">NO quieren que conozcas</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            No es un CRM. No es un software de entrenamiento. No es una herramienta de mierda más.
            <br />
            <strong className="text-gray-900">Es el sistema operativo COMPLETO para dejar de jugar a emprendedor y CONSTRUIR un negocio de verdad.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-blue-500 hover:shadow-2xl transition-all duration-300 opacity-0 animate-fade-in-up hover:scale-105"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-wide bg-blue-50 px-3 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded transition-all duration-300 hover:bg-green-100">
                    <p className="text-sm font-bold text-green-800 flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Ejemplo real:</strong> {feature.realExample}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <p className="text-3xl font-black mb-4">Y esto es SOLO el 60% de las funcionalidades...</p>
          <p className="text-xl mb-6">Hay +50 features más que ni siquiera menciono aquí para no saturarte. Esto es para los que están listos para ESCALAR, no para los que juegan a emprendedor.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-300 font-black text-xl hover:scale-110 hover:shadow-lg transform"
          >
            Quiero verlo TODO por dentro
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};
