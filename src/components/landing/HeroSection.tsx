import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, Flame, XCircle, ArrowRight, Play, CheckCircle, DollarSign
} from 'lucide-react';

interface Problem {
  problem: string;
  cost: string;
  icon: React.ReactNode;
}

interface HeroSectionProps {
  problems: Problem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ problems }) => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-red-900 to-black text-white py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge de Urgencia */}
          <div className="mb-6 flex justify-center gap-3 flex-wrap animate-fade-in-up">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-black inline-flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              PRECIO SUBE EN 72 HORAS
            </span>
            <span className="bg-yellow-600 text-black px-4 py-2 rounded-full text-sm font-black inline-flex items-center gap-2 animate-bounce">
              <Flame className="w-4 h-4" />
              ÚLTIMOS 23 CUPOS
            </span>
          </div>

          {/* Headline Demoledor */}
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Estás SANGRANDO dinero
            <span className="block text-red-500 mt-2">cada puto día</span>
            <span className="block text-gray-300 text-3xl md:text-5xl mt-4">y ni siquiera te has dado cuenta</span>
          </h1>

          {/* Sub-headline */}
          <div className="bg-red-950/50 border-2 border-red-500 rounded-2xl p-6 mb-8 max-w-4xl mx-auto opacity-0 animate-fade-in-up transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <p className="text-xl md:text-2xl font-bold mb-4">
              Mientras tú pierdes tiempo con <span className="text-red-400">Excels de mierda</span>,
              <span className="text-red-400"> WhatsApps a las 3 AM</span>,
              <span className="text-red-400"> clientes morosos</span> y
              <span className="text-red-400"> rutinas que toman 3 horas hacer</span>...
            </p>
            <p className="text-2xl md:text-3xl font-black text-yellow-400">
              Tu competencia ya factura 6 cifras mientras duerme.
            </p>
          </div>

          {/* Cálculo del Dolor */}
          <div className="bg-black/50 border border-red-500/50 rounded-xl p-6 mb-10 max-w-3xl mx-auto opacity-0 animate-fade-in-up transition-all duration-300 hover:shadow-2xl" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <p className="text-gray-400 text-sm mb-2 flex items-center justify-center gap-2">
              <DollarSign className="w-4 h-4 text-red-500" />
              COSTO DE OPORTUNIDAD (cálculo conservador):
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="opacity-0 animate-fade-in-up hover:scale-110 transition-transform duration-300" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                <p className="text-2xl font-black text-red-400">$500/mes</p>
                <p className="text-xs text-gray-500">clientes perdidos</p>
              </div>
              <div className="opacity-0 animate-fade-in-up hover:scale-110 transition-transform duration-300" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                <p className="text-2xl font-black text-red-400">$1,200/mes</p>
                <p className="text-xs text-gray-500">tiempo perdido</p>
              </div>
              <div className="opacity-0 animate-fade-in-up hover:scale-110 transition-transform duration-300" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <p className="text-2xl font-black text-red-400">$800/mes</p>
                <p className="text-xs text-gray-500">morosos</p>
              </div>
              <div className="opacity-0 animate-fade-in-up hover:scale-110 transition-transform duration-300" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                <p className="text-2xl font-black text-red-400">$1,000/mes</p>
                <p className="text-xs text-gray-500">sin reactivación</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-500/30">
              <p className="text-3xl font-black text-red-500">= $3,500/mes PERDIDOS</p>
              <p className="text-sm text-gray-400 mt-1">$42,000 al año tirados a la basura</p>
            </div>
          </div>

          {/* Problemas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 max-w-4xl mx-auto">
            {problems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-left opacity-0 animate-fade-in-up hover:scale-105 transition-all duration-300 hover:shadow-xl" style={{ animationDelay: `${800 + idx * 100}ms`, animationFillMode: 'forwards' }}>
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm md:text-base">{item.problem}</p>
                  <p className="text-red-400 text-xs md:text-sm font-bold">{item.cost}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs Principales */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/login')}
              className="group px-8 py-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-black text-xl shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center gap-2 hover:scale-110 transform"
            >
              Sí, quiero SALVAR mi negocio YA
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('reality')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-5 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-black text-xl flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              <Play className="w-6 h-6" />
              Ver el problema completo (3 min)
            </button>
          </div>

          {/* Garantías */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>14 días gratis</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Migración gratis incluida</span>
            </div>
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
