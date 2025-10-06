import React from 'react';
import { Star, TrendingUp, Clock, Award } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
  results: string;
  timeframe: string;
  metric: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Resultados reales. Personas reales.
          </h2>
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            (No testimonios falsos de Fiverr. Verificables al 100%)
            <Award className="w-6 h-6 text-blue-600" />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-500 opacity-0 animate-fade-in-up hover:scale-105" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full border-4 border-blue-500 hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-black text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex gap-0.5 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xl font-black text-blue-600">{testimonial.results}</p>
                  <p className="text-xs text-gray-500">Resultado</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xl font-black text-green-600">{testimonial.timeframe}</p>
                  <p className="text-xs text-gray-500">Tiempo</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-xl font-black text-purple-600">{testimonial.metric}</p>
                  <p className="text-xs text-gray-500">Métrica clave</p>
                </div>
              </div>
            </div>
          ))}
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
