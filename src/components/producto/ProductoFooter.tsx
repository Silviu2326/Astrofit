import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, CheckCircle2, Shield, ArrowRight, Laugh } from 'lucide-react';

export const ProductoFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* CTA Final Super Agresivo */}
      <section className="bg-gradient-to-br from-black via-red-900 to-black py-20 px-4 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flame className="w-24 h-24 text-orange-500 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-fade-in-up">
            <span className="flex items-center justify-center gap-3 mb-4">
              ¿Sigues usando Excel? <Laugh className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />
            </span>
            <span className="text-red-500">Estás quebrado y no lo sabes.</span>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-300 mb-10 font-bold leading-relaxed">
            Cada día sin sistema = $300-700 perdidos.<br />
            Cada mes sin automatizar = $10-22k tirados a la basura.<br />
            <span className="text-yellow-400">¿Cuánto más vas a esperar para arreglar esto?</span>
          </p>

          <div className="bg-yellow-900/30 border-2 border-yellow-500 rounded-xl p-8 mb-10 max-w-3xl mx-auto hover:scale-105 transition-transform duration-300">
            <p className="text-xl text-yellow-300 font-black mb-4">
              SIN BULLSHIT:
            </p>
            <ul className="text-left space-y-3 text-lg text-yellow-100">
              <li className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1 hover:rotate-12" />
                <span><strong>14 días gratis</strong> - Sin tarjeta de crédito. Pruébalo de verdad.</span>
              </li>
              <li className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1 hover:rotate-12" />
                <span><strong>Setup en 10 minutos</strong> - No semanas. MINUTOS.</span>
              </li>
              <li className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1 hover:rotate-12" />
                <span><strong>Cancela cuando quieras</strong> - CERO permanencia. CERO letra chica.</span>
              </li>
              <li className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1 hover:rotate-12" />
                <span><strong>Garantía 60 días</strong> - No funciona? Devolución total. Sin preguntas.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-black text-2xl transition-all duration-300 shadow-2xl hover:scale-110 hover:shadow-orange-500/50 flex items-center justify-center gap-3 animate-pulse"
            >
              Empezar AHORA
              <Flame className="w-8 h-8" />
            </button>
            <button
              onClick={() => navigate('/precios')}
              className="px-12 py-6 border-4 border-white text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-black text-2xl hover:scale-105"
            >
              Ver Precios
            </button>
          </div>

          <p className="text-gray-400 text-lg mt-8">
            Precio actual válido SOLO para los primeros 500. Después sube.
          </p>
        </div>
      </section>

      {/* Garantía */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-br from-green-900/40 to-blue-900/40 border-2 border-green-500 rounded-2xl p-12 text-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl shadow-green-500/20">
          <Shield className="w-20 h-20 mx-auto mb-6 text-green-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
          <h2 className="text-3xl md:text-4xl font-black mb-6">Garantía de 60 Días</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Prueba TrainerPro durante <strong className="text-green-400">60 días completos</strong>.<br />
            Si no te ahorra mínimo 10 horas al mes o no aumenta tus ingresos,
            <span className="text-green-400 font-bold"> devolución total del dinero</span>.
          </p>
          <p className="text-gray-400 mb-8">
            Sin preguntas. Sin dramas. Un email y listo.<br />
            <strong className="text-white">Asumimos el riesgo, no tú.</strong>
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-12 py-5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-green-500/50"
          >
            Empezar Prueba Gratis <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 TrainerPro. Software honesto para gente fitness que trabaja de verdad.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Sin bullshit. Sin letra chica. Sin sorpresas.
          </p>
        </div>
      </footer>
    </>
  );
};
