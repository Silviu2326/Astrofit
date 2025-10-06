import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dumbbell, Clock, Shield, CreditCard, CheckCircle, DollarSign, TrendingDown, AlertTriangle, ArrowRight
} from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Final CTA Ultra Agresivo */}
      <section className="bg-gradient-to-br from-black via-red-950 to-black text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            La pregunta NO es
            <span className="block text-red-500 mt-3">"¿Puedo permitírmelo?"</span>
          </h2>

          <p className="text-3xl md:text-4xl font-bold text-gray-300 mb-6">
            La pregunta es:
          </p>

          <p className="text-4xl md:text-5xl font-black text-yellow-400 mb-10">
            "¿Cuánto dinero MÁS voy a SANGRAR sin actuar YA?"
          </p>

          <div className="bg-red-950/50 border-2 border-red-500 rounded-2xl p-8 mb-10 hover:scale-105 transition-transform duration-300">
            <p className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-2">
              <TrendingDown className="w-8 h-8 text-red-400" />
              Cada día que NO usas TrainerPro:
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-2">
                  <DollarSign className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-4xl font-black text-red-400 mb-2">-$150</p>
                <p className="text-sm text-gray-400">en clientes perdidos</p>
              </div>
              <div className="hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-2">
                  <Clock className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-4xl font-black text-red-400 mb-2">-3 horas</p>
                <p className="text-sm text-gray-400">en trabajo manual inútil</p>
              </div>
              <div className="hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-2">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-4xl font-black text-red-400 mb-2">-1 lead</p>
                <p className="text-sm text-gray-400">que no conviertes</p>
              </div>
            </div>
          </div>

          <p className="text-2xl text-gray-300 mb-10 leading-relaxed">
            Miles de entrenadores ya dejaron de <span className="line-through text-gray-500">trabajar como esclavos</span>
            <br />
            y empezaron a <strong className="text-white">ESCALAR como empresarios de verdad</strong>.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="group px-12 py-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-black text-2xl md:text-3xl shadow-2xl hover:shadow-blue-500/50 mb-8 hover:scale-110 transform animate-pulse inline-flex items-center gap-3"
          >
            Sí, quiero dejar de SANGRAR dinero
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <Clock className="w-5 h-5 text-green-400" />
              <span>Setup en 10 minutos</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <Shield className="w-5 h-5 text-green-400" />
              <span>14 días gratis</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <CreditCard className="w-5 h-5 text-green-400" />
              <span>Sin tarjeta</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Cancela cuando quieras</span>
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-500">
            * Datos basados en promedio de 8,547 usuarios activos. Resultados pueden variar.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="w-6 h-6 text-blue-500" />
                <h5 className="text-white font-black">TrainerPro</h5>
              </div>
              <p className="text-sm text-gray-500">
                El sistema operativo para entrenadores que quieren escalar sin morir en el intento.
              </p>
            </div>
            <div>
              <h6 className="text-white font-bold mb-4">Producto</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors duration-300">Características</a></li>
                <li><a href="#planes" className="hover:text-white transition-colors duration-300">Precios</a></li>
                <li><a href="#proof" className="hover:text-white transition-colors duration-300">Casos de éxito</a></li>
                <li><a href="#comparativa" className="hover:text-white transition-colors duration-300">vs Competencia</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-bold mb-4">Recursos</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Ayuda 24/7</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Integraciones</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-bold mb-4">Legal</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">RGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 TrainerPro. Todos los derechos reservados.</p>
            <p className="mt-2">Hecho para entrenadores, por entrenadores. Sin humo, solo resultados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
