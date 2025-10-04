import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, TrendingUp, Clock, DollarSign } from 'lucide-react';

export const PreciosFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Final CTA */}
      <section className="bg-gradient-to-r from-red-900 to-orange-900 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 animate-pulse">
            <Flame className="w-16 h-16 mx-auto text-orange-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            ¿Sigues leyendo en lugar de actuar?
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Cada día que pasas sin sistema pierdes dinero, tiempo y clientes.<br />
            <span className="text-yellow-400 font-bold">Haz los cálculos. Duele, ¿verdad?</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
            <div className="bg-black/30 rounded-lg p-4 transition-transform duration-300 hover:scale-105">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <p className="text-sm text-gray-300">Pierdes <span className="font-bold text-white">20h/semana</span> en tareas manuales</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4 transition-transform duration-300 hover:scale-105">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <p className="text-sm text-gray-300">Dejas de ganar <span className="font-bold text-white">$3-5k/mes</span> por desorganización</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4 transition-transform duration-300 hover:scale-105">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-sm text-gray-300">Podrías escalar <span className="font-bold text-white">2-3x</span> con las herramientas correctas</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button
              onClick={() => navigate('/login')}
              className="px-12 py-5 bg-white text-black rounded-lg font-black text-xl hover:bg-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-lg animate-pulse"
            >
              Hablar con Ventas (Sin Bullshit) <Flame className="inline ml-2 text-orange-600" />
            </button>
            <button
              onClick={() => navigate('/producto')}
              className="px-8 py-5 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            >
              Ver Demo del Producto
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 TrainerPro. Software honesto para gente fitness que trabaja de verdad.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Sin bullshit. Sin letra chica. Sin precios escondidos. Sin sorpresas.
          </p>
        </div>
      </footer>
    </>
  );
};
