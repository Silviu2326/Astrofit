import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Laugh } from 'lucide-react';

export const ProductoHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-blue-900/30"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-block mb-6 px-6 py-3 bg-red-600 text-white font-black rounded-full animate-pulse">
          SIN BULLSHIT
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-fade-in-up">
          <span className="flex items-center justify-center gap-3">
            Excel <Laugh className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />
          </span>
          <span className="text-gray-400 text-2xl md:text-3xl">Siguiente chiste.</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
            Estás SANGRANDO $10-22k/mes
          </span>
          <br />
          <span className="text-white text-4xl md:text-5xl">
            y ni te has dado cuenta
          </span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-bold">
          No más WhatsApps a las 11 PM de clientes borrachos.<br />
          No más morosos que te fantasmean.<br />
          No más leads perdidos en Excel.<br />
          <span className="text-yellow-400">8 módulos que hacen el trabajo por ti.</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-black text-xl transition-all duration-300 shadow-2xl hover:scale-110 hover:shadow-orange-500/50 flex items-center justify-center gap-2"
          >
            Empezar AHORA <Flame className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate('/precios')}
            className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-black text-xl hover:scale-105"
          >
            Ver Precios
          </button>
        </div>

        <p className="text-gray-400 text-lg">
          14 días gratis. Sin tarjeta. Cancela cuando quieras. Sin permanencia.
        </p>
      </div>
    </section>
  );
};
