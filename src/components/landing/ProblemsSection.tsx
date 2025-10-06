import React from 'react';
import { Star, Users, DollarSign, TrendingUp, Award } from 'lucide-react';

export const ProblemsSection: React.FC = () => {
  return (
    <section id="proof" className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium text-lg">Ya confían en nosotros:</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          <div className="text-center opacity-0 animate-fade-in-up hover:scale-110 transition-all duration-300 hover:shadow-xl rounded-lg p-4" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div className="flex justify-center mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-blue-600">8,547</p>
            <p className="text-sm text-gray-600 mt-1">Entrenadores activos</p>
          </div>
          <div className="text-center opacity-0 animate-fade-in-up hover:scale-110 transition-all duration-300 hover:shadow-xl rounded-lg p-4" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="flex justify-center mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-blue-600">267k</p>
            <p className="text-sm text-gray-600 mt-1">Clientes gestionados</p>
          </div>
          <div className="text-center opacity-0 animate-fade-in-up hover:scale-110 transition-all duration-300 hover:shadow-xl rounded-lg p-4" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="flex justify-center mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-blue-600">$14.2M</p>
            <p className="text-sm text-gray-600 mt-1">Facturado/mes total</p>
          </div>
          <div className="text-center opacity-0 animate-fade-in-up hover:scale-110 transition-all duration-300 hover:shadow-xl rounded-lg p-4" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="flex justify-center mb-2">
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-blue-600">4.9</p>
            <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </p>
          </div>
          <div className="text-center opacity-0 animate-fade-in-up hover:scale-110 transition-all duration-300 hover:shadow-xl rounded-lg p-4" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <div className="flex justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-blue-600">94%</p>
            <p className="text-sm text-gray-600 mt-1">Tasa de retención</p>
          </div>
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
