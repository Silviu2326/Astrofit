import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';

export const PreciosHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/20"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-block mb-4 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full animate-pulse">
          <Flame className="inline w-4 h-4 mr-1 -mt-0.5" />
          Oferta válida solo para los primeros 500
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-6 animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
          Deja de <span className="text-red-500">SANGRAR</span> dinero<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            eligiendo el plan equivocado
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          9 planes diseñados para cada etapa de tu negocio.<br />
          <span className="text-blue-400 font-bold">Sin bullshit. Sin letra chica. Sin precios escondidos.</span>
        </p>

        <button
          onClick={() => navigate('/login')}
          className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]"
        >
          Ver Planes
        </button>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(2.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};
